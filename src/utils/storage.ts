/**
 * Universal IndexedDB and Cloud/MySQL Storage utility
 * Ensures instant loading across all devices globally without stale cache flashes
 */

const DB_NAME = 'DesignPriveeCMS_DB';
const DB_VERSION = 1;
const STORE_NAME = 'site_data_store';
const KEY = 'current_site_data';
export const LOCAL_STORAGE_KEY = 'design_privee_cms_site_data_v2';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Fetch published site data from cloud backend / database (Node or Hostinger PHP)
export async function fetchCloudSiteData(): Promise<any | null> {
  // 1. First attempt: Primary API endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('/api/site-data', {
      headers: { 'Cache-Control': 'no-cache, no-store' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data && Object.keys(json.data).length > 0) {
        return json.data;
      }
    }
  } catch (err) {
    // try fallback
  }

  // 2. Second attempt: Hostinger PHP Bridge Direct
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('/api.php?action=load', {
      headers: { 'Cache-Control': 'no-cache, no-store' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data && Object.keys(json.data).length > 0) {
        return json.data;
      }
    }
  } catch (err2) {
    // no-op
  }

  return null;
}

// Save published site data to cloud backend / database
export async function saveCloudSiteData(data: any): Promise<boolean> {
  let saved = false;

  // 1. Try Primary Node / Express endpoint
  try {
    const res = await fetch('/api/site-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) saved = true;
    }
  } catch (err) {
    // proceed to PHP bridge
  }

  // 2. Try Hostinger PHP Bridge endpoint
  try {
    const res = await fetch('/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save', data })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) saved = true;
    }
  } catch (err2) {
    // logged
  }

  return saved;
}

// Upload image / video to server storage to get a permanent URL
export async function uploadMediaToServer(base64: string, filename?: string): Promise<string | null> {
  // 1. Try Node server upload
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64, filename })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      }
    }
  } catch (err) {
    // proceed to PHP bridge
  }

  // 2. Try PHP upload bridge
  try {
    const res = await fetch('/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'upload', base64, filename })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      }
    }
  } catch (err2) {
    // fallback
  }

  return null;
}

export async function saveSiteDataToDB(data: any): Promise<void> {
  if (!data) return;

  // 1. Try IndexedDB first (virtually unlimited quota for multiple high-res portfolio images)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, KEY);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB save warning:', err);
  }

  // 2. Also try safe localStorage backup
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (quotaError) {
    try {
      const lightweight = {
        ...data,
        portfolio: {
          ...data.portfolio,
          items: (data.portfolio?.items || []).slice(0, 10)
        }
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lightweight));
    } catch (e) {
      // safe no-op
    }
  }

  // 3. Asynchronously push to cloud backend so all visitors immediately see it
  saveCloudSiteData(data).catch(() => {});
}

export async function loadSiteDataFromDB(): Promise<any | null> {
  // 1. Try IndexedDB first for instant local loading
  try {
    const db = await openDB();
    const result = await new Promise<any>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY);

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (result && typeof result === 'object') {
      return result;
    }
  } catch (err) {
    console.warn('IndexedDB read failed, trying localStorage', err);
  }

  // 2. Fallback to localStorage
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Failed to parse localStorage data', err);
  }

  return null;
}

export async function clearSiteDataDB(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB delete failed', err);
  }

  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    // safe
  }
}

/**
 * Automatically optimizes and compresses uploaded image files to reasonable web dimensions & quality
 * Preserves alpha transparency for PNGs (watermarks, logos) and WebP.
 */
export function compressImageFile(file: File, maxWidth = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's SVG or Video, preserve as is
    if (file.type === 'image/svg+xml' || file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const isPng = file.type === 'image/png';
    const isWebp = file.type === 'image/webp';

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        // Clean canvas to preserve transparency for PNG/WebP
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        try {
          if (isPng) {
            const compressedBase64 = canvas.toDataURL('image/png');
            resolve(compressedBase64);
          } else if (isWebp) {
            const compressedBase64 = canvas.toDataURL('image/webp', quality);
            resolve(compressedBase64);
          } else {
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedBase64);
          }
        } catch (e) {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => resolve(event.target?.result as string);
      img.src = event.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

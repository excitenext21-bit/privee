import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  SiteData,
  HeroSectionData,
  ApproachSectionData,
  VikranttSectionData,
  PublicationsSectionData,
  PortfolioSectionData,
  TestimonialsSectionData,
  ProcessSectionData,
  ContactSectionData,
  Enquiry,
  DatabaseConfig,
  TextStyle,
  BrandingConfig
} from '../types';
import { PORTFOLIO_ITEMS, TESTIMONIALS, PROCESS_STEPS, PRESS_MENTIONS } from '../data/content';
import {
  saveSiteDataToDB,
  loadSiteDataFromDB,
  fetchCloudSiteData,
  saveCloudSiteData,
  clearSiteDataDB,
  LOCAL_STORAGE_KEY
} from '../utils/storage';

const STORAGE_KEY = LOCAL_STORAGE_KEY;

export const INITIAL_SITE_DATA: SiteData = {
  branding: {
    siteTitle: 'Design Privée by Vikrantt | Premier Wedding Design & Decor Company',
    faviconUrl: '',
    autoHeightProportional: true,
    headerLogoUrl: '',
    headerLogoWidth: 190,
    headerLogoMaxHeight: 55,
    footerLogoUrl: '',
    footerLogoWidth: 200,
    footerLogoMaxHeight: 65,
    watermark: {
      enabled: true,
      type: 'text',
      text: 'DESIGN PRIVÉE',
      customImageUrl: '',
      opacity: 0.22,
      position: 'bottom-right',
      size: 'medium',
      colorTheme: 'light',
      fontFamily: 'serif',
      letterSpacing: '0.28em',
      showBorder: false
    },
    navItems: [
      { id: 'portfolio', name: 'PORTFOLIO', href: '#portfolio' },
      { id: 'about', name: 'ABOUT', href: '#about' },
      { id: 'services', name: 'SERVICES', href: '#services' },
      { id: 'contact', name: 'CONTACT', href: '#contact' }
    ],
    navStyle: {
      fontSize: '12px',
      fontWeight: '500',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal',
      textTransform: 'uppercase',
      letterSpacing: '0.28em'
    }
  },
  hero: {
    mediaType: 'video',
    videoUrl: 'https://designprivee.com/assets/privee.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',
    category: 'A PREMIER WEDDING DESIGN & DECOR COMPANY',
    title: 'Designing Artful & Impeccably Curated Weddings Reminiscent of Your Dream Event',
    categoryStyle: {
      fontSize: '15px',
      fontWeight: '400',
      fontColor: 'rgba(255,255,255,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    titleStyle: {
      fontSize: '45px',
      fontWeight: '400',
      fontColor: 'rgba(255,255,255,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
  },
  approach: {
    leftImageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    rightImageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
    eyebrow: 'OUR APPROACH',
    heading: 'Timeless with a contemporary edge and unwavering hospitality',
    subheading: 'For thoughtful tastemakers & dreamers',
    paragraph: 'With a reputation for curating exceptional events — whether intimate or extravagant, our mission is to plan & design an event that perfectly embodies your vision and becomes everyone’s new favorite memory.',
    ctaText: 'DETAILS, PLEASE',
    ctaUrl: '#about',
    headingStyle: {
      fontSize: '40px',
      fontWeight: '400',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    subheadingStyle: {
      fontSize: '20px',
      fontWeight: '300',
      fontColor: '#A8A298',
      textDecoration: 'none',
      fontStyle: 'italic'
    },
    paragraphStyle: {
      fontSize: '14px',
      fontWeight: '400',
      fontColor: '#7A756C',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
  },
  vikrantt: {
    greeting: "HI, I'M VIKRANTT",
    portraitHeading: "Meet the Designer",
    portraitHeadingStyle: {
      fontSize: '42px',
      fontWeight: '400',
      fontColor: '#F5F2ED',
      textDecoration: 'none',
      fontStyle: 'normal',
      textTransform: 'none',
      textAlign: 'center'
    },
    aestheteQuote: "I'm an aesthete at heart. I find inspiration in architecture, nature, travel, art, and cultures across the world. Every journey I take adds a new perspective that eventually finds its way into my designs.",
    dogImageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=900',
    dogImageGrayscale: true,
    dogCaption: "I'M A PROUD DOG LOVER",
    philosophyQuote: "My philosophy is simple: deliver exactly what is promised—and then exceed expectations.",
    trustQuote: "Trust is the foundation of every project I take on, and ensuring that every couple feels confident, heard, and excited throughout the journey is just as important as the final design itself.",
    vikranttPortraitUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000',
    portraitGrayscale: true,
    bioHighlightText: 'Vikrantt draws on years of experience in the event planning industry, creating unique gatherings for once in a lifetime memories.',
    ctaUrl: '#contact',
    greetingStyle: {
      fontSize: '45px',
      fontWeight: '400',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    quotesStyle: {
      fontSize: '18px',
      fontWeight: '400',
      fontColor: '#2C2A29',
      textDecoration: 'none',
      fontStyle: 'italic'
    }
  },
  publications: {
    title: 'FEATURED IN ESTEEMED PUBLICATIONS',
    globalGrayscale: true,
    items: PRESS_MENTIONS.map((p, idx) => ({
      id: `pub-${idx}`,
      name: p,
      isImage: false,
      grayscale: true
    }))
  },
  portfolio: {
    title: 'PORTFOLIO',
    subtitle: 'SIGNATURE WORK',
    globalGrayscale: false,
    items: PORTFOLIO_ITEMS.map((item) => ({
      ...item,
      grayscale: false
    })),
    titleStyle: {
      fontSize: '45px',
      fontWeight: '400',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
  },
  testimonials: {
    sectionHeading: 'This is your moment.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
    items: TESTIMONIALS,
    headingStyle: {
      fontSize: '45px',
      fontWeight: '400',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    quoteStyle: {
      fontSize: '20px',
      fontWeight: '300',
      fontColor: '#2C2A29',
      textDecoration: 'none',
      fontStyle: 'italic'
    }
  },
  process: {
    eyebrow: 'OUR PROCESS',
    heading: 'Here from the Very Start, Here for Every Part.',
    steps: PROCESS_STEPS,
    headingStyle: {
      fontSize: '45px',
      fontWeight: '400',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    stepTitleStyle: {
      fontSize: '22px',
      fontWeight: '400',
      fontColor: '#1A1918',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
  },
  contact: {
    heading: 'CONTACT US',
    introText: 'We look forward to discussing your upcoming celebration. Please share a few details about your vision, and our team will get in touch shortly.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
    email: 'info@designprivee.com',
    phone: '+91 98906 00039',
    address: 'New Delhi / Mumbai / Worldwide',
    instagramUrl: 'https://instagram.com',
    headingStyle: {
      fontSize: '45px',
      fontWeight: '400',
      fontColor: 'rgba(153,152,148,1)',
      textDecoration: 'none',
      fontStyle: 'normal'
    },
    introStyle: {
      fontSize: '14px',
      fontWeight: '400',
      fontColor: '#3A3835',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
  },
  enquiries: [
    {
      id: 'enq-sample-1',
      name: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      eventDate: '2026-11-18',
      location: 'Udaipur Palace, Rajasthan',
      guestCount: '350',
      budget: '$150,000+',
      message: 'We are planning a 3-day destination royal wedding in Udaipur and would love Vikrantt to direct the decor and spatial design.',
      submittedAt: new Date().toISOString(),
      status: 'New'
    }
  ],
  dbConfig: {
    enabled: false,
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    databaseName: 'u123456789_vikrantt_db',
    username: 'u123456789_dbuser',
    password: '',
    apiUrl: 'https://yourdomain.com/api/site-data',
    apiKey: '',
    autoSync: true,
    status: 'disconnected'
  }
};

interface SiteContextType {
  data: SiteData;
  updateBranding: (data: Partial<BrandingConfig>) => void;
  updateHero: (data: Partial<HeroSectionData>) => void;
  updateApproach: (data: Partial<ApproachSectionData>) => void;
  updateVikrantt: (data: Partial<VikranttSectionData>) => void;
  updatePublications: (data: Partial<PublicationsSectionData>) => void;
  updatePortfolio: (data: Partial<PortfolioSectionData>) => void;
  updateTestimonials: (data: Partial<TestimonialsSectionData>) => void;
  updateProcess: (data: Partial<ProcessSectionData>) => void;
  updateContact: (data: Partial<ContactSectionData>) => void;
  updateDbConfig: (config: Partial<DatabaseConfig>) => void;
  syncWithDatabase: (action?: 'test' | 'save' | 'load') => Promise<{ success: boolean; message: string }>;
  publishToCloud: () => Promise<{ success: boolean; message: string }>;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  resetAllData: () => void;
  isCmsOpen: boolean;
  openCms: (activeTab?: string) => void;
  closeCms: () => void;
  activeCmsTab: string;
  setActiveCmsTab: (tab: string) => void;
  isSiteReady: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Initial localStorage check failed, will load from IndexedDB', e);
    }
    return INITIAL_SITE_DATA;
  });

  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [activeCmsTab, setActiveCmsTab] = useState<string>('branding');
  const [isSiteReady, setIsSiteReady] = useState<boolean>(false);
  const isLoadedFromDB = useRef<boolean>(false);

  // 1. Asynchronously load persistent data from IndexedDB & Cloud Server on startup
  useEffect(() => {
    let isMounted = true;

    // Safety timeout: Ensure page never gets blocked if client is completely offline
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setIsSiteReady(true);
    }, 1200);

    const initData = async () => {
      // Step A: Immediate local cache load
      try {
        const persisted = await loadSiteDataFromDB();
        if (isMounted && persisted && Object.keys(persisted).length > 0) {
          setData(persisted);
        }
      } catch (e) {
        console.warn('Local storage load note:', e);
      } finally {
        isLoadedFromDB.current = true;
      }

      // Step B: Fetch latest published cloud database content
      try {
        const cloudData = await fetchCloudSiteData();
        if (isMounted && cloudData && Object.keys(cloudData).length > 0) {
          setData(cloudData);
          saveSiteDataToDB(cloudData).catch(() => {});
        }
      } catch (e) {
        console.warn('Cloud fetch note:', e);
      } finally {
        if (isMounted) {
          clearTimeout(fallbackTimer);
          setIsSiteReady(true);
        }
      }
    };

    initData();

    // Check URL on load for discrete admin access (/#admin, /#cms, ?admin=true, /admin)
    const checkAdminUrl = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#cms' || hash === '#login' || search.includes('admin=') || path.endsWith('/admin')) {
        setIsCmsOpen(true);
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    window.addEventListener('popstate', checkAdminUrl);

    // Global keyboard shortcut for admin login: Ctrl + Shift + A (or Cmd + Shift + A on Mac) or Alt + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsCmsOpen(true);
      } else if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsCmsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('hashchange', checkAdminUrl);
      window.removeEventListener('popstate', checkAdminUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const initialBootFinished = useRef<boolean>(false);

  useEffect(() => {
    // Only save once initial boot load and cloud sync has completed, preventing clobbering!
    if (isLoadedFromDB.current && isSiteReady) {
      if (!initialBootFinished.current) {
        initialBootFinished.current = true;
        return;
      }
      saveSiteDataToDB(data).catch((e) => {
        console.error('Failed to save CMS storage', e);
      });
    }

    // Dynamic Favicon update
    if (data.branding?.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = data.branding.faviconUrl;
    }

    // Dynamic Title update
    if (data.branding?.siteTitle) {
      document.title = data.branding.siteTitle;
    }
  }, [data]);

  const updateBranding = (partial: Partial<BrandingConfig>) => {
    setData((prev) => ({
      ...prev,
      branding: {
        ...(prev.branding || INITIAL_SITE_DATA.branding!),
        ...partial
      }
    }));
  };

  const updateHero = (partial: Partial<HeroSectionData>) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, ...partial } }));
  };

  const updateApproach = (partial: Partial<ApproachSectionData>) => {
    setData((prev) => ({ ...prev, approach: { ...prev.approach, ...partial } }));
  };

  const updateVikrantt = (partial: Partial<VikranttSectionData>) => {
    setData((prev) => ({ ...prev, vikrantt: { ...prev.vikrantt, ...partial } }));
  };

  const updatePublications = (partial: Partial<PublicationsSectionData>) => {
    setData((prev) => ({ ...prev, publications: { ...prev.publications, ...partial } }));
  };

  const updatePortfolio = (partial: Partial<PortfolioSectionData>) => {
    setData((prev) => ({ ...prev, portfolio: { ...prev.portfolio, ...partial } }));
  };

  const updateTestimonials = (partial: Partial<TestimonialsSectionData>) => {
    setData((prev) => ({ ...prev, testimonials: { ...prev.testimonials, ...partial } }));
  };

  const updateProcess = (partial: Partial<ProcessSectionData>) => {
    setData((prev) => ({ ...prev, process: { ...prev.process, ...partial } }));
  };

  const updateContact = (partial: Partial<ContactSectionData>) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...partial } }));
  };

  const updateDbConfig = (partial: Partial<DatabaseConfig>) => {
    setData((prev) => ({
      ...prev,
      dbConfig: {
        ...(prev.dbConfig || {
          enabled: false,
          type: 'mysql',
          host: 'localhost',
          port: '3306',
          databaseName: '',
          username: '',
          autoSync: true,
          status: 'disconnected'
        }),
        ...partial
      }
    }));
  };

  const syncWithDatabase = async (overrideAction: 'test' | 'save' | 'load' = 'save'): Promise<{ success: boolean; message: string }> => {
    const config = data.dbConfig;
    if (!config || !config.host || !config.databaseName || !config.username) {
      return { success: false, message: 'Please enter Host, Database Name, and Username.' };
    }

    try {
      updateDbConfig({ status: 'connected', errorMessage: undefined });
      const response = await fetch('/api/db-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          host: config.host,
          port: config.port || '3306',
          database: config.databaseName,
          user: config.username,
          password: config.password || '',
          action: overrideAction,
          data: data
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || `Error connecting to MySQL database: ${response.statusText}`);
      }

      if (overrideAction === 'load' && result.data) {
        setData(result.data);
      }

      updateDbConfig({
        enabled: true,
        status: 'connected',
        lastConnected: new Date().toLocaleTimeString(),
        errorMessage: undefined
      });
      return { success: true, message: result.message || 'Successfully connected to Hostinger MySQL Database!' };
    } catch (err: any) {
      const msg = err?.message || 'Failed to connect directly to Hostinger MySQL.';
      updateDbConfig({ status: 'error', errorMessage: msg });
      return { success: false, message: msg };
    }
  };

  const publishToCloud = async (): Promise<{ success: boolean; message: string }> => {
    try {
      const saved = await saveCloudSiteData(data);
      if (saved) {
        return { success: true, message: 'All website content & media successfully published live to Cloud Database!' };
      }
      return { success: false, message: 'Failed to publish to cloud server.' };
    } catch (e: any) {
      return { success: false, message: e?.message || 'Failed to push to cloud storage.' };
    }
  };

  const addEnquiry = (enq: Omit<Enquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enq,
      id: 'enq-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'New'
    };
    setData((prev) => ({
      ...prev,
      enquiries: [newEnquiry, ...prev.enquiries]
    }));
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    setData((prev) => ({
      ...prev,
      enquiries: prev.enquiries.map((e) => (e.id === id ? { ...e, status } : e))
    }));
  };

  const deleteEnquiry = (id: string) => {
    setData((prev) => ({
      ...prev,
      enquiries: prev.enquiries.filter((e) => e.id !== id)
    }));
  };

  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset all site content and sections to default?')) {
      setData(INITIAL_SITE_DATA);
      clearSiteDataDB().catch((e) => console.error('Failed to clear DB', e));
    }
  };

  const openCms = (tab?: string) => {
    if (tab) setActiveCmsTab(tab);
    setIsCmsOpen(true);
  };

  const closeCms = () => {
    setIsCmsOpen(false);
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        updateBranding,
        updateHero,
        updateApproach,
        updateVikrantt,
        updatePublications,
        updatePortfolio,
        updateTestimonials,
        updateProcess,
        updateContact,
        updateDbConfig,
        syncWithDatabase,
        publishToCloud,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        resetAllData,
        isCmsOpen,
        openCms,
        closeCms,
        activeCmsTab,
        setActiveCmsTab,
        isSiteReady
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
};

export function getStyleObject(style?: TextStyle): React.CSSProperties {
  if (!style) return {};
  const res: React.CSSProperties = {};
  if (style.fontSize) res.fontSize = style.fontSize;
  if (style.fontWeight) res.fontWeight = Number(style.fontWeight) || style.fontWeight;
  if (style.fontColor) res.color = style.fontColor;
  if (style.textDecoration) res.textDecoration = style.textDecoration;
  if (style.fontStyle) res.fontStyle = style.fontStyle;
  if (style.textTransform) res.textTransform = style.textTransform as any;
  if (style.letterSpacing) res.letterSpacing = style.letterSpacing;
  if (style.textAlign) res.textAlign = style.textAlign;
  return res;
}

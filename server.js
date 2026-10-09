// server.ts
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = Number(process.env.PORT) || 3e3;
var DATA_DIR = path.join(__dirname, "data");
var UPLOADS_DIR = path.join(__dirname, "uploads");
var SITE_DATA_FILE = path.join(DATA_DIR, "site_content.json");
var DB_CONFIG_FILE = path.join(DATA_DIR, "db_config.json");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
var inMemorySiteData = null;
try {
  if (fs.existsSync(SITE_DATA_FILE)) {
    const raw = fs.readFileSync(SITE_DATA_FILE, "utf-8");
    if (raw && raw.trim().length > 0) {
      inMemorySiteData = JSON.parse(raw);
    }
  } else {
    const fallbackPublic = path.join(__dirname, "public", "data", "site_content.json");
    const fallbackDist = path.join(__dirname, "dist", "data", "site_content.json");
    const pathToUse = fs.existsSync(fallbackPublic) ? fallbackPublic : fs.existsSync(fallbackDist) ? fallbackDist : null;
    if (pathToUse) {
      const raw = fs.readFileSync(pathToUse, "utf-8");
      if (raw && raw.trim().length > 0) {
        inMemorySiteData = JSON.parse(raw);
        fs.writeFileSync(SITE_DATA_FILE, raw, "utf-8");
      }
    }
  }
} catch (e) {
  console.warn("Initial disk cache load notice:", e);
}
function getSavedDbConfig() {
  let fileConfig = {};
  if (fs.existsSync(DB_CONFIG_FILE)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(DB_CONFIG_FILE, "utf-8"));
    } catch (e) {
    }
  }
  return {
    host: fileConfig.host || process.env.DB_HOST || "",
    port: Number(fileConfig.port || process.env.DB_PORT) || 3306,
    user: fileConfig.user || process.env.DB_USER || "",
    password: fileConfig.password !== void 0 ? fileConfig.password : process.env.DB_PASSWORD || "",
    database: fileConfig.database || process.env.DB_NAME || ""
  };
}
app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true, limit: "60mb" }));
app.use("/uploads", express.static(UPLOADS_DIR, { maxAge: "30d" }));
var dbPool = null;
function getDbPool() {
  const cfg = getSavedDbConfig();
  if (!dbPool && cfg.host && cfg.database && cfg.user) {
    try {
      dbPool = mysql.createPool({
        host: cfg.host,
        port: cfg.port,
        database: cfg.database,
        user: cfg.user,
        password: cfg.password,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8e3
      });
    } catch (err) {
      console.warn("Failed to create MySQL pool:", err?.message);
    }
  }
  return dbPool;
}
async function initDatabaseTables() {
  const cfg = getSavedDbConfig();
  if (!cfg.host || !cfg.database || !cfg.user) return;
  try {
    const pool = getDbPool();
    if (!pool) return;
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'current_data',
        data_json LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        event_date VARCHAR(100),
        location VARCHAR(255),
        guest_count VARCHAR(100),
        budget VARCHAR(100),
        message TEXT,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    const [rows] = await pool.query('SELECT data_json FROM site_content WHERE id = "current_data" LIMIT 1');
    if (rows && rows.length > 0 && rows[0].data_json) {
      inMemorySiteData = JSON.parse(rows[0].data_json);
      fs.writeFileSync(SITE_DATA_FILE, JSON.stringify(inMemorySiteData, null, 2), "utf-8");
      console.log("Successfully auto-synced site content from MySQL database on boot!");
    } else if (inMemorySiteData) {
      await pool.query(
        'INSERT INTO site_content (id, data_json) VALUES ("current_data", ?) ON DUPLICATE KEY UPDATE data_json = VALUES(data_json)',
        [JSON.stringify(inMemorySiteData)]
      );
      console.log("Successfully auto-seeded complete website content & images into Hostinger MySQL database on boot!");
    }
  } catch (err) {
    console.warn("MySQL init tables notice:", err?.message);
  }
}
initDatabaseTables().catch(() => {
});
async function getDbConnection(overrides) {
  const cfg = getSavedDbConfig();
  const host = overrides?.host || cfg.host;
  const port = Number(overrides?.port || cfg.port) || 3306;
  const database = overrides?.database || cfg.database;
  const user = overrides?.user || cfg.user;
  const password = overrides?.password !== void 0 ? overrides.password : cfg.password;
  if (!host || !database || !user) {
    throw new Error("Database connection credentials not provided (Host, Database Name, User required).");
  }
  const connection = await mysql.createConnection({
    host,
    port,
    database,
    user,
    password,
    connectTimeout: 8e3
  });
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'current_data',
        data_json LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } catch (e) {
  }
  return connection;
}
app.get("/api/health", (req, res) => {
  const cfg = getSavedDbConfig();
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    envDbConfigured: !!(cfg.host && cfg.database && cfg.user),
    hasCloudData: !!inMemorySiteData || fs.existsSync(SITE_DATA_FILE)
  });
});
app.get("/api/site-data", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  if (inMemorySiteData && Object.keys(inMemorySiteData).length > 0) {
    return res.json({
      success: true,
      source: "memory_cache",
      data: inMemorySiteData
    });
  }
  try {
    if (fs.existsSync(SITE_DATA_FILE)) {
      const raw = fs.readFileSync(SITE_DATA_FILE, "utf-8");
      if (raw && raw.trim().length > 0) {
        inMemorySiteData = JSON.parse(raw);
        return res.json({
          success: true,
          source: "cloud_storage",
          data: inMemorySiteData
        });
      }
    }
  } catch (fileErr) {
    console.error("File read error:", fileErr);
  }
  const cfg = getSavedDbConfig();
  if (cfg.host && cfg.database && cfg.user) {
    try {
      const pool = getDbPool();
      if (pool) {
        const [rows] = await pool.query(
          'SELECT data_json FROM site_content WHERE id = "current_data" LIMIT 1'
        );
        if (rows && rows.length > 0 && rows[0].data_json) {
          inMemorySiteData = JSON.parse(rows[0].data_json);
          fs.writeFileSync(SITE_DATA_FILE, JSON.stringify(inMemorySiteData, null, 2), "utf-8");
          return res.json({
            success: true,
            source: "mysql",
            data: inMemorySiteData
          });
        }
      }
    } catch (dbErr) {
      console.warn("MySQL read notice:", dbErr?.message);
    }
  }
  return res.json({
    success: true,
    source: "defaults",
    data: null
  });
});
app.post("/api/site-data", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { data } = req.body || {};
  if (!data) {
    return res.status(400).json({ success: false, error: "No data provided." });
  }
  inMemorySiteData = data;
  try {
    fs.writeFileSync(SITE_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (fileErr) {
    console.error("Failed to write site_content.json:", fileErr);
  }
  if (data.dbConfig && data.dbConfig.host && data.dbConfig.databaseName && data.dbConfig.username) {
    try {
      fs.writeFileSync(DB_CONFIG_FILE, JSON.stringify({
        host: data.dbConfig.host,
        port: data.dbConfig.port || 3306,
        database: data.dbConfig.databaseName,
        user: data.dbConfig.username,
        password: data.dbConfig.password || ""
      }, null, 2), "utf-8");
      dbPool = null;
    } catch (e) {
    }
  }
  const cfg = getSavedDbConfig();
  if (cfg.host && cfg.database && cfg.user) {
    (async () => {
      try {
        const pool = getDbPool();
        if (pool) {
          const jsonString = JSON.stringify(data);
          await pool.query(
            'INSERT INTO site_content (id, data_json) VALUES ("current_data", ?) ON DUPLICATE KEY UPDATE data_json = VALUES(data_json)',
            [jsonString]
          );
        }
      } catch (dbErr) {
        console.warn("Background MySQL update notice:", dbErr?.message);
      }
    })().catch(() => {
    });
  }
  return res.json({
    success: true,
    message: "Changes saved and published live globally for all visitors!"
  });
});
app.post("/api/upload", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { base64, filename } = req.body || {};
  if (!base64) {
    return res.status(400).json({ success: false, error: "No media data provided." });
  }
  try {
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer;
    let ext = "jpg";
    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes("png")) ext = "png";
      else if (mime.includes("webp")) ext = "webp";
      else if (mime.includes("mp4")) ext = "mp4";
      else if (mime.includes("svg")) ext = "svg";
      buffer = Buffer.from(matches[2], "base64");
    } else {
      buffer = Buffer.from(base64, "base64");
    }
    const safeName = `${Date.now()}_${(filename || "media").replace(/[^a-zA-Z0-9_-]/g, "_")}.${ext}`;
    const targetPath = path.join(UPLOADS_DIR, safeName);
    fs.writeFileSync(targetPath, buffer);
    const distUploadsPath = path.join(__dirname, "dist", "uploads");
    if (fs.existsSync(distUploadsPath)) {
      fs.writeFileSync(path.join(distUploadsPath, safeName), buffer);
    }
    return res.json({
      success: true,
      url: `/uploads/${safeName}`
    });
  } catch (err) {
    console.error("Media upload error:", err);
    return res.status(500).json({ success: false, error: err?.message || "Failed to save media file." });
  }
});
app.post("/api/db-direct", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    const { host, port, database, user, password, action = "test", data } = req.body || {};
    const connection = await getDbConnection({
      host,
      port,
      database,
      user,
      password
    });
    try {
      if (action === "test") {
        const [rows] = await connection.query("SELECT 1 as connected");
        await connection.end();
        if (host && database && user) {
          try {
            fs.writeFileSync(DB_CONFIG_FILE, JSON.stringify({
              host,
              port: Number(port) || 3306,
              database,
              user,
              password: password || ""
            }, null, 2), "utf-8");
            dbPool = null;
          } catch (e) {
          }
        }
        return res.json({
          success: true,
          message: `Successfully connected directly to Hostinger database "${database}"! Credentials saved permanently.`
        });
      }
      if (action === "load") {
        const [rows] = await connection.query(
          'SELECT data_json FROM site_content WHERE id = "current_data" LIMIT 1'
        );
        await connection.end();
        if (rows && rows.length > 0 && rows[0].data_json) {
          const parsed = JSON.parse(rows[0].data_json);
          inMemorySiteData = parsed;
          try {
            fs.writeFileSync(SITE_DATA_FILE, JSON.stringify(parsed, null, 2), "utf-8");
          } catch (e) {
          }
          return res.json({
            success: true,
            data: parsed,
            message: "Site data loaded directly from Hostinger database."
          });
        } else {
          return res.json({
            success: true,
            data: null,
            message: "Database connected. No previous data found in table, using defaults."
          });
        }
      }
      if (action === "save") {
        const jsonString = JSON.stringify(data || {});
        await connection.query(
          'INSERT INTO site_content (id, data_json) VALUES ("current_data", ?) ON DUPLICATE KEY UPDATE data_json = VALUES(data_json)',
          [jsonString]
        );
        await connection.end();
        if (host && database && user) {
          try {
            fs.writeFileSync(DB_CONFIG_FILE, JSON.stringify({
              host,
              port: Number(port) || 3306,
              database,
              user,
              password: password || ""
            }, null, 2), "utf-8");
            dbPool = null;
          } catch (e) {
          }
        }
        inMemorySiteData = data;
        try {
          fs.writeFileSync(SITE_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
        } catch (e) {
        }
        return res.json({
          success: true,
          message: 'Changes saved directly to Hostinger MySQL table "site_content"!'
        });
      }
      await connection.end();
      return res.status(400).json({ success: false, error: "Unknown action requested." });
    } catch (queryErr) {
      try {
        await connection.end();
      } catch (e) {
      }
      throw queryErr;
    }
  } catch (connErr) {
    console.error("Hostinger Direct DB Error:", connErr);
    let userFriendlyMsg = connErr.message || "Failed to connect to MySQL server.";
    if (connErr.code === "ER_ACCESS_DENIED_ERROR") {
      userFriendlyMsg = "Access Denied: Incorrect MySQL Username or Password in Hostinger.";
    } else if (connErr.code === "ETIMEDOUT" || connErr.code === "ECONNREFUSED") {
      userFriendlyMsg = `Connection timed out to ${connErr.address || "host"}. Please ensure "Remote MySQL" is allowed in Hostinger hPanel > Databases > Remote MySQL.`;
    } else if (connErr.code === "ER_BAD_DB_ERROR") {
      userFriendlyMsg = `Database "${connErr.sqlMessage || ""}" does not exist in your Hostinger account.`;
    }
    return res.status(500).json({
      success: false,
      error: userFriendlyMsg,
      code: connErr.code
    });
  }
});
app.post("/api/enquiry", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  const { name, email, phone, eventDate, location, guestCount, budget, message } = req.body || {};
  try {
    const cfg = getSavedDbConfig();
    if (cfg.host && cfg.database && cfg.user) {
      const connection = await getDbConnection();
      await connection.query(
        `INSERT INTO contact_submissions (name, email, phone, event_date, location, guest_count, budget, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name || "", email || "", phone || "", eventDate || "", location || "", guestCount || "", budget || "", message || ""]
      );
      await connection.end();
    }
    return res.json({ success: true, message: "Consultation enquiry received and saved." });
  } catch (err) {
    console.warn("Enquiry database save warning:", err?.message);
    return res.json({ success: true, message: "Enquiry received successfully." });
  }
});
app.get("/robots.txt", (req, res) => {
  const robotsPath = [
    path.join(__dirname, "dist", "robots.txt"),
    path.join(__dirname, "public", "robots.txt")
  ].find((p) => fs.existsSync(p));
  if (robotsPath) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.sendFile(robotsPath);
  }
  res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://www.designprivee.com/sitemap.xml\n");
});
app.get("/sitemap.xml", (req, res) => {
  const sitemapPath = [
    path.join(__dirname, "dist", "sitemap.xml"),
    path.join(__dirname, "public", "sitemap.xml")
  ].find((p) => fs.existsSync(p));
  if (sitemapPath) {
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.sendFile(sitemapPath);
  }
  res.status(404).end();
});
app.get("/google:code([a-zA-Z0-9_-]+).html", (req, res) => {
  const filename = `google${req.params.code}.html`;
  const customFile = [
    path.join(__dirname, "dist", filename),
    path.join(__dirname, "public", filename)
  ].find((p) => fs.existsSync(p));
  if (customFile) {
    return res.sendFile(customFile);
  }
  res.type("text/html").send(`google-site-verification: google${req.params.code}.html`);
});
var distDir = path.join(__dirname, "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Design Priv\xE9e server running on http://localhost:${PORT}`);
});

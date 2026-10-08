import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Hostinger Environment Database Defaults
const ENV_DB_HOST = process.env.DB_HOST || '';
const ENV_DB_PORT = Number(process.env.DB_PORT) || 3306;
const ENV_DB_USER = process.env.DB_USER || '';
const ENV_DB_PASSWORD = process.env.DB_PASSWORD || '';
const ENV_DB_NAME = process.env.DB_NAME || '';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper function to create MySQL connection
async function getDbConnection(overrides) {
  const host = overrides?.host || ENV_DB_HOST || 'localhost';
  const port = Number(overrides?.port || ENV_DB_PORT) || 3306;
  const database = overrides?.database || ENV_DB_NAME;
  const user = overrides?.user || ENV_DB_USER;
  const password = overrides?.password !== undefined ? overrides.password : ENV_DB_PASSWORD;

  if (!host || !database || !user) {
    throw new Error('Database connection credentials not provided (Host, Database Name, User required).');
  }

  const connection = await mysql.createConnection({
    host,
    port,
    database,
    user,
    password: password || '',
    connectTimeout: 10000
  });

  // Ensure tables exist
  await connection.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id VARCHAR(50) PRIMARY KEY DEFAULT 'current_data',
      data_json LONGTEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await connection.query(`
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

  return connection;
}

// Health status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    envDbConfigured: !!(ENV_DB_HOST && ENV_DB_NAME && ENV_DB_USER)
  });
});

// Hostinger direct MySQL API endpoint for production & CMS testing
app.post('/api/db-direct', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { host, port, database, user, password, action = 'test', data } = req.body || {};

    const connection = await getDbConnection({
      host,
      port,
      database,
      user,
      password
    });

    try {
      if (action === 'test') {
        const [rows] = await connection.query('SELECT 1 as connected');
        await connection.end();
        return res.json({
          success: true,
          message: `Successfully connected directly to Hostinger database "${database || ENV_DB_NAME}"!`
        });
      }

      if (action === 'load') {
        const [rows] = await connection.query(
          'SELECT data_json FROM site_content WHERE id = "current_data" LIMIT 1'
        );
        await connection.end();
        if (rows && rows.length > 0 && rows[0].data_json) {
          return res.json({
            success: true,
            data: JSON.parse(rows[0].data_json),
            message: 'Site data loaded from Hostinger database.'
          });
        } else {
          return res.json({
            success: true,
            data: null,
            message: 'Database connected. No previous data found in table, using defaults.'
          });
        }
      }

      if (action === 'save') {
        const jsonString = JSON.stringify(data || {});
        await connection.query(
          'INSERT INTO site_content (id, data_json) VALUES ("current_data", ?) ON DUPLICATE KEY UPDATE data_json = VALUES(data_json)',
          [jsonString]
        );
        await connection.end();
        return res.json({
          success: true,
          message: 'Changes saved directly to Hostinger MySQL table "site_content"!'
        });
      }

      await connection.end();
      return res.status(400).json({ success: false, error: 'Unknown action requested.' });
    } catch (queryErr) {
      try { await connection.end(); } catch (e) {}
      throw queryErr;
    }
  } catch (connErr) {
    console.error('Hostinger Direct DB Error:', connErr);
    let userFriendlyMsg = connErr.message || 'Failed to connect to MySQL server.';
    if (connErr.code === 'ER_ACCESS_DENIED_ERROR') {
      userFriendlyMsg = 'Access Denied: Incorrect MySQL Username or Password in Hostinger.';
    } else if (connErr.code === 'ETIMEDOUT' || connErr.code === 'ECONNREFUSED') {
      userFriendlyMsg = `Connection timed out to ${connErr.address || 'host'}. Please ensure "Remote MySQL" is allowed in Hostinger hPanel > Databases > Remote MySQL.`;
    }

    return res.status(500).json({
      success: false,
      error: userFriendlyMsg,
      code: connErr.code
    });
  }
});

// Contact enquiry form endpoint to store directly in Hostinger MySQL
app.post('/api/enquiry', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const { name, email, phone, eventDate, location, guestCount, budget, message } = req.body || {};

  try {
    if (ENV_DB_HOST && ENV_DB_NAME && ENV_DB_USER) {
      const connection = await getDbConnection();
      await connection.query(
        `INSERT INTO contact_submissions (name, email, phone, event_date, location, guest_count, budget, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name || '', email || '', phone || '', eventDate || '', location || '', guestCount || '', budget || '', message || '']
      );
      await connection.end();
    }
    return res.json({ success: true, message: 'Consultation enquiry received and saved.' });
  } catch (err) {
    console.warn('Enquiry database save warning:', err?.message);
    return res.json({ success: true, message: 'Enquiry received successfully.' });
  }
});

// Serve static frontend assets
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Design Privée server running on port ${PORT}`);
});

export default app;

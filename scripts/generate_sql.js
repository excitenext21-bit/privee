import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'data', 'site_content.json');
const content = fs.readFileSync(contentPath, 'utf-8');
const minified = JSON.stringify(JSON.parse(content));
const escaped = minified.replace(/'/g, "''");

const sql = `-- ========================================================
-- Design Privée Hostinger MySQL Initial Seed Script
-- Run this in Hostinger hPanel -> phpMyAdmin -> SQL tab
-- ========================================================

CREATE TABLE IF NOT EXISTS site_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'current_data',
  data_json LONGTEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- Seed all website content, portfolio items, and images into the database
INSERT INTO site_content (id, data_json)
VALUES ('current_data', '${escaped}')
ON DUPLICATE KEY UPDATE data_json = VALUES(data_json);
`;

fs.writeFileSync(path.join(process.cwd(), 'hostinger_database_seed.sql'), sql, 'utf-8');
console.log('hostinger_database_seed.sql created successfully! Size:', sql.length, 'bytes');

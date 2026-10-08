import { Plugin } from 'vite';
import mysql from 'mysql2/promise';

interface DbBody {
  host?: string;
  port?: number | string;
  database?: string;
  user?: string;
  password?: string;
  data?: any;
}

export function mysqlDirectPlugin(): Plugin {
  return {
    name: 'mysql-direct-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/db-direct', async (req, res) => {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          try {
            const body: DbBody & { action?: 'test' | 'load' | 'save' } = JSON.parse(bodyStr || '{}');
            const { host, port, database, user, password, action = 'test', data } = body;

            if (!host || !database || !user) {
              res.statusCode = 400;
              res.end(JSON.stringify({
                success: false,
                error: 'Missing required database connection fields (Host, Database Name, User).'
              }));
              return;
            }

            // Create direct MySQL connection with a short timeout
            const connection = await mysql.createConnection({
              host,
              port: Number(port) || 3306,
              database,
              user,
              password: password || '',
              connectTimeout: 8000,
              ssl: undefined // Hostinger MySQL default
            });

            try {
              // Ensure table exists
              await connection.query(`
                CREATE TABLE IF NOT EXISTS site_content (
                  id VARCHAR(50) PRIMARY KEY DEFAULT 'current_data',
                  data_json LONGTEXT NOT NULL,
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
              `);

              if (action === 'test') {
                // Test query
                const [rows] = await connection.query('SELECT 1 as connected');
                await connection.end();
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  message: `Successfully connected directly to Hostinger database "${database}" at ${host}!`
                }));
                return;
              }

              if (action === 'load') {
                const [rows]: any = await connection.query(
                  'SELECT data_json FROM site_content WHERE id = "current_data" LIMIT 1'
                );
                await connection.end();
                if (rows && rows.length > 0 && rows[0].data_json) {
                  res.statusCode = 200;
                  res.end(JSON.stringify({
                    success: true,
                    data: JSON.parse(rows[0].data_json),
                    message: 'Site data loaded from Hostinger database.'
                  }));
                } else {
                  res.statusCode = 200;
                  res.end(JSON.stringify({
                    success: true,
                    data: null,
                    message: 'Database connected. No previous data found, using local defaults.'
                  }));
                }
                return;
              }

              if (action === 'save') {
                const jsonString = JSON.stringify(data || {});
                await connection.query(
                  'INSERT INTO site_content (id, data_json) VALUES ("current_data", ?) ON DUPLICATE KEY UPDATE data_json = VALUES(data_json)',
                  [jsonString]
                );
                await connection.end();
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  message: `Changes saved directly to Hostinger MySQL table "site_content"!`
                }));
                return;
              }

              await connection.end();
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Unknown action' }));
            } catch (queryErr: any) {
              try { await connection.end(); } catch (e) {}
              throw queryErr;
            }
          } catch (connErr: any) {
            console.error('Direct DB Error:', connErr);
            let userFriendlyMsg = connErr.message || 'Failed to connect to MySQL server.';
            if (connErr.code === 'ER_ACCESS_DENIED_ERROR') {
              userFriendlyMsg = 'Access Denied: Incorrect MySQL Username or Password in Hostinger.';
            } else if (connErr.code === 'ETIMEDOUT' || connErr.code === 'ECONNREFUSED') {
              userFriendlyMsg = `Connection timed out to ${connErr.address || 'host'}. Please ensure "Remote MySQL" is allowed for % or your IP in Hostinger hPanel > Databases > Remote MySQL.`;
            } else if (connErr.code === 'ER_BAD_DB_ERROR') {
              userFriendlyMsg = `Database "${connErr.sqlMessage || ''}" does not exist in your Hostinger account.`;
            }
            res.statusCode = 500;
            res.end(JSON.stringify({
              success: false,
              error: userFriendlyMsg,
              code: connErr.code
            }));
          }
        });
      });
    }
  };
}

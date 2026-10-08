import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import {
  Database,
  Server,
  Key,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Code,
  ShieldCheck,
  HardDriveDownload,
  HardDriveUpload,
  Info
} from 'lucide-react';

export const SectionEditorDatabase: React.FC = () => {
  const { data, updateDbConfig, syncWithDatabase, publishToCloud } = useSiteData();
  const config = data.dbConfig || {
    enabled: false,
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    databaseName: '',
    username: '',
    password: '',
    apiUrl: '',
    apiKey: '',
    autoSync: true,
    status: 'disconnected'
  };

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'cloud' | 'direct' | 'deployment' | 'sql' | 'remote_guide'>('cloud');

  const handlePublishToCloud = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await publishToCloud();
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Failed to publish to cloud' });
    } finally {
      setTesting(false);
    }
  };

  const handleTestDirectConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await syncWithDatabase('test');
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Connection test failed' });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveToDatabase = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await syncWithDatabase('save');
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Failed to save to database' });
    } finally {
      setTesting(false);
    }
  };

  const handleLoadFromDatabase = async () => {
    if (!confirm('This will load saved data from your Hostinger database into the editor. Continue?')) {
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await syncWithDatabase('load');
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || 'Failed to load from database' });
    } finally {
      setTesting(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(label);
    setTimeout(() => setCopiedScript(null), 2500);
  };

  const sqlSchema = `-- ==========================================
-- 1. Create table in Hostinger phpMyAdmin
-- ==========================================
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
`;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-[#1A1918] text-[#FAF8F5] p-6 rounded-lg border border-[#C5B39C]/30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#C5B39C] text-[#1A1918] rounded flex items-center justify-center shrink-0">
              <Database size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B39C] font-mono">
                  DIRECT DATABASE CONNECTOR
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded font-mono">
                  No API Endpoint Required
                </span>
              </div>
              <h2 className="text-xl font-serif text-white font-bold mt-0.5">
                Hostinger MySQL Direct Connection
              </h2>
              <p className="text-xs text-[#A39282] mt-1">
                Enter your Hostinger Database IP, Database Name, User, and Password. We connect directly to your MySQL database without requiring any API URLs or third-party webhooks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleTestDirectConnection}
              disabled={testing}
              className="px-3.5 py-2 bg-[#C5B39C] hover:bg-white text-[#1A1918] text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow disabled:opacity-50"
            >
              <RefreshCw size={13} className={testing ? 'animate-spin' : ''} />
              <span>{testing ? 'Connecting...' : 'Test Connection'}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToDatabase}
              disabled={testing}
              className="px-3.5 py-2 bg-[#2D2A26] hover:bg-[#3D3A36] border border-[#C5B39C]/50 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow disabled:opacity-50"
            >
              <HardDriveUpload size={13} />
              <span>Push to Hostinger DB</span>
            </button>

            <button
              type="button"
              onClick={handleLoadFromDatabase}
              disabled={testing}
              className="px-3.5 py-2 bg-[#2D2A26] hover:bg-[#3D3A36] border border-[#C5B39C]/50 text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-all cursor-pointer shadow disabled:opacity-50"
            >
              <HardDriveDownload size={13} />
              <span>Pull from DB</span>
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="text-white/60">Connection Status:</span>
            {config.status === 'connected' ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 size={13} />
                Connected to Hostinger Database ({config.databaseName})
              </span>
            ) : config.status === 'error' ? (
              <span className="inline-flex items-center gap-1 text-red-400 font-medium">
                <AlertCircle size={13} />
                Disconnected / Error
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-amber-300 font-medium">
                <ShieldCheck size={13} />
                Ready to connect (Local state active)
              </span>
            )}
          </div>

          {config.lastConnected && (
            <span className="text-white/40 text-[11px]">
              Last verified: {config.lastConnected}
            </span>
          )}
        </div>

        {testResult && (
          <div
            className={`mt-3 p-3 rounded text-xs flex items-center gap-2 border ${
              testResult.success
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                : 'bg-red-950/60 border-red-800 text-red-200'
            }`}
          >
            {testResult.success ? <CheckCircle2 size={15} className="shrink-0" /> : <AlertCircle size={15} className="shrink-0" />}
            <span className="leading-snug">{testResult.message}</span>
          </div>
        )}
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center gap-2 border-b border-[#DDD8D0] pb-2 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('cloud')}
          className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === 'cloud'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <HardDriveUpload size={13} />
          <span>Universal Cloud Sync (All Visitors)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('direct')}
          className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === 'direct'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <Server size={13} />
          <span>Hostinger DB Credentials</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('deployment')}
          className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === 'deployment'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <HardDriveUpload size={13} />
          <span>Hostinger Deployment Guide</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('remote_guide')}
          className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === 'remote_guide'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <Info size={13} />
          <span>Remote MySQL Setup</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sql')}
          className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
            activeTab === 'sql'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <Code size={13} />
          <span>SQL Table Schema</span>
        </button>
      </div>

      {/* Tab 0: Universal Cloud Sync */}
      {activeTab === 'cloud' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#E8E2D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-2">
                <HardDriveUpload size={15} className="text-[#C5B39C]" />
                <span>Live Public Cloud Database &amp; Media Persistence</span>
              </h3>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                ● Live for all visitors worldwide
              </span>
            </div>

            <p className="text-xs text-[#555] leading-relaxed">
              When you save changes or upload images and videos in this CMS, they are instantly stored in the server's cloud storage. Any visitor loading the website on any phone, computer, or location around the world will immediately see all your published images, videos, and custom content without needing local browser configuration.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E2DDD2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#1A1918] uppercase tracking-wider">
                  Publish Current CMS Content to Cloud
                </h4>
                <p className="text-[11px] text-[#7A756C] mt-0.5">
                  Synchronize all your current section texts, branding, portfolio items, and media directly to the public live server database.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePublishToCloud}
                disabled={testing}
                className="px-4 py-2.5 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-2 transition-all cursor-pointer shadow disabled:opacity-50 shrink-0"
              >
                <HardDriveUpload size={14} className={testing ? 'animate-spin text-[#C5B39C]' : ''} />
                <span>{testing ? 'Publishing to Cloud...' : 'Publish to Cloud Now'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Direct Credentials */}
      {activeTab === 'direct' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#E8E2D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-2">
                <Server size={15} className="text-[#C5B39C]" />
                <span>Hostinger MySQL Database Credentials</span>
              </h3>
              <span className="text-[11px] text-[#777]">Fill in and click <b>Test Connection</b></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">
                  Database Host / Server IP <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={config.host}
                  onChange={(e) => updateDbConfig({ host: e.target.value })}
                  placeholder="e.g. 195.35.x.x or yourdomain.com or localhost"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none font-mono font-medium"
                />
                <span className="text-[10px] text-[#888] mt-1 block">
                  Found in Hostinger hPanel under <b>Databases &gt; MySQL Databases &gt; MySQL Host</b> (or your server's IP address).
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">
                  Port
                </label>
                <input
                  type="text"
                  value={config.port || '3306'}
                  onChange={(e) => updateDbConfig({ port: e.target.value })}
                  placeholder="3306"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none font-mono"
                />
                <span className="text-[10px] text-[#888] mt-1 block">
                  Default MySQL port is 3306.
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">
                  Database Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={config.databaseName}
                  onChange={(e) => updateDbConfig({ databaseName: e.target.value })}
                  placeholder="e.g. u123456789_vikrantt_db"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">
                  Database Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={config.username}
                  onChange={(e) => updateDbConfig({ username: e.target.value })}
                  placeholder="e.g. u123456789_dbuser"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none font-mono font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold text-[#555] mb-1 flex items-center gap-1">
                  <Key size={12} />
                  <span>Database Password <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="password"
                  value={config.password || ''}
                  onChange={(e) => updateDbConfig({ password: e.target.value })}
                  placeholder="Enter your Hostinger MySQL database password"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none font-mono"
                />
              </div>

              <div className="md:col-span-2 pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleTestDirectConnection}
                  disabled={testing}
                  className="px-4 py-2.5 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-2 transition-all cursor-pointer shadow disabled:opacity-50"
                >
                  <RefreshCw size={13} className={testing ? 'animate-spin text-[#C5B39C]' : ''} />
                  <span>{testing ? 'Testing & Storing...' : 'Save & Test DB Connection'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveToDatabase}
                  disabled={testing}
                  className="px-4 py-2.5 bg-[#C5B39C] hover:bg-white text-[#1A1918] text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-2 transition-all cursor-pointer shadow disabled:opacity-50"
                >
                  <HardDriveUpload size={14} />
                  <span>Push Current Content to DB</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
              <Info size={15} className="text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Automatic Server-Side Connection</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Once connected, your credentials are saved on the server. Whenever anyone visits the website from any device, country, or browser, the server automatically connects and loads the live database content seamlessly without requiring you to re-open the admin panel or refresh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Hostinger Deployment Guide */}
      {activeTab === 'deployment' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#E8E2D9] space-y-6 text-xs text-[#3A3835]">
            <div className="border-b border-[#E8E2D9] pb-3">
              <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[#1A1918]">
                Hostinger Deployment Guide (Ready for Production)
              </h3>
              <p className="text-xs text-[#7A756C] mt-0.5">
                Your application has been pre-configured with direct Hostinger MySQL support, Apache SPA rewrites (.htaccess), and a PHP/Node.js API bridge.
              </p>
            </div>

            {/* Secret Admin Login Reminder */}
            <div className="bg-[#FAF8F5] p-4 rounded border border-[#C5B39C]/40 space-y-2">
              <span className="font-bold text-[#1A1918] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck size={14} className="text-[#C5B39C]" />
                How to Access Admin CMS on Your Live Site (No Front-End Button)
              </span>
              <p className="text-xs leading-relaxed text-[#5A554E]">
                The public "ADMIN" button in the footer has been completely hidden from visitors. To log in as administrator on your live site, use any of these discrete methods:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 bg-white rounded border border-[#DDD8D0]">
                  <span className="font-semibold block text-[#1A1918] mb-1">1. Direct URL Hash</span>
                  <p className="text-[11px] text-[#7A756C]">
                    Navigate to <code className="bg-[#FAF8F5] px-1 py-0.5 rounded font-mono text-[#1A1918]">yoursite.com/#admin</code> in your browser.
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded border border-[#DDD8D0]">
                  <span className="font-semibold block text-[#1A1918] mb-1">2. Keyboard Shortcut</span>
                  <p className="text-[11px] text-[#7A756C]">
                    Press <kbd className="bg-[#FAF8F5] border px-1 rounded font-mono font-bold text-[#1A1918]">Ctrl + Shift + A</kbd> (or <kbd className="bg-[#FAF8F5] border px-1 rounded font-mono font-bold text-[#1A1918]">Cmd + Shift + A</kbd> on Mac).
                  </p>
                </div>
                <div className="p-2.5 bg-white rounded border border-[#DDD8D0]">
                  <span className="font-semibold block text-[#1A1918] mb-1">3. Triple-Click Footer Logo</span>
                  <p className="text-[11px] text-[#7A756C]">
                    Triple-click the center "DESIGN PRIVÉE" logo in the footer or hold <kbd className="bg-[#FAF8F5] border px-1 rounded font-mono text-[#1A1918]">Alt</kbd> while clicking.
                  </p>
                </div>
              </div>
            </div>

            {/* Option A: Hostinger Node.js Application */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1918] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1A1918] text-white flex items-center justify-center text-[10px] font-mono">A</span>
                Option 1: Deploying to Hostinger Node.js Web App / VPS (Recommended)
              </h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>Run <code className="bg-[#FAF8F5] border px-1.5 py-0.5 rounded font-mono text-[#1A1918]">npm run build</code> to produce production assets in the <code className="font-mono">dist/</code> folder.</li>
                <li>In Hostinger hPanel, go to <b>Websites &gt; Node.js</b> (or VPS).</li>
                <li>Set Application Root to your upload folder, and Startup File to <code className="font-mono bg-[#FAF8F5] px-1 py-0.5 border">server.ts</code> (or <code className="font-mono bg-[#FAF8F5] px-1 py-0.5 border">node server.ts</code> with <code className="font-mono">tsx</code>).</li>
                <li>In Hostinger Environment Variables, add:
                  <ul className="list-disc pl-5 mt-1 space-y-1 font-mono text-[11px] text-[#333]">
                    <li><code>DB_HOST=localhost</code> (or your Hostinger MySQL IP)</li>
                    <li><code>DB_PORT=3306</code></li>
                    <li><code>DB_USER=your_hostinger_user</code></li>
                    <li><code>DB_PASSWORD=your_password</code></li>
                    <li><code>DB_NAME=your_database_name</code></li>
                    <li><code>PORT=3000</code></li>
                  </ul>
                </li>
                <li>Start the application. All site content and contact form inquiries will sync directly to your Hostinger MySQL tables.</li>
              </ol>
            </div>

            {/* Option B: Hostinger Shared Hosting (Apache + PHP + MySQL) */}
            <div className="space-y-3 pt-3 border-t border-[#E8E2D9]">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1A1918] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C5B39C] text-[#1A1918] flex items-center justify-center text-[10px] font-mono">B</span>
                Option 2: Deploying to Hostinger Shared Web Hosting (cPanel / public_html)
              </h4>
              <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                <li>Run <code className="bg-[#FAF8F5] border px-1.5 py-0.5 rounded font-mono text-[#1A1918]">npm run build</code>.</li>
                <li>Upload all files inside the <code className="font-mono bg-[#FAF8F5] px-1 py-0.5 border">dist/</code> directory directly into your Hostinger <b>public_html</b> directory via Hostinger File Manager or FTP.</li>
                <li>The build already contains <code className="font-mono">.htaccess</code> (for clean URL routing) and <code className="font-mono">api.php</code> (for database sync & contact form submissions).</li>
                <li>In Hostinger <b>phpMyAdmin</b>, run the SQL schema from the <b>SQL Table Schema</b> tab to create your tables.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Remote MySQL Quick Guide */}
      {activeTab === 'remote_guide' && (
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D9] space-y-4 text-xs text-[#444]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] border-b border-[#E8E2D9] pb-2">
            Allowing Direct MySQL Connections in Hostinger (1 Minute Setup)
          </h3>
          <p className="leading-relaxed">
            By default, Hostinger protects databases from external connections. To allow Google AI Studio to connect directly:
          </p>
          <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
            <li>Log in to your <b>Hostinger hPanel</b>.</li>
            <li>In the left sidebar, navigate to <b>Databases &gt; Remote MySQL</b>.</li>
            <li>In the <b>IP (IPv4 or IPv6)</b> field, type: <code className="bg-[#FAF8F5] border px-1.5 py-0.5 font-bold font-mono text-[#1A1918]">%</code> (Percentage symbol allows any external IP, or you can specify your IP).</li>
            <li>In the <b>Database</b> dropdown, select your database (e.g. <code>u123456789_vikrantt_db</code>).</li>
            <li>Click <b>Create / Save</b>.</li>
            <li>Come back here, enter your credentials, and click <b>Test Connection</b>!</li>
          </ol>
        </div>
      )}

      {/* Tab 3: SQL Schema */}
      {activeTab === 'sql' && (
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D9] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918]">
                Hostinger MySQL Schema
              </h3>
              <p className="text-xs text-[#666] mt-0.5">
                Paste this into Hostinger phpMyAdmin to create the table structure.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(sqlSchema, 'sql')}
              className="px-3 py-1.5 bg-[#1A1918] hover:bg-[#333] text-white text-xs rounded flex items-center gap-1.5 cursor-pointer"
            >
              {copiedScript === 'sql' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedScript === 'sql' ? 'Copied!' : 'Copy SQL'}</span>
            </button>
          </div>

          <pre className="bg-[#1A1918] text-[#FAF8F5] p-4 rounded text-xs font-mono overflow-x-auto leading-relaxed border border-[#333]">
            {sqlSchema}
          </pre>
        </div>
      )}
    </div>
  );
};

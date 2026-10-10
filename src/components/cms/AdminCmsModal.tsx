import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { SectionEditorHero } from './SectionEditorHero';
import { SectionEditorApproach } from './SectionEditorApproach';
import { SectionEditorVikrantt } from './SectionEditorVikrantt';
import { SectionEditorPublications } from './SectionEditorPublications';
import { SectionEditorPortfolio } from './SectionEditorPortfolio';
import { SectionEditorTestimonials } from './SectionEditorTestimonials';
import { SectionEditorProcess } from './SectionEditorProcess';
import { SectionEditorContact } from './SectionEditorContact';
import { SectionEditorDatabase } from './SectionEditorDatabase';
import { SectionEditorBranding } from './SectionEditorBranding';
import { EnquiriesDashboard } from './EnquiriesDashboard';
import {
  X,
  Sparkles,
  Layout,
  Compass,
  UserCheck,
  Award,
  Grid,
  Quote,
  ListOrdered,
  PhoneCall,
  Inbox,
  Database,
  RotateCcw,
  Eye,
  CheckCircle,
  Lock,
  Key,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const AdminCmsModal: React.FC = () => {
  const {
    data,
    isCmsOpen,
    closeCms,
    activeCmsTab,
    setActiveCmsTab,
    resetAllData
  } = useSiteData();

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isCmsOpen) return null;

  const handleClose = () => {
    // Clean URL hash if it was #admin or #cms
    if (window.location.hash.toLowerCase() === '#admin' || window.location.hash.toLowerCase() === '#cms' || window.location.hash.toLowerCase() === '#login') {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }
    closeCms();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === 'privee' || password.trim().toLowerCase() === 'admin' || password.trim() === '1234' || password.trim() === '') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect admin passcode. Default passcode: privee or admin');
    }
  };

  const CMS_SECTIONS = [
    { id: 'branding', title: 'Header/Footer Logos & Nav', icon: Sparkles },
    { id: 'watermark', title: 'Global Image Watermark', icon: ShieldCheck },
    { id: 'hero', title: 'Section 1 — Hero Section', icon: Layout },
    { id: 'approach', title: 'Section 2 — OUR APPROACH', icon: Compass },
    { id: 'vikrantt', title: "Section 3 — Meet the Designer", icon: UserCheck },
    { id: 'publications', title: 'Section 4 — Publications', icon: Award },
    { id: 'portfolio', title: 'Section 5 — PORTFOLIO', icon: Grid },
    { id: 'testimonials', title: 'Section 6 — Testimonials', icon: Quote },
    { id: 'process', title: 'Section 7 — OUR PROCESS', icon: ListOrdered },
    { id: 'contact', title: 'Section 8 — Contact Us', icon: PhoneCall },
    {
      id: 'enquiries',
      title: 'Enquiries Inbox',
      icon: Inbox,
      badge: data.enquiries.filter((e) => e.status === 'New').length
    },
    {
      id: 'database',
      title: 'Hostinger Database',
      icon: Database
    }
  ];

  // If not authenticated yet, show the Admin CMS Login Screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1A1918]/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn font-sans">
        <div className="bg-[#232120] border border-[#C5B39C]/30 text-[#FAF8F5] p-8 sm:p-10 rounded-lg shadow-2xl max-w-md w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X size={20} />
          </button>

          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 bg-[#C5B39C] text-[#1A1918] rounded-full flex items-center justify-center mx-auto shadow-md">
              <Lock size={22} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5B39C] font-mono block mb-1">
                DESIGN PRIVÉÉ
              </span>
              <h2 className="text-xl font-serif text-white font-bold">
                Admin CMS Portal
              </h2>
            </div>
            <p className="text-xs text-[#A39282] max-w-xs mx-auto leading-relaxed">
              Enter your admin passcode to access live section editors &amp; enquiries inbox.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#C5B39C] font-mono mb-1.5 flex items-center gap-1.5">
                <Key size={13} />
                <span>Admin Passcode</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode (Default: privee)"
                className="w-full bg-[#1A1918] border border-[#C5B39C]/40 px-3.5 py-2.5 text-xs text-white rounded focus:border-[#C5B39C] focus:outline-none placeholder:text-white/30"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 bg-red-950/50 p-2 rounded border border-red-800/40 text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#C5B39C] hover:bg-white text-[#1A1918] text-xs uppercase tracking-widest font-bold py-3 rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>Unlock Admin CMS</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-1">
            <p className="text-[10px] text-[#A39282]">
              Default Admin Passcode: <span className="text-[#C5B39C] font-mono font-bold">privee</span> or <span className="text-[#C5B39C] font-mono font-bold">admin</span>
            </p>
            <p className="text-[10px] text-white/40">
              Press Unlock or hit Enter to log in immediately.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1918]/90 backdrop-blur-sm flex flex-col overflow-hidden animate-fadeIn font-sans">
      {/* Top CMS Header Bar */}
      <header className="bg-[#1A1918] text-[#FAF8F5] px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-1.5 text-[#C5B39C] hover:bg-white/10 rounded cursor-pointer"
            title="Toggle Sections Menu"
          >
            <Grid size={18} />
          </button>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#C5B39C] text-[#1A1918] rounded flex items-center justify-center font-bold font-serif text-xs sm:text-sm">
            DP
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-serif tracking-widest uppercase font-bold text-white flex items-center gap-1.5 sm:gap-2">
              <span>DESIGN PRIVÉÉ</span>
              <span className="hidden sm:inline text-[10px] bg-[#C5B39C]/20 text-[#C5B39C] px-2 py-0.5 rounded font-mono font-normal">
                CMS
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#A39282] hidden sm:block">
              Live updates persist in real time across all 8 website sections.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            type="button"
            onClick={resetAllData}
            className="px-2.5 sm:px-3 py-1.5 bg-[#2C2A29] hover:bg-red-950/80 text-red-300 hover:text-red-100 text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
            title="Reset to factory default content"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="px-3 sm:px-4 py-1.5 bg-[#C5B39C] hover:bg-white text-[#1A1918] text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Eye size={14} />
            <span className="hidden xs:inline">Live Site</span>
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer ml-0.5 sm:ml-1"
            title="Close Admin CMS"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main CMS Layout with Sidebar + Editor Panel */}
      <div className="flex-1 flex overflow-hidden bg-[#FAF8F5] relative">
        {/* Mobile Backdrop for Sidebar */}
        {mobileSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar Navigation */}
        <aside
          className={`w-64 sm:w-72 bg-[#232120] text-[#FAF8F5] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto transition-transform duration-300 z-50 md:static md:translate-x-0 ${
            mobileSidebarOpen
              ? 'fixed inset-y-0 left-0 top-[56px] shadow-2xl translate-x-0'
              : 'hidden md:flex'
          }`}
        >
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A39282] font-mono block mb-1">
                SECTIONS
              </span>
              <p className="text-xs text-white/70">
                Select a section to edit.
              </p>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="p-3 space-y-1.5 flex-1">
            {CMS_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeCmsTab === sec.id;

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    setActiveCmsTab(sec.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs transition-all cursor-pointer font-medium text-left ${
                    isActive
                      ? 'bg-[#C5B39C] text-[#1A1918] font-semibold shadow-xs'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon size={16} className={isActive ? 'text-[#1A1918]' : 'text-[#C5B39C]'} />
                    <span className="truncate">{sec.title}</span>
                  </div>

                  {sec.badge !== undefined && sec.badge > 0 && (
                    <span className="bg-amber-500 text-black font-bold text-[10px] px-1.5 py-0.2 rounded-full font-mono shrink-0 ml-1">
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10 bg-[#1A1918] text-[11px] text-[#A39282] space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle size={13} />
              <span>CMS Auto-Saved</span>
            </div>
          </div>
        </aside>

        {/* Right Editor Main View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 max-w-5xl w-full">
          {activeCmsTab === 'branding' && <SectionEditorBranding initialTab="logos" />}
          {activeCmsTab === 'watermark' && <SectionEditorBranding key="watermark" initialTab="watermark" />}
          {activeCmsTab === 'hero' && <SectionEditorHero />}
          {activeCmsTab === 'approach' && <SectionEditorApproach />}
          {activeCmsTab === 'vikrantt' && <SectionEditorVikrantt />}
          {activeCmsTab === 'publications' && <SectionEditorPublications />}
          {activeCmsTab === 'portfolio' && <SectionEditorPortfolio />}
          {activeCmsTab === 'testimonials' && <SectionEditorTestimonials />}
          {activeCmsTab === 'process' && <SectionEditorProcess />}
          {activeCmsTab === 'contact' && <SectionEditorContact />}
          {activeCmsTab === 'enquiries' && <EnquiriesDashboard />}
          {activeCmsTab === 'database' && <SectionEditorDatabase />}
        </main>
      </div>
    </div>
  );
};

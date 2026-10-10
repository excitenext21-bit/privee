import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { ImageUploader } from './ImageUploader';
import { TextStyleControls } from './TextStyleControls';
import { WatermarkOverlay } from '../WatermarkOverlay';
import {
  Sparkles,
  Image as ImageIcon,
  Compass,
  Sliders,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Globe,
  SlidersHorizontal,
  Layers,
  HelpCircle,
  ShieldCheck,
  Type,
  Droplet,
  Eye,
  Check
} from 'lucide-react';
import { NavItem, WatermarkConfig } from '../../types';

interface SectionEditorBrandingProps {
  initialTab?: 'logos' | 'watermark' | 'nav' | 'typography';
}

export const SectionEditorBranding: React.FC<SectionEditorBrandingProps> = ({ initialTab = 'logos' }) => {
  const { data, updateBranding } = useSiteData();
  const branding = data.branding || {
    siteTitle: 'Design Privéé by Vikrantt | Premier Wedding Design & Decor Company',
    faviconUrl: '',
    headerLogoUrl: '',
    headerLogoWidth: 190,
    headerLogoMaxHeight: 55,
    footerLogoUrl: '',
    footerLogoWidth: 200,
    footerLogoMaxHeight: 65,
    watermark: {
      enabled: true,
      type: 'text',
      text: 'DESIGN PRIVÉÉ',
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
  };

  const watermark: WatermarkConfig = branding.watermark || {
    enabled: true,
    type: 'text',
    text: 'DESIGN PRIVÉÉ',
    customImageUrl: '',
    opacity: 0.22,
    position: 'bottom-right',
    size: 'medium',
    colorTheme: 'light',
    fontFamily: 'serif',
    letterSpacing: '0.28em',
    showBorder: false
  };

  const [activeTab, setActiveTab] = useState<'logos' | 'watermark' | 'nav' | 'typography'>(initialTab);

  const updateWatermarkSettings = (partial: Partial<WatermarkConfig>) => {
    updateBranding({
      watermark: {
        ...watermark,
        ...partial
      }
    });
  };

  const handleAddNavItem = () => {
    const newId = `nav-${Date.now()}`;
    const newItems: NavItem[] = [
      ...branding.navItems,
      { id: newId, name: 'NEW LINK', href: '#contact' }
    ];
    updateBranding({ navItems: newItems });
  };

  const handleUpdateNavItem = (index: number, partial: Partial<NavItem>) => {
    const updated = [...branding.navItems];
    updated[index] = { ...updated[index], ...partial };
    updateBranding({ navItems: updated });
  };

  const handleRemoveNavItem = (index: number) => {
    const updated = branding.navItems.filter((_, i) => i !== index);
    updateBranding({ navItems: updated });
  };

  const handleMoveNavItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...branding.navItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    updateBranding({ navItems: newItems });
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-[#1A1918] text-[#FAF8F5] p-6 rounded-lg border border-[#C5B39C]/30 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-[#C5B39C] text-[#1A1918] rounded flex items-center justify-center shrink-0">
            <Sparkles size={22} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5B39C] font-mono">
              GLOBAL SITE BRANDING &amp; WATERMARK
            </span>
            <h2 className="text-xl font-serif text-white font-bold mt-0.5">
              Brand Identity, Watermark &amp; Navigation Menu
            </h2>
            <p className="text-xs text-[#A39282] mt-1">
              Configure global transparent watermarks across all website photography, upload custom Header &amp; Footer logos, edit navigation menu links, and customize typography.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DDD8D0] pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('logos')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'logos'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <ImageIcon size={13} />
          <span>Logos &amp; Favicon</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('watermark')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'watermark'
              ? 'bg-[#1A1918] text-[#C5B39C] border border-[#C5B39C]/50'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <ShieldCheck size={13} className={activeTab === 'watermark' ? 'text-[#C5B39C]' : ''} />
          <span>Image Watermark &amp; Protection</span>
          {watermark.enabled && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('nav')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'nav'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <Compass size={13} />
          <span>Navigation Menu Links</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('typography')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
            activeTab === 'typography'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#555] border border-[#DDD8D0] hover:bg-[#F0ECE6]'
          }`}
        >
          <SlidersHorizontal size={13} />
          <span>Menu Typography</span>
        </button>
      </div>

      {/* TAB: WATERMARK & PROTECTION */}
      {activeTab === 'watermark' && (
        <div className="space-y-6">
          {/* Master Enable Watermark Toggle */}
          <div className="bg-[#FAF8F5] p-5 rounded-lg border-2 border-[#C5B39C]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${watermark.enabled ? 'bg-[#1A1918] text-[#C5B39C]' : 'bg-[#E0DDD7] text-[#888]'}`}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-2">
                  <span>Global Image Watermark</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-normal ${watermark.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'}`}>
                    {watermark.enabled ? 'ACTIVE ON ALL PHOTOS' : 'DISABLED'}
                  </span>
                </h4>
                <p className="text-xs text-[#666] mt-0.5">
                  Applies a soft, transparent watermark across all images (Hero, Approach, Vikrantt, Portfolio, Contact &amp; Lightbox modal) to protect your brand imagery.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={watermark.enabled}
                onChange={(e) => updateWatermarkSettings({ enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1918]"></div>
            </label>
          </div>

          {watermark.enabled && (
            <>
              {/* Dual-Image Live Preview Box */}
              <div className="bg-[#1A1918] text-[#FAF8F5] p-5 rounded-lg border border-[#C5B39C]/30 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Eye size={15} className="text-[#C5B39C]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Live Watermark Preview (Dark &amp; Light Photography)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#C5B39C]">
                    Opacity: {Math.round((watermark.opacity || 0.22) * 100)}% • Position: {watermark.position}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Dark Photo Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#A39282] font-mono">
                      Dark Luxury Reception Photo
                    </span>
                    <div className="relative aspect-4/3 rounded overflow-hidden shadow-inner bg-black border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                        alt="Dark Event Preview"
                        className="w-full h-full object-cover"
                      />
                      <WatermarkOverlay />
                    </div>
                  </div>

                  {/* Light Photo Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#A39282] font-mono">
                      Light Floral &amp; Bridal Photo
                    </span>
                    <div className="relative aspect-4/3 rounded overflow-hidden shadow-inner bg-white border border-white/10">
                      <img
                        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
                        alt="Light Event Preview"
                        className="w-full h-full object-cover"
                      />
                      <WatermarkOverlay />
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark Configuration Controls */}
              <div className="bg-white p-5 rounded-lg border border-[#E8E2D9] space-y-6">
                {/* 1. Watermark Type Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1A1918] block">
                    1. Watermark Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateWatermarkSettings({ type: 'text' })}
                      className={`p-3 rounded-lg border text-left flex items-start gap-3 cursor-pointer transition-all ${
                        watermark.type === 'text'
                          ? 'border-[#1A1918] bg-[#FAF8F5] ring-1 ring-[#1A1918]'
                          : 'border-[#DDD8D0] hover:bg-[#F9F7F4]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${watermark.type === 'text' ? 'bg-[#1A1918] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <Type size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1918] flex items-center gap-1.5">
                          <span>Stylized Brand Text</span>
                          {watermark.type === 'text' && <Check size={12} className="text-[#C5B39C]" />}
                        </div>
                        <p className="text-[11px] text-[#666] mt-0.5">
                          Clean, elegant luxury serif or sans text watermark ("DESIGN PRIVÉÉ").
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateWatermarkSettings({ type: 'image' })}
                      className={`p-3 rounded-lg border text-left flex items-start gap-3 cursor-pointer transition-all ${
                        watermark.type === 'image'
                          ? 'border-[#1A1918] bg-[#FAF8F5] ring-1 ring-[#1A1918]'
                          : 'border-[#DDD8D0] hover:bg-[#F9F7F4]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${watermark.type === 'image' ? 'bg-[#1A1918] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <ImageIcon size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1918] flex items-center gap-1.5">
                          <span>Upload Custom Logo / Image</span>
                          {watermark.type === 'image' && <Check size={12} className="text-[#C5B39C]" />}
                        </div>
                        <p className="text-[11px] text-[#666] mt-0.5">
                          Upload your custom logo PNG (with transparency), monogram, or signature.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Mode-Specific Details */}
                {watermark.type === 'text' ? (
                  <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#1A1918] mb-1">
                        Watermark Text
                      </label>
                      <input
                        type="text"
                        value={watermark.text || ''}
                        onChange={(e) => updateWatermarkSettings({ text: e.target.value })}
                        placeholder="DESIGN PRIVÉÉ"
                        className="w-full px-3 py-2 text-sm border border-[#CCC] rounded bg-white focus:outline-none focus:border-[#1A1918] tracking-widest font-serif"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#1A1918] mb-1">
                          Font Typography
                        </label>
                        <select
                          value={watermark.fontFamily || 'serif'}
                          onChange={(e) => updateWatermarkSettings({ fontFamily: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs border border-[#CCC] rounded bg-white focus:outline-none focus:border-[#1A1918]"
                        >
                          <option value="serif">Cormorant Garamond (Editorial Luxury Serif)</option>
                          <option value="sans">Karla (Minimalist Modern Sans)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#1A1918] mb-1">
                          Color Tone
                        </label>
                        <select
                          value={watermark.colorTheme || 'light'}
                          onChange={(e) => updateWatermarkSettings({ colorTheme: e.target.value as any })}
                          className="w-full px-3 py-2 text-xs border border-[#CCC] rounded bg-white focus:outline-none focus:border-[#1A1918]"
                        >
                          <option value="light">Crisp Light / White (Best for all photos)</option>
                          <option value="gold">Warm Champagne Gold (#D8C7B0)</option>
                          <option value="dark">Charcoal / Dark Ink (#1A1918)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#1A1918] mb-1">
                        Upload Custom Watermark Image / Logo
                      </label>
                      <p className="text-[11px] text-[#666] mb-3">
                        Upload a PNG file with transparent background, white monogram, or SVG logo.
                      </p>
                    </div>

                    <ImageUploader
                      label="Custom Watermark Graphic / Monogram"
                      value={watermark.customImageUrl || ''}
                      currentUrl={watermark.customImageUrl || ''}
                      onChangeUrl={(url) => updateWatermarkSettings({ customImageUrl: url })}
                      helpText="Supports transparent PNG, SVG, JPG, WebP files"
                      showGrayscaleOption={false}
                    />

                    {/* Quick Preset / Clear buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8E2D9]">
                      <span className="text-[11px] text-[#7A756C] font-medium">Quick Presets:</span>
                      <button
                        type="button"
                        onClick={() => updateWatermarkSettings({
                          customImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300'
                        })}
                        className="text-[11px] px-2.5 py-1 bg-white border border-[#DDD8D0] hover:border-[#1A1918] rounded text-[#333] transition-colors cursor-pointer"
                      >
                        Sample Graphic Logo
                      </button>
                      {watermark.customImageUrl && (
                        <button
                          type="button"
                          onClick={() => updateWatermarkSettings({ customImageUrl: '' })}
                          className="text-[11px] px-2.5 py-1 bg-white border border-red-200 hover:border-red-400 text-red-600 rounded transition-colors cursor-pointer"
                        >
                          Clear Custom Graphic
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Opacity / Transparency Slider */}
                <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
                      <Droplet size={14} className="text-[#C5B39C]" />
                      <span>Watermark Transparency / Shade (Opacity)</span>
                    </label>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 bg-[#1A1918] text-[#C5B39C] rounded">
                      {Math.round((watermark.opacity || 0.22) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.80"
                    step="0.01"
                    value={watermark.opacity ?? 0.22}
                    onChange={(e) => updateWatermarkSettings({ opacity: parseFloat(e.target.value) })}
                    className="w-full accent-[#1A1918] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#888]">
                    <span>Ultra-Subtle &amp; Transparent (5%)</span>
                    <span>Recommended (20% - 25%)</span>
                    <span>Solid / High Contrast (80%)</span>
                  </div>
                </div>

                {/* 4. Placement & Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8E2D9]">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1918] mb-1.5">
                      Watermark Position
                    </label>
                    <select
                      value={watermark.position || 'bottom-right'}
                      onChange={(e) => updateWatermarkSettings({ position: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs border border-[#CCC] rounded bg-white focus:outline-none focus:border-[#1A1918]"
                    >
                      <option value="bottom-right">Bottom-Right Corner (Discreet &amp; Classic)</option>
                      <option value="bottom-left">Bottom-Left Corner</option>
                      <option value="top-right">Top-Right Corner</option>
                      <option value="center">Center</option>
                      <option value="diagonal-center">Diagonal Angled Center (Atelier Proof)</option>
                      <option value="repeat-subtle">Subtle Diagonal Repeat Grid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1918] mb-1.5">
                      Watermark Size
                    </label>
                    <select
                      value={watermark.size || 'medium'}
                      onChange={(e) => updateWatermarkSettings({ size: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs border border-[#CCC] rounded bg-white focus:outline-none focus:border-[#1A1918]"
                    >
                      <option value="small">Small / Subtle</option>
                      <option value="medium">Medium / Standard</option>
                      <option value="large">Large / Prominent</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 1: LOGOS & FAVICON */}
      {activeTab === 'logos' && (
        <div className="space-y-6">
          {/* Global Auto Proportional Aspect Ratio Toggle for Both Logos */}
          <div className="bg-[#FAF8F5] p-4 rounded-lg border-2 border-[#C5B39C]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A1918] text-[#C5B39C] flex items-center justify-center shrink-0">
                <Sliders size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1918]">
                  Auto-Proportional Height Toggle (Both Logos)
                </h4>
                <p className="text-xs text-[#666] mt-0.5">
                  When enabled, both Header &amp; Footer logo heights automatically scale in perfect proportion to the selected width.
                </p>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={branding.autoHeightProportional !== false}
                onChange={(e) => updateBranding({ autoHeightProportional: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#DDD8D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#DDD8D0] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A1918]"></div>
              <span className="ml-2.5 text-xs font-semibold text-[#1A1918]">
                {branding.autoHeightProportional !== false ? 'Auto Proportional ON' : 'Manual Max-Height'}
              </span>
            </label>
          </div>

          {/* Site Title & Favicon Card */}
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D9] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5 border-b border-[#E8E2D9] pb-2">
              <Globe size={14} className="text-[#C5B39C]" />
              <span>Browser Tab Settings (Favicon &amp; Title)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#555] mb-1">
                  Website SEO Title
                </label>
                <input
                  type="text"
                  value={branding.siteTitle || ''}
                  onChange={(e) => updateBranding({ siteTitle: e.target.value })}
                  placeholder="Design Privéé by Vikrantt | Premier Wedding Design & Decor Company"
                  className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <ImageUploader
                  label="Favicon (.ico / .png / .svg)"
                  value={branding.faviconUrl || ''}
                  onChangeUrl={(url) => updateBranding({ faviconUrl: url })}
                  showGrayscaleOption={false}
                />
              </div>
            </div>
          </div>

          {/* Header Logo Card */}
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D9] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
                <ImageIcon size={14} className="text-[#C5B39C]" />
                <span>Header Brand Logo &amp; Size</span>
              </h3>
              <span className="text-[11px] text-[#777]">Displayed on top navigation bar (White/Light theme)</span>
            </div>

            <ImageUploader
              label="Header Logo Image (PNG / SVG with transparent background recommended)"
              value={branding.headerLogoUrl || ''}
              onChangeUrl={(url) => updateBranding({ headerLogoUrl: url })}
              showGrayscaleOption={false}
            />

            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E8E2D9] space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[#555]">
                    Header Logo Width: <span className="text-[#1A1918] font-bold">{branding.headerLogoWidth || 190}px</span>
                  </label>
                  {branding.autoHeightProportional !== false && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono font-medium">
                      Height auto-adjusts in proportion
                    </span>
                  )}
                </div>
                <input
                  type="range"
                  min="80"
                  max="380"
                  step="5"
                  value={branding.headerLogoWidth || 190}
                  onChange={(e) => updateBranding({ headerLogoWidth: Number(e.target.value) })}
                  className="w-full accent-[#1A1918] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#888] mt-0.5 font-mono">
                  <span>80px</span>
                  <span>190px (Default)</span>
                  <span>380px</span>
                </div>
              </div>

              {branding.autoHeightProportional === false && (
                <div className="pt-3 border-t border-[#DDD8D0]">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-[#555]">
                      Header Logo Max Height: <span className="text-[#1A1918] font-bold">{branding.headerLogoMaxHeight || 55}px</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="2"
                    value={branding.headerLogoMaxHeight || 55}
                    onChange={(e) => updateBranding({ headerLogoMaxHeight: Number(e.target.value) })}
                    className="w-full accent-[#1A1918] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-[#888] mt-0.5 font-mono">
                    <span>20px</span>
                    <span>55px (Default)</span>
                    <span>120px</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Logo Card */}
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D9] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
                <ImageIcon size={14} className="text-[#C5B39C]" />
                <span>Footer Brand Logo &amp; Size</span>
              </h3>
              <span className="text-[11px] text-[#777]">Displayed in Dark Footer column</span>
            </div>

            <ImageUploader
              label="Footer Logo Image (Light/White version recommended for dark footer)"
              value={branding.footerLogoUrl || ''}
              onChangeUrl={(url) => updateBranding({ footerLogoUrl: url })}
              showGrayscaleOption={false}
            />

            <div className="bg-[#FAF8F5] p-4 rounded border border-[#E8E2D9] space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-[#555]">
                    Footer Logo Width: <span className="text-[#1A1918] font-bold">{branding.footerLogoWidth || 200}px</span>
                  </label>
                  {branding.autoHeightProportional !== false && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-mono font-medium">
                      Height auto-adjusts in proportion
                    </span>
                  )}
                </div>
                <input
                  type="range"
                  min="100"
                  max="400"
                  step="5"
                  value={branding.footerLogoWidth || 200}
                  onChange={(e) => updateBranding({ footerLogoWidth: Number(e.target.value) })}
                  className="w-full accent-[#1A1918] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#888] mt-0.5 font-mono">
                  <span>100px</span>
                  <span>200px (Default)</span>
                  <span>400px</span>
                </div>
              </div>

              {branding.autoHeightProportional === false && (
                <div className="pt-3 border-t border-[#DDD8D0]">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-[#555]">
                      Footer Logo Max Height: <span className="text-[#1A1918] font-bold">{branding.footerLogoMaxHeight || 65}px</span>
                    </label>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="140"
                    step="2"
                    value={branding.footerLogoMaxHeight || 65}
                    onChange={(e) => updateBranding({ footerLogoMaxHeight: Number(e.target.value) })}
                    className="w-full accent-[#1A1918] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-[#888] mt-0.5 font-mono">
                    <span>25px</span>
                    <span>65px (Default)</span>
                    <span>140px</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NAVIGATION MENU ITEMS */}
      {activeTab === 'nav' && (
        <div className="bg-white p-5 rounded-lg border border-[#E8E2D9] space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
                <Compass size={14} className="text-[#C5B39C]" />
                <span>Header Navigation Menu Links</span>
              </h3>
              <p className="text-xs text-[#777] mt-0.5">
                Add, rename, reorder, or update links on the top header navigation bar. Links split automatically around the central logo.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddNavItem}
              className="px-3 py-1.5 bg-[#1A1918] hover:bg-[#333] text-white text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Plus size={13} />
              <span>Add Link</span>
            </button>
          </div>

          <div className="space-y-3">
            {branding.navItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-[#FAF8F5] border border-[#E2DDD2] p-3.5 rounded flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1A1918] text-[#FAF8F5] text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                    <div>
                      <label className="block text-[9px] font-semibold uppercase text-[#777] mb-0.5">
                        Link Label / Name
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleUpdateNavItem(idx, { name: e.target.value })}
                        placeholder="e.g. PORTFOLIO"
                        className="bg-white border border-[#DDD8D0] px-2.5 py-1.5 text-xs rounded text-[#1A1918] font-medium uppercase tracking-wider w-full focus:border-[#C5B39C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-semibold uppercase text-[#777] mb-0.5">
                        Target Section ID or URL
                      </label>
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => handleUpdateNavItem(idx, { href: e.target.value })}
                        placeholder="e.g. #portfolio or #contact"
                        className="bg-white border border-[#DDD8D0] px-2.5 py-1.5 text-xs rounded text-[#1A1918] font-mono w-full focus:border-[#C5B39C] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleMoveNavItem(idx, 'up')}
                    disabled={idx === 0}
                    title="Move Up"
                    className="p-1.5 bg-white border border-[#DDD8D0] rounded hover:bg-[#F0ECE6] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveUp size={13} className="text-[#555]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMoveNavItem(idx, 'down')}
                    disabled={idx === branding.navItems.length - 1}
                    title="Move Down"
                    className="p-1.5 bg-white border border-[#DDD8D0] rounded hover:bg-[#F0ECE6] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MoveDown size={13} className="text-[#555]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveNavItem(idx)}
                    title="Remove Link"
                    className="p-1.5 bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-100 cursor-pointer ml-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#F0EDE6] rounded text-xs text-[#5C564E] flex items-start gap-2">
            <HelpCircle size={15} className="text-[#A39282] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <b>Section Anchors:</b> <code>#portfolio</code> (Signature Work), <code>#about</code> (Our Approach &amp; Vikrantt Bio), <code>#services</code> (Process &amp; Scope), <code>#contact</code> (Inquiry Form).
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: NAVIGATION TYPOGRAPHY & STYLING */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-[#E8E2D9] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918] border-b border-[#E8E2D9] pb-2 flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-[#C5B39C]" />
              <span>Header Navigation Menu Font &amp; Text Styling</span>
            </h3>

            <TextStyleControls
              label="Navigation Links (Font Size, Weight, Color, Letter Spacing, Text Decoration)"
              styleObj={branding.navStyle || {
                fontSize: '12px',
                fontWeight: '500',
                fontColor: 'rgba(153,152,148,1)',
                textDecoration: 'none',
                fontStyle: 'normal',
                textTransform: 'uppercase',
                letterSpacing: '0.28em'
              }}
              onChange={(style) => updateBranding({ navStyle: style })}
            />

            {/* Live Navigation Preview Bar */}
            <div className="mt-4 p-5 bg-[#FAF8F5] border border-[#E2DDD2] rounded space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#888] font-mono block">
                LIVE NAVIGATION BAR PREVIEW
              </span>
              <div className="bg-white p-4 border border-[#E8E2D9] rounded flex items-center justify-center space-x-6">
                {branding.navItems.map((item, idx) => (
                  <span
                    key={item.id || idx}
                    style={{
                      fontSize: branding.navStyle?.fontSize || '12px',
                      fontWeight: Number(branding.navStyle?.fontWeight) || 500,
                      color: branding.navStyle?.fontColor || 'rgba(153,152,148,1)',
                      textDecoration: branding.navStyle?.textDecoration || 'none',
                      fontStyle: branding.navStyle?.fontStyle || 'normal',
                      textTransform: (branding.navStyle?.textTransform as any) || 'uppercase',
                      letterSpacing: branding.navStyle?.letterSpacing || '0.28em'
                    }}
                    className="font-sans"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { PublicationItem } from '../../types';
import { ImageUploader } from './ImageUploader';
import { Plus, Trash2, Image as ImageIcon, Type } from 'lucide-react';

export const SectionEditorPublications: React.FC = () => {
  const { data, updatePublications } = useSiteData();
  const { publications } = data;

  const [newName, setNewName] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');
  const [isImage, setIsImage] = useState(false);

  const handleAddPublication = () => {
    if (!newName.trim() && !newLogoUrl.trim()) return;

    const newItem: PublicationItem = {
      id: 'pub-' + Date.now(),
      name: newName || 'NEW PUBLICATION',
      logoUrl: newLogoUrl,
      isImage: isImage || !!newLogoUrl,
      grayscale: true
    };

    updatePublications({
      items: [...publications.items, newItem]
    });

    setNewName('');
    setNewLogoUrl('');
    setIsImage(false);
  };

  const handleRemovePublication = (id: string) => {
    updatePublications({
      items: publications.items.filter((item) => item.id !== id)
    });
  };

  const handleToggleGrayscaleItem = (id: string, grayscale: boolean) => {
    updatePublications({
      items: publications.items.map((item) =>
        item.id === id ? { ...item, grayscale } : item
      )
    });
  };

  const handleUpdatePublicationLogo = (id: string, logoUrl: string) => {
    updatePublications({
      items: publications.items.map((item) =>
        item.id === id ? { ...item, logoUrl, isImage: !!logoUrl } : item
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 4 — FEATURED IN ESTEEMED PUBLICATIONS
        </h2>
        <p className="text-xs text-[#7A756C]">
          Upload client/publication logo images from your computer or URL, and manage black &amp; white logo filter toggles.
        </p>
      </div>

      {/* Section Title & Global B&W Switch */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Section Title Header
          </label>
          <input
            type="text"
            value={publications.title}
            onChange={(e) => updatePublications({ title: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 pt-1">
          <label className="flex items-center space-x-2 text-xs text-[#1A1918] font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={publications.globalGrayscale}
              onChange={(e) => updatePublications({ globalGrayscale: e.target.checked })}
              className="accent-[#1A1918] rounded cursor-pointer"
            />
            <span>Apply Black &amp; White (Grayscale) Filter to All Publication Logos</span>
          </label>
        </div>
      </div>

      {/* Add New Publication / Client Logo */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          <Plus size={14} className="text-[#A39282]" />
          Add New Publication or Client Logo
        </h3>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">
            Publication Name / Brand
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. ELLE DECOR / ARCHITECTURAL DIGEST"
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <ImageUploader
          label="Upload Publication Logo Image"
          value={newLogoUrl}
          onChangeUrl={(url) => {
            setNewLogoUrl(url);
            if (url) setIsImage(true);
          }}
          showGrayscaleOption={false}
        />

        <button
          type="button"
          onClick={handleAddPublication}
          className="px-4 py-2 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
        >
          <Plus size={14} />
          <span>Add Publication Logo</span>
        </button>
      </div>

      {/* Existing Publications List */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Current Publications ({publications.items.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publications.items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 overflow-hidden">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className={`w-14 h-10 object-contain border border-[#DDD8D0] rounded p-1 bg-[#FAF8F5] ${
                        item.grayscale || publications.globalGrayscale ? 'grayscale' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-[#F3EFEA] flex items-center justify-center text-[#7A756C] shrink-0">
                      <Type size={18} />
                    </div>
                  )}
                  <div className="truncate">
                    <span className="block text-xs font-serif tracking-wider text-[#1A1918] font-bold truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#888]">
                      {item.logoUrl ? 'Image Logo Uploaded' : 'Text Brand Only'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <label className="text-[10px] text-[#555] flex items-center gap-1 bg-[#F8F6F2] px-2 py-1 rounded cursor-pointer border border-[#E2DDD2]">
                    <input
                      type="checkbox"
                      checked={item.grayscale ?? true}
                      onChange={(e) => handleToggleGrayscaleItem(item.id, e.target.checked)}
                      className="accent-[#1A1918]"
                    />
                    <span>B&amp;W Filter</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleRemovePublication(item.id)}
                    className="p-1.5 text-[#999] hover:text-red-600 transition-colors cursor-pointer"
                    title="Delete Publication"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Upload/Update Logo for Existing Item */}
              <div className="pt-2 border-t border-[#F0ECE6]">
                <ImageUploader
                  label={`Update Logo Image for ${item.name}`}
                  value={item.logoUrl || ''}
                  onChangeUrl={(url) => handleUpdatePublicationLogo(item.id, url)}
                  showGrayscaleOption={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

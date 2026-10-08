import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { PortfolioItem } from '../../types';
import { ImageUploader } from './ImageUploader';
import { TextStyleControls } from './TextStyleControls';
import { compressImageFile } from '../../utils/storage';
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  UploadCloud,
  Loader2,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const SectionEditorPortfolio: React.FC = () => {
  const { data, updatePortfolio } = useSiteData();
  const { portfolio } = data;

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isBatchUploading, setIsBatchUploading] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ total: number; done: number }>({ total: 0, done: 0 });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state for new single portfolio item
  const [newItem, setNewItem] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    category: 'Montecito',
    image: '',
    location: 'MONTECITO',
    description: '',
    year: '2026',
    grayscale: false
  });

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Helper to format file name into clean title
  const formatFileNameToTitle = (fileName: string): string => {
    const clean = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
    if (!clean) return 'LUXURY EVENT DESIGN';
    return clean.toUpperCase();
  };

  // Batch / Multi-file upload handler
  const handleBatchFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    setIsBatchUploading(true);
    setBatchProgress({ total: fileList.length, done: 0 });

    try {
      const newItemsToAdd: PortfolioItem[] = [];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        try {
          const base64 = await compressImageFile(file, 1600, 0.82);
          if (base64) {
            const formattedTitle = formatFileNameToTitle(file.name);
            newItemsToAdd.push({
              id: `portfolio-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 4)}`,
              title: formattedTitle,
              category: 'Featured Work',
              image: base64,
              location: 'MONTECITO',
              description: 'Exquisite editorial celebration curated by Design Privée.',
              year: '2026',
              grayscale: false
            });
          }
        } catch (err) {
          console.error(`Failed to process file ${file.name}:`, err);
        }
        setBatchProgress({ total: fileList.length, done: i + 1 });
      }

      if (newItemsToAdd.length > 0) {
        updatePortfolio({
          items: [...newItemsToAdd, ...portfolio.items]
        });
        showNotification(`Successfully added ${newItemsToAdd.length} image(s) to portfolio! Visible immediately.`);
      }
    } catch (err) {
      console.error('Batch upload error:', err);
      alert('Error during batch upload. Please try again.');
    } finally {
      setIsBatchUploading(false);
      // Reset input value so same files can be re-selected if needed
      e.target.value = '';
    }
  };

  const handleAddSingleItem = () => {
    if (!newItem.image.trim()) {
      alert('Please upload or paste an image URL first.');
      return;
    }

    const title = newItem.title.trim() || 'LUXURY EVENT DESIGN';
    const item: PortfolioItem = {
      ...newItem,
      title,
      id: 'portfolio-' + Date.now()
    };

    updatePortfolio({
      items: [item, ...portfolio.items]
    });

    setNewItem({
      title: '',
      category: 'Montecito',
      image: '',
      location: 'MONTECITO',
      description: '',
      year: '2026',
      grayscale: false
    });

    showNotification(`Added "${title}" to the portfolio!`);
  };

  const handleClearAllDefaultItems = () => {
    if (confirm('Are you sure you want to remove default sample demo items and keep ONLY your custom uploaded images?')) {
      const customOnly = portfolio.items.filter(item => !['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].includes(item.id));
      updatePortfolio({ items: customOnly });
      showNotification('Removed default sample images.');
    }
  };

  const handleDeleteItem = (id: string) => {
    updatePortfolio({
      items: portfolio.items.filter((item) => item.id !== id)
    });
    showNotification('Item removed from portfolio.');
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const items = [...portfolio.items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    updatePortfolio({ items });
  };

  const handleUpdateItem = (updated: PortfolioItem) => {
    updatePortfolio({
      items: portfolio.items.map((item) => (item.id === updated.id ? updated : item))
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 5 — PORTFOLIO Management
        </h2>
        <p className="text-xs text-[#7A756C]">
          Upload multiple portfolio images at once (Batch Upload), manage titles, re-order gallery images, and toggle Black &amp; White mode.
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-lg flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Title & Global B&W Settings */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
              Portfolio Main Title
            </label>
            <input
              type="text"
              value={portfolio.title}
              onChange={(e) => updatePortfolio({ title: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
              Subtitle Header
            </label>
            <input
              type="text"
              value={portfolio.subtitle}
              onChange={(e) => updatePortfolio({ subtitle: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>

        <TextStyleControls
          label="Portfolio Main Title"
          styleObj={portfolio.titleStyle}
          onChange={(style) => updatePortfolio({ titleStyle: style })}
        />

        <div className="pt-2 border-t border-[#E8E2D9]">
          <label className="flex items-center space-x-2 text-xs font-medium text-[#1A1918] cursor-pointer">
            <input
              type="checkbox"
              checked={portfolio.globalGrayscale}
              onChange={(e) => updatePortfolio({ globalGrayscale: e.target.checked })}
              className="accent-[#1A1918] rounded cursor-pointer"
            />
            <span>Global Black &amp; White Toggle (Convert ALL portfolio images to Black &amp; White)</span>
          </label>
        </div>
      </div>

      {/* BATCH / MULTIPLE IMAGE UPLOAD BOX */}
      <div className="bg-[#FAF8F5] p-5 rounded-lg border-2 border-dashed border-[#C5B39C] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1918] text-[#C5B39C] flex items-center justify-center shrink-0">
              <UploadCloud size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1918] flex items-center gap-2">
                <span>Multi-Image Bulk Upload</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#1A1918] text-[#C5B39C] rounded font-mono font-normal">
                  FASTEST
                </span>
              </h3>
              <p className="text-xs text-[#666] mt-0.5">
                Select 2, 5, 10, or more photos simultaneously from your computer to automatically add them all to your portfolio carousel.
              </p>
            </div>
          </div>

          <label className={`px-4 py-2.5 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs font-semibold rounded cursor-pointer transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm ${
            isBatchUploading ? 'opacity-70 pointer-events-none' : ''
          }`}>
            {isBatchUploading ? (
              <>
                <Loader2 size={15} className="animate-spin text-[#C5B39C]" />
                <span>Uploading ({batchProgress.done}/{batchProgress.total})...</span>
              </>
            ) : (
              <>
                <Plus size={15} className="text-[#C5B39C]" />
                <span>Select Multiple Photos</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBatchFileUpload}
              disabled={isBatchUploading}
              className="hidden"
            />
          </label>
        </div>

        {isBatchUploading && (
          <div className="pt-2">
            <div className="w-full bg-[#E5E0D8] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1A1918] h-full transition-all duration-300"
                style={{ width: `${Math.round((batchProgress.done / (batchProgress.total || 1)) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-[#7A756C] mt-1 text-right font-mono">
              Processing image {batchProgress.done} of {batchProgress.total}...
            </p>
          </div>
        )}
      </div>

      {/* SINGLE IMAGE ADD FORM */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          <Plus size={14} className="text-[#A39282]" />
          Add Single Portfolio Work / Custom Image
        </h3>

        <ImageUploader
          label="Select or Paste Project Image"
          value={newItem.image}
          onChangeUrl={(url) => setNewItem({ ...newItem, image: url })}
          grayscale={newItem.grayscale}
          onToggleGrayscale={(b) => setNewItem({ ...newItem, grayscale: b })}
          showGrayscaleOption={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Project Title</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="e.g. SAN YSIDRO RANCH"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Category / Tag</label>
            <input
              type="text"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              placeholder="e.g. Montecito"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Location</label>
            <input
              type="text"
              value={newItem.location}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              placeholder="e.g. MONTECITO"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Year</label>
            <input
              type="text"
              value={newItem.year}
              onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
              placeholder="2026"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Project Description (Optional)</label>
          <textarea
            rows={2}
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="An ethereal garden wedding surrounded by lush foothills..."
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAddSingleItem}
          className="px-4 py-2 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
        >
          <Plus size={14} />
          <span>Add To Portfolio</span>
        </button>
      </div>

      {/* PORTFOLIO ITEMS GALLERY LIST */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#1A1918]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1918]">
              Existing Portfolio Works ({portfolio.items.length} Images in Carousel)
            </h3>
          </div>
          {portfolio.items.some((i) => ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].includes(i.id)) && (
            <button
              type="button"
              onClick={handleClearAllDefaultItems}
              className="text-xs text-red-600 hover:text-red-700 font-medium underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={12} />
              Remove Sample Demo Placeholders
            </button>
          )}
        </div>

        {portfolio.items.length === 0 ? (
          <div className="p-8 text-center bg-white rounded border border-[#E8E2D9] text-xs text-[#888]">
            No portfolio images uploaded yet. Use the "Multi-Image Bulk Upload" button above to upload photos from your computer.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.items.map((item, index) => {
              const isEditing = editingItemId === item.id;
              const isGrayscale = item.grayscale || portfolio.globalGrayscale;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3 shadow-2xs hover:border-[#C5B39C] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex space-x-3 overflow-hidden">
                      <div className="relative w-20 h-16 rounded overflow-hidden border border-[#DDD8D0] shrink-0 bg-[#EFECE6]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`w-full h-full object-cover ${
                            isGrayscale ? 'grayscale contrast-110' : ''
                          }`}
                        />
                        <span className="absolute bottom-0 right-0 bg-[#1A1918] text-[#FAF8F5] text-[8px] font-mono px-1 rounded-tl">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="truncate">
                        <h4 className="text-sm font-serif text-[#1A1918] font-bold truncate">
                          {item.title || 'Untitled Work'}
                        </h4>
                        <p className="text-[11px] text-[#7A756C]">
                          {item.category || 'Portfolio'} • {item.location || 'Location'} ({item.year || '2026'})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      {/* Reorder Buttons */}
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveItem(index, 'up')}
                        className={`p-1.5 rounded hover:bg-gray-100 cursor-pointer ${
                          index === 0 ? 'opacity-25 pointer-events-none' : 'text-[#666]'
                        }`}
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={index === portfolio.items.length - 1}
                        onClick={() => handleMoveItem(index, 'down')}
                        className={`p-1.5 rounded hover:bg-gray-100 cursor-pointer ${
                          index === portfolio.items.length - 1 ? 'opacity-25 pointer-events-none' : 'text-[#666]'
                        }`}
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItemId(isEditing ? null : item.id)}
                        className="p-1.5 text-[#555] hover:text-[#1A1918] cursor-pointer"
                        title="Edit Item"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 text-[#999] hover:text-red-600 cursor-pointer"
                        title="Delete Item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Individual Black & White Toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE6]">
                    <label className="flex items-center space-x-2 text-xs text-[#333] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.grayscale ?? false}
                        onChange={(e) => handleUpdateItem({ ...item, grayscale: e.target.checked })}
                        className="accent-[#1A1918] rounded cursor-pointer"
                      />
                      <span>B&amp;W Filter Toggle</span>
                    </label>
                    <span className="text-[10px] text-[#888]">
                      {isGrayscale ? 'Active B&W' : 'Color Mode'}
                    </span>
                  </div>

                  {/* Inline Edit Form */}
                  {isEditing && (
                    <div className="pt-3 border-t border-[#E8E2D9] space-y-3 bg-[#FAF8F5] p-3 rounded text-xs">
                      <ImageUploader
                        label="Change Project Image"
                        value={item.image}
                        onChangeUrl={(url) => handleUpdateItem({ ...item, image: url })}
                        showGrayscaleOption={false}
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-[#666]">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdateItem({ ...item, title: e.target.value })}
                            className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-[#666]">Location</label>
                          <input
                            type="text"
                            value={item.location}
                            onChange={(e) => handleUpdateItem({ ...item, location: e.target.value })}
                            className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-[#666]">Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => handleUpdateItem({ ...item, description: e.target.value })}
                          className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


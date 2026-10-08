import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { Testimonial } from '../../types';
import { TextStyleControls } from './TextStyleControls';
import { ImageUploader } from './ImageUploader';
import { Plus, Trash2, Edit3, MessageSquare } from 'lucide-react';

export const SectionEditorTestimonials: React.FC = () => {
  const { data, updateTestimonials } = useSiteData();
  const { testimonials } = data;

  const [editingId, setEditingId] = useState<string | null>(null);

  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    clientName: '',
    roleOrRelation: 'WEDDING CLIENT',
    quote: '',
    detailedQuote: '',
    featured: false
  });

  const handleAddTestimonial = () => {
    if (!newTestimonial.clientName.trim() || !newTestimonial.quote.trim()) return;

    const item: Testimonial = {
      ...newTestimonial,
      id: 't-' + Date.now()
    };

    updateTestimonials({
      items: [item, ...testimonials.items]
    });

    setNewTestimonial({
      clientName: '',
      roleOrRelation: 'WEDDING CLIENT',
      quote: '',
      detailedQuote: '',
      featured: false
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    updateTestimonials({
      items: testimonials.items.filter((item) => item.id !== id)
    });
  };

  const handleUpdateTestimonial = (updated: Testimonial) => {
    updateTestimonials({
      items: testimonials.items.map((item) => (item.id === updated.id ? updated : item))
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 6 — Testimonials Management ("This is your moment.")
        </h2>
        <p className="text-xs text-[#7A756C]">
          Manage section heading, client praise quotes, featured stories, and font styles.
        </p>
      </div>

      {/* Section Photo Uploader beside 'This is your moment' */}
      <ImageUploader
        label="Testimonials Section Photo (Beside 'This is your moment')"
        value={testimonials.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000'}
        onChangeUrl={(url) => updateTestimonials({ imageUrl: url })}
        showGrayscaleOption={false}
      />

      {/* Section Heading & Typography */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Section Main Heading Title
        </label>
        <input
          type="text"
          value={testimonials.sectionHeading}
          onChange={(e) => updateTestimonials({ sectionHeading: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />

        <TextStyleControls
          label="Testimonials Main Heading"
          styleObj={testimonials.headingStyle}
          onChange={(style) => updateTestimonials({ headingStyle: style })}
        />

        <TextStyleControls
          label="Testimonial Quote Text Styling"
          styleObj={testimonials.quoteStyle}
          onChange={(style) => updateTestimonials({ quoteStyle: style })}
        />
      </div>

      {/* Add New Testimonial */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          <Plus size={14} className="text-[#A39282]" />
          Add New Client Praise / Testimonial
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Client Name</label>
            <input
              type="text"
              value={newTestimonial.clientName}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
              placeholder="e.g. Shruti &amp; Rohan"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Role / Event Type</label>
            <input
              type="text"
              value={newTestimonial.roleOrRelation}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, roleOrRelation: e.target.value })}
              placeholder="e.g. WEDDING CLIENT"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Quote</label>
          <textarea
            rows={2}
            value={newTestimonial.quote}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
            placeholder="When combined, the unique skill set Vikrantt offers brings events to another level..."
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Detailed Story (Optional)</label>
          <textarea
            rows={2}
            value={newTestimonial.detailedQuote || ''}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, detailedQuote: e.target.value })}
            placeholder="Vikrantt is a visionary whose style is elevated, modern and fashion forward..."
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer font-medium text-[#1A1918]">
            <input
              type="checkbox"
              checked={newTestimonial.featured || false}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, featured: e.target.checked })}
              className="accent-[#1A1918] rounded"
            />
            <span>Highlight as Main Featured Hero Testimonial</span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleAddTestimonial}
          className="px-4 py-2 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
        >
          <Plus size={14} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Existing Testimonials ({testimonials.items.length})
        </h3>

        <div className="space-y-3">
          {testimonials.items.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <div key={item.id} className="bg-white p-4 rounded border border-[#E8E2D9] space-y-2 shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif text-sm font-bold text-[#1A1918]">{item.clientName}</span>
                      <span className="text-[10px] uppercase tracking-wider bg-[#F3EFEA] px-2 py-0.5 rounded text-[#7A756C]">
                        {item.roleOrRelation}
                      </span>
                      {item.featured && (
                        <span className="text-[9px] uppercase tracking-wider bg-[#1A1918] text-[#FAF8F5] px-1.5 py-0.5 rounded font-mono">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-serif italic text-[#444] mt-1 line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : item.id)}
                      className="p-1.5 text-[#555] hover:text-[#1A1918] cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(item.id)}
                      className="p-1.5 text-[#999] hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Inline Editing Form */}
                {isEditing && (
                  <div className="pt-3 border-t border-[#E8E2D9] space-y-3 bg-[#FAF8F5] p-3 rounded text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-[#666]">Client Name</label>
                        <input
                          type="text"
                          value={item.clientName}
                          onChange={(e) => handleUpdateTestimonial({ ...item, clientName: e.target.value })}
                          className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#666]">Role / Event Type</label>
                        <input
                          type="text"
                          value={item.roleOrRelation}
                          onChange={(e) => handleUpdateTestimonial({ ...item, roleOrRelation: e.target.value })}
                          className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#666]">Main Quote</label>
                      <textarea
                        rows={2}
                        value={item.quote}
                        onChange={(e) => handleUpdateTestimonial({ ...item, quote: e.target.value })}
                        className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#666]">Detailed Quote</label>
                      <textarea
                        rows={2}
                        value={item.detailedQuote || ''}
                        onChange={(e) => handleUpdateTestimonial({ ...item, detailedQuote: e.target.value })}
                        className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                      />
                    </div>

                    <label className="flex items-center space-x-2 text-xs cursor-pointer font-medium text-[#1A1918]">
                      <input
                        type="checkbox"
                        checked={item.featured || false}
                        onChange={(e) => handleUpdateTestimonial({ ...item, featured: e.target.checked })}
                        className="accent-[#1A1918] rounded"
                      />
                      <span>Featured Hero Testimonial</span>
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

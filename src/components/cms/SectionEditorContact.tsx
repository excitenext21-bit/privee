import React from 'react';
import { useSiteData } from '../../context/SiteContext';
import { TextStyleControls } from './TextStyleControls';
import { ImageUploader } from './ImageUploader';

export const SectionEditorContact: React.FC = () => {
  const { data, updateContact } = useSiteData();
  const { contact } = data;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 8 — Contact Us Section Management
        </h2>
        <p className="text-xs text-[#7A756C]">
          Customize heading copy, introductory details, contact media photo, email, phone, and typography styling.
        </p>
      </div>

      {/* Heading & Intro */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Contact Main Heading (Supports Multi-Line Line Breaks)
          </label>
          <textarea
            rows={2}
            value={contact.heading}
            onChange={(e) => updateContact({ heading: e.target.value })}
            placeholder="CONTACT US"
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
          <p className="text-[10px] text-[#A39282] mt-0.5">
            Tip: Press Enter to create multi-line text breaks on the front-end.
          </p>
        </div>

        <TextStyleControls
          label="Contact Main Heading"
          styleObj={contact.headingStyle}
          onChange={(style) => updateContact({ headingStyle: style })}
        />

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Introductory Text Paragraph
          </label>
          <textarea
            rows={3}
            value={contact.introText}
            onChange={(e) => updateContact({ introText: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <TextStyleControls
          label="Introductory Text"
          styleObj={contact.introStyle}
          onChange={(style) => updateContact({ introStyle: style })}
        />
      </div>

      {/* Contact Image Uploader */}
      <ImageUploader
        label="Contact Section Photo"
        value={contact.imageUrl}
        onChangeUrl={(url) => updateContact({ imageUrl: url })}
        showGrayscaleOption={false}
      />

      {/* Contact Details Fields */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Contact Direct Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Address / Regions</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => updateContact({ address: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Instagram Profile URL</label>
            <input
              type="text"
              value={contact.instagramUrl}
              onChange={(e) => updateContact({ instagramUrl: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

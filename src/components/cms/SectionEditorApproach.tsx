import React from 'react';
import { useSiteData } from '../../context/SiteContext';
import { TextStyleControls } from './TextStyleControls';
import { ImageUploader } from './ImageUploader';
import { Link as LinkIcon } from 'lucide-react';

export const SectionEditorApproach: React.FC = () => {
  const { data, updateApproach } = useSiteData();
  const { approach } = data;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 2 — OUR APPROACH Management
        </h2>
        <p className="text-xs text-[#7A756C]">
          Manage editorial photography, heading copy, body details, hyperlink direction, and font styling.
        </p>
      </div>

      {/* Images Uploaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageUploader
          label="Left Column Image (Tall Vertical Tented Event)"
          value={approach.leftImageUrl}
          onChangeUrl={(url) => updateApproach({ leftImageUrl: url })}
          showGrayscaleOption={false}
        />

        <ImageUploader
          label="Right Top Image (Fine Art Coastal B&W)"
          value={approach.rightImageUrl}
          onChangeUrl={(url) => updateApproach({ rightImageUrl: url })}
          showGrayscaleOption={false}
        />
      </div>

      {/* Eyebrow & Subheading */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Section Eyebrow Label
          </label>
          <input
            type="text"
            value={approach.eyebrow}
            onChange={(e) => updateApproach({ eyebrow: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Subheading / Tagline Text
          </label>
          <input
            type="text"
            value={approach.subheading}
            onChange={(e) => updateApproach({ subheading: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <TextStyleControls
          label="Subheading / Tagline"
          styleObj={approach.subheadingStyle}
          onChange={(style) => updateApproach({ subheadingStyle: style })}
        />
      </div>

      {/* Main Heading */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Main Heading
        </label>
        <textarea
          rows={2}
          value={approach.heading}
          onChange={(e) => updateApproach({ heading: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />

        <TextStyleControls
          label="Main Heading"
          styleObj={approach.headingStyle}
          onChange={(style) => updateApproach({ headingStyle: style })}
        />
      </div>

      {/* Paragraph Body */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Paragraph Details Text
        </label>
        <textarea
          rows={3}
          value={approach.paragraph}
          onChange={(e) => updateApproach({ paragraph: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />

        <TextStyleControls
          label="Paragraph Details"
          styleObj={approach.paragraphStyle}
          onChange={(style) => updateApproach({ paragraphStyle: style })}
        />
      </div>

      {/* Hyperlink Direction & Button Text */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          <LinkIcon size={14} className="text-[#A39282]" />
          CTA Button Label &amp; Hyperlink Direction Option
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Button Text</label>
            <input
              type="text"
              value={approach.ctaText}
              onChange={(e) => updateApproach({ ctaText: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">
              Hyperlink Direction URL / Section Anchor
            </label>
            <input
              type="text"
              value={approach.ctaUrl}
              onChange={(e) => updateApproach({ ctaUrl: e.target.value })}
              placeholder="e.g. #about or https://..."
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

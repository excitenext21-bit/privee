import React from 'react';
import { useSiteData } from '../../context/SiteContext';
import { TextStyleControls } from './TextStyleControls';
import { ImageUploader } from './ImageUploader';
import { Link as LinkIcon } from 'lucide-react';

export const SectionEditorVikrantt: React.FC = () => {
  const { data, updateVikrantt } = useSiteData();
  const { vikrantt } = data;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 3 — HI, I'M VIKRANTT Management
        </h2>
        <p className="text-xs text-[#7A756C]">
          Edit founder biography, quotes, black &amp; white image filter toggles, hyperlink direction, and text styles.
        </p>
      </div>

      {/* Greeting Title */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Greeting Heading
        </label>
        <input
          type="text"
          value={vikrantt.greeting}
          onChange={(e) => updateVikrantt({ greeting: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />

        <TextStyleControls
          label="Greeting Heading"
          styleObj={vikrantt.greetingStyle}
          onChange={(style) => updateVikrantt({ greetingStyle: style })}
        />
      </div>

      {/* Meet the Designer Heading (Above Vikrantt Portrait Photo) */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Portrait Heading (Above Vikrantt Portrait Photo)
        </label>
        <input
          type="text"
          value={vikrantt.portraitHeading || 'Meet the Designer'}
          onChange={(e) => updateVikrantt({ portraitHeading: e.target.value })}
          placeholder="Meet the Designer"
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none font-serif text-base"
        />

        <TextStyleControls
          label="Portrait Heading (Meet the Designer)"
          styleObj={vikrantt.portraitHeadingStyle || { fontSize: '42px', fontWeight: '400', fontColor: '#F5F2ED', textDecoration: 'none', fontStyle: 'normal', textAlign: 'center' }}
          onChange={(style) => updateVikrantt({ portraitHeadingStyle: style })}
        />
      </div>

      {/* Images Uploaders with Black & White Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageUploader
          label="Dog Portrait Photo"
          value={vikrantt.dogImageUrl}
          onChangeUrl={(url) => updateVikrantt({ dogImageUrl: url })}
          grayscale={vikrantt.dogImageGrayscale}
          onToggleGrayscale={(b) => updateVikrantt({ dogImageGrayscale: b })}
          showGrayscaleOption={true}
        />

        <ImageUploader
          label="Vikrantt Portrait Photo"
          value={vikrantt.vikranttPortraitUrl}
          onChangeUrl={(url) => updateVikrantt({ vikranttPortraitUrl: url })}
          grayscale={vikrantt.portraitGrayscale}
          onToggleGrayscale={(b) => updateVikrantt({ portraitGrayscale: b })}
          showGrayscaleOption={true}
        />
      </div>

      {/* Dog Caption */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9]">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
          Dog Photo Caption Label
        </label>
        <input
          type="text"
          value={vikrantt.dogCaption}
          onChange={(e) => updateVikrantt({ dogCaption: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />
      </div>

      {/* Quotes & Bio Copy */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Biography Quotes &amp; Paragraphs
        </label>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Aesthete Quote (Left Column)</label>
          <textarea
            rows={3}
            value={vikrantt.aestheteQuote}
            onChange={(e) => updateVikrantt({ aestheteQuote: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Philosophy Statement</label>
          <textarea
            rows={2}
            value={vikrantt.philosophyQuote}
            onChange={(e) => updateVikrantt({ philosophyQuote: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Trust Statement</label>
          <textarea
            rows={2}
            value={vikrantt.trustQuote}
            onChange={(e) => updateVikrantt({ trustQuote: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Feature Bio Box Text</label>
          <textarea
            rows={2}
            value={vikrantt.bioHighlightText}
            onChange={(e) => updateVikrantt({ bioHighlightText: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <TextStyleControls
          label="Quotes & Paragraphs"
          styleObj={vikrantt.quotesStyle}
          onChange={(style) => updateVikrantt({ quotesStyle: style })}
        />
      </div>

      {/* Hyperlink Direction Option */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          <LinkIcon size={14} className="text-[#A39282]" />
          Section Hyperlink Direction Option
        </label>
        <input
          type="text"
          value={vikrantt.ctaUrl}
          onChange={(e) => updateVikrantt({ ctaUrl: e.target.value })}
          placeholder="e.g. #contact"
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />
      </div>
    </div>
  );
};

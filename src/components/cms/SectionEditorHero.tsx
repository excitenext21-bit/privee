import React from 'react';
import { useSiteData } from '../../context/SiteContext';
import { TextStyleControls } from './TextStyleControls';
import { ImageUploader } from './ImageUploader';

export const SectionEditorHero: React.FC = () => {
  const { data, updateHero } = useSiteData();
  const { hero } = data;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 1 — Hero Section Management
        </h2>
        <p className="text-xs text-[#7A756C]">
          Configure video or image background, headline copy, category text, and typography styles.
        </p>
      </div>

      {/* Media Type Switcher */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Hero Background Media Mode
        </label>
        <div className="flex items-center space-x-6 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer font-medium">
            <input
              type="radio"
              name="mediaType"
              value="video"
              checked={hero.mediaType === 'video'}
              onChange={() => updateHero({ mediaType: 'video' })}
              className="accent-[#1A1918]"
            />
            <span>Video Background</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer font-medium">
            <input
              type="radio"
              name="mediaType"
              value="image"
              checked={hero.mediaType === 'image'}
              onChange={() => updateHero({ mediaType: 'image' })}
              className="accent-[#1A1918]"
            />
            <span>Static Image Background</span>
          </label>
        </div>
      </div>

      {/* Media Source Controls */}
      {hero.mediaType === 'video' ? (
        <ImageUploader
          label="Hero Video Source (.mp4 URL or Local Upload)"
          value={hero.videoUrl}
          onChangeUrl={(url) => updateHero({ videoUrl: url })}
          isVideo={true}
          showGrayscaleOption={false}
        />
      ) : (
        <ImageUploader
          label="Hero Background Image"
          value={hero.imageUrl}
          onChangeUrl={(url) => updateHero({ imageUrl: url })}
          showGrayscaleOption={false}
        />
      )}

      {/* Category / Subtitle Copy */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Tagline / Category Text
        </label>
        <input
          type="text"
          value={hero.category}
          onChange={(e) => updateHero({ category: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />

        <TextStyleControls
          label="Tagline / Category"
          styleObj={hero.categoryStyle}
          onChange={(style) => updateHero({ categoryStyle: style })}
        />
      </div>

      {/* Main Title Copy */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Hero Main Headline Title
        </label>
        <textarea
          rows={3}
          value={hero.title}
          onChange={(e) => updateHero({ title: e.target.value })}
          className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
        />

        <TextStyleControls
          label="Headline Title"
          styleObj={hero.titleStyle}
          onChange={(style) => updateHero({ titleStyle: style })}
        />
      </div>
    </div>
  );
};

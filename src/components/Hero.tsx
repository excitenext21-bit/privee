import React from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';

export const Hero: React.FC = () => {
  const { data } = useSiteData();
  const { hero } = data;

  const titleStyles = getStyleObject(hero.titleStyle);
  const categoryStyles = getStyleObject(hero.categoryStyle);

  // Extract base font sizes for responsive clamp (mobile -> desktop)
  const rawTitleFontSize = hero.titleStyle?.fontSize || '45px';
  const parsedTitleSize = parseInt(String(rawTitleFontSize).replace(/[^0-9]/g, ''), 10) || 45;
  const mobileTitleSize = Math.max(20, Math.round(parsedTitleSize * 0.53)); // e.g., 45px -> 24px on mobile

  const rawCatFontSize = hero.categoryStyle?.fontSize || '15px';
  const parsedCatSize = parseInt(String(rawCatFontSize).replace(/[^0-9]/g, ''), 10) || 15;
  const mobileCatSize = Math.max(10, Math.round(parsedCatSize * 0.73)); // e.g., 15px -> 11px on mobile

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 bg-black overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {hero.mediaType === 'video' && hero.videoUrl ? (
          <video
            key={hero.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            poster={hero.imageUrl}
            className="w-full h-full object-cover object-center opacity-100"
          >
            <source src={hero.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={hero.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000'}
            alt="Design Privée Luxury Wedding Setting"
            className="w-full h-full object-cover object-center opacity-100"
          />
        )}
        <WatermarkOverlay className="bottom-4 right-4 sm:bottom-6 sm:right-6" />
      </div>

      {/* Hero Content Positioned at the Bottom */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-auto pb-4 px-2 sm:px-4 drop-shadow-md">
        {/* Category */}
        <p
          id="hero-banner-category"
          style={{
            color: 'rgba(255,255,255,1)',
            fontFamily: "'Karla', sans-serif",
            fontWeight: 400,
            fontStyle: 'normal',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            ...categoryStyles,
            fontSize: `clamp(${mobileCatSize}px, 2.4vw, ${parsedCatSize}px)`
          }}
          className="mb-3 sm:mb-6 tracking-[0.18em] sm:tracking-[0.25em]"
        >
          {hero.category}
        </p>

        {/* Headline */}
        <h1
          id="hero-headline"
          style={{
            color: 'rgba(255,255,255,1)',
            textTransform: 'none',
            letterSpacing: 'normal',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', 'Didot', serif",
            fontWeight: 400,
            fontStyle: 'normal',
            lineHeight: 1.25,
            ...titleStyles,
            fontSize: `clamp(${mobileTitleSize}px, 4.8vw, ${parsedTitleSize}px)`
          }}
          className="max-w-4xl mx-auto leading-[1.28] sm:leading-[1.2]"
        >
          {hero.title}
        </h1>
      </div>
    </section>
  );
};


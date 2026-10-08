import React, { useState, useEffect } from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';

export const Hero: React.FC = () => {
  const { data } = useSiteData();
  const { hero, approach } = data;

  const [headerHeight, setHeaderHeight] = useState<number>(85);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerEl = document.getElementById('main-header');
      if (headerEl) {
        setHeaderHeight(headerEl.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const titleStyles = getStyleObject(hero.titleStyle);
  const categoryStyles = getStyleObject(hero.categoryStyle);

  // Extract base font sizes matching the Approach heading
  const approachHeadingSize = approach?.headingStyle?.fontSize || '32px';
  const rawTitleFontSize = (!hero.titleStyle?.fontSize || hero.titleStyle?.fontSize === '45px' || hero.titleStyle?.fontSize === '40px')
    ? approachHeadingSize
    : hero.titleStyle.fontSize;
  const parsedTitleSize = parseInt(String(rawTitleFontSize).replace(/[^0-9]/g, ''), 10) || 32;
  // Match Approach heading proportions: 22px mobile to 32px desktop
  const mobileTitleSize = Math.max(18, Math.round(parsedTitleSize * (22 / 32)));

  const rawCatFontSize = hero.categoryStyle?.fontSize || '15px';
  const parsedCatSize = parseInt(String(rawCatFontSize).replace(/[^0-9]/g, ''), 10) || 15;
  const mobileCatSize = Math.max(10, Math.round(parsedCatSize * 0.73)); // e.g., 15px -> 11px on mobile

  return (
    <section id="hero" className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col">
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

      {/* Top spacer matching the exact height of the fixed navigation header */}
      <div
        style={{ height: `${headerHeight}px` }}
        className="w-full shrink-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Area from navigation bottom to video end area - vertically centered! */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto text-center px-4 sm:px-6 md:px-12 drop-shadow-md pb-6 sm:pb-8">
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
            fontSize: `clamp(${mobileTitleSize}px, 3.2vw, ${parsedTitleSize}px)`
          }}
          className="max-w-4xl mx-auto leading-[1.25] text-[22px] sm:text-[28px] md:text-[32px] lg:text-[32px]"
        >
          {hero.title}
        </h1>
      </div>
    </section>
  );
};


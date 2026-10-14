import React, { useState, useEffect } from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';

export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

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

  const isTargetYouTube = hero.videoUrl && (hero.videoUrl.includes('JqsBG7BOU3U') || hero.videoUrl.includes('hero_privee.mp4'));
  const activeVideoSrc = isTargetYouTube ? '/assets/hero_privee.mp4' : hero.videoUrl;
  const ytVideoId = !isTargetYouTube && hero.mediaType === 'video' && hero.videoUrl ? getYouTubeVideoId(hero.videoUrl) : null;

  return (
    <section id="hero" className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {hero.mediaType === 'video' && (activeVideoSrc || ytVideoId) ? (
          ytVideoId ? (
            <div
              className="relative w-full h-full overflow-hidden pointer-events-none select-none bg-black bg-cover bg-center"
              style={{ backgroundImage: hero.imageUrl ? `url(${hero.imageUrl})` : undefined }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${ytVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytVideoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&vq=hd1080&hd=1`}
                title="Design Privée Hero Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] min-w-[177.78vh] h-[56.25vw] min-h-[100vh] scale-[1.35] md:scale-[1.2] object-cover pointer-events-none"
                style={{ border: 0 }}
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-full overflow-hidden">
              <video
                key={activeVideoSrc}
                autoPlay
                loop
                muted
                playsInline
                poster={hero.imageUrl}
                className="w-full h-full object-cover object-center opacity-100"
              >
                <source src={activeVideoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/30 pointer-events-none" />
            </div>
          )
        ) : (
          <img
            src={hero.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000'}
            alt="Design Privéé Luxury Wedding Setting"
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


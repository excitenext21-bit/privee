import React from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';
import approachOceanMandap from '../assets/images/approach_ocean_mandap.jpg';
import approachChandelierBallroom from '../assets/images/approach_chandelier_ballroom.jpg';

export const Approach: React.FC = () => {
  const { data } = useSiteData();
  const { approach } = data;

  const leftImageSrc = approach.leftImageUrl && !approach.leftImageUrl.includes('photo-1511285560929')
    ? approach.leftImageUrl
    : approachOceanMandap;

  const rightImageSrc = approach.rightImageUrl && !approach.rightImageUrl.includes('photo-1519225421980')
    ? approach.rightImageUrl
    : approachChandelierBallroom;

  const isOldHeading = approach.heading === 'Timeless with a contemporary edge and unwavering hospitality';
  const displayHeading = isOldHeading
    ? 'Timeless design with a contemporary\nedge and unwavering flawless execution'
    : (approach.heading || 'Timeless design with a contemporary\nedge and unwavering flawless execution');

  const isOldSubheading = approach.subheading === 'For thoughtful tastemakers & dreamers';
  const displaySubheading = isOldSubheading ? '' : (approach.subheading || '');

  const renderHeadingWithItalicAnd = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\band\b|&)/gi);
    return parts.map((part, index) => {
      if (part.toLowerCase() === 'and' || part === '&') {
        return (
          <span
            key={index}
            style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}
            className="italic font-serif"
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const handleDetailsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (approach.ctaUrl && approach.ctaUrl.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(approach.ctaUrl);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="approach" className="pt-0 pl-0 pr-0 pb-16 sm:pb-20 md:pb-24 bg-[#EFECE6] w-full overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 xl:gap-28 items-start">
          
          {/* Left Column Image */}
          <div className="lg:col-span-5 lg:pt-12 xl:pt-16">
            <div className="relative overflow-hidden w-full h-[500px] sm:h-[620px] md:h-[680px] lg:h-[720px]">
              <img
                key={`approach-left-${leftImageSrc}`}
                src={leftImageSrc}
                alt="Luxury Event Design"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <WatermarkOverlay />
            </div>
          </div>

          {/* Right Column Image & Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 sm:space-y-12 pr-0 pl-0 lg:pl-0">
            
            {/* Typography Block - on mobile appears first in right column (order-1), on desktop appears second (lg:order-2) */}
            <div className="order-1 lg:order-2 text-center px-4 sm:px-10 lg:px-12 pt-2 sm:pt-4 pb-2 lg:pb-4 max-w-2xl mx-auto">
              {/* Eyebrow */}
              <span className="block text-[11px] sm:text-xs uppercase tracking-[0.3em] font-sans text-[#A8A298] font-normal mb-4 sm:mb-5">
                {approach.eyebrow}
              </span>

              {/* Main Heading */}
              <h2
                id="approach-heading"
                style={{
                  lineHeight: 1.25,
                  textDecoration: 'none',
                  ...getStyleObject(approach.headingStyle),
                  color: 'rgba(153, 152, 148, 1)',
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  fontSize: '32px',
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontStyle: 'normal'
                }}
                className="mb-4 sm:mb-5 text-[24px] sm:text-[28px] md:text-[32px] lg:text-[32px] whitespace-pre-line"
              >
                {renderHeadingWithItalicAnd(displayHeading)}
              </h2>

              {/* Tagline / Subheading */}
              {displaySubheading && displaySubheading.trim() !== '' ? (
                <p
                  style={getStyleObject(approach.subheadingStyle)}
                  className="font-serif italic text-base sm:text-xl md:text-[22px] text-[#A8A298] font-light mb-6 sm:mb-8"
                >
                  {displaySubheading}
                </p>
              ) : null}

              {/* Body Paragraph */}
              <p
                id="approach-body"
                style={getStyleObject(approach.paragraphStyle)}
                className="font-sans text-xs sm:text-sm text-[#7A756C] leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 font-normal"
              >
                {approach.paragraph}
              </p>

              {/* CTA Link */}
              <div>
                <a
                  href={approach.ctaUrl || '#about'}
                  onClick={handleDetailsClick}
                  className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans text-[#7A756C] hover:text-[#999894] border-b border-[#C8C2B8] hover:border-[#999894] pb-1 transition-colors cursor-pointer"
                >
                  {approach.ctaText}
                </a>
              </div>
            </div>

            {/* Second Image - on mobile appears after content (order-2), on desktop appears at the top (lg:order-1) */}
            <div className="order-2 lg:order-1 relative overflow-hidden w-full h-[280px] sm:h-[360px] md:h-[400px] lg:h-[440px]">
              <img
                key={`approach-right-${rightImageSrc}`}
                src={rightImageSrc}
                alt="Fine Art Photography"
                className="w-full h-full object-cover grayscale contrast-110"
                loading="eager"
              />
              <WatermarkOverlay />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};



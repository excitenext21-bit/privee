import React from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';

export const Approach: React.FC = () => {
  const { data } = useSiteData();
  const { approach } = data;

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
                key={`approach-left-${approach.leftImageUrl}`}
                src={approach.leftImageUrl}
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
                  color: 'rgba(153,152,148,1)',
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  textAlign: 'center',
                  fontFamily: "'Cormorant Garamond', 'Didot', serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: 1.25,
                  ...getStyleObject(approach.headingStyle)
                }}
                className="mb-4 sm:mb-5 text-[26px] sm:text-[34px] md:text-[38px] lg:text-[40px]"
              >
                {approach.heading}
              </h2>

              {/* Tagline / Subheading */}
              <p
                style={getStyleObject(approach.subheadingStyle)}
                className="font-serif italic text-base sm:text-xl md:text-[22px] text-[#A8A298] font-light mb-6 sm:mb-8"
              >
                {approach.subheading}
              </p>

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
                  className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans text-[#7A756C] hover:text-[#1A1918] border-b border-[#C8C2B8] hover:border-[#1A1918] pb-1 transition-colors cursor-pointer"
                >
                  {approach.ctaText}
                </a>
              </div>
            </div>

            {/* Second Image - on mobile appears after content (order-2), on desktop appears at the top (lg:order-1) */}
            <div className="order-2 lg:order-1 relative overflow-hidden w-full h-[280px] sm:h-[360px] md:h-[400px] lg:h-[440px]">
              <img
                key={`approach-right-${approach.rightImageUrl}`}
                src={approach.rightImageUrl}
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



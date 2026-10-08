import React from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';

export const AboutVikrantt: React.FC = () => {
  const { data } = useSiteData();
  const { vikrantt } = data;

  const bgNature = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600';

  const greetingStyles = getStyleObject(vikrantt.greetingStyle);
  const rawGreetingFontSize = vikrantt.greetingStyle?.fontSize || '45px';
  const parsedGreetingSize = parseInt(String(rawGreetingFontSize).replace(/[^0-9]/g, ''), 10) || 45;
  const mobileGreetingSize = Math.max(26, Math.round(parsedGreetingSize * 0.65));

  return (
    <>
      <section
        id="about"
        style={{ backgroundColor: 'rgba(247,244,240,1)' }}
        className="py-10 sm:py-16 md:py-20 px-4 sm:px-10 md:px-14 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Heading: HI, I'M VIKRANTT */}
          <div className="mb-4 sm:mb-6 lg:mb-10">
            <h2
              id="vikrantt-greeting"
              style={{
                textTransform: 'uppercase',
                color: 'rgba(153,152,148,1)',
                lineHeight: 1.2,
                letterSpacing: '0.1em',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontStyle: 'normal',
                ...greetingStyles,
                fontSize: `clamp(${mobileGreetingSize}px, 6vw, ${parsedGreetingSize}px)`
              }}
              className="whitespace-nowrap"
            >
              {vikrantt.greeting}
            </h2>
          </div>

          {/* 3-Column Editorial Grid below Heading */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column (Cols 1-5): Aesthete Quote in lower-right offset on desktop, natural flow on mobile */}
            <div className="lg:col-span-5 flex flex-col justify-between min-h-0 lg:min-h-[460px]">
              <div className="mt-0 lg:mt-auto pt-0 sm:pt-4 lg:pt-28 pl-0 sm:pl-10 lg:pl-20 pr-0 lg:pr-2">
                <p
                  id="vikrantt-aesthete"
                  style={getStyleObject(vikrantt.quotesStyle)}
                  className="text-base sm:text-lg font-serif italic text-[#2C2A29] leading-relaxed max-w-sm"
                >
                  {vikrantt.aestheteQuote}
                </p>
              </div>
            </div>

            {/* Center Column (Cols 6-9): Dog Portrait & Dog Lover Caption */}
            <div className="lg:col-span-4 flex flex-col items-end">
              <div className="relative w-full max-w-[380px] overflow-hidden">
                <img
                  src={vikrantt.dogImageUrl}
                  alt="Vikrantt with his dog"
                  className={`w-full h-[360px] sm:h-[400px] md:h-[440px] object-cover transition-all ${
                    vikrantt.dogImageGrayscale ? 'grayscale contrast-110' : ''
                  }`}
                />
                <WatermarkOverlay />
              </div>
              <p id="dog-caption" className="text-right text-xs sm:text-sm md:text-base font-serif tracking-[0.2em] text-[#1A1918] uppercase mt-3 font-bold">
                {vikrantt.dogCaption}
              </p>
            </div>

            {/* Right Column (Cols 10-12): Philosophy & Trust */}
            <div className="lg:col-span-3 flex flex-col justify-start space-y-8 lg:space-y-12 pt-2 lg:pt-2">
              <div>
                <p
                  id="vikrantt-philosophy"
                  style={getStyleObject(vikrantt.quotesStyle)}
                  className="text-base sm:text-lg font-serif text-[#2C2A29] leading-relaxed"
                >
                  {vikrantt.philosophyQuote}
                </p>
              </div>

              <div>
                <p
                  id="vikrantt-trust"
                  style={getStyleObject(vikrantt.quotesStyle)}
                  className="text-sm sm:text-base font-serif italic text-[#2C2A29] leading-relaxed"
                >
                  {vikrantt.trustQuote}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Feature Bio Highlight Banner */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-[#2C2A29]">
        <div className="absolute inset-0 z-0">
          <img
            src={bgNature}
            alt="Ambient event backdrop"
            className="w-full h-full object-cover scale-110 filter blur-md opacity-45 grayscale contrast-120"
          />
          <div className="absolute inset-0 bg-[#1A1918]/25 mix-blend-multiply" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            
            {/* Left Portrait */}
            <div className="w-full md:w-1/2 max-w-[420px] shrink-0">
              {(vikrantt.portraitHeading || vikrantt.portraitHeading === undefined) && (
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Didot', serif",
                    fontSize: '42px',
                    fontWeight: 400,
                    color: '#F5F2ED',
                    lineHeight: 1.15,
                    marginBottom: '1rem',
                    textAlign: 'center',
                    ...getStyleObject(vikrantt.portraitHeadingStyle)
                  }}
                  className="font-serif transition-all text-center"
                >
                  {vikrantt.portraitHeading || 'Meet the Designer'}
                </h3>
              )}
              <div className="relative aspect-[3/4] overflow-hidden shadow-2xl bg-[#DCD8D2]">
                <img
                  src={vikrantt.vikranttPortraitUrl}
                  alt="Vikrantt"
                  className={`w-full h-full object-cover transition-all ${
                    vikrantt.portraitGrayscale ? 'grayscale contrast-110' : ''
                  }`}
                />
                <WatermarkOverlay />
              </div>
            </div>

            {/* Right Solid Taupe Quote Box */}
            <div className="w-full md:w-1/2 max-w-[500px] shrink-0">
              <div className="bg-[#8C8A84] p-8 sm:p-12 md:p-14 lg:p-16 shadow-xl text-left">
                <p
                  style={{ fontFamily: "'Cormorant Garamond', 'Didot', serif" }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] leading-[1.45] text-[#F5F2ED] font-light"
                >
                  {vikrantt.bioHighlightText}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};



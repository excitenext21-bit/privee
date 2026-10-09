import React, { useRef, useState, useEffect } from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';

export const Portfolio: React.FC = () => {
  const { data } = useSiteData();
  const { portfolio } = data;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Filter valid items that have images
  const validItems = (portfolio.items || []).filter(
    (item) => item && item.image && item.image.trim() !== ''
  );

  // Duplicate items for seamless infinite auto-scrolling if there are enough items
  const displayItems =
    validItems.length > 0
      ? validItems.length === 1
        ? validItems
        : validItems.length < 4
        ? [...validItems, ...validItems, ...validItems, ...validItems]
        : [...validItems, ...validItems]
      : [];

  // Auto-scroll loop with requestAnimationFrame
  useEffect(() => {
    if (validItems.length <= 1) return;

    let animationFrameId: number;

    const step = () => {
      if (sliderRef.current && !isHovered && !isDragging) {
        sliderRef.current.scrollLeft += 0.8;

        // Seamless infinite wrap check
        const halfWidth = sliderRef.current.scrollWidth / 2;
        if (sliderRef.current.scrollLeft >= halfWidth) {
          sliderRef.current.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isDragging, validItems.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="portfolio" className="pt-12 sm:pt-20 md:pt-[100px] pb-12 sm:pb-16 md:pb-[90px] bg-white w-full overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center mb-8 sm:mb-12 md:mb-14">
        <span
          style={{
            color: 'rgba(205,202,195,1)',
            letterSpacing: '0.1em',
            fontSize: '11px',
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: 1.8,
            fontFamily: "'Karla', sans-serif",
            fontWeight: 400,
            fontStyle: 'normal',
            display: 'block',
          }}
          className="mb-2"
        >
          {portfolio.subtitle}
        </span>
        <div className="w-14 h-[1px] bg-[#E2DCD4] mx-auto mb-3 sm:mb-4"></div>
        <h2
          style={{
            ...getStyleObject(portfolio.titleStyle),
            lineHeight: 1.25,
            textDecoration: 'none',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px',
            fontWeight: 400,
            color: 'rgb(153, 152, 148)',
            fontStyle: 'normal',
            textTransform: 'none',
            letterSpacing: '0.02em',
            textAlign: 'center'
          }}
        >
          {portfolio.title && portfolio.title.trim().toUpperCase() === 'PORTFOLIO' ? 'Portfolio' : (portfolio.title || 'Portfolio')}
        </h2>
      </div>

      {/* Horizontal Scrolling Slider */}
      <div
        ref={sliderRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto select-none py-2 px-4 sm:px-6 md:px-0 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {displayItems.map((item, index) => {
          const isGrayscale = portfolio.globalGrayscale || item.grayscale;

          return (
            <div
              key={`${item.id}-${index}`}
              className="group flex flex-col justify-between shrink-0 w-[74vw] sm:w-[44vw] md:w-[34vw] lg:w-[30vw] max-w-[420px]"
            >
              <div className="relative overflow-hidden aspect-3/4 bg-[#EFECE6] shadow-2xs">
                <picture>
                  <source
                    srcSet={item.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                    type="image/webp"
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    width={1080}
                    height={1440}
                    draggable={false}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none ${
                      isGrayscale ? 'grayscale contrast-110' : ''
                    }`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding={index < 2 ? 'sync' : 'async'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                </picture>
                <WatermarkOverlay />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};





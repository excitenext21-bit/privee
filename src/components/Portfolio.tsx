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
    <section id="portfolio" className="pt-18 sm:pt-[100px] pb-16 sm:pb-[90px] bg-white w-full overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10 sm:mb-14">
        <span
          style={{
            color: 'rgba(205,202,195,1)',
            letterSpacing: '0.05em',
            fontSize: '10px',
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
        <div className="w-16 h-[1px] bg-[#E2DCD4] mx-auto mb-4"></div>
        <h2
          style={{
            textTransform: 'uppercase',
            color: 'rgba(153,152,148,1)',
            lineHeight: 1.2,
            letterSpacing: '0.1em',
            fontSize: '45px',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontStyle: 'normal',
            ...getStyleObject(portfolio.titleStyle)
          }}
        >
          {portfolio.title}
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
        className={`w-full flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto select-none py-2 px-0 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {displayItems.map((item, index) => {
          const isGrayscale = portfolio.globalGrayscale || item.grayscale;

          return (
            <div
              key={`${item.id}-${index}`}
              className="group flex flex-col justify-between shrink-0 w-[82vw] sm:w-[42vw] md:w-[35vw] lg:w-[32vw]"
            >
              <div className="relative overflow-hidden aspect-3/4 bg-[#EFECE6]">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none ${
                    isGrayscale ? 'grayscale contrast-110' : ''
                  }`}
                  loading="lazy"
                />
                <WatermarkOverlay />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};





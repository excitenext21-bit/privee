import React from 'react';
import { useSiteData } from '../context/SiteContext';
import { WatermarkConfig } from '../types';

interface WatermarkOverlayProps {
  className?: string;
  // Optional override for custom positions or variants if needed
  customPosition?: WatermarkConfig['position'];
  scale?: number;
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  className = '',
  customPosition,
  scale
}) => {
  const { data } = useSiteData();
  const watermark = data.branding?.watermark || {
    enabled: true,
    type: 'text',
    text: 'DESIGN PRIVÉE',
    customImageUrl: '',
    opacity: 0.22,
    position: 'bottom-right',
    size: 'medium',
    colorTheme: 'light',
    fontFamily: 'serif',
    letterSpacing: '0.28em',
    showBorder: false
  };

  if (!watermark.enabled) return null;

  const position = customPosition || watermark.position || 'bottom-right';
  const opacity = typeof watermark.opacity === 'number' ? watermark.opacity : 0.22;
  const isImageWatermark = watermark.type === 'image' && watermark.customImageUrl;

  // Determine size classes
  const getTextSizeClass = () => {
    switch (watermark.size) {
      case 'small':
        return 'text-[9px] sm:text-[10px] tracking-[0.2em] px-2 py-0.5';
      case 'large':
        return 'text-sm sm:text-base md:text-lg tracking-[0.35em] px-4 py-2';
      case 'medium':
      default:
        return 'text-[11px] sm:text-xs md:text-sm tracking-[0.28em] px-3 py-1';
    }
  };

  const getImageSizeStyle = () => {
    let width = 140;
    if (watermark.size === 'small') width = 90;
    if (watermark.size === 'large') width = 210;
    if (scale) width = Math.round(width * scale);
    return { maxWidth: `${width}px`, width: '100%' };
  };

  // Determine position classes
  const getPositionClass = () => {
    switch (position) {
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center';
      case 'diagonal-center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-25 sm:-rotate-30 text-center whitespace-nowrap';
      case 'bottom-left':
        return 'bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 text-left';
      case 'top-right':
        return 'top-2.5 right-2.5 sm:top-4 sm:right-4 text-right';
      case 'repeat-subtle':
        return 'inset-0 flex flex-wrap items-center justify-around p-4 overflow-hidden';
      case 'bottom-right':
      default:
        return 'bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 text-right';
    }
  };

  // Determine font family
  const fontStyle = {
    fontFamily: watermark.fontFamily === 'sans' ? "'Karla', sans-serif" : "'Cormorant Garamond', 'Didot', Georgia, serif",
    letterSpacing: watermark.letterSpacing || '0.28em',
    opacity: opacity
  };

  // Text color styling with protective drop shadow for contrast on both dark and light photos
  const getColorStyle = () => {
    if (watermark.colorTheme === 'gold') {
      return {
        color: '#D8C7B0',
        textShadow: '0 1px 3px rgba(0,0,0,0.65), 0 0 8px rgba(0,0,0,0.4)'
      };
    }
    if (watermark.colorTheme === 'dark') {
      return {
        color: '#1A1918',
        textShadow: '0 1px 2px rgba(255,255,255,0.6)'
      };
    }
    // Default light/white
    return {
      color: 'rgba(255, 255, 255, 0.95)',
      textShadow: '0 1px 3px rgba(0,0,0,0.65), 0 0 10px rgba(0,0,0,0.45)'
    };
  };

  if (position === 'repeat-subtle') {
    return (
      <div
        className={`absolute inset-0 pointer-events-none select-none z-20 overflow-hidden flex flex-wrap items-center justify-around gap-12 p-6 ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="-rotate-25 transform">
            {isImageWatermark ? (
              <img
                src={watermark.customImageUrl}
                alt="Watermark"
                style={getImageSizeStyle()}
                className="object-contain filter drop-shadow-md"
              />
            ) : (
              <span
                style={{ ...fontStyle, ...getColorStyle(), opacity: 1 }}
                className={`uppercase font-medium ${getTextSizeClass()}`}
              >
                {watermark.text || 'DESIGN PRIVÉE'}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`absolute ${getPositionClass()} pointer-events-none select-none z-20 ${className}`}
      aria-hidden="true"
    >
      {isImageWatermark ? (
        <div style={{ opacity }} className="transition-opacity duration-300">
          <img
            src={watermark.customImageUrl}
            alt="Watermark"
            style={getImageSizeStyle()}
            className="object-contain filter drop-shadow-md"
          />
        </div>
      ) : (
        <div
          style={{
            ...fontStyle,
            ...getColorStyle()
          }}
          className={`uppercase font-medium transition-all duration-300 ${getTextSizeClass()} ${
            watermark.showBorder
              ? 'border border-current/40 backdrop-blur-[1px] bg-black/10'
              : ''
          }`}
        >
          {watermark.text || 'DESIGN PRIVÉE'}
        </div>
      )}
    </div>
  );
};

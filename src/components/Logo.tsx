import React from 'react';
import { useSiteData } from '../context/SiteContext';
import uploadedLogo from '../assets/images/regenerated_image_1786437616291.png';
import brandLogoWhite from '../assets/images/brand_logo_white.png';

interface LogoProps {
  className?: string;
  color?: string; // Kept for backwards compatibility
  variant?: 'light' | 'dark' | 'auto';
  height?: number | string;
  position?: 'header' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  height = 'auto',
  position = 'header'
}) => {
  const { data } = useSiteData();
  const branding = data?.branding;

  // Determine logo source
  let logoSrc = variant === 'dark' ? brandLogoWhite : uploadedLogo;

  if (position === 'header' && branding?.headerLogoUrl) {
    logoSrc = branding.headerLogoUrl;
  } else if (position === 'footer' && branding?.footerLogoUrl) {
    logoSrc = branding.footerLogoUrl;
  }

  // Determine width and max-height styles
  let customWidth: number | undefined;
  let customMaxHeight: number | string | undefined = height !== 'auto' ? height : undefined;

  const isAutoHeight = branding?.autoHeightProportional !== false; // defaults to true

  if (position === 'header' && branding?.headerLogoWidth) {
    customWidth = branding.headerLogoWidth;
  } else if (position === 'footer' && branding?.footerLogoWidth) {
    customWidth = branding.footerLogoWidth;
  }

  // If auto proportional height is enabled, height scales automatically according to width
  if (!isAutoHeight) {
    if (position === 'header' && branding?.headerLogoMaxHeight && height === 'auto') {
      customMaxHeight = `${branding.headerLogoMaxHeight}px`;
    } else if (position === 'footer' && branding?.footerLogoMaxHeight && height === 'auto') {
      customMaxHeight = `${branding.footerLogoMaxHeight}px`;
    }
  }

  return (
    <div className={`inline-block text-center ${className}`}>
      <img
        src={logoSrc}
        alt={branding?.siteTitle || "DESIGN PRIVÉE BY VIKRANTT"}
        referrerPolicy="no-referrer"
        className="w-full h-auto object-contain transition-all duration-300 mx-auto"
        style={{
          width: customWidth ? `${customWidth}px` : undefined,
          maxWidth: customWidth ? `${customWidth}px` : '280px',
          height: isAutoHeight ? 'auto' : undefined,
          maxHeight: customMaxHeight
        }}
      />
    </div>
  );
};

export default Logo;

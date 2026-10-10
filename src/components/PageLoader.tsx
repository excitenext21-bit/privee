import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useSiteData } from '../context/SiteContext';

interface PageLoaderProps {
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const { isSiteReady } = useSiteData();
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Elegant smooth progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // If cloud database is not ready yet, gently hold at ~88%
        if (!isSiteReady && prev >= 88) {
          return 88;
        }

        // Fast acceleration once cloud DB is ready
        if (isSiteReady && prev >= 88) {
          return Math.min(100, prev + 6);
        }

        // Organic pacing curve
        const step = prev < 60 ? 4.5 : prev < 85 ? 3 : 2;
        return Math.min(100, prev + step);
      });
    }, 24);

    return () => clearInterval(interval);
  }, [isSiteReady]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        const doneTimer = setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 800); // Wait for fade out animation to finish
        return () => clearTimeout(doneTimer);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] transition-all duration-700 ease-out pointer-events-none select-none ${
        isFadingOut ? 'opacity-0 scale-[1.02] filter blur-[1px]' : 'opacity-100 scale-100'
      }`}
      aria-hidden={isDone}
    >
      {/* Subtle luxury ambient glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F3EFEA]/60 to-transparent pointer-events-none" />

      {/* Decorative luxury architectural lines */}
      <div className="relative flex flex-col items-center max-w-xs sm:max-w-sm px-6 text-center">
        
        {/* Top vertical delicate hairline */}
        <div 
          className="w-[1px] bg-gradient-to-b from-transparent to-[#C5B39C] transition-all duration-700 mb-6"
          style={{ height: `${Math.min(48, progress * 0.48)}px` }}
        />

        {/* Brand Monogram / Logo Mark */}
        <div className="relative transform transition-all duration-700 py-2">
          {/* Subtle pulsating gold halo */}
          <div className="absolute -inset-4 bg-[#C5B39C]/10 rounded-full blur-xl animate-pulse" />
          
          <Logo className="w-[140px] sm:w-[170px] relative z-10 transition-opacity duration-500" />
        </div>

        {/* Creative Luxury Progress Bar */}
        <div className="mt-6 w-44 sm:w-52 flex flex-col items-center">
          <div className="w-full h-[1.5px] bg-[#E8E2D9] relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#D4C3B3] via-[#999894] to-[#C5B39C] transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Minimal percentage indicator */}
          <div className="mt-3 flex items-center justify-between w-full text-[9px] font-mono uppercase tracking-[0.2em] text-[#9E988F]">
            <span>INITIALIZING</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Bottom vertical delicate hairline */}
        <div 
          className="w-[1px] bg-gradient-to-b from-[#C5B39C] to-transparent transition-all duration-700 mt-6"
          style={{ height: `${Math.min(48, progress * 0.48)}px` }}
        />
      </div>
    </div>
  );
};

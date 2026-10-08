import React, { useEffect } from 'react';
import { PortfolioItem } from '../types';
import { X, MapPin, Calendar, Sparkles } from 'lucide-react';
import { WatermarkOverlay } from './WatermarkOverlay';

interface LightBoxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const LightBoxModal: React.FC<LightBoxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#999894]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn">
      {/* Modal Container */}
      <div className="relative bg-[#FAF8F5] max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D9] shadow-2xl grid grid-cols-1 md:grid-cols-12">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-3 bg-[#999894] text-[#FAF8F5] hover:bg-[#B59E83] transition-colors rounded-full cursor-pointer shadow-md"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image */}
        <div className="relative md:col-span-7 bg-[#999894] flex items-center justify-center p-2 overflow-hidden min-h-[300px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full max-h-[70vh] object-contain"
          />
          <WatermarkOverlay />
        </div>

        {/* Right Column: Editorial Details */}
        <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#A39282] mb-3 font-mono">
              <Sparkles size={12} className="text-[#B59E83]" />
              <span>{item.category} COLLECTION</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#999894] font-light leading-tight mb-4">
              {item.title}
            </h3>

            <div className="space-y-2 mb-6 border-y border-[#E8E2D9] py-4 text-xs text-[#78716C]">
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-[#B59E83]" />
                <span>Location: {item.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={14} className="text-[#B59E83]" />
                <span>Year: {item.year}</span>
              </div>
            </div>

            <p className="text-sm text-[#999894] leading-relaxed font-sans italic">
              "{item.description}"
            </p>
          </div>

          <div className="pt-8 border-t border-[#E8E2D9] mt-8 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A8F85]">
              DESIGN PRIVÉE BY VIKRANTT
            </span>
            <a
              href="#contact"
              onClick={onClose}
              className="text-xs uppercase tracking-[0.2em] text-[#999894] font-medium border-b border-[#999894] hover:text-[#B59E83]"
            >
              Inquire Similar Event
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

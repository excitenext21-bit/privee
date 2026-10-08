import React from 'react';
import { useSiteData } from '../context/SiteContext';

export const Publications: React.FC = () => {
  const { data } = useSiteData();
  const { publications } = data;

  return (
    <section className="py-10 sm:py-14 px-6 bg-[#FAF8F5] border-b border-[#E8E2D9]/40">
      <div className="max-w-7xl mx-auto">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A8F85] text-center mb-8 font-medium">
          {publications.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-90">
          {publications.items.map((pub) => {
            const applyGrayscale = publications.globalGrayscale || pub.grayscale;

            return (
              <div key={pub.id} className="flex flex-col items-center justify-center text-center gap-2 max-w-[180px]">
                {pub.logoUrl ? (
                  <>
                    <img
                      src={pub.logoUrl}
                      alt={pub.name}
                      className={`h-9 sm:h-12 max-w-[160px] object-contain transition-all ${
                        applyGrayscale ? 'grayscale contrast-110 opacity-80 hover:opacity-100' : ''
                      }`}
                    />
                    {pub.name && (
                      <span className="font-serif text-[11px] sm:text-xs tracking-[0.2em] text-[#635D55] uppercase font-medium">
                        {pub.name}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-serif text-sm sm:text-base tracking-[0.25em] text-[#2C2A29] uppercase font-light">
                    {pub.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

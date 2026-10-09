import React, { useState, useEffect } from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';
import meetTheDesignerBg from '../assets/images/meet_the_designer_bg.jpg';
import meetTheDesignerPortrait from '../assets/images/meet_the_designer_portrait.jpg';

export const AboutVikrantt: React.FC = () => {
  const { data } = useSiteData();
  const { vikrantt } = data;
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  const portraitSrc =
    vikrantt.vikranttPortraitUrl &&
    !vikrantt.vikranttPortraitUrl.includes('photo-1507003211169') &&
    !vikrantt.vikranttPortraitUrl.includes('media_1791464269384')
      ? vikrantt.vikranttPortraitUrl
      : meetTheDesignerPortrait;

  const bgSrc =
    (vikrantt as any).bgImageUrl && !(vikrantt as any).bgImageUrl.includes('photo-1519741497674')
      ? (vikrantt as any).bgImageUrl
      : meetTheDesignerBg;

  const fallbackBioText =
    'Vikrantt draws on years of experience in destination wedding designing & decor, creating <i>unique experiences</i> for once in a <i>lifetime memories</i>';
  const bioText =
    !vikrantt.bioHighlightText || vikrantt.bioHighlightText.includes('event planning industry')
      ? fallbackBioText
      : vikrantt.bioHighlightText;

  // Keyboard shortcut (Escape) and background scroll lock for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBioModalOpen(false);
      }
    };

    if (isBioModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBioModalOpen]);

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    if (text.includes('<i>') || text.includes('<em>') || text.includes('<I>') || text.includes('<EM>')) {
      const parts = text.split(/(<i\b[^>]*>.*?<\/i>|<em\b[^>]*>.*?<\/em>)/gi);
      return parts.map((part, index) => {
        const match = part.match(/<(?:i|em)\b[^>]*>(.*?)<\/(?:i|em)>/i);
        if (match) {
          return (
            <span
              key={index}
              style={{
                fontStyle: 'italic',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit'
              }}
              className="italic"
            >
              {match[1]}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      });
    }
    return text;
  };

  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-[#FAF8F5]">
      {/* Background Image: starts bright at top with white bokeh, matching 1st reference image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgSrc}
          alt="Ambient wedding backdrop"
          className="w-full h-full object-cover object-top select-none pointer-events-none"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          
          {/* Left Column: Portrait & Heading */}
          <div className="w-full md:w-1/2 max-w-[420px] shrink-0">
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', 'Didot', serif",
                fontSize: 'clamp(26px, 4.5vw, 36px)',
                fontWeight: 400,
                color: '#999894',
                lineHeight: 1.25,
                marginBottom: '1rem',
                textAlign: 'center',
                ...getStyleObject(vikrantt.portraitHeadingStyle)
              }}
              className="font-serif transition-all text-center"
            >
              {vikrantt.portraitHeading || 'Meet the Designer'}
            </h3>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EAEAEA] shadow-md">
              <img
                src={portraitSrc}
                alt="Meet the Designer - Vikrantt"
                className="w-full h-full object-cover object-top"
              />
              <WatermarkOverlay />
            </div>
          </div>

          {/* Right Column: Solid Taupe Quote Box & CTA */}
          <div className="w-full md:w-1/2 max-w-[460px] shrink-0 flex flex-col items-start">
            <div className="w-full bg-[#999894] p-6 sm:p-10 md:p-12 lg:p-16 text-left shadow-lg">
              <p
                style={{
                  color: 'rgba(247, 244, 240, 1)',
                  lineHeight: 1.4,
                  fontSize: 'clamp(18px, 3.8vw, 28px)',
                  textAlign: 'left',
                  fontFamily: "'Nanum Myeongjo', serif",
                  fontWeight: 400,
                  fontStyle: 'normal'
                }}
              >
                {renderFormattedText(bioText)}
              </p>
            </div>

            {/* LEARN MORE ABOUT VIKRANTT Link with underline matching attached image */}
            <div className="mt-6 sm:mt-8 w-full flex justify-start text-left">
              <button
                type="button"
                onClick={() => setIsBioModalOpen(true)}
                className="inline-block text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.24em] text-[#F5F2ED] uppercase border-b border-[#F5F2ED] pb-1 hover:text-white hover:border-white transition-colors font-sans cursor-pointer focus:outline-none"
              >
                LEARN MORE ABOUT VIKRANTT
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Aesthetic Modal Popup without vertical scroll */}
      {isBioModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-bio-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsBioModalOpen(false);
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-[#FAF8F5] shadow-2xl overflow-y-auto max-h-[90vh] md:overflow-hidden flex flex-col md:flex-row border border-[#E8E2D9]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button with X Icon */}
            <button
              type="button"
              onClick={() => setIsBioModalOpen(false)}
              aria-label="Close bio popup"
              className="absolute top-3 right-3 sm:top-5 sm:right-5 text-[#999894] hover:text-[#1A1918] p-2 transition-colors z-30 focus:outline-none group cursor-pointer bg-white/70 md:bg-transparent rounded-full"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 stroke-current transition-transform group-hover:rotate-90 duration-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.25"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Left Column: Portrait Image */}
            <div className="w-full md:w-[38%] shrink-0 relative bg-[#EAEAEA] aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:min-h-[460px]">
              <img
                src={vikrantt.modalPortraitUrl || portraitSrc}
                alt="Vikrantt - Owner & Designer"
                className="w-full h-full object-cover object-top"
              />
              <WatermarkOverlay />
            </div>

            {/* Modal Right Column: Editorial Bio Content */}
            <div className="w-full md:w-[62%] p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Name Title */}
                <h3
                  id="modal-bio-title"
                  style={{ fontFamily: "'Cormorant Garamond', 'Didot', serif" }}
                  className="text-2xl sm:text-[28px] text-[#999894] tracking-[0.18em] font-normal uppercase mb-1"
                >
                  {vikrantt.modalBioTitle || 'VIKRANTT'}
                </h3>

                {/* Subtitle / Role */}
                <p
                  style={{ fontFamily: "'Cormorant Garamond', 'Didot', serif" }}
                  className="italic font-serif text-sm sm:text-base text-[#A8A298] font-light mb-4 sm:mb-5"
                >
                  {vikrantt.modalBioSubtitle || 'Owner & Designer'}
                </p>

                {/* Paragraphs */}
                <div
                  style={{
                    color: 'rgba(153, 152, 148, 1)',
                    lineHeight: 1.8,
                    letterSpacing: '0.05em',
                    fontSize: '12px',
                    textAlign: 'left',
                    fontFamily: "'Karla', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'normal'
                  }}
                  className="space-y-3.5 sm:space-y-4"
                >
                  <p
                    style={{
                      color: 'rgba(153, 152, 148, 1)',
                      lineHeight: 1.8,
                      letterSpacing: '0.05em',
                      fontSize: '12px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                  >
                    {vikrantt.modalBioParagraph1 ||
                      'Vikrantt is artistic by nature. He creates impeccable events filled with the unexpected and attention to every sensory encounter. He selects and directs color palette, texture, lighting, organic elements, culinary cuisine and the melodic theme of the music. His events are truly magical settings where conversations and interactions are born within the elements of the ambiance for an unforgettable experience.'}
                  </p>
                  <p
                    style={{
                      color: 'rgba(153, 152, 148, 1)',
                      lineHeight: 1.8,
                      letterSpacing: '0.05em',
                      fontSize: '12px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                  >
                    {vikrantt.modalBioParagraph2 ||
                      'Vikrantt is the creative director of each event using his experience and knowledge to source design elements that fit the vision and personalities of his clients. Much of his time is spent curating design boards and color palettes, selecting linen and stationery swatches, and showcasing mock-up tablescapes for client presentations. From an initial phone call to a wedding-day install, creating flatlays, day-of styling, Vikrantt is hands-on with all creative aspects.'}
                  </p>
                </div>
              </div>

              {/* Inquire CTA link */}
              <div className="mt-5 pt-3">
                <a
                  href="#contact"
                  onClick={() => setIsBioModalOpen(false)}
                  className="inline-block text-[11px] uppercase tracking-[0.25em] font-sans text-[#7A756C] hover:text-[#1A1918] border-b border-[#C8C2B8] hover:border-[#1A1918] pb-1 transition-colors cursor-pointer"
                >
                  INQUIRE WITH VIKRANTT
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};



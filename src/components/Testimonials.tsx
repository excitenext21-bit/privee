import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { WatermarkOverlay } from './WatermarkOverlay';
import testimonialsPriveeMagazine from '../assets/images/testimonials_privee_magazine.jpg';

export const Testimonials: React.FC = () => {
  const { data } = useSiteData();
  const { testimonials } = data;

  const displayImage =
    testimonials.imageUrl && !testimonials.imageUrl.includes('photo-1519741497674')
      ? testimonials.imageUrl
      : testimonialsPriveeMagazine;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = testimonials.items.length > 0 ? testimonials.items : [
    {
      id: 'default',
      clientName: 'Shruti & Rohan',
      roleOrRelation: 'WEDDING CLIENT',
      quote: 'When combined, the unique skill set Vikrantt offers brings events to another level.',
      detailedQuote: 'Vikrantt is a visionary whose style is elevated, modern and fashion forward. Every detail was executed beyond our wildest dreams.'
    }
  ];

  // Soft looping interval every 3 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const activeTestimonial = items[activeIdx % items.length];

  return (
    <section
      id="testimonials"
      className="transition-all duration-500"
    >
      {/* Top Off-White Block for Testimonial Quotes */}
      <div
        style={{ backgroundColor: 'rgba(247,244,240,0.6)' }}
        className="w-full pt-12 sm:pt-16 pb-14 sm:pb-20 px-6 sm:px-12 md:px-16"
      >
        <div className="max-w-6xl mx-auto">
          {/* Testimonial Quote Block */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="min-h-[220px] sm:min-h-[190px] flex flex-col justify-between relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="flex flex-col justify-between h-full w-full"
              >
                {/* Top Headline Quote */}
                <div className="mb-6 sm:mb-8">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Didot', 'Playfair Display', serif",
                      color: 'rgba(153,152,148,1)',
                      lineHeight: 1.2,
                      letterSpacing: '0.05em',
                      fontSize: '26px',
                      textAlign: 'left',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      ...getStyleObject(testimonials.quoteStyle)
                    }}
                    className="max-w-2xl text-left md:mx-0"
                  >
                    “{activeTestimonial.quote}”
                  </h3>
                </div>

                {/* Detailed Paragraph Block + Client Attribution */}
                <div className="max-w-2xl ml-auto text-right">
                  <p
                    style={{
                      fontFamily: "'Nanum Myeongjo', serif",
                      color: 'rgba(153,152,148,1)',
                      textTransform: 'none',
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                      fontSize: '15px',
                      textAlign: 'right',
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="mb-6"
                  >
                    {activeTestimonial.detailedQuote || activeTestimonial.quote}
                  </p>

                  {/* Client Name & Role */}
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-sans font-medium text-[#8C867B]">
                    {activeTestimonial.clientName.toUpperCase()} &nbsp;|&nbsp; {activeTestimonial.roleOrRelation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Pure White Block */}
      <div className="w-full bg-white pb-20 sm:pb-28 px-6 sm:px-12 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column Image */}
            <div className="md:col-span-6 flex justify-center md:justify-start -mt-12 sm:-mt-16 md:-mt-20">
              <div className="relative w-full max-w-[460px] aspect-[4/5] overflow-hidden shadow-sm bg-[#EFECE6] z-10">
                <img
                  src={displayImage}
                  alt="PRIVÉE Wedding - Couple of the Month"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <WatermarkOverlay />
              </div>
            </div>

            {/* Right Column Heading */}
            <div className="md:col-span-6 flex flex-col justify-center max-w-md mx-auto md:mx-0 md:pl-6 pt-10 sm:pt-14 md:pt-20">
              <h3
                style={{
                  letterSpacing: '0.02em',
                  fontSize: '30px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  color: 'rgba(153, 152, 148, 1)',
                  lineHeight: 1.2,
                  ...getStyleObject(testimonials.headingStyle)
                }}
                className="text-left mb-4"
              >
                This is <i style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>your</i> moment.
              </h3>

              <div className="text-right w-full">
                <p
                  style={{
                    textTransform: 'uppercase',
                    lineHeight: 1.8,
                    letterSpacing: '0.1em',
                    fontSize: '14px',
                    textAlign: 'right',
                    fontFamily: "'Karla', sans-serif",
                    fontWeight: 400,
                    fontStyle: 'normal',
                    color: 'rgba(153, 152, 148, 1)'
                  }}
                  className="w-full"
                >
                  We simply make it what you’ve always dreamt it would be.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};



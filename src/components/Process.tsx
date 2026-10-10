import React, { useState } from 'react';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  const { data } = useSiteData();
  const { process } = data;

  const [activeStep, setActiveStep] = useState<string>('01');

  const steps = process.steps.length > 0 ? process.steps : [
    { number: '01', title: 'DISCOVERY', description: 'Understanding your story and aesthetic vision.' }
  ];

  const currentStep = steps.find((s) => s.number === activeStep) || steps[0];

  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#A39282] font-medium block mb-2 sm:mb-3">
            {process.eyebrow}
          </span>
          <h2
            style={{
              ...getStyleObject(process.headingStyle),
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
            className="mb-4 sm:mb-6"
          >
            {process.heading && process.heading.trim().toUpperCase() === 'HERE FROM THE VERY START, HERE FOR EVERY PART.'
              ? 'Here from the Very Start, Here for Every Part.'
              : (process.heading || 'Here from the Very Start, Here for Every Part.')}
          </h2>
          <div className="w-12 h-[1px] bg-[#C5B39C] mx-auto"></div>
        </div>

        {/* Process Step Tabs & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Vertical Step Selector */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {steps.map((step) => {
              const isActive = (currentStep?.number === step.number);
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`p-4 sm:p-6 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#999894] text-[#FAF8F5] shadow-md border-l-4 border-[#C5B39C]'
                      : 'bg-[#F3EFEA] text-[#999894] hover:bg-[#E8E2D9] border-l-4 border-transparent'
                  }`}
                >
                  <h3
                    style={{
                      ...getStyleObject(process.stepTitleStyle),
                      textTransform: 'none',
                      color: isActive ? '#FAF8F5' : '#999894'
                    }}
                    className="text-base sm:text-lg font-serif tracking-[0.04em] sm:tracking-[0.06em] normal-case transition-colors"
                  >
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Step Focus Box */}
          <div className="lg:col-span-7 bg-[#F3EFEA] p-6 sm:p-10 md:p-12 shadow-xs relative min-h-auto sm:min-h-[360px] flex flex-col justify-between">
            {currentStep && (
              <div key={currentStep.number} className="animate-fadeIn space-y-5 sm:space-y-6">
                <div className="flex items-center space-x-2.5 sm:space-x-3 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#A39282] pb-3 sm:pb-4 border-b border-[#E8E2D9]/60">
                  <CheckCircle2 size={15} className="text-[#C5B39C] shrink-0" />
                  <span>DESIGN PRIVÉÉ METHODOLOGY</span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(20px, 4.5vw, 28px)',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    textTransform: 'none',
                    letterSpacing: '0.08em',
                    lineHeight: 1.2,
                    ...getStyleObject(process.stepTitleStyle),
                    color: (process.stepTitleStyle?.fontColor && !['#ffffff', '#fff', '#faf8f5', 'white', 'rgb(255,255,255)', 'rgba(255,255,255,1)', '#fefefe', '#f9f9f9', '#f3efea'].includes(process.stepTitleStyle.fontColor.toLowerCase().trim()))
                      ? process.stepTitleStyle.fontColor
                      : '#999894'
                  }}
                  className="font-serif text-[#999894] uppercase font-light"
                >
                  {currentStep.title}
                </h3>

                <p id={`process-desc-${currentStep.number}`} className="text-sm sm:text-base md:text-lg text-[#999894] font-serif leading-relaxed italic">
                  "{currentStep.description}"
                </p>

                <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.2em] text-[#78716C]">
                  <span>COMPREHENSIVE EVENT DESIGN</span>
                  <a
                    href="#contact"
                    className="text-[#999894] font-medium uppercase hover:text-[#B59E83] border-b border-[#999894]"
                  >
                    Discuss Your Event →
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};


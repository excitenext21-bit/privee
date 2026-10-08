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
    <section id="services" className="py-24 px-6 md:px-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.35em] text-[#A39282] font-medium block mb-3">
            {process.eyebrow}
          </span>
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
              ...getStyleObject(process.headingStyle)
            }}
            className="mb-6"
          >
            {process.heading}
          </h2>
          <div className="w-12 h-[1px] bg-[#C5B39C] mx-auto"></div>
        </div>

        {/* Process Step Tabs & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Vertical Step Selector */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step) => {
              const isActive = (currentStep?.number === step.number);
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(step.number)}
                  className={`p-6 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#999894] text-[#FAF8F5] shadow-md border-l-4 border-[#C5B39C]'
                      : 'bg-[#F3EFEA] text-[#999894] hover:bg-[#E8E2D9] border-l-4 border-transparent'
                  }`}
                >
                  <h3
                    style={{
                      ...getStyleObject(process.stepTitleStyle),
                      color: isActive ? '#FAF8F5' : '#999894'
                    }}
                    className="text-lg font-serif tracking-[0.1em] uppercase transition-colors"
                  >
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Step Focus Box */}
          <div className="lg:col-span-7 bg-[#F3EFEA] p-8 sm:p-12 shadow-xs relative min-h-[380px] flex flex-col justify-between">
            {currentStep && (
              <div key={currentStep.number} className="animate-fadeIn space-y-6">
                <div className="flex items-center space-x-3 text-xs tracking-[0.3em] uppercase text-[#A39282] pb-4">
                  <CheckCircle2 size={16} className="text-[#C5B39C]" />
                  <span>DESIGN PRIVÉE METHODOLOGY</span>
                </div>

                <h3
                  style={{
                    fontSize: '28px',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.2,
                    ...getStyleObject(process.stepTitleStyle),
                    color: (process.stepTitleStyle?.fontColor && !['#ffffff', '#fff', '#faf8f5', 'white', 'rgb(255,255,255)', 'rgba(255,255,255,1)', '#fefefe', '#f9f9f9', '#f3efea'].includes(process.stepTitleStyle.fontColor.toLowerCase().trim()))
                      ? process.stepTitleStyle.fontColor
                      : '#999894'
                  }}
                  className="text-2xl sm:text-3xl font-serif text-[#999894] tracking-[0.08em] uppercase font-light"
                >
                  {currentStep.title}
                </h3>

                <p id={`process-desc-${currentStep.number}`} className="text-base sm:text-lg text-[#999894] font-serif leading-relaxed italic">
                  "{currentStep.description}"
                </p>

                <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.2em] text-[#78716C]">
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


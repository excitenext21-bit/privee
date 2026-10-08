import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { CheckCircle, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { WatermarkOverlay } from './WatermarkOverlay';

export const ContactForm: React.FC = () => {
  const { data, addEnquiry, openCms } = useSiteData();
  const { contact } = data;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    eventDate: '',
    location: '',
    guestCount: '',
    budget: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg('Please fill in required fields (Name and Email).');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Save enquiry to context/state
      addEnquiry(formData);

      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      eventDate: '',
      location: '',
      guestCount: '',
      budget: '',
      message: ''
    });
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: '#ECE9E3' }}
      className="pt-14 sm:pt-20 pb-6 sm:pb-8 overflow-hidden"
    >
      <div className="w-full pl-[2.5vw] pr-[10vw]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-6 flex flex-col items-start text-left">
            
            {/* Title Block */}
            <div className="mb-8 sm:mb-10 text-center w-full max-w-[480px] lg:max-w-[520px] px-6 sm:px-8">
              <h2
                style={{
                  color: 'rgba(0,0,0,0.5)',
                  lineHeight: 1.8,
                  letterSpacing: '0.02em',
                  fontSize: '18px',
                  textAlign: 'center',
                  fontFamily: "'Nanum Myeongjo', serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  ...getStyleObject(contact.headingStyle)
                }}
                className="max-w-sm mx-auto whitespace-pre-line"
              >
                {contact.heading}
              </h2>
            </div>

            {/* Photo & Contact Box Overlay */}
            <div className="relative w-full max-w-[480px] lg:max-w-[520px] pl-0 ml-0 mr-auto mb-12 md:mb-0">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xs bg-[#EFECE6]">
                <img
                  src={contact.imageUrl}
                  alt="Bride and Groom Holding Hands"
                  className="w-full h-full object-cover"
                />
                <WatermarkOverlay />
              </div>

              {/* Contact Details */}
              <div
                style={{
                  fontFamily: "'Nanum Myeongjo', 'Cormorant Garamond', serif",
                  color: 'rgba(120,115,108,1)',
                  fontSize: '13px',
                  lineHeight: 1.7
                }}
                className="md:absolute md:left-full md:ml-5 lg:ml-7 md:bottom-1 w-auto min-w-[220px] text-left mt-6 md:mt-0 z-10"
              >
                <p>
                  E:{' '}
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-[#1A1918] hover:underline underline-offset-2 transition-colors cursor-pointer"
                    title={`Email ${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </p>
                <p>
                  P:{' '}
                  <a
                    href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}
                    className="hover:text-[#1A1918] hover:underline underline-offset-2 transition-colors cursor-pointer"
                    title={`Call ${contact.phone}`}
                  >
                    {contact.phone}
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Intro text & Form */}
          <div className="md:col-span-6 flex flex-col justify-start pt-1 max-w-[455px] w-full md:ml-auto">
            
            {/* Intro Text */}
            <div className="mb-6 space-y-2">
              <p
                style={{
                  fontFamily: "'Nanum Myeongjo', 'Cormorant Garamond', serif",
                  color: 'rgba(140,135,128,1)',
                  fontSize: '13.5px',
                  lineHeight: 1.55,
                  ...getStyleObject(contact.introStyle)
                }}
                className="whitespace-pre-line"
              >
                {contact.introText}
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle size={36} className="text-[#A39A8E] mx-auto" />
                <h3 className="text-xl font-serif text-[#3A3835]">Thank You</h3>
                <p
                  style={{ fontFamily: "'Nanum Myeongjo', serif", color: 'rgba(140,135,128,1)' }}
                  className="text-xs max-w-md mx-auto leading-relaxed"
                >
                  Your inquiry has been received. We look forward to reviewing your details and connecting with you shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="px-5 py-2 bg-[#3A3835] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#8C867B] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-[11px] tracking-wider uppercase border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* NAME */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] py-1.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B]"
                  />
                </div>

                {/* EMAIL ADDRESS */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] py-1.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B]"
                  />
                </div>

                {/* EVENT DATE */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    EVENT DATE
                  </label>
                  <input
                    type="text"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] py-1.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B]"
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    LOCATION
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] py-1.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B]"
                  />
                </div>

                {/* GUEST COUNT */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    GUEST COUNT
                  </label>
                  <input
                    type="text"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] py-1.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B]"
                  />
                </div>

                {/* BUDGET */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    BUDGET
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] py-1.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B]"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal'
                    }}
                    className="block text-[#A09A92] mb-0.5"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C8C2B8] p-2.5 text-xs text-[#3A3835] focus:outline-none focus:border-[#8C867B] resize-none mt-0.5"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-1 flex items-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2.5 text-[#A09A92] hover:text-[#3A3835] transition-colors cursor-pointer group"
                  >
                    <span
                      style={{ fontFamily: "'Cormorant Garamond', 'Didot', serif" }}
                      className="italic text-sm sm:text-base"
                    >
                      {loading ? 'Submitting...' : 'Submit Form'}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-[#A09A92]/40 group-hover:bg-[#8C867B] text-white flex items-center justify-center transition-colors">
                      <svg className="w-2.5 h-2.5 fill-current text-white" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Navigation center-aligned */}
        <div className="mt-14 sm:mt-16 pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-3 items-center text-center gap-6 md:gap-4 max-w-5xl mx-auto">
          {/* Left Navigation Links */}
          <div className="flex items-center justify-center md:justify-end space-x-8 lg:space-x-10">
            <a
              href="#portfolio"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#1A1918] transition-colors font-normal cursor-pointer"
            >
              PORTFOLIO
            </a>
            <a
              href="#about"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#1A1918] transition-colors font-normal cursor-pointer"
            >
              ABOUT
            </a>
          </div>

          {/* Center Brand Logo with vertical lines */}
          <div
            className="flex items-center justify-center space-x-5 sm:space-x-7 md:space-x-8 cursor-pointer transition-opacity hover:opacity-85 my-1 md:my-0"
            onClick={(e) => {
              // If user clicks with Alt key or triple-clicks, discretely open Admin CMS
              if (e.altKey || e.detail === 3) {
                openCms();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            title="Design Privée"
          >
            <div className="h-7 sm:h-9 md:h-10 w-[1px] bg-[#C8C2B8] shrink-0" />
            <Logo className="w-[103px] sm:w-[126px] md:w-[138px] py-0.5 mx-auto" />
            <div className="h-7 sm:h-9 md:h-10 w-[1px] bg-[#C8C2B8] shrink-0" />
          </div>

          {/* Right Navigation Links */}
          <div className="flex items-center justify-center md:justify-start space-x-6 lg:space-x-8">
            <a
              href="#services"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#1A1918] transition-colors font-normal cursor-pointer"
            >
              SERVICES
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '12px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#1A1918] transition-colors font-normal cursor-pointer"
            >
              CONTACT
            </a>
            <div className="flex items-center space-x-3 text-[#999894]">
              <a
                href={contact.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#1A1918] transition-colors"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};



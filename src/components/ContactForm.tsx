import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { useSiteData, getStyleObject } from '../context/SiteContext';
import { CheckCircle, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { WatermarkOverlay } from './WatermarkOverlay';
import approachOceanMandap from '../assets/images/approach_ocean_mandap.jpg';

export const ContactForm: React.FC = () => {
  const { data, addEnquiry, openCms } = useSiteData();
  const { contact } = data;

  const contactImageSrc =
    contact.imageUrl && !contact.imageUrl.includes('photo-1519741497674') && !contact.imageUrl.includes('contact_mandap_couple')
      ? contact.imageUrl
      : approachOceanMandap;

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
      style={{ backgroundColor: '#ECEAE5' }}
      className="pt-12 sm:pt-20 pb-8 sm:pb-12 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Poem Title Block - Centered directly over the photo */}
            <div className="w-full max-w-[440px] lg:max-w-[480px] mb-6 sm:mb-10 text-center mx-auto lg:mx-0">
              <div
                style={{
                  color: 'rgba(0, 0, 0, 0.5)',
                  lineHeight: 1.8,
                  letterSpacing: '0.02em',
                  fontSize: 'clamp(16px, 3.5vw, 18px)',
                  textAlign: 'center',
                  fontFamily: "'Nanum Myeongjo', serif",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  ...getStyleObject(contact.headingStyle)
                }}
                className="mx-auto"
              >
                {contact.heading && !contact.heading.includes("Let's make your day") && !contact.heading.includes("Let’s make your day") ? (
                  <p className="whitespace-pre-line">{contact.heading}</p>
                ) : (
                  <>
                    <p style={{ fontSize: '18px', fontStyle: 'normal', fontFamily: "'Nanum Myeongjo', serif" }}>Let’s make your day</p>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontFamily: "'Nanum Myeongjo', serif" }}>a pure dream–</p>
                    <p style={{ fontSize: '18px', fontStyle: 'normal', fontFamily: "'Nanum Myeongjo', serif" }}>Even better than you imagined</p>
                    <p style={{ fontSize: '18px', fontStyle: 'italic', fontFamily: "'Nanum Myeongjo', serif" }}>it could be</p>
                  </>
                )}
              </div>
            </div>

            {/* Photo & Contact Details */}
            <div className="relative w-full max-w-[440px] lg:max-w-[480px] mx-auto lg:mx-0 mb-8 lg:mb-0">
              <div className="relative w-full aspect-[4/5] overflow-hidden shadow-xs bg-[#EFECE6]">
                <img
                  src={contactImageSrc}
                  alt="Bride and Groom under Floral Mandap"
                  className="w-full h-full object-cover"
                />
                <WatermarkOverlay />
              </div>

              {/* Contact Details beside photo on desktop, below on mobile */}
              <div
                style={{
                  fontFamily: "'Nanum Myeongjo', serif",
                  color: 'rgba(0, 0, 0, 0.65)',
                  fontSize: '13px',
                  lineHeight: 1.8
                }}
                className="lg:absolute lg:left-full lg:ml-6 lg:bottom-1 w-auto min-w-[200px] text-center lg:text-left mt-4 sm:mt-6 lg:mt-0 z-10"
              >
                <p>
                  E:{' '}
                  <a
                    href={`mailto:${contact.email || 'info@designprivee.com'}`}
                    className="hover:text-black transition-colors cursor-pointer"
                    title={`Email ${contact.email || 'info@designprivee.com'}`}
                  >
                    {contact.email || 'info@designprivee.com'}
                  </a>
                </p>
                <p>
                  P:{' '}
                  <a
                    href={`tel:${(contact.phone || '+91 98906 00039').replace(/\s+/g, '')}`}
                    className="hover:text-black transition-colors cursor-pointer"
                    title={`Call ${contact.phone || '+91 98906 00039'}`}
                  >
                    {contact.phone || '+91 98906 00039'}
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Intro text & Form */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-1 max-w-[440px] w-full mx-auto lg:mx-0 lg:ml-auto">
            
            {/* Intro Text */}
            <div className="mb-7 text-left">
              <div
                style={{
                  fontFamily: "'Nanum Myeongjo', serif",
                  color: 'rgba(0, 0, 0, 0.65)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  ...getStyleObject(contact.introStyle)
                }}
                className="space-y-3"
              >
                {contact.introText && !contact.introText.includes('Reach out and share') ? (
                  <p className="whitespace-pre-line">{contact.introText}</p>
                ) : (
                  <>
                    <p style={{ fontSize: '14px' }}>
                      Reach out and share a few details about your day and we'll be in touch to book a complimentary consultation.
                    </p>
                    <p style={{ fontSize: '14px' }}>
                      <span style={{ fontStyle: 'italic', fontSize: '14px', fontFamily: "'Nanum Myeongjo', serif" }}>Thank you</span> — we look forward to hearing from you!
                    </p>
                  </>
                )}
              </div>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle size={36} className="text-[#A39A8E] mx-auto" />
                <h3 className="text-xl font-serif text-[#8A8487]">Thank You</h3>
                <p
                  style={{ fontFamily: "'Nanum Myeongjo', serif", color: '#807C81' }}
                  className="text-xs max-w-md mx-auto leading-relaxed"
                >
                  Your inquiry has been received. We look forward to reviewing your details and connecting with you shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="px-5 py-2 bg-[#999894] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#8C867B] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-[11px] tracking-wider uppercase border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* NAME */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-1"
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C6C4BF] pb-1 pt-0.5 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] transition-colors"
                  />
                </div>

                {/* EMAIL ADDRESS */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-1"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C6C4BF] pb-1 pt-0.5 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] transition-colors"
                  />
                </div>

                {/* EVENT DATE */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-1"
                  >
                    EVENT DATE
                  </label>
                  <input
                    type="text"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C6C4BF] pb-1 pt-0.5 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] transition-colors"
                  />
                </div>

                {/* LOCATION */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-1"
                  >
                    LOCATION
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C6C4BF] pb-1 pt-0.5 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] transition-colors"
                  />
                </div>

                {/* GUEST COUNT */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-1"
                  >
                    GUEST COUNT
                  </label>
                  <input
                    type="text"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C6C4BF] pb-1 pt-0.5 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] transition-colors"
                  />
                </div>

                {/* BUDGET */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-1"
                  >
                    BUDGET
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#C6C4BF] pb-1 pt-0.5 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] transition-colors"
                  />
                </div>

                {/* MESSAGE */}
                <div className="text-left">
                  <label
                    style={{
                      textTransform: 'uppercase',
                      lineHeight: 1.8,
                      letterSpacing: '0.1em',
                      fontSize: '14px',
                      textAlign: 'left',
                      fontFamily: "'Karla', sans-serif",
                      fontWeight: 400,
                      fontStyle: 'normal',
                      color: 'rgba(0, 0, 0, 0.5)'
                    }}
                    className="block mb-2"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-[#C6C4BF] p-3 text-xs sm:text-[13px] text-[#4A4641] focus:outline-none focus:border-[#7A756D] resize-none h-[115px] sm:h-[120px] transition-colors rounded-none"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-1 text-left">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center space-x-2.5 text-[#8C877E] hover:text-[#5E5952] transition-colors cursor-pointer group"
                  >
                    <span
                      style={{ fontFamily: "'Cormorant Garamond', 'Nanum Myeongjo', serif" }}
                      className="italic text-[14px] sm:text-[15px] font-normal"
                    >
                      {loading ? 'Submitting...' : 'Submit Form'}
                    </span>
                    <span className="w-4 h-4 rounded-full bg-[#999894] group-hover:bg-[#7A756D] text-white flex items-center justify-center transition-colors">
                      <svg className="w-2 h-2 fill-current" viewBox="0 0 20 20">
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
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between text-center gap-5 sm:gap-6 md:gap-4 max-w-5xl mx-auto">
          {/* Left Navigation Links */}
          <div className="flex items-center justify-center space-x-6 sm:space-x-8 lg:space-x-10 order-2 md:order-1">
            <a
              href="#portfolio"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#999894] transition-colors font-normal cursor-pointer"
            >
              PORTFOLIO
            </a>
            <a
              href="#about"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#999894] transition-colors font-normal cursor-pointer"
            >
              ABOUT
            </a>
          </div>

          {/* Center Brand Logo with vertical lines */}
          <div
            className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 cursor-pointer transition-opacity hover:opacity-85 my-1 md:my-0 order-1 md:order-2"
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
            <div className="h-6 sm:h-8 md:h-10 w-[1px] bg-[#C8C2B8] shrink-0" />
            <Logo className="w-[96px] sm:w-[120px] md:w-[138px] py-0.5 mx-auto" />
            <div className="h-6 sm:h-8 md:h-10 w-[1px] bg-[#C8C2B8] shrink-0" />
          </div>

          {/* Right Navigation Links */}
          <div className="flex items-center justify-center space-x-5 sm:space-x-6 lg:space-x-8 order-3">
            <a
              href="#services"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#999894] transition-colors font-normal cursor-pointer"
            >
              SERVICES
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: "'Karla', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                color: 'rgba(153,152,148,1)',
                textTransform: 'uppercase'
              }}
              className="hover:text-[#999894] transition-colors font-normal cursor-pointer"
            >
              CONTACT
            </a>
            <div className="flex items-center space-x-3 text-[#999894]">
              <a
                href={contact.instagramUrl || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#999894] transition-colors p-1"
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



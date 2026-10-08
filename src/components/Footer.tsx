import React, { useState } from 'react';
import { Instagram, Linkedin, Facebook, Mail, ArrowUp, CheckCircle, Send } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1918] text-[#FAF8F5] pt-20 pb-12 px-6 md:px-12 border-t border-[#2C2A29]">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Logo position="footer" variant="dark" className="text-left" />
            </div>

            <p className="text-xs text-[#A39282] max-w-sm leading-relaxed font-sans">
              Designed & Managed with Precision. Crafting artful & impeccably curated weddings reminiscent of your dream event worldwide.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A8F85] block mb-4">
                FOLLOW OUR JOURNEY
              </span>
              <div className="flex items-center space-x-5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 bg-[#2C2A29] hover:bg-[#C5B39C] hover:text-[#1A1918] transition-colors rounded-full text-[#FAF8F5]"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pinterest"
                  className="p-2.5 bg-[#2C2A29] hover:bg-[#C5B39C] hover:text-[#1A1918] transition-colors rounded-full text-[#FAF8F5]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345c-.091.378-.293 1.189-.333 1.356-.053.225-.173.272-.4.165-1.498-.697-2.435-2.887-2.435-4.648 0-3.786 2.751-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 bg-[#2C2A29] hover:bg-[#C5B39C] hover:text-[#1A1918] transition-colors rounded-full text-[#FAF8F5]"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 bg-[#2C2A29] hover:bg-[#C5B39C] hover:text-[#1A1918] transition-colors rounded-full text-[#FAF8F5]"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="mailto:info@designprivee.com"
                  aria-label="Email Us"
                  className="p-2.5 bg-[#2C2A29] hover:bg-[#C5B39C] hover:text-[#1A1918] transition-colors rounded-full text-[#FAF8F5]"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Email Subscription Field */}
          <div className="lg:col-span-7 bg-[#232120] p-8 sm:p-10 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5B39C] font-mono block mb-2">
                INSIGHTS & ESSAYS
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-light mb-3">
                Join our private mailing list for event design inspiration
              </h3>
              <p className="text-xs text-[#A39282] font-sans leading-relaxed mb-6">
                Receive curated articles on seasonal floral art, luxury venue architectural guides, and private event curation.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 bg-[#2C2A29] border border-[#C5B39C] flex items-center space-x-3 text-xs text-[#FAF8F5]">
                <CheckCircle size={18} className="text-[#C5B39C]" />
                <span>Thank you for subscribing to Design Privée Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#1A1918] border border-white/20 px-4 py-3 text-xs text-white placeholder-[#A39282] focus:border-[#C5B39C]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5B39C] text-[#1A1918] text-xs uppercase tracking-[0.25em] font-medium hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>© {new Date().getFullYear()} DESIGN PRIVÉE. All Rights Reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[11px] uppercase tracking-[0.2em] text-[#A39282] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back To Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_INFO } from '../data/content';
import { Logo } from './Logo';
import { useSiteData, getStyleObject } from '../context/SiteContext';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const { data } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const branding = data?.branding;
  const rawNavItems = branding?.navItems && branding.navItems.length > 0
    ? branding.navItems
    : [
        { id: 'portfolio', name: 'PORTFOLIO', href: '#portfolio' },
        { id: 'about', name: 'ABOUT', href: '#about' },
        { id: 'services', name: 'SERVICES', href: '#services' },
        { id: 'contact', name: 'CONTACT', href: '#contact' }
      ];

  // Exclude any admin buttons from the public header
  const navItems = rawNavItems.filter(
    (item) => item.id !== 'admin' && item.name?.trim().toUpperCase() !== 'ADMIN' && item.href !== '#admin' && item.href !== '#cms'
  );

  // Split navigation items evenly left/right around the center logo
  const midpoint = Math.ceil(navItems.length / 2);
  const leftNavLinks = navItems.slice(0, midpoint);
  const rightNavLinks = navItems.slice(midpoint);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navCustomStyle = getStyleObject(branding?.navStyle);

  const baseNavLinkStyle: React.CSSProperties = {
    color: 'rgba(153,152,148,1)',
    fontSize: '12px',
    fontFamily: "'Karla', sans-serif",
    textAlign: 'center',
    transitionProperty: 'color',
    transitionDuration: '0.3s',
    ...navCustomStyle
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${
        isScrolled ? 'py-3.5 shadow-2xs' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between md:justify-center">
        
        {/* Desktop Header: Centered Grouped Navigation with Logo */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {/* Left Side Links */}
          <nav className="flex items-center space-x-8 lg:space-x-10">
            {leftNavLinks.map((link) => {
              const isActive = activeSection === link.id || activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.id || link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    ...baseNavLinkStyle,
                    color: isActive ? '#1A1918' : (navCustomStyle.color || 'rgba(153,152,148,1)'),
                  }}
                  className="uppercase tracking-[0.28em] font-sans font-medium hover:text-[#1A1918] cursor-pointer"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Center Brand Logo */}
          <div
            className="text-center flex justify-center items-center cursor-pointer transition-opacity hover:opacity-85 px-4 lg:px-8"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo position="header" className="py-0.5" />
          </div>

          {/* Right Side Links */}
          <nav className="flex items-center space-x-8 lg:space-x-10">
            {rightNavLinks.map((link) => {
              const isActive = activeSection === link.id || activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.id || link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    ...baseNavLinkStyle,
                    color: isActive ? '#1A1918' : (navCustomStyle.color || 'rgba(153,152,148,1)'),
                  }}
                  className="uppercase tracking-[0.28em] font-sans font-medium hover:text-[#1A1918] cursor-pointer"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Header Bar */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div
            className="cursor-pointer transition-opacity hover:opacity-85"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo position="header" className="py-0.5" />
          </div>

          <button
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2C2A29] focus:outline-hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-white z-40 px-8 py-12 flex flex-col justify-between border-t border-[#E8E2D9] animate-fadeIn">
          <div className="flex flex-col space-y-8 text-center pt-6">
            {navItems.map((link) => (
              <a
                key={link.id || link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={baseNavLinkStyle}
                className="text-sm tracking-[0.3em] font-sans hover:text-[#1A1918] uppercase transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-center pt-10 border-t border-[#E8E2D9]">
            <p className="text-xs tracking-[0.25em] text-[#78716C] uppercase mb-2 font-sans">
              {BRAND_INFO.tagline}
            </p>
            <p className="text-xs text-[#9A8F85] font-serif italic">
              {BRAND_INFO.websiteUrl}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};


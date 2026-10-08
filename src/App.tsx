import React, { useState, useEffect } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Approach } from './components/Approach';
import { AboutVikrantt } from './components/AboutVikrantt';
import { Portfolio } from './components/Portfolio';
import { Publications } from './components/Publications';
import { Testimonials } from './components/Testimonials';
import { Process } from './components/Process';
import { ContactForm } from './components/ContactForm';
import { AdminCmsModal } from './components/cms/AdminCmsModal';
import { LightBoxModal } from './components/LightBoxModal';
import { PageLoader } from './components/PageLoader';
import { PortfolioItem } from './types';

export default function App() {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Intersection observer to track active menu item on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'approach', 'about', 'portfolio', 'testimonials', 'services', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SiteProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#2C2A29] font-sans antialiased selection:bg-[#D4C3B3] selection:text-[#1A1918]">
        {/* Luxury Creative Preloader */}
        <PageLoader />

        {/* Sticky Navigation Header */}
        <Header activeSection={activeSection} />

        {/* Main Content Sections */}
        <main>
          {/* 1ST FACE Hero Section */}
          <Hero />

          {/* Our Approach Section */}
          <Approach />

          {/* Meet Vikrantt / About Section */}
          <AboutVikrantt />

          {/* Portfolio & Signature Work Section */}
          <Portfolio />

          {/* Featured in Esteemed Publications Section */}
          <Publications />

          {/* Client & Partner Praise / Testimonials Section */}
          <Testimonials />

          {/* Our Process Section */}
          <Process />

          {/* Contact & Consultation Form Section */}
          <ContactForm />
        </main>

        {/* Lightbox Modal for Portfolio Gallery Inspection */}
        <LightBoxModal
          item={selectedPortfolioItem}
          onClose={() => setSelectedPortfolioItem(null)}
        />

        {/* Full-View Admin CMS Modal Overlay */}
        <AdminCmsModal />
      </div>
    </SiteProvider>
  );
}


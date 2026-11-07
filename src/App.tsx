import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ColorPaletteStudio } from './components/ColorPaletteStudio';
import { CostCalculator } from './components/CostCalculator';
import { AiPaletteConsultant } from './components/AiPaletteConsultant';
import { AboutCraftsmanship } from './components/AboutCraftsmanship';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(2);

  // Prefills for booking modal
  const [prefillPalette, setPrefillPalette] = useState<string>('');
  const [prefillScope, setPrefillScope] = useState<string>('');
  const [prefillEstimatedAmount, setPrefillEstimatedAmount] = useState<number | undefined>(undefined);

  // Fetch initial inquiry count from backend
  const refreshInquiriesCount = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInquiryCount(data.inquiries.length);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refreshInquiriesCount();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    setPrefillPalette('');
    setPrefillScope('');
    setPrefillEstimatedAmount(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectPaletteForBooking = (paletteName: string) => {
    setPrefillPalette(paletteName);
    setPrefillScope(`Turnkey Project with ${paletteName} Palette`);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForService = (serviceTitle: string) => {
    setPrefillScope(serviceTitle);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForProject = (projectTitle: string) => {
    setPrefillScope(`Bespoke Design Inspired by ${projectTitle}`);
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (details: {
    propertyType: string;
    sqft: number;
    tier: string;
    totalAmount: number;
  }) => {
    setPrefillScope(`${details.propertyType} (${details.sqft} sq.ft) - ${details.tier} Tier`);
    setPrefillEstimatedAmount(details.totalAmount);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1B1310] flex flex-col selection:bg-[#A85836] selection:text-white">
      
      {/* 1-Row 3-Zone Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
        inquiryCount={inquiryCount}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenEstimator={() => handleNavigate('estimator')}
          onOpenPaletteStudio={() => handleNavigate('palette-studio')}
          onOpenBooking={handleOpenBooking}
        />

        {/* Capabilities & Services Bento Grid */}
        <ServicesSection
          onOpenBookingForService={handleOpenBookingForService}
        />

        {/* Portfolio Showcase */}
        <PortfolioGallery
          onOpenBookingForProject={handleOpenBookingForProject}
        />

        {/* Interactive Architectural Color Palette & Material Studio */}
        <ColorPaletteStudio
          onSelectPaletteForBooking={handleSelectPaletteForBooking}
        />

        {/* Instant Turnkey Cost Estimator */}
        <CostCalculator
          onBookWithEstimate={handleBookWithEstimate}
        />

        {/* AI Interior Palette & Concept Advisor (Gemini 3.8 Flash) */}
        <AiPaletteConsultant
          onBookWithAiPalette={handleSelectPaletteForBooking}
        />

        {/* Craftsmanship & Hubli Factory Process */}
        <AboutCraftsmanship />

        {/* Client Evidence & Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Studio Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Consultation Booking Modal */}
      <InquiryModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillPalette={prefillPalette}
        prefillScope={prefillScope}
        prefillEstimatedAmount={prefillEstimatedAmount}
        onInquirySubmitted={refreshInquiriesCount}
      />

      {/* Client Portal & Inquiries Tracker */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onInquiryUpdated={refreshInquiriesCount}
      />

    </div>
  );
}

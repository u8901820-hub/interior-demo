import React, { useState } from 'react';
import { Menu, X, ClipboardList, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  inquiryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
  inquiryCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'palette-studio', label: 'Color Studio' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'ai-consultant', label: 'AI Advisor' },
    { id: 'craftsmanship', label: 'Craft & Story' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#2B1F1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-zone Top Bar Contract: Brand Wordmark | 4-5 Nav Links | 1 Primary Action */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element Brand wordmark in display face */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('hero')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1B1310] group-hover:text-[#A85836] transition-colors whitespace-nowrap shrink-0 block">
                Touchstone Atelier
              </span>
            </button>
          </div>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide uppercase text-[#423B32]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#A85836] cursor-pointer ${
                    isActive ? 'text-[#A85836] font-semibold' : 'text-[#423B32]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A85836] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (with inquiry portal access icon) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              title="Client Inquiries & Project Tracker"
              className="relative p-2.5 text-[#423B32] hover:text-[#A85836] hover:bg-[#F5F0E8] rounded-md transition-colors cursor-pointer"
              aria-label="View Client Inquiries"
            >
              <ClipboardList className="w-5 h-5" />
              {inquiryCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A85836] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {inquiryCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#2B1F1A] hover:bg-[#A85836] rounded-md transition-all duration-200 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book Consultation</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2B1F1A] hover:bg-[#F5F0E8] rounded-md focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FBF9F5] border-b border-[#2B1F1A]/10 px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wide uppercase text-[#423B32]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2 border-b border-[#2B1F1A]/5 cursor-pointer ${
                  activeSection === link.id ? 'text-[#A85836] font-bold' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-white bg-[#A85836] rounded-md shadow-sm"
              >
                Book Site Consultation
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold tracking-wider uppercase text-[#2B1F1A] border border-[#2B1F1A]/20 rounded-md"
              >
                Client Portal & Track Inquiries ({inquiryCount})
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

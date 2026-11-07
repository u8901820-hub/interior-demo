import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1B1310] text-[#FBF9F5] border-t border-white/10 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Studio Mission */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Touchstone Atelier
            </h3>
            <p className="text-xs sm:text-sm text-[#EAE1D2]/80 leading-relaxed max-w-sm">
              Premier turnkey interior architecture and precision manufacturing firm. Delivering bespoke residential villas, modular kitchens, and cohesive color palettes across Hubli, Dharwad, and Karnataka since 2014.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5A059]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>45-Day Handover Guarantee · 10-Year Craftsmanship Warranty</span>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1B1310] bg-[#FBF9F5] hover:bg-white rounded transition-colors cursor-pointer shadow-sm"
              >
                <span>Book Site Consultation</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#EAE1D2]/80">
              <li>
                <button
                  onClick={() => onNavigate('capabilities')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Turnkey Capabilities & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Featured Hubli & Dharwad Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('palette-studio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Color Palette & Material Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Instant Cost & Room Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-consultant')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Interior Concept Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craftsmanship')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hubli Factory & 4-Pillar Process
                </button>
              </li>
            </ul>
          </div>

          {/* Hubli Studio Address & Direct Inquiries */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Hubli Flagship Studio
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#EAE1D2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  Touchstone Atelier, 2nd Floor, Apex Commercial Complex, Vidyanagar, Hubli, Karnataka 580021
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="tel:+918362970411" className="hover:text-white transition-colors">
                  +91 (0836) 297 0411 / +91 98450 12389
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href="mailto:design@touchstoneatelier.com" className="hover:text-white transition-colors">
                  design@touchstoneatelier.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block">Mon – Sat: 9:30 AM – 7:30 PM</span>
                  <span className="block text-[#EAE1D2]/60">Sunday: By Private Site Appointment</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EAE1D2]/60">
          <div>
            © {new Date().getFullYear()} Touchstone Atelier Hubli. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>IS 710 BWP Marine Certified</span>
            <span>·</span>
            <span>Hubli-Dharwad Twin City Operations</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

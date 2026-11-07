import React, { useState } from 'react';
import { STUDIO_SERVICES } from '../data/studioData';
import { ServiceItem } from '../types';
import { ArrowRight, CheckCircle2, X, Shield, Sparkles, Layers, Home, ChefHat, Building2, Sun } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBookingForService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBookingForService
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-5 h-5 text-[#A85836]" />;
      case 'ChefHat': return <ChefHat className="w-5 h-5 text-[#A85836]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#A85836]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#A85836]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#A85836]" />;
      default: return <Sparkles className="w-5 h-5 text-[#A85836]" />;
    }
  };

  return (
    <section id="capabilities" className="py-20 bg-[#FBF9F5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-2.5">
              <span>Core Turnkey Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Hubli Manufacturing Facility</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight">
              Turnkey Architectural Services
            </h2>
            <p className="text-sm sm:text-base text-[#423B32] mt-2 max-w-2xl">
              From raw shell structure to the final tailored cushions. We manufacture and execute everything in-house with German CNC precision and zero middleman contractors.
            </p>
          </div>

          <div className="text-xs text-[#423B32] font-medium hidden md:block">
            <span>45-Day Handover · 10-Year Comprehensive Warranty</span>
          </div>
        </div>

        {/* Asymmetric Bento Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIO_SERVICES.map((srv, idx) => {
            const isMarquee = idx === 0 || idx === 1;
            return (
              <div
                key={srv.id}
                className={`bg-white rounded-xl border border-[#2B1F1A]/10 overflow-hidden flex flex-col justify-between hover:border-[#A85836]/50 transition-all duration-300 shadow-sm group cursor-pointer ${
                  isMarquee ? 'lg:col-span-1' : ''
                }`}
                onClick={() => setActiveModalService(srv)}
              >
                <div>
                  {/* Service Image with Subtle Scrim */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE1D2]">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Editorial Category Index Tag */}
                    <div className="absolute bottom-3 left-4 text-white text-xs font-serif tracking-widest uppercase">
                      0{idx + 1}. Execution Specialty
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded bg-[#F5F0E8] border border-[#2B1F1A]/10">
                        {getServiceIcon(srv.iconName)}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#A85836]">
                        {srv.startingPrice}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B1310] group-hover:text-[#A85836] transition-colors leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#423B32] mt-2.5 leading-relaxed">
                      {srv.shortDesc}
                    </p>

                    {/* Quick Specs Bullet List */}
                    <div className="mt-4 pt-4 border-t border-[#2B1F1A]/10 space-y-1.5">
                      {srv.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#423B32]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A85836] shrink-0 mt-0.5" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 py-4 bg-[#FBF9F5] border-t border-[#2B1F1A]/10 flex items-center justify-between text-xs font-semibold text-[#1B1310] group-hover:text-[#A85836]">
                  <span>Explore Technical Specifications</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Service Specifications Modal */}
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-[#FBF9F5] rounded-xl border border-[#2B1F1A]/20 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 p-2 text-[#423B32] hover:text-[#1B1310] rounded-md transition-colors cursor-pointer"
                aria-label="Close service modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A85836] mb-1">
                <span>Hubli In-House Engineering</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1310]">
                {activeModalService.title}
              </h3>

              <div className="my-4 aspect-[16/9] rounded-lg overflow-hidden border border-[#2B1F1A]/10">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-[#423B32] leading-relaxed">
                {activeModalService.fullDesc}
              </p>

              {/* Engineering Standards */}
              <div className="mt-5 pt-4 border-t border-[#2B1F1A]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1310] mb-2.5">
                  Engineering & Turnkey Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#423B32]">
                  {activeModalService.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded border border-[#2B1F1A]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#A85836] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Material Standard */}
              <div className="mt-4 pt-4 border-t border-[#2B1F1A]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1310] mb-2">
                  Standard Sourced Materials
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalService.materials.map((mat, i) => (
                    <span key={i} className="text-xs text-[#423B32] bg-white px-3 py-1 rounded border border-[#2B1F1A]/10">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className="mt-6 pt-5 border-t border-[#2B1F1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase text-[#423B32]/70 block">Estimated Investment</span>
                  <span className="text-base font-semibold text-[#A85836]">{activeModalService.startingPrice}</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="w-1/2 sm:w-auto px-4 py-2.5 text-xs font-medium text-[#423B32] hover:text-[#1B1310] cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const title = activeModalService.title;
                      setActiveModalService(null);
                      onOpenBookingForService(title);
                    }}
                    className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                  >
                    Book Site Consultation
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

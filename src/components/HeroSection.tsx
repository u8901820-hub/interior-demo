import React from 'react';
import { HERO_IMAGE, TRUST_STATS } from '../data/studioData';
import { ArrowRight, Calculator, Palette, ShieldCheck, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onOpenEstimator: () => void;
  onOpenPaletteStudio: () => void;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEstimator,
  onOpenPaletteStudio,
  onOpenBooking
}) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden bg-[#FBF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Value Proposition + High Impact Architectural Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Unboxed clean editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Vidyanagar, Hubli
              </span>
              <span aria-hidden="true" className="text-[#2B1F1A]/30">·</span>
              <span>Karnataka Flagship</span>
              <span aria-hidden="true" className="text-[#2B1F1A]/30">·</span>
              <span>Since 2014</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="font-serif text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] font-semibold text-[#1B1310] tracking-tight text-balance mb-6">
              Turnkey Interior Architecture Crafted for Living.
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-[#423B32] font-normal leading-relaxed max-w-xl mb-8">
              We design and execute bespoke residential villas, precision modular kitchens, and cohesive architectural color palettes across North Karnataka. Engineered with German machinery and handed over in a guaranteed 45-day timeline.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculate Cost Estimate</span>
              </button>

              <button
                onClick={onOpenPaletteStudio}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#1B1310] bg-transparent hover:bg-[#F5F0E8] border border-[#2B1F1A]/20 rounded-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Palette className="w-4 h-4 text-[#A85836]" />
                <span>Interior Palette Studio</span>
              </button>
            </div>

            {/* Trust Assurance Line */}
            <div className="flex items-center gap-3 text-xs text-[#423B32]/80 border-t border-[#2B1F1A]/10 pt-4">
              <ShieldCheck className="w-4 h-4 text-[#A85836] shrink-0" />
              <span>3-Tier On-Site Quality Audits · In-House Manufacturing Unit · Fixed Price Guarantee</span>
            </div>

          </div>

          {/* Right Column: High-Fidelity Architectural Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-[#2B1F1A]/10 bg-[#EAE1D2]">
              <img
                src={HERO_IMAGE}
                alt="Bespoke luxury residential living room designed by Touchstone Atelier Hubli with travertine and fluted walnut"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1310]/80 via-[#1B1310]/20 to-transparent pointer-events-none" />

              {/* Architectural Overlay Information Badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#EAE1D2] font-medium">Bespoke Turnkey Project</p>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">The Travertine & Oak Villa</h3>
                  <div className="flex items-center gap-2 text-xs text-[#EAE1D2]/80 mt-1">
                    <span>Shirur Park, Hubli</span>
                    <span>·</span>
                    <span>3,850 sq.ft</span>
                    <span>·</span>
                    <span>45-Day Handover</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1B1310] bg-[#FBF9F5] hover:bg-white rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-3 h-3 text-[#A85836]" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Quantitative Trust Strip (Adjacency to Hero Claim) */}
        <div className="mt-14 pt-8 border-t border-[#2B1F1A]/10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1310] tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A85836]">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-xs text-[#423B32] mt-1 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

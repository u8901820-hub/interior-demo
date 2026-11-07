import React from 'react';
import { STUDIO_TESTIMONIALS } from '../data/studioData';
import { Quote, Star, CheckCircle, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F0E8] border-t border-[#2B1F1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-2">
            <span>Client Evidence</span>
            <span aria-hidden="true">·</span>
            <span>Verified Turnkey Handover</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight">
            Client Perspectives Across Karnataka
          </h2>
          <p className="text-sm sm:text-base text-[#423B32] mt-2">
            Real feedback from villa owners, IT leaders, and business directors who entrusted their spaces to Touchstone Atelier.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STUDIO_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-7 rounded-xl border border-[#2B1F1A]/10 flex flex-col justify-between shadow-xs hover:border-[#A85836]/40 transition-colors"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-[#C5A059] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Prose */}
                <p className="text-xs sm:text-sm text-[#423B32] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-6 pt-5 border-t border-[#2B1F1A]/10">
                <h4 className="font-serif text-base font-semibold text-[#1B1310]">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-[#A85836] font-medium mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <span className="text-[11px] text-[#423B32]/70 block mt-1">
                  {item.projectType}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Regional Reach Banner */}
        <div className="mt-12 p-6 rounded-xl bg-[#FBF9F5] border border-[#2B1F1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-[#1B1310] block">Now Serving All Northern & Central Karnataka</span>
              <span className="text-[#423B32]">Hubli · Dharwad · Belgaum · Davanagere · Bengaluru (Design Studio)</span>
            </div>
          </div>
          <span className="text-[#A85836] font-semibold tracking-wide uppercase text-[11px]">
            In-Person Studio Consultations Available
          </span>
        </div>

      </div>
    </section>
  );
};

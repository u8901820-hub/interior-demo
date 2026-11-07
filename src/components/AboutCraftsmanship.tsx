import React from 'react';
import { CRAFT_IMAGE } from '../data/studioData';
import { Shield, Sparkles, CheckCircle, Clock, Factory, Award } from 'lucide-react';

export const AboutCraftsmanship: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Volumetric Space Planning & 3D Immersion',
      desc: 'We map your site using laser measurement tools, analyzing sunlight angles and structural load points before crafting photorealistic 3D elevations and virtual walk-throughs.'
    },
    {
      num: '02',
      title: 'In-House German CNC Manufacturing',
      desc: 'All modular cabinetry and millwork are fabricated in our dedicated Hubli factory using computerized edge-banding and precision multi-spindle drilling for 0.1mm accuracy.'
    },
    {
      num: '03',
      title: 'On-Site Modular Assembly & Zero-Dust Execution',
      desc: 'Pre-finished components arrive at your residence for rapid, dust-free installation supervised by our full-time site engineers with daily photographic progress updates.'
    },
    {
      num: '04',
      title: '45-Day Handover & 10-Year Warranty',
      desc: 'Final snag-list clearance, deep cleaning, and formal key handover with a signed 10-year warranty certificate covering all marine plywood and hardware mechanisms.'
    }
  ];

  return (
    <section id="craftsmanship" className="py-20 bg-[#FBF9F5] border-t border-[#2B1F1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-3">
              <span>The Touchstone Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Hubli Studio Archive</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight text-balance">
              Where Tactile Materials Meet Uncompromising Execution.
            </h2>

            <p className="text-sm sm:text-base text-[#423B32] mt-4 leading-relaxed">
              Founded in Vidyanagar, Hubli in 2014, Touchstone Atelier was born to eliminate the chaos of unorganized interior contracting. We believe that true luxury does not rely on loud decorations, but on the silent harmony between natural stone, fluted hardwoods, precise architectural lighting, and calibrated color palettes.
            </p>

            <p className="text-sm sm:text-base text-[#423B32] mt-3 leading-relaxed">
              By controlling our own automated manufacturing facility in Karnataka, we ensure 100% boiling-water-proof (BWP) marine cores, zero sub-contracted labor shortcuts, and a strict 45-day guaranteed delivery schedule.
            </p>

            {/* Micro Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-[#2B1F1A]/10 text-xs">
              <div className="flex items-start gap-2.5">
                <Factory className="w-4 h-4 text-[#A85836] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1B1310] block">Local Hubli Factory</span>
                  <span className="text-[#423B32]">German Homag edge-banding and CNC precision.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#A85836] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1B1310] block">340+ Completed Homes</span>
                  <span className="text-[#423B32]">Delivered across Hubli, Dharwad, Belgaum & Bengaluru.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image: Macro Craft Detail */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-[#2B1F1A]/10 bg-[#EAE1D2]">
              <img
                src={CRAFT_IMAGE}
                alt="Tactile architectural detail of natural travertine stone meeting fluted oak with concealed brass lighting"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1310]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="uppercase tracking-widest text-[#EAE1D2] font-semibold block text-[10px]">Materiality Diagnostic</span>
                <span className="font-serif text-base font-semibold block">Honed Italian Travertine & Vertical Oak Fluting</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Step Turnkey Methodology */}
        <div className="mt-8 pt-10 border-t border-[#2B1F1A]/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A85836]">Execution Roadmap</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1310] mt-1">
              The 4-Pillar Turnkey Process
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-[#2B1F1A]/10 flex flex-col justify-between hover:border-[#A85836]/40 transition-colors"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-[#A85836]/70 block mb-2 tabular-nums">
                    {st.num}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-[#1B1310] leading-snug">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#423B32] mt-2.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

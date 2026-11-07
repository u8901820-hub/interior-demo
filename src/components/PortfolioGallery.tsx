import React, { useState } from 'react';
import { STUDIO_PROJECTS } from '../data/studioData';
import { ProjectItem } from '../types';
import { MapPin, Calendar, Maximize2, X, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface PortfolioGalleryProps {
  onOpenBookingForProject: (projectTitle: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onOpenBookingForProject
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = filter === 'all'
    ? STUDIO_PROJECTS
    : STUDIO_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-[#F5F0E8] border-y border-[#2B1F1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-2">
              <span>Executed Turnkey Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Hubli & Karnataka Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight">
              Featured Interior Works
            </h2>
            <p className="text-sm sm:text-base text-[#423B32] mt-2 max-w-2xl">
              A curated selection of private residences, bespoke island kitchens, and executive offices delivered on time across Hubli, Dharwad, and Karnataka.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons allowed per §1.A) */}
          <div className="flex items-center gap-1 p-1 bg-[#FBF9F5] rounded-lg border border-[#2B1F1A]/10 overflow-x-auto self-start md:self-auto">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'residential', label: 'Villas' },
              { id: 'kitchen', label: 'Kitchens' },
              { id: 'bedroom', label: 'Suites' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'renovation', label: 'Remodels' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#A85836] text-white shadow-xs font-semibold'
                    : 'text-[#423B32] hover:text-[#1B1310]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="bg-white rounded-xl border border-[#2B1F1A]/10 overflow-hidden flex flex-col justify-between hover:border-[#A85836]/40 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div>
                {/* Visual Viewport */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#EAE1D2]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-600 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Location & Year Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      {proj.location}
                    </span>
                    <span className="opacity-90">{proj.carpetArea}</span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6">
                  {/* Unboxed Metadata Line with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-[#A85836] font-semibold uppercase tracking-wider mb-2">
                    <span>{proj.categoryLabel}</span>
                    <span aria-hidden="true" className="text-[#2B1F1A]/30">·</span>
                    <span className="text-[#423B32] font-normal">{proj.duration}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B1310] group-hover:text-[#A85836] transition-colors leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#423B32] mt-2 line-clamp-2 leading-relaxed">
                    {proj.clientBrief}
                  </p>

                  {/* Palette Swatches Bar */}
                  <div className="mt-4 pt-4 border-t border-[#2B1F1A]/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#423B32]/80 font-medium">Palette:</span>
                      <div className="flex items-center gap-1">
                        {proj.paletteColors.map((hex, i) => (
                          <span
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: hex }}
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-[#A85836] group-hover:underline">
                      View Project Specs →
                    </span>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
            <div className="bg-[#FBF9F5] rounded-xl border border-[#2B1F1A]/20 max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 text-[#423B32] hover:text-[#1B1310] rounded-md transition-colors cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A85836] mb-1">
                <span>{selectedProject.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.location}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1310]">
                {selectedProject.title}
              </h3>

              {/* Full Image */}
              <div className="my-5 aspect-[16/9] rounded-lg overflow-hidden border border-[#2B1F1A]/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-lg bg-white border border-[#2B1F1A]/10 text-xs">
                <div>
                  <span className="text-[#423B32]/70 block text-[10px] uppercase">Carpet Area</span>
                  <span className="font-bold text-[#1B1310]">{selectedProject.carpetArea}</span>
                </div>
                <div>
                  <span className="text-[#423B32]/70 block text-[10px] uppercase">Execution Speed</span>
                  <span className="font-bold text-[#A85836]">{selectedProject.duration}</span>
                </div>
                <div>
                  <span className="text-[#423B32]/70 block text-[10px] uppercase">Handover Year</span>
                  <span className="font-bold text-[#1B1310]">{selectedProject.year}</span>
                </div>
              </div>

              {/* Client Brief */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1310] mb-1.5">
                  Architectural Brief & Philosophy
                </h4>
                <p className="text-sm text-[#423B32] leading-relaxed">
                  {selectedProject.clientBrief}
                </p>
              </div>

              {/* Highlights & Craftsmanship */}
              <div className="mt-5 pt-4 border-t border-[#2B1F1A]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1310] mb-2.5">
                  Execution Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#423B32]">
                  {selectedProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white p-2.5 rounded border border-[#2B1F1A]/10">
                      <Check className="w-4 h-4 text-[#A85836] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specified Materials */}
              <div className="mt-4 pt-4 border-t border-[#2B1F1A]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1310] mb-2">
                  Materials Sourced for this Residence
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.keyMaterials.map((m, i) => (
                    <span key={i} className="text-xs text-[#423B32] bg-white px-3 py-1 rounded border border-[#2B1F1A]/10">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="mt-6 pt-5 border-t border-[#2B1F1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#423B32]">Color Harmony:</span>
                  <div className="flex items-center gap-1.5">
                    {selectedProject.paletteColors.map((hex, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#1B1310] ml-1">
                    {selectedProject.paletteName}
                  </span>
                </div>

                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    onOpenBookingForProject(title);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  Request Similar Design Plan
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { STUDIO_PALETTES, HERO_IMAGE, KITCHEN_IMAGE, BEDROOM_IMAGE, OFFICE_IMAGE } from '../data/studioData';
import { ColorPaletteItem } from '../types';
import { Sun, Sparkles, Check, Copy, ArrowRight, Sliders, Shield } from 'lucide-react';

interface ColorPaletteStudioProps {
  onSelectPaletteForBooking: (paletteName: string) => void;
}

export const ColorPaletteStudio: React.FC<ColorPaletteStudioProps> = ({
  onSelectPaletteForBooking
}) => {
  const [selectedPalette, setSelectedPalette] = useState<ColorPaletteItem>(STUDIO_PALETTES[0]);
  const [activeRoom, setActiveRoom] = useState<'living' | 'kitchen' | 'bedroom' | 'office'>('living');
  const [lightingTemp, setLightingTemp] = useState<'2700k' | '4000k' | '5500k'>('2700k');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const roomImages = {
    living: { img: HERO_IMAGE, label: 'Living & Dining Room' },
    kitchen: { img: KITCHEN_IMAGE, label: 'Bespoke Island Kitchen' },
    bedroom: { img: BEDROOM_IMAGE, label: 'Master Bedroom Retreat' },
    office: { img: OFFICE_IMAGE, label: 'Executive Commercial Office' }
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Lighting overlay styles
  const lightingOverlay = {
    '2700k': 'bg-amber-500/10 mix-blend-color',
    '4000k': 'bg-amber-100/5 mix-blend-color',
    '5500k': 'bg-sky-400/10 mix-blend-color'
  }[lightingTemp];

  return (
    <section id="palette-studio" className="py-20 bg-[#F5F0E8] border-y border-[#2B1F1A]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-2">
              <span>Interactive Materiality Lab</span>
              <span aria-hidden="true">·</span>
              <span>Hubli Studio Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight">
              Curated Architectural Color Palettes
            </h2>
            <p className="text-sm sm:text-base text-[#423B32] mt-2 max-w-2xl">
              Interior color is never just paint on a wall—it is a harmonious relationship between natural stone, timber species, metal reflections, and lighting temperature.
            </p>
          </div>

          {/* Quick Action */}
          <button
            onClick={() => onSelectPaletteForBooking(selectedPalette.name)}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] rounded-md transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer shadow-sm"
          >
            <span>Consult With This Palette</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Palette Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {STUDIO_PALETTES.map((pal) => {
            const isCurrent = selectedPalette.id === pal.id;
            return (
              <button
                key={pal.id}
                onClick={() => setSelectedPalette(pal)}
                className={`p-4 rounded-lg text-left transition-all border cursor-pointer ${
                  isCurrent
                    ? 'bg-[#FBF9F5] border-[#A85836] shadow-md ring-1 ring-[#A85836]'
                    : 'bg-[#FBF9F5]/70 border-[#2B1F1A]/10 hover:bg-[#FBF9F5] hover:border-[#2B1F1A]/25'
                }`}
              >
                {/* 4 Swatch Dots Bar */}
                <div className="flex items-center gap-1.5 mb-3">
                  {pal.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name} (${c.hex})`}
                    />
                  ))}
                </div>

                <h3 className="font-serif text-lg font-semibold text-[#1B1310] leading-snug">
                  {pal.name}
                </h3>
                <p className="text-xs text-[#423B32] mt-1 line-clamp-1">
                  {pal.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Room Visualizer with Dynamic Lighting */}
          <div className="lg:col-span-7 bg-[#FBF9F5] rounded-xl border border-[#2B1F1A]/10 p-5 shadow-sm">
            
            {/* Visualizer Header Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2B1F1A]/10">
              
              {/* Room Selector */}
              <div className="flex items-center gap-1 bg-[#F5F0E8] p-1 rounded-md">
                {(['living', 'kitchen', 'bedroom', 'office'] as const).map((room) => (
                  <button
                    key={room}
                    onClick={() => setActiveRoom(room)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-all cursor-pointer whitespace-nowrap ${
                      activeRoom === room
                        ? 'bg-white text-[#1B1310] shadow-xs font-semibold'
                        : 'text-[#423B32] hover:text-[#1B1310]'
                    }`}
                  >
                    {room.charAt(0).toUpperCase() + room.slice(1)}
                  </button>
                ))}
              </div>

              {/* Lighting Temperature Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#423B32] font-medium flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-[#A85836]" />
                  Kelvin:
                </span>
                <div className="flex items-center gap-1 bg-[#F5F0E8] p-1 rounded-md">
                  <button
                    onClick={() => setLightingTemp('2700k')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                      lightingTemp === '2700k'
                        ? 'bg-[#A85836] text-white'
                        : 'text-[#423B32] hover:text-[#1B1310]'
                    }`}
                    title="2700K Warm Ambient"
                  >
                    2700K Warm
                  </button>
                  <button
                    onClick={() => setLightingTemp('4000k')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                      lightingTemp === '4000k'
                        ? 'bg-[#A85836] text-white'
                        : 'text-[#423B32] hover:text-[#1B1310]'
                    }`}
                    title="4000K Neutral Architectural Daylight"
                  >
                    4000K Neutral
                  </button>
                  <button
                    onClick={() => setLightingTemp('5500k')}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                      lightingTemp === '5500k'
                        ? 'bg-[#A85836] text-white'
                        : 'text-[#423B32] hover:text-[#1B1310]'
                    }`}
                    title="5500K Crisp Gallery Noon"
                  >
                    5500K Crisp
                  </button>
                </div>
              </div>

            </div>

            {/* Room Display Viewport */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden mt-4 border border-[#2B1F1A]/10 bg-neutral-900">
              <img
                src={roomImages[activeRoom].img}
                alt={`${roomImages[activeRoom].label} preview in ${selectedPalette.name}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic lighting temperature simulation wash */}
              <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${lightingOverlay}`} />

              {/* Palette Accent Aura */}
              <div
                className="absolute inset-0 opacity-15 mix-blend-soft-light pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: selectedPalette.primaryHex }}
              />

              {/* Active Room & Palette Watermark Tag */}
              <div className="absolute top-4 left-4 bg-[#1B1310]/80 backdrop-blur-md px-3 py-1.5 rounded text-white text-xs flex items-center gap-2">
                <span className="font-medium">{roomImages[activeRoom].label}</span>
                <span className="text-white/40">/</span>
                <span className="text-[#EAE1D2]">{selectedPalette.name}</span>
                <span className="text-white/40">/</span>
                <span className="text-[#C5A059]">{lightingTemp.toUpperCase()}</span>
              </div>
            </div>

            {/* Material Pairing Specification Badges */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded bg-[#F5F0E8] border border-[#2B1F1A]/10">
                <span className="text-[#423B32]/70 block text-[10px] uppercase tracking-wider">Timber Millwork</span>
                <span className="font-semibold text-[#1B1310] block mt-0.5 truncate">{selectedPalette.woodFinish}</span>
              </div>
              <div className="p-2.5 rounded bg-[#F5F0E8] border border-[#2B1F1A]/10">
                <span className="text-[#423B32]/70 block text-[10px] uppercase tracking-wider">Architectural Metal</span>
                <span className="font-semibold text-[#1B1310] block mt-0.5 truncate">{selectedPalette.metalAccent}</span>
              </div>
              <div className="p-2.5 rounded bg-[#F5F0E8] border border-[#2B1F1A]/10">
                <span className="text-[#423B32]/70 block text-[10px] uppercase tracking-wider">Natural Stone</span>
                <span className="font-semibold text-[#1B1310] block mt-0.5 truncate">{selectedPalette.stoneMaterial}</span>
              </div>
              <div className="p-2.5 rounded bg-[#F5F0E8] border border-[#2B1F1A]/10">
                <span className="text-[#423B32]/70 block text-[10px] uppercase tracking-wider">Spatial Suitability</span>
                <span className="font-semibold text-[#1B1310] block mt-0.5 truncate">{selectedPalette.idealFor}</span>
              </div>
            </div>

          </div>

          {/* Right: Detailed Color Swatches & Paint Specifications */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-[#FBF9F5] rounded-xl border border-[#2B1F1A]/10 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#2B1F1A]/10">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1B1310]">
                    {selectedPalette.name}
                  </h3>
                  <p className="text-xs text-[#A85836] font-medium mt-0.5">
                    {selectedPalette.subtitle}
                  </p>
                </div>
                <div
                  className="w-8 h-8 rounded-full border border-[#2B1F1A]/20 shadow-xs"
                  style={{ backgroundColor: selectedPalette.primaryHex }}
                />
              </div>

              <p className="text-xs sm:text-sm text-[#423B32] mt-4 leading-relaxed">
                {selectedPalette.description}
              </p>

              {/* Swatch List with 60-30-10 Disciplined Hierarchy */}
              <div className="mt-6 flex flex-col gap-3">
                {selectedPalette.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#2B1F1A]/10 bg-white hover:border-[#A85836]/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-md border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#1B1310]">
                            {color.name}
                          </h4>
                          <span className="text-[11px] font-mono text-[#423B32]/70">
                            {color.hex}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#423B32] mt-0.5">
                          <span>{color.finish}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-medium text-[#A85836]">{color.paintCode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-[#423B32]/70 tracking-wider hidden sm:inline">
                        {color.role}
                      </span>
                      <button
                        onClick={() => handleCopyHex(color.hex)}
                        title="Copy Hex Code"
                        className="p-1.5 text-[#423B32] hover:text-[#A85836] rounded transition-colors cursor-pointer"
                        aria-label={`Copy hex code ${color.hex}`}
                      >
                        {copiedHex === color.hex ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Consultation CTA with Selected Palette */}
              <div className="mt-6 pt-5 border-t border-[#2B1F1A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#423B32]">
                  <span>Physical swatch samples available for preview at our Hubli studio.</span>
                </div>
                <button
                  onClick={() => onSelectPaletteForBooking(selectedPalette.name)}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B1F1A] hover:bg-[#A85836] rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-sm"
                >
                  Book Site Visit with this Palette
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

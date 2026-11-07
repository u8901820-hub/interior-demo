import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, Sun, Layers, Lightbulb, Check, ShieldCheck } from 'lucide-react';

interface AiPaletteConsultantProps {
  onBookWithAiPalette: (paletteTitle: string) => void;
}

interface GeneratedPaletteData {
  paletteTitle: string;
  narrative: string;
  colorHarmonies: {
    name: string;
    hex: string;
    finish: string;
    asianPaintsCode: string;
    role: string;
  }[];
  materialSpecs: string[];
  lightingGuidance: {
    temperature: string;
    luxLevel: string;
    cRI: string;
  };
  designerProTips: string[];
}

export const AiPaletteConsultant: React.FC<AiPaletteConsultantProps> = ({
  onBookWithAiPalette
}) => {
  const [roomType, setRoomType] = useState('Living & Dining Lounge');
  const [orientation, setOrientation] = useState('East Facing (Warm Morning Light)');
  const [styleVibe, setStyleVibe] = useState('Warm Minimalist / Karnataka Teak Harmony');
  const [moodIntent, setMoodIntent] = useState('Calm, grounded, airy and welcoming for large family gatherings');
  const [budgetTier, setBudgetTier] = useState('Luxury Signature');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratedPaletteData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai-palette-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType,
          orientation,
          styleVibe,
          moodIntent,
          budgetTier
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        throw new Error(data.error || 'Failed to generate architectural palette');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not connect to the design studio service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-20 bg-[#FBF9F5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#A85836]" />
            <span>Intelligent Architectural Concepting</span>
            <span aria-hidden="true">·</span>
            <span>Powered by Gemini</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight text-balance">
            AI Interior Palette & Materiality Advisor
          </h2>
          <p className="text-sm sm:text-base text-[#423B32] mt-3">
            Configure your room dimensions, natural light angle, and lifestyle intent. Our AI studio consultant generates a cohesive architectural palette, Indian paint codes, and lux guidelines calibrated for Karnataka homes.
          </p>
        </div>

        {/* 2-Column Split: Form Inputs & Generated Output Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Configuration */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#2B1F1A]/10 shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-[#1B1310] mb-5 pb-3 border-b border-[#2B1F1A]/10">
              Space Specifications
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              
              {/* Room Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  Room Type
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:outline-none focus:ring-1 focus:ring-[#A85836]"
                >
                  <option value="Living & Dining Lounge">Living & Dining Lounge</option>
                  <option value="Bespoke Island Kitchen">Bespoke Island Kitchen</option>
                  <option value="Master Bedroom Sanctuary">Master Bedroom Sanctuary</option>
                  <option value="Executive Home Office & Study">Executive Home Office & Study</option>
                  <option value="Home Cinema & Entertainment Lounge">Home Cinema & Entertainment Lounge</option>
                </select>
              </div>

              {/* Natural Light Orientation */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  Natural Light Orientation
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:outline-none focus:ring-1 focus:ring-[#A85836]"
                >
                  <option value="East Facing (Warm Morning Light)">East Facing (Warm Morning Light)</option>
                  <option value="West Facing (Intense Golden Evening Sun)">West Facing (Intense Golden Evening Sun)</option>
                  <option value="North Facing (Cool Soft Diffused Light)">North Facing (Cool Soft Diffused Light)</option>
                  <option value="South Facing (Consistent Bright Sunlight)">South Facing (Consistent Bright Sunlight)</option>
                </select>
              </div>

              {/* Style & Aesthetic */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  Aesthetic Theme
                </label>
                <select
                  value={styleVibe}
                  onChange={(e) => setStyleVibe(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-md border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:outline-none focus:ring-1 focus:ring-[#A85836]"
                >
                  <option value="Warm Minimalist / Karnataka Teak Harmony">Warm Minimalist / Karnataka Teak Harmony</option>
                  <option value="Japandi Zen & Raw Limewash">Japandi Zen & Raw Limewash</option>
                  <option value="Biophilic Nordic Sage & Light Oak">Biophilic Nordic Sage & Light Oak</option>
                  <option value="Contemporary Indian Luxury with Brass & Travertine">Contemporary Indian Luxury with Brass & Travertine</option>
                  <option value="Metropolitan Obsidian Noir & Smoked Walnut">Metropolitan Obsidian Noir & Smoked Walnut</option>
                </select>
              </div>

              {/* Functional Intent */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  Lifestyle Intent & Mood
                </label>
                <textarea
                  rows={2}
                  value={moodIntent}
                  onChange={(e) => setMoodIntent(e.target.value)}
                  placeholder="e.g. Warm and tactile, zero visual clutter, child-friendly surfaces..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-md border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:outline-none focus:ring-1 focus:ring-[#A85836]"
                />
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  Execution Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Essential', 'Premium Atelier', 'Luxury Signature'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setBudgetTier(tier)}
                      className={`py-2 px-2 text-center text-xs font-medium rounded border cursor-pointer transition-all ${
                        budgetTier === tier
                          ? 'bg-[#A85836] text-white border-[#A85836]'
                          : 'bg-[#FBF9F5] text-[#423B32] border-[#2B1F1A]/10 hover:border-[#2B1F1A]/30'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B1F1A] hover:bg-[#A85836] disabled:bg-neutral-400 rounded-md transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Architectural Light & Texture...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Generate Custom Concept & Swatches</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Generated Palette Board */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#2B1F1A]/10 shadow-sm space-y-6">
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2B1F1A]/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A85836]">
                      Architectural Recommendation
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1310] mt-0.5">
                      {result.paletteTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => onBookWithAiPalette(result.paletteTitle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] rounded-md transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer shadow-sm"
                  >
                    <span>Book With This Concept</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-sm text-[#423B32] leading-relaxed italic bg-[#FBF9F5] p-4 rounded-lg border border-[#2B1F1A]/10">
                  "{result.narrative}"
                </p>

                {/* 4 Swatch Harmony Cards */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-3">
                    Bespoke Color Harmonies (60-30-10 Disciplined Palette)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.colorHarmonies.map((swatch, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg border border-[#2B1F1A]/10 bg-[#FBF9F5] flex items-center gap-3.5"
                      >
                        <div
                          className="w-12 h-12 rounded-md border border-black/15 shrink-0 shadow-2xs"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div className="overflow-hidden">
                          <h5 className="text-xs sm:text-sm font-semibold text-[#1B1310] truncate">
                            {swatch.name}
                          </h5>
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#423B32]/80 mt-0.5">
                            <span>{swatch.hex}</span>
                            <span>·</span>
                            <span className="text-[#A85836] font-sans font-medium truncate">{swatch.asianPaintsCode}</span>
                          </div>
                          <span className="text-[10px] text-[#423B32]/70 uppercase tracking-wider block mt-0.5">
                            {swatch.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Lighting Advice Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2B1F1A]/10">
                  
                  {/* Materials */}
                  <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#2B1F1A]/10">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B1310] mb-2.5">
                      <Layers className="w-3.5 h-3.5 text-[#A85836]" />
                      <span>Specified Tactile Materials</span>
                    </div>
                    <ul className="text-xs text-[#423B32] space-y-1.5">
                      {result.materialSpecs.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#A85836] font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Lighting Temperature */}
                  <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#2B1F1A]/10">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B1310] mb-2.5">
                      <Sun className="w-3.5 h-3.5 text-[#A85836]" />
                      <span>Architectural Lighting Plan</span>
                    </div>
                    <div className="text-xs text-[#423B32] space-y-1.5">
                      <p><span className="font-semibold text-[#1B1310]">Kelvin:</span> {result.lightingGuidance.temperature}</p>
                      <p><span className="font-semibold text-[#1B1310]">Illuminance:</span> {result.lightingGuidance.luxLevel}</p>
                      <p><span className="font-semibold text-[#1B1310]">Color Rendering:</span> {result.lightingGuidance.cRI}</p>
                    </div>
                  </div>

                </div>

                {/* Pro Tips */}
                <div className="bg-amber-50/60 p-4 rounded-lg border border-amber-200/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#74361C] mb-2">
                    <Lightbulb className="w-3.5 h-3.5 text-[#A85836]" />
                    <span>Principal Architect Advice for Karnataka Homes</span>
                  </div>
                  <ul className="text-xs text-[#423B32] space-y-1">
                    {result.designerProTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#A85836] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              /* Idle Initial State */
              <div className="h-full min-h-[460px] bg-white rounded-xl border border-dashed border-[#2B1F1A]/20 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F5F0E8] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-[#A85836]" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-[#1B1310]">
                  Ready to Craft Your Bespoke Palette
                </h4>
                <p className="text-xs sm:text-sm text-[#423B32] max-w-md mt-2 leading-relaxed">
                  Select your space criteria on the left and click "Generate Custom Concept". Our server-side design engine will produce tailored paint formulations, wood veneers, and lighting Kelvin guidelines.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#423B32]/70 mt-6 pt-6 border-t border-[#2B1F1A]/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Includes Asian Paints & Berger Royale Reference Codes</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

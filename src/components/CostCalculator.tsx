import React, { useState, useEffect } from 'react';
import { Calculator, ShieldCheck, Check, Clock, Calendar, ArrowRight, Printer, Sparkles } from 'lucide-react';

interface CostCalculatorProps {
  onBookWithEstimate: (estimateDetails: {
    propertyType: string;
    sqft: number;
    tier: string;
    totalAmount: number;
  }) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  onBookWithEstimate
}) => {
  const [propertyType, setPropertyType] = useState<'2bhk' | '3bhk' | '4bhk_villa' | 'commercial'>('3bhk');
  const [sqft, setSqft] = useState<number>(1450);
  const [packageTier, setPackageTier] = useState<'essential' | 'premium_atelier' | 'luxury_signature'>('premium_atelier');
  const [kitchenType, setKitchenType] = useState<'l_shape' | 'parallel' | 'island'>('l_shape');
  const [wardrobes, setWardrobes] = useState<number>(3);
  const [ceilingCoverage, setCeilingCoverage] = useState<'perimeter' | 'full_recessed' | 'magnetic_track_luxury'>('full_recessed');
  const [paintFinish, setPaintFinish] = useState<'silk_matte' | 'italian_limewash' | 'venetian_stucco'>('italian_limewash');
  const [includeSmartHome, setIncludeSmartHome] = useState<boolean>(true);

  // Result state
  const [breakdown, setBreakdown] = useState({
    baseStructureCost: 2392500,
    kitchenAddon: 280000,
    wardrobesCost: 285000,
    ceilingCost: 203000,
    wallFinishCost: 385700,
    smartHomeCost: 95000,
    totalEstimate: 3641200,
    executionDays: 45
  });

  // Calculate live
  useEffect(() => {
    let baseRate = 1650;
    if (packageTier === 'essential') baseRate = 1150;
    if (packageTier === 'luxury_signature') baseRate = 2350;

    const baseStructureCost = Math.round(sqft * baseRate);

    let kAddon = 280000;
    if (kitchenType === 'parallel') kAddon = 340000;
    if (kitchenType === 'island') kAddon = 480000;
    if (packageTier === 'luxury_signature') kAddon = Math.round(kAddon * 1.4);

    const wardrobeRate = packageTier === 'luxury_signature' ? 140000 : packageTier === 'premium_atelier' ? 95000 : 70000;
    const wardrobesCost = wardrobes * wardrobeRate;

    let ceilingRate = 95;
    if (ceilingCoverage === 'full_recessed') ceilingRate = 140;
    if (ceilingCoverage === 'magnetic_track_luxury') ceilingRate = 210;
    const ceilingCost = Math.round(sqft * ceilingRate);

    let paintRate = 45;
    if (paintFinish === 'italian_limewash') paintRate = 95;
    if (paintFinish === 'venetian_stucco') paintRate = 160;
    const wallFinishCost = Math.round(sqft * 2.8 * paintRate);

    const smartHomeCost = includeSmartHome ? 95000 : 0;
    const totalEstimate = baseStructureCost + kAddon + wardrobesCost + ceilingCost + wallFinishCost + smartHomeCost;
    const executionDays = packageTier === 'luxury_signature' ? 60 : 45;

    setBreakdown({
      baseStructureCost,
      kitchenAddon: kAddon,
      wardrobesCost,
      ceilingCost,
      wallFinishCost,
      smartHomeCost,
      totalEstimate,
      executionDays
    });
  }, [propertyType, sqft, packageTier, kitchenType, wardrobes, ceilingCoverage, paintFinish, includeSmartHome]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleBookNow = () => {
    onBookWithEstimate({
      propertyType: propertyType.toUpperCase().replace('_', ' '),
      sqft,
      tier: packageTier.toUpperCase().replace('_', ' '),
      totalAmount: breakdown.totalEstimate
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="estimator" className="py-20 bg-[#FBF9F5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#A85836] mb-2.5">
            <Calculator className="w-3.5 h-3.5 text-[#A85836]" />
            <span>Transparent Pricing Engine</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Surcharges</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1B1310] tracking-tight text-balance">
            Interactive Turnkey Cost Estimator
          </h2>
          <p className="text-sm sm:text-base text-[#423B32] mt-3">
            Real-time itemized calculation based on current Hubli factory production rates. Calculate material finishes, modular carpentry, false ceiling, and smart lighting with complete transparency.
          </p>
        </div>

        {/* 2-Column Split: Controls on Left, Live Bill on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#2B1F1A]/10 shadow-sm space-y-6">
            
            {/* Step 1: Property Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-2.5">
                1. Property Configuration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '2bhk', label: '2 BHK Flat', defaultSqft: 1100 },
                  { id: '3bhk', label: '3 BHK Flat', defaultSqft: 1550 },
                  { id: '4bhk_villa', label: '4 BHK Villa', defaultSqft: 2800 },
                  { id: 'commercial', label: 'Commercial', defaultSqft: 2000 }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPropertyType(item.id as any);
                      setSqft(item.defaultSqft);
                    }}
                    className={`py-2.5 px-3 rounded text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                      propertyType === item.id
                        ? 'bg-[#A85836] text-white border-[#A85836] shadow-2xs'
                        : 'bg-[#FBF9F5] text-[#1B1310] border-[#2B1F1A]/10 hover:border-[#A85836]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Carpet Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#423B32]">
                  2. Carpet Area (Square Feet)
                </label>
                <span className="font-serif text-lg font-bold text-[#1B1310] tabular-nums">
                  {sqft.toLocaleString()} sq.ft
                </span>
              </div>
              <input
                type="range"
                min={600}
                max={5000}
                step={50}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 bg-[#F5F0E8] rounded-lg appearance-none cursor-pointer accent-[#A85836]"
              />
              <div className="flex justify-between text-[11px] text-[#423B32]/70 mt-1">
                <span>600 sq.ft (Compact)</span>
                <span>2,500 sq.ft (Standard Villa)</span>
                <span>5,000 sq.ft (Bespoke Estate)</span>
              </div>
            </div>

            {/* Step 3: Package Quality Tier */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-2.5">
                3. Execution & Material Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'essential',
                    title: 'Essential',
                    rate: '₹1,150/sq.ft',
                    desc: 'Anti-termite BWP plywood, high-gloss laminates, Hafele hardware.'
                  },
                  {
                    id: 'premium_atelier',
                    title: 'Premium Atelier',
                    rate: '₹1,650/sq.ft',
                    desc: 'Anti-scratch PU lacquer, Blum tandem boxes, mineral limewash.'
                  },
                  {
                    id: 'luxury_signature',
                    title: 'Luxury Signature',
                    rate: '₹2,350/sq.ft',
                    desc: 'Smoked timber veneers, Italian travertine stone, motorized lift-up.'
                  }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPackageTier(tier.id as any)}
                    className={`p-3.5 rounded-lg text-left transition-all border cursor-pointer ${
                      packageTier === tier.id
                        ? 'bg-[#FBF9F5] border-[#A85836] shadow-sm ring-1 ring-[#A85836]'
                        : 'bg-[#FBF9F5]/60 border-[#2B1F1A]/10 hover:border-[#2B1F1A]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-semibold text-sm text-[#1B1310]">{tier.title}</span>
                      <span className="text-[11px] font-bold text-[#A85836]">{tier.rate}</span>
                    </div>
                    <p className="text-[11px] text-[#423B32] mt-1.5 leading-snug">
                      {tier.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Modular Kitchen Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  4. Kitchen Layout
                </label>
                <select
                  value={kitchenType}
                  onChange={(e) => setKitchenType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                >
                  <option value="l_shape">L-Shape Modular Kitchen</option>
                  <option value="parallel">Parallel Double Counter Kitchen</option>
                  <option value="island">Waterfall Island Luxury Kitchen</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  5. Bedroom Wardrobes Count
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setWardrobes(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded border cursor-pointer ${
                        wardrobes === num
                          ? 'bg-[#A85836] text-white border-[#A85836]'
                          : 'bg-[#FBF9F5] text-[#1B1310] border-[#2B1F1A]/10'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Ceilings & Finishes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  6. False Ceiling & Lighting
                </label>
                <select
                  value={ceilingCoverage}
                  onChange={(e) => setCeilingCoverage(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                >
                  <option value="perimeter">Perimeter LED Cove Ceiling</option>
                  <option value="full_recessed">Full Recessed Designer Ceiling</option>
                  <option value="magnetic_track_luxury">Architectural Magnetic Track System</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#423B32] mb-1.5">
                  7. Wall Paint / Plaster
                </label>
                <select
                  value={paintFinish}
                  onChange={(e) => setPaintFinish(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded border border-[#2B1F1A]/20 bg-[#FBF9F5] text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                >
                  <option value="silk_matte">Asian Paints Royale Silk Matte</option>
                  <option value="italian_limewash">Italian Organic Mineral Limewash</option>
                  <option value="venetian_stucco">Artisanal Venetian Marble Stucco</option>
                </select>
              </div>
            </div>

            {/* Step 6: Smart Home Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded bg-[#FBF9F5] border border-[#2B1F1A]/10">
              <div>
                <span className="text-xs font-semibold text-[#1B1310] block">Smart Home Scene Lighting Module</span>
                <span className="text-[11px] text-[#423B32]">App & Voice-controlled dimming scenes for living and master bedroom</span>
              </div>
              <button
                type="button"
                onClick={() => setIncludeSmartHome(!includeSmartHome)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                  includeSmartHome
                    ? 'bg-[#A85836] text-white'
                    : 'bg-white text-[#423B32] border border-[#2B1F1A]/20'
                }`}
              >
                {includeSmartHome ? 'Included (+₹95K)' : 'Exclude'}
              </button>
            </div>

          </div>

          {/* Right Column: Transparent Itemized Bill */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#2B1F1A]/10 shadow-sm sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#2B1F1A]/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A85836]">
                  Hubli Turnkey Cost Breakdown
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#1B1310]">
                  Project Summary
                </h3>
              </div>
              <button
                onClick={handlePrint}
                title="Print Estimate"
                className="p-2 text-[#423B32] hover:text-[#1B1310] hover:bg-[#F5F0E8] rounded transition-colors cursor-pointer"
                aria-label="Print estimate"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>

            {/* Itemized Line Items */}
            <div className="mt-5 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-[#423B32]">
                <span>Base Woodwork & Millwork</span>
                <span className="font-semibold text-[#1B1310] tabular-nums">{formatINR(breakdown.baseStructureCost)}</span>
              </div>

              <div className="flex justify-between items-center text-[#423B32]">
                <span>Modular Kitchen ({kitchenType.replace('_', ' ')})</span>
                <span className="font-semibold text-[#1B1310] tabular-nums">{formatINR(breakdown.kitchenAddon)}</span>
              </div>

              <div className="flex justify-between items-center text-[#423B32]">
                <span>Modular Wardrobes ({wardrobes} Bedrooms)</span>
                <span className="font-semibold text-[#1B1310] tabular-nums">{formatINR(breakdown.wardrobesCost)}</span>
              </div>

              <div className="flex justify-between items-center text-[#423B32]">
                <span>False Ceiling & Recessed Profiles</span>
                <span className="font-semibold text-[#1B1310] tabular-nums">{formatINR(breakdown.ceilingCost)}</span>
              </div>

              <div className="flex justify-between items-center text-[#423B32]">
                <span>Wall Finishes & Architectural Plaster</span>
                <span className="font-semibold text-[#1B1310] tabular-nums">{formatINR(breakdown.wallFinishCost)}</span>
              </div>

              {includeSmartHome && (
                <div className="flex justify-between items-center text-[#423B32]">
                  <span>Smart Home Lighting Automation</span>
                  <span className="font-semibold text-[#1B1310] tabular-nums">{formatINR(breakdown.smartHomeCost)}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="mt-6 pt-5 border-t border-dashed border-[#2B1F1A]/20 bg-[#FBF9F5] -mx-6 sm:-mx-8 px-6 sm:px-8 py-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-[#A85836] block">
                    Estimated Turnkey Investment
                  </span>
                  <span className="text-[11px] text-[#423B32]/70">Includes 18% GST & On-Site Engineering</span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-3xl font-bold text-[#1B1310] tabular-nums block">
                    {formatINR(breakdown.totalEstimate)}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-4 pt-3 border-t border-[#2B1F1A]/10 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#423B32]">
                  <Clock className="w-3.5 h-3.5 text-[#A85836] shrink-0" />
                  <span>{breakdown.executionDays}-Day Handover</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#423B32]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A85836] shrink-0" />
                  <span>10-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleBookNow}
                className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lock In Estimate & Book Free Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#423B32]/70">
                Zero obligation. Our senior architect visits your property in Hubli-Dharwad to verify dimensions.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Phone, Mail, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { STUDIO_PALETTES } from '../data/studioData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillPalette?: string;
  prefillScope?: string;
  prefillEstimatedAmount?: number;
  onInquirySubmitted: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  prefillPalette,
  prefillScope,
  prefillEstimatedAmount,
  onInquirySubmitted
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Hubli (Vidyanagar)');
  const [propertyType, setPropertyType] = useState('3 BHK Luxury Apartment');
  const [projectScope, setProjectScope] = useState(prefillScope || 'Turnkey Living, Modular Kitchen & Bedrooms');
  const [approxBudget, setApproxBudget] = useState('₹20 - 30 Lakhs');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [colorPalettePreference, setColorPalettePreference] = useState(prefillPalette || 'Warm Travertine & Smoked Walnut');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceCode: string;
    fullName: string;
    preferredDate: string;
    preferredTime: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync prefills
  useEffect(() => {
    if (prefillPalette) setColorPalettePreference(prefillPalette);
    if (prefillScope) setProjectScope(prefillScope);
  }, [prefillPalette, prefillScope]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          city,
          propertyType,
          projectScope,
          approxBudget,
          preferredDate: preferredDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          preferredTime,
          message,
          colorPalettePreference,
          estimatedTotal: prefillEstimatedAmount
        })
      });

      const data = await res.json();
      if (data.success && data.inquiry) {
        setSubmittedData({
          referenceCode: data.inquiry.referenceCode,
          fullName: data.inquiry.fullName,
          preferredDate: data.inquiry.preferredDate,
          preferredTime: data.inquiry.preferredTime
        });
        onInquirySubmitted();
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not register consultation booking. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmittedData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="bg-[#FBF9F5] rounded-xl border border-[#2B1F1A]/20 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 text-[#423B32] hover:text-[#1B1310] rounded-md transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Confirmation State */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-[#A85836]">
              Consultation Registered
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1310] mt-1">
              Thank You, {submittedData.fullName}
            </h3>

            <p className="text-xs sm:text-sm text-[#423B32] max-w-md mx-auto mt-2 leading-relaxed">
              Your on-site consultation request has been queued at our Hubli studio. Our principal design architect will call you within 2 business hours.
            </p>

            {/* Reference Card */}
            <div className="mt-6 p-4 rounded-lg bg-white border border-[#2B1F1A]/10 max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#423B32]/70">Reference Tracking ID:</span>
                <span className="font-mono font-bold text-[#A85836]">{submittedData.referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#423B32]/70">Target Appointment:</span>
                <span className="font-semibold text-[#1B1310]">{submittedData.preferredDate} ({submittedData.preferredTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#423B32]/70">Studio Flagship:</span>
                <span className="font-semibold text-[#1B1310]">Vidyanagar, Hubli</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="mt-8 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#2B1F1A] hover:bg-[#A85836] rounded-md transition-colors cursor-pointer"
            >
              Done & Return to Site
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6 pb-4 border-b border-[#2B1F1A]/10">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A85836]">
                Touchstone Architecture Hubli
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1B1310] mt-0.5">
                Schedule a Design Consultation
              </h3>
              <p className="text-xs text-[#423B32] mt-1">
                Zero obligation site visit or studio meeting with our principal architect.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 p-2.5 rounded border border-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full px-3.5 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full px-3.5 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  />
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full px-3.5 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Project City / Area
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  >
                    <option value="Hubli (Vidyanagar)">Hubli (Vidyanagar)</option>
                    <option value="Hubli (Shirur Park)">Hubli (Shirur Park)</option>
                    <option value="Hubli (Gokul Road / Keshwapur)">Hubli (Gokul Road / Keshwapur)</option>
                    <option value="Dharwad (Narayanpur / Kelgerie)">Dharwad (Narayanpur / Kelgerie)</option>
                    <option value="Belgaum">Belgaum</option>
                    <option value="Davanagere">Davanagere</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>
              </div>

              {/* Property Type & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Property Configuration
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  >
                    <option value="2 BHK Apartment">2 BHK Apartment</option>
                    <option value="3 BHK Luxury Apartment">3 BHK Luxury Apartment</option>
                    <option value="4 BHK Independent Villa">4 BHK Independent Villa</option>
                    <option value="Commercial Office / Clinic">Commercial Office / Clinic</option>
                    <option value="Complete Home Renovation">Complete Home Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Approximate Budget
                  </label>
                  <select
                    value={approxBudget}
                    onChange={(e) => setApproxBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  >
                    <option value="₹12 - 18 Lakhs">₹12 - 18 Lakhs</option>
                    <option value="₹18 - 28 Lakhs">₹18 - 28 Lakhs</option>
                    <option value="₹28 - 45 Lakhs">₹28 - 45 Lakhs</option>
                    <option value="₹45 Lakhs+ (Luxury Estate)">₹45 Lakhs+ (Luxury Estate)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Palette Selection */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                  Preferred Architectural Palette
                </label>
                <select
                  value={colorPalettePreference}
                  onChange={(e) => setColorPalettePreference(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                >
                  {STUDIO_PALETTES.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.subtitle})
                    </option>
                  ))}
                  <option value="Bespoke AI Generated Palette">Bespoke AI Generated Palette</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-1.5 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                    Preferred Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                  >
                    <option value="11:00 AM">Morning (11:00 AM)</option>
                    <option value="02:30 PM">Afternoon (02:30 PM)</option>
                    <option value="05:30 PM">Evening (05:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#423B32] mb-1">
                  Specific Requirements or Floor Plan Notes
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Need fluted acoustic paneling in living room and island modular kitchen..."
                  className="w-full px-3.5 py-2 rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#A85836] hover:bg-[#8F4628] disabled:bg-neutral-400 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering with Hubli Studio...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Consultation Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

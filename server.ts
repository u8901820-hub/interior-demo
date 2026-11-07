import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory + persisted store for consultation inquiries & quotes
export interface InquiryRecord {
  id: string;
  referenceCode: string;
  fullName: string;
  phone: string;
  email: string;
  city: string; // Hubli, Dharwad, Belgaum, Bengaluru, etc.
  propertyType: string;
  projectScope: string;
  approxBudget: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  colorPalettePreference?: string;
  status: 'New' | 'Consultation Scheduled' | 'Concept Drafted' | 'Quotation Sent' | 'Under Execution' | 'Completed';
  designerNotes?: string;
  estimatedTotal?: number;
  createdAt: string;
}

// Initial realistic seed inquiries so the admin/tracking portal is functional out of the box
const initialInquiries: InquiryRecord[] = [
  {
    id: 'inq-101',
    referenceCode: 'TS-HBL-8412',
    fullName: 'Dr. Anand Patil',
    phone: '+91 98450 12389',
    email: 'dr.anandpatil@gmail.com',
    city: 'Hubli (Shirur Park)',
    propertyType: '4 BHK Luxury Villa',
    projectScope: 'Turnkey Living, Modular Kitchen & Master Suite',
    approxBudget: '₹35 - 45 Lakhs',
    preferredDate: '2026-11-12',
    preferredTime: '11:00 AM',
    colorPalettePreference: 'Warm Travertine & Walnut',
    message: 'Looking for a turnkey interior handover before housewarming. Need acoustic fluted paneling in the living room and an Italian marble waterfall island kitchen.',
    status: 'Consultation Scheduled',
    designerNotes: 'Site visit confirmed. Client prefers 2700K warm magnetic track lighting setup.',
    estimatedTotal: 3850000,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'inq-102',
    referenceCode: 'TS-HBL-9210',
    fullName: 'Pooja & Rohan Deshmukh',
    phone: '+91 94801 88231',
    email: 'pooja.deshmukh@yahoo.com',
    city: 'Dharwad (Narayanpur)',
    propertyType: '3 BHK High-Rise Apartment',
    projectScope: 'Full Modular Kitchen & 3 Bedroom Wardrobes',
    approxBudget: '₹18 - 25 Lakhs',
    preferredDate: '2026-11-15',
    preferredTime: '03:30 PM',
    colorPalettePreference: 'Nordic Sage & Raw Linen',
    message: 'Modern minimalist design with anti-scratch acrylic shutters and tandem soft-close drawers for the kitchen.',
    status: 'Concept Drafted',
    designerNotes: '3D kitchen elevation completed. Awaiting client review of acrylic swatch samples.',
    estimatedTotal: 2150000,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

let inquiries: InquiryRecord[] = [...initialInquiries];

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', studio: 'Touchstone Atelier Hubli', timestamp: new Date().toISOString() });
});

// Get all inquiries
app.get('/api/inquiries', (_req, res) => {
  res.json({ success: true, count: inquiries.length, inquiries });
});

// Submit a new inquiry / consultation booking
app.post('/api/inquiries', (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      city = 'Hubli',
      propertyType,
      projectScope,
      approxBudget = '₹15 - 25 Lakhs',
      preferredDate,
      preferredTime,
      message = '',
      colorPalettePreference = 'Warm Travertine & Walnut',
      estimatedTotal
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({ success: false, error: 'Full name and contact number are required.' });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `TS-HBL-${randomSuffix}`;

    const newRecord: InquiryRecord = {
      id: `inq-${Date.now()}`,
      referenceCode,
      fullName,
      phone,
      email: email || '',
      city,
      propertyType: propertyType || 'Residential Home',
      projectScope: projectScope || 'Turnkey Interior Design',
      approxBudget,
      preferredDate: preferredDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      preferredTime: preferredTime || '11:00 AM',
      message,
      colorPalettePreference,
      status: 'New',
      estimatedTotal: estimatedTotal ? Number(estimatedTotal) : undefined,
      createdAt: new Date().toISOString()
    };

    inquiries.unshift(newRecord);
    res.status(201).json({
      success: true,
      message: 'Consultation booking registered successfully.',
      inquiry: newRecord
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Internal server error' });
  }
});

// Update inquiry status / notes
app.patch('/api/inquiries/:id', (req, res) => {
  const { id } = req.params;
  const { status, designerNotes } = req.body;

  const target = inquiries.find((item) => item.id === id || item.referenceCode === id);
  if (!target) {
    return res.status(404).json({ success: false, error: 'Inquiry not found' });
  }

  if (status) target.status = status;
  if (designerNotes !== undefined) target.designerNotes = designerNotes;

  res.json({ success: true, inquiry: target });
});

// Interactive interior cost calculator
app.post('/api/calculator/estimate', (req, res) => {
  try {
    const {
      propertyType = '3bhk',
      carpetAreaSqft = 1450,
      packageTier = 'premium_atelier',
      kitchenType = 'l_shape',
      wardrobeCount = 3,
      falseCeilingCoverage = 'perimeter',
      paintFinish = 'silk_matte',
      includeSmartHome = true
    } = req.body;

    // Base rates per sq.ft based on tier
    // essential: ~₹1,150 / sqft
    // premium_atelier: ~₹1,650 / sqft
    // luxury_signature: ~₹2,350 / sqft
    let baseRate = 1650;
    if (packageTier === 'essential') baseRate = 1150;
    if (packageTier === 'luxury_signature') baseRate = 2350;

    const baseStructureCost = Math.round(Number(carpetAreaSqft) * baseRate);

    // Kitchen premium additions
    let kitchenAddon = 280000;
    if (kitchenType === 'parallel') kitchenAddon = 340000;
    if (kitchenType === 'island') kitchenAddon = 480000;
    if (packageTier === 'luxury_signature') kitchenAddon = Math.round(kitchenAddon * 1.4);

    // Wardrobes
    const wardrobeRate = packageTier === 'luxury_signature' ? 140000 : packageTier === 'premium_atelier' ? 95000 : 70000;
    const wardrobesCost = Number(wardrobeCount) * wardrobeRate;

    // False Ceiling
    let ceilingRate = 95;
    if (falseCeilingCoverage === 'full_recessed') ceilingRate = 140;
    if (falseCeilingCoverage === 'magnetic_track_luxury') ceilingRate = 210;
    const ceilingCost = Math.round(Number(carpetAreaSqft) * ceilingRate);

    // Architectural Paint & Wall Finishes
    let paintRate = 45;
    if (paintFinish === 'italian_limewash') paintRate = 95;
    if (paintFinish === 'venetian_stucco') paintRate = 160;
    const wallFinishCost = Math.round(Number(carpetAreaSqft) * 2.8 * paintRate);

    // Smart Home & Magnetic Track
    const smartHomeCost = includeSmartHome ? 95000 : 0;

    const totalEstimate = baseStructureCost + kitchenAddon + wardrobesCost + ceilingCost + wallFinishCost + smartHomeCost;
    const executionDays = packageTier === 'luxury_signature' ? 60 : 45;

    res.json({
      success: true,
      breakdown: {
        baseStructureCost,
        kitchenAddon,
        wardrobesCost,
        ceilingCost,
        wallFinishCost,
        smartHomeCost,
        totalEstimate,
        executionDays,
        currency: 'INR',
        warrantyYears: 10
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// AI Interior Palette & Concept Advisor (Gemini API)
app.post('/api/ai-palette-consultant', async (req, res) => {
  const {
    roomType = 'Living & Dining Room',
    orientation = 'East Facing (Warm Morning Light)',
    styleVibe = 'Warm Minimalist / Karnataka Teak Harmony',
    moodIntent = 'Calm, grounded, airy and welcoming for large family gatherings',
    budgetTier = 'Luxury Turnkey'
  } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  // Fallback curated palette if API key isn't provided or external call fails
  const fallbackResponse = {
    paletteTitle: 'Hubli Heritage & Honed Travertine',
    narrative: `Designed specifically for an ${orientation} ${roomType}. The soft golden morning sunlight enlivens organic limewash textures, balanced by deep Karnataka teak accents and serene porous travertine stone.`,
    colorHarmonies: [
      {
        name: 'Sand Travertine Plaster',
        hex: '#EFE7DA',
        finish: 'Limewash Matt',
        asianPaintsCode: 'L152 (Warm Alabaster)',
        role: 'Primary Walls (60%)'
      },
      {
        name: 'Warm Earthen Terracotta',
        hex: '#A85836',
        finish: 'Velvet Matt',
        asianPaintsCode: '0414 (Rustic Clay)',
        role: 'Accent Wall & Niche Detailing (15%)'
      },
      {
        name: 'Nilgiri Smoked Walnut',
        hex: '#2B1F1A',
        finish: 'Deep Satin PU Veneer',
        asianPaintsCode: 'Natural Wood Stain W09',
        role: 'Fluted Paneling & Custom Millwork (20%)'
      },
      {
        name: 'Aged Hampi Brass',
        hex: '#C5A059',
        finish: 'Brushed PVD Brass',
        asianPaintsCode: 'Metallic Lustre B4',
        role: 'Hardware, Reveal Profiles & Fixtures (5%)'
      }
    ],
    materialSpecs: [
      'Italian Honed Beige Travertine for coffee table and console tops',
      'FSC Certified Smoked Walnut or Natural Teak fluted wall slats',
      'Textured Bouclé and natural coarse linen for upholstery',
      'Magnetic architectural track system with 2700K Warm White LEDs'
    ],
    lightingGuidance: {
      temperature: '2700K (Warm Ambient) + 3000K (Task/Countertop)',
      luxLevel: '150-220 Lux general, 350 Lux dining focal',
      cRI: 'CRI 95+ to faithfully render natural wood grain'
    },
    designerProTips: [
      'Position fluted wood paneling perpendicular to the window to accentuate dramatic relief shadows as the sun moves.',
      'Keep baseboards flush (Z-profile recessed skirting) to heighten the perceived ceiling volume.',
      'Use matte zero-sheen paint on ceilings to prevent glare reflection from magnetic track lights.'
    ]
  };

  if (!apiKey) {
    return res.json({ success: true, isAiGenerated: false, data: fallbackResponse });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const prompt = `You are the Principal Architectural Interior Designer at Touchstone Atelier in Hubli, Karnataka.
A high-end residential client is requesting an architectural interior color palette and materiality concept.

Client Specifications:
- Room Type: ${roomType}
- Natural Light Orientation: ${orientation}
- Desired Style & Aesthetic: ${styleVibe}
- Mood / Functional Intent: ${moodIntent}
- Budget Tier: ${budgetTier}

Provide a comprehensive, bespoke interior architectural recommendation.
Respond strictly in JSON matching the requested structure.
Include 4 curated colors with authentic Hex codes, paint finish types, Indian paint reference names (Asian Paints / Berger), structural roles, 4 premium materials, lighting guidance with Kelvin temperatures, and 3 professional designer advice tips.`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            paletteTitle: { type: Type.STRING },
            narrative: { type: Type.STRING },
            colorHarmonies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                  finish: { type: Type.STRING },
                  asianPaintsCode: { type: Type.STRING },
                  role: { type: Type.STRING }
                },
                required: ['name', 'hex', 'finish', 'asianPaintsCode', 'role']
              }
            },
            materialSpecs: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            lightingGuidance: {
              type: Type.OBJECT,
              properties: {
                temperature: { type: Type.STRING },
                luxLevel: { type: Type.STRING },
                cRI: { type: Type.STRING }
              },
              required: ['temperature', 'luxLevel', 'cRI']
            },
            designerProTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['paletteTitle', 'narrative', 'colorHarmonies', 'materialSpecs', 'lightingGuidance', 'designerProTips']
        }
      }
    });

    const parsed = JSON.parse(aiResponse.text || '{}');
    res.json({ success: true, isAiGenerated: true, data: parsed });
  } catch (err: any) {
    console.error('Gemini API call error:', err);
    // Graceful fallback to rich studio template
    res.json({ success: true, isAiGenerated: false, data: fallbackResponse, note: 'Used curated studio library' });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Touchstone Atelier server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

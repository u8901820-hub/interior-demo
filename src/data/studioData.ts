import { ProjectItem, ServiceItem, ColorPaletteItem, TestimonialItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_living_1794038562839.jpg';
export const KITCHEN_IMAGE = '/src/assets/images/modular_kitchen_bespoke_1794038562816.jpg';
export const BEDROOM_IMAGE = '/src/assets/images/master_bedroom_retreat_1794038564291.jpg';
export const OFFICE_IMAGE = '/src/assets/images/executive_commercial_office_1794038563892.jpg';
export const CRAFT_IMAGE = '/src/assets/images/fluted_panel_craftsmanship_1794038564152.jpg';

export const STUDIO_PALETTES: ColorPaletteItem[] = [
  {
    id: 'travertine-walnut',
    name: 'Warm Travertine & Smoked Walnut',
    subtitle: 'Warm Mediterranean & South Indian Modernity',
    description: 'A soothing organic dialogue between porous honed travertine, tactile limewash plaster, and vertical fluted smoked walnut millwork.',
    primaryHex: '#EFE7DA',
    colors: [
      { name: 'Limewash Alabaster', hex: '#F4EFE6', finish: 'Mineral Matt', paintCode: 'AP-L152', role: 'Main Walls (60%)' },
      { name: 'Warm Terracotta Clay', hex: '#A85836', finish: 'Velvet Matt', paintCode: 'AP-0414', role: 'Accent Alcoves (15%)' },
      { name: 'Smoked Walnut Veneer', hex: '#2B1F1A', finish: 'Deep Satin PU', paintCode: 'Natural Timber', role: 'Fluted Slats (20%)' },
      { name: 'Hampi Antique Brass', hex: '#C5A059', finish: 'Brushed PVD', paintCode: 'Metallic Lustre', role: 'Hardware & Trim (5%)' }
    ],
    woodFinish: 'Smoked Walnut & Natural Teak',
    metalAccent: 'Brushed Champagne Brass',
    stoneMaterial: 'Italian Honed Beige Travertine',
    idealFor: 'Spacious 3 & 4 BHK Living-Dining Lounges, Master Suites'
  },
  {
    id: 'nordic-sage',
    name: 'Nordic Sage & Raw Linen',
    subtitle: 'Biophilic Serenity & Diffused Natural Light',
    description: 'Calming sage leaf undertones anchored by light natural white oak and textured bouclé, ideal for tranquil study rooms and modern bedrooms.',
    primaryHex: '#E2E8E1',
    colors: [
      { name: 'Muted Earthen Sage', hex: '#5B6E57', finish: 'Eggshell Matt', paintCode: 'AP-7621', role: 'Feature Wall (30%)' },
      { name: 'Raw Bleached Linen', hex: '#F7F6F2', finish: 'Silk Matt', paintCode: 'AP-L101', role: 'Ceilings & Walls (50%)' },
      { name: 'Natural White Oak', hex: '#CBB296', finish: 'Zero-Sheen Matte Oil', paintCode: 'Natural Wood', role: 'Cabinetry & Flooring (15%)' },
      { name: 'Matte Gunmetal Black', hex: '#26282B', finish: 'Anodized Matte', paintCode: 'Charcoal Deep', role: 'Profiles & Tracks (5%)' }
    ],
    woodFinish: 'Natural White Oak & Ash Wood',
    metalAccent: 'Matte Anodized Black Metal',
    stoneMaterial: 'Pietra Grey or Concrete Finish Quartz',
    idealFor: 'Minimalist Modular Kitchens, Quiet Bedrooms & Home Offices'
  },
  {
    id: 'terracotta-dune',
    name: 'Sienna Terracotta & Desert Dune',
    subtitle: 'Rich Earthy Warmth & Artisanal Texture',
    description: 'Warm clay pigments celebrated with creamy beige limestone and brass accents for an inviting, timeless contemporary Indian warmth.',
    primaryHex: '#9E4E32',
    colors: [
      { name: 'Sienna Burnt Clay', hex: '#9E4E32', finish: 'Suede Stucco', paintCode: 'AP-0520', role: 'Accent Wall (25%)' },
      { name: 'Dune Sand Plaster', hex: '#EBE2D3', finish: 'Coarse Limewash', paintCode: 'AP-L168', role: 'Primary Envelope (55%)' },
      { name: 'Caramel Teak Stain', hex: '#633B23', finish: 'Warm Polyurethane', paintCode: 'Teak Heritage', role: 'Furniture & Frames (15%)' },
      { name: 'Warm Cast Bronze', hex: '#7A6242', finish: 'Aged Patina', paintCode: 'Bronze Antique', role: 'Handles & Lighting (5%)' }
    ],
    woodFinish: 'Burma Teak & Caramel Ash',
    metalAccent: 'Aged Patina Bronze',
    stoneMaterial: 'Jaisalmer Yellow Limestone & Travertine',
    idealFor: 'Heritage-Infused Dining, Foyer Entrances & Conversation Nooks'
  },
  {
    id: 'noir-brass',
    name: 'Obsidian Noir & Royal Brass',
    subtitle: 'Metropolitan Penthouse Sophistication',
    description: 'Dramatic architectural darks tempered by deep warm walnut millwork, warm 2700K perimeter cove lighting, and polished gold accents.',
    primaryHex: '#1C1B1A',
    colors: [
      { name: 'Obsidian Velvet Charcoal', hex: '#1C1B1A', finish: 'Ultra-Matte', paintCode: 'AP-8244', role: 'Acoustic Wall Panels (35%)' },
      { name: 'Warm Greige Chiffon', hex: '#DDD6CC', finish: 'Silk Wash', paintCode: 'AP-L120', role: 'Contrast Walls (45%)' },
      { name: 'Dark Roasted Walnut', hex: '#31231D', finish: 'Low-Lustre Lacquer', paintCode: 'Espresso Timber', role: 'Custom Millwork (15%)' },
      { name: 'Refined Polished Gold', hex: '#DFBA68', finish: 'Mirror PVD Gold', paintCode: 'Gold Leaf', role: 'Luminaires & Inlays (5%)' }
    ],
    woodFinish: 'Dark Roasted Walnut & Smoked Eucalyptus',
    metalAccent: 'Mirror PVD Brushed Gold',
    stoneMaterial: 'Calacatta Black Gold Quartz & Nero Marquina',
    idealFor: 'Executive Commercial Suites, Penthouse Entertainment Lounges'
  }
];

export const STUDIO_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'The Travertine & Oak Villa',
    category: 'residential',
    categoryLabel: 'Turnkey Residential Villa',
    location: 'Shirur Park, Hubli',
    carpetArea: '3,850 sq.ft',
    duration: '52 Days Handover',
    year: '2025',
    image: HERO_IMAGE,
    paletteName: 'Warm Travertine & Smoked Walnut',
    paletteColors: ['#F4EFE6', '#A85836', '#2B1F1A', '#C5A059'],
    clientBrief: 'The homeowner sought an uncluttered, biophilic retreat featuring natural light, concealed HVAC, acoustic timber fluting, and handcrafted Italian travertine stone elements.',
    highlights: [
      'Custom curved fluted oak feature wall with hidden bar unit',
      'Continuous 1200x2400mm honed travertine flooring',
      'Magnetic linear track lighting with scene-based smart dimming',
      'Double-height sheer linen window dressing system'
    ],
    keyMaterials: ['Honed Travertine', 'FSC Smoked Walnut', 'Bouclé Wool', 'Brushed Brass']
  },
  {
    id: 'proj-2',
    title: 'The Calacatta Horizon Modular Kitchen',
    category: 'kitchen',
    categoryLabel: 'Bespoke Island Kitchen',
    location: 'Vidyanagar, Hubli',
    carpetArea: '320 sq.ft Kitchen + Pantry',
    duration: '28 Days Handover',
    year: '2025',
    image: KITCHEN_IMAGE,
    paletteName: 'Warm Travertine & Smoked Walnut',
    paletteColors: ['#EFE7DA', '#2B1F1A', '#C5A059', '#F4EFE6'],
    clientBrief: 'A culinary enthusiast couple desired an open-concept kitchen with a 3.2-meter waterfall island, integrated Bosch appliances, and scratch-resistant matte PU finishes.',
    highlights: [
      'Calacatta Gold quartz seamless waterfall countertop',
      'Full-height fluted walnut acoustic cladding on island facade',
      'Blum Aventos motorized lift-up cabinet systems',
      'Recessed warm LED profile lighting in under-cabinet reveals'
    ],
    keyMaterials: ['Calacatta Gold Quartz', 'Anti-Fingerprint Taupe PU', 'Fluted Walnut', 'PVD Brass Faucets']
  },
  {
    id: 'proj-3',
    title: 'The Terracotta Master Sanctuary',
    category: 'bedroom',
    categoryLabel: 'Luxury Master Suite',
    location: 'Kelgerie Road, Dharwad',
    carpetArea: '560 sq.ft Suite + Walk-in Closet',
    duration: '35 Days Handover',
    year: '2026',
    image: BEDROOM_IMAGE,
    paletteName: 'Sienna Terracotta & Desert Dune',
    paletteColors: ['#9E4E32', '#EBE2D3', '#633B23', '#7A6242'],
    clientBrief: 'Transform a builder-grade master bedroom into a 5-star boutique resort retreat with floor-to-ceiling garden views, acoustic paneling, and an integrated walk-in wardrobe.',
    highlights: [
      'Handcrafted acoustic fluted timber wall integrated with soft linen headboard',
      'Walk-in wardrobe with smoked fluted glass sliding partitions',
      'Cantilevered bedside ledges with concealed wireless fast charging',
      'Indirect 2700K architectural ceiling cove lighting'
    ],
    keyMaterials: ['Natural Walnut', 'Belgian Natural Linen', 'Terracotta Plaster', 'Fluted Toughened Glass']
  },
  {
    id: 'proj-4',
    title: 'Metropolitan Executive Boardroom & Studio',
    category: 'commercial',
    categoryLabel: 'Commercial & Corporate',
    location: 'Gokul Road, Hubli',
    carpetArea: '2,400 sq.ft Office Floor',
    duration: '42 Days Handover',
    year: '2025',
    image: OFFICE_IMAGE,
    paletteName: 'Obsidian Noir & Royal Brass',
    paletteColors: ['#1C1B1A', '#DDD6CC', '#31231D', '#DFBA68'],
    clientBrief: 'A modern corporate regional headquarters needing acoustic privacy, executive conference spaces, custom millwork, and warm architectural lighting for video production.',
    highlights: [
      'Smoked fluted glass acoustic demountable office partitions',
      'Custom cantilevered executive desks in dark roasted walnut',
      'Acoustic felt terracotta ceiling baffles for zero-echo audio clarity',
      'Integrated wire management and hidden power docks'
    ],
    keyMaterials: ['Smoked Fluted Glass', 'Dark Roasted Walnut', 'Acoustic Felt', 'Anodized Black Aluminum']
  },
  {
    id: 'proj-5',
    title: 'The Artisanal Fluted Wall & Foyer Detail',
    category: 'renovation',
    categoryLabel: 'Turnkey Renovation & Craft',
    location: 'Keshwapur, Hubli',
    carpetArea: '1,950 sq.ft Complete Makeover',
    duration: '40 Days Handover',
    year: '2026',
    image: CRAFT_IMAGE,
    paletteName: 'Warm Travertine & Smoked Walnut',
    paletteColors: ['#EFE7DA', '#A85836', '#2B1F1A', '#C5A059'],
    clientBrief: 'A complete structural interior remodel of a 15-year-old family apartment, replacing heavy compartmentalized walls with tactile materials and light-filled transitions.',
    highlights: [
      'Precision joint between organic porous travertine slab and fluted oak slats',
      'Embedded warm brass shadow line profile with diffused LED glow',
      'Concealed flush frameless doors with magnetic latches',
      'Zero-VOC Italian mineral limewash applied throughout living spaces'
    ],
    keyMaterials: ['Honed Travertine', 'Fluted White Oak', 'Raw Brass Profile', 'Mineral Limewash']
  }
];

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'turnkey-residential',
    title: 'Turnkey Residential Interior Architecture',
    shortDesc: 'End-to-end design, German-machine manufacturing, and precision execution for villas and premium apartments.',
    fullDesc: 'From initial 3D volumetric space planning to turnkey handover with styling. We handle civil modifications, false ceilings, customized millwork, electrical infrastructure, plumbing updates, and designer furnishings with zero coordination headaches for you.',
    features: [
      'Photorealistic 3D visualization & 360-degree VR walkthroughs',
      'German CNC factory precision woodwork with 0.1mm accuracy',
      'Strict 45-day guaranteed execution timeline with milestone tracking',
      '10-year comprehensive warranty with zero-cost scheduled maintenance'
    ],
    materials: ['BWP Grade Marine Plywood (IS 710)', 'European Hardware (Blum / Hettich)', 'Italian PU & Natural Veneers'],
    startingPrice: 'Starting from ₹1,250 / sq.ft',
    iconName: 'Home',
    image: HERO_IMAGE
  },
  {
    id: 'modular-kitchens',
    title: 'Precision Modular Kitchens',
    shortDesc: 'Ergonomic, anti-termite, moisture-resistant kitchens engineered with Blum/Hettich hardware and quartz surfaces.',
    fullDesc: 'Custom-designed kitchens tailored to Indian cooking habits. Featuring heavy-duty tandem boxes, pull-out pantry towers, anti-scratch acrylic or PU lacquer shutters, and heat-resistant quartz waterfall countertops.',
    features: [
      'Tailored layouts: L-shape, U-shape, Parallel, and Central Island',
      'Soft-close lifetime guaranteed hinges and motorized lift-ups',
      'Zero-formaldehyde, 100% boiling-water-proof (BWP) marine carcass',
      'Concealed under-cabinet LED task lighting with sensor controls'
    ],
    materials: ['BWP Marine Core', 'Calacatta Gold / Caesarstone Quartz', 'Anti-Fingerprint Acrylic / PU Finish'],
    startingPrice: 'Starting from ₹2.8 Lakhs',
    iconName: 'ChefHat',
    image: KITCHEN_IMAGE
  },
  {
    id: 'modular-wardrobes',
    title: 'Ergonomic Modular Wardrobes & Closets',
    shortDesc: 'Floor-to-ceiling storage with sliding fluted glass doors, lacquered glass, sensor LED illumination, and custom organizers.',
    fullDesc: 'Optimize every vertical inch of your bedroom. Our modular wardrobes feature velvet-lined jewelry drawers, pull-out trouser racks, integrated full-length mirrors, and whisper-quiet floor-to-ceiling soft-close sliding systems.',
    features: [
      'Custom configurations: Walk-in closets, Sliding doors, and Hinged wardrobes',
      'Fluted smoked glass shutters with brushed anodized aluminum profiles',
      'Integrated motion-activated warm LED strip lighting',
      'Modular interior shelving adaptable to your seasonal wardrobe needs'
    ],
    materials: ['Toughened Fluted Glass', 'Anodized Aluminum Framing', 'Scratch-Proof Textured Laminates'],
    startingPrice: 'Starting from ₹85,000 / unit',
    iconName: 'Layers',
    image: BEDROOM_IMAGE
  },
  {
    id: 'renovation-remodeling',
    title: 'Complete Home Renovation & Remodeling',
    shortDesc: 'Transform dated apartments and ancestral homes into contemporary architectural masterpieces.',
    fullDesc: 'Structural wall removals, flooring replacements (Italian marble, large-format vitrified tiles, wooden flooring), modern bathroom redesigns, and comprehensive electrical upgrades executed without disturbing building structural integrity.',
    features: [
      'Structural assessment and load-bearing beam verification by senior engineers',
      'Debris removal and site protection protocols throughout the build',
      'Modern open-concept floor plan reconfigurations',
      'Complete replacement of plumbing pipelines and high-efficiency wiring'
    ],
    materials: ['Reinforced Steel Beams', 'Italian Marble Flooring', 'Grohe / Kohler Sanitary Fixtures'],
    startingPrice: 'Custom assessment upon site visit',
    iconName: 'Sparkles',
    image: CRAFT_IMAGE
  },
  {
    id: 'commercial-interiors',
    title: 'Commercial & Executive Corporate Spaces',
    shortDesc: 'Acoustically engineered offices, retail showrooms, healthcare clinics, and boutique hospitality spaces.',
    fullDesc: 'We translate your company brand ethos into physical environments that boost employee well-being and leave lasting impressions on visiting clients. Seamless integration of data cabling, smart access control, and acoustic damping.',
    features: [
      'Demountable acoustic double-glazed glass partitions (STC 42+)',
      'Ergonomic BIFMA-certified executive and collaborative desking',
      'Energy-efficient lighting design with daylight harvesting sensors',
      'Branded reception lounges and executive boardrooms'
    ],
    materials: ['Acoustic Felt Paneling', 'Smoked Toughened Glass', 'Heavy-Duty Commercial Carpet Tiles'],
    startingPrice: 'Starting from ₹1,450 / sq.ft',
    iconName: 'Building2',
    image: OFFICE_IMAGE
  },
  {
    id: 'ceilings-lighting',
    title: 'Architectural False Ceilings & Lighting',
    shortDesc: 'Gypsum designer ceilings, magnetic track systems, cove lighting, and balanced lux planning.',
    fullDesc: 'Elevate your vertical volume with sculpted gypsum ceilings, wood-paneled soffits, and cutting-edge magnetic track fixtures. We calculate the exact lux levels for every room to eliminate harsh shadows while maintaining an intimate, warm ambience.',
    features: [
      'Saint-Gobain certified moisture-resistant gypsum plasterboard',
      'Concealed indirect warm 2700K LED cove illumination',
      'Flexible magnetic track system with movable floodlights and spot heads',
      'Acoustic micro-perforated ceiling panels for home theaters'
    ],
    materials: ['Saint-Gobain Gypsum Board', 'Magnetic Low-Voltage Aluminum Track', 'CRI 95+ Warm LED Strips'],
    startingPrice: 'Starting from ₹95 / sq.ft',
    iconName: 'Sun',
    image: HERO_IMAGE
  }
];

export const STUDIO_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Dr. Praveen & Soumya Kulkarni',
    role: 'Homeowners, 4 BHK Villa',
    location: 'Shirur Park, Hubli',
    projectType: 'Turnkey Luxury Villa',
    quote: 'Touchstone Atelier transformed our villa beyond what 3D designs could convey. The 45-day handover was executed to the exact date, and the travertine and walnut color palette gives our living room an unbelievable sanctuary feel. No hidden surprises or budget escalations.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Suresh Patil',
    role: 'Managing Director, Horizon Infra',
    location: 'Vidyanagar, Hubli',
    projectType: 'Corporate Headquarters (3,200 sq.ft)',
    quote: 'Their attention to acoustic detailing and fluted glass partitions in our executive office is world-class. Visiting clients frequently praise the interior atmosphere. Their on-site supervision and weekly milestone reporting made the entire process completely stress-free.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Ananya & Vikram Hegde',
    role: 'IT Consultants, Bengaluru & Dharwad',
    location: 'Narayanpur, Dharwad',
    projectType: '3 BHK High-Rise Modular Kitchen & Interiors',
    quote: 'We were managing our home interior remotely while working. Touchstone provided regular digital progress reports and photo logs. The modular kitchen with quartz waterfall countertop and Blum hardware is simply flawless. Worth every single rupee.',
    rating: 5
  }
];

export const TRUST_STATS = [
  { label: 'Delivered Projects in North Karnataka', value: '340+', suffix: 'Homes & Offices' },
  { label: 'Turnkey Handover Timeline', value: '45', suffix: 'Days Guaranteed' },
  { label: 'Comprehensive Craftsmanship Warranty', value: '10', suffix: 'Years Coverage' },
  { label: 'Factory Direct Sourcing & German CNC', value: '0%', suffix: 'Middleman Markup' }
];

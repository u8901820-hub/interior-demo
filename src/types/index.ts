export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'kitchen' | 'bedroom' | 'commercial' | 'renovation';
  categoryLabel: string;
  location: string;
  carpetArea: string;
  duration: string;
  year: string;
  image: string;
  paletteName: string;
  paletteColors: string[];
  clientBrief: string;
  highlights: string[];
  keyMaterials: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  materials: string[];
  startingPrice: string;
  iconName: string;
  image: string;
}

export interface ColorPaletteItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  primaryHex: string;
  colors: {
    name: string;
    hex: string;
    finish: string;
    paintCode: string;
    role: string;
  }[];
  woodFinish: string;
  metalAccent: string;
  stoneMaterial: string;
  idealFor: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  quote: string;
  rating: number;
}

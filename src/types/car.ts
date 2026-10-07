export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  priceUSD: number;
  priceUZS: number;
  mileage: number; // km
  fuelType: 'Benzin' | 'Dizel' | 'Elektr' | 'Gibrid' | 'Metan / Propan';
  transmission: 'Avtomat' | 'Mexanika' | 'Variator' | 'Robot';
  engine: string; // masalan "3.0L Twin-Turbo" yoki "Electric 450 kW"
  horsepower: number;
  drive: "To'liq (AWD / 4WD)" | 'Orqa (RWD)' | 'Old (FWD)';
  color: string;
  bodyType: 'Sedan' | 'Krossover / SUV' | 'Kupe' | 'Xetchbek' | 'Pikap' | 'Kabriolet';
  condition: 'Yangi (0 km)' | 'Ideal' | "A'lo" | 'Yaxshi';
  location: string;
  images: string[];
  isFeatured?: boolean;
  isVIP?: boolean;
  description: string;
  features: string[];
  seller: {
    name: string;
    type: 'Avtosalon (Diler)' | 'Xususiy shaxs';
    phone: string;
    telegram: string;
    verified: boolean;
    rating: number;
    avatar: string;
  };
  createdAt: string;
}

export type PageType = 'home' | 'catalog' | 'car-details' | 'sell' | 'calculator' | 'favorites' | 'about';

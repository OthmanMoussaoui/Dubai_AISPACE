export interface Accommodation {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'premium';
  description: string;
  price: number;
  maxOccupancy: number;
  amenities: string[];
  imageUrl: string;
  compatiblePackages: string[]; // IDs of compatible packages
} 
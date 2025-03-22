export interface SpacePackage {
  id: string;
  name: string;
  destination: string;
  description: string;
  durationDays: number;
  price: number;
  features: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  availableAccommodations: string[]; // IDs of compatible accommodations
} 
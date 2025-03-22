import { Accommodation } from '@/types/accommodation';

export const spaceAccommodations: Accommodation[] = [
  {
    id: 'orbital-suite',
    name: 'Orbital Suite',
    type: 'premium',
    description: 'Luxurious private suite with panoramic Earth views, featuring a zero-gravity sleeping chamber and private observation deck.',
    price: 150000,
    maxOccupancy: 2,
    amenities: [
      'Panoramic Earth viewing windows',
      'Private zero-gravity sleeping chamber',
      'Personal hygiene module',
      'Entertainment system with Earth live feed',
      'Climate control',
      'Gourmet space food menu'
    ],
    imageUrl: '/images/accommodations/orbital-suite.jpg',
    compatiblePackages: ['lunar-odyssey', 'orbital-luxury']
  },
  {
    id: 'space-station-deluxe',
    name: 'Space Station Deluxe',
    type: 'deluxe',
    description: 'Comfortable cabin aboard our space station with shared lounge areas and excellent Earth views.',
    price: 100000,
    maxOccupancy: 4,
    amenities: [
      'Semi-private sleeping quarters',
      'Shared observation lounge',
      'Standard hygiene facilities',
      'Entertainment console',
      'Communication system with Earth',
      'Standard space cuisine'
    ],
    imageUrl: '/images/accommodations/space-station-deluxe.jpg',
    compatiblePackages: ['lunar-odyssey', 'orbital-luxury', 'venus-flyby']
  },
  {
    id: 'lunar-habitat',
    name: 'Lunar Habitat',
    type: 'standard',
    description: 'Practical and comfortable accommodation on the lunar surface with Earth-rise views and lunar excursion access.',
    price: 200000,
    maxOccupancy: 3,
    amenities: [
      'Lunar surface viewing ports',
      'Radiation shielding',
      'Lunar gravity adaptation chamber',
      'EVA suit storage',
      'Shared research equipment',
      'Emergency life support systems'
    ],
    imageUrl: '/images/accommodations/lunar-habitat.jpg',
    compatiblePackages: ['lunar-odyssey']
  },
  {
    id: 'mars-surface-habitat',
    name: 'Mars Surface Habitat',
    type: 'standard',
    description: 'Durable and comfortable living quarters on the Martian surface with research facilities and exploration equipment.',
    price: 350000,
    maxOccupancy: 4,
    amenities: [
      'Martian landscape viewing ports',
      'Dust filtration system',
      'Mars gravity adaptation chamber',
      'Research laboratory access',
      'Mars rover access',
      'Advanced life support systems',
      'Martian garden module'
    ],
    imageUrl: '/images/accommodations/mars-habitat.jpg',
    compatiblePackages: ['mars-expedition']
  },
  {
    id: 'asteroid-mining-quarters',
    name: 'Asteroid Mining Quarters',
    type: 'standard',
    description: 'Functional living space within an asteroid mining vessel, with direct access to mining operations and sample collection.',
    price: 250000,
    maxOccupancy: 2,
    amenities: [
      'Mining equipment access',
      'Sample analysis lab',
      'Resource processing observation',
      'Secure sleeping quarters',
      'Specialized space food',
      'Emergency escape pod'
    ],
    imageUrl: '/images/accommodations/asteroid-quarters.jpg',
    compatiblePackages: ['asteroid-mining']
  },
  {
    id: 'jupiter-explorer-suite',
    name: 'Jupiter Explorer Suite',
    type: 'deluxe',
    description: 'Luxurious accommodation aboard our Jupiter exploration vessel, featuring spectacular views of Jupiter and its moons.',
    price: 400000,
    maxOccupancy: 2,
    amenities: [
      'Jupiter viewing observatory',
      'Private quarters with enhanced radiation shielding',
      'Scientific equipment access',
      'Holographic display system',
      'Gourmet space cuisine',
      'Personal communication system',
      'Artificial gravity chamber'
    ],
    imageUrl: '/images/accommodations/jupiter-suite.jpg',
    compatiblePackages: ['jupiter-odyssey']
  },
  {
    id: 'orbital-standard',
    name: 'Orbital Standard Cabin',
    type: 'standard',
    description: 'Practical and efficient cabin for orbital stays with essential amenities and Earth viewing opportunities.',
    price: 75000,
    maxOccupancy: 2,
    amenities: [
      'Compact sleeping area',
      'Shared viewing port',
      'Basic hygiene facilities',
      'Standard space food',
      'Communication system'
    ],
    imageUrl: '/images/accommodations/orbital-standard.jpg',
    compatiblePackages: ['orbital-luxury', 'venus-flyby']
  }
]; 
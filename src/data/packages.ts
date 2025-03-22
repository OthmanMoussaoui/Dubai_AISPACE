import { SpacePackage } from '@/types/package';

export const spacePackages: SpacePackage[] = [
  {
    id: 'lunar-odyssey',
    name: 'Lunar Odyssey',
    destination: 'Moon',
    description: 'Experience the thrill of lunar exploration with our signature Moon journey. Walk on the lunar surface, witness breathtaking Earth-rise, and explore historic landing sites.',
    durationDays: 7,
    price: 450000,
    features: [
      'Lunar surface excursion',
      'Earth-rise viewing',
      'Historic Apollo landing sites tour',
      'Low-gravity recreational activities',
      'Lunar sample collection',
      'Space photography workshop'
    ],
    imageUrl: '/images/packages/lunar-odyssey.jpg',
    rating: 4.8,
    reviewCount: 124,
    difficulty: 'moderate',
    availableAccommodations: ['orbital-suite', 'space-station-deluxe', 'lunar-habitat']
  },
  {
    id: 'mars-expedition',
    name: 'Mars Expedition',
    destination: 'Mars',
    description: 'Journey to the Red Planet on this once-in-a-lifetime expedition. Explore Martian landscapes, conduct scientific research, and be among the first humans to set foot on Mars.',
    durationDays: 180,
    price: 1250000,
    features: [
      'Martian surface exploration',
      'Scientific research participation',
      'Olympus Mons expedition',
      'Valles Marineris canyon tour',
      'Mars rover operation',
      'Martian soil sampling'
    ],
    imageUrl: '/images/packages/mars-expedition.jpg',
    rating: 4.9,
    reviewCount: 42,
    difficulty: 'extreme',
    availableAccommodations: ['mars-surface-habitat']
  },
  {
    id: 'orbital-luxury',
    name: 'Orbital Luxury',
    destination: 'Earth Orbit',
    description: 'Indulge in the ultimate space luxury experience in Earth orbit. Enjoy panoramic views of our planet, zero-gravity spa treatments, and gourmet dining among the stars.',
    durationDays: 5,
    price: 250000,
    features: [
      'Panoramic Earth viewing',
      'Zero-gravity spa treatments',
      'Space gourmet dining experience',
      'Spacewalk experience',
      'Orbital photography session',
      'Space cocktail party'
    ],
    imageUrl: '/images/packages/orbital-luxury.jpg',
    rating: 4.7,
    reviewCount: 215,
    difficulty: 'easy',
    availableAccommodations: ['orbital-suite', 'space-station-deluxe', 'orbital-standard']
  },
  {
    id: 'venus-flyby',
    name: 'Venus Flyby Adventure',
    destination: 'Venus',
    description: 'Embark on an extraordinary journey to our nearest planetary neighbor. Witness the beauty of Venus up close, experience a gravitational slingshot, and conduct atmospheric research.',
    durationDays: 15,
    price: 650000,
    features: [
      'Close-up Venus observation',
      'Gravitational slingshot experience',
      'Venus atmosphere analysis',
      'Solar observation',
      'Interplanetary navigation training',
      'Space photography masterclass'
    ],
    imageUrl: '/images/packages/venus-flyby.jpg',
    rating: 4.6,
    reviewCount: 78,
    difficulty: 'moderate',
    availableAccommodations: ['space-station-deluxe', 'orbital-standard']
  },
  {
    id: 'asteroid-mining',
    name: 'Asteroid Mining Experience',
    destination: 'Asteroid Belt',
    description: 'Join our commercial asteroid mining operation for an adventure in resource extraction. Experience asteroid surface exploration, resource identification, and mining operations.',
    durationDays: 21,
    price: 850000,
    features: [
      'Asteroid surface exploration',
      'Resource extraction participation',
      'Precious metals identification',
      'Microgravity mining techniques',
      'Sample collection and analysis',
      'Commercial space operations training'
    ],
    imageUrl: '/images/packages/asteroid-mining.jpg',
    rating: 4.5,
    reviewCount: 56,
    difficulty: 'challenging',
    availableAccommodations: ['asteroid-mining-quarters']
  },
  {
    id: 'jupiter-odyssey',
    name: 'Jupiter Odyssey',
    destination: 'Jupiter',
    description: 'Venture to the largest planet in our solar system on this epic journey. Explore Jupiter\'s fascinating moons, witness the Great Red Spot, and study the gas giant\'s powerful storms.',
    durationDays: 120,
    price: 950000,
    features: [
      'Jupiter\'s moons exploration',
      'Great Red Spot observation',
      'Europa subsurface ocean study',
      'Ganymede magnetic field research',
      'Gas giant atmospheric analysis',
      'Outer planets astronomy workshop'
    ],
    imageUrl: '/images/packages/jupiter-odyssey.jpg',
    rating: 4.9,
    reviewCount: 34,
    difficulty: 'challenging',
    availableAccommodations: ['jupiter-explorer-suite']
  }
]; 
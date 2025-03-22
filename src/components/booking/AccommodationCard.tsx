import React from 'react';
import Image from 'next/image';
import { FiStar, FiUsers, FiCheck } from 'react-icons/fi';

// Define the SpaceAccommodation interface
interface SpaceAccommodation {
  id: string;
  name: string;
  type: 'pod' | 'suite' | 'luxury';
  description: string;
  priceMultiplier: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  images: {
    src: string;
    alt: string;
  }[];
  amenities: {
    id: string;
    name: string;
  }[];
}

interface AccommodationCardProps {
  accommodation: SpaceAccommodation;
  basePrice: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  basePrice,
  isSelected = false,
  onSelect,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = basePrice * accommodation.priceMultiplier;

  // Function to get type style
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'pod':
        return { text: 'Standard', class: 'bg-blue-900/50 text-blue-400' };
      case 'suite':
        return { text: 'Comfort', class: 'bg-purple-900/50 text-purple-400' };
      case 'luxury':
        return { text: 'Luxury', class: 'bg-space-accent/30 text-space-accent' };
      default:
        return { text: 'Standard', class: 'bg-space-light/20 text-space-light' };
    }
  };

  const typeStyle = getTypeStyle(accommodation.type);

  return (
    <div
      className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
        isSelected
          ? 'border-space-gold/80 ring-2 ring-space-gold/30 bg-space-dark/80'
          : 'border-space-light/20 bg-space-dark/50 hover:border-space-light/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left column with image */}
        <div className="md:w-1/4 relative">
          <div className="aspect-square w-full h-full bg-space-dark/50 overflow-hidden relative">
            {accommodation.images.length > 0 && (
              <Image
                src={accommodation.images[0].src}
                alt={accommodation.images[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-space-dark/90 to-transparent" />
          </div>
        </div>
        
        {/* Middle column with details */}
        <div className="p-5 md:w-2/4 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <h3 className="text-2xl font-display text-white">{accommodation.name}</h3>
              {accommodation.type === 'luxury' && (
                <FiStar className="ml-2 text-space-gold" />
              )}
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyle.class}`}>
                {typeStyle.text}
              </div>
              
              <div className="flex items-center space-x-1">
                <FiUsers className="text-space-light" />
                <span className="text-space-light text-sm">Capacity: {accommodation.capacity}</span>
              </div>
              
              <div className="flex items-center">
                <FiStar className="text-space-gold mr-1" />
                <span className="text-sm">{accommodation.rating.toFixed(1)}</span>
                <span className="text-xs text-space-light ml-1">({accommodation.reviewCount} reviews)</span>
              </div>
            </div>
            
            <p className="text-space-light text-sm line-clamp-3 mb-3">
              {accommodation.description}
            </p>
          </div>
          
          {/* Amenities */}
          <div className="mt-auto">
            <h4 className="font-display text-sm uppercase tracking-wider text-space-light mb-2">
              TOP AMENITIES
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {accommodation.amenities.slice(0, 4).map((amenity) => (
                <div key={amenity.id} className="flex items-center">
                  <FiCheck className="text-space-gold mr-2 flex-shrink-0" />
                  <span className="text-sm text-space-light truncate">{amenity.name}</span>
                </div>
              ))}
            </div>
            {accommodation.amenities.length > 4 && (
              <div className="text-xs text-space-light mt-1">
                +{accommodation.amenities.length - 4} more amenities
              </div>
            )}
          </div>
        </div>
        
        {/* Right column with pricing and select button */}
        <div className="p-5 md:w-1/4 flex flex-col border-t md:border-t-0 md:border-l border-space-light/10">
          <div className="mb-4">
            <div className="text-sm text-space-light">Price per person</div>
            <div className="text-2xl font-display text-space-gold">
              {formatPrice(totalPrice)}
            </div>
          </div>
          
          <div className="mt-auto">
            <button
              className={`w-full py-3 px-4 rounded-md transition-all flex items-center justify-center ${
                isSelected
                  ? 'bg-space-gold text-space-dark font-medium'
                  : 'bg-space-blue hover:bg-space-blue/90 text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect();
              }}
            >
              {isSelected ? (
                <>
                  <FiCheck className="mr-2" /> Selected
                </>
              ) : (
                'Select Accommodation'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
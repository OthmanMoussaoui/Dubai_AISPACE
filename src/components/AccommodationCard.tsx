import React from 'react';
import Image from 'next/image';
import { Accommodation } from '@/types/accommodation';
import { FiCheck, FiUsers, FiHome, FiStar } from 'react-icons/fi';

interface AccommodationCardProps {
  accommodation: Accommodation;
  isSelected?: boolean;
  isCompatible?: boolean;
  onSelect: () => void;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  isSelected = false,
  isCompatible = true,
  onSelect
}) => {
  // Format price to USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Get type style
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'standard':
        return 'bg-blue-500/20 text-blue-300';
      case 'deluxe':
        return 'bg-purple-500/20 text-purple-300';
      case 'premium':
        return 'bg-space-accent/20 text-space-accent';
      default:
        return 'bg-space-light/20 text-space-light';
    }
  };
  
  return (
    <div 
      className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
        !isCompatible 
          ? 'border-red-500/20 bg-space-dark/20 opacity-50' 
          : isSelected 
            ? 'border-space-accent bg-space-dark/50 shadow-lg shadow-space-accent/20' 
            : 'border-space-light/20 bg-space-dark/30 hover:bg-space-dark/40 hover:shadow-lg hover:shadow-space-light/10'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-space-accent text-black font-medium py-1 px-3 rounded-bl-lg z-10 flex items-center">
          <FiCheck className="mr-1" /> Selected
        </div>
      )}
      
      {!isCompatible && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="bg-red-900/80 text-white px-4 py-2 rounded-md text-center">
            Not compatible with selected package
          </div>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row">
        {/* Accommodation image */}
        <div className="md:w-1/3 relative">
          <div className="aspect-video md:aspect-square w-full bg-space-dark/50 overflow-hidden relative">
            <Image 
              src={accommodation.imageUrl || '/images/space-hotel.png'} 
              alt={accommodation.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
          </div>
          <div className="absolute top-0 left-0 p-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(accommodation.type)}`}>
              {accommodation.type.charAt(0).toUpperCase() + accommodation.type.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Accommodation details */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="font-display text-xl mb-1 flex items-center">
              {accommodation.name}
              {accommodation.type === 'premium' && (
                <FiStar className="ml-2 text-space-gold animate-pulse-slow" />
              )}
            </h3>
            <div className="flex items-center text-sm mb-2">
              <span className="flex items-center text-space-light">
                <FiUsers className="mr-1" />
                Max {accommodation.maxOccupancy} {accommodation.maxOccupancy === 1 ? 'person' : 'people'}
              </span>
            </div>
            <p className="text-space-light text-sm">{accommodation.description}</p>
          </div>
          
          {/* Amenities */}
          <div className="mb-4 flex-grow">
            <h4 className="font-display text-sm uppercase tracking-wider mb-2 text-space-light">
              Amenities
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {accommodation.amenities.slice(0, 6).map((amenity, index) => (
                <li key={index} className="text-sm flex items-start group">
                  <FiCheck className="text-space-accent mt-1 mr-1 flex-shrink-0 group-hover:text-space-gold transition-colors duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price and select button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto pt-4 border-t border-space-light/10">
            <div className="mb-3 sm:mb-0">
              <div className="text-sm text-space-light">Price per person</div>
              <div className="text-xl font-display text-space-accent">
                {formatPrice(accommodation.price)}
              </div>
            </div>
            
            <button
              className={`btn-primary flex items-center justify-center ${
                isSelected ? 'bg-space-accent text-black' : ''
              }`}
              onClick={onSelect}
              disabled={!isCompatible}
            >
              {isSelected ? 'Selected' : 'Select Accommodation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
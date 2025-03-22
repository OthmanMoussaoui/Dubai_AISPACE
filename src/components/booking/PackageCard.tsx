import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiClock, FiUsers, FiArrowRight, FiCheck } from 'react-icons/fi';

// Define the SpacePackage interface
interface SpacePackage {
  id: string;
  name: string;
  shortDescription: string;
  basePrice: number;
  durationDays: number;
  maxCapacity: number;
  rating: number;
  reviewCount: number;
  images: {
    src: string;
    alt: string;
  }[];
}

interface PackageCardProps {
  package: SpacePackage;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
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

  // Function to get difficulty class
  const getDifficultyClass = (days: number) => {
    if (days <= 5) return { text: "Easy", class: "bg-green-900/50 text-green-400" };
    if (days <= 10) return { text: "Moderate", class: "bg-yellow-900/50 text-yellow-400" };
    if (days <= 30) return { text: "Challenging", class: "bg-orange-900/50 text-orange-400" };
    return { text: "Extreme", class: "bg-red-900/50 text-red-400" };
  };

  const difficulty = getDifficultyClass(pkg.durationDays);

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
            {pkg.images.length > 0 && (
              <Image
                src={pkg.images[0].src}
                alt={pkg.images[0].alt}
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
            <h3 className="text-2xl font-display text-white mb-2">{pkg.name}</h3>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${difficulty.class}`}>
                {difficulty.text}
              </div>
              
              <div className="flex items-center space-x-1">
                <FiClock className="text-space-light" />
                <span className="text-space-light text-sm">{pkg.durationDays} days</span>
              </div>
              
              <div className="flex items-center">
                <FiStar className="text-space-gold mr-1" />
                <span className="text-sm">{pkg.rating.toFixed(1)}</span>
                <span className="text-xs text-space-light ml-1">({pkg.reviewCount} reviews)</span>
              </div>
            </div>
            
            <p className="text-space-light text-sm line-clamp-3 mb-3">
              {pkg.shortDescription}
            </p>
          </div>
          
          {/* Key features */}
          <div className="mt-auto">
            <h4 className="font-display text-sm uppercase tracking-wider text-space-light mb-2">
              KEY FEATURES
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <FiCheck className="text-space-gold mr-2 flex-shrink-0" />
                <span className="text-sm text-space-light">Lunar surface excursion</span>
              </div>
              <div className="flex items-center">
                <FiCheck className="text-space-gold mr-2 flex-shrink-0" />
                <span className="text-sm text-space-light">Earth-rise viewing</span>
              </div>
              <div className="flex items-center">
                <FiCheck className="text-space-gold mr-2 flex-shrink-0" />
                <span className="text-sm text-space-light">Historic Apollo landing sites</span>
              </div>
              <div className="flex items-center">
                <FiCheck className="text-space-gold mr-2 flex-shrink-0" />
                <span className="text-sm text-space-light">Low-gravity recreation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column with pricing and select button */}
        <div className="p-5 md:w-1/4 flex flex-col border-t md:border-t-0 md:border-l border-space-light/10">
          <div className="mb-4">
            <div className="text-sm text-space-light">Starting from</div>
            <div className="text-2xl font-display text-space-gold">
              {formatPrice(pkg.basePrice)}
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <FiUsers className="text-space-light mr-2" />
            <span className="text-sm text-space-light">Max capacity: {pkg.maxCapacity}</span>
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
                <>
                  Select Package <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
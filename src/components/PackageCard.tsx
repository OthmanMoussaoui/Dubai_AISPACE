import React from 'react';
import Image from 'next/image';
import { SpacePackage } from '@/types/package';
import { FiClock, FiStar, FiUsers, FiCheck, FiArrowRight } from 'react-icons/fi';

interface PackageCardProps {
  package: SpacePackage;
  isSelected?: boolean;
  onSelect: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  isSelected = false,
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
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'moderate':
        return 'text-yellow-400';
      case 'challenging':
        return 'text-orange-400';
      case 'extreme':
        return 'text-red-400';
      default:
        return 'text-space-light';
    }
  };
  
  return (
    <div 
      className={`relative border rounded-lg overflow-hidden transition-all duration-300 group ${
        isSelected 
          ? 'border-space-accent bg-space-dark/50 shadow-lg shadow-space-accent/20' 
          : 'border-space-light/20 bg-space-dark/30 hover:bg-space-dark/40 hover:shadow-lg hover:shadow-space-light/10'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-space-accent text-black font-medium py-1 px-3 rounded-bl-lg z-10 flex items-center">
          <FiCheck className="mr-1" /> Selected
        </div>
      )}
      
      <div className="flex flex-col md:flex-row">
        {/* Package image */}
        <div className="md:w-1/3 relative">
          <div className="aspect-video md:aspect-square w-full bg-space-dark/50 overflow-hidden relative">
            <Image 
              src={pkg.imageUrl || '/images/mars-flyby.jpg'} 
              alt={pkg.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark/90 via-space-dark/40 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
            <div className="flex items-center text-sm">
              <div className="flex items-center mr-3">
                <FiStar className="text-space-gold mr-1" />
                <span>{pkg.rating}</span>
              </div>
              <div className="text-space-light">
                ({pkg.reviewCount} reviews)
              </div>
            </div>
          </div>
        </div>
        
        {/* Package details */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="font-display text-xl mb-1 group-hover:text-space-gold transition-colors duration-300">{pkg.name}</h3>
            <div className="flex flex-wrap items-center text-sm mb-2">
              <span className="mr-3 bg-space-blue/30 px-2 py-0.5 rounded-md">{pkg.destination}</span>
              <span className="flex items-center mr-3">
                <FiClock className="mr-1 text-space-light" />
                {pkg.durationDays} days
              </span>
              <span className={`px-2 py-0.5 rounded-md ${
                pkg.difficulty === 'easy' ? 'bg-green-500/20' :
                pkg.difficulty === 'moderate' ? 'bg-yellow-500/20' :
                pkg.difficulty === 'challenging' ? 'bg-orange-500/20' :
                'bg-red-500/20'
              } ${getDifficultyColor(pkg.difficulty)}`}>
                {pkg.difficulty.charAt(0).toUpperCase() + pkg.difficulty.slice(1)}
              </span>
            </div>
            <p className="text-space-light text-sm">{pkg.description}</p>
          </div>
          
          {/* Features */}
          <div className="mb-4 flex-grow">
            <h4 className="font-display text-sm uppercase tracking-wider mb-2 text-space-light">
              Key Features
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {pkg.features.slice(0, 6).map((feature, index) => (
                <li key={index} className="text-sm flex items-start group/item">
                  <FiCheck className="text-space-accent mt-1 mr-1 flex-shrink-0 group-hover/item:text-space-gold transition-colors duration-300" />
                  <span className="group-hover/item:text-white transition-colors duration-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price and select button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto pt-4 border-t border-space-light/10">
            <div className="mb-3 sm:mb-0">
              <div className="text-sm text-space-light">Starting from</div>
              <div className="text-xl font-display text-space-accent">
                {formatPrice(pkg.price)}
              </div>
            </div>
            
            <button
              className={`btn-primary flex items-center justify-center ${
                isSelected ? 'bg-space-accent text-black' : ''
              }`}
              onClick={onSelect}
            >
              {isSelected ? (
                <>View Details</>
              ) : (
                <>Select Package <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
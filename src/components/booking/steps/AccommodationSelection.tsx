import React, { useState, useMemo } from 'react';
import { useBooking } from '@/context/BookingContext';
import { spaceAccommodations } from '@/data/accommodations';
import { AccommodationCard } from '@/components/booking/AccommodationCard';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

interface AccommodationSelectionProps {
  onNext: () => void;
  onBack: () => void;
}

export const AccommodationSelection: React.FC<AccommodationSelectionProps> = ({ 
  onNext, 
  onBack 
}) => {
  const { selectedPackage, selectedAccommodation, selectAccommodation } = useBooking();
  const [error, setError] = useState<string | null>(null);

  // Filter accommodations compatible with the selected package
  const compatibleAccommodations = useMemo(() => {
    if (!selectedPackage) return [];
    
    return spaceAccommodations.filter(accommodation => 
      accommodation.compatiblePackages.includes(selectedPackage.id)
    );
  }, [selectedPackage]);

  const handleAccommodationSelect = (accommodationId: string) => {
    const selected = spaceAccommodations.find(a => a.id === accommodationId);
    if (selected) {
      selectAccommodation(selected);
      setError(null);
    }
  };

  const handleContinue = () => {
    if (!selectedAccommodation) {
      setError('Please select an accommodation to continue');
      return;
    }
    onNext();
  };

  if (!selectedPackage) {
    return (
      <div className="text-center py-12">
        <p className="text-space-light mb-4">Please select a package first.</p>
        <button 
          onClick={onBack}
          className="bg-space-accent/20 hover:bg-space-accent/30 text-space-accent py-2 px-4 rounded-md transition-colors"
        >
          Go Back to Package Selection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display text-space-accent mb-2">Select Your Accommodation</h2>
        <p className="text-space-light/80 max-w-2xl mx-auto">
          Choose from our selection of space accommodations compatible with your {selectedPackage.name} package.
          Each option offers unique amenities and experiences.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {compatibleAccommodations.length === 0 ? (
        <div className="text-center py-8 bg-space-dark/30 rounded-lg">
          <p className="text-space-light mb-4">
            No compatible accommodations found for this package.
          </p>
          <button
            onClick={onBack}
            className="bg-space-accent/20 hover:bg-space-accent/30 text-space-accent py-2 px-4 rounded-md transition-colors"
          >
            Go Back to Package Selection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {compatibleAccommodations.map(accommodation => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={{
                id: accommodation.id,
                name: accommodation.name,
                type: accommodation.type === 'premium' ? 'luxury' : accommodation.type === 'deluxe' ? 'suite' : 'pod',
                description: accommodation.description,
                priceMultiplier: accommodation.price / (selectedPackage?.price || 10000),
                capacity: accommodation.maxOccupancy,
                rating: 4.8,
                reviewCount: 32,
                images: [{
                  src: accommodation.imageUrl, 
                  alt: accommodation.name 
                }],
                amenities: accommodation.amenities.map((amenity, index) => ({
                  id: `amenity-${index}`,
                  name: amenity
                }))
              }}
              basePrice={selectedPackage ? selectedPackage.price : 0}
              isSelected={selectedAccommodation?.id === accommodation.id}
              onSelect={() => handleAccommodationSelect(accommodation.id)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-space-dark hover:bg-space-dark/80 text-space-light py-3 px-6 rounded-md transition-colors border border-space-light/20"
        >
          <FiArrowLeft />
          Back to Packages
        </button>
        
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 bg-space-accent hover:bg-space-accent/90 text-black font-medium py-3 px-6 rounded-md transition-colors"
          disabled={!selectedAccommodation}
        >
          Continue to Date Selection
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}; 
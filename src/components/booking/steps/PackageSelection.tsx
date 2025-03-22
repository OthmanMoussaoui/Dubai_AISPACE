import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { spacePackages } from '@/data/packages';
import { PackageCard } from '@/components/booking/PackageCard';
import { FiArrowRight } from 'react-icons/fi';

interface PackageSelectionProps {
  onNext: () => void;
}

export const PackageSelection: React.FC<PackageSelectionProps> = ({ onNext }) => {
  const { selectedPackage, setSelectedPackage } = useBooking();
  const [error, setError] = useState<string | null>(null);

  const handlePackageSelect = (packageId: string) => {
    const selected = spacePackages.find(p => p.id === packageId);
    if (selected) {
      setSelectedPackage(selected);
      setError(null);
    }
  };

  const handleContinue = () => {
    if (!selectedPackage) {
      setError('Please select a package to continue');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display text-space-accent mb-2">Select Your Space Package</h2>
        <p className="text-space-light/80 max-w-2xl mx-auto">
          Choose from our curated selection of extraordinary space travel experiences. 
          Each package offers unique destinations and adventures beyond Earth.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {spacePackages.map(pkg => (
          <PackageCard
            key={pkg.id}
            package={{
              id: pkg.id,
              name: pkg.name,
              shortDescription: pkg.description,
              basePrice: pkg.price,
              durationDays: pkg.durationDays,
              maxCapacity: 6,
              rating: pkg.rating,
              reviewCount: pkg.reviewCount,
              images: [{ 
                src: pkg.imageUrl,
                alt: pkg.name
              }]
            }}
            isSelected={selectedPackage?.id === pkg.id}
            onSelect={() => handlePackageSelect(pkg.id)}
          />
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 bg-space-accent hover:bg-space-accent/90 text-black font-medium py-3 px-6 rounded-md transition-colors"
        >
          Continue to Accommodation
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}; 
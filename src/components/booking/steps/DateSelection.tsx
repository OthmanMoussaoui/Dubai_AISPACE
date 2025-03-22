import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import { DatePicker } from '@/components/DatePicker';
import { FiArrowRight, FiArrowLeft, FiCalendar } from 'react-icons/fi';

interface DateSelectionProps {
  onNext: () => void;
  onBack: () => void;
}

export const DateSelection: React.FC<DateSelectionProps> = ({ onNext, onBack }) => {
  const { selectedPackage, selectedDate, selectDate } = useBooking();
  const [error, setError] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Generate available dates (in a real app, these would come from an API)
  useEffect(() => {
    if (!selectedPackage) return;

    // For demo purposes, generate dates for the next 12 months
    // In a real app, these would be fetched from an API based on package availability
    const dates: Date[] = [];
    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 12);

    // Add dates every 14 days (simulating launch windows)
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + 14); // First available date is 14 days from now

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 14);
    }

    setAvailableDates(dates);
  }, [selectedPackage]);

  const handleDateSelect = (date: Date) => {
    selectDate(date);
    setError(null);
  };

  const handleContinue = () => {
    if (!selectedDate) {
      setError('Please select a launch date to continue');
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
        <h2 className="text-3xl font-display text-space-accent mb-2">Select Your Launch Date</h2>
        <p className="text-space-light/80 max-w-2xl mx-auto">
          Choose from available launch dates for your {selectedPackage.name} journey.
          Launch windows are determined by orbital mechanics and mission requirements.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-space-dark/30 p-6 rounded-lg">
        <div className="flex items-center gap-2 text-space-accent mb-4">
          <FiCalendar />
          <h3 className="font-display text-xl">Launch Calendar</h3>
        </div>
        
        {availableDates.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-space-light">Loading available dates...</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <DatePicker 
              availableDates={availableDates}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
            
            {selectedDate && (
              <div className="mt-6 p-4 bg-space-accent/10 rounded-lg border border-space-accent/30">
                <h4 className="font-display text-space-accent mb-2">Selected Launch Date</h4>
                <p className="text-space-light">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-space-light/70 text-sm mt-2">
                  Your {selectedPackage.durationDays}-day journey will conclude on{' '}
                  {new Date(selectedDate.getTime() + selectedPackage.durationDays * 24 * 60 * 60 * 1000)
                    .toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-space-dark hover:bg-space-dark/80 text-space-light py-3 px-6 rounded-md transition-colors border border-space-light/20"
        >
          <FiArrowLeft />
          Back to Accommodations
        </button>
        
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 bg-space-accent hover:bg-space-accent/90 text-black font-medium py-3 px-6 rounded-md transition-colors"
          disabled={!selectedDate}
        >
          Continue to Passenger Details
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}; 
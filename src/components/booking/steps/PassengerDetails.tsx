import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { PassengerForm } from '@/components/PassengerForm';
import { FiArrowRight, FiArrowLeft, FiUserPlus, FiUserMinus } from 'react-icons/fi';

interface PassengerDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  dietaryRequirements: string;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  spaceflightConsent: boolean;
}

export const PassengerDetails: React.FC<PassengerDetailsProps> = ({ onNext, onBack }) => {
  const { 
    selectedPackage, 
    selectedAccommodation, 
    passengers, 
    addPassenger, 
    updatePassenger, 
    removePassenger 
  } = useBooking();
  
  const [error, setError] = useState<string | null>(null);
  
  const maxPassengers = selectedAccommodation ? selectedAccommodation.maxOccupancy : 1;
  
  const handleAddPassenger = () => {
    if (passengers.length >= maxPassengers) {
      setError(`Maximum ${maxPassengers} passengers allowed for this accommodation`);
      return;
    }
    
    addPassenger({
      id: `passenger-${Date.now()}`,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      specialRequirements: '',
      spaceflightConsent: false
    });
    
    setError(null);
  };
  
  const handleRemovePassenger = (index: number) => {
    removePassenger(index);
    setError(null);
  };
  
  const handleContinue = () => {
    // Validate all passengers have required fields
    if (passengers.length === 0) {
      setError('Please add at least one passenger');
      return;
    }
    
    const invalidPassenger = passengers.find(
      p => !p.firstName || !p.lastName || !p.email || !p.dateOfBirth || 
           !p.passportNumber || !p.passportExpiry || !p.spaceflightConsent
    );
    
    if (invalidPassenger) {
      setError('Please complete all required fields for all passengers');
      return;
    }
    
    onNext();
  };
  
  if (!selectedPackage || !selectedAccommodation) {
    return (
      <div className="text-center py-12">
        <p className="text-space-light mb-4">Please select a package and accommodation first.</p>
        <button 
          onClick={onBack}
          className="bg-space-accent/20 hover:bg-space-accent/30 text-space-accent py-2 px-4 rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display text-space-accent mb-2">Passenger Details</h2>
        <p className="text-space-light/80 max-w-2xl mx-auto">
          Enter information for all travelers. All passengers must provide valid identification
          and consent to spaceflight requirements.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="bg-space-dark/30 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-xl text-space-accent">
            Passenger Information
          </h3>
          
          <div className="flex items-center gap-2">
            <span className="text-space-light text-sm">
              {passengers.length} of {maxPassengers} passengers
            </span>
            
            <button
              onClick={handleAddPassenger}
              disabled={passengers.length >= maxPassengers}
              className={`p-2 rounded-full ${
                passengers.length >= maxPassengers
                  ? 'bg-space-dark/50 text-space-light/50 cursor-not-allowed'
                  : 'bg-space-accent/20 text-space-accent hover:bg-space-accent/30'
              }`}
              title="Add passenger"
            >
              <FiUserPlus size={18} />
            </button>
          </div>
        </div>
        
        {passengers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-space-light mb-4">No passengers added yet.</p>
            <button
              onClick={handleAddPassenger}
              className="bg-space-accent/20 hover:bg-space-accent/30 text-space-accent py-2 px-4 rounded-md transition-colors"
            >
              Add Passenger
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="border border-space-light/20 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-display text-lg text-space-light">
                    Passenger {index + 1}
                    {index === 0 && <span className="ml-2 text-sm text-space-accent">(Primary)</span>}
                  </h4>
                  
                  {passengers.length > 1 && (
                    <button
                      onClick={() => handleRemovePassenger(index)}
                      className="p-2 rounded-full bg-red-900/20 text-red-400 hover:bg-red-900/30"
                      title="Remove passenger"
                    >
                      <FiUserMinus size={18} />
                    </button>
                  )}
                </div>
                
                <PassengerForm
                  passenger={passenger}
                  onChange={(updatedPassenger) => updatePassenger(index, updatedPassenger)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-space-dark hover:bg-space-dark/80 text-space-light py-3 px-6 rounded-md transition-colors border border-space-light/20"
        >
          <FiArrowLeft />
          Back to Date Selection
        </button>
        
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 bg-space-accent hover:bg-space-accent/90 text-black font-medium py-3 px-6 rounded-md transition-colors"
          disabled={passengers.length === 0}
        >
          Continue to Summary
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}; 
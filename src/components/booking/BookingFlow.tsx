import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { FiPackage, FiHome, FiCalendar, FiUsers, FiCreditCard, FiCheck } from 'react-icons/fi';

// Step components
import { PackageSelection } from './steps/PackageSelection';
import { AccommodationSelection } from './steps/AccommodationSelection';
import { DateSelection } from './steps/DateSelection';
import { PassengerDetails } from './steps/PassengerDetails';
import { BookingSummary } from './steps/BookingSummary';
import { BookingConfirmation } from './steps/BookingConfirmation';

// Define booking steps
type BookingStep = 
  | 'package-selection'
  | 'accommodation-selection'
  | 'date-selection'
  | 'passenger-details'
  | 'booking-summary'
  | 'booking-confirmation';

// Step information
interface StepInfo {
  id: BookingStep;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const BookingFlow: React.FC = () => {
  const { resetBooking, selectedPackage, selectedAccommodation, selectedDate, passengers, bookingId } = useBooking();
  const [currentStep, setCurrentStep] = useState<BookingStep>('package-selection');
  
  // Define steps
  const steps: StepInfo[] = [
    {
      id: 'package-selection',
      title: 'Select Package',
      description: 'Choose your space travel package',
      icon: <FiPackage />
    },
    {
      id: 'accommodation-selection',
      title: 'Select Accommodation',
      description: 'Choose your space accommodation',
      icon: <FiHome />
    },
    {
      id: 'date-selection',
      title: 'Select Date',
      description: 'Choose your launch date',
      icon: <FiCalendar />
    },
    {
      id: 'passenger-details',
      title: 'Passenger Details',
      description: 'Enter traveler information',
      icon: <FiUsers />
    },
    {
      id: 'booking-summary',
      title: 'Summary',
      description: 'Review and payment',
      icon: <FiCreditCard />
    },
    {
      id: 'booking-confirmation',
      title: 'Confirmation',
      description: 'Booking confirmed',
      icon: <FiCheck />
    }
  ];
  
  // Navigation functions
  const goToNextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };
  
  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };
  
  const goToStep = (step: BookingStep) => {
    // Only allow going to steps that are completed or the next available step
    if (isStepAccessible(step)) {
      setCurrentStep(step);
      window.scrollTo(0, 0);
    }
  };
  
  // Check if a step is completed
  const isStepCompleted = (step: BookingStep): boolean => {
    switch (step) {
      case 'package-selection':
        return !!selectedPackage;
      case 'accommodation-selection':
        return !!selectedAccommodation;
      case 'date-selection':
        return !!selectedDate;
      case 'passenger-details':
        return passengers.length > 0 && passengers.every(p => 
          p.firstName && 
          p.lastName && 
          p.email && 
          p.dateOfBirth && 
          p.passportNumber && 
          p.spaceflightConsent
        );
      case 'booking-summary':
        return !!bookingId;
      default:
        return false;
    }
  };
  
  // Check if a step is accessible
  const isStepAccessible = (step: BookingStep): boolean => {
    const stepIndex = steps.findIndex(s => s.id === step);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    // Can always go back to previous steps
    if (stepIndex <= currentIndex) return true;
    
    // Can only go forward if all previous steps are completed
    for (let i = 0; i < stepIndex; i++) {
      if (!isStepCompleted(steps[i].id)) return false;
    }
    
    return true;
  };
  
  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'package-selection':
        return <PackageSelection onNext={goToNextStep} />;
      case 'accommodation-selection':
        return <AccommodationSelection onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'date-selection':
        return <DateSelection onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'passenger-details':
        return <PassengerDetails onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'booking-summary':
        return <BookingSummary onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'booking-confirmation':
        return <BookingConfirmation onReset={() => {
          resetBooking();
          setCurrentStep('package-selection');
        }} />;
      default:
        return <div>Unknown step</div>;
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress steps */}
      <div className="mb-10 overflow-x-auto">
        <div className="flex min-w-max">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = isStepCompleted(step.id);
            const isClickable = isStepAccessible(step.id);
            
            return (
              <div 
                key={step.id} 
                className={`flex-1 relative ${index > 0 ? 'ml-4' : ''}`}
              >
                {/* Connector line */}
                {index > 0 && (
                  <div 
                    className={`absolute top-5 left-0 h-0.5 w-full -translate-x-full ${
                      isCompleted || isActive ? 'bg-space-accent' : 'bg-space-light/30'
                    }`}
                  />
                )}
                
                <button
                  className={`w-full flex flex-col items-center ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                  onClick={() => isClickable && goToStep(step.id)}
                  disabled={!isClickable}
                >
                  {/* Step circle */}
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      isActive 
                        ? 'bg-space-accent text-black' 
                        : isCompleted 
                          ? 'bg-space-accent/20 text-space-accent' 
                          : 'bg-space-dark/50 text-space-light'
                    }`}
                  >
                    {isCompleted ? <FiCheck /> : step.icon}
                  </div>
                  
                  {/* Step title */}
                  <div className={`font-display text-sm ${isActive ? 'text-space-accent' : 'text-space-light'}`}>
                    {step.title}
                  </div>
                  
                  {/* Step description */}
                  <div className="text-xs text-space-light/70 hidden md:block">
                    {step.description}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Current step content */}
      <div>
        {renderStepContent()}
      </div>
    </div>
  );
}; 
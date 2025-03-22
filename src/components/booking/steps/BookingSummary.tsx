import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { FiArrowRight, FiArrowLeft, FiCalendar, FiHome, FiPackage, FiUsers, FiCreditCard, FiCheck } from 'react-icons/fi';
import Image from 'next/image';

interface BookingSummaryProps {
  onNext: () => void;
  onBack: () => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({ onNext, onBack }) => {
  const { 
    selectedPackage, 
    selectedAccommodation, 
    selectedDate, 
    passengers,
    createBooking
  } = useBooking();
  
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate total price
  const calculateTotal = () => {
    if (!selectedPackage || !selectedAccommodation) return 0;
    
    const packagePrice = selectedPackage.price;
    const accommodationPrice = selectedAccommodation.price;
    const passengerCount = passengers.length;
    
    return (packagePrice + accommodationPrice) * passengerCount;
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
    setError(null);
  };
  
  const handleSubmit = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call to process payment
      // For demo purposes, we'll simulate a delay and success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create booking record
      createBooking({
        id: `SPACE-${Date.now().toString().slice(-6)}`,
        packageId: selectedPackage!.id,
        accommodationId: selectedAccommodation!.id,
        departureDate: selectedDate!,
        passengers: passengers,
        totalPrice: calculateTotal(),
        paymentMethod: paymentMethod,
        status: 'confirmed',
        bookingDate: new Date()
      });
      
      onNext();
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!selectedPackage || !selectedAccommodation || !selectedDate || passengers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-space-light mb-4">Please complete all previous steps first.</p>
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
        <h2 className="text-3xl font-display text-space-accent mb-2">Booking Summary</h2>
        <p className="text-space-light/80 max-w-2xl mx-auto">
          Review your booking details and complete payment to secure your space journey.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Booking details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Package details */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <div className="flex items-center gap-2 text-space-accent mb-4">
              <FiPackage />
              <h3 className="font-display text-xl">Package Details</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                {selectedPackage.imageUrl && (
                  <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <Image 
                      src={selectedPackage.imageUrl} 
                      alt={selectedPackage.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:w-2/3">
                <h4 className="font-display text-lg text-white mb-1">{selectedPackage.name}</h4>
                <p className="text-space-light text-sm mb-2">Destination: {selectedPackage.destination}</p>
                <p className="text-space-light text-sm mb-2">Duration: {selectedPackage.durationDays} days</p>
                <p className="text-space-light text-sm">Price: {formatPrice(selectedPackage.price)} per person</p>
              </div>
            </div>
          </div>
          
          {/* Accommodation details */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <div className="flex items-center gap-2 text-space-accent mb-4">
              <FiHome />
              <h3 className="font-display text-xl">Accommodation</h3>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                {selectedAccommodation.imageUrl && (
                  <div className="relative w-full h-32 rounded-md overflow-hidden">
                    <Image 
                      src={selectedAccommodation.imageUrl} 
                      alt={selectedAccommodation.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:w-2/3">
                <h4 className="font-display text-lg text-white mb-1">{selectedAccommodation.name}</h4>
                <p className="text-space-light text-sm mb-2">Type: {selectedAccommodation.type}</p>
                <p className="text-space-light text-sm mb-2">Max Occupancy: {selectedAccommodation.maxOccupancy} people</p>
                <p className="text-space-light text-sm">Price: {formatPrice(selectedAccommodation.price)} per booking</p>
              </div>
            </div>
          </div>
          
          {/* Date details */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <div className="flex items-center gap-2 text-space-accent mb-4">
              <FiCalendar />
              <h3 className="font-display text-xl">Travel Dates</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-space-light text-sm mb-1">Launch Date:</h4>
                <p className="text-white">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div>
                <h4 className="text-space-light text-sm mb-1">Return Date:</h4>
                <p className="text-white">
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
            </div>
          </div>
          
          {/* Passenger details */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <div className="flex items-center gap-2 text-space-accent mb-4">
              <FiUsers />
              <h3 className="font-display text-xl">Passengers</h3>
            </div>
            
            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <div key={passenger.id} className="border-b border-space-light/10 last:border-b-0 pb-4 last:pb-0">
                  <h4 className="font-display text-lg text-white mb-1">
                    {passenger.firstName} {passenger.lastName}
                    {index === 0 && <span className="ml-2 text-sm text-space-accent">(Primary)</span>}
                  </h4>
                  <p className="text-space-light text-sm">Email: {passenger.email}</p>
                  <p className="text-space-light text-sm">Passport: {passenger.passportNumber}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Payment */}
        <div className="space-y-6">
          {/* Price summary */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <h3 className="font-display text-xl text-space-accent mb-4">Price Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-space-light">Package ({passengers.length} {passengers.length === 1 ? 'person' : 'people'})</span>
                <span className="text-white">{formatPrice(selectedPackage.price * passengers.length)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-space-light">Accommodation</span>
                <span className="text-white">{formatPrice(selectedAccommodation.price)}</span>
              </div>
              
              <div className="border-t border-space-light/20 pt-3 mt-3">
                <div className="flex justify-between font-display text-lg">
                  <span className="text-space-light">Total</span>
                  <span className="text-space-accent">{formatPrice(calculateTotal())}</span>
                </div>
                <p className="text-space-light/70 text-xs mt-1">All taxes and fees included</p>
              </div>
            </div>
          </div>
          
          {/* Payment method */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <h3 className="font-display text-xl text-space-accent mb-4">
              <FiCreditCard className="inline-block mr-2" />
              Payment Method
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 rounded-md border border-space-light/20 cursor-pointer hover:bg-space-dark/50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-4 w-4 text-space-accent"
                />
                <span className="text-white">Credit Card</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 rounded-md border border-space-light/20 cursor-pointer hover:bg-space-dark/50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="crypto"
                  checked={paymentMethod === 'crypto'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-4 w-4 text-space-accent"
                />
                <span className="text-white">Cryptocurrency</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 rounded-md border border-space-light/20 cursor-pointer hover:bg-space-dark/50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wire-transfer"
                  checked={paymentMethod === 'wire-transfer'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio h-4 w-4 text-space-accent"
                />
                <span className="text-white">Wire Transfer</span>
              </label>
            </div>
            
            <p className="text-space-light/70 text-xs mt-4">
              For demo purposes, no actual payment will be processed.
              In a real application, secure payment processing would be implemented.
            </p>
          </div>
          
          {/* Terms and conditions */}
          <div className="bg-space-dark/30 p-6 rounded-lg">
            <h3 className="font-display text-lg text-space-accent mb-2">Terms & Conditions</h3>
            <p className="text-space-light/70 text-sm mb-4">
              By completing this booking, you agree to our terms and conditions for space travel,
              including all safety protocols and liability waivers.
            </p>
            <div className="flex items-center">
              <FiCheck className="text-space-accent mr-2" />
              <span className="text-space-light text-sm">Cancellation policy: 50% refund up to 90 days before launch</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-space-dark hover:bg-space-dark/80 text-space-light py-3 px-6 rounded-md transition-colors border border-space-light/20"
          disabled={isProcessing}
        >
          <FiArrowLeft />
          Back to Passenger Details
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isProcessing || !paymentMethod}
          className={`flex items-center gap-2 py-3 px-6 rounded-md font-medium transition-colors ${
            isProcessing 
              ? 'bg-space-accent/50 text-black/50 cursor-not-allowed' 
              : 'bg-space-accent hover:bg-space-accent/90 text-black'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Complete Booking'}
          {!isProcessing && <FiArrowRight />}
        </button>
      </div>
    </div>
  );
}; 
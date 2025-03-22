import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { CountdownTimer } from '@/components/CountdownTimer';
import { FiCheck, FiDownload, FiMail, FiHome, FiUser, FiClock, FiCalendar, FiMapPin, FiBriefcase, FiUsers, FiDollarSign } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

interface BookingConfirmationProps {
  onReset: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ onReset }) => {
  const { 
    bookingId, 
    selectedPackage, 
    selectedAccommodation, 
    selectedDate, 
    passengers 
  } = useBooking();
  
  if (!bookingId || !selectedPackage || !selectedAccommodation || !selectedDate) {
    return (
      <div className="text-center py-12">
        <p className="text-space-light mb-4">No booking information found.</p>
        <button 
          onClick={onReset}
          className="bg-space-accent hover:bg-space-accent/90 text-black py-2 px-4 rounded-md transition-colors"
        >
          Start New Booking
        </button>
      </div>
    );
  }
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate return date
  const returnDate = new Date(selectedDate.getTime() + selectedPackage.durationDays * 24 * 60 * 60 * 1000);
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-400 mb-6">
          <FiCheck size={40} />
        </div>
        
        <h2 className="text-4xl font-display text-space-gold mb-4">Booking Confirmed!</h2>
        <p className="text-space-light/80 max-w-2xl mx-auto">
          Your space journey has been successfully booked. Get ready for an extraordinary adventure beyond Earth!
        </p>
        
        <div className="mt-4 inline-block bg-space-dark border border-space-gold/30 text-space-gold px-4 py-2 rounded-md">
          Booking Reference: <span className="font-mono font-bold">{bookingId}</span>
        </div>
      </div>
      
      {/* Countdown to launch */}
      <div className="border border-space-light/10 bg-space-dark/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-space-blue/20 to-transparent p-6">
          <h3 className="font-display text-xl text-space-gold mb-4 text-center">Countdown to Launch</h3>
          <CountdownTimer targetDate={selectedDate} />
        </div>
      </div>
      
      {/* Booking details */}
      <div className="border border-space-light/10 bg-space-dark/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-space-blue/20 to-transparent px-6 py-4 border-b border-space-light/10">
          <h3 className="font-display text-xl text-space-gold">Your Journey Details</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div className="flex items-start">
              <div className="bg-space-blue/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiBriefcase className="text-space-light" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Package</h4>
                <p className="text-space-gold font-display">{selectedPackage.name}</p>
                <p className="text-space-light/70 text-sm flex items-center mt-1">
                  <FiMapPin className="mr-1" /> {selectedPackage.destination}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-blue/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiHome className="text-space-light" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Accommodation</h4>
                <p className="text-space-gold font-display">{selectedAccommodation.name}</p>
                <p className="text-space-light/70 text-sm capitalize mt-1">{selectedAccommodation.type}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-blue/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiCalendar className="text-space-light" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Launch Date</h4>
                <p className="text-space-gold">{formatDate(selectedDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-blue/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiClock className="text-space-light" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Return Date</h4>
                <p className="text-space-gold">{formatDate(returnDate)}</p>
                <p className="text-space-light/70 text-sm mt-1">
                  {selectedPackage.durationDays} days journey
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-blue/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiUsers className="text-space-light" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Passengers</h4>
                <p className="text-space-gold">{passengers.length} {passengers.length === 1 ? 'person' : 'people'}</p>
                <p className="text-space-light/70 text-sm mt-1">Primary: {passengers[0]?.firstName} {passengers[0]?.lastName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-blue/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiDollarSign className="text-space-light" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Total Price</h4>
                <p className="text-space-gold font-display">{formatPrice(selectedPackage.price * passengers.length)}</p>
                <p className="text-space-light/70 text-sm mt-1">All taxes included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Next steps */}
      <div className="border border-space-light/10 bg-space-dark/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-space-blue/20 to-transparent px-6 py-4 border-b border-space-light/10">
          <h3 className="font-display text-xl text-space-gold">Next Steps</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-space-accent/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiMail className="text-space-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Confirmation Email</h4>
                <p className="text-space-light/80 text-sm">
                  A detailed confirmation has been sent to {passengers[0]?.email}. 
                  Please check your inbox and spam folder.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-accent/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiDownload className="text-space-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Pre-Flight Training</h4>
                <p className="text-space-light/80 text-sm">
                  You will receive training materials within 7 days. All passengers must complete
                  mandatory training before the launch date.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-space-accent/20 p-2 rounded-full mr-4 flex-shrink-0">
                <FiCheck className="text-space-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Medical Clearance</h4>
                <p className="text-space-light/80 text-sm">
                  Our medical team will contact you to schedule pre-flight health assessments
                  for all passengers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-space-accent hover:bg-space-accent/90 text-black font-medium py-3 px-6 rounded-md transition-colors"
        >
          Book Another Journey
        </button>
        
        <Link 
          href="/dashboard" 
          className="flex items-center justify-center gap-2 bg-space-blue hover:bg-space-blue/90 text-white py-3 px-6 rounded-md transition-colors"
        >
          <FiUser />
          Go to Dashboard
        </Link>
        
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 bg-space-dark hover:bg-space-dark/80 text-space-light py-3 px-6 rounded-md transition-colors border border-space-light/20"
        >
          <FiHome />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SpacePackage } from '@/types/package';
import { Accommodation } from '@/types/accommodation';
import { Passenger } from '@/types/passenger';

// Define the booking type
interface Booking {
  id: string;
  packageId: string;
  accommodationId: string;
  departureDate: Date;
  passengers: Passenger[];
  totalPrice: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: Date;
}

interface BookingContextType {
  // Selected items
  selectedPackage: SpacePackage | null;
  selectedAccommodation: Accommodation | null;
  selectedDate: Date | null;
  passengers: Passenger[];
  bookingId: string | null;
  
  // Actions
  setSelectedPackage: (pkg: SpacePackage) => void;
  selectPackage: (pkg: SpacePackage) => void;
  selectAccommodation: (accommodation: Accommodation) => void;
  selectDate: (date: Date) => void;
  updatePassengers: (passengers: Passenger[]) => void;
  addPassenger: (passenger: Passenger) => void;
  updatePassenger: (index: number, passenger: Passenger) => void;
  removePassenger: (index: number) => void;
  createBooking: (booking: Booking) => void;
  completeBooking: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  // State for selected items
  const [selectedPackage, setSelectedPackage] = useState<SpacePackage | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [bookingId, setBookingId] = useState<string | null>(null);
  
  // Action to select a package
  const selectPackage = (pkg: SpacePackage) => {
    setSelectedPackage(pkg);
    
    // Reset accommodation if it's not compatible with the new package
    if (selectedAccommodation && !pkg.availableAccommodations.includes(selectedAccommodation.id)) {
      setSelectedAccommodation(null);
    }
  };
  
  // Action to select an accommodation
  const selectAccommodation = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    
    // Adjust passengers if needed
    if (passengers.length > accommodation.maxOccupancy) {
      setPassengers(passengers.slice(0, accommodation.maxOccupancy));
    }
  };
  
  // Action to select a date
  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Action to update passengers
  const updatePassengers = (newPassengers: Passenger[]) => {
    setPassengers(newPassengers);
  };
  
  // Action to add a passenger
  const addPassenger = (passenger: Passenger) => {
    setPassengers([...passengers, passenger]);
  };
  
  // Action to update a specific passenger
  const updatePassenger = (index: number, passenger: Passenger) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = passenger;
    setPassengers(updatedPassengers);
  };
  
  // Action to remove a passenger
  const removePassenger = (index: number) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
  };
  
  // Action to create a booking
  const createBooking = (booking: Booking) => {
    setBookingId(booking.id);
    
    // In a real app, this would send the booking data to a server
    console.log('Booking created:', booking);
  };
  
  // Action to complete booking
  const completeBooking = () => {
    // Generate a booking ID
    const bookingId = `SPACE-${Date.now().toString().slice(-6)}`;
    setBookingId(bookingId);
    
    // In a real app, this would send the booking data to a server
    console.log('Booking completed:', {
      bookingId,
      package: selectedPackage,
      accommodation: selectedAccommodation,
      date: selectedDate,
      passengers
    });
  };
  
  // Action to reset booking
  const resetBooking = () => {
    setSelectedPackage(null);
    setSelectedAccommodation(null);
    setSelectedDate(null);
    setPassengers([]);
    setBookingId(null);
  };
  
  const value = {
    selectedPackage,
    selectedAccommodation,
    selectedDate,
    passengers,
    bookingId,
    setSelectedPackage,
    selectPackage,
    selectAccommodation,
    selectDate,
    updatePassengers,
    addPassenger,
    updatePassenger,
    removePassenger,
    createBooking,
    completeBooking,
    resetBooking
  };
  
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  
  return context;
}; 
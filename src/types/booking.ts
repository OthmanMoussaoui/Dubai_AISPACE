export interface Passenger {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  specialRequirements: string;
  acceptedTerms: boolean;
}

export interface Booking {
  reference: string;
  packageId: string;
  accommodationId: string;
  departureDate: Date;
  returnDate: Date;
  passengers: Passenger[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
} 
'use client';

import React from 'react';
import { BookingProvider } from '@/context/BookingContext';
import { BookingFlow } from '@/components/booking/BookingFlow';

export default function BookingPage() {
  return (
    <div className="py-12 space-bg">
      <div className="container mx-auto px-4">
        <h1 className="heading-2 mb-8 text-center">
          Book Your <span className="text-space-accent">Space Journey</span>
        </h1>
        
        <p className="text-space-light text-center max-w-3xl mx-auto mb-12">
          Follow the steps below to book your once-in-a-lifetime journey to space. 
          Select your preferred package, accommodation, and travel dates.
        </p>
        
        <BookingProvider>
          <BookingFlow />
        </BookingProvider>
      </div>
    </div>
  );
} 
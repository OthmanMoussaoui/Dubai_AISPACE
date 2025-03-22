'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiCalendar, FiUsers, FiMapPin, FiHome, FiDollarSign, FiClock, FiAlertCircle, FiCheckCircle, FiDownload } from 'react-icons/fi';
import { CountdownTimer } from '@/components/dashboard/CountdownTimer';

// Mock data - in a real app this would come from an API or database
const mockBookings = [
  {
    id: '1',
    packageName: 'Mars Expedition',
    accommodation: 'Mars Habitat - Premium Suite',
    destination: 'Mars',
    departureDate: '2025-06-15T10:00:00',
    returnDate: '2025-07-30T14:00:00',
    totalPrice: 12500000,
    status: 'Confirmed',
    passengers: 2,
    thumbnail: '/images/packages/mars-expedition.jpg',
    flightNumber: 'MS-1234',
    gate: 'G12',
    terminal: 'Spaceport Alpha',
    launchSite: 'Cape Canaveral Space Force Station, FL',
    milestones: [
      { title: 'Booking Confirmed', date: '2023-12-01', completed: true },
      { title: 'Initial Payment Received', date: '2023-12-01', completed: true },
      { title: 'Medical Clearance', date: '2024-02-15', completed: true },
      { title: 'Pre-Flight Training Session 1', date: '2024-04-10', completed: false },
      { title: 'Pre-Flight Training Session 2', date: '2024-08-22', completed: false },
      { title: 'Final Medical Check', date: '2025-05-01', completed: false },
      { title: 'Launch Day', date: '2025-06-15', completed: false }
    ]
  },
  {
    id: '2',
    packageName: 'Lunar Odyssey',
    accommodation: 'Lunar Habitat - Standard Room',
    destination: 'Moon',
    departureDate: '2024-09-20T08:30:00',
    returnDate: '2024-10-05T16:45:00',
    totalPrice: 4500000,
    status: 'Preparing',
    passengers: 1,
    thumbnail: '/images/packages/lunar-odyssey.jpg',
    flightNumber: 'LN-5678',
    gate: 'G05',
    terminal: 'Spaceport Beta',
    launchSite: 'Baikonur Cosmodrome, Kazakhstan',
    milestones: [
      { title: 'Booking Confirmed', date: '2023-11-15', completed: true },
      { title: 'Initial Payment Received', date: '2023-11-15', completed: true },
      { title: 'Medical Clearance', date: '2024-01-10', completed: true },
      { title: 'Pre-Flight Training Session 1', date: '2024-03-05', completed: true },
      { title: 'Pre-Flight Training Session 2', date: '2024-06-15', completed: false },
      { title: 'Final Medical Check', date: '2024-08-01', completed: false },
      { title: 'Launch Day', date: '2024-09-20', completed: false }
    ]
  }
];

const BookingDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  // Find the booking by ID
  const booking = mockBookings.find(b => b.id === id);
  
  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-8">
          <FiAlertCircle className="text-6xl text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Booking Not Found</h1>
          <p className="text-space-light mb-6">The booking you're looking for doesn't exist or may have been removed.</p>
          <Link href="/dashboard" className="btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-space-light hover:text-white transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Bookings
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Booking Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{booking.packageName}</h1>
                <p className="text-space-light text-lg mb-4">Booking #{booking.id}</p>
                <div className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {booking.status}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Image 
                  src={booking.thumbnail} 
                  alt={booking.packageName} 
                  width={150} 
                  height={100} 
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Flight Details */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Flight Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-space-light">Flight Number</p>
                  <p className="text-white text-lg font-medium">{booking.flightNumber}</p>
                </div>
                
                <div>
                  <p className="text-space-light">Gate</p>
                  <p className="text-white text-lg font-medium">{booking.gate}</p>
                </div>
                
                <div>
                  <p className="text-space-light">Terminal</p>
                  <p className="text-white text-lg font-medium">{booking.terminal}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <FiMapPin className="text-space-gold mt-1 mr-2" />
                  <div>
                    <p className="text-space-light">Destination</p>
                    <p className="text-white text-lg font-medium">{booking.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCalendar className="text-space-gold mt-1 mr-2" />
                  <div>
                    <p className="text-space-light">Departure Date</p>
                    <p className="text-white text-lg font-medium">{formatDate(booking.departureDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCalendar className="text-space-gold mt-1 mr-2" />
                  <div>
                    <p className="text-space-light">Return Date</p>
                    <p className="text-white text-lg font-medium">{formatDate(booking.returnDate)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-space-light/20">
              <div className="flex items-start">
                <FiMapPin className="text-space-gold mt-1 mr-2" />
                <div>
                  <p className="text-space-light">Launch Site</p>
                  <p className="text-white text-lg font-medium">{booking.launchSite}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Accommodation */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FiHome className="text-space-gold mr-2" />
              <h2 className="text-xl font-bold text-white">Accommodation</h2>
            </div>
            
            <p className="text-white text-lg mb-4">{booking.accommodation}</p>
            
            <div className="bg-space-dark/50 border border-space-light/10 rounded-lg p-4">
              <p className="text-space-light">Your accommodation features state-of-the-art life support systems, radiation shielding, and all amenities required for a comfortable stay. A detailed information packet will be provided during your pre-flight training.</p>
            </div>
          </div>
          
          {/* Booking Milestones */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <FiClock className="text-space-gold mr-2" />
              <h2 className="text-xl font-bold text-white">Journey Milestones</h2>
            </div>
            
            <div className="relative">
              {booking.milestones.map((milestone, index) => (
                <div key={index} className="mb-8 flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${milestone.completed ? 'bg-green-500' : 'bg-space-dark border border-space-light/30'}`}>
                      {milestone.completed ? 
                        <FiCheckCircle className="text-white" /> : 
                        <span className="text-space-light">{index + 1}</span>
                      }
                    </div>
                    {index < booking.milestones.length - 1 && (
                      <div className={`w-0.5 h-16 ${milestone.completed ? 'bg-green-500' : 'bg-space-light/30'}`}></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{milestone.title}</h3>
                    <p className="text-space-light">{new Date(milestone.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    {milestone.title === 'Pre-Flight Training Session 1' && !milestone.completed && (
                      <button className="mt-2 bg-space-gold text-space-dark px-3 py-1 rounded text-sm font-medium hover:bg-space-gold/80 transition-colors">
                        Schedule Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Countdown Timer */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Launch Countdown</h2>
            <CountdownTimer 
              destination={booking.destination}
              launchDate={booking.departureDate}
              packageName={booking.packageName}
            />
          </div>
          
          {/* Price Summary */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FiDollarSign className="text-space-gold mr-2" />
              <h2 className="text-xl font-bold text-white">Price Summary</h2>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-space-light">Package Base Price</span>
                <span className="text-white">${formatPrice(Math.round(booking.totalPrice * 0.6))}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-space-light">Accommodation</span>
                <span className="text-white">${formatPrice(Math.round(booking.totalPrice * 0.3))}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-space-light">Space Insurance</span>
                <span className="text-white">${formatPrice(Math.round(booking.totalPrice * 0.1))}</span>
              </div>
              
              <div className="flex justify-between pt-3 border-t border-space-light/20">
                <span className="text-white font-bold">Total Price</span>
                <span className="text-space-gold font-bold">${formatPrice(booking.totalPrice)}</span>
              </div>
            </div>
            
            <div className="text-xs text-space-light mt-4">
              <p>Payment completed in full on {new Date(booking.milestones[1].date).toLocaleDateString()}</p>
            </div>
          </div>
          
          {/* Passengers */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FiUsers className="text-space-gold mr-2" />
              <h2 className="text-xl font-bold text-white">Passengers</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-space-dark/50 border border-space-light/10 rounded-lg">
                <p className="font-medium text-white">Primary Traveler</p>
                <p className="text-space-light">John Doe</p>
              </div>
              
              {booking.passengers > 1 && (
                <div className="p-3 bg-space-dark/50 border border-space-light/10 rounded-lg">
                  <p className="font-medium text-white">Co-Traveler</p>
                  <p className="text-space-light">Jane Doe</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Documents */}
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Important Documents</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-space-dark/50 border border-space-light/10 rounded-lg hover:bg-space-light/5 transition-colors">
                <span className="text-white">Booking Confirmation</span>
                <FiDownload className="text-space-gold" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-space-dark/50 border border-space-light/10 rounded-lg hover:bg-space-light/5 transition-colors">
                <span className="text-white">E-Ticket</span>
                <FiDownload className="text-space-gold" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 bg-space-dark/50 border border-space-light/10 rounded-lg hover:bg-space-light/5 transition-colors">
                <span className="text-white">Training Schedule</span>
                <FiDownload className="text-space-gold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage; 
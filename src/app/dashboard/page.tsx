'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiUsers, FiClipboard, FiCreditCard, FiSettings, FiLogOut, FiHome, FiClock, FiMapPin, FiStar, FiCheck } from 'react-icons/fi';
import { CountdownTimer } from '@/components/dashboard/CountdownTimer';

// Mock data for bookings
const mockBookings = [
  {
    id: 'SPACE-123456',
    packageId: '1',
    packageName: 'Orbital Experience',
    accommodationId: '1',
    accommodationName: 'Orbital Suite',
    destination: 'Earth Orbit',
    departureDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    returnDate: new Date(Date.now() + 33 * 24 * 60 * 60 * 1000),
    totalPrice: 450000,
    status: 'confirmed',
    passengers: 2,
    thumbnail: '/images/packages/orbital-luxury.jpg',
  },
  {
    id: 'SPACE-789012',
    packageId: '2',
    packageName: 'Lunar Gateway',
    accommodationId: '3',
    accommodationName: 'Lunar Habitat',
    destination: 'Moon Orbit',
    departureDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    returnDate: new Date(Date.now() + 98 * 24 * 60 * 60 * 1000),
    totalPrice: 1250000,
    status: 'confirmed',
    passengers: 1,
    thumbnail: '/images/packages/lunar-odyssey.jpg',
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'profile'>('overview');

  // Format price to USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-12 space-bg min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="heading-2 mb-6">Traveler Dashboard</h1>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-space-gold">
                  <Image 
                    src="/images/space-hotel.png" 
                    alt="Profile" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <h2 className="text-xl font-display">Alex Astronaut</h2>
                <p className="text-space-light text-sm">Space Explorer</p>
                <div className="mt-2 bg-space-blue/20 px-3 py-1 rounded-full text-space-gold text-xs font-medium">
                  Gold Member
                </div>
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-space-blue text-white' 
                      : 'text-space-light hover:bg-space-dark/50 hover:text-white'
                  }`}
                >
                  <FiHome />
                  <span>Overview</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 transition-colors ${
                    activeTab === 'bookings' 
                      ? 'bg-space-blue text-white' 
                      : 'text-space-light hover:bg-space-dark/50 hover:text-white'
                  }`}
                >
                  <FiCalendar />
                  <span>My Bookings</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-space-blue text-white' 
                      : 'text-space-light hover:bg-space-dark/50 hover:text-white'
                  }`}
                >
                  <FiUsers />
                  <span>Profile</span>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-space-light/10">
                <Link href="/" className="w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 text-space-light hover:bg-space-dark/50 hover:text-white transition-colors">
                  <FiLogOut />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
            
            <div className="card">
              <h3 className="font-display text-lg mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/booking" className="w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 text-space-light hover:bg-space-dark/50 hover:text-white transition-colors">
                  <FiClipboard />
                  <span>Book New Journey</span>
                </Link>
                
                <button className="w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 text-space-light hover:bg-space-dark/50 hover:text-white transition-colors">
                  <FiCreditCard />
                  <span>Payment Methods</span>
                </button>
                
                <button className="w-full text-left py-2 px-4 rounded-md flex items-center space-x-3 text-space-light hover:bg-space-dark/50 hover:text-white transition-colors">
                  <FiSettings />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-lg">Total Journeys</h3>
                      <div className="bg-space-blue/20 p-2 rounded-full">
                        <FiMapPin className="text-space-gold" />
                      </div>
                    </div>
                    <p className="text-3xl font-display">{mockBookings.length}</p>
                    <p className="text-space-light text-sm">Upcoming trips</p>
                  </div>
                  
                  <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-lg">Space Miles</h3>
                      <div className="bg-space-blue/20 p-2 rounded-full">
                        <FiStar className="text-space-gold" />
                      </div>
                    </div>
                    <p className="text-3xl font-display">125,000</p>
                    <p className="text-space-light text-sm">Loyalty points earned</p>
                  </div>
                  
                  <div className="glass-panel p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-lg">Next Launch</h3>
                      <div className="bg-space-blue/20 p-2 rounded-full">
                        <FiClock className="text-space-gold" />
                      </div>
                    </div>
                    <p className="text-xl font-display">{formatDate(mockBookings[0].departureDate)}</p>
                    <p className="text-space-light text-sm">{mockBookings[0].packageName}</p>
                  </div>
                </div>
                
                {/* Next Journey */}
                <div className="card">
                  <h2 className="heading-3 mb-6">Your Next Space Journey</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                      <div className="aspect-video rounded-lg overflow-hidden relative mb-4">
                        <Image 
                          src={mockBookings[0].thumbnail}
                          alt={mockBookings[0].packageName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="font-display text-xl">{mockBookings[0].packageName}</h3>
                          <p className="text-space-light">{mockBookings[0].destination}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm text-space-light uppercase mb-1">Departure</h4>
                          <p className="font-medium">{formatDate(mockBookings[0].departureDate)}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-space-light uppercase mb-1">Return</h4>
                          <p className="font-medium">{formatDate(mockBookings[0].returnDate)}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-space-light uppercase mb-1">Accommodation</h4>
                          <p className="font-medium">{mockBookings[0].accommodationName}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-space-light uppercase mb-1">Passengers</h4>
                          <p className="font-medium">{mockBookings[0].passengers}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-4">
                        <button className="btn-primary flex-1">Journey Details</button>
                        <button className="btn-secondary flex-1">Modify Booking</button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-1">
                      <CountdownTimer 
                        launchDate={mockBookings[0].departureDate}
                        packageName={mockBookings[0].packageName}
                        destination={mockBookings[0].destination}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Pre-launch checklist */}
                <div className="card">
                  <h3 className="heading-3 mb-6">Pre-Launch Checklist</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-space-blue/10 rounded-md border border-space-blue/20">
                      <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                        <FiCheck className="text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Booking Confirmation</p>
                        <p className="text-space-light text-sm">Your journey is confirmed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-space-blue/10 rounded-md border border-space-blue/20">
                      <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                        <FiCheck className="text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Payment Complete</p>
                        <p className="text-space-light text-sm">Your payment has been processed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-space-blue/10 rounded-md border border-space-blue/20">
                      <div className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                        <FiClock className="text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium">Medical Clearance</p>
                        <p className="text-space-light text-sm">Scheduled for 10 days from now</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-space-blue/10 rounded-md border border-space-blue/20">
                      <div className="h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-4">
                        <FiClock className="text-yellow-500" />
                      </div>
                      <div>
                        <p className="font-medium">Pre-Flight Training</p>
                        <p className="text-space-light text-sm">Training materials will be sent in 7 days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-space-blue/10 rounded-md border border-space-blue/20">
                      <div className="h-6 w-6 rounded-full bg-space-blue/20 flex items-center justify-center mr-4">
                        <FiClock className="text-space-light" />
                      </div>
                      <div>
                        <p className="font-medium">Final Briefing</p>
                        <p className="text-space-light text-sm">2 days before departure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="heading-3 mb-6">My Bookings</h2>
                
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="card hover:border-space-gold/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 relative">
                        <div className="aspect-video rounded-lg overflow-hidden relative">
                          <Image 
                            src={booking.thumbnail}
                            alt={booking.packageName}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent"></div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-display">{booking.packageName}</h3>
                            <p className="text-space-light">{booking.destination}</p>
                          </div>
                          <div className="bg-space-accent/20 text-space-accent px-3 py-1 rounded-full text-sm">
                            {booking.status === 'confirmed' ? 'Confirmed' : booking.status}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm text-space-light uppercase mb-1">Departure</h4>
                            <p className="font-medium">{formatDate(booking.departureDate)}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm text-space-light uppercase mb-1">Return</h4>
                            <p className="font-medium">{formatDate(booking.returnDate)}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm text-space-light uppercase mb-1">Booking Reference</h4>
                            <p className="font-medium">{booking.id}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm text-space-light uppercase mb-1">Total Price</h4>
                            <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <button className="btn-primary">View Details</button>
                          <button className="btn-secondary">Modify Booking</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="card">
                <h2 className="heading-3 mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-space-light text-sm mb-2">First Name</label>
                    <input 
                      type="text" 
                      value="Alex" 
                      className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-space-light text-sm mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value="Astronaut" 
                      className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-space-light text-sm mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value="alex@example.com" 
                      className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-space-light text-sm mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value="+1 (555) 123-4567" 
                      className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-space-light text-sm mb-2">Date of Birth</label>
                    <input 
                      type="text" 
                      value="January 15, 1985" 
                      className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-space-light text-sm mb-2">Nationality</label>
                    <input 
                      type="text" 
                      value="United States" 
                      className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-gold"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="btn-primary">Edit Profile</button>
                  <button className="btn-secondary">Change Password</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
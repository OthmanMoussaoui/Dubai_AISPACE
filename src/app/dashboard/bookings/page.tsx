'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiCalendar, FiMapPin, FiTag, FiClock, FiFilter, FiSearch } from 'react-icons/fi';

// Mock bookings data - in a real app this would come from an API
const mockBookings = [
  {
    id: '1',
    packageName: 'Mars Expedition',
    destination: 'Mars',
    departureDate: '2025-06-15T10:00:00',
    returnDate: '2025-07-30T14:00:00',
    totalPrice: 12500000,
    status: 'Confirmed',
    thumbnail: '/images/packages/mars-expedition.jpg'
  },
  {
    id: '2',
    packageName: 'Lunar Odyssey',
    destination: 'Moon',
    departureDate: '2024-09-20T08:30:00',
    returnDate: '2024-10-05T16:45:00',
    totalPrice: 4500000,
    status: 'Preparing',
    thumbnail: '/images/packages/lunar-odyssey.jpg'
  },
  {
    id: '3',
    packageName: 'Orbital Luxury Weekend',
    destination: 'Earth Orbit',
    departureDate: '2024-04-10T09:15:00',
    returnDate: '2024-04-12T18:30:00',
    totalPrice: 1500000,
    status: 'Completed',
    thumbnail: '/images/packages/orbital-luxury.jpg'
  }
];

// Filter options
const statusOptions = ['All', 'Confirmed', 'Preparing', 'Completed', 'Cancelled'];
const dateOptions = ['All time', 'Upcoming', 'Past', 'Next 3 months', 'Next 6 months'];

const BookingsPage = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All time');
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Filter bookings based on search and filters
  const filteredBookings = mockBookings.filter(booking => {
    // Search term filtering
    const matchesSearch = searchTerm === '' || 
      booking.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filtering
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    
    // Date filtering (simplified - in a real app would be more comprehensive)
    let matchesDate = true;
    if (dateFilter === 'Upcoming') {
      matchesDate = new Date(booking.departureDate) > new Date();
    } else if (dateFilter === 'Past') {
      matchesDate = new Date(booking.departureDate) < new Date();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">My Bookings</h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-2.5 text-space-light" />
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <FiFilter className="text-space-gold mr-2" />
          <h2 className="text-lg font-medium text-white">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-space-light mb-1 text-sm">Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">Date Range</label>
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
            >
              {dateOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <div key={booking.id} className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 items-center">
                {/* Thumbnail */}
                <div className="md:col-span-1 relative h-40 md:h-full">
                  <Image 
                    src={booking.thumbnail} 
                    alt={booking.packageName}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Booking Details */}
                <div className="md:col-span-3 p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-bold text-white">{booking.packageName}</h2>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-space-light">
                    <FiMapPin className="mr-2" />
                    {booking.destination}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center text-space-light mb-2 sm:mb-0">
                      <FiCalendar className="mr-2" />
                      <span>{formatDate(booking.departureDate)} - {formatDate(booking.returnDate)}</span>
                    </div>
                    
                    <div className="flex items-center text-space-light">
                      <FiTag className="mr-2" />
                      <span>${formatPrice(booking.totalPrice)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-space-light/20 p-4 flex flex-row md:flex-col items-center justify-center space-x-3 md:space-x-0 md:space-y-3">
                  <Link href={`/dashboard/bookings/${booking.id}`} className="btn-primary inline-flex items-center">
                    <FiEye className="mr-2" /> View Details
                  </Link>
                  
                  {new Date(booking.departureDate) > new Date() && booking.status !== 'Cancelled' && (
                    <button className="text-space-light hover:text-white transition-colors flex items-center">
                      <FiClock className="mr-2" /> {booking.status === 'Completed' ? 'Review' : 'Modify'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-8 text-center">
            <p className="text-space-light mb-4">No bookings found matching your filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setDateFilter('All time');
              }}
              className="text-space-gold hover:text-space-gold/80 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage; 
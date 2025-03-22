'use client';

import React, { useState } from 'react';
import { FiFilter, FiX, FiArrowRight, FiHome, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { spaceAccommodations } from '@/data/accommodations';

export default function AccommodationsPage() {
  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [occupancyFilter, setOccupancyFilter] = useState<string>('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>('all');
  
  // Accommodation types for filter
  const accommodationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'premium', label: 'Premium' }
  ];
  
  // Occupancy ranges for filter
  const occupancyRanges = [
    { value: 'all', label: 'Any Occupancy' },
    { value: '1-2', label: '1-2 People' },
    { value: '3-4', label: '3-4 People' },
    { value: '5+', label: '5+ People' }
  ];
  
  // Price ranges for filter
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget (Under $100,000)' },
    { value: 'standard', label: 'Standard ($100,000 - $250,000)' },
    { value: 'premium', label: 'Premium ($250,000+)' }
  ];
  
  // Filter accommodations based on selected filters
  const filteredAccommodations = spaceAccommodations.filter(accommodation => {
    // Filter by type
    if (typeFilter !== 'all' && accommodation.type !== typeFilter) {
      return false;
    }
    
    // Filter by occupancy
    if (occupancyFilter !== 'all') {
      if (occupancyFilter === '1-2' && (accommodation.maxOccupancy < 1 || accommodation.maxOccupancy > 2)) {
        return false;
      }
      if (occupancyFilter === '3-4' && (accommodation.maxOccupancy < 3 || accommodation.maxOccupancy > 4)) {
        return false;
      }
      if (occupancyFilter === '5+' && accommodation.maxOccupancy < 5) {
        return false;
      }
    }
    
    // Filter by price range
    if (priceRangeFilter !== 'all') {
      if (priceRangeFilter === 'budget' && accommodation.price >= 100000) {
        return false;
      }
      if (priceRangeFilter === 'standard' && (accommodation.price < 100000 || accommodation.price > 250000)) {
        return false;
      }
      if (priceRangeFilter === 'premium' && accommodation.price <= 250000) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'type') setTypeFilter(value);
    if (name === 'occupancy') setOccupancyFilter(value);
    if (name === 'priceRange') setPriceRangeFilter(value);
  };
  
  const resetFilters = () => {
    setTypeFilter('all');
    setOccupancyFilter('all');
    setPriceRangeFilter('all');
  };
  
  // Format price to USD
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Get type style
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'standard':
        return 'bg-blue-500/20 text-blue-300';
      case 'deluxe':
        return 'bg-purple-500/20 text-purple-300';
      case 'premium':
        return 'bg-space-accent/20 text-space-accent';
      default:
        return 'bg-space-light/20 text-space-light';
    }
  };
  
  return (
    <div className="py-12 space-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">
            Space <span className="text-space-accent">Accommodations</span>
          </h1>
          <p className="text-space-light max-w-3xl mx-auto">
            Discover our range of extraordinary accommodations for your space journey.
            From orbital suites to planetary habitats, experience comfort beyond Earth.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-space-dark/30 p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl flex items-center">
              <FiFilter className="mr-2" /> Filter Accommodations
            </h3>
            
            <button
              className="text-space-light hover:text-white text-sm flex items-center"
              onClick={resetFilters}
            >
              Reset Filters <FiX className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-space-light mb-2 text-sm">Accommodation Type</label>
              <select
                name="type"
                value={typeFilter}
                onChange={handleFilterChange}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
              >
                {accommodationTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Occupancy Filter */}
            <div>
              <label className="block text-space-light mb-2 text-sm">Occupancy</label>
              <select
                name="occupancy"
                value={occupancyFilter}
                onChange={handleFilterChange}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
              >
                {occupancyRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label className="block text-space-light mb-2 text-sm">Price Range</label>
              <select
                name="priceRange"
                value={priceRangeFilter}
                onChange={handleFilterChange}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-12">
          <h3 className="font-display text-xl mb-6">
            Available Accommodations ({filteredAccommodations.length})
          </h3>
          
          {filteredAccommodations.length === 0 ? (
            <div className="text-center py-12 bg-space-dark/30 rounded-lg">
              <p className="text-space-light mb-4">
                No accommodations match your current filters.
              </p>
              <button
                className="bg-space-accent/20 hover:bg-space-accent/30 text-space-accent py-2 px-4 rounded-md transition-colors"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAccommodations.map(accommodation => (
                <div 
                  key={accommodation.id} 
                  className="card group overflow-hidden transition-all duration-300 hover:border-space-light/50"
                >
                  <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${accommodation.imageUrl || '/images/accommodations/placeholder.jpg'})` 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getTypeStyle(accommodation.type)}`}>
                        {accommodation.type.charAt(0).toUpperCase() + accommodation.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-xl">{accommodation.name}</h3>
                    <div className="flex items-center text-space-light text-sm">
                      <FiUsers className="mr-1" />
                      <span>Max: {accommodation.maxOccupancy}</span>
                    </div>
                  </div>
                  
                  <p className="text-space-light mb-4">{accommodation.description}</p>
                  
                  {/* Amenities */}
                  <div className="mb-4">
                    <h4 className="font-display text-sm uppercase tracking-wider mb-2 text-space-light">
                      Top Amenities
                    </h4>
                    <ul className="grid grid-cols-1 gap-y-1">
                      {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="text-space-accent mr-2">•</span>
                          <span>{amenity}</span>
                        </li>
                      ))}
                      {accommodation.amenities.length > 3 && (
                        <li className="text-sm text-space-light/70">
                          +{accommodation.amenities.length - 3} more amenities
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-space-light/10">
                    <div>
                      <div className="text-sm text-space-light">Price</div>
                      <div className="text-xl font-display text-space-accent">
                        {formatPrice(accommodation.price)}
                      </div>
                    </div>
                    
                    <Link
                      href="/booking"
                      className="flex items-center text-space-accent hover:text-space-accent/80 transition-colors"
                    >
                      View in Booking <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center">
          <Link href="/booking" className="btn-primary inline-flex items-center">
            Start Booking <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
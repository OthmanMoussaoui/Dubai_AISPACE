'use client';

import React, { useState } from 'react';
import { FiFilter, FiX, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { spacePackages } from '@/data/packages';
import { PackageCard } from '@/components/PackageCard';

export default function PackagesPage() {
  // Filter states
  const [destinationFilter, setDestinationFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>('all');
  
  // Get unique destinations for filter
  const destinations = ['all', ...Array.from(new Set(spacePackages.map(pkg => pkg.destination)))];
  
  // Duration ranges for filter
  const durationRanges = [
    { value: 'all', label: 'All Durations' },
    { value: 'short', label: 'Short (1-7 days)' },
    { value: 'medium', label: 'Medium (8-30 days)' },
    { value: 'long', label: 'Long (31+ days)' }
  ];
  
  // Price ranges for filter
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'budget', label: 'Budget (Under $300,000)' },
    { value: 'standard', label: 'Standard ($300,000 - $750,000)' },
    { value: 'premium', label: 'Premium ($750,000+)' }
  ];
  
  // Filter packages based on selected filters
  const filteredPackages = spacePackages.filter(pkg => {
    // Filter by destination
    if (destinationFilter !== 'all' && pkg.destination !== destinationFilter) {
      return false;
    }
    
    // Filter by duration
    if (durationFilter !== 'all') {
      if (durationFilter === 'short' && (pkg.durationDays < 1 || pkg.durationDays > 7)) {
        return false;
      }
      if (durationFilter === 'medium' && (pkg.durationDays < 8 || pkg.durationDays > 30)) {
        return false;
      }
      if (durationFilter === 'long' && pkg.durationDays <= 30) {
        return false;
      }
    }
    
    // Filter by price range
    if (priceRangeFilter !== 'all') {
      if (priceRangeFilter === 'budget' && pkg.price >= 300000) {
        return false;
      }
      if (priceRangeFilter === 'standard' && (pkg.price < 300000 || pkg.price > 750000)) {
        return false;
      }
      if (priceRangeFilter === 'premium' && pkg.price <= 750000) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'destination') setDestinationFilter(value);
    if (name === 'duration') setDurationFilter(value);
    if (name === 'priceRange') setPriceRangeFilter(value);
  };
  
  const resetFilters = () => {
    setDestinationFilter('all');
    setDurationFilter('all');
    setPriceRangeFilter('all');
  };
  
  return (
    <div className="py-12 space-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">
            Space Travel <span className="text-space-accent">Packages</span>
          </h1>
          <p className="text-space-light max-w-3xl mx-auto">
            Browse our selection of extraordinary space travel experiences. 
            From orbital getaways to interplanetary expeditions, find the perfect journey for your adventure beyond Earth.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-space-dark/30 p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl flex items-center">
              <FiFilter className="mr-2" /> Filter Packages
            </h3>
            
            <button
              className="text-space-light hover:text-white text-sm flex items-center"
              onClick={resetFilters}
            >
              Reset Filters <FiX className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Destination Filter */}
            <div>
              <label className="block text-space-light mb-2 text-sm">Destination</label>
              <select
                name="destination"
                value={destinationFilter}
                onChange={handleFilterChange}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
              >
                <option value="all">All Destinations</option>
                {destinations.filter(d => d !== 'all').map(destination => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Duration Filter */}
            <div>
              <label className="block text-space-light mb-2 text-sm">Duration</label>
              <select
                name="duration"
                value={durationFilter}
                onChange={handleFilterChange}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
              >
                {durationRanges.map(range => (
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
            Available Packages ({filteredPackages.length})
          </h3>
          
          {filteredPackages.length === 0 ? (
            <div className="text-center py-12 bg-space-dark/30 rounded-lg">
              <p className="text-space-light mb-4">
                No packages match your current filters.
              </p>
              <button
                className="bg-space-accent/20 hover:bg-space-accent/30 text-space-accent py-2 px-4 rounded-md transition-colors"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {filteredPackages.map(pkg => (
                <div key={pkg.id} onClick={() => window.location.href = `/booking`}>
                  <PackageCard
                    package={pkg}
                    onSelect={() => window.location.href = `/booking`}
                  />
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
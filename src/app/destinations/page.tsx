'use client';

import React from 'react';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { spacePackages } from '@/data/packages';

export default function DestinationsPage() {
  // Get unique destinations from packages
  const destinations = Array.from(new Set(spacePackages.map(pkg => pkg.destination)));
  
  return (
    <div className="py-12 space-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">
            Space <span className="text-space-accent">Destinations</span>
          </h1>
          <p className="text-space-light max-w-3xl mx-auto">
            Explore the extraordinary destinations available through our space tourism program.
            From Earth orbit to the Moon, Mars, and beyond, discover the wonders of our solar system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {destinations.map((destination) => {
            // Find a package for this destination to use its image
            const packageForDestination = spacePackages.find(pkg => pkg.destination === destination);
            
            return (
              <div key={destination} className="card group overflow-hidden">
                <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${packageForDestination?.imageUrl || '/images/destinations/placeholder.jpg'})` 
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="flex items-center">
                      <FiMapPin className="text-space-accent mr-2" />
                      <h3 className="font-display text-2xl text-white">{destination}</h3>
                    </div>
                  </div>
                </div>
                
                <p className="text-space-light mb-6">
                  {destination === 'Moon' && 'Earth\'s closest celestial neighbor, featuring lunar landscapes, historic landing sites, and breathtaking Earth views.'}
                  {destination === 'Mars' && 'The Red Planet offers vast canyons, towering volcanoes, and the opportunity to be among the first humans to set foot on another world.'}
                  {destination === 'Earth Orbit' && 'Experience weightlessness and unparalleled views of our home planet from the ultimate high ground.'}
                  {destination === 'Venus' && 'Our nearest planetary neighbor offers close-up views of its mysterious cloud formations and intense atmospheric phenomena.'}
                  {destination === 'Asteroid Belt' && 'Venture into the realm between Mars and Jupiter to explore these ancient remnants from the formation of our solar system.'}
                  {destination === 'Jupiter' && 'The largest planet in our solar system features spectacular storms, fascinating moons, and awe-inspiring scale.'}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-space-light">
                    {spacePackages.filter(pkg => pkg.destination === destination).length} packages available
                  </div>
                  
                  <Link 
                    href="/packages" 
                    className="flex items-center text-space-accent hover:text-space-accent/80 transition-colors"
                  >
                    View Packages <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
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
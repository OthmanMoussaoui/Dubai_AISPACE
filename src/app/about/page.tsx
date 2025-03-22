'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowRight, FiUsers, FiStar, FiGlobe, FiShield, FiAward } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="py-12 space-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="heading-2 mb-4">
            About <span className="text-space-accent">Dubai to the Stars</span>
          </h1>
          <p className="text-space-light max-w-3xl mx-auto">
            Pioneering the future of space tourism from Dubai, the world's premier hub for commercial space travel.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="card mb-12">
          <h2 className="heading-3 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-space-light mb-4">
                Dubai to the Stars was founded in 2030 with a bold vision: to make space travel accessible to private citizens and establish Dubai as the world's premier spaceport for commercial space tourism.
              </p>
              <p className="text-space-light mb-4">
                Building on Dubai's legacy of ambitious engineering projects and luxury tourism, we've created the first end-to-end space tourism experience that combines cutting-edge technology with unparalleled luxury and safety.
              </p>
              <p className="text-space-light">
                Our state-of-the-art spaceport, located in the Dubai desert, serves as the gateway to the stars for adventurous travelers seeking to experience the wonders of space firsthand.
              </p>
            </div>
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/images/about/spaceport.jpg)' }}
              />
            </div>
          </div>
        </div>
        
        {/* Our Mission */}
        <div className="card mb-12">
          <h2 className="heading-3 mb-6">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-space-dark/30 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-space-accent/20 flex items-center justify-center mb-4">
                <FiUsers className="text-space-accent text-2xl" />
              </div>
              <h3 className="font-display text-xl mb-2">Accessibility</h3>
              <p className="text-space-light">
                Making space travel accessible to more people through innovative technology and business models.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-space-dark/30 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-space-accent/20 flex items-center justify-center mb-4">
                <FiGlobe className="text-space-accent text-2xl" />
              </div>
              <h3 className="font-display text-xl mb-2">Sustainability</h3>
              <p className="text-space-light">
                Pioneering sustainable space tourism practices that protect Earth and space environments.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-space-dark/30 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-space-accent/20 flex items-center justify-center mb-4">
                <FiStar className="text-space-accent text-2xl" />
              </div>
              <h3 className="font-display text-xl mb-2">Innovation</h3>
              <p className="text-space-light">
                Continuously pushing the boundaries of what's possible in commercial space travel.
              </p>
            </div>
          </div>
        </div>
        
        {/* Safety & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-space-accent/20 flex items-center justify-center mr-4">
                <FiShield className="text-space-accent text-xl" />
              </div>
              <h2 className="heading-3">Safety First</h2>
            </div>
            <p className="text-space-light mb-4">
              Safety is our absolute priority. Our spacecraft and facilities exceed all international safety standards, and our rigorous training programs ensure all travelers are thoroughly prepared for their journey.
            </p>
            <p className="text-space-light">
              Every mission is overseen by experienced astronauts and aerospace professionals with thousands of hours of spaceflight experience.
            </p>
          </div>
          
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-space-accent/20 flex items-center justify-center mr-4">
                <FiAward className="text-space-accent text-xl" />
              </div>
              <h2 className="heading-3">Unparalleled Experience</h2>
            </div>
            <p className="text-space-light mb-4">
              From the moment you book until your return to Earth, we provide a seamless, luxurious experience that caters to your every need.
            </p>
            <p className="text-space-light">
              Our team of hospitality experts, trained specifically for space tourism, ensures that your journey is comfortable, memorable, and truly out of this world.
            </p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="card text-center">
          <h2 className="heading-3 mb-4">Ready to Reach for the Stars?</h2>
          <p className="text-space-light mb-6 max-w-2xl mx-auto">
            Join us on an extraordinary journey beyond Earth. Browse our selection of space travel packages and take the first step toward your adventure among the stars.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/packages" className="btn-secondary">
              Explore Packages
            </Link>
            <Link href="/booking" className="btn-primary inline-flex items-center">
              Start Booking <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
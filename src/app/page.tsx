import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiStar, FiClock, FiMapPin } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="space-bg">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero-background.jpg" 
            alt="Space view of Earth" 
            fill 
            priority
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-space-dark/70 to-space-dark z-10" />
        </div>
        <div className="container mx-auto px-4 z-20">
          <div className="max-w-3xl">
            <h1 className="heading-1 mb-4">
              <span className="text-space-gold">Dubai</span> to the{' '}
              <span className="text-space-light">Stars</span>
            </h1>
            <p className="text-xl md:text-2xl text-space-light mb-8">
              Experience the future of travel with the world's first commercial space tourism hub.
              Book your journey beyond Earth today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/packages" className="btn-primary">
                Explore Packages
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Featured Destinations</h2>
            <p className="text-space-light max-w-2xl mx-auto">
              Discover the most popular space destinations available from Dubai's
              revolutionary space port.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Orbital Experience */}
            <div className="card group hover:border-space-gold/50 transition-all duration-300">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src="/images/orbital-experience.jpg" 
                  alt="Orbital Experience" 
                  fill 
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-space-blue/20 z-10 group-hover:bg-transparent transition-all duration-300" />
              </div>
              <h3 className="heading-3 mb-2">Orbital Experience</h3>
              <p className="text-space-light mb-4">
                Experience Earth from 400km above, orbiting our planet with breathtaking views.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-space-gold font-display text-xl">From $250,000</span>
                <Link href="/packages/orbital" className="flex items-center text-space-light hover:text-white group-hover:text-space-gold transition-colors">
                  Explore <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Lunar Gateway */}
            <div className="card group hover:border-space-gold/50 transition-all duration-300">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src="/images/lunar-gateway.jpg" 
                  alt="Lunar Gateway" 
                  fill 
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-space-blue/20 z-10 group-hover:bg-transparent transition-all duration-300" />
              </div>
              <h3 className="heading-3 mb-2">Lunar Gateway</h3>
              <p className="text-space-light mb-4">
                Visit the Lunar Gateway station and experience life with a view of both Earth and Moon.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-space-gold font-display text-xl">From $750,000</span>
                <Link href="/packages/lunar" className="flex items-center text-space-light hover:text-white group-hover:text-space-gold transition-colors">
                  Explore <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Mars Flyby */}
            <div className="card group hover:border-space-gold/50 transition-all duration-300">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image 
                  src="/images/mars-flyby.jpg" 
                  alt="Mars Flyby" 
                  fill 
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-space-blue/20 z-10 group-hover:bg-transparent transition-all duration-300" />
              </div>
              <h3 className="heading-3 mb-2">Mars Flyby</h3>
              <p className="text-space-light mb-4">
                The ultimate adventure: a once-in-a-lifetime journey past the Red Planet.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-space-gold font-display text-xl">From $2,500,000</span>
                <Link href="/packages/mars" className="flex items-center text-space-light hover:text-white group-hover:text-space-gold transition-colors">
                  Explore <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-space-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Why Choose Dubai to the Stars</h2>
            <p className="text-space-light max-w-2xl mx-auto">
              Dubai's strategic location, cutting-edge technology, and luxury experience make it
              the perfect launchpad for your journey to space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-space-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                <FiStar className="w-8 h-8 text-space-gold" />
              </div>
              <h3 className="font-display text-xl mb-4">Luxury Experience</h3>
              <p className="text-space-light">
                From pre-flight training to in-space accommodations, experience unparalleled luxury.
              </p>
            </div>

            <div className="glass-panel p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-space-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                <FiClock className="w-8 h-8 text-space-gold" />
              </div>
              <h3 className="font-display text-xl mb-4">Frequent Departures</h3>
              <p className="text-space-light">
                With regular launch schedules, choose the perfect time for your space adventure.
              </p>
            </div>

            <div className="glass-panel p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-space-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                <FiMapPin className="w-8 h-8 text-space-gold" />
              </div>
              <h3 className="font-display text-xl mb-4">Strategic Location</h3>
              <p className="text-space-light">
                Dubai's location provides optimal launch conditions and easy global accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-panel p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Image 
                src="/images/space-hotel.png" 
                alt="Space Hotel"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="heading-2 mb-4">Ready to Make History?</h2>
              <p className="text-space-light max-w-2xl mx-auto mb-8">
                Join the exclusive group of space travelers and be among the first civilians to
                experience the wonders of space travel from Dubai.
              </p>
              <Link href="/booking" className="btn-primary">
                Book Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowRight } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-dark/90 backdrop-blur-lg border-t border-space-light/10 py-12 relative overflow-hidden">
      {/* Stars background effect */}
      <div className="absolute inset-0 space-bg opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/images/space-hotel.png" 
                  alt="Dubai Stars Logo"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Dubai<span className="text-space-gold">Stars</span>
              </span>
            </Link>
            <p className="mt-4 text-space-light">
              The world's first hub for consumer space travel, launching from Dubai.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-space-light hover:text-space-gold transition-colors hover:scale-110 transform inline-block">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-space-light hover:text-space-gold transition-colors hover:scale-110 transform inline-block">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-space-light hover:text-space-gold transition-colors hover:scale-110 transform inline-block">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-space-light hover:text-space-gold transition-colors hover:scale-110 transform inline-block">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-display text-white text-lg mb-4 border-b border-space-light/10 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Destinations</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Packages</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/accommodations" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Accommodations</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-display text-white text-lg mb-4 border-b border-space-light/10 pb-2">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">FAQ</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Terms & Conditions</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-space-light hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                  <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-display text-white text-lg mb-4 border-b border-space-light/10 pb-2">Stay Updated</h3>
            <p className="text-space-light mb-4">
              Subscribe to our newsletter for the latest space travel updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-space-dark/50 border border-space-light/30 rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-space-gold transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-space-blue text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors hover:bg-space-gold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-space-light/10 text-center">
          <div className="text-space-light text-sm">
            &copy; {currentYear} Dubai to the Stars. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}; 
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiCalendar, 
  FiUser, 
  FiCreditCard, 
  FiSettings, 
  FiHelpCircle,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: '/images/avatar-placeholder.jpg'
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navigationItems = [
    { name: 'Overview', path: '/dashboard', icon: FiHome },
    { name: 'My Bookings', path: '/dashboard/bookings', icon: FiCalendar },
    { name: 'Profile', path: '/dashboard/profile', icon: FiUser },
    { name: 'Payment Methods', path: '/dashboard/payment', icon: FiCreditCard },
    { name: 'Settings', path: '/dashboard/settings', icon: FiSettings },
    { name: 'Help & Support', path: '/dashboard/support', icon: FiHelpCircle },
  ];
  
  // Check if the path is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen bg-space-black text-white">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-40">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-space-dark text-white focus:outline-none"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-space-dark border-r border-space-light/10 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-space-light/10">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <Image 
                src="/images/space-hotel.png" 
                alt="Dubai Stars Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-display text-2xl font-bold text-white">
              Dubai<span className="text-space-gold">Stars</span>
            </span>
          </Link>
        </div>
        
        {/* User Info */}
        <div className="p-4 border-b border-space-light/10">
          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image 
                src={userData.profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">{userData.name}</p>
              <p className="text-space-light text-xs">{userData.email}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-space-light/10 text-white'
                    : 'text-space-light hover:bg-space-light/5 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive(item.path) ? 'text-space-gold' : 'text-space-light group-hover:text-white'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="absolute bottom-0 w-full p-4 border-t border-space-light/10">
          <button className="flex items-center w-full px-2 py-2 text-base font-medium text-space-light hover:text-white rounded-md hover:bg-space-light/5 transition-colors">
            <FiLogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="bg-space-black min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout; 
import React, { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';

interface CountdownTimerProps {
  targetDate: Date | string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // To prevent hydration errors, we'll use a mounted state
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure targetDate is a Date object
  const targetDateObj = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  
  useEffect(() => {
    // Set mounted to true
    setIsMounted(true);
    
    // Calculate time difference between now and target date
    const calculateTimeLeft = () => {
      const difference = targetDateObj.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // Target date has passed
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      // Calculate time units
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetDateObj]);
  
  // Format number to always have two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  
  return (
    <div className="countdown-timer">
      <div className="flex items-center justify-center mb-4">
        <FiClock className="text-space-accent mr-2" />
        <h3 className="font-display text-xl">Countdown to Launch</h3>
      </div>
      
      {/* Display launch date in a consistent UTC format */}
      {!isMounted ? (
        <div className="text-center text-space-light mb-4">
          Launch date: {targetDateObj.toUTCString()}
        </div>
      ) : null}
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-space-dark/50 rounded-lg p-3">
          <div className="text-3xl md:text-4xl font-display text-space-accent">
            {formatNumber(timeLeft.days)}
          </div>
          <div className="text-xs uppercase tracking-wider text-space-light mt-1">
            Days
          </div>
        </div>
        
        <div className="bg-space-dark/50 rounded-lg p-3">
          <div className="text-3xl md:text-4xl font-display text-space-accent">
            {formatNumber(timeLeft.hours)}
          </div>
          <div className="text-xs uppercase tracking-wider text-space-light mt-1">
            Hours
          </div>
        </div>
        
        <div className="bg-space-dark/50 rounded-lg p-3">
          <div className="text-3xl md:text-4xl font-display text-space-accent">
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className="text-xs uppercase tracking-wider text-space-light mt-1">
            Minutes
          </div>
        </div>
        
        <div className="bg-space-dark/50 rounded-lg p-3">
          <div className="text-3xl md:text-4xl font-display text-space-accent">
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className="text-xs uppercase tracking-wider text-space-light mt-1">
            Seconds
          </div>
        </div>
      </div>
    </div>
  );
}; 
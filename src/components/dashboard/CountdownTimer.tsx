import React, { useState, useEffect } from 'react';
import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

interface CountdownTimerProps {
  launchDate: Date | string;
  packageName: string;
  destination: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  launchDate,
  packageName,
  destination,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Create a Date object if launchDate is a string
  const launchDateObj = typeof launchDate === 'string' ? new Date(launchDate) : launchDate;
  
  // Use a state variable to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Set mounted state to true
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +launchDateObj - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Launch time has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, [launchDateObj]);

  const formatDate = (date: Date) => {
    // For server-side rendering and initial client render, return a UTC date string
    // This ensures consistent output between server and client
    return date.toUTCString();
  };

  const isPastLaunch = +launchDateObj < +new Date();

  return (
    <div className="card overflow-hidden">
      <div className="bg-space-blue/20 -mx-6 -mt-6 px-6 py-4 mb-6 border-b border-space-blue/30">
        <h3 className="heading-3">Launch Countdown</h3>
      </div>
      
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="flex-1 mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <FiMapPin className="text-space-gold mr-2" />
            <span className="text-space-light">Destination:</span>
            <span className="ml-2 font-medium">{destination}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <FiCalendar className="text-space-gold mr-2" />
            <span className="text-space-light">Launch Date:</span>
            <span className="ml-2 font-medium">{formatDate(launchDateObj)}</span>
          </div>
          
          <div className="flex items-center">
            <FiClock className="text-space-gold mr-2" />
            <span className="text-space-light">Package:</span>
            <span className="ml-2 font-medium">{packageName}</span>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-32 h-32 rounded-full bg-space-dark/50 border-4 border-space-blue flex items-center justify-center">
          {isPastLaunch ? (
            <div className="text-center">
              <div className="text-space-gold text-lg font-display">LAUNCHED</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-space-gold text-3xl font-display">{timeLeft.days}</div>
              <div className="text-space-light text-xs uppercase tracking-wider">Days</div>
            </div>
          )}
        </div>
      </div>
      
      {!isPastLaunch && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="glass-panel p-4 text-center">
            <div className="text-space-gold text-2xl font-display">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-space-light text-xs uppercase tracking-wider">Hours</div>
          </div>
          
          <div className="glass-panel p-4 text-center">
            <div className="text-space-gold text-2xl font-display">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-space-light text-xs uppercase tracking-wider">Minutes</div>
          </div>
          
          <div className="glass-panel p-4 text-center">
            <div className="text-space-gold text-2xl font-display">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-space-light text-xs uppercase tracking-wider">Seconds</div>
          </div>
        </div>
      )}
      
      {isPastLaunch ? (
        <div className="bg-space-blue/20 p-4 rounded-md">
          <p className="text-center text-space-light">
            Your journey has begun! Check your communication device for updates from the crew.
          </p>
        </div>
      ) : (
        <div className="bg-space-blue/20 p-4 rounded-md">
          <p className="text-center text-space-light">
            {timeLeft.days > 30
              ? 'Your space adventure is approaching! Complete your pre-flight checklist to prepare for this extraordinary journey.'
              : timeLeft.days > 7
              ? 'Your launch is getting closer! Make sure to review all pre-flight materials and complete your training.'
              : 'Your launch is imminent! Prepare for departure and follow all pre-boarding instructions.'}
          </p>
        </div>
      )}
    </div>
  );
}; 
// Define the AvailabilityPattern interface locally
interface AvailabilityPattern {
  type: 'regular' | 'limited' | 'seasonal';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate?: string; // Only for seasonal type
  endDate?: string;   // Only for seasonal type
}

interface AvailabilitySlot {
  date: Date;
  status: 'available' | 'limited' | 'sold-out';
  remainingSeats?: number;
}

/**
 * Generates availability slots for a given date range based on the package's availability pattern
 * @param startDate The start date of the range to check
 * @param endDate The end date of the range to check
 * @param availabilityPattern The availability pattern of the package
 * @param maxCapacity The maximum capacity of the package
 * @returns An array of availability slots
 */
export const generateAvailabilitySlots = (
  startDate: Date,
  endDate: Date,
  availabilityPattern: AvailabilityPattern,
  maxCapacity: number
): AvailabilitySlot[] => {
  const slots: AvailabilitySlot[] = [];
  const currentDate = new Date(startDate);
  
  // Helper function to check if a date is within the seasonal range
  const isInSeason = (date: Date, pattern: AvailabilityPattern): boolean => {
    if (pattern.type !== 'seasonal' || !pattern.startDate || !pattern.endDate) {
      return true;
    }
    
    const seasonStart = new Date(pattern.startDate);
    const seasonEnd = new Date(pattern.endDate);
    
    // Check if the month and day are within the season range
    // This ignores the year to allow for recurring seasonal patterns
    const month = date.getMonth();
    const day = date.getDate();
    
    const seasonStartMonth = seasonStart.getMonth();
    const seasonStartDay = seasonStart.getDate();
    
    const seasonEndMonth = seasonEnd.getMonth();
    const seasonEndDay = seasonEnd.getDate();
    
    // Simple case: season is within the same year
    if (seasonStartMonth <= seasonEndMonth) {
      return (
        (month > seasonStartMonth || (month === seasonStartMonth && day >= seasonStartDay)) &&
        (month < seasonEndMonth || (month === seasonEndMonth && day <= seasonEndDay))
      );
    }
    // Complex case: season spans across years (e.g., winter season)
    else {
      return (
        (month > seasonStartMonth || (month === seasonStartMonth && day >= seasonStartDay)) ||
        (month < seasonEndMonth || (month === seasonEndMonth && day <= seasonEndDay))
      );
    }
  };
  
  // Helper function to check if a date matches the frequency pattern
  const matchesFrequency = (date: Date, pattern: AvailabilityPattern): boolean => {
    switch (pattern.frequency) {
      case 'daily':
        return true;
      case 'weekly':
        return date.getDay() === 1; // Monday
      case 'monthly':
        return date.getDate() === 1; // 1st of the month
      case 'quarterly':
        const month = date.getMonth();
        return month === 0 || month === 3 || month === 6 || month === 9; // Jan, Apr, Jul, Oct
      case 'yearly':
        return date.getMonth() === 0 && date.getDate() === 1; // January 1st
      default:
        return false;
    }
  };
  
  // Generate slots for each day in the range
  while (currentDate <= endDate) {
    // Skip dates that don't match the pattern
    if (!isInSeason(currentDate, availabilityPattern) || !matchesFrequency(currentDate, availabilityPattern)) {
      currentDate.setDate(currentDate.getDate() + 1);
      continue;
    }
    
    // For simulation purposes, generate a random availability status
    // In a real app, this would come from a database
    const random = Math.random();
    let status: 'available' | 'limited' | 'sold-out';
    let remainingSeats: number | undefined;
    
    if (availabilityPattern.type === 'regular') {
      // Regular availability has more available slots
      if (random < 0.7) {
        status = 'available';
        remainingSeats = maxCapacity;
      } else if (random < 0.9) {
        status = 'limited';
        remainingSeats = Math.floor(maxCapacity * 0.3);
      } else {
        status = 'sold-out';
      }
    } else if (availabilityPattern.type === 'limited') {
      // Limited availability has fewer available slots
      if (random < 0.4) {
        status = 'available';
        remainingSeats = maxCapacity;
      } else if (random < 0.7) {
        status = 'limited';
        remainingSeats = Math.floor(maxCapacity * 0.2);
      } else {
        status = 'sold-out';
      }
    } else {
      // Seasonal availability varies
      if (random < 0.5) {
        status = 'available';
        remainingSeats = maxCapacity;
      } else if (random < 0.8) {
        status = 'limited';
        remainingSeats = Math.floor(maxCapacity * 0.25);
      } else {
        status = 'sold-out';
      }
    }
    
    slots.push({
      date: new Date(currentDate),
      status,
      remainingSeats,
    });
    
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return slots;
};

/**
 * Checks if a specific date is available for booking
 * @param date The date to check
 * @param availabilityPattern The availability pattern of the package
 * @param maxCapacity The maximum capacity of the package
 * @returns The availability status for the date
 */
export const checkDateAvailability = (
  date: Date,
  availabilityPattern: AvailabilityPattern,
  maxCapacity: number
): AvailabilitySlot | null => {
  // Generate a single day's availability
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  
  const slots = generateAvailabilitySlots(startDate, endDate, availabilityPattern, maxCapacity);
  
  return slots.length > 0 ? slots[0] : null;
}; 
/**
 * Generates a unique booking reference number
 * Format: DTS-XXXXX-XX (where X is alphanumeric)
 */
export const generateBookingReference = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const firstPart = 'DTS';
  let secondPart = '';
  let thirdPart = '';
  
  // Generate 5 characters for the second part
  for (let i = 0; i < 5; i++) {
    secondPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Generate 2 characters for the third part
  for (let i = 0; i < 2; i++) {
    thirdPart += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return `${firstPart}-${secondPart}-${thirdPart}`;
};

/**
 * Formats a price as a currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a date as a readable string
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return 'Not selected';
  
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Calculates the return date based on departure date and duration
 */
export const calculateReturnDate = (departureDate: Date, durationDays: number): Date => {
  const returnDate = new Date(departureDate);
  returnDate.setDate(departureDate.getDate() + durationDays);
  return returnDate;
}; 
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';

interface DatePickerProps {
  availableDates: Date[];
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  availableDates,
  selectedDate,
  onDateSelect
}) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Start with the current month or the month of the first available date
    if (availableDates.length > 0) {
      return new Date(availableDates[0].getFullYear(), availableDates[0].getMonth(), 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get day of week for the first day of the month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Check if a date is in the available dates
  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.getFullYear() === date.getFullYear() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getDate() === date.getDate()
    );
  };
  
  // Check if a date is the selected date
  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    
    return (
      selectedDate.getFullYear() === date.getFullYear() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getDate() === date.getDate()
    );
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };
  
  // Format month name
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Handle date click
  const handleDateClick = (day: number) => {
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    
    if (isDateAvailable(clickedDate)) {
      onDateSelect(clickedDate);
    }
  };
  
  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Create array for days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create array for calendar days
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-10 md:h-12"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isAvailable = isDateAvailable(date);
      const isSelected = isDateSelected(date);
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`h-10 md:h-12 flex items-center justify-center relative ${
            isAvailable 
              ? 'cursor-pointer hover:bg-space-dark/50' 
              : 'text-space-light/40 cursor-not-allowed'
          } ${
            isSelected 
              ? 'bg-space-accent/20 text-space-accent font-medium' 
              : ''
          }`}
          onClick={() => isAvailable && handleDateClick(day)}
        >
          <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
            isSelected ? 'bg-space-accent text-black' : ''
          }`}>
            {day}
          </span>
          
          {isAvailable && !isSelected && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-space-accent rounded-full"></div>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="calendar">
        {/* Calendar header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            className="p-2 rounded-full hover:bg-space-dark/50 transition-colors"
            onClick={goToPreviousMonth}
          >
            <FiChevronLeft />
          </button>
          
          <h3 className="font-display text-lg">
            {formatMonth(currentMonth)}
          </h3>
          
          <button 
            className="p-2 rounded-full hover:bg-space-dark/50 transition-colors"
            onClick={goToNextMonth}
          >
            <FiChevronRight />
          </button>
        </div>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-sm text-space-light font-medium">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays}
        </div>
      </div>
    );
  };
  
  return (
    <div className="date-picker bg-space-dark/30 border border-space-light/20 rounded-lg p-4">
      {renderCalendar()}
      
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-space-light/20 flex items-center">
          <FiCalendar className="text-space-accent mr-2" />
          <span>
            Selected: <strong>{selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</strong>
          </span>
        </div>
      )}
    </div>
  );
}; 
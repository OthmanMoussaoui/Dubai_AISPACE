import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface DatePickerProps {
  selectedPackage: any;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedPackage,
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  // Generate available dates based on the selected package
  useEffect(() => {
    if (!selectedPackage) return;

    // For demo purposes, generate some available dates
    // In a real app, this would come from an API
    const dates: Date[] = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 30); // Earliest booking is 30 days from now

    // Generate dates for the next 6 months
    for (let i = 0; i < 180; i += 2) { // Every other day
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Skip some dates randomly to simulate unavailability
      if (Math.random() > 0.3) {
        dates.push(date);
      }
    }

    setAvailableDates(dates);
  }, [selectedPackage]);

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.getDate() === date.getDate() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date) && !isDateInPast(date)) {
      onDateSelect(date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() - 1);
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + 1);
      return newMonth;
    });
  };

  const renderCalendarHeader = () => {
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-2 rounded-full hover:bg-space-dark/50 transition-colors"
          onClick={goToPreviousMonth}
        >
          <FiChevronLeft />
        </button>
        <h3 className="font-display text-lg">
          {monthName} {year}
        </h3>
        <button
          className="p-2 rounded-full hover:bg-space-dark/50 transition-colors"
          onClick={goToNextMonth}
        >
          <FiChevronRight />
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-sm font-display text-space-light py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    
    const dateFormat = 'numeric';
    const rows = [];
    
    let days = [];
    let day = startDate;
    let formattedDate = '';
    
    // Get the day of the week for the first day of the month
    const startDay = day.getDay();
    
    // Fill in the days from the previous month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-2 px-1">
          <div className="w-10 h-10 mx-auto"></div>
        </div>
      );
    }
    
    // Fill in the days of the current month
    while (day <= endDate) {
      formattedDate = day.toLocaleDateString('en-US', { day: dateFormat });
      const cloneDay = new Date(day);
      
      const isAvailable = isDateAvailable(cloneDay);
      const isSelected = isDateSelected(cloneDay);
      const isPast = isDateInPast(cloneDay);
      
      days.push(
        <div key={day.toString()} className="text-center py-2 px-1">
          <button
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto transition-colors ${
              isSelected
                ? 'bg-space-gold text-space-dark font-medium'
                : isAvailable && !isPast
                ? 'hover:bg-space-blue/50 cursor-pointer'
                : 'text-space-dark/50 cursor-not-allowed'
            }`}
            onClick={() => handleDateClick(cloneDay)}
            disabled={!isAvailable || isPast}
          >
            {formattedDate}
          </button>
        </div>
      );
      
      day = new Date(day);
      day.setDate(day.getDate() + 1);
    }
    
    rows.push(<div key={`row`} className="grid grid-cols-7">{days}</div>);
    
    return <div className="mb-4">{rows}</div>;
  };

  const renderLegend = () => {
    return (
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-space-gold mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full border border-white/30 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-space-dark/50 mr-2"></div>
          <span>Unavailable</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-space-dark/30 p-6 rounded-lg">
      {renderCalendarHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
      {renderLegend()}
      
      <div className="mt-4 p-4 bg-space-blue/20 rounded-md">
        <p className="text-space-light text-sm">
          <strong>Note:</strong> Space flights for {selectedPackage.name} depart every other day, 
          subject to availability. Earliest booking is 30 days from today.
        </p>
      </div>
    </div>
  );
}; 
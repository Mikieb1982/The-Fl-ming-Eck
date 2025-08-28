
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  eventDates: Date[];
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ selectedDate, onDateSelect, eventDates }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));

  const eventTimestamps = new Set(eventDates.map(d => d.getTime()));

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    newDate.setHours(0, 0, 0, 0);
    if (selectedDate && selectedDate.getTime() === newDate.getTime()) {
      onDateSelect(null); // Deselect if clicking the same date
    } else {
      onDateSelect(newDate);
    }
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => changeMonth(-1)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Previous month">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h4 className="font-semibold text-center text-slate-800 dark:text-slate-200">
          {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button onClick={() => changeMonth(1)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Next month">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-slate-500 dark:text-slate-400">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1 mt-1">
        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
        
        {days.map(day => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          date.setHours(0, 0, 0, 0);
          const isSelected = selectedDate?.getTime() === date.getTime();
          const hasEvent = eventTimestamps.has(date.getTime());

          return (
            <div key={day} className="flex justify-center items-center">
              <button
                onClick={() => handleDateClick(day)}
                className={`relative w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}
                  ${!isSelected && hasEvent ? 'text-blue-700 dark:text-blue-400 font-semibold' : ''}
                  ${!isSelected ? 'text-slate-800 dark:text-slate-200' : ''}
                `}
              >
                {day}
                {hasEvent && !isSelected && (
                  <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

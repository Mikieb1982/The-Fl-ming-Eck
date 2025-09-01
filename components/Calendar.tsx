

import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  eventDates: Date[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  todayDate: Date;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ selectedDate, onDateSelect, eventDates, currentMonth, onMonthChange, todayDate }: CalendarProps) {
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
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => changeMonth(-1)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Previous month">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h4 className="font-serif font-bold text-lg text-center text-charcoal dark:text-slate-100">
          {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </h4>
        <button onClick={() => changeMonth(1)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Next month">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 pb-2">
        {dayNames.map(day => <div key={day}>{day.substring(0, 2)}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1 mt-2">
        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
        
        {days.map(day => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          date.setHours(0, 0, 0, 0);
          const isSelected = selectedDate?.getTime() === date.getTime();
          const hasEvent = eventTimestamps.has(date.getTime());
          const isToday = todayDate?.getTime() === date.getTime();

          return (
            <div key={day} className="flex justify-center items-center">
              <button
                onClick={() => handleDateClick(day)}
                className={`relative w-9 h-9 rounded-full text-sm flex items-center justify-center transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 focus:ring-ocean
                  ${isSelected
                    ? 'bg-ocean text-white font-bold shadow-lg scale-110'
                    : `hover:bg-slate-100 dark:hover:bg-zinc-800 ${
                        isToday
                          ? 'bg-sunshine/20 ring-1 ring-sunshine text-yellow-700 dark:text-sunshine font-bold'
                          : hasEvent
                          ? 'text-ocean dark:text-cyan-300 font-semibold'
                          : 'text-charcoal dark:text-seafoam'
                      }`
                  }
                `}
              >
                {day}
                {hasEvent && !isSelected && (
                  <span className="absolute bottom-1.5 w-1.5 h-1.5 bg-ocean-dark rounded-full" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
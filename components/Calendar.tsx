
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
          const isToday = todayDate?.getTime() === date.getTime();

          return (
            <div key={day} className="flex justify-center items-center">
              <button
                onClick={() => handleDateClick(day)}
                className={`relative w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors
                  ${isSelected
                    ? 'bg-brand-green text-white font-bold'
                    : `hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        isToday
                            ? 'ring-2 ring-sandstone-ochre text-sandstone-ochre dark:text-yellow-500 font-bold'
                            : hasEvent
                            ? 'text-brand-green dark:text-green-400 font-semibold'
                            : 'text-slate-800 dark:text-slate-200'
                      }`
                  }
                `}
              >
                {day}
                {hasEvent && !isSelected && (
                  <span className="absolute bottom-1 w-1 h-1 bg-accent-green rounded-full" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

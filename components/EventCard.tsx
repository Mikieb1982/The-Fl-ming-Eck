
import React from 'react';
import ClockIcon from './icons/ClockIcon';
import LocationIcon from './icons/LocationIcon';
import CalendarIcon from './icons/CalendarIcon';

interface EventCardProps {
  eventString: string;
}

type DateParts = {
  type: 'specific';
  day: string;
  month: string;
  full: string;
} | {
  type: 'recurring';
  full: string;
} | {
  type: 'complex';
  full: string;
};

function getDateParts(dateStr: string): DateParts {
    if (dateStr.toLowerCase().startsWith('every')) {
        return { type: 'recurring', full: dateStr };
    }

    const specificDateMatch = dateStr.match(/(\d{1,2})\s+([A-Z]{3})/i);
    if (specificDateMatch) {
        const day = specificDateMatch[1];
        const month = specificDateMatch[2].toUpperCase();
        return { type: 'specific', day, month, full: dateStr };
    }
    
    return { type: 'complex', full: dateStr };
}


export default function EventCard({ eventString }: EventCardProps) {
  const parts = eventString.split('::');
  if (parts.length < 3) {
    return null;
  }

  const [date, time, title, location] = parts.map(p => p.trim());
  const dateParts = getDateParts(date);

  if (!title) {
    return null;
  }

  return (
    <div className="flex gap-4 items-start p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-500">
      
      {/* Date Block */}
      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 flex flex-col items-center justify-center text-center font-bold">
        {dateParts.type === 'specific' ? (
          <>
            <span className="text-2xl text-blue-700 dark:text-blue-400 -mb-1">{dateParts.day}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{dateParts.month}</span>
          </>
        ) : (
          <CalendarIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
        )}
      </div>

      {/* Event Details */}
      <div className="flex-grow pt-1">
        <h4 className="font-serif font-bold text-lg leading-tight text-slate-900 dark:text-slate-100">{title}</h4>
        
        <div className="mt-2 space-y-1.5">
           {dateParts.type !== 'specific' && (
             <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                 <CalendarIcon className="w-4 h-4 shrink-0" />
                 <span>{dateParts.full}</span>
             </div>
           )}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <ClockIcon className="w-4 h-4 shrink-0" />
            <span>{time}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <LocationIcon className="w-4 h-4 shrink-0" />
                <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

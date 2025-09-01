


import React from 'react';
import ClockIcon from './icons/ClockIcon';
import LocationIcon from './icons/LocationIcon';
import CalendarIcon from './icons/CalendarIcon';
import InfoIcon from './icons/InfoIcon';
import SaveToCalendarButton from './SaveToCalendarButton';
import ShareEventButton from './ShareEventButton';

interface EventCardProps {
  eventString: string;
  onSelectArticle?: (id: string) => void;
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


export default function EventCard({ eventString, onSelectArticle }: EventCardProps) {
  if (typeof eventString !== 'string') {
    return null;
  }
  const parts = eventString.split('::');
  if (parts.length < 3) {
    return null;
  }

  const [date, time, title, location, description, ...rest] = parts.map(p => p.trim());
  const dateParts = getDateParts(date);
  const category = (parts.length > 6 && parts[6]) ? parts[6].trim() : null;
  
  const articleIdPart = rest.find(p => p.startsWith('articleId='));
  const articleId = articleIdPart ? articleIdPart.split('=')[1] : null;

  if (!title) {
    return null;
  }
  
  const categoryColorMap: { [key: string]: { bg: string, text: string } } = {
    'Community': { bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-800 dark:text-orange-300' },
    'History': { bg: 'bg-amber-100 dark:bg-amber-900/50', text: 'text-amber-800 dark:text-amber-300' },
    'Culture': { bg: 'bg-rose-100 dark:bg-rose-900/50', text: 'text-rose-800 dark:text-rose-300' },
    'Festival': { bg: 'bg-poppy/10 dark:bg-poppy/20', text: 'text-poppy-dark dark:text-red-300' },
    'Food': { bg: 'bg-sunshine/20 dark:bg-sunshine/30', text: 'text-yellow-700 dark:text-sunshine' },
    'Market': { bg: 'bg-lime-100 dark:bg-lime-900/50', text: 'text-lime-800 dark:text-lime-300' },
    'Tour': { bg: 'bg-teal-100 dark:bg-teal-900/50', text: 'text-teal-800 dark:text-teal-300' },
    'Film': { bg: 'bg-indigo-100 dark:bg-indigo-900/50', text: 'text-indigo-800 dark:text-indigo-300' },
    'Museum': { bg: 'bg-fuchsia-100 dark:bg-fuchsia-900/50', text: 'text-fuchsia-800 dark:text-fuchsia-300' },
    'Art': { bg: 'bg-violet-100 dark:bg-violet-900/50', text: 'text-violet-800 dark:text-violet-300' },
    'Family': { bg: 'bg-sky-100 dark:bg-sky-900/50', text: 'text-sky-800 dark:text-sky-300' },
    'Music': { bg: 'bg-cyan-100 dark:bg-cyan-900/50', text: 'text-cyan-800 dark:text-cyan-300' },
    'Sport': { bg: 'bg-emerald-100 dark:bg-emerald-900/50', text: 'text-emerald-800 dark:text-emerald-300' },
    'Wellness': { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-300' },
    'default': { bg: 'bg-slate-100 dark:bg-slate-700', text: 'text-slate-800 dark:text-slate-200' }
  };
  const categoryClasses = category ? (categoryColorMap[category] || categoryColorMap['default']) : categoryColorMap['default'];

  const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow standard browser behavior for new tabs (middle-click, ctrl/cmd-click)
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    e.stopPropagation(); // Prevent card click event if nested
    if (onSelectArticle && articleId) {
      onSelectArticle(articleId);
    }
  };


  return (
    <div className="flex gap-4 items-start p-3 rounded-xl bg-white dark:bg-zinc-800 border border-transparent transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-poppy dark:hover:border-poppy">
      
      {/* Date Block */}
      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-ocean/20 dark:bg-ocean/30 flex flex-col items-center justify-center text-center font-bold shadow-sm">
        {dateParts.type === 'specific' ? (
          <>
            <span className="text-2xl text-ocean-dark dark:text-cyan-400 -mb-1">{dateParts.day}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{dateParts.month}</span>
          </>
        ) : (
          <CalendarIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
        )}
      </div>

      {/* Event Details */}
      <div className="flex-grow pt-1">
        {category && (
          <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${categoryClasses.bg} ${categoryClasses.text}`}>
            {category}
          </span>
        )}
        <h4 className="font-serif font-bold text-lg leading-tight text-charcoal dark:text-slate-100">{title}</h4>
        
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

        <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/50">
            <div>
                {articleId && onSelectArticle && (
                <a 
                    href={`/#/article/${articleId}`}
                    onClick={handleArticleClick}
                    className="flex items-center gap-1.5 text-xs font-semibold text-ocean hover:underline"
                    title="Read related guide"
                >
                    <InfoIcon className="w-4 h-4" />
                    <span>Read Guide</span>
                </a>
                )}
            </div>
            <div className="flex items-center gap-1">
                <ShareEventButton eventString={eventString} />
                <SaveToCalendarButton eventString={eventString} />
            </div>
        </div>
      </div>
    </div>
  );
}
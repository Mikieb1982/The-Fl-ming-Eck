import React from 'react';
import { eventCategoryStyleMap } from '../constants';
import ClockIcon from './icons/ClockIcon';
import LocationIcon from './icons/LocationIcon';
import CalendarIcon from './icons/CalendarIcon';
import InfoIcon from './icons/InfoIcon';
import SaveToCalendarButton from './SaveToCalendarButton';
import ShareEventButton from './ShareEventButton';
import UsersIcon from './icons/UsersIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import PaletteIcon from './icons/PaletteIcon';
import SparklesIcon from './icons/SparklesIcon';
import UtensilsIcon from './icons/UtensilsIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import CameraIcon from './icons/CameraIcon';
import LeafIcon from './icons/LeafIcon';
import RunningIcon from './icons/RunningIcon';
import HeartIcon from './icons/HeartIcon';
// FIX: Import the MusicNoteIcon component to resolve 'Cannot find name' error.
import MusicNoteIcon from './icons/MusicNoteIcon';


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

const categoryIconMap: { [key: string]: React.ReactNode } = {
    'Community': <UsersIcon className="w-4 h-4" />,
    'History': <BookOpenIcon className="w-4 h-4" />,
    'Culture': <PaletteIcon className="w-4 h-4" />,
    'Festival': <SparklesIcon className="w-4 h-4" />,
    'Food': <UtensilsIcon className="w-4 h-4" />,
    'Market': <ShoppingBagIcon className="w-4 h-4" />,
    'Tour': <LocationIcon className="w-4 h-4" />,
    'Film': <CameraIcon className="w-4 h-4" />,
    'Museum': <BookOpenIcon className="w-4 h-4" />,
    'Art': <PaletteIcon className="w-4 h-4" />,
    'Family': <UsersIcon className="w-4 h-4" />,
    'Music': <MusicNoteIcon className="w-4 h-4" />,
    'Sport': <RunningIcon className="w-4 h-4" />,
    'Wellness': <HeartIcon className="w-4 h-4" />,
    'Nature': <LeafIcon className="w-4 h-4" />,
};


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
  
  const categoryClasses = category ? (eventCategoryStyleMap[category] || eventCategoryStyleMap['default']) : eventCategoryStyleMap['default'];
  const categoryIcon = category ? categoryIconMap[category] : null;

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
    <div className="flex gap-4 items-start p-3 rounded-xl bg-white dark:bg-slate-800 border border-transparent transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:border-poppy dark:hover:border-poppy">
      
      {/* Date Block */}
      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-ocean/20 dark:bg-ocean/30 flex flex-col items-center justify-center text-center font-bold shadow-sm">
        {dateParts.type === 'specific' ? (
          <>
            <span className="text-2xl text-ocean-dark dark:text-cyan-400 -mb-1">{dateParts.day}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-300">{dateParts.month}</span>
          </>
        ) : (
          <CalendarIcon className="w-8 h-8 text-slate-500 dark:text-slate-400" />
        )}
      </div>

      {/* Event Details */}
      <div className="flex-grow pt-1">
        {category && (
          <div className={`inline-flex items-center gap-2 px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${categoryClasses.bg} ${categoryClasses.text}`}>
            {categoryIcon}
            <span>{category}</span>
          </div>
        )}
        <h4 className="font-serif font-bold text-lg leading-tight text-charcoal dark:text-slate-100">{title}</h4>
        
        <div className="mt-2 space-y-1.5">
           {dateParts.type !== 'specific' && (
             <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                 <CalendarIcon className="w-4 h-4 shrink-0" />
                 <span>{dateParts.full}</span>
             </div>
           )}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <ClockIcon className="w-4 h-4 shrink-0" />
            <span>{time}</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
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
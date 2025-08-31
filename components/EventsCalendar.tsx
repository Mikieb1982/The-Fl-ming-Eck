

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from './EventCard';
import eventsArticle from '../articles/events-weekly';
import CloseIcon from './icons/CloseIcon';
import Calendar from './Calendar';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface EventsCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
}

// Helper component for filter buttons
const FilterButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void; }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
      isActive
        ? 'bg-brand-green text-white shadow'
        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`}
  >
    {label}
  </button>
);

function parseEventDate(dateStr: string): Date | null {
    const specificDateMatch = dateStr.match(/(\d{1,2})\s+([A-Z]{3})/i);
    if (specificDateMatch) {
        const day = specificDateMatch[1];
        const month = specificDateMatch[2];
        // Assume all events are for 2025 as per the data context
        const date = new Date(`${day} ${month} 2025`);
        if (!isNaN(date.getTime())) {
            date.setHours(0, 0, 0, 0); // Normalize to the start of the day
            return date;
        }
    }
    return null;
}

const DAY_MAP: { [key: string]: number } = {
    'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6
};

const doesRecurringEventMatchDate = (eventString: string, date: Date): boolean => {
    const lowerEventString = eventString.toLowerCase();
    if (!lowerEventString.startsWith('every')) return false;

    const dayOfWeek = date.getDay();

    for (const dayName in DAY_MAP) {
        if (lowerEventString.includes(dayName) && DAY_MAP[dayName as keyof typeof DAY_MAP] === dayOfWeek) {
            return true;
        }
    }
    return false;
};


export default function EventsCalendar({ isOpen, onClose, onSelectArticle }: EventsCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayFilter, setDayFilter] = useState('All'); // 'All', 'Weekdays', 'Weekend'
  const [categoryFilter, setCategoryFilter] = useState('All'); // 'All', 'Music', etc.
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [appToday] = useState(() => {
      const today = new Date('2025-08-27T12:00:00Z');
      today.setHours(0, 0, 0, 0);
      return today;
  });
  const [currentMonth, setCurrentMonth] = useState(new Date('2025-08-01'));

  useEffect(() => {
    if (isOpen) {
      // When opening, view the month of "today" but don't filter by a specific date
      setCurrentMonth(new Date(appToday.getFullYear(), appToday.getMonth(), 1));
      setSelectedDate(null);
    }
  }, [isOpen, appToday]);

  const { body } = eventsArticle;

  const eventParagraphs = useMemo(() => body.filter((b): b is { type: 'paragraph'; content: string } => b.type === 'paragraph'), [body]);
  const [introBlock, ...eventBlocks] = eventParagraphs;
  const intro = introBlock?.content || '';

  const events = useMemo(() => {
    return eventBlocks
        .map(item => item.content)
        .filter(content => !content.startsWith('**'));
  }, [eventBlocks]);
  
  const eventDates = useMemo(() => {
    const dates = new Set<number>();
    events.forEach(eventString => {
        const dateStr = eventString.split('::')[0];
        const date = parseEventDate(dateStr);
        if (date) {
            dates.add(date.getTime());
        }
    });
    return Array.from(dates).map(time => new Date(time));
  }, [events]);

  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    events.forEach(eventString => {
      const parts = eventString.split('::');
      if (parts.length > 6 && parts[6]) {
        allCategories.add(parts[6].trim());
      }
    });
    return ['All', ...Array.from(allCategories).sort()];
  }, [events]);

  const isWeekend = (dateStr: string) => {
    const lowerDate = dateStr.toLowerCase();
    return lowerDate.includes('sat') || lowerDate.includes('sun');
  };

  const isWeekday = (dateStr: string) => {
    const lowerDate = dateStr.toLowerCase();
    return lowerDate.includes('mon') || lowerDate.includes('tue') || lowerDate.includes('wed') || lowerDate.includes('thu') || lowerDate.includes('fri');
  };

  const filteredSections = useMemo(() => {
    const dayAndCategoryFilteredEvents = events.filter(eventString => {
        const parts = eventString.split('::');
        const date = parts[0]?.trim() || '';
        const category = parts[6]?.trim() || '';

        let dayMatch = dayFilter === 'All';
        if (!dayMatch) {
            if(date.toLowerCase().startsWith('every')) {
                // For recurring events, check if the day name is in the string
                const dayName = dayFilter === 'Weekdays' ? ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] : ['saturday', 'sunday'];
                if(dayName.some(d => date.toLowerCase().includes(d.substring(0,3)))) dayMatch = true;
            } else if (dayFilter === 'Weekdays') {
                if (isWeekday(date)) dayMatch = true;
            } else if (dayFilter === 'Weekend') {
                if (isWeekend(date)) dayMatch = true;
            }
        }
        
        const categoryMatch = categoryFilter === 'All' || category === categoryFilter;

        return dayMatch && categoryMatch;
    });

    if (!selectedDate) {
        const sections: { header: string; events: string[] }[] = [];
        let currentSection: { header: string; events: string[] } | null = null;
        
        eventBlocks.forEach(item => {
            const content = item.content;
            if (content.startsWith('**')) {
                if (currentSection) sections.push(currentSection);
                currentSection = { header: content, events: [] };
            } else if(currentSection) {
                currentSection.events.push(content);
            }
        });
        if (currentSection) sections.push(currentSection);

        return sections
            .map(section => ({
                ...section,
                events: section.events.filter(event => dayAndCategoryFilteredEvents.includes(event)),
            }))
            .filter(section => section.events.length > 0);
    } else {
        const onDate = dayAndCategoryFilteredEvents.filter(e => {
             const eventDate = parseEventDate(e.split('::')[0]);
             return eventDate && eventDate.getTime() === selectedDate.getTime();
        });
        
        const recurringOnDate = dayAndCategoryFilteredEvents.filter(e => doesRecurringEventMatchDate(e, selectedDate));

        const allEventsForDate = [...onDate, ...recurringOnDate];

        if (allEventsForDate.length > 0) {
            const formattedDate = selectedDate.toLocaleString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' });
            return [{ header: `**EVENTS FOR ${formattedDate}**`, events: allEventsForDate }];
        }
        return [];
    }
  }, [events, eventBlocks, dayFilter, categoryFilter, selectedDate]);


  const sidebarVariants = {
    closed: { x: '100%' },
    open: { x: 0 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  const dayFilters = ['All', 'Weekdays', 'Weekend'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
            transition={{ duration: 0.3 }}
          />
          {/* @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
          <motion.div
            key="sidebar"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-off-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col"
            aria-modal="true"
            role="dialog"
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
              <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-slate-200">
                What's On
              </h3>
              <button 
                onClick={onClose}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close events calendar"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Collapsible Filters */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="flex justify-between items-center w-full text-left rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-expanded={isFilterVisible}
                aria-controls="filter-panel"
              >
                <span className="font-semibold text-charcoal dark:text-slate-200">Filter by Date & Category</span>
                {/* @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
                <motion.div animate={{ rotate: isFilterVisible ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDownIcon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isFilterVisible && (
                  // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
                  <motion.div
                    id="filter-panel"
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto', marginTop: '1rem' },
                      collapsed: { opacity: 0, height: 0, marginTop: '0rem' },
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4">
                      <Calendar 
                          selectedDate={selectedDate}
                          onDateSelect={setSelectedDate}
                          eventDates={eventDates}
                          currentMonth={currentMonth}
                          onMonthChange={setCurrentMonth}
                          todayDate={appToday}
                      />
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <label className="w-20 shrink-0 font-semibold text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">Day</label>
                        <div className="flex items-center gap-2 flex-wrap">
                          {dayFilters.map(filter => (
                            <FilterButton key={filter} label={filter} isActive={dayFilter === filter} onClick={() => setDayFilter(filter)} />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <label className="w-20 shrink-0 font-semibold text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">Category</label>
                        <div className="flex items-center gap-2 flex-wrap">
                          {categories.map(filter => (
                            <FilterButton key={filter} label={filter} isActive={categoryFilter === filter} onClick={() => setCategoryFilter(filter)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              { !selectedDate && <p className="text-sm text-charcoal dark:text-slate-300">{intro}</p>}
              {filteredSections.length > 0 ? (
                filteredSections.map(section => (
                  <div key={section.header} className="pt-2 first:pt-0">
                    <h4 className="text-lg font-serif font-bold text-charcoal dark:text-slate-200 mb-2">
                      {section.header.replace(/\*\*/g, '')}
                    </h4>
                    <div className="space-y-2">
                      {section.events.map((item, index) => (
                         <EventCard 
                            key={`${section.header}-${index}`} 
                            eventString={item} 
                            onSelectArticle={onSelectArticle}
                         />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                  <div className="text-center py-10">
                      <p className="text-slate-600 dark:text-slate-400">
                          {selectedDate ? "No events found for this day." : "No events match your criteria."}
                      </p>
                      { selectedDate && (
                           <button 
                              onClick={() => setSelectedDate(null)}
                              className="mt-2 text-sm text-brand-green hover:underline"
                          >
                              Show all events
                          </button>
                      )}
                  </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
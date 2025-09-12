import React, { useMemo } from 'react';
import eventsArticle from '../articles/events-weekly';
import { eventCategoryStyleMap } from '../constants';
import ClockIcon from './icons/ClockIcon';
import LocationIcon from './icons/LocationIcon';
import { ArticleBodyBlock } from '../types';

// A simplified parser for this component
function parseSimpleEvent(eventString: string) {
    const parts = eventString.split('::').map(p => p.trim());
    if (parts.length < 4) return null;
    return {
        date: parts[0],
        time: parts[1],
        title: parts[2],
        location: parts[3],
        description: parts[4],
        category: parts.length > 6 ? parts[6] : null,
    };
}

// Function to parse date string into a Date object for sorting
function getEventDate(dateStr: string): Date | null {
    const specificDateMatch = dateStr.match(/(\d{1,2})\s+([A-Z]{3})/i);
    if (specificDateMatch) {
        const day = specificDateMatch[1];
        const month = specificDateMatch[2];
        // Assume all events are for 2025 as per the data context
        const date = new Date(`${day} ${month} 2025`);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    return null;
}


export default function ScheduleBand() {
    const appToday = useMemo(() => {
        const today = new Date('2025-08-27T12:00:00Z');
        today.setHours(0, 0, 0, 0);
        return today;
    }, []);

    const upcomingEvents = useMemo(() => {
        const eventBlocks = eventsArticle.body
            // FIX: Use a type guard to ensure 'b' is a paragraph block before accessing 'b.content'.
            .filter((b): b is { type: 'paragraph'; content: string } => b.type === 'paragraph')
            .filter(b => !b.content.startsWith('**') && !b.content.toLowerCase().includes('every'))
            .map(b => b.content);

        return eventBlocks
            .map(parseSimpleEvent)
            .filter(event => {
                if (!event) return false;
                const eventDate = getEventDate(event.date);
                return eventDate && eventDate >= appToday;
            })
            .sort((a, b) => {
                const dateA = getEventDate(a!.date);
                const dateB = getEventDate(b!.date);
                if (!dateA || !dateB) return 0;
                return dateA.getTime() - dateB.getTime();
            })
            .slice(0, 5); // Take the next 5 events
    }, [appToday]);

    if (upcomingEvents.length === 0) {
        return null;
    }

    return (
        <div className="my-12">
            <h2 className="text-xl font-serif font-bold text-charcoal dark:text-slate-200 mb-4 text-center">
                What's On Deck
            </h2>
            <div className="relative">
                <div className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory">
                    {upcomingEvents.map((event, index) => {
                        if (!event) return null;
                        const categoryClasses = event.category ? (eventCategoryStyleMap[event.category] || eventCategoryStyleMap['default']) : eventCategoryStyleMap['default'];
                        return (
                            <div
                                key={index}
                                className="flex-shrink-0 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-slate-200 dark:border-slate-700 snap-center"
                            >
                                {event.category && (
                                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${categoryClasses.bg} ${categoryClasses.text}`}>
                                        {event.category}
                                    </span>
                                )}
                                <p className="text-sm font-bold text-ocean dark:text-cyan-400">{event.date}</p>
                                <h3 className="mt-1 font-serif font-semibold text-charcoal dark:text-slate-100 truncate">{event.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{event.description}</p>
                                <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="w-3 h-3" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <LocationIcon className="w-3 h-3" />
                                        <span className="truncate">{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
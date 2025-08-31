

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseEventString, generateGoogleCalendarUrl, generateIcsContent, downloadIcsFile, CalendarEvent } from '../utils/calendar';
import CalendarPlusIcon from './icons/CalendarPlusIcon';

interface SaveToCalendarButtonProps {
    eventString: string;
}

export default function SaveToCalendarButton({ eventString }: SaveToCalendarButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState<CalendarEvent | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parsedEvent = parseEventString(eventString);
        setEvent(parsedEvent);
    }, [eventString]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    if (!event || !event.startTime) {
        return null; // Don't render the button if the event can't be parsed into a calendar entry
    }

    const googleLink = generateGoogleCalendarUrl(event);
    const filename = event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    const handleIcsDownload = () => {
        const icsContent = generateIcsContent(event);
        if (icsContent) {
            downloadIcsFile(icsContent, filename);
        }
        setIsOpen(false);
    };

    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <div className="relative inline-block text-left" ref={wrapperRef}>
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    title="Add to calendar"
                >
                    <CalendarPlusIcon className="w-5 h-5" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    // FIX: Suppress TypeScript error. The framer-motion props are not recognized in this environment.
                    // @ts-ignore
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none z-10"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="py-1" role="none">
                            {googleLink && (
                                <a
                                    href={googleLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-700 dark:text-slate-300 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                    role="menuitem"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Google Calendar
                                </a>
                            )}
                            <button
                                onClick={handleIcsDownload}
                                className="w-full text-left text-slate-700 dark:text-slate-300 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                role="menuitem"
                            >
                                Apple Calendar
                            </button>
                             <button
                                onClick={handleIcsDownload}
                                className="w-full text-left text-slate-700 dark:text-slate-300 block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                role="menuitem"
                            >
                                Outlook (.ics)
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
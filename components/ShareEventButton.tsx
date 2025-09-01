


import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseEventString, CalendarEvent } from '../utils/calendar';
import ShareIcon from './icons/ShareIcon';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import EmailIcon from './icons/EmailIcon';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface ShareEventButtonProps {
    eventString: string;
}

export default function ShareEventButton({ eventString }: ShareEventButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState<CalendarEvent | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parsedEvent = parseEventString(eventString);
        setEvent(parsedEvent);
    }, [eventString]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    if (!event) return null;

    const shareUrl = `${window.location.origin}/#/calendar`;
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const eventDate = event.startTime ? new Date(event.startTime).toLocaleDateString('en-GB', dateOptions) : '';
    
    const socialShareText = `Event in Bad Belzig: ${event.title} on ${eventDate}.`; 
    const fullShareText = `Check out this event: ${event.title} on ${eventDate} in Bad Belzig. See more at The Fläming Eck: ${shareUrl}`;
    const emailBody = `Check out this event: ${event.title} on ${eventDate} in Bad Belzig.\n\nFind more details on the events calendar:\n${shareUrl}`;
    
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedSocialText = encodeURIComponent(socialShareText);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullShareText).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    };
    
    const platforms = [
      { name: 'Twitter', icon: <TwitterIcon className="w-5 h-5" />, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedSocialText}` },
      { name: 'Facebook', icon: <FacebookIcon className="w-5 h-5" />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedSocialText}` },
      { name: 'Email', icon: <EmailIcon className="w-5 h-5" />, url: `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(emailBody)}` },
    ];
    
    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <div className="relative inline-block text-left" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-haspopup="true" aria-expanded={isOpen} title="Share event"
            >
                <ShareIcon className="w-5 h-5" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    // FIX: Suppress TypeScript error. The framer-motion props are not recognized in this environment.
                    // @ts-ignore
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden" animate="visible" exit="hidden"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none z-10"
                    >
                        <div className="p-2">
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 pb-1">Share event</p>
                          <div className="flex items-center justify-around">
                            {platforms.map((p) => (
                              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {p.icon}
                              </a>
                            ))}
                            <button onClick={handleCopy} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                                {isCopied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
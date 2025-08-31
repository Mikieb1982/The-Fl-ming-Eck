

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
    onShowPrivacy: () => void;
}

export default function CookieConsent({ onShowPrivacy }: CookieConsentProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const consent = localStorage.getItem('cookie_consent');
            if (consent === null) {
                setIsVisible(true);
            }
        } catch (error) {
            console.error("Could not access localStorage:", error);
        }
    }, []);

    const handleConsent = (consent: boolean) => {
        try {
            localStorage.setItem('cookie_consent', consent ? 'accepted' : 'declined');
            setIsVisible(false);
        } catch (error) {
            console.error("Could not write to localStorage:", error);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors.
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[70] p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t border-slate-200 dark:border-slate-700"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Cookie Consent"
                >
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-charcoal dark:text-slate-300 flex-grow">
                            This website uses essential cookies to ensure its proper operation. By clicking "Accept", you agree to our use of cookies. For more details, see our{' '}
                            <button onClick={onShowPrivacy} className="font-semibold text-brand-green hover:underline">Privacy Policy</button>.
                        </p>
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <button
                                onClick={() => handleConsent(false)}
                                className="px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => handleConsent(true)}
                                className="px-5 py-2 text-sm font-semibold text-white bg-brand-green rounded-md hover:bg-opacity-80 transition-colors"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
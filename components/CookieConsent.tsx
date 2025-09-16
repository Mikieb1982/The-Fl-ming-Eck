


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
    onShowPrivacy: () => void;
}

// FIX: Type error with framer-motion props. Casting motion component to `any` to bypass type checking issues.
const MotionDiv = motion.div as any;

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
                <MotionDiv
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    className="fixed bottom-4 left-4 z-[70] w-full max-w-md p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700"
                    role="dialog"
                    aria-live="polite"
                    aria-label="Cookie Consent"
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="font-bold font-serif text-charcoal dark:text-slate-200">Cookie Consent</h3>
                            <p className="text-sm text-charcoal dark:text-seafoam mt-1">
                                We use essential cookies to improve your experience. For more details, see our{' '}
                                <button onClick={onShowPrivacy} className="font-semibold text-ocean hover:underline">Privacy Policy</button>.
                            </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center justify-end gap-3">
                            <button
                                onClick={() => handleConsent(false)}
                                className="px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => handleConsent(true)}
                                className="px-5 py-2 text-sm font-semibold text-white bg-ocean rounded-md hover:bg-opacity-80 transition-colors"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </MotionDiv>
            )}
        </AnimatePresence>
    );
}

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import DesktopIcon from './icons/DesktopIcon';
import CheckIcon from './icons/CheckIcon';

export default function ThemeToggle() {
    const { theme, themeSetting, setThemeSetting } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    const options = [
        { setting: 'light', label: 'Light', icon: <SunIcon className="w-5 h-5" /> },
        { setting: 'dark', label: 'Dark', icon: <MoonIcon className="w-5 h-5" /> },
        { setting: 'system', label: 'System', icon: <DesktopIcon className="w-5 h-5" /> },
    ];

    const currentIcon = theme === 'light' 
        ? <SunIcon className="w-5 h-5" /> 
        : <MoonIcon className="w-5 h-5" />;

    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <div className="relative inline-block text-left" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
                title={`Change theme (current: ${themeSetting})`}
            >
                {currentIcon}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none z-10"
                    >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {options.map(option => (
                                <button
                                    key={option.setting}
                                    onClick={() => {
                                        setThemeSetting(option.setting as any);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left flex items-center justify-between text-slate-700 dark:text-slate-300 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                                    role="menuitem"
                                >
                                    <div className="flex items-center gap-2">
                                        {option.icon}
                                        <span>{option.label}</span>
                                    </div>
                                    {themeSetting === option.setting && <CheckIcon className="w-5 h-5 text-brand-green" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
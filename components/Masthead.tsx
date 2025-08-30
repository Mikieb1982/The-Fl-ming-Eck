
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BRAND } from '../constants';
import ThemeToggle from './ThemeToggle';
import WeatherWidget from './WeatherWidget';
import { useUser } from '../context/UserContext';
import LoginIcon from './icons/LoginIcon';
import LogoutIcon from './icons/LogoutIcon';

interface MastheadProps {
  onGoHome: () => void;
  isScrolled?: boolean;
}

const UserProfile = () => {
    const { user, signOut } = useUser();
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
    
    if (!user) return null;

    return (
        <div className="relative" ref={wrapperRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="User menu"
            >
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-semibold text-charcoal dark:text-slate-200 hidden sm:inline">{user.name}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-40"
                    >
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                            >
                                <LogoutIcon className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default function Masthead({ onGoHome, isScrolled = false }: MastheadProps) {
    const { user, signIn, isLoading } = useUser();

    const AuthControl = () => {
      if (isLoading) {
          return <div className="w-10 sm:w-24 h-10 bg-slate-200 dark:bg-slate-700 rounded-full sm:rounded-lg animate-pulse" />;
      }
      if (user) {
          return <UserProfile />;
      }
      return (
         <button 
            onClick={signIn}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-light-grey dark:hover:bg-slate-700 transition-colors"
        >
            <LoginIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Sign In</span>
        </button>
      );
  };

  const Logo = () => (
    <button onClick={onGoHome} className="transition-transform duration-300 hover:scale-[1.02]">
      <h1 className="sr-only">{BRAND.title}</h1>
      <img
        src="https://i.imgur.com/ZxROFuO.png"
        alt={BRAND.title}
        className={`h-auto dark:invert transition-all duration-300 ${isScrolled ? 'w-64 lg:w-80' : 'w-72 lg:w-96'}`}
      />
    </button>
  );

  return (
    <header className="py-4 relative">
      {/* Mobile Theme Toggle in corner */}
      <div className="absolute top-4 right-4 md:hidden">
        <ThemeToggle />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center">
        <div className="flex-1 flex justify-start">
          <WeatherWidget />
        </div>
        <div className="flex-shrink-0 px-4">
          <Logo />
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <AuthControl />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center gap-6">
        <div className="pt-4">
            <Logo />
        </div>
        <div className="flex items-center justify-between w-full px-4">
            <WeatherWidget />
            <AuthControl />
        </div>
      </div>
    </header>
  );
}
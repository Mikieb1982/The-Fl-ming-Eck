import React from 'react';
import { BRAND } from '../constants';
import ThemeToggle from './ThemeToggle';
import WeatherWidget from './WeatherWidget';
import SearchIcon from './icons/SearchIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';

interface MastheadProps {
  onGoHome: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCalendar: () => void;
}

export default function Masthead({ onGoHome, searchQuery, onSearchChange, onOpenCalendar }: MastheadProps) {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-blue-700 dark:border-blue-400 py-4">
      {/* Logo Section */}
      <div className="shrink-0">
        <button onClick={onGoHome} className="transition-transform duration-300 hover:scale-[1.02]">
            <h1 className="sr-only">{BRAND.title}</h1>
            <img 
              src="https://i.imgur.com/ZxROFuO.png" 
              alt={BRAND.title} 
              className="h-16 lg:h-20 w-auto dark:invert transition-all duration-300" 
            />
        </button>
      </div>
      
      {/* Controls Section */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
        <WeatherWidget />
        
        {/* Search bar */}
        <div className="w-full sm:w-auto sm:max-w-xs">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="search"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full rounded-full border-0 bg-slate-100 dark:bg-slate-800 py-2.5 pl-11 pr-4 text-slate-800 dark:text-slate-300 ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm transition-colors"
              placeholder="Search articles..."
              aria-label="Search articles"
            />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={onOpenCalendar}
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
            aria-label="Open events calendar"
          >
            <CalendarDaysIcon className="w-5 h-5" />
            <span className="hidden sm:inline">What's On</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import ThemeToggle from './ThemeToggle';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import UsersIcon from './icons/UsersIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import LogoutIcon from './icons/LogoutIcon';
import CloseIcon from './icons/CloseIcon';
import Logo from './icons/Logo';
import SearchIcon from './icons/SearchIcon';
import BookmarkIcon from './icons/BookmarkIcon';

interface HeaderProps {
    onGoHome: () => void;
    onToggleCalendar: () => void;
    onToggleCommunity: () => void;
    onToggleDirectory: () => void;
    onToggleBookmarks: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function Header({ onGoHome, onToggleCalendar, onToggleCommunity, onToggleDirectory, onToggleBookmarks, searchQuery, onSearchChange }: HeaderProps) {
    const { user, signOut, isLoading } = useUser();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const navItems = [
        { label: 'What\'s On', icon: <CalendarDaysIcon className="w-6 h-6" />, action: onToggleCalendar },
        { label: 'Community', icon: <UsersIcon className="w-6 h-6" />, action: onToggleCommunity },
        { label: 'Directory', icon: <BuildingOfficeIcon className="w-6 h-6" />, action: onToggleDirectory },
        { label: 'Bookmarks', icon: <BookmarkIcon className="w-6 h-6" />, action: onToggleBookmarks },
    ];
    
    const navButtonClasses = "flex items-center gap-2 px-2 py-2 text-sm font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors";
    
    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        onSearchChange('');
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseSearch();
            }
        };
        if (isSearchOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSearchOpen]);

    return (
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-charcoal/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex items-center justify-between h-24 md:h-28">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button 
                            onClick={onGoHome} 
                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal focus-visible:ring-sandstone-ochre rounded-md" 
                            aria-label="Go to homepage"
                        >
                            <Logo className="h-16 md:h-20 w-auto text-charcoal dark:text-slate-200" />
                        </button>
                    </div>

                    {/* Navigation & Controls */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <nav className="flex items-center gap-1 sm:gap-2">
                            {navItems.map(item => (
                                <button key={item.label} onClick={item.action} className={navButtonClasses} title={item.label}>
                                    {item.icon}
                                    <span className="hidden lg:inline">{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 sm:mx-2" />
                        
                        <div className="flex items-center gap-1 sm:gap-2">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Open search"
                            >
                                <SearchIcon className="w-5 h-5" />
                            </button>
                            
                            <ThemeToggle />

                            <div className="relative">
                                {user ? (
                                    <div className="flex items-center gap-2">
                                        <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                                        <button onClick={signOut} className={navButtonClasses} title="Sign Out">
                                            <LogoutIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                    !isLoading && (
                                        <div id="g_id_signin" 
                                            data-type="icon" 
                                            data-shape="circle" 
                                            data-theme="outline" 
                                            data-text="signin_with" 
                                            data-size="large">
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 h-24 md:h-28 bg-white/95 dark:bg-charcoal/95 backdrop-blur-sm z-10"
                    >
                        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full">
                            <div className="flex items-center h-full gap-4">
                                <SearchIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                <input
                                    ref={searchInputRef}
                                    type="search"
                                    placeholder="Search for articles, guides, and events..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full bg-transparent border-none focus:ring-0 text-lg text-charcoal dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                                />
                                <button
                                    onClick={handleCloseSearch}
                                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                                    aria-label="Close search"
                                >
                                    <CloseIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
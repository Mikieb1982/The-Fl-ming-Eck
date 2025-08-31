import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import ThemeToggle from './ThemeToggle';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import UsersIcon from './icons/UsersIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import LogoutIcon from './icons/LogoutIcon';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import Logo from './icons/Logo';
import SearchIcon from './icons/SearchIcon';

interface HeaderProps {
    onGoHome: () => void;
    onToggleCalendar: () => void;
    onToggleCommunity: () => void;
    onToggleDirectory: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function Header({ onGoHome, onToggleCalendar, onToggleCommunity, onToggleDirectory, searchQuery, onSearchChange }: HeaderProps) {
    const { user, signOut, isLoading } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    ];
    
    const desktopNavButtonClasses = "flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors";
    
    const handleMobileNavClick = (action: () => void) => {
        setIsMobileMenuOpen(false);
        action();
    }
    
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
    }, [isSearchOpen, onSearchChange]);

    return (
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-charcoal/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button 
                            onClick={onGoHome} 
                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal focus-visible:ring-sandstone-ochre rounded-md" 
                            aria-label="Go to homepage"
                        >
                            <Logo className="h-9 md:h-10 w-auto text-charcoal dark:text-slate-200" />
                        </button>
                    </div>

                    {/* Desktop Navigation & Controls */}
                    <div className="hidden md:flex items-center gap-2">
                        <nav className="flex items-center gap-2">
                            {navItems.map(item => (
                                <button key={item.label} onClick={item.action} className={desktopNavButtonClasses}>
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

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
                                    <button onClick={signOut} className={desktopNavButtonClasses} title="Sign Out">
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

                    {/* Mobile Controls */}
                    <div className="flex md:hidden items-center gap-2">
                         <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Open search"
                        >
                            <SearchIcon className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Open navigation menu"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
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
                        className="absolute inset-0 h-16 md:h-20 bg-white/95 dark:bg-charcoal/95 backdrop-blur-sm z-10"
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-full max-w-xs bg-off-white dark:bg-charcoal shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-bold font-serif text-lg text-charcoal dark:text-slate-200">Menu</span>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 -mr-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                    aria-label="Close navigation menu"
                                >
                                    <CloseIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {navItems.map(item => (
                                    <button
                                        key={item.label}
                                        onClick={() => handleMobileNavClick(item.action)}
                                        className="flex items-center gap-4 p-3 rounded-lg text-charcoal dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                                    >
                                        <span className="text-brand-green">{item.icon}</span>
                                        <span className="font-semibold">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                            
                            <div className="mt-auto border-t border-slate-200 dark:border-slate-700 pt-6">
                                {user ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-sm text-charcoal dark:text-slate-200">{user.name}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={signOut} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Sign Out">
                                            <LogoutIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to join the community forum.</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
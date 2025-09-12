import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { prizes, translations, Prize } from '../data/raffleData';

declare global {
    interface Window {
        confetti: any;
    }
}

interface RaffleCheckerProps {
  onClose: () => void;
}

const FormView = ({ t, inputValue, onInputChange, onCheck, isChecking }: any) => (
    <>
        <label className="label" htmlFor="number-input">{t.label}</label>
        <input 
            type="number"
            id="number-input"
            className="input-field"
            value={inputValue}
            placeholder={t.label}
            aria-label={t.inputAriaLabel}
            onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g,'');
                onInputChange(target.value);
            }}
            autoFocus
        />
        <button 
            className="button" 
            onClick={onCheck}
            disabled={!inputValue || isChecking}
        >
            {isChecking ? 'Checking...' : t.checkButton}
        </button>
    </>
);

const ResultView = ({ t, result, winningPrize, onReset }: any) => {
    const isWin = result === 'win';
    const message = isWin ? t.winMessage : t.lossMessage;
    const icon = isWin ? '🏆' : '✗';
    const iconClass = isWin ? 'win' : 'loss';

    return (
        <div className="result-container" role="alert" aria-live="assertive">
            <div className={`result-icon ${iconClass}`} aria-hidden="true">{icon}</div>
            <p className="result-text">{message}</p>
            {isWin && winningPrize && (
                <div className="prize-card">
                    <h3 className="prize-header">{t.prizeHeader} {winningPrize.nr}</h3>
                    <p className="prize-description">{winningPrize.prize}</p>
                    <p className="prize-sponsor">{t.sponsoredBy}: {winningPrize.sponsor}</p>
                </div>
            )}
            <button className="button" onClick={onReset}>{t.checkAnotherButton}</button>
        </div>
    );
};


export default function RaffleChecker({ onClose }: RaffleCheckerProps) {
    const [language, setLanguage] = useState<'de' | 'en'>('de');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<'idle' | 'win' | 'loss'>('idle');
    const [winningPrize, setWinningPrize] = useState<Prize | null>(null);

    const t = translations[language];

    useEffect(() => {
        // Set the language for the page for accessibility
        const originalLang = document.documentElement.lang;
        document.documentElement.lang = language;
        
        // Cleanup on unmount
        return () => {
          document.documentElement.lang = originalLang;
        };
    }, [language]);

    const handleCheckNumber = () => {
        if (inputValue) {
            const num = parseInt(inputValue, 10);
            const prize = prizes[num];
            if (prize) {
                setResult('win');
                setWinningPrize(prize);
                if (typeof window.confetti === 'function') {
                    window.confetti({
                        particleCount: 150,
                        spread: 90,
                        origin: { y: 0.6 }
                    });
                }
            } else {
                setResult('loss');
                setWinningPrize(null);
            }
        }
    };

    const handleReset = () => {
        setResult('idle');
        setInputValue('');
        setWinningPrize(null);
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (result !== 'idle') {
                handleReset();
            } else if (inputValue) {
                handleCheckNumber();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [result, inputValue]);
    
    return (
        <div className="raffle-checker-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="root-container"
            >
                <button 
                    className="lang-toggle" 
                    onClick={() => setLanguage(lang => lang === 'en' ? 'de' : 'en')}
                >
                    {t.langToggle}
                </button>
                <div className="app-container">
                    <div className="logo-header">
                        <span className="logo-main">ALTSTADT</span>
                        <span className="logo-sub">SOMMER</span>
                    </div>
                    <h1 className="title">{t.title}</h1>
                     <AnimatePresence mode="wait">
                        <motion.div
                            key={result}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {result === 'idle' ? (
                                <FormView 
                                    t={t} 
                                    inputValue={inputValue}
                                    onInputChange={setInputValue}
                                    onCheck={handleCheckNumber}
                                    isChecking={false}
                                />
                            ) : (
                                <ResultView 
                                    t={t}
                                    result={result}
                                    winningPrize={winningPrize}
                                    onReset={handleReset}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                 <button 
                    onClick={onClose}
                    className="mt-6 px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                    style={{
                        color: 'var(--text-color-secondary)',
                        backgroundColor: 'var(--app-background-color)',
                    }}
                >
                    &larr; Back to Magazine
                </button>
            </motion.div>
        </div>
    );
}
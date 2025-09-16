import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../../types';
import { BRAND } from '../../constants';
import { featuredContent } from '../../data/featured';
import ArticleHero from './ArticleHero';
import CTAButton from './CTAButton';
import LogoIcon from '../icons/LogoIcon';

// Simple SVG placeholder for a QR code
const QRIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
        <path d="M10 10h20v20h-20z M15 15v10h10v-10z M40 10h10v10h-10z M50 10h10v10h-10z M70 10h20v20h-20z M75 15v10h10v-10z M10 40h10v10h-10z M10 50h10v10h-10z M10 70h20v20h-20z M15 75v10h10v-10z M40 40h10v10h-10z M50 40h10v10h-10z M40 50h10v10h-10z M70 40h10v10h-10z M80 50h10v10h-10z M70 70h20v20h-20z M75 75v10h10v-10z M40 70h10v10h-10z M50 80h10v10h-10z" />
    </svg>
);

interface PosterLayoutProps {
    articles: Article[];
    onNavigate: (id: string) => void;
    onGoHome: () => void;
}

// FIX: Type error with framer-motion props. Casting motion component to `any` to bypass type checking issues.
const MotionDiv = motion.div as any;

export default function PosterLayout({ articles, onGoHome }: PosterLayoutProps) {
    const featuredArticle = articles.find(a => a.id === featuredContent.id);

    if (!featuredArticle) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-deep-blue text-white p-8">
                <h1 className="text-3xl font-bold">Error: Featured Content Not Found</h1>
                <p>The featured article with ID '{featuredContent.id}' could not be loaded.</p>
                <button onClick={onGoHome} className="mt-8 px-6 py-3 bg-ocean rounded-lg font-semibold">
                    Return to Magazine
                </button>
            </div>
        );
    }

    const websiteUrl = window.location.origin;

    return (
        <div className="w-screen h-screen bg-deep-blue text-white font-sans flex flex-col overflow-hidden">
            <header className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <LogoIcon className="w-12 h-12 text-white" />
                    <span className="text-2xl font-black tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {BRAND.title}
                    </span>
                </div>
                <button onClick={onGoHome} className="px-4 py-2 text-sm font-semibold bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    Exit Poster View
                </button>
            </header>

            <main className="flex-grow grid grid-cols-1 lg:grid-cols-2">
                <div className="h-full">
                    <ArticleHero article={featuredArticle} />
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-cream text-charcoal relative">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="text-center max-w-md"
                    >
                        <h2 className="text-4xl font-serif font-bold">Read the Full Story</h2>
                        <p className="mt-4 text-lg text-slate-700">
                            Scan the QR code with your phone or visit our website to read this article and explore more from The Fläming Eck.
                        </p>
                        <div className="my-8 p-4 bg-white rounded-lg inline-block shadow-lg">
                            {/* In a real app, this would be a generated QR code */}
                            <QRIcon className="w-48 h-48" />
                        </div>
                        <CTAButton href={websiteUrl}>
                            {websiteUrl.replace(/^https?:\/\//, '')}
                        </CTAButton>
                    </MotionDiv>
                     <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-x-8 opacity-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <LogoIcon key={i} className="w-10 h-10 text-charcoal" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

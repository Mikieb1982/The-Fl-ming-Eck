
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { downloads } from '../data/downloadsData';
import { DownloadItem } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import LeafIcon from './icons/LeafIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import HomeIcon from './icons/HomeIcon';
import SparklesIcon from './icons/SparklesIcon';
import InfoIcon from './icons/InfoIcon';

interface DownloadsViewProps {
  onClose: () => void;
}

const MotionDiv = motion.div as any;

const categoryIcons: { [key in DownloadItem['category']]: React.ReactNode } = {
    'Hiking & Cycling': <LeafIcon className="w-8 h-8 text-green-600 dark:text-green-400" />,
    'Brochures & Maps': <BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    'Churches': <HomeIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
    'Nature Park Offers': <SparklesIcon className="w-8 h-8 text-rose-600 dark:text-rose-400" />,
    'Accessibility': <InfoIcon className="w-8 h-8 text-violet-600 dark:text-violet-400" />,
};

const DownloadCard = ({ item }: { item: DownloadItem }) => (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="shrink-0 w-16 h-16 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center justify-center">
            {categoryIcons[item.category]}
        </div>
        <div className="flex-grow">
            <h3 className="font-serif font-bold text-lg text-charcoal dark:text-slate-100">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
        </div>
        <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="shrink-0 mt-2 sm:mt-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-ocean rounded-md hover:bg-ocean-dark transition-colors shadow-sm"
        >
            <DownloadIcon className="w-4 h-4" />
            <span>Download ({item.fileType}, {item.size})</span>
        </a>
    </div>
);

export default function DownloadsView({ onClose }: DownloadsViewProps) {
  const groupedDownloads = useMemo(() => {
    return downloads.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<DownloadItem['category'], DownloadItem[]>);
  }, []);
  
  const categoryOrder: DownloadItem['category'][] = ['Nature Park Offers', 'Hiking & Cycling', 'Churches', 'Brochures & Maps', 'Accessibility'];
  const sortedCategories = Object.keys(groupedDownloads).sort((a,b) => categoryOrder.indexOf(a as any) - categoryOrder.indexOf(b as any));


  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">Downloads</h2>
            <button 
                onClick={onClose}
                className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-light-grey dark:hover:bg-zinc-700 transition-colors"
            >
                &larr; Back to Magazine
            </button>
        </div>

        <p className="mb-6 text-slate-600 dark:text-slate-300">
            Official guides, maps, and brochures from the Hoher Fläming Nature Park to help you explore the region.
        </p>
        
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 rounded-lg flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Please note:</strong> The majority of these documents are provided in German. We have noted any English versions where available.
            </p>
        </div>

        <div className="space-y-8">
            {sortedCategories.map(category => (
                <section key={category}>
                    <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-slate-200 mb-4">{category}</h3>
                    <div className="space-y-4">
                        {groupedDownloads[category as DownloadItem['category']].map(item => <DownloadCard key={item.title} item={item} />)}
                    </div>
                </section>
            ))}
        </div>
        <div className="mt-12 text-center text-xs text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-700">
            Source: <a href="https://naturparkhoherflaeming.de" target="_blank" rel="noopener noreferrer" className="hover:underline">https://naturparkhoherflaeming.de</a>
        </div>
    </MotionDiv>
  );
}

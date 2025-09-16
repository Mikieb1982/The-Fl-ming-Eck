import React from 'react';
import { motion } from 'framer-motion';
import { usefulLinksData } from '../data/usefulLinksData';
import { UsefulLink } from '../types';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

interface LinksViewProps {
  onClose: () => void;
}

const MotionDiv = motion.div as any;

const LinkCard = ({ item }: { item: UsefulLink }) => (
    <div className="flex flex-col p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex-grow">
            <h3 className="font-serif font-bold text-lg text-charcoal dark:text-slate-100">{item.english_title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.german_title}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.summary.replace(/:contentReference\[.*?\]\{index=\d+\}/g, '').trim()}</p>
        </div>
        <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 self-start inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-ocean rounded-md hover:bg-ocean-dark transition-colors shadow-sm"
        >
            <ExternalLinkIcon className="w-4 h-4" />
            <span>Visit Link</span>
        </a>
    </div>
);

export default function LinksView({ onClose }: LinksViewProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">Useful Links</h2>
            <button 
                onClick={onClose}
                className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-light-grey dark:hover:bg-zinc-700 transition-colors"
            >
                &larr; Back to Magazine
            </button>
        </div>

        <p className="mb-6 text-slate-600 dark:text-slate-300">
            A curated list of essential online resources from the Bad Belzig town website to help residents navigate local services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usefulLinksData.map((item, index) => (
                <LinkCard key={index} item={item} />
            ))}
        </div>
    </MotionDiv>
  );
}

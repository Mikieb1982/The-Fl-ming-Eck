import React from 'react';
import { motion } from 'framer-motion';
import BrainIcon from './icons/BrainIcon';

const NOTEBOOK_URL = "https://notebooklm.google.com/notebook/3859d39c-c672-47e5-99bb-d5538235afc2";

const MotionA = motion.a as any;

export default function NotebookLMWidget() {
    return (
        <MotionA
            href={NOTEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 md:bottom-6 left-6 z-[65] p-4 bg-brand-secondary text-white rounded-full shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary dark:focus:ring-offset-slate-900 transition-colors"
            aria-label="Open AI Research Assistant in a new tab"
            title="Open AI Research Assistant in a new tab"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <BrainIcon className="w-6 h-6" />
        </MotionA>
    );
}
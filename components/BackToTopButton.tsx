import React from 'react';
import { motion } from 'framer-motion';
import ArrowUpIcon from './icons/ArrowUpIcon';

interface BackToTopButtonProps {
    onClick: () => void;
}

const MotionButton = motion.button as any;

export default function BackToTopButton({ onClick }: BackToTopButtonProps) {
    return (
        <MotionButton
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 p-3 bg-ocean text-white rounded-full shadow-lg hover:bg-poppy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean dark:focus:ring-offset-slate-900 transition-colors"
            aria-label="Back to top"
        >
            <ArrowUpIcon className="w-6 h-6" />
        </MotionButton>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import CloseIcon from './icons/CloseIcon';

interface LegalViewProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function LegalView({ title, onClose, children }: LegalViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="legal-title"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-off-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <h2 id="legal-title" className="text-xl font-serif font-bold text-charcoal dark:text-slate-200">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="prose dark:prose-invert max-w-none prose-h2:text-charcoal dark:prose-h2:text-slate-200 prose-p:text-charcoal dark:prose-p:text-slate-300">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
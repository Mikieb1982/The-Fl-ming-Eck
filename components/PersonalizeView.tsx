import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from './icons/CloseIcon';

interface PersonalizeViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (interests: string[]) => void;
  allCategories: string[];
  currentInterests: string[];
}

export default function PersonalizeView({ isOpen, onClose, onSave, allCategories, currentInterests }: PersonalizeViewProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(currentInterests));

  const handleToggle = (category: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelected(newSelected);
  };

  const handleSave = () => {
    onSave(Array.from(selected));
    onClose();
  };
  
  const selectableCategories = allCategories.filter(c => c !== 'All');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="personalize-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative w-full max-w-lg bg-off-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 id="personalize-title" className="text-xl font-serif font-bold text-charcoal dark:text-slate-200">Personalize Your Feed</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </header>
            <div className="p-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Select the topics you're most interested in to see a personalized "For You" section in the magazine.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {selectableCategories.map((category) => (
                  <label key={category} className="flex items-center p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                      checked={selected.has(category)}
                      onChange={() => handleToggle(category)}
                    />
                    <span className="ml-3 font-medium text-charcoal dark:text-slate-200">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <footer className="flex justify-end gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
               <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 text-sm font-semibold text-white bg-brand-green rounded-md hover:bg-opacity-80 transition-colors"
              >
                Save Preferences
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
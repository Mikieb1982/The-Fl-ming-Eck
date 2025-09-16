import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from './icons/CloseIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';

const NOTEBOOK_URL = "https://notebooklm.google.com/notebook/3859d39c-c672-47e5-99bb-d5538235afc2";

const MotionDiv = motion.div as any;

export default function NotebookLMWidget() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
    };

    return (
        <>
            <motion.button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 md:bottom-6 left-6 z-[65] w-16 h-16 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary dark:focus:ring-offset-slate-900 transition-transform"
                aria-label="Open NotebookLM Bad Belzig Journal"
                title="Open NotebookLM Bad Belzig Journal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <img src="https://i.imgur.com/gt4ZvI1.png" alt="Open NotebookLM Assistant" className="w-full h-full rounded-full" />
            </motion.button>

            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <MotionDiv
                            key="backdrop"
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
                            transition={{ duration: 0.3 }}
                        />
                        <MotionDiv
                            key="modal"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                            onClick={() => setIsModalOpen(false)}
                            aria-modal="true"
                            role="dialog"
                            aria-labelledby="ai-assistant-title"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-lg p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 text-center"
                            >
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-3 right-3 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    aria-label="Close"
                                >
                                    <CloseIcon className="w-6 h-6" />
                                </button>
                                
                                <img src="https://i.imgur.com/gt4ZvI1.png" alt="NotebookLM Logo" className="w-20 h-20 mx-auto mb-4" />
                                
                                <h2 id="ai-assistant-title" className="text-2xl font-serif font-bold text-charcoal dark:text-slate-100">NotebookLM Bad Belzig Journal</h2>
                                <p className="mt-2 text-slate-600 dark:text-slate-300">
                                    You're about to open Google's NotebookLM in a new tab. This powerful tool allows you to ask questions and research topics related to the articles in this magazine.
                                </p>

                                <a
                                    href={NOTEBOOK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsModalOpen(false)}
                                    className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-base font-semibold text-white bg-ocean rounded-lg shadow-sm hover:bg-ocean-dark transition-colors"
                                >
                                    <ExternalLinkIcon className="w-5 h-5" />
                                    <span>Open Assistant</span>
                                </a>
                            </div>
                        </MotionDiv>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
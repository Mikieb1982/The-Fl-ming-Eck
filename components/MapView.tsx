
import React, { useState, useMemo } from 'react';
// Fix: Import Variants type from framer-motion to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Article } from '../types';
import CloseIcon from './icons/CloseIcon';
import RelatedArticleItem from './RelatedArticleItem';

interface MapViewProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

interface PointOfInterest {
  id: string;
  name: string;
  tag: string;
  cx: string;
  cy: string;
  labelX: string;
  labelY: string;
}

const pointsOfInterest: PointOfInterest[] = [
  { id: 'bad-belzig', name: 'Bad Belzig', tag: 'bad-belzig', cx: '52%', cy: '45%', labelX: '52%', labelY: '42%' },
  { id: 'wiesenburg', name: 'Wiesenburg', tag: 'wiesenburg', cx: '35%', cy: '65%', labelX: '35%', labelY: '70%' },
  { id: 'hoher-flaming', name: 'Hoher Fläming', tag: 'hoher-fläming', cx: '68%', cy: '60%', labelX: '68%', labelY: '57%' },
];

export default function MapView({ isOpen, onClose, articles, onSelectArticle }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<PointOfInterest | null>(null);

  const articlesForLocation = useMemo(() => {
    if (!selectedLocation) return [];
    return articles.filter(article => article.tags?.includes(selectedLocation.tag));
  }, [selectedLocation, articles]);

  const handlePointClick = (point: PointOfInterest) => {
    setSelectedLocation(point);
  };
  
  const handleClosePanel = () => {
    setSelectedLocation(null);
  };
  
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Fix: Explicitly type mapVariants with Variants to ensure correct type inference for the 'ease' property.
  const mapVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  // Fix: Explicitly type panelVariants with Variants to ensure correct type inference for the 'type' property.
  const panelVariants: Variants = {
    hidden: { x: '100%' },
    visible: { x: '0%', transition: { type: 'spring', stiffness: 200, damping: 25 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="map-view-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="map-view-content"
            variants={mapVariants}
            className="relative w-full max-w-4xl aspect-[4/3] bg-off-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
              <h2 className="text-xl font-serif font-bold text-charcoal dark:text-slate-200">
                Explore the Fläming Region
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close map view"
              >
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            
            <svg viewBox="0 0 800 600" className="w-full h-full" aria-label="Interactive map of the Fläming region">
              {/* Base Map Shape */}
              <path d="M100,50 Q250,20 400,80 T700,100 L750,250 Q720,400 600,550 T300,580 Q150,500 50,350 T100,50 Z" 
                fill="#e5e5e0" stroke="#c2802a" strokeWidth="2" className="dark:fill-slate-800 dark:stroke-sandstone-ochre" />
              
              {/* Points of Interest */}
              {pointsOfInterest.map(point => (
                <g key={point.id} onClick={() => handlePointClick(point)} className="cursor-pointer group">
                  <circle cx={point.cx} cy={point.cy} r="20" fill="#24523a" className="opacity-50 group-hover:opacity-75 transition-opacity" />
                  <circle cx={point.cx} cy={point.cy} r="10" fill="#24523a" stroke="white" strokeWidth="2" className="group-hover:scale-125 transition-transform origin-center" />
                  <text
                    x={point.labelX}
                    y={point.labelY}
                    textAnchor="middle"
                    className="font-bold font-serif text-lg fill-charcoal dark:fill-slate-300 pointer-events-none transition-transform group-hover:-translate-y-1"
                  >
                    {point.name}
                  </text>
                </g>
              ))}
            </svg>

            <AnimatePresence>
                {selectedLocation && (
                    <motion.div
                        key="side-panel"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute top-0 right-0 h-full w-full max-w-xs bg-white dark:bg-slate-800 shadow-lg flex flex-col"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                           <h3 className="text-lg font-serif font-bold text-charcoal dark:text-slate-200">{selectedLocation.name}</h3>
                           <button onClick={handleClosePanel} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                               <CloseIcon className="w-5 h-5" />
                           </button>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4">
                            {articlesForLocation.length > 0 ? (
                                <div className="space-y-2">
                                     <p className="text-sm text-slate-500 dark:text-slate-400 pb-2">Related articles:</p>
                                    {articlesForLocation.map(article => (
                                        <RelatedArticleItem key={article.id} article={article} onSelectArticle={onSelectArticle} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">No articles found for this location.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

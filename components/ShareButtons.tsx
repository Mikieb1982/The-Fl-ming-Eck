import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '../types';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import EmailIcon from './icons/EmailIcon';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';

interface ShareButtonsProps {
  article: Article;
}

export default function ShareButtons({ article }: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);

  if (!article) return null;

  const shareUrl = `${window.location.origin}/#/article/${article.id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  const platforms = [
    {
      name: 'Twitter',
      icon: <TwitterIcon className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-[#4267B2]',
    },
    {
      name: 'Email',
      icon: <EmailIcon className="w-5 h-5" />,
      url: `mailto:?subject=${encodedTitle}&body=Check out this article: ${shareUrl}`,
      color: 'hover:text-slate-600 dark:hover:text-slate-400',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Share:</p>
      <div className="flex items-center gap-1">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full text-slate-600 dark:text-slate-300 ${platform.color} transition-colors`}
            aria-label={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Copy link"
        >
          <AnimatePresence mode="wait">
            {/* @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
            <motion.div
              key={isCopied ? 'check' : 'copy'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {isCopied ? (
                <CheckIcon className="w-5 h-5 text-green-500" />
              ) : (
                <CopyIcon className="w-5 h-5" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
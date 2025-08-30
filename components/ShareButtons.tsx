
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

  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}?article=${article.id}`;

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
      url: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
      color: 'hover:text-slate-600 dark:hover:text-slate-400',
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Share:</p>
      <div className="flex items-center gap-1">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.name}`}
            className={`p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${platform.color}`}
          >
            {platform.icon}
          </a>
        ))}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <div className="relative">
            <button
              onClick={handleCopy}
              aria-label="Copy link to clipboard"
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {isCopied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
            </button>
            <AnimatePresence>
            {isCopied && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded-md shadow-lg pointer-events-none"
                >
                    Copied!
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

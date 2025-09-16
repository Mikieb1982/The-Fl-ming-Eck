import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PollOption {
  text: string;
  votes: number;
}

interface PollProps {
  articleId: string;
  question: string;
  initialOptions: PollOption[];
}

// FIX: Type error with framer-motion props. Casting motion component to `any` to bypass type checking issues.
const MotionDiv = motion.div as any;

export default function Poll({ articleId, question, initialOptions }: PollProps) {
  const [options, setOptions] = useState(initialOptions);
  const [votedOption, setVotedOption] = useState<number | null>(null);

  const storageKeyVotes = `poll-votes-${articleId}-${question}`;
  const storageKeyVoted = `poll-voted-${articleId}-${question}`;

  useEffect(() => {
    try {
      const storedVoted = localStorage.getItem(storageKeyVoted);
      if (storedVoted !== null) {
        const parsedVoted = parseInt(storedVoted, 10);
        if (!isNaN(parsedVoted)) {
          setVotedOption(parsedVoted);
        }
      }

      const storedVotes = localStorage.getItem(storageKeyVotes);
      if (storedVotes) {
        const parsedVotes = JSON.parse(storedVotes);
        if (Array.isArray(parsedVotes) && parsedVotes.every(o => typeof o.text === 'string' && typeof o.votes === 'number')) {
          setOptions(parsedVotes);
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage for poll:", error);
    }
  }, [articleId, question, storageKeyVoted, storageKeyVotes]);

  const totalVotes = useMemo(() => options.reduce((sum, option) => sum + option.votes, 0), [options]);

  const handleVote = (index: number) => {
    if (votedOption !== null) return;

    const newOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, votes: option.votes + 1 };
      }
      return option;
    });

    setOptions(newOptions);
    setVotedOption(index);

    try {
      localStorage.setItem(storageKeyVoted, index.toString());
      localStorage.setItem(storageKeyVotes, JSON.stringify(newOptions));
    } catch (error) {
        console.error("Failed to save poll data to localStorage:", error);
    }
  };

  return (
    <div className="not-prose my-8 p-6 bg-sunshine/10 dark:bg-sunshine/20 rounded-lg border border-slate-200 dark:border-slate-700">
      <h4 className="font-serif font-bold text-xl text-charcoal dark:text-slate-200">{question}</h4>
      <div className="mt-4 space-y-3">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={votedOption === null ? 'voting' : 'results'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {votedOption === null ? (
              // Voting View
              options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleVote(index)}
                  className="w-full text-left p-3 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-ocean dark:hover:border-ocean-dark transition-colors font-medium text-charcoal dark:text-slate-300"
                >
                  {option.text}
                </button>
              ))
            ) : (
              // Results View
              options.map((option, index) => {
                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                const isVoted = index === votedOption;
                return (
                  <div key={index} className="relative p-3 border border-slate-300 dark:border-slate-600 rounded-md overflow-hidden">
                    <MotionDiv
                      className={`absolute top-0 left-0 h-full ${isVoted ? 'bg-ocean/20' : 'bg-slate-200 dark:bg-slate-700'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                    />
                    <div className="relative flex justify-between items-center">
                      <span className={`font-semibold ${isVoted ? 'text-ocean dark:text-cyan-300' : 'text-charcoal dark:text-slate-200'}`}>{option.text}</span>
                      <span className="text-sm font-bold text-charcoal dark:text-slate-300">{percentage.toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })
            )}
          </MotionDiv>
        </AnimatePresence>
      </div>
      {votedOption !== null && (
        <p className="text-right text-xs mt-3 text-slate-500 dark:text-slate-300">
          Total votes: {totalVotes}
        </p>
      )}
    </div>
  );
}

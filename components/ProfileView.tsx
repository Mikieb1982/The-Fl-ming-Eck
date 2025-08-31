
import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useBookmarks } from '../context/BookmarkContext';
import { Article, Post } from '../types';
import { timeAgo } from '../utils/helpers';
import LogoutIcon from './icons/LogoutIcon';
import RelatedArticleItem from './RelatedArticleItem';

interface ProfileViewProps {
  posts: Post[];
  articles: Article[];
  onSelectArticle: (id: string) => void;
  onClose: () => void;
}

export default function ProfileView({ posts, articles, onSelectArticle, onClose }: ProfileViewProps) {
  const { user, signOut } = useUser();
  const { bookmarks } = useBookmarks();

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600 dark:text-slate-400">Please sign in to view your profile.</p>
        <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-light-grey dark:hover:bg-zinc-700 transition-colors"
        >
            &larr; Back to Magazine
        </button>
      </div>
    );
  }

  const bookmarkedArticles = articles.filter(a => bookmarks.includes(a.id));
  const userPosts = posts.filter(p => p.author === user.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">My Profile</h2>
            <button 
                onClick={onClose}
                className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-light-grey dark:hover:bg-zinc-700 transition-colors"
            >
                &larr; Back to Magazine
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: User Info */}
            <aside className="md:col-span-1">
                <div className="p-6 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 text-center sticky top-28 shadow-sm">
                    <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mx-auto shadow-lg ring-4 ring-white dark:ring-zinc-900" />
                    <h3 className="mt-4 text-2xl font-serif font-bold text-charcoal dark:text-slate-100">{user.name}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                    <button onClick={signOut} className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-warm-terracotta rounded-lg hover:opacity-90 transition-colors shadow-sm">
                        <LogoutIcon className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Right Column: Activity */}
            <main className="md:col-span-2 space-y-8">
                {/* Bookmarks Section */}
                <section>
                    <h4 className="text-xl font-serif font-bold text-charcoal dark:text-slate-200 mb-4">Bookmarked Articles ({bookmarkedArticles.length})</h4>
                    <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                        {bookmarkedArticles.length > 0 ? (
                            <div className="space-y-2">
                                {bookmarkedArticles.map(article => (
                                    <RelatedArticleItem key={article.id} article={article} onSelectArticle={onSelectArticle} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">You haven't bookmarked any articles yet.</p>
                        )}
                    </div>
                </section>

                {/* Community Activity Section */}
                <section>
                    <h4 className="text-xl font-serif font-bold text-charcoal dark:text-slate-200 mb-4">Community Activity ({userPosts.length})</h4>
                     <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-700 shadow-sm">
                        {userPosts.length > 0 ? (
                            <div className="space-y-4">
                                {userPosts.map(post => (
                                    <div key={post.id} className="pb-3 border-b border-slate-100 dark:border-slate-700 last:border-b-0 last:pb-0">
                                        <p className="font-semibold text-charcoal dark:text-slate-200">{post.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Posted {timeAgo(post.timestamp)} · {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">You haven't posted in the community forum yet.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    </motion.div>
  );
}

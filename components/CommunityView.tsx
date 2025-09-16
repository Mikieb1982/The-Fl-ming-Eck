import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, Post, Reply } from '../types';
import PostForm from './PostForm';
import { moderateContent, generateTopicSuggestion } from '../services/apiService';
import { fuzzySearch, timeAgo } from '../utils/helpers';
import SparklesIcon from './icons/SparklesIcon';
import PinIcon from './icons/PinIcon';
import SearchIcon from './icons/SearchIcon';
import Tag from './Tag';
import RelatedArticleItem from './RelatedArticleItem';

const MotionDiv = motion.div as any;

// A simple utility to generate a consistent color from a string (e.g., username)
const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
};

// Simple Avatar component based on user's initial
const UserAvatar = ({ name }: { name: string }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const bgColor = stringToColor(name || 'default');
    
    // Basic luminance check to decide text color
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgb = hexToRgb(bgColor);
    const luminance = rgb ? (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 : 0;
    const textColor = luminance > 0.5 ? 'text-black' : 'text-white';

    return (
        <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
            style={{ backgroundColor: bgColor }}
        >
            <span className={textColor}>{initial}</span>
        </div>
    );
};


interface CommunityViewProps {
  posts: Post[];
  allArticles: Article[];
  onAddPost: (post: Omit<Post, 'id' | 'timestamp' | 'replies'>) => void;
  onAddReply: (postId: string, reply: Omit<Reply, 'id' | 'timestamp'>) => void;
  onSelectArticle: (id: string) => void;
  activeTag: string | null;
  onSelectTag: (tag: string) => void;
  onClearTag: () => void;
  onClose: () => void;
}

const categoryColorMap: { [key: string]: string } = {
  'Announcements': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  'Food': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'Nature': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  'Events': 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300',
  'History': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  'Local Life': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
  'General': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
};

function PostCard({ post, onReply, allArticles, onSelectArticle, onSelectTag }: { post: Post; onReply: (reply: Omit<Reply, 'id' | 'timestamp'>) => void; allArticles: Article[], onSelectArticle: (id: string) => void; onSelectTag: (tag: string) => void; }) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const relatedArticles = useMemo(() => {
        if (!post.tags || post.tags.length === 0) return [];
        const postTags = new Set(post.tags);
        return allArticles
            .filter(article => article.tags?.some(tag => postTags.has(tag)))
            .slice(0, 3);
    }, [post.tags, allArticles]);

    const content = typeof post.content === 'string' ? post.content : '';
    const isLongPost = content.length > 250;
    const displayContent = isLongPost && !isExpanded ? `${content.substring(0, 250)}...` : content;
    const categoryClasses = post.category ? (categoryColorMap[post.category] || categoryColorMap['General']) : categoryColorMap['General'];

    const replyContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    
    const replyItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };
    
    return (
        <div className={`p-4 sm:p-6 rounded-2xl shadow-sm border ${post.pinned ? 'bg-amber-50 dark:bg-amber-900/25 border-amber-200 dark:border-amber-500/30' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
            <div className="flex items-start gap-4">
                <UserAvatar name={post.author} />
                <div className="flex-grow">
                    <div className="flex items-center gap-3">
                         <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-100">{post.title}</h3>
                         {post.pinned && <PinIcon className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" title="Pinned Post" />}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                        {post.category && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryClasses}`}>{post.category}</span>}
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Posted by <span className="font-semibold">{post.author}</span> · {timeAgo(post.timestamp)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{displayContent}</p>
                {isLongPost && (
                     <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-semibold text-ocean hover:underline mt-2">
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => <Tag key={tag} tag={tag} onClick={onSelectTag} />)}
                    </div>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                {relatedArticles.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Related Reading</h4>
                        <div className="space-y-2">
                            {relatedArticles.map(article => (
                                <RelatedArticleItem key={article.id} article={article} onSelectArticle={onSelectArticle} />
                            ))}
                        </div>
                    </div>
                )}
                
                <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">
                    {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                </h4>
                
                <AnimatePresence>
                {post.replies.length > 0 && (
                    <MotionDiv 
                        key="replies-container"
                        className="space-y-4"
                        variants={replyContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {post.replies.map(reply => (
                            <MotionDiv 
                                key={reply.id} 
                                className="flex items-start gap-3"
                                variants={replyItemVariants}
                            >
                                <UserAvatar name={reply.author} />
                                <div className="flex-grow p-3 rounded-md bg-slate-50 dark:bg-slate-700/50">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{reply.author}</span> · {timeAgo(reply.timestamp)}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{reply.content}</p>
                                </div>
                            </MotionDiv>
                        ))}
                    </MotionDiv>
                )}
                </AnimatePresence>

                <div className="mt-4">
                     {showReplyForm ? (
                        <div className="mt-2">
                            <PostForm
                                onSave={async (data) => {
                                    const { isAppropriate, reason } = await moderateContent(data.content);
                                    if (!isAppropriate) {
                                        throw new Error(`Could not post reply: ${reason}`);
                                    }
                                    onReply({ author: data.author, content: data.content });
                                    setShowReplyForm(false);
                                }}
                                onCancel={() => setShowReplyForm(false)}
                                isReply={true}
                            />
                        </div>
                    ) : (
                         <button 
                            onClick={() => setShowReplyForm(true)}
                            className="px-4 py-2 text-sm font-semibold text-white bg-ocean rounded-lg hover:bg-ocean-dark transition-colors"
                        >
                            Write a reply
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CommunityView({ posts, allArticles, onAddPost, onAddReply, onSelectArticle, activeTag, onSelectTag, onClearTag, onClose }: CommunityViewProps) {
    const [showNewPostForm, setShowNewPostForm] = useState(false);
    const [topicSuggestion, setTopicSuggestion] = useState<string | null>(null);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'replies'>('newest');
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSuggestTopic = async () => {
        setIsSuggesting(true);
        const topic = await generateTopicSuggestion();
        setTopicSuggestion(topic);
        setIsSuggesting(false);
    };
    
    const communityCategories = useMemo(() => {
        const categories = new Set(posts.map(p => p.category).filter(Boolean));
        return ['All', 'Announcements', ...Array.from(categories).filter(c => c !== 'Announcements').sort()];
    }, [posts]);

    const { pinnedPosts, regularPosts } = useMemo(() => {
        let filtered = posts;

        if (activeTag) {
            filtered = posts.filter(p => p.tags?.includes(activeTag));
        } else {
             if (activeCategory !== 'All') {
                filtered = filtered.filter(p => p.category === activeCategory);
            }
    
            const query = searchQuery.trim();
            if (query) {
                filtered = filtered.filter(p =>
                    fuzzySearch(query, p.title) ||
                    fuzzySearch(query, p.content) ||
                    fuzzySearch(query, p.author)
                );
            }
        }

        const pinned = filtered.filter(p => p.pinned);
        let regular = filtered.filter(p => !p.pinned);

        regular.sort((a, b) => {
            if (sortBy === 'replies') {
                return b.replies.length - a.replies.length;
            }
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        return { pinnedPosts: pinned, regularPosts: regular };
    }, [posts, sortBy, activeCategory, searchQuery, activeTag]);

    const displayedPosts = [...pinnedPosts, ...regularPosts];

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-slate-100">Community Forum</h2>
                <button 
                    onClick={onClose}
                    className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    &larr; Back to Magazine
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="md:col-span-3">
                    <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex-grow mb-6">
                         <h3 className="font-semibold text-slate-800 dark:text-slate-200">Welcome to the Forum!</h3>
                         <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Share tips, ask questions, and connect with others in English. All posts are moderated for safety.</p>
                    </div>

                    {/* Filters and Search */}
                    <div className="mb-6 p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                        {activeTag ? (
                             <div className="flex items-center gap-4">
                                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Showing posts tagged: <span className="text-ocean">#{activeTag}</span>
                                </h3>
                                <button onClick={onClearTag} className="text-sm font-semibold text-poppy hover:underline">
                                    Clear filter
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <SearchIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm pl-10 pr-4 py-2 focus:border-brand-secondary focus:ring-brand-secondary sm:text-sm bg-white dark:bg-slate-900 dark:placeholder-slate-400"
                                        placeholder="Search discussions..."
                                    />
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 mr-2">Categories:</span>
                                    {communityCategories.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${activeCategory === cat ? 'bg-ocean text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                         <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Sort by:</span>
                            <button onClick={() => setSortBy('newest')} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${sortBy === 'newest' ? 'bg-ocean text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>Newest</button>
                            <button onClick={() => setSortBy('replies')} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${sortBy === 'replies' ? 'bg-ocean text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>Most Replies</button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {displayedPosts.map(post => (
                             <PostCard key={post.id} post={post} onReply={(reply) => onAddReply(post.id, reply)} allArticles={allArticles} onSelectArticle={onSelectArticle} onSelectTag={onSelectTag} />
                        ))}
                        {displayedPosts.length === 0 && (
                            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg">
                                <p className="text-slate-500 dark:text-slate-300">No discussions found. Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="md:col-span-1 space-y-6">
                    <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => setShowNewPostForm(true)}
                            className="w-full px-4 py-3 text-sm font-semibold text-white bg-poppy rounded-lg shadow-md hover:bg-opacity-90 disabled:bg-slate-400 transition-colors"
                        >
                            Start a New Discussion
                        </button>
                    </div>

                    <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">Need an idea?</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            Get an AI-powered conversation starter.
                        </p>
                        {topicSuggestion && (
                             <MotionDiv 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-3 text-sm italic text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 p-2 rounded-md"
                            >
                                "{topicSuggestion}"
                             </MotionDiv>
                        )}
                        <button 
                            onClick={handleSuggestTopic}
                            disabled={isSuggesting}
                            className="w-full flex items-center justify-center gap-2 mt-3 px-3 py-2 text-xs font-semibold text-ocean bg-ocean/10 rounded-md hover:bg-ocean/20 transition-colors disabled:opacity-50"
                        >
                            <SparklesIcon className="w-3 h-3" />
                            {isSuggesting ? 'Thinking...' : 'Suggest a Topic'}
                        </button>
                    </div>
                </aside>
            </div>
            
            <AnimatePresence>
            {showNewPostForm && (
                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowNewPostForm(false)}
                >
                    <MotionDiv
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: -20 }}
                        className="w-full max-w-2xl bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-2xl p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                         <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-4">Start a New Discussion</h3>
                         <PostForm 
                            onSave={async (data) => {
                                const { isAppropriate, reason } = await moderateContent(`${data.title} ${data.content}`);
                                if (!isAppropriate) {
                                    throw new Error(`Could not create post: ${reason}`);
                                }
                                onAddPost(data);
                                setShowNewPostForm(false);
                            }} 
                            onCancel={() => setShowNewPostForm(false)}
                        />
                    </MotionDiv>
                </MotionDiv>
            )}
            </AnimatePresence>
        </MotionDiv>
    );
}

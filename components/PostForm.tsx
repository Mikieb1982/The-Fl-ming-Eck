

import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

export const communityCategories = ['General', 'Food', 'Nature', 'Events', 'History', 'Local Life'];

interface PostFormProps {
    onSave: (data: { author: string; title: string; content: string; category: string; tags: string[]; }) => Promise<void>;
    onCancel?: () => void;
    isReply?: boolean;
}

export default function PostForm({ onSave, onCancel, isReply = false }: PostFormProps) {
    const { user } = useUser();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(communityCategories[0]);
    const [tags, setTags] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setAuthor(user.name);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!author.trim() || !content.trim() || (!isReply && !title.trim())) {
            setError('Please fill out all required fields.');
            return;
        }
        setIsSaving(true);
        try {
            const parsedTags = tags.split(',').map(tag => tag.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean);
            await onSave({ author, title, content, category, tags: parsedTags });
            // Clear form on success, but keep author name if logged in
            if (!user) {
                setAuthor('');
            }
            setTitle('');
            setContent('');
            setTags('');
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-700 bg-red-100 dark:text-red-200 dark:bg-red-900/50 rounded-lg" role="alert">{error}</div>}
            
            <div>
                <label htmlFor="author" className="block text-sm font-medium text-charcoal dark:text-slate-300">Your Name</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sandstone-ochre focus:ring-sandstone-ochre sm:text-sm bg-white dark:bg-zinc-900 disabled:bg-slate-100 disabled:dark:bg-slate-800 disabled:cursor-not-allowed"
                    required
                    disabled={!!user}
                />
            </div>

            {!isReply && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-charcoal dark:text-slate-300">Topic / Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sandstone-ochre focus:ring-sandstone-ochre sm:text-sm bg-white dark:bg-zinc-900"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-charcoal dark:text-slate-300">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sandstone-ochre focus:ring-sandstone-ochre sm:text-sm bg-white dark:bg-zinc-900"
                            >
                                {communityCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-charcoal dark:text-slate-300">Tags (comma-separated)</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="e.g. food, hiking, castle"
                            className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sandstone-ochre focus:ring-sandstone-ochre sm:text-sm bg-white dark:bg-zinc-900"
                        />
                    </div>
                </>
            )}
            
            <div>
                <label htmlFor="content" className="block text-sm font-medium text-charcoal dark:text-slate-300">{isReply ? 'Your Reply' : 'Your Message'}</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={isReply ? 3 : 5}
                    className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sandstone-ochre focus:ring-sandstone-ochre sm:text-sm bg-white dark:bg-zinc-900"
                    required
                />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
                {onCancel && (
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 text-sm font-semibold text-white bg-brand-green rounded-md hover:opacity-80 transition-colors disabled:bg-slate-400 disabled:cursor-wait"
                >
                    {isSaving ? (isReply ? 'Posting Reply...' : 'Posting...') : (isReply ? 'Post Reply' : 'Post Discussion')}
                </button>
            </div>
        </form>
    );
}
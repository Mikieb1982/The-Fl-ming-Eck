import { useState, useEffect } from 'react';
import { Article } from '../types';

// In-memory cache to avoid re-generating images on re-renders for the same session.
const imageCache = new Map<string, string>();

// A list of generic, high-quality keywords for fallback.
const fallbackKeywords = [
    'nature', 'landscape', 'brandenburg', 'germany', 'forest', 'history', 'architecture', 'community', 'town'
];

function getKeyword(article: Article): string {
    if (article.tags && article.tags.length > 0) {
        // Prioritize more specific tags over generic ones for better image relevance.
        const specificTags = article.tags.filter(t => !['bad-belzig', 'hoher-fläming', 'guides', 'germany'].includes(t));
        if (specificTags.length > 0) {
            return specificTags[0];
        }
        return article.tags[0];
    }
    if (article.category) {
        // Map common categories to broader Unsplash keywords.
        const categoryMap: { [key: string]: string } = {
            'Community': 'community',
            'Events': 'festival',
            'History': 'history',
            'City Guide': 'cityscape',
            'Guides': 'nature trail',
        };
        return categoryMap[article.category] || article.category.toLowerCase().split(' ')[0];
    }
    // If no tags or category, select a random keyword from our fallback list.
    return fallbackKeywords[Math.floor(Math.random() * fallbackKeywords.length)];
}

export function useGeneratedPlaceholder(article: Article, enabled: boolean) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(enabled);

    useEffect(() => {
        if (!enabled || !article) {
            setIsLoading(false);
            return;
        }

        if (imageCache.has(article.id)) {
            setImageUrl(imageCache.get(article.id)!);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        // Generate a relevant keyword from the article's metadata.
        const keyword = getKeyword(article);
        
        // Use Unsplash Source to get a random, high-quality placeholder image.
        // We add ",germany" to keep the images visually consistent with the magazine's location.
        const newImageUrl = `https://source.unsplash.com/1600x900/?${encodeURIComponent(keyword)},germany`;

        imageCache.set(article.id, newImageUrl);
        setImageUrl(newImageUrl);
        
        // The `isLoading` state controls the skeleton/pulse loader in components.
        // We set it to false as soon as we have a URL. The browser's native
        // image loading will take over from there. This is a simple and effective approach.
        setIsLoading(false);

    }, [article, enabled]);

    // This hook is now much simpler and doesn't require error handling for API calls.
    return { generatedUrl: imageUrl, isLoading, error: null };
}

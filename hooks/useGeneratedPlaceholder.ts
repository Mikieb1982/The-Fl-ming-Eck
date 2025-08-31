import { useState, useEffect } from 'react';
import { Article } from '../types';

// In-memory cache to avoid re-generating images on re-renders for the same session.
const imageCache = new Map<string, string>();

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

        // Use a deterministic placeholder service (picsum.photos) seeded with the article ID.
        // This ensures a consistent, unique image for each article that needs a placeholder,
        // improving reliability and user experience over random image services.
        const newImageUrl = `https://picsum.photos/seed/${encodeURIComponent(article.id)}/1600/900`;

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

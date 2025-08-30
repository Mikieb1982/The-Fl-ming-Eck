
import { useState, useEffect } from 'react';
import { Article } from '../types';
import { generateImage } from '../services/apiService';

// In-memory cache to avoid re-generating images on re-renders
const imageCache = new Map<string, string>();

export function useGeneratedPlaceholder(article: Article, enabled: boolean) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !article) {
            if (isLoading) setIsLoading(false);
            return;
        }

        if (imageCache.has(article.id)) {
            setImageUrl(imageCache.get(article.id)!);
            return;
        }
        
        const generate = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const prompt = `A visually appealing, high-quality, photorealistic magazine cover-style image for an article titled "${article.title}". The tone should be professional and relevant to the article's content. Do not include any text in the image. Focus on a strong central visual metaphor related to the title. Aspect ratio 16:9.`;
                const newImageUrl = await generateImage(prompt);
                imageCache.set(article.id, newImageUrl);
                setImageUrl(newImageUrl);
            } catch (e: any) {
                console.error("Failed to generate hero image", e);
                setError("Could not generate image.");
                // A generic, tasteful fallback image for a magazine
                setImageUrl('https://images.unsplash.com/photo-1585212586749-DEBF25d5a739?q=80&w=800');
            } finally {
                setIsLoading(false);
            }
        };

        generate();

    }, [article, enabled]);

    return { generatedUrl: imageUrl, isLoading, error };
}

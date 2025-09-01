
import { Article, Post } from '../types';
import { articles as initialArticles } from '../articles';
import { initialPosts } from '../articles/communityPosts';
import * as gemini from './geminiService';
import { isArticleSafe, isPostSafe } from '../utils/helpers';

// --- Data Persistence (localStorage) ---

const ARTICLES_KEY = 'flaming-eck-articles';
const POSTS_KEY = 'flaming-eck-posts';


export function getArticles(): Article[] {
    try {
        const storedArticles = localStorage.getItem(ARTICLES_KEY);
        if (storedArticles) {
            const parsed = JSON.parse(storedArticles);
            if (Array.isArray(parsed)) {
                return parsed.filter(isArticleSafe);
            }
        }
    } catch (error) {
        console.error("Failed to read articles from localStorage:", error);
    }
    
    // If storage was empty or failed, use initial data and try to save it.
    try {
        localStorage.setItem(ARTICLES_KEY, JSON.stringify(initialArticles));
    } catch (error) {
        console.error("Failed to save initial articles to localStorage:", error);
    }
    return initialArticles;
}

export function getPosts(): Post[] {
    try {
        const storedPosts = localStorage.getItem(POSTS_KEY);
        if (storedPosts) {
            const parsed = JSON.parse(storedPosts);
            if (Array.isArray(parsed)) {
                return parsed.filter(isPostSafe);
            }
        }
    } catch (error) {
        console.error("Failed to read posts from localStorage:", error);
    }

    // If storage was empty or failed, use initial data and try to save it.
    try {
        localStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
    } catch (error) {
        console.error("Failed to save initial posts to localStorage:", error);
    }
    return initialPosts;
}

export function savePosts(posts: Post[]): void {
    try {
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    } catch (error) {
        console.error("Failed to save posts to localStorage:", error);
    }
}

// --- AI Service Abstraction (Proxy to Gemini) ---
// These functions simulate calling a backend API, which would then call Gemini.
// This is a crucial security step as API keys should never be on the client.

export async function generateSummary(articleBody: string): Promise<string> {
    // In a real app, this would be a fetch call to our own backend:
    // const response = await fetch('/api/summarize', { method: 'POST', body: JSON.stringify({ articleBody }) });
    // const data = await response.json();
    // return data.summary;

    // For now, we call the geminiService directly, simulating the backend's action.
    return gemini.generateSummary(articleBody);
}

export async function moderateContent(text: string): Promise<{isAppropriate: boolean; reason: string}> {
    return gemini.moderateContent(text);
}

export async function generateTopicSuggestion(): Promise<string> {
    return gemini.generateTopicSuggestion();
}
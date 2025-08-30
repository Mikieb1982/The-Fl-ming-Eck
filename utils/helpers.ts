
import { Article, ArticleBodyBlock } from './types';

export function sortByDateDesc(items: Article[]): Article[] {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function fmtDate(d: string | number | Date): string {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function isArticleSafe(a: Article | undefined | null): a is Article {
  return Boolean(a && a.id && a.title && a.author && a.category && a.hero && a.date && Array.isArray(a.body));
}

export function englishHeuristic(text: string): boolean {
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    // Allow newline, carriage return, standard ASCII, and common Latin-1 supplement chars
    if (cp === 10 || cp === 13 || (cp >= 32 && cp <= 126) || (cp >= 160 && cp <= 591)) continue;
    return false;
  }
  return true;
}

export function extractTextFromArticleBody(body: ArticleBodyBlock[]): string {
    return body
        .filter(block => block.type === 'paragraph' || block.type === 'subheading')
        .map(block => block.content)
        .join(' ');
}

export function calculateReadTime(body: ArticleBodyBlock[]): number {
  if (!body || body.length === 0) return 0;
  const text = extractTextFromArticleBody(body);
  const wordsPerMinute = 250;
  const wordCount = text.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime); // Ensure read time is at least 1 minute.
}

/**
 * Calculates the Levenshtein distance between two strings.
 * This is the number of edits (insertions, deletions, substitutions)
 * needed to change one string into the other.
 */
export function levenshteinDistance(a: string, b: string): number {
    const an = a.length;
    const bn = b.length;
    if (an === 0) return bn;
    if (bn === 0) return an;
    
    const matrix = Array(bn + 1).fill(null).map(() => Array(an + 1).fill(null));

    for (let i = 0; i <= an; i++) {
        matrix[0][i] = i;
    }

    for (let j = 0; j <= bn; j++) {
        matrix[j][0] = j;
    }

    for (let j = 1; j <= bn; j++) {
        for (let i = 1; i <= an; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,       // deletion
                matrix[j - 1][i] + 1,       // insertion
                matrix[j - 1][i - 1] + cost // substitution
            );
        }
    }

    return matrix[bn][an];
}


/**
 * Performs a fuzzy search to see if a query matches a text,
 * allowing for minor typos.
 */
export function fuzzySearch(query: string, text: string): boolean {
  const queryLower = query.toLowerCase().trim();
  const textLower = text.toLowerCase();

  if (!queryLower) return true;

  // Check for an exact substring match first for performance.
  if (textLower.includes(queryLower)) {
    return true;
  }
  
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
  const textWords = textLower.split(/\s+/).filter(w => w.length > 0);

  // Check if every word in the query has a fuzzy match in the text.
  return queryWords.every(queryWord => {
    return textWords.some(textWord => {
      // Words under 3 characters must be an exact match.
      if (queryWord.length < 3) {
        return queryWord === textWord;
      }
      // Set a tolerance threshold based on word length.
      const threshold = queryWord.length > 5 ? 2 : 1;
      return levenshteinDistance(queryWord, textWord) <= threshold;
    });
  });
}
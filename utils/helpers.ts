import { Article } from './types';

export function sortByDateDesc(items: Article[]): Article[] {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function fmtDate(d: string | number | Date): string {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function isArticleSafe(a: Article | undefined | null): a is Article {
  return Boolean(a && a.id && a.title && a.author && a.category && a.hero && a.date);
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

export function calculateReadTime(text: string): number {
  if (!text) return 0;
  const wordsPerMinute = 250;
  const wordCount = text.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTime); // Ensure read time is at least 1 minute.
}


import { useMemo } from 'react';
import { Article, ValidationResult, ValidationCheck } from '../types';
import { englishHeuristic } from '../utils/helpers';

function validateArticles(articles: Article[], now: Date = new Date("2025-08-27T00:00:00Z"), maxAgeDays: number = 45): ValidationResult {
  const checks: ValidationCheck[] = articles.map((a) => {
    const ageMs = Math.abs(now.getTime() - new Date(a.date).getTime());
    const ageDays = Math.ceil(ageMs / (1000 * 60 * 60 * 24));
    const english = englishHeuristic(`${a.title} ${a.body}`);
    const hasRequired = Boolean(a && a.id && a.title && a.author && a.category && a.hero && a.date);
    return { id: a?.id ?? "?", english, fresh: ageDays <= maxAgeDays, ageDays, hasRequired };
  });

  return {
    checks,
    allEnglish: checks.every((c) => c.english),
    allFresh: checks.every((c) => c.fresh),
    allRequired: checks.every((c) => c.hasRequired),
  };
}

export function useValidation(articles: Article[]): ValidationResult {
  return useMemo(() => validateArticles(articles), [articles]);
}

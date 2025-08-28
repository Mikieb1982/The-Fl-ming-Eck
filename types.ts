
export interface Article {
  id: string;
  title: string;
  author: string;
  date: string; // ISO date string
  category: string;
  excerpt: string;
  hero: string;
  pullQuote?: string;
  body: string[];
}

export interface ValidationCheck {
  id: string;
  english: boolean;
  fresh: boolean;
  ageDays: number;
  hasRequired: boolean;
}

export interface ValidationResult {
  checks: ValidationCheck[];
  allEnglish: boolean;
  allFresh: boolean;
  allRequired: boolean;
}

export interface SelfTest {
  name: string;
  pass: boolean;
}
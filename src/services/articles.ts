/**
 * Evidence-Based Medical Articles for PhysioHub
 * Topics: Physical Therapy, Rehabilitation, and Nutrition
 */

import { Language } from './translations';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  icon: string;
  image?: string;
}

export const getArticles = (lang: Language): Article[] => {
  void lang;
  return [];
};

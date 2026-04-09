import {useEffect, useState} from 'react';
import type {Article} from './articles';
import type {Language} from './translations';
import {
  isSupabaseConfigured,
  listPublishedArticles,
  replacePublishedArticles,
  type User,
  isArticleAdminUser,
  getArticleAdminEmail,
} from '../lib/supabase';

async function loadArticlesModule() {
  return import('./articles');
}

export async function getFallbackArticles(lang: Language): Promise<Article[]> {
  const {getArticles} = await loadArticlesModule();
  return getArticles(lang);
}

export async function loadPublishedArticles(lang: Language): Promise<Article[]> {
  if (!isSupabaseConfigured) return getFallbackArticles(lang);

  try {
    const cloudArticles = await listPublishedArticles(lang);
    return cloudArticles.length ? cloudArticles : await getFallbackArticles(lang);
  } catch {
    return getFallbackArticles(lang);
  }
}

export async function loadPublishedArticleBySlug(
  lang: Language,
  slug: string,
): Promise<Article | undefined> {
  const {getArticleBySlug} = await loadArticlesModule();
  const articles = await loadPublishedArticles(lang);
  return articles.find((article) => article.slug === slug) ?? getArticleBySlug(lang, slug);
}

export async function publishArticles(lang: Language, articles: Article[]) {
  await replacePublishedArticles(lang, articles);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('physiohub-articles-updated', {detail: {lang}}));
  }
}

export async function importFallbackArticlesToSupabase(lang: Language) {
  const fallbackArticles = await getFallbackArticles(lang);
  await publishArticles(lang, fallbackArticles);
  return fallbackArticles;
}

export function createBlankArticle(lang: Language, existingArticles: Article[]): Article {
  const nextId = existingArticles.reduce((max, article) => Math.max(max, article.id), 0) + 1;

  return {
    id: nextId,
    slug: lang === 'en' ? `new-article-${nextId}` : `maqal-jadid-${nextId}`,
    title: lang === 'en' ? 'New article title' : 'عنوان مقال جديد',
    excerpt:
      lang === 'en'
        ? 'Short summary that appears on the cards and search previews.'
        : 'ملخص قصير يظهر في كروت المقالات ونتائج البحث.',
    content:
      lang === 'en'
        ? `Write your introduction here.\n\n## First heading\nAdd your paragraph.\n\n* First point\n* Second point\n\n## Conclusion\nFinish the article here.`
        : `اكتب مقدمة المقال هنا.\n\n## العنوان الأول\nاكتب الفقرة هنا.\n\n* النقطة الأولى\n* النقطة الثانية\n\n## الخلاصة\nاختم المقال هنا.`,
    category: lang === 'en' ? 'General' : 'عام',
    date: new Date().toISOString().slice(0, 10),
    icon: 'BookOpen',
  };
}

export function slugifyArticleTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function canManageArticles(user: User | null) {
  return isArticleAdminUser(user);
}

export function getArticleAdminIdentity() {
  return getArticleAdminEmail();
}

export function usePublishedArticles(lang: Language) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const refresh = async () => {
      setLoading(true);
      const nextArticles = await loadPublishedArticles(lang);
      if (!active) return;
      setArticles(nextArticles);
      setLoading(false);
    };

    void refresh();

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{lang?: Language}>;
      if (!customEvent.detail?.lang || customEvent.detail.lang === lang) {
        void refresh();
      }
    };

    window.addEventListener('physiohub-articles-updated', handleUpdate);

    return () => {
      active = false;
      window.removeEventListener('physiohub-articles-updated', handleUpdate);
    };
  }, [lang]);

  return {articles, loading};
}

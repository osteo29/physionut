import {config as loadEnv} from 'dotenv';
import {createClient} from '@supabase/supabase-js';
import {getArticles} from '../src/services/articles';
import type {Database} from '../src/lib/supabaseDatabase';

loadEnv({path: '.env.local'});
loadEnv({path: '.env'});

const ARTICLE_SLUG = 'metabolic-aspects-of-exercise';

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

function mapPublicArticle(lang: 'en' | 'ar') {
  const article = getArticles(lang).find((entry) => entry.slug === ARTICLE_SLUG);
  if (!article) {
    throw new Error(`Article not found in fallback content for ${lang}`);
  }

  return {
    lang,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    date: article.date,
    icon: article.icon,
    image: article.image ?? null,
  };
}

function mapWorkflowArticle(lang: 'en' | 'ar') {
  const article = getArticles(lang).find((entry) => entry.slug === ARTICLE_SLUG);
  if (!article) {
    throw new Error(`Article not found in fallback content for ${lang}`);
  }

  return {
    lang,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    date: article.date,
    icon: article.icon,
    image: article.image ?? null,
    tags: [],
    image_alt: null,
    seo_title: article.title,
    seo_description: article.excerpt,
    og_image: null,
    canonical_url: null,
    status: 'published' as const,
    scheduled_for: null,
    published_at: new Date().toISOString(),
  };
}

async function main() {
  const url = requireEnv('VITE_SUPABASE_URL');
  const anonKey = requireEnv('VITE_SUPABASE_ANON_KEY');
  const adminEmail = requireEnv('SUPABASE_ADMIN_EMAIL');
  const adminPassword = requireEnv('SUPABASE_ADMIN_PASSWORD');

  const supabase = createClient<Database>(url, anonKey);

  const {error: signInError} = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (signInError) {
    throw signInError;
  }

  const workflowRows = [mapWorkflowArticle('en'), mapWorkflowArticle('ar')];
  const articleRows = [mapPublicArticle('en'), mapPublicArticle('ar')];

  try {
    const {error: workflowError} = await supabase
      .from('article_workflows')
      .upsert(workflowRows, {onConflict: 'lang,slug'});

    if (workflowError) {
      console.warn('Workflow sync skipped:', workflowError.message);
    } else {
      console.log('Workflow rows updated.');
    }
  } catch (error) {
    console.warn('Workflow sync skipped:', error instanceof Error ? error.message : String(error));
  }

  const {error: articleError} = await supabase.from('articles').upsert(articleRows, {onConflict: 'lang,slug'});
  if (articleError) {
    throw articleError;
  }

  const {data: verification, error: verificationError} = await supabase
    .from('articles')
    .select('lang,slug,title,date')
    .eq('slug', ARTICLE_SLUG)
    .order('lang', {ascending: true});

  if (verificationError) {
    throw verificationError;
  }

  console.log(JSON.stringify(verification, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

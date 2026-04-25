import {config as loadEnv} from 'dotenv';
import {createClient} from '@supabase/supabase-js';
import type {Article} from '../src/services/articles';
import {getArticles as getLocalArticles} from '../src/services/articles';
import type {InjuryProtocol} from '../src/services/injuryDatabase';
import {getGeneratedInjuryProtocols} from '../src/services/generatedRehabProtocolSource';
import type {Database} from '../src/lib/supabaseDatabase';

loadEnv({path: '.env.local'});
loadEnv();

type Language = 'en' | 'ar';

const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY?.trim() || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient<Database>(supabaseUrl, supabaseAnonKey) : null;

function mapArticleRecord(record: Database['public']['Tables']['articles']['Row'], index: number): Article {
  return {
    id: index + 1,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt,
    content: record.content,
    category: record.category,
    date: record.date,
    icon: record.icon,
    image: record.image || undefined,
  };
}

export async function getBuildArticles(lang: Language): Promise<Article[]> {
  if (!supabase) return getLocalArticles(lang);

  try {
    const {data, error} = await supabase
      .from('articles')
      .select('*')
      .eq('lang', lang)
      .order('date', {ascending: false})
      .order('created_at', {ascending: false});

    if (error) throw error;
    if (!data?.length) return getLocalArticles(lang);
    return data.map(mapArticleRecord);
  } catch {
    return getLocalArticles(lang);
  }
}

export async function getBuildInjuries(): Promise<InjuryProtocol[]> {
  return getGeneratedInjuryProtocols('en');
}

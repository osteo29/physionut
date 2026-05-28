import {createClient} from 'npm:@supabase/supabase-js@2.57.4';

type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

type Language = 'en' | 'ar';

type ArticleWorkflowRow = {
  id: string;
  lang: Language;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  icon: string;
  image: string | null;
  tags: string[] | null;
  image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  status: 'draft' | 'published' | 'scheduled';
  scheduled_for: string | null;
  published_at: string | null;
  updated_at: string;
};

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const scheduledJobSecret = Deno.env.get('SCHEDULED_JOB_SECRET') || '';

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for scheduled publisher.');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {persistSession: false, autoRefreshToken: false},
});

function isAuthorized(request: Request) {
  const providedSecret = request.headers.get('x-scheduled-job-secret');
  if (scheduledJobSecret && providedSecret === scheduledJobSecret) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${serviceRoleKey}`) {
    return true;
  }

  return false;
}

function jsonResponse(body: Json, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {'content-type': 'application/json; charset=utf-8'},
  });
}

async function createOperationLog(metadata: Json) {
  const {data, error} = await supabase
    .from('operation_logs')
    .insert({
      operation_name: 'scheduled_publisher',
      status: 'started',
      metadata,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id as string;
}

async function completeOperationLog(logId: string, metadata: Json) {
  const {error} = await supabase
    .from('operation_logs')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      metadata,
    })
    .eq('id', logId);

  if (error) throw error;
}

async function failOperationLog(logId: string, errorMessage: string, metadata: Json) {
  await supabase
    .from('operation_logs')
    .update({
      status: 'failed',
      failed_at: new Date().toISOString(),
      error_message: errorMessage,
      metadata,
      retry_count: 1,
    })
    .eq('id', logId);
}

async function emitEvent(eventName: string, aggregateType: string, aggregateKey: string, payload: Json) {
  const {error} = await supabase.from('system_events').insert({
    event_name: eventName,
    aggregate_type: aggregateType,
    aggregate_key: aggregateKey,
    payload,
  });

  if (error) throw error;
}

async function listDueScheduledWorkflows(limit: number) {
  const {data, error} = await supabase
    .from('article_workflows')
    .select('*')
    .eq('status', 'scheduled')
    .not('scheduled_for', 'is', null)
    .lte('scheduled_for', new Date().toISOString())
    .order('scheduled_for', {ascending: true})
    .limit(limit);

  if (error) throw error;
  return (data || []) as ArticleWorkflowRow[];
}

async function claimScheduledWorkflow(workflowId: string) {
  const nowIso = new Date().toISOString();
  const {data, error} = await supabase
    .from('article_workflows')
    .update({
      status: 'published',
      published_at: nowIso,
      scheduled_for: null,
    })
    .eq('id', workflowId)
    .eq('status', 'scheduled')
    .lte('scheduled_for', nowIso)
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return (data || null) as ArticleWorkflowRow | null;
}

async function getNextRevisionNumber(workflowId: string) {
  const {data, error} = await supabase
    .from('article_revisions')
    .select('revision_number')
    .eq('workflow_id', workflowId)
    .order('revision_number', {ascending: false})
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return ((data?.revision_number as number | undefined) || 0) + 1;
}

async function createRevisionSnapshot(workflow: ArticleWorkflowRow) {
  const nextRevisionNumber = await getNextRevisionNumber(workflow.id);

  const payload: Json = {
    slug: workflow.slug,
    title: workflow.title,
    excerpt: workflow.excerpt,
    content: workflow.content,
    category: workflow.category,
    date: workflow.date,
    icon: workflow.icon,
    image: workflow.image,
    tags: workflow.tags || [],
    imageAlt: workflow.image_alt,
    seoTitle: workflow.seo_title,
    seoDescription: workflow.seo_description,
    ogImage: workflow.og_image,
    canonicalUrl: workflow.canonical_url,
    status: workflow.status,
    scheduledFor: workflow.scheduled_for,
    publishedAt: workflow.published_at,
  };

  const {error} = await supabase.from('article_revisions').insert({
    workflow_id: workflow.id,
    lang: workflow.lang,
    slug: workflow.slug,
    revision_number: nextRevisionNumber,
    status: workflow.status,
    change_note: 'Published by scheduled publisher',
    payload,
    saved_by: null,
  });

  if (error) throw error;
}

async function syncPublishedArticlesForLanguage(lang: Language) {
  const {data: workflows, error: workflowError} = await supabase
    .from('article_workflows')
    .select('*')
    .eq('lang', lang)
    .eq('status', 'published')
    .order('date', {ascending: false})
    .order('updated_at', {ascending: false});

  if (workflowError) throw workflowError;

  const {error: deleteError} = await supabase.from('articles').delete().eq('lang', lang);
  if (deleteError) throw deleteError;

  if (!workflows?.length) return;

  const rows = workflows.map((workflow) => ({
    lang: workflow.lang,
    slug: workflow.slug,
    title: workflow.title,
    excerpt: workflow.excerpt,
    content: workflow.content,
    category: workflow.category,
    date: workflow.date,
    icon: workflow.icon,
    image: workflow.image,
  }));

  const {error: insertError} = await supabase.from('articles').insert(rows);
  if (insertError) throw insertError;
}

async function processScheduledPublishing(limit: number) {
  const dueCandidates = await listDueScheduledWorkflows(limit);
  const published: Array<{id: string; lang: Language; slug: string}> = [];
  const touchedLanguages = new Set<Language>();

  for (const candidate of dueCandidates) {
    const claimed = await claimScheduledWorkflow(candidate.id);
    if (!claimed) {
      continue;
    }

    await createRevisionSnapshot(claimed);
    await emitEvent('ARTICLE_PUBLISHED', 'article', claimed.slug, {
      workflowId: claimed.id,
      lang: claimed.lang,
      slug: claimed.slug,
      publishedAt: claimed.published_at,
      source: 'scheduled_publisher',
    });

    touchedLanguages.add(claimed.lang);
    published.push({id: claimed.id, lang: claimed.lang, slug: claimed.slug});
  }

  for (const lang of touchedLanguages) {
    await syncPublishedArticlesForLanguage(lang);
    await emitEvent('SITEMAP_REFRESH_REQUESTED', 'site', lang, {
      lang,
      source: 'scheduled_publisher',
      reason: 'article_published',
    });
  }

  return {
    checked: dueCandidates.length,
    publishedCount: published.length,
    published,
    touchedLanguages: [...touchedLanguages],
  };
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return jsonResponse({error: 'Method not allowed.'}, 405);
  }

  if (!isAuthorized(request)) {
    return jsonResponse({error: 'Unauthorized.'}, 401);
  }

  const body = await request.json().catch(() => ({}));
  const limit =
    typeof body.limit === 'number' && Number.isFinite(body.limit)
      ? Math.max(1, Math.min(50, Math.floor(body.limit)))
      : 20;

  const logId = await createOperationLog({limit, trigger: 'edge_function'});

  try {
    const result = await processScheduledPublishing(limit);
    await completeOperationLog(logId, result);
    return jsonResponse({ok: true, logId, ...result});
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown scheduled publishing error.';
    await failOperationLog(logId, message, {limit, trigger: 'edge_function'});
    return jsonResponse({ok: false, logId, error: message}, 500);
  }
});

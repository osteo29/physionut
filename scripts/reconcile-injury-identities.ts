import fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';
import {createClient} from '@supabase/supabase-js';
import {getAllInjuries} from '../src/services/injuryDatabase';

type ManifestMatchedItem = {
  sourceTitle: string;
  matchedSlug: string;
  phaseCount: number;
};

type ManifestData = {
  matched: ManifestMatchedItem[];
};

type InjuryRow = {
  id: string;
  injury_id_slug: string;
  name_en: string;
};

type Args = {
  deleteJunk: boolean;
};

type SuggestedAction = 'merge_alias_candidate' | 'keep_distinct_candidate' | 'needs_review';

const DISTINCT_KEYWORDS = [
  'conservative',
  'post operative',
  'post op',
  'postoperative',
  'grade',
  'graft',
  'repair',
  'reconstruction',
  'orif',
  'non operative',
  'with radiculopathy',
  'return to running',
  'return to sport',
  'first time',
  'burner stinger',
  'calcaneal apophysitis',
  'epiphysiolysis',
  'femoral neck',
  'hamstring graft',
  'post surgical',
  'post injection',
];

const SAFE_ALIAS_WORDS = new Set([
  'syndrome',
  'disorder',
  'pain',
]);

function parseArgs(argv: string[]): Args {
  return {
    deleteJunk: argv.includes('--delete-junk'),
  };
}

function loadEnv() {
  dotenv.config({path: path.resolve(process.cwd(), '.env.local')});
  dotenv.config({path: path.resolve(process.cwd(), '.env')});
}

function getSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.');
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function signInAdmin(client: ReturnType<typeof createClient>) {
  const email = process.env.SUPABASE_ADMIN_EMAIL?.trim();
  const password = process.env.SUPABASE_ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    throw new Error('Missing SUPABASE_ADMIN_EMAIL or SUPABASE_ADMIN_PASSWORD.');
  }

  const {error} = await client.auth.signInWithPassword({email, password});
  if (error) throw error;
}

function readManifest(): ManifestData {
  const manifestPath = path.resolve(process.cwd(), 'tmp/injury-import/import-manifest.json');
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as ManifestData;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[()[\]{}]/g, ' ')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function removeParentheticalAcronyms(value: string) {
  return value.replace(/\(([A-Z]{2,8})\)/g, ' ');
}

function normalizeAliasComparable(value: string) {
  return normalize(removeParentheticalAcronyms(value))
    .split(' ')
    .filter((word) => !SAFE_ALIAS_WORDS.has(word))
    .join(' ')
    .trim();
}

function hasDistinctKeyword(value: string) {
  const normalized = normalize(value);
  return DISTINCT_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function suggestAction(sourceTitle: string, matchedName: string, matchedSlug: string): SuggestedAction {
  const sourceComparable = normalizeAliasComparable(sourceTitle);
  const localNameComparable = normalizeAliasComparable(matchedName);
  const localSlugComparable = normalizeAliasComparable(matchedSlug.replace(/_/g, ' '));

  if (
    sourceComparable === localNameComparable ||
    sourceComparable === localSlugComparable ||
    (sourceComparable.includes(localNameComparable) && !hasDistinctKeyword(sourceTitle))
  ) {
    return 'merge_alias_candidate';
  }

  if (hasDistinctKeyword(sourceTitle)) {
    return 'keep_distinct_candidate';
  }

  return 'needs_review';
}

function buildMarkdownReport(params: {
  deletedJunkRows: string[];
  mergeAliasCandidates: Array<Record<string, string>>;
  keepDistinctCandidates: Array<Record<string, string>>;
  needsReview: Array<Record<string, string>>;
}) {
  const lines: string[] = [];

  lines.push('# Injury Reconciliation Plan');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('## Summary');
  lines.push(`- Deleted junk rows: ${params.deletedJunkRows.length}`);
  lines.push(`- Merge alias candidates: ${params.mergeAliasCandidates.length}`);
  lines.push(`- Keep distinct candidates: ${params.keepDistinctCandidates.length}`);
  lines.push(`- Needs manual review: ${params.needsReview.length}`);
  lines.push('');

  if (params.deletedJunkRows.length) {
    lines.push('## Deleted Junk Rows');
    for (const slug of params.deletedJunkRows) lines.push(`- ${slug}`);
    lines.push('');
  }

  lines.push('## Merge Alias Candidates');
  for (const item of params.mergeAliasCandidates) {
    lines.push(`- ${item.sourceTitle} -> canonical ${item.matchedSlug} (duplicate ${item.remoteSlug})`);
  }
  lines.push('');

  lines.push('## Keep Distinct Candidates');
  for (const item of params.keepDistinctCandidates) {
    lines.push(`- ${item.sourceTitle} -> keep distinct from ${item.matchedSlug} (current duplicate ${item.remoteSlug})`);
  }
  lines.push('');

  lines.push('## Needs Review');
  for (const item of params.needsReview) {
    lines.push(`- ${item.sourceTitle} -> review against ${item.matchedSlug} (current duplicate ${item.remoteSlug})`);
  }

  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  loadEnv();

  const client = getSupabaseClient();
  await signInAdmin(client);

  const manifest = readManifest();
  const localBySlug = new Map(getAllInjuries().map((injury) => [injury.id, injury]));

  const {data: remoteRows, error} = await client.from('injuries').select('id, injury_id_slug, name_en');
  if (error) throw error;

  const remoteBySlug = new Map((remoteRows || []).map((row) => [row.injury_id_slug, row as InjuryRow]));
  const deletedJunkRows: string[] = [];

  if (args.deleteJunk) {
    for (const junkSlug of ['new-injury-1', 'new-injury-79']) {
      const row = remoteBySlug.get(junkSlug);
      if (!row) continue;

      const {error: deleteError} = await client.from('injuries').delete().eq('id', row.id);
      if (deleteError) throw deleteError;

      remoteBySlug.delete(junkSlug);
      deletedJunkRows.push(junkSlug);
    }
  }

  const mergeAliasCandidates: Array<Record<string, string>> = [];
  const keepDistinctCandidates: Array<Record<string, string>> = [];
  const needsReview: Array<Record<string, string>> = [];

  for (const item of manifest.matched) {
    const remoteSlug = normalize(item.sourceTitle).replace(/\s+/g, '_');
    if (remoteSlug === item.matchedSlug) continue;

    const remote = remoteBySlug.get(remoteSlug);
    const local = localBySlug.get(item.matchedSlug);
    if (!remote || !local) continue;

    const record = {
      sourceTitle: item.sourceTitle,
      matchedSlug: item.matchedSlug,
      matchedName: local.name,
      remoteSlug,
      remoteName: remote.name_en,
    };

    const action = suggestAction(item.sourceTitle, local.name, item.matchedSlug);
    if (action === 'merge_alias_candidate') {
      mergeAliasCandidates.push(record);
      continue;
    }
    if (action === 'keep_distinct_candidate') {
      keepDistinctCandidates.push(record);
      continue;
    }
    needsReview.push(record);
  }

  mergeAliasCandidates.sort((left, right) => left.sourceTitle.localeCompare(right.sourceTitle));
  keepDistinctCandidates.sort((left, right) => left.sourceTitle.localeCompare(right.sourceTitle));
  needsReview.sort((left, right) => left.sourceTitle.localeCompare(right.sourceTitle));

  const output = {
    generatedAt: new Date().toISOString(),
    deletedJunkRows,
    totals: {
      mergeAliasCandidates: mergeAliasCandidates.length,
      keepDistinctCandidates: keepDistinctCandidates.length,
      needsReview: needsReview.length,
    },
    mergeAliasCandidates,
    keepDistinctCandidates,
    needsReview,
  };

  const jsonPath = path.resolve(process.cwd(), 'tmp/injury-import/reconciliation-plan.json');
  const mdPath = path.resolve(process.cwd(), 'tmp/injury-import/reconciliation-plan.md');

  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  fs.writeFileSync(
    mdPath,
    buildMarkdownReport({
      deletedJunkRows,
      mergeAliasCandidates,
      keepDistinctCandidates,
      needsReview,
    }),
  );

  console.log(`Wrote reconciliation plan to ${jsonPath}`);
  console.log(`Wrote reconciliation report to ${mdPath}`);
  console.log(JSON.stringify(output.totals, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

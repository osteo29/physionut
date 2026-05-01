import {getAllInjuries, getInjuryBySlug, type InjuryProtocol} from './injuryDatabase';
import {
  fetchCompleteInjuryProtocol as fetchCompleteSupabaseInjuryProtocol,
  fetchInjuriesFromSupabase,
  type InjuryRow,
} from './injurySupabaseService';
import {
  getLocalizedBodyRegion,
  getLocalizedCategory,
  getLocalizedCommonInjuryContext,
  getLocalizedInjuryName,
  getLocalizedInjuryOverview,
} from './injuryLocalization';
import {
  fetchCompleteRehabProtocol,
  fetchRehabProtocolsFromSupabase,
  getRehabProtocolSlug,
  type RehabProtocolRow,
} from './rehabProtocolSupabaseService';
import type {Language} from './translations';

export type InjuryCatalogSource = 'supabase' | 'generated' | 'local';

export type InjuryCatalogEntry = {
  id: string;
  slug: string;
  name: string;
  category: string;
  bodyRegion: string;
  overview: string;
  commonIn: string[];
  source: InjuryCatalogSource;
  remoteRef?: RehabProtocolRow;
};

let remoteInjuryRowsCache: RehabProtocolRow[] | null = null;
let remoteInjuryRowsPromise: Promise<RehabProtocolRow[]> | null = null;

function mapGeneratedInjury(row: RehabProtocolRow, lang: Language): InjuryCatalogEntry {
  const slug = getRehabProtocolSlug(row.name);
  const localizedName = getLocalizedInjuryName(slug.replace(/-/g, '_'), row.name, lang) || row.name;
  const bodyRegion = row.category || 'General';
  const overview =
    row.description ||
    `${row.name} rehab protocol with phased goals, precautions, and progression criteria.`;

  return {
    id: slug.replace(/-/g, '_'),
    slug,
    name: localizedName,
    category: getLocalizedCategory(bodyRegion, lang),
    bodyRegion: getLocalizedBodyRegion(bodyRegion, lang),
    overview: getLocalizedInjuryOverview(localizedName, bodyRegion, bodyRegion, overview, lang),
    commonIn: [],
    source: 'generated',
    remoteRef: row,
  };
}

function mapSupabaseInjury(row: InjuryRow, lang: Language): InjuryCatalogEntry {
  const slug = row.injury_id_slug.replace(/_/g, '-');
  const baseName = lang === 'ar' ? row.name_ar || row.name_en : row.name_en;
  const baseCategory = row.category || 'General';
  const baseBodyRegion =
    lang === 'ar' ? row.body_region_ar || row.body_region_en || baseCategory : row.body_region_en || baseCategory;
  const overview =
    (lang === 'ar' ? row.overview_ar || row.overview_en : row.overview_en) ||
    `${baseName} rehab protocol with phased goals, precautions, and progression criteria.`;

  return {
    id: row.injury_id_slug,
    slug,
    name: getLocalizedInjuryName(row.injury_id_slug, baseName, lang),
    category: getLocalizedCategory(baseCategory, lang),
    bodyRegion: getLocalizedBodyRegion(baseBodyRegion, lang),
    overview: getLocalizedInjuryOverview(baseName, baseCategory, baseBodyRegion, overview, lang),
    commonIn: (row.common_in || []).map((item) => getLocalizedCommonInjuryContext(item, lang)),
    source: 'supabase',
  };
}

function mapLocalInjury(injury: InjuryProtocol, lang: Language): InjuryCatalogEntry {
  const localizedName = getLocalizedInjuryName(injury.id, injury.name, lang);
  const category = getLocalizedCategory(injury.category, lang);
  const bodyRegion = getLocalizedBodyRegion(injury.bodyRegion, lang);
  const overview = getLocalizedInjuryOverview(
    localizedName,
    injury.category,
    injury.bodyRegion,
    injury.pageContent?.intro ||
      `${injury.name} rehab protocol with phased goals, precautions, and progression criteria.`,
    lang,
  );

  return {
    id: injury.id,
    slug: injury.id.replace(/_/g, '-'),
    name: localizedName,
    category,
    bodyRegion,
    overview,
    commonIn: injury.commonIn.map((item) => getLocalizedCommonInjuryContext(item, lang)),
    source: 'local',
  };
}

export function getLocalCatalogInjuries(lang: Language): InjuryCatalogEntry[] {
  return getAllInjuries()
    .map((injury) => mapLocalInjury(injury, lang))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function getRemoteInjuryRows(options?: {force?: boolean}) {
  if (options?.force) {
    remoteInjuryRowsCache = null;
    remoteInjuryRowsPromise = null;
  }

  if (remoteInjuryRowsCache) {
    return remoteInjuryRowsCache;
  }

  if (!remoteInjuryRowsPromise) {
    remoteInjuryRowsPromise = fetchRehabProtocolsFromSupabase()
      .then((rows) => {
        remoteInjuryRowsCache = rows;
        return rows;
      })
      .catch((error) => {
        remoteInjuryRowsPromise = null;
        throw error;
      });
  }

  return remoteInjuryRowsPromise;
}

async function getSupabaseCatalogInjuries(lang: Language) {
  const rows = await fetchInjuriesFromSupabase();
  if (!rows.length) return [];

  return rows
    .map((row) => mapSupabaseInjury(row, lang))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function getCatalogInjuries(lang: Language): Promise<{injuries: InjuryCatalogEntry[]; source: InjuryCatalogSource}> {
  try {
    const supabaseInjuries = await getSupabaseCatalogInjuries(lang);
    if (supabaseInjuries.length) {
      return {
        injuries: supabaseInjuries,
        source: 'supabase',
      };
    }

    const rows = await getRemoteInjuryRows();
    return {
      injuries: rows.map((row) => mapGeneratedInjury(row, lang)),
      source: 'generated',
    };
  } catch {
    return {
      injuries: getLocalCatalogInjuries(lang),
      source: 'local',
    };
  }
}

export async function getInjuryProtocolBySlugWithFallback(
  slug: string,
  lang: Language,
): Promise<{injury: InjuryProtocol | null; source: InjuryCatalogSource; remoteIds: string[]}> {
  try {
    const supabaseProtocol = await fetchCompleteSupabaseInjuryProtocol(slug, lang);
    if (supabaseProtocol) {
      const supabaseRows = await fetchInjuriesFromSupabase();
      return {
        injury: supabaseProtocol,
        source: 'supabase',
        remoteIds: supabaseRows.map((row) => row.injury_id_slug),
      };
    }

    const [protocol, rows] = await Promise.all([
      fetchCompleteRehabProtocol(slug, lang),
      getRemoteInjuryRows(),
    ]);
    const localProtocol = getInjuryBySlug(slug) ?? null;
    const resolvedProtocol = protocol ?? localProtocol;

    return {
      injury: resolvedProtocol,
      source: protocol ? 'generated' : 'local',
      remoteIds: rows.map((row) => getRehabProtocolSlug(row.name).replace(/-/g, '_')),
    };
  } catch {
    const localProtocol = getInjuryBySlug(slug) ?? null;
    return {
      injury: localProtocol,
      source: 'local',
      remoteIds: [],
    };
  }
}

export async function getRelatedCatalogInjuriesByIds(
  ids: string[],
  lang: Language,
): Promise<InjuryCatalogEntry[]> {
  const normalizedIds = [...new Set(ids.filter(Boolean))];
  if (!normalizedIds.length) return [];

  try {
    const supabaseRows = await fetchInjuriesFromSupabase();
    if (supabaseRows.length) {
      const supabaseById = new Map(supabaseRows.map((row) => [row.injury_id_slug, row]));

      return normalizedIds
        .map((id) => {
          const remote = supabaseById.get(id);
          return remote ? mapSupabaseInjury(remote, lang) : null;
        })
        .filter((item): item is InjuryCatalogEntry => Boolean(item));
    }

    const rows = await getRemoteInjuryRows();
    const remoteById = new Map(rows.map((row) => [getRehabProtocolSlug(row.name).replace(/-/g, '_'), row]));

    return normalizedIds
      .map((id) => {
        const remote = remoteById.get(id);
        return remote ? mapGeneratedInjury(remote, lang) : null;
      })
      .filter((item): item is InjuryCatalogEntry => Boolean(item));
  } catch {
    return getLocalCatalogInjuries(lang).filter((injury) => normalizedIds.includes(injury.id));
  }
}

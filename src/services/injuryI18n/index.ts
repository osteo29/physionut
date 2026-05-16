import {formatConditionName} from '../medicalTerminology';
import type {Language} from '../translations';
import {LEGACY_INJURY_NAMES_AR} from './legacyCatalog';
import {PROTOCOL_TRANSLATIONS} from './protocolDictionary.generated';
import {
  inferBodyRegionFromProtocolRegion,
  translateActivityContext,
  translateBodyRegion,
  translateCategory,
} from './taxonomy';

export {translateCategory, translateBodyRegion, translateActivityContext, inferBodyRegionFromProtocolRegion};
export {PROTOCOL_TRANSLATIONS, PROTOCOL_TRANSLATION_COUNT} from './protocolDictionary.generated';
export * from './uiStrings';

export type InjuryTranslationInput = {
  /** Protocol slug (kebab-case) or legacy id (underscore) */
  slugOrId: string;
  /** English display name from data source */
  nameEn: string;
  /** Category string from protocol row or catalog */
  category?: string;
  /** Body region from protocol JSON region field */
  regionEn?: string;
  /** English overview / description */
  overviewEn?: string;
};

export type InjuryTranslationResult = {
  name: string;
  category: string;
  bodyRegion: string;
  overview: string;
};

function normalizeSlugKey(slugOrId: string) {
  return slugOrId.trim().toLowerCase().replace(/_/g, '-');
}

function normalizeLegacyId(slugOrId: string) {
  return slugOrId.trim().toLowerCase().replace(/-/g, '_');
}

function hasArabicText(value: string) {
  return /[\u0600-\u06FF]/.test(value);
}

function buildOverviewAr(nameAr: string, categoryAr: string, bodyRegionAr: string) {
  return `${nameAr} من إصابات ${categoryAr} التي تؤثر على ${bodyRegionAr}، وتحتاج إلى تدرج جيد في العلاج والتغذية والعودة للنشاط.`;
}

/**
 * Primary injury translation API — replaces injuryLocalization.ts
 */
export function translateInjury(
  input: InjuryTranslationInput,
  lang: Language,
): InjuryTranslationResult {
  const slugKey = normalizeSlugKey(input.slugOrId);
  const legacyId = normalizeLegacyId(input.slugOrId);
  const protocolEntry = PROTOCOL_TRANSLATIONS[slugKey];

  const regionEn = input.regionEn || protocolEntry?.regionEn || 'General';
  const bodyRegionKey = inferBodyRegionFromProtocolRegion(regionEn);
  const categoryRaw = input.category || 'General';

  if (lang === 'en') {
    const name = formatConditionName(input.nameEn, 'en');
    return {
      name: protocolEntry?.titleEn || name,
      category: translateCategory(categoryRaw, 'en'),
      bodyRegion: translateBodyRegion(bodyRegionKey, 'en'),
      overview:
        input.overviewEn ||
        (protocolEntry
          ? `${protocolEntry.titleEn} is a structured rehab protocol for the ${bodyRegionKey.toLowerCase()} with phased goals and progression criteria.`
          : `${name} rehab protocol with phased goals, precautions, and progression criteria.`),
    };
  }

  const nameAr =
    protocolEntry?.nameAr ||
    LEGACY_INJURY_NAMES_AR[legacyId] ||
    (hasArabicText(input.nameEn) ? input.nameEn : formatConditionName(input.nameEn, 'ar'));

  const categoryAr = translateCategory(categoryRaw, 'ar');
  const bodyRegionAr = protocolEntry?.regionAr || translateBodyRegion(bodyRegionKey, 'ar');

  const overview =
    (input.overviewEn && hasArabicText(input.overviewEn) ? input.overviewEn : null) ||
    protocolEntry?.overviewAr ||
    (input.overviewEn && !hasArabicText(input.overviewEn)
      ? buildOverviewAr(nameAr, categoryAr, bodyRegionAr)
      : buildOverviewAr(nameAr, categoryAr, bodyRegionAr));

  return {
    name: nameAr,
    category: categoryAr,
    bodyRegion: bodyRegionAr,
    overview,
  };
}

/** @deprecated Use translateInjury — kept for gradual migration */
export function getLocalizedInjuryName(id: string, fallback: string, lang: Language) {
  return translateInjury({slugOrId: id, nameEn: fallback}, lang).name;
}

/** @deprecated Use translateInjury */
export function getLocalizedCategory(category: string, lang: Language) {
  return translateCategory(category, lang);
}

/** @deprecated Use translateInjury */
export function getLocalizedBodyRegion(bodyRegion: string, lang: Language) {
  return translateBodyRegion(bodyRegion, lang);
}

/** @deprecated Use translateActivityContext */
export function getLocalizedCommonInjuryContext(item: string, lang: Language) {
  return translateActivityContext(item, lang);
}

/** @deprecated Use translateInjury */
export function getLocalizedInjuryOverview(
  injuryName: string,
  category: string,
  bodyRegion: string,
  fallback: string,
  lang: Language,
) {
  if (lang !== 'ar') return fallback;
  return translateInjury(
    {slugOrId: '', nameEn: injuryName, category, regionEn: bodyRegion, overviewEn: fallback},
    'ar',
  ).overview;
}

export function textLooksArabic(value: string) {
  return hasArabicText(value);
}

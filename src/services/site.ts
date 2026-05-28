const DEFAULT_SITE_URL = 'https://activerehab.vercel.app';

function readConfiguredSiteUrl() {
  const viteEnv =
    typeof import.meta !== 'undefined'
      ? (import.meta as ImportMeta & {env?: {VITE_SITE_URL?: string}}).env
      : undefined;
  const nodeEnv = (globalThis as {process?: {env?: {VITE_SITE_URL?: string}}}).process?.env;

  return viteEnv?.VITE_SITE_URL || nodeEnv?.VITE_SITE_URL || DEFAULT_SITE_URL;
}

export function getSiteUrl() {
  return readConfiguredSiteUrl().trim().replace(/\/+$/, '');
}

export function buildAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

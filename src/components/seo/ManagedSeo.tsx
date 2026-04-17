import {useEffect, useState} from 'react';
import type {SeoConfig} from './seoCore';
import Seo from './Seo';
import {
  getCachedSeoOverrides,
  loadSeoOverrides,
  resolveSeoCopy,
  type SeoLanguage,
  type SeoOverrideRow,
  type SeoPageKey,
  type SeoTemplateValues,
} from '../../services/managedSeo';

type ManagedSeoProps = Omit<SeoConfig, 'title' | 'description'> & {
  pageKey: SeoPageKey;
  lang: SeoLanguage;
  templateValues?: SeoTemplateValues;
};

export default function ManagedSeo({
  pageKey,
  lang,
  templateValues,
  ...seoProps
}: ManagedSeoProps) {
  const [overrides, setOverrides] = useState<Partial<Record<SeoPageKey, SeoOverrideRow>> | null>(
    () => getCachedSeoOverrides() || null,
  );

  useEffect(() => {
    let active = true;

    void loadSeoOverrides()
      .then((data) => {
        if (active) {
          setOverrides(data);
        }
      })
      .catch(() => {
        if (active) {
          setOverrides({});
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const resolved = resolveSeoCopy({
    pageKey,
    lang,
    templateValues,
    overrides,
  });

  return <Seo {...seoProps} title={resolved.title} description={resolved.description} />;
}

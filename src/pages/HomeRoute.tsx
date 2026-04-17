import {useEffect} from 'react';
import App from '../App';
import ManagedSeo from '../components/seo/ManagedSeo';
import {getCalculatorPageBySlug, type CalculatorPageSlug} from '../services/calculatorPages';
import {buildHreflangs} from '../utils/langUrlHelper';
import usePreferredLang from './usePreferredLang';

export default function HomeRoute({
  scrollToId,
  calculatorSlug,
  theme,
  onToggleTheme,
}: {
  scrollToId?: 'calculators' | 'blog' | 'about';
  calculatorSlug?: CalculatorPageSlug;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const lang = usePreferredLang();
  const calculatorPage = getCalculatorPageBySlug(calculatorSlug);
  const canonicalPath = calculatorPage
    ? `/calculators/${calculatorPage.slug}`
    : scrollToId
      ? `/${scrollToId === 'calculators' ? 'calculators' : scrollToId}`
      : '/';
  const pageKey = calculatorPage ? 'calculator_detail' : scrollToId === 'calculators' ? 'calculators' : 'home';

  useEffect(() => {
    if (!scrollToId) return;
    const t = setTimeout(() => {
      document.getElementById(scrollToId)?.scrollIntoView({behavior: 'smooth'});
    }, 0);
    return () => clearTimeout(t);
  }, [scrollToId]);

  return (
    <>
      <ManagedSeo
        pageKey={pageKey}
        lang={lang}
        canonicalPath={canonicalPath}
        hreflangs={buildHreflangs(canonicalPath)}
        templateValues={
          calculatorPage
            ? {
                calculatorTitle: lang === 'ar' ? calculatorPage.titleAr : calculatorPage.titleEn,
                calculatorDescription:
                  lang === 'ar' ? calculatorPage.descriptionAr : calculatorPage.descriptionEn,
              }
            : undefined
        }
      />
      <App
        theme={theme}
        onToggleTheme={onToggleTheme}
        initialCalculatorId={calculatorPage?.calculatorId || null}
      />
    </>
  );
}

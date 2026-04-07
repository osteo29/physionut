import {useEffect} from 'react';
import App from '../App';
import Seo from '../components/seo/Seo';
import {getCalculatorPageBySlug, type CalculatorPageSlug} from '../services/calculatorPages';
import {buildHreflangs} from '../utils/langUrlHelper';

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
  const calculatorPage = getCalculatorPageBySlug(calculatorSlug);
  const canonicalPath = calculatorPage
    ? `/calculators/${calculatorPage.slug}`
    : scrollToId
      ? `/${scrollToId === 'calculators' ? 'calculators' : scrollToId}`
      : '/';
  const title = calculatorPage
    ? `${calculatorPage.titleEn} | PhysioNutrition`
    : 'PhysioNutrition | Clinical Calculators for Therapy & Nutrition';
  const description = calculatorPage?.descriptionEn || 'Evidence-based clinical calculators for physical therapists, nutritionists, and fitness enthusiasts. BMI, BMR, TDEE, and more.';

  useEffect(() => {
    if (!scrollToId) return;
    const t = setTimeout(() => {
      document.getElementById(scrollToId)?.scrollIntoView({behavior: 'smooth'});
    }, 0);
    return () => clearTimeout(t);
  }, [scrollToId]);

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonicalPath={canonicalPath}
        hreflangs={buildHreflangs(canonicalPath)}
      />
      <App theme={theme} onToggleTheme={onToggleTheme} initialCalculatorId={calculatorPage?.calculatorId || null} />
    </>
  );
}

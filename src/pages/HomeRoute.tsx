import {useEffect} from 'react';
import App from '../App';
import Seo from '../components/seo/Seo';
import {buildHreflangs} from '../utils/langUrlHelper';

export default function HomeRoute({
  scrollToId,
  theme,
  onToggleTheme,
}: {
  scrollToId?: 'calculators' | 'blog' | 'about';
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  const canonicalPath = scrollToId ? `/${scrollToId === 'calculators' ? 'calculators' : scrollToId}` : '/';

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
        title="PhysioNutrition | Clinical Calculators for Therapy & Nutrition"
        description="Evidence-based clinical calculators for physical therapists, nutritionists, and fitness enthusiasts. BMI, BMR, TDEE, and more."
        canonicalPath={canonicalPath}
        hreflangs={buildHreflangs(canonicalPath)}
      />
      <App theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );
}

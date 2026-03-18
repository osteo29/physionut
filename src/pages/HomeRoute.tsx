import {useEffect} from 'react';
import App from '../App';
import Seo from '../components/seo/Seo';

export default function HomeRoute({
  scrollToId,
  theme,
  onToggleTheme,
}: {
  scrollToId?: 'calculators' | 'blog' | 'about';
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
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
        title="PhysioHub | Clinical Calculators for Therapy & Nutrition"
        description="Evidence-based clinical calculators for physical therapists, nutritionists, and fitness enthusiasts. BMI, BMR, TDEE, and more."
        canonicalPath={scrollToId ? `/${scrollToId === 'calculators' ? 'calculators' : scrollToId}` : '/'}
      />
      <App theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );
}

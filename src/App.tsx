import {lazy, Suspense, useEffect, useMemo, useState} from 'react';
import {buildQuickSections} from './features/tools/app/config';
import type {CalculatorType} from './features/tools/app/types';
import {useAIDietPlan} from './hooks/useAIDietPlan';
import {useAppDerivedContent} from './hooks/useAppDerivedContent';
import {useArchitectProfile} from './hooks/useArchitectProfile';
import {useCalculatorWorkspace} from './hooks/useCalculatorWorkspace';
import {setPreferredLanguage} from './services/languagePreference';
import {translations, type Language} from './services/translations';
import {usePublishedArticles} from './services/articleStudio';
import {HomeSectionFallback, IconComponent} from './components/home/AppShellHelpers';
import CalculatorSection from './components/app/CalculatorSection';
import HealthProfileSection from './components/architect/HealthProfileSection';
import Hero from './components/home/Hero';
import InjuryProtocolsHighlight from './components/home/InjuryProtocolsHighlight';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import ConsentBanner from './components/monetization/ConsentBanner';
import AdSlot from './components/monetization/AdSlot';

const WhatsNew = lazy(() => import('./components/home/WhatsNew'));
const AboutSection = lazy(() => import('./components/home/AboutSection'));
const BlogSection = lazy(() => import('./components/home/BlogSection'));
const TrustSection = lazy(() => import('./components/home/TrustSection'));
const SupportToolsSection = lazy(() => import('./components/home/SupportToolsSection'));

export default function App({
  theme,
  onToggleTheme,
  initialCalculatorId = null,
}: {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  initialCalculatorId?: CalculatorType;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('physiohub_lang');
    return (saved as Language) || 'en';
  });

  const t = translations[lang];
  const {
    architectDraft,
    architectMetrics,
    architectProfile,
    architectResultsRef,
    calculateArchitectProfile,
    initialArchitectProfile,
    setArchitectProfile,
    updateArchitectDraft,
  } = useArchitectProfile();

  const {
    aiDietPlan,
    generateAIDietPlan,
    isGeneratingPlan,
  } = useAIDietPlan({
    architectMetrics,
    architectProfile,
    lang,
  });

  const calculator = useCalculatorWorkspace({
    architectProfile,
    initialArchitectProfile,
    initialCalculatorId,
    lang,
    setArchitectProfile,
    t,
  });

  const quickSections = useMemo(() => buildQuickSections(lang, t), [lang, t]);
  const {articles} = usePublishedArticles(lang);
  const {assessmentSnapshot, practicalGuide} = useAppDerivedContent({
    activeCalculator: calculator.activeCalculator,
    healthInterpretation: calculator.healthInterpretation,
    lang,
    result: calculator.result,
  });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    setPreferredLanguage(lang);
  }, [lang]);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navigation
        t={t}
        lang={lang}
        setLang={setLang}
        calculators={calculator.calculators}
        theme={theme}
        onToggleTheme={onToggleTheme}
        setActiveCalculator={(id) => calculator.setActiveCalculator(id as CalculatorType)}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main id="main-content" className="flex-1">
        <Hero lang={lang} />

        <section className="border-b border-slate-100 bg-white py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {quickSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all hover:border-health-green/30 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-soft-blue text-health-green transition-transform group-hover:scale-105">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mb-1 font-bold text-slate-900">{section.title}</h2>
                  <p className="text-sm leading-6 text-slate-600">{section.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-slate-50 py-5 sm:py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  title: lang === 'en' ? 'Built for rehab and recovery' : 'مصمم للتعافي وإعادة التأهيل',
                  desc: lang === 'en'
                    ? 'The positioning is now centered around injured users, recovery, and physio workflows.'
                    : 'تم توجيه الرسالة لتناسب المصابين، التعافي، وسيناريوهات العلاج الطبيعي.',
                },
                {
                  title: lang === 'en' ? 'Clinical formulas + context' : 'معادلات سريرية + سياق',
                  desc: lang === 'en'
                    ? 'Results are based on established formulas, then translated into easier next actions.'
                    : 'النتائج مبنية على معادلات معروفة، ثم تتحول إلى خطوات أوضح وأسهل.',
                },
                {
                  title: lang === 'en' ? 'Educational, not diagnostic' : 'إرشادي وليس تشخيصيًا',
                  desc: lang === 'en'
                    ? 'Useful for planning and education, while medical decisions should still involve professionals.'
                    : 'مفيد للتخطيط والتوعية، مع بقاء القرارات الطبية عند المختصين.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="mb-2 font-bold text-slate-900">{item.title}</h2>
                  <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<HomeSectionFallback className="bg-white py-12" />}>
          <TrustSection lang={lang} />
        </Suspense>

        <section className="bg-white py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AdSlot
              lang={lang}
              label={lang === 'en' ? 'Sponsored area' : 'مساحة إعلانية'}
              slot={import.meta.env.VITE_ADSENSE_SLOT_INLINE}
              format="horizontal"
            />
          </div>
        </section>

        <Suspense fallback={<HomeSectionFallback className="bg-white py-16" />}>
          <WhatsNew lang={lang} />
        </Suspense>

        <InjuryProtocolsHighlight lang={lang} />

        <HealthProfileSection
          aiDietPlan={aiDietPlan}
          architectDraft={architectDraft}
          architectMetrics={architectMetrics}
          architectProfile={architectProfile}
          architectResultsRef={architectResultsRef}
          calculateArchitectProfile={calculateArchitectProfile}
          generateAIDietPlan={generateAIDietPlan}
          isGeneratingPlan={isGeneratingPlan}
          lang={lang}
          setArchitectProfile={setArchitectProfile}
          t={t}
          updateArchitectDraft={updateArchitectDraft}
        />

        <CalculatorSection
          assessmentSnapshot={assessmentSnapshot}
          controller={calculator}
          lang={lang}
          practicalGuide={practicalGuide}
          t={t}
        />

        <Suspense fallback={<HomeSectionFallback className="bg-white py-20" />}>
          <SupportToolsSection
            lang={lang}
            t={t}
            foodCategory={calculator.foodCategory}
            setFoodCategory={calculator.setFoodCategory}
            showFoodTable={calculator.showFoodTable}
            setShowFoodTable={calculator.setShowFoodTable}
            foodSearch={calculator.foodSearch}
            setFoodSearch={calculator.setFoodSearch}
            filteredFoods={calculator.filteredFoods}
            addFoodToMeal={calculator.addFoodToMeal}
            setIsCustomModalOpen={calculator.setIsCustomModalOpen}
          />
        </Suspense>

        <Suspense fallback={<HomeSectionFallback className="bg-slate-50 py-20" />}>
          <BlogSection
            t={t}
            lang={lang}
            articles={articles}
            IconComponent={IconComponent}
          />
        </Suspense>

        <Suspense fallback={<HomeSectionFallback className="bg-white py-16" />}>
          <AboutSection lang={lang} />
        </Suspense>
      </main>

      <Footer t={t} lang={lang} />
      <ConsentBanner lang={lang} />
    </div>
  );
}

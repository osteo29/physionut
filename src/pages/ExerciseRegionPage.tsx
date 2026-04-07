import {Activity, ArrowRight, ChevronRight, Dumbbell, Network} from 'lucide-react';
import {Link, Navigate, useParams} from 'react-router-dom';

import {ExerciseCard} from '../components/common/exercise-finder/ExerciseCard';
import {Badge} from '../components/common/exercise-finder/FilterField';
import {
  REGION_CONTENT,
  getExercisesForRegion,
  getSystemsForRegion,
  getWeeklyPlanForSystem,
} from '../components/common/exercise-finder/content';
import {
  EXERCISE_FINDER_STATIC_ARABIC_LABELS,
  EXERCISE_FINDER_STATIC_LABELS,
  EXERCISE_FINDER_STATIC_SLUGS,
} from '../components/common/exercise-finder/constants';
import {TrainingSystemCard} from '../components/common/exercise-finder/TrainingSystemCard';
import {WeeklyPlanCard} from '../components/common/exercise-finder/WeeklyPlanCard';
import Seo from '../components/seo/Seo';
import {denormalizeExerciseUrlSlug, normalizeExerciseUrlSlug} from '../services/seoAliases';
import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';
import type {StaticMuscleSlug} from '../components/common/exercise-finder/types';

function isStaticMuscleSlug(value: string | undefined): value is StaticMuscleSlug {
  return Boolean(value && EXERCISE_FINDER_STATIC_SLUGS.includes(value as StaticMuscleSlug));
}

export default function ExerciseRegionPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const {muscle} = useParams<{muscle: string}>();
  const normalizedMuscle = denormalizeExerciseUrlSlug(muscle || '');

  if (muscle && normalizeExerciseUrlSlug(normalizedMuscle) !== muscle) {
    return <Navigate to={`/${lang}/exercises/${normalizeExerciseUrlSlug(normalizedMuscle)}`} replace />;
  }

  if (!isStaticMuscleSlug(normalizedMuscle)) {
    return <Navigate to={navigationPaths.exercises(lang)} replace />;
  }

  const region = normalizedMuscle;
  const label = isAr ? EXERCISE_FINDER_STATIC_ARABIC_LABELS[region] : EXERCISE_FINDER_STATIC_LABELS[region];
  const content = REGION_CONTENT[region];
  const exercises = getExercisesForRegion(region);
  const systems = getSystemsForRegion(region).slice(0, 3);
  const canonicalPath = `/exercises/${normalizeExerciseUrlSlug(region)}`;
  const seoTitle = isAr ? `تمارين ${label} | تشريح مبسط وخطة تمارين كاملة` : `${label} Exercises | Anatomy, exercise library, and workout systems`;
  const seoDescription = isAr
    ? `${content.introAr} ستجد أيضًا صفحات الأنظمة المناسبة وروابط الخطة الأسبوعية وتمارين ${label} الكاملة.`
    : `${content.introEn} Explore full ${EXERCISE_FINDER_STATIC_LABELS[region].toLowerCase()} exercises, simple anatomy notes, linked workout systems, and weekly plan guidance.`;

  return (
    <PageLayout title={isAr ? `دليل تمارين ${label}` : `${label} Exercise Guide`}>
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath={canonicalPath}
        hreflangs={buildHreflangs(canonicalPath)}
      />

      <div className="not-prose space-y-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link to={`/${lang}/`} className="hover:text-health-green">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={navigationPaths.exercises(lang)} className="hover:text-health-green">{isAr ? 'التمارين' : 'Exercises'}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-slate-900">{label}</span>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_42%),linear-gradient(180deg,#ffffff,#f8fafc)] p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-health-green/20 bg-health-green/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-health-green-dark">
                <Activity className="h-4 w-4" />
                <span>{isAr ? 'منطقة عضلية' : 'Region page'}</span>
              </div>
              <p className="text-base leading-8 text-slate-700">{isAr ? content.introAr : content.introEn}</p>
            </div>
            <div className="grid gap-3 sm:min-w-[220px]">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{isAr ? 'عدد التمارين' : 'Exercises'}</div>
                <div className="mt-2 text-2xl font-black text-slate-900">{exercises.length}</div>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{isAr ? 'أنظمة مرتبطة' : 'Related systems'}</div>
                <div className="mt-2 text-2xl font-black text-slate-900">{systems.length}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#region-anatomy" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-health-green/30 hover:text-health-green">
              {isAr ? 'التشريح المبسط' : 'Simple anatomy'}
            </a>
            <a href="#region-exercises" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-health-green/30 hover:text-health-green">
              {isAr ? 'التمارين الكاملة' : 'Exercise library'}
            </a>
            <Link to={navigationPaths.exerciseSystems(lang)} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-health-green/30 hover:text-health-green">
              {isAr ? 'صفحات الأنظمة' : 'Training systems'}
            </Link>
          </div>
        </section>

        <section id="region-anatomy" className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <Network className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'تشريح مبسط' : 'Simple anatomy'}</span>
            </div>
            <div className="mt-4 space-y-3">
              {(isAr ? content.anatomyAr : content.anatomyEn).map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              <Dumbbell className="h-4 w-4 text-health-green" />
              <span>{isAr ? 'نقاط التركيز' : 'Coaching focus'}</span>
            </div>
            <div className="mt-4 space-y-3">
              {(isAr ? content.cuesAr : content.cuesEn).map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-health-green/15 bg-health-green/5 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-health-green-dark">
                {isAr ? 'كلمات مفتاحية مستهدفة' : 'Target search intent'}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(isAr ? content.keywordsAr : content.keywordsEn).map((keyword) => (
                  <Badge key={keyword}>{keyword}</Badge>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{isAr ? 'أنظمة مناسبة لهذه المنطقة' : 'Related training systems'}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {isAr ? 'كل نظام من دول له صفحة مفصلة وخطة أسبوعية وروابط مباشرة للتمارين.' : 'Each system below has its own detail page, weekly template, and direct exercise links.'}
              </p>
            </div>
            <Link to={navigationPaths.exerciseSystems(lang)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-health-green/30 hover:text-health-green">
              <span>{isAr ? 'كل الأنظمة' : 'All systems'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {systems.map((system) => (
              <div key={system.id} className="space-y-3">
                <TrainingSystemCard system={system} isAr={isAr} />
                <Link to={navigationPaths.exerciseSystemDetail(lang, system.id)} className="inline-flex items-center gap-2 text-sm font-semibold text-health-green transition hover:text-health-green-dark">
                  <span>{isAr ? 'افتح صفحة النظام' : 'Open system page'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="region-exercises" className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{isAr ? `كل تمارين ${label}` : `All ${EXERCISE_FINDER_STATIC_LABELS[region]} exercises`}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {isAr ? 'القائمة هنا مخصصة بالكامل لهذه المنطقة، مع ملاحظات تقنية وتفاصيل إضافية عند الفتح.' : 'This page collects the full exercise library for the region, with technique notes and expandable details.'}
            </p>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise.name} exercise={exercise} isAr={isAr} />
            ))}
          </div>
        </section>

        {systems.length > 0 ? (
          <section className="space-y-5">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{isAr ? 'مثال ربط مع الخطة الأسبوعية' : 'Linked weekly plan example'}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {isAr ? 'الجزء ده يوضح كيف ترتبط تمارين هذه المنطقة مباشرة بأسبوع تدريبي حقيقي.' : 'This section shows how the region connects to a real weekly training structure.'}
              </p>
            </div>
            {systems.slice(0, 1).map((system) => {
              const plan = getWeeklyPlanForSystem(system.id);
              if (!plan) return null;
              return <WeeklyPlanCard key={system.id} title={system.title} titleAr={system.titleAr} plan={plan} isAr={isAr} lang={lang} />;
            })}
          </section>
        ) : null}
      </div>
    </PageLayout>
  );
}

import {useEffect, useState, type ReactNode} from 'react';

import {Badge} from './FilterField';
import {EXERCISE_FALLBACK_THUMBNAIL} from './media';
import {toTitle, translateBadge} from './filter-utils';
import type {Exercise} from './types';

function highlightText(text: string, query: string): ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="rounded px-0.5 not-italic bg-health-green/20 text-health-green-dark">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function ExerciseCard({exercise, isAr, searchQuery = ''}: {exercise: Exercise; isAr: boolean; searchQuery?: string}) {
  const difficultyBorderMap: Record<Exercise['level'], string> = {
    beginner: 'border-l-emerald-400',
    intermediate: 'border-l-amber-400',
    advanced: 'border-l-red-400',
  };
  const isMultiMuscle = new Set(exercise.muscles.map((item) => item.split('_')[0])).size > 1;
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageErrored, setImageErrored] = useState(false);
  const imageSrc = imageErrored ? EXERCISE_FALLBACK_THUMBNAIL : exercise.imageUrl || EXERCISE_FALLBACK_THUMBNAIL;

  useEffect(() => {
    setImageLoaded(false);
    setImageErrored(false);
  }, [exercise.imageUrl, exercise.name]);

  return (
    <article className={`medical-card h-full border-l-4 p-5 sm:p-6 ${difficultyBorderMap[exercise.level]}`}>
      <div className="flex h-full flex-col gap-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#eef2ff)]">
          <div className="relative aspect-[16/10]">
            {!imageLoaded ? (
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(226,232,240,0.85),rgba(241,245,249,1),rgba(226,232,240,0.85))]"
              />
            ) : null}
            <img
              src={imageSrc}
              alt={exercise.imageAlt || `${exercise.name} exercise illustration`}
              className={`h-full w-full object-cover transition duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                if (!imageErrored) {
                  setImageLoaded(false);
                  setImageErrored(true);
                  return;
                }
                setImageLoaded(true);
              }}
            />
          </div>
        </div>

        {isExpanded && exercise.videoUrl ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black">
            <div className="relative aspect-[16/10]">
              <iframe
                src={exercise.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                title={`${exercise.name} exercise tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{highlightText(exercise.name, searchQuery)}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="blue">{toTitle(exercise.mainMuscle)}</Badge>
              <Badge>{translateBadge(exercise.level, isAr)}</Badge>
              <Badge>{translateBadge(exercise.equipment, isAr)}</Badge>
              <Badge tone="green">{translateBadge(exercise.exerciseType, isAr)}</Badge>
              {isMultiMuscle ? <Badge>{translateBadge('multi-muscle', isAr)}</Badge> : null}
            </div>
          </div>
        </div>

        <p className={`text-sm leading-7 text-slate-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {highlightText(exercise.description, searchQuery)}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">{exercise.muscles.length}</span>{' '}
            {isAr ? 'عضلات مستهدفة' : 'target zones'}
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            aria-expanded={isExpanded}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-health-green/30 hover:text-health-green"
          >
            {isExpanded ? (isAr ? 'إخفاء التفاصيل' : 'Hide details') : (isAr ? 'عرض التفاصيل' : 'View details')}
          </button>
        </div>

        {isExpanded ? (
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {isAr ? 'العضلات المستهدفة' : 'Targets'}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {exercise.muscles.map((muscle) => (
                  <span key={muscle} className="rounded-full bg-soft-blue px-3 py-1 text-xs font-semibold text-health-green-dark">
                    {toTitle(muscle)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {isAr ? 'تلميح تقني' : 'Coaching cue'}
              </div>
              <p className="mt-1 text-sm text-slate-700">{exercise.tips}</p>
            </div>

            {exercise.rehabTip ? (
              <div className="rounded-2xl border border-health-green/15 bg-health-green/5 px-4 py-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-health-green-dark">
                  {isAr ? 'ملاحظة تأهيل مناسبة للجيم' : 'Gym-friendly rehab note'}
                </div>
                <p className="mt-1 text-sm text-slate-700">{exercise.rehabTip}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export {ExerciseCard};

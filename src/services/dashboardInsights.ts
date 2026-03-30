import type {AssessmentRecord} from '../lib/supabase';
import type {Language} from './translations';

export type TimeRangeKey = '14d' | '30d' | 'all';

export type NormalizedMetricRecord = AssessmentRecord & {
  metricKey: string;
  metricLabel: string;
  numericValue: number;
};

export type MetricGroup = {
  key: string;
  label: string;
  records: NormalizedMetricRecord[];
};

export type DashboardInsightTone = 'positive' | 'neutral' | 'caution';

export type DashboardSnapshot = {
  trackedMetricCount: number;
  recentRecordCount: number;
  mostTrackedLabel: string | null;
  mostTrackedCount: number;
  latestRecordLabel: string | null;
};

export type MetricInsight = {
  tone: DashboardInsightTone;
  title: string;
  summary: string;
  action: string;
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function normalizeNumericValue(value: AssessmentRecord['value_numeric']) {
  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseFloat(value)
        : Number.NaN;

  return Number.isFinite(parsed) ? parsed : null;
}

function daysBetween(start: string, end: string) {
  return Math.max(1, Math.round((new Date(end).getTime() - new Date(start).getTime()) / MS_PER_DAY));
}

function getRecentRecordCount(records: AssessmentRecord[], windowDays: number) {
  const cutoff = Date.now() - windowDays * MS_PER_DAY;
  return records.filter((item) => new Date(item.created_at).getTime() >= cutoff).length;
}

function formatSignedDelta(value: number) {
  const rounded = Math.abs(value) >= 10 ? value.toFixed(1) : value.toFixed(2);
  return `${value > 0 ? '+' : ''}${rounded}`;
}

function getCalculatorKey(record: NormalizedMetricRecord | null | undefined) {
  return record?.calculator_type?.trim().toLowerCase() || '';
}

export function filterRecordsByRange(records: AssessmentRecord[], range: TimeRangeKey) {
  if (range === 'all') return records;

  const days = range === '14d' ? 14 : 30;
  const cutoff = Date.now() - days * MS_PER_DAY;
  return records.filter((item) => new Date(item.created_at).getTime() >= cutoff);
}

export function buildMetricGroups(records: AssessmentRecord[]) {
  const numericRecords = [...records]
    .map((item) => {
      const numericValue = normalizeNumericValue(item.value_numeric);
      if (numericValue === null) return null;

      const unit = item.value_unit?.trim() || '';
      return {
        ...item,
        numericValue,
        metricKey: `${item.calculator_type}::${unit || 'no-unit'}`,
        metricLabel: unit ? `${item.calculator_type} (${unit})` : item.calculator_type,
      } satisfies NormalizedMetricRecord;
    })
    .filter((item): item is NormalizedMetricRecord => Boolean(item))
    .reverse();

  const groups = new Map<string, MetricGroup>();

  for (const item of numericRecords) {
    const existing = groups.get(item.metricKey);
    if (existing) {
      existing.records.push(item);
    } else {
      groups.set(item.metricKey, {
        key: item.metricKey,
        label: item.metricLabel,
        records: [item],
      });
    }
  }

  return Array.from(groups.values()).sort((a, b) => {
    const byCount = b.records.length - a.records.length;
    if (byCount !== 0) return byCount;

    return (
      new Date(b.records[b.records.length - 1].created_at).getTime() -
      new Date(a.records[a.records.length - 1].created_at).getTime()
    );
  });
}

export function buildDashboardSnapshot(records: AssessmentRecord[], metricGroups: MetricGroup[]): DashboardSnapshot {
  return {
    trackedMetricCount: metricGroups.length,
    recentRecordCount: getRecentRecordCount(records, 14),
    mostTrackedLabel: metricGroups[0]?.label || null,
    mostTrackedCount: metricGroups[0]?.records.length || 0,
    latestRecordLabel: records[0]
      ? `${records[0].value_label}${records[0].value_unit ? ` ${records[0].value_unit}` : ''}`
      : null,
  };
}

export function buildMetricInsight(metricGroup: MetricGroup | null, lang: Language): MetricInsight | null {
  if (!metricGroup || metricGroup.records.length === 0) return null;

  const latestRecord = metricGroup.records[metricGroup.records.length - 1];
  const previousRecord =
    metricGroup.records.length > 1 ? metricGroup.records[metricGroup.records.length - 2] : null;

  if (!previousRecord) {
    return lang === 'ar'
      ? {
          tone: 'neutral',
          title: 'أضف قراءة ثانية لتقييم الاتجاه',
          summary: 'أول قراءة مفيدة كنقطة بداية، لكن القرار العلاجي يصبح أوضح بعد تكرار القياس بنفس الطريقة.',
          action: 'كرر نفس القياس بعد عدة أيام أو بعد مرحلة علاجية واضحة.',
        }
      : {
          tone: 'neutral',
          title: 'Add one more reading before judging the trend',
          summary: 'A first measurement is a useful baseline, but rehab decisions get clearer once the same metric is repeated consistently.',
          action: 'Repeat this metric after a few days or after a clear rehab block.',
        };
  }

  const delta = latestRecord.numericValue - previousRecord.numericValue;
  const spanDays = daysBetween(previousRecord.created_at, latestRecord.created_at);
  const calculatorKey = getCalculatorKey(latestRecord);
  const latest = latestRecord.numericValue;

  if (calculatorKey === 'deficit') {
    if (latest > 750) {
      return lang === 'ar'
        ? {
            tone: 'caution',
            title: 'العجز الحالي قد يكون عدوانياً على التعافي',
            summary: `آخر عجز مسجل هو ${latest.toFixed(0)} سعرة، وهذا قد يصعّب تغطية احتياجات الأنسجة والتمارين أثناء التأهيل.`,
            action: 'راجع خطة السعرات إذا لاحظت تعباً أو بطئاً في التعافي أو ضعفاً في التمرين.',
          }
        : {
            tone: 'caution',
            title: 'Your current deficit may be too aggressive for rehab',
            summary: `The latest logged deficit is ${latest.toFixed(0)} kcal, which can make it harder to cover tissue repair and training needs during recovery.`,
            action: 'Review calories if you are also dealing with fatigue, slower recovery, or weaker rehab sessions.',
          };
    }

    return lang === 'ar'
      ? {
          tone: 'positive',
          title: 'العجز الغذائي يبدو أكثر قابلية للاستمرار',
          summary: `التغير الأخير ${formatSignedDelta(delta)} خلال ${spanDays} يوم، وآخر هدف مسجل لا يبدو مفرطاً.`,
          action: 'استمر في المتابعة، خاصة إذا كانت الطاقة وجودة التمارين مستقرتين.',
        }
      : {
          tone: 'positive',
          title: 'The calorie deficit looks more rehab-friendly',
          summary: `Your latest change was ${formatSignedDelta(delta)} over ${spanDays} days, and the current target does not look excessively aggressive.`,
          action: 'Keep monitoring it alongside energy levels and rehab quality.',
        };
  }

  if (calculatorKey === 'water' && latest < 2000) {
    return lang === 'ar'
      ? {
          tone: 'caution',
          title: 'هدف السوائل منخفض نسبياً',
          summary: `آخر قراءة هي ${latest.toFixed(0)} مل، وهذا قد يكون قليلاً إذا كان لديك جلسات علاج أو تعرق أو أدوية تؤثر على الشهية.`,
          action: 'ارفع التذكير بالسوائل تدريجياً إذا كان البول داكناً أو كان الصداع والإرهاق متكررين.',
        }
      : {
          tone: 'caution',
          title: 'The hydration target looks on the low side',
          summary: `Your latest reading is ${latest.toFixed(0)} ml, which may be too low if rehab sessions, sweating, or medication side effects are part of the picture.`,
          action: 'Increase fluid reminders gradually if dark urine, headaches, or fatigue keep showing up.',
        };
  }

  if ((calculatorKey === 'bmi' || calculatorKey === 'bodyfat') && delta < 0 && Math.abs(delta) >= 1 && spanDays <= 21) {
    return lang === 'ar'
      ? {
          tone: 'caution',
          title: 'التغير سريع نسبياً',
          summary: `تغير ${metricGroup.label} بمقدار ${formatSignedDelta(delta)} خلال ${spanDays} يوم، والتغيرات السريعة قد تعني نقصاً في الوقود أثناء التأهيل.`,
          action: 'تأكد أن فقدان الوزن لا يضعف النوم أو الألم أو جودة التمرين.',
        }
      : {
          tone: 'caution',
          title: 'This change is happening fairly quickly',
          summary: `${metricGroup.label} shifted by ${formatSignedDelta(delta)} in ${spanDays} days, and faster body-composition changes can mean under-fueling during rehab.`,
          action: 'Check that weight loss is not dragging down sleep, pain control, or training quality.',
        };
  }

  if (calculatorKey === 'protein' && delta < -15) {
    return lang === 'ar'
      ? {
          tone: 'caution',
          title: 'تناول البروتين في اتجاه هابط',
          summary: `آخر تغير هو ${formatSignedDelta(delta)} خلال ${spanDays} يوم، والانخفاضات الكبيرة قد تجعل الحفاظ على الكتلة العضلية أصعب أثناء التأهيل.`,
          action: 'راجع توزيع البروتين على الوجبات قبل زيادة المكملات أو تعديل الخطة بالكامل.',
        }
      : {
          tone: 'caution',
          title: 'Protein intake is trending downward',
          summary: `The latest change is ${formatSignedDelta(delta)} over ${spanDays} days, and larger drops can make muscle retention harder during recovery.`,
          action: 'Check meal-by-meal protein coverage before changing the whole plan.',
        };
  }

  return lang === 'ar'
    ? {
        tone: Math.abs(delta) < 0.01 ? 'neutral' : 'positive',
        title: Math.abs(delta) < 0.01 ? 'الاتجاه يبدو ثابتاً' : 'الاتجاه الحالي واضح وقابل للمتابعة',
        summary: `آخر تغير في ${metricGroup.label} هو ${formatSignedDelta(delta)} خلال ${spanDays} يوم.`,
        action: 'استمر في تسجيل نفس المؤشر بالطريقة نفسها حتى تبقى المقارنات مفيدة.',
      }
    : {
        tone: Math.abs(delta) < 0.01 ? 'neutral' : 'positive',
        title: Math.abs(delta) < 0.01 ? 'The trend looks stable' : 'The current trend is trackable',
        summary: `The latest change in ${metricGroup.label} is ${formatSignedDelta(delta)} over ${spanDays} days.`,
        action: 'Keep logging the same metric in the same way so the comparisons stay useful.',
      };
}

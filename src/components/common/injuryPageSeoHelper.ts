/**
 * Injury Page SEO Helper
 * Generates SEO metadata and structured data for injury protocol pages
 */

import type {InjuryPhase, InjuryProtocol} from '../../services/injuryDatabase';
import type {Language} from '../../services/translations';
import {decodeMojibake} from '../../services/textEncoding';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateMedicalConditionSchema,
  generateMedicalWebPageSchema,
} from '../seo/medicalSchemaGenerator';

export interface InjuryPageSeoConfig {
  injury: InjuryProtocol;
  lang: Language;
  phase?: InjuryPhase;
}

function ar(text: string) {
  return decodeMojibake(text);
}

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://physionutrition.vercel.app';

export function generateInjuryPageSeo({injury, lang, phase}: InjuryPageSeoConfig) {
  const slug = injury.id.replace(/_/g, '-');
  const langPath = lang === 'ar' ? 'ar' : 'en';
  const pageUrl = `${siteUrl}/${langPath}/injuries/${slug}`;

  const injuryName = lang === 'ar' ? getArabicInjuryName(injury.name) : injury.name;

  const title = phase
    ? `${injuryName} - ${phase.label} (${lang === 'ar' ? ar('المرحلة') : 'Phase'}) | PhysioNutrition`
    : `${injuryName} Recovery Guide | PhysioNutrition`;

  const description = phase
    ? `Evidence-based ${phase.label.toLowerCase()} phase recovery plan for ${injuryName.toLowerCase()}. Nutrition, exercises, and rehab guidelines.`
    : injury.overview ||
      `Complete recovery protocol for ${injuryName}. Rehabilitation nutrition and clinical guidelines.`;

  const hreflangs = [
    {lang: 'en', href: `${siteUrl}/en/injuries/${slug}`},
    {lang: 'ar', href: `${siteUrl}/ar/injuries/${slug}`},
  ];

  const faqs = [
    {
      question: lang === 'ar' ? `${ar('ما هو')} ${injuryName}${ar('؟')}` : `What is ${injuryName}?`,
      answer:
        lang === 'ar'
          ? ar('حالة عضلية هيكلية شائعة تؤثر على التعافي وجودة الحياة')
          : injury.overview || 'A common musculoskeletal condition affecting recovery and quality of life.',
    },
    {
      question: lang === 'ar' ? ar('ما هي مدة التعافي؟') : 'How long is recovery?',
      answer:
        lang === 'ar'
          ? `${ar('عادةً ما يستغرق التعافي')} ${injury.phases.length} ${ar('مراحل، تتراوح من أيام إلى عدة أشهر حسب شدة الإصابة')}`
          : `Recovery typically takes ${injury.phases.length} phases, ranging from days to several months depending on severity.`,
    },
    {
      question: lang === 'ar' ? ar('ما هي الأطعمة الموصى بها؟') : 'What foods should I eat?',
      answer:
        lang === 'ar'
          ? ar('ركز على البروتين لتعافي العضلات، وفيتامين سي لتصنيع الكولاجين، وأوميغا 3 لإدارة الالتهاب')
          : 'Focus on protein for muscle recovery, vitamin C for collagen synthesis, and omega-3s for inflammation management.',
    },
    {
      question: lang === 'ar' ? ar('متى يمكنني العودة للرياضة؟') : 'When can I return to sport?',
      answer:
        lang === 'ar'
          ? ar('يجب أن تكون العودة للرياضة تدريجية واتباع معايير القوة والوظيفة المحددة مع معالجك الفيزيائي')
          : 'Return to sport should be gradual and follow specific strength and function benchmarks established with your physical therapist.',
    },
  ];

  const faqSchema = generateFAQSchema({
    url: pageUrl,
    faqs,
  });

  const medicalConditionSchema = generateMedicalConditionSchema({
    name: injuryName,
    description: injury.overview || description,
    url: pageUrl,
    symptoms: extractSymptoms(injury, lang),
    signs: extractSigns(injury, lang),
    causes: injury.commonIn || [],
    treatments: injury.phases.map((p: InjuryPhase) => p.label),
    associatedAnatomy: injury.bodyRegion,
    riskFactors: injury.commonIn || [],
  });

  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      {name: lang === 'ar' ? ar('الرئيسية') : 'Home', url: `${siteUrl}/${langPath}/`},
      {
        name: lang === 'ar' ? ar('بروتوكولات الإصابات') : 'Injury Protocols',
        url: `${siteUrl}/${langPath}/injuries`,
      },
      {name: injuryName, url: pageUrl},
    ],
  });

  const medicalWebPageSchema = generateMedicalWebPageSchema({
    title,
    description,
    url: pageUrl,
    dateModified: new Date().toISOString(),
    medicalAudience: 'Patient',
  });

  return {
    title,
    description,
    pageUrl,
    hreflangs,
    schemas: [
      {id: 'medicalWebPage', json: medicalWebPageSchema},
      {id: 'medicalCondition', json: medicalConditionSchema},
      {id: 'faqPage', json: faqSchema},
      {id: 'breadcrumb', json: breadcrumbSchema},
    ],
  };
}

function extractSymptoms(injury: InjuryProtocol, lang: Language): string[] {
  const symptoms: string[] = [];

  if (injury.category === 'Tendon') {
    symptoms.push(
      lang === 'ar' ? ar('ألم مع الحركة المتكررة') : 'Pain with repetitive motion',
      lang === 'ar' ? ar('تصلب في الصباح') : 'Morning stiffness',
    );
  }

  if (injury.category === 'Ligament') {
    symptoms.push(
      lang === 'ar' ? ar('عدم الاستقرار') : 'Instability',
      lang === 'ar' ? ar('تورم') : 'Swelling',
    );
  }

  if (injury.category === 'Joint') {
    symptoms.push(
      lang === 'ar' ? ar('ألم أو طقطقة') : 'Pain or clicking',
      lang === 'ar' ? ar('تقيّد الحركة') : 'Restricted range of motion',
    );
  }

  return symptoms;
}

function extractSigns(injury: InjuryProtocol, lang: Language): string[] {
  const signs: string[] = [];

  if (injury.category === 'Tendon') {
    signs.push(
      lang === 'ar' ? ar('ألم موضعي') : 'Localized pain',
      lang === 'ar' ? ar('ضعف في القوة') : 'Weakness',
    );
  }

  if (injury.category === 'Ligament') {
    signs.push(
      lang === 'ar' ? ar('تورم واضح') : 'Visible swelling',
      lang === 'ar' ? ar('كدمات') : 'Bruising',
    );
  }

  return signs;
}

function getArabicInjuryName(englishName: string): string {
  const nameMap: Record<string, string> = {
    'Ankle Sprain': ar('التواء الكاحل'),
    'ACL Injury': ar('إصابة الرباط الصليبي الأمامي'),
    'ACL reconstruction': ar('إعادة بناء الرباط الصليبي'),
    'Rotator Cuff Injury': ar('إصابة الكفة المدورة'),
    'Hamstring Strain': ar('إجهاد عضلة الفخذ الخلفية'),
    'Stress Fracture': ar('كسر الإجهاد'),
    'Osgood-Schlatter Disease': ar('مرض أوسجود شلاتر'),
    'Knee Osteoarthritis': ar('خشونة الركبة'),
    'MCL Sprain': ar('التواء الرباط الجانبي الإنسي'),
    'LCL Sprain': ar('التواء الرباط الجانبي الوحشي'),
    'Patellar Tendinopathy': ar('اعتلال وتر الرضفة'),
    'Meniscal Tear': ar('تمزق الغضروف الهلالي'),
    'Shoulder Impingement': ar('انحشار الكتف'),
    'Frozen Shoulder': ar('تصلب الكتف'),
    'Tennis Elbow': ar('التهاب الأوتار الجانبي للكوع'),
    'Golfer Elbow': ar('التهاب الأوتار الإنسي للكوع'),
  };

  return nameMap[englishName] || englishName;
}

/**
 * Injury Page SEO Helper
 * Generates SEO metadata and structured data for injury protocol pages
 */

import type { InjuryProtocol, InjuryPhase } from '../../services/injuryDatabase';
import type { Language } from '../../services/translations';
import {
  generateMedicalWebPageSchema,
  generateMedicalConditionSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '../seo/medicalSchemaGenerator';

export interface InjuryPageSeoConfig {
  injury: InjuryProtocol;
  lang: Language;
  phase?: InjuryPhase;
}

/**
 * Generate comprehensive SEO configuration for injury detail pages
 */
export function generateInjuryPageSeo({
  injury,
  lang,
  phase,
}: InjuryPageSeoConfig) {
  const siteUrl = (import.meta as any).env?.VITE_SITE_URL || 'https://physionutrition.vercel.app';
  const slug = injury.id.replace(/_/g, '-');
  const langPath = lang === 'ar' ? 'ar' : 'en';
  const pageUrl = `${siteUrl}/${langPath}/injuries/${slug}`;

  // Create title with proper medical terminology
  const injuryName = lang === 'ar' 
    ? getArabicInjuryName(injury.name)
    : injury.name;
  
  const title = phase
    ? `${injuryName} - ${phase.label} (${lang === 'ar' ? 'المرحلة' : 'Phase'}) | PhysioNutrition`
    : `${injuryName} Recovery Guide | PhysioNutrition`;

  const description = phase
    ? `Evidence-based ${phase.label.toLowerCase()} phase recovery plan for ${injuryName.toLowerCase()}. Nutrition, exercises, and rehab guidelines.`
    : injury.overview || `Complete recovery protocol for ${injuryName}. Rehabilitation nutrition and clinical guidelines.`;

  // Generate hreflang tags
  const hreflangs = [
    { lang: 'en', href: `${siteUrl}/en/injuries/${slug}` },
    { lang: 'ar', href: `${siteUrl}/ar/injuries/${slug}` },
  ];

  // Generate FAQ structured data
  const faqs = [
    {
      question: lang === 'ar' ? `ما هو ${injuryName}؟` : `What is ${injuryName}?`,
      answer: lang === 'ar' 
        ? 'حالة عضلية هيكلية شائعة تؤثر على التعافي وجودة الحياة'
        : injury.overview || 'A common musculoskeletal condition affecting recovery and quality of life.',
    },
    {
      question: lang === 'ar' ? 'ما هي مدة التعافي؟' : 'How long is recovery?',
      answer: lang === 'ar'
        ? `عادةً ما يستغرق التعافي ${injury.phases.length} مراحل، تتراوح من أيام إلى عدة أشهر حسب شدة الإصابة`
        : `Recovery typically takes ${injury.phases.length} phases, ranging from days to several months depending on severity.`,
    },
    {
      question: lang === 'ar' ? 'ما هي الأطعمة الموصى بها؟' : 'What foods should I eat?',
      answer: lang === 'ar'
        ? 'ركز على البروتين لتعافي العضلات، وفيتامين سي لتصنيع الكولاجين، والأوميغا 3 لإدارة الالتهاب'
        : `Focus on protein for muscle recovery, vitamin C for collagen synthesis, and omega-3s for inflammation management.`,
    },
    {
      question: lang === 'ar' ? 'متى يمكنني العودة للرياضة؟' : 'When can I return to sport?',
      answer: lang === 'ar'
        ? 'يجب أن تكون العودة للرياضة تدريجية واتباع معايير القوة والوظيفة المحددة مع معالجك الفيزيائي'
        : 'Return to sport should be gradual and follow specific strength and function benchmarks established with your physical therapist.',
    },
  ];

  const faqSchema = generateFAQSchema({
    url: pageUrl,
    faqs,
  });

  // Generate medical condition schema
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

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: lang === 'ar' ? 'الرئيسية' : 'Home', url: `${siteUrl}/${langPath}/` },
      { name: lang === 'ar' ? 'بروتوكولات الإصابات' : 'Injury Protocols', url: `${siteUrl}/${langPath}/injuries` },
      { name: injuryName, url: pageUrl },
    ],
  });

  // Generate medical web page schema
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
      { id: 'medicalWebPage', json: medicalWebPageSchema },
      { id: 'medicalCondition', json: medicalConditionSchema },
      { id: 'faqPage', json: faqSchema },
      { id: 'breadcrumb', json: breadcrumbSchema },
    ],
  };
}

/**
 * Extract symptoms from injury data
 */
function extractSymptoms(injury: InjuryProtocol, lang: Language): string[] {
  // Extract from phases and infer from category
  const symptoms: string[] = [];
  
  if (injury.category === 'Tendon') {
    symptoms.push(
      lang === 'ar' ? 'ألم مع الحركة المتكررة' : 'Pain with repetitive motion',
      lang === 'ar' ? 'تصلب في الصباح' : 'Morning stiffness',
    );
  }
  
  if (injury.category === 'Ligament') {
    symptoms.push(
      lang === 'ar' ? 'عدم الاستقرار' : 'Instability',
      lang === 'ar' ? 'تورم' : 'Swelling',
    );
  }
  
  if (injury.category === 'Joint') {
    symptoms.push(
      lang === 'ar' ? 'ألم أو طقطقة' : 'Pain or clicking',
      lang === 'ar' ? 'تقيد الحركة' : 'Restricted range of motion',
    );
  }

  return symptoms;
}

/**
 * Extract signs from injury data
 */
function extractSigns(injury: InjuryProtocol, lang: Language): string[] {
  const signs: string[] = [];
  
  if (injury.category === 'Tendon') {
    signs.push(
      lang === 'ar' ? 'ألم موضعي' : 'Localized pain',
      lang === 'ar' ? 'ضعف في القوة' : 'Weakness',
    );
  }
  
  if (injury.category === 'Ligament') {
    signs.push(
      lang === 'ar' ? 'تورم واضح' : 'Visible swelling',
      lang === 'ar' ? 'كدمات' : 'Bruising',
    );
  }

  return signs;
}

/**
 * Get Arabic injury name with proper medical terminology
 */
function getArabicInjuryName(englishName: string): string {
  const nameMap: Record<string, string> = {
    'Ankle Sprain': 'التواء الكاحل',
    'ACL Injury': 'إصابة الرباط الصليبي الأمامي',
    'ACL reconstruction': 'إعادة بناء الرباط الصليبي',
    'Rotator Cuff Injury': 'إصابة الكفة المدورة',
    'Hamstring Strain': 'إجهاد عضلة الفخذ الخلفية',
    'Stress Fracture': 'كسر الإجهاد',
    'Osgood-Schlatter Disease': 'مرض أوسجود شلاتر',
    'Knee Osteoarthritis': 'خشونة الركبة',
    'MCL Sprain': 'التواء الرباط الجانبي الإنسي',
    'LCL Sprain': 'التواء الرباط الجانبي الوحشي',
    'Patellar Tendinopathy': 'اعتلال وتر الرضفة',
    'Meniscal Tear': 'تمزق الغضروف الهلالي',
    'Shoulder Impingement': 'انحشار الكتف',
    'Frozen Shoulder': 'تصلب الكتف',
    'Tennis Elbow': 'التهاب الأوتار الجانبي للكوع',
    'Golfer Elbow': 'التهاب الأوتار الإنسي للكوع',
  };

  return nameMap[englishName] || englishName;
}

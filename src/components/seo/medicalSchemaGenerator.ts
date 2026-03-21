/**
 * Medical JSON-LD Schema Markup Generator
 * Generates structured data for medical content including MedicalWebPage, MedicalCondition, FAQPage
 */

export interface MedicalConditionSchema {
  '@context': string;
  '@type': 'MedicalWebPage' | 'MedicalCondition' | 'FAQPage' | 'BreadcrumbList';
  [key: string]: any;
}

/**
 * Generate MedicalWebPage schema for injury detail pages
 * Follows Google's Medical Content Guidelines
 */
export function generateMedicalWebPageSchema({
  title,
  description,
  url,
  dateModified,
  medicalAudience = 'Patient',
  author = 'PhysioNutrition',
}: {
  title: string;
  description: string;
  url: string;
  dateModified: string;
  medicalAudience?: 'Patient' | 'PharmaCorp' | 'HealthProfessional';
  author?: string;
}): MedicalConditionSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    mainEntity: {
      '@type': 'MedicalCondition',
    },
    name: title,
    description: description,
    url: url,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      name: author,
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: medicalAudience,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Generate MedicalCondition schema for injury pages
 * Structured data about medical conditions including signs, symptoms, causes
 */
export function generateMedicalConditionSchema({
  name,
  description,
  url,
  signs,
  symptoms,
  causes,
  treatments,
  riskFactors,
  stage,
  associatedAnatomy,
}: {
  name: string;
  description: string;
  url: string;
  signs?: string[];
  symptoms?: string[];
  causes?: string[];
  treatments?: string[];
  riskFactors?: string[];
  stage?: string;
  associatedAnatomy?: string;
}): MedicalConditionSchema {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    name: name,
    description: description,
    url: url,
    inLanguage: 'en-US',
    medicalCode: {
      '@type': 'MedicalCode',
      codeValue: name.toUpperCase().replace(/\s+/g, '_'),
    },
  };

  if (signs && signs.length > 0) {
    schema.signOrSymptom = signs.map((sign) => ({
      '@type': 'MedicalSignOrSymptom',
      name: sign,
    }));
  }

  if (symptoms && symptoms.length > 0) {
    if (!schema.signOrSymptom) schema.signOrSymptom = [];
    schema.signOrSymptom.push(
      ...symptoms.map((symptom) => ({
        '@type': 'MedicalSignOrSymptom',
        name: symptom,
      })),
    );
  }

  if (causes && causes.length > 0) {
    schema.cause = causes.map((cause) => ({
      '@type': 'MedicalCause',
      name: cause,
    }));
  }

  if (treatments && treatments.length > 0) {
    schema.treatment = treatments.map((treatment) => ({
      '@type': 'MedicalTreatment',
      name: treatment,
    }));
  }

  if (riskFactors && riskFactors.length > 0) {
    schema.riskFactor = riskFactors.map((risk) => ({
      '@type': 'MedicalRiskFactor',
      name: risk,
    }));
  }

  if (stage) {
    schema.stage = {
      '@type': 'MedicalConditionStage',
      name: stage,
    };
  }

  if (associatedAnatomy) {
    schema.associatedAnatomy = {
      '@type': 'AnatomicalStructure',
      name: associatedAnatomy,
    };
  }

  return schema;
}

/**
 * Generate FAQPage schema for injury pages with common questions
 * Helps with rich snippets in search results
 */
export function generateFAQSchema({
  url,
  faqs,
}: {
  url: string;
  faqs: Array<{question: string; answer: string}>;
}): MedicalConditionSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: url,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate ArticleSchema for recovery protocol articles
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url,
}: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}): MedicalConditionSchema {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: headline,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Organization',
      name: author,
    },
    url: url,
    inLanguage: 'en-US',
  };

  if (image) {
    schema.image = {
      '@type': 'ImageObject',
      url: image,
    };
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema for navigation SEO
 */
export function generateBreadcrumbSchema({
  items,
}: {
  items: Array<{name: string; url: string}>;
}): MedicalConditionSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

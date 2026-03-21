/**
 * Medical Terminology Helper
 * Ensures proper medical terminology across the application
 * Helps with SEO and professional medical naming conventions
 */

/**
 * Map of informal names to proper medical terminology
 * Used to standardize injury names across the application
 */
export const medicalTerminologyMap: Record<string, {professional: string; category: string}> = {
  'Knee osteoarthritis': {
    professional: 'Knee Osteoarthritis',
    category: 'Degenerative Joint Disease',
  },
  'ACL injury': {
    professional: 'Anterior Cruciate Ligament (ACL) Injury',
    category: 'Ligamentous Injury',
  },
  'ACL reconstruction': {
    professional: 'ACL Reconstruction Surgery',
    category: 'Post-Surgical Rehabilitation',
  },
  'Rotator cuff injury': {
    professional: 'Rotator Cuff Injury',
    category: 'Soft Tissue Injury',
  },
  'Hamstring strain': {
    professional: 'Hamstring Muscle Strain',
    category: 'Muscle Strain',
  },
  'Stress fracture': {
    professional: 'Stress Fracture',
    category: 'Bone Injury',
  },
  'Ankle sprain': {
    professional: 'Ankle Ligament Sprain',
    category: 'Ligamentous Injury',
  },
  'Shoulder impingement': {
    professional: 'Shoulder Impingement Syndrome',
    category: 'Compression Syndrome',
  },
  'Tennis elbow': {
    professional: 'Lateral Epicondylitis',
    category: 'Overuse Injury',
  },
  'Golfers elbow': {
    professional: 'Medial Epicondylitis',
    category: 'Overuse Injury',
  },
  'Frozen shoulder': {
    professional: 'Adhesive Capsulitis',
    category: 'Shoulder Disorder',
  },
  'Meniscal tear': {
    professional: 'Meniscal Tear',
    category: 'Intra-articular Injury',
  },
  'Plantar fasciitis': {
    professional: 'Plantar Fasciitis',
    category: 'Plantar Fascia Injury',
  },
  'MCL sprain': {
    professional: 'Medial Collateral Ligament (MCL) Sprain',
    category: 'Knee Ligament Injury',
  },
  'LCL sprain': {
    professional: 'Lateral Collateral Ligament (LCL) Sprain',
    category: 'Knee Ligament Injury',
  },
  'Patellar tendinopathy': {
    professional: 'Patellar Tendinopathy',
    category: 'Tendon Disease',
  },
  'Osgood-schlatter disease': {
    professional: 'Osgood-Schlatter Disease',
    category: 'Growth-Related Knee Pain',
  },
  'Hip labral tear': {
    professional: 'Hip Labral Tear',
    category: 'Hip Joint Injury',
  },
  'Biceps tendinopathy': {
    professional: 'Biceps Tendinopathy',
    category: 'Shoulder Tendon Disease',
  },
  'UCL injury': {
    professional: 'Ulnar Collateral Ligament (UCL) Injury',
    category: 'Elbow Ligament Injury',
  },
  'Scaphoid fracture': {
    professional: 'Scaphoid Fracture',
    category: 'Wrist Fracture',
  },
  'TMJ disorder': {
    professional: 'Temporomandibular Joint (TMJ) Disorder',
    category: 'Jaw Dysfunction',
  },
  'Bursitis': {
    professional: 'Bursitis',
    category: 'Bursa Inflammation',
  },
  'Thoracic outlet syndrome': {
    professional: 'Thoracic Outlet Syndrome (TOS)',
    category: 'Nerve Compression Syndrome',
  },
  'De Quervains tenosynovitis': {
    professional: 'De Quervain\'s Tenosynovitis',
    category: 'Wrist Tendon Inflammation',
  },
};

/**
 * Arabic medical terminology mirror
 */
export const arabicMedicalTerminologyMap: Record<string, string> = {
  'Knee Osteoarthritis': 'خشونة الركبة (هشاشة العظام في الركبة)',
  'Anterior Cruciate Ligament (ACL) Injury': 'إصابة الرباط الصليبي الأمامي',
  'ACL Reconstruction Surgery': 'جراحة إعادة بناء الرباط الصليبي الأمامي',
  'Rotator Cuff Injury': 'إصابة الكفة المدورة',
  'Hamstring Muscle Strain': 'إجهاد عضلات الفخذ الخلفية',
  'Stress Fracture': 'كسر الإجهاد',
  'Ankle Ligament Sprain': 'التواء أربطة الكاحل',
  'Shoulder Impingement Syndrome': 'متلازمة انحشار الكتف',
  'Lateral Epicondylitis': 'التهاب الأوتار الجانبي للكوع (كوع لاعب التنس)',
  'Medial Epicondylitis': 'التهاب الأوتار الإنسي للكوع (كوع لاعب الجولف)',
  'Adhesive Capsulitis': 'تصلب الكتف (التصاق محفظة الكتف)',
  'Meniscal Tear': 'تمزق الغضروف الهلالي',
  'Plantar Fasciitis': 'التهاب اللفافة الأخمصية',
  'Medial Collateral Ligament (MCL) Sprain': 'التواء الرباط الجانبي الإنسي للركبة',
  'Lateral Collateral Ligament (LCL) Sprain': 'التواء الرباط الجانبي الوحشي للركبة',
  'Patellar Tendinopathy': 'اعتلال وتر الرضفة',
  'Osgood-Schlatter Disease': 'مرض أوسجود شلاتر',
  'Hip Labral Tear': 'تمزق الشفا الحقية في الورك',
  'Biceps Tendinopathy': 'اعتلال وتر ذات الرأسين',
  'Ulnar Collateral Ligament (UCL) Injury': 'إصابة الرباط الزندي الجانبي',
  'Scaphoid Fracture': 'كسر العظم الزورقي (كسر الرسغ)',
  'Temporomandibular Joint (TMJ) Disorder': 'اضطراب المفصل الصدغي الفكي',
  'Bursitis': 'التهاب الجراب',
  'Thoracic Outlet Syndrome (TOS)': 'متلازمة مخرج الصدر',
  'De Quervain\'s Tenosynovitis': 'التهاب غمد وتر دي كيرفين',
  'Patellar Tendinitis': 'التهاب وتر الرضفة',
};

/**
 * Get professional medical terminology for a condition
 */
export function getProfessionalTerminology(
  isFamiliarName: string,
): {professional: string; category: string} | null {
  const key = isFamiliarName.toLowerCase();
  
  for (const [k, v] of Object.entries(medicalTerminologyMap)) {
    if (k.toLowerCase() === key) {
      return v;
    }
  }
  
  return null;
}

/**
 * Get Arabic medical terminology
 */
export function getArabicTerminology(englishTerm: string): string {
  const professional = getProfessionalTerminology(englishTerm)?.professional || englishTerm;
  return arabicMedicalTerminologyMap[professional] || englishTerm;
}

/**
 * Format condition name for display
 */
export function formatConditionName(
  name: string,
  lang: 'en' | 'ar' = 'en',
): string {
  if (lang === 'ar') {
    return getArabicTerminology(name);
  }
  
  const terminology = getProfessionalTerminology(name);
  return terminology?.professional || name;
}

/**
 * Get SEO-friendly description for a condition
 */
export function getSEODescription(
  name: string,
  bodyRegion: string,
  category: string,
  lang: 'en' | 'ar' = 'en',
): string {
  const medicalName = formatConditionName(name, lang);
  
  if (lang === 'ar') {
    return `دليل التعافي الشامل لـ ${medicalName}. تشمل خطة التعافي التغذية الموصى بها والتمارين والإرشادات السريرية.`;
  }
  
  return `Complete recovery guide for ${medicalName}. Evidence-based nutrition, rehabilitation protocols, and clinical guidelines for optimal recovery from ${category.toLowerCase()}.`;
}

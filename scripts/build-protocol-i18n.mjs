/**
 * Generates src/services/injuryI18n/protocolDictionary.generated.ts
 * Run: node scripts/build-protocol-i18n.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const protocols = JSON.parse(fs.readFileSync(path.join(root, 'json/protocols_v3.json'), 'utf8'));

/** Curated medical Arabic names — slug is source of truth */
const SLUG_AR = {
  'acl-reconstruction-hamstring-graft': 'إعادة بناء الرباط الصليبي الأمامي (ترقيع وتر الفخذ الخلفي)',
  'acl-tear-conservative-management': 'تمزق الرباط الصليبي الأمامي — علاج محافظ',
  'meniscus-repair-post-operative': 'إصلاح الغضروف الهلالي (ما بعد العملية)',
  'patellofemoral-pain-syndrome-pfps': 'متلازمة ألم الرضفة الفخذية',
  'patellar-tendinopathy': 'اعتلال وتر الرضفة',
  'mcl-sprain-grade-ii': 'التواء الرباط الجانبي الإنسي للركبة (درجة II)',
  'total-knee-arthroplasty-tka': 'استبدال مفصل الركبة الكامل',
  'pcl-tear-conservative': 'تمزق الرباط الصليبي الخلفي — علاج محافظ',
  'rotator-cuff-repair-post-operative': 'إصلاح الكفة المدورة (ما بعد العملية)',
  'shoulder-impingement-syndrome': 'متلازمة انحشار الكتف',
  'frozen-shoulder-adhesive-capsulitis': 'تصلب الكتف (التصاق المحفظة)',
  'anterior-shoulder-dislocation-first-time': 'خلع أمامي للكتف (أول مرة)',
  'lateral-ankle-sprain-grade-i-ii': 'التواء الكاحل الجانبي (درجة I–II)',
  'achilles-tendinopathy': 'اعتلال وتر أخيل',
  'plantar-fasciitis': 'التهاب اللفافة الأخمصية',
  'ankle-fracture-post-immobilisation': 'كسر الكاحل (ما بعد التثبيت)',
  'non-specific-low-back-pain-acute': 'ألم أسفل الظهر غير محدد (حاد)',
  'lumbar-disc-herniation-with-radiculopathy': 'فتق القرص القطني مع إشعاع عصبي',
  'cervical-radiculopathy': 'الإشعاع العصبي العنقي',
  'spondylolisthesis-grade-iii-conservative': 'انزلاق فقاري (درجة III) — علاج محافظ',
  'hip-labral-tear-conservative': 'تمزق الشفا الحقية في الورك — علاج محافظ',
  'total-hip-arthroplasty-tha': 'استبدال مفصل الورك الكامل',
  'lateral-epicondylalgia-tennis-elbow': 'ألم مرفق التنس (التهاب اللقيمة الجانبي)',
  'distal-radius-fracture-post-immobilisation': 'كسر نهاية عظم الكعبرة (ما بعد التثبيت)',
  'hamstring-strain-grade-ii': 'إجهاد عضلات الفخذ الخلفية (درجة II)',
  'greater-trochanteric-pain-syndrome-gtps': 'متلازمة ألم المدور الأكبر',
  'iliotibial-band-syndrome': 'متلازمة الشريط الحرقفي',
  'ac-joint-sprain-grade-i-ii': 'التواء مفصل الأخرم والترقوة (درجة I–II)',
  'thoracic-outlet-syndrome-tos': 'متلازمة مخرج الصدر',
  'quadriceps-tendinopathy': 'اعتلال وتر الفخذة الرباعية',
  'biceps-tendinopathy-long-head': 'اعتلال وتر العضلة ذات الرأسين (الرأس الطويل)',
  'slap-lesion-conservative': 'إصابة SLAP في الكتف — علاج محافظ',
  'posterior-shoulder-instability': 'عدم استقرار الكتف الخلفي',
  'supraspinatus-tear-partial-conservative': 'تمزق جزئي للعضلة فوق الشوكة — علاج محافظ',
  'calcific-tendinitis': 'التهاب وتر تحت الكالسي',
  'medial-epicondylalgia-golfers-elbow': 'ألم مرفق الجولف (التهاب اللقيمة الإنسي)',
  'ucl-sprain-elbow-ulnar-collateral': 'التواء الرباط الزندي الجانبي للكوع',
  'carpal-tunnel-syndrome-conservative': 'متلازمة النفق الرسغي — علاج محافظ',
  'de-quervains-tenosynovitis': 'التهاب غمد وتر دي كيرفين',
  'scaphoid-fracture-post-immobilisation': 'كسر العظم الزورقي (ما بعد التثبيت)',
  'tfcc-injury-triangular-fibrocartilage': 'إصابة الغضروف المثلث في الرسغ',
  'femoroacetabular-impingement-fai': 'احتكاك عظمي فخذي-وركي',
  'hip-flexor-strain-iliopsoas': 'إجهاد عضلات مثني الورك (الإيليو-psoas)',
  'adductor-groin-strain': 'إجهاد عضلات الفخذ الداخلية (شد الفخذ)',
  'piriformis-syndrome': 'متلازمة العضلة الكمثرية',
  'hip-osteoarthritis-conservative': 'خشونة مفصل الورك — علاج محافظ',
  'snapping-hip-syndrome-coxa-saltans': 'متلازمة الورك الطقطاق',
  'pes-anserine-bursitis': 'التهاب جراب الإوزة',
  'bakers-cyst': 'كيس بيكر (خراج خلف الركبة)',
  'tibial-plateau-fracture-post-op': 'كسر صفيحة الساق (ما بعد العملية)',
  'knee-osteoarthritis-conservative': 'خشونة الركبة — علاج محافظ',
  'osgood-schlatter-disease': 'مرض أوسجود-شلاتر',
  'meniscectomy-post-operative': 'استئصال الغضروف الهلالي (ما بعد العملية)',
  'peroneal-tendinopathy': 'اعتلال وتر الفيبياليس',
  'posterior-tibial-tendon-dysfunction-pttd': 'خلل وتر الظنبوب الخلفي',
  'sinus-tarsi-syndrome': 'متلازمة الجيب الجنبي للكاحل',
  '5th-metatarsal-fracture-jones-fracture': 'كسر العظم المشطي الخامس (كسر جونز)',
  'ankle-fracture-orif-post-operative': 'كسر الكاحل مع تثبيت داخلي (ما بعد العملية)',
  'hallux-valgus-post-surgical-rehabilitation': 'تأهيل إبهام القدم بعد جراحة الانحراف',
  'tibialis-anterior-tendinopathy': 'اعتلال وتر الظنبوب الأمامي',
  'spinal-stenosis-lumbar-conservative': 'تضيق القناة الشوكية القطني — علاج محافظ',
  'facet-joint-dysfunction-lumbar': 'خلل مفصل الوجه القطني',
  'sacroiliac-joint-dysfunction': 'خلل مفصل العجزي الحرقفي',
  'piriformis-syndrome-sciatic-nerve-compression': 'متلازمة العضلة الكمثرية مع ضغط العصب الوركي',
  'cervical-facet-joint-pain': 'ألم مفصل الوجه العنقي',
  'whiplash-associated-disorder-wad-grade-ii': 'اضطراب ارتجاج الرقبة (درجة II)',
  'osteoporotic-vertebral-fracture-conservative': 'كسر فقري هش (علاج محافظ)',
  'scheuermanns-kyphosis-conservative': 'حداب شوييرمان — علاج محافظ',
  'thoracic-disc-herniation': 'فتق القرص الصدري',
  'post-laminectomy-rehabilitation': 'تأهيل ما بعد استئصال القوس الفقري',
  'cubital-tunnel-syndrome': 'متلازمة النفق الزندي',
  'radial-tunnel-syndrome': 'متلازمة النفق الكعبري',
  'trigger-finger-post-injection-post-op': 'إصبع الزناد (ما بعد الحقن أو العملية)',
  'mallet-finger': 'إصبع المطرقة',
  'boutonniere-deformity': 'تشوه زر السترة',
  'flexor-tendon-repair-zone-ii': 'إصلاح وتر المثني (المنطقة II)',
  'extensor-tendon-repair': 'إصلاح وتر الباسط',
  'dupuytrens-contracture-post-surgical': 'تشنج دوبوترين (ما بعد الجراحة)',
  'thumb-ucl-sprain-skiers-thumb': 'التواء الرباط الجانبي للإبهام (إبهام المتزلج)',
  'proximal-humerus-fracture-non-operative': 'كسر قريب من رأس العضد — علاج غير جراحي',
  'quadriceps-strain-grade-ii': 'إجهاد عضلة الفخذة الرباعية (درجة II)',
  'calf-strain-gastrocnemius': 'إجهاد عضلة السمانة',
  'rectus-femoris-strain': 'إجهاد العضلة المستقيمة للفخذ',
  'gluteal-muscle-strain': 'إجهاد عضلات الأرداف',
  'tibial-stress-fracture-return-to-running': 'كسر إجهاد الساق — العودة للجري',
  'medial-tibial-stress-syndrome-shin': 'متلازمة إجهاد الساق الإنسي (ألم الظنب)',
  'stress-reaction-femoral-neck': 'رد فعل إجهادي في عنق عظم الفخذ',
  'pectoralis-major-tear-conservative': 'تمزق العضلة الصدرية الكبرى — علاج محافظ',
  'biceps-rupture-distal-post-op': 'تمزق وتر العضلة ذات الرأسين البعيد (ما بعد العملية)',
  'triceps-tendinopathy': 'اعتلال وتر العضلة ثلاثية الرؤوس',
  'severs-disease-calcaneal': 'مرض سيفر (التهاب عظم الكعب عند الأطفال)',
  'little-leaguers-shoulder-proximal': 'كتف لاعبي البيسبول الصغار (إصابة نمو قريبة)',
  'juvenile-osgood-schlatter': 'أوسجود-شلاتر عند المراهقين',
  'sinding-larsen-johansson': 'متلازمة سيندينغ-لارسن-يوهانسون',
  'perthes-disease-rehabilitation': 'مرض بيرثس — تأهيل',
  'peripheral-nerve-injury-peroneal': 'إصابة العصب الوركي الشعاعي',
  'complex-regional-pain-syndrome': 'متلازمة الألم الإقليمي المعقد',
  'brachial-plexus-neuropraxia': 'شلل عصبي عابر لضفيرة الذراع',
  'thoracic-hyperkyphosis-postural': 'زيادة حداب الصدر الوضعي',
  'temporomandibular-joint': 'اضطراب المفصل الصدغي الفكي',
};

const REGION_AR = {
  Knee: 'الركبة',
  Shoulder: 'الكتف',
  'Ankle & Foot': 'الكاحل والقدم',
  Spine: 'العمود الفقري',
  Hip: 'الورك',
  'Elbow & Wrist': 'الكوع والرسغ',
  'Upper Limb': 'الطرف العلوي',
  'Lower Limb': 'الطرف السفلي',
  'Whole body': 'الجسم بالكامل',
};

function overviewAr(nameAr, regionAr) {
  return `بروتوكول تأهيل منظم لـ${nameAr} في منطقة ${regionAr}، يتضمن مراحل علاجية متدرجة وأهدافًا واضحة للتعافي.`;
}

const entries = protocols.map((p) => {
  const nameAr = SLUG_AR[p.slug] || p.title;
  const regionAr = REGION_AR[p.region] || p.region;
  return {
    slug: p.slug,
    titleEn: p.title,
    regionEn: p.region,
    nameAr,
    regionAr,
    overviewAr: overviewAr(nameAr, regionAr),
  };
});

const missing = protocols.filter((p) => !SLUG_AR[p.slug]);
if (missing.length) {
  console.warn(`Warning: ${missing.length} slugs without curated Arabic name:`);
  missing.forEach((p) => console.warn(`  - ${p.slug}: ${p.title}`));
}

const outPath = path.join(root, 'src/services/injuryI18n/protocolDictionary.generated.ts');
const lines = [
  '/** Auto-generated by scripts/build-protocol-i18n.mjs — do not edit manually */',
  'export type ProtocolTranslationEntry = {',
  '  slug: string;',
  '  titleEn: string;',
  '  regionEn: string;',
  '  nameAr: string;',
  '  regionAr: string;',
  '  overviewAr: string;',
  '};',
  '',
  'export const PROTOCOL_TRANSLATIONS: Record<string, ProtocolTranslationEntry> = {',
];

for (const e of entries) {
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  lines.push(`  '${e.slug}': {`);
  lines.push(`    slug: '${e.slug}',`);
  lines.push(`    titleEn: '${esc(e.titleEn)}',`);
  lines.push(`    regionEn: '${esc(e.regionEn)}',`);
  lines.push(`    nameAr: '${esc(e.nameAr)}',`);
  lines.push(`    regionAr: '${esc(e.regionAr)}',`);
  lines.push(`    overviewAr: '${esc(e.overviewAr)}',`);
  lines.push('  },');
}

lines.push('};', '');
lines.push(`export const PROTOCOL_TRANSLATION_COUNT = ${entries.length};`, '');

fs.mkdirSync(path.dirname(outPath), {recursive: true});
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Wrote ${entries.length} protocol translations to ${outPath}`);

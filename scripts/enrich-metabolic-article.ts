import {config as loadEnv} from 'dotenv';
import {createClient} from '@supabase/supabase-js';
import type {Database} from '../src/lib/supabaseDatabase';

loadEnv({path: '.env.local'});
loadEnv({path: '.env'});

const ARTICLE_SLUG = 'metabolic-aspects-of-exercise';
const ARTICLE_TITLE_EN = 'Metabolic Aspects of Exercise: How the Body Produces Energy During Physical Activity';
const ARTICLE_TITLE_AR = 'Metabolic Aspects of Exercise: كيف ينتج الجسم الطاقة أثناء التمرين؟';

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function makeClient() {
  const url = requireEnv('VITE_SUPABASE_URL');
  const anonKey = requireEnv('VITE_SUPABASE_ANON_KEY');
  return createClient<Database>(url, anonKey);
}

function enrichArabicContent(content: string) {
  const introNeedle =
    'وخلال أي نشاط بدني، تعمل أجهزة الجسم المختلفة مثل الجهاز العضلي، والجهاز التنفسي، والجهاز القلبي الوعائي بصورة متكاملة للحفاظ على استمرار الأداء الحركي وتوفير الطاقة اللازمة للعضلات العاملة.\n\n## مفهوم الأيض أثناء التمرين';
  const introInsert =
    'وخلال أي نشاط بدني، تعمل أجهزة الجسم المختلفة مثل الجهاز العضلي، والجهاز التنفسي، والجهاز القلبي الوعائي بصورة متكاملة للحفاظ على استمرار الأداء الحركي وتوفير الطاقة اللازمة للعضلات العاملة.\n\nلو أردت فهم الصورة اليومية للاحتياج الطاقي بشكل عملي، فمقال [خرافة حساب السعرات: الفرق بين BMR وTDEE](/insights/bmr-vs-tdee-calorie-calculation-myth) يربط بين الأرقام وما يحدث فعليًا مع النشاط.\n\n## مفهوم الأيض أثناء التمرين';

  const vo2Needle =
    'ويُعتبر VO2 Max من أهم مؤشرات اللياقة القلبية التنفسية، حيث ترتبط القيم المرتفعة بقدرة أفضل على التحمل والأداء الرياضي.\n\n## العتبة اللاكتاتية Lactate Threshold';
  const vo2Insert =
    'ويُعتبر VO2 Max من أهم مؤشرات اللياقة القلبية التنفسية، حيث ترتبط القيم المرتفعة بقدرة أفضل على التحمل والأداء الرياضي. كما يساعدك [القلب في الجيم: ليه بيتعبك؟ وإزاي تحسّن أداءك؟](/insights/heart-health-gym-performance-guide) على ربط هذا الجانب بالتحمل الفعلي أثناء الجهد.\n\n## العتبة اللاكتاتية Lactate Threshold';

  const conclusionNeedle = '## الخاتمة';
  const conclusionInsert =
    '## أسئلة شائعة\n### هل يحرق الجسم الدهون من أول لحظة في التمرين؟\nنعم، لكن نسبة مساهمة الدهون تختلف بحسب الشدة والمدة. في البداية يعتمد الجسم أكثر على الأنظمة السريعة، ثم تزداد مساهمة الدهون مع استمرار النشاط أو انخفاض شدته.\n\n### لماذا أشعر بالحرقان العضلي أثناء الجهد العالي؟\nهذا الشعور يرتبط غالبًا بزيادة الاعتماد على التحلل اللاهوائي للجلوكوز وتراكم اللاكتات، وليس لأنه \"حرق دهون\" بشكل مباشر.\n\n### هل يجب أن أعمل كارديو فقط لحرق الدهون؟\nلا، والأفضل غالبًا هو الجمع بين التدريب الهوائي وتمارين المقاومة مع ضبط الاحتياج اليومي للطاقة عبر [حاسبة السعرات](/calculators) و[حاسبة البروتين](/calculators).\n\n## روابط مرتبطة\nإذا أردت تحويل هذا الفهم إلى خطة عملية، فابدأ من [حاسبة السعرات](/calculators) ثم راجع [حاسبة البروتين](/calculators) لوضع الاحتياج اليومي بشكل أدق. وبعدها يمكنك متابعة الاستجابة الفعلية من خلال [لوحة المتابعة](/dashboard).\n\nولمزيد من السياق التدريبي، اقرأ أيضًا [التنفس في الجيم: الطريقة الصح اللي تمنع الدوخة وتحسّن الأداء](/insights/gym-breathing-prevent-dizziness-and-boost-performance).\n\n## الخاتمة';

  return content.replace(introNeedle, introInsert).replace(vo2Needle, vo2Insert).replace(conclusionNeedle, conclusionInsert);
}

function enrichEnglishContent(content: string) {
  const introNeedle =
    'Exercise is considered one of the greatest physiological stresses placed on the human body. During physical activity, the body must rapidly increase energy production to meet the demands of working muscles. This requires the coordination of several body systems, including the muscular, cardiovascular, and respiratory systems.\n\nUnderstanding the metabolic aspects of exercise is essential for students, athletes, physical therapists, and healthcare professionals because it explains how the body produces and utilizes energy during movement and physical performance.';
  const introInsert =
    'Exercise is considered one of the greatest physiological stresses placed on the human body. During physical activity, the body must rapidly increase energy production to meet the demands of working muscles. This requires the coordination of several body systems, including the muscular, cardiovascular, and respiratory systems.\n\nIf you want the practical calorie side of this topic, [The calorie myth: BMR vs TDEE and how to use them in real life](/insights/bmr-vs-tdee-calorie-calculation-myth) connects the physiology to a usable daily target.\n\nUnderstanding the metabolic aspects of exercise is essential for students, athletes, physical therapists, and healthcare professionals because it explains how the body produces and utilizes energy during movement and physical performance.';

  const vo2Needle =
    'It is considered one of the best indicators of aerobic fitness and endurance performance.\n\nHigher VO2 Max values are associated with:';
  const vo2Insert =
    'It is considered one of the best indicators of aerobic fitness and endurance performance. If you want to understand why the heart and breathing feel limiting during hard efforts, read [The heart in the gym: why it gets tired and how to boost performance](/insights/heart-health-gym-performance-guide).\n\nHigher VO2 Max values are associated with:';

  const conclusionNeedle = '## Conclusion';
  const conclusionInsert =
    '## Frequently Asked Questions\n### Does the body burn fat from the first minute of exercise?\nYes, but the contribution changes by intensity and duration. Early on, the faster systems contribute more, while fat use becomes more important as exercise continues or intensity drops.\n\n### Why do I feel the burning sensation during hard exercise?\nThat feeling is usually linked to anaerobic glycolysis and lactate accumulation, not to direct fat burning.\n\n### Should I do only cardio to lose fat?\nNot usually. A balanced approach with aerobic training, resistance training, and a realistic calorie target is more effective. Start with [The calorie myth: BMR vs TDEE and how to use them in real life](/insights/bmr-vs-tdee-calorie-calculation-myth) and use [calculators](/calculators) to turn the theory into numbers.\n\n## Related reading\nTurn the physiology into action with [calculators](/calculators), then follow progress with the [tracking dashboard](/dashboard). For clearer training breathing and better effort control, read [Gym breathing: the right way to prevent dizziness and boost performance](/insights/gym-breathing-prevent-dizziness-and-boost-performance).\n\n## Conclusion';

  return content.replace(introNeedle, introInsert).replace(vo2Needle, vo2Insert).replace(conclusionNeedle, conclusionInsert);
}

async function loadExistingArticle(client: ReturnType<typeof makeClient>, lang: 'en' | 'ar') {
  const {data, error} = await client
    .from('articles')
    .select('*')
    .eq('lang', lang)
    .eq('slug', ARTICLE_SLUG)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(`Missing published article row for ${lang}`);
  return data;
}

async function loadExistingWorkflow(client: ReturnType<typeof makeClient>, lang: 'en' | 'ar') {
  const {data, error} = await client
    .from('article_workflows')
    .select('*')
    .eq('lang', lang)
    .eq('slug', ARTICLE_SLUG)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(`Missing workflow row for ${lang}`);
  return data;
}

async function main() {
  const client = makeClient();
  const adminEmail = requireEnv('SUPABASE_ADMIN_EMAIL');
  const adminPassword = requireEnv('SUPABASE_ADMIN_PASSWORD');

  const {error: signInError} = await client.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });
  if (signInError) throw signInError;

  const publishedEn = await loadExistingArticle(client, 'en');
  const publishedAr = await loadExistingArticle(client, 'ar');
  const workflowEn = await loadExistingWorkflow(client, 'en');
  const workflowAr = await loadExistingWorkflow(client, 'ar');

  const nextPublishedRows = [
    {
      lang: 'en' as const,
      slug: ARTICLE_SLUG,
      title: ARTICLE_TITLE_EN,
      excerpt: publishedEn.excerpt,
      content: enrichEnglishContent(publishedEn.content),
      category: publishedEn.category,
      date: publishedEn.date,
      icon: publishedEn.icon,
      image: publishedEn.image,
    },
    {
      lang: 'ar' as const,
      slug: ARTICLE_SLUG,
      title: ARTICLE_TITLE_AR,
      excerpt: publishedAr.excerpt,
      content: enrichArabicContent(publishedAr.content),
      category: publishedAr.category,
      date: publishedAr.date,
      icon: publishedAr.icon,
      image: publishedAr.image,
    },
  ];

  const nextWorkflowRows = [
    {
      lang: 'en' as const,
      slug: ARTICLE_SLUG,
      title: ARTICLE_TITLE_EN,
      excerpt: publishedEn.excerpt,
      content: enrichEnglishContent(workflowEn.content),
      category: workflowEn.category,
      date: workflowEn.date,
      icon: workflowEn.icon,
      image: workflowEn.image,
      tags: workflowEn.tags || [],
      image_alt: workflowEn.image_alt || null,
      seo_title: workflowEn.seo_title || ARTICLE_TITLE_EN,
      seo_description: workflowEn.seo_description || publishedEn.excerpt,
      og_image: workflowEn.og_image || null,
      canonical_url: workflowEn.canonical_url || null,
      status: workflowEn.status,
      scheduled_for: workflowEn.scheduled_for,
      published_at: workflowEn.published_at,
    },
    {
      lang: 'ar' as const,
      slug: ARTICLE_SLUG,
      title: ARTICLE_TITLE_AR,
      excerpt: publishedAr.excerpt,
      content: enrichArabicContent(workflowAr.content),
      category: workflowAr.category,
      date: workflowAr.date,
      icon: workflowAr.icon,
      image: workflowAr.image,
      tags: workflowAr.tags || [],
      image_alt: workflowAr.image_alt || null,
      seo_title: workflowAr.seo_title || ARTICLE_TITLE_AR,
      seo_description: workflowAr.seo_description || publishedAr.excerpt,
      og_image: workflowAr.og_image || null,
      canonical_url: workflowAr.canonical_url || null,
      status: workflowAr.status,
      scheduled_for: workflowAr.scheduled_for,
      published_at: workflowAr.published_at,
    },
  ];

  const {error: workflowUpsertError} = await client.from('article_workflows').upsert(nextWorkflowRows, {
    onConflict: 'lang,slug',
  });
  if (workflowUpsertError) throw workflowUpsertError;

  const {error: publishedUpsertError} = await client.from('articles').upsert(nextPublishedRows, {
    onConflict: 'lang,slug',
  });
  if (publishedUpsertError) throw publishedUpsertError;

  const {data: verification, error: verificationError} = await client
    .from('articles')
    .select('lang,slug,title')
    .eq('slug', ARTICLE_SLUG)
    .order('lang', {ascending: true});

  if (verificationError) throw verificationError;
  console.log(JSON.stringify(verification, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

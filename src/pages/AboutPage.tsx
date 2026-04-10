import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';

export default function AboutPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const relatedLinks = [
    {
      label: isAr ? 'بروتوكولات الإصابات' : 'Injury protocols',
      href: navigationPaths.injuries(lang),
      description: isAr ? 'تصفح أدلة التعافي ومراحل التأهيل للإصابات الشائعة.' : 'Browse recovery guides and stage-based rehab content.',
    },
    {
      label: isAr ? 'التمارين' : 'Exercises',
      href: navigationPaths.exercises(lang),
      description: isAr ? 'انتقل من التعرف على المنصة إلى صفحات تمارين عملية ومباشرة.' : 'Move from the platform overview into practical exercise pages.',
    },
    {
      label: isAr ? 'اتصل بنا' : 'Contact',
      href: navigationPaths.contact(lang),
      description: isAr ? 'أرسل ملاحظاتك أو استفساراتك أو طلبات التعاون.' : 'Send feedback, questions, or partnership requests.',
    },
  ];

  return (
    <>
      <Seo
        title={isAr ? 'من نحن' : 'About PhysioNutrition'}
        description={
          isAr
            ? 'تعرّف على منصة PhysioNutrition ورسالتها التعليمية وكيف بُنيت أدواتها الخاصة بالتغذية والتأهيل.'
            : 'Learn about PhysioNutrition, its educational purpose, and how its clinical calculators and nutrition tools are built.'
        }
        canonicalPath="/about"
        hreflangs={buildHreflangs('/about')}
      />
      <PageLayout title={isAr ? 'من نحن' : 'About PhysioNutrition'} relatedLinks={relatedLinks}>
        {isAr ? (
          <>
            <p>
              PhysioNutrition منصة تعليمية تركّز على العلاج الطبيعي، والتعافي، والتغذية العلاجية. الهدف منها هو تبسيط
              الحاسبات الشائعة وتقديمها بشكل أوضح وأكثر فائدة للطلاب والممارسين والمهتمين بالصحة.
            </p>

            <h2>ماذا يقدم الموقع؟</h2>
            <p>
              المنصة تجمع بين حاسبات مبنية على أسس معروفة، ومحتوى تعليمي يخدم التأهيل والتغذية. الهدف هو مساعدة المستخدم
              على فهم تقديرات مثل BMI واحتياج السعرات والبروتين والماء بطريقة عملية ومحافظة.
            </p>

            <h2>المنهج التحريري</h2>
            <p>
              يتم إعداد المحتوى بطابع تعليمي مع الرجوع إلى مراجع معروفة مثل WHO وNIH وأبحاث PubMed عند الحاجة. تسعى
              PhysioNutrition إلى تقديم المعلومة بوضوح دون ادعاء أنها بديل عن التقييم الطبي المباشر.
            </p>

            <h2>ملاحظة مهمة</h2>
            <p>
              PhysioNutrition لا يقدم تشخيصًا أو علاجًا، ولا ينشئ علاقة طبيب أو معالج ومريض. القرارات الطبية أو
              التأهيلية أو التغذوية المهمة يجب مراجعتها مع مختص مرخص.
            </p>
          </>
        ) : (
          <>
            <p>
              PhysioNutrition is an educational platform focused on physical therapy, recovery, and clinical nutrition.
              It is designed to make common calculations clearer and more useful for students, clinicians, and
              health-conscious users.
            </p>

            <h2>What the site offers</h2>
            <p>
              The platform combines evidence-based calculators, recovery-focused insights, and practical health content.
              The goal is to help users understand estimates such as BMI, calorie needs, protein targets, and hydration
              with safer, more conservative framing.
            </p>

            <h2>Editorial approach</h2>
            <p>
              Content is written with an educational tone and checked against established references such as WHO, NIH,
              and PubMed-indexed literature when relevant. PhysioNutrition aims to explain clinical ideas clearly
              without presenting itself as a replacement for medical evaluation.
            </p>

            <h2>Important note</h2>
            <p>
              PhysioNutrition does not provide diagnosis, treatment, or a clinician-patient relationship. Users should
              review important medical, rehabilitation, or nutrition decisions with a licensed professional.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

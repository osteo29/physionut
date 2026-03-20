import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';

export default function AboutPage() {
  const lang = usePreferredLang();

  return (
    <>
      <Seo
        title={lang === 'en' ? 'About PhysioNutrition' : 'من نحن'}
        description={
          lang === 'en'
            ? 'Learn about PhysioNutrition, its educational purpose, and how its clinical calculators and nutrition tools are built.'
            : 'تعرّف على PhysioNutrition ورسالة الموقع التعليمية وكيف تم بناء أدواته في التغذية والعلاج الطبيعي.'
        }
        canonicalPath="/about"
      />
      <PageLayout title={lang === 'en' ? 'About PhysioNutrition' : 'من نحن'}>
        {lang === 'en' ? (
          <>
            <p>
              PhysioNutrition is an educational platform focused on physical therapy,
              recovery, and clinical nutrition. It is designed to make common
              calculations clearer and more useful for students, clinicians, and
              health-conscious users.
            </p>

            <h2>What the site offers</h2>
            <p>
              The platform combines evidence-based calculators, recovery-focused
              insights, and practical health content. The goal is to help users
              understand estimates such as BMI, calorie needs, protein targets,
              and hydration with safer, more conservative framing.
            </p>

            <h2>Editorial approach</h2>
            <p>
              Content is written with an educational tone and checked against
              established references such as WHO, NIH, and PubMed-indexed
              literature when relevant. PhysioNutrition aims to explain clinical ideas
              clearly without presenting itself as a replacement for medical
              evaluation.
            </p>

            <h2>Important note</h2>
            <p>
              PhysioNutrition does not provide diagnosis, treatment, or a
              clinician-patient relationship. Users should review important
              medical, rehabilitation, or nutrition decisions with a licensed
              professional.
            </p>
          </>
        ) : (
          <>
            <p>
              PhysioNutrition منصة تعليمية تركز على العلاج الطبيعي، التعافي، والتغذية
              العلاجية. الهدف منها هو تبسيط الحاسبات الشائعة وتقديمها بشكل أوضح
              وأكثر فائدة للطلاب والممارسين والمهتمين بالصحة.
            </p>

            <h2>ماذا يقدم الموقع؟</h2>
            <p>
              المنصة تجمع بين حاسبات مبنية على أسس معروفة، ومحتوى تعليمي يخدم
              التأهيل والتغذية. الهدف هو مساعدة المستخدم على فهم تقديرات مثل BMI
              واحتياج السعرات والبروتين والماء بطريقة عملية ومحافظة.
            </p>

            <h2>المنهج التحريري</h2>
            <p>
              يتم إعداد المحتوى بطابع تعليمي مع الرجوع إلى مراجع معروفة مثل WHO و
              NIH وأبحاث PubMed عند الحاجة. PhysioNutrition يسعى إلى تقديم المعلومة
              بوضوح دون ادعاء أنه بديل عن التقييم الطبي المباشر.
            </p>

            <h2>ملاحظة مهمة</h2>
            <p>
              PhysioNutrition لا يقدم تشخيصًا أو علاجًا، ولا ينشئ علاقة طبيب أو معالج
              ومريض. القرارات الطبية أو التأهيلية أو التغذوية المهمة يجب
              مراجعتها مع مختص مرخص.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

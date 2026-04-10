import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';

export default function TermsOfService() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const relatedLinks = [
    {
      label: isAr ? 'إخلاء المسؤولية الطبي' : 'Medical disclaimer',
      href: navigationPaths.disclaimer(lang),
      description: isAr ? 'اقرأ التنبيه الطبي المرتبط بالحاسبات والمحتوى الصحي.' : 'Read the safety framing around calculators and health content.',
    },
    {
      label: isAr ? 'سياسة الخصوصية' : 'Privacy policy',
      href: navigationPaths.privacy(lang),
      description: isAr ? 'راجع كيفية التعامل مع التفضيلات والموافقة والبيانات.' : 'Review how preferences, consent, and data are handled.',
    },
    {
      label: isAr ? 'من نحن' : 'About PhysioNutrition',
      href: navigationPaths.about(lang),
      description: isAr ? 'تعرف على هدف المنصة والفئة التي تخدمها.' : 'See who the platform is for and what it aims to provide.',
    },
  ];

  return (
    <>
      <Seo
        title={isAr ? 'الشروط والأحكام' : 'Terms of Service'}
        description={
          isAr
            ? 'شروط استخدام PhysioNutrition لحاسبات العلاج الطبيعي وأدوات التغذية العلاجية.'
            : 'PhysioNutrition terms for using physical therapy calculators and clinical nutrition tools.'
        }
        canonicalPath="/terms"
        hreflangs={buildHreflangs('/terms')}
      />
      <PageLayout title={isAr ? 'الشروط والأحكام' : 'Terms of Service'} relatedLinks={relatedLinks}>
        {isAr ? (
          <>
            <p>تقدم PhysioNutrition حاسبات سريرية ومحتوى تعليمي. باستخدامك للمنصة فأنت توافق على هذه الشروط.</p>

            <h2>استخدام تعليمي فقط</h2>
            <p>الأدوات والنتائج لأغراض استرشادية مبنية على معادلات معتمدة. النتائج تقديرية وقد لا تكون مناسبة لجميع الحالات أو السيناريوهات السريرية.</p>

            <h2>ليست نصيحة طبية</h2>
            <p>PhysioNutrition لا تقدم تشخيصًا أو علاجًا. استخدام المنصة لا ينشئ علاقة طبيب أو معالج ومريض. يرجى استشارة مختص مرخص لاتخاذ أي قرار طبي.</p>

            <h2>الاستخدام المقبول</h2>
            <ul>
              <li>يُمنع محاولة تعطيل الخدمة أو استغلالها أو هندستها عكسيًا.</li>
              <li>يُمنع إساءة استخدام ميزات الذكاء الاصطناعي أو إرسال محتوى غير قانوني.</li>
            </ul>

            <h2>التحديثات</h2>
            <p>قد نقوم بتحديث هذه الشروط من وقت لآخر. استمرارك في الاستخدام بعد التحديث يعني موافقتك على الشروط الجديدة.</p>
          </>
        ) : (
          <>
            <p>PhysioNutrition provides clinical calculators and educational resources. By using this platform, you agree to these terms.</p>

            <h2>Educational use only</h2>
            <p>Tools and outputs are intended for informational purposes and are based on established equations. Results are estimates and may not be appropriate for all individuals or clinical scenarios.</p>

            <h2>No medical advice</h2>
            <p>PhysioNutrition does not provide diagnosis or treatment. Using the platform does not create a clinician-patient relationship. Always consult a licensed professional for medical decisions.</p>

            <h2>Acceptable use</h2>
            <ul>
              <li>Do not attempt to disrupt, exploit, or reverse engineer the service.</li>
              <li>Do not submit unlawful content or misuse AI features.</li>
            </ul>

            <h2>Changes</h2>
            <p>We may update these terms from time to time. Continued use after changes means you accept the updated terms.</p>
          </>
        )}
      </PageLayout>
    </>
  );
}

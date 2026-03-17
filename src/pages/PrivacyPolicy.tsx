import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

export default function PrivacyPolicy() {
  const lang = usePreferredLang();
  return (
    <PageLayout title={lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}>
      {lang === 'en' ? (
        <>
          <p>
            At PhysioHub, we are committed to protecting your privacy. This
            policy explains what data may be collected and how it is used.
          </p>

          <h2>How your calculator data is handled</h2>
          <p>
            Inputs you enter into calculators (e.g. BMI, BMR, TDEE, macros) are
            processed locally in your browser for the purpose of generating
            results. We do not intentionally store patient or user health inputs
            on external servers.
          </p>

          <h2>Analytics and performance</h2>
          <p>
            We may use privacy-respecting analytics (such as Google Analytics in
            the future) to understand aggregated usage patterns (e.g. visited
            pages and time on site) to improve the platform. Analytics data is
            not intended to identify you personally.
          </p>

          <h2>Cookies</h2>
          <p>
            Cookies may be used to keep the site functional, remember
            preferences, and measure performance. You can disable cookies in
            your browser settings at any time.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions, email{' '}
            <a href="mailto:contact@physiohub.com">contact@physiohub.com</a>.
          </p>
        </>
      ) : (
        <>
          <p>
            نحن في PhysioHub نلتزم بحماية خصوصيتك. توضح هذه السياسة ما قد نقوم
            بجمعه من بيانات وكيفية استخدامها.
          </p>

          <h2>كيفية التعامل مع بيانات الحاسبات</h2>
          <p>
            المدخلات التي تكتبها داخل الحاسبات (مثل BMI وBMR وTDEE والماكروز)
            تتم معالجتها محليًا داخل المتصفح بهدف عرض النتائج. نحن لا نقوم عمدًا
            بتخزين بيانات المرضى أو مدخلات المستخدم الصحية على خوادم خارجية.
          </p>

          <h2>التحليلات وتحسين الأداء</h2>
          <p>
            قد نقوم مستقبلًا باستخدام تحليلات (مثل Google Analytics) لفهم أنماط
            الاستخدام بشكل مجمّع (مثل الصفحات التي تمت زيارتها ومدة التصفح) بهدف
            تحسين المنصة. بيانات التحليلات ليست مخصصة للتعرّف على هويتك الشخصية.
          </p>

          <h2>ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            قد نستخدم ملفات الارتباط لتحسين تجربة الاستخدام، حفظ التفضيلات،
            وقياس الأداء. يمكنك تعطيلها من إعدادات المتصفح في أي وقت.
          </p>

          <h2>التواصل</h2>
          <p>
            للاستفسارات المتعلقة بالخصوصية، راسلنا على{' '}
            <a href="mailto:contact@physiohub.com">contact@physiohub.com</a>.
          </p>
        </>
      )}
    </PageLayout>
  );
}


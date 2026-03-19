import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';

export default function PrivacyPolicy() {
  const lang = usePreferredLang();

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
        description={
          lang === 'en'
            ? 'PhysioNutrition privacy policy for calculators, educational content, cookies, and advertising consent.'
            : 'سياسة خصوصية PhysioNutrition الخاصة بالحاسبات والمحتوى التعليمي والكوكيز والموافقة الإعلانية.'
        }
        canonicalPath="/privacy"
      />
      <PageLayout title={lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}>
        {lang === 'en' ? (
          <>
            <p>
              PhysioNutrition is committed to protecting your privacy. This policy
              explains what data may be processed on the site and how consent is
              handled for optional technologies such as advertising cookies.
            </p>

            <h2>Calculator inputs</h2>
            <p>
              Most calculator inputs are processed locally in your browser so the
              site can generate estimates and educational outputs. We do not
              intentionally ask users to submit private medical records through
              the public calculators.
            </p>

            <h2>Cookies and stored preferences</h2>
            <p>
              PhysioNutrition stores essential preferences such as language, theme, and
              cookie choices in your browser. These help the website function
              properly and remember your settings across visits.
            </p>

            <h2>Advertising and consent</h2>
            <p>
              If advertising is enabled on PhysioNutrition, Google AdSense may be used
              to display ads. Ad-related cookies or similar technologies are only
              activated after you accept optional consent through the site banner.
              If you reject optional consent, non-essential ad personalization
              features stay disabled on this device.
            </p>

            <h2>Analytics</h2>
            <p>
              PhysioNutrition may use privacy-conscious measurement tools to understand
              aggregated traffic and improve the platform. Any analytics usage is
              intended to review overall performance rather than identify users
              personally.
            </p>

            <h2>Contact</h2>
            <p>
              For privacy questions or data-related concerns, contact{' '}
              <a href="mailto:physionutritionofficial@gmail.com">physionutritionofficial@gmail.com</a>.
            </p>
          </>
        ) : (
          <>
            <p>
              يلتزم PhysioNutrition بحماية خصوصيتك. توضح هذه السياسة ما قد يتم التعامل
              معه من بيانات داخل الموقع وكيفية إدارة الموافقة على التقنيات
              الاختيارية مثل كوكيز الإعلانات.
            </p>

            <h2>مدخلات الحاسبات</h2>
            <p>
              تتم معالجة معظم مدخلات الحاسبات محليًا داخل متصفحك حتى يتمكن الموقع
              من عرض التقديرات والمخرجات التعليمية. نحن لا نتعمد طلب سجلات طبية
              خاصة من المستخدمين عبر الحاسبات العامة.
            </p>

            <h2>الكوكيز والتفضيلات المحفوظة</h2>
            <p>
              يحتفظ PhysioNutrition ببعض التفضيلات الأساسية داخل المتصفح مثل اللغة
              والمظهر واختيار الموافقة على الكوكيز. هذا يساعد الموقع على العمل
              بشكل صحيح وتذكر إعداداتك في الزيارات القادمة.
            </p>

            <h2>الإعلانات والموافقة</h2>
            <p>
              عند تفعيل الإعلانات على PhysioNutrition قد يتم استخدام Google AdSense
              لعرض الإعلانات. لا يتم تفعيل كوكيز الإعلانات أو التقنيات المشابهة
              إلا بعد موافقتك على العناصر الاختيارية من خلال شريط الموافقة. إذا
              رفضت الموافقة الاختيارية فستظل ميزات الإعلانات غير الضرورية معطلة
              على هذا الجهاز.
            </p>

            <h2>التحليلات</h2>
            <p>
              قد يستخدم PhysioNutrition أدوات قياس تراعي الخصوصية لفهم الزيارات بشكل
              مجمع وتحسين المنصة. الهدف من أي تحليلات هو مراجعة الأداء العام وليس
              التعرف الشخصي على المستخدمين.
            </p>

            <h2>التواصل</h2>
            <p>
              للاستفسارات المتعلقة بالخصوصية أو البيانات، راسلنا على{' '}
              <a href="mailto:physionutritionofficial@gmail.com">physionutritionofficial@gmail.com</a>.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';

export default function CookiePolicy() {
  const lang = usePreferredLang();

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Cookie Policy' : 'Ø³ÙŠØ§Ø³Ø© Ù…Ù„ÙØ§Øª Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø·'}
        description={
          lang === 'en'
            ? 'PhysioHub cookie policy covering essential preferences, consent choices, analytics, and advertising cookies.'
            : 'Ø³ÙŠØ§Ø³Ø© Ù…Ù„ÙØ§Øª Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø· ÙÙŠ PhysioHub Ø§Ù„Ø®Ø§ØµØ© Ø¨Ø§Ù„ØªÙØ¶ÙŠÙ„Ø§Øª ÙˆØ§Ù„Ù…ÙˆØ§ÙÙ‚Ø© ÙˆØ§Ù„Ø¥Ø¹Ù„Ø§Ù†Ø§Øª.'
        }
        canonicalPath="/cookies"
      />
      <PageLayout title={lang === 'en' ? 'Cookie Policy' : 'Ø³ÙŠØ§Ø³Ø© Ù…Ù„ÙØ§Øª Ø§Ù„Ø§Ø±ØªØ¨Ø§Ø·'}>
        {lang === 'en' ? (
          <>
            <p>
              Cookies are small files stored in your browser. PhysioHub uses a
              limited set of cookies or local storage entries to keep the site
              functional and remember your preferences.
            </p>

            <h2>Essential technologies</h2>
            <p>
              These are used to remember settings such as language, theme, and
              consent choices so the site works consistently.
            </p>

            <h2>Optional analytics or advertising cookies</h2>
            <p>
              Optional measurement or advertising technologies are only enabled
              after you accept non-essential consent. If you reject optional
              consent, these technologies should remain disabled on your device.
            </p>

            <h2>Your choices</h2>
            <p>
              You can manage cookie behavior through your browser settings and by
              using the consent banner shown on the site.
            </p>
          </>
        ) : (
          <>
            <p>
              الكوكيز هي ملفات صغيرة تُحفظ داخل المتصفح. يستخدم PhysioHub عددًا
              محدودًا من الكوكيز أو عناصر التخزين المحلي حتى يظل الموقع
              قابلًا للاستخدام ويتذكر تفضيلاتك.
            </p>

            <h2>التقنيات الأساسية</h2>
            <p>
              يتم استخدامها لتذكر إعدادات مثل اللغة والمظهر واختيارات الموافقة
              حتى يعمل الموقع بشكل ثابت.
            </p>

            <h2>كوكيز التحليلات أو الإعلانات الاختيارية</h2>
            <p>
              لا يتم تفعيل تقنيات القياس أو الإعلانات الاختيارية إلا بعد قبولك
              للموافقة غير الضرورية. إذا رفضت الموافقة الاختيارية، يفترض أن تظل
              هذه التقنيات معطلة على جهازك.
            </p>

            <h2>اختياراتك</h2>
            <p>
              يمكنك إدارة الكوكيز من خلال إعدادات المتصفح ومن خلال شريط
              الموافقة الظاهر على الموقع.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

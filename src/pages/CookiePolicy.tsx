import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';

export default function CookiePolicy() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const relatedLinks = [
    {
      label: isAr ? 'سياسة الخصوصية' : 'Privacy policy',
      href: navigationPaths.privacy(lang),
      description: isAr ? 'اطّلع على سياسة الخصوصية الأشمل المرتبطة بهذه الصفحة.' : 'Read the broader privacy policy that this cookie page supports.',
    },
    {
      label: isAr ? 'الشروط والأحكام' : 'Terms of service',
      href: navigationPaths.terms(lang),
      description: isAr ? 'راجع شروط استخدام المنصة بجانب قواعد الموافقة.' : 'Check the main platform usage terms alongside consent rules.',
    },
    {
      label: isAr ? 'اتصل بنا' : 'Contact',
      href: navigationPaths.contact(lang),
      description: isAr ? 'تواصل معنا إذا كانت إعدادات الموافقة أو الكوكيز غير واضحة.' : 'Ask questions if consent or browser behavior seems unclear.',
    },
  ];

  return (
    <>
      <Seo
        title={isAr ? 'سياسة الكوكيز' : 'Cookie Policy'}
        description={
          isAr
            ? 'سياسة الكوكيز في PhysioNutrition الخاصة بالتفضيلات والموافقة والتحليلات والإعلانات.'
            : 'PhysioNutrition cookie policy covering essential preferences, consent choices, analytics, and advertising cookies.'
        }
        canonicalPath="/cookies"
        hreflangs={buildHreflangs('/cookies')}
      />
      <PageLayout title={isAr ? 'سياسة الكوكيز' : 'Cookie Policy'} relatedLinks={relatedLinks}>
        {isAr ? (
          <>
            <p>الكوكيز هي ملفات صغيرة تُحفظ داخل المتصفح. يستخدم PhysioNutrition عددًا محدودًا من الكوكيز أو التخزين المحلي حتى يظل الموقع قابلًا للاستخدام ويتذكر تفضيلاتك.</p>

            <h2>التقنيات الأساسية</h2>
            <p>يتم استخدامها لتذكر إعدادات مثل اللغة والمظهر واختيارات الموافقة حتى يعمل الموقع بشكل ثابت.</p>

            <h2>كوكيز التحليلات أو الإعلانات الاختيارية</h2>
            <p>لا يتم تفعيل تقنيات القياس أو الإعلانات الاختيارية إلا بعد قبولك للموافقة غير الضرورية. إذا رفضت الموافقة الاختيارية، يفترض أن تظل هذه التقنيات معطلة على جهازك.</p>

            <h2>اختياراتك</h2>
            <p>يمكنك إدارة الكوكيز من خلال إعدادات المتصفح ومن خلال شريط الموافقة الظاهر على الموقع.</p>
          </>
        ) : (
          <>
            <p>Cookies are small files stored in your browser. PhysioNutrition uses a limited set of cookies or local storage entries to keep the site functional and remember your preferences.</p>

            <h2>Essential technologies</h2>
            <p>These are used to remember settings such as language, theme, and consent choices so the site works consistently.</p>

            <h2>Optional analytics or advertising cookies</h2>
            <p>Optional measurement or advertising technologies are only enabled after you accept non-essential consent. If you reject optional consent, these technologies should remain disabled on your device.</p>

            <h2>Your choices</h2>
            <p>You can manage cookie behavior through your browser settings and by using the consent banner shown on the site.</p>
          </>
        )}
      </PageLayout>
    </>
  );
}

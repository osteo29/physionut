import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';
import {buildHreflangs, navigationPaths} from '../utils/langUrlHelper';

export default function ContactPage() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const relatedLinks = [
    {
      label: isAr ? 'من نحن' : 'About PhysioNutrition',
      href: navigationPaths.about(lang),
      description: isAr ? 'اعرف رسالة المنصة وطريقة إعداد المحتوى.' : 'See the platform mission and editorial approach.',
    },
    {
      label: isAr ? 'سياسة الخصوصية' : 'Privacy policy',
      href: navigationPaths.privacy(lang),
      description: isAr ? 'راجع تفاصيل الخصوصية ومعالجة البيانات قبل التواصل معنا.' : 'Review privacy and data-handling details before contacting us.',
    },
    {
      label: isAr ? 'المقالات' : 'Insights',
      href: navigationPaths.insights(lang),
      description: isAr ? 'كمّل التصفح داخل المقالات والأدلة التعليمية.' : 'Continue browsing the educational articles and guides.',
    },
  ];

  return (
    <>
      <Seo
        title={isAr ? 'اتصل بنا' : 'Contact PhysioNutrition'}
        description={
          isAr
            ? 'تواصل مع PhysioNutrition للاستفسارات العامة أو طلبات الخصوصية أو التعاون.'
            : 'Contact PhysioNutrition for general questions, privacy requests, or partnership inquiries.'
        }
        canonicalPath="/contact"
        hreflangs={buildHreflangs('/contact')}
      />
      <PageLayout title={isAr ? 'اتصل بنا' : 'Contact'} relatedLinks={relatedLinks}>
        {isAr ? (
          <>
            <p>للاستفسارات العامة أو طلبات الخصوصية أو الملاحظات أو التعاون، يمكنك التواصل مع PhysioNutrition عبر البريد الإلكتروني.</p>

            <h2>البريد الإلكتروني</h2>
            <p>
              <a href="mailto:physionutritionofficial@gmail.com">physionutritionofficial@gmail.com</a>
            </p>

            <h2>ما الذي يفضل إرساله</h2>
            <p>إذا كانت رسالتك تتعلق بدقة المحتوى أو الحاسبات أو بطلب قانوني أو خصوصية، فمن الأفضل إرفاق رابط الصفحة ووصف مختصر للموضوع.</p>
          </>
        ) : (
          <>
            <p>For general questions, privacy requests, feedback, or collaboration inquiries, you can contact PhysioNutrition by email.</p>

            <h2>Email</h2>
            <p>
              <a href="mailto:physionutritionofficial@gmail.com">physionutritionofficial@gmail.com</a>
            </p>

            <h2>What to include</h2>
            <p>If your message relates to content accuracy, calculator behavior, or a legal/privacy request, include the page URL and a short summary so the issue can be reviewed efficiently.</p>
          </>
        )}
      </PageLayout>
    </>
  );
}

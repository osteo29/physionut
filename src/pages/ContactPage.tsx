import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';

export default function ContactPage() {
  const lang = usePreferredLang();

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Contact PhysioHub' : 'اتصل بنا'}
        description={
          lang === 'en'
            ? 'Contact PhysioHub for general questions, privacy requests, or partnership inquiries.'
            : 'تواصل مع PhysioHub للاستفسارات العامة أو طلبات الخصوصية أو التعاون.'
        }
        canonicalPath="/contact"
      />
      <PageLayout title={lang === 'en' ? 'Contact' : 'اتصل بنا'}>
        {lang === 'en' ? (
          <>
            <p>
              For general questions, privacy requests, feedback, or collaboration
              inquiries, you can contact PhysioHub by email.
            </p>

            <h2>Email</h2>
            <p>
              <a href="mailto:contact@physiohub.com">contact@physiohub.com</a>
            </p>

            <h2>What to include</h2>
            <p>
              If your message relates to content accuracy, calculator behavior, or
              a legal/privacy request, include the page URL and a short summary so
              the issue can be reviewed efficiently.
            </p>
          </>
        ) : (
          <>
            <p>
              للاستفسارات العامة أو طلبات الخصوصية أو الملاحظات أو التعاون،
              يمكنك التواصل مع PhysioHub عبر البريد الإلكتروني.
            </p>

            <h2>البريد الإلكتروني</h2>
            <p>
              <a href="mailto:contact@physiohub.com">contact@physiohub.com</a>
            </p>

            <h2>ما الذي يفضّل إرساله</h2>
            <p>
              إذا كانت رسالتك تتعلق بدقة المحتوى أو الحاسبات أو بطلب قانوني أو
              خصوصية، فمن الأفضل إرفاق رابط الصفحة ووصف مختصر للموضوع.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

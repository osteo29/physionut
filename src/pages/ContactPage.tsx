import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';

export default function ContactPage() {
  const lang = usePreferredLang();

  return (
    <>
      <Seo
        title={lang === 'en' ? 'Contact PhysioHub' : 'Ø§ØªØµÙ„ Ø¨Ù†Ø§'}
        description={
          lang === 'en'
            ? 'Contact PhysioHub for general questions, privacy requests, or partnership inquiries.'
            : 'ØªÙˆØ§ØµÙ„ Ù…Ø¹ PhysioHub Ù„Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø© Ø£Ùˆ Ù…Ø³Ø§Ø¦Ù„ Ø§Ù„Ø®ØµÙˆØµÙŠØ©.'
        }
        canonicalPath="/contact"
      />
      <PageLayout title={lang === 'en' ? 'Contact' : 'Ø§ØªØµÙ„ Ø¨Ù†Ø§'}>
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
              Ù„Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø§Ù…Ø© Ø£Ùˆ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø®ØµÙˆØµÙŠØ© Ø£Ùˆ
              Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø£Ùˆ Ø§Ù„ØªØ¹Ø§ÙˆÙ†ØŒ ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹
              PhysioHub Ø¹Ø¨Ø± Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ.
            </p>

            <h2>Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ</h2>
            <p>
              <a href="mailto:contact@physiohub.com">contact@physiohub.com</a>
            </p>

            <h2>Ù…Ø§ Ø§Ù„Ø°ÙŠ ÙŠÙØ¶Ù„ Ø¥Ø±Ø³Ø§Ù„Ù‡</h2>
            <p>
              Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø±Ø³Ø§Ù„ØªÙƒ ØªØªØ¹Ù„Ù‚ Ø¨Ø¯Ù‚Ø© Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø£Ùˆ
              Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª Ø£Ùˆ Ø¨Ø·Ù„Ø¨ Ù‚Ø§Ù†ÙˆÙ†ÙŠ/Ø®ØµÙˆØµÙŠØ©ØŒ ÙÙ…Ù†
              Ø§Ù„Ø£ÙØ¶Ù„ Ø¥Ø±ÙØ§Ù‚ Ø±Ø§Ø¨Ø· Ø§Ù„ØµÙØ­Ø© ÙˆÙˆØµÙ Ù…Ø®ØªØµØ±
              Ù„Ù„Ù…ÙˆØ¶ÙˆØ¹.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

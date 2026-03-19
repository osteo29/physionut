import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';
import Seo from '../components/seo/Seo';

export default function AboutPage() {
  const lang = usePreferredLang();

  return (
    <>
      <Seo
        title={lang === 'en' ? 'About PhysioHub' : 'Ù…Ù† Ù†Ø­Ù†'}
        description={
          lang === 'en'
            ? 'Learn about PhysioHub, its educational purpose, and how its clinical calculators and nutrition tools are built.'
            : 'ØªØ¹Ø±Ù Ø¹Ù„Ù‰ PhysioHub ÙˆØ±Ø³Ø§Ù„ØªÙ‡ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ© ÙˆÙƒÙŠÙ ÙŠØªÙ… Ø¨Ù†Ø§Ø¡ Ø£Ø¯ÙˆØ§ØªÙ‡ Ø§Ù„Ø³Ø±ÙŠØ±ÙŠØ©.'
        }
        canonicalPath="/about"
      />
      <PageLayout title={lang === 'en' ? 'About PhysioHub' : 'Ù…Ù† Ù†Ø­Ù†'}>
        {lang === 'en' ? (
          <>
            <p>
              PhysioHub is an educational platform focused on physical therapy,
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
              literature when relevant. PhysioHub aims to explain clinical ideas
              clearly without presenting itself as a replacement for medical
              evaluation.
            </p>

            <h2>Important note</h2>
            <p>
              PhysioHub does not provide diagnosis, treatment, or a
              clinician-patient relationship. Users should review important
              medical, rehabilitation, or nutrition decisions with a licensed
              professional.
            </p>
          </>
        ) : (
          <>
            <p>
              PhysioHub Ù…Ù†ØµØ© ØªØ¹Ù„ÙŠÙ…ÙŠØ© ØªØ±ÙƒØ² Ø¹Ù„Ù‰ Ø§Ù„Ø¹Ù„Ø§Ø¬ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠ
              ÙˆØ§Ù„ØªØ¹Ø§ÙÙŠ ÙˆØ§Ù„ØªØºØ°ÙŠØ© Ø§Ù„Ø¹Ù„Ø§Ø¬ÙŠØ©. Ø§Ù„Ù‡Ø¯Ù Ù…Ù†Ù‡Ø§
              ØªØ¨Ø³ÙŠØ· Ø§Ù„Ø­Ø§Ø³Ø¨Ø§Øª Ø§Ù„Ø´Ø§Ø¦Ø¹Ø© ÙˆØªÙ‚Ø¯ÙŠÙ…Ù‡Ø§ Ø¨Ø´ÙƒÙ„ Ø£ÙƒØ«Ø±
              ÙˆØ¶ÙˆØ­Ù‹Ø§ ÙˆÙØ§Ø¦Ø¯Ø© Ù„Ù„Ø·Ù„Ø§Ø¨ ÙˆØ§Ù„Ù…Ù…Ø§Ø±Ø³ÙŠÙ† ÙˆØ§Ù„Ù…Ù‡ØªÙ…ÙŠÙ†
              Ø¨Ø§Ù„ØµØ­Ø©.
            </p>

            <h2>Ù…Ø§ Ø§Ù„Ø°ÙŠ ÙŠÙ‚Ø¯Ù…Ù‡ Ø§Ù„Ù…ÙˆÙ‚Ø¹</h2>
            <p>
              Ø§Ù„Ù…Ù†ØµØ© ØªØ¬Ù…Ø¹ Ø¨ÙŠÙ† Ø­Ø§Ø³Ø¨Ø§Øª Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ Ø§Ù„Ø¨Ø±Ø§Ù‡ÙŠÙ†
              ÙˆÙ…Ø­ØªÙˆÙ‰ ØªØ¹Ù„ÙŠÙ…ÙŠ ÙŠØ®Ø¯Ù… Ø§Ù„ØªØ¹Ø§ÙÙŠ ÙˆØ§Ù„ØªØºØ°ÙŠØ©. Ø§Ù„Ù‡Ø¯Ù
              Ù‡Ùˆ Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø¹Ù„Ù‰ ÙÙ‡Ù… ØªÙ‚Ø¯ÙŠØ±Ø§Øª Ù…Ø«Ù„ BMI
              ÙˆØ§Ø­ØªÙŠØ§Ø¬ Ø§Ù„Ø³Ø¹Ø±Ø§Øª ÙˆØ§Ù„Ø¨Ø±ÙˆØªÙŠÙ† ÙˆØ§Ù„ØªØ±Ø·ÙŠØ¨ Ø¨ØµÙŠØ§ØºØ©
              Ø­Ø°Ø±Ø© ÙˆØ§Ø¶Ø­Ø©.
            </p>

            <h2>Ø§Ù„Ù…Ù†Ù‡Ø¬ Ø§Ù„ØªØ­Ø±ÙŠØ±ÙŠ</h2>
            <p>
              ÙŠØªÙ… Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø¨Ø·Ø§Ø¨Ø¹ ØªØ¹Ù„ÙŠÙ…ÙŠ Ù…Ø¹ Ø§Ù„Ø±Ø¬ÙˆØ¹
              Ø¥Ù„Ù‰ Ù…Ø±Ø§Ø¬Ø¹ Ù…Ø¹Ø±ÙˆÙØ© Ù…Ø«Ù„ WHO Ùˆ NIH ÙˆØ£Ø¨Ø­Ø§Ø« PubMed
              Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©. PhysioHub ÙŠØ³Ø¹Ù‰ Ø¥Ù„Ù‰ ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø©
              Ø¨ÙˆØ¶ÙˆØ­ Ø¯ÙˆÙ† Ø£Ù† ÙŠØ¯Ù‘Ø¹ÙŠ Ø£Ù†Ù‡ Ø¨Ø¯ÙŠÙ„ Ø¹Ù† Ø§Ù„ØªÙ‚ÙŠÙŠÙ…
              Ø§Ù„Ø·Ø¨ÙŠ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±.
            </p>

            <h2>Ù…Ù„Ø§Ø­Ø¸Ø© Ù…Ù‡Ù…Ø©</h2>
            <p>
              PhysioHub Ù„Ø§ ÙŠÙ‚Ø¯Ù… ØªØ´Ø®ÙŠØµÙ‹Ø§ Ø£Ùˆ Ø¹Ù„Ø§Ø¬Ù‹Ø§ØŒ ÙˆÙ„Ø§ ÙŠÙ†Ø´Ø¦
              Ø¹Ù„Ø§Ù‚Ø© Ø·Ø¨ÙŠØ¨/Ù…Ø¹Ø§Ù„Ø¬-Ù…Ø±ÙŠØ¶. Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ø·Ø¨ÙŠØ© Ø£Ùˆ
              Ø§Ù„ØªØ£Ù‡ÙŠÙ„ÙŠØ© Ø£Ùˆ Ø§Ù„ØªØºØ°ÙˆÙŠØ© Ø§Ù„Ù…Ù‡Ù…Ø© ÙŠØ¬Ø¨ Ù…Ø±Ø§Ø¬Ø¹ØªÙ‡Ø§
              Ù…Ø¹ Ù…Ø®ØªØµ Ù…Ø±Ø®Øµ.
            </p>
          </>
        )}
      </PageLayout>
    </>
  );
}

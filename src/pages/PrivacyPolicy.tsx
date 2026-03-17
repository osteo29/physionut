import PageLayout from './PageLayout';

export default function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <p>
        We respect your privacy. This policy explains what information PhysioHub
        may collect and how it is used.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Usage data</strong>: basic analytics (e.g. pages visited and
          session duration) to improve the product.
        </li>
        <li>
          <strong>Voluntary submissions</strong>: if you contact us, we may
          receive the info you send (like your email).
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Cookies may be used to keep the site functional and to understand how it
        is used. You can disable cookies in your browser settings.
      </p>

      <h2>Data protection</h2>
      <p>
        We do not intentionally collect sensitive medical records. Calculator
        inputs are intended for educational purposes and are not a substitute
        for professional care.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this policy, contact us at{' '}
        <a href="mailto:contact@physiohub.com">contact@physiohub.com</a>.
      </p>
    </PageLayout>
  );
}


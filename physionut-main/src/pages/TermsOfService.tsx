import PageLayout from './PageLayout';

export default function TermsOfService() {
  return (
    <PageLayout title="Terms of Service">
      <p>
        By using PhysioHub, you agree to these terms. If you do not agree,
        please do not use the site.
      </p>

      <h2>Medical disclaimer</h2>
      <p>
        PhysioHub provides informational tools and calculators. It is not
        medical advice and does not create a clinician–patient relationship.
        Always consult a qualified professional for medical decisions.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not attempt to disrupt or reverse engineer the service.</li>
        <li>Do not misuse AI features or submit unlawful content.</li>
      </ul>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use after changes
        means you accept the updated terms.
      </p>
    </PageLayout>
  );
}


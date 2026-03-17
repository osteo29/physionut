import PageLayout from './PageLayout';

export default function CookiePolicy() {
  return (
    <PageLayout title="Cookie Policy">
      <p>
        Cookies are small text files stored in your browser. We use them to keep
        the site working and to understand usage trends.
      </p>

      <h2>Types of cookies</h2>
      <ul>
        <li>
          <strong>Essential</strong>: required for basic functionality.
        </li>
        <li>
          <strong>Analytics</strong>: helps us measure traffic and improve UX.
        </li>
      </ul>

      <h2>Your choices</h2>
      <p>
        You can manage or disable cookies in your browser settings. Disabling
        cookies may affect parts of the site.
      </p>
    </PageLayout>
  );
}


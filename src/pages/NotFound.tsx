import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import PageLayout from './PageLayout';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The requested page could not be found."
        canonicalPath="/404"
        noIndex
      />
      <PageLayout title="Page not found">
        <p>The page you're looking for doesn't exist.</p>
        <p>
          <Link className="text-health-green font-bold" to="/">
            Go back home
          </Link>
          .
        </p>
      </PageLayout>
    </>
  );
}

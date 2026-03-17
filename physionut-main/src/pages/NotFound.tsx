import {Link} from 'react-router-dom';
import PageLayout from './PageLayout';

export default function NotFound() {
  return (
    <PageLayout title="Page not found">
      <p>The page you’re looking for doesn’t exist.</p>
      <p>
        <Link className="text-health-green font-bold" to="/">
          Go back home
        </Link>
        .
      </p>
    </PageLayout>
  );
}


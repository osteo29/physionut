import {type ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import PageLayout from '../../pages/PageLayout';
import usePreferredLang from '../../pages/usePreferredLang';
import Seo from '../seo/Seo';
import useAdminAccess from '../../hooks/useAdminAccess';

export default function AdminRoute({children}: {children: ReactElement}) {
  const uiLang = usePreferredLang();
  const isAr = uiLang === 'ar';
  const location = useLocation();
  const access = useAdminAccess(uiLang);

  if (!access.isSupabaseConfigured) {
    return children;
  }

  if (!access.authChecked) {
    return (
      <>
        <Seo
          title={isAr ? 'التحقق من الصلاحية' : 'Checking access'}
          description={isAr ? 'جارٍ التحقق من الصلاحية.' : 'Checking access.'}
          canonicalPath={location.pathname}
          noIndex
        />
        <PageLayout title={isAr ? 'التحقق من الصلاحية' : 'Checking access'}>
          <p>{isAr ? 'جارٍ التحقق من صلاحيتك...' : 'Checking your access...'}</p>
        </PageLayout>
      </>
    );
  }

  if (!access.user) {
    return <Navigate to={`/${uiLang}/auth`} replace state={{from: location.pathname}} />;
  }

  if (!access.canAccessAdminArea) {
    return (
      <>
        <Seo
          title={isAr ? 'صفحة مقفولة' : 'Restricted'}
          description={isAr ? 'هذه الصفحة مقفولة.' : 'This page is restricted.'}
          canonicalPath={location.pathname}
          noIndex
        />
        <PageLayout title={isAr ? 'صفحة مقفولة' : 'Restricted'}>
          <p>{isAr ? 'هذه الصفحة متاحة لحسابات الإدارة فقط.' : 'This page is restricted to admin accounts only.'}</p>
          <p>
            {isAr ? 'أنت مسجل الدخول بالحساب:' : 'Signed in as:'} <strong>{access.user.email}</strong>
          </p>
          <p>
            {isAr ? 'إيميل مسؤول المقالات المضبوط:' : 'Configured article admin email:'}{' '}
            <strong>{access.configuredAdminEmail || (isAr ? 'غير مضبوط' : 'not set')}</strong>
          </p>
        </PageLayout>
      </>
    );
  }

  return children;
}

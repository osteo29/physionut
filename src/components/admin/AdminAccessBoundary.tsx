import type {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import Seo from '../seo/Seo';
import PageLayout from '../../pages/PageLayout';
import {navigationPaths} from '../../utils/langUrlHelper';
import type {Language} from '../../services/translations';
import type {AdminAccessState} from '../../hooks/useAdminAccess';

type RequiredPermission = 'area' | 'injuries' | 'articles';

function getPermissionState(access: AdminAccessState, requiredPermission: RequiredPermission) {
  if (requiredPermission === 'articles') return access.canManageArticles;
  if (requiredPermission === 'injuries') return access.canManageInjuries;
  return access.canAccessAdminArea;
}

function getRestrictedMessage(lang: Language, requiredPermission: RequiredPermission) {
  if (requiredPermission === 'articles') {
    return lang === 'ar'
      ? 'هذه الصفحة متاحة لحساب مسؤول المقالات فقط في الإعدادات الحالية.'
      : 'This page is currently restricted to the article admin account only.';
  }

  return lang === 'ar'
    ? 'هذه الصفحة متاحة لحسابات الإدارة فقط.'
    : 'This page is restricted to admin accounts only.';
}

export default function AdminAccessBoundary({
  access,
  lang,
  title,
  canonicalPath,
  requiredPermission = 'area',
  children,
}: {
  access: AdminAccessState;
  lang: Language;
  title: string;
  canonicalPath: string;
  requiredPermission?: RequiredPermission;
  children: ReactNode;
}) {
  const isAr = lang === 'ar';

  if (!access.isSupabaseConfigured) {
    return (
      <>
        <Seo title={title} description={access.configMessage} canonicalPath={canonicalPath} noIndex />
        <PageLayout title={title}>
          <p>{access.configMessage}</p>
        </PageLayout>
      </>
    );
  }

  if (!access.authChecked) {
    return (
      <>
        <Seo
          title={title}
          description={isAr ? 'جار التحقق من الصلاحية.' : 'Checking access.'}
          canonicalPath={canonicalPath}
          noIndex
        />
        <PageLayout title={title}>
          <p>{isAr ? 'جار التحقق من صلاحيتك...' : 'Checking your access...'}</p>
        </PageLayout>
      </>
    );
  }

  if (!access.user) {
    return (
      <Navigate
        to={navigationPaths.auth(lang)}
        replace
        state={{from: canonicalPath.startsWith('/') ? `/${lang}${canonicalPath}` : canonicalPath}}
      />
    );
  }

  if (!getPermissionState(access, requiredPermission)) {
    return (
      <>
        <Seo
          title={isAr ? 'صفحة مقفولة' : 'Restricted'}
          description={isAr ? 'هذه الصفحة مقفولة.' : 'This page is restricted.'}
          canonicalPath={canonicalPath}
          noIndex
        />
        <PageLayout title={isAr ? 'صفحة مقفولة' : 'Restricted'}>
          <p>{getRestrictedMessage(lang, requiredPermission)}</p>
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

  return <>{children}</>;
}

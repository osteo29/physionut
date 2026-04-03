import {type ReactElement, useEffect, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import PageLayout from '../../pages/PageLayout';
import usePreferredLang from '../../pages/usePreferredLang';
import Seo from '../seo/Seo';
import {
  getArticleAdminEmail,
  getCurrentUser,
  isArticleAdminUser,
  isSupabaseConfigured,
  onSupabaseAuthChange,
  supabase,
  type User,
} from '../../lib/supabase';

async function canManageInjuries(user: User | null) {
  if (!user?.email || !supabase) return false;
  if (isArticleAdminUser(user)) return true;

  const {data} = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', user.email.trim().toLowerCase())
    .maybeSingle();

  return Boolean(data);
}

export default function AdminRoute({children}: {children: ReactElement}) {
  const uiLang = usePreferredLang();
  const isAr = uiLang === 'ar';
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        if (mounted) setAuthChecked(true);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!mounted) return;
        setUser(currentUser);
        setIsAdmin(await canManageInjuries(currentUser));
      } catch {
        if (!mounted) return;
        setUser(null);
        setIsAdmin(false);
      } finally {
        if (mounted) setAuthChecked(true);
      }
    };

    void bootstrap();

    if (!isSupabaseConfigured) {
      return () => {
        mounted = false;
      };
    }

    const {data} = onSupabaseAuthChange(async (_, session) => {
      if (!mounted) return;
      const nextUser = session?.user || null;
      setUser(nextUser);
      setIsAdmin(await canManageInjuries(nextUser));
      setAuthChecked(true);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (!isSupabaseConfigured) {
    return children;
  }

  if (!authChecked) {
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

  if (!user) {
    return <Navigate to={`/${uiLang}/auth`} replace state={{from: location.pathname}} />;
  }

  if (!isAdmin) {
    return (
      <>
        <Seo
          title={isAr ? 'صفحة مقفولة' : 'Restricted'}
          description={isAr ? 'هذه الصفحة مقفولة.' : 'This page is restricted.'}
          canonicalPath={location.pathname}
          noIndex
        />
        <PageLayout title={isAr ? 'صفحة مقفولة' : 'Restricted'}>
          <p>{isAr ? 'هذه الصفحة متاحة لحساب الأدمن فقط.' : 'This page is restricted to the admin account only.'}</p>
          <p>
            {isAr ? 'أنت مسجل الدخول بالحساب:' : 'Signed in as:'} <strong>{user.email}</strong>
          </p>
          <p>
            {isAr ? 'إيميل الأدمن المضبوط:' : 'Configured admin email:'}{' '}
            <strong>{getArticleAdminEmail() || (isAr ? 'غير مضبوط' : 'not set')}</strong>
          </p>
        </PageLayout>
      </>
    );
  }

  return children;
}

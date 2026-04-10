import {Link} from 'react-router-dom';
import Seo from '../components/seo/Seo';
import PageLayout from './PageLayout';
import {navigationPaths} from '../utils/langUrlHelper';
import usePreferredLang from './usePreferredLang';

export default function NotFound() {
  const lang = usePreferredLang();
  const isAr = lang === 'ar';
  const relatedLinks = [
    {
      label: isAr ? 'الرئيسية' : 'Home',
      href: navigationPaths.home(lang),
      description: isAr ? 'ارجع للصفحة الرئيسية وابدأ من الأدوات الأساسية.' : 'Return to the main page and jump into the core tools.',
    },
    {
      label: isAr ? 'بروتوكولات الإصابات' : 'Injury protocols',
      href: navigationPaths.injuries(lang),
      description: isAr ? 'افتح مكتبة الإصابات بدل التوقف عند صفحة غير موجودة.' : 'Open the recovery library instead of staying on a dead end.',
    },
    {
      label: isAr ? 'التمارين' : 'Exercises',
      href: navigationPaths.exercises(lang),
      description: isAr ? 'تصفّح مناطق التمارين وأنظمتها من هنا.' : 'Browse exercise regions and systems from here.',
    },
  ];

  return (
    <>
      <Seo
        title={isAr ? 'الصفحة غير موجودة' : 'Page not found'}
        description={isAr ? 'الصفحة المطلوبة غير موجودة.' : 'The requested page could not be found.'}
        canonicalPath="/404"
        noIndex
      />
      <PageLayout title={isAr ? 'الصفحة غير موجودة' : 'Page not found'} relatedLinks={relatedLinks}>
        <p>{isAr ? 'الصفحة التي تبحث عنها غير موجودة.' : "The page you're looking for doesn't exist."}</p>
        <p>
          <Link className="font-bold text-health-green" to={navigationPaths.home(lang)}>
            {isAr ? 'العودة إلى الرئيسية' : 'Go back home'}
          </Link>
          .
        </p>
      </PageLayout>
    </>
  );
}

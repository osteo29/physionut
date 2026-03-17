import PageLayout from './PageLayout';
import usePreferredLang from './usePreferredLang';

export default function CookiePolicy() {
  const lang = usePreferredLang();
  return (
    <PageLayout title={lang === 'en' ? 'Cookie Policy' : 'سياسة ملفات الارتباط'}>
      {lang === 'en' ? (
        <>
          <p>
            Cookies are small text files stored in your browser. We use them to
            keep the site functional, remember preferences, and understand usage
            trends.
          </p>

          <h2>Types of cookies</h2>
          <ul>
            <li>
              <strong>Essential</strong>: required for core functionality and
              basic security.
            </li>
            <li>
              <strong>Preferences</strong>: remembers settings such as language.
            </li>
            <li>
              <strong>Analytics</strong>: helps us measure traffic and improve
              the user experience.
            </li>
          </ul>

          <h2>Your choices</h2>
          <p>
            You can manage or disable cookies in your browser settings.
            Disabling cookies may affect parts of the site.
          </p>
        </>
      ) : (
        <>
          <p>
            ملفات الارتباط (Cookies) هي ملفات نصية صغيرة تُخزَّن في المتصفح.
            نستخدمها للحفاظ على عمل الموقع، حفظ التفضيلات، وفهم أنماط الاستخدام.
          </p>

          <h2>أنواع ملفات الارتباط</h2>
          <ul>
            <li>
              <strong>ضرورية</strong>: لازمة لعمل الموقع الأساسي والأمان.
            </li>
            <li>
              <strong>تفضيلات</strong>: لحفظ إعدادات مثل اللغة.
            </li>
            <li>
              <strong>تحليلات</strong>: لقياس الاستخدام وتحسين تجربة المستخدم.
            </li>
          </ul>

          <h2>اختياراتك</h2>
          <p>
            يمكنك إدارة ملفات الارتباط أو تعطيلها من إعدادات المتصفح. تعطيلها قد
            يؤثر على بعض خصائص الموقع.
          </p>
        </>
      )}
    </PageLayout>
  );
}


import {type ReactNode, useEffect, useMemo, useState} from 'react';
import {Bell, BellRing, CheckCircle2, Download} from 'lucide-react';
import {
  getBrowserNotificationPermission,
  requestBrowserNotifications,
} from '../../lib/notifications';
import type {Language} from '../../services/translations';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: 'accepted' | 'dismissed'; platform: string}>;
};

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & {standalone?: boolean}).standalone === true
  );
}

function getInstallInstructions(lang: Language) {
  const isAr = lang === 'ar';
  const ua = navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome|crios|android/.test(ua);
  const isChromium = /chrome|crios|edg|android/.test(ua);

  if (isIos && isSafari) {
    return isAr
      ? 'على iPhone افتح زر المشاركة ثم اختر Add to Home Screen.'
      : 'On iPhone, open Share then choose Add to Home Screen.';
  }

  if (isAndroid && isChromium) {
    return isAr
      ? 'لو لم تظهر نافذة التثبيت، افتح قائمة المتصفح ثم اختر Install app أو Add to Home screen.'
      : 'If the install prompt does not appear, open the browser menu and choose Install app or Add to Home screen.';
  }

  return isAr
    ? 'إذا لم تظهر نافذة التثبيت تلقائيًا، استخدم خيار التثبيت من قائمة المتصفح.'
    : 'If the install prompt does not appear automatically, use the install option from your browser menu.';
}

function PromptCard({
  icon,
  title,
  body,
  actionLabel,
  onAction,
  disabled = false,
  hint,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <div className="w-full rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-xl shadow-slate-300/20 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-health-green/10 text-health-green">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-extrabold text-slate-900">{title}</div>
          <p className="mt-1 text-xs leading-6 text-slate-600">{body}</p>
          <button
            type="button"
            onClick={onAction}
            disabled={disabled}
            className="mt-3 inline-flex items-center justify-center rounded-xl bg-health-green px-4 py-2 text-sm font-bold text-white transition-all hover:bg-health-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {actionLabel}
          </button>
          {hint ? <p className="mt-2 text-xs leading-6 text-health-green-dark">{hint}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function PwaActions({lang}: {lang: Language}) {
  const isAr = lang === 'ar';
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installHint, setInstallHint] = useState('');
  const [notificationState, setNotificationState] = useState<NotificationPermission | 'unsupported'>(
    getBrowserNotificationPermission(),
  );

  useEffect(() => {
    setIsInstalled(isStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setInstallHint('');
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstallHint('');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const requestNotifications = async () => {
    const permission = await requestBrowserNotifications(lang);
    setNotificationState(permission);
  };

  const triggerInstall = async () => {
    if (!deferredPrompt) {
      setInstallHint(getInstallInstructions(lang));
      return;
    }

    setIsInstalling(true);
    setInstallHint('');

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      } else {
        setInstallHint(getInstallInstructions(lang));
      }
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  const notificationLabel = useMemo(() => {
    if (notificationState === 'unsupported') {
      return isAr ? 'الإشعارات غير مدعومة' : 'Notifications unavailable';
    }
    if (notificationState === 'granted') {
      return isAr ? 'الإشعارات مفعلة' : 'Notifications enabled';
    }
    if (notificationState === 'denied') {
      return isAr ? 'الإشعارات محظورة' : 'Notifications blocked';
    }
    return isAr ? 'فعّل الإشعارات' : 'Enable notifications';
  }, [isAr, notificationState]);

  const notificationPromptBody =
    notificationState === 'denied'
      ? isAr
        ? 'المتصفح حظر الإشعارات. جرّب الضغط مرة أخرى، وإذا لم تظهر النافذة فعّل الإشعارات من إعدادات الموقع في المتصفح.'
        : 'The browser has blocked notifications. Try again, and if no prompt appears, enable notifications from the site settings in your browser.'
      : isAr
        ? 'فعّل إشعارات المتصفح لتصلك التنبيهات والمتابعات المهمة لاحقًا.'
        : 'Enable browser notifications so important reminders and follow-ups can reach you later.';

  const installPromptBody = deferredPrompt
    ? isAr
      ? 'التطبيق جاهز للتثبيت الآن. اضغط الزر وسيظهر لك طلب التثبيت.'
      : 'The app is ready to install now. Tap the button and the browser install prompt will appear.'
    : isAr
      ? 'يمكنك تثبيت الموقع كتطبيق للوصول السريع من شاشة الجهاز.'
      : 'You can install the site as an app for faster access from your device home screen.';

  const showNotificationPrompt =
    notificationState !== 'granted' && notificationState !== 'unsupported';
  const showInstallPrompt = !isInstalled;

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col items-center gap-3">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={triggerInstall}
            disabled={isInstalled || isInstalling}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-health-green/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isInstalled ? (
              <CheckCircle2 className="h-4 w-4 text-health-green" />
            ) : (
              <Download className="h-4 w-4 text-health-green" />
            )}
            <span>
              {isInstalled
                ? isAr
                  ? 'التطبيق مثبت'
                  : 'App installed'
                : isInstalling
                  ? isAr
                    ? 'جارٍ تجهيز التثبيت'
                    : 'Preparing install'
                  : isAr
                    ? 'تثبيت التطبيق'
                    : 'Install app'}
            </span>
          </button>

          <button
            type="button"
            onClick={requestNotifications}
            disabled={notificationState === 'unsupported' || notificationState === 'granted'}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-health-green/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {notificationState === 'granted' ? (
              <BellRing className="h-4 w-4 text-health-green" />
            ) : (
              <Bell className="h-4 w-4 text-health-green" />
            )}
            <span>{notificationLabel}</span>
          </button>
        </div>

        <p className="text-center text-xs leading-6 text-slate-500">
          {isAr
            ? 'ثبّت PhysioNutrition على جهازك للوصول السريع، وفعّل الإشعارات استعدادًا للتذكيرات والمتابعة لاحقًا.'
            : 'Install PhysioNutrition for faster access, and enable notifications so follow-up reminders are ready later.'}
        </p>

        {installHint ? <p className="text-center text-xs leading-6 text-health-green-dark">{installHint}</p> : null}
      </div>

      {showNotificationPrompt || showInstallPrompt ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] px-4 pb-[max(env(safe-area-inset-bottom),0.25rem)] sm:bottom-6">
          <div className="pointer-events-auto mx-auto flex max-h-[calc(100vh-2rem)] w-full max-w-xl flex-col gap-3 overflow-y-auto">
            {showNotificationPrompt ? (
              <PromptCard
                icon={notificationState === 'granted' ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                title={isAr ? 'تفعيل الإشعارات' : 'Enable notifications'}
                body={notificationPromptBody}
                actionLabel={
                  notificationState === 'denied'
                    ? isAr
                      ? 'إعادة المحاولة'
                      : 'Try again'
                    : isAr
                      ? 'السماح بالإشعارات'
                      : 'Allow notifications'
                }
                onAction={() => {
                  void requestNotifications();
                }}
              />
            ) : null}

            {showInstallPrompt ? (
              <PromptCard
                icon={isInstalled ? <CheckCircle2 className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                title={isAr ? 'تثبيت التطبيق' : 'Install the app'}
                body={installPromptBody}
                actionLabel={isAr ? 'تثبيت الآن' : 'Install now'}
                onAction={() => {
                  void triggerInstall();
                }}
                disabled={isInstalled || isInstalling}
                hint={installHint}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

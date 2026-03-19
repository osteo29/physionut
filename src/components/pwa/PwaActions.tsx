import {useEffect, useMemo, useState} from 'react';
import {Bell, BellRing, CheckCircle2, Download} from 'lucide-react';
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

export default function PwaActions({lang}: {lang: Language}) {
  const isAr = lang === 'ar';
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [notificationState, setNotificationState] = useState<NotificationPermission | 'unsupported'>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'unsupported',
  );

  useEffect(() => {
    setIsInstalled(isStandalone());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const requestNotifications = async () => {
    if (!('Notification' in window)) {
      setNotificationState('unsupported');
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationState(permission);

    if (permission !== 'granted') return;

    try {
      const registration = await navigator.serviceWorker?.ready;
      if (registration) {
        await registration.showNotification(
          isAr ? 'إشعارات PhysioHub جاهزة' : 'PhysioHub notifications are ready',
          {
            body: isAr
              ? 'سنستخدمها لاحقًا للتذكير بالمتابعة والنتائج المهمة.'
              : 'We can now use them later for follow-up reminders and important result updates.',
            icon: '/icon-192.svg',
            badge: '/icon-192.svg',
          },
        );
      }
    } catch {
      // Best effort only.
    }
  };

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
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

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-3">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={triggerInstall}
          disabled={!deferredPrompt || isInstalled || isInstalling}
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
          ? 'ثبّت PhysioHub على جهازك للوصول السريع، وفعّل الإشعارات استعدادًا للتذكيرات والمتابعة لاحقًا.'
          : 'Install PhysioHub for faster access, and enable notifications so follow-up reminders are ready later.'}
      </p>
    </div>
  );
}

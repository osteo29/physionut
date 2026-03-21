import {useEffect, useState} from 'react';
import {getPreferredLanguage, LANGUAGE_CHANGE_EVENT} from '../services/languagePreference';
import type {Language} from '../services/translations';

export default function usePreferredLang(): Language {
  const [lang, setLang] = useState<Language>(() => getPreferredLanguage());

  useEffect(() => {
    const syncLang = () => setLang(getPreferredLanguage());
    const handleLanguageChange = (event: Event) => {
      const nextLang = (event as CustomEvent<Language>).detail;
      setLang(nextLang || getPreferredLanguage());
    };

    window.addEventListener('storage', syncLang);
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('storage', syncLang);
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange as EventListener);
    };
  }, []);

  return lang;
}

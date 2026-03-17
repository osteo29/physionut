import {useMemo} from 'react';
import type {Language} from '../services/translations';

export default function usePreferredLang(): Language {
  return useMemo(() => {
    try {
      const saved = localStorage.getItem('physiohub_lang');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  }, []);
}


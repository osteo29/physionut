import {useEffect, useState} from 'react';
import type {User} from '@supabase/supabase-js';
import {
  getArticleAdminEmail,
  getCurrentUser,
  getSupabaseConfigurationMessage,
  isArticleAdminUser,
  isSupabaseConfigured,
  onSupabaseAuthChange,
  supabase,
} from '../lib/supabase';
import type {Language} from '../services/translations';
import type {TableRow} from '../lib/supabaseDatabase';

type AdminRecord = TableRow<'admin_users'>;

export type AdminAccessState = {
  authChecked: boolean;
  user: User | null;
  adminRecord: AdminRecord | null;
  isSupabaseConfigured: boolean;
  configMessage: string;
  configuredAdminEmail: string;
  isArticleAdmin: boolean;
  canAccessAdminArea: boolean;
  canManageInjuries: boolean;
  canManageArticles: boolean;
};

async function loadAdminRecord(user: User | null) {
  if (!user?.email || !supabase) return null;

  const {data, error} = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', user.email.trim().toLowerCase())
    .maybeSingle();

  if (error) {
    return null;
  }

  return data;
}

function buildAccessState(lang: Language, user: User | null, adminRecord: AdminRecord | null): AdminAccessState {
  const isArticleAdmin = isArticleAdminUser(user);
  const canManageInjuries = isArticleAdmin || Boolean(adminRecord?.can_edit_injuries ?? adminRecord);
  const canManageArticles = isArticleAdmin;

  return {
    authChecked: true,
    user,
    adminRecord,
    isSupabaseConfigured,
    configMessage: getSupabaseConfigurationMessage(lang),
    configuredAdminEmail: getArticleAdminEmail(),
    isArticleAdmin,
    canAccessAdminArea: canManageInjuries || canManageArticles,
    canManageInjuries,
    canManageArticles,
  };
}

export default function useAdminAccess(lang: Language) {
  const [state, setState] = useState<AdminAccessState>({
    authChecked: false,
    user: null,
    adminRecord: null,
    isSupabaseConfigured,
    configMessage: getSupabaseConfigurationMessage(lang),
    configuredAdminEmail: getArticleAdminEmail(),
    isArticleAdmin: false,
    canAccessAdminArea: false,
    canManageInjuries: false,
    canManageArticles: false,
  });

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (!isSupabaseConfigured) {
        if (mounted) {
          setState((current) => ({
            ...current,
            authChecked: true,
            configMessage: getSupabaseConfigurationMessage(lang),
          }));
        }
        return;
      }

      try {
        const user = await getCurrentUser();
        const adminRecord = await loadAdminRecord(user);
        if (!mounted) return;
        setState(buildAccessState(lang, user, adminRecord));
      } catch {
        if (!mounted) return;
        setState(buildAccessState(lang, null, null));
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
      const adminRecord = await loadAdminRecord(nextUser);
      if (!mounted) return;
      setState(buildAccessState(lang, nextUser, adminRecord));
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, [lang]);

  return state;
}

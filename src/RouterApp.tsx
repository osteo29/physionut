import {Suspense} from 'react';
import {useStoredTheme} from './hooks/useStoredTheme';
import AppRoutes from './router/AppRoutes';

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-slate-50 px-4">
      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-600 shadow-sm">
        Loading...
      </div>
    </div>
  );
}

export default function RouterApp() {
  const {theme, toggleTheme} = useStoredTheme();

  return (
    <Suspense fallback={<RouteFallback />}>
      <AppRoutes theme={theme} onToggleTheme={toggleTheme} />
    </Suspense>
  );
}

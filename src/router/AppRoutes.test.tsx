// @vitest-environment jsdom

import {Suspense} from 'react';
import {cleanup, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, useLocation} from 'react-router-dom';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('../services/languagePreference', () => ({
  getPreferredLanguage: vi.fn(() => 'ar'),
}));

vi.mock('../pages/HomeRoute', () => ({
  default: ({scrollToId, calculatorSlug}: {scrollToId?: string; calculatorSlug?: string}) => {
    const location = useLocation();
    return (
      <div data-testid="home-route">
        <span>{location.pathname}</span>
        <span>{scrollToId ?? 'no-scroll-target'}</span>
        <span>{calculatorSlug ?? 'no-calculator'}</span>
      </div>
    );
  },
}));

vi.mock('../pages/PrivacyPolicy', () => ({
  default: () => {
    const location = useLocation();
    return <div data-testid="privacy-page">{location.pathname}</div>;
  },
}));

vi.mock('../pages/ExerciseRegionPage', () => ({
  default: () => {
    const location = useLocation();
    return <div data-testid="exercise-page">{location.pathname}</div>;
  },
}));

vi.mock('../pages/NotFound', () => ({
  default: () => <div data-testid="not-found">not-found</div>,
}));

import AppRoutes from './AppRoutes';

function renderRoutes(initialEntry: string) {
  return render(
    <Suspense fallback={<div>loading</div>}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes theme="light" onToggleTheme={() => {}} />
      </MemoryRouter>
    </Suspense>,
  );
}

describe('AppRoutes smoke tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('redirects the root route to the preferred language home', async () => {
    renderRoutes('/');

    await waitFor(() => {
      expect(screen.getByTestId('home-route')).toHaveTextContent('/ar/');
    });
  });

  it('redirects legacy non-prefixed routes to the language-prefixed equivalent', async () => {
    renderRoutes('/privacy');

    await waitFor(() => {
      expect(screen.getByTestId('privacy-page')).toHaveTextContent('/ar/privacy');
    });
  });

  it('falls back to the calculators index when the calculator slug is unknown', async () => {
    renderRoutes('/en/calculators/not-a-real-calculator');

    await waitFor(() => {
      expect(screen.getByTestId('home-route')).toHaveTextContent('/en/calculators');
      expect(screen.getByTestId('home-route')).toHaveTextContent('calculators');
      expect(screen.getByTestId('home-route')).toHaveTextContent('no-calculator');
    });
  });
});

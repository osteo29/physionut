// @vitest-environment jsdom

import {Suspense, type ReactNode} from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';

vi.mock('../components/seo/Seo', () => ({
  default: () => null,
}));

vi.mock('./PageLayout', () => ({
  default: ({title, children}: {title: string; children: ReactNode}) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

vi.mock('./usePreferredLang', () => ({
  default: () => 'en',
}));

vi.mock('../services/injuryI18n', () => ({
  translateInjury: (input: {nameEn?: string; overviewEn?: string; category?: string; bodyRegion?: string}) => ({
    name: input.nameEn || 'Test Injury',
    category: input.category || 'Ligament',
    bodyRegion: input.bodyRegion || 'Knee',
    overview: input.overviewEn || 'Overview text',
  }),
  translateActivityContext: (value: string) => value,
}));

vi.mock('../services/injuryExerciseLinks', () => ({
  getInjuryExerciseLinks: () => [],
}));

vi.mock('../services/injuryRehabLinks', () => ({
  getInjuryRehabLinks: () => [],
}));

vi.mock('../services/textEncoding', () => ({
  decodeMojibake: (value: string) => value,
}));

vi.mock('../services/seoAliases', () => ({
  INJURY_CANONICAL_PARENT_MAP: {},
}));

vi.mock('../components/ai/DrugNutrientChecker', () => ({
  default: () => <div>checker</div>,
}));

vi.mock('../services/injuryService', () => ({
  getCatalogInjuries: vi.fn(async () => ({injuries: []})),
  getInjuryProtocolBySlugWithFallback: vi.fn(async () => ({
    source: 'supabase',
    remoteIds: [],
    injury: {
      id: 'test_injury',
      name: 'Test Injury',
      category: 'Ligament',
      bodyRegion: 'Knee',
      overview: 'Overview text',
      rehabSummary: 'Rehab summary',
      commonIn: null,
      redFlags: null,
      relatedCalculators: null,
      safetyNotes: null,
      pageContent: null,
      phases: [
        {
          id: 'phase-1',
          label: 'Phase 1',
          duration: '1 week',
          window: 'days_3_14',
          goals: [],
          nutritionFocus: [],
          recommendedFoods: [],
          avoidFoods: [],
          supplements: [],
          exercises: [],
          prohibitedMovements: [],
          meals: {
            breakfast: '',
            lunch: '',
            dinner: '',
            shoppingList: [],
          },
        },
      ],
    },
  })),
}));

import InjuryDetailPage from './InjuryDetailPage';

describe('InjuryDetailPage', () => {
  it('renders instead of crashing when optional injury arrays are missing', async () => {
    render(
      <Suspense fallback={<div>loading</div>}>
        <MemoryRouter initialEntries={['/en/injuries/test-injury']}>
          <Routes>
            <Route path="/:lang/injuries/:slug" element={<InjuryDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Suspense>,
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Test Injury/i).length).toBeGreaterThan(0);
    });

    expect(screen.getByText('Overview text')).toBeInTheDocument();
    expect(screen.queryByText(/loading injury details/i)).not.toBeInTheDocument();
  });
});

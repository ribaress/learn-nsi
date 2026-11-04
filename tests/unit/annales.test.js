import { describe, expect, it } from 'vitest';
import { annaleSolved, correctionAvailable, filterAnnales } from '../../src/domain/annales.js';
import {
  createExport,
  freshProgress,
  freshCourseLesson,
  parseExport
} from '../../src/domain/progress.js';
import { annales, loadAnnale } from '../../src/content/annales/catalog.js';

const tutorial = { year: 2025, exercises: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] };
const solved = {
  exercises: {
    a: { success: 'autonome' },
    b: { success: 'accompagne' },
    c: { success: 'autonome' }
  }
};

describe('corrigés des annales', () => {
  it('propose les deux groupes pour chaque année et combine leurs filtres', async () => {
    const selection = filterAnnales(annales, { centre: 'centres-etrangers' });
    expect(selection).toHaveLength(12);
    for (const group of [1, 2]) {
      expect(filterAnnales(annales, { group: String(group) }).map((item) => item.year)).toEqual([
        2021, 2022, 2023, 2024, 2025, 2026
      ]);
    }
    expect(filterAnnales(annales, { centre: 'metropole', group: '2' })).toEqual([]);
    expect(
      filterAnnales(annales, {
        centre: 'centres-etrangers',
        group: '2',
        year: '2023',
        search: 'Liban'
      }).map((item) => item.reference)
    ).toEqual(['23-NSIJ1LI1']);
    expect(
      selection.every(
        (item) => item.format === 'ecrit' && item.session.includes('Centres étrangers')
      )
    ).toBe(true);
    expect(filterAnnales(annales, { centre: 'centres-etrangers', format: 'pratique' })).toEqual([]);
    expect(
      filterAnnales(annales, { search: 'centres etrangers', year: '2026', group: '1' }).map(
        (item) => item.reference
      )
    ).toEqual(['26-NSIJ1G11']);
    for (const item of selection) {
      const loaded = await loadAnnale(item.id);
      expect(loaded.sections).toHaveLength(item.year < 2023 ? 5 : 3);
      expect(loaded.exercises.length).toBeGreaterThan(3);
      expect(correctionAvailable(loaded)).toBe(item.year < 2025);
    }
  });
  it('charge une sélection traçable avec des questions testables et des aides séparées des résolutions', async () => {
    expect(await loadAnnale('inconnu')).toBeNull();
    expect([...new Set(annales.map((a) => a.year))].sort()).toEqual([
      2021, 2022, 2023, 2024, 2025, 2026
    ]);
    for (const item of annales) {
      const loaded = await loadAnnale(item.id);
      expect(loaded.sourceUrl).toMatch(
        /^https:\/\/(?:sti\.eduscol\.education\.fr|eduscol\.education\.gouv\.fr|www\.education\.gouv\.fr|sujets\.examens-concours\.gouv\.fr)\//
      );
      if (item.centre === 'centres-etrangers') {
        expect(loaded.sections).toHaveLength(item.year < 2023 ? 5 : 3);
        expect(loaded.exercises.length).toBe(loaded.inventory.length);
      } else expect(loaded.exercises).toHaveLength(3);
      for (const exercise of loaded.exercises) {
        expect(exercise.hints).toHaveLength(3);
        expect(exercise.resolution.length).toBeGreaterThanOrEqual(3);
        if (exercise.kind === 'python') {
          expect(exercise.tests.length).toBeGreaterThanOrEqual(3);
          expect(exercise.tests.every((t) => Array.isArray(t.args))).toBe(true);
        }
      }
    }
  });
  it('refuse un simple essai, une autoévaluation ou une réussite partielle en 2025 et 2026', () => {
    for (const year of [2025, 2026]) {
      const annale = { ...tutorial, year };
      expect(correctionAvailable(annale)).toBe(false);
      expect(
        correctionAvailable(annale, {
          ...solved,
          exercises: { ...solved.exercises, c: { attempted: true, modelSeen: true, hints: 3 } },
          selfReview: [0, 1, 2]
        })
      ).toBe(false);
      expect(
        correctionAvailable(annale, {
          exercises: { a: { success: true }, b: { success: true }, c: { success: true } }
        })
      ).toBe(false);
    }
  });
  it('débloque après les trois réussites et conserve le déblocage après export/import', () => {
    const progress = freshProgress();
    progress.courses.terminale = {
      lessons: { 'annale-2025-test': { ...freshCourseLesson(), ...solved } }
    };
    const imported = parseExport(JSON.stringify(createExport(progress))).progress.courses.terminale
      .lessons['annale-2025-test'];
    expect(annaleSolved(tutorial, imported)).toBe(true);
    expect(correctionAvailable(tutorial, imported)).toBe(true);
    expect(correctionAvailable({ ...tutorial, year: 2026 }, imported)).toBe(true);
  });
  it('rend les anciennes corrections accessibles sans déclarer une réussite', () => {
    expect(correctionAvailable({ ...tutorial, year: 2024 })).toBe(true);
    expect(annaleSolved(tutorial)).toBe(false);
    expect(annaleSolved({ exercises: [] }, solved)).toBe(false);
  });
  it('combine année, format et recherche sans tenir compte des accents', () => {
    const entries = [
      {
        id: 'sql',
        year: 2025,
        format: 'ecrit',
        title: 'Les guitares',
        themes: ['Bases de données'],
        reference: '25-NSIJ1ME1'
      },
      {
        id: 'tri',
        year: 2024,
        format: 'pratique',
        title: 'Trier',
        themes: ['Algorithmes'],
        reference: '24-NSI-01'
      }
    ];
    expect(
      filterAnnales(entries, { year: '2025', format: 'ecrit', search: 'donnees' }).map((e) => e.id)
    ).toEqual(['sql']);
    expect(filterAnnales(entries, { year: '2025', format: 'pratique' })).toEqual([]);
    expect(filterAnnales(entries, { search: '24-NSI-01' }).map((e) => e.id)).toEqual(['tri']);
  });
});

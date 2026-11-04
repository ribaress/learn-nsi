import { describe, expect, it } from 'vitest';
import { assembleAnnale } from '../../src/content/annales/assemble.js';
import { annaleSolved, correctionAvailable } from '../../src/domain/annales.js';
import { createExport, freshCourseLesson, freshProgress, parseExport, courseLessonComplete } from '../../src/domain/progress.js';

const summary = { id: 'annale-test', year: 2026, centre: 'centres-etrangers' };
const legacy = { exercises: [{ title: 'Ancien atelier', kind: 'answer', answer: '4' }] };
const complete = {
  sections: [
    { id: 'e1', title: 'Exercice 1', context: 'Données 1', questions: [{ question: '1a', reuse: 0 }, { question: '1b', kind: 'answer', answer: '8' }] },
    { id: 'e2', title: 'Exercice 2', context: 'Données 2', questions: [{ question: '1', kind: 'answer', answer: '9' }] }
  ],
  inventory: ['e1:1a', 'e1:1b', 'e2:1']
};

describe('sujets complets', () => {
  it('conserve les anciens identifiants et dérive les nouveaux des références officielles', () => {
    const loaded = assembleAnnale(summary, legacy, complete);
    expect(loaded.exercises.map(e => e.id)).toEqual(['annale-test-ex1', 'annale-test-e1-q1b', 'annale-test-e2-q1']);
    expect(loaded.sections[0].exercises[0].title).toBe('Ancien atelier');
    expect(loaded.sections[0].exercises).toHaveLength(2);
    const reordered = assembleAnnale(summary, legacy, { ...complete, sections: [...complete.sections].reverse() });
    expect(reordered.exercises.map(e => e.id).sort()).toEqual(loaded.exercises.map(e => e.id).sort());
  });
  it('refuse un inventaire incomplet, les références répétées ou une réutilisation inexistante', () => {
    expect(() => assembleAnnale(summary, legacy, { ...complete, inventory: ['e1:1a'] })).toThrow();
    expect(() => assembleAnnale(summary, legacy, { ...complete, sections: [complete.sections[0], complete.sections[0]] })).toThrow();
    expect(() => assembleAnnale(summary, legacy, { ...complete, sections: [{ ...complete.sections[0], questions: [{ question: '1a', reuse: 8 }] }] })).toThrow();
  });
  it('débloque un exercice résolu sans révéler les autres ni confondre leurs questions', () => {
    const loaded = assembleAnnale(summary, legacy, complete);
    const entry = freshCourseLesson();
    for (const e of loaded.sections[0].exercises) entry.exercises[e.id] = { success: 'autonome' };
    expect(correctionAvailable(loaded, entry, 'e1')).toBe(true);
    expect(correctionAvailable(loaded, entry, 'e2')).toBe(false);
    expect(correctionAvailable(loaded, entry, 'inconnu')).toBe(false);
    expect(correctionAvailable(loaded, entry)).toBe(false);
    expect(annaleSolved(loaded, entry)).toBe(false);
  });
  it('transporte les brouillons et toutes les questions d’une fiche sans limiter la réussite à trois', () => {
    const p = freshProgress();
    const ids = ['a', 'b', 'c', 'd'];
    const entry = { ...freshCourseLesson(), requiredExerciseIds: ids, exercises: Object.fromEntries(ids.map(id => [id, { success: 'autonome', draft: 'Mon raisonnement' }])), selfReview: [0,1,2] };
    p.courses.terminale = { lessons: { 'annale-test': entry } };
    const restored = parseExport(JSON.stringify(createExport(p))).progress.courses.terminale.lessons['annale-test'];
    expect(restored.exercises.d.draft).toBe('Mon raisonnement');
    expect(courseLessonComplete(restored, ids)).toBe(true);
    restored.exercises.d.success = false;
    expect(courseLessonComplete(restored, ids)).toBe(false);
  });
});

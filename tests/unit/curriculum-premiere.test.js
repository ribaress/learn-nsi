import { describe, it, expect } from 'vitest';
import { chapters } from '../../src/content/courses/premiere/index.js';
import { capabilities } from '../../src/content/courses/premiere/coverage.js';

// Liste issue de la lecture des huit tableaux officiels, sans génération depuis les leçons.
const expected = {
  histoire: ['P-H1'],
  representations: ['P-B1', 'P-B2', 'P-B3', 'P-B4', 'P-B5', 'P-B6', 'P-B7'],
  construits: ['P-C1', 'P-C2', 'P-C3', 'P-C4', 'P-C5', 'P-C6', 'P-C7'],
  tables: ['P-T1', 'P-T2', 'P-T3', 'P-T4'],
  web: ['P-W1', 'P-W2', 'P-W3', 'P-W4', 'P-W5', 'P-W6', 'P-W7', 'P-W8'],
  machines: ['P-M1', 'P-M2', 'P-M3', 'P-M4', 'P-M5', 'P-M6', 'P-M7', 'P-M8', 'P-M9', 'P-M10'],
  programmation: ['P-L1', 'P-L2', 'P-L3', 'P-L4', 'P-L5', 'P-L6', 'P-L7'],
  algorithmique: ['P-A1', 'P-A2', 'P-A3', 'P-A4', 'P-A5', 'P-A6', 'P-A7', 'P-A8']
};

describe('Parcours première : couverture et matériel réellement utilisable', () => {
  it('vérifie les réactions Web et ne donne pas le résultat numérique dans la consigne de format', async () => {
    const loaded = await Promise.all(chapters.map(async (c) => (await c.load()).default));
    const exercises = loaded.flatMap((c) => c.lessons.flatMap((l) => l.exercises));
    const saluer = exercises.find((exercise) => exercise.id === 'p-w3');
    expect(saluer.checks).toContainEqual({
      selector: 'output#message',
      text: 'Bonjour',
      actions: [{ selector: '#saluer', click: true }]
    });
    const capteurs = exercises.find((exercise) => exercise.id === 'p-ca3');
    expect(capteurs.checks.filter((check) => check.actions).length).toBeGreaterThanOrEqual(4);
    for (const exercise of exercises) expect(exercise.prompt).not.toMatch(/Réponds\s+\d/);
  });
  it('fournit les huit rubriques et couvre chaque capacité recensée indépendamment', async () => {
    expect(chapters).toHaveLength(8);
    const loaded = await Promise.all(chapters.map(async (c) => (await c.load()).default));
    const lessons = loaded.flatMap((c) => c.lessons);
    expect(lessons.length).toBeGreaterThanOrEqual(22);
    expect(lessons.length).toBeLessThanOrEqual(32);
    expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
    expect(chapters.map((c) => c.id).sort()).toEqual(Object.keys(expected).sort());
    expect(capabilities.map((c) => c.id).sort()).toEqual(Object.values(expected).flat().sort());
    expect(new Set(capabilities.map((c) => c.id)).size).toBe(52);
    for (const cap of capabilities) {
      expect(expected[cap.chapter]).toContain(cap.id);
      expect(
        loaded
          .find((c) => c.id === cap.chapter)
          ?.lessons.some((l) => l.official.some((o) => o.id === cap.id)),
        cap.label
      ).toBe(true);
      expect(cap.page).toBeGreaterThanOrEqual(3);
      expect(cap.page).toBeLessThanOrEqual(9);
    }
  });
  it('propose trois exemples et trois exercices progressifs avec corrections et aides spécifiques', async () => {
    for (const chapter of chapters) {
      const { lessons } = (await chapter.load()).default;
      for (const lesson of lessons) {
        for (const field of ['title', 'duration', 'reflection'])
          expect(lesson[field], lesson.id).toBeTruthy();
        expect(lesson.duration).toBeTypeOf('number');
        expect(lesson.duration).toBeGreaterThan(0);
        expect(lesson.prerequisites.length).toBeGreaterThan(0);
        expect(lesson.objectives.length).toBeGreaterThan(0);
        expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
        expect(lesson.examples).toHaveLength(3);
        for (const example of lesson.examples)
          for (const f of ['title', 'input', 'reasoning', 'result'])
            expect(example[f]).toBeTruthy();
        expect(lesson.activity.config).toBeTypeOf('object');
        expect(lesson.activity.prediction).toBeTruthy();
        expect(lesson.activity.explanation).toBeTruthy();
        expect(lesson.exercises).toHaveLength(3);
        expect(lesson.review).toHaveLength(3);
        for (const exercise of lesson.exercises) {
          expect(exercise.prompt).toContain(
            exercise.source ? 'Adaptation pédagogique.' : 'Exercice original.'
          );
          expect(exercise.hints).toHaveLength(3);
          expect(new Set(exercise.hints).size).toBe(3);
          for (const f of ['id', 'title', 'prompt', 'solution', 'explanation', 'feedbackWrong'])
            expect(exercise[f], exercise.id).toBeTruthy();
          if (exercise.kind === 'python') {
            expect(exercise.solution).toContain(`def ${exercise.functionName}(`);
            expect(exercise.tests.length).toBeGreaterThanOrEqual(2);
            expect(exercise.starter).toContain(exercise.functionName);
          }
          if (exercise.kind === 'web') {
            expect(exercise.solution.toLowerCase()).toContain('<!doctype html>');
            expect(exercise.checks.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });
  it('attribue au moins deux adaptations effectives par rubrique hors histoire', async () => {
    let python = 0;
    let web = 0;
    for (const chapter of chapters) {
      const exercises = (await chapter.load()).default.lessons.flatMap((l) => l.exercises);
      python += exercises.filter((e) => e.kind === 'python').length;
      web += exercises.filter((e) => e.kind === 'web').length;
      if (chapter.id === 'histoire') continue;
      const adapted = exercises.filter((e) => e.source);
      expect(adapted.length, chapter.id).toBeGreaterThanOrEqual(2);
      for (const { source } of adapted) {
        expect(source.author).toBe('Gilles Lassus');
        expect(source.revision).toMatch(/^[a-f0-9]{40}$/);
        expect(source.url).toContain(`/blob/${source.revision}/docs/`);
        expect(source.title).toBeTruthy();
        expect(source.license).toBe('CC-BY-SA (version non précisée par l’auteur)');
        expect(source.licenseUrl).toBe('https://creativecommons.org/licenses/by-sa/');
        expect(source.changes.length).toBeGreaterThan(40);
      }
    }
    expect(python).toBeGreaterThanOrEqual(35);
    expect(web).toBeGreaterThanOrEqual(2);
  });
});

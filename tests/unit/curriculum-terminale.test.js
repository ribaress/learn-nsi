import { describe, it, expect } from 'vitest';

describe('Parcours officiel de terminale NSI', () => {
  it('livre les six rubriques et toutes les capacités attendues indépendamment des leçons', async () => {
    const { chapters } = await import('../../src/content/courses/terminale/index.js');
    const { capabilities } = await import('../../src/content/courses/terminale/coverage.js');
    expect(chapters.map((c) => c.id)).toEqual([
      'histoire',
      'structures',
      'bases',
      'architectures',
      'programmation',
      'algorithmique'
    ]);
    expect(capabilities).toHaveLength(48);
    expect(new Set(capabilities.map((c) => c.id)).size).toBe(48);
    // Inventaire fixé d’après les lignes « capacités attendues » du PDF officiel,
    // sans être construit à partir des leçons ni du fichier coverage.
    const inventory = [
      ['T-H', 2, 'histoire'],
      ['T-S', 13, 'structures'],
      ['T-B', 7, 'bases'],
      ['T-A', 6, 'architectures'],
      ['T-P', 11, 'programmation'],
      ['T-G', 9, 'algorithmique']
    ];
    const expectedIds = inventory.flatMap(([prefix, count]) =>
      Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`)
    );
    expect(capabilities.map((c) => c.id)).toEqual(expectedIds);
    for (const [prefix, count, chapter] of inventory) {
      expect(capabilities.filter((c) => c.chapter === chapter)).toHaveLength(count);
      expect(
        capabilities.filter((c) => c.chapter === chapter).every((c) => c.id.startsWith(prefix))
      ).toBe(true);
    }
    const lessons = [];
    for (const descriptor of chapters) {
      const { default: chapter } = await descriptor.load();
      expect(chapter.id).toBe(descriptor.id);
      expect(chapter.lessons.length).toBeGreaterThan(0);
      lessons.push(...chapter.lessons);
      if (chapter.id !== 'histoire') {
        expect(
          chapter.lessons.flatMap((l) => l.exercises).filter((e) => e.source).length
        ).toBeGreaterThanOrEqual(2);
      }
    }
    expect(lessons.length).toBeGreaterThanOrEqual(22);
    expect(lessons.length).toBeLessThanOrEqual(30);
    expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
    for (const capability of capabilities) {
      expect(capability.label.length).toBeGreaterThan(15);
      expect(capability.page).toBeGreaterThanOrEqual(3);
      expect(
        lessons.some((l) => l.official.some((o) => o.id === capability.id)),
        capability.label
      ).toBe(true);
    }
    for (const lesson of lessons) {
      expect(lesson.title.length).toBeGreaterThan(5);
      expect(lesson.prerequisites.length).toBeGreaterThan(0);
      expect(lesson.objectives.length).toBeGreaterThan(0);
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3);
      for (const section of lesson.sections) expect(section.text.length).toBeGreaterThan(100);
      expect(lesson.examples).toHaveLength(3);
      for (const example of lesson.examples)
        for (const key of ['title', 'input', 'reasoning', 'result'])
          expect(String(example[key]).length).toBeGreaterThan(0);
      expect(lesson.activity).toMatchObject({
        type: expect.any(String),
        prompt: expect.any(String),
        prediction: expect.any(String),
        explanation: expect.any(String),
        config: expect.any(Object)
      });
      expect(lesson.review).toHaveLength(3);
      expect(lesson.reflection.length).toBeGreaterThan(15);
      expect(lesson.exercises).toHaveLength(3);
      for (const exercise of lesson.exercises) {
        expect(exercise.hints).toHaveLength(3);
        expect(exercise.solution.length).toBeGreaterThan(0);
        expect(exercise.feedbackWrong.length).toBeGreaterThan(20);
        if (exercise.kind === 'python') expect(exercise.tests.length).toBeGreaterThanOrEqual(2);
        if (exercise.kind === 'sql') {
          expect(exercise.setup.length).toBeGreaterThan(20);
          expect(Array.isArray(exercise.expected)).toBe(true);
          if (/^(INSERT|UPDATE|DELETE)/i.test(exercise.solution.trim()))
            expect(exercise.verifyQuery).toMatch(/^SELECT/i);
        }
        if (exercise.source) {
          expect(exercise.source.revision).toMatch(/^[a-f0-9]{40}$/);
          expect(exercise.source.url).toContain(`/blob/${exercise.source.revision}/docs/`);
          expect(exercise.source.license).toBe('CC BY-SA (version non précisée par l’auteur)');
          for (const key of ['title', 'author', 'licenseUrl', 'changes'])
            expect(exercise.source[key].length).toBeGreaterThan(5);
        }
      }
    }
    expect(
      lessons.flatMap((l) => l.exercises).filter((e) => e.kind === 'python').length
    ).toBeGreaterThanOrEqual(25);
    expect(
      lessons.flatMap((l) => l.exercises).filter((e) => e.kind === 'sql').length
    ).toBeGreaterThanOrEqual(7);
  });
});

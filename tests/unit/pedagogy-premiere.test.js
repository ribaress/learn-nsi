import { describe, expect, it } from 'vitest';
import { chapters } from '../../src/content/courses/premiere/index.js';

const all = (
  await Promise.all(chapters.map(async (chapter) => (await chapter.load()).default))
).flatMap((chapter) => chapter.lessons);
const lessons = all.filter((lesson) => lesson.id !== 'premiere-bases');

describe('Première : des leçons autonomes pour commencer sans informatique', () => {
  it('conserve trente leçons dont vingt-neuf reprises ici', () => {
    expect(all).toHaveLength(30);
    expect(lessons).toHaveLength(29);
  });
  it('conserve les exercices, leurs sources, les capacités et les exemples de départ', async () => {
    for (const descriptor of chapters) {
      const original = (await import(`../../src/content/courses/premiere/${descriptor.id}.js`))
        .default;
      const enriched = (await descriptor.load()).default;
      expect(enriched.lessons.map((lesson) => lesson.id)).toEqual(
        original.lessons.map((lesson) => lesson.id)
      );
      for (const [index, lesson] of enriched.lessons.entries()) {
        const previous = original.lessons[index];
        expect(lesson.exercises).toBe(previous.exercises);
        expect(lesson.official).toBe(previous.official);
        for (const [exampleIndex, example] of lesson.examples.entries()) {
          const oldExample = previous.examples[exampleIndex];
          for (const key of ['title', 'input', 'result'])
            expect(example[key]).toBe(oldExample[key]);
          expect(example.reasoning).toContain(oldExample.reasoning);
        }
      }
    }
  });
  for (const lesson of lessons) {
    it(`${lesson.id} part du concret et explique le chemin`, () => {
      for (const field of ['situation', 'question', 'why'])
        expect(lesson.introduction?.[field]?.length, field).toBeGreaterThan(35);
      expect(lesson.introduction.journey.length).toBeGreaterThanOrEqual(3);
      expect(lesson.introduction.journey.length).toBeLessThanOrEqual(5);
      expect(lesson.prerequisiteRecap.length).toBeGreaterThanOrEqual(3);
      for (const item of lesson.prerequisiteRecap) {
        expect(item.term.length).toBeGreaterThan(2);
        expect(item.explanation.length).toBeGreaterThan(30);
        expect(item.example.length).toBeGreaterThan(15);
      }
      expect(lesson.realLifeExamples).toHaveLength(2);
      for (const item of lesson.realLifeExamples)
        for (const field of ['title', 'situation', 'connection', 'difference'])
          expect(item[field]?.length, field).toBeGreaterThan(field === 'title' ? 5 : 30);
    });
    it(`${lesson.id} enseigne avant les exercices et permet deux vérifications`, () => {
      expect(lesson.sections.length).toBeGreaterThanOrEqual(5);
      for (const section of lesson.sections)
        expect(section.text.length, section.title).toBeGreaterThanOrEqual(200);
      const checkpoints = lesson.sections
        .filter((section) => section.checkpoint)
        .map((section) => section.checkpoint);
      expect(checkpoints.length).toBeGreaterThanOrEqual(2);
      for (const checkpoint of checkpoints) {
        expect(checkpoint.question.length).toBeGreaterThan(15);
        expect(checkpoint.choices.length).toBeGreaterThanOrEqual(2);
        expect(
          checkpoint.choices.filter((choice) => choice.value === checkpoint.answer)
        ).toHaveLength(1);
        expect(new Set(checkpoint.choices.map((choice) => choice.value)).size).toBe(
          checkpoint.choices.length
        );
        for (const choice of checkpoint.choices) expect(typeof choice.value).toBe('string');
        expect(checkpoint.explanation.length).toBeGreaterThan(40);
      }
      for (const example of lesson.examples)
        expect(example.reasoning.length, example.title).toBeGreaterThan(120);
      if (lesson.exercises.some((exercise) => exercise.kind === 'python')) {
        const text = lesson.sections.map((section) => section.text).join(' ');
        expect(text).toMatch(/fonction/i);
        expect(text).toContain('return');
      }
    });
  }
  it('présente des ouvertures et des développements propres à chaque notion', () => {
    expect(new Set(lessons.map((lesson) => lesson.introduction.situation)).size).toBe(29);
    const texts = lessons.flatMap((lesson) => lesson.sections.map((section) => section.text));
    expect(new Set(texts).size).toBe(texts.length);
  });
});

import { describe, it, expect } from 'vitest';
import { chapters } from '../../src/content/courses/terminale/index.js';

const lessons = (
  await Promise.all(chapters.map(async (descriptor) => (await descriptor.load()).default.lessons))
).flat();

describe('Terminale : comprendre une notion en partant de zéro', () => {
  it('propose exactement les 27 leçons autonomes', () => {
    expect(lessons).toHaveLength(27);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(27);
  });

  it('conserve les exercices, identifiants, capacités et données des trois exemples', async () => {
    for (const descriptor of chapters) {
      const original = (await import(`../../src/content/courses/terminale/${descriptor.id}.js`))
        .default;
      const enriched = (await descriptor.load()).default;
      expect(enriched.id).toBe(original.id);
      expect(enriched.lessons).toHaveLength(original.lessons.length);
      for (const originalLesson of original.lessons) {
        const enrichedLesson = enriched.lessons.find((lesson) => lesson.id === originalLesson.id);
        for (const field of ['id', 'title', 'objectives', 'official', 'exercises', 'activity']) {
          expect(enrichedLesson[field], `${originalLesson.id}.${field}`).toEqual(
            originalLesson[field]
          );
        }
        expect(
          enrichedLesson.examples.map(({ title, input, result }) => ({ title, input, result }))
        ).toEqual(
          originalLesson.examples.map(({ title, input, result }) => ({ title, input, result }))
        );
      }
    }
  });

  for (const lesson of lessons) {
    it(`${lesson.id} accompagne la découverte et les raisonnements`, () => {
      for (const field of ['situation', 'question', 'why']) {
        expect(lesson.introduction?.[field], field).toEqual(expect.any(String));
        expect(lesson.introduction[field].length).toBeGreaterThan(35);
      }
      expect(lesson.introduction.journey.length).toBeGreaterThanOrEqual(3);
      expect(lesson.introduction.journey.length).toBeLessThanOrEqual(5);
      expect(lesson.prerequisiteRecap.length).toBeGreaterThanOrEqual(3);
      for (const recap of lesson.prerequisiteRecap) {
        for (const field of ['term', 'explanation', 'example']) {
          expect(recap[field]).toEqual(expect.any(String));
          expect(recap[field].length).toBeGreaterThan(field === 'term' ? 2 : 20);
        }
      }
      expect(lesson.realLifeExamples).toHaveLength(2);
      for (const example of lesson.realLifeExamples) {
        for (const field of ['title', 'situation', 'connection', 'difference']) {
          expect(example[field]).toEqual(expect.any(String));
          expect(example[field].length).toBeGreaterThan(field === 'title' ? 4 : 35);
        }
      }
      expect(lesson.sections.length).toBeGreaterThanOrEqual(5);
      for (const section of lesson.sections) {
        expect(section.text.length).toBeGreaterThan(180);
      }
      const pauses = lesson.sections
        .filter((section) => section.checkpoint)
        .map((section) => section.checkpoint);
      expect(pauses.length).toBeGreaterThanOrEqual(2);
      for (const pause of pauses) {
        expect(pause.question.length).toBeGreaterThan(15);
        expect(pause.explanation.length).toBeGreaterThan(35);
        expect(pause.choices.length).toBeGreaterThanOrEqual(2);
        expect(pause.choices.filter((choice) => choice.value === pause.answer)).toHaveLength(1);
        for (const choice of pause.choices) {
          expect(choice.label).toEqual(expect.any(String));
          expect(choice.value).toEqual(expect.any(String));
        }
      }
      expect(lesson.examples).toHaveLength(3);
      for (const example of lesson.examples) expect(example.reasoning.length).toBeGreaterThan(100);
      expect(lesson.exercises).toHaveLength(3);
      expect(lesson.duration).toBeGreaterThanOrEqual(45);
    });
  }
});

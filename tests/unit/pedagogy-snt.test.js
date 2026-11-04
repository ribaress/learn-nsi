import { describe, expect, it } from 'vitest';
import { chapters } from '../../src/content/courses/snt/index.js';

describe('SNT : comprendre une leçon sans vocabulaire préalable', () => {
  it('donne à chacune des 25 leçons un parcours autonome et des pauses explicatives', async () => {
    const lessons = (
      await Promise.all(chapters.map(async (c) => (await c.load()).default.lessons))
    ).flat();
    expect(lessons).toHaveLength(25);
    for (const lesson of lessons) {
      const context = lesson.id;
      for (const field of ['situation', 'question', 'why']) {
        expect(lesson.introduction?.[field], `${context}:${field}`).toBeTypeOf('string');
        expect(lesson.introduction[field].length).toBeGreaterThan(35);
      }
      expect(lesson.introduction.journey.length).toBeGreaterThanOrEqual(3);
      expect(lesson.introduction.journey.length).toBeLessThanOrEqual(5);
      expect(lesson.prerequisiteRecap.length).toBeGreaterThanOrEqual(3);
      for (const recap of lesson.prerequisiteRecap)
        for (const field of ['term', 'explanation', 'example'])
          expect(recap[field], `${context}:${field}`).toBeTypeOf('string');
      expect(lesson.realLifeExamples).toHaveLength(2);
      for (const example of lesson.realLifeExamples)
        for (const field of ['title', 'situation', 'connection', 'difference']) {
          expect(example[field], `${context}:${field}`).toBeTypeOf('string');
          expect(example[field].length).toBeGreaterThan(10);
        }
      expect(lesson.sections.length, context).toBeGreaterThanOrEqual(5);
      expect(lesson.sections.map((s) => s.text).join(' ').length, context).toBeGreaterThan(1800);
      const pauses = lesson.sections.flatMap((s) => (s.checkpoint ? [s.checkpoint] : []));
      expect(pauses.length, context).toBeGreaterThanOrEqual(2);
      for (const pause of pauses) {
        expect(pause.question.length).toBeGreaterThan(15);
        expect(pause.choices.length).toBeGreaterThanOrEqual(2);
        expect(pause.answer).toBeTypeOf('string');
        expect(pause.choices.map((choice) => choice.value)).toContain(pause.answer);
        expect(new Set(pause.choices.map((choice) => choice.value)).size).toBe(
          pause.choices.length
        );
        for (const choice of pause.choices) {
          expect(choice.label).toBeTypeOf('string');
          expect(choice.value).toBeTypeOf('string');
        }
        expect(pause.explanation.length).toBeGreaterThan(40);
      }
      expect(lesson.examples).toHaveLength(3);
      expect(lesson.exercises).toHaveLength(3);
    }
  });
});

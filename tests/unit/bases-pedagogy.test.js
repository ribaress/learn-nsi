import { it, expect } from 'vitest';
import chapter from '../../src/content/courses/premiere/representations.js';
it('accompagne les bases depuis le décimal jusqu’aux méthodes des trois exercices', () => {
  const lesson = chapter.lessons.find((l) => l.id === 'premiere-bases');
  expect(lesson.introduction?.situation).toBeTruthy();
  expect(lesson.prerequisiteRecap?.length).toBe(4);
  expect(lesson.realLifeExamples?.length).toBe(2);
  expect(lesson.sections.length).toBeGreaterThanOrEqual(10);
  expect(lesson.sections.filter((s) => s.table).length).toBeGreaterThanOrEqual(4);
  expect(lesson.sections.filter((s) => s.checkpoint).length).toBeGreaterThanOrEqual(3);
  expect(lesson.sections.some((s) => s.inlineActivity?.config?.bits === 4)).toBe(true);
  for (const section of lesson.sections.filter((s) => s.checkpoint))
    expect(section.checkpoint.choices.some((c) => c.value === section.checkpoint.answer)).toBe(
      true
    );
  expect(lesson.exercises.map((e) => e.id)).toEqual(['p-b1', 'p-b2', 'p-b3']);
});

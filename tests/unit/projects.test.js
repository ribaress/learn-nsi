import { describe, it, expect } from 'vitest';
import { projects } from '../../src/content/courses/projects.js';
import { checkAnswer } from '../../src/domain/course-learning.js';
describe('Projets de synthèse', () => {
  it('offre cinq projets complets avec des productions et des bilans', () => {
    const all = Object.values(projects).flat();
    expect(all).toHaveLength(5);
    for (const project of all) {
      expect(project.examples).toHaveLength(3);
      expect(project.exercises).toHaveLength(3);
      expect(project.review).toHaveLength(3);
      for (const exercise of project.exercises) {
        expect(exercise.hints).toHaveLength(3);
        if (exercise.kind === 'answer') expect(checkAnswer(exercise, exercise.answer)).toBe(true);
      }
    }
  });
});

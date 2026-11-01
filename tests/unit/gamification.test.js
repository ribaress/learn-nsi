import { it, expect } from 'vitest';
import * as game from '../../src/domain/gamification.js';
import * as path from '../../src/domain/learning-path.js';
import { freshProgress, freshCourseLesson } from '../../src/domain/progress.js';

it('récompense une réussite une seule fois et distingue un corrigé consulté', () => {
  const p = freshProgress();
  p.courses.snt = {
    lessons: {
      essai: {
        ...freshCourseLesson(),
        exercises: {
          a: { success: 'autonome' },
          b: { success: 'accompagne' },
          c: { success: 'autonome' }
        },
        selfReview: [0, 1, 2]
      }
    }
  };
  expect(game.gameSummary?.(p).xp).toBe(115);
  expect(game.gameSummary?.(p).badges.some((b) => b.id === 'premiere-lecon' && b.earned)).toBe(
    true
  );
  expect(game.gameSummary?.(p).xp).toBe(115);
});
it('débloque les étapes quand l’élève a répondu et essayé les activités précédentes', () => {
  const e = freshCourseLesson();
  const ids = ['a', 'b', 'c'];
  expect(path.unlockedStep?.(e, ids)).toBe(0);
  e.discoveryAnswer = 'Je vais comprendre le rôle des clés.';
  expect(path.unlockedStep?.(e, ids)).toBe(1);
  e.activity = {
    prediction: 'Je prévois deux lignes.',
    observed: true,
    explanation: 'La jointure associe les identifiants.'
  };
  expect(path.unlockedStep?.(e, ids)).toBe(2);
  e.exercises = { a: { attempted: true }, b: { success: 'autonome' }, c: { attempted: true } };
  expect(path.unlockedStep?.(e, ids)).toBe(3);
});

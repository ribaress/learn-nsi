import { describe, it, expect } from 'vitest';
import * as progress from '../../src/domain/progress.js';

describe('Sauvegardes des trois parcours', () => {
  it('conserve les pauses de compréhension et refuse des réponses illisibles après import', () => {
    const p = progress.freshProgress();
    p.courses.premiere = {
      lessons: {
        'premiere-bases': {
          ...progress.freshCourseLesson(),
          readingChecks: { 1: { answer: 'ecriture', submitted: true } },
          readingActivities: { 4: { value: 13 } }
        }
      }
    };
    expect(progress.parseExport(JSON.stringify(progress.createExport(p))).progress).toEqual(p);
    p.courses.premiere.lessons['premiere-bases'].readingChecks[1].answer = [];
    expect(() => progress.parseExport(JSON.stringify(progress.createExport(p)))).toThrow();
  });
  it('exporte au format 2 et conserve la progression des cours', () => {
    const p = progress.freshProgress();
    expect(p.courses).toEqual({});
    expect(progress.createExport(p).formatVersion).toBe(2);
  });
  it('importe une sauvegarde historique sans perdre les réponses', () => {
    const old = {
      formatVersion: 1,
      contentVersion: '2026-10-chapitre-1',
      progress: {
        contentVersion: '2026-10-chapitre-1',
        lastMission: 'comprendre',
        missions: {},
        extensions: {}
      }
    };
    const restored = progress.parseExport(JSON.stringify(old)).progress;
    expect(restored.courses).toEqual({});
    expect(restored.lastMission).toBe('comprendre');
  });
  it('demande trois réussites et la relecture pour terminer une leçon', () => {
    expect(
      progress.courseLessonComplete?.(
        {
          exercises: {
            a: { success: 'autonome' },
            b: { success: 'accompagne' },
            c: { success: 'autonome' }
          },
          selfReview: [0, 1, 2]
        },
        ['a', 'b', 'c']
      )
    ).toBe(true);
    expect(
      progress.courseLessonComplete?.(
        { exercises: { a: { success: 'autonome' } }, selfReview: [0, 1, 2] },
        ['a', 'b', 'c']
      )
    ).toBe(false);
  });
  it('refuse les cours malformés sans rendre leurs valeurs utilisables', () => {
    const exported = progress.createExport(progress.freshProgress());
    exported.progress.courses = { snt: { lessons: 'corrompu' } };
    expect(() => progress.parseExport(JSON.stringify(exported))).toThrow();
  });
  it('refuse un état de manipulation qui ferait planter les commandes', () => {
    for (const activity of [
      { color: 'rouge' },
      { cursor: -1 },
      { items: 'pas une liste' },
      { shellFiles: { '/home/eleve': 12 } }
    ]) {
      const p = progress.freshProgress();
      p.courses.snt = { lessons: { essai: { ...progress.freshCourseLesson(), activity } } };
      expect(() => progress.parseExport(JSON.stringify(progress.createExport(p)))).toThrow();
    }
  });
  it('transporte les réponses, étapes débloquées, essais et modules des nouveaux parcours', () => {
    const p = progress.freshProgress();
    p.courses.terminale = {
      lessons: {
        'terminale-modules': {
          ...progress.freshCourseLesson(),
          discoveryAnswer: 'Je vais séparer deux fonctions.',
          step: 2,
          activity: {
            prediction: '4',
            observed: true,
            explanation: 'Le module renvoie le double.'
          },
          exercises: {
            ex1: {
              code: 'from outils import double',
              files: { 'outils.py': 'def double(n): return n*2' },
              attempted: true,
              attempts: 2,
              hints: 1,
              success: 'autonome'
            }
          }
        }
      }
    };
    expect(progress.parseExport(JSON.stringify(progress.createExport(p))).progress).toEqual(p);
  });
});

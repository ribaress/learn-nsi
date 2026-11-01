import { describe, it, expect } from 'vitest';
import {
  freshProgress,
  recordSuccess,
  getBadges,
  createExport,
  parseExport
} from '../../src/domain/progress.js';

describe('Progression honnête et sauvegarde portable', () => {
  it('ne multiplie pas les réussites et distingue le recours au corrigé', () => {
    const p = freshProgress();
    recordSuccess(p, 'comprendre', 0, true);
    recordSuccess(p, 'comprendre', 0, false);
    expect(p.missions.comprendre.successes).toEqual({ 0: 'accompagne' });
    recordSuccess(p, 'comprendre', 1, false);
    expect(p.missions.comprendre.successes[1]).toBe('autonome');
  });
  it('ne déclare pas la compétence expliquer à partir du texte saisi', () => {
    const p = freshProgress();
    p.missions.comprendre = { reflection: 'Un très bon texte', selfReview: [], successes: {} };
    expect(getBadges(p)).not.toContain('expliquer');
    p.missions.comprendre.selfReview = ['but', 'donnees', 'etapes', 'test'];
    expect(getBadges(p)).toContain('expliquer');
  });
  it('conserve exactement le code et les réponses lors du transfert', () => {
    const p = freshProgress();
    p.lastMission = 'programmer';
    p.missions.programmer = {
      code: 'def nb_boites(n, k):\n    return (n+k-1)//k',
      reflection: 'Je décompose…',
      step: 2,
      successes: { 0: 'autonome' }
    };
    expect(parseExport(JSON.stringify(createExport(p))).progress).toEqual(p);
  });
  it('rejette un fichier corrompu, incomplet ou incompatible', () => {
    for (const input of [
      'oops',
      '{}',
      JSON.stringify({ ...createExport(freshProgress()), formatVersion: 99 }),
      JSON.stringify({ ...createExport(freshProgress()), progress: { missions: { unknown: {} } } })
    ]) {
      expect(() => parseExport(input)).toThrow();
    }
  });
  it('rejette les valeurs impossibles plutôt que de casser une activité après import', () => {
    const p = freshProgress();
    p.missions.comprendre = { step: 99, successes: {}, code: 42 };
    expect(() => parseExport(JSON.stringify(createExport(p)))).toThrow();
  });
  it('rejette un historique de prédictions ou un prolongement de forme incorrecte', () => {
    const p = freshProgress();
    p.missions.prevoir = { activity: { 0: { predicted: 'incorrect' } }, successes: {} };
    expect(() => parseExport(JSON.stringify(createExport(p)))).toThrow();
    const other = freshProgress();
    other.extensions.premiere = 'incorrect';
    expect(() => parseExport(JSON.stringify(createExport(other)))).toThrow();
  });
});

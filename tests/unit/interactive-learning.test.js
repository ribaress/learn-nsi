import { describe, it, expect } from 'vitest';
import * as learning from '../../src/domain/learning.js';
import { createExport, freshProgress, parseExport } from '../../src/domain/progress.js';

describe('Manipuler des livres sans perdre ni dupliquer les objets', () => {
  it('place un livre précis et refuse le dépassement de capacité', () => {
    const initial = learning.createPacking?.(3);
    expect(initial).toEqual({ boxCount: 1, locations: [null, null, null] });
    const first = learning.placeBook(initial, 1, 0, 2);
    expect(first.ok).toBe(true);
    expect(first.packing.locations).toEqual([null, 0, null]);
    const second = learning.placeBook(first.packing, 0, 0, 2);
    const full = learning.placeBook(second.packing, 2, 0, 2);
    expect(full.ok).toBe(false);
    expect(full.packing).toEqual(second.packing);
    expect(initial.locations).toEqual([null, null, null]);
  });
  it('retire un livre puis une boîte vide et garde les autres affectations', () => {
    const packing = { boxCount: 3, locations: [0, 2, null] };
    expect(learning.removePackingBox?.(packing, 0)?.ok).toBe(false);
    const smaller = learning.removePackingBox(packing, 1);
    expect(smaller.packing).toEqual({ boxCount: 2, locations: [0, 1, null] });
    const removed = learning.removePackedBook(smaller.packing, 1);
    expect(removed.locations).toEqual([0, null, null]);
  });
  it('refuse les indices inexistants et ne duplique pas un livre déjà placé', () => {
    expect(learning.placeBook?.({ boxCount: 1, locations: [0, null] }, 0, 0, 6)?.ok).toBe(false);
    expect(learning.placeBook?.({ boxCount: 1, locations: [null] }, 5, 0, 6)?.ok).toBe(false);
    expect(learning.placeBook?.({ boxCount: 1, locations: [null] }, 0, 1, 6)?.ok).toBe(false);
  });
});

describe('Comprendre une erreur avec les données de sa réponse', () => {
  it('explique exactement le manque de places sans donner la variante suivante', () => {
    const result = learning.understandingFeedback?.(['books', 'capacity'], 2, 13, 6);
    expect(result?.success).toBe(false);
    expect(result?.message).toContain('12 places');
    expect(result?.message).toContain('1 livre');
    expect(result?.message).not.toContain('19');
  });
  it('distingue donnée manquante, détail inutile et boîtes en trop', () => {
    expect(learning.understandingFeedback?.(['books'], 3, 13, 6)?.code).toBe('missing-capacity');
    expect(learning.understandingFeedback?.(['books', 'capacity', 'color'], 3, 13, 6)?.code).toBe(
      'irrelevant'
    );
    const excess = learning.understandingFeedback?.(['books', 'capacity'], 4, 13, 6);
    expect(excess?.code).toBe('excess');
    expect(excess?.message).toContain('18 places');
    expect(learning.understandingFeedback?.(['books', 'capacity'], '', 13, 6)?.code).toBe(
      'invalid'
    );
  });
  it('traite la fin de boucle comme un cas particulier de prédiction', () => {
    expect(learning.predictionFeedback?.({ remaining: 1, boxes: 2 }, 6, 6, 3)?.message).toContain(
      '1 livre'
    );
    expect(learning.predictionFeedback?.({ remaining: 1, boxes: 2 }, 6, 0, 2)?.code).toBe(
      'counter'
    );
    expect(learning.predictionFeedback?.({ remaining: 1, boxes: 2 }, 6, 0, 3)?.success).toBe(true);
  });
});

describe('Lire une trace du code, et pas seulement son résultat', () => {
  it('sépare le retrait des livres, le compteur et le test de la boucle', () => {
    const frames = learning.packingExecution?.(13, 6);
    expect(Array.isArray(frames)).toBe(true);
    const removal = frames.find((f) => f.line === 5);
    expect(removal).toMatchObject({ remaining: 7, boxes: 0, moved: 6 });
    expect(frames[frames.indexOf(removal) + 1]).toMatchObject({ line: 6, remaining: 7, boxes: 1 });
    expect(frames.at(-2)).toMatchObject({ line: 3, condition: false, remaining: 0, boxes: 3 });
    expect(frames.at(-1)).toMatchObject({ line: 7, remaining: 0, boxes: 3 });
  });
  it('ne remplit aucune boîte quand il n’y a aucun livre', () => {
    const frames = learning.packingExecution?.(0, 6);
    expect(frames?.at(-1)).toMatchObject({ line: 7, remaining: 0, boxes: 0 });
    expect(frames.some((f) => f.line === 4 || f.line === 5 || f.line === 6)).toBe(false);
  });
});

describe('Sauvegarder les nouvelles manipulations sans casser les anciens fichiers', () => {
  it('conserve le rangement manuel et le curseur du code', () => {
    const p = freshProgress();
    p.missions.comprendre = {
      activity: { 0: { packing: { boxCount: 2, locations: [0, ...Array(12).fill(null)] } } }
    };
    p.missions.prevoir = { activity: { 0: { codeCursor: 5 } } };
    expect(parseExport(JSON.stringify(createExport(p))).progress).toEqual(p);
  });
  it('refuse un rangement impossible plutôt que de planter après import', () => {
    for (const packing of [
      { boxCount: 1, locations: 'incorrect' },
      { boxCount: 1, locations: [3, ...Array(12).fill(null)] },
      { boxCount: 1, locations: Array(13).fill(0) }
    ]) {
      const p = freshProgress();
      p.missions.comprendre = { activity: { 0: { packing } } };
      expect(() => parseExport(JSON.stringify(createExport(p)))).toThrow();
    }
  });
});

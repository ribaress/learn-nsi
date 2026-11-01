import { describe, it, expect } from 'vitest';
import * as learning from '../../src/domain/course-learning.js';

describe('Manipulations des programmes', () => {
  it('évalue une réponse numérique sans pénaliser les espaces et conserve les mots utiles', () => {
    expect(learning.checkAnswer?.({ answer: '3' }, ' 3 ')).toBe(true);
    expect(learning.checkAnswer?.({ answer: '3' }, '')).toBe(false);
    expect(learning.checkAnswer?.({ answer: 'TCP' }, 'tcp')).toBe(true);
  });
  it('montre les déplacements du tri et aboutit à un tableau ordonné', () => {
    for (const algorithm of ['insertion', 'selection', 'merge']) {
      const frames = learning.sortFrames?.([5, 2, 4, 1], algorithm);
      expect(frames?.at(-1).values).toEqual([1, 2, 4, 5]);
      expect(frames?.length).toBeGreaterThan(2);
    }
  });
  it('la dichotomie termine aussi pour une valeur absente', () => {
    expect(learning.searchFrames?.([1, 3, 5, 7, 9], 7).at(-1).found).toBe(3);
    expect(learning.searchFrames?.([1, 3, 5], 4).at(-1).found).toBe(-1);
  });
  it('distingue nombre de sauts et coût total des routes', () => {
    const config = {
      nodes: [{ id: 'A' }, { id: 'B' }, { id: 'C' }],
      edges: [
        ['A', 'C', 9],
        ['A', 'B', 1],
        ['B', 'C', 1]
      ],
      start: 'A',
      goal: 'C'
    };
    expect(learning.routePath?.(config, false)).toEqual(['A', 'C']);
    expect(learning.routePath?.(config, true)).toEqual(['A', 'B', 'C']);
  });
  it('parcourt les arbres et calcule une solution dynamique non gloutonne', () => {
    expect(
      learning.treeOrder?.({ value: 8, left: { value: 3 }, right: { value: 10 } }, 'infix')
    ).toEqual([3, 8, 10]);
    expect(learning.dynamicFrames?.([1, 3, 4], 6).at(-1).result).toBe(2);
    expect(learning.dynamicFrames?.([3, 4], 2).at(-1).result).toBe(null);
  });
  it('ramène un montant décimal saisi à un nombre entier de cases', () => {
    expect(learning.dynamicFrames([1, 3, 4], 6.5).at(-1).result).toBe(2);
  });
  it('compare les résultats structurés et ignore les clés de dictionnaire ordonnées différemment', () => {
    expect(learning.equalResult?.({ a: [1, true], b: 2 }, { b: 2, a: [1, true] })).toBe(true);
    expect(learning.equalResult?.([1, 2], [2, 1])).toBe(false);
    expect(learning.equalResult?.(true, 1)).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import {
  boxCount,
  packingTrace,
  robotResult,
  validDecomposition,
  counterexample,
  checkUnderstanding
} from '../../src/domain/learning.js';

describe('Résoudre plutôt que reconnaître une réponse modèle', () => {
  it.each([
    [0, 0],
    [1, 1],
    [6, 1],
    [7, 2],
    [13, 3]
  ])('range %i livres dans %i boîtes de six', (n, expected) => {
    expect(boxCount(n, 6)).toBe(expected);
  });
  it('refuse une capacité nulle et les nombres de livres négatifs', () => {
    expect(() => boxCount(3, 0)).toThrow();
    expect(() => boxCount(-1, 6)).toThrow();
  });
  it('montre des états avant/après et ne crée pas de boîte pour zéro livre', () => {
    expect(packingTrace(13, 6)).toEqual([
      { remaining: 13, boxes: 0, moved: 0 },
      { remaining: 7, boxes: 1, moved: 6 },
      { remaining: 1, boxes: 2, moved: 6 },
      { remaining: 0, boxes: 3, moved: 1 }
    ]);
    expect(packingTrace(0, 6)).toEqual([{ remaining: 0, boxes: 0, moved: 0 }]);
  });
  it('accepte deux chemins différents et arrête le robot à un obstacle', () => {
    expect(robotResult(['right', 'right', 'right', 'down', 'down', 'down']).success).toBe(true);
    expect(robotResult(['down', 'down', 'down', 'right', 'right', 'right']).success).toBe(true);
    expect(robotResult(['right', 'down']).reason).toBe('obstacle');
    expect(robotResult(['left']).reason).toBe('outside');
    expect(robotResult(['teleport']).success).toBe(false);
  });
  it('respecte les dépendances sans imposer un ordre unique', () => {
    expect(validDecomposition(['count', 'capacity', 'plan', 'pack', 'check'])).toBe(true);
    expect(validDecomposition(['capacity', 'count', 'plan', 'pack', 'check'])).toBe(true);
    expect(validDecomposition(['plan', 'count', 'capacity', 'pack', 'check'])).toBe(false);
    expect(validDecomposition(['count', 'count', 'plan', 'pack', 'check'])).toBe(false);
  });
  it('reconnaît un contre-exemple par ses résultats', () => {
    expect(counterexample(7, 6, 2)).toBe(true);
    expect(counterexample(6, 6, 1)).toBe(false);
    expect(counterexample(7, 6, 1)).toBe(false);
  });
  it('valide les informations utiles indépendamment de leur ordre', () => {
    expect(checkUnderstanding(['capacity', 'books'], 3, 13, 6)).toBe(true);
    expect(checkUnderstanding(['capacity', 'books', 'color'], 3, 13, 6)).toBe(false);
    expect(checkUnderstanding(['capacity', 'books'], 2, 13, 6)).toBe(false);
  });
});

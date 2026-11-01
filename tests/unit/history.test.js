import { it, expect } from 'vitest';
import * as domain from '../../src/domain/progress.js';
it('une longue séance de tests produit toujours une sauvegarde réimportable', () => {
  expect(typeof domain.appendTest).toBe('function');
  const p = domain.freshProgress();
  p.missions.tester = domain.freshMission();
  p.missions.tester.activity[0] = { tested: [] };
  const history = p.missions.tester.activity[0].tested;
  for (let i = 0; i < 601; i++)
    domain.appendTest(history, { n: 7, expected: 2, actual: 1, correct: true });
  expect(() => domain.parseExport(JSON.stringify(domain.createExport(p)))).not.toThrow();
  expect(history.at(-1)).toEqual({ n: 7, expected: 2, actual: 1, correct: true });
});

import { it, expect } from 'vitest';
import { glossaryTokens } from '../../src/content/glossary.js';
it('explique les termes entiers et conserve le texte exact autour des acronymes', () => {
  const text =
    'Les standards TCP/IP utilisent des protocoles. Le pipeline ne contient pas le terme IP.';
  const tokens = glossaryTokens(text);
  expect(tokens.map((t) => t.label).join('')).toBe(text);
  expect(tokens.filter((t) => t.kind === 'term').map((t) => t.label)).toEqual([
    'standards',
    'TCP/IP',
    'protocoles',
    'IP'
  ]);
  expect(tokens.find((t) => t.label === 'standards').definition).toContain('règle commune');
});

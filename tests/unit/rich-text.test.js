import { it, expect } from 'vitest';
import { richTextTokens } from '../../src/domain/rich-text.js';
it('préserve les puissances Python sans les confondre avec une mise en gras', () => {
  const tokens = richTextTokens(
    'Avec n bits : 2 ** n possibilités et 2**n - 1 comme maximum. **Attention** aux zéros.'
  );
  expect(tokens.map((t) => t.label).join('')).toBe(
    'Avec n bits : 2 ** n possibilités et 2**n - 1 comme maximum. Attention aux zéros.'
  );
  expect(tokens.filter((t) => t.kind === 'strong').map((t) => t.label)).toEqual(['Attention']);
});
it('garde les URL et le code distincts des définitions et sans HTML arbitraire', () => {
  const tokens = richTextTokens(
    'Lire [la source](https://example.org/IP) et `2**3`, puis le protocole TCP.'
  );
  expect(tokens.find((t) => t.kind === 'link')).toEqual({
    kind: 'link',
    label: 'la source',
    href: 'https://example.org/IP'
  });
  expect(tokens.find((t) => t.kind === 'code').label).toBe('2**3');
  expect(tokens.some((t) => t.kind === 'term' && t.label === 'TCP')).toBe(true);
  expect(richTextTokens('<img src=x>')[0]).toEqual({ kind: 'text', label: '<img src=x>' });
});

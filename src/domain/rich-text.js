import { glossaryTokens } from '../content/glossary.js';
// Découpage du texte pédagogique, sans injection HTML.
export function richTextTokens(value) {
  const seen = new Set();
  return String(value ?? '')
    .split(
      /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|`[^`]+`|(?<![\p{L}\p{N}_])\*\*(?=\S)[^*]*?\S\*\*(?![\p{L}\p{N}_]))/gu
    )
    .filter(Boolean)
    .flatMap((text) => {
      const link = text.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (link) return { kind: 'link', label: link[1], href: link[2] };
      if (text.startsWith('`') && text.endsWith('`'))
        return { kind: 'code', label: text.slice(1, -1) };
      if (text.startsWith('**') && text.endsWith('**'))
        return { kind: 'strong', label: text.slice(2, -2) };
      return glossaryTokens(text, seen);
    });
}

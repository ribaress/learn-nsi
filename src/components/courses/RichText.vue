<script setup>
import { computed } from 'vue';
import { glossaryTokens } from '../../content/glossary.js';
import GlossaryTerm from './GlossaryTerm.vue';
const props = defineProps({ text: [String, Number] });
const tokens = computed(() => {
  const seen = new Set();
  return String(props.text ?? '')
    .split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g)
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
});
</script>
<template>
  <span class="rich-text"
    ><template v-for="(token, index) in tokens" :key="index"
      ><a
        v-if="token.kind === 'link'"
        :href="token.href"
        target="_blank"
        rel="noopener noreferrer"
        >{{ token.label }}</a
      ><code v-else-if="token.kind === 'code'">{{ token.label }}</code
      ><strong v-else-if="token.kind === 'strong'">{{ token.label }}</strong
      ><GlossaryTerm
        v-else-if="token.kind === 'term'"
        :label="token.label"
        :definition="token.definition"
      /><template v-else>{{ token.label }}</template></template
    ></span
  >
</template>

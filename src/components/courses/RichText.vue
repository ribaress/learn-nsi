<script setup>
import { computed } from 'vue';
import { richTextTokens } from '../../domain/rich-text.js';
import GlossaryTerm from './GlossaryTerm.vue';
const props = defineProps({ text: [String, Number] });
const tokens = computed(() => richTextTokens(props.text));
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

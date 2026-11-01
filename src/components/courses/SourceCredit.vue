<script setup>
defineProps({ source: Object });
</script>
<template>
  <details v-if="source" class="source-credit">
    <summary>Exercice adapté d’une ressource libre</summary>
    <p>
      <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a> —
      {{ source.author }}.
    </p>
    <p>
      <a :href="source.licenseUrl" target="_blank" rel="noopener noreferrer">{{
        source.license
      }}</a>
      · Révision <code>{{ source.revision?.slice(0, 12) }}</code>
    </p>
    <p>Adaptation : {{ source.changes }}</p>
  </details>
  <p v-else class="original-credit small muted">Exercice original d’Atelier NSI.</p>
</template>

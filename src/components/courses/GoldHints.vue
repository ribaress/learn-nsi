<script setup>
import AppIcon from '../AppIcon.vue';
import RichText from './RichText.vue';
defineProps({ hints: Array, entry: Object });
</script>
<template>
  <section class="gold-hint-panel" aria-label="Aides progressives">
    <div class="gold-heading">
      <AppIcon name="hint" :size="20" /><strong>Un coup de pouce</strong
      ><span>{{ entry.hints || 0 }} / 3</span>
    </div>
    <p class="small">Commence par une piste. Le troisième indice contient un exemple résolu.</p>
    <ol v-if="entry.hints" class="gold-hints">
      <li v-for="(hint, index) in hints.slice(0, entry.hints)" :key="index" class="gold-hint">
        <strong>Indice {{ index + 1 }}</strong>
        <p><RichText :text="hint" /></p>
      </li>
    </ol>
    <button
      v-if="(entry.hints || 0) < 3"
      class="button gold-button"
      @click="entry.hints = (entry.hints || 0) + 1"
    >
      Afficher un indice
    </button>
    <p v-else class="small">Exemple résolu consulté : cette réussite sera accompagnée.</p>
  </section>
</template>

<script setup>
import AppIcon from '../AppIcon.vue';
import RichText from './RichText.vue';
defineProps({ hints: Array, entry: Object, limit: { type: Number, default: 3 } });
</script>
<template>
  <section class="gold-hint-panel" aria-label="Aides progressives">
    <div class="gold-heading">
      <AppIcon name="hint" :size="20" /><strong>Un coup de pouce</strong
      ><span>{{ Math.min(entry.hints || 0, limit) }} / {{ limit }}</span>
    </div>
    <p v-if="limit === 3" class="small">
      Commence par une piste. Le troisième indice contient un exemple résolu.
    </p>
    <p v-else class="small">
      Deux pistes pour chercher. Le corrigé s’ouvre après les questions de cet exercice réussies.
    </p>
    <ol v-if="entry.hints" class="gold-hints">
      <li
        v-for="(hint, index) in hints.slice(0, Math.min(entry.hints, limit))"
        :key="index"
        class="gold-hint"
      >
        <strong>Indice {{ index + 1 }}</strong>
        <p><RichText :text="hint" /></p>
      </li>
    </ol>
    <button
      v-if="(entry.hints || 0) < limit"
      class="button gold-button"
      @click="entry.hints = (entry.hints || 0) + 1"
    >
      Afficher un indice
    </button>
    <p v-else-if="limit === 3" class="small">
      Exemple résolu consulté : cette réussite sera accompagnée.
    </p>
    <p v-else class="small">Les deux pistes sont affichées. Teste maintenant ta proposition.</p>
  </section>
</template>

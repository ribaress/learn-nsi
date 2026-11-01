<script setup>
import AppIcon from './AppIcon.vue';
import { useProgress } from '../composables/useProgress.js';
const { completed, badges } = useProgress();
const badgeList = [
  { id: 'decomposer', name: 'Décomposer', icon: 'blocks' },
  { id: 'prevoir', name: 'Prévoir', icon: 'play' },
  { id: 'tester', name: 'Tester', icon: 'check' },
  { id: 'expliquer', name: 'Expliquer', icon: 'hint' }
];
</script>
<template>
  <aside class="progress-panel panel">
    <h2>L’atelier introductif</h2>
    <div class="progress-ring" :style="{ '--progress': `${(completed / 6) * 360}deg` }">
      <div>
        <strong>{{ completed }}<span>/6</span></strong
        ><span>missions<br />terminées</span>
      </div>
    </div>
    <p class="progress-caption">
      {{
        completed === 0
          ? 'Chaque petite étape compte.'
          : completed === 6
            ? 'Un chapitre, de nouvelles compétences !'
            : 'Tu avances à ton rythme.'
      }}
    </p>
    <div class="panel-divider"></div>
    <h3>Des compétences<br />en construction</h3>
    <div
      class="skill-mini"
      v-for="b in badgeList"
      :key="b.id"
      :class="{ earned: badges.includes(b.id) }"
    >
      <span class="skill-mini-icon"><AppIcon :name="b.icon" :size="25" /></span
      ><span
        >{{ b.name
        }}<small>{{
          badges.includes(b.id)
            ? b.id === 'expliquer'
              ? 'Autoévalué'
              : 'Entraînement réussi'
            : 'À explorer'
        }}</small></span
      ><AppIcon v-if="badges.includes(b.id)" name="success" :size="18" />
    </div>
    <RouterLink to="/competences" class="text-link"
      >Voir mon bilan <AppIcon name="right" :size="16"
    /></RouterLink>
  </aside>
</template>

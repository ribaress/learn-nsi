<script setup>
import { computed } from 'vue';
import { useProgress } from '../../composables/useProgress.js';
import { gameSummary } from '../../domain/gamification.js';
import AppIcon from '../AppIcon.vue';
defineProps({ compact: Boolean });
const { progress } = useProgress();
const game = computed(() => gameSummary(progress));
</script>
<template>
  <section class="game-progress panel" :class="{ compact }" aria-label="Mon aventure">
    <div class="game-topline">
      <span class="game-star" aria-hidden="true"
        ><AppIcon name="starFour" :size="24" weight="fill"
      /></span>
      <div>
        <span class="eyebrow">Niveau {{ game.rankLevel }} · {{ game.rank }}</span
        ><strong>{{ game.xp }} XP</strong>
      </div>
      <span class="game-medals"
        >{{ game.badges.filter((b) => b.earned).length }} / {{ game.badges.length }} badges</span
      >
    </div>
    <div
      class="game-xp-track"
      role="progressbar"
      aria-label="Progression vers le prochain niveau"
      :aria-valuenow="Math.round(game.percent)"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span :style="{ width: `${game.percent}%` }"></span>
    </div>
    <p class="small">
      {{
        game.next
          ? `${game.next.xp - game.xp} XP avant ${game.next.title}`
          : 'Toutes les étapes de l’aventure sont ouvertes !'
      }}
    </p>
    <template v-if="!compact"
      ><div class="game-quest">
        <span aria-hidden="true">⚑</span>
        <div>
          <strong>Ton prochain défi</strong>
          <p>{{ game.quest.title }} · {{ game.quest.done }} / {{ game.quest.target }}</p>
        </div>
      </div>
      <div class="game-badges">
        <div v-for="badge in game.badges" :key="badge.id" :class="{ earned: badge.earned }">
          <span aria-hidden="true">{{ badge.earned ? '★' : '☆' }}</span>
          <div>
            <strong>{{ badge.title }}</strong>
            <p>{{ badge.description }}</p>
            <small>{{ badge.earned ? 'Obtenu' : 'À découvrir' }}</small>
          </div>
        </div>
      </div>
      <p class="small muted">
        30 XP pour une réussite sans corrigé, 15 avec corrigé, puis 40 pour une leçon terminée ou 80
        pour un projet. Refaire un exercice ne multiplie pas les points.
      </p></template
    >
  </section>
</template>

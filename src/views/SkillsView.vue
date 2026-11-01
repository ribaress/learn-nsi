<script setup>
import AppIcon from '../components/AppIcon.vue';
import { useProgress } from '../composables/useProgress.js';
import { missions } from '../content/missions.js';
import { activityComplete, reflectionComplete, courseLessonComplete } from '../domain/progress.js';
import { levels } from '../content/courses/catalog.js';
import GameProgress from '../components/courses/GameProgress.vue';
const { progress, badges, completed, complete } = useProgress();
const finishedLessons = (id) =>
  Object.values(progress.courses[id]?.lessons || {}).filter((entry) =>
    courseLessonComplete(entry, Object.keys(entry.exercises))
  ).length;
const skills = [
  {
    id: 'decomposer',
    title: 'Je décompose',
    icon: 'blocks',
    description: 'Je découpe une tâche et je repère les dépendances.',
    mission: 'decomposer'
  },
  {
    id: 'prevoir',
    title: 'Je prévois',
    icon: 'play',
    description: 'Je suis les valeurs et j’anticipe l’étape suivante.',
    mission: 'prevoir'
  },
  {
    id: 'tester',
    title: 'Je teste',
    icon: 'check',
    description: 'Je choisis des cas qui vérifient ou révèlent une erreur.',
    mission: 'tester'
  },
  {
    id: 'expliquer',
    title: 'J’explique',
    icon: 'hint',
    description: 'Je relis ma démarche avec quatre critères.',
    mission: 'comprendre'
  }
];
</script>
<template>
  <div class="standard-page">
    <div class="page-heading">
      <h1>Ce que tu construis,<br /><span>une étape à la fois.</span></h1>
      <p>
        {{ completed }} / 6 missions de l’atelier introductif terminées. Retrouve aussi tes trois
        parcours.
      </p>
    </div>
    <section class="level-cards" aria-label="Progression par niveau">
      <article v-for="level in levels" :key="level.id" class="level-card" :class="level.color">
        <h2>{{ level.title }}</h2>
        <p>{{ finishedLessons(level.id) }} leçon(s) ou projet(s) terminé(s).</p>
        <RouterLink :to="`/niveau/${level.id}`" class="button secondary"
          >Retrouver ce parcours</RouterLink
        >
      </article>
    </section>
    <GameProgress />
    <section class="badge-grid">
      <article
        v-for="s in skills"
        :key="s.id"
        class="panel badge-card"
        :class="{ earned: badges.includes(s.id) }"
      >
        <span class="badge-emblem"><AppIcon :name="s.icon" :size="34" weight="duotone" /></span>
        <h2>{{ s.title }}</h2>
        <p>{{ s.description }}</p>
        <span class="badge-status">{{
          badges.includes(s.id)
            ? s.id === 'expliquer'
              ? 'Autoévalué'
              : 'Entraînement réussi'
            : 'À explorer'
        }}</span
        ><RouterLink :to="`/mission/${s.mission}`" class="text-link"
          >{{ badges.includes(s.id) ? 'M’entraîner encore' : 'Explorer'
          }}<AppIcon name="right" :size="16"
        /></RouterLink>
      </article>
    </section>
    <section class="panel skills-detail">
      <h2>Ton carnet de progression</h2>
      <p class="muted">
        Une réussite vérifiée et une relecture personnelle sont deux informations différentes.
      </p>
      <div v-for="m in missions" :key="m.id" class="skill-progress-row">
        <span class="mission-number" :class="m.color">{{ m.number }}</span>
        <div>
          <h3>{{ m.short }}</h3>
          <p>
            {{ Object.keys(progress.missions[m.id]?.successes || {}).length }} /
            {{ m.rounds }} exercices ·
            {{
              reflectionComplete(progress.missions[m.id])
                ? 'Relecture autoévaluée'
                : 'Relecture à faire'
            }}
          </p>
          <span
            v-if="Object.values(progress.missions[m.id]?.successes || {}).includes('accompagne')"
            class="small muted"
            >Au moins une variante réussie avec corrigé.</span
          >
        </div>
        <RouterLink :to="`/mission/${m.id}`" class="button secondary compact"
          >{{ complete(m.id) ? 'Revoir' : 'Continuer' }}<AppIcon name="right" :size="16"
        /></RouterLink>
      </div>
    </section>
    <section class="chapter-bilan panel">
      <AppIcon name="flag" :size="32" />
      <h2>Peux-tu raconter ta méthode ?</h2>
      <p>
        Choisis un nouveau problème : répartir 23 crayons dans des pots de 5. Dis les données
        utiles, découpe la tâche, prévois les étapes et propose un test. Tu peux ensuite réutiliser
        ta fonction Python.
      </p>
      <RouterLink to="/mission/programmer" class="button primary"
        >Retrouver mon code<AppIcon name="right" :size="18" /></RouterLink
      ><RouterLink to="/prolongements" class="text-link"
        >Défis de première et terminale<AppIcon name="right" :size="17"
      /></RouterLink>
    </section>
    <p class="quiet-note">
      Les badges signalent un entraînement réussi ou déclaré. Ils ne remplacent pas une évaluation
      par ton enseignant.
    </p>
  </div>
</template>

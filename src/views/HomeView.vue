<script setup>
import { computed } from 'vue';
import AppIcon from '../components/AppIcon.vue';
import BookScene from '../components/BookScene.vue';
import ProgressPanel from '../components/ProgressPanel.vue';
import { missions } from '../content/missions.js';
import { useProgress } from '../composables/useProgress.js';
import { levels } from '../content/courses/catalog.js';
import { courseLessonComplete } from '../domain/progress.js';
import GameProgress from '../components/courses/GameProgress.vue';
const { progress, complete, completed } = useProgress();
const started = computed(() => Object.keys(progress.missions).length > 0);
const finishedCount = (level) =>
  Object.values(progress.courses[level]?.lessons || {}).filter((entry) =>
    courseLessonComplete(entry, Object.keys(entry.exercises))
  ).length;
</script>
<template>
  <div class="home-layout">
    <div class="home-main">
      <div class="page-heading">
        <h1>Un grand problème.<br /><span>De petites étapes.</span></h1>
        <p>
          Trois parcours pour comprendre, manipuler et programmer,<br class="desktop-only" />
          de la seconde à la terminale.
        </p>
      </div>
      <section class="level-cards" aria-label="Choisir mon niveau">
        <article v-for="level in levels" :key="level.id" class="level-card" :class="level.color">
          <span class="eyebrow">{{ level.subtitle }}</span>
          <h2>{{ level.title }}</h2>
          <p>{{ level.description }}</p>
          <span class="small"
            >{{ level.chapters }} chapitres · {{ finishedCount(level.id) }} activité(s)
            terminée(s)</span
          ><RouterLink :to="`/niveau/${level.id}`" class="button primary"
            >Explorer {{ level.short }}<AppIcon name="right" :size="17"
          /></RouterLink>
        </article>
      </section>
      <div class="course-home-note">
        <AppIcon name="hint" :size="22" />
        <p>
          Des leçons en petites étapes, trois exemples, une manipulation et trois exercices pour
          avancer vers l’autonomie.
        </p>
        <RouterLink to="/programme">Voir les programmes →</RouterLink>
      </div>
      <div class="section-heading">
        <h2>Pour commencer en douceur</h2>
        <span>L’atelier introductif</span>
      </div>
      <section class="chapter-feature">
        <div class="chapter-feature-copy">
          <h2>Du problème<br />à la solution</h2>
          <p>Six missions pour comprendre,<br />essayer et donner vie à tes idées.</p>
          <RouterLink
            :to="`/mission/${started ? progress.lastMission : 'comprendre'}`"
            class="button primary"
            >{{ started ? 'Reprendre mon parcours' : 'Commencer le chapitre'
            }}<AppIcon name="right" :size="19" /></RouterLink
          ><span class="chapter-duration"
            ><AppIcon name="clock" :size="14" />2 à 3 h · À ton rythme</span
          >
        </div>
        <BookScene hero />
      </section>
      <div class="section-heading">
        <h2>Ton parcours</h2>
        <span>6 missions, un premier pas vers Python</span>
      </div>
      <div class="mission-list">
        <RouterLink
          v-for="m in missions"
          :key="m.id"
          :to="`/mission/${m.id}`"
          class="mission-row"
          :class="{ done: complete(m.id) }"
          ><span class="mission-number" :class="m.color"
            ><AppIcon v-if="complete(m.id)" name="check" :size="23" /><template v-else>{{
              m.number
            }}</template></span
          >
          <div>
            <h3>{{ m.short }}</h3>
            <p>{{ m.description }}</p>
          </div>
          <span class="mission-time"><AppIcon name="clock" :size="15" />{{ m.duration }} min</span
          ><AppIcon name="chevron" :size="19"
        /></RouterLink>
      </div>
      <RouterLink to="/prolongements" class="extension-link"
        ><span class="extension-icon"><AppIcon name="lab" :size="25" /></span>
        <div>
          <strong>Envie d’aller plus loin ?</strong><span>Défis de première et terminale NSI</span>
        </div>
        <AppIcon name="right"
      /></RouterLink>
      <p class="quiet-note">
        Tu peux explorer librement. Les durées sont des estimations, jamais des limites.
      </p>
    </div>
    <div class="home-aside">
      <GameProgress compact />
      <ProgressPanel />
      <div class="autonomy-note">
        <AppIcon name="sparkle" :size="24" />
        <h3>Le droit d’essayer.</h3>
        <p>
          Ici, une erreur est une information. Recommence, prends un indice et trouve ta façon de
          faire.
        </p>
      </div>
    </div>
  </div>
</template>

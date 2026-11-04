<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  levelById,
  chapterSummaries,
  lessonUrl,
  officialSource
} from '../content/courses/catalog.js';
import { projectsFor } from '../content/courses/projects.js';
import { useCourses } from '../composables/useCourses.js';
import AppIcon from '../components/AppIcon.vue';
const route = useRoute(),
  chapters = ref([]),
  error = ref(''),
  loading = ref(false);
const levelId = computed(() => route.params.niveau);
const level = computed(() => levelById(levelId.value));
const { course, complete } = useCourses(levelId);
const finished = computed(() => chapters.value.flatMap((c) => c.lessons).filter(complete).length);
const total = computed(() => chapters.value.reduce((n, c) => n + c.lessons.length, 0));
let request = 0;
watch(
  levelId,
  async (id) => {
    const token = ++request;
    loading.value = true;
    error.value = '';
    chapters.value = [];
    try {
      if (!levelById(id)) throw new Error('Ce niveau n’existe pas.');
      const result = chapterSummaries(id);
      if (token === request) chapters.value = result;
    } catch (e) {
      if (token === request) error.value = e.message;
    } finally {
      if (token === request) loading.value = false;
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="standard-page course-level-page">
    <RouterLink to="/" class="back-link">← Les trois parcours</RouterLink>
    <div v-if="error" class="panel">
      <h1>Parcours indisponible</h1>
      <p role="alert">{{ error }}</p>
      <RouterLink to="/">Retrouver l’accueil</RouterLink>
    </div>
    <template v-else-if="level">
      <div class="page-heading">
        <span class="eyebrow">{{ level.subtitle }}</span>
        <h1>{{ level.title }}</h1>
        <p>{{ level.description }}</p>
      </div>
      <div class="course-level-summary panel">
        <div>
          <strong>{{ finished }} / {{ total }} leçons terminées</strong>
          <p class="small">
            Accès libre. Les prérequis te conseillent un ordre ; ils ne bloquent jamais une leçon.
          </p>
        </div>
        <RouterLink
          v-if="course.lastLesson"
          :to="lessonUrl(levelId, course.lastLesson.chapter, course.lastLesson.lesson)"
          class="button primary"
          >Reprendre ma leçon</RouterLink
        >
      </div>
      <section v-if="levelId === 'terminale'" class="panel annales-invitation">
        <div>
          <span class="eyebrow">Préparer le bac</span>
          <h2>Les annales guidées</h2>
          <p>
            Une sélection de sujets officiels écrits et pratiques de 2021 à 2026, expliqués par
            étapes.
          </p>
        </div>
        <RouterLink to="/annales" class="button primary">Choisir un sujet</RouterLink>
      </section>
      <p v-if="loading" role="status">Chargement des chapitres…</p>
      <section v-for="(chapter, index) in chapters" :key="chapter.id" class="course-chapter panel">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Chapitre {{ index + 1 }}</span>
            <h2>{{ chapter.title }}</h2>
          </div>
          <span class="small"
            >{{ chapter.lessons.filter(complete).length }} / {{ chapter.lessons.length }}</span
          >
        </div>
        <p v-if="chapter.description">{{ chapter.description }}</p>
        <div class="course-lesson-list">
          <RouterLink
            v-for="lesson in chapter.lessons"
            :key="lesson.id"
            :to="lessonUrl(levelId, chapter.id, lesson.id)"
            class="course-lesson-link"
            ><span :class="['lesson-dot', { done: complete(lesson) }]"
              ><AppIcon :name="complete(lesson) ? 'check' : 'right'" :size="17"
            /></span>
            <div>
              <strong>{{ lesson.title }}</strong
              ><span>{{ lesson.objectives[0] }}</span>
            </div>
            <small>{{ lesson.duration }} min</small></RouterLink
          >
        </div>
      </section>
      <section class="panel course-projects">
        <span class="eyebrow">Relier les notions</span>
        <h2>Les projets de synthèse</h2>
        <p>Construis un résultat par étapes, teste-le et explique tes choix.</p>
        <RouterLink
          v-for="project in projectsFor(levelId)"
          :key="project.id"
          :to="`/niveau/${levelId}/projet/${project.id}`"
          class="course-lesson-link"
          ><span class="lesson-dot"><AppIcon name="sparkle" :size="17" /></span>
          <div>
            <strong>{{ project.title }}</strong
            ><span>{{ project.objectives[0] }}</span>
          </div>
          <small>{{ project.duration }} min</small></RouterLink
        >
      </section>
      <div class="course-reference-links">
        <RouterLink :to="`/programme?niveau=${levelId}`" class="text-link"
          >Voir la correspondance avec le programme</RouterLink
        ><a
          :href="officialSource(levelId)?.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
          >Lire le programme officiel ↗</a
        >
      </div>
    </template>
  </div>
</template>

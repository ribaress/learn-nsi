<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { loadChapter, levelById, officialSource, lessonUrl } from '../content/courses/catalog.js';
import { projectsFor } from '../content/courses/projects.js';
import { useCourses } from '../composables/useCourses.js';
import CourseExercise from '../components/courses/CourseExercise.vue';
import InteractiveActivity from '../components/courses/InteractiveActivity.vue';
import RichText from '../components/courses/RichText.vue';
import GameProgress from '../components/courses/GameProgress.vue';
import { unlockedStep, exerciseAttempted } from '../domain/learning-path.js';
import ReadingCheckpoint from '../components/courses/ReadingCheckpoint.vue';
import DataLab from '../components/courses/DataLab.vue';
const route = useRoute(),
  lesson = ref(null),
  chapter = ref(null),
  error = ref('');
const levelId = computed(() => route.params.niveau);
const level = computed(() => levelById(levelId.value));
const { entry, exerciseEntry, remember, complete } = useCourses(levelId);
const current = computed(() => (lesson.value ? entry(lesson.value.id) : null));
const entries = computed(
  () =>
    lesson.value?.exercises.map((e) =>
      exerciseEntry(lesson.value.id, e.id, e.starter || '', e.files || {})
    ) || []
);
const next = computed(
  () =>
    chapter.value?.lessons[chapter.value.lessons.findIndex((l) => l.id === lesson.value?.id) + 1]
);
const steps = ['Comprendre', 'Manipuler', 'Exercices', 'Bilan'];
const availableStep = computed(() =>
  lesson.value
    ? unlockedStep(
        current.value,
        lesson.value.exercises.map((e) => e.id)
      )
    : 0
);
watchEffect(() => {
  if (current.value && current.value.step > availableStep.value)
    current.value.step = availableStep.value;
});
let request = 0;
watch(
  () => route.fullPath,
  async () => {
    const token = ++request;
    lesson.value = null;
    chapter.value = null;
    error.value = '';
    try {
      if (!level.value) throw new Error('Ce niveau n’existe pas.');
      if (route.params.projet) {
        const project = projectsFor(levelId.value).find((p) => p.id === route.params.projet);
        if (!project) throw new Error('Ce projet n’existe pas.');
        if (token === request) lesson.value = project;
      } else {
        const loaded = await loadChapter(levelId.value, route.params.chapitre);
        const found = loaded.lessons.find((l) => l.id === route.params.lecon);
        if (!found) throw new Error('Cette leçon n’existe pas dans ce chapitre.');
        if (token === request) {
          chapter.value = loaded;
          lesson.value = found;
          remember(loaded.id, found.id);
        }
      }
    } catch (e) {
      if (token === request) error.value = e.message;
    }
  },
  { immediate: true }
);
function step(index) {
  if (index > availableStep.value) return;
  current.value.step = index;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function readingEntry(field, index, initial) {
  current.value[field] ||= {};
  const key = String(index);
  if (!current.value[field][key]) current.value[field][key] = initial;
  return current.value[field][key];
}
</script>
<template>
  <div class="standard-page course-lesson-page">
    <RouterLink :to="level ? `/niveau/${levelId}` : '/'" class="back-link"
      >← {{ level?.title || 'Les parcours' }}</RouterLink
    >
    <section v-if="error" class="panel">
      <h1>Leçon indisponible</h1>
      <p role="alert">{{ error }}</p>
      <RouterLink to="/">Retrouver les parcours</RouterLink>
    </section>
    <p v-else-if="!lesson" role="status">Préparation de la leçon…</p>
    <template v-else>
      <div class="page-heading">
        <span class="eyebrow"
          >{{ chapter?.title || 'Projet de synthèse' }} · {{ lesson.duration }} min environ</span
        >
        <h1>{{ lesson.title }}</h1>
      </div>
      <GameProgress compact />
      <nav class="lesson-stepper course-stepper" aria-label="Étapes de la leçon">
        <button
          v-for="(label, index) in steps"
          :key="label"
          :aria-current="current.step === index ? 'step' : undefined"
          :disabled="index > availableStep"
          :title="index > availableStep ? 'Réponds d’abord dans l’étape précédente.' : undefined"
          :class="{ active: current.step === index }"
          @click="step(index)"
        >
          {{ index + 1 }} {{ label }}{{ index > availableStep ? ' · verrouillé' : '' }}
        </button>
      </nav>
      <section v-if="current.step === 0" class="panel course-lesson-content">
        <section v-if="lesson.introduction" class="lesson-opening">
          <span class="eyebrow">Partons d’une situation concrète</span>
          <h2>{{ lesson.introduction.question }}</h2>
          <p class="opening-story"><RichText :text="lesson.introduction.situation" /></p>
          <div class="opening-purpose">
            <strong>Pourquoi apprendre cela ?</strong>
            <p><RichText :text="lesson.introduction.why" /></p>
          </div>
          <h3>Notre chemin, une idée à la fois</h3>
          <ol>
            <li v-for="part in lesson.introduction.journey" :key="part">
              <RichText :text="part" />
            </li>
          </ol>
        </section>
        <div class="course-objectives">
          <h2>Ce que tu vas apprendre</h2>
          <ul>
            <li v-for="objective in lesson.objectives" :key="objective">{{ objective }}</li>
          </ul>
          <p class="small">
            <strong>{{
              lesson.prerequisiteRecap
                ? 'Tout ce qu’il faut est repris ici :'
                : 'Avant de commencer :'
            }}</strong>
            {{ lesson.prerequisites.join(' · ') }}
          </p>
        </div>
        <section v-if="lesson.prerequisiteRecap?.length" class="lesson-prerequisites">
          <h2>Les mots et les outils dont tu as besoin</h2>
          <p class="small">
            Ces rappels font partie du cours. Tu peux les relire dès qu’un mot ou un calcul te
            paraît nouveau.
          </p>
          <div class="prerequisite-grid">
            <article
              v-for="recap in lesson.prerequisiteRecap"
              :key="recap.term"
              class="prerequisite-card"
            >
              <h3>{{ recap.term }}</h3>
              <p><RichText :text="recap.explanation" /></p>
              <div class="recap-example">
                <strong>Un exemple tout simple</strong>
                <p><RichText :text="recap.example" /></p>
              </div>
            </article>
          </div>
        </section>
        <section
          v-for="(section, index) in lesson.sections"
          :key="section.title"
          class="course-explanation"
        >
          <span class="eyebrow">Étape {{ index + 1 }}</span>
          <h2>{{ section.title }}</h2>
          <p><RichText :text="section.text" /></p>
          <div v-if="section.table" class="table-scroll reading-table">
            <table>
              <caption>
                {{
                  section.table.caption
                }}
              </caption>
              <thead>
                <tr>
                  <th
                    v-for="(column, columnIndex) in section.table.columns"
                    :key="columnIndex"
                    scope="col"
                  >
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rowIndex) in section.table.rows" :key="rowIndex">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre v-if="section.code">{{ section.code }}</pre>
          <div v-if="section.inlineActivity" class="inline-reading-lab">
            <span class="eyebrow">Essaie tout de suite</span
            ><DataLab
              :type="section.inlineActivity.type"
              :config="section.inlineActivity.config"
              :state="readingEntry('readingActivities', index, {})"
            />
          </div>
          <ReadingCheckpoint
            v-if="section.checkpoint"
            :checkpoint="section.checkpoint"
            :entry="readingEntry('readingChecks', index, { answer: '', submitted: false })"
          />
        </section>
        <div :class="{ 'paired-examples': lesson.realLifeExamples?.length }">
          <section>
            <h2>Trois exemples pour comprendre</h2>
            <div class="course-examples">
              <article
                v-for="(example, index) in lesson.examples"
                :key="example.title"
                class="course-example"
              >
                <span class="eyebrow">Exemple {{ index + 1 }}</span>
                <h3>{{ example.title }}</h3>
                <p><strong>Situation :</strong> <RichText :text="example.input" /></p>
                <p><RichText :text="example.reasoning" /></p>
                <div class="example-result">
                  <strong>Ce que l’on obtient</strong>
                  <p><RichText :text="example.result" /></p>
                </div>
              </article>
            </div>
          </section>
          <section v-if="lesson.realLifeExamples?.length" class="everyday-examples">
            <h2>Et dans la vie réelle ?</h2>
            <p class="small">
              On retrouve la même idée dans des situations familières. Regarde le lien avec le
              cours, mais aussi la limite de la comparaison.
            </p>
            <article
              v-for="example in lesson.realLifeExamples"
              :key="example.title"
              class="life-example"
            >
              <span class="eyebrow">Un autre point de vue</span>
              <h3>{{ example.title }}</h3>
              <p><RichText :text="example.situation" /></p>
              <div class="life-connection">
                <strong>Le lien avec le cours</strong>
                <p><RichText :text="example.connection" /></p>
              </div>
              <p class="analogy-limit">
                <strong>La comparaison a une limite :</strong>
                <RichText :text="example.difference" />
              </p>
            </article>
          </section>
        </div>
        <label class="reflection-label"
          >Avant de manipuler, quel objectif de cette leçon peux-tu reformuler avec tes mots
          ?<textarea
            v-model="current.discoveryAnswer"
            rows="2"
            placeholder="Je vais apprendre à…"
          ></textarea>
        </label>
        <p v-if="availableStep < 1" class="step-lock-note">
          Écris une première réponse pour débloquer la manipulation.
        </p>
        <button class="button primary" :disabled="availableStep < 1" @click="step(1)">
          Essayer la manipulation →
        </button>
      </section>
      <section v-else-if="current.step === 1" class="panel course-lesson-content">
        <InteractiveActivity
          :key="lesson.id"
          :activity="lesson.activity"
          :state="current.activity"
        />
        <p v-if="availableStep < 2" class="step-lock-note">
          Note ta prévision, utilise la manipulation puis explique ton observation pour ouvrir les
          exercices.
        </p>
        <button class="button primary" :disabled="availableStep < 2" @click="step(2)">
          Passer aux exercices →
        </button>
      </section>
      <section v-else-if="current.step === 2" class="panel course-lesson-content">
        <div class="course-exercises-intro">
          <h2>De l’essai guidé à l’autonomie</h2>
          <p>
            Réponds à un exercice pour ouvrir le suivant. Un essai suffit pour avancer ; une
            réussite et ta relecture sont nécessaires pour terminer la leçon. Tu peux recommencer
            autant de fois que nécessaire.
          </p>
        </div>
        <template v-for="(exercise, index) in lesson.exercises" :key="`${lesson.id}-${exercise.id}`"
          ><CourseExercise
            v-if="index === 0 || exerciseAttempted(entries[index - 1])"
            :exercise="exercise"
            :entry="entries[index]"
            :index="index"
          />
          <div v-else class="locked-exercise">
            <span aria-hidden="true">🔒</span>
            <h3>Exercice {{ index + 1 }} · {{ exercise.title }}</h3>
            <p>Réponds à l’exercice précédent pour le débloquer.</p>
          </div></template
        ><button class="button primary" :disabled="availableStep < 3" @click="step(3)">
          Relire et faire mon bilan →
        </button>
      </section>
      <section v-else class="panel course-lesson-content">
        <h2>{{ complete(lesson) ? 'Une nouvelle leçon terminée !' : 'Je fais le point' }}</h2>
        <ul class="lesson-result-list">
          <li v-for="(exercise, index) in lesson.exercises" :key="exercise.id">
            {{ entries[index].success ? '✓' : '○' }} {{ exercise.title }} —
            {{
              entries[index].success
                ? entries[index].success === 'accompagne'
                  ? 'réussi avec corrigé'
                  : 'réussi sans corrigé'
                : 'à essayer'
            }}
          </li>
        </ul>
        <label class="reflection-label"
          >{{ lesson.reflection
          }}<textarea
            v-model="current.reflection"
            rows="5"
            placeholder="Avec mes mots, je peux expliquer…"
          ></textarea>
        </label>
        <p class="small muted">
          Cette explication n’est pas notée automatiquement. Tu peux aussi la formuler à voix haute.
        </p>
        <div class="review-checklist">
          <h3>Je relis mon raisonnement</h3>
          <label v-for="(criterion, index) in lesson.review" :key="criterion"
            ><input type="checkbox" v-model="current.selfReview" :value="index" /><span>{{
              criterion
            }}</span></label
          >
        </div>
        <p class="feedback" :class="complete(lesson) ? 'positive' : ''" role="status">
          {{
            complete(lesson)
              ? 'Les trois exercices sont réussis et ta relecture est faite. Tu peux poursuivre ou revenir t’entraîner.'
              : 'Pour terminer : réussis les trois exercices et coche les trois points de relecture. Toutes les autres leçons restent accessibles.'
          }}
        </p>
        <RouterLink v-if="next" :to="lessonUrl(levelId, chapter.id, next.id)" class="button primary"
          >Leçon suivante →</RouterLink
        ><RouterLink v-else :to="`/niveau/${levelId}`" class="button primary"
          >Retrouver les chapitres →</RouterLink
        >
      </section>
      <details v-if="lesson.official?.length" class="course-official">
        <summary>Les capacités du programme travaillées ici</summary>
        <ul>
          <li v-for="capacity in lesson.official" :key="capacity.id">
            <a
              :href="`${officialSource(levelId).url}#page=${capacity.page}`"
              target="_blank"
              rel="noopener noreferrer"
              >{{ capacity.label }} · p. {{ capacity.page }}</a
            >
          </li>
        </ul>
      </details>
    </template>
  </div>
</template>

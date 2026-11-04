<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { loadAnnale } from '../content/annales/catalog.js';
import { correctionAvailable, annaleSolved } from '../domain/annales.js';
import { useCourses } from '../composables/useCourses.js';
import CourseExercise from '../components/courses/CourseExercise.vue';
import RichText from '../components/courses/RichText.vue';

const route = useRoute(), router = useRouter();
const tutorial = ref(null),
  loading = ref(false),
  error = ref('');
const { entry, exerciseEntry } = useCourses('terminale');
const saved = computed(() => (tutorial.value ? entry(tutorial.value.id) : null));
const sections = computed(() => tutorial.value?.sections || []);
const activeSection = computed(() => sections.value.find(section => section.id === route.query.exercice) || sections.value[0]);
const exercises = computed(() => activeSection.value?.exercises || tutorial.value?.exercises || []);
const unlocked = computed(() => tutorial.value && correctionAvailable(tutorial.value, saved.value, activeSection.value?.id));
const allUnlocked = computed(() => tutorial.value && correctionAvailable(tutorial.value, saved.value));
const solved = computed(() => tutorial.value && annaleSolved(tutorial.value, saved.value));
const successes = computed(
  () =>
    exercises.value.filter((e) =>
      ['autonome', 'accompagne'].includes(saved.value?.exercises[e.id]?.success)
    ).length || 0
);
function successCount(section) {
  return section.exercises.filter(e => ['autonome', 'accompagne'].includes(saved.value?.exercises[e.id]?.success)).length;
}
function selectSection(id) {
  router.replace({ query: { ...route.query, exercice: id } });
}
let request = 0;
watch(
  () => route.params.id,
  async (id) => {
    const token = ++request;
    tutorial.value = null;
    error.value = '';
    loading.value = true;
    try {
      const result = await loadAnnale(id);
      if (token === request) {
        tutorial.value = result;
        if (result?.sections) entry(result.id).requiredExerciseIds = result.exercises.map(e => e.id);
      }
    } catch {
      if (token === request)
        error.value =
          'Le contenu n’a pas pu être chargé. Réessaie en ouvrant ce tutoriel depuis le catalogue.';
    } finally {
      if (token === request) loading.value = false;
    }
  },
  { immediate: true }
);
function markCorrection(exercise, event) {
  if (event.target.open)
    exerciseEntry(tutorial.value.id, exercise.id, exercise.starter).modelSeen = true;
}
function goToExercise(id) {
  document.getElementById(`exercice-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <div class="standard-page annale-tutorial-page">
    <RouterLink to="/annales" class="back-link">← Toutes les annales guidées</RouterLink>
    <p v-if="loading" role="status">Chargement du tutoriel…</p>
    <section v-else-if="error" class="panel">
      <h1>Contenu indisponible</h1>
      <p role="alert">{{ error }}</p>
    </section>
    <section v-else-if="!tutorial" class="panel">
      <h1>Tutoriel introuvable</h1>
      <p>Cette référence n’est pas dans la sélection.</p>
      <RouterLink to="/annales" class="button secondary">Choisir un autre sujet</RouterLink>
    </section>
    <template v-else>
      <div class="page-heading">
        <span class="eyebrow"
          >{{ tutorial.year }} · {{ tutorial.format === 'ecrit' ? 'Écrit' : 'Pratique Python' }} ·
          {{ tutorial.duration }} min</span
        >
        <h1>{{ tutorial.title }}</h1>
        <p>{{ tutorial.introduction }}</p>
      </div>
      <section class="panel annale-source" aria-label="Référence du sujet">
        <strong>{{ tutorial.reference }} · {{ tutorial.session }}</strong>
        <p>{{ tutorial.scope }}</p>
        <a :href="tutorial.sourceUrl" target="_blank" rel="noopener noreferrer" class="text-link"
          >{{ tutorial.sourceLabel || 'Ouvrir le sujet officiel (PDF)' }} ↗</a
        >
        <p v-if="tutorial.sourceIndexUrl" class="small">
          <a :href="tutorial.sourceIndexUrl" target="_blank" rel="noopener noreferrer" class="text-link">Retrouver les annales sur Pixees ↗</a>
        </p>
        <details>
          <summary>Périmètre et adaptations de ce tutoriel</summary>
          <p>{{ tutorial.adaptation }}</p>
          <p class="small muted">
            Source : ministère de l’Éducation nationale, document public vérifié le 3 novembre 2026.
            La résolution proposée ici est pédagogique et n’est pas un corrigé officiel.
          </p>
        </details>
      </section>
      <nav v-if="sections.length" class="panel annale-section-nav" aria-label="Exercices du sujet">
        <h2>Tous les exercices du sujet</h2>
        <p>{{ sections.length }} exercices · {{ tutorial.exercises.length }} questions et sous-questions. Tu peux les travailler dans l’ordre de ton choix.</p>
        <div class="annale-section-buttons">
          <button v-for="section in sections" :key="section.id" type="button" class="annale-section-button" :aria-pressed="section.id === activeSection.id" @click="selectSection(section.id)">
            <strong>{{ section.title }}</strong>
            <span>{{ successCount(section) }} / {{ section.exercises.length }} questions réussies</span>
          </button>
        </div>
      </nav>
      <section v-if="activeSection" class="annale-section-heading" :key="activeSection.id">
        <span class="eyebrow">Exercice officiel · toutes les questions</span>
        <h2>{{ activeSection.title }}</h2>
      </section>
      <section class="panel annale-preparation">
        <h2>Avant de commencer</h2>
        <ul>
          <li v-for="prerequisite in tutorial.prerequisites" :key="prerequisite">
            {{ prerequisite }}
          </li>
        </ul>
        <p>
          Lis les données, formule ton idée, puis teste-la. Les tests contrôlent des résultats ; ils
          ne remplacent pas la justification attendue sur une copie de bac.
        </p>
        <h3>Les données à garder sous les yeux</h3>
        <pre>{{ activeSection?.context || tutorial.context }}</pre>
      </section>
      <section class="panel annale-progress" aria-label="Progression du tutoriel">
        <div>
          <strong v-if="activeSection">{{ successes }} / {{ exercises.length }} questions réussies dans cet exercice</strong>
          <strong v-else>{{ successes }} / {{ exercises.length }} ateliers réussis</strong>
          <p class="small">
            Réponses, code et indices sont sauvegardés avec ton parcours de terminale.
          </p>
        </div>
        <div v-if="tutorial.year >= 2025" role="status">
          <strong>{{ unlocked ? 'Corrigé débloqué' : 'Corrigé verrouillé' }}</strong>
          <p class="small">
            {{
              unlocked
                ? 'Tu peux maintenant comparer ton raisonnement avec les résolutions.'
                : activeSection ? 'Réussis toutes les questions de cet exercice pour ouvrir sa correction. Les autres exercices restent indépendants.' : 'Réussis les trois ateliers. Un essai ou une autoévaluation ne suffit pas.'
            }}
          </p>
        </div>
        <div v-else>
          <strong>Corrigé disponible</strong>
          <p class="small">Le consulter distingue une réussite accompagnée.</p>
        </div>
      </section>
      <nav class="annale-step-nav" aria-label="Ateliers du tutoriel">
        <a
          v-for="(exercise, index) in exercises"
          :key="exercise.id"
          :href="`#/annales/${tutorial.id}#exercice-${exercise.id}`"
          @click.prevent="goToExercise(exercise.id)"
          >{{ exercise.officialQuestion ? `Q${exercise.officialQuestion}` : index + 1 }}. {{ exercise.title }}</a
        >
      </nav>
      <section
        v-for="(exercise, index) in exercises"
        :key="exercise.id"
        class="panel annale-workshop"
      >
        <pre v-if="exercise.context" class="annale-question-context">{{ exercise.context }}</pre>
        <p class="annale-guidance"><strong>Pour chercher.</strong> {{ exercise.guidance }}</p>
        <div v-if="exercise.writingPrompt" class="annale-writing">
          <p><RichText :text="exercise.writingPrompt" /></p>
          <label :for="`brouillon-${exercise.id}`">Ton brouillon de justification</label>
          <textarea :id="`brouillon-${exercise.id}`" v-model="exerciseEntry(tutorial.id, exercise.id, exercise.starter).draft" rows="5" placeholder="Rédige, dessine sous forme de texte ou explique les étapes de ton raisonnement."></textarea>
          <p class="small muted">Ce brouillon est sauvegardé. La question ci-dessous vérifie un résultat ciblé ; elle ne note pas ta rédaction libre.</p>
        </div>
        <CourseExercise
          :exercise="exercise"
          :entry="exerciseEntry(tutorial.id, exercise.id, exercise.starter)"
          :index="index"
          :label="exercise.officialQuestion ? `Question ${exercise.officialQuestion}` : `Atelier ${index + 1}`"
          :solution-locked="!unlocked"
          :official-reference="tutorial.reference"
        />
        <details
          v-if="unlocked"
          class="annale-resolution comparison"
          @toggle="markCorrection(exercise, $event)"
        >
          <summary>Dérouler la résolution pas à pas</summary>
          <ol>
            <li v-for="(step, stepIndex) in exercise.resolution" :key="stepIndex">
              <RichText :text="step" />
            </li>
          </ol>
          <p class="annale-pitfall"><strong>L’erreur à éviter.</strong> {{ exercise.pitfall }}</p>
        </details>
      </section>
      <section v-if="allUnlocked && tutorial.takeaway" class="panel annale-takeaway">
        <h2>Ce que tu peux réutiliser</h2>
        <p>{{ tutorial.takeaway }}</p>
      </section>
      <section class="panel annale-review">
        <h2>Expliquer avec tes mots</h2>
        <label :for="`notes-${tutorial.id}`"
          >Ton raisonnement, tes erreurs et les tests qui t’ont aidé</label
        ><textarea
          :id="`notes-${tutorial.id}`"
          v-model="saved.reflection"
          rows="5"
          placeholder="Qu’est-ce qui t’a permis de passer de l’énoncé à une solution ?"
        ></textarea>
        <p class="small muted">
          Cette rédaction est sauvegardée, mais n’est pas notée automatiquement.
        </p>
        <template v-if="solved"
          ><label
            v-for="(text, index) in [
              'Je peux expliquer les données et le résultat demandé.',
              'Je peux justifier les principales étapes de ma solution.',
              'Je sais proposer un cas limite et interpréter son résultat.'
            ]"
            :key="text"
            class="review-check"
            ><input v-model="saved.selfReview" type="checkbox" :value="index" />{{ text }}</label
          ></template
        >
      </section>
      <RouterLink to="/annales" class="button secondary">Choisir un autre tutoriel →</RouterLink>
    </template>
  </div>
</template>

<script setup>
import { computed, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { missions, missionById, sources, reviewCriteria, hintsFor } from '../content/missions.js';
import { useProgress } from '../composables/useProgress.js';
import { activityComplete, reflectionComplete } from '../domain/progress.js';
import AppIcon from '../components/AppIcon.vue';
import UnderstandingActivity from '../components/activities/UnderstandingActivity.vue';
import RobotActivity from '../components/activities/RobotActivity.vue';
import DecompositionActivity from '../components/activities/DecompositionActivity.vue';
import PredictionActivity from '../components/activities/PredictionActivity.vue';
import TestingActivity from '../components/activities/TestingActivity.vue';
import ProgrammingActivity from '../components/activities/ProgrammingActivity.vue';
import RichText from '../components/courses/RichText.vue';
import GameProgress from '../components/courses/GameProgress.vue';
import { unlockedMissionStep } from '../domain/learning-path.js';
const route = useRoute(),
  { progress, entry, success, complete } = useProgress();
const mission = computed(() => missionById(route.params.id));
const current = computed(() => (mission.value ? entry(mission.value.id) : null));
const currentHints = computed(() =>
  mission.value ? hintsFor(mission.value, current.value.round) : []
);
const activity = computed(() => {
  if (!current.value) return {};
  const round = current.value.round;
  if (!current.value.activity[round]) current.value.activity[round] = {};
  return current.value.activity[round];
});
const steps = ['Découvrir', 'Manipuler', 'Expliquer', 'Bilan'];
const availableStep = computed(() =>
  mission.value ? unlockedMissionStep(current.value, mission.value.rounds) : 0
);
watchEffect(() => {
  if (current.value && current.value.step > availableStep.value)
    current.value.step = availableStep.value;
});
const componentMap = {
  comprendre: UnderstandingActivity,
  ordonner: RobotActivity,
  decomposer: DecompositionActivity,
  prevoir: PredictionActivity,
  tester: TestingActivity,
  programmer: ProgrammingActivity
};
const nextMission = computed(
  () => missions[missions.findIndex((m) => m.id === mission.value?.id) + 1]
);
watch(
  () => route.params.id,
  (id) => {
    if (missionById(id)) progress.lastMission = id;
  },
  { immediate: true }
);
function setStep(step) {
  if (step > availableStep.value) return;
  current.value.step = step;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function hint() {
  const round = current.value.round;
  current.value.hints[round] = Math.min(3, (current.value.hints[round] || 0) + 1);
}
function modelToggle(event) {
  if (event.target.open) current.value.modelSeen = true;
}
</script>
<template>
  <div v-if="!mission" class="empty-state panel">
    <h1>Cette mission n’existe pas.</h1>
    <RouterLink to="/" class="button primary">Retrouver le parcours</RouterLink>
  </div>
  <div v-else class="lesson-page">
    <RouterLink to="/" class="back-link"
      ><AppIcon name="left" :size="17" />Retour au parcours</RouterLink
    >
    <div class="lesson-title">
      <span class="mission-number" :class="mission.color">{{ mission.number }}</span>
      <div>
        <h1>{{ mission.title }}</h1>
        <p>
          {{ mission.skill }} <span>· {{ mission.duration }} min environ</span>
        </p>
      </div>
    </div>
    <nav class="lesson-stepper" aria-label="Étapes de la mission">
      <button
        v-for="(step, i) in steps"
        :key="step"
        :aria-label="step"
        :class="{ active: current.step === i }"
        :aria-current="current.step === i ? 'step' : undefined"
        :disabled="i > availableStep"
        :title="i > availableStep ? 'Réponds dans l’étape précédente pour continuer.' : undefined"
        @click="setStep(i)"
      >
        <span>{{ i + 1 }}</span
        >{{ step }}
      </button>
    </nav>
    <GameProgress compact />
    <div class="lesson-layout">
      <section class="lesson-content panel">
        <template v-if="current.step === 0"
          ><div class="section-title">
            <AppIcon :name="mission.icon" :size="25" />
            <h2>Avant de te lancer</h2>
          </div>
          <p class="lesson-intro"><RichText :text="mission.intro" /></p>
          <div class="worked-example">
            <h3>{{ mission.exampleTitle }}</h3>
            <p><RichText :text="mission.example" /></p>
          </div>
          <ol class="walkthrough">
            <li v-for="([title, text], i) in mission.walkthrough" :key="title">
              <span>{{ i + 1 }}</span>
              <div>
                <h3>{{ title }}</h3>
                <p><RichText :text="text" /></p>
              </div>
            </li>
          </ol>
          <div class="takeaway">
            <AppIcon name="hint" :size="23" />
            <div>
              <strong>L’idée à garder</strong>
              <p><RichText :text="mission.takeaway" /></p>
            </div>
          </div>
          <label class="reflection-label"
            >Avant de manipuler, reformule le but de cette mission.<textarea
              v-model="current.discoveryAnswer"
              rows="2"
              placeholder="Je cherche à…"
            ></textarea>
          </label>
          <p v-if="availableStep < 1" class="step-lock-note">
            Ta première réponse débloque la manipulation.
          </p>
          <button class="button primary" :disabled="availableStep < 1" @click="setStep(1)">
            À moi d’essayer<AppIcon name="right" :size="18" /></button
        ></template>
        <template v-else-if="current.step === 1"
          ><div class="practice-header">
            <div>
              <span class="small muted">{{
                current.round === 0
                  ? 'Un premier essai guidé'
                  : current.round === 1
                    ? 'À toi de jouer'
                    : 'Le défi de transfert'
              }}</span>
              <h2>
                {{
                  current.round === 0
                    ? 'Je manipule et je comprends'
                    : current.round === 1
                      ? 'Je réutilise ma démarche'
                      : 'Je change de contexte'
                }}
              </h2>
            </div>
            <div class="round-tabs" aria-label="Exercices">
              <button
                v-for="i in mission.rounds"
                :key="i"
                :aria-label="`Exercice ${i}`"
                :aria-pressed="current.round === i - 1"
                :class="{ active: current.round === i - 1, passed: current.successes[i - 1] }"
                @click="current.round = i - 1"
              >
                {{ i }}
              </button>
            </div>
          </div>
          <component
            :is="componentMap[mission.id]"
            :key="`${mission.id}-${current.round}`"
            :round="current.round"
            :data="activity"
            :entry="current"
            @success="success(mission.id, current.round)" />
          <div v-if="current.successes[current.round]" class="round-success" role="status">
            <AppIcon name="success" :size="25" />
            <div>
              <strong
                >Activité réussie
                {{
                  current.successes[current.round] === 'accompagne'
                    ? 'avec corrigé'
                    : 'sans corrigé'
                }}</strong
              >
              <p>
                {{
                  current.round < mission.rounds - 1
                    ? 'Essaie maintenant une nouvelle variante.'
                    : 'Prends un instant pour expliquer ta démarche.'
                }}
              </p>
            </div>
            <button
              v-if="current.round < mission.rounds - 1"
              class="button secondary"
              @click="current.round++"
            >
              {{ current.round === mission.rounds - 2 ? 'Passer au défi' : 'Continuer'
              }}<AppIcon name="right" :size="17" /></button
            ><button v-else class="button secondary" @click="setStep(2)">
              Expliquer<AppIcon name="right" :size="17" />
            </button></div
        ></template>
        <template v-else-if="current.step === 2"
          ><div class="section-title">
            <AppIcon name="hint" :size="25" />
            <h2>Avec tes propres mots</h2>
          </div>
          <p class="lesson-intro">{{ mission.reflection }}</p>
          <label class="reflection-label"
            >Mon explication<textarea
              v-model="current.reflection"
              rows="6"
              placeholder="Je commence par… Ensuite… Je vérifie avec…"
            ></textarea>
          </label>
          <p class="small muted">
            Tu peux aussi t’expliquer la démarche à voix haute. Ton texte n’est pas noté
            automatiquement.
          </p>
          <div class="review-checklist">
            <h3>Je relis mon raisonnement</h3>
            <label v-for="c in reviewCriteria" :key="c.id"
              ><input type="checkbox" v-model="current.selfReview" :value="c.id" /><span>{{
                c.text
              }}</span></label
            >
            <p class="small muted">
              Coche ce que tu sais expliquer. Il s’agit de ton autoévaluation.
            </p>
          </div>
          <label class="oral-explanation"
            ><input type="checkbox" v-model="current.oralExplanation" /> J’ai expliqué ma démarche à
            voix haute.</label
          >
          <details class="comparison" @toggle="modelToggle">
            <summary>Comparer avec une explication possible</summary>
            <p>{{ mission.model }}</p>
            <p class="small muted">
              Ta formulation peut être différente. Compare les idées, pas les mots.
            </p>
          </details>
          <div class="transfer-note">
            <h3>Et dans une autre situation ?</h3>
            <p>{{ mission.transfer }}</p>
          </div>
          <button class="button primary" :disabled="availableStep < 3" @click="setStep(3)">
            Voir mon bilan<AppIcon name="right" :size="18" /></button
        ></template>
        <template v-else
          ><div class="mission-summary">
            <span class="summary-symbol"
              ><AppIcon :name="complete(mission.id) ? 'medal' : 'flag'" :size="40" weight="duotone"
            /></span>
            <h2>
              {{
                complete(mission.id)
                  ? 'Une nouvelle étape franchie !'
                  : 'Chaque essai te fait avancer.'
              }}
            </h2>
            <p>{{ mission.takeaway }}</p>
          </div>
          <div class="summary-lines">
            <div>
              <AppIcon :name="activityComplete(progress, mission.id) ? 'success' : 'play'" /><span
                >Exercices vérifiés</span
              ><strong>{{ Object.keys(current.successes).length }} / {{ mission.rounds }}</strong>
            </div>
            <div>
              <AppIcon :name="reflectionComplete(current) ? 'success' : 'hint'" /><span
                >Relecture personnelle</span
              ><strong>{{ current.selfReview.length }} / 4</strong>
            </div>
          </div>
          <p class="small muted">
            Les exercices sont vérifiés par leurs résultats. La relecture est une autoévaluation ;
            elle ne certifie pas à elle seule la maîtrise de la compétence.
          </p>
          <div class="summary-actions">
            <button
              v-if="!activityComplete(progress, mission.id)"
              class="button secondary"
              @click="setStep(1)"
            >
              Revenir aux exercices</button
            ><button
              v-else-if="!reflectionComplete(current)"
              class="button secondary"
              @click="setStep(2)"
            >
              Relire mon explication</button
            ><RouterLink
              v-if="nextMission"
              :to="`/mission/${nextMission.id}`"
              class="button primary"
              >Mission suivante<AppIcon name="right" :size="18" /></RouterLink
            ><RouterLink v-else to="/competences" class="button primary"
              >Mon bilan de chapitre<AppIcon name="right" :size="18"
            /></RouterLink>
          </div>
          <RouterLink v-if="mission.id === 'programmer'" to="/prolongements" class="text-link"
            >Explorer les défis de première et terminale<AppIcon
              name="right"
              :size="16" /></RouterLink
        ></template>
      </section>
      <aside class="lesson-aside">
        <section class="hint-panel panel">
          <div class="section-title">
            <AppIcon name="hint" :size="23" />
            <h2>Un coup de pouce ?</h2>
          </div>
          <p v-if="!(current.hints[current.round] || 0)">
            Une piste pour avancer, sans te donner tout de suite la réponse.
          </p>
          <ol v-else class="hints">
            <li v-for="(h, i) in currentHints.slice(0, current.hints[current.round])" :key="i">
              <strong>{{ i === 2 ? 'Exemple résolu' : `Indice ${i + 1}` }}</strong>
              <pre v-if="h.includes('\n')">{{ h }}</pre>
              <p v-else><RichText :text="h" /></p>
            </li>
          </ol>
          <button
            class="button secondary"
            :disabled="current.hints[current.round] >= 3"
            @click="hint"
          >
            {{
              !current.hints[current.round]
                ? 'Voir un indice'
                : current.hints[current.round] < 2
                  ? 'Un autre indice'
                  : current.hints[current.round] === 2
                    ? 'Voir le corrigé'
                    : 'Les trois aides sont affichées'
            }}
          </button>
          <p v-if="current.hints[current.round] >= 3" class="small muted">
            Cette variante sera notée « avec corrigé ». Tu pourras essayer la suivante sans corrigé.
          </p>
        </section>
        <section class="vocabulary-panel">
          <h3>Les mots de la mission</h3>
          <dl>
            <template v-for="[word, definition] in mission.vocabulary" :key="word"
              ><dt>{{ word }}</dt>
              <dd>{{ definition }}</dd></template
            >
          </dl>
        </section>
        <div class="caution-note">
          <AppIcon name="info" :size="21" />
          <p><RichText :text="mission.caution" /></p>
        </div>
      </aside>
    </div>
    <details class="curriculum">
      <summary>Liens avec les programmes officiels</summary>
      <p>Compétence travaillée : {{ mission.skill }}.</p>
      <a
        v-for="id in mission.levels"
        :key="id"
        :href="sources.find((s) => s.id === id).url"
        target="_blank"
        rel="noopener"
        >{{ sources.find((s) => s.id === id).title }}<AppIcon name="external" :size="15"
      /></a>
      <p class="small muted">
        Références vérifiées le 30 octobre 2026. Ce chapitre couvre une sélection de compétences,
        pas l’ensemble du programme.
      </p>
    </details>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PythonEditor from '../PythonEditor.vue';
import GoldHints from './GoldHints.vue';
import SourceCredit from './SourceCredit.vue';
import WebLab from './WebLab.vue';
import { checkAnswer } from '../../domain/course-learning.js';
import RichText from './RichText.vue';
const props = defineProps({
  exercise: Object,
  entry: Object,
  index: Number,
  solutionLocked: { type: Boolean, default: false },
  officialReference: String,
  label: String
});
const feedback = ref(''),
  correct = ref(false);
const reward = ref('');
function success() {
  if (!props.entry.success)
    reward.value =
      props.entry.modelSeen || props.entry.hints >= 3
        ? '+15 XP · Tu progresses !'
        : '+30 XP · Bien joué !';
  props.entry.success ||=
    props.entry.modelSeen || props.entry.hints >= 3 ? 'accompagne' : 'autonome';
}
function attempt() {
  props.entry.attempted = true;
  props.entry.attempts = Math.min(10000, (props.entry.attempts || 0) + 1);
}
function check() {
  attempt();
  correct.value = checkAnswer(props.exercise, props.entry.answer);
  feedback.value = correct.value
    ? props.solutionLocked
      ? 'Réponse juste. Poursuis les autres ateliers pour débloquer le corrigé.'
      : props.exercise.explanation
    : props.exercise.feedbackWrong ||
      'Reprends les données de l’énoncé et essaie avec un exemple plus petit.';
  if (correct.value) success();
}
function modelToggle(event) {
  if (event.target.open) props.entry.modelSeen = true;
}
</script>
<template>
  <article class="course-exercise" :id="`exercice-${exercise.id}`">
    <div class="exercise-heading">
      <span class="exercise-index">{{ index + 1 }}</span>
      <div>
        <span class="eyebrow">{{
          label || ['Essai guidé', 'Application', 'Transfert'][index]
        }}</span>
        <h3>{{ exercise.title }}</h3>
      </div>
      <span v-if="entry.success" class="course-status done"
        >✓ {{ entry.success === 'accompagne' ? 'Avec corrigé' : 'Sans corrigé' }}</span
      >
    </div>
    <p class="exercise-prompt"><RichText :text="exercise.prompt" /></p>
    <p v-if="reward" class="game-reward" role="status">✦ {{ reward }}</p>
    <form v-if="exercise.kind === 'answer'" @submit.prevent="check">
      <label :for="`reponse-${exercise.id}`">Ta réponse</label>
      <select
        v-if="exercise.choices"
        :id="`reponse-${exercise.id}`"
        v-model="entry.answer"
        required
      >
        <option value="" disabled>Choisis une réponse</option>
        <option v-for="choice in exercise.choices" :key="choice.value" :value="choice.value">
          {{ choice.label }}
        </option>
      </select>
      <input
        v-else
        :id="`reponse-${exercise.id}`"
        v-model="entry.answer"
        autocomplete="off"
        required
        placeholder="Écris le résultat demandé"
      />
      <button class="button primary" type="submit">Vérifier ma réponse</button>
      <p v-if="feedback" class="feedback" :class="correct ? 'positive' : 'try-again'" role="status">
        {{ feedback }}
      </p>
    </form>
    <template v-else-if="exercise.kind === 'python' || exercise.kind === 'sql'">
      <details v-if="exercise.kind === 'sql'" class="comparison">
        <summary>Voir les données de départ</summary>
        <pre>{{ exercise.setup }}</pre>
      </details>
      <details
        v-if="exercise.kind === 'python' && Object.keys(entry.files || {}).length"
        class="comparison"
        open
      >
        <summary>Les modules de ton projet</summary>
        <label v-for="(_, name) in entry.files" :key="name"
          >{{ name
          }}<textarea
            class="course-code-input"
            v-model="entry.files[name]"
            :aria-label="`Module ${name}`"
            rows="6"
            spellcheck="false"
          ></textarea>
        </label>
      </details>
      <details v-if="exercise.dataFiles" class="comparison">
        <summary>Les fichiers de données fournis</summary>
        <pre v-for="(text, name) in exercise.dataFiles" :key="name"
          >{{ name }}
{{ text || '(fichier vide)' }}</pre>
      </details>
      <PythonEditor
        v-model="entry.code"
        :mode="exercise.kind"
        :function-name="exercise.functionName"
        :tests="exercise.tests"
        :initial-code="exercise.starter"
        :files="entry.files"
        :data-files="exercise.dataFiles"
        :setup="exercise.setup"
        :expected="exercise.expected"
        :verify-query="exercise.verifyQuery"
        :ordered="exercise.ordered"
        :reveal-expected="!solutionLocked"
        @success="success"
        @attempt="attempt"
      />
    </template>
    <WebLab
      v-else-if="exercise.kind === 'web'"
      v-model="entry.code"
      :checks="exercise.checks"
      @success="success"
      @attempt="attempt"
    />
    <GoldHints :hints="exercise.hints" :entry="entry" :limit="solutionLocked ? 2 : 3" />
    <details v-if="!solutionLocked" class="comparison exercise-solution" @toggle="modelToggle">
      <summary>Comprendre une correction possible</summary>
      <pre>{{ exercise.solution }}</pre>
      <template v-if="exercise.solutionFiles">
        <pre v-for="(code, name) in exercise.solutionFiles" :key="name"
          >{{ name }}
{{ code }}</pre>
      </template>
      <p>{{ exercise.explanation }}</p>
      <p class="small muted">
        Lire le corrigé ne valide pas l’exercice. Réessaie et vérifie le résultat ; ta réussite sera
        accompagnée.
      </p>
    </details>
    <p v-if="officialReference" class="small muted">
      Adaptation pédagogique du sujet officiel {{ officialReference }}. Référence et périmètre en
      tête du tutoriel.
    </p>
    <SourceCredit v-else :source="exercise.source" />
  </article>
</template>

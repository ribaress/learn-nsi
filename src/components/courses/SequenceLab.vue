<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import {
  sortFrames,
  searchFrames,
  dynamicFrames,
  textSearchFrames
} from '../../domain/course-learning.js';
const props = defineProps({ type: String, config: Object, state: Object });
const emit = defineEmits(['observe']);
const playing = ref(false);
let timer;
const valuesText = computed({
  get: () => props.state.valuesText ?? (props.config.values || [5, 2, 4, 1]).join(', '),
  set: (value) => {
    props.state.valuesText = value;
    props.state.cursor = 0;
    stop();
  }
});
const values = computed(() =>
  valuesText.value
    .split(',')
    .map((s) => Number(s.trim()))
    .filter(Number.isFinite)
    .slice(0, 16)
);
const number = computed({
  get: () =>
    props.state.number ?? props.config.n ?? props.config.amount ?? props.config.target ?? 4,
  set: (n) => {
    const value = Number(n) || 0;
    props.state.number =
      props.type === 'dynamic'
        ? Math.max(0, Math.min(50, Math.trunc(value)))
        : props.type === 'recursion'
          ? Math.max(0, Math.min(8, Math.trunc(value)))
          : value;
    props.state.cursor = 0;
    stop();
  }
});
const frames = computed(() => {
  if (props.type === 'sort') return sortFrames(values.value, props.config.algorithm);
  if (props.type === 'search')
    return searchFrames(
      [...values.value].sort((a, b) => a - b),
      number.value
    );
  if (props.type === 'dynamic')
    return dynamicFrames(props.config.coins || [1, 3, 4], Math.max(0, Math.min(50, number.value)));
  if (props.type === 'text-search')
    return textSearchFrames(
      props.state.text ?? props.config.text,
      props.state.pattern ?? props.config.pattern
    );
  if (props.type === 'trace')
    return props.config.frames.map((f) => ({ ...f, explanation: f.explanation || f.text }));
  if (props.type === 'cpu') {
    const n = number.value;
    return [
      {
        variables: { PC: 0, ACC: 0, memoire: n },
        line: 1,
        explanation: 'PC indique la prochaine instruction. ACC est l’accumulateur.'
      },
      {
        variables: { PC: 1, ACC: n, memoire: n },
        line: 2,
        explanation: `LOAD copie la valeur ${n} depuis la mémoire dans ACC.`
      },
      {
        variables: { PC: 2, ACC: n + 3, memoire: n },
        line: 3,
        explanation: 'ADD 3 augmente l’accumulateur de trois.'
      },
      {
        variables: { PC: 3, ACC: n + 3, memoire: n + 3 },
        line: 4,
        explanation: 'STORE copie ACC en mémoire. La donnée a changé ; le programme est terminé.'
      }
    ];
  }
  const n = Math.max(0, Math.min(8, number.value)),
    list = [];
  const name = props.config.mode === 'sum' ? 'somme' : 'factorielle';
  for (let k = n; k >= 0; k--)
    list.push({
      values: Array.from({ length: n - k + 1 }, (_, i) => `${name}(${n - i})`),
      explanation:
        k === 0
          ? 'Cas de base : aucun appel supplémentaire. Le résultat commence à remonter.'
          : `L’appel ${name}(${k}) attend le résultat du problème plus petit ${name}(${k - 1}).`
    });
  let result = props.config.mode === 'sum' ? 0 : 1;
  for (let k = 1; k <= n; k++) {
    result = props.config.mode === 'sum' ? result + k : result * k;
    list.push({
      values: [`${name}(${k}) = ${result}`],
      explanation: `Le résultat de ${name}(${k - 1}) est connu. L’appel en attente peut terminer.`,
      result
    });
  }
  return list;
});
const cursor = computed(() =>
  Math.max(0, Math.min(props.state.cursor || 0, frames.value.length - 1))
);
const frame = computed(() => frames.value[cursor.value] || {});
const code = computed(() =>
  props.type === 'cpu' ? 'LOAD memoire\nADD 3\nSTORE memoire\nHALT' : props.config.code
);
function stop() {
  clearInterval(timer);
  playing.value = false;
}
function next() {
  emit('observe');
  if (cursor.value < frames.value.length - 1) props.state.cursor = cursor.value + 1;
  else stop();
}
function play() {
  if (playing.value) {
    stop();
    return;
  }
  if (cursor.value === frames.value.length - 1) props.state.cursor = 0;
  playing.value = true;
  timer = setInterval(next, 1500);
}
onBeforeUnmount(stop);
</script>
<template>
  <div class="sequence-lab">
    <div class="lab-inputs">
      <label v-if="['sort', 'search'].includes(type)"
        >Les valeurs (16 maximum)<input v-model="valuesText" aria-label="Valeurs de la simulation"
      /></label>
      <label v-if="['search', 'dynamic', 'recursion', 'cpu'].includes(type)"
        >{{
          type === 'search'
            ? 'Valeur recherchée'
            : type === 'dynamic'
              ? 'Montant à construire'
              : type === 'cpu'
                ? 'Valeur en mémoire'
                : 'Valeur de n'
        }}<input
          type="number"
          v-model="number"
          :min="type === 'cpu' ? -100 : 0"
          :max="type === 'recursion' ? 8 : type === 'dynamic' ? 50 : 100"
      /></label>
      <template v-if="type === 'text-search'"
        ><label
          >Texte<input
            :value="state.text ?? config.text"
            maxlength="60"
            @input="
              state.text = $event.target.value;
              state.cursor = 0;
            " /></label
        ><label
          >Motif<input
            :value="state.pattern ?? config.pattern"
            maxlength="12"
            @input="
              state.pattern = $event.target.value;
              state.cursor = 0;
            " /></label
      ></template>
    </div>
    <p v-if="type === 'search'" class="small muted">
      Le tableau est trié avant la recherche : c’est une précondition de la dichotomie.
    </p>
    <p v-if="type === 'dynamic'" class="small">
      Pièces disponibles : {{ config.coins?.join(', ') }}. La case d’indice n contient le minimum
      pour le montant n.
    </p>
    <div v-if="code" class="trace-code">
      <div
        v-for="(line, index) in code.split('\n')"
        :key="index"
        :class="{ current: frame.line === index + 1 }"
      >
        <span>{{ index + 1 }}</span
        ><code>{{ line || ' ' }}</code>
      </div>
    </div>
    <div
      v-if="frame.values"
      class="lab-values"
      :class="{ 'vertical-values': type === 'recursion' }"
    >
      <div
        v-for="(value, index) in frame.values"
        :key="index"
        class="lab-cell"
        :class="{ highlight: frame.active?.includes(index) }"
      >
        <small>{{ index }}</small
        ><strong>{{ value === null ? '∞' : value }}</strong>
      </div>
    </div>
    <dl v-if="frame.variables" class="variable-cards">
      <div v-for="(value, name) in frame.variables" :key="name">
        <dt>{{ name }}</dt>
        <dd>{{ JSON.stringify(value) }}</dd>
      </div>
    </dl>
    <p class="lab-observation" aria-live="polite">{{ frame.explanation }}</p>
    <div class="lab-controls">
      <button
        class="button secondary compact"
        :disabled="cursor === 0"
        @click="
          stop();
          state.cursor = cursor - 1;
        "
      >
        Précédent</button
      ><button
        class="button primary compact"
        :disabled="cursor === frames.length - 1"
        @click="next"
      >
        Une étape</button
      ><button class="button secondary compact" @click="play">
        {{ playing ? 'Pause' : 'Lire les étapes' }}</button
      ><button
        class="text-link"
        @click="
          stop();
          state.cursor = 0;
        "
      >
        Recommencer</button
      ><span class="small">{{ cursor + 1 }} / {{ frames.length }}</span>
    </div>
    <p v-if="type === 'trace'" class="small muted">
      Trace préparée de cet exemple : l’éditeur Python des exercices exécute ton propre programme.
    </p>
  </div>
</template>

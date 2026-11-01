<script setup>
import { computed, ref, onBeforeUnmount } from 'vue';
import AppIcon from './AppIcon.vue';
import BookScene from './BookScene.vue';
import { packingExecution } from '../domain/learning.js';
const props = defineProps({
  n: Number,
  capacity: Number,
  modelValue: { type: Number, default: 0 }
});
const emit = defineEmits(['update:modelValue']);
const frames = computed(() => packingExecution(props.n, props.capacity));
const cursor = computed(() => Math.min(Math.max(0, props.modelValue), frames.value.length - 1));
const frame = computed(() => frames.value[cursor.value]);
const previousFrame = computed(() => frames.value[Math.max(0, cursor.value - 1)]);
const playing = ref(false);
let timer;
const code = [
  'restants = nb_livres',
  'boites = 0',
  'while restants > 0:',
  '    ranges = min(restants, capacite)',
  '    restants = restants - ranges',
  '    boites = boites + 1',
  'return boites'
];
const variables = [
  ['remaining', 'restants'],
  ['boxes', 'boites'],
  ['moved', 'ranges']
];
function pause() {
  clearInterval(timer);
  playing.value = false;
}
function move(delta) {
  pause();
  emit('update:modelValue', Math.max(0, Math.min(frames.value.length - 1, cursor.value + delta)));
}
function play() {
  if (playing.value) {
    pause();
    return;
  }
  if (cursor.value === frames.value.length - 1) emit('update:modelValue', 0);
  playing.value = true;
  timer = setInterval(() => {
    if (cursor.value >= frames.value.length - 1) {
      pause();
      return;
    }
    const nextCursor = cursor.value + 1;
    emit('update:modelValue', nextCursor);
    if (nextCursor >= frames.value.length - 1) pause();
  }, 1100);
}
function restart() {
  pause();
  emit('update:modelValue', 0);
}
onBeforeUnmount(pause);
</script>
<template>
  <section class="code-player" aria-label="Le code pas à pas">
    <div class="code-player-heading">
      <div>
        <h3>Une ligne, un changement</h3>
        <p>Dans <code>nb_boites(nb_livres, capacite)</code>, on exécute les lignes une à une.</p>
      </div>
      <AppIcon name="code" :size="25" />
    </div>
    <p class="trace-parameters">
      Données d’entrée : <code>nb_livres = {{ n }}</code> · <code>capacite = {{ capacity }}</code>
    </p>
    <ol class="guided-code" aria-label="Code Python de la simulation">
      <li
        v-for="(line, i) in code"
        :key="i"
        :aria-current="frame.line === i + 1 ? 'step' : undefined"
      >
        <span class="code-line-number" aria-hidden="true">{{ i + 1 }}</span
        ><code>{{ line }}</code
        ><AppIcon v-if="frame.line === i + 1" name="left" :size="14" />
      </li>
    </ol>
    <div class="trace-variables">
      <div
        v-for="[key, name] in variables"
        :key="key"
        :class="{ changed: cursor > 0 && frame[key] !== previousFrame[key] }"
      >
        <label :for="`trace-${name}`">{{ name }}</label
        ><output :id="`trace-${name}`" :aria-label="`Valeur de ${name}`">{{
          frame[key] ?? '—'
        }}</output>
      </div>
    </div>
    <div class="trace-explanation" role="status" aria-live="polite">
      <span class="line-indicator">{{
        frame.line ? `Ligne ${frame.line} exécutée` : 'Avant la première ligne'
      }}</span>
      <p>{{ frame.message }}</p>
      <span
        v-if="frame.condition !== null"
        class="condition-result"
        :class="{ false: !frame.condition }"
        >Condition {{ frame.condition ? 'vraie' : 'fausse' }}</span
      >
    </div>
    <BookScene :n="n" :capacity="capacity" :packed="n - (frame.remaining ?? n)" />
    <div class="trace-playback">
      <button
        class="button secondary compact"
        aria-label="Étape précédente"
        :disabled="cursor === 0"
        @click="move(-1)"
      >
        <AppIcon name="left" :size="17" />Précédent</button
      ><button
        class="button primary compact"
        :aria-label="playing ? 'Pause de la lecture' : 'Lire le code'"
        @click="play"
      >
        <AppIcon :name="playing ? 'pause' : 'play'" :size="17" />{{
          playing ? 'Pause' : 'Lire'
        }}</button
      ><button
        class="button secondary compact"
        aria-label="Étape suivante"
        :disabled="cursor === frames.length - 1"
        @click="move(1)"
      >
        Suivant<AppIcon name="right" :size="17" /></button
      ><button class="icon-button" aria-label="Revenir au début du code" @click="restart">
        <AppIcon name="restart" :size="17" />
      </button>
    </div>
    <p class="trace-caption">
      Pas {{ cursor }} / {{ frames.length - 1 }} · Une valeur sur fond violet vient de changer. « —
      » signifie que la variable n’a pas encore reçu de valeur.
    </p>
    <p class="small muted">
      Observer le code ne valide pas les prédictions. Reviens à l’autre vue pour prévoir toi-même
      chaque tour.
    </p>
  </section>
</template>
<style scoped>
.code-player {
  min-width: 0;
}
.code-player-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin: 23px 0 10px;
  color: var(--accent);
}
.code-player-heading h3 {
  font-size: 17px;
  color: var(--ink);
}
.code-player-heading p {
  font-size: 12px;
  color: #766b84;
  margin: 8px 0 0;
  line-height: 1.8;
}
.trace-parameters {
  font-size: 11px;
  color: #766783;
  padding: 11px 13px;
  border: 1px solid #e8e0f2;
  border-radius: 8px;
  background: #faf7fe;
  margin: 16px 0;
}
.guided-code {
  list-style: none;
  margin: 0;
  padding: 13px 0;
  background: #28243c;
  border-radius: 12px;
  color: #eee9fa;
  font-family: Consolas, 'Courier New', monospace;
  max-width: 100%;
  overflow: hidden;
}
.guided-code li {
  display: grid;
  grid-template-columns: 19px minmax(0, 1fr) 14px;
  gap: 9px;
  align-items: start;
  padding: 9px 14px;
  border-left: 3px solid transparent;
  line-height: 1.9;
  transition: background 0.16s;
}
.guided-code li[aria-current='step'] {
  background: #514571;
  border-left-color: #c3acf2;
}
.guided-code code {
  font-family: inherit;
  font-size: 13px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.code-line-number {
  font-size: 11px;
  color: #b1a4c8;
  line-height: 2.2;
  user-select: none;
}
.guided-code li > svg {
  margin-top: 5px;
  color: #d9c4ff;
}
.trace-variables {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  margin: 17px 0;
}
.trace-variables > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 13px 11px;
  background: #f6f3fb;
  border: 1px solid #e8e0f2;
  border-radius: 9px;
  min-width: 0;
  transition:
    background 0.15s,
    border-color 0.15s;
}
.trace-variables label {
  font:
    11px Consolas,
    monospace;
  color: #746085;
}
.trace-variables output {
  font-size: 20px;
  font-weight: 700;
  color: #615071;
}
.trace-variables > div.changed {
  background: #eae2fc;
  border-color: #b8a5de;
}
.trace-variables > div.changed output {
  color: #594193;
}
.trace-explanation {
  background: #f6f3fb;
  border-radius: 10px;
  padding: 16px 17px;
  min-height: 110px;
  color: #6d5d7e;
  font-size: 12px;
  line-height: 1.9;
}
.line-indicator {
  font-weight: 700;
  color: #655175;
  font-size: 11px;
}
.trace-explanation p {
  margin: 7px 0 0;
}
.condition-result {
  display: inline-block;
  background: #d9f0e5;
  color: #326d55;
  padding: 3px 8px;
  margin-top: 8px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 600;
}
.condition-result.false {
  background: #f7e5d5;
  color: #865b39;
}
.trace-playback {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
  margin: 20px 0 13px;
}
.trace-playback > .icon-button {
  height: 39px;
  width: 39px;
}
.trace-caption {
  font-size: 11px;
  color: #766783;
  line-height: 1.9;
  margin: 0 0 15px;
}
@media (max-width: 767px) {
  .code-player-heading h3 {
    font-size: 15px;
  }
  .code-player-heading > svg {
    display: none;
  }
  .trace-parameters {
    font-size: 10px;
    line-height: 2;
  }
  .guided-code li {
    padding: 9px 8px;
    grid-template-columns: 14px minmax(0, 1fr) 12px;
    gap: 6px;
  }
  .guided-code code {
    font-size: 12px;
  }
  .code-line-number {
    font-size: 10px;
  }
  .trace-variables {
    gap: 6px;
  }
  .trace-variables > div {
    padding: 11px 7px;
    flex-direction: column;
    gap: 6px;
  }
  .trace-variables label {
    font-size: 11px;
  }
  .trace-variables output {
    font-size: 22px;
  }
  .trace-explanation {
    font-size: 13px;
    padding: 15px;
    min-height: 140px;
  }
  .trace-playback {
    gap: 7px;
  }
  .trace-playback > .button {
    font-size: 11px;
    min-height: 44px;
    padding: 10px 11px;
  }
  .trace-playback > .icon-button {
    width: 44px;
    height: 44px;
  }
  .trace-caption {
    font-size: 11px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .guided-code li,
  .trace-variables > div {
    transition: none;
  }
}
</style>

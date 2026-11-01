<script setup>
import { computed, ref, onBeforeUnmount } from 'vue';
import AppIcon from '../AppIcon.vue';
import { robotResult } from '../../domain/learning.js';
const props = defineProps({ round: Number, data: Object });
const emit = defineEmits(['success']);
props.data.instructions ||= [];
const target = computed(() => (props.round === 0 ? [3, 3] : [3, 0]));
const result = computed(() => robotResult(props.data.instructions, target.value));
const cursor = ref(0),
  playing = ref(false),
  feedback = ref(''),
  good = ref(false);
let timer;
const position = computed(
  () => result.value.path[Math.min(cursor.value, result.value.path.length - 1)]
);
const directions = [
  ['up', 'Haut'],
  ['left', 'Gauche'],
  ['down', 'Bas'],
  ['right', 'Droite']
];
function stop() {
  clearInterval(timer);
  playing.value = false;
}
function add(d) {
  stop();
  if (props.data.instructions.length < 40) props.data.instructions.push(d);
  cursor.value = 0;
  feedback.value = '';
}
function next() {
  cursor.value = Math.min(cursor.value + 1, result.value.path.length - 1);
  if (cursor.value === result.value.path.length - 1) stop();
}
function play() {
  if (playing.value) {
    stop();
    return;
  }
  if (cursor.value >= result.value.path.length - 1) cursor.value = 0;
  playing.value = true;
  timer = setInterval(next, 700);
}
function check() {
  stop();
  cursor.value = result.value.path.length - 1;
  good.value = result.value.success;
  feedback.value = good.value
    ? 'Bien vu ! Ton programme atteint la cible sans traverser l’obstacle. Un autre chemin peut aussi être correct.'
    : result.value.reason === 'obstacle'
      ? 'Le robot rencontre la case interdite. Cherche un chemin autour.'
      : result.value.reason === 'outside'
        ? 'Une instruction fait sortir le robot de la grille. Il s’arrête avant de sortir.'
        : 'Le robot a fini ses instructions, mais il n’est pas encore sur la cible.';
  if (good.value) emit('success');
}
onBeforeUnmount(stop);
</script>
<template>
  <div>
    <p class="activity-prompt">
      Guide le robot de la case <strong>départ</strong> jusqu’au drapeau. La case sombre est
      interdite. Les directions suivent toujours celles de l’écran.
    </p>
    <div class="robot-workspace">
      <div
        class="robot-grid"
        role="img"
        :aria-label="`Grille de 4 par 4. Robot colonne ${position[0] + 1}, ligne ${position[1] + 1}. Obstacle colonne 2, ligne 2. Cible colonne ${target[0] + 1}, ligne ${target[1] + 1}.`"
      >
        <template v-for="y in 4" :key="y"
          ><div
            v-for="x in 4"
            :key="`${x}-${y}`"
            class="grid-cell"
            :class="{
              obstacle: x === 2 && y === 2,
              target: x - 1 === target[0] && y - 1 === target[1],
              start: x === 1 && y === 1
            }"
          >
            <AppIcon
              v-if="position[0] === x - 1 && position[1] === y - 1"
              name="robot"
              :size="32"
              weight="duotone"
            /><AppIcon
              v-else-if="x - 1 === target[0] && y - 1 === target[1]"
              name="flag"
              :size="27"
            /><span v-else-if="x === 2 && y === 2">×</span
            ><small v-else-if="x === 1 && y === 1">Départ</small>
          </div></template
        >
      </div>
      <div class="direction-controls">
        <span class="small muted">Ajouter une instruction</span>
        <div class="direction-pad">
          <button
            v-for="[id, label] in directions"
            :key="id"
            :class="id"
            :aria-label="label"
            class="icon-button"
            @click="add(id)"
          >
            <AppIcon :name="id" :size="23" />
          </button>
        </div>
        <button
          class="text-link"
          @click="
            stop();
            data.instructions.pop();
            cursor = 0;
            feedback = '';
          "
          :disabled="!data.instructions.length"
        >
          Retirer la dernière
        </button>
      </div>
    </div>
    <div class="instruction-tape" aria-label="Ton programme">
      <span v-if="!data.instructions.length" class="muted"
        >Ton programme attend ses premières instructions.</span
      ><span
        v-for="(d, i) in data.instructions"
        :key="i"
        class="instruction-chip"
        :class="{ current: i === cursor - 1 }"
        ><small>{{ i + 1 }}</small
        ><AppIcon :name="d" :size="19" /><span class="sr-only">{{
          directions.find((v) => v[0] === d)?.[1]
        }}</span></span
      >
    </div>
    <div class="playback">
      <button class="button secondary" :disabled="!data.instructions.length" @click="play">
        <AppIcon :name="playing ? 'pause' : 'play'" />{{ playing ? 'Pause' : 'Lire' }}</button
      ><button
        class="button secondary"
        :disabled="cursor >= result.path.length - 1"
        @click="
          stop();
          next();
        "
      >
        Une étape</button
      ><button
        class="icon-button"
        aria-label="Recommencer la lecture"
        @click="
          stop();
          cursor = 0;
        "
      >
        <AppIcon name="restart" />
      </button>
    </div>
    <p class="small muted" aria-live="polite">
      État {{ cursor }} : colonne {{ position[0] + 1 }}, ligne {{ position[1] + 1 }}.
    </p>
    <button class="button primary" @click="check">Vérifier mon chemin</button>
    <div v-if="feedback" class="feedback" :class="good ? 'positive' : 'try-again'" role="status">
      {{ feedback }}
    </div>
    <details class="comparison">
      <summary>Comparer deux chemins possibles</summary>
      <p>
        Vers le coin inférieur droit : longer le haut puis descendre, ou descendre le long du bord
        gauche puis suivre le bas. Dans les deux cas, il faut trois pas dans chaque direction.
        Compare les états intermédiaires : ils diffèrent, mais l’état final est le même.
      </p>
      <p>La cible du défi est différente : réutilise uniquement les instructions utiles.</p>
    </details>
  </div>
</template>

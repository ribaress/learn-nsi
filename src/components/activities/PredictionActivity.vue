<script setup>
import { computed, ref } from 'vue';
import AppIcon from '../AppIcon.vue';
import BookScene from '../BookScene.vue';
import PackingCodePlayer from '../PackingCodePlayer.vue';
import { packingTrace, predictionFeedback } from '../../domain/learning.js';
const props = defineProps({ round: Number, data: Object });
const emit = defineEmits(['success']);
const n = props.round === 0 ? 13 : 10,
  capacity = props.round === 0 ? 6 : 4;
const trace = packingTrace(n, capacity);
props.data.index ??= 0;
props.data.index = Math.min(props.data.index, trace.length - 1);
props.data.predictionRemaining ??= '';
props.data.predictionBoxes ??= '';
props.data.predicted ||= [];
props.data.codeCursor ??= 0;
const feedback = ref(''),
  good = ref(false),
  mode = ref('predict');
const state = computed(() => trace[props.data.index]);
function verify() {
  const i = props.data.index + 1,
    wanted = trace[i];
  if (!wanted) return;
  const result = predictionFeedback(
    state.value,
    capacity,
    props.data.predictionRemaining,
    props.data.predictionBoxes
  );
  good.value = result.success;
  feedback.value = result.message;
  if (good.value) {
    if (!props.data.predicted.includes(i)) props.data.predicted.push(i);
    props.data.index = i;
    props.data.predictionRemaining = '';
    props.data.predictionBoxes = '';
    if (props.data.predicted.length === trace.length - 1) emit('success');
  }
}
</script>
<template>
  <div>
    <p class="activity-prompt">
      <strong>{{ n }} livres, {{ capacity }} places par boîte.</strong> Prédis l’état après le
      prochain rangement avant de révéler ce qui se passe.
    </p>
    <div class="learning-mode-switch" role="group" aria-label="Choisir une vue pour apprendre">
      <button
        :aria-pressed="mode === 'predict'"
        :class="{ active: mode === 'predict' }"
        @click="mode = 'predict'"
      >
        Faire mes prédictions</button
      ><button
        :aria-pressed="mode === 'code'"
        :class="{ active: mode === 'code' }"
        @click="mode = 'code'"
      >
        <AppIcon name="code" :size="17" />Observer le code
      </button>
    </div>
    <PackingCodePlayer
      v-if="mode === 'code'"
      v-model="data.codeCursor"
      :n="n"
      :capacity="capacity"
    />
    <template v-else>
      <div class="variable-strip">
        <div>
          <span>Livres restants</span><strong>{{ state.remaining }}</strong>
        </div>
        <AppIcon name="right" :size="22" />
        <div>
          <span>Boîtes utilisées</span><strong>{{ state.boxes }}</strong>
        </div>
      </div>
      <BookScene :n="n" :capacity="capacity" :packed="n - state.remaining" />
      <div v-if="data.index < trace.length - 1" class="prediction-form">
        <h3>Après la prochaine boîte…</h3>
        <div class="form-row">
          <label
            >Livres restants<input
              v-model="data.predictionRemaining"
              type="number"
              min="0"
              inputmode="numeric" /></label
          ><label
            >Boîtes utilisées<input
              v-model="data.predictionBoxes"
              type="number"
              min="0"
              inputmode="numeric"
          /></label>
        </div>
        <button class="button primary" @click="verify">Vérifier et avancer</button>
      </div>
      <div v-else class="feedback positive">
        Il ne reste plus de livre : la condition « restants &gt; 0 » est fausse. La boucle s’arrête.
        {{
          data.predicted.length === trace.length - 1
            ? 'Tu as prédit toutes les étapes !'
            : 'Recommence et prédis chaque étape pour valider cette activité.'
        }}
      </div>
      <div
        v-if="feedback"
        class="feedback prediction-feedback"
        :class="good ? 'positive' : 'try-again'"
        role="status"
      >
        {{ feedback }}
      </div>
      <details class="comparison">
        <summary>Voir le tableau des tours</summary>
        <p class="small">
          Les états que tu as déjà atteints sont conservés dans ce tableau. Pour suivre chaque
          ligne, utilise « Observer le code ».
        </p>
        <table>
          <caption>
            État initial et états après chaque rangement
          </caption>
          <thead>
            <tr>
              <th>Étape</th>
              <th>Rangés ce tour</th>
              <th>Restants</th>
              <th>Boîtes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(t, i) in trace.slice(0, data.index + 1)" :key="i">
              <td>{{ i }}</td>
              <td>{{ t.moved }}</td>
              <td>{{ t.remaining }}</td>
              <td>{{ t.boxes }}</td>
            </tr>
          </tbody>
        </table>
      </details>
      <p class="small muted" aria-live="polite">
        État {{ data.index }} : {{ state.remaining }} livres restants et {{ state.boxes }} boîte(s).
        {{ data.predicted.length }} / {{ trace.length - 1 }} prédictions réussies.
      </p>
      <button
        v-if="data.index > 0"
        class="text-link"
        @click="
          data.index = 0;
          feedback = '';
        "
      >
        Revenir au début des prédictions
      </button>
    </template>
  </div>
</template>
<style scoped>
.learning-mode-switch {
  display: flex;
  gap: 8px;
  padding: 5px;
  background: #f0ecf8;
  border: 1px solid #e8e0f2;
  border-radius: 11px;
  margin: 20px 0;
}
.learning-mode-switch button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 7px;
  padding: 11px 12px;
  border: 1px solid transparent;
  background: transparent;
  color: #756282;
  border-radius: 8px;
  min-height: 44px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  min-width: 0;
}
.learning-mode-switch button.active {
  background: white;
  border-color: #ddd2ed;
  color: #62508b;
  box-shadow: 0 2px 5px #44306b08;
}
@media (max-width: 767px) {
  .learning-mode-switch {
    gap: 4px;
    padding: 4px;
  }
  .learning-mode-switch button {
    font-size: 11px;
    padding: 10px 7px;
  }
  .learning-mode-switch button > svg {
    display: none;
  }
}
</style>

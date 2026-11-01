<script setup>
import { computed, ref } from 'vue';
import ManualPacking from '../ManualPacking.vue';
import { understandingFeedback } from '../../domain/learning.js';
const props = defineProps({ round: Number, data: Object });
const emit = defineEmits(['success']);
const n = computed(() => (props.round === 0 ? 13 : 19)),
  capacity = computed(() => (props.round === 0 ? 6 : 5));
props.data.selected ||= [];
props.data.expected ??= '';
const feedback = ref(''),
  good = ref(false);
function toggle(id) {
  const s = props.data.selected;
  s.includes(id) ? s.splice(s.indexOf(id), 1) : s.push(id);
  feedback.value = '';
  good.value = false;
}
function verify() {
  const result = understandingFeedback(
    props.data.selected,
    props.data.expected,
    n.value,
    capacity.value
  );
  good.value = result.success;
  feedback.value = result.message;
  if (good.value) emit('success');
}
</script>
<template>
  <div>
    <p class="activity-prompt">
      La bibliothèque range <strong>{{ n }} livres</strong>. Une boîte contient au maximum
      <strong>{{ capacity }} livres</strong>. Combien de boîtes faut-il au minimum ?
    </p>
    <h3 class="activity-question">Quelles sont les deux données utiles ?</h3>
    <p class="small muted">Sélectionne-les, puis prévois le résultat.</p>
    <div class="choice-row">
      <button
        v-for="option in [
          { id: 'books', label: `${n} livres à ranger` },
          { id: 'capacity', label: `${capacity} places par boîte` },
          { id: 'color', label: 'Des couvertures colorées' }
        ]"
        :key="option.id"
        class="choice-button"
        :class="{ selected: data.selected.includes(option.id) }"
        :aria-pressed="data.selected.includes(option.id)"
        @click="toggle(option.id)"
      >
        {{ option.label }}
      </button>
    </div>
    <ManualPacking :n="n" :capacity="capacity" :data="data" /><label class="number-question"
      >Nombre de boîtes nécessaires<input
        v-model="data.expected"
        type="number"
        inputmode="numeric"
        min="0"
        max="30"
        @input="
          feedback = '';
          good = false;
        " /></label
    ><button class="button primary" @click="verify">Vérifier ma réponse</button>
    <div
      v-if="feedback"
      class="feedback answer-feedback"
      :class="good ? 'positive' : 'try-again'"
      role="status"
    >
      {{ feedback }}
    </div>
  </div>
</template>

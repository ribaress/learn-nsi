<script setup>
import { computed, useId } from 'vue';
import RichText from './RichText.vue';
const props = defineProps({ checkpoint: Object, entry: Object });
const id = useId();
const correct = computed(() => props.entry.answer === props.checkpoint.answer);
</script>
<template>
  <form class="reading-check" @submit.prevent="entry.submitted = true">
    <span class="eyebrow">Petite pause pour comprendre</span>
    <fieldset>
      <legend><RichText :text="checkpoint.question" /></legend>
      <label v-for="choice in checkpoint.choices" :key="choice.value"
        ><input
          type="radio"
          :name="id"
          :value="choice.value"
          v-model="entry.answer"
          required
          @change="entry.submitted = false"
        /><span>{{ choice.label }}</span></label
      >
    </fieldset>
    <button class="button secondary compact" type="submit">Vérifier ma compréhension</button>
    <div v-if="entry.submitted" class="reading-check-feedback" :class="{ correct }" role="status">
      <strong>{{ correct ? 'Bien compris.' : 'Reprenons ensemble.' }}</strong>
      <p><RichText :text="checkpoint.explanation" /></p>
    </div>
    <p class="small muted">
      Tu peux changer d’avis et réessayer. Cette pause t’aide à comprendre ; elle ne rapporte pas
      d’XP.
    </p>
  </form>
</template>

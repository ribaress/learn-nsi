<script setup>
import { ref, useId } from 'vue';
defineProps({ label: String, definition: String });
const open = ref(false),
  trigger = ref(null),
  position = ref({});
const id = useId();
function show() {
  const rect = trigger.value.getBoundingClientRect();
  const width = Math.min(275, innerWidth - 24);
  position.value = {
    left: `${Math.max(12, Math.min(rect.left, innerWidth - width - 12))}px`,
    top: rect.bottom + 135 > innerHeight ? undefined : `${rect.bottom + 8}px`,
    bottom: rect.bottom + 135 > innerHeight ? `${innerHeight - rect.top + 8}px` : undefined,
    width: `${width}px`
  };
  open.value = true;
}
</script>
<template>
  <span class="glossary-term"
    ><button
      ref="trigger"
      type="button"
      class="glossary-trigger"
      :aria-describedby="open ? id : undefined"
      :aria-expanded="open"
      @pointerenter="$event.pointerType === 'mouse' && show()"
      @pointerleave="$event.pointerType === 'mouse' && (open = false)"
      @focus="show"
      @blur="open = false"
      @click="show"
      @keydown.esc="open = false"
    >
      {{ label }}</button
    ><Teleport to="body"
      ><span v-if="open" :id="id" class="glossary-tooltip" role="tooltip" :style="position"
        ><strong>{{ label }}</strong
        >{{ definition }}</span
      ></Teleport
    ></span
  >
</template>

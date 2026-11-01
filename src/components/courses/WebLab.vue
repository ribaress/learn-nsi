<script setup>
import { ref, computed, onBeforeUnmount, watch } from 'vue';
const props = defineProps({ modelValue: String, checks: { type: Array, default: () => [] } });
const emit = defineEmits(['update:modelValue', 'success', 'attempt']);
const preview = ref(''),
  results = ref(null),
  frame = ref(null);
let token = '';
function run() {
  emit('attempt');
  results.value = null;
  token = crypto.randomUUID();
  const checkCode = `const checks=${JSON.stringify(props.checks).replaceAll('<', '\\u003c')};const results=checks.map(c=>{try{for(const action of c.actions||[]){const target=document.querySelector(action.selector);if(!target)throw Error('Élément absent');if(action.value!==undefined){target.value=action.value;target.dispatchEvent(new Event('input',{bubbles:true}));target.dispatchEvent(new Event('change',{bubbles:true}));}if(action.click)target.click();}const e=document.querySelector(c.selector);return {label:c.selector,passed:!!e && (c.text===undefined || e.textContent.trim()===c.text) && (c.attribute===undefined || e.getAttribute(c.attribute)===c.value)}}catch{return {label:c.selector,passed:false}}});parent.postMessage({atelierWeb:${JSON.stringify(token)},results},'*');`;
  preview.value = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; connect-src 'none'; form-action 'none';">${props.modelValue}<script>addEventListener('load',()=>{${checkCode}})<\/script>`;
}
function message(event) {
  if (
    event.source !== frame.value?.contentWindow ||
    event.data?.atelierWeb !== token ||
    !Array.isArray(event.data.results)
  )
    return;
  results.value = event.data.results;
  if (results.value.length && results.value.every((r) => r.passed)) emit('success');
}
window.addEventListener('message', message);
onBeforeUnmount(() => window.removeEventListener('message', message));
watch(
  () => props.modelValue,
  () => {
    results.value = null;
  }
);
const hasChecks = computed(() => props.checks.length > 0);
</script>
<template>
  <div class="web-lab">
    <label
      >Ton document HTML, CSS et JavaScript<textarea
        class="course-code-input"
        aria-label="Ton document Web"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        rows="12"
        spellcheck="false"
      ></textarea>
    </label>
    <button class="button primary" @click="run">Afficher et vérifier la page</button>
    <p class="small muted">
      Aperçu isolé de l’application : les images et scripts externes, fetch et formulaires sont
      bloqués. Utilise les exemples locaux ; les échanges HTTP du cours sont simulés.
    </p>
    <iframe
      v-if="preview"
      ref="frame"
      :srcdoc="preview"
      sandbox="allow-scripts"
      title="Aperçu de ta page Web"
      class="web-preview"
    ></iframe>
    <ul v-if="results && hasChecks" class="web-results">
      <li v-for="(result, index) in results" :key="index">
        {{ result.passed ? '✓' : 'À revoir' }} — {{ result.label }}
      </li>
    </ul>
    <p v-if="results && !hasChecks" class="feedback">
      Observe le rendu, essaie les boutons et explique ce qui change.
    </p>
  </div>
</template>

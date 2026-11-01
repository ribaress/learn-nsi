<script setup>
import { ref, computed, onBeforeUnmount, nextTick, watch } from 'vue';
import AppIcon from './AppIcon.vue';
import { PythonRunner } from '../python/runner.js';
const props = defineProps({
  modelValue: String,
  functionName: String,
  tests: Array,
  initialCode: String,
  files: Object,
  dataFiles: Object,
  mode: { type: String, default: 'python' },
  setup: String,
  expected: Array,
  verifyQuery: String,
  ordered: Boolean,
  contract: {
    type: String,
    default:
      'Utilise les paramètres et return, sans input(). Les résultats sont vérifiés sur les cas indiqués.'
  }
});
const emit = defineEmits(['update:modelValue', 'success', 'attempt']);
const editor = ref(null),
  status = ref('idle'),
  result = ref(null),
  error = ref(''),
  resetConfirm = ref(false);
const runner = new PythonRunner((s) => (status.value = s));
watch(
  () => props.modelValue,
  () => {
    result.value = null;
    error.value = '';
  }
);
const busy = computed(() => ['loading', 'running'].includes(status.value));
const labels = {
  idle: 'Python se chargera au premier essai.',
  loading: 'Chargement de Python… Le premier lancement peut prendre un moment.',
  running: 'Ton programme s’exécute…',
  ready: 'Python est prêt.',
  error: 'Tu peux corriger et réessayer.',
  stopped: 'Python est arrêté. Le prochain essai le relancera.'
};
async function run() {
  emit('attempt');
  error.value = '';
  result.value = null;
  try {
    const r = await runner.run({
      code: props.modelValue,
      functionName: props.functionName,
      tests: props.tests,
      files: props.files,
      dataFiles: props.dataFiles,
      mode: props.mode,
      setup: props.setup,
      expected: props.expected,
      verifyQuery: props.verifyQuery,
      ordered: props.ordered
    });
    result.value = r;
    error.value = r.error || '';
    if (r.results?.length && r.results.every((t) => t.passed)) emit('success');
  } catch (e) {
    error.value = e.message;
  }
}
async function insert(text) {
  const el = editor.value,
    start = el.selectionStart,
    end = el.selectionEnd;
  emit('update:modelValue', props.modelValue.slice(0, start) + text + props.modelValue.slice(end));
  await nextTick();
  el.focus();
  el.setSelectionRange(start + text.length, start + text.length);
}
async function indent(remove = false) {
  const el = editor.value,
    start = el.selectionStart,
    lineStart = props.modelValue.lastIndexOf('\n', start - 1) + 1;
  if (remove) {
    const count = props.modelValue.slice(lineStart).match(/^ {1,4}/)?.[0].length || 0;
    emit(
      'update:modelValue',
      props.modelValue.slice(0, lineStart) + props.modelValue.slice(lineStart + count)
    );
    await nextTick();
    el.focus();
    el.setSelectionRange(Math.max(lineStart, start - count), Math.max(lineStart, start - count));
  } else {
    emit(
      'update:modelValue',
      props.modelValue.slice(0, lineStart) + '    ' + props.modelValue.slice(lineStart)
    );
    await nextTick();
    el.focus();
    el.setSelectionRange(start + 4, start + 4);
  }
}
function keydown(e) {
  if (busy.value) return;
  if (e.key === 'Enter') {
    e.preventDefault();
    const start = editor.value.selectionStart,
      line = props.modelValue.slice(0, start).split('\n').pop(),
      spaces = line.match(/^ */)[0] + (line.trimEnd().endsWith(':') ? '    ' : '');
    insert('\n' + spaces);
  }
}
onBeforeUnmount(() => runner.dispose());
</script>
<template>
  <section class="python-editor">
    <div class="editor-heading">
      <div>
        <AppIcon name="code" />
        <h3>{{ mode === 'sql' ? 'Ton atelier SQL' : 'Ton espace Python' }}</h3>
      </div>
      <span class="runtime-dot" :class="{ ready: status === 'ready' }"></span>
    </div>
    <p class="small muted">
      {{
        mode === 'sql'
          ? 'SQLite exécute ta requête sur une copie neuve des données à chaque essai.'
          : contract
      }}
    </p>
    <p class="small muted">
      {{
        mode === 'sql'
          ? 'Tab change de commande. La requête peut occuper plusieurs lignes.'
          : 'Tab change de commande. Utilise les boutons pour indenter ton code.'
      }}
    </p>
    <div v-if="mode !== 'sql'" class="editor-toolbar">
      <button @click="indent()" title="Ajouter quatre espaces">Indenter</button
      ><button @click="indent(true)">Désindenter</button
      ><button @click="insert('    return ')">return</button
      ><button @click="insert('    while restants > 0:\n        ')">while</button
      ><button
        class="reset-code"
        @click="resetConfirm = !resetConfirm"
        aria-label="Revenir au code de départ"
      >
        <AppIcon name="restart" :size="17" />
      </button>
    </div>
    <div v-if="resetConfirm" class="inline-confirm">
      <p>Remplacer ton code par le modèle de départ ?</p>
      <button
        class="button secondary compact"
        @click="
          emit('update:modelValue', initialCode);
          resetConfirm = false;
        "
      >
        Remplacer le code</button
      ><button class="text-link" @click="resetConfirm = false">Annuler</button>
    </div>
    <div class="code-area">
      <div class="line-numbers" aria-hidden="true">
        <span v-for="n in modelValue.split('\n').length" :key="n">{{ n }}</span>
      </div>
      <textarea
        ref="editor"
        :readonly="busy"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        @keydown="keydown"
        :aria-label="mode === 'sql' ? 'Ta requête SQL' : 'Ton code Python'"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        :rows="Math.max(10, Math.min(20, modelValue.split('\n').length + 1))"
        wrap="off"
      ></textarea>
    </div>
    <div class="python-controls">
      <button class="button primary" :disabled="busy" @click="run">
        <AppIcon name="play" :size="19" />{{ busy ? 'En cours…' : 'Exécuter les tests' }}</button
      ><button class="button secondary" :disabled="!busy" @click="runner.stop()">
        <AppIcon name="stop" :size="17" />Arrêter
      </button>
    </div>
    <p class="runtime-status small" role="status" :aria-busy="busy">{{ labels[status] }}</p>
    <div v-if="error" class="python-error feedback try-again" role="alert">
      <strong>Un indice pour corriger</strong>
      <pre>{{ error }}</pre>
    </div>
    <section v-if="result?.results" class="python-results">
      <h4>
        {{ result.results.filter((t) => t.passed).length }} / {{ result.results.length }} tests
        réussis
      </h4>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Appel</th>
              <th>Attendu</th>
              <th>Obtenu</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(t, i) in result.results"
              :key="i"
              :class="t.passed ? 'test-pass' : 'test-fail'"
            >
              <td>
                <code>{{
                  mode === 'sql'
                    ? 'Résultat de la requête'
                    : `${functionName}(${t.args.map((a) => JSON.stringify(a)).join(', ')})`
                }}</code>
                <details v-if="t.error">
                  <summary>Voir l’erreur</summary>
                  <pre>{{ t.error }}</pre>
                </details>
              </td>
              <td>
                <code>{{ t.expectedError || JSON.stringify(t.expected) }}</code>
              </td>
              <td>
                <AppIcon :name="t.passed ? 'check' : 'close'" :size="15" />{{
                  t.actual === null ? 'None / NULL' : JSON.stringify(t.actual)
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="result.results.every((t) => t.passed)" class="feedback positive">
        Bien vu ! Ton programme respecte les résultats attendus sur ces tests. Tu peux essayer une
        autre version et comparer.
      </p>
    </section>
    <details class="python-console" :open="Boolean(result?.stdout || result?.stderr)">
      <summary>Console · affichages de ton programme</summary>
      <pre>{{
        result?.stdout ||
        result?.stderr ||
        'Les messages de print() apparaîtront ici. La sortie est limitée à 10 000 caractères.'
      }}</pre>
    </details>
    <details v-if="mode !== 'sql'" class="comparison">
      <summary>Petit mémo Python</summary>
      <dl>
        <dt><code>=</code></dt>
        <dd>Associer une valeur à un nom : <code>boites = 0</code>.</dd>
        <dt><code>while</code></dt>
        <dd>Répéter tant que la condition est vraie. Le bloc est indenté.</dd>
        <dt><code>min(a, b)</code></dt>
        <dd>Choisir le plus petit des deux nombres.</dd>
        <dt><code>return</code></dt>
        <dd>Renvoyer un résultat et terminer l’appel de la fonction.</dd>
        <dt><code>//</code> et <code>%</code></dt>
        <dd>
          Quotient entier et reste. Exemple : <code>13 // 6</code> vaut 2 et
          <code>13 % 6</code> vaut 1.
        </dd>
      </dl>
    </details>
  </section>
</template>

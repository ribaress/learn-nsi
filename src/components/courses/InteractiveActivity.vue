<script setup>
import SequenceLab from './SequenceLab.vue';
import GraphLab from './GraphLab.vue';
import DataLab from './DataLab.vue';
import WebLab from './WebLab.vue';
const props = defineProps({ activity: Object, state: Object });
const sequence = ['sort', 'search', 'dynamic', 'text-search', 'recursion', 'cpu', 'trace'];
const graph = ['network', 'graph', 'map', 'tree'];
function observe() {
  props.state.observed = true;
}
</script>
<template>
  <section class="interactive-activity">
    <span class="eyebrow">Laboratoire interactif</span>
    <h2>Je prévois, j’essaie, j’explique</h2>
    <p>{{ activity.prompt }}</p>
    <label class="reflection-label"
      >{{ activity.prediction
      }}<textarea
        v-model="state.prediction"
        rows="2"
        placeholder="Avant de manipuler, je pense que…"
      ></textarea>
    </label>
    <SequenceLab
      v-if="sequence.includes(activity.type)"
      :type="activity.type"
      :config="activity.config"
      :state="state"
      @observe="observe"
    />
    <GraphLab
      v-else-if="graph.includes(activity.type)"
      :type="activity.type"
      :config="activity.config"
      :state="state"
      @observe="observe"
    />
    <WebLab
      v-else-if="activity.type === 'web'"
      :model-value="state.html ?? activity.config.html"
      @update:model-value="state.html = $event"
      @attempt="observe"
    />
    <DataLab
      v-else
      :type="activity.type"
      :config="activity.config"
      :state="state"
      @observe="observe"
    />
    <details class="comparison">
      <summary>Comprendre ce que montre la manipulation</summary>
      <p>{{ activity.explanation }}</p>
    </details>
    <label class="reflection-label"
      >Que constates-tu ? Explique la différence avec ta prévision.<textarea
        v-model="state.explanation"
        rows="3"
        placeholder="J’ai changé… J’ai observé… Cela s’explique par…"
      ></textarea>
    </label>
    <p class="small muted">
      Manipuler aide à comprendre. Les exercices et ta relecture complètent le bilan.
    </p>
  </section>
</template>

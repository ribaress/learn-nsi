<script setup>
import { computed } from 'vue';
import { graphOrder, routePath, treeOrder } from '../../domain/course-learning.js';
const props = defineProps({ type: String, config: Object, state: Object });
const emit = defineEmits(['observe']);
const fallback = {
  nodes: [
    { id: 'A', label: 'Départ', x: 15, y: 50 },
    { id: 'B', label: 'Relais', x: 50, y: 20 },
    { id: 'C', label: 'Arrivée', x: 85, y: 50 }
  ],
  edges: [
    ['A', 'B', 1],
    ['B', 'C', 1],
    ['A', 'C', 4]
  ],
  start: 'A',
  goal: 'C'
};
const graph = computed(() => (props.config.nodes?.length ? props.config : fallback));
const nodes = computed(() => {
  if (props.type !== 'tree')
    return graph.value.nodes.map((n, i) => ({ ...n, x: n.x ?? 15 + i * 25, y: n.y ?? 50 }));
  const result = [];
  function visit(node, x, y, gap, parent) {
    if (!node || result.length >= 63) return;
    const id = String(result.length);
    result.push({ id, label: String(node.value), value: node.value, x, y, parent });
    visit(node.left, x - gap, y + 22, gap / 2, id);
    visit(node.right, x + gap, y + 22, gap / 2, id);
  }
  visit(props.config.tree, 50, 12, 24);
  return result;
});
const edges = computed(() =>
  props.type === 'tree'
    ? nodes.value.filter((n) => n.parent !== undefined).map((n) => [n.parent, n.id, 1])
    : graph.value.edges
);
const mode = computed({
  get: () => props.state.mode || (props.type === 'tree' ? 'infix' : 'route'),
  set: (value) => {
    props.state.mode = value;
    props.state.cursor = 0;
  }
});
const order = computed(() => {
  if (props.type === 'tree') return treeOrder(props.config.tree, mode.value);
  if (['bfs', 'dfs'].includes(mode.value)) return graphOrder(graph.value, mode.value);
  return routePath(graph.value, mode.value === 'weighted');
});
const cursor = computed(() => Math.min(props.state.cursor || 0, order.value.length));
const shown = computed(() => order.value.slice(0, cursor.value));
const path = computed(() =>
  Array.isArray(props.state.path) && props.state.path.length
    ? props.state.path
    : [graph.value.start]
);
const nodeById = (id) => nodes.value.find((n) => n.id === id);
function selectNode(id) {
  const last = path.value.at(-1);
  if (edges.value.some(([a, b]) => (a === last && b === id) || (b === last && a === id))) {
    props.state.path = [...path.value, id].slice(-40);
    props.state.message =
      id === graph.value.goal
        ? 'Destination atteinte. Compare ton chemin avec le chemin calculé.'
        : 'Un saut supplémentaire : le paquet passe par un voisin.';
    emit('observe');
  } else
    props.state.message =
      'Ces deux points ne sont pas reliés directement. Choisis un voisin du dernier point.';
}
const isActive = (n) =>
  props.type === 'tree'
    ? shown.value.includes(n.value)
    : shown.value.includes(n.id) || path.value.includes(n.id);
</script>
<template>
  <div class="graph-lab">
    <label
      >Ce que j’observe<select v-model="mode">
        <template v-if="type === 'tree'"
          ><option value="infix">Parcours infixe (gauche, racine, droite)</option>
          <option value="prefix">Parcours préfixe</option>
          <option value="suffix">Parcours suffixe</option>
          <option value="breadth">Parcours en largeur</option></template
        ><template v-else
          ><option value="route">Le moins de sauts</option>
          <option value="weighted">Le coût total le plus faible</option>
          <option value="bfs">Parcours en largeur</option>
          <option value="dfs">Parcours en profondeur</option></template
        >
      </select></label
    >
    <svg
      class="graph-canvas"
      viewBox="0 0 100 110"
      role="img"
      :aria-label="type === 'tree' ? 'Arbre à parcourir' : 'Réseau de points reliés'"
    >
      <g v-for="([a, b, w], index) in edges" :key="index">
        <line
          v-if="nodeById(a) && nodeById(b)"
          :x1="nodeById(a).x"
          :y1="nodeById(a).y"
          :x2="nodeById(b).x"
          :y2="nodeById(b).y"
        />
        <text
          v-if="type !== 'tree' && nodeById(a) && nodeById(b)"
          :x="(nodeById(a).x + nodeById(b).x) / 2"
          :y="(nodeById(a).y + nodeById(b).y) / 2 - 2"
          class="edge-cost"
        >
          {{ w ?? 1 }}
        </text>
      </g>
      <g v-for="node in nodes" :key="node.id" :class="{ active: isActive(node) }">
        <circle :cx="node.x" :cy="node.y" r="6" />
        <text :x="node.x" :y="node.y + 1.5">{{ type === 'tree' ? node.label : node.id }}</text>
      </g>
    </svg>
    <p v-if="type === 'tree'" class="small">
      {{ nodes.length }} nœuds. Le parcours choisi visitera chaque nœud une fois.
    </p>
    <div v-else>
      <p class="small">
        Construis ton chemin à partir de {{ graph.start }} vers {{ graph.goal }} :
      </p>
      <div class="lab-controls">
        <button
          v-for="node in nodes"
          :key="node.id"
          class="button secondary compact"
          @click="selectNode(node.id)"
        >
          {{ node.id }} · {{ node.label || node.id }}
        </button>
      </div>
      <p class="lab-observation" aria-live="polite">
        Ton chemin : {{ path.join(' → ') }}. {{ state.message }}
      </p>
      <button
        class="text-link"
        @click="
          state.path = [graph.start];
          state.message = '';
        "
      >
        Effacer mon chemin
      </button>
    </div>
    <div class="lab-controls">
      <button
        class="button primary compact"
        :disabled="cursor >= order.length"
        @click="
          state.cursor = cursor + 1;
          emit('observe');
        "
      >
        Une étape du parcours</button
      ><button class="text-link" @click="state.cursor = 0">Revenir au début</button>
    </div>
    <p class="lab-observation" aria-live="polite">
      {{ shown.length ? shown.join(' → ') : 'Prévois le premier point, puis avance d’une étape.'
      }}{{ cursor === order.length ? ' · Parcours terminé.' : '' }}
    </p>
    <p v-if="!order.length" class="feedback">Aucun chemin ne relie ces points.</p>
  </div>
</template>

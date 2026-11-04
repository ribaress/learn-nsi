<script setup>
import { computed, ref } from 'vue';
const props = defineProps({ type: String, config: Object, state: Object });
const emit = defineEmits(['observe']);
const command = ref(''),
  item = ref('C');
const observe = () => emit('observe');
const bits = computed(() => Math.max(1, Math.min(16, props.config.bits || 8)));
const bitValue = computed(() =>
  Math.max(0, Math.min(2 ** bits.value - 1, Number(props.state.value ?? props.config.value ?? 13)))
);
const binary = computed(() => bitValue.value.toString(2).padStart(bits.value, '0'));
const signedValue = computed(() =>
  bitValue.value >= 2 ** (bits.value - 1) ? bitValue.value - 2 ** bits.value : bitValue.value
);
function toggleBit(index) {
  props.state.value = bitValue.value ^ (2 ** (bits.value - index - 1));
  observe();
}
const gate = computed({
  get: () => props.state.gate || props.config.gate || 'AND',
  set: (v) => {
    props.state.gate = v;
    observe();
  }
});
function logical(a, b) {
  return gate.value === 'NOT'
    ? !a
    : gate.value === 'OR'
      ? a || b
      : gate.value === 'XOR'
        ? a !== b
        : a && b;
}
const color = computed(() => props.state.color || props.config.color || [120, 80, 40]);
function changeColor(index, value) {
  const next = [...color.value];
  next[index] = Number(value);
  props.state.color = next;
  observe();
}
const transformed = computed(() => {
  if (props.state.filter === 'negative') return color.value.map((c) => 255 - c);
  if (props.state.filter === 'gray') {
    const gray = Math.round(color.value.reduce((a, b) => a + b, 0) / 3);
    return [gray, gray, gray];
  }
  return color.value;
});
const rgb = (values) => `rgb(${values.join(',')})`;
const temperature = computed({
  get: () => props.state.temperature ?? props.config.initial ?? 18,
  set: (v) => {
    props.state.temperature = Number(v);
    observe();
  }
});
const threshold = computed({
  get: () => props.state.threshold ?? props.config.threshold ?? 20,
  set: (v) => {
    props.state.threshold = Number(v);
    observe();
  }
});
const rows = computed(() => {
  const column = Number(props.state.column || 0),
    filter = String(props.state.filterText || '').toLocaleLowerCase('fr');
  const result = (props.config.rows || []).filter((row) =>
    String(row[column]).toLocaleLowerCase('fr').includes(filter)
  );
  if (props.state.sortDirection)
    result.sort(
      (a, b) =>
        (typeof a[column] === 'number'
          ? a[column] - b[column]
          : String(a[column]).localeCompare(String(b[column]), 'fr')) *
        (props.state.sortDirection === 'desc' ? -1 : 1)
    );
  return result;
});
const stack = computed(() => props.state.items || props.config.values || ['A', 'B']);
function push() {
  if (item.value.trim() && stack.value.length < 12) {
    props.state.items = [...stack.value, item.value.trim()];
    props.state.message = `${item.value.trim()} entre dans la structure.`;
    observe();
  }
}
function pop() {
  if (!stack.value.length) {
    props.state.message = 'La structure est vide : on ne peut pas retirer un élément.';
    return;
  }
  const next = [...stack.value];
  const value = props.config.mode === 'queue' ? next.shift() : next.pop();
  props.state.items = next;
  props.state.message = `L’élément ${value} est sorti (${props.config.mode === 'queue' ? 'premier entré, premier sorti' : 'dernier entré, premier sorti'}).`;
  observe();
}
const target = computed(() => ({
  x: Number(props.state.x ?? props.config.target?.x ?? 3),
  y: Number(props.state.y ?? props.config.target?.y ?? 3)
}));
const points = computed(() => props.config.points || []);
const nearest = computed(() =>
  points.value
    .map((p) => ({ ...p, distance: Math.hypot(p.x - target.value.x, p.y - target.value.y) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, Number(props.state.k || props.config.k || 3))
);
const classification = computed(() => {
  const counts = new Map();
  for (const p of nearest.value) counts.set(p.label, (counts.get(p.label) || 0) + 1);
  return (
    [...counts].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))[0]?.[0] ??
    '—'
  );
});
const locks = computed(() => props.state.locks || {}),
  waiting = computed(() => props.state.waiting || {});
const deadlock = computed(
  () =>
    waiting.value.P1 &&
    waiting.value.P2 &&
    locks.value[waiting.value.P1] === 'P2' &&
    locks.value[waiting.value.P2] === 'P1'
);
function acquire(pid, resource) {
  props.state.locks ||= {};
  props.state.waiting ||= {};
  const owner = props.state.locks[resource];
  if (!owner || owner === pid) {
    props.state.locks[resource] = pid;
    delete props.state.waiting[pid];
    props.state.message = `${pid} possède ${resource}.`;
  } else {
    props.state.waiting[pid] = resource;
    props.state.message = `${pid} attend ${resource}, détenue par ${owner}.`;
  }
  observe();
}
function release(pid) {
  props.state.locks = Object.fromEntries(
    Object.entries(locks.value).filter(([, owner]) => owner !== pid)
  );
  if (props.state.waiting) delete props.state.waiting[pid];
  props.state.message = `${pid} libère ses ressources. Un processus en attente peut redemander la ressource.`;
  observe();
}
const message = computed({
  get: () => props.state.messageText ?? props.config.message ?? 'BONJOUR',
  set: (v) => {
    props.state.messageText = v;
    observe();
  }
});
const shift = computed({
  get: () => props.state.shift ?? props.config.shift ?? 3,
  set: (v) => {
    props.state.shift = Number(v);
    observe();
  }
});
const cipher = computed(() =>
  message.value
    .toUpperCase()
    .replace(/[A-Z]/g, (c) => String.fromCharCode(65 + ((c.charCodeAt(0) - 65 + shift.value) % 26)))
);
const cryptoSteps = [
  'Bob garde sa clé privée et publie sa clé publique.',
  'Alice crée une clé symétrique de session.',
  'Alice utilise la clé publique de Bob pour protéger l’échange de la clé de session.',
  'Bob utilise sa clé privée. Les messages suivants sont chiffrés avec la clé symétrique.'
];
const files = computed(
  () =>
    props.state.shellFiles || {
      '/home': null,
      '/home/eleve': null,
      '/home/eleve/notes.txt': 'Bonjour ! Ce fichier appartient à eleve.',
      '/home/eleve/cours': null,
      '/home/eleve/cours/python.txt': 'Une fonction reçoit des paramètres et renvoie un résultat.'
    }
);
function resolvePath(text) {
  const parts = (text.startsWith('/') ? text : `${props.state.cwd || '/home/eleve'}/${text}`).split(
      '/'
    ),
    out = [];
  for (const part of parts) {
    if (part === '..') out.pop();
    else if (part && part !== '.') out.push(part);
  }
  return '/' + out.join('/');
}
function shell() {
  const line = command.value.trim();
  if (!line) return;
  const [cmd, ...args] = (line.match(/"[^"]*"|\S+/g) || []).map((p) => p.replace(/^"|"$/g, ''));
  const cwd = props.state.cwd || '/home/eleve';
  let output = '';
  const path = resolvePath(args[0] || '.');
  if (cmd === 'help')
    output =
      'pwd · ls [chemin] · ls -l · cd chemin · cat fichier · mkdir nom · touch nom · chmod 600 fichier';
  else if (cmd === 'pwd') output = cwd;
  else if (cmd === 'ls') {
    const dir = args[0] === '-l' ? cwd : path;
    const prefix = dir === '/' ? '/' : dir + '/';
    output =
      Object.entries(files.value)
        .filter(([name]) => name.startsWith(prefix) && !name.slice(prefix.length).includes('/'))
        .map(
          ([name, value]) =>
            `${args[0] === '-l' ? `${value === null ? 'd' : '-'} ${props.state.permissions?.[name] || '644'} eleve ` : ''}${name.slice(prefix.length)}`
        )
        .join('\n') || '(dossier vide)';
  } else if (cmd === 'cd') {
    if (path === '/' || files.value[path] === null) props.state.cwd = path;
    else output = 'Ce dossier n’existe pas.';
  } else if (cmd === 'cat') {
    const mode = props.state.permissions?.[path] || '644';
    output =
      files.value[path] === undefined
        ? 'Fichier introuvable.'
        : files.value[path] === null
          ? 'C’est un dossier.'
          : !(Number(mode[0]) & 4)
            ? 'Permission de lecture refusée au propriétaire.'
            : files.value[path];
  } else if (cmd === 'mkdir' || cmd === 'touch') {
    const parent = path.slice(0, path.lastIndexOf('/')) || '/';
    if (files.value[path] !== undefined) output = 'Ce nom existe déjà.';
    else if (parent !== '/' && files.value[parent] !== null)
      output = 'Le dossier parent n’existe pas.';
    else {
      props.state.shellFiles = { ...files.value, [path]: cmd === 'mkdir' ? null : '' };
      output = 'Créé dans le système de fichiers simulé.';
    }
  } else if (cmd === 'chmod') {
    const file = resolvePath(args[1] || '');
    if (!/^[0-7]{3}$/.test(args[0] || '') || files.value[file] === undefined)
      output = 'Exemple : chmod 600 notes.txt. Le fichier doit exister.';
    else {
      props.state.permissions = { ...props.state.permissions, [file]: args[0] };
      output = `Droits ${args[0]} appliqués au fichier simulé.`;
    }
  } else
    output = 'Commande non reconnue dans ce modèle. Tape help pour voir les commandes disponibles.';
  props.state.shellLog = [...(props.state.shellLog || []), `$ ${line}\n${output}`].slice(-20);
  command.value = '';
  observe();
}
</script>
<template>
  <div class="data-lab">
    <template v-if="type === 'bits'">
      <p>
        Clique sur une case pour passer de 0 à 1, ou de 1 à 0. Le petit nombre indique la valeur de
        cette case. On additionne les valeurs des cases à 1.
      </p>
      <div class="bit-row">
        <button
          v-for="(bit, index) in binary"
          :key="index"
          :aria-label="`Bit de poids ${2 ** (bits - index - 1)} : ${bit}`"
          :aria-pressed="bit === '1'"
          @click="toggleBit(index)"
        >
          <strong>{{ bit }}</strong
          ><small>{{ 2 ** (bits - index - 1) }}</small>
        </button>
      </div>
      <p class="lab-observation" aria-live="polite">
        {{ config.signed ? 'Lecture non signée' : 'Valeur représentée' }} : {{ bitValue }}.<template
          v-if="config.signed"
        >
          Complément à deux sur {{ bits }} bits : {{ signedValue }}.</template
        ><template v-if="config.showHex">
          En hexadécimal :
          {{
            bitValue
              .toString(16)
              .toUpperCase()
              .padStart(Math.ceil(bits / 4), '0')
          }}.</template
        >
      </p>
      <p class="small">
        {{
          binary
            .split('')
            .map((bit, i) => `${bit} × ${2 ** (bits - i - 1)}`)
            .join(' + ')
        }}
        = {{ bitValue }}
      </p>
    </template>
    <template v-else-if="type === 'logic'">
      <label
        >Porte logique<select v-model="gate">
          <option>AND</option>
          <option>OR</option>
          <option>XOR</option>
          <option>NOT</option>
        </select></label
      >
      <div class="lab-controls">
        <button
          class="button secondary"
          :aria-pressed="!!state.a"
          @click="
            state.a = !state.a;
            observe();
          "
        >
          A = {{ state.a ? 1 : 0 }}</button
        ><button
          v-if="gate !== 'NOT'"
          class="button secondary"
          :aria-pressed="!!state.b"
          @click="
            state.b = !state.b;
            observe();
          "
        >
          B = {{ state.b ? 1 : 0 }}</button
        ><strong class="logic-output">Sortie : {{ logical(!!state.a, !!state.b) ? 1 : 0 }}</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th>A</th>
            <th v-if="gate !== 'NOT'">B</th>
            <th>{{ gate }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(pair, i) in gate === 'NOT'
              ? [
                  [false, false],
                  [true, false]
                ]
              : [
                  [false, false],
                  [false, true],
                  [true, false],
                  [true, true]
                ]"
            :key="i"
          >
            <td>{{ Number(pair[0]) }}</td>
            <td v-if="gate !== 'NOT'">{{ Number(pair[1]) }}</td>
            <td>{{ Number(logical(...pair)) }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="type === 'pixels'">
      <div class="lab-inputs">
        <label v-for="(name, index) in ['Rouge', 'Vert', 'Bleu']" :key="name"
          >{{ name }} : {{ color[index]
          }}<input
            type="range"
            min="0"
            max="255"
            :value="color[index]"
            @input="changeColor(index, $event.target.value)" /></label
        ><label
          >Transformation<select v-model="state.filter" @change="observe">
            <option :value="undefined">Aucune</option>
            <option value="negative">Négatif : 255 − composante</option>
            <option value="gray">Gris : moyenne des composantes</option>
          </select></label
        >
      </div>
      <div class="pixel-comparison">
        <div>
          <div class="color-pixel" :style="{ background: rgb(color) }"></div>
          <strong>Avant : {{ color.join(', ') }}</strong>
        </div>
        <span>→</span>
        <div>
          <div class="color-pixel" :style="{ background: rgb(transformed) }"></div>
          <strong>Après : {{ transformed.join(', ') }}</strong>
        </div>
      </div>
      <p class="small">
        Un pixel est un triplet. Le même calcul s’applique à chacun des pixels d’une image.
      </p>
    </template>
    <template v-else-if="type === 'sensor'">
      <label
        >Température mesurée : {{ temperature }} °C<input
          v-model="temperature"
          type="range"
          min="0"
          max="40" /></label
      ><label
        >Seuil : {{ threshold }} °C<input v-model="threshold" type="range" min="0" max="40"
      /></label>
      <div class="sensor-chain">
        <span
          >Capteur<br /><strong>{{ temperature }} °C</strong></span
        ><span>→</span
        ><span
          >Traitement<br /><code>{{ temperature }} &lt; {{ threshold }}</code></span
        ><span>→</span
        ><span :class="{ heating: temperature < threshold }"
          >Chauffage<br /><strong>{{ temperature < threshold ? 'Allumé' : 'Éteint' }}</strong></span
        >
      </div>
      <p class="lab-observation">
        Au seuil exact, la condition « strictement inférieur » est fausse. Le programme commande un
        actionneur à partir d’une mesure.
      </p>
    </template>
    <template v-else-if="type === 'table'">
      <div class="lab-inputs">
        <label
          >Colonne<select v-model="state.column" @change="observe">
            <option v-for="(col, index) in config.columns" :key="col" :value="index">
              {{ col }}
            </option>
          </select></label
        ><label
          >Contient<input
            v-model="state.filterText"
            @input="observe"
            placeholder="Filtrer les lignes" /></label
        ><label
          >Ordre<select v-model="state.sortDirection" @change="observe">
            <option :value="undefined">Ordre initial</option>
            <option value="asc">Croissant</option>
            <option value="desc">Décroissant</option>
          </select></label
        >
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th v-for="col in config.columns" :key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i">
              <td v-for="(value, j) in row" :key="j">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="lab-observation">
        {{ rows.length }} ligne(s) retenue(s) sur {{ config.rows.length }}. Filtrer conserve les
        descripteurs ; trier change l’ordre.
      </p>
    </template>
    <template v-else-if="type === 'stack'">
      <p>
        {{
          config.mode === 'queue'
            ? 'File : premier entré, premier sorti (FIFO).'
            : 'Pile : dernier entré, premier sorti (LIFO).'
        }}
      </p>
      <div class="lab-values">
        <span v-for="(value, i) in stack" :key="i" class="lab-cell">{{ value }}</span
        ><span v-if="!stack.length">Structure vide</span>
      </div>
      <div class="lab-inputs">
        <label>Nouvel élément<input v-model="item" maxlength="20" /></label>
      </div>
      <div class="lab-controls">
        <button class="button primary compact" @click="push">
          {{ config.mode === 'queue' ? 'Enfiler' : 'Empiler' }}</button
        ><button class="button secondary compact" @click="pop">
          {{ config.mode === 'queue' ? 'Défiler' : 'Dépiler' }}</button
        ><button
          class="text-link"
          @click="
            state.items = [...(config.values || ['A', 'B'])];
            state.message = '';
          "
        >
          Recommencer
        </button>
      </div>
      <p class="lab-observation" role="status">
        {{ state.message || 'Prévois quel élément sortira en premier.' }}
      </p>
    </template>
    <template v-else-if="type === 'knn'">
      <div class="lab-inputs">
        <label
          >Position x<input
            type="number"
            min="0"
            max="10"
            step="0.5"
            :value="target.x"
            @input="
              state.x = Number($event.target.value);
              observe();
            " /></label
        ><label
          >Position y<input
            type="number"
            min="0"
            max="10"
            step="0.5"
            :value="target.y"
            @input="
              state.y = Number($event.target.value);
              observe();
            " /></label
        ><label
          >Nombre k<input
            type="number"
            min="1"
            :max="points.length"
            :value="state.k || config.k || 3"
            @input="
              state.k = Math.max(1, Math.min(points.length, Number($event.target.value)));
              observe();
            "
        /></label>
      </div>
      <svg
        class="knn-canvas"
        viewBox="-1 -1 12 12"
        role="img"
        aria-label="Nuage de points et point à classer"
      >
        <g v-for="(point, i) in points" :key="i">
          <line
            v-if="
              nearest.some((p) => p.x === point.x && p.y === point.y && p.label === point.label)
            "
            :x1="point.x"
            :y1="10 - point.y"
            :x2="target.x"
            :y2="10 - target.y"
          />
          <circle :cx="point.x" :cy="10 - point.y" r="0.25" />
          <text :x="point.x + 0.35" :y="10 - point.y">{{ point.label }}</text>
        </g>
        <path
          :d="`M ${target.x - 0.3} ${10 - target.y} h .6 M ${target.x} ${9.7 - target.y} v .6`"
          stroke="#b8860b"
          stroke-width=".15"
        />
      </svg>
      <p class="lab-observation">
        Classe prédite : {{ classification }}. Les voisins les plus proches sont
        {{ nearest.map((p) => `${p.label} (distance ${p.distance.toFixed(2)})`).join(', ') }}.
      </p>
      <p class="small">
        En cas d’égalité, ce modèle choisit la première étiquette dans l’ordre alphabétique. Ce
        choix doit être précisé dans un vrai programme.
      </p>
    </template>
    <template v-else-if="type === 'process'">
      <p>
        Deux processus utilisent deux ressources exclusives. Fais-les demander les ressources dans
        des ordres différents.
      </p>
      <div class="process-grid">
        <div v-for="pid in ['P1', 'P2']" :key="pid">
          <h4>{{ pid }}</h4>
          <button
            v-for="resource in ['A', 'B']"
            :key="resource"
            class="button secondary compact"
            @click="acquire(pid, resource)"
          >
            Demander {{ resource }}</button
          ><button class="text-link" @click="release(pid)">Libérer les ressources</button>
          <p>{{ waiting[pid] ? `Attend ${waiting[pid]}` : 'Prêt ou en exécution' }}</p>
        </div>
      </div>
      <p>Ressource A : {{ locks.A || 'libre' }} · Ressource B : {{ locks.B || 'libre' }}</p>
      <p class="lab-observation" role="status">
        {{
          deadlock
            ? 'Interblocage : chacun attend une ressource détenue par l’autre. Personne ne peut progresser.'
            : state.message || 'Les ressources sont libres.'
        }}
      </p>
      <button
        class="text-link"
        @click="
          state.locks = {};
          state.waiting = {};
          state.message = '';
        "
      >
        Réinitialiser le scénario
      </button>
    </template>
    <template v-else-if="type === 'crypto'">
      <label>Message<input v-model="message" maxlength="60" /></label
      ><label
        >Clé de décalage : {{ shift }}<input type="range" min="0" max="25" v-model="shift"
      /></label>
      <p class="lab-observation">{{ message.toUpperCase() }} → {{ cipher }}</p>
      <p class="small">
        Le décalage illustre une clé partagée. Il est facile à casser et ne représente pas la
        sécurité de HTTPS.
      </p>
      <h4>Et pour échanger une clé ?</h4>
      <button
        class="button secondary compact"
        @click="
          state.cryptoStep = ((state.cryptoStep || 0) + 1) % 4;
          observe();
        "
      >
        Étape suivante de l’échange
      </button>
      <p class="lab-observation">{{ cryptoSteps[state.cryptoStep || 0] }}</p>
      <p class="small">Schéma conceptuel simplifié ; il ne simule pas la négociation TLS réelle.</p>
    </template>
    <template v-else-if="type === 'shell'">
      <p class="small">
        Terminal pédagogique simulé : aucun fichier de ton ordinateur n’est modifié. Essaie
        <code>pwd</code>, <code>ls</code>, puis <code>cat notes.txt</code>.
      </p>
      <pre class="shell-output">{{
        (state.shellLog || ['$ help\npwd · ls · cd · cat · mkdir · touch · chmod']).join('\n\n')
      }}</pre>
      <form class="shell-input" @submit.prevent="shell">
        <label
          >Commande Linux<input
            v-model="command"
            autocomplete="off"
            spellcheck="false"
            placeholder="help" /></label
        ><button class="button primary compact">Exécuter la commande</button>
      </form>
    </template>
  </div>
</template>

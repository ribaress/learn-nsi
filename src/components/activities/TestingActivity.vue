<script setup>
import { ref } from 'vue';
import { boxCount, counterexample, understandingFeedback } from '../../domain/learning.js';
import { appendTest } from '../../domain/progress.js';
const props = defineProps({ round: Number, data: Object });
const emit = defineEmits(['success']);
const capacity = props.round === 0 ? 6 : 4;
props.data.testBooks ??= '';
props.data.expected ??= '';
props.data.tested ||= [];
const feedback = ref(''),
  good = ref(false);
function verify() {
  const n = Number(props.data.testBooks),
    expected = Number(props.data.expected);
  if (
    String(props.data.testBooks).trim() === '' ||
    String(props.data.expected).trim() === '' ||
    !Number.isInteger(n) ||
    n < 0 ||
    n > 100 ||
    !Number.isInteger(expected) ||
    expected < 0 ||
    expected > 100
  ) {
    good.value = false;
    feedback.value =
      'Choisis entre 0 et 100 livres, puis un résultat attendu entier compris entre 0 et 100.';
    return;
  }
  const actual = Math.floor(n / capacity),
    correct = boxCount(n, capacity) === expected;
  appendTest(props.data.tested, { n, expected, actual, correct });
  good.value = counterexample(n, capacity, expected);
  feedback.value = !correct
    ? understandingFeedback(['books', 'capacity'], expected, n, capacity).message +
      ' Revois d’abord le résultat attendu, avant de juger le programme.'
    : good.value
      ? `Bien vu ! Pour ${n} livres et ${capacity} places, tu attends ${expected} boîtes mais le programme renvoie ${actual}. Il oublie une boîte partiellement remplie.`
      : `Ce test passe : attendu ${expected}, obtenu ${actual}. Mais il ne révèle pas l’erreur. Essaie un nombre de livres qui laisse un reste.`;
  const boundary = props.data.tested.some((t) => t.correct && (t.n === 0 || t.n === capacity));
  const found = props.data.tested.some((t) => counterexample(t.n, capacity, t.expected));
  if (boundary && found) emit('success');
  else if (good.value)
    feedback.value +=
      ' Ajoute maintenant un cas limite qui passe : zéro livre ou une boîte exactement pleine.';
}
</script>
<template>
  <div>
    <p class="activity-prompt">
      Le programme utilise <strong>nombre de livres // {{ capacity }}</strong
      >. En Python, <code>//</code> garde le quotient entier. Il ne compte donc que les boîtes
      pleines.
    </p>
    <div class="bug-example">
      <span>Le programme à examiner</span><code>boites = nb_livres // {{ capacity }}</code>
    </div>
    <h3 class="activity-question">Construis ton jeu de tests</h3>
    <p class="small muted">
      Tu peux réessayer sans limite ; les 100 derniers essais sont conservés.
    </p>
    <p class="small muted">
      Trouve un test qui révèle l’erreur et un cas limite qui passe. Prévois les résultats avant de
      lancer.
    </p>
    <div class="preset-row">
      <button
        v-for="n in [0, 1, capacity, capacity + 1]"
        :key="n"
        class="button compact secondary"
        @click="
          data.testBooks = n;
          data.expected = '';
          feedback = '';
        "
      >
        {{ n }} livre{{ n > 1 ? 's' : '' }}
      </button>
    </div>
    <div class="form-row">
      <label
        >Nombre de livres<input
          v-model="data.testBooks"
          type="number"
          inputmode="numeric"
          min="0"
          max="100" /></label
      ><label
        >Boîtes attendues<input
          v-model="data.expected"
          type="number"
          inputmode="numeric"
          min="0"
          max="100"
      /></label>
    </div>
    <button class="button primary" @click="verify">Lancer ce test</button>
    <div v-if="feedback" class="feedback" :class="good ? 'positive' : 'try-again'" role="status">
      {{ feedback }}
    </div>
    <div v-if="data.tested.length" class="table-scroll">
      <table>
        <caption>
          Tes tests · capacité
          {{
            capacity
          }}
        </caption>
        <thead>
          <tr>
            <th>Livres</th>
            <th>Attendu</th>
            <th>Obtenu</th>
            <th>Observation</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, i) in data.tested" :key="i">
            <td>{{ t.n }}</td>
            <td>{{ t.expected }}</td>
            <td>{{ t.actual }}</td>
            <td>
              {{
                !t.correct
                  ? 'Attendu à revoir'
                  : t.expected === t.actual
                    ? 'Test réussi'
                    : 'Erreur révélée'
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <details class="comparison">
      <summary>Comprendre la correction</summary>
      <p>
        On peut remplir les boîtes une à une jusqu’à ne plus avoir de livres. Autre méthode :
        compter les boîtes pleines, puis ajouter une boîte seulement s’il reste des livres. Pour
        zéro livre, on n’ajoute rien. Ces deux démarches doivent donner les mêmes résultats.
      </p>
    </details>
    <p class="tip-note">
      Des tests réussis augmentent la confiance, mais ne prouvent pas que le programme est correct
      pour toutes les entrées.
    </p>
  </div>
</template>

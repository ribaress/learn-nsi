<script setup>
import { ref, computed } from 'vue';
import AppIcon from '../components/AppIcon.vue';
import PythonEditor from '../components/PythonEditor.vue';
import { useProgress } from '../composables/useProgress.js';
import { sources } from '../content/missions.js';
const { progress } = useProgress();
const selected = ref('premiere');
const content = {
  premiere: {
    title: 'Une fonction, un contrat clair',
    level: 'Première NSI',
    intro:
      'Une fonction est plus facile à réutiliser quand on sait ce qu’elle reçoit et ce qu’elle garantit. Sa documentation décrit son rôle, ses paramètres et son résultat.',
    steps: [
      'Écris une courte documentation entre triples guillemets : que calcule cette fonction ?',
      'Ajoute des assertions pour vérifier les préconditions : nombre de livres entier positif ou nul, capacité entière strictement positive.',
      'Complète le calcul et vérifie les cas limites. Que se passerait-il avec une capacité de zéro sans cette précondition ?'
    ],
    code: 'def nb_boites(nb_livres, capacite):\n    """Renvoie le nombre minimal de boîtes nécessaires."""\n    # Préconditions à compléter avec assert\n    # Puis ton calcul\n    pass\n',
    tests: [
      { args: [0, 6], expected: 0 },
      { args: [7, 6], expected: 2 },
      { args: [13, 6], expected: 3 },
      { args: [-1, 6], expectedError: 'AssertionError' },
      { args: [1, 0], expectedError: 'AssertionError' }
    ],
    model:
      'assert isinstance(nb_livres, int) and nb_livres >= 0\nassert isinstance(capacite, int) and capacite > 0\nboites = nb_livres // capacite\nif nb_livres % capacite != 0:\n    boites += 1\nreturn boites',
    question:
      'Quelles préconditions garantissent que le calcul a un sens ? Quelle postcondition décrit le résultat ?',
    explanation:
      'Avec n livres et une capacité k > 0, le résultat b est le plus petit entier positif ou nul tel que b × k ≥ n. Pour b > 0, (b − 1) × k < n. Une assertion échoue avec AssertionError si la condition est fausse ; c’est un outil de mise au point, pas une protection de sécurité.'
  },
  terminale: {
    title: 'Résoudre un petit problème, puis recommencer',
    level: 'Terminale NSI',
    intro:
      'La récursivité permet à une fonction de s’appeler sur un problème plus petit. Ici : ranger une boîte, puis demander combien de boîtes il faut pour les livres qui restent.',
    steps: [
      'Trouve le cas de base : si aucun livre ne reste, combien faut-il de boîtes ?',
      'Pour n > 0, réserve une boîte, enlève au plus la capacité et appelle la fonction sur le reste.',
      'Explique pourquoi le nombre de livres diminue strictement. Compare avec la boucle : même résultat, mais une autre manière d’organiser le calcul.'
    ],
    code: 'def nb_boites(nb_livres, capacite):\n    # Cas de base\n    if nb_livres == 0:\n        return 0\n    # Une boîte, puis un problème plus petit\n    pass\n',
    tests: [
      { args: [0, 6], expected: 0 },
      { args: [1, 6], expected: 1 },
      { args: [13, 6], expected: 3 }
    ],
    model:
      'def nb_boites(nb_livres, capacite):\n    if nb_livres == 0:\n        return 0\n    reste = max(0, nb_livres - capacite)\n    return 1 + nb_boites(reste, capacite)',
    question:
      'Quel est le cas de base ? Quel nombre diminue à chaque appel ? Pourquoi les appels finissent-ils ?',
    explanation:
      'Pour 13 livres et 6 places : f(13) = 1 + f(7), f(7) = 1 + f(1), f(1) = 1 + f(0), et f(0) = 0. Les résultats remontent : 0, puis 1, puis 2, puis 3. Sans cas de base, les appels ne s’arrêtent pas. En Python, la profondeur de récursion est limitée : ce défi utilise de petites valeurs.'
  }
};
function getEntry(id) {
  if (!progress.extensions[id])
    progress.extensions[id] = {
      code: content[id].code,
      reflection: '',
      modelSeen: false,
      success: false
    };
  return progress.extensions[id];
}
const current = computed(() => getEntry(selected.value));
const lesson = computed(() => content[selected.value]);
function modelToggle(event) {
  if (event.target.open) current.value.modelSeen = true;
}
</script>
<template>
  <div class="standard-page narrow-page">
    <RouterLink to="/" class="back-link"
      ><AppIcon name="left" :size="17" />Retour au parcours</RouterLink
    >
    <div class="page-heading">
      <h1>La même idée,<br /><span>un peu plus loin.</span></h1>
      <p>Deux prolongements facultatifs, à explorer après le chapitre.</p>
    </div>
    <div class="extension-tabs">
      <button
        v-for="id in ['premiere', 'terminale']"
        :key="id"
        class="button"
        :class="selected === id ? 'primary' : 'secondary'"
        @click="selected = id"
      >
        {{ content[id].level }}
      </button>
    </div>
    <section class="panel extension-content" :key="selected">
      <h2>{{ lesson.title }}</h2>
      <p class="lesson-intro">{{ lesson.intro }}</p>
      <ol class="extension-steps">
        <li v-for="step in lesson.steps" :key="step">{{ step }}</li>
      </ol>
      <PythonEditor
        v-model="current.code"
        function-name="nb_boites"
        :tests="lesson.tests"
        :initial-code="lesson.code"
        @success="current.success = true"
      />
      <p v-if="current.success" class="feedback positive">
        Les tests de résultats passent. Explique aussi le contrat ou la terminaison pour donner du
        sens à ton code.
      </p>
      <label class="reflection-label"
        >{{ lesson.question
        }}<textarea
          v-model="current.reflection"
          rows="4"
          placeholder="Je peux expliquer que…"
        ></textarea>
      </label>
      <details class="comparison" @toggle="modelToggle">
        <summary>Un exemple pour comparer et réfléchir</summary>
        <pre>{{ lesson.model }}</pre>
        <p>{{ lesson.explanation }}</p>
        <p v-if="current.modelSeen" class="small muted">
          Exemple consulté : cet entraînement est accompagné.
        </p>
      </details>
      <a
        :href="sources.find((s) => s.id === selected).url"
        target="_blank"
        rel="noopener"
        class="text-link"
        >Programme officiel · {{ lesson.level }}<AppIcon name="external" :size="16"
      /></a>
    </section>
  </div>
</template>

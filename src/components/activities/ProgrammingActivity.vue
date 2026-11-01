<script setup>
import PythonEditor from '../PythonEditor.vue';
import { pythonTasks } from '../../content/missions.js';
const props = defineProps({ round: Number, entry: Object });
defineEmits(['success']);
const task = pythonTasks[props.round];
props.entry.codeByTask[props.round] ??= task.code;
</script>
<template>
  <div>
    <h3 class="activity-question">{{ task.title }}</h3>
    <p class="activity-prompt">{{ task.description }}</p>
    <PythonEditor
      v-model="entry.codeByTask[round]"
      :function-name="task.functionName"
      :tests="task.tests"
      :initial-code="task.code"
      @success="$emit('success')"
    />
    <details v-if="round === 1 && entry.successes[round]" class="comparison">
      <summary>Une autre version possible : quotient et reste</summary>
      <p>
        La division entière compte les boîtes pleines. Si le reste est différent de zéro, on ajoute
        une boîte. Compare cette méthode avec ta boucle sur les mêmes tests.
      </p>
      <pre>
boites = nb_livres // capacite
if nb_livres % capacite != 0:
    boites = boites + 1
return boites</pre>
    </details>
  </div>
</template>

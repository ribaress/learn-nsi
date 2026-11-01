<script setup>
import { ref } from 'vue';
import AppIcon from '../AppIcon.vue';
import { decompositionActions } from '../../content/missions.js';
import { validDecomposition } from '../../domain/learning.js';
const props = defineProps({ round: Number, data: Object });
const emit = defineEmits(['success']);
props.data.order ||= ['pack', 'capacity', 'check', 'count', 'plan'];
props.data.groups ||= {};
const feedback = ref(''),
  good = ref(false);
const action = (id) => decompositionActions.find((a) => a.id === id);
function move(i, delta) {
  const a = props.data.order;
  [a[i], a[i + delta]] = [a[i + delta], a[i]];
  feedback.value = '';
}
function verify() {
  good.value =
    validDecomposition(props.data.order) &&
    decompositionActions.every((a) => props.data.groups[a.id] === a.group);
  feedback.value = good.value
    ? 'Bien vu ! Chaque sous-tâche a un rôle et ses dépendances sont respectées. Compter et lire la capacité peuvent être échangés.'
    : 'Vérifie les groupes et les dépendances : prévoir les boîtes demande les deux données ; répartir vient après le calcul ; vérifier vient après le rangement.';
  if (good.value) emit('success');
}
</script>
<template>
  <div>
    <p class="activity-prompt">
      {{
        round === 0
          ? 'Organise le rangement des livres.'
          : 'Transfert : organise maintenant des bouteilles dans des caisses.'
      }}
      Replace les actions dans un ordre possible et attribue un rôle à chacune.
    </p>
    <p class="small muted">
      Utilise les flèches pour déplacer les actions. Deux premières actions peuvent être échangées.
    </p>
    <ol class="decomposition-list">
      <li v-for="(id, i) in data.order" :key="id">
        <span class="order-index">{{ i + 1 }}</span>
        <div class="decomposition-action">
          <strong>{{ action(id)?.label }}</strong
          ><label
            ><span class="sr-only">Groupe pour {{ action(id)?.label }}</span
            ><select
              :aria-label="`Groupe pour ${action(id)?.label}`"
              v-model="data.groups[id]"
              @change="feedback = ''"
            >
              <option :value="undefined" disabled>Choisir un rôle</option>
              <option value="data">Données</option>
              <option value="organise">Organisation</option>
              <option value="control">Contrôle</option>
            </select></label
          >
        </div>
        <div class="move-buttons">
          <button
            class="icon-button"
            :disabled="i === 0"
            :aria-label="`Monter : ${action(id)?.label}`"
            @click="move(i, -1)"
          >
            <AppIcon name="up" :size="17" /></button
          ><button
            class="icon-button"
            :disabled="i === 4"
            :aria-label="`Descendre : ${action(id)?.label}`"
            @click="move(i, 1)"
          >
            <AppIcon name="down" :size="17" />
          </button>
        </div>
      </li>
    </ol>
    <button class="button primary" @click="verify">Vérifier ma décomposition</button>
    <div v-if="feedback" class="feedback" :class="good ? 'positive' : 'try-again'" role="status">
      {{ feedback }}
    </div>
    <div class="tip-note">
      <AppIcon name="hint" />
      <p>
        Pour justifier l’ordre, complète : « Je dois d’abord … parce que … a besoin de ce résultat.
        »
      </p>
    </div>
  </div>
</template>

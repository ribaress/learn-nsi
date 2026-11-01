<script setup>
import { ref, computed, nextTick } from 'vue';
import AppIcon from '../components/AppIcon.vue';
import { useProgress } from '../composables/useProgress.js';
import { createExport, parseExport } from '../domain/progress.js';
const { progress, replace, reset, completed, storage } = useProgress();
const message = ref(''),
  error = ref(''),
  pending = ref(null),
  dialog = ref(null),
  resetDialog = ref(null);
const pendingCount = computed(() => Object.keys(pending.value?.progress.missions || {}).length);
const pendingLessons = computed(() =>
  Object.values(pending.value?.progress.courses || {}).reduce(
    (total, course) => total + Object.keys(course.lessons).length,
    0
  )
);
function download() {
  const blob = new Blob([JSON.stringify(createExport(progress), null, 2)], {
      type: 'application/json;charset=utf-8'
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement('a');
  a.href = url;
  a.download = `atelier-nsi-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  message.value =
    'Ton fichier de sauvegarde a été préparé. Conserve-le pour reprendre sur un autre appareil.';
}
async function importFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  error.value = '';
  message.value = '';
  try {
    if (file.size > 5 * 1024 * 1024)
      throw new Error(
        'Ce fichier est trop volumineux. Choisis une sauvegarde Atelier NSI de moins de 5 Mo.'
      );
    pending.value = parseExport(await file.text());
    await nextTick();
    dialog.value.showModal();
  } catch (e) {
    error.value = e.message;
  } finally {
    event.target.value = '';
  }
}
function confirmImport() {
  replace(pending.value.progress);
  pending.value = null;
  dialog.value.close();
  message.value = 'Ta progression a été importée. Tu peux reprendre ton parcours.';
}
function confirmReset() {
  reset();
  resetDialog.value.close();
  message.value = 'Le parcours est prêt pour un nouveau départ.';
}
</script>
<template>
  <div class="standard-page narrow-page">
    <div class="page-heading">
      <h1>Ton travail,<br /><span>à emporter.</span></h1>
      <p>Reprends là où tu t’es arrêté, ici ou sur un autre appareil.</p>
    </div>
    <section class="save-status panel">
      <span class="status-icon"><AppIcon name="save" :size="29" /></span>
      <div>
        <h2>
          {{
            storage.available
              ? 'Sauvegarde automatique activée'
              : 'Sauvegarde en mémoire uniquement'
          }}
        </h2>
        <p>
          {{
            storage.available
              ? 'Tes réponses et ton code restent dans ce navigateur.'
              : 'Exporte ton travail avant de fermer la page.'
          }}
          {{ completed }} / 6 missions terminées.
        </p>
      </div>
    </section>
    <div class="save-options">
      <section class="panel">
        <AppIcon name="save" :size="30" />
        <h2>Exporter mon travail</h2>
        <p>
          Télécharge un fichier contenant ta progression, tes explications, tes indices et ton code
          Python.
        </p>
        <button class="button primary" @click="download">
          Exporter ma sauvegarde<AppIcon name="save" :size="18" />
        </button>
      </section>
      <section class="panel">
        <AppIcon name="upload" :size="30" />
        <h2>Reprendre un fichier</h2>
        <p>
          Choisis une sauvegarde exportée depuis Atelier NSI. Tu pourras vérifier son résumé avant
          de remplacer ton travail actuel.
        </p>
        <label class="button secondary file-button"
          >Choisir une sauvegarde<input
            type="file"
            accept=".json,application/json"
            @change="importFile"
            aria-label="Choisir une sauvegarde"
        /></label>
      </section>
    </div>
    <div v-if="message" class="feedback positive" role="status">{{ message }}</div>
    <div v-if="error" class="feedback try-again" role="alert">{{ error }}</div>
    <section class="privacy-note">
      <AppIcon name="info" :size="23" />
      <div>
        <h3>Un navigateur, un parcours</h3>
        <p>
          Il n’y a pas de compte ni de synchronisation. Si tu changes de navigateur, effaces ses
          données ou utilises un ordinateur partagé, pense à exporter ton fichier. Sur téléphone, tu
          le retrouveras généralement dans tes téléchargements.
        </p>
        <p>
          Aucun nom ni adresse e-mail n’est demandé. Les réponses et le code ne sont pas envoyés à
          un serveur.
        </p>
      </div>
    </section>
    <section class="reset-section">
      <h2>Un nouveau départ</h2>
      <p>
        Tu peux vider la progression de ce navigateur. Exporte-la d’abord si tu souhaites la
        conserver.
      </p>
      <button class="button secondary danger" @click="resetDialog.showModal()">
        Réinitialiser le parcours
      </button>
    </section>
    <dialog ref="dialog" class="confirm-dialog" @cancel="pending = null">
      <h2>Remplacer ta progression ?</h2>
      <p>
        Ce fichier contient {{ pendingCount }} mission(s) de l’atelier et
        {{ pendingLessons }} leçon(s) ou projet(s) commencé(s).
      </p>
      <p class="small muted">
        Date d’export :
        {{
          pending?.exportedAt
            ? new Date(pending.exportedAt).toLocaleString('fr-FR')
            : 'non précisée'
        }}. Les données sont compatibles avec les parcours actuels.
      </p>
      <p>
        La progression actuelle sera remplacée. Tu peux annuler et l’exporter avant de continuer.
      </p>
      <div class="dialog-actions">
        <button
          class="button secondary"
          @click="
            dialog.close();
            pending = null;
          "
        >
          Annuler</button
        ><button class="button primary" @click="confirmImport">Remplacer et reprendre</button>
      </div>
    </dialog>
    <dialog ref="resetDialog" class="confirm-dialog">
      <h2>Repartir de zéro ?</h2>
      <p>
        Les réponses, les programmes et les badges de ce navigateur seront effacés. Tes fichiers
        déjà exportés resteront disponibles.
      </p>
      <div class="dialog-actions">
        <button class="button secondary" @click="resetDialog.close()">Garder mon travail</button
        ><button class="button primary" @click="confirmReset">Confirmer la réinitialisation</button>
      </div>
    </dialog>
  </div>
</template>

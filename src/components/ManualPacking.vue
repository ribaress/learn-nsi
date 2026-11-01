<script setup>
import { computed, ref, nextTick, useId } from 'vue';
import AppIcon from './AppIcon.vue';
import {
  createPacking,
  placeBook,
  removePackedBook,
  removePackingBox
} from '../domain/learning.js';
const props = defineProps({ n: Number, capacity: Number, data: Object });
props.data.packing ??= createPacking(props.n);
const packing = computed(() => props.data.packing);
const available = computed(() =>
  packing.value.locations.flatMap((box, book) => (box === null ? [book] : []))
);
const chosen = ref(available.value[0] ?? null);
const selected = computed(() =>
  available.value.includes(chosen.value) ? chosen.value : (available.value[0] ?? null)
);
const message = ref(''),
  warning = ref(false),
  resetDialog = ref(null);
const prefix = useId();
const colors = ['#b3a1ee', '#8bd2c4', '#f2b399', '#eed085', '#95b9e0', '#c8a0db'];
const booksIn = (box) =>
  packing.value.locations.flatMap((location, book) => (location === box ? [book] : []));
function announce(text, bad = false) {
  message.value = text;
  warning.value = bad;
}
function choose(book) {
  chosen.value = book;
  announce(`Livre ${book + 1} sélectionné. Choisis la boîte dans laquelle le placer.`);
}
function place(box) {
  if (selected.value === null) return;
  const result = placeBook(packing.value, selected.value, box, props.capacity);
  if (result.ok) {
    props.data.packing = result.packing;
    chosen.value = available.value[0] ?? null;
  }
  announce(result.message, !result.ok);
}
async function remove(book) {
  props.data.packing = removePackedBook(packing.value, book);
  chosen.value = book;
  announce(`Le livre ${book + 1} est revenu sur la table. Tu peux choisir une autre boîte.`);
  await nextTick();
  document.getElementById(`${prefix}-book-${book}`)?.focus({ preventScroll: true });
}
function addBox() {
  if (packing.value.boxCount >= props.n) return;
  props.data.packing = { ...packing.value, boxCount: packing.value.boxCount + 1 };
  announce(
    `Boîte ${packing.value.boxCount} ajoutée. Chaque boîte contient au maximum ${props.capacity} livres.`
  );
}
function removeBox(box) {
  const result = removePackingBox(packing.value, box);
  if (!result.ok) {
    announce(result.message, true);
    return;
  }
  props.data.packing = result.packing;
  announce(`La boîte vide ${box + 1} a été retirée.`);
}
function reset() {
  props.data.packing = createPacking(props.n);
  chosen.value = 0;
  announce('Les livres sont revenus sur la table. À toi de choisir les boîtes.');
  resetDialog.value.close();
}
</script>
<template>
  <section class="manual-packing" aria-label="Atelier de rangement">
    <div class="packing-heading">
      <div>
        <h3>Essaie avec les livres</h3>
        <p>Sélectionne un livre, puis choisis sa boîte. Tu peux aussi calculer de tête.</p>
      </div>
      <AppIcon name="blocks" :size="25" />
    </div>
    <p class="packing-summary">
      <strong
        >{{ n - available.length }} livre{{ n - available.length === 1 ? '' : 's' }} rangé{{
          n - available.length === 1 ? '' : 's'
        }}</strong
      ><span
        >{{ available.length }} sur la table · {{ packing.boxCount }} boîte{{
          packing.boxCount > 1 ? 's' : ''
        }}
        préparée{{ packing.boxCount > 1 ? 's' : '' }}</span
      >
    </p>
    <div class="manual-tray" role="group" aria-label="Livres encore sur la table">
      <button
        v-for="book in available"
        :key="book"
        :id="`${prefix}-book-${book}`"
        class="manual-book"
        :class="{ chosen: selected === book }"
        :aria-label="`Choisir le livre ${book + 1}`"
        :aria-pressed="selected === book"
        @click="choose(book)"
      >
        <span
          class="little-book"
          :style="{ '--book-color': colors[book % colors.length] }"
          aria-hidden="true"
          ><span></span><span></span></span
        ><small>{{ book + 1 }}</small>
      </button>
      <span v-if="!available.length" class="all-packed"
        ><AppIcon name="check" />Tous les livres sont rangés.</span
      >
    </div>
    <p class="selection-note">
      {{
        selected === null
          ? 'Compare ton rangement avec le minimum de boîtes demandé.'
          : `Livre ${selected + 1} sélectionné : dans quelle boîte veux-tu le placer ?`
      }}
    </p>
    <div class="manual-boxes">
      <article
        v-for="box in packing.boxCount"
        :key="box"
        class="manual-box"
        :class="{ full: booksIn(box - 1).length === capacity }"
      >
        <header>
          <strong>Boîte {{ box }}</strong
          ><span>{{ booksIn(box - 1).length }} / {{ capacity }}</span>
        </header>
        <div class="manual-slots">
          <template v-for="slot in capacity" :key="slot"
            ><button
              v-if="booksIn(box - 1)[slot - 1] !== undefined"
              class="manual-slot occupied"
              :style="{ '--book-color': colors[booksIn(box - 1)[slot - 1] % colors.length] }"
              :aria-label="`Retirer le livre ${booksIn(box - 1)[slot - 1] + 1} de la boîte ${box}`"
              @click="remove(booksIn(box - 1)[slot - 1])"
            >
              <span>{{ booksIn(box - 1)[slot - 1] + 1 }}</span
              ><AppIcon name="close" :size="11" /></button
            ><span v-else class="manual-slot empty" aria-hidden="true"></span
          ></template>
        </div>
        <button
          class="button secondary compact place-book"
          :disabled="selected === null"
          :aria-label="
            selected === null
              ? `Tous les livres sont rangés, boîte ${box}`
              : `Placer le livre ${selected + 1} dans la boîte ${box}`
          "
          @click="place(box - 1)"
        >
          <AppIcon name="down" :size="16" />Placer ici
        </button>
        <button
          class="remove-box text-link"
          :disabled="booksIn(box - 1).length > 0"
          :aria-label="`Retirer la boîte ${box}`"
          @click="removeBox(box - 1)"
        >
          Retirer la boîte vide
        </button>
      </article>
    </div>
    <p v-if="!packing.boxCount" class="small muted">
      Il n’y a aucune boîte. Ajoutes-en une pour commencer le rangement.
    </p>
    <div class="packing-actions">
      <button class="button secondary compact" :disabled="packing.boxCount >= n" @click="addBox">
        <AppIcon name="plus" :size="17" />Ajouter une boîte</button
      ><button class="text-link" @click="resetDialog.showModal()">
        <AppIcon name="restart" :size="15" />Tout remettre sur la table
      </button>
    </div>
    <p class="packing-message" :class="{ warning }" role="status" aria-live="polite">
      {{ message || 'Les boîtes ne se remplissent pas toutes seules : à toi de les organiser.' }}
    </p>
    <dialog ref="resetDialog" class="confirm-dialog">
      <h2>Recommencer ce rangement ?</h2>
      <p>
        Les livres reviendront sur la table avec une boîte vide. Ta réponse au problème et tes
        réussites seront conservées.
      </p>
      <div class="dialog-actions">
        <button class="button secondary" @click="resetDialog.close()">Garder mon rangement</button
        ><button class="button primary" @click="reset">Recommencer le rangement</button>
      </div>
    </dialog>
  </section>
</template>
<style scoped>
.manual-packing {
  margin: 24px 0;
  padding: 20px;
  background: #fbfaff;
  border: 1px solid #e9e3f4;
  border-radius: 14px;
  min-width: 0;
}
.packing-heading {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  color: var(--accent);
}
.packing-heading > div {
  flex: 1;
  min-width: 0;
}
.packing-heading h3 {
  font-size: 16px;
  color: var(--ink);
}
.packing-heading p {
  font-size: 12px;
  color: #776c86;
  line-height: 1.8;
  margin: 8px 0 0;
}
.packing-summary {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 11px;
  margin: 18px 0 14px;
  color: #776a87;
}
.packing-summary strong {
  color: #5e4e76;
}
.packing-summary > span {
  color: #776c86;
}
.manual-tray {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
  gap: 8px;
  padding: 15px 10px;
  background: #f1edf9;
  border-radius: 10px;
  min-height: 85px;
}
.manual-book {
  min-width: 0;
  min-height: 65px;
  padding: 9px 3px 4px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  transition:
    background 0.18s,
    border-color 0.18s;
}
.manual-book .little-book {
  width: 24px;
  height: 35px;
  flex-shrink: 0;
  margin: 0;
  box-shadow: 2px 2px 0 #d9d3e755;
}
.manual-book small {
  font-size: 10px;
  color: #6d5f80;
  line-height: 1;
}
.manual-book:hover {
  background: #fff9;
}
.manual-book.chosen {
  background: #fff;
  border-color: #9c88d5;
  box-shadow: 0 2px 8px #7160d812;
}
.all-packed {
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: #417a65;
  font-size: 12px;
}
.selection-note {
  font-size: 11px;
  color: #766783;
  line-height: 1.8;
  margin: 12px 0 16px;
}
.manual-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}
.manual-box {
  padding: 13px 12px;
  background: #fcf5e9;
  border: 1px solid #e7d2b8;
  border-radius: 11px;
  min-width: 0;
}
.manual-box.full {
  border-color: #c7a880;
  background: #f9efdf;
}
.manual-box header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 13px;
  color: #785d40;
}
.manual-box header strong {
  font-size: 12px;
}
.manual-box header > span {
  font-size: 11px;
  background: #fff9;
  padding: 3px 7px;
  border-radius: 5px;
  white-space: nowrap;
}
.manual-slots {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: 14px;
}
.manual-slot {
  min-height: 44px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
}
.manual-slot.empty {
  background: #fff8;
  border: 1px dashed #cfb38e;
}
.manual-slot.occupied {
  background: var(--book-color);
  border: 1px solid #9785a6;
  color: #382a4f;
  box-shadow: inset 3px 0 #ffffff60;
  animation: book-arrives 0.2s ease-out;
}
.manual-slot.occupied span {
  font-weight: 700;
  font-size: 12px;
}
.manual-slot.occupied svg {
  opacity: 0.65;
}
.place-book {
  width: 100%;
  font-size: 11px !important;
  min-height: 42px !important;
  padding: 9px !important;
  border-color: #ddc4a8 !important;
  color: #785d40 !important;
  background: #fffdf8 !important;
}
.remove-box {
  font-size: 10px;
  color: #80694d;
  min-height: 36px;
  justify-content: center;
  width: 100%;
  margin-top: 5px;
}
.packing-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 13px;
  flex-wrap: wrap;
}
.packing-actions > .text-link {
  font-size: 11px;
  min-height: 38px;
}
.packing-message {
  font-size: 11px;
  color: #686078;
  line-height: 1.8;
  margin: 16px 0 0;
  padding: 11px 12px;
  background: #f0edf8;
  border-radius: 8px;
}
.packing-message.warning {
  background: #fff2d9;
  color: #886231;
  border: 1px solid #e8d3ad;
}
@keyframes book-arrives {
  from {
    opacity: 0.4;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 767px) {
  .manual-packing {
    padding: 16px 12px;
  }
  .packing-heading p {
    font-size: 12px;
  }
  .packing-heading h3 {
    font-size: 14px;
  }
  .packing-heading > svg {
    display: none;
  }
  .packing-summary {
    font-size: 11px;
    flex-direction: column;
    gap: 3px;
  }
  .manual-tray {
    padding: 12px 7px;
    gap: 6px;
  }
  .manual-book {
    min-height: 66px;
  }
  .manual-box {
    padding: 13px 12px;
  }
  .manual-box header strong {
    font-size: 13px;
  }
  .remove-box {
    font-size: 11px;
    min-height: 44px;
  }
  .packing-actions > .button,
  .packing-actions > .text-link {
    min-height: 44px;
  }
  .packing-actions > .text-link {
    font-size: 11px;
  }
  .packing-message {
    font-size: 12px;
  }
  .selection-note {
    font-size: 12px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .manual-slot.occupied {
    animation: none;
  }
  .manual-book {
    transition: none;
  }
}
</style>

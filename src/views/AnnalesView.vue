<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { annales } from '../content/annales/catalog.js';
import { filterAnnales } from '../domain/annales.js';

const year = ref(''),
  format = ref(''),
  search = ref('');
const route = useRoute(),
  router = useRouter();
const centres = ['centres-etrangers', 'metropole', 'national'];
const centre = computed({
  get: () => (centres.includes(route.query.centre) ? route.query.centre : ''),
  set: (value) =>
    router.replace({
      query: {
        ...route.query,
        centre: value || undefined,
        groupe: value === 'centres-etrangers' ? route.query.groupe : undefined
      }
    })
});
const group = computed({
  get: () =>
    centre.value === 'centres-etrangers' && ['1', '2'].includes(route.query.groupe)
      ? route.query.groupe
      : '',
  set: (value) =>
    router.replace({
      query: { ...route.query, centre: 'centres-etrangers', groupe: value || undefined }
    })
});
const filtered = computed(() =>
  filterAnnales(annales, {
    year: year.value,
    format: format.value,
    centre: centre.value,
    group: group.value,
    search: search.value
  })
);
const years = [...new Set(annales.map((a) => a.year))].sort((a, b) => b - a);
function resetFilters() {
  year.value = '';
  format.value = '';
  search.value = '';
  centre.value = '';
}
</script>

<template>
  <div class="standard-page annales-page">
    <RouterLink to="/niveau/terminale" class="back-link">← Le parcours de terminale</RouterLink>
    <div class="page-heading">
      <span class="eyebrow">Du sujet au raisonnement</span>
      <h1>Les annales guidées</h1>
      <p>
        Des sujets officiels, de petites étapes et le temps de comprendre pourquoi une solution
        fonctionne.
      </p>
    </div>
    <section class="panel annales-intro">
      <div>
        <strong>{{ annales.length }} tutoriels · 2021 à 2026</strong>
        <p>
          Les sujets des Centres étrangers sont travaillés en entier, exercice par exercice.
          Les autres écrits et pratiques proposent une sélection guidée. Chaque fiche donne accès au sujet officiel.
        </p>
        <RouterLink
          :to="{ path: '/annales', query: { centre: 'centres-etrangers' } }"
          class="text-link"
          >Centres étrangers · une sélection pour chaque année →</RouterLink
        >
      </div>
      <div class="annales-rule">
        <strong>2025 et 2026 : à toi de résoudre</strong>
        <p>
          Deux pistes restent disponibles. Pour un sujet complet, le corrigé d’un exercice s’ouvre
          après toutes ses questions réussies. Pour une fiche de trois ateliers, il s’ouvre après les trois réussites.
        </p>
      </div>
    </section>
    <form
      class="panel annales-filters"
      :class="{ 'with-group': centre === 'centres-etrangers' }"
      @submit.prevent
    >
      <label for="annale-centre"
        >Centre<select id="annale-centre" v-model="centre">
          <option value="">Tous les centres</option>
          <option value="centres-etrangers">Centres étrangers</option>
          <option value="metropole">Métropole</option>
          <option value="national">Banque pratique nationale</option>
        </select></label
      >
      <label v-if="centre === 'centres-etrangers'" for="annale-group"
        >Groupe<select id="annale-group" v-model="group">
          <option value="">Groupes 1 et 2</option>
          <option value="1">Groupe 1</option>
          <option value="2">Groupe 2</option>
        </select></label
      >
      <label for="annale-year"
        >Année<select id="annale-year" v-model="year">
          <option value="">Toutes les années</option>
          <option v-for="item in years" :key="item" :value="String(item)">{{ item }}</option>
        </select></label
      >
      <label for="annale-format"
        >Format<select id="annale-format" v-model="format">
          <option value="">Écrit et pratique</option>
          <option value="ecrit">Écrit</option>
          <option value="pratique">Pratique Python</option>
        </select></label
      >
      <label for="annale-search"
        >Rechercher<input
          id="annale-search"
          v-model="search"
          type="search"
          placeholder="SQL, piles, référence du sujet…"
      /></label>
    </form>
    <p v-if="centre === 'centres-etrangers'" class="small muted">
      Un sujet sélectionné par groupe et par année, de 2021 à 2026. Le groupe 2 réunit plusieurs
      zones : la zone retenue est précisée sur chaque fiche. Les groupes sont distincts des jours
      d’épreuve. La banque pratique est nationale et possède son propre filtre Centre.
    </p>
    <p class="small muted" role="status">
      {{ filtered.length }} tutoriel{{ filtered.length > 1 ? 's' : '' }} trouvé{{
        filtered.length > 1 ? 's' : ''
      }}
    </p>
    <div v-if="filtered.length" class="annales-grid">
      <article v-for="annale in filtered" :key="annale.id" class="panel annale-card">
        <div class="annale-meta">
          <span
            >{{ annale.year }} · {{ annale.format === 'ecrit' ? 'Écrit' : 'Pratique Python' }}</span
          ><span>{{ annale.duration }} min</span>
        </div>
        <h2>
          <RouterLink :to="`/annales/${annale.id}`">{{ annale.title }}</RouterLink>
        </h2>
        <p class="small muted">{{ annale.reference }} · {{ annale.session }}</p>
        <p>{{ annale.scope }}</p>
        <div class="annale-tags">
          <span v-for="theme in annale.themes" :key="theme">{{ theme }}</span>
        </div>
        <p class="annale-access small">
          {{
            annale.year >= 2025
              ? annale.coverage === 'complete' ? 'Corrigés débloqués exercice par exercice après réussite' : 'Corrigé après les trois ateliers réussis'
              : 'Résolution consultable pendant le travail'
          }}
        </p>
        <RouterLink :to="`/annales/${annale.id}`" class="button secondary"
          >Commencer le tutoriel →</RouterLink
        >
      </article>
    </div>
    <section v-else class="panel">
      <h2>Aucun tutoriel pour ces filtres</h2>
      <p>Essaie un autre thème ou élargis la sélection.</p>
      <button class="button secondary" @click="resetFilters">Réinitialiser les filtres</button>
    </section>
    <p class="annales-credit small muted">
      Les sujets sont officiels ; les tutoriels et corrigés sont des propositions pédagogiques
      d’Atelier NSI. Les douze sujets des Centres étrangers sont complets ; le catalogue reste une
      sélection de sessions, avec des extraits guidés pour les autres centres et la pratique.
    </p>
  </div>
</template>

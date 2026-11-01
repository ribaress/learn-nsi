<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  levels,
  loadLevel,
  loadChapter,
  loadCoverage,
  officialSource,
  lessonUrl
} from '../content/courses/catalog.js';
const route = useRoute(),
  selected = ref(levels.some((l) => l.id === route.query.niveau) ? route.query.niveau : 'snt');
const rows = ref([]),
  error = ref(''),
  loading = ref(false);
let request = 0;
watch(
  selected,
  async (id) => {
    const token = ++request;
    loading.value = true;
    error.value = '';
    try {
      const [meta, capabilities] = await Promise.all([loadLevel(id), loadCoverage(id)]);
      const chapters = await Promise.all(meta.map((c) => loadChapter(id, c.id)));
      const result = capabilities.map((capacity) => ({
        ...capacity,
        lessons: chapters.flatMap((c) =>
          c.lessons
            .filter((l) => l.official.some((o) => o.id === capacity.id))
            .map((l) => ({ title: l.title, url: lessonUrl(id, c.id, l.id) }))
        )
      }));
      if (token === request) rows.value = result;
    } catch (e) {
      if (token === request) error.value = e.message;
    } finally {
      if (token === request) loading.value = false;
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="standard-page">
    <div class="page-heading">
      <h1>Les programmes,<br /><span>notion par notion.</span></h1>
      <p>
        Chaque capacité est reliée à une leçon contenant des explications, une manipulation et trois
        exercices.
      </p>
    </div>
    <label
      >Programme à explorer<select v-model="selected">
        <option v-for="level in levels" :key="level.id" :value="level.id">{{ level.title }}</option>
      </select></label
    >
    <p class="small">
      Références officielles vérifiées le 1er novembre 2026.
      <a
        class="text-link"
        :href="officialSource(selected).url"
        target="_blank"
        rel="noopener noreferrer"
        >Ouvrir le programme officiel ↗</a
      >
    </p>
    <p v-if="loading" role="status">Lecture de la matrice de couverture…</p>
    <p v-if="error" role="alert">{{ error }}</p>
    <section v-else-if="!loading" class="panel">
      <h2>
        {{ rows.filter((r) => r.lessons.length).length }} / {{ rows.length }} capacités reliées
      </h2>
      <p class="small muted">
        Cette correspondance décrit les ressources proposées ; elle ne certifie pas la maîtrise de
        l’élève. Les pratiques sur matériel réel et le travail collectif demandent une mise en
        situation complémentaire.
      </p>
      <div class="table-scroll">
        <table class="coverage-table">
          <thead>
            <tr>
              <th>Capacité attendue</th>
              <th>Leçon et activités</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>
                {{ row.label }}<small>Programme · page {{ row.page }}</small>
              </td>
              <td>
                <RouterLink v-for="lesson in row.lessons" :key="lesson.url" :to="lesson.url"
                  >{{ lesson.title }} →</RouterLink
                ><span v-if="!row.lessons.length">À compléter</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import AppIcon from './components/AppIcon.vue';
import { useProgress } from './composables/useProgress.js';
const route = useRoute();
function focusMain() {
  document.querySelector('#main-content')?.focus();
  document.querySelector('#main-content')?.scrollIntoView();
}
const { storage } = useProgress();
const nav = [
  { to: '/', label: 'Mon parcours', icon: 'home' },
  { to: '/programme', label: 'Les programmes', icon: 'book' },
  { to: '/annales', label: 'Annales guidées', icon: 'code' },
  { to: '/competences', label: 'Mes compétences', icon: 'skills' },
  { to: '/sauvegarde', label: 'Ma sauvegarde', icon: 'save' },
  { to: '/sources', label: 'Les sources', icon: 'book' }
];
</script>
<template>
  <a class="skip-link" href="#main-content" @click.prevent="focusMain">Aller au contenu</a>
  <div class="app-shell">
    <aside class="sidebar">
      <RouterLink to="/" class="brand" aria-label="Atelier NSI, accueil"
        ><span class="brand-mark"><span></span><span></span></span
        ><span
          >Atelier <strong>NSI<span class="brand-dot">.</span></strong></span
        ></RouterLink
      >
      <nav aria-label="Navigation principale">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :aria-label="item.label"
          :title="item.label"
          :class="{
            active:
              item.to === '/'
                ? route.path === '/' ||
                  route.path.startsWith('/mission') ||
                  route.path.startsWith('/niveau')
                : route.path === item.to || route.path.startsWith(`${item.to}/`)
          }"
          ><AppIcon :name="item.icon" :size="21" /><span>{{ item.label }}</span></RouterLink
        >
      </nav>
      <div class="sidebar-note">
        <AppIcon name="hint" :size="25" />
        <p>Les bonnes idées<br />commencent par<br /><strong>de petites étapes.</strong></p>
      </div>
      <div class="sidebar-footer">Un atelier pour apprendre à penser.</div>
    </aside>
    <div class="main-shell">
      <header class="topbar">
        <div>
          <span class="muted">L’atelier</span><AppIcon name="chevron" :size="14" /><span>{{
            route.meta.title
          }}</span>
        </div>
        <RouterLink :to="{ path: '/sources', hash: '#fonctionnement' }" class="help-link"
          ><AppIcon name="info" :size="17" /><span>Comment ça marche</span></RouterLink
        >
      </header>
      <div v-if="storage.message" class="storage-warning" role="status">
        <AppIcon name="warning" />{{ storage.message }}
        <RouterLink to="/sauvegarde">Exporter</RouterLink>
      </div>
      <main id="main-content" tabindex="-1"><RouterView /></main>
      <footer class="page-footer">
        <span>Apprendre. Essayer. Comprendre.</span
        ><RouterLink to="/sources">SNT & NSI · Références officielles</RouterLink>
      </footer>
    </div>
  </div>
</template>

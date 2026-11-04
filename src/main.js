import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import App from './App.vue';
import HomeView from './views/HomeView.vue';
import './style.css';
import './courses.css';
import './annales.css';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Mon parcours' } },
    {
      path: '/annales',
      component: () => import('./views/AnnalesView.vue'),
      meta: { title: 'Les annales guidées' }
    },
    {
      path: '/annales/:id',
      component: () => import('./views/AnnaleTutorialView.vue'),
      meta: { title: 'Résoudre un sujet officiel' }
    },
    {
      path: '/niveau/:niveau',
      component: () => import('./views/LevelView.vue'),
      meta: { title: 'Les parcours par niveau' }
    },
    {
      path: '/niveau/:niveau/chapitre/:chapitre/lecon/:lecon',
      component: () => import('./views/CourseLessonView.vue'),
      meta: { title: 'Comprendre et expérimenter' }
    },
    {
      path: '/niveau/:niveau/projet/:projet',
      component: () => import('./views/CourseLessonView.vue'),
      meta: { title: 'Mon projet de synthèse' }
    },
    {
      path: '/programme',
      component: () => import('./views/CoverageView.vue'),
      meta: { title: 'Les programmes officiels' }
    },
    {
      path: '/mission/:id',
      component: () => import('./views/MissionView.vue'),
      meta: { title: 'Une mission à la fois' }
    },
    {
      path: '/competences',
      component: () => import('./views/SkillsView.vue'),
      meta: { title: 'Mes compétences' }
    },
    {
      path: '/sauvegarde',
      component: () => import('./views/SaveView.vue'),
      meta: { title: 'Ma sauvegarde' }
    },
    {
      path: '/sources',
      component: () => import('./views/SourcesView.vue'),
      meta: { title: 'Les sources' }
    },
    {
      path: '/prolongements',
      component: () => import('./views/ExtensionsView.vue'),
      meta: { title: 'Pour aller plus loin' }
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior: (to) => (to.hash ? { el: to.hash, top: 20 } : { top: 0 })
});
router.afterEach((to) => {
  document.title = `${to.meta.title} — Atelier NSI`;
  setTimeout(() => document.querySelector('#main-content')?.focus({ preventScroll: true }), 0);
});
createApp(App).use(router).mount('#app');

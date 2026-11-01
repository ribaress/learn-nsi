<script setup>
import AppIcon from '../components/AppIcon.vue';
import { sources } from '../content/missions.js';
</script>
<template>
  <div class="standard-page narrow-page">
    <div class="page-heading">
      <h1>Une démarche simple.<br /><span>Des repères solides.</span></h1>
      <p>Comprendre ce que tu apprends et pourquoi tu l’apprends.</p>
    </div>
    <section id="fonctionnement" class="panel sources-section">
      <h2>Comment fonctionne l’atelier ?</h2>
      <ol class="how-it-works">
        <li>
          <strong>Découvrir.</strong> Lis un exemple résolu et raconte ce que tu en comprends.
        </li>
        <li>
          <strong>Manipuler.</strong> Prévois le résultat, essaie et compare. Recommence autant que
          tu veux.
        </li>
        <li>
          <strong>Expliquer.</strong> Écris ou raconte ta démarche, puis relis-la avec les quatre
          critères.
        </li>
        <li>
          <strong>Faire le bilan.</strong> Repère ce que tu sais déjà et ce que tu veux encore
          entraîner.
        </li>
      </ol>
      <p>
        Les missions et leçons sont accessibles dans l’ordre que tu choisis. À l’intérieur, réponds
        dans une étape pour débloquer la suivante. Pour débuter, suis les numéros. Les trois aides
        donnent une piste, un indice concret puis un exemple résolu. Une réussite avec corrigé reste
        visible comme telle.
      </p>
      <p>
        Tu peux utiliser le clavier, les commandes tactiles et les boutons de déplacement. Les
        animations peuvent être mises en pause. Le site respecte le réglage de réduction des
        animations de ton appareil.
      </p>
    </section>
    <section class="sources-section">
      <h2>Trois parcours, des ressources traçables</h2>
      <p>
        Les sections SNT, première NSI et terminale NSI relient chaque capacité officielle à des
        leçons et activités.
        <RouterLink to="/programme" class="text-link"
          >Consulter la matrice des programmes.</RouterLink
        >
      </p>
      <p>
        Les adaptations libres citent leur auteur, leur fichier source à une révision précise, leur
        licence et les changements apportés. Les exercices originaux sont signalés. Les sources sont
        intégrées au site ; GitHub n’est pas nécessaire pendant un exercice.
      </p>
      <p>
        <a
          href="https://github.com/glassus/premiere_nsi"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
          >Première NSI · Gilles Lassus</a
        >
        ·
        <a
          href="https://github.com/glassus/terminale_nsi"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
          >Terminale NSI · Gilles Lassus</a
        >. Les mentions de licence et leurs éventuelles limites figurent sur chaque adaptation.
      </p>
    </section>
    <section class="sources-section">
      <h2>Les programmes officiels</h2>
      <p>
        Ce premier chapitre développe une sélection de compétences transversales. Il ne couvre pas
        l’ensemble de SNT ou de NSI. En seconde, l’enseignement est SNT ; la spécialité NSI commence
        en première.
      </p>
      <article v-for="s in sources" :key="s.id" class="source-card panel">
        <span class="source-icon"><AppIcon name="book" :size="25" /></span>
        <div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.detail }}</p>
          <a :href="s.url" target="_blank" rel="noopener" class="text-link"
            >Lire le programme officiel (PDF)<AppIcon name="external" :size="16"
          /></a>
        </div>
      </article>
      <p class="small muted">
        Références vérifiées le 1er novembre 2026 sur Éduscol. Les programmes SNT et NSI cités sont
        ceux de 2019 indiqués en vigueur par les pages ministérielles consultées.
      </p>
    </section>
    <section class="panel sources-section">
      <h2>Python, sans installation pour l’élève</h2>
      <p>
        Les programmes sont exécutés dans ton navigateur avec Pyodide. Python se charge seulement
        lorsque tu lances un exercice de code. Le premier chargement peut prendre un moment,
        notamment sur téléphone.
      </p>
      <p>
        Le bouton Arrêter et une limite de cinq secondes évitent qu’une boucle interminable empêche
        de continuer. Le pas-à-pas des missions est une simulation préparée ; l’éditeur libre
        exécute et teste ton propre code.
      </p>
      <a href="https://pyodide.org/en/stable/" target="_blank" rel="noopener" class="text-link"
        >Documentation de Pyodide<AppIcon name="external" :size="16"
      /></a>
    </section>
    <section class="sources-section">
      <h2>Ce que signifie une réussite</h2>
      <p>
        Les activités vérifient des contraintes et des résultats. Plusieurs démarches peuvent être
        correctes. Les textes libres ne sont pas corrigés par une intelligence artificielle ; la
        relecture et le badge « Expliquer » sont autoévalués.
      </p>
      <p>
        Les durées sont des estimations. Tu n’as pas de limite de temps. Pour une évaluation de ta
        maîtrise, échange avec ton enseignant et essaie des problèmes nouveaux.
      </p>
    </section>
  </div>
</template>

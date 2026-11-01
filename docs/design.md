# Atelier NSI — conception validée

Premier chapitre commun : comprendre, ordonner, décomposer, prévoir, tester, programmer. Autonomie complète, 2–3 h estimées, extensions première/terminale. Site français, ordinateur et téléphone à égalité. Relecture guidée des explications, sans IA. Python réel avec Pyodide. Sans compte : stockage local et fichier portable.

## Système visuel

Référence de conception générée avec Image Gen : `C:/Users/RIBA Sergino/.codex/generated_images/01a18e00-7d82-7393-834f-056c20075717/exec-dbf3e8f1-bc03-44be-9533-acc041ba99cd.png`.

Fond gris lavande très clair #f7f7fc ; surfaces blanches ; encre #25233f ; accent #7160d8 ; menthe, pêche et jaune pâle pour les étapes. Plus Jakarta Sans auto-hébergée. Sidebar blanche, parcours en lignes numérotées, panneau de chapitre lavande, colonne des compétences. Rayon 16–20 px, bordures légères, ombres limitées. Animations motivées par les actions, reduced-motion respecté. Sur mobile : navigation compacte et activité en colonne. Les livres, boîtes et grilles sont natifs et manipulables.

## Architecture

Vue 3 / Vite / JavaScript / Vue Router hash / CSS natif. Contenus dans `src/content`, logique pure dans `src/domain`, état et persistance dans `src/composables`, activités par composants. Runtime Pyodide local dans worker avec arrêt et délai maximal. Tests unitaires Vitest et navigateur Playwright.

## Livraison

Application locale, build statique et instructions. Aucun compte, collecte de données, backend, publication automatique ou garantie hors ligne. Programmes officiels liés dans l'application ; lien terminale corrigé vers eduscol.education.gouv.fr (le plan contenait une faute de domaine).

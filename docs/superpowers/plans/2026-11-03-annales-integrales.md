# Annales Centres étrangers intégrales — plan de réalisation

**Objectif :** remplacer les extraits des douze sujets déjà sélectionnés, groupes 1 et 2 de 2021 à 2026, par tous leurs exercices et toutes leurs sous-questions, avec guidage et résolutions.

**Architecture :** conserver les identifiants des fiches et des ateliers existants. Ajouter un module de contenu complet par année, chargé à la demande. Chaque fiche possède des sections correspondant aux exercices officiels et une liste variable de questions ; la navigation affiche un exercice à la fois. La correction récente s’ouvre par exercice officiel lorsque toutes ses questions vérifiables sont réussies, afin d’éviter qu’une fiche entière de plusieurs dizaines de questions bloque un exercice déjà résolu.

**Contraintes :** README français ; ne pas toucher aux autres travaux en cours ; aucune clé ni dépendance réseau nouvelle ; anciens résultats conservés lorsque la question est réutilisée ; ni autoévaluation ni simple saisie libre ne débloquent une correction récente. Les réponses rédigées sont sauvegardées et accompagnées d’une vérification ciblée explicitement distinguée de la notation d’une copie. Aucun corrigé récent dans le DOM avant réussite de l’exercice. Pas d’affirmation de correction intégrale sans inventaire des références de questions.

**Sources :** index Pixees fourni par l’utilisateur, documents d’examen publics déjà liés au catalogue et téléchargés pour vérification. Le sujet bis 2024 du groupe 1 reste explicitement identifié ; les codes régionaux du groupe 2 sont conservés.

## Tâches

- [ ] Établir les inventaires indépendants des questions pour les douze sujets et écrire les contenus par année (travail parallèle sur fichiers distincts).
- [ ] Tester puis généraliser le chargement, les identifiants et le verrou à des sections de longueur variable ; conserver les anciens ateliers.
- [ ] Ajouter navigation par exercice, progression par section, brouillon de justification et données propres à chaque exercice.
- [ ] Vérifier couverture des inventaires, exécution des solutions, absence de fuites, sauvegarde et affichage mobile ; relire les références.
- [ ] Mettre à jour README, conception, filtres et libellés ; vérifier tests, mise en forme et compilation.

## Contrat des modules de contenu

`src/content/annales/complete/AAAA.js` exporte par défaut un objet dont chaque clé est un identifiant existant de fiche. Sa valeur contient `{ title, introduction, prerequisites, adaptation, sections, inventory }`. `sections` est un tableau `{ id: 'e1', title, context, questions }`. `inventory` est la liste indépendante des références attendues sous la forme `['e1:1a', 'e1:1b', ...]`.

Une question est un exercice du format courant (helpers answer/python/sql), enrichi de `{ question: '1a', guidance, pitfall, writingPrompt? }`. `writingPrompt` est l’énoncé rédigé complet lorsqu’une vérification courte ciblée ne contrôle qu’un résultat ; elle appelle un brouillon distinct. Pour réutiliser un ancien atelier à l’identique, utiliser `{ question: '...', reuse: 0 }` où reuse est son indice dans l’ancien tableau de trois ateliers ; le chargeur fusionne l’ancien contenu avec cette référence. Ne réutiliser que si le périmètre correspond effectivement à la question. Les nouveaux identifiants dérivent de la section et de la référence, jamais de la position dans la liste. Les données d’une question peuvent compléter le contexte avec le champ `context`.

Les modules par année sont indépendants ; leurs auteurs ne modifient ni les anciens modules ni le chargeur ou les vues. Chaque module doit lister toutes les subdivisions a/b/etc., même si elles partagent un contexte. Les tableaux, graphes et arbres nécessaires sont transcrits en données lisibles. Toute adaptation d’un dessin en liste ou d’un script en fonction est indiquée. Les deux premiers indices restent des pistes, les résolutions donnent au moins trois étapes justifiées. Les tests d’un exercice récent n’exposent pas de réponses aux autres questions ; les fonctions auxiliaires fournies ne doivent pas livrer les programmes encore à résoudre dans la même section.

# Mise en œuvre des programmes — 1er novembre 2026

Plan autorisé : trois parcours officiels complets, cadre commun très guidé puis
autonome, exercices dans le site, indices dorés, sauvegardes compatibles.

## Suivi

- Structure des contenus : contrat commun dans `course-authoring.md`.
- Contenus livrés : SNT 25 leçons / 54 capacités ; première 30 / 52 ; terminale 27 / 48.
- Cinq projets, 261 exercices, dont 137 corrections Python/SQL exécutables et 25 adaptations attribuées.
- Outils, vues, sauvegardes format 2 et migration format 1 intégrés ; reset des cours vérifié.
- Dernière demande intégrée : définitions contextuelles accessibles, déblocage après réponse,
  XP dérivés des réussites uniques, huit rangs, six badges supplémentaires et objectifs progressifs.
- Vérifications : 55 tests unitaires ; toutes les corrections Python/SQL passent ; toutes
  les manipulations des 82 leçons se montent dans Chrome sans erreur ; aperçu compilé
  vérifié avec vrai SQL et récompenses. Suite finale navigateur : **31 scénarios réussis**,
  dont clavier, toucher, 360 px, reprise, import/export, timeouts et anciens parcours.

## Décisions

- Réutiliser le dossier de travail fourni : les sources actuelles sont non suivies,
  sans commit de référence ; créer un worktree laisserait ce travail de côté.
- Ne pas effectuer de commit, publication ou changement de branche implicite.
- Chargement à la demande par chapitre ; progression de l’ancien atelier séparée.
- Format d’export 2 avec migration du format 1 ; même clé de stockage navigateur.
- SQLite préparé au build, vérification SHA256 depuis le verrou Pyodide, servi localement.
- Les leçons restent librement accessibles ; le blocage demandé s’applique aux étapes
  internes et aux exercices successifs. Les réponses libres sont requises, pas évaluées automatiquement.
- Un essai suffit à ouvrir l’exercice suivant ; la réussite reste nécessaire pour la complétion.
- L’iframe Web isole l’application, sans promettre une interdiction de toute navigation réseau.
- Relecture indépendante : corriger la sérialisation des Proxy Vue avant Worker, les contrôles
  Web fondés sur le comportement, les montants dynamiques non entiers et la racine du shell.
  Les quatre corrections sont intégrées. Les ordres de grandeur UIT datés ont été ajoutés
  au trafic Internet, et les énoncés qui donnaient leur réponse ont été corrigés.

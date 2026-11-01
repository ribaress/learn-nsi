# Atelier NSI — suivi de réalisation

Plan et cadrage : conversation validée le 30 octobre 2026.

- [x] Socle Vue, contenu et contrats de progression
- [x] Six missions et relecture guidée
- [x] Exécution Python et prolongements
- [x] Sauvegarde portable et bilan
- [x] Vérifications unitaires, navigateur, mobile et compilation

Décisions : dossier initial vide, sans dépôt Git ; utiliser directement ce dossier autorisé, sans créer de worktree. Node 24.22.1 fourni par Codex utilisé sans changer Node 14 du système. Les illustrations pédagogiques seront des éléments natifs manipulables. La durée reste estimée.

## Vérifications du 30 octobre 2026

18 tests unitaires Vitest et 13 scénarios Chrome/Playwright réussis. Le parcours a été effectué de bout en bout, avec les deux variantes de chaque mission et les trois exercices Python. Vérifications : conservation après rechargement, import avec confirmation/annulation, fichier invalide, stockage bloqué, vrai Python, méthodes équivalentes, syntaxe incorrecte, timeout, arrêt et reprise, sortie limitée, préconditions/assertions, récursivité et commandes clavier. Six missions et l'éditeur contrôlés à 360 × 800 px ; aucune largeur débordante. Clavier virtuel et performances sur un vrai téléphone non vérifiés.

Le navigateur intégré a pu afficher le site sur le port 4173. Le premier serveur sur 5173 était inaccessible ; la vérification automatisée s'est poursuivie avec Chrome. Captures ordinateur 1440 px et téléphone 360 px comparées à la référence : palette lavande, typographie, navigation, panneau de chapitre, parcours numéroté, illustrations natives et disposition mobile. Ajustements intentionnels : atelier Python uniquement à la mission 6 pour respecter la progression ; exercices et réponses restent natifs et accessibles.

## Revue indépendante et corrections

- Focus clavier de l'éditeur : Tab et Maj+Tab gardent leur navigation native ; l'indentation utilise les boutons. Régression constatée avant correction, puis réussie.
- Corrigés : réponses spécifiques à la variante courante ; la comparaison de code complète est disponible après réussite. Régressions constatées avant correction, puis réussies.
- Longue séance : historique limité aux 100 derniers essais, tentatives illimitées. Une sauvegarde issue de 601 essais reste réimportable. Test rouge puis vert.
- Les fichiers du runtime Python ne sont recopiés que s'ils ont changé et sont exclus du watcher Vite pour éviter un verrouillage Windows pendant un build.

Aucun problème important reporté sans correction. Aucun élément mineur différé par la revue.

Version compilée : build réussi, mise en forme vérifiée ; Python exécuté depuis `dist/` sur une vue 360 px, 5/5 tests réussis, aucune erreur JavaScript ni largeur débordante. Aperçu compilé laissé accessible sur http://localhost:4173/.

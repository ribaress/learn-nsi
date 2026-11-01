# Manipuler, suivre et comprendre ses erreurs

Périmètre accepté dans la conversation : les priorités 1, 2 et 3 de la proposition, en conservant Vue, le design existant, les six missions et les sauvegardes.

## Réalisation

1. Mission Comprendre : sélectionner un livre, le placer dans une boîte, retirer un livre, ajouter une boîte et retirer une boîte vide. La capacité ne peut pas être dépassée. Le rangement manuel reste un support pour raisonner ; il n'est pas imposé pour valider une réponse calculée mentalement. Les manipulations sont conservées par variante et exportées.
2. Mission Prévoir : conserver les prédictions par tour et ajouter une vue guidée du code. Chaque pas relie ligne Python exécutée, valeurs des variables et rangement visible. Lecture, pause, précédent, suivant et retour au début ; curseur sauvegardé. Il s'agit d'une trace préparée de l'algorithme du chapitre, pas d'un débogueur du Python libre.
3. Retours : distinguer donnée manquante, information inutile, résultat invalide, places insuffisantes, boîtes superflues et erreur de prédiction. Donner une question ou un calcul adapté aux nombres présents, sans dévoiler les variantes suivantes.

## Vérifications

Tests unitaires des placements, du refus des dépassements, du retrait et de la trace ligne par ligne. Vérifier le dernier livre, les retours en arrière, les prédictions et le cas de zéro livre. Contrôler les champs supplémentaires à l'import et continuer de lire les anciennes sauvegardes. Tests navigateur sur ordinateur et à 360 px, clavier et tactile simulé, reprise après rechargement et parcours complet. Mettre le README à jour.

## Suivi

- [x] Domaines et tests
- [x] Manipulation des livres
- [x] Code, variables et objets synchronisés
- [x] Retours ciblés et sauvegardes compatibles
- [x] Vérifications, documentation et aperçu

Résultats : 28 tests unitaires et 17 scénarios Chrome réussis, dont le parcours historique complet, les nouvelles manipulations, les retours ciblés, la reprise après rechargement et le tactile simulé à 360 px. Contrôle supplémentaire sur la version compilée : rangement de 12 livres dans deux boîtes, dernier livre sans place, lecture/pause du code et captures ordinateur/mobile sans débordement ni erreur JavaScript.

Relecture indépendante des changements : aucun défaut matériel relevé. Le curseur de code reste indépendant de la validation des prédictions ; le rangement manuel reste facultatif. Les tests disposent désormais d'un serveur source dédié sur le port 4180 pour éviter de vérifier un ancien build affiché sur le port 4173. Les essais sur téléphone physique restent à faire, comme indiqué dans le README.

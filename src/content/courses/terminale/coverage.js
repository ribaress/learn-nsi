// Recensement indépendant : BO spécial n°8 du 25 juillet 2019, annexe terminale,
// pages PDF 3 à 9 (pagination physique). Une ligne par capacité attendue.
export const officialProgramUrl =
  'https://eduscol.education.gouv.fr/sites/default/files/document/spe247annexe1158933pdf-89502.pdf';
export const capabilities = [
  [
    'T-H1',
    'Situer dans le temps les principaux événements de l’histoire de l’informatique et leurs protagonistes.',
    3,
    'histoire'
  ],
  [
    'T-H2',
    'Identifier l’évolution des rôles relatifs des logiciels et des matériels.',
    3,
    'histoire'
  ],
  ['T-S1', 'Spécifier une structure de données par son interface.', 4, 'structures'],
  ['T-S2', 'Distinguer interface et implémentation.', 4, 'structures'],
  ['T-S3', 'Écrire plusieurs implémentations d’une même structure de données.', 4, 'structures'],
  ['T-S4', 'Écrire la définition d’une classe.', 4, 'structures'],
  ['T-S5', 'Accéder aux attributs et méthodes d’une classe.', 4, 'structures'],
  [
    'T-S6',
    'Distinguer des structures par le jeu des méthodes qui les caractérisent.',
    4,
    'structures'
  ],
  ['T-S7', 'Choisir une structure de données adaptée à la situation à modéliser.', 4, 'structures'],
  [
    'T-S8',
    'Distinguer la recherche d’une valeur dans une liste et dans un dictionnaire.',
    4,
    'structures'
  ],
  [
    'T-S9',
    'Identifier des situations nécessitant une structure de données arborescente.',
    4,
    'structures'
  ],
  [
    'T-S10',
    'Évaluer quelques mesures des arbres binaires (taille, encadrement de la hauteur, etc.).',
    4,
    'structures'
  ],
  ['T-S11', 'Modéliser des situations sous forme de graphes.', 4, 'structures'],
  [
    'T-S12',
    'Écrire les implémentations correspondantes d’un graphe : matrice d’adjacence, liste de successeurs/de prédécesseurs.',
    4,
    'structures'
  ],
  ['T-S13', 'Passer d’une représentation à une autre.', 4, 'structures'],
  ['T-B1', 'Identifier les concepts définissant le modèle relationnel.', 5, 'bases'],
  ['T-B2', 'Savoir distinguer la structure d’une base de données de son contenu.', 5, 'bases'],
  ['T-B3', 'Repérer des anomalies dans le schéma d’une base de données.', 5, 'bases'],
  [
    'T-B4',
    'Identifier les services rendus par un système de gestion de bases de données relationnelles : persistance des données, gestion des accès concurrents, efficacité de traitement des requêtes, sécurisation des accès.',
    5,
    'bases'
  ],
  ['T-B5', 'Identifier les composants d’une requête.', 6, 'bases'],
  [
    'T-B6',
    'Construire des requêtes d’interrogation à l’aide des clauses du langage SQL : SELECT, FROM, WHERE, JOIN.',
    6,
    'bases'
  ],
  [
    'T-B7',
    'Construire des requêtes d’insertion et de mise à jour à l’aide de : UPDATE, INSERT, DELETE.',
    6,
    'bases'
  ],
  [
    'T-A1',
    'Identifier les principaux composants sur un schéma de circuit et les avantages de leur intégration en termes de vitesse et de consommation.',
    6,
    'architectures'
  ],
  [
    'T-A2',
    'Décrire la création d’un processus, l’ordonnancement de plusieurs processus par le système.',
    6,
    'architectures'
  ],
  ['T-A3', 'Mettre en évidence le risque de l’interblocage (deadlock).', 6, 'architectures'],
  [
    'T-A4',
    'Identifier, suivant le protocole de routage utilisé, la route empruntée par un paquet.',
    7,
    'architectures'
  ],
  [
    'T-A5',
    'Décrire les principes de chiffrement symétrique (clef partagée) et asymétrique (avec clef privée/clef publique).',
    7,
    'architectures'
  ],
  [
    'T-A6',
    'Décrire l’échange d’une clef symétrique en utilisant un protocole asymétrique pour sécuriser une communication HTTPS.',
    7,
    'architectures'
  ],
  ['T-P1', 'Comprendre que tout programme est aussi une donnée.', 7, 'programmation'],
  [
    'T-P2',
    'Comprendre que la calculabilité ne dépend pas du langage de programmation utilisé.',
    7,
    'programmation'
  ],
  [
    'T-P3',
    'Montrer, sans formalisme théorique, que le problème de l’arrêt est indécidable.',
    7,
    'programmation'
  ],
  ['T-P4', 'Écrire un programme récursif.', 7, 'programmation'],
  ['T-P5', 'Analyser le fonctionnement d’un programme récursif.', 7, 'programmation'],
  [
    'T-P6',
    'Utiliser des API (Application Programming Interface) ou des bibliothèques.',
    7,
    'programmation'
  ],
  ['T-P7', 'Exploiter leur documentation.', 7, 'programmation'],
  ['T-P8', 'Créer des modules simples et les documenter.', 7, 'programmation'],
  [
    'T-P9',
    'Distinguer sur des exemples les paradigmes impératif, fonctionnel et objet.',
    8,
    'programmation'
  ],
  [
    'T-P10',
    'Choisir le paradigme de programmation selon le champ d’application d’un programme.',
    8,
    'programmation'
  ],
  [
    'T-P11',
    'Dans la pratique de la programmation, savoir répondre aux causes typiques de bugs : problèmes liés au typage, effets de bord non désirés, débordements dans les tableaux, instruction conditionnelle non exhaustive, choix des inégalités, comparaisons et calculs entre flottants, mauvais nommage des variables, etc.',
    8,
    'programmation'
  ],
  ['T-G1', 'Calculer la taille et la hauteur d’un arbre.', 8, 'algorithmique'],
  [
    'T-G2',
    'Parcourir un arbre de différentes façons (ordres infixe, préfixe ou suffixe ; ordre en largeur d’abord).',
    8,
    'algorithmique'
  ],
  ['T-G3', 'Rechercher une clé dans un arbre de recherche, insérer une clé.', 8, 'algorithmique'],
  ['T-G4', 'Parcourir un graphe en profondeur d’abord, en largeur d’abord.', 8, 'algorithmique'],
  ['T-G5', 'Repérer la présence d’un cycle dans un graphe.', 8, 'algorithmique'],
  ['T-G6', 'Chercher un chemin dans un graphe.', 8, 'algorithmique'],
  [
    'T-G7',
    'Écrire un algorithme utilisant la méthode « diviser pour régner ».',
    9,
    'algorithmique'
  ],
  ['T-G8', 'Utiliser la programmation dynamique pour écrire un algorithme.', 9, 'algorithmique'],
  [
    'T-G9',
    'Étudier l’algorithme de Boyer-Moore pour la recherche d’un motif dans un texte.',
    9,
    'algorithmique'
  ]
].map(([id, label, page, chapter]) => ({ id, label, page, chapter }));

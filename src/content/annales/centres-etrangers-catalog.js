const base = 'https://eduscol.education.gouv.fr/sites/default/files/document';

export const foreignAnnales = [
  {
    id: 'annale-2021-centres-etrangers-arbres',
    year: 2021,
    title: 'Insérer et parcourir un arbre de recherche',
    reference: '21-NSIJ1G11',
    session: 'Centres étrangers · groupe 1 · jour 1',
    scope: 'Exercice 3, questions 1, 2 et 4, pages 7–8 : insertion, bornes et parcours infixe.',
    duration: 50,
    themes: ['Arbres binaires de recherche', 'Récursivité'],
    sourceUrl: `${base}/21-nsij1g1pdf-91410.pdf`
  },
  {
    id: 'annale-2022-centres-etrangers-dates',
    year: 2022,
    title: 'Calculer le jour et la date suivants',
    reference: '22-NSIJ1G11',
    session: 'Centres étrangers · groupe 1 · jour 1',
    scope: 'Exercice 1, questions 1b, 3b et 4b, pages 2–3 : modulo, mois et lendemain.',
    duration: 50,
    themes: ['Listes', 'Dictionnaires', 'Modulo'],
    sourceUrl: `${base}/22-nsij1g11pdf-100104.pdf`
  },
  {
    id: 'annale-2023-centres-etrangers-podcasts',
    year: 2023,
    title: 'Gérer les podcasts de la radio en SQL',
    reference: '23-NSIJ1G11',
    session: 'Centres étrangers · groupe 1 · jour 1',
    scope: 'Exercice 1, questions 2b, 3b et 4a, pages 2–3 : sélection, suppression et mise à jour.',
    duration: 45,
    themes: ['SQL', 'Bases de données'],
    sourceUrl: `${base}/baccalaur-g-n-ral-2023-num-rique-et-sciences-informatiques-133586pdf-98868.pdf`
  },
  {
    id: 'annale-2024-centres-etrangers-solitaire',
    year: 2024,
    title: 'Le solitaire bulgare : stabilité ou cycle ?',
    reference: '24-NSIG11BIS',
    session: 'Centres étrangers · groupe 1 · sujet bis',
    scope:
      'Exercice 1, questions 1, 3 et 5, pages 2–4 : état suivant et détection des répétitions.',
    duration: 60,
    themes: ['Listes', 'Simulation', 'Terminaison'],
    sourceUrl: `${base}/24-nsig11bisv1pdf-106392.pdf`
  },
  {
    id: 'annale-2025-centres-etrangers-sondes',
    year: 2025,
    title: 'Lire et contrôler les relevés des radiosondes',
    reference: '25-NSIJ1G11',
    session: 'Centres étrangers · groupe 1 · jour 1',
    scope:
      'Exercice 3, questions 2, 4 et 5, pages 12–14 (contexte inclus) : horodatage, anomalies et numéros uniques.',
    duration: 50,
    themes: ['Chaînes de caractères', 'Dictionnaires', 'Traitement de données'],
    sourceUrl: `${base}/25-nsij1g11v1-123773.pdf`
  },
  {
    id: 'annale-2026-centres-etrangers-athletes',
    year: 2026,
    title: 'Calculer les points et classer les athlètes',
    reference: '26-NSIJ1G11',
    session: 'Centres étrangers · groupe 1 · jour 1',
    scope:
      'Exercice 1, partie A, questions 1, 2 et 4, pages 2–4 ; type et coût du tri (questions 5–6) expliqués dans le bilan.',
    duration: 55,
    themes: ['Dictionnaires', 'Tri par sélection', 'Complexité'],
    sourceUrl: `${base}/26-nsij1g11-128514.pdf`
  }
].map((item) => ({
  ...item,
  group: 1,
  centre: 'centres-etrangers',
  format: 'ecrit',
  module: 'centres-etrangers'
}));

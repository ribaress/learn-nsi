const base = 'https://eduscol.education.gouv.fr/sites/default/files/document';

export const foreignGroup2Annales = [
  {
    id: 'annale-2021-groupe2-panier',
    year: 2021,
    title: 'Calculer le prix d’un panier et ses réductions',
    reference: '21-NSIJ1AN1',
    zone: 'Amérique du Nord',
    scope: 'Exercice 3, questions 1a, 1b et 2, pages 6–7 : accumulation, indices et pourcentages.',
    duration: 50,
    themes: ['Listes', 'Boucles', 'Pourcentages'],
    sourceUrl: `${base}/nsij1an1pdf-91461.pdf`
  },
  {
    id: 'annale-2022-groupe2-adn',
    year: 2022,
    title: 'Des palindromes aux séquences d’ADN',
    reference: '22-NSIJ1AN1',
    zone: 'Amérique du Nord',
    scope:
      'Exercice 4, questions 3, 4a et 4c, pages 9–10 : comparaison, complémentaire et composition.',
    duration: 55,
    themes: ['Chaînes de caractères', 'ADN', 'Tests'],
    sourceUrl: `${base}/sujet-22-nsij1an1pdf-96882.pdf`
  },
  {
    id: 'annale-2023-groupe2-pension',
    year: 2023,
    title: 'Retrouver les clients d’une pension en SQL',
    reference: '23-NSIJ1LI1',
    zone: 'Liban',
    scope: 'Exercice 2, questions 2a, 2b et 2c, pages 4–6 : filtre, jointure et insertion.',
    duration: 50,
    themes: ['SQL', 'Jointures', 'Clés étrangères'],
    sourceUrl: `${base}/baccalaur-g-n-ral-2023-num-rique-et-sciences-informatiques-134012pdf-98949.pdf`
  },
  {
    id: 'annale-2024-groupe2-antennes',
    year: 2024,
    title: 'Couvrir une rue avec des antennes relais',
    reference: '24-NSIJ1JA1',
    zone: 'Asie · Japon',
    scope: 'Exercice 1, questions 4, 5 et 8, pages 2–5 : objets, distance et stratégie gloutonne.',
    duration: 65,
    themes: ['Programmation objet', 'Algorithmes gloutons'],
    sourceUrl: `${base}/24-nsij1ja1v1pdf-106716.pdf`
  },
  {
    id: 'annale-2025-groupe2-terminaison',
    year: 2025,
    title: 'Comprendre pourquoi un programme s’arrête',
    reference: '25-NSIJ1JA1',
    zone: 'Asie · Japon',
    scope:
      'Exercice 1, questions 1, 3 et 6, pages 2–4 ; les limites de l’heuristique (question 7) sont expliquées au bilan.',
    duration: 55,
    themes: ['Terminaison', 'Décidabilité', 'Chaînes de caractères'],
    sourceUrl:
      'https://www.education.gouv.fr/sites/default/files/2025-06/baccalaur-at-g-n-ral-2025-num-rique-et-sciences-informatiques-440790.pdf'
  },
  {
    id: 'annale-2026-groupe2-chargement',
    year: 2026,
    title: 'Charger les accessoires d’une compagnie de danse',
    reference: '26-NSIJ1JA1',
    zone: 'Asie · Japon',
    scope:
      'Exercice 1, partie B, questions 6, 7 et 10, pages 3–5 : dictionnaires imbriqués et remplissage glouton.',
    duration: 65,
    themes: ['Dictionnaires', 'Algorithmes gloutons', 'Mutation'],
    sourceUrl: `${base}/26-nsij1ja1-127778.pdf`
  }
].map((item) => ({
  ...item,
  group: 2,
  centre: 'centres-etrangers',
  format: 'ecrit',
  session: `Centres étrangers · groupe 2 · ${item.zone} · jour 1`,
  module: 'centres-etrangers-groupe2'
}));

const sti =
  'https://sti.eduscol.education.fr/sites/eduscol.education.fr.sti/files/concours-examens';
const eduscol = 'https://eduscol.education.gouv.fr/sites/default/files/document';

export const annales = [
  {
    id: 'annale-2021-ecrit-dichotomie',
    year: 2021,
    format: 'ecrit',
    title: 'Trouver un nom par dichotomie',
    reference: '21-NSIJ1ME3',
    session: 'Métropole · remplacement · jour 1',
    scope:
      'Exercice 2, parties B (trace et indice) et C (récursivité), pages 3–4 et annexe page 10.',
    duration: 45,
    themes: ['Dichotomie', 'Récursivité'],
    sourceUrl: `${eduscol}/21-nsij1me3pdf-91251.pdf`,
    module: 'written'
  },
  {
    id: 'annale-2022-ecrit-parentheses',
    year: 2022,
    format: 'ecrit',
    title: 'Parenthèses, balises et piles',
    reference: '22-NSIJ1ME1',
    session: 'Métropole · 11 mai · jour 1',
    scope: 'Exercice 1, parties A et B, pages 2–4 : trace, parenthésage et pile de balises.',
    duration: 50,
    themes: ['Piles', 'Invariants', 'Python'],
    sourceUrl: `${eduscol}/baccalaur-g-n-ral-2022-num-rique-et-sciences-informatiques-1142420pdf-96396.pdf`,
    module: 'written'
  },
  {
    id: 'annale-2023-ecrit-meubles',
    year: 2023,
    format: 'ecrit',
    title: 'Interroger le magasin de meubles',
    reference: '23-NSIJ1ME1',
    session: 'Métropole · 20 mars · jour 1',
    scope: 'Exercice 1, questions 3, 4 et 5, pages 2–3 : SELECT, UPDATE et INSERT.',
    duration: 40,
    themes: ['SQL', 'Bases de données'],
    sourceUrl: `${sti}/16676/16676-23-nsij1me1.pdf`,
    module: 'written'
  },
  {
    id: 'annale-2023-pratique-vote',
    year: 2023,
    format: 'pratique',
    title: 'Vérifier un tri et dépouiller un vote',
    reference: '23-NSI-01',
    session: 'Banque pratique · sujet 01',
    scope: 'Les deux exercices du sujet, pages 2–3 ; le dépouillement est séparé en deux ateliers.',
    duration: 60,
    themes: ['Listes', 'Dictionnaires', 'Python'],
    sourceUrl: `${sti}/16769/16769-23-nsi-01.pdf`,
    module: 'practical'
  },
  {
    id: 'annale-2024-ecrit-sites',
    year: 2024,
    format: 'ecrit',
    title: 'Popularité et parcours des sites Web',
    reference: '24-NSIJ1ME1',
    session: 'Métropole · 19 juin · jour 1',
    scope: 'Exercice 1, questions 4, 5 et 8, pages 3–4 : popularité, méthode et parcours.',
    duration: 50,
    themes: ['Graphes', 'Objets', 'Parcours en largeur'],
    sourceUrl: `${eduscol}/24-nsij1me1v2-0pdf-106224.pdf`,
    module: 'written'
  },
  {
    id: 'annale-2024-pratique-arbres',
    year: 2024,
    format: 'pratique',
    title: 'Compter un arbre et trier par sélection',
    reference: '24-NSI-01',
    session: 'Banque pratique · sujet 01',
    scope: 'Les deux exercices du sujet, pages 2–3 ; échange et tri sont travaillés séparément.',
    duration: 60,
    themes: ['Arbres', 'Récursivité', 'Tri par sélection'],
    sourceUrl: `${sti}/16804/16804-24-nsi-01.pdf`,
    module: 'practical'
  },
  {
    id: 'annale-2025-ecrit-guitares',
    year: 2025,
    format: 'ecrit',
    title: 'La collection de guitares en SQL',
    reference: '25-NSIJ1ME1',
    session: 'Métropole · 17 juin · jour 1',
    scope: 'Exercice 1, questions 3, 7 et 10, pages 3–5 : filtre, jointure et agrégation.',
    duration: 50,
    themes: ['SQL', 'Jointures', 'Agrégation'],
    sourceUrl: `${sti}/18216/18216-25-nsij1me1.pdf`,
    module: 'written'
  },
  {
    id: 'annale-2026-ecrit-reseau',
    year: 2026,
    format: 'ecrit',
    title: 'Réparer la configuration du réseau du lycée',
    reference: '26-NSIJ1ME1',
    session: 'Métropole · Réunion · Mayotte · 16 juin · jour 1',
    scope: 'Exercice 1, partie A, questions 1 à 3, page 3 : binaire, sous-réseau et passerelle.',
    duration: 45,
    themes: ['Réseaux', 'Binaire', 'Adressage IP'],
    sourceUrl: `${sti}/19286/19286-sujet-bac-general-2026-nsi-j1-metropole-reunion-mayotte.pdf`,
    module: 'written'
  },
  {
    id: 'annale-2025-pratique-graphes',
    year: 2025,
    format: 'pratique',
    title: 'Voisins entrants et lecture de nombres',
    reference: '25-NSI-01',
    session: 'Banque pratique · sujet 01',
    scope:
      'Les deux exercices, pages 2–3 : graphe orienté et suite obtenue en lisant les groupes de chiffres.',
    duration: 60,
    themes: ['Graphes', 'Chaînes de caractères', 'Python'],
    sourceUrl: `${sti}/18254/18254-epreuve-pratique-nsi-2025.zip`,
    sourceLabel: 'Ouvrir la banque officielle (ZIP, sujet 01 à l’intérieur)',
    module: 'practical'
  },
  {
    id: 'annale-2026-pratique-rle',
    year: 2026,
    format: 'pratique',
    title: 'Codage RLE : compresser sans perdre de pixels',
    reference: '26-BCG-NSI-1',
    session: 'Banque pratique · sujet 1',
    scope:
      'Questions 1, 2 et 4, pages 2–3. La manipulation des fichiers image de la question 3 est remplacée par des listes de pixels.',
    duration: 60,
    themes: ['Compression', 'Listes', 'Octets'],
    sourceUrl:
      'https://sujets.examens-concours.gouv.fr/delos/api/file/public/69c4efb8cb85140736350705',
    sourceLabel: 'Ouvrir le sujet officiel et ses fichiers (ZIP)',
    module: 'practical'
  }
]
  .map((item) => ({ ...item, centre: item.format === 'pratique' ? 'national' : 'metropole' }))
  .concat(foreignAnnales, foreignGroup2Annales)
  .map(item => item.centre === 'centres-etrangers' ? {
    ...item,
    title: `Sujet complet · ${item.reference}`,
    scope: 'Tous les exercices du sujet et toutes leurs sous-questions, avec guidage, vérifications et résolutions.',
    duration: 210,
    coverage: 'complete',
    sourceIndexUrl: 'https://pixees.fr/informatiquelycee/term/'
  } : item)
  .sort((a, b) => a.year - b.year);

export async function loadAnnale(id) {
  const summary = annales.find((annale) => annale.id === id);
  if (!summary) return null;
  const loaders = {
    written: () => import('./written.js'),
    practical: () => import('./practical.js'),
    'centres-etrangers': () => import('./centres-etrangers.js'),
    'centres-etrangers-groupe2': () => import('./centres-etrangers-groupe2.js')
  };
  const content = await loaders[summary.module]();
  const tutorial = content.default[id];
  if (summary.coverage === 'complete') {
    const completeLoaders = {
      2021: () => import('./complete/2021.js'),
      2022: () => import('./complete/2022.js'),
      2023: () => import('./complete/2023.js'),
      2024: () => import('./complete/2024.js'),
      2025: () => import('./complete/2025.js'),
      2026: () => import('./complete/2026.js')
    };
    const full = (await completeLoaders[summary.year]()).default[id];
    return assembleAnnale(summary, tutorial, full);
  }
  return {
    ...summary,
    ...tutorial,
    exercises: tutorial.exercises.map((exercise, index) => ({
      ...exercise,
      id: `${id}-ex${index + 1}`
    }))
  };
}
import { foreignAnnales } from './centres-etrangers-catalog.js';
import { foreignGroup2Annales } from './centres-etrangers-groupe2-catalog.js';
import { assembleAnnale } from './assemble.js';

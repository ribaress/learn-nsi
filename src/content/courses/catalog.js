import { sources } from '../missions.js';
import summaries from './summaries.json';
export const levels = [
  {
    id: 'snt',
    title: 'Seconde SNT',
    short: 'la SNT',
    subtitle: 'Comprendre le numérique du quotidien',
    color: 'mint',
    chapters: 8,
    description:
      'Internet, Web, réseaux sociaux, données, cartes, objets connectés et images : observe, manipule et programme.'
  },
  {
    id: 'premiere',
    title: 'Première NSI',
    short: 'la première NSI',
    subtitle: 'Construire les fondations',
    color: 'purple',
    chapters: 8,
    description:
      'Représente les données, découvre les machines et construis tes premiers algorithmes avec Python.'
  },
  {
    id: 'terminale',
    title: 'Terminale NSI',
    short: 'la terminale NSI',
    subtitle: 'Relier les idées et approfondir',
    color: 'peach',
    chapters: 6,
    description:
      'Structures de données, récursivité, graphes, bases SQL et réseaux : expérimente pour expliquer.'
  }
];
const manifests = import.meta.glob('./*/index.js');
const coverage = import.meta.glob('./*/coverage.js');
export const levelById = (id) => levels.find((level) => level.id === id);
export const officialSource = (id) => sources.find((source) => source.id === id);
export const chapterSummaries = (id) => summaries[id] || [];
export async function loadLevel(id) {
  const load = manifests[`./${id}/index.js`];
  if (!load) throw new Error('Ce niveau n’existe pas. Retrouve les trois parcours sur l’accueil.');
  return (await load()).chapters;
}
export async function loadChapter(level, id) {
  const chapters = await loadLevel(level);
  const chapter = chapters.find((chapter) => chapter.id === id);
  if (!chapter) throw new Error('Ce chapitre n’existe pas dans ce niveau.');
  return (await chapter.load()).default;
}
export async function loadCoverage(level) {
  return (await coverage[`./${level}/coverage.js`]()).capabilities;
}
export function lessonUrl(level, chapter, lesson) {
  return `/niveau/${level}/chapitre/${chapter}/lecon/${lesson}`;
}

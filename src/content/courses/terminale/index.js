export const chapters = [
  {
    id: 'histoire',
    title: 'Histoire de l’informatique',
    description:
      'Des machines universelles aux systèmes connectés : personnes, idées et techniques.',
    load: () => import('./histoire.js')
  },
  {
    id: 'structures',
    title: 'Structures de données',
    description: 'Interfaces, objets, structures linéaires, arbres et représentations de graphes.',
    load: () => import('./structures.js')
  },
  {
    id: 'bases',
    title: 'Bases de données',
    description:
      'Modéliser, interroger et modifier une base relationnelle dans un vrai moteur SQL.',
    load: () => import('./bases.js')
  },
  {
    id: 'architectures',
    title: 'Architectures, systèmes et réseaux',
    description: 'Systèmes sur puce, processus, routage et communications sécurisées.',
    load: () => import('./architectures.js')
  },
  {
    id: 'programmation',
    title: 'Langages et programmation',
    description: 'Calculabilité, récursivité, modularité, paradigmes et mise au point.',
    load: () => import('./programmation.js')
  },
  {
    id: 'algorithmique',
    title: 'Algorithmique',
    description: 'Parcours, arbres de recherche, fusion, programmation dynamique et Boyer-Moore.',
    load: () => import('./algorithmique.js')
  }
];

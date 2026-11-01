export const chapters = [
  {
    id: 'histoire',
    title: 'Une histoire des idées et des machines',
    description: 'Des algorithmes anciens à la machine universelle et au Web.',
    load: () => import('./histoire.js')
  },
  {
    id: 'representations',
    title: 'Représenter les données',
    description: 'Bases, entiers signés, flottants, logique et encodages.',
    load: () => import('./representations.js')
  },
  {
    id: 'construits',
    title: 'Construire et parcourir des données',
    description: 'Tuples, tableaux, matrices et dictionnaires en Python.',
    load: () => import('./construits.js')
  },
  {
    id: 'tables',
    title: 'Exploiter des tables',
    description: 'CSV, sélection, cohérence, tri et fusion.',
    load: () => import('./tables.js')
  },
  {
    id: 'web',
    title: 'Interagir sur le Web',
    description: 'Interfaces, événements, HTTP, formulaires et HTTPS.',
    load: () => import('./web.js')
  },
  {
    id: 'machines',
    title: 'Machines, réseaux et systèmes',
    description: 'Processeur, circuits, paquets, Linux et objets connectés.',
    load: () => import('./machines.js')
  },
  {
    id: 'programmation',
    title: 'Écrire des programmes fiables',
    description: 'Constructions, contrats, tests, bibliothèques et langages.',
    load: () => import('./programmation.js')
  },
  {
    id: 'algorithmique',
    title: 'Choisir et justifier des algorithmes',
    description: 'Parcours, tris, dichotomie, voisins et choix gloutons.',
    load: () => import('./algorithmique.js')
  }
];

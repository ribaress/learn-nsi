import { enrichChapter } from './pedagogy.js';

export const chapters = [
  {
    id: 'histoire',
    title: 'Une histoire des idées et des machines',
    description: 'Des algorithmes anciens à la machine universelle et au Web.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./histoire.js'),
        import('./pedagogy-histoire.js')
      ]);
      return enrichChapter(chapter, pedagogy.histoirePedagogy);
    }
  },
  {
    id: 'representations',
    title: 'Représenter les données',
    description: 'Bases, entiers signés, flottants, logique et encodages.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./representations.js'),
        import('./pedagogy-representations.js')
      ]);
      return enrichChapter(chapter, pedagogy.representationsPedagogy);
    }
  },
  {
    id: 'construits',
    title: 'Construire et parcourir des données',
    description: 'Tuples, tableaux, matrices et dictionnaires en Python.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./construits.js'),
        import('./pedagogy-construits.js')
      ]);
      return enrichChapter(chapter, pedagogy.construitsPedagogy);
    }
  },
  {
    id: 'tables',
    title: 'Exploiter des tables',
    description: 'CSV, sélection, cohérence, tri et fusion.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./tables.js'),
        import('./pedagogy-tables.js')
      ]);
      return enrichChapter(chapter, pedagogy.tablesPedagogy);
    }
  },
  {
    id: 'web',
    title: 'Interagir sur le Web',
    description: 'Interfaces, événements, HTTP, formulaires et HTTPS.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./web.js'),
        import('./pedagogy-web.js')
      ]);
      return enrichChapter(chapter, pedagogy.webPedagogy);
    }
  },
  {
    id: 'machines',
    title: 'Machines, réseaux et systèmes',
    description: 'Processeur, circuits, paquets, Linux et objets connectés.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./machines.js'),
        import('./pedagogy-machines.js')
      ]);
      return enrichChapter(chapter, pedagogy.machinesPedagogy);
    }
  },
  {
    id: 'programmation',
    title: 'Écrire des programmes fiables',
    description: 'Constructions, contrats, tests, bibliothèques et langages.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./programmation.js'),
        import('./pedagogy-programmation.js')
      ]);
      return enrichChapter(chapter, pedagogy.programmationPedagogy);
    }
  },
  {
    id: 'algorithmique',
    title: 'Choisir et justifier des algorithmes',
    description: 'Parcours, tris, dichotomie, voisins et choix gloutons.',
    load: async () => {
      const [chapter, pedagogy] = await Promise.all([
        import('./algorithmique.js'),
        import('./pedagogy-algorithmique.js')
      ]);
      return enrichChapter(chapter, pedagogy.algorithmiquePedagogy);
    }
  }
];

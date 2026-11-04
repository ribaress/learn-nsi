async function withPedagogy(chapterModule, pedagogyModule) {
  const [{ default: chapter }, { default: explanations }] = await Promise.all([
    chapterModule,
    pedagogyModule
  ]);
  return {
    default: {
      ...chapter,
      lessons: chapter.lessons.map((lesson) => {
        const key = lesson.id.replace(/^terminale-/, '');
        const { reasoning, ...details } = explanations[key];
        return {
          ...lesson,
          ...details,
          examples: lesson.examples.map((example, index) => ({
            ...example,
            reasoning: reasoning[index]
          }))
        };
      })
    }
  };
}

export const chapters = [
  {
    id: 'histoire',
    title: 'Histoire de l’informatique',
    description:
      'Des machines universelles aux systèmes connectés : personnes, idées et techniques.',
    load: () => withPedagogy(import('./histoire.js'), import('./pedagogy-histoire.js'))
  },
  {
    id: 'structures',
    title: 'Structures de données',
    description: 'Interfaces, objets, structures linéaires, arbres et représentations de graphes.',
    load: () => withPedagogy(import('./structures.js'), import('./pedagogy-structures.js'))
  },
  {
    id: 'bases',
    title: 'Bases de données',
    description:
      'Modéliser, interroger et modifier une base relationnelle dans un vrai moteur SQL.',
    load: () => withPedagogy(import('./bases.js'), import('./pedagogy-bases.js'))
  },
  {
    id: 'architectures',
    title: 'Architectures, systèmes et réseaux',
    description: 'Systèmes sur puce, processus, routage et communications sécurisées.',
    load: () => withPedagogy(import('./architectures.js'), import('./pedagogy-architectures.js'))
  },
  {
    id: 'programmation',
    title: 'Langages et programmation',
    description: 'Calculabilité, récursivité, modularité, paradigmes et mise au point.',
    load: () => withPedagogy(import('./programmation.js'), import('./pedagogy-programmation.js'))
  },
  {
    id: 'algorithmique',
    title: 'Algorithmique',
    description: 'Parcours, arbres de recherche, fusion, programmation dynamique et Boyer-Moore.',
    load: () => withPedagogy(import('./algorithmique.js'), import('./pedagogy-algorithmique.js'))
  }
];

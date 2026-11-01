export const chapters = [
  {
    id: 'programmation',
    title: 'Programmer et situer le numérique',
    description:
      'Une chronologie raisonnée et des programmes Python pour décrire, décider et répéter.',
    load: () => import('./programmation.js')
  },
  {
    id: 'internet',
    title: 'Internet',
    description:
      'Paquets, adresses, DNS et supports : comprendre comment un réseau de réseaux transporte les données.',
    load: () => import('./internet.js')
  },
  {
    id: 'web',
    title: 'Le Web',
    description:
      'Construire une page, lire les échanges HTTP, rechercher et publier avec discernement.',
    load: () => import('./web.js')
  },
  {
    id: 'reseaux',
    title: 'Les réseaux sociaux',
    description:
      'Identités, économie de l’attention, graphes de relations et réponses aux cyberviolences.',
    load: () => import('./reseaux.js')
  },
  {
    id: 'donnees',
    title: 'Les données structurées',
    description:
      'Décrire, importer, filtrer et croiser des collections, puis partager et sauvegarder les fichiers.',
    load: () => import('./donnees.js')
  },
  {
    id: 'cartographie',
    title: 'Localisation, cartographie et mobilité',
    description:
      'Des signaux satellites aux couches cartographiques, aux contributions et aux itinéraires.',
    load: () => import('./cartographie.js')
  },
  {
    id: 'embarquee',
    title: 'Informatique embarquée et objets connectés',
    description:
      'Relier capteurs, programmes, interfaces et actionneurs dans des modèles de systèmes physiques.',
    load: () => import('./embarquee.js')
  },
  {
    id: 'photographie',
    title: 'La photographie numérique',
    description:
      'Du photosite au fichier : couleurs, métadonnées et transformations d’images en Python.',
    load: () => import('./photographie.js')
  }
];

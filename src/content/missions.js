export const sources = [
  {
    id: 'snt',
    title: 'Seconde · SNT',
    detail:
      'Notions transversales de programmation : variables, séquences, conditions, boucles, fonctions. Ce chapitre est une introduction ; il ne couvre pas les sept thèmes de SNT.',
    url: 'https://eduscol.education.gouv.fr/sites/default/files/document/spe641annexe1063085pdf-83091.pdf'
  },
  {
    id: 'premiere',
    title: 'Première · NSI',
    detail:
      'Analyser et décomposer un problème, concevoir une solution, spécifier une fonction, utiliser des jeux de tests et expliquer sa démarche.',
    url: 'https://eduscol.education.gouv.fr/sites/default/files/document/spe633annexe1063268pdf-89499.pdf'
  },
  {
    id: 'terminale',
    title: 'Terminale · NSI',
    detail:
      'Approfondir la décomposition, la récursivité, la mise au point et la construction de jeux de tests.',
    url: 'https://eduscol.education.gouv.fr/sites/default/files/document/spe247annexe1158933pdf-89502.pdf'
  }
];

export const reviewCriteria = [
  { id: 'but', text: 'Je peux dire quel résultat on cherche.' },
  { id: 'donnees', text: 'Je distingue les données utiles des détails.' },
  { id: 'etapes', text: 'Je peux raconter les étapes dans le bon ordre.' },
  { id: 'test', text: 'Je peux expliquer un exemple qui vérifie ma solution.' }
];

export const missions = [
  {
    id: 'comprendre',
    number: '01',
    short: 'Comprendre',
    title: 'Comprendre le problème',
    color: 'purple',
    icon: 'magnify',
    duration: 20,
    description: 'Repérer ce que l’on sait et ce que l’on cherche.',
    skill: 'Analyser et reformuler un problème',
    levels: ['snt', 'premiere'],
    rounds: 2,
    intro:
      'Avant de chercher une solution, prenons le temps de comprendre la question. Un programme très rapide ne sert à rien s’il répond à une autre question !',
    exampleTitle: 'Une étagère à vider',
    example:
      'La bibliothèque doit ranger 8 livres dans des boîtes. Chaque boîte contient au maximum 3 livres. Les livres ont des couvertures de couleurs différentes. Combien de boîtes faut-il au minimum ?',
    walkthrough: [
      [
        'Ce que je sais',
        'Il y a 8 livres. Une boîte peut en contenir 3 au maximum. Ce sont mes données d’entrée.'
      ],
      [
        'Ce que je cherche',
        'Je cherche un nombre de boîtes, pas le nombre de livres par boîte. C’est le résultat attendu.'
      ],
      [
        'Un essai concret',
        'Je place 3 livres dans une boîte, puis 3 dans une autre. Il reste 2 livres : j’utilise une troisième boîte.'
      ],
      [
        'Je vérifie',
        'Deux boîtes ne donnent que 6 places : ce n’est pas assez. Trois boîtes donnent 9 places : les 8 livres tiennent.'
      ]
    ],
    takeaway:
      'Entrées → traitement → résultat. Commence par raconter le but et repérer les données utiles.',
    caution:
      'La couleur des couvertures ne change pas le nombre de boîtes. Une donnée présente dans un énoncé n’est pas forcément utile.',
    vocabulary: [
      ['Donnée d’entrée', 'Une information connue au départ, comme le nombre de livres.'],
      ['Résultat attendu', 'Ce que la solution doit produire : ici, le nombre minimal de boîtes.'],
      ['Contrainte', 'Une règle à respecter : une boîte ne peut pas dépasser sa capacité.']
    ],
    hints: [
      'Que faut-il connaître pour savoir si une boîte suffit ?',
      'Garde le nombre de livres et la capacité. Puis remplis les boîtes une à une.',
      'Avec 13 livres et 6 places, on range 6 + 6 + 1 livres. Il faut 3 boîtes. Pour 19 livres et 5 places : 5 + 5 + 5 + 4, donc 4 boîtes.'
    ],
    reflection:
      'Explique le problème à un camarade qui n’a pas vu l’énoncé. Quelles informations lui donnerais-tu ? Quelle question doit-il résoudre ?',
    model:
      'Je connais le nombre de livres et la capacité d’une boîte. Je cherche le plus petit nombre de boîtes permettant de tous les ranger. Je remplis les boîtes une à une ; les derniers livres utilisent une boîte même si elle n’est pas pleine. Par exemple, 13 livres et 6 places demandent 3 boîtes.',
    transfer:
      'Imagine maintenant des crayons à ranger dans des pots : quelles données changent, et quelles étapes restent les mêmes ?'
  },
  {
    id: 'ordonner',
    number: '02',
    short: 'Ordonner',
    title: 'Donner des instructions précises',
    color: 'mint',
    icon: 'robot',
    duration: 20,
    description: 'Construire un chemin et voir ses instructions agir.',
    skill: 'Décrire une séquence d’instructions',
    levels: ['snt', 'premiere'],
    rounds: 2,
    intro:
      'Un ordinateur suit les instructions que tu écris. Il ne devine ni ton intention ni les informations manquantes. Pour l’aider, chaque action doit être précise.',
    exampleTitle: 'Un robot qui ne devine rien',
    example:
      'Un robot se trouve dans le coin supérieur gauche d’une grille. Pour atteindre une case située deux colonnes à droite et une ligne plus bas, « va là-bas » ne suffit pas.',
    walkthrough: [
      [
        'Je précise les actions',
        'Le robot connaît quatre instructions : haut, bas, gauche et droite. Une instruction déplace le robot d’une case.'
      ],
      [
        'Je construis une séquence',
        'Droite, droite, bas est un chemin possible. Je lis les instructions de gauche à droite.'
      ],
      [
        'Je déroule dans ma tête',
        'Après deux déplacements à droite, le robot est sur la troisième colonne. Un déplacement vers le bas l’amène sur la deuxième ligne.'
      ],
      [
        'Je compare',
        'Bas, droite, droite mène aussi à la cible si aucune case n’est bloquée. Deux séquences différentes peuvent résoudre le même problème.'
      ]
    ],
    takeaway:
      'Une séquence est une suite d’instructions exécutées dans un ordre précis. Plusieurs séquences peuvent atteindre le même but.',
    caution:
      'Ici, les directions sont absolues : « droite » signifie toujours vers la droite de l’écran, quelle que soit la direction précédente.',
    vocabulary: [
      ['Instruction', 'Une action élémentaire que la machine sait exécuter.'],
      ['Séquence', 'Une suite ordonnée d’instructions.'],
      ['État', 'La situation à un instant donné : ici, la case occupée par le robot.']
    ],
    hints: [
      'Repère le départ, la cible et la case interdite avant de choisir une direction.',
      'Tu peux contourner la case centrale par le bord supérieur ou le bord gauche. Compte les cases, pas les lignes de séparation.',
      'Première cible : droite, droite, droite, bas, bas, bas. Autre chemin : bas, bas, bas, droite, droite, droite. Pour la cible en haut à droite : droite, droite, droite.'
    ],
    reflection:
      'Raconte ton chemin sans montrer la grille. Explique pourquoi un autre chemin peut aussi être correct, et donne un exemple d’instruction qui échouerait.',
    model:
      'Je pars de la case en haut à gauche et j’exécute une instruction à la fois. Pour atteindre le coin opposé, je peux suivre le bord supérieur puis descendre. Je peux aussi descendre d’abord et suivre le bord inférieur. Les deux solutions évitent l’obstacle et finissent sur la cible.',
    transfer:
      'Si on déplace la cible, faut-il changer toutes les instructions ? Essaie de repérer la partie du chemin que tu peux réutiliser.'
  },
  {
    id: 'decomposer',
    number: '03',
    short: 'Décomposer',
    title: 'Découper pour mieux résoudre',
    color: 'peach',
    icon: 'blocks',
    duration: 25,
    description: 'Transformer une grande tâche en petites tâches utiles.',
    skill: 'Décomposer et reconnaître des dépendances',
    levels: ['snt', 'premiere', 'terminale'],
    rounds: 2,
    intro:
      '« Ranger toute la bibliothèque » semble compliqué. « Compter les livres » est beaucoup plus simple. Décomposer, c’est trouver des petites tâches dont les résultats nous permettent de résoudre le problème de départ.',
    exampleTitle: 'Des petites questions qui s’enchaînent',
    example:
      'Pour préparer le rangement, on peut compter les livres, connaître la capacité des boîtes, calculer le nombre nécessaire, ranger, puis vérifier.',
    walkthrough: [
      [
        'Je sépare les rôles',
        'Recueillir les données, préparer le rangement, réaliser le rangement et contrôler le résultat sont des sous-problèmes.'
      ],
      [
        'Je repère les dépendances',
        'Pour calculer le nombre de boîtes, il faut déjà connaître le nombre de livres ET la capacité.'
      ],
      [
        'Je laisse les choix possibles',
        'On peut compter les livres avant de lire la capacité, ou faire l’inverse. Ces deux tâches ne dépendent pas l’une de l’autre.'
      ],
      [
        'Je rassemble les résultats',
        'Les données permettent le calcul ; le calcul permet de préparer les boîtes ; le contrôle final vérifie que tous les livres sont rangés.'
      ]
    ],
    takeaway:
      'Pour chaque sous-tâche, demande-toi : de quoi a-t-elle besoin ? Que produit-elle pour la suite ?',
    caution:
      'Décomposer ne consiste pas seulement à couper une phrase en morceaux. Chaque partie doit avoir un rôle clair et contribuer au résultat.',
    vocabulary: [
      ['Sous-problème', 'Une partie plus simple du problème initial.'],
      ['Dépendance', 'Une tâche a besoin du résultat d’une autre pour commencer.'],
      ['Réutiliser', 'Employer une solution déjà comprise dans un autre contexte.']
    ],
    hints: [
      'Sépare ce qu’on doit savoir, ce qu’on doit préparer et ce qu’on doit contrôler.',
      'Le calcul du nombre de boîtes dépend de deux informations. Le contrôle vient après le rangement.',
      'Compter et lire la capacité peuvent être échangés. Ensuite : prévoir les boîtes, répartir les objets, vérifier. Les deux premières actions appartiennent au groupe « Données », les deux suivantes à « Organisation », la dernière à « Contrôle ».'
    ],
    reflection:
      'Explique à quoi sert chaque groupe de sous-tâches. Quelles actions peux-tu échanger ? Lesquelles doivent absolument rester dans cet ordre ?',
    model:
      'Je commence par recueillir deux données : le nombre de livres et la capacité. Leur ordre n’a pas d’importance. Je peux ensuite calculer les boîtes nécessaires et répartir les livres. Enfin, je vérifie le rangement. Le calcul dépend des données ; la vérification dépend du rangement.',
    transfer:
      'Des bouteilles doivent être rangées dans des caisses. Quelle partie de ta décomposition peux-tu garder sans rien changer ?'
  },
  {
    id: 'prevoir',
    number: '04',
    short: 'Prévoir',
    title: 'Faire tourner la solution dans sa tête',
    color: 'yellow',
    icon: 'play',
    duration: 25,
    description: 'Prédire les états avant de lancer l’animation.',
    skill: 'Simuler une exécution et suivre des variables',
    levels: ['snt', 'premiere'],
    rounds: 2,
    intro:
      'Avant d’exécuter un programme, on peut jouer le rôle de la machine. On suit une instruction à la fois et on note ce qui change. Cette trace rend notre raisonnement visible.',
    exampleTitle: 'Huit livres, des boîtes de trois',
    example:
      'Au départ : 8 livres restants et 0 boîte utilisée. On prend au maximum 3 livres à chaque tour. On répète tant qu’il en reste.',
    walkthrough: [
      [
        'Je garde l’état initial',
        'restants = 8 et boîtes = 0. Une variable est un nom associé à une valeur qui peut changer.'
      ],
      ['Je fais un premier tour', 'Je range 3 livres : restants devient 5, boîtes devient 1.'],
      [
        'Je répète',
        'Deuxième tour : restants = 2 et boîtes = 2. Troisième tour : je ne prends que les 2 livres restants ; restants = 0 et boîtes = 3.'
      ],
      [
        'Je sais quand m’arrêter',
        'La condition « il reste des livres » devient fausse. La boucle s’arrête. Si aucun livre n’était présent au départ, elle ne ferait aucun tour.'
      ]
    ],
    takeaway:
      'Prévoir → exécuter une étape → comparer → expliquer. Une trace contient l’état initial puis l’état après chaque action.',
    caution:
      'Dans la dernière boîte, on prend le plus petit nombre entre les livres restants et la capacité : on ne range pas des livres imaginaires.',
    vocabulary: [
      ['Variable', 'Un nom qui permet de retrouver une valeur, par exemple restants.'],
      ['Condition', 'Une question dont la réponse est vraie ou fausse.'],
      ['Boucle', 'Une répétition d’instructions, ici tant que restants est supérieur à zéro.']
    ],
    hints: [
      'Observe les deux valeurs actuelles. Combien de livres peux-tu mettre dans la prochaine boîte ?',
      'Retire au plus la capacité, puis ajoute 1 au nombre de boîtes. S’il reste moins de livres que la capacité, retire seulement ce reste.',
      'Avec 13 livres et une capacité de 6 : (13, 0) → (7, 1) → (1, 2) → (0, 3). Avec 10 livres et une capacité de 4 : (10, 0) → (6, 1) → (2, 2) → (0, 3).'
    ],
    reflection:
      'Décris un tour de boucle avec tes mots. Qu’est-ce qui change ? Quelle condition permet de continuer, puis de s’arrêter ?',
    model:
      'À chaque tour, je range au maximum une boîte de livres et j’augmente de un le nombre de boîtes utilisées. Le nombre de livres restants diminue. Je répète tant qu’il est supérieur à zéro. Comme il diminue à chaque tour, je finis par tout ranger.',
    transfer:
      'Prédis ce qui se passerait pour zéro livre. Faut-il préparer une boîte avant même d’avoir vérifié s’il y a des livres ?'
  },
  {
    id: 'tester',
    number: '05',
    short: 'Tester',
    title: 'Chercher le test qui révèle l’erreur',
    color: 'blue',
    icon: 'check',
    duration: 25,
    description: 'Vérifier une idée et apprendre de ses erreurs.',
    skill: 'Construire des tests et corriger une solution',
    levels: ['snt', 'premiere', 'terminale'],
    rounds: 2,
    intro:
      'Une solution peut fonctionner sur un exemple et échouer sur un autre. Tester, c’est choisir des données, prévoir le résultat attendu, puis le comparer au résultat obtenu.',
    exampleTitle: 'Une fausse bonne idée',
    example:
      'On propose : « Divise le nombre de livres par la capacité et garde seulement la partie entière. » Pour 12 livres et 6 places, on obtient 2. Tout semble aller bien…',
    walkthrough: [
      [
        'Je prévois sans le programme',
        'Pour 13 livres et 6 places, je sais qu’il faut 3 boîtes : 6 + 6 + 1.'
      ],
      [
        'Je compare',
        'La division entière 13 // 6 renvoie 2. Le programme oublie donc le dernier livre.'
      ],
      [
        'Je cherche des frontières',
        'Je teste aucun livre, un livre, une boîte pleine et un livre de plus que la capacité. Ces cas ne se comportent pas tous de la même façon.'
      ],
      [
        'Je corrige l’idée',
        'Je compte aussi une boîte pour le reste lorsqu’il est non nul. Puis je relance plusieurs tests, y compris ceux qui passaient déjà.'
      ]
    ],
    takeaway:
      'Un test = des entrées + un résultat attendu + une comparaison. Un contre-exemple suffit à montrer qu’une solution est incorrecte.',
    caution:
      'Même beaucoup de tests réussis ne prouvent pas qu’un programme est correct dans tous les cas.',
    vocabulary: [
      ['Test', 'Une vérification sur des entrées choisies à l’avance.'],
      [
        'Cas limite',
        'Un cas situé à une frontière importante, comme zéro ou une boîte exactement pleine.'
      ],
      ['Contre-exemple', 'Un exemple sur lequel l’algorithme ne donne pas le résultat attendu.']
    ],
    hints: [
      'Cherche un nombre de livres qui ne remplit pas exactement les boîtes.',
      'Avec une capacité de 6, essaie 1, 7 ou 13. Écris d’abord le vrai nombre de boîtes nécessaires.',
      'Pour 7 livres et 6 places, on attend 2 boîtes mais 7 // 6 donne 1. Pour 11 livres et 4 places, on attend 3 boîtes mais 11 // 4 donne 2.'
    ],
    reflection:
      'Quel test a révélé l’erreur ? Pourquoi un test avec une boîte exactement pleine ne suffisait-il pas ? Explique la correction sans utiliser de code.',
    model:
      'Le test 7 livres, capacité 6, résultat attendu 2 révèle l’erreur : la division entière ne compte qu’une boîte. Le test 6 livres ne révèle rien car la boîte est exactement pleine. Je corrige en ajoutant une boîte quand il reste des livres après les boîtes pleines.',
    transfer:
      'Une classe de 25 élèves part dans des véhicules de 8 places. Quel test simple éviterait d’oublier le dernier passager ?'
  },
  {
    id: 'programmer',
    number: '06',
    short: 'Programmer',
    title: 'De ta démarche à Python',
    color: 'lilac',
    icon: 'code',
    duration: 25,
    description: 'Écrire, exécuter et réutiliser sa solution.',
    skill: 'Traduire un algorithme et tester une fonction',
    levels: ['snt', 'premiere'],
    rounds: 3,
    intro:
      'Tu as déjà une démarche. Python sert maintenant à la décrire à la machine. Un algorithme est la méthode ; le programme est une façon de l’écrire dans un langage précis.',
    exampleTitle: 'Une fonction, une petite tâche réutilisable',
    example:
      'La fonction nb_boites(nb_livres, capacite) reçoit deux informations et renvoie un nombre. nb_boites(8, 3) doit renvoyer 3.',
    walkthrough: [
      [
        'Je définis le rôle',
        'def annonce une fonction. Les paramètres entre parenthèses sont les données qu’elle reçoit à chaque appel.'
      ],
      [
        'Je traduis les étapes',
        'Je garde un nombre de livres restants et un compteur de boîtes. while restants > 0: répète le rangement tant qu’il reste des livres.'
      ],
      [
        'Je respecte les blocs',
        'Les lignes décalées vers la droite appartiennent à un bloc. L’indentation de quatre espaces indique ce qui se répète dans la boucle.'
      ],
      [
        'Je renvoie puis je vérifie',
        'return transmet le résultat à celui qui a appelé la fonction. Il doit être placé après la boucle. Les tests appellent la fonction avec plusieurs valeurs.'
      ]
    ],
    takeaway:
      'Tu peux changer le code en gardant le même résultat. L’important est que la solution respecte le contrat sur les entrées prévues.',
    caution:
      'Ici, nb_livres est un entier positif ou nul et capacite un entier strictement positif. Les exercices utilisent des paramètres, sans saisie input().',
    vocabulary: [
      ['Fonction', 'Un ensemble d’instructions nommé qui réalise une tâche.'],
      ['Paramètre', 'Un nom représentant une donnée reçue par la fonction.'],
      ['return', 'L’instruction qui renvoie le résultat et termine l’appel de la fonction.'],
      ['min(a, b)', 'Le plus petit des deux nombres : utile pour la dernière boîte.']
    ],
    hints: [
      'Reprends la trace de la mission précédente. Quelles valeurs doivent changer à chaque tour ?',
      'Initialise boites à 0. Dans la boucle, enlève min(restants, capacite) à restants et ajoute 1 à boites. Renvoie boites après la boucle.',
      'def nb_boites(nb_livres, capacite):\n    restants = nb_livres\n    boites = 0\n    while restants > 0:\n        restants = restants - min(restants, capacite)\n        boites = boites + 1\n    return boites\n\nPour le transfert, adapte le nom en nb_vehicules(passagers, places).'
    ],
    reflection:
      'Relie chaque partie de ton programme à une étape de ta démarche. Pourquoi l’appel avec zéro livre doit-il renvoyer zéro ? Comment réutilises-tu la solution pour des passagers ?',
    model:
      'Les paramètres donnent les livres et la capacité. Je commence avec zéro boîte et tous les livres à ranger. La boucle remplit une boîte à chaque tour jusqu’à ne plus avoir de livres. return renvoie le compteur. Pour zéro livre, la boucle ne commence pas. Le même raisonnement fonctionne pour des passagers et des places.',
    transfer:
      'Comparer deux programmes : l’un remplit les boîtes une à une ; l’autre calcule le quotient et ajoute une boîte s’il y a un reste. Leurs étapes diffèrent, mais leurs résultats peuvent être identiques.'
  }
];
export const missionById = (id) => missions.find((m) => m.id === id);

// A worked answer belongs to one variant: it must not reveal the next challenge.
const variantSolutions = {
  comprendre: [
    'Avec 13 livres et 6 places : 6 + 6 + 1. Il faut 3 boîtes. Les données utiles sont le nombre de livres et la capacité.',
    'Avec 19 livres et 5 places : 5 + 5 + 5 + 4. Il faut 4 boîtes. La couleur des couvertures ne change pas ce résultat.'
  ],
  ordonner: [
    'Pour le coin inférieur droit : droite, droite, droite, bas, bas, bas. Autre chemin : bas, bas, bas, droite, droite, droite.',
    'La nouvelle cible est dans le coin supérieur droit. Depuis le départ, droite, droite, droite suffit.'
  ],
  prevoir: [
    'Avec 13 livres et une capacité de 6 : (13, 0) → (7, 1) → (1, 2) → (0, 3). Chaque paire indique (restants, boîtes).',
    'Avec 10 livres et une capacité de 4 : (10, 0) → (6, 1) → (2, 2) → (0, 3). Chaque paire indique (restants, boîtes).'
  ],
  tester: [
    'Pour 7 livres et 6 places, on attend 2 boîtes mais 7 // 6 donne 1 : voilà un contre-exemple. Le cas zéro livre attend 0 et passe.',
    'Pour 5 livres et 4 places, on attend 2 boîtes mais 5 // 4 donne 1. Pour 4 livres, on attend 1 boîte et le programme renvoie bien 1.'
  ],
  programmer: [
    'Dans la boucle : restants = restants - min(restants, capacite), puis boites = boites + 1. Après la boucle, return boites renvoie le compteur.',
    'def nb_boites(nb_livres, capacite):\n    boites = nb_livres // capacite\n    if nb_livres % capacite != 0:\n        boites = boites + 1\n    return boites',
    'def nb_vehicules(passagers, places):\n    vehicules = 0\n    while passagers > 0:\n        passagers = passagers - min(passagers, places)\n        vehicules = vehicules + 1\n    return vehicules'
  ]
};
export function hintsFor(mission, round) {
  return [...mission.hints.slice(0, 2), variantSolutions[mission.id]?.[round] ?? mission.hints[2]];
}

export const decompositionActions = [
  { id: 'count', label: 'Compter les objets', group: 'data' },
  { id: 'capacity', label: 'Lire la capacité d’une boîte', group: 'data' },
  { id: 'plan', label: 'Prévoir le nombre de boîtes', group: 'organise' },
  { id: 'pack', label: 'Répartir les objets', group: 'organise' },
  { id: 'check', label: 'Vérifier que tout est rangé', group: 'control' }
];

export const pythonTasks = [
  {
    title: 'Compléter la démarche',
    description:
      'Le squelette est prêt. Remplace les deux « pass » : retire les livres rangés, puis augmente le compteur de boîtes.',
    functionName: 'nb_boites',
    code: 'def nb_boites(nb_livres, capacite):\n    restants = nb_livres\n    boites = 0\n    while restants > 0:\n        # Retirer les livres placés dans la boîte\n        pass\n        # Compter cette nouvelle boîte\n        pass\n    return boites\n',
    tests: [
      { args: [0, 6], expected: 0 },
      { args: [1, 6], expected: 1 },
      { args: [6, 6], expected: 1 },
      { args: [7, 6], expected: 2 },
      { args: [13, 6], expected: 3 }
    ]
  },
  {
    title: 'Écrire ta propre version',
    description:
      'À toi d’écrire le corps de la fonction. Tu peux garder la boucle ou choisir une autre démarche. Les tests jugent les résultats.',
    functionName: 'nb_boites',
    code: 'def nb_boites(nb_livres, capacite):\n    # Écris ici ta solution\n    pass\n',
    tests: [
      { args: [0, 4], expected: 0 },
      { args: [1, 4], expected: 1 },
      { args: [4, 4], expected: 1 },
      { args: [11, 4], expected: 3 },
      { args: [19, 5], expected: 4 }
    ]
  },
  {
    title: 'Transférer : le départ en sortie',
    description:
      'On répartit des passagers dans des véhicules de même capacité. Adapte ta solution : nb_vehicules(passagers, places) doit renvoyer le nombre minimal de véhicules.',
    functionName: 'nb_vehicules',
    code: 'def nb_vehicules(passagers, places):\n    # Même problème, de nouveaux mots !\n    pass\n',
    tests: [
      { args: [0, 8], expected: 0 },
      { args: [1, 8], expected: 1 },
      { args: [8, 8], expected: 1 },
      { args: [25, 8], expected: 4 },
      { args: [17, 5], expected: 4 }
    ]
  }
];

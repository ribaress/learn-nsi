export default {
  'snt-gnss-nmea': {
    intro: [
      'Le point bleu d’une carte se déplace avec ton téléphone. Pour le placer, le récepteur transforme des signaux et des nombres en latitude et longitude.',
      'Comment une position est-elle calculée, puis écrite dans un message que l’on peut décoder ?',
      'Lire les unités et les champs d’une trame évite de confondre degrés, minutes et décimales ou d’inverser une direction.',
      [
        'Comprendre ce qu’un récepteur mesure.',
        'Nommer latitude, longitude et hémisphères.',
        'Séparer les champs d’une trame puis convertir les degrés et minutes pas à pas.'
      ]
    ],
    recap: [
      [
        'Coordonnée',
        'Un nombre décrivant une position selon un repère ; sur Terre on emploie notamment latitude et longitude.',
        '48 degrés nord indique une latitude au nord de l’équateur.'
      ],
      [
        'Minute d’angle',
        'Un degré d’angle est partagé en 60 minutes ; ce ne sont pas des minutes de temps.',
        '30 minutes valent 30 / 60 = 0,5 degré.'
      ],
      [
        'Indice et chaîne',
        'Une chaîne est un texte ; les éléments d’une liste sont repérés par des indices commençant à 0.',
        '"A,B,C" séparé aux virgules donne ["A", "B", "C"] et l’indice 2 vaut "C".'
      ]
    ],
    life: [
      [
        'Mesurer un trajet par son temps',
        'À vitesse connue, une durée de trajet permet d’estimer une distance.',
        'Le récepteur exploite les temps de propagation des signaux satellites pour estimer des distances.',
        'Les horloges, erreurs de propagation et positions des satellites exigent des corrections ; un chronomètre ordinaire ne suffit pas.'
      ],
      [
        'Lire une recette avec plusieurs mesures',
        'Une quantité peut s’écrire un litre et un demi-litre, ou 1,5 litre.',
        'Degrés et minutes décrivent aussi une même grandeur sous deux écritures ; on convertit avant d’additionner.',
        'Les minutes d’angle divisent le degré par 60, pas par 100 comme les centilitres divisent un litre.'
      ]
    ],
    sections: [
      [
        'Le téléphone reçoit, puis calcule',
        'GNSS désigne les systèmes de positionnement par satellites, dont GPS est un exemple. Des satellites émettent des informations de temps et de position ; le récepteur mesure des temps d’arrivée et calcule sa propre position. Il n’a pas besoin d’envoyer sa position au satellite pour ce calcul. Avec une vitesse modèle de 300 000 kilomètres par seconde et une durée de 0,07 seconde, distance = vitesse × durée donne 300 000 × 0,07 = 21 000 kilomètres. Le calcul réel doit aussi traiter les erreurs d’horloge et de propagation.'
      ],
      [
        'Deux angles et des directions',
        'La latitude situe un point par rapport à l’équateur, vers le nord ou le sud ; la longitude le situe par rapport à un méridien de référence, vers l’est ou l’ouest. On utilise ici des degrés décimaux positifs pour N, nord, et E, est ; négatifs pour S, sud, et W, ouest. Le W vient de west en anglais. Une position doit donc garder ensemble sa valeur et son hémisphère. Le signe ne mesure pas une mauvaise qualité : −1,5 degré est simplement une longitude située à l’ouest du méridien de référence.'
      ],
      [
        'Lire un message en champs',
        'NMEA décrit des formats de messages de navigation. Une phrase GGA comporte des champs séparés par des virgules. Dans l’extrait des exercices, le premier champ a l’indice 0, la latitude est à l’indice 2, son hémisphère à 3, la longitude à 4 et son hémisphère à 5. En Python, champs = trame.split(",") découpe la chaîne aux virgules ; champs[2] lit la troisième case. return [champs[2], champs[3], champs[4], champs[5]] renvoie quatre textes, sans conversion. Notre extrait est tronqué et l’exercice ne demande ni validation ni somme de contrôle.'
      ],
      [
        'Convertir 4807.038 sans confondre les unités',
        'Dans ce format, le nombre regroupe degrés et minutes : 4807.038 signifie 48 degrés et 7,038 minutes, pas 4807 degrés. On extrait les degrés par division entière : 4807.038 // 100 donne 48. On retrouve les minutes en retirant 48 × 100 = 4 800 ; il reste 7,038. On convertit : 7,038 / 60 = 0,1173 degré. On ajoute 48 pour obtenir 48,1173 degrés. Le nord conserve ce signe positif. Pour 00130.000,W, on obtient 1 + 30 / 60 = 1,5, puis on applique le signe négatif.'
      ],
      [
        'Traduire les étapes en Python',
        'def decimal(champ, hemisphere): définit deux paramètres. Les lignes du corps sont indentées de quatre espaces. // calcule un quotient entier, int le convertit en entier ; * multiplie, / divise, et = conserve un résultat sous un nom. if hemisphere in ["S", "W"]: teste si le texte est l’une des directions négatives ; valeur = -valeur inverse le signe. round(valeur, 6) arrondit à six chiffres après le point décimal. return fournit le résultat. Les entrées sont valides dans ce contrat : la fonction n’interprète pas une trame entière et ne prouve pas la précision de la mesure.',
        'def decimal(champ, hemisphere):\n    degres = int(champ // 100)\n    minutes = champ - degres * 100\n    valeur = degres + minutes / 60\n    if hemisphere in ["S", "W"]:\n        valeur = -valeur\n    return round(valeur, 6)'
      ]
    ],
    pauses: [
      [
        2,
        'Dans une liste dont le premier indice est 0, champs[2] est quelle case ?',
        [
          ['La troisième', '3'],
          ['La deuxième', '2']
        ],
        '3',
        'La première case est 0, la deuxième 1 et la troisième 2. Il faut compter les cases et leur indice séparément.'
      ],
      [
        3,
        '01130.000 E représente quelle longitude décimale ?',
        [
          ['11,5 degrés', '11.5'],
          ['11,30 degrés', '11.30']
        ],
        '11.5',
        'Il y a 11 degrés et 30 minutes. 30 / 60 = 0,5 degré ; est garde le signe positif, donc 11 + 0,5 = 11,5.'
      ]
    ],
    reasoning: [
      'On sépare 48 degrés de 7,038 minutes. Les minutes deviennent 0,1173 degré en divisant par 60, puis 48 + 0,1173 = 48,1173 ; N conserve le signe.',
      'Le zéro initial n’ajoute pas un degré. Les 30 minutes donnent 0,5 degré ; 1 + 0,5 = 1,5, puis W impose −1,5.',
      '0,07 représente sept centièmes de seconde. 300 000 / 100 = 3 000, puis 3 000 × 7 = 21 000 kilomètres dans le modèle idéal.'
    ]
  },
  'snt-couches-osm': {
    intro: [
      'Sur une carte, un chemin semble absent ; sur une photographie aérienne, on le voit. Ces deux vues ne décrivent pas forcément la même date ni les mêmes objets.',
      'Comment choisir une représentation utile et vérifier une information avant de contribuer à une carte ?',
      'Lire couches, dates et échelle permet de répondre à une question concrète sans prendre le dessin affiché pour tout le territoire.',
      [
        'Distinguer base de données et carte affichée.',
        'Choisir les couches adaptées à une question.',
        'Calculer une distance d’après une échelle et préparer une contribution vérifiée.'
      ]
    ],
    recap: [
      [
        'Carte et légende',
        'Une carte sélectionne des informations d’un territoire ; la légende explique ses symboles.',
        'Un trait peut représenter une route, selon la légende de la carte.'
      ],
      [
        'Couche',
        'Un ensemble d’informations que l’on peut superposer à d’autres sur la même zone.',
        'Les routes et les photographies aériennes peuvent être deux couches distinctes.'
      ],
      [
        'Échelle et proportion',
        'Une échelle relie une longueur sur la carte à une longueur réelle ; multiplier l’une multiplie l’autre par le même facteur.',
        'Si 1 cm représente 250 m, 2 cm représentent 500 m.'
      ]
    ],
    life: [
      [
        'Choisir un plan pour une promenade',
        'Tu veux repérer à la fois les bois et les chemins d’un parc.',
        'Une photographie montre la couverture visible du sol ; une couche de chemins rend les passages et leurs noms plus lisibles.',
        'La végétation peut cacher un sentier et une couche peut être ancienne : deux vues ne garantissent pas l’état actuel.'
      ],
      [
        'Un calque posé sur un dessin',
        'Un calque marque les arrêts de bus au-dessus d’un plan du quartier.',
        'Le principe de superposition aide à comprendre les couches cartographiques.',
        'Une couche numérique peut changer avec le zoom, la date et les règles d’affichage ; le calque papier reste fixe.'
      ]
    ],
    sections: [
      [
        'La carte choisit ce qu’elle montre',
        'Un territoire contient des routes, arbres, bâtiments et usages. Une carte n’en affiche qu’une sélection pour répondre à un besoin. La base de données conserve des objets et leurs propriétés ; le rendu est le dessin produit à partir de ces informations. Un banc peut exister dans la base sans être affiché au niveau de zoom choisi. Le zoom agrandit ou réduit la vue, mais il ne crée pas une nouvelle observation du terrain. Avant de déclarer un objet absent, on distingue donc absence du dessin et absence dans les données.'
      ],
      [
        'Choisir des couches complémentaires',
        'Une photographie aérienne montre l’apparence visible de la zone à une date de prise de vue. Une carte routière rend lisibles des voies et des noms ; une couche de limites administratives répond à une autre question. Pour chercher si une zone est boisée et desservie, on combine des informations adaptées plutôt que de choisir la vue la plus jolie. On consulte la légende, la date et le producteur. Superposer deux couches de dates différentes peut révéler un décalage historique, pas nécessairement une erreur de position.'
      ],
      [
        'Calculer avec une échelle annoncée',
        'Supposons que 1 centimètre sur une carte représente 250 mètres sur le terrain. Pour 4 centimètres, on peut additionner quatre fois : 250 + 250 + 250 + 250 = 1 000 mètres, ou calculer 4 × 250 = 1 000. Pour une carte à l’écran, un changement de zoom ou de taille d’affichage change les distances mesurées en centimètres : on utilise l’échelle effectivement affichée. Une barre d’échelle indique une longueur réelle correspondant à sa longueur visible. Le résultat est une estimation sur la représentation utilisée.'
      ],
      [
        'Préparer une contribution OpenStreetMap',
        'OpenStreetMap, souvent abrégé OSM, est une base cartographique collaborative. Une contribution modifie des objets et des propriétés ; elle ne consiste pas simplement à dessiner sur une image. Avant d’ajouter un banc, on le cherche dans les données ou dans l’éditeur pour éviter un doublon. On observe ce que l’on connaît et on utilise des sources autorisées, sans recopier au hasard une carte protégée. On documente le changement ; on évite d’inventer un nom ou une accessibilité parce que cela paraît probable. Une erreur peut affecter de futurs itinéraires.'
      ],
      [
        'Comparer des services et garder la limite du modèle',
        'Des services publics de cartographie, comme les services cartographiques de l’IGN, proposent des fonds et couches utiles ; leurs interfaces et adresses peuvent évoluer. L’important est de retrouver une couche, sa légende et sa provenance plutôt que de mémoriser un emplacement de bouton. Un rendu OSM peut aussi être mis à jour avec retard après une modification de la base. Dans notre activité, aucune contribution n’est publiée : on apprend à justifier la démarche. Une observation de terrain autorisée et datée reste préférable à une déduction à partir d’une vue ambiguë.'
      ]
    ],
    pauses: [
      [
        0,
        'Un banc n’apparaît pas sur une carte. Que vérifier avant de l’ajouter ?',
        [
          ['S’il existe déjà dans la base', 'base'],
          ['Seulement la couleur du fond', 'couleur']
        ],
        'base',
        'Les règles de rendu et le zoom peuvent masquer un objet existant. Ajouter immédiatement pourrait créer un doublon.'
      ],
      [
        2,
        'Si 1 cm représente 250 m, que représentent 4 cm ?',
        [
          ['1 000 m', '1000'],
          ['254 m', '254']
        ],
        '1000',
        'Il faut quatre groupes de 250 mètres : 4 × 250 = 1 000. On multiplie une proportion, on n’ajoute pas 4 à 250.'
      ]
    ],
    reasoning: [
      'On sépare les deux questions : l’occupation visible du sol appelle une photographie ; les voies et leurs noms appellent une couche cartographique. On vérifie ensuite si leurs dates conviennent.',
      'Le dézoom réduit la place disponible pour les textes. Le logiciel peut donc masquer un nom présent dans la base sans supprimer la route ou son nom.',
      'On cherche l’objet dans les données avant de le créer. S’il est déjà présent, il faut étudier son état ou attendre le rendu, plutôt que produire deux objets pour un même banc.'
    ]
  },
  'snt-itineraires': {
    intro: [
      'Pour aller à un rendez-vous, le trajet le plus court à pied peut être différent de celui accessible à vélo. L’application peut aussi enregistrer les déplacements.',
      'Comment comparer des chemins selon un critère annoncé et décider de l’accès à sa position ?',
      'Un calcul d’itinéraire repose sur des données et des règles ; les expliquer permet de vérifier un résultat et de limiter le partage de localisation au besoin réel.',
      [
        'Représenter des lieux et des routes par un graphe.',
        'Additionner les coûts de chemins compatibles.',
        'Coder le calcul d’un chemin et distinguer permission future et traces passées.'
      ]
    ],
    recap: [
      [
        'Graphe et chemin',
        'Un graphe relie des sommets par des arêtes ; un chemin suit des arêtes successives.',
        'A-C-D passe par A-C puis C-D.'
      ],
      [
        'Poids',
        'Un nombre associé à une arête pour le critère choisi, par exemple une durée en minutes.',
        'Deux tronçons de 4 puis 2 minutes prennent 6 minutes dans ce modèle.'
      ],
      [
        'Indice de liste',
        'Les positions d’une liste commencent à 0 ; len donne le nombre d’éléments.',
        'Dans ["A", "C", "D"], chemin[1] vaut "C" et len(chemin) vaut 3.'
      ]
    ],
    life: [
      [
        'Le détour pour éviter un escalier',
        'Le chemin direct comprend un escalier ; un détour est praticable avec une poussette.',
        'Le meilleur trajet dépend du critère et de contraintes d’accessibilité, pas seulement de la distance.',
        'Une application ne peut respecter une contrainte que si les données nécessaires sont présentes et justes.'
      ],
      [
        'Donner rendez-vous sans raconter sa journée',
        'Tu partages une position pour retrouver un proche puis arrêtes ce partage.',
        'Une autorisation pendant l’usage peut mieux correspondre à un besoin ponctuel qu’un accès permanent.',
        'Arrêter le partage ne supprime pas automatiquement les positions déjà reçues ou enregistrées.'
      ]
    ],
    sections: [
      [
        'Passer du territoire à un graphe',
        'On représente des carrefours ou lieux par des sommets A, B, C, D, puis les routes possibles par des arêtes. Un poids donne le coût de chaque tronçon pour le critère choisi : kilomètres, minutes ou autre mesure annoncée. Une route à sens unique doit être orientée ; A-B ne signifie alors pas forcément B-A. Le modèle sélectionne des informations du territoire et peut ignorer travaux, pente ou accessibilité. Avant tout calcul, on vérifie que les liaisons du chemin existent et que leurs unités sont compatibles.'
      ],
      [
        'Additionner chaque tronçon avant de comparer',
        'Pour A-B-D, les coûts 2 et 5 donnent 2 + 5 = 7. Pour A-C-D, les coûts 4 et 2 donnent 4 + 2 = 6. Avec ce critère, A-C-D est préférable car 6 < 7. Les deux chemins ont pourtant deux tronçons : compter les arêtes au lieu de leurs poids ferait perdre l’information utile. Si les poids sont des minutes, 6 signifie six minutes dans le modèle. Un seul chemin chiffré ne suffit pas à affirmer qu’il est le meilleur de tous : il faut connaître les autres possibilités pertinentes.'
      ],
      [
        'Construire les paires successives en Python',
        'Une fonction commence par def cout(chemin, routes):, et son corps est indenté. chemin est une liste de noms ; routes est un dictionnaire associant une clé comme "A-C" au coût. Pour ["A", "C", "D"], les indices 0 et 1 servent de départ de tronçon. range(len(chemin) - 1) fournit ces indices, car la borne finale est exclue. chemin[i] + "-" + chemin[i + 1] colle les textes pour former la clé. On lit ensuite routes[cle] pour obtenir le poids de cette arête orientée.'
      ],
      [
        'Accumuler un coût et couvrir les cas courts',
        'total = 0 prépare l’addition. À chaque paire, total += routes[cle] abrège total = total + routes[cle]. return total après la boucle renvoie le résultat complet. Un chemin à zéro ou un sommet n’a aucune paire successive : son coût reste 0. Les tests fournissent toutes les arêtes nécessaires ; la fonction ne cherche donc pas à réparer une route manquante et ne choisit pas elle-même le meilleur itinéraire. Elle calcule le coût d’un chemin donné, ce qui est une étape plus simple.',
        'def cout(chemin, routes):\n    total = 0\n    for i in range(len(chemin) - 1):\n        cle = chemin[i] + "-" + chemin[i + 1]\n        total += routes[cle]\n    return total'
      ],
      [
        'La position est une donnée dont on choisit l’accès',
        'Une permission de localisation autorise un service à accéder à une position dans certaines conditions. Pour consulter une carte dix minutes, un accès pendant l’usage peut répondre au besoin sans autoriser un suivi permanent. On examine aussi le compte, l’historique des trajets et l’audience d’un partage. Retirer une permission aujourd’hui agit sur l’accès futur ; cela ne supprime pas automatiquement les trajets déjà conservés sur un serveur. La mesure GNSS calcule une position, tandis que la transmission et la conservation sont d’autres actions : on doit les distinguer pour expliquer où restent les traces.'
      ]
    ],
    pauses: [
      [
        1,
        'Avec A-B-D coût 7 et A-C-D coût 6, lequel minimise le coût annoncé ?',
        [
          ['A-C-D', 'ACD'],
          ['Ils sont égaux car chacun a deux tronçons', 'egal']
        ],
        'ACD',
        'Les poids du modèle doivent être additionnés. Deux tronçons peuvent porter des coûts différents : 6 est inférieur à 7.'
      ],
      [
        3,
        'Quel coût pour un chemin avec un seul sommet et aucun déplacement ?',
        [
          ['0', '0'],
          ['1, car il y a un sommet', '1']
        ],
        '0',
        'Le coût s’accumule sur les arêtes parcourues, pas sur les noms présents dans la liste. Aucun tronçon donne une somme vide égale à 0.'
      ]
    ],
    reasoning: [
      'On découpe chaque chemin en deux arêtes : A-B puis B-D donnent 2 + 5 = 7 ; A-C puis C-D donnent 4 + 2 = 6. On compare seulement après ces additions.',
      'On annonce d’abord l’objectif : minimiser la distance, le temps ou l’effort ne produit pas forcément le même résultat. Une route inaccessible doit être exclue avant de comparer les coûts.',
      'On sépare le droit d’accéder aux nouvelles positions de la conservation des positions passées. Modifier la permission peut limiter le futur sans réécrire les archives du compte.'
    ]
  }
};

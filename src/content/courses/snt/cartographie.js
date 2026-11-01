import {
  lesson,
  answer as a,
  python as p,
  tableActivity as table,
  networkActivity as net
} from './authoring.js';
export default {
  id: 'cartographie',
  title: 'Localisation, cartographie et mobilité',
  lessons: [
    lesson({
      id: 'snt-gnss-nmea',
      title: 'Se positionner et décoder une trame NMEA',
      duration: 45,
      prerequisites: ['Nombres décimaux et chaînes Python.'],
      objectives: [
        'Expliquer une mesure de distance par temps de propagation.',
        'Convertir degrés et minutes en degrés décimaux.'
      ],
      official: ['satellites', 'nmea'],
      sections: [
        [
          'Le récepteur calcule sa position',
          'GPS et Galileo appartiennent aux systèmes de navigation par satellites. Les satellites émettent des informations de temps et d’orbite ; le récepteur utilise les temps de propagation pour estimer des distances et calculer sa position. En pratique, au moins quatre satellites permettent de résoudre les trois coordonnées et le décalage de l’horloge du récepteur : [explication ESA](https://www.esa.int/Applications/Satellite_navigation/How_does_it_work). Le téléphone n’a pas besoin d’envoyer sa position aux satellites pour effectuer ce calcul.'
        ],
        [
          'De la position au message',
          'Un récepteur peut fournir des phrases NMEA 0183, c’est-à-dire des chaînes de champs séparés par des virgules. Dans une phrase GGA, on trouve notamment heure, latitude, hémisphère, longitude et qualité de la mesure. La latitude prend une forme ddmm.mmmm, la longitude dddmm.mmmm : il faut séparer degrés et minutes. Lire 4807.038 comme 4807 degrés ou comme 48,07038 degrés serait incorrect. Le début de phrase et la somme de contrôle aident à identifier et contrôler le message.'
        ],
        [
          'Convertir et interpréter',
          'Une minute vaut un soixantième de degré : 48 degrés et 7,038 minutes donnent 48 + 7,038/60 = 48,1173 degrés. Les lettres S et W conduisent à un signe négatif en coordonnées décimales usuelles ; N et E à un signe positif. Une trame sans position valide ne doit pas être traitée comme une mesure certaine. Bâtiments, réflexions, brouillage et atmosphère peuvent dégrader la réception ; une longue suite de décimales ne démontre pas une précision équivalente.'
        ]
      ],
      examples: [
        [
          'Une latitude',
          'Le champ 4807.038,N indique 48 degrés et 7,038 minutes nord.',
          'On garde les degrés entiers et on divise les minutes par 60.',
          'La latitude vaut 48,1173 degrés ; le nord donne un signe positif.'
        ],
        [
          'Une longitude ouest',
          'Le champ 00130.000,W correspond à 1 degré et 30 minutes ouest.',
          '30 minutes valent un demi-degré ; l’ouest impose le signe négatif.',
          'La longitude vaut −1,5 degré, pas −1,30 degré.'
        ],
        [
          'Une distance idéale',
          'Un signal se propage pendant 0,07 s à 300 000 km/s dans un modèle simplifié.',
          'Distance = vitesse × durée, soit 300 000 × 0,07.',
          'La distance modèle vaut 21 000 km ; un calcul GNSS réel doit corriger des erreurs d’horloge et de propagation.'
        ]
      ],
      activity: table(
        'Décode les champs de cette trame GGA d’exemple : $GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47.',
        'Prévois si 01131.000 représente 11,31 degrés.',
        'Ce modèle est un extrait de message, pas un récepteur GNSS ; il ne simule pas les satellites et ne valide pas automatiquement toutes les trames.',
        ['champ', 'valeur'],
        [
          ['heure UTC', '12:35:19'],
          ['latitude', '4807.038 N'],
          ['longitude', '01131.000 E'],
          ['qualité', '1']
        ]
      ),
      exercises: [
        a(
          'Une longitude vaut 01130.000 E en degrés et minutes. Quelle valeur décimale donne-t-elle ? Utilise un point décimal.',
          '11.5',
          ['Sépare 11 degrés et 30 minutes.', '30/60 = 0.5.', 'Est conserve le signe positif.'],
          '11 + 30/60 vaut 11,5 degrés est.',
          'Les minutes sont en base 60, pas en centièmes de degré.'
        ),
        p(
          'Écris decimal(champ, hemisphere), champ étant un nombre NMEA degrés×100 + minutes (par exemple 4807.038). Renvoyer les degrés décimaux arrondis à 6 décimales, négatifs pour S ou W. Entrées valides fournies.',
          'decimal',
          'def decimal(champ, hemisphere):\n    pass',
          'def decimal(champ, hemisphere):\n    degres = int(champ // 100)\n    minutes = champ - degres * 100\n    valeur = degres + minutes / 60\n    if hemisphere in ["S", "W"]:\n        valeur = -valeur\n    return round(valeur, 6)',
          [
            [[4807.038, 'N'], 48.1173],
            [[130, 'W'], -1.5],
            [[0, 'E'], 0]
          ],
          [
            'Les degrés sont la partie entière de champ/100.',
            'Le reste correspond aux minutes à diviser par 60.',
            'Applique le signe puis arrondis avec round(valeur, 6).'
          ],
          'La conversion respecte la base soixante des minutes ; l’arrondi facilite la comparaison des résultats flottants.',
          'Diviser tout le champ par 100 conserve à tort les minutes comme des centièmes.'
        ),
        p(
          'Écris position(trame) pour un extrait de phrase GGA, tronqué après le nombre de satellites, dont la latitude est au champ 2 et la longitude au champ 4 (le premier champ a l’indice 0). Renvoyer [champ_latitude, hemisphere_latitude, champ_longitude, hemisphere_longitude] comme chaînes ; aucune conversion ni validation demandée.',
          'position',
          'def position(trame):\n    pass',
          'def position(trame):\n    champs = trame.split(",")\n    return [champs[2], champs[3], champs[4], champs[5]]',
          [
            [['$GPGGA,123519,4807.038,N,01131.000,E,1,08'], ['4807.038', 'N', '01131.000', 'E']],
            [['$GNGGA,000000,1230.000,S,00130.000,W,1,07'], ['1230.000', 'S', '00130.000', 'W']],
            [['$GPGGA,110000,0000.000,N,00000.000,E,1,06'], ['0000.000', 'N', '00000.000', 'E']]
          ],
          [
            'Découpe la chaîne sur les virgules.',
            'L’indice 0 contient le type de phrase.',
            'Prélève les indices 2, 3, 4 et 5.'
          ],
          'Le découpage extrait les coordonnées sans perdre leurs zéros initiaux ; le statut et la somme de contrôle restent hors de cet exercice ciblé.',
          'Vérifie le décalage d’indice : le champ heure porte l’indice 1, pas 0.'
        )
      ],
      reflection:
        'Autoévaluation : explique la différence entre obtenir une position et partager cette position. Interprète ensuite latitude, longitude et qualité de la trame complète sans confondre précision affichée et précision réelle.',
      review: [
        'Je décris le rôle des satellites.',
        'Je convertis minutes en degrés.',
        'Je lis les champs NMEA sans décalage.'
      ]
    }),
    lesson({
      id: 'snt-couches-osm',
      title: 'Choisir des couches et contribuer à une carte',
      duration: 40,
      prerequisites: ['Latitude et longitude.'],
      objectives: [
        'Sélectionner une couche selon la question posée.',
        'Préparer une contribution OSM vérifiée et documentée.'
      ],
      official: ['couches', 'osm'],
      sections: [
        [
          'La carte n’est pas le territoire',
          'Une carte sélectionne des informations : routes, relief, bâtiments, photographies aériennes ou parcelles. Une couche superposée ajoute un type d’information, mais sa date et son producteur restent importants. Une photographie peut montrer une situation ancienne ; une parcelle cadastrale n’indique pas nécessairement une limite visible sur le terrain. Le niveau de zoom change la généralisation : tous les noms et détails ne peuvent rester lisibles à toutes les échelles.'
        ],
        [
          'Passer de Géoportail au service actuel',
          'Le programme mentionne Géoportail pour l’exploration de couches. L’IGN indique le passage de ses fonctionnalités vers cartes.gouv.fr et une fin d’accès à Géoportail au 30 septembre 2026 : [FAQ IGN](https://www.ign.fr/institut/faq). Pour la manipulation actuelle, on utilise [cartes.gouv.fr](https://cartes.gouv.fr/), on cherche un lieu public puis on compare carte, photo aérienne et une couche thématique disponible. On note le zoom, la légende et les dates ; modifier la transparence aide à comparer sans confondre les sources.'
        ],
        [
          'Contribuer sans inventer',
          'OpenStreetMap est une base géographique collaborative, dont plusieurs cartes affichent des rendus. Un objet possède des attributs décrivant sa nature. Avant d’ajouter un banc public, on vérifie son existence, sa position et l’absence d’un doublon. On peut préparer une modification dans le tutoriel de l’éditeur, puis documenter un changement réel avec une source autorisée et un commentaire compréhensible : [accueil des contributeurs OSM](https://www.openstreetmap.org/welcome). Une donnée privée ou copiée d’une carte sans autorisation ne devient pas acceptable parce que la contribution est collaborative.'
        ]
      ],
      examples: [
        [
          'Choisir une vue',
          'On cherche si une zone est boisée et comment elle est desservie.',
          'Une photographie montre la couverture visible ; une carte routière aide à lire les voies et noms.',
          'Deux couches complémentaires répondent mieux qu’un fond unique, sous réserve de leur date.'
        ],
        [
          'Changer d’échelle',
          'Une petite route n’a plus de nom quand on dézoome.',
          'L’affichage simplifie les détails pour éviter les chevauchements.',
          'L’absence de nom affiché ne prouve pas l’absence de route dans la base.'
        ],
        [
          'Éviter un doublon',
          'Un banc semble manquer sur un rendu, mais apparaît dans l’éditeur.',
          'Le rendu peut être retardé ou ne pas afficher tous les objets ; on examine la base avant de créer.',
          'On corrige l’objet existant si nécessaire ; on ne crée pas une seconde copie.'
        ]
      ],
      activity: table(
        'Associe chaque question à une couche, puis précise quelle information de date tu dois examiner.',
        'Prévois si une photographie seule prouve le nom officiel d’une route.',
        'Ce modèle est un catalogue fictif de couches ; il ne remplace pas l’exploration actuelle du service cartographique.',
        ['question', 'couche utile'],
        [
          ['occupation visible du sol', 'photographie aérienne'],
          ['altitude et pentes', 'relief'],
          ['voies et toponymes', 'carte topographique']
        ]
      ),
      exercises: [
        a(
          'Pour observer l’occupation visible du sol à une date donnée, choisis « photographie aérienne » ou « liste des abonnés ».',
          'photographie aérienne',
          [
            'On cherche une information spatiale visible.',
            'Une photo aérienne montre le sol.',
            'Il faut encore vérifier sa date.'
          ],
          'La photographie aérienne renseigne l’occupation visible du sol au moment de la prise de vue.',
          'Choisis une couche selon la question posée ; une source sans rapport n’aide pas même si elle est détaillée.'
        ),
        a(
          'Un banc n’apparaît pas sur un rendu OSM. Avant d’en ajouter un, faut-il « chercher un objet existant » ou « créer immédiatement » ?',
          'chercher un objet existant',
          [
            'Le rendu ne montre pas tout.',
            'Un objet peut déjà être présent dans la base.',
            'Commence par éviter les doublons.'
          ],
          'L’inspection de la base et du terrain précède une création.',
          'Une absence à l’écran peut être une limite du rendu : ne la transforme pas en preuve.'
        ),
        a(
          'Une carte affiche 1 cm pour 250 m. Quelle distance réelle représente 4 cm, en mètres ?',
          '1000',
          [
            'La correspondance est proportionnelle.',
            'Multiplie 250 par 4.',
            'Le résultat demandé reste en mètres.'
          ],
          'Quatre segments de 250 m représentent 1000 m à cette échelle fixe.',
          'Changer le zoom change l’échelle : utilise ici seulement celle annoncée.'
        )
      ],
      reflection:
        'Autoévaluation pratique : compare trois couches d’un lieu public sur cartes.gouv.fr. À deux, prépare une contribution OSM dans le tutoriel, vérifie le terrain et les sources, puis réalise seulement une correction réelle justifiée dans le cadre de la classe ; le modèle local ne publie rien et cette manipulation reste distincte des exercices.',
      review: [
        'Je sélectionne des couches adaptées.',
        'Je vérifie dates et légendes.',
        'Je prépare une contribution sans doublon.'
      ]
    }),
    lesson({
      id: 'snt-itineraires',
      title: 'Calculer un itinéraire et maîtriser son partage de position',
      duration: 40,
      prerequisites: ['Lire un graphe pondéré.'],
      objectives: [
        'Comparer des chemins selon un critère annoncé.',
        'Distinguer calcul local de position et transmission à une application.'
      ],
      official: ['logiciel-itineraire', 'graphe-itineraire', 'position-privee'],
      sections: [
        [
          'Transformer un déplacement en problème',
          'On peut représenter les carrefours par des sommets et les tronçons par des arêtes. Chaque arête reçoit un coût : distance, temps estimé ou autre critère. Un sens unique peut imposer une arête orientée. Le coût d’un chemin est la somme de ses tronçons ; le meilleur chemin dépend donc du critère et des voies autorisées. Une application de randonnée et une application automobile ne doivent pas nécessairement proposer la même route.'
        ],
        [
          'Calculer puis vérifier',
          'Dans le modèle A-B=2, B-D=5, A-C=4, C-D=2, le chemin A-C-D coûte 6 contre 7 pour A-B-D. La minimisation se fait sur des données et hypothèses : vitesse constante, travaux connus, mode de transport. Un logiciel réel peut ignorer une fermeture récente ; l’utilisateur doit vérifier les informations disponibles et les conditions du trajet. La durée estimée n’est pas une réservation de temps de parcours, de même que l’itinéraire n’autorise pas l’accès à une voie interdite.'
        ],
        [
          'La localisation a une audience',
          'Le récepteur peut calculer sa position sans la transmettre ; une application autorisée peut ensuite l’envoyer à un service. Sur un téléphone, on examine les permissions par application, la précision proposée et l’autorisation pendant l’utilisation ou en arrière-plan. On vérifie aussi l’historique du compte et les partages de position actifs. Retirer une permission future n’efface pas nécessairement les positions déjà enregistrées. Le besoin d’une carte ponctuelle ne justifie pas automatiquement un suivi permanent.'
        ]
      ],
      examples: [
        [
          'Deux chemins comparés',
          'A-B-D vaut 2+5 ; A-C-D vaut 4+2.',
          'On additionne les arêtes avant de comparer.',
          'A-C-D est meilleur avec un coût 6 ; compter seulement les deux tronçons donnerait une égalité trompeuse.'
        ],
        [
          'Un autre critère',
          'Un trajet court possède une forte pente ; un détour est accessible aux vélos.',
          'La distance seule ne capture pas l’accessibilité ni l’effort.',
          'Le « meilleur » trajet exige un critère et des contraintes explicites.'
        ],
        [
          'Une permission limitée',
          'Une carte consultée dix minutes demande la position toujours.',
          'Le besoin ponctuel peut correspondre à une autorisation pendant l’usage.',
          'Limiter l’autorisation réduit le suivi futur sans supprimer les traces déjà transmises.'
        ]
      ],
      activity: net(
        'map',
        'Compare A-B-D et A-C-D puis justifie le trajet de coût minimal.',
        'Prévois si le dessin le plus droit est nécessairement le trajet de coût minimal.',
        'Ce modèle cartographique est un graphe abstrait : positions et coûts sont fictifs, sans projection géographique ni trafic réel.',
        [
          ['A', 'B', 2],
          ['B', 'D', 5],
          ['A', 'C', 4],
          ['C', 'D', 2]
        ]
      ),
      exercises: [
        a(
          'Quel est le coût du chemin A-C-D si A-C vaut 4 et C-D vaut 2 ?',
          '6',
          ['Isole les deux arêtes du chemin.', 'Additionne leurs poids.', 'Calcule 4 + 2.'],
          'Le coût du chemin vaut 6 unités annoncées.',
          'Le nombre de sommets ou la longueur visuelle ne remplace pas la somme des poids.'
        ),
        p(
          'Écris cout(chemin, routes). chemin est une liste de sommets ; routes est un dictionnaire de clés "A-B" pour des arêtes orientées, toutes présentes pour ce chemin. Renvoie la somme des poids. Un chemin de zéro ou un sommet coûte 0.',
          'cout',
          'def cout(chemin, routes):\n    pass',
          'def cout(chemin, routes):\n    total = 0\n    for i in range(len(chemin) - 1):\n        cle = chemin[i] + "-" + chemin[i + 1]\n        total += routes[cle]\n    return total',
          [
            [[['A', 'C', 'D'], { 'A-C': 4, 'C-D': 2 }], 6],
            [[['A'], {}], 0],
            [[[], {}], 0]
          ],
          [
            'Parcours les paires de sommets consécutifs.',
            'Construis la clé avec un tiret entre les noms.',
            'Additionne len(chemin)-1 arêtes.'
          ],
          'La somme porte sur les tronçons parcourus ; l’orientation est explicite dans les clés.',
          'Si tu dépasses la liste, arrête-toi avant le dernier sommet pour lire i+1.'
        ),
        a(
          'Retirer aujourd’hui l’autorisation de localisation efface-t-il automatiquement tous les trajets déjà sauvegardés sur un compte ? Réponds oui ou non.',
          'non',
          [
            'Une permission règle l’accès futur.',
            'Les trajets ont déjà été envoyés.',
            'L’historique distant possède ses propres réglages.'
          ],
          'L’autorisation et la conservation de l’historique sont deux mécanismes distincts.',
          'Sépare collecte future et effacement des données déjà enregistrées.'
        )
      ],
      reflection:
        'Autoévaluation pratique : dans un logiciel cartographique disponible, compare deux itinéraires publics pour deux modes de déplacement, note critère et durée estimée. Sur un téléphone ou une démonstration, retrouve la permission de position et l’historique sans exposer un trajet personnel.',
      review: [
        'Je pondère un graphe par un critère.',
        'Je vérifie les limites d’un itinéraire.',
        'Je contrôle permissions et historique.'
      ]
    })
  ]
};

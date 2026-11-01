import { lesson, answer as a, python as p, tableActivity as table } from './authoring.js';

export default {
  id: 'programmation',
  title: 'Programmer et situer le numérique',
  lessons: [
    lesson({
      id: 'snt-reperes-historiques',
      title: 'Des machines isolées aux usages connectés',
      duration: 30,
      prerequisites: ['Savoir placer des dates sur une frise.'],
      objectives: [
        'Distinguer invention, diffusion et transformation des usages.',
        'Situer le Web parmi les autres techniques numériques.'
      ],
      official: ['histoire-web'],
      sections: [
        [
          'Des supports aux traitements',
          'Un progrès numérique ne remplace pas instantanément les techniques précédentes. Le disque dur apparaît en 1956 ; le modèle relationnel proposé par Codd en 1970 organise les données en tables ; VisiCalc popularise le tableur en 1979. Ce sont trois réponses différentes : conserver, structurer et calculer. Dans la photographie, les premiers appareils numériques de 1975 s’appuient sur les capteurs électroniques développés auparavant ; les algorithmes de traitement feront ensuite évoluer le résultat obtenu à matériel comparable.'
        ],
        [
          'Internet et Web : deux chronologies',
          'ARPANET et Cyclades expérimentent les réseaux à commutation de paquets au début des années 1970. Le passage d’ARPANET à TCP/IP en 1983 constitue un jalon d’Internet. Le Web est proposé au CERN en 1989 par Tim Berners-Lee ; sa mise à disposition libre en 1993 facilite sa diffusion. Internet transporte des messages entre machines ; le Web relie des ressources par hypertexte. Le courrier électronique peut donc exister sur Internet sans être lui-même une page Web.'
        ],
        [
          'Convergences et regard critique',
          'La localisation par satellites se développe avec GPS, dont un premier satellite est lancé en 1978. Les systèmes embarqués contrôlent déjà des objets avant l’expression « internet des objets », introduite en 1999. Les réseaux sociaux du Web se diffusent dans les années 2000 ; le smartphone rassemble ensuite carte, appareil photo et communication. Une frise donne des repères, pas une explication unique : infrastructure, accès économique, standards et choix des utilisateurs contribuent ensemble à la diffusion.'
        ]
      ],
      examples: [
        [
          'Deux dates différentes',
          '1983 pour TCP/IP et 1989 pour la proposition du Web.',
          'On compare le transport entre machines à un service construit sur ce transport ; les objets historiques sont distincts.',
          'Le Web arrive après Internet ; il ne désigne pas tout Internet.'
        ],
        [
          'Un changement de travail',
          'Une feuille de calcul papier devient un document VisiCalc.',
          'La valeur n’est pas seulement copiée : des formules recalculent les autres cellules après modification.',
          'L’automatisation du calcul transforme le travail ; le tableur ne garantit pas la justesse des formules.'
        ],
        [
          'Convergence du téléphone',
          'Un smartphone photographie puis transmet une position et une image.',
          'Capteur, géolocalisation, processeur et réseau coopèrent, chacun provenant d’une histoire différente.',
          'Un même objet rassemble plusieurs techniques ; sa date de lancement n’est pas celle de toutes leurs inventions.'
        ]
      ],
      activity: table(
        'Reconstitue l’ordre des jalons et indique oralement le problème auquel chacun répond.',
        'Prévois si le Web précède ou suit la généralisation de TCP/IP.',
        'Ce tableau est une sélection de repères historiques, pas une histoire exhaustive ni une mesure de diffusion.',
        ['année', 'jalon'],
        [
          [1956, 'disque dur'],
          [1970, 'modèle relationnel'],
          [1978, 'satellite GPS'],
          [1983, 'TCP/IP'],
          [1989, 'proposition Web'],
          [1993, 'Web librement disponible']
        ]
      ),
      exercises: [
        a(
          'Quel jalon est le plus ancien : proposition du Web (1989) ou adoption de TCP/IP par ARPANET (1983) ? Réponds TCP/IP ou Web.',
          'TCP/IP',
          [
            'Compare les deux années.',
            '1983 est inférieur à 1989.',
            'Le transport réseau est antérieur au service hypertexte.'
          ],
          '1983 précède 1989 : TCP/IP est le jalon le plus ancien de cette comparaison.',
          'Ne prends pas la popularité d’un service pour sa date d’apparition : replace les deux années.'
        ),
        a(
          'Combien d’années séparent la proposition du Web en 1989 de sa mise à disposition libre en 1993 ?',
          '4',
          [
            'Repère le début et la fin.',
            'Soustrais la première année de la seconde.',
            'Calcule 1993 − 1989.'
          ],
          'La différence 1993 − 1989 vaut 4 ; on ne compte pas ici chaque année incluse.',
          'Tu as peut-être compté les bornes deux fois ; calcule une durée par soustraction.'
        ),
        a(
          'Une application envoie un courriel par SMTP sans afficher de page. Le service de transport employé relève-t-il d’Internet ou obligatoirement du Web ? Réponds Internet ou Web.',
          'Internet',
          [
            'Le Web est un ensemble de ressources hypertextes.',
            'Internet peut transporter plusieurs protocoles applicatifs.',
            'SMTP n’est pas HTTP.'
          ],
          'Le transport relève d’Internet ; les services ne se réduisent pas au Web.',
          'Une application connectée n’est pas nécessairement une application Web ; identifie son protocole.'
        )
      ],
      reflection:
        'Autoévaluation : choisis une technique de la frise et explique comment une invention, un standard et un usage peuvent évoluer à des dates différentes. Compare ton explication aux distinctions de la leçon.',
      review: [
        'Je situe 1983, 1989 et 1993.',
        'Je distingue Internet et Web.',
        'Je relie un jalon à une transformation des usages.'
      ]
    }),
    lesson({
      id: 'snt-variables',
      title: 'Décrire une situation avec des variables',
      duration: 35,
      prerequisites: ['Calculer avec des nombres entiers.'],
      objectives: [
        'Suivre des affectations dans leur ordre.',
        'Écrire une fonction qui reçoit une donnée et renvoie un résultat.'
      ],
      official: ['programmer'],
      sections: [
        [
          'Un nom pour une valeur',
          'En Python, une variable associe un nom à une valeur. L’instruction taille = 3 affecte le nombre 3 au nom taille ; ce signe égal n’est pas une équation à résoudre. Dans taille = taille + 2, Python lit d’abord l’ancienne valeur, calcule 5, puis réaffecte le nom. Les instructions s’exécutent dans l’ordre : inverser deux lignes peut modifier le résultat. Une trace écrite des valeurs après chaque ligne rend cette évolution visible.'
        ],
        [
          'Des types utiles',
          'Un nombre entier sert à compter des pixels ; un flottant représente une mesure approchée ; une chaîne contient du texte. La chaîne "12" n’est pas le nombre 12 : on doit convertir avec int avant un calcul numérique. Choisir une unité fait partie du modèle. Une taille de 8 mégabits n’est pas une taille de 8 mégaoctets : un octet contient huit bits. Le programme ne devine ni l’unité ni l’intention de son auteur.'
        ],
        [
          'Isoler un calcul dans une fonction',
          'Une fonction reçoit des paramètres et renvoie une valeur avec return. Elle permet de refaire le même calcul pour plusieurs entrées sans copier le programme. Le nom du paramètre est local à l’appel ; un test compare le résultat renvoyé à celui qu’on attend. Afficher avec print est utile pour observer mais ne remplace pas return. On commence par un cas calculé à la main, puis on essaie zéro et une autre valeur afin de repérer les erreurs de formule.',
          'def octets(bits):\n    return bits // 8'
        ]
      ],
      examples: [
        [
          'Une variable mise à jour',
          'x = 4 ; puis x = x + 3 ; puis y = 2 * x.',
          'La seconde instruction remplace 4 par 7, la troisième lit 7 sans modifier x.',
          'x vaut 7 et y vaut 14 ; x ne vaut pas simultanément 4 et 7.'
        ],
        [
          'Texte et nombre',
          '"12" + "3" et int("12") + 3.',
          'Deux chaînes se concatènent ; après conversion, deux entiers s’additionnent.',
          'On obtient "123" dans le premier cas et 15 dans le second.'
        ],
        [
          'Une durée de transfert idéale',
          '240 octets à 80 octets par seconde, sans surcharge.',
          'Le quotient taille/débit donne 240/80 ; les unités octets se simplifient.',
          'La durée idéale est 3 secondes ; un transfert réel ajoute attentes et en-têtes.'
        ]
      ],
      activity: {
        type: 'trace',
        prompt: 'Avance dans la trace et annonce la valeur suivante avant de l’afficher.',
        prediction: 'Après la mise à jour de taille, quel nom conserve la valeur précédente ?',
        explanation: 'Ce modèle suit des affectations Python ; il ne mesure pas un transfert réel.',
        config: {
          code: 'taille = 4\nancienne = taille\ntaille = taille + 3',
          frames: [
            { line: 1, variables: { taille: 4 }, explanation: 'Le nom taille reçoit 4.' },
            {
              line: 2,
              variables: { taille: 4, ancienne: 4 },
              explanation: 'ancienne reçoit la valeur lue.'
            },
            {
              line: 3,
              variables: { taille: 7, ancienne: 4 },
              explanation: 'Seul taille est réaffecté.'
            }
          ]
        }
      },
      exercises: [
        a(
          'x vaut 6. On exécute y = x + 2 puis x = 1. Quelle est la valeur finale de y ?',
          '8',
          [
            'Suis d’abord la première instruction.',
            'y reçoit un nombre calculé, pas une formule permanente.',
            'Changer ensuite x ne recalcule pas y.'
          ],
          'y reçoit 6 + 2 = 8 et ne change plus.',
          'Ne traite pas y comme une cellule de tableur liée à x : l’affectation est exécutée une fois.'
        ),
        p(
          'Écris bits(octets) qui renvoie le nombre de bits correspondant à un nombre entier positif ou nul d’octets.',
          'bits',
          'def bits(octets):\n    pass',
          'def bits(octets):\n    return octets * 8',
          [
            [[0], 0],
            [[1], 8],
            [[125], 1000]
          ],
          [
            'Un octet correspond à huit bits.',
            'Multiplie le paramètre par 8.',
            'Renvoie le résultat avec return.'
          ],
          'Le facteur huit convertit les octets en bits ; aucune division n’est nécessaire.',
          'Si tu as imprimé le résultat, remplace print par return ; vérifie aussi le sens de la conversion.'
        ),
        p(
          'Écris taille_image(largeur, hauteur) qui renvoie la taille brute en octets d’une image RVB, 3 octets par pixel, sans métadonnées ni compression.',
          'taille_image',
          'def taille_image(largeur, hauteur):\n    pass',
          'def taille_image(largeur, hauteur):\n    return largeur * hauteur * 3',
          [
            [[2, 3], 18],
            [[1, 1], 3],
            [[0, 7], 0]
          ],
          [
            'Compte les pixels avec largeur × hauteur.',
            'Chaque pixel occupe trois octets dans ce modèle.',
            'Renvoie le produit des trois facteurs.'
          ],
          'La surface compte les pixels, puis le facteur 3 donne les octets. La taille du fichier JPEG réel peut être différente.',
          'Additionner largeur et hauteur compte un périmètre ; recommence par le nombre de cases de la matrice.'
        )
      ],
      reflection:
        'Autoévaluation : explique pourquoi print et return ne jouent pas le même rôle. Vérifie ton explication en appelant mentalement deux fois la fonction bits avec des paramètres différents.',
      review: [
        'Je distingue chaîne et entier.',
        'Je déroule des affectations.',
        'Je renvoie un résultat avec return.'
      ]
    }),
    lesson({
      id: 'snt-conditions',
      title: 'Décider avec des conditions',
      duration: 35,
      prerequisites: ['Affectations et fonctions Python.'],
      objectives: [
        'Construire un test booléen avec une frontière précise.',
        'Traduire une règle en branches exclusives.'
      ],
      official: ['programmer'],
      sections: [
        [
          'Vrai ou faux',
          'Une comparaison produit un booléen : True ou False. L’opérateur == compare deux valeurs, tandis que = affecte un nom. Pour une alerte dès 30 degrés, le test est temperature >= 30 ; remplacer >= par > oublie exactement 30. Les seuils doivent donc être écrits avec leur unité et une phrase précise. Tester une valeur inférieure, une valeur égale et une valeur supérieure au seuil permet de vérifier la frontière plutôt que seulement un cas confortable.'
        ],
        [
          'Choisir une branche',
          'La construction if/else exécute une branche quand le test est vrai et l’autre quand il est faux. L’indentation délimite les instructions de chaque branche. Plusieurs if indépendants peuvent tous s’exécuter, alors qu’une chaîne if/elif/else choisit la première branche satisfaite. Pour classer une batterie faible, moyenne ou haute, on ordonne les frontières et on vérifie que toutes les valeurs prévues rencontrent une réponse.'
        ],
        [
          'Combiner sans surinterpréter',
          'and exige que les deux conditions soient vraies ; or en exige au moins une. not inverse un booléen. Une autorisation peut demander age >= 15 and accord ; une alerte peut être déclenchée par fumee or chaleur. Ce programme applique une règle définie, il ne comprend pas la sécurité d’une situation réelle. Si le capteur est défaillant ou l’entrée hors domaine, une comparaison peut donner une réponse techniquement correcte mais inadaptée ; le domaine des entrées doit être annoncé.',
          'def alerte(temperature):\n    if temperature >= 30:\n        return True\n    return False'
        ]
      ],
      examples: [
        [
          'La valeur frontière',
          'Le seuil d’alerte est 30 ; la mesure est 30.',
          'Le mot « dès » inclut la valeur du seuil, donc on utilise >=.',
          'L’alerte vaut True ; un test strict > aurait oublié ce cas.'
        ],
        [
          'Deux exigences',
          'Un fichier est publiable si autorisation et licence_ok sont vrais.',
          'and ne devient vrai que si les deux exigences sont satisfaites.',
          'Avec True et False, la publication est refusée dans ce modèle.'
        ],
        [
          'Une classification ordonnée',
          'Batterie faible sous 20 %, moyenne sous 80 %, haute sinon.',
          'Pour 10, la première branche est choisie ; elif n’est pas réévalué après cette décision.',
          '10 est faible, 20 est moyenne, 80 est haute ; le domaine prévu est 0 à 100.'
        ]
      ],
      activity: table(
        'Classe chaque mesure avant de consulter le résultat : alerte dès 30 degrés.',
        'Prévois le cas exactement égal à la frontière.',
        'Le tableau est un modèle de décision à seuil, sans incertitude de mesure ni retard du capteur.',
        ['mesure', 'alerte'],
        [
          [29, false],
          [30, true],
          [31, true]
        ]
      ),
      exercises: [
        a(
          'Pour la règle « alerte dès 30 », temperature = 30 doit-elle produire True ou False ?',
          'True',
          ['Le mot dès inclut le seuil.', 'La comparaison adaptée est >=.', '30 >= 30 est vrai.'],
          'La valeur frontière appartient à la zone d’alerte.',
          'Tu as peut-être utilisé > : vérifie explicitement le signe égal dans la règle.'
        ),
        p(
          'Écris categorie(batterie), pour un pourcentage entre 0 et 100 : renvoyer "faible" sous 20, "moyenne" de 20 inclus à 80 exclu, "haute" sinon.',
          'categorie',
          'def categorie(batterie):\n    pass',
          'def categorie(batterie):\n    if batterie < 20:\n        return "faible"\n    elif batterie < 80:\n        return "moyenne"\n    return "haute"',
          [
            [[0], 'faible'],
            [[20], 'moyenne'],
            [[79], 'moyenne'],
            [[80], 'haute']
          ],
          [
            'Traite d’abord les valeurs sous 20.',
            'Dans la seconde branche, les valeurs sont déjà au moins égales à 20.',
            'Teste les frontières 20 et 80.'
          ],
          'Les branches sont exclusives grâce aux return ; chaque intervalle reçoit une seule catégorie.',
          'Si 20 ou 80 échoue, écris les intervalles sur papier avant de corriger les comparaisons.'
        ),
        p(
          'Écris partager(accord, public) qui renvoie True seulement si la personne a donné son accord ET si public vaut False. Les deux paramètres sont booléens.',
          'partager',
          'def partager(accord, public):\n    pass',
          'def partager(accord, public):\n    return accord and not public',
          [
            [[true, false], true],
            [[true, true], false],
            [[false, false], false],
            [[false, true], false]
          ],
          [
            'Deux exigences doivent être simultanément satisfaites.',
            'Le refus d’une diffusion publique se traduit par not public.',
            'Combine avec and.'
          ],
          'Cette règle locale exige l’accord et une audience non publique ; elle ne suffit pas à définir tous les droits de diffusion.',
          'or autorise trop de situations : trace les quatre couples de valeurs.'
        )
      ],
      reflection:
        'Autoévaluation : invente une règle de seuil, écris ses trois tests de frontière et explique pourquoi les trois sont utiles. La justification est à comparer soi-même au cours.',
      review: [
        'Je compare avec ==.',
        'Je vérifie les valeurs frontières.',
        'Je distingue and et or.'
      ]
    }),
    lesson({
      id: 'snt-boucles',
      title: 'Répéter et tester un modèle',
      duration: 40,
      prerequisites: ['Fonctions et conditions.'],
      objectives: [
        'Parcourir une collection avec une boucle bornée.',
        'Garantir la progression d’une boucle while.'
      ],
      official: ['programmer'],
      sections: [
        [
          'Une répétition dont on connaît la fin',
          'for parcourt les éléments d’une collection. Pour additionner des mesures, on initialise total à zéro puis on ajoute chaque mesure une seule fois. Avec range(n), les entiers parcourus vont de 0 inclus à n exclu. L’indentation indique le bloc répété ; une initialisation placée dans ce bloc recommencerait le calcul à chaque tour. Une trace par tour permet de distinguer le nombre de répétitions et la valeur de l’accumulateur.'
        ],
        [
          'Répéter jusqu’à une condition',
          'while répète tant que son test est vrai. Une batterie modélisée par une charge entière peut perdre deux unités à chaque tour jusqu’à atteindre zéro ou une valeur négative. Pour que la boucle termine, une variable utilisée par le test doit progresser vers la sortie. Si on oublie sa mise à jour, le test reste vrai et la boucle ne s’arrête pas. Un modèle de durée doit annoncer la perte par tour : une batterie physique ne se décharge pas toujours linéairement.'
        ],
        [
          'Comparer modèle et observation',
          'Un programme est testé sur des entrées connues avant d’interpréter ses résultats. Une somme vide doit valoir zéro ; une collection avec un seul élément permet de vérifier l’initialisation ; un mélange de valeurs vérifie l’accumulation. Un résultat correct sur trois essais ne démontre pas tout, mais un échec suffit à montrer une erreur. Pour un phénomène social ou physique, les hypothèses du modèle restent à discuter même si le code respecte parfaitement les tests.',
          'def somme(mesures):\n    total = 0\n    for mesure in mesures:\n        total = total + mesure\n    return total'
        ]
      ],
      examples: [
        [
          'Un accumulateur',
          'Mesures 3, 5, 2 ; total commence à 0.',
          'Après chaque addition, total vaut successivement 3, 8 et 10.',
          'La somme vaut 10 ; initialiser dans la boucle ne conserverait que 2.'
        ],
        [
          'Les bornes de range',
          'On exécute for i in range(3).',
          'Le compteur prend 0, 1 puis 2, jamais 3.',
          'Le bloc est exécuté trois fois, malgré l’absence de la valeur 3.'
        ],
        [
          'Une boucle qui doit progresser',
          'Charge 5, perte de 2 par tour, répétition tant que charge > 0.',
          'Les charges après tour sont 3, 1, −1 ; on compte les tours exécutés.',
          'Trois tours sont nécessaires dans ce modèle ; une perte nulle rendrait ce modèle non terminant.'
        ]
      ],
      activity: {
        type: 'trace',
        prompt: 'Suis l’accumulateur et annonce la valeur après chaque tour.',
        prediction: 'Le total final sera-t-il la dernière mesure ou la somme des mesures ?',
        explanation:
          'Ce modèle de trace explicite une boucle bornée ; il n’illustre pas le temps réel du processeur.',
        config: {
          code: 'total = 0\nfor mesure in [3, 5, 2]:\n    total = total + mesure',
          frames: [
            { line: 1, variables: { total: 0 }, explanation: 'Initialisation hors de la boucle.' },
            { line: 3, variables: { total: 3, mesure: 3 }, explanation: 'Premier ajout.' },
            { line: 3, variables: { total: 8, mesure: 5 }, explanation: 'Deuxième ajout.' },
            { line: 3, variables: { total: 10, mesure: 2 }, explanation: 'Dernier ajout.' }
          ]
        }
      },
      exercises: [
        a(
          'Combien de fois le bloc d’une boucle for i in range(5) est-il exécuté ?',
          '5',
          [
            'range commence ici à zéro.',
            'Les valeurs parcourues sont 0, 1, 2, 3, 4.',
            'Compte les valeurs, sans ajouter 5.'
          ],
          'Les cinq entiers de 0 à 4 donnent cinq répétitions.',
          'Ne confonds pas valeur finale du compteur et nombre de répétitions.'
        ),
        p(
          'Écris compter_alertes(mesures) qui compte les mesures supérieures ou égales à 30. La liste peut être vide.',
          'compter_alertes',
          'def compter_alertes(mesures):\n    pass',
          'def compter_alertes(mesures):\n    nombre = 0\n    for mesure in mesures:\n        if mesure >= 30:\n            nombre += 1\n    return nombre',
          [
            [[[]], 0],
            [[[29, 30, 31]], 2],
            [[[35]], 1]
          ],
          [
            'Initialise le compteur avant la boucle.',
            'Teste chaque mesure avec >= 30.',
            'Ajoute 1, pas la mesure, au compteur.'
          ],
          'On filtre par condition, puis on compte les réussites ; le compteur n’additionne pas les températures.',
          'Si tu obtiens 61 au lieu de 2, tu additionnes les valeurs au lieu de compter les alertes.'
        ),
        p(
          'Écris autonomie(charge), pour une charge entière positive ou nulle. Le modèle consomme 2 unités par tour ; compter les tours nécessaires pour atteindre une charge <= 0 avec while.',
          'autonomie',
          'def autonomie(charge):\n    pass',
          'def autonomie(charge):\n    tours = 0\n    while charge > 0:\n        charge -= 2\n        tours += 1\n    return tours',
          [
            [[0], 0],
            [[5], 3],
            [[6], 3]
          ],
          [
            'Initialise le nombre de tours à zéro.',
            'Chaque tour diminue la charge de 2.',
            'Continue seulement tant que charge > 0.'
          ],
          'La charge décroît strictement ; pour 5, trois tours produisent 3, 1 et −1.',
          'Si le programme ne termine pas, vérifie la mise à jour de charge et l’indentation du bloc.'
        )
      ],
      reflection:
        'Autoévaluation : explique comment un programme peut être correct alors que son modèle de batterie est trop simple. Indique une hypothèse physique qu’il faudrait améliorer.',
      review: [
        'Je place l’initialisation avant la boucle.',
        'Je justifie la terminaison d’un while.',
        'Je distingue test du code et validité du modèle.'
      ]
    })
  ]
};

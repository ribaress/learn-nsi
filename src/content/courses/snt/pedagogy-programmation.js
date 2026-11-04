export default {
  'snt-reperes-historiques': {
    intro: [
      'Tu prends une photo avec un téléphone, la ranges dans un album et l’envoies à un proche. Ces trois gestes semblent appartenir à une seule invention.',
      'Comment un même appareil a-t-il réuni des techniques inventées à des moments différents ?',
      'Séparer les inventions de leurs usages aide à comprendre ce que font nos appareils et à lire une chronologie sans tout attribuer au smartphone.',
      [
        'Identifier conserver, calculer et communiquer dans un geste quotidien.',
        'Distinguer les routes d’Internet des pages du Web.',
        'Comparer des dates puis expliquer la convergence dans le téléphone.'
      ]
    ],
    recap: [
      [
        'Donnée',
        'Une information représentée de façon à pouvoir être conservée ou traitée par une machine.',
        'Une date de naissance ou les couleurs d’une photo deviennent des données.'
      ],
      [
        'Réseau',
        'Un ensemble d’appareils reliés pour échanger des informations.',
        'Deux ordinateurs reliés peuvent s’envoyer un document.'
      ],
      [
        'Durée entre deux années',
        'On soustrait l’année de départ de celle d’arrivée ; on ne compte pas les deux bornes comme des années écoulées.',
        'De 2000 à 2003 : 2003 − 2000 = 3 ans.'
      ]
    ],
    life: [
      [
        'Retrouver un album familial',
        'Des photos sont dans une boîte, puis sur un disque, puis dans un espace en ligne.',
        'Le support change la manière de conserver et de chercher ; mettre en ligne ajoute aussi un réseau et un service.',
        'Les photos anciennes ne disparaissent pas dès qu’un nouveau support apparaît ; leur conservation dépend encore des personnes.'
      ],
      [
        'Préparer un voyage',
        'Tu regardes une carte et envoies ton heure d’arrivée avec le même téléphone.',
        'La localisation, l’affichage et la communication sont des fonctions issues d’histoires techniques différentes.',
        'La date d’achat du téléphone ne donne aucune date d’invention de ces fonctions.'
      ]
    ],
    sections: [
      [
        'Un geste, plusieurs problèmes',
        'Pour partager une photo, il faut d’abord la produire, conserver ses informations, puis les faire parvenir à quelqu’un. Conserver signifie garder une information pour plus tard ; traiter signifie la transformer selon une règle ; communiquer signifie la transmettre. Une machine peut faire plusieurs de ces choses. Avant les dates, nommons donc le problème résolu : un disque garde des données, un calculateur applique des opérations, un réseau relie des appareils. Le téléphone combine ces rôles sans les rendre identiques.'
      ],
      [
        'Conserver, organiser et recalculer',
        'Le disque dur de 1956 est un repère du stockage, c’est-à-dire de la conservation de données. Le modèle relationnel proposé par Codd en 1970 organise des collections en tables, comparables à des tableaux dont les lignes décrivent des objets. VisiCalc, en 1979, est un tableur : ses cases, appelées cellules, peuvent contenir des formules. Si une dépense change, une formule de total peut recalculer le budget. Le progrès porte alors sur le travail effectué, pas seulement sur le remplacement du papier par un écran.'
      ],
      [
        'Internet transporte ; le Web relie des documents',
        'Un protocole est une convention que des machines suivent pour communiquer. ARPANET et Cyclades expérimentent dans les années 1970 des messages découpés en morceaux appelés paquets. L’adoption de TCP/IP par ARPANET en 1983 est un jalon d’Internet, réseau de réseaux. En 1989, Tim Berners-Lee propose au CERN le Web : des documents reliés par des liens que l’on peut suivre. Le Web utilise Internet. Un courriel peut aussi passer par Internet avec SMTP, convention d’envoi du courrier, sans devenir une page Web.'
      ],
      [
        'Lire une frise sans confondre les événements',
        'Une frise range des événements par année. Une année plus petite correspond ici à un événement plus ancien : 1983 précède 1989. La mise à disposition libre du Web en 1993 est encore un autre événement : une proposition n’est pas sa diffusion. Pour calculer la durée depuis 1989, on décompose 1993 − 1989 : une année mène à 1990, puis trois à 1993, donc quatre ans. Cette différence mesure un intervalle ; elle ne dit pas combien de personnes utilisaient déjà le service.'
      ],
      [
        'La convergence ne supprime pas les histoires',
        'Le premier satellite GPS lancé en 1978 appartient à l’histoire de la localisation ; GPS est un système permettant à un récepteur de calculer sa position. Les capteurs électroniques, qui transforment la lumière en mesures, rendent possibles les premiers appareils photo numériques de 1975. Des systèmes embarqués, petits ordinateurs intégrés à des objets, existent avant l’expression « internet des objets » de 1999. Le smartphone rassemble ces techniques avec les réseaux sociaux diffusés dans les années 2000. Invention, disponibilité et adoption sont donc trois questions distinctes.'
      ]
    ],
    pauses: [
      [
        2,
        'Un courriel envoyé sans page Web peut-il utiliser Internet ?',
        [
          ['Oui, Internet transporte plusieurs services', 'oui'],
          ['Non, tout Internet est le Web', 'non']
        ],
        'oui',
        'Internet est l’infrastructure d’échange. Le courrier et le Web emploient cette infrastructure avec des conventions différentes.'
      ],
      [
        3,
        'Que mesure le calcul 1993 − 1989 ?',
        [
          ['Quatre années écoulées', '4'],
          ['Cinq événements historiques', '5']
        ],
        '4',
        'On calcule une durée entre deux dates ; on ne compte ni le nombre de dates écrites ni le nombre d’inventions.'
      ]
    ],
    reasoning: [
      'On range d’abord les années : 1983 < 1989. On vérifie ensuite ce que chacune date : un protocole réseau pour la première, une proposition de service pour la seconde.',
      'Une cellule peut contenir un nombre ; une autre peut contenir une règle qui additionne plusieurs cellules. Modifier le nombre déclenche le recalcul de cette règle, qui peut toutefois être mal écrite.',
      'On sépare les étapes : la lumière est mesurée, l’image est calculée, la position est déterminée, puis les données voyagent. Aucun de ces rôles ne se déduit du seul mot téléphone.'
    ]
  },
  'snt-variables': {
    intro: [
      'Un carnet de dépenses contient un solde que tu corriges après chaque achat. Pour calculer automatiquement le nouveau solde, il faut dire précisément quelle valeur garder.',
      'Comment une machine peut-elle retenir un nombre, le modifier, puis refaire le même calcul pour plusieurs personnes ?',
      'Les variables et les fonctions permettent d’écrire des calculs compréhensibles et de vérifier les unités au lieu de deviner un résultat.',
      [
        'Nommer une valeur et suivre une mise à jour.',
        'Distinguer un nombre d’un texte et comprendre les unités.',
        'Écrire une petite fonction puis calculer une taille d’image.'
      ]
    ],
    recap: [
      [
        'Instruction',
        'Un ordre élémentaire exécuté par le programme, généralement écrit sur une ligne.',
        'total = 5 demande d’associer le nom total à 5.'
      ],
      [
        'Multiplication',
        'Multiplier deux nombres donne un produit ; en Python le signe de multiplication est *.',
        '4 * 3 vaut 12 : quatre groupes de trois.'
      ],
      [
        'Unité',
        'Le mot qui précise ce que l’on compte ou mesure.',
        '240 octets est une quantité de données ; 240 secondes est une durée.'
      ]
    ],
    life: [
      [
        'Le solde du porte-monnaie',
        'Tu as 10 euros et ajoutes une pièce de 2 euros.',
        'solde = solde + 2 lit 10, calcule 12 puis conserve 12 : c’est une mise à jour de variable.',
        'Une variable n’est pas une boîte matérielle : c’est l’association d’un nom à une valeur.'
      ],
      [
        'Un prix pour plusieurs achats',
        'Le même tarif de 3 euros par ticket sert pour 1, 4 ou 8 tickets.',
        'Une fonction prix(nombre) reçoit le nombre de tickets et renvoie nombre * 3, sans recopier la règle.',
        'Les prix réels peuvent inclure une réduction ; la fonction ne connaît que la règle que l’on écrit.'
      ]
    ],
    sections: [
      [
        'Retenir un résultat sous un nom',
        'Pour mémoriser trois tickets, on écrit tickets = 3. Le nom tickets est une variable ; 3 est sa valeur actuelle. Le signe = est une affectation : on calcule ce qui est à droite puis on l’associe au nom de gauche. Ce n’est pas une égalité à résoudre. Pour ajouter deux tickets, tickets = tickets + 2 lit 3, calcule 3 + 2 = 5, puis remplace la valeur par 5. Les lignes sont exécutées de haut en bas : une table de suivi permet de noter les valeurs après chaque instruction.'
      ],
      [
        'Copier une valeur et choisir son type',
        'Si ancienne = tickets est exécuté quand tickets vaut 3, ancienne reçoit 3. Une modification ultérieure de tickets ne recalcule pas automatiquement ancienne. Un entier est un nombre sans partie décimale ; une chaîne est du texte entouré de guillemets. "12" et 12 ont donc des rôles différents. "12" + "3" colle les textes et donne "123". int("12") convertit le texte en entier ; int("12") + 3 vaut 15. Un nombre à virgule est écrit avec un point en Python, comme 2.5.'
      ],
      [
        'Compter en bits, en octets et en secondes',
        'Un bit est une valeur binaire, 0 ou 1. Un octet est un groupe de huit bits. Pour 3 octets, on compte 8 + 8 + 8 = 24 bits, donc octets * 8. Dans l’autre sens, // effectue une division entière : 24 // 8 vaut 3. Le débit indique une quantité transmise par seconde. Pour 240 octets à 80 octets par seconde, 80 + 80 + 80 = 240 : trois secondes sont nécessaires dans un modèle à débit constant. / effectue une division ordinaire ; les attentes réelles ne sont pas comptées ici.'
      ],
      [
        'Écrire une fonction qui renvoie son calcul',
        'Une fonction est une règle réutilisable. def commence sa définition, suivi du nom, des paramètres entre parenthèses et de deux-points. Un paramètre est un nom qui reçoit une entrée lors de l’appel. Les lignes du corps sont décalées de quatre espaces : cette indentation indique leur appartenance à la fonction. return renvoie une valeur à l’appelant et termine l’appel. print affiche seulement un texte à l’écran ; il ne remplace pas return. Dans le code ci-dessous, bits(3) fournit 3 à octets et renvoie 24.',
        'def bits(octets):\n    return octets * 8'
      ],
      [
        'Construire une formule pour une image',
        'Une image rectangulaire est composée de petits éléments colorés appelés pixels. La largeur compte les pixels d’une ligne ; la hauteur compte les lignes. Une image de largeur 4 et hauteur 2 contient 4 + 4 = 8 pixels, soit 4 * 2. Le modèle RVB utilise trois composantes, rouge, vert et bleu, chacune sur un octet : 8 pixels demandent 8 * 3 = 24 octets. Une fonction à deux entrées écrit def taille_image(largeur, hauteur): puis renvoie largeur * hauteur * 3. Cette taille brute ignore la compression et les informations ajoutées au fichier.'
      ]
    ],
    pauses: [
      [
        1,
        'Après x = 3 puis y = x puis x = 8, que vaut y ?',
        [
          ['3, la valeur copiée', '3'],
          ['8, car y suit x automatiquement', '8']
        ],
        '3',
        'L’affectation de y lit la valeur 3 au moment où elle s’exécute. Elle n’installe pas une formule recalculée à chaque changement de x.'
      ],
      [
        4,
        'Combien d’octets pour une image brute 4 × 2, à 3 octets par pixel ?',
        [
          ['24 octets', '24'],
          ['9 octets', '9']
        ],
        '24',
        '4 × 2 donne 8 pixels. Chacun nécessite 3 octets, donc 8 × 3 = 24 octets. On multiplie les dimensions avant de compter les octets.'
      ]
    ],
    reasoning: [
      'On écrit trois états : au départ x = 4 ; après x = x + 3, x = 7 ; après y = 2 * x, y = 2 * 7 = 14 et x reste 7.',
      'Les guillemets indiquent du texte. On enlève cette ambiguïté en convertissant "12" avec int, puis on additionne les valeurs numériques 12 et 3.',
      'On cherche combien de groupes de 80 tiennent dans 240 : un groupe donne 80, deux donnent 160, trois donnent 240. Chaque groupe correspond à une seconde.'
    ]
  },
  'snt-conditions': {
    intro: [
      'Une lampe de couloir s’allume seulement si quelqu’un passe et s’il fait sombre. La machine doit transformer cette phrase en une règle sans ambiguïté.',
      'Comment écrire une décision dont on sait exactement ce qui se passe à la limite et lorsque plusieurs critères interviennent ?',
      'Une condition permet de choisir une action ; la préciser évite des erreurs de seuil et des partages non souhaités.',
      [
        'Transformer une question en vrai ou faux.',
        'Définir les seuils et choisir une branche.',
        'Combiner des conditions et écrire une fonction testable.'
      ]
    ],
    recap: [
      [
        'Variable',
        'Un nom associé à une valeur actuelle ; = lui affecte une valeur.',
        'batterie = 20 associe batterie au nombre 20.'
      ],
      [
        'Fonction',
        'Une règle écrite avec def qui reçoit des entrées et fournit un résultat avec return ; son corps est indenté.',
        'def double(n): suivi de return n * 2 renvoie deux fois n.'
      ],
      [
        'Pourcentage',
        'Une quantité rapportée à cent ; 20 % de batterie est ici le nombre 20 sur une échelle de 0 à 100.',
        'Une batterie à 0 % est vide dans ce modèle ; à 100 % elle est pleine.'
      ]
    ],
    life: [
      [
        'Le tarif d’un cinéma',
        'Un tarif enfant est accordé aux moins de 12 ans.',
        'age < 12 exprime exactement cette limite ; une personne de 12 ans n’entre pas dans la condition.',
        'Le cinéma peut demander d’autres justificatifs : une comparaison ne capture que le critère choisi.'
      ],
      [
        'Prêter une photo',
        'Tu autorises une photo seulement avec l’accord de la personne et pour un groupe privé.',
        'accord and not public exige à la fois un accord vrai et un caractère public faux.',
        'Deux réponses vraies dans un programme ne prouvent pas un consentement réel ni l’absence de copie.'
      ]
    ],
    sections: [
      [
        'Une question qui a deux réponses',
        '« La température atteint-elle 30 degrés ? » peut recevoir vrai ou faux pour une mesure donnée. Python appelle ces deux valeurs booléennes True et False, avec une majuscule et sans guillemets. temperature = 30 affecte un nombre ; temperature >= 30 compare ce nombre à un seuil et produit True. Il faut distinguer =, qui affecte, de ==, qui demande si deux valeurs sont égales. Une réponse booléenne est une valeur exploitable par le programme, pas une phrase décrivant tout le monde réel.'
      ],
      [
        'Lire les limites avant de choisir un signe',
        'Le signe < signifie strictement inférieur ; > signifie strictement supérieur. <= et >= incluent l’égalité. Pour « alerte dès 30 », la mesure 29 donne faux, 30 donne vrai, 31 donne vrai : on écrit >= 30. Pour « batterie faible sous 20 », 19 convient mais 20 ne convient pas : on écrit < 20. Ces valeurs de frontière sont précieuses pour les tests. On choisit le signe à partir de la phrase, puis on vérifie une valeur avant, une valeur égale et une valeur après le seuil.'
      ],
      [
        'Choisir une seule branche',
        'if signifie « si ». Après if batterie < 20:, le bloc indenté de quatre espaces est exécuté seulement si la condition est vraie. elif signifie « sinon, si » et n’est examiné que si les conditions précédentes ont échoué ; else signifie « sinon » et couvre les autres cas. Dans une catégorie faible, moyenne, haute, on teste d’abord < 20 puis < 80. Pour 10, on renvoie faible immédiatement ; pour 20, le premier test échoue mais le second réussit. Les deux-points et l’indentation délimitent chaque bloc.',
        'def categorie(batterie):\n    if batterie < 20:\n        return "faible"\n    elif batterie < 80:\n        return "moyenne"\n    else:\n        return "haute"'
      ],
      [
        'Combiner deux questions',
        'and signifie « et » : les deux conditions doivent être vraies. or signifie « ou » inclusif : au moins une doit être vraie, éventuellement les deux. not inverse une valeur booléenne : not True vaut False. Pour partager seulement avec accord et hors public, accord and not public convient. Si accord vaut True et public vaut True, not public vaut False, puis True and False vaut False. Une fonction peut renvoyer directement cette expression avec return ; inutile de transformer True en texte "True".'
      ],
      [
        'Tester la règle et son domaine',
        'Une fonction commence par def partager(accord, public): ; accord et public sont les deux entrées de l’appel. Le corps indenté contient return accord and not public. On essaie les quatre couples possibles : (True, False) donne True ; (False, False), (True, True) et (False, True) donnent False. Pour la batterie, le domaine annoncé est de 0 à 100 : 20 est moyenne et 80 est haute. La règle ne prétend pas mesurer la réalité du consentement ni corriger une mesure impossible : les tests contrôlent le contrat décrit.'
      ]
    ],
    pauses: [
      [
        1,
        'Avec la règle « alerte dès 30 », quelle comparaison convient ?',
        [
          ['temperature >= 30', 'inclut'],
          ['temperature > 30', 'exclut']
        ],
        'inclut',
        'Le mot dès inclut la valeur de départ. Un test strict oublierait précisément la température 30.'
      ],
      [
        3,
        'Que vaut True and not True ?',
        [
          ['False', 'faux'],
          ['True', 'vrai']
        ],
        'faux',
        'not True vaut False. Il reste donc True and False ; les deux conditions ne sont pas satisfaites.'
      ]
    ],
    reasoning: [
      'On essaie trois mesures, 29, 30, 31 : on veut False, True, True. Seul le signe >= inclut la valeur frontière tout en excluant 29.',
      'On calcule d’abord la seconde exigence : licence_ok vaut False. L’opérateur and exige deux True ; l’accord seul est insuffisant.',
      'Pour 20, 20 < 20 est faux puis 20 < 80 est vrai. Pour 80, les deux comparaisons sont fausses : on atteint sinon.'
    ]
  },
  'snt-boucles': {
    intro: [
      'Pour compter les jours de forte chaleur dans un carnet météo, tu lis chaque mesure et ajoutes un trait lorsque le seuil est atteint.',
      'Comment faire répéter ce geste à une machine et vérifier qu’elle s’arrête au bon moment ?',
      'Une boucle évite de recopier des instructions et permet d’expliquer la progression d’un compteur ou d’un modèle d’autonomie.',
      [
        'Parcourir une liste dans son ordre.',
        'Construire un compteur et suivre ses valeurs.',
        'Répéter tant qu’une condition reste vraie puis vérifier la fin.'
      ]
    ],
    recap: [
      [
        'Liste',
        'Une suite ordonnée de valeurs écrite entre crochets ; une liste vide ne contient aucune valeur.',
        '[18, 31, 29] contient trois mesures ; [] est vide.'
      ],
      [
        'Affectation et comparaison',
        '= associe une valeur à un nom ; >= demande si la valeur de gauche est supérieure ou égale à celle de droite.',
        'nombre = 0 initialise un compteur ; mesure >= 30 pose une question.'
      ],
      [
        'Fonction Python',
        'def annonce une règle avec des paramètres ; les lignes indentées forment son corps, return fournit le résultat.',
        'compter([31, 18]) est un appel qui transmet une liste à la fonction compter.'
      ]
    ],
    life: [
      [
        'Compter les produits chers',
        'Tu parcours une liste de courses et coches les articles coûtant au moins 10 euros.',
        'Une boucle lit chaque prix ; une condition décide d’augmenter le compteur de un.',
        'Le programme ne voit pas les prix non saisis et ne corrige pas un ticket erroné.'
      ],
      [
        'Descendre un escalier',
        'Tu descends une marche tant que tu n’es pas au rez-de-chaussée.',
        'Une boucle while répète selon un état qui doit changer à chaque passage pour finir.',
        'Un bâtiment réel peut imposer des obstacles ; un modèle de compteur suppose les déplacements possibles.'
      ]
    ],
    sections: [
      [
        'Répéter pour chaque élément',
        'Une liste Python écrit plusieurs valeurs entre crochets, séparées par des virgules : [3, 5, 2]. for mesure in mesures: signifie « pour chaque valeur de la liste mesures, lui donner momentanément le nom mesure et exécuter le bloc ». L’indentation de quatre espaces montre les instructions répétées. Pour additionner, on crée total = 0 avant la boucle, puis total = total + mesure à chaque passage. On garde ainsi le résultat précédent au lieu de recommencer à zéro ; la liste vide laisse le total à 0.'
      ],
      [
        'Voir toutes les valeurs intermédiaires',
        'Avec les mesures 3, 5, 2, total vaut d’abord 0. Premier passage : 0 + 3 = 3 ; deuxième : 3 + 5 = 8 ; troisième : 8 + 2 = 10. Le nom total est un accumulateur parce qu’il conserve un résultat qui s’enrichit. total += mesure est une écriture abrégée de total = total + mesure. Pour compter les alertes, on commence nombre = 0 et on ajoute 1 seulement si mesure >= 30. Le test if et son bloc ont une indentation supplémentaire à l’intérieur de la boucle.'
      ],
      [
        'Un nombre fixé de tours avec range',
        'range(5) fournit successivement les entiers 0, 1, 2, 3, 4. Le départ par défaut est 0 et la borne de fin 5 est exclue : il y a cinq valeurs, donc cinq tours de for i in range(5):. Avec deux arguments, range(1, 4) donne 1, 2, 3. Le nom i est seulement le nom choisi pour la valeur du tour. Quand cette valeur ne sert pas, on écrit souvent _ ; ce symbole est aussi un nom. Pour répéter zéro fois, range(0) ne fournit aucune valeur.'
      ],
      [
        'Tant que : contrôler une évolution',
        'while charge > 0: veut dire « tant que charge est strictement positive ». La condition est testée avant chaque tour. Avec charge = 5 et une perte de 2, on obtient 3 au premier tour, 1 au deuxième, −1 au troisième, puis le test échoue. charge -= 2 abrège charge = charge - 2. Un compteur tours, initialisé à zéro, gagne 1 à chaque passage. Si la charge vaut déjà 0, aucun tour n’a lieu. Sans modification de charge, une condition vraie pourrait rester vraie indéfiniment.'
      ],
      [
        'Renvoyer après avoir terminé',
        'Pour une fonction compter_alertes(mesures), on place return nombre après la boucle, à l’indentation du compteur initial. Placé à l’intérieur, return terminerait la fonction au premier passage. On teste une liste vide, une mesure exactement à 30, et plusieurs alertes séparées par des valeurs ordinaires. Une fonction autonomie(charge) fait de même avec while et renvoie tours après la fin. La charge négative finale appartient au modèle de perte fixe : elle ne représente pas une batterie physiquement chargée en énergie négative.',
        'def compter_alertes(mesures):\n    nombre = 0\n    for mesure in mesures:\n        if mesure >= 30:\n            nombre += 1\n    return nombre'
      ]
    ],
    pauses: [
      [
        2,
        'Quelles valeurs fournit range(3) ?',
        [
          ['0, 1, 2', 'zero'],
          ['1, 2, 3', 'un']
        ],
        'zero',
        'La borne finale est exclue. En partant de zéro, trois valeurs sont nécessaires pour exécuter trois tours.'
      ],
      [
        3,
        'Avec charge = 0 et while charge > 0, combien de tours ?',
        [
          ['Aucun tour', '0'],
          ['Un tour avant le test', '1']
        ],
        '0',
        'while teste la condition avant d’exécuter le bloc. Zéro n’est pas strictement positif : le bloc n’est jamais exécuté.'
      ]
    ],
    reasoning: [
      'On note les états 0 → 3 → 8 → 10. Le 0 initial est avant la boucle ; s’il était répété à chaque tour, les additions précédentes seraient oubliées.',
      'Il faut compter les valeurs produites : 0 est le premier tour, 1 le deuxième et 2 le troisième. La valeur finale exclue n’est pas un tour supplémentaire.',
      'On compte les passages plutôt que les valeurs positives restantes : le passage de 1 à −1 est bien un troisième tour, puis seulement la condition devient fausse.'
    ]
  }
};

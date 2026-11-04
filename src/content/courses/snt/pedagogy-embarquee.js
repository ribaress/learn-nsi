export default {
  'snt-capteurs-actionneurs': {
    intro: [
      'Un chauffage s’allume quand il fait froid puis s’arrête. L’appareil doit mesurer, décider et produire une action physique ; ce sont trois rôles différents.',
      'Comment décrire cette chaîne et éviter qu’un chauffage change sans cesse d’état autour d’un seuil ?',
      'Séparer mesure, règle et action permet d’expliquer un objet automatique et de tester un modèle sans confondre simulation et matériel.',
      [
        'Identifier capteur, programme et actionneur.',
        'Comparer une mesure à une consigne précise.',
        'Conserver un état entre deux seuils et écrire les résultats d’un parcours.'
      ]
    ],
    recap: [
      [
        'Mesure et consigne',
        'La mesure décrit une observation ; la consigne indique la valeur ou l’état souhaité.',
        '19 degrés mesurés et 20 degrés souhaités sont deux informations différentes.'
      ],
      [
        'Booléen et comparaison',
        'True et False signifient vrai et faux en Python ; < est strictement inférieur et > strictement supérieur.',
        '19 < 20 donne True, mais 20 < 20 donne False.'
      ],
      [
        'Liste et état',
        'Une liste contient des valeurs successives ; un état est une valeur conservée qui décrit la situation courante.',
        '[True, True, False] peut décrire les états successifs d’un chauffage.'
      ]
    ],
    life: [
      [
        'Le robinet automatique',
        'Un robinet détecte une main puis ouvre une vanne.',
        'Le capteur fournit une information ; un programme décide ; la vanne commandée agit sur le débit d’eau.',
        'Le capteur ne connaît pas l’intention de la personne et une commande ne prouve pas que la vanne fonctionne.'
      ],
      [
        'Le réfrigérateur qui ne redémarre pas à chaque instant',
        'La température varie un peu autour du niveau souhaité.',
        'Deux seuils séparés permettent de conserver l’état dans une zone intermédiaire, principe de l’hystérésis.',
        'Les seuils et la commande d’un réfrigérateur réel sont propres à son système ; nos valeurs 19 et 21 concernent un modèle de chauffage.'
      ]
    ],
    sections: [
      [
        'Nommer les trois rôles d’un objet',
        'Un capteur transforme une grandeur physique en information : une sonde mesure une température. Un programme traite cette information et choisit une commande. Un actionneur produit un effet physique : un élément chauffant chauffe, un moteur tourne ou une vanne s’ouvre. Un système embarqué est un ordinateur intégré à un objet pour accomplir de telles tâches. Un vélo assisté possède par exemple des capteurs et un moteur. Le moteur ne mesure pas nécessairement l’intention du cycliste ; ce sont des rôles qu’il faut identifier séparément.'
      ],
      [
        'Acquérir une mesure puis appliquer une règle',
        'Acquérir signifie obtenir une information du capteur. Une mesure peut être imprécise ou arriver avec retard. La règle du cours est : chauffer si la mesure est strictement sous la consigne. Pour une consigne de 20 degrés, 19 < 20 est vrai et 20 < 20 est faux. La frontière fait donc partie du contrat. On teste sous le seuil, au seuil et au-dessus du seuil. Le booléen True représentera ici la commande allumer ; ce n’est pas une mesure confirmant que la résistance chauffe effectivement.'
      ],
      [
        'Produire la liste des commandes en Python',
        'def commandes(mesures, consigne): définit une fonction ; mesures contient les valeurs à traiter. Une liste vide s’écrit []. for mesure in mesures: parcourt chaque valeur ; etats.append(mesure < consigne) ajoute le résultat vrai ou faux. return etats après la boucle renvoie toute la liste. L’écriture [mesure < consigne for mesure in mesures] est une compréhension, une forme abrégée produisant les mêmes éléments. Les lignes du corps ont quatre espaces et les lignes de boucle quatre de plus. Une entrée vide donne une sortie vide.',
        'def commandes(mesures, consigne):\n    etats = []\n    for mesure in mesures:\n        etats.append(mesure < consigne)\n    return etats'
      ],
      [
        'Pourquoi conserver l’état entre deux seuils',
        'Avec une règle à un seul seuil, de petites variations peuvent déclencher des bascules fréquentes. Le modèle d’hystérésis utilise deux seuils : sous 19 on allume ; au-dessus de 21 on éteint ; entre 19 et 21 inclus on conserve l’état antérieur. Pour un chauffage initialement éteint et les mesures 18, 20, 22, les états deviennent True, True, False. À 20 seul, on ne peut pas répondre sans connaître l’état précédent. Les valeurs exactement 19 et 21 ne franchissent aucun seuil strict et gardent donc l’état.'
      ],
      [
        'Coder la mémoire et vérifier l’ordre',
        'La fonction hysteresis reçoit mesures et allume, état initial. Pour chaque mesure, if mesure < 19: affecte True à allume ; elif mesure > 21: affecte False. Aucune autre affectation n’est nécessaire dans la zone intermédiaire. etats.append(allume) doit être après ces tests mais dans la boucle, afin d’enregistrer l’état obtenu à chaque instant. return etats est après la boucle. La simulation n’attend pas entre deux mesures et ne pilote aucun chauffage : elle vérifie la logique, pas les délais ni la sûreté d’un dispositif réel.',
        'def hysteresis(mesures, allume):\n    etats = []\n    for mesure in mesures:\n        if mesure < 19:\n            allume = True\n        elif mesure > 21:\n            allume = False\n        etats.append(allume)\n    return etats'
      ]
    ],
    pauses: [
      [
        1,
        'Avec « chauffer strictement sous 20 », quelle commande à 20 ?',
        [
          ['False, le seuil n’est pas franchi', 'False'],
          ['True, parce que 20 est proche', 'True']
        ],
        'False',
        'Le mot strictement exclut l’égalité. La comparaison 20 < 20 est fausse, indépendamment de la proximité des valeurs.'
      ],
      [
        3,
        'En hystérésis, mesure 20 et état antérieur allumé : quel nouvel état ?',
        [
          ['Allumé, on conserve l’état', 'allume'],
          ['Éteint, on oublie l’état précédent', 'eteint']
        ],
        'allume',
        '20 n’est ni sous 19 ni au-dessus de 21. Aucun basculement n’est demandé ; l’état antérieur est conservé.'
      ]
    ],
    reasoning: [
      'On suit la circulation : une rotation est mesurée, une information entre dans le programme, puis une commande va vers le moteur. Le mouvement produit identifie le rôle d’actionneur.',
      'On remplace la mesure dans la comparaison : 19 < 20 donne vrai ; 20 < 20 donne faux. La différence tient au signe strict, pas à une propriété universelle des thermostats.',
      'On teste 20 < 19 : faux. On teste 20 > 21 : faux. Comme aucune affectation n’a lieu, l’état initial reste utilisé, qu’il soit allumé ou éteint.'
    ]
  },
  'snt-ihm-objet': {
    intro: [
      'Sur un écran, un bouton « Allumer » change une étiquette. Pour une vraie lampe, il faudrait encore transmettre la commande et vérifier l’effet.',
      'Comment construire une interface claire et contrôler un message avant de lui faire confiance ?',
      'L’IHM relie une personne à un système ; distinguer demande, validation et retour d’état évite d’afficher une confirmation injustifiée.',
      [
        'Décrire un écran avec un état et deux commandes.',
        'Relier les clics à une modification visible.',
        'Décoder un message en vérifiant préfixe, caractères et intervalle numérique.'
      ]
    ],
    recap: [
      [
        'IHM',
        'Une interface humain-machine est l’ensemble des moyens permettant à une personne de donner des commandes et de recevoir des informations.',
        'Boutons et voyant d’une machine à laver font partie de son IHM.'
      ],
      [
        'Chaîne et entier',
        'Une chaîne est du texte ; un entier est un nombre sans partie décimale.',
        '"50" est un texte ; int("50") donne le nombre 50.'
      ],
      [
        'Intervalle inclus',
        'De 0 à 100 inclus signifie que 0 et 100 sont aussi autorisés.',
        '0 <= nombre <= 100 vérifie les deux limites en Python.'
      ]
    ],
    life: [
      [
        'Le bouton d’ascenseur',
        'Le bouton s’éclaire après l’appui, mais la cabine n’est pas encore arrivée.',
        'Le voyant confirme une demande enregistrée ; l’arrivée exige une autre information, comme un capteur d’étage.',
        'Notre interface ne commande aucun ascenseur : elle ne simule que des états affichés.'
      ],
      [
        'Une adresse sur un colis',
        'Avant une livraison, on vérifie le préfixe de secteur, la forme du numéro et si le numéro existe dans la plage admise.',
        'Décoder A50 demande aussi plusieurs contrôles avant d’interpréter 50 comme consigne.',
        'La validité d’un message numérique ne prouve pas l’état du matériel ni l’autorisation de l’émetteur.'
      ]
    ],
    sections: [
      [
        'Afficher une intention et un état clairement',
        'Une IHM, interface humain-machine, fournit des commandes et des informations. Un bouton « Allumer » exprime une demande ; un texte « commande envoyée » confirme seulement son émission. Pour une lampe physique, confirmer « allumée » demanderait un retour approprié du système. Dans notre activité, la lampe est simulée : l’état est uniquement le texte de l’écran. Cette limite doit rester visible dans le titre « Lampe simulée ». L’utilisateur comprend ainsi ce que confirme réellement son clic.'
      ],
      [
        'Écrire les éléments HTML de l’écran',
        'HTML structure la page avec des balises. <!doctype html> annonce le format ; html contient head, informations sur la page, puis body, contenu affiché. Dans head, meta charset="utf-8" permet les accents et title nomme l’onglet. Dans body, h1 est le titre principal, output contient un résultat et button représente une commande cliquable. L’attribut id donne un nom unique à un élément. On prépare output id="etat" avec « éteinte » puis les boutons id="allumer" et id="eteindre". Les éléments ordinaires ont une balise ouvrante et une fermante.'
      ],
      [
        'Relier un clic au texte avec JavaScript',
        'JavaScript peut réagir à un événement, comme un clic. Dans cet exercice court, l’attribut onclick contient l’action du bouton. document.getElementById("etat") cherche l’élément portant cet identifiant ; .textContent désigne son contenu textuel ; = lui affecte un nouveau texte. L’apostrophe peut entourer le texte JavaScript quand les guillemets entourent l’attribut HTML. Le bouton Allumer écrit « allumée » ; Éteindre rétablit « éteinte ». On vérifie les deux clics successifs : la présence d’un bouton seule ne prouve pas son effet.',
        '<output id="etat">éteinte</output>\n<button id="allumer" onclick="document.getElementById(\'etat\').textContent=\'allumée\'">Allumer</button>\n<button id="eteindre" onclick="document.getElementById(\'etat\').textContent=\'éteinte\'">Éteindre</button>'
      ],
      [
        'Lire un protocole de commande sans deviner',
        'Un protocole est une convention partagée. Notre modèle admet A suivi de un à trois chiffres ASCII, caractères 0 à 9, puis un entier de 0 à 100. Dans A50, A désigne la commande et 50 la consigne. A seul manque de chiffres ; B50 a un mauvais préfixe ; A-1 contient un signe interdit ; A140 est hors plage. Même A0000 est refusé, car quatre chiffres dépassent la longueur autorisée. Un message invalide donne −1 dans l’exercice ; le décodeur ne le corrige pas silencieusement en une autre commande.'
      ],
      [
        'Valider en Python avant de convertir',
        'def decoder(message): commence la fonction. message.startswith("A") teste le préfixe ; not inverse le résultat. message[1:] garde les caractères à partir de l’indice 1, donc retire A ; len(valeur) compte les caractères. any(c not in "0123456789" for c in valeur) est vrai si au moins un caractère est interdit ; for parcourt les caractères et not in teste l’absence. or refuse si la longueur ou les caractères sont invalides. int(valeur) n’est appelé qu’après ces contrôles, puis 0 <= nombre <= 100 vérifie la plage. return renvoie le nombre ou −1 ; les blocs sont indentés.',
        'def decoder(message):\n    if not message.startswith("A"):\n        return -1\n    valeur = message[1:]\n    if not 1 <= len(valeur) <= 3 or any(c not in "0123456789" for c in valeur):\n        return -1\n    nombre = int(valeur)\n    if 0 <= nombre <= 100:\n        return nombre\n    return -1'
      ]
    ],
    pauses: [
      [
        0,
        '« Commande envoyée » confirme-t-il qu’une vraie lampe est allumée ?',
        [
          ['Non, il manque un retour d’état', 'non'],
          ['Oui, l’envoi suffit toujours', 'oui']
        ],
        'non',
        'Le message peut être perdu ou le matériel ne pas agir. Confirmer l’effet exige une information distincte de la seule émission.'
      ],
      [
        3,
        'Pourquoi A140 est-il rejeté malgré son préfixe et ses chiffres valides ?',
        [
          ['140 dépasse la plage 0 à 100', 'plage'],
          ['Le préfixe A est interdit', 'prefixe']
        ],
        'plage',
        'Les contrôles se complètent : une forme correcte ne suffit pas si la valeur numérique dépasse la consigne autorisée.'
      ]
    ],
    reasoning: [
      'On distingue le moment du clic, l’envoi et le mouvement attendu. La phrase « demandée » ne décrit que le premier objectif ; aucune mesure d’ouverture n’est fournie.',
      'On sépare A et 50, puis on vérifie trois points : A est le préfixe attendu, 50 comporte deux chiffres admis, 50 appartient à l’intervalle 0 à 100.',
      'Le préfixe et les caractères passent le contrôle mais 140 > 100. On rejette donc la valeur au lieu de prétendre qu’une commande compréhensible est forcément autorisée.'
    ]
  }
};

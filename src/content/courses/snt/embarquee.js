import { lesson, answer as a, python as p, web as w } from './authoring.js';
export default {
  id: 'embarquee',
  title: 'Informatique embarquée et objets connectés',
  lessons: [
    lesson({
      id: 'snt-capteurs-actionneurs',
      title: 'Acquérir, décider et agir',
      duration: 45,
      prerequisites: ['Conditions, boucles et fonctions Python.'],
      objectives: [
        'Identifier la chaîne capteur-programme-actionneur.',
        'Programmer un contrôle à seuil sur des mesures simulées.'
      ],
      official: ['controle', 'acquisition'],
      sections: [
        [
          'Une chaîne qui relie information et monde physique',
          'Un capteur transforme une grandeur physique en signal exploitable ; un programme traite les données ; un actionneur produit un effet physique. Dans un thermostat, une sonde mesure la température, le contrôleur compare à une consigne et une commande agit sur le chauffage. L’IHM permet de choisir cette consigne et d’observer l’état. Un objet peut contenir de l’informatique sans être connecté à Internet ; la connexion est une possibilité supplémentaire, pas la définition de l’embarqué.'
        ],
        [
          'Acquérir puis commander',
          'Le programme répète généralement un cycle : lire une mesure, la convertir dans une unité, décider et écrire une commande. Un convertisseur peut fournir un entier brut ; une relation de calibration transforme cette valeur en grandeur physique. Si la sonde se débranche, une mesure peut devenir incohérente : il faut prévoir un état de défaut et éviter une action dangereuse. Les fonctions des exercices traitent des lectures fournies ; elles ne lisent aucun port réel et ne pilotent aucun appareil.'
        ],
        [
          'Le temps et les frontières comptent',
          'Une commande peut devoir arriver avant une échéance : c’est une contrainte de temps réel. La température varie avec retard et bruit ; un simple seuil peut faire basculer trop souvent un relais. Une hystérésis utilise deux seuils : allumer sous 19 degrés et éteindre au-dessus de 21, en gardant l’état entre les deux. Cette mémoire stabilise le modèle, mais ne remplace pas une étude physique, une calibration et des dispositifs de sécurité pour un système réel.'
        ]
      ],
      examples: [
        [
          'Nommer les rôles',
          'Un vélo mesure la rotation du pédalier puis commande un moteur.',
          'Le capteur fournit une donnée ; l’algorithme décide de l’assistance ; le moteur produit un mouvement.',
          'Le moteur est un actionneur, pas un capteur qui connaît l’intention du cycliste.'
        ],
        [
          'Un seuil simple',
          'Consigne 20 degrés ; chauffage actif seulement sous la consigne.',
          'À 19, la condition est vraie ; à 20 elle est fausse dans cette règle précise.',
          'La frontière doit être annoncée ; un autre thermostat peut adopter une règle différente.'
        ],
        [
          'Un état conservé',
          'Hystérésis : allumer sous 19, éteindre au-dessus de 21, mesure 20.',
          'Aucun seuil de basculement n’est franchi ; on conserve l’état antérieur.',
          'À 20, l’état dépend de l’histoire ; la mesure seule ne suffit pas.'
        ]
      ],
      activity: {
        type: 'sensor',
        prompt:
          'Fais varier la mesure autour du seuil de 20 et annonce l’état choisi avant observation.',
        prediction:
          'Une seule mesure proche du seuil suffit-elle à savoir comment un vrai chauffage évolue ?',
        explanation:
          'Ce modèle de capteur utilise une règle à seuil instantanée. Il ne représente ni bruit, ni inertie thermique, ni matériel de sécurité.',
        config: { initial: 18, threshold: 20 }
      },
      exercises: [
        a(
          'Dans un thermostat, l’élément chauffant relève-t-il du capteur ou de l’actionneur ?',
          'actionneur',
          [
            'Il agit sur la température.',
            'La sonde mesure ; l’élément chauffe.',
            'L’actionneur produit un effet physique.'
          ],
          'L’élément chauffant agit sur le système ; la sonde apporte l’information.',
          'Distingue la chaîne d’information de la chaîne d’action.'
        ),
        p(
          'Écris commandes(mesures, consigne). Renvoie une liste de booléens : True si la mesure est strictement inférieure à la consigne, False sinon. Mesures numériques valides fournies.',
          'commandes',
          'def commandes(mesures, consigne):\n    pass',
          'def commandes(mesures, consigne):\n    return [mesure < consigne for mesure in mesures]',
          [
            [
              [[18, 20, 22], 20],
              [true, false, false]
            ],
            [[[], 20], []],
            [
              [[19, 19], 20],
              [true, true]
            ]
          ],
          [
            'Parcours chaque mesure.',
            'Compare avec <, pas <=.',
            'Ajoute le booléen pour chaque acquisition simulée.'
          ],
          'Une commande est produite pour chaque mesure, sans accès à un chauffage réel.',
          'Si le cas 20 active le chauffage, tu as inclus une frontière que la règle exclut.'
        ),
        p(
          'Écris hysteresis(mesures, allume). Pour chaque mesure : sous 19 mettre allume à True ; au-dessus de 21 à False ; sinon garder l’état. Renvoyer les états successifs.',
          'hysteresis',
          'def hysteresis(mesures, allume):\n    pass',
          'def hysteresis(mesures, allume):\n    etats = []\n    for mesure in mesures:\n        if mesure < 19:\n            allume = True\n        elif mesure > 21:\n            allume = False\n        etats.append(allume)\n    return etats',
          [
            [
              [[18, 20, 22, 20], false],
              [true, true, false, false]
            ],
            [
              [[19, 21], true],
              [true, true]
            ],
            [[[], false], []]
          ],
          [
            'L’état doit être conservé d’un tour au suivant.',
            'Ne le change que si un seuil strict est franchi.',
            'Ajoute l’état après chaque décision.'
          ],
          'La mémoire de l’état empêche un basculement dans la zone entre les seuils.',
          'Réinitialiser allume à chaque tour détruit l’hystérésis : conserve la valeur précédente.'
        )
      ],
      reflection:
        'Autoévaluation : dessine la chaîne d’un objet courant, identifie capteur, traitement, IHM et actionneur, puis indique une défaillance possible et le délai de réponse nécessaire. Compare ton dessin à l’exemple du thermostat.',
      review: [
        'Je reconnais capteur et actionneur.',
        'Je programme une commande de seuil.',
        'Je comprends le rôle de la mémoire et du temps.'
      ]
    }),
    lesson({
      id: 'snt-ihm-objet',
      title: 'Construire une IHM et coder les commandes',
      duration: 45,
      prerequisites: ['HTML, événements simples et fonctions Python.'],
      objectives: [
        'Construire une interface lisible d’un objet simulé.',
        'Valider et décoder une commande d’actionneur.'
      ],
      official: ['ihm', 'acquisition'],
      sections: [
        [
          'Montrer une consigne et un état',
          'Une IHM assure les échanges entre humain et système : elle présente les mesures, reçoit les choix et indique l’état effectif. Le bouton « ouvrir » exprime une demande ; il ne prouve pas que la porte s’est ouverte. Le retour d’un capteur permettrait de confirmer l’état réel. Une interface claire distingue donc consigne, commande envoyée et état mesuré ; des libellés associés aux contrôles et des unités évitent des ambiguïtés.'
        ],
        [
          'Un message n’est pas un mouvement',
          'Un protocole simple peut définir A50 comme « régler le moteur A à 50 % ». On doit convenir de la lettre, de la plage numérique et de la réponse aux commandes invalides. Un texte reçu par le réseau n’est pas sûr par nature : on limite les valeurs admises et on traite les erreurs avant d’agir. Les exercices renvoient une valeur ou simulent un état à l’écran ; ils ne se connectent pas à un actionneur. Une utilisation matérielle demanderait une interface d’entrées-sorties et une procédure propre à l’appareil.'
        ],
        [
          'Tester l’interface avant le matériel',
          'On peut réaliser un prototype avec un curseur, un bouton d’arrêt et une mesure affichée. On teste clavier, limites, lisibilité et retour d’information. L’arrêt du prototype ne coupe aucun vrai moteur ; ce modèle pédagogique doit être explicitement annoncé. Dans un système connecté réel, authentification, contrôle des accès et état de défaut complètent le protocole fonctionnel. Un bouton visible ne remplace pas un arrêt matériel approprié, et une commande réseau peut être retardée ou perdue.'
        ]
      ],
      examples: [
        [
          'Une consigne sans retour',
          'L’interface affiche « ouverture demandée » après un clic.',
          'Cette phrase décrit l’envoi de la commande, pas l’état physique de la porte.',
          'Un capteur d’état serait nécessaire pour confirmer l’ouverture.'
        ],
        [
          'Une commande valide',
          'Le protocole autorise A suivi d’un entier de 0 à 100 ; on reçoit A50.',
          'Le préfixe identifie le moteur ; le suffixe fournit le pourcentage.',
          'La consigne vaut 50 % ; le message ne fournit pas une vitesse mesurée.'
        ],
        [
          'Une commande hors plage',
          'On reçoit A140 alors que la plage admise est 0 à 100.',
          'On détecte l’invalidité avant de la transmettre à l’actionneur.',
          'Le modèle rejette la commande ; tronquer ou accepter silencieusement changerait le contrat.'
        ]
      ],
      activity: {
        type: 'web',
        prompt: 'Manipule cette IHM locale : fais varier la consigne puis utilise Arrêt.',
        prediction: 'La valeur affichée est-elle une consigne ou une mesure réelle du moteur ?',
        explanation:
          'Cette IHM est un modèle local d’objet connecté, sans réseau ni actionneur. La valeur affichée est une consigne simulée.',
        config: {
          html: '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Moteur simulé</title></head><body><h1>Moteur simulé</h1><label for="v">Consigne (%)</label><input id="v" type="range" min="0" max="100" value="0" oninput="document.getElementById(\'etat\').textContent=this.value"><output id="etat">0</output><button onclick="document.getElementById(\'v\').value=0;document.getElementById(\'etat\').textContent=0">Arrêt</button></body></html>'
        }
      },
      exercises: [
        a(
          'Après un clic, « commande envoyée » confirme-t-il nécessairement l’état physique atteint ? Réponds oui ou non.',
          'non',
          [
            'Une commande exprime une demande.',
            'Elle peut être retardée ou ne pas être exécutée.',
            'Un retour de mesure est nécessaire.'
          ],
          'Le retour d’information physique ne se déduit pas de la demande seule.',
          'Ne confonds pas un état affiché par le programme et une observation du monde réel.'
        ),
        w(
          'Réalise une IHM de lampe simulée : un h1 « Lampe simulée », un output id="etat" contenant initialement « éteinte », un bouton id="allumer" qui affiche « allumée » dans cet output et un bouton id="eteindre" qui rétablit « éteinte ». Aucun matériel ne sera piloté.',
          '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Lampe</title></head><body></body></html>',
          '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Lampe</title></head><body><h1>Lampe simulée</h1><output id="etat">éteinte</output><button id="allumer" onclick="document.getElementById(\'etat\').textContent=\'allumée\'">Allumer</button><button id="eteindre" onclick="document.getElementById(\'etat\').textContent=\'éteinte\'">Éteindre</button></body></html>',
          [
            { selector: 'h1', text: 'Lampe simulée' },
            { selector: 'output#etat', text: 'éteinte' },
            { selector: '#allumer', text: 'Allumer' },
            { selector: '#eteindre', text: 'Éteindre' },
            {
              selector: 'output#etat',
              text: 'allumée',
              actions: [{ selector: '#allumer', click: true }]
            },
            {
              selector: 'output#etat',
              text: 'éteinte',
              actions: [{ selector: '#eteindre', click: true }]
            }
          ],
          [
            'Crée l’output avant les boutons.',
            'Chaque gestionnaire change textContent de etat.',
            'Teste manuellement les deux clics dans l’aperçu.'
          ],
          'Les vérifications contrôlent les éléments puis cliquent sur Allumer et Éteindre pour vérifier les deux états. La solution fournit ces comportements locaux, sans actionneur physique.',
          'Deux boutons visibles sans gestionnaire ne pilotent même pas le modèle : teste les changements d’état.'
        ),
        p(
          'Écris decoder(message). Accepte seulement A suivi de 1 à 3 chiffres décimaux ASCII représentant un entier de 0 à 100. Renvoie cet entier ; sinon renvoie -1. A seul, B50, A-1 et A101 sont invalides.',
          'decoder',
          'def decoder(message):\n    pass',
          'def decoder(message):\n    if not message.startswith("A"):\n        return -1\n    valeur = message[1:]\n    if not 1 <= len(valeur) <= 3 or any(c not in "0123456789" for c in valeur):\n        return -1\n    nombre = int(valeur)\n    if 0 <= nombre <= 100:\n        return nombre\n    return -1',
          [
            [['A50'], 50],
            [['A100'], 100],
            [['A101'], -1],
            [['A'], -1],
            [['B50'], -1],
            [['A-1'], -1],
            [['A0000'], -1]
          ],
          [
            'Vérifie d’abord le préfixe A.',
            'Contrôle la longueur et chaque caractère du suffixe.',
            'Convertis ensuite en entier et vérifie la plage.'
          ],
          'La validation précède la conversion et la commande ; les chaînes incorrectes produisent -1 sans action physique.',
          'int seul peut lever une erreur ou accepter une forme non prévue : vérifie la syntaxe avant la plage.'
        )
      ],
      reflection:
        'Autoévaluation : utilise au clavier les contrôles de ton IHM, vérifie l’arrêt et explique comment tu distinguerais une consigne d’une mesure sur un objet réel. Mentionne la manipulation matérielle qui n’a pas été réalisée.',
      review: [
        'Je distingue commande et mesure.',
        'Je construis une IHM manipulable.',
        'Je valide une commande avant traitement.'
      ]
    })
  ]
};

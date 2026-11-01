import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer,
  python,
  source
} from './helpers.js';

const network = {
  nodes: [
    { id: 'A', label: 'A', x: 10, y: 45 },
    { id: 'B', label: 'B', x: 40, y: 15 },
    { id: 'C', label: 'C', x: 65, y: 15 },
    { id: 'D', label: 'D', x: 90, y: 45 }
  ],
  edges: [
    ['A', 'D', 9],
    ['A', 'B', 1],
    ['B', 'C', 1],
    ['C', 'D', 1]
  ],
  start: 'A',
  goal: 'D'
};

export default {
  id: 'architectures',
  title: 'Architectures, systèmes et réseaux',
  lessons: [
    lesson(
      'soc',
      'Systèmes sur puce : rapprocher les composants',
      ['T-A1'],
      ['Processeur, mémoire et entrées-sorties'],
      [
        'Identifier CPU, mémoire et contrôleurs dans un SoC',
        'Relier intégration, échanges et énergie',
        'Distinguer composant matériel et interface logicielle'
      ],
      [
        s(
          'Lire un schéma de système sur puce',
          'Un SoC intègre plusieurs fonctions sur un même circuit : cœurs de processeur, accélérateur graphique, mémoires locales, contrôleurs d’entrées-sorties, interfaces de communication et gestion de l’énergie. Tout n’est pas nécessairement sur la puce : la mémoire principale ou des capteurs peuvent rester externes. Suivre les liaisons du schéma évite de confondre stockage et calcul.'
        ),
        s(
          'Pourquoi intégrer ?',
          'Rapprocher des fonctions réduit la longueur de certaines communications et évite une partie des échanges entre circuits. Cela peut améliorer la vitesse et réduire l’énergie consommée. Le résultat dépend du travail effectué et de l’architecture : intégrer davantage ne rend pas tout programme plus rapide. Les contraintes thermiques et le coût de conception restent importants.'
        ),
        s(
          'Le logiciel pilote le matériel',
          'Le système d’exploitation et les pilotes donnent accès à des contrôleurs par des interfaces documentées. Un programme peut demander une lecture de capteur sans connaître les détails électriques. L’API ne remplace pas le composant : elle expose un service. Les cartes pédagogiques permettent d’observer cette articulation entre acquisition, traitement et communication.'
        )
      ],
      [
        e(
          'Téléphone',
          'Le schéma relie CPU, GPU, contrôleur radio et mémoire locale.',
          'Les noms désignent des fonctions différentes intégrées dans un circuit.',
          'Exemple de système sur puce.'
        ),
        e(
          'Accélérer une image',
          'Un traitement exploite un GPU adapté.',
          'Certaines opérations graphiques sont confiées à une unité spécialisée.',
          'Le CPU ne réalise pas seul tous les calculs.'
        ),
        e(
          'Limite de l’intégration',
          'Une mémoire est dessinée hors de la puce.',
          'Un SoC peut communiquer avec des composants externes.',
          'SoC ne signifie pas ordinateur entièrement réduit à un unique composant.'
        )
      ],
      a(
        'cpu',
        'Repère où se déroulent lecture, traitement et écriture ; relie ces fonctions à un schéma de SoC.',
        'Quel composant exécute les instructions et lequel conserve les valeurs ?',
        'Le modèle CPU est volontairement minimal : il n’émule ni plusieurs cœurs ni le GPU, le réseau sur puce ou la consommation réelle d’un SoC.',
        {}
      ),
      [
        answer(
          '1. Reconnaître une unité',
          'Sur un schéma, quel sigle désigne l’unité spécialisée dans de nombreux traitements graphiques : CPU, GPU ou RAM ?',
          'GPU',
          [
            'RAM est une mémoire.',
            'CPU est le processeur généraliste.',
            'Le G renvoie au graphique.'
          ],
          'Le GPU est une unité de traitement graphique, fréquemment intégrée avec le CPU sur un SoC.',
          'Ne confonds pas unité de calcul et stockage. Relis le rôle des trois sigles.'
        ),
        answer(
          '2. Lire une liaison',
          'Un capteur externe communique avec un SoC par un contrôleur. Le capteur est-il nécessairement intégré à la puce ? Réponds oui ou non.',
          'non',
          [
            'Un lien peut franchir la frontière de la puce.',
            'Le contrôleur et le périphérique sont distincts.',
            'Le mot externe précise la position du capteur.'
          ],
          'Le contrôleur peut être intégré et le capteur rester externe. La frontière physique du SoC doit être lue sur le schéma.',
          'La présence d’une liaison ne signifie pas que les deux extrémités partagent le même circuit.'
        ),
        python(
          '3. Estimer une énergie de communication',
          'Modèle simplifié : chaque échange entre circuits consomme e unités. Après intégration, seule la proportion p reste externe. Écris economie(n,e,p) qui renvoie l’énergie économisée sur n échanges (0<=p<=1).',
          'economie',
          'def economie(n, e, p):\n    pass',
          'def economie(n, e, p):\n    return n * e * (1 - p)',
          [
            [[100, 2, 0.25], 150],
            [[0, 8, 0.5], 0],
            [[10, 3, 1], 0]
          ],
          [
            'Avant intégration, l’énergie modélisée vaut n*e.',
            'Après intégration, elle vaut n*e*p.',
            'Soustrais après de avant.'
          ],
          'Ce calcul illustre l’effet de réduire les échanges externes. Il ne modélise pas toute l’énergie du CPU ni les communications internes.',
          'Tu as peut-être calculé l’énergie restante. La demande concerne la différence entre les deux situations.'
        )
      ],
      'Quels éléments d’un vrai téléphone ne sont pas représentés par le modèle CPU de cette activité ?'
    ),

    lesson(
      'processus',
      'Processus, ordonnancement et interblocage',
      ['T-A2', 'T-A3'],
      ['Programme, mémoire et ressources matérielles'],
      [
        'Décrire création et états d’un processus',
        'Tracer un ordonnancement concurrent',
        'Reconnaître un interblocage et une prévention'
      ],
      [
        s(
          'Du programme au processus',
          'Un programme est une description enregistrée ; un processus est une instance en cours d’exécution avec un identifiant PID, un contexte et des ressources. Le système le crée, lui attribue de la mémoire et le place dans une file des prêts. Sous un système de type Unix, ps permet d’observer des processus ; top propose une observation actualisée. Observer n’exige pas d’interrompre les tâches.'
        ),
        s(
          'Partager le processeur',
          'Un processus prêt peut être élu et exécuté par l’ordonnanceur. Il devient bloqué s’il attend une entrée-sortie ou une ressource, puis redevient prêt quand l’événement attendu survient. Sur un cœur, plusieurs tâches progressent par alternance : concurrence ne signifie pas exécution simultanée. Avec un quantum, le tourniquet rend la main régulièrement aux tâches prêtes.'
        ),
        s(
          'Quand personne ne peut avancer',
          'P détient R1 et attend R2 ; Q détient R2 et attend R1. Si les ressources ne sont pas partageables et que chacun conserve sa ressource en attendant, les deux restent bloqués : interblocage. Une attente lente n’est pas forcément un interblocage. Imposer à tous le même ordre d’acquisition des ressources évite ce cycle dans cet exemple.'
        )
      ],
      [
        e(
          'Deux lancements',
          'Ouvrir deux fois le même programme.',
          'Le même code peut donner plusieurs contextes d’exécution.',
          'Deux processus peuvent avoir deux PID distincts.'
        ),
        e(
          'Tourniquet',
          'A demande 3 unités, B demande 2 ; quantum 1, arrivées à t=0.',
          'On alterne tant que la tâche possède du travail restant.',
          'A,B,A,B,A'
        ),
        e(
          'Cycle d’attente',
          'P possède imprimante et veut scanner ; Q possède scanner et veut imprimante.',
          'Chaque ressource attendue est conservée par l’autre processus.',
          'Interblocage possible, pas seulement une tâche lente.'
        )
      ],
      a(
        'process',
        'Avance l’ordonnancement puis observe une situation d’attente de ressources.',
        'Un processus bloqué peut-il utiliser immédiatement son quantum CPU ?',
        'La simulation est un modèle discret avec un petit nombre de tâches ; elle ne reproduit pas toutes les priorités, interruptions et ressources du système réel.',
        {}
      ),
      [
        answer(
          '1. Lire un état',
          'Un processus attend la fin d’une lecture disque. Parmi prêt, élu et bloqué, quel est son état ?',
          'bloqué',
          [
            'Il ne peut pas encore poursuivre ses instructions.',
            'Il attend un événement extérieur au CPU.',
            'Le retour de cet événement le rendra prêt.'
          ],
          'Le processus est bloqué en attente de l’entrée-sortie. Il ne peut pas être élu avant la disponibilité du résultat.',
          'Être en mémoire ne suffit pas pour être prêt. Cherche ce qui empêche la prochaine instruction.'
        ),
        python(
          '2. Tracer un tourniquet',
          'Écris tourniquet(durees) : toutes les tâches arrivent à zéro, quantum=1, ordre des indices croissant. Renvoie les indices exécutés à chaque unité ; les durées sont des entiers positifs ou nuls.',
          'tourniquet',
          'def tourniquet(durees):\n    pass',
          'def tourniquet(durees):\n    restant = list(durees)\n    trace = []\n    while any(x > 0 for x in restant):\n        for i in range(len(restant)):\n            if restant[i] > 0:\n                trace.append(i)\n                restant[i] -= 1\n    return trace',
          [
            [[[3, 2]], [0, 1, 0, 1, 0]],
            [[[]], []],
            [[[0, 1, 0]], [1]]
          ],
          [
            'Travaille sur une copie des durées.',
            'Chaque tour donne une unité à toute tâche non terminée.',
            'Ignore les tâches de durée zéro.'
          ],
          'Le modèle ne contient ni nouvelles arrivées ni blocage ; il permet d’isoler l’alternance d’un ordonnanceur à quantum un.',
          'N’exécute pas les tâches terminées. Vérifie la trace de [0,1,0] avant le cas à deux tâches.'
        ),
        answer(
          '3. Prévenir un cycle',
          'P et Q utilisent R1 et R2. On impose à tous de demander R1 avant R2. Un cycle où P détient R1 et Q détient R2 en attendant R1 peut-il encore se former selon cette règle ? Réponds oui ou non.',
          'non',
          [
            'Q doit obtenir R1 avant R2.',
            'Si P détient R1, Q ne peut pas avoir obtenu R2 selon la règle.',
            'La situation proposée viole donc l’ordre imposé.'
          ],
          'L’ordre commun empêche ici Q de conserver R2 tout en demandant R1 : il supprime la possibilité de cette attente circulaire.',
          'Analyse ce que Q a dû acquérir en premier. Le protocole porte sur tous les processus, pas seulement P.'
        )
      ],
      'Pourquoi un taux CPU faible ne prouve-t-il pas qu’un programme est terminé ?'
    ),

    lesson(
      'routage',
      'RIP et OSPF : quelle route optimiser ?',
      ['T-A4'],
      ['Graphes pondérés et notions de routeur'],
      [
        'Lire destination, interface et prochain saut',
        'Choisir une route selon la métrique RIP',
        'Additionner les coûts OSPF sans confondre débit et coût'
      ],
      [
        s(
          'Une décision à chaque routeur',
          'La table de routage associe une destination à une interface de sortie et éventuellement à un prochain routeur. Une destination directement connectée n’exige pas de prochain routeur. Les paquets sont transmis de proche en proche ; l’interface locale de sortie n’est pas l’adresse du voisin. Les tables peuvent être fixées ou apprises par un protocole.'
        ),
        s(
          'RIP compte les sauts',
          'RIP utilise une métrique fondée sur le nombre de sauts, sans mesurer la vitesse des liaisons. Dans le modèle du graphe de routeurs, une liaison compte une unité. Une route de deux liaisons est préférée à une route de trois, même si ses liaisons sont plus lentes. Les informations sont échangées entre voisins ; des changements demandent un temps de convergence.'
        ),
        s(
          'OSPF additionne des coûts',
          'OSPF utilise l’état des liaisons pour construire des routes de coût minimal. Une convention pédagogique fréquente donne coût=100/débit lorsque le débit est exprimé en Mbit/s. On additionne les coûts du chemin : on n’additionne pas les débits. Ce coût représente une préférence de routage, pas une mesure garantie de la durée réelle de chaque paquet ; files d’attente et pannes peuvent changer la situation.'
        )
      ],
      [
        e(
          'Routes en concurrence',
          'A—D coûte 9 ; A—B—C—D coûte 1+1+1.',
          'RIP compare 1 liaison à 3 ; OSPF compare coût 9 à coût 3.',
          'RIP : A-D ; OSPF : A-B-C-D.'
        ),
        e(
          'Calculer un coût',
          'Convention coût=100/débit, débit=20 Mbit/s.',
          'Le débit élevé donne un coût faible ; 100/20 vaut 5.',
          'Coût 5.'
        ),
        e(
          'Confusion de grandeur',
          'Choisir le chemin dont la somme des débits est la plus grande.',
          'La métrique demandée est la somme des coûts inverses, pas la somme des débits.',
          'Ce raisonnement ne calcule pas une route OSPF.'
        )
      ],
      a(
        'network',
        'Compare la liaison directe A-D et le détour par B et C.',
        'Le chemin avec le moins de liaisons minimise-t-il aussi leur somme de coûts ?',
        'Les poids représentent ici des coûts OSPF figés. Le modèle omet la convergence des protocoles, les sous-réseaux et les délais réels des files.',
        network
      ),
      [
        answer(
          '1. Choisir avec RIP',
          'A peut rejoindre D directement, ou via B puis C. Écris la route choisie par RIP, avec un tiret entre les noms.',
          'A-D',
          [
            'Une liaison compte pour un saut dans ce modèle.',
            'La route directe a une liaison.',
            'Le détour en a trois.'
          ],
          'RIP minimise les sauts : la route directe gagne, indépendamment des coûts OSPF.',
          'Les poids du graphe ne sont pas la métrique RIP. Compte les liaisons sans les additionner.'
        ),
        answer(
          '2. Choisir avec OSPF',
          'La route A-D coûte 9 ; A-B-C-D coûte 1+1+1. Donne la route de coût minimal, avec des tirets.',
          'A-B-C-D',
          [
            'Additionne les coûts de chaque route.',
            'Le détour coûte trois.',
            'Trois est inférieur à neuf.'
          ],
          'OSPF choisit le détour de coût 3. Un plus grand nombre de sauts peut ainsi correspondre au meilleur coût.',
          'Tu as peut-être réutilisé le critère de RIP. Écris les deux sommes puis compare.',
          source(
            'T5_Architecture_materielle/5.3_Protocoles_de_routage',
            'Cours : opposition métrique RIP et coûts OSPF',
            'Réseau original remplacé par quatre routeurs et quatre coûts textuels ; routes entièrement intégrées ; précision ajoutée sur coût et temps réel.'
          )
        ),
        python(
          '3. Calculer une métrique',
          'Écris cout_route(debits) qui renvoie la somme des coûts 100/d sur les liaisons d’un chemin. Les débits d sont strictement positifs en Mbit/s ; le chemin vide coûte zéro.',
          'cout_route',
          'def cout_route(debits):\n    pass',
          'def cout_route(debits):\n    return sum(100 / d for d in debits)',
          [
            [[[100, 50, 20]], 8],
            [[[]], 0],
            [[[10]], 10]
          ],
          [
            'Convertis chaque débit en coût avant de sommer.',
            'Pour 100 Mbit/s, le coût est un.',
            'La somme vide vaut zéro.'
          ],
          'La route composée de débits 100,50,20 a pour coûts 1,2,5 donc un total de 8.',
          '100/sum(debits) ne donne pas la somme des coûts. Calcule une contribution par liaison.'
        )
      ],
      'Pourquoi un chemin optimal pour RIP peut-il être moins intéressant pour OSPF ?'
    ),

    lesson(
      'cryptographie',
      'Clés partagées, clés publiques et HTTPS',
      ['T-A5', 'T-A6'],
      ['Messages binaires, XOR et communication réseau'],
      [
        'Expliquer chiffrement symétrique et asymétrique',
        'Relier authentification et établissement d’un secret',
        'Décrire le modèle hybride d’HTTPS et ses limites'
      ],
      [
        s(
          'Un secret partagé',
          'Un chiffrement symétrique utilise un secret connu des deux correspondants. Il est adapté aux volumes importants, mais le secret doit être établi sans être révélé à un observateur. XOR illustre la réversibilité : (m XOR k) XOR k=m. Un masque n’offre la sécurité du masque jetable que s’il est réellement aléatoire, aussi long que le message, secret et utilisé une seule fois.'
        ),
        s(
          'Une paire de clés et une identité',
          'Dans le modèle asymétrique de chiffrement, la clé publique peut être diffusée ; un message chiffré pour son détenteur se déchiffre avec sa clé privée. La clé publique doit être authentifiée, sinon un intermédiaire pourrait substituer la sienne. Une signature et un certificat servent à établir l’identité, ce qui est distinct de cacher le contenu.'
        ),
        s(
          'Un protocole hybride',
          'Dans le schéma pédagogique d’HTTPS, le navigateur vérifie le certificat du serveur puis utilise un mécanisme asymétrique pour établir un secret partagé ; les données sont ensuite protégées avec des clés symétriques. Le récit « chiffrer une clé de session avec la clé publique » illustre un échange hybride historique. Les protocoles modernes peuvent établir le secret par accord de clés : ce récit n’est pas une implémentation complète de TLS. César et le XOR de démonstration ne conviennent pas pour sécuriser un vrai site.'
        )
      ],
      [
        e(
          'XOR réversible',
          'm=6, k=3',
          '6 XOR 3=5, puis 5 XOR 3=6.',
          'Le même masque permet le retour au message.'
        ),
        e(
          'Destinataire',
          'Alice veut un message lisible seulement par Bob.',
          'Dans le modèle de chiffrement asymétrique, elle utilise la clé publique authentifiée de Bob.',
          'Bob utilise sa clé privée pour déchiffrer.'
        ),
        e(
          'Clé substituée',
          'Un intermédiaire fournit sa clé au lieu de celle du serveur.',
          'Chiffrer sans vérifier l’identité protège le message pour le mauvais destinataire.',
          'La confidentialité exige aussi une authentification correcte.'
        )
      ],
      a(
        'crypto',
        'Décale BONJOUR puis inverse le décalage ; identifie le secret qui doit être partagé.',
        'Connaître la clé de décalage permet-il de retrouver le texte ?',
        'César illustre seulement une clé symétrique. Ses 26 décalages sont faciles à essayer ; cette activité ne représente pas la sécurité d’HTTPS.',
        { message: 'BONJOUR', shift: 3 }
      ),
      [
        answer(
          '1. Choisir la clé',
          'Pour envoyer dans le modèle asymétrique un message confidentiel à Bob, Alice chiffre avec la clé publique de qui ? Réponds Alice ou Bob.',
          'Bob',
          [
            'Le destinataire doit pouvoir déchiffrer.',
            'Bob conserve sa clé privée.',
            'La clé publique correspondante doit être authentifiée.'
          ],
          'Alice chiffre avec la clé publique de Bob ; seul Bob détient la clé privée correspondante dans ce modèle.',
          'La clé privée ne doit pas être échangée. Identifie le détenteur qui doit lire le message.'
        ),
        python(
          '2. Construire le masque XOR',
          'Écris xor_masque(message,masque) sur deux listes d’octets de même longueur : renvoie les XOR. Si les longueurs diffèrent, lève ValueError. Ce modèle n’est pas un chiffrement de production.',
          'xor_masque',
          'def xor_masque(message, masque):\n    pass',
          'def xor_masque(message, masque):\n    if len(message) != len(masque):\n        raise ValueError("longueurs differentes")\n    return [x ^ k for x, k in zip(message, masque)]',
          [
            [
              [
                [6, 9],
                [3, 5]
              ],
              [5, 12]
            ],
            [[[], []], []],
            [[[1], []], null, 'ValueError']
          ],
          [
            'Vérifie les longueurs avant de parcourir.',
            'L’opérateur Python XOR est ^.',
            'Combine les deux listes position par position.'
          ],
          'Le XOR est réversible avec le même masque. La vérification de longueur évite que zip tronque silencieusement le message.',
          'Un masque court ne doit pas produire un résultat tronqué. Vérifie les tailles avant le XOR.',
          source(
            'T5_Architecture_materielle/5.4_Cryptographie',
            'Cours : activité du masque jetable',
            'Chaînes ord/chr remplacées par listes d’octets ; vérification des longueurs et tests d’erreur ajoutés ; conditions du masque jetable explicitées.'
          )
        ),
        answer(
          '3. Reconstituer le modèle hybride',
          'Après authentification et établissement d’un secret de session, le gros des données HTTPS est-il protégé par un mécanisme symétrique ou asymétrique ? Donne un seul mot.',
          'symétrique',
          [
            'Le secret de session est partagé.',
            'Il sert ensuite à traiter beaucoup de données.',
            'Le mécanisme asymétrique intervient pour établir et authentifier ce contexte.'
          ],
          'La protection des données de la session utilise des clés symétriques ; l’asymétrie aide à authentifier et établir le secret partagé.',
          'Tu confonds peut-être la préparation de la session avec le transfert de toutes les données. Sépare ces deux étapes.'
        )
      ],
      'Pourquoi la présence d’une clé publique ne suffit-elle pas à garantir que tu communiques avec le bon serveur ?'
    )
  ]
};

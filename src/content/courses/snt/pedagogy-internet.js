export default {
  'snt-paquets': {
    intro: [
      'Une vidéo se fige alors que ton appareil est toujours connecté. Des informations peuvent arriver plus tard ou par un autre chemin.',
      'Comment transporter un document en morceaux et le reconstituer sans promettre qu’il arrivera à une heure précise ?',
      'Comprendre paquets, routes et retransmissions permet de distinguer une connexion disponible, un contenu fiable et un direct fluide.',
      [
        'Découper un message et comprendre les adresses.',
        'Choisir un chemin en additionnant ses coûts.',
        'Distinguer le rôle d’IP de celui de TCP et repérer les morceaux manquants.'
      ]
    ],
    recap: [
      [
        'Réseau',
        'Des appareils reliés par des liaisons leur permettant d’échanger des données.',
        'Un téléphone communique avec une borne Wi-Fi qui le relie à d’autres réseaux.'
      ],
      [
        'Liste et numéro',
        'Une liste ordonne plusieurs valeurs ; un numéro peut repérer la place d’un morceau dans un ensemble.',
        '[3, 1] indique que les morceaux 3 et 1 ont été reçus.'
      ],
      [
        'Coût d’un chemin',
        'Un nombre choisi pour représenter une difficulté, une distance ou une durée ; on additionne les coûts des étapes compatibles.',
        'Deux étapes de coûts 3 et 4 donnent un coût total de 7.'
      ]
    ],
    life: [
      [
        'Des cartons numérotés',
        'Un déménagement répartit une bibliothèque dans trois cartons qui arrivent dans le désordre.',
        'Les numéros aident à reconstituer l’ordre, comme les positions des données dans un flux transporté par TCP.',
        'TCP n’étiquette pas de vrais cartons et transporte un flux d’octets ; les paquets peuvent aussi être redécoupés.'
      ],
      [
        'Un trajet après une route barrée',
        'Un livreur doit changer de route car un pont est fermé.',
        'Les routeurs orientent les paquets vers des étapes possibles et peuvent adapter les routes à une panne.',
        'Internet ne dispose pas d’un GPS unique connaissant instantanément toutes les pannes et tous les délais.'
      ]
    ],
    sections: [
      [
        'Du document aux paquets',
        'Une photo est représentée par des données. Pour voyager, ces données sont réparties en morceaux transportés dans des paquets. Chaque paquet porte des informations de transport, dont une adresse de destination : elle indique où acheminer le paquet, pas le nom de la personne photographiée. IP est le protocole, ou ensemble de règles, qui permet cet adressage et cet acheminement entre réseaux. Le destinataire peut ainsi recevoir plusieurs morceaux d’un même document à des instants différents.'
      ],
      [
        'Les routeurs font avancer les morceaux',
        'Un routeur est un équipement qui reçoit un paquet et choisit une liaison de sortie en fonction de ses routes connues. Il n’est pas nécessaire que tous les paquets suivent le même chemin. Pour représenter cela, on dessine un graphe : les sommets A, B, C et D représentent des équipements, les arêtes représentent les liaisons. Sur A-C-D, si A-C coûte 3 et C-D coûte 4, on calcule 3 + 4 = 7. Ces nombres sont les coûts du modèle, pas automatiquement des secondes mesurées.'
      ],
      [
        'Ce qu’IP ne promet pas',
        'Une liaison peut être occupée ou tomber en panne. Un paquet peut donc être perdu, retardé ou arriver après un autre. Une route de secours est un autre chemin disponible ; elle ne crée pas une garantie d’heure d’arrivée. Si B-D est coupée, A-B-D n’est plus utilisable, même si son coût était petit. On cherche alors une autre route, par exemple A-C-D, en vérifiant que toutes ses liaisons existent encore. Un réseau tolérant certaines pannes n’est pas un réseau incapable de perdre une information.'
      ],
      [
        'TCP reconstitue un flux fiable',
        'TCP ajoute au-dessus d’IP un suivi des données échangées. Les positions dans le flux permettent de remettre les octets dans l’ordre ; des accusés de réception indiquent ce qui a été reçu et des retransmissions peuvent renvoyer ce qui manque. Si les morceaux pédagogiques 1, 2, 3 arrivent 3, 1, 2, le résultat doit être présenté dans l’ordre 1, 2, 3. Un octet est un groupe de huit bits, unités valant 0 ou 1. TCP vise un flux correct et ordonné, mais une retransmission peut arriver trop tard pour un direct.'
      ],
      [
        'Trouver les manquants en Python',
        'Dans l’exercice, on simplifie les données en numéros de 1 à n. Une fonction commence par def manquants(n, recus): puis des lignes indentées. resultat = [] crée une liste vide. for numero in range(1, n + 1): parcourt 1 jusqu’à n inclus, car la borne finale de range est exclue. if numero not in recus: vérifie l’absence ; resultat.append(numero) ajoute le numéro. return resultat est placé après la boucle. Si recus contient deux fois 2, la présence de 2 reste vraie : le doublon n’est pas un nouveau morceau.',
        'def manquants(n, recus):\n    resultat = []\n    for numero in range(1, n + 1):\n        if numero not in recus:\n            resultat.append(numero)\n    return resultat'
      ]
    ],
    pauses: [
      [
        1,
        'Le coût du chemin A-C-D vaut 3 puis 4. Quel calcul faire ?',
        [
          ['3 + 4 = 7', '7'],
          ['3 × 4 = 12', '12']
        ],
        '7',
        'Le chemin suit successivement deux liaisons ; leurs coûts s’additionnent. Une multiplication ne représente pas ce modèle de parcours.'
      ],
      [
        3,
        'Un flux TCP correct garantit-il une vidéo sans retard ?',
        [
          ['Non, les retransmissions peuvent prendre du temps', 'non'],
          ['Oui, fiable signifie instantané', 'oui']
        ],
        'non',
        'L’ordre et la correction des données sont différents d’un délai maximal. Recevoir le bon morceau après son instant de lecture reste gênant.'
      ]
    ],
    reasoning: [
      'On sépare l’ordre observé, 3 puis 1 puis 2, de l’ordre attendu. Les positions conservées permettent de présenter d’abord 1, puis 2, puis 3 sans confondre les arrivées.',
      'On élimine d’abord tout chemin utilisant B-D. On vérifie ensuite A-C et C-D ; si ces liens existent, leur somme donne le coût de la route de secours.',
      'On compare l’heure à laquelle le morceau était nécessaire à son arrivée : deux secondes plus tard, la séquence du direct est déjà passée, même si les données reçues sont exactes.'
    ]
  },
  'snt-dns': {
    intro: [
      'Tu écris le nom d’une bibliothèque dans le navigateur sans connaître les nombres qui désignent son serveur. Pourtant la machine doit trouver une destination.',
      'Comment passer d’un nom facile à retenir à une adresse utilisable par le réseau ?',
      'Le DNS aide à lire une adresse Web et à comprendre pourquoi un nom, une machine et un site ne sont pas une correspondance éternelle.',
      [
        'Isoler le nom dans une adresse Web.',
        'Suivre une recherche dans un annuaire réparti.',
        'Lire une table de correspondances et distinguer recherche directe et inverse.'
      ]
    ],
    recap: [
      [
        'Serveur',
        'Un ordinateur ou un programme qui répond aux demandes d’autres programmes.',
        'Un serveur Web fournit une page à un navigateur.'
      ],
      [
        'Adresse IP',
        'Une adresse utilisée pour acheminer les données sur un réseau suivant le protocole IP.',
        '192.0.2.10 est ici une adresse réservée à la documentation.'
      ],
      [
        'Dictionnaire Python',
        'Une collection associant une clé à une valeur ; on retrouve la valeur grâce à la clé entre crochets.',
        'zone = {"cours.example": "192.0.2.10"} puis zone["cours.example"].'
      ]
    ],
    life: [
      [
        'Le contact d’un téléphone',
        'Tu choisis « Bibliothèque » dans tes contacts plutôt que de retaper son numéro.',
        'Le nom sert de repère mémorisable et le numéro permet la communication, comme un nom de domaine et une adresse IP.',
        'DNS est réparti entre des serveurs ; ce n’est pas seulement ton carnet privé et un nom peut avoir plusieurs adresses.'
      ],
      [
        'Une enseigne qui déménage',
        'Un commerce garde son nom mais change d’adresse postale.',
        'Un domaine peut rester le même alors que les adresses des serveurs changent : on doit refaire la correspondance.',
        'Des réponses DNS peuvent être conservées temporairement ; tous les utilisateurs ne voient pas forcément le changement immédiatement.'
      ]
    ],
    sections: [
      [
        'Lire ce qui appartient au nom',
        'Une URL est une adresse de ressource, par exemple https://cours.example/chapitre?numero=2. https décrit le mode d’échange, cours.example est le nom de domaine, /chapitre est le chemin et numero=2 est un paramètre. DNS, pour système de noms de domaine, cherche des informations sur cours.example ; il ne cherche pas tout le texte de l’URL. Les points séparent les parties du nom. Le domaine .example est réservé aux exemples : les noms de cette leçon ne sont pas des sites à visiter.'
      ],
      [
        'Chercher dans un annuaire réparti',
        'Pour contacter un serveur, une application a besoin d’une adresse réseau. Elle peut demander à un résolveur DNS de rechercher les adresses associées au nom. Un résolveur est un service qui réalise cette recherche pour le client. L’annuaire est réparti : différents serveurs gèrent différentes parties de l’espace des noms. On peut déléguer une zone, c’est-à-dire confier la gestion d’une partie des noms. Il n’existe donc pas un fichier mondial unique que chaque appareil devrait recopier intégralement.'
      ],
      [
        'Une réponse dépend de son contexte',
        'Un nom peut correspondre à plusieurs adresses, par exemple pour répartir des demandes entre machines. Une adresse peut aussi héberger plusieurs sites. Les réponses sont souvent placées en cache : cela signifie conserver temporairement une réponse pour éviter de refaire immédiatement la recherche. Une durée de validité limite cette réutilisation. Si la correspondance vient de changer, un cache encore valide peut expliquer une différence entre deux observations. Trouver une adresse à une date ne prouve pas qu’elle restera celle du nom.'
      ],
      [
        'Rechercher dans les deux sens',
        'La recherche directe part d’un nom et obtient une adresse. Une recherche inverse part d’une adresse et cherche un nom indiqué par un enregistrement appelé PTR. Les informations sont gérées séparément : l’absence de PTR ne prouve pas qu’aucun site n’utilise l’adresse. Le service DNS public connu par l’adresse 1.1.1.1 porte aussi le nom one.one.one.one : ce repère illustre deux écritures, pas une règle valable pour tous les domaines. Observer exige de noter le sens de la question et la réponse réellement fournie.'
      ],
      [
        'Interroger notre petite zone en Python',
        'Dans l’exercice, zone est un dictionnaire nom → adresse, beaucoup plus simple qu’un service DNS réel. def noms_pour_ip(zone, ip): définit une fonction recevant la table et l’adresse recherchée. noms = [] prépare une liste vide ; for nom in zone: parcourt les clés. zone[nom] lit l’adresse, == la compare à ip, et noms.append(nom) ajoute un nom correspondant. sorted(noms) produit une liste triée alphabétiquement ; return la renvoie. Plusieurs noms peuvent être ajoutés et aucun résultat donne [].',
        'def noms_pour_ip(zone, ip):\n    noms = []\n    for nom in zone:\n        if zone[nom] == ip:\n            noms.append(nom)\n    return sorted(noms)'
      ]
    ],
    pauses: [
      [
        0,
        'Quel nom extrait-on de https://images.example/mer?id=5 ?',
        [
          ['images.example', 'nom'],
          ['/mer?id=5', 'chemin']
        ],
        'nom',
        'Le nom se trouve après https:// et avant le premier /. Le chemin et le paramètre désignent ensuite une ressource sur le service.'
      ],
      [
        3,
        'Une recherche inverse sans PTR prouve-t-elle une machine absente ?',
        [
          ['Non, les deux sens sont gérés séparément', 'non'],
          ['Oui, les deux annuaires sont toujours identiques', 'oui']
        ],
        'non',
        'Une correspondance directe peut exister sans correspondance inverse publiée. Il faut distinguer absence de réponse à cette question et absence de service.'
      ]
    ],
    reasoning: [
      'On retire d’abord le préfixe https://, puis on s’arrête au /. Le texte restant avant cette séparation est bibliotheque.example ; ?id=7 appartient à la requête Web.',
      'On demande d’abord si l’on décrit un service, un nom ou une adresse. Ici 1.1.1.1 est une adresse de résolveur ; elle n’est pas le résultat universel de toutes les recherches.',
      'On a testé deux questions différentes. La réussite nom → adresse reste une observation valide même si adresse → nom ne fournit aucun PTR.'
    ]
  },
  'snt-supports-p2p': {
    intro: [
      'Le même film peut être envoyé par Wi-Fi ou par un câble. Plusieurs personnes peuvent aussi partager entre elles les morceaux déjà reçus.',
      'Qu’est-ce qui change entre support physique, organisation des échanges et quantité de données transportées ?',
      'Ces distinctions permettent d’estimer une durée, de comprendre le pair-à-pair et de discuter une croissance du trafic sans confondre technique et autorisation.',
      [
        'Comparer les supports et leurs contraintes.',
        'Comprendre le rôle d’un pair et la neutralité du réseau.',
        'Convertir des volumes et simuler des doublements.'
      ]
    ],
    recap: [
      [
        'Bit et octet',
        'Un bit vaut 0 ou 1 ; huit bits forment un octet. b désigne souvent le bit et o l’octet dans les unités françaises.',
        '8 Mb correspondent à 1 Mo avec les mêmes préfixes décimaux.'
      ],
      [
        'Débit',
        'Une quantité transférée par unité de temps, souvent par seconde.',
        '10 Mo/s signifie dix mégaoctets par seconde dans un modèle constant.'
      ],
      [
        'Doublement',
        'Multiplier la valeur actuelle par deux ; plusieurs doublements se suivent.',
        'En partant de 3, deux doublements donnent 6 puis 12.'
      ]
    ],
    life: [
      [
        'Partager les fiches d’une association',
        'Une personne distribue un dossier librement partageable ; chaque membre transmet ensuite des parties aux autres.',
        'Chaque pair reçoit et fournit des données, ce qui peut répartir l’effort au lieu de solliciter seulement l’émetteur initial.',
        'Les logiciels vérifient les morceaux et organisent les échanges ; une chaîne humaine ne décrit pas tout le protocole.'
      ],
      [
        'Remplir une bouteille',
        'Un robinet fournit un litre par minute pour remplir une bouteille de trois litres.',
        'Quantité divisée par débit donne une durée, comme 100 Mo divisés par 10 Mo/s donnent dix secondes.',
        'Un débit réseau varie et comporte des informations de transport ; un débit constant est une simplification.'
      ]
    ],
    sections: [
      [
        'Les données ont besoin d’un support',
        'Une liaison transmet des signaux : un câble de cuivre utilise des variations électriques, la fibre transporte de la lumière et le Wi-Fi utilise des ondes radio. Les protocoles sont les règles d’échange ; ils peuvent fonctionner sur plusieurs supports. Un téléphone en Wi-Fi peut communiquer avec un serveur relié par fibre. On compare portée, débit, obstacles et perturbations, sans déduire de l’absence de fil que le réseau n’a aucune infrastructure physique. Chaque étape de la chaîne peut limiter le débit obtenu.'
      ],
      [
        'Client-serveur et pair-à-pair',
        'Dans une organisation client-serveur, un client demande des données à un serveur qui les fournit. Dans le pair-à-pair, un participant, appelé pair, peut télécharger des morceaux et envoyer ceux qu’il possède déjà. Trois pairs peuvent ainsi répartir la diffusion d’un gros fichier. Cela ne signifie pas qu’aucun service d’organisation n’existe. La technique est compatible avec une distribution Linux librement partageable ; elle ne donne pas à elle seule le droit de diffuser une œuvre protégée. Il faut vérifier l’autorisation portant sur le contenu.'
      ],
      [
        'Calculer une durée avec des unités cohérentes',
        'Nous utilisons les préfixes décimaux : 1 ko = 1 000 octets, 1 Mo = 1 000 ko, 1 Go = 1 000 Mo et 1 To = 1 000 Go. Pour 100 Mo à 10 Mo/s, on calcule 100 / 10 = 10 secondes. Si le débit est 80 Mb/s, on commence par le convertir : huit bits par octet donnent 80 / 8 = 10 Mo/s. Mélanger Mo et Mb sans conversion introduit un facteur huit. Le résultat est idéal : il ignore les pauses, les autres utilisateurs et les informations ajoutées au transport.'
      ],
      [
        'Répéter un doublement et lire un ordre de grandeur',
        'Un trafic est le volume de données échangées pendant une période. Dans un scénario fictif de 2 To par jour, trois doublements donnent 2 → 4 → 8 → 16 To par jour. Le facteur global vaut 16 / 2 = 8. En Python, def trafic(initial, periodes): commence la fonction ; volume = initial garde le départ, for _ in range(periodes): répète exactement le nombre de périodes, et volume *= 2 abrège volume = volume * 2. return volume après la boucle renvoie le résultat ; zéro période conserve la valeur initiale.',
        'def trafic(initial, periodes):\n    volume = initial\n    for _ in range(periodes):\n        volume *= 2\n    return volume'
      ],
      [
        'La neutralité du réseau et les mesures de trafic',
        'La neutralité du réseau est le principe d’un traitement non discriminatoire du trafic, indépendamment notamment de son origine, de sa destination ou du service utilisé, sous les règles applicables de gestion du réseau. Elle concerne l’acheminement, pas une autorisation de tout publier. Pour comparer des mesures de trafic, on note période, territoire, unité et méthode : un volume mensuel mondial n’est pas un débit individuel. Une courbe historique peut montrer une forte croissance sans imposer des doublements futurs. Ici les 2 puis 16 To sont un scénario de calcul, pas une prévision.'
      ]
    ],
    pauses: [
      [
        1,
        'Le pair-à-pair autorise-t-il automatiquement le partage d’un film ?',
        [
          ['Non, l’autorisation dépend du contenu', 'non'],
          ['Oui, le protocole remplace la licence', 'oui']
        ],
        'non',
        'Une organisation technique d’échange ne change pas les droits attachés à une œuvre. Il faut lire l’autorisation ou la licence.'
      ],
      [
        3,
        'Après zéro doublement d’un volume de 7 Go, que reste-t-il ?',
        [
          ['7 Go', '7'],
          ['0 Go', '0']
        ],
        '7',
        'Zéro période signifie zéro multiplication. La variable volume conserve sa valeur initiale, 7.'
      ]
    ],
    reasoning: [
      'On identifie d’abord les unités : Mo pour le volume, Mo/s pour le débit. 10 secondes à 10 Mo/s transportent 10 × 10 = 100 Mo dans le modèle.',
      'Le contenu est explicitement placé sous une licence autorisant la diffusion. Les utilisateurs peuvent alors fournir les morceaux déjà obtenus ; cette autorisation serait à vérifier pour un autre fichier.',
      'Premier doublement : 2 × 2 = 4 ; deuxième : 4 × 2 = 8 ; troisième : 8 × 2 = 16. Il y a trois multiplications, en plus de la valeur de départ.'
    ]
  }
};

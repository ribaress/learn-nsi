import {
  lesson,
  answer as a,
  python as p,
  networkActivity as net,
  tableActivity as table
} from './authoring.js';
export default {
  id: 'internet',
  title: 'Internet',
  lessons: [
    lesson({
      id: 'snt-paquets',
      title: 'Transporter des paquets sans promettre une heure d’arrivée',
      duration: 40,
      prerequisites: ['Lire un graphe simple.'],
      objectives: [
        'Distinguer adressage, routage et fiabilisation.',
        'Expliquer pourquoi une panne ou une congestion affecte les délais.'
      ],
      official: ['ip-tcp', 'routage', 'fiabilite'],
      sections: [
        [
          'Découper et adresser',
          'Pour transporter un fichier, les logiciels échangent des paquets qui comprennent des données et des informations de contrôle. IP permet l’adressage et l’acheminement entre réseaux : un routeur choisit un prochain voisin à partir de la destination et de sa table locale. Il ne réserve pas nécessairement un chemin unique pour tout le fichier. Les paquets ont des tailles variables soumises aux limites des réseaux traversés ; l’image de petites enveloppes identiques n’est qu’une simplification.'
        ],
        [
          'Un acheminement limité',
          'Un routeur peut rencontrer un lien en panne, une file pleine ou une route modifiée. Un paquet peut être abandonné ; la limite de sauts évite aussi qu’il circule indéfiniment. Les tables peuvent évoluer après une panne mais cette adaptation demande du temps. Une route avec moins de sauts n’est pas forcément plus rapide : les débits, les délais des liens et leur charge comptent. La simulation de chemins sert à comprendre les choix locaux, pas à prévoir le réseau mondial.'
        ],
        [
          'Ce que TCP ajoute',
          'TCP utilise des numéros de séquence, des accusés de réception et des retransmissions pour fournir un flux d’octets ordonné à l’application. Si la communication reste possible, il récupère des pertes ; une connexion peut cependant échouer ou être interrompue. Fiabilité n’est donc ni livraison inconditionnelle ni ponctualité : un paquet retransmis arrive plus tard. Une visioconférence préfère parfois perdre une donnée devenue trop vieille plutôt qu’attendre : les exigences d’un fichier et d’un direct diffèrent.'
        ]
      ],
      examples: [
        [
          'Le désordre d’arrivée',
          'Trois morceaux numérotés 1, 2, 3 arrivent dans l’ordre 3, 1, 2.',
          'Les positions dans le flux permettent au récepteur TCP de présenter les octets dans le bon ordre.',
          'L’application reçoit le flux ordonné ; l’ordre d’arrivée physique n’est pas celui du document.'
        ],
        [
          'Une route de secours',
          'A-B-D coûte 4 ; A-C-D coûte 7 ; le lien B-D tombe.',
          'Le chemin habituel n’est plus utilisable ; les routes doivent s’adapter vers C si elles le permettent.',
          'Une route de secours peut exister sans garantir un délai maximal.'
        ],
        [
          'Fiable mais trop tard',
          'Un morceau vidéo est retransmis 2 secondes après sa perte.',
          'Les octets peuvent être corrects, mais leur instant d’utilisation est déjà passé.',
          'La fiabilité du contenu ne suffit pas au confort d’un direct.'
        ]
      ],
      activity: net(
        'network',
        'Compare les chemins de A à D puis imagine la suppression du lien B-D.',
        'Prévois si un chemin de secours impose forcément le même délai.',
        'Ce modèle de graphe est centralisé et statique ; Internet utilise des tables locales évolutives. Les coûts ne sont pas des mesures réelles.',
        [
          ['A', 'B', 2],
          ['B', 'D', 2],
          ['A', 'C', 3],
          ['C', 'D', 4]
        ]
      ),
      exercises: [
        a(
          'Quel protocole fiabilise et réordonne un flux : IP ou TCP ?',
          'TCP',
          [
            'IP traite notamment les adresses.',
            'On cherche les accusés de réception et retransmissions.',
            'Le protocole de transport attendu est TCP.'
          ],
          'TCP fournit un flux ordonné et contrôle les retransmissions.',
          'Tu as confondu acheminement et transport : associe chaque rôle au protocole.'
        ),
        a(
          'Dans le graphe A-B=2, B-D=2, A-C=3, C-D=4, quelle est la somme des coûts du chemin A-C-D ?',
          '7',
          [
            'Un chemin additionne les coûts de ses arêtes.',
            'A-C vaut 3.',
            'Ajoute C-D qui vaut 4.'
          ],
          'Le chemin A-C-D coûte 3 + 4 = 7 unités fictives.',
          'Ne compte pas les sommets : additionne seulement les deux arêtes parcourues.'
        ),
        p(
          'Modèle de réception : ecris manquants(n, recus) qui renvoie dans l’ordre les numéros absents de 1 à n inclus. Les doublons dans recus sont possibles.',
          'manquants',
          'def manquants(n, recus):\n    pass',
          'def manquants(n, recus):\n    resultat = []\n    for numero in range(1, n + 1):\n        if numero not in recus:\n            resultat.append(numero)\n    return resultat',
          [
            [[3, [3, 1]], [2]],
            [[2, [1, 1, 2]], []],
            [[0, []], []]
          ],
          [
            'Parcours range(1, n + 1).',
            'Teste si chaque numéro est absent avec not in.',
            'Ajoute uniquement les absents à une nouvelle liste.'
          ],
          'On compare les numéros attendus aux numéros reçus ; ce modèle ne réimplémente pas les fenêtres et délais de TCP.',
          'La taille de recus ne suffit pas : des doublons peuvent masquer un numéro absent.'
        )
      ],
      reflection:
        'Autoévaluation : explique pourquoi « TCP garantit une vidéo sans retard » est un contresens. Utilise un exemple de perte et de retransmission.',
      review: [
        'Je sépare les rôles IP et TCP.',
        'Je calcule le coût d’un chemin.',
        'Je distingue fiabilité et délai.'
      ]
    }),
    lesson({
      id: 'snt-dns',
      title: 'Des noms aux adresses avec DNS',
      duration: 35,
      prerequisites: ['Savoir qu’un paquet possède une adresse de destination.'],
      objectives: [
        'Distinguer nom de domaine, adresse IP et URL.',
        'Interpréter une résolution directe et une résolution inverse.'
      ],
      official: ['dns'],
      sections: [
        [
          'Des noms mémorisables',
          'Une adresse IP est une adresse numérique utilisée pour acheminer les paquets. Un nom de domaine est une désignation symbolique : DNS permet notamment de demander les adresses associées à ce nom. Le navigateur a donc généralement besoin d’une résolution avant d’établir une connexion à un domaine. Le nom ne décrit pas toute une page : dans https://exemple.org/cours, exemple.org est le domaine tandis que /cours est un chemin traité ensuite par le serveur.'
        ],
        [
          'Un annuaire réparti',
          'DNS ne repose pas sur un seul ordinateur contenant tous les noms. Un résolveur interroge des serveurs, utilise une hiérarchie de domaines et garde temporairement certaines réponses en cache. Un nom peut posséder plusieurs adresses, une adresse peut héberger plusieurs noms et les réponses peuvent évoluer. Un résultat d’aujourd’hui est donc une observation datée ; une panne DNS peut empêcher d’ouvrir un site même si la liaison physique fonctionne encore.'
        ],
        [
          'Observer dans les deux sens',
          'Sur un ordinateur connecté, on peut comparer nslookup one.one.one.one et nslookup 1.1.1.1. Le premier demande des adresses, le second recherche un enregistrement inverse PTR. L’inverse peut manquer ou renvoyer un nom différent : ce n’est pas une opération mathématique bijective. La documentation de l’opérateur associe le résolveur 1.1.1.1 à ce nom : [documentation Cloudflare](https://developers.cloudflare.com/1.1.1.1/infrastructure/network-operators/). Ces commandes sont à réaliser dans un terminal réel ; le tableau local n’interroge aucun serveur.'
        ]
      ],
      examples: [
        [
          'Extraire le domaine',
          'URL https://bibliotheque.example/romans?id=7.',
          'On isole la partie entre le protocole et le premier / ; le chemin et le paramètre ne sont pas envoyés au DNS comme nom.',
          'Le domaine est bibliotheque.example, un nom fictif réservé aux exemples.'
        ],
        [
          'Lire une observation réelle',
          'Service DNS public Cloudflare : adresse 1.1.1.1, nom one.one.one.one.',
          'On distingue le nom du service et l’adresse du serveur que l’on peut interroger.',
          'Un même nom peut fournir plusieurs adresses ; ne mémorise pas une correspondance comme universelle.'
        ],
        [
          'Un inverse absent',
          'Une recherche directe réussit ; la recherche inverse ne trouve pas de PTR.',
          'Les deux enregistrements sont gérés séparément, donc la seconde absence n’annule pas la première réponse.',
          'Le site peut rester accessible ; absence de PTR ne veut pas dire absence de machine.'
        ]
      ],
      activity: table(
        'Lis cette zone DNS fictive et repère les noms qui partagent une adresse.',
        'Prévois si retrouver une adresse suffit à identifier un seul site.',
        'Ce modèle est une table locale avec des adresses de documentation ; il ne représente pas la hiérarchie DNS ni les caches.',
        ['nom', 'adresse'],
        [
          ['cours.example', '192.0.2.10'],
          ['images.example', '192.0.2.11'],
          ['club.example', '192.0.2.10']
        ]
      ),
      exercises: [
        a(
          'Dans https://cours.example/chapitre?numero=2, quel est le nom demandé au DNS ?',
          'cours.example',
          [
            'Écarte https://.',
            'Écarte le chemin et la requête.',
            'Garde le domaine avant le premier /.'
          ],
          'Le nom de domaine est cours.example ; DNS ne cherche pas une page chapitre.',
          'Une URL complète comprend plus que le nom de domaine : découpe-la avant de répondre.'
        ),
        a(
          'Table fournie : cours.example → 192.0.2.10, images.example → 192.0.2.11. Quelle adresse correspond à images.example ?',
          '192.0.2.11',
          [
            'Repère exactement le nom images.example.',
            'Lis la valeur de sa ligne.',
            'Ne choisis pas l’adresse de cours.example.'
          ],
          'La correspondance du tableau fictif associe images.example à 192.0.2.11.',
          'Relis le nom complet ; les préfixes désignent ici des entrées distinctes.'
        ),
        p(
          'Écris noms_pour_ip(zone, ip) qui renvoie les noms associés à ip, triés alphabétiquement. zone est un dictionnaire nom → adresse.',
          'noms_pour_ip',
          'def noms_pour_ip(zone, ip):\n    pass',
          'def noms_pour_ip(zone, ip):\n    noms = []\n    for nom in zone:\n        if zone[nom] == ip:\n            noms.append(nom)\n    return sorted(noms)',
          [
            [
              [{ 'b.example': '192.0.2.1', 'a.example': '192.0.2.1' }, '192.0.2.1'],
              ['a.example', 'b.example']
            ],
            [[{ 'a.example': '192.0.2.1' }, '192.0.2.2'], []],
            [[{}, '192.0.2.1'], []]
          ],
          [
            'Parcours les noms du dictionnaire.',
            'Compare chaque adresse à ip.',
            'Trie les noms retenus avant de les renvoyer.'
          ],
          'Cette recherche dans une table illustre plusieurs noms pour une adresse ; ce n’est pas une véritable requête PTR.',
          'Ne renvoie pas un seul nom dès la première correspondance : plusieurs lignes peuvent convenir.'
        )
      ],
      reflection:
        'Autoévaluation pratique : sur un terminal réel connecté, effectue les deux commandes de la section et note la date, le résolveur interrogé et les réponses. Si le réseau est indisponible, distingue cette manipulation non réalisée du travail accompli sur le tableau.',
      review: [
        'Je distingue domaine et URL.',
        'Je sais lire une réponse DNS.',
        'Je connais les limites de la recherche inverse.'
      ]
    }),
    lesson({
      id: 'snt-supports-p2p',
      title: 'Supports, pair-à-pair et croissance du trafic',
      duration: 40,
      prerequisites: ['Distinguer Internet et Web.', 'Convertir octets et bits.'],
      objectives: [
        'Comparer architectures logiques et supports physiques.',
        'Calculer un ordre de grandeur de trafic sans confondre volume et débit.'
      ],
      official: ['pair-a-pair', 'supports', 'trafic'],
      sections: [
        [
          'Un même protocole sur plusieurs supports',
          'Ethernet peut relier des machines par câble ; Wi-Fi et réseaux mobiles utilisent des ondes ; la fibre transporte de la lumière. L’ancien modem téléphonique était beaucoup plus lent que les liaisons optiques courantes, mais aucun débit n’est garanti par le seul nom commercial d’une technique. Portée, partage du support et obstacles comptent. IP peut circuler sur des réseaux physiques différents : changer de Wi-Fi à réseau mobile ne transforme pas Internet en un autre service.'
        ],
        [
          'Des pairs qui échangent',
          'Dans un modèle client-serveur, un serveur distribue principalement les ressources aux clients. Dans un réseau pair-à-pair, un participant peut recevoir et fournir des morceaux à d’autres participants. Cela répartit la charge et peut faciliter la distribution d’un logiciel libre volumineux. Ce n’est ni automatiquement anonyme ni automatiquement illicite. Le partage non autorisé d’une œuvre protégée peut enfreindre des droits ; on examine l’autorisation et la licence du contenu, pas seulement le protocole utilisé.'
        ],
        [
          'Mesurer une croissance',
          'Un volume s’exprime en octets ; un débit en bits ou octets par seconde. Dans les exercices, Go = 10 puissance 9 octets et To = 10 puissance 12 octets. Doubler un trafic chaque période produit une croissance multiplicative : après trois doublements, il est multiplié par huit. C’est un scénario, pas une prédiction illimitée. Vidéos, multiplication des usages et objets connectés augmentent les échanges ; comparer deux estimations exige les mêmes unités, la même durée et le même périmètre.'
        ],
        [
          'La neutralité du réseau',
          'La neutralité vise un traitement des flux indépendant de leur contenu, de leur service et de leur origine, sans préférence commerciale arbitraire. Un opérateur qui ralentirait un service concurrent pour favoriser le sien soulèverait cet enjeu. Une gestion technique raisonnable du trafic n’est cependant pas équivalente à une discrimination commerciale. La neutralité n’impose ni un débit identique pour tous les abonnements ni une égalité du classement des pages par un moteur : elle concerne l’acheminement. Voir la présentation de [l’Arcep](https://www.arcep.fr/la-regulation/grands-dossiers-internet-et-numerique/la-neutralite-de-linternet.html).'
        ],
        [
          'Des ordres de grandeur réels et datés',
          'Selon le rapport Facts and Figures 2025 de l’Union internationale des télécommunications, le trafic mondial des utilisateurs du haut débit mobile est estimé à 1,5 zettaoctet en 2025, après avoir franchi 1 zettaoctet en 2023. Pour le haut débit fixe, les estimations sont de 6,2 zettaoctets en 2024 et 7,3 en 2025. Un zettaoctet vaut 10 puissance 21 octets, soit un milliard de téraoctets : on parle donc de milliards de To par an, très au-delà du petit scénario fictif de nos exercices. Ces chiffres sont des estimations annuelles d’un périmètre défini, pas un débit instantané ni le volume de toutes les données créées. Comparer le mobile entre 2023 et 2025 donne une hausse estimée de 50 %, et non un doublement universel. [Rapport primaire UIT 2025, page 18](https://www.itu.int/dms_pub/itu-d/opb/ind/d-ind-ict_mdd-2025-3-pdf-e.pdf).'
        ]
      ],
      examples: [
        [
          'Débit et durée',
          'Un fichier de 100 Mo à 10 Mo/s, sans surcharge.',
          'Le volume divisé par le débit donne une durée ; le modèle suppose un débit constant.',
          'Il faut idéalement 10 secondes ; Mo et Mb ne sont pas interchangeables.'
        ],
        [
          'Un partage autorisé',
          'Trois utilisateurs diffusent une distribution Linux sous une licence qui le permet.',
          'Chaque pair peut fournir des morceaux déjà reçus, ce qui soulage le serveur initial.',
          'Le pair-à-pair a ici un usage licite ; il ne donne pas une autorisation pour toute œuvre.'
        ],
        [
          'Un ordre de grandeur',
          'Un trafic fictif passe de 2 à 16 To par jour en trois périodes.',
          'Le quotient vaut 8, compatible avec trois doublements : 2 × 2 × 2 × 2.',
          'La croissance est multiplicative ; on ne prolonge pas ce scénario comme une loi certaine.'
        ]
      ],
      activity: net(
        'network',
        'Interprète les quatre sommets comme des pairs pouvant recevoir et envoyer des morceaux.',
        'Prévois si un pair restant disponible peut transmettre sans repasser par A.',
        'Ce modèle représente des relations logiques pair-à-pair ; les machines utilisent en dessous des routeurs et des liens physiques non dessinés.',
        [
          ['A', 'B', 1],
          ['A', 'C', 1],
          ['B', 'D', 1],
          ['C', 'D', 1],
          ['B', 'C', 1]
        ]
      ),
      exercises: [
        a(
          'Un pair télécharge puis distribue une œuvre sans autorisation. La technologie rend-elle automatiquement ce partage licite ? Réponds oui ou non.',
          'non',
          [
            'Une architecture n’accorde pas les droits d’auteur.',
            'Cherche une licence ou une autorisation.',
            'L’absence d’autorisation reste le problème.'
          ],
          'Le protocole ne remplace pas l’autorisation de diffusion de l’œuvre.',
          'Distingue possibilité technique et droit d’usage ; ne classe pas tous les contenus ensemble.'
        ),
        a(
          'Avec les unités décimales du cours, combien de Go contient 1 To ?',
          '1000',
          [
            'Un To vaut 10 puissance 12 octets.',
            'Un Go vaut 10 puissance 9 octets.',
            'Divise les deux puissances.'
          ],
          '10 puissance 12 / 10 puissance 9 = 1000 ; les unités binaires portent d’autres noms.',
          '1024 correspond à une convention binaire ; applique ici les unités décimales annoncées.'
        ),
        p(
          'Écris trafic(initial, periodes) : renvoyer le volume après periodes doublements, sans modifier initial hors de la fonction. periodes est un entier >= 0.',
          'trafic',
          'def trafic(initial, periodes):\n    pass',
          'def trafic(initial, periodes):\n    volume = initial\n    for _ in range(periodes):\n        volume *= 2\n    return volume',
          [
            [[2, 3], 16],
            [[5, 0], 5],
            [[0, 4], 0]
          ],
          [
            'Commence avec le volume initial.',
            'Répète une multiplication par 2 pour chaque période.',
            'Zéro période laisse le volume inchangé.'
          ],
          'Le scénario suit une croissance géométrique, et non un ajout constant de deux unités.',
          'Si tu obtiens 8 pour initial=2 et periodes=3, tu as probablement additionné au lieu de multiplier.'
        )
      ],
      reflection:
        'Autoévaluation : compare fibre et Wi-Fi selon support, mobilité et partage ; puis explique pourquoi un schéma pair-à-pair ne suffit pas à connaître le réseau physique.',
      review: [
        'Je distingue support et protocole.',
        'Je relie le partage aux autorisations.',
        'Je calcule une croissance multiplicative.'
      ]
    })
  ]
};

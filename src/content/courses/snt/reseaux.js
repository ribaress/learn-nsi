import {
  lesson,
  answer as a,
  python as p,
  tableActivity as table,
  networkActivity as net
} from './authoring.js';
export default {
  id: 'reseaux',
  title: 'Les réseaux sociaux',
  lessons: [
    lesson({
      id: 'snt-identites-revenus',
      title: 'Identités, audiences et modèles économiques',
      duration: 40,
      prerequisites: ['Connaître le modèle client-serveur.'],
      objectives: [
        'Séparer identification, authentification et réputation.',
        'Comparer les usages, les audiences et les sources de revenus.'
      ],
      official: ['identite', 'caracteristiques', 'confidentialite-sociale', 'revenus'],
      sections: [
        [
          'Un compte et une personne',
          'L’identification annonce une identité, par exemple un pseudonyme ; l’authentification apporte une preuve permettant d’accéder au compte, comme un mot de passe et un second facteur. L’identité numérique comprend aussi publications, profils et traces, y compris celles laissées par d’autres. L’e-réputation est l’image construite à partir de ces informations. Un profil soigné ne prouve ni l’identité civile ni la véracité de tout ce qu’il affirme ; un compte peut être usurpé.'
        ],
        [
          'Des services et des métriques différents',
          'LinkedIn met en avant des relations professionnelles, Instagram le partage visuel ; les messageries privées ajoutent encore d’autres modalités. LinkedIn annonçait environ 1,2 milliard de membres en juillet 2025, un ordre de grandeur de 10 puissance 9, mais membres inscrits ne signifie pas utilisateurs quotidiens : [bilan LinkedIn](https://news.linkedin.com/2025/Q4FY25_Earnings_Highlights). Meta annonçait 3,58 milliards de personnes actives quotidiennes pour sa famille d’applications en décembre 2025, pas pour un seul réseau : [bilan Meta](https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Fourth-Quarter-and-Full-Year-2025-Results/). On date les chiffres et on compare leurs périmètres avant de les classer.'
        ],
        [
          'Un autre réseau et une autre mesure',
          'Facebook combine profils, relations et groupes ; son éditeur déclarait 3,07 milliards d’utilisateurs actifs mensuels en décembre 2023 : [résultats Meta 2023](https://investor.atmeta.com/investor-news/press-release-details/2024/Meta-Reports-Fourth-Quarter-and-Full-Year-2023-Results-Initiates-Quarterly-Dividend/default.aspx). Ce repère historique est de l’ordre du milliard comme celui de LinkedIn, mais ne mesure ni les abonnés d’un compte particulier ni les membres inscrits avec la même définition. Comparer plusieurs réseaux exige donc de regarder à la fois leur fonction et la population comptée ; une audience très grande ne prouve pas une meilleure confidentialité.'
        ],
        [
          'L’attention et la confidentialité',
          'Publicité ciblée, abonnements payants, recrutement ou services professionnels peuvent financer une plateforme. L’activité et les interactions permettent de sélectionner des annonces ou de mesurer leur efficacité ; cela ne signifie pas forcément la vente brute de tous les fichiers personnels. Une audience privée réduit la diffusion initiale mais n’empêche ni capture ni repartage. On examine les abonnés, les permissions des applications tierces et les conditions d’usage, puis on choisit qui peut voir, commenter et contacter.'
        ]
      ],
      examples: [
        [
          'Deux gestes distincts',
          'Saisir son pseudonyme puis valider un code à usage unique.',
          'Le premier désigne le compte ; le second contribue à prouver que la personne peut y accéder.',
          'Identification et authentification ne sont pas synonymes.'
        ],
        [
          'Des chiffres non comparables',
          '1,2 milliard de membres inscrits et 3,58 milliards d’actifs quotidiens sur plusieurs services.',
          'Population, période et produit diffèrent ; un classement brut mélangerait les métriques.',
          'On retient l’ordre du milliard sans en déduire directement un taux d’activité.'
        ],
        [
          'Une audience restreinte',
          'Une photo est partagée avec dix contacts approuvés.',
          'Le réglage limite l’audience initiale, mais chacun peut faire une capture.',
          'Confidentialité n’équivaut pas à disparition garantie ni à consentement des personnes photographiées.'
        ]
      ],
      activity: table(
        'Compare ces plateformes fictives : quels revenus dépendent directement de l’attention et quels publics sont comptés ?',
        'Prévois si la plus grande valeur implique le plus grand nombre de personnes actives.',
        'Le tableau est un modèle fictif ; les effectifs ne décrivent aucun réseau réel et les métriques ne sont pas toutes comparables.',
        ['service', 'métrique', 'effectif', 'revenu'],
        [
          ['Pro', 'comptes inscrits', 1000000, 'abonnements'],
          ['Images', 'actifs mensuels', 800000, 'publicité'],
          ['Messages', 'actifs quotidiens', 400000, 'options payantes']
        ]
      ),
      exercises: [
        a(
          'Saisir un pseudonyme annonce un compte. Cela relève-t-il de l’identification ou de l’authentification ?',
          'identification',
          [
            'On annonce qui l’on prétend être.',
            'Aucune preuve n’a encore été fournie.',
            'La preuve d’accès relève de l’authentification.'
          ],
          'Le pseudonyme identifie le compte ; le secret ou le facteur vérifié l’authentifie.',
          'Ne confonds pas le nom annoncé avec une preuve que l’on possède ce compte.'
        ),
        a(
          'Une plateforme fictive encaisse 800 unités de publicité et 200 d’abonnements. Quel pourcentage de son revenu total vient de la publicité ?',
          '80',
          [
            'Calcule le total : 1000.',
            'Divise 800 par ce total.',
            'Multiplie le quotient par 100.'
          ],
          '800/1000 × 100 = 80 % ; il s’agit d’un modèle économique simplifié.',
          'Le pourcentage se rapporte au total des revenus, pas seulement à l’autre catégorie.'
        ),
        a(
          'Pour limiter l’audience initiale d’une photo personnelle, choisis « tout public » ou « contacts approuvés ».',
          'contacts approuvés',
          [
            'Le besoin est de limiter les destinataires.',
            'Tout public élargit l’accès.',
            'Les contacts approuvés restent susceptibles de repartager.'
          ],
          'Les contacts approuvés limitent la première diffusion ; il faut encore le consentement des personnes représentées.',
          'La facilité de publication ne doit pas déterminer l’audience : pars de l’objectif de confidentialité.'
        )
      ],
      reflection:
        'Autoévaluation pratique : sans communiquer tes données, examine les options d’audience et les applications autorisées d’un compte ou d’un compte de démonstration. Explique aussi pourquoi un nombre de membres ne mesure pas une activité quotidienne.',
      review: [
        'Je distingue identifier et authentifier.',
        'Je compare les métriques avant les nombres.',
        'Je sais limiter une audience.'
      ]
    }),
    lesson({
      id: 'snt-graphes-sociaux',
      title: 'Mesurer les distances et comprendre les communautés',
      duration: 45,
      prerequisites: ['Lire un graphe non orienté.'],
      objectives: [
        'Calculer excentricité, rayon, diamètre et centre.',
        'Expliquer l’influence des relations sur les recommandations.'
      ],
      official: ['graphes', 'petit-monde'],
      sections: [
        [
          'Du réseau au graphe',
          'Un sommet représente ici une personne et une arête une relation réciproque. La distance entre deux sommets est le nombre minimal d’arêtes d’un chemin entre eux, pas la distance géographique. Dans un réseau d’abonnements, les relations peuvent être orientées ; on annonce donc le modèle choisi. Les noms et positions des sommets sur le dessin n’affectent pas les distances du graphe ; seules les relations comptent.'
        ],
        [
          'Rayon, diamètre et centre',
          'L’excentricité d’un sommet est sa plus grande distance aux autres sommets. Le rayon du graphe connexe est la plus petite excentricité et le diamètre la plus grande. Les sommets dont l’excentricité égale le rayon forment le centre ; il peut y en avoir plusieurs. Dans une chaîne A-B-C-D, les excentricités valent 3, 2, 2, 3 : rayon 2, diamètre 3, centres B et C. Si le graphe est déconnecté, ces définitions demandent une convention ou une étude composante par composante.'
        ],
        [
          'Petits mondes et contenus proposés',
          'L’expérience historique de Milgram explore des chaînes de relations humaines, mais ne démontre pas que toutes les personnes du monde sont toujours reliées par exactement six liens. Des groupes denses et quelques liens entre groupes peuvent raccourcir les chemins. Suivre surtout des personnes d’un même groupe favorise la répétition de contenus proches ; les recommandations peuvent renforcer cet effet. Diversifier les sources et vérifier les documents ouvre d’autres perspectives sans garantir automatiquement une information juste.'
        ]
      ],
      examples: [
        [
          'Le sommet central',
          'Chaîne A-B-C-D : depuis B, A est à 1, C à 1, D à 2.',
          'La distance maximale depuis B vaut 2 ; depuis A elle vaut 3.',
          'B a une excentricité 2 ; un sommet au bord peut être moins central même s’il est dessiné au milieu.'
        ],
        [
          'Un triangle complet',
          'Trois personnes sont toutes reliées entre elles.',
          'Toute autre personne est à un lien de chaque sommet.',
          'Rayon et diamètre valent 1 ; les trois sommets appartiennent au centre.'
        ],
        [
          'Un pont entre groupes',
          'Deux groupes très liés partagent une seule relation entre deux membres.',
          'Cette relation fournit un passage court que les autres liens internes ne remplacent pas toujours.',
          'Un pont peut réduire les distances ; il ne prouve pas que les contenus traversent effectivement le groupe.'
        ]
      ],
      activity: net(
        'graph',
        'Calcule à la main les distances de la chaîne A-B-C-D et identifie ses centres.',
        'Prévois s’il existe forcément un seul centre.',
        'Ce modèle est un petit graphe connexe non orienté sans poids ; un réseau social réel peut être orienté et sa recommandation dépend d’autres données.',
        [
          ['A', 'B', 1],
          ['B', 'C', 1],
          ['C', 'D', 1]
        ]
      ),
      exercises: [
        a(
          'Dans la chaîne A-B-C-D, quelle est la distance minimale de A à D ?',
          '3',
          [
            'Traverse chaque arête de la chaîne.',
            'A-B puis B-C puis C-D.',
            'Compte les arêtes, pas les sommets.'
          ],
          'Trois relations relient A à D sur le seul chemin disponible.',
          'Compter quatre personnes donne quatre sommets, pas la longueur du chemin.'
        ),
        a(
          'Dans la chaîne A-B-C-D, les excentricités sont 3, 2, 2, 3. Quel est le rayon ?',
          '2',
          [
            'Le rayon est la plus petite excentricité.',
            'Compare les quatre nombres.',
            'Le minimum vaut 2.'
          ],
          'Le minimum des excentricités vaut 2 ; le diamètre serait le maximum, 3.',
          'Tu as peut-être pris le maximum : reprends les définitions de rayon et de diamètre.'
        ),
        p(
          'Écris bilan(excentricites) qui renvoie [rayon, diametre] d’un graphe connexe dont la liste non vide des excentricités est fournie.',
          'bilan',
          'def bilan(excentricites):\n    pass',
          'def bilan(excentricites):\n    return [min(excentricites), max(excentricites)]',
          [
            [[[3, 2, 2, 3]], [2, 3]],
            [[[1, 1, 1]], [1, 1]],
            [[[0]], [0, 0]]
          ],
          [
            'Le rayon utilise le minimum.',
            'Le diamètre utilise le maximum.',
            'Renvoie une liste avec le rayon en premier.'
          ],
          'On applique les définitions à des distances déjà calculées ; un sommet seul a rayon et diamètre nuls.',
          'Ne calcule pas la moyenne : la centralité demandée utilise des extrêmes.'
        )
      ],
      reflection:
        'Autoévaluation : explique avec un graphe comment modifier ses relations peut changer les contenus rencontrés. Distingue cette explication d’une preuve sur le fonctionnement d’un algorithme réel.',
      review: [
        'Je mesure une distance en arêtes.',
        'Je calcule rayon, diamètre et centre.',
        'Je nuance le modèle des petits mondes.'
      ]
    }),
    lesson({
      id: 'snt-cyberviolence',
      title: 'Reconnaître les cyberviolences et agir',
      duration: 35,
      prerequisites: ['Audience et traces numériques.'],
      objectives: [
        'Comprendre la répétition individuelle ou collective du harcèlement.',
        'Identifier une conduite de soutien et les ressources adaptées.'
      ],
      official: ['harcelement-droit', 'cyberviolence'],
      sections: [
        [
          'Reconnaître des situations différentes',
          'Insultes, menaces, attaques discriminatoires, usurpation et diffusion d’images intimes sans consentement sont des violences possibles en ligne. Le sexting désigne un échange de contenus intimes ; un échange consenti n’est pas à confondre avec sa diffusion imposée. L’audience, la persistance et les repartages peuvent aggraver les effets. La victime n’a pas à répondre publiquement pour mériter de l’aide ; un témoin peut soutenir sans republier le contenu blessant.'
        ],
        [
          'Comprendre le cadre du harcèlement',
          'L’article 222-33-2-2 vise notamment des conduites répétées dégradant les conditions de vie et altérant la santé. La répétition peut résulter d’un groupe concerté, ou d’interventions successives dont les auteurs connaissent la répétition. L’usage numérique est une circonstance aggravante. La version entrée en vigueur le 23 mars 2024 prévoit selon les circonstances des peines pouvant atteindre trois ans d’emprisonnement et 45 000 euros d’amende : [texte Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049312743/). Qualifier un cas réel appartient aux autorités compétentes ; « je n’ai envoyé qu’un message » n’écarte pas automatiquement la responsabilité collective.'
        ],
        [
          'Soutenir et demander de l’aide',
          'On peut conserver les éléments utiles de manière privée, signaler le contenu à la plateforme, limiter les contacts puis solliciter un adulte de confiance et l’équipe de l’établissement. Le 3018 accompagne les situations de harcèlement et de cyberharcèlement en France : [ressources du ministère](https://www.education.gouv.fr/non-au-harcelement/politique-de-lutte-contre-le-harcelement-l-ecole-289530). On évite la contre-attaque et la redistribution des images. Un signalement et un blocage sont des démarches différentes : bloquer limite les interactions, signaler demande un examen.'
        ]
      ],
      examples: [
        [
          'Une attaque collective',
          'Plusieurs personnes ciblent chacune une fois un même élève, en sachant que les attaques se répètent.',
          'Examiner seulement le nombre de messages de chaque auteur masque le caractère collectif.',
          'Une participation unique peut s’inscrire dans une répétition collective.'
        ],
        [
          'Une image repartagée',
          'Un témoin veut dénoncer une image intime en la republiant publiquement.',
          'La republication agrandit l’audience et prolonge l’atteinte ; on peut signaler sans diffuser.',
          'On soutient la personne et on conserve les preuves utiles de manière privée.'
        ],
        [
          'Bloquer et signaler',
          'Un compte envoie des messages agressifs.',
          'Bloquer peut limiter le contact ; signaler porte le contenu à la connaissance de la plateforme.',
          'Ces gestes peuvent se compléter ; ils ne remplacent pas l’aide d’un adulte ou d’un service compétent.'
        ]
      ],
      activity: table(
        'Associe chaque besoin à une démarche, puis explique oralement ce qu’elle ne garantit pas.',
        'Prévois si bloquer un compte supprime toutes les copies déjà diffusées.',
        'Ce tableau est un modèle d’analyse de démarches ; il n’effectue aucun signalement et ne juge aucune situation réelle.',
        ['besoin', 'démarche'],
        [
          ['limiter le contact', 'bloquer'],
          ['faire examiner un contenu', 'signaler'],
          ['être accompagné', 'adulte de confiance ou 3018']
        ]
      ),
      exercises: [
        a(
          'Un témoin veut aider sans étendre la diffusion. Choisis « repartager publiquement » ou « soutenir et signaler ».',
          'soutenir et signaler',
          [
            'Pense à l’audience de la victime.',
            'Republier élargit cette audience.',
            'Le soutien ne nécessite pas de montrer le contenu à tous.'
          ],
          'Le soutien et le signalement évitent une nouvelle exposition publique.',
          'Même une dénonciation peut amplifier la violence si elle republie le contenu.'
        ),
        a(
          'Quel numéro français indiqué dans cette leçon accompagne le harcèlement et le cyberharcèlement des jeunes ?',
          '3018',
          [
            'Le numéro figure dans la section des ressources.',
            'Il commence par 30.',
            'Il s’agit du 3018.'
          ],
          'Le 3018 est une ressource d’accompagnement indiquée par le ministère.',
          'Reviens à la rubrique des ressources et distingue aide, blocage et signalement.'
        ),
        a(
          'Affirmation : « Une seule intervention de chaque participant exclut toujours une répétition collective ». Réponds vrai ou faux.',
          'faux',
          [
            'Examine l’ensemble des interventions.',
            'Des personnes peuvent agir de manière concertée.',
            'La répétition ne se réduit pas au compteur individuel.'
          ],
          'Le cadre légal inclut certaines situations collectives ; le nombre individuel ne suffit pas.',
          'N’isole pas chaque message de la série dont les auteurs ont connaissance.'
        )
      ],
      reflection:
        'Autoévaluation : à partir d’un scénario fictif sans donnée personnelle, propose une réponse de témoin en quatre étapes et compare-la au cours. Explique pourquoi aider ne signifie pas exposer davantage la personne.',
      review: [
        'Je reconnais plusieurs formes de violence.',
        'Je comprends la répétition collective.',
        'Je connais une démarche de soutien.'
      ]
    })
  ]
};

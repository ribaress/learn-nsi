import { lesson, answer as a, python as p, web as w, tableActivity as table } from './authoring.js';
export default {
  id: 'web',
  title: 'Le Web',
  lessons: [
    lesson({
      id: 'snt-html-css',
      title: 'Construire une page et relier ses contenus',
      duration: 45,
      prerequisites: ['Distinguer Internet et Web.'],
      objectives: [
        'Modifier une structure HTML accessible.',
        'Séparer la signification du contenu de sa présentation CSS.'
      ],
      official: ['hypertexte', 'contenu-style', 'modifier-html'],
      sections: [
        [
          'Le document a une structure',
          'HTML décrit la structure et la signification d’un document. Un titre h1 annonce le sujet, un paragraphe p contient un texte et un élément a crée un lien avec son attribut href. Les balises ne sont pas faites pour dessiner des positions absolues : le navigateur interprète la structure et adapte l’affichage. Un document complet annonce doctype, langue, encodage et titre de l’onglet ; ces informations aident le navigateur et les outils d’accessibilité.'
        ],
        [
          'Suivre un hyperlien',
          'Le texte visible d’un lien et son adresse sont distincts. href peut contenir une URL absolue vers un autre site, un chemin relatif ou #details vers un élément qui possède id="details" dans la même page. Un intitulé explicite indique la destination ; « cliquer ici » n’explique rien hors contexte. Une image devrait comporter une alternative adaptée. Le lien crée un renvoi, pas une copie garantie du document distant : sa destination peut changer ou disparaître.'
        ],
        [
          'Le style est une règle de présentation',
          'CSS sélectionne des éléments et leur applique des propriétés, par exemple p { color: navy; }. Modifier la couleur ne change pas le texte ni son rôle de paragraphe. Plusieurs présentations peuvent donc utiliser le même contenu, notamment sur téléphone ou à l’impression. Un titre obtenu seulement par une grande police ne remplace pas une vraie balise de titre. On vérifie une page par sa structure, la lisibilité des contrastes et le comportement des liens, pas seulement par une capture d’écran.'
        ]
      ],
      examples: [
        [
          'Contenu ou style',
          'Un paragraphe affiche « Club astronomie » en bleu.',
          'Le texte appartient au HTML ; la règle color appartient au CSS.',
          'Changer la couleur conserve le contenu et son sens.'
        ],
        [
          'Une ancre locale',
          'Le lien href="#sources" vise un élément id="sources".',
          'Le navigateur cherche un identifiant dans le document courant, sans imposer un autre serveur.',
          'Le renvoi fonctionne si l’identifiant existe ; #source et #sources diffèrent.'
        ],
        [
          'Un faux titre',
          'Un texte très grand est placé dans un simple paragraphe.',
          'L’apparence visuelle ne transmet pas nécessairement un niveau de titre aux lecteurs d’écran.',
          'On choisit h1 pour le titre principal, puis CSS pour son apparence.'
        ]
      ],
      activity: {
        type: 'web',
        prompt:
          'Observe la structure, le lien local et la règle de couleur de cette page intégrée.',
        prediction: 'Changer color modifie-t-il la destination du lien ?',
        explanation:
          'Cette page locale est un exemple HTML/CSS isolé ; elle ne représente pas la publication sur un serveur public.',
        config: {
          html: '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Club</title><style>h1{color:navy}</style></head><body><h1>Club sciences</h1><a href="#details">Lire les détails</a><p id="details">Atelier le jeudi.</p></body></html>'
        }
      },
      exercises: [
        a(
          'Dans p { color: navy; }, le changement relève-t-il de HTML ou de CSS ?',
          'CSS',
          [
            'La règle sélectionne des paragraphes.',
            'Elle ne modifie pas leur texte.',
            'Le langage de présentation est CSS.'
          ],
          'CSS règle l’apparence ; HTML porte ici la structure et le texte.',
          'Une modification visible n’est pas forcément une modification de contenu : identifie le langage.'
        ),
        w(
          'Crée une page complète avec un h1 « Club sciences », un lien a href="#programme" portant « Voir le programme », et un paragraphe id="programme" contenant « Atelier le jeudi ».',
          '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Club</title></head><body></body></html>',
          '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Club</title></head><body><h1>Club sciences</h1><a href="#programme">Voir le programme</a><p id="programme">Atelier le jeudi</p></body></html>',
          [
            { selector: 'h1', text: 'Club sciences' },
            { selector: 'a', attribute: 'href', value: '#programme' },
            { selector: 'a', text: 'Voir le programme' },
            { selector: 'p#programme', text: 'Atelier le jeudi' }
          ],
          [
            'Place le titre dans h1.',
            'Écris href="#programme" dans le lien.',
            'Le paragraphe cible doit porter id="programme".'
          ],
          'L’identifiant relie le renvoi à sa cible ; le texte du lien annonce la destination.',
          'Si le lien échoue, compare exactement href et id, y compris le signe # réservé au href.'
        ),
        w(
          'Améliore ce document : remplace le faux titre par h1 « Observations » et ajoute un lien vers https://www.cern.ch/ contenant « CERN ». Conserve le paragraphe existant.',
          '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Observations</title></head><body><p style="font-size:32px">Observations</p><p>Un carnet partagé.</p></body></html>',
          '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Observations</title></head><body><h1>Observations</h1><p>Un carnet partagé.</p><a href="https://www.cern.ch/">CERN</a></body></html>',
          [
            { selector: 'h1', text: 'Observations' },
            { selector: 'a', attribute: 'href', value: 'https://www.cern.ch/' },
            { selector: 'a', text: 'CERN' },
            { selector: 'p', text: 'Un carnet partagé.' }
          ],
          [
            'Remplace la balise du faux titre.',
            'Un lien utilise a et href.',
            'Garde le paragraphe du carnet.'
          ],
          'Le document devient plus sémantique et possède un renvoi absolu vers un autre site.',
          'Agrandir encore le paragraphe ne crée pas un titre structurel : utilise la balise h1.'
        )
      ],
      reflection:
        'Autoévaluation : lis ta page sans regarder ses couleurs et explique si sa hiérarchie reste compréhensible. Vérifie que chaque texte de lien annonce sa destination.',
      review: [
        'Je distingue HTML et CSS.',
        'Je crée un renvoi local.',
        'Je choisis des balises qui portent du sens.'
      ]
    }),
    lesson({
      id: 'snt-http',
      title: 'Lire une URL et un dialogue client-serveur',
      duration: 40,
      prerequisites: ['Noms de domaine et structure HTML.'],
      objectives: [
        'Décomposer URL et paramètres d’une requête.',
        'Localiser les traitements dans le client ou dans le serveur.'
      ],
      official: ['url', 'https', 'http', 'client-serveur'],
      sections: [
        [
          'L’adresse décrit une ressource',
          'Dans https://catalogue.example/livres?theme=mer&page=2#avis, https est le schéma, catalogue.example le nom d’hôte, /livres le chemin, theme et page des paramètres de requête, et avis un fragment local. Le fragment n’est pas transmis dans la requête HTTP ordinaire. Un port peut aussi être indiqué. Une URL n’est donc pas seulement un nom de domaine ; une information personnelle placée dans ses paramètres peut finir dans des journaux ou des historiques.'
        ],
        [
          'Le client demande, le serveur répond',
          'Le navigateur est un client : il envoie par exemple GET /livres?theme=mer&page=2 HTTP/1.1 avec un en-tête Host. Le serveur répond avec un statut, des en-têtes et éventuellement un corps. 200 indique une réussite, 404 une ressource non trouvée. Un formulaire peut transmettre des données dans le corps d’une requête POST. La page reçue peut avoir été calculée au serveur ; JavaScript peut ensuite modifier son affichage dans le navigateur. Inspecter le code reçu ne révèle pas le programme privé du serveur.'
        ],
        [
          'Le périmètre de HTTPS',
          'HTTPS ajoute la protection TLS aux échanges HTTP et permet au navigateur de vérifier le certificat présenté pour le domaine. Cela protège le transport contre certaines écoutes et altérations ; cela ne prouve pas que le vendeur est honnête ou que son texte est vrai. Une page d’hameçonnage peut aussi posséder un certificat valide. On vérifie donc le domaine exact en plus de HTTPS ; si une alerte de certificat apparaît, on ne la contourne pas machinalement.'
        ]
      ],
      examples: [
        [
          'La partie locale',
          'https://cours.example/lecon?id=4#exercice.',
          'Le navigateur peut se positionner sur exercice après réception ; la requête porte le chemin et le paramètre id.',
          'Le fragment #exercice n’est pas un paramètre envoyé au serveur.'
        ],
        [
          'Une page dynamique',
          'Le serveur calcule un prix ; JavaScript masque ensuite un panneau.',
          'Le prix peut être généré avant l’envoi, tandis que le masquage agit après réception dans le navigateur.',
          'Les deux machines participent ; voir du HTML ne permet pas de lire tout le code serveur.'
        ],
        [
          'Un site trompeur chiffré',
          'Une imitation de boutique utilise une URL https.',
          'Le chiffrement protège la liaison avec ce domaine, même si son propriétaire trompe les clients.',
          'HTTPS est nécessaire à la protection des échanges mais ne certifie pas la qualité d’un commerce.'
        ]
      ],
      activity: table(
        'Associe chaque étape à la machine qui l’exécute et repère ce qui traverse le réseau.',
        'Prévois si l’inspecteur du navigateur montre le calcul interne du serveur.',
        'Ce modèle déroule une seule requête HTTP ; une page réelle peut provoquer beaucoup de requêtes et utiliser des caches.',
        ['étape', 'acteur'],
        [
          ['GET /livres?theme=mer', 'client'],
          ['recherche dans la base', 'serveur'],
          ['réponse HTML', 'serveur'],
          ['affichage et JavaScript', 'client']
        ]
      ),
      exercises: [
        a(
          'Dans https://catalogue.example/livres?theme=mer&page=2#avis, quelle est la valeur du paramètre page ?',
          '2',
          [
            'La requête commence après ?.',
            'Les couples sont séparés par &.',
            'Lis la valeur après page=.'
          ],
          'Le paramètre page vaut 2 ; avis est un fragment distinct.',
          'Ne confonds pas le chemin, les paramètres et le fragment : marque leurs séparateurs.'
        ),
        a(
          'GET /livres?theme=mer&page=2 HTTP/1.1 contient combien de paramètres de requête ?',
          '2',
          [
            'Isole la partie après ?.',
            'Compte les couples nom=valeur.',
            'theme et page sont les deux noms.'
          ],
          'La requête possède deux paramètres, theme et page.',
          'HTTP/1.1 est la version du protocole, pas un paramètre supplémentaire.'
        ),
        a(
          'Une page HTTPS promet un cadeau contre un mot de passe. Le chiffrement suffit-il à prouver cette promesse ? Réponds oui ou non.',
          'non',
          [
            'Le certificat vise un domaine.',
            'Le contenu d’une promesse n’est pas vérifié par TLS.',
            'Analyse l’expéditeur et l’adresse exacte.'
          ],
          'HTTPS protège le transport mais ne garantit ni la sincérité du contenu ni la légitimité de la demande.',
          'Tu as attribué au chiffrement un contrôle qu’il ne fait pas ; distingue transport et confiance.'
        )
      ],
      reflection:
        'Autoévaluation pratique : dans les outils réseau d’un navigateur, observe une requête d’une page de confiance, son chemin, ses paramètres et son statut. Rédige une explication personnelle des limites de ce que l’inspecteur révèle.',
      review: [
        'Je décompose une URL.',
        'Je lis une requête HTTP.',
        'Je distingue sécurité du transport et véracité.'
      ]
    }),
    lesson({
      id: 'snt-recherche-publication',
      title: 'Chercher, vérifier et publier',
      duration: 40,
      prerequisites: ['Liens hypertextes et paramètres.'],
      objectives: [
        'Distinguer exploration, indexation et classement.',
        'Vérifier une information et les droits de sa réutilisation.'
      ],
      official: ['moteurs', 'publication', 'droit'],
      sections: [
        [
          'Comment un moteur prépare une réponse',
          'Des robots explorent des pages en suivant notamment des liens. Le moteur indexe des contenus : un index inversé associe un terme aux documents qui le contiennent. Lors d’une requête, un classement choisit l’ordre de présentation avec de nombreux critères. Exploration, indexation et classement sont donc trois étapes distinctes. Une page absente des premiers résultats peut exister ; une page très bien classée n’est pas automatiquement vraie. Les liens publicitaires doivent être distingués des résultats issus du classement.'
        ],
        [
          'Construire un jugement',
          'On vérifie l’auteur, la date, la méthode et les sources d’une affirmation. Deux sites qui recopient le même texte ne constituent pas deux confirmations indépendantes. Une requête différente peut révéler d’autres points de vue ; une source primaire permet de revenir au document ou à la mesure d’origine. L’ordre des résultats peut varier selon la requête, le lieu et les réglages. On note donc le contexte de la recherche au lieu de traiter la première page comme une encyclopédie complète.'
        ],
        [
          'Publier avec une autorisation',
          'Un contenu visible en ligne reste susceptible d’être protégé par le droit d’auteur. Une licence indique certains usages autorisés et leurs conditions, par exemple attribution ou partage sous les mêmes conditions. Gratuit à consulter ne signifie pas libre à republier ; une licence ouverte n’oblige pas non plus à rendre tout service gratuit. Voir le guide du [ministère de l’Économie](https://www.economie.gouv.fr/apie/utiliser-un-contenu-vrai-faux). Avant de publier, on vérifie aussi le consentement des personnes et l’absence de données privées. Une capture ou une copie peut survivre à la suppression : le choix de l’audience doit précéder la diffusion.'
        ]
      ],
      examples: [
        [
          'Un index minuscule',
          'Document A : « mer et vent » ; document B : « montagne et vent ».',
          'Le terme vent renvoie à A et B ; mer renvoie seulement à A.',
          'Un index retrouve des occurrences ; il ne décide pas à lui seul quel document est fiable.'
        ],
        [
          'Deux faux témoins',
          'Deux blogs donnent le même chiffre sans lien, puis on découvre une source commune.',
          'Le nombre de copies n’augmente pas le nombre de mesures indépendantes.',
          'Il faut retrouver la source initiale et son contexte.'
        ],
        [
          'Une image sous licence',
          'Une photographie indique auteur et licence CC BY.',
          'La licence autorise des réutilisations sous condition d’attribution ; il faut lire ses termes et identifier la version.',
          'On conserve le crédit et le lien de licence ; l’image n’est pas « sans propriétaire ».'
        ]
      ],
      activity: table(
        'Construis oralement l’index inversé de mer et vent, puis compare deux réponses possibles à la requête vent.',
        'Prévois si l’ordre des documents prouve leur fiabilité.',
        'Ce modèle utilise trois textes fictifs ; un moteur réel traite des contenus bien plus nombreux et utilise d’autres critères.',
        ['document', 'texte'],
        [
          ['A', 'mer vent'],
          ['B', 'montagne vent'],
          ['C', 'mer soleil']
        ]
      ),
      exercises: [
        a(
          'Dans les documents A="mer vent", B="montagne vent", C="mer soleil", combien de documents contiennent vent ?',
          '2',
          ['Teste chaque document séparément.', 'A contient vent.', 'B aussi, C non.'],
          'Deux documents correspondent au terme, sans classement de qualité.',
          'Ne compte pas tous les documents de la collection : filtre d’abord sur le terme.'
        ),
        p(
          'Écris rechercher(documents, mot) qui renvoie les indices des textes contenant mot comme mot entier séparé par des espaces, sans distinction de casse. Les indices commencent à 0.',
          'rechercher',
          'def rechercher(documents, mot):\n    pass',
          'def rechercher(documents, mot):\n    resultat = []\n    for i in range(len(documents)):\n        if mot.lower() in documents[i].lower().split():\n            resultat.append(i)\n    return resultat',
          [
            [
              [['Mer vent', 'montagne vent', 'mer soleil'], 'vent'],
              [0, 1]
            ],
            [[['inventer', 'VENT'], 'vent'], [1]],
            [[[], 'mer'], []]
          ],
          [
            'Convertis texte et mot avec lower.',
            'Découpe chaque texte avec split.',
            'Teste l’appartenance à la liste de mots, pas à la chaîne entière.'
          ],
          'La recherche porte sur des mots entiers de textes simples ; ponctuation et variantes linguistiques sortent de ce modèle.',
          'Si inventer correspond à vent, tu testes une sous-chaîne : utilise la liste donnée par split.'
        ),
        a(
          'Une photo est visible gratuitement mais aucune autorisation de republication n’est indiquée. Peut-on déduire de la gratuité qu’on a le droit de la republier ? Réponds oui ou non.',
          'non',
          [
            'Consultation et republication sont deux usages.',
            'Cherche une licence explicite.',
            'L’absence de prix n’est pas une autorisation.'
          ],
          'La gratuité d’accès ne permet pas de déduire une licence de republication.',
          'Vérifie les droits d’usage au lieu de prendre la visibilité comme une permission.'
        )
      ],
      reflection:
        'Autoévaluation : mène deux recherches sur une même question, note requête et date, distingue annonces et résultats, puis compare auteur et sources de deux pages. Vérifie la licence avant toute réutilisation ; ce travail documentaire se juge avec la grille du cours.',
      review: [
        'Je distingue indexation et classement.',
        'Je recherche une source primaire.',
        'Je vérifie les droits avant de republier.'
      ]
    }),
    lesson({
      id: 'snt-traces',
      title: 'Limiter les traces et reconnaître les pièges',
      duration: 35,
      prerequisites: ['URL et protection HTTPS.'],
      objectives: [
        'Distinguer traces locales et traces distantes.',
        'Choisir des réglages de confidentialité et examiner une pièce jointe.'
      ],
      official: ['reglages', 'navigation'],
      sections: [
        [
          'Les traces ont plusieurs lieux',
          'Le navigateur peut conserver historique, cache et cookies. Un cookie est une petite donnée associée à un site ; il peut maintenir une session ou participer au suivi publicitaire. Le serveur peut aussi journaliser des requêtes et des identifiants. Effacer l’historique local ne supprime donc pas les journaux distants. La navigation privée limite certaines traces conservées sur cet appareil après la session ; elle ne rend pas invisible au site, à l’établissement ou à l’opérateur réseau.'
        ],
        [
          'Régler avec une intention',
          'On peut refuser les cookies non nécessaires, limiter ceux de tiers, examiner les permissions de caméra, micro et localisation, et supprimer les données d’un site. Un réglage peut déconnecter un compte ou empêcher une fonction ; on choisit selon le besoin plutôt que d’accepter toutes les demandes. Les menus changent selon le navigateur : le bon objectif reste de trouver les permissions par site, revoir les autorisations et vérifier ce qui persiste après fermeture.'
        ],
        [
          'Examiner avant d’ouvrir',
          'Un lien peut afficher un texte rassurant tout en pointant vers un autre domaine. On inspecte sa destination et on évite de saisir un secret après une sollicitation inattendue ; on peut rejoindre le service par son adresse habituelle. Pour un fichier, extension et icône ne prouvent pas l’innocuité : on vérifie origine, type et utilité, on garde navigateur et système à jour. Aucun test visuel ne garantit la sécurité ; en cas de doute sur une pièce jointe reçue, on confirme sa provenance par un autre canal.'
        ]
      ],
      examples: [
        [
          'Une session utile',
          'Un site garde un cookie de connexion.',
          'Sans cet identifiant, il peut demander une nouvelle authentification à chaque visite.',
          'Un cookie n’est pas automatiquement publicitaire ; son usage doit être identifié.'
        ],
        [
          'Un effacement partiel',
          'Une personne efface l’historique après s’être connectée à un compte.',
          'L’appareil oublie certaines visites, mais le service a déjà reçu la requête et connaît le compte.',
          'L’effacement local ne garantit pas l’effacement distant.'
        ],
        [
          'Un nom de lien trompeur',
          'Le texte « ENT officiel » vise https://ent.example.piege.example/.',
          'Le nom se lit par ses composantes : le domaine contrôlé dans cet exemple fictif est piege.example.',
          'La présence du mot ent ne suffit pas à identifier le service légitime.'
        ]
      ],
      activity: table(
        'Classe chaque trace comme locale ou distante, puis explique ce que supprimer l’historique change.',
        'Prévois si cette suppression retire une publication déjà envoyée.',
        'Ce modèle de traces simplifie les stockages ; les services réels peuvent conserver plusieurs copies soumises à leurs politiques.',
        ['trace', 'lieu principal'],
        [
          ['historique du navigateur', 'local'],
          ['journal de connexion du serveur', 'distant'],
          ['publication enregistrée', 'distant']
        ]
      ),
      exercises: [
        a(
          'Effacer seulement l’historique local efface-t-il nécessairement le journal du serveur ? Réponds oui ou non.',
          'non',
          [
            'Les fichiers ne sont pas sur la même machine.',
            'L’action concerne le navigateur local.',
            'Le serveur conserve ses propres traces.'
          ],
          'Les deux stockages sont indépendants ; une suppression locale n’agit pas à distance.',
          'Localise la trace avant de choisir l’action qui peut la supprimer.'
        ),
        a(
          'Une application météo ponctuelle demande la position en permanence. Pour limiter la collecte en gardant le service pendant l’usage, choisis « toujours » ou « pendant utilisation ».',
          'pendant utilisation',
          [
            'La fonction n’est utilisée que ponctuellement.',
            'Une autorisation permanente étend la période de collecte.',
            'Choisis l’autorisation liée à la session d’usage.'
          ],
          'Pendant utilisation réduit le périmètre temporel ; il faut encore examiner les réglages précis du système.',
          'Ne donne pas une autorisation plus large que le besoin exprimé.'
        ),
        a(
          'Un fichier inattendu prétend provenir d’un camarade. Choisis la première démarche : « confirmer par un autre canal » ou « exécuter pour vérifier ».',
          'confirmer par un autre canal',
          [
            'L’exécution peut déjà déclencher un traitement.',
            'L’apparence de l’expéditeur peut être trompeuse.',
            'Demande confirmation sans utiliser le lien du message.'
          ],
          'On confirme la provenance avant d’ouvrir un fichier inattendu ; l’exécution n’est pas un diagnostic sans conséquence.',
          'Tu risques de vérifier trop tard : commence par la provenance et le besoin du fichier.'
        )
      ],
      reflection:
        'Autoévaluation pratique : trouve les permissions d’un site dans ton navigateur, note les réglages avant modification, limite une permission inutile puis explique la conséquence observée. Ne supprime aucune donnée dont tu as besoin sans sauvegarde.',
      review: [
        'Je situe les traces locales et distantes.',
        'Je règle les permissions par besoin.',
        'Je vérifie destination et provenance.'
      ]
    })
  ]
};

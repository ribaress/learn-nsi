export default {
  'snt-html-css': {
    intro: [
      'Pour annoncer une activité du quartier, tu veux une page avec un titre, une date et un lien qui mène au programme.',
      'Comment décrire ce contenu pour qu’un navigateur comprenne sa structure et l’affiche correctement ?',
      'HTML organise les informations et CSS règle leur apparence : les séparer rend les pages plus faciles à lire, modifier et rendre accessibles.',
      [
        'Écrire une page complète en identifiant ses parties.',
        'Créer un titre, un paragraphe et un lien.',
        'Modifier la présentation sans perdre le sens du contenu.'
      ]
    ],
    recap: [
      [
        'Navigateur',
        'Un logiciel qui lit des documents Web et permet de suivre leurs liens.',
        'Ouvrir une page avec Firefox ou Chrome la présente dans une fenêtre.'
      ],
      [
        'Texte source',
        'Le texte contenant les instructions de description du document, différent du résultat affiché.',
        '<p>Bonjour</p> est du source ; le navigateur affiche Bonjour comme paragraphe.'
      ],
      [
        'Identifiant',
        'Un nom choisi pour repérer un élément précis, à écrire exactement de la même façon partout.',
        'programme et programmes sont deux identifiants différents.'
      ]
    ],
    life: [
      [
        'L’affiche d’un club',
        'L’affiche comporte un grand titre, le détail de l’horaire et un renvoi vers l’inscription.',
        'Les rôles titre, paragraphe et lien correspondent à une structure HTML ; la couleur ou la taille sont une présentation CSS.',
        'Une page est interactive et peut être lue sans affichage visuel ; une affiche imprimée ne décrit pas ces usages.'
      ],
      [
        'Le sommaire d’une recette',
        'Un sommaire permet d’aller directement aux ingrédients.',
        'Un lien vers #ingredients rejoint l’élément portant id="ingredients" dans la même page.',
        'Le navigateur cherche un identifiant exact, pas une ressemblance de mots comme le ferait un lecteur.'
      ]
    ],
    sections: [
      [
        'Décrire avant de décorer',
        'Une page d’association contient des informations qui ont des rôles différents : « Club sciences » est un titre, « Atelier le jeudi » est une phrase. HTML décrit cette structure avec des balises, mots placés entre < et >. <p> ouvre un paragraphe et </p> le ferme ; le texte se place entre les deux. <h1> désigne le titre principal. Ces rôles aident aussi les outils qui lisent la page à voix haute. Agrandir une phrase ne suffit donc pas à lui donner le rôle d’un titre.'
      ],
      [
        'Les parties d’un document complet',
        '<!doctype html> annonce un document HTML moderne. L’élément <html lang="fr"> contient la page et précise sa langue. <head> rassemble des informations sur le document : <meta charset="utf-8"> permet notamment les accents, et <title> nomme l’onglet. <body> contient ce que l’on consulte : titre, paragraphes et liens. Un attribut, comme lang="fr", est un réglage écrit dans la balise ouvrante. On ferme les éléments dans l’ordre inverse de leur ouverture pour conserver une structure lisible.',
        '<!doctype html>\n<html lang="fr">\n<head>\n  <meta charset="utf-8">\n  <title>Club</title>\n</head>\n<body>\n  <h1>Club sciences</h1>\n  <p>Atelier le jeudi</p>\n</body>\n</html>'
      ],
      [
        'Faire un lien hypertexte',
        'Un lien est écrit avec <a> ; son attribut href fournit la destination, et son contenu est le texte à cliquer. <a href="https://www.cern.ch/">CERN</a> mène vers un autre site. Pour rester dans la page, on donne d’abord id="programme" au paragraphe cible, puis href="#programme" au lien. Le # indique un fragment local ; programme doit être identique des deux côtés. Le texte « Voir le programme » explique la destination plus clairement qu’un simple « ici ». Sans cible existante, le lien ne peut pas atteindre la partie voulue.'
      ],
      [
        'Choisir l’apparence avec CSS',
        'CSS décrit les styles. La règle p { color: navy; } se lit ainsi : p sélectionne les paragraphes ; entre accolades, color est la propriété de couleur et navy sa valeur. Les deux-points séparent propriété et valeur, le point-virgule termine la déclaration. On peut écrire cette règle dans un élément <style> à l’intérieur de <head>. Le paragraphe reste un paragraphe quelle que soit sa couleur. Pour corriger un faux titre, on remplace donc d’abord la balise par h1, puis on ajuste son style si nécessaire.'
      ],
      [
        'Vérifier par la lecture et par les liens',
        'Pour construire la page demandée, on prépare le document complet, puis un h1, un a avec href="#programme" et un p avec id="programme". On vérifie la présence des textes exacts et on suit le lien. Dans l’autre exercice, remplacer le faux titre ne doit pas faire disparaître le paragraphe existant. Un navigateur peut afficher un document mal fermé en essayant de le réparer : un résultat visuel plausible ne garantit donc pas une bonne structure. On relit balises, attributs, fermetures et destination avant de se satisfaire de la couleur.'
      ]
    ],
    pauses: [
      [
        2,
        'Quel attribut doit porter la cible de href="#programme" ?',
        [
          ['id="programme"', 'id'],
          ['href="programme"', 'href']
        ],
        'id',
        'href indique où le lien mène. id nomme l’élément cible ; le # du lien demande de chercher cet identifiant dans la page.'
      ],
      [
        3,
        'Pour donner à un texte le rôle de titre principal, que choisir ?',
        [
          ['La balise h1', 'h1'],
          ['Seulement une très grande taille', 'taille']
        ],
        'h1',
        'Le rôle du contenu vient de sa structure HTML. Une grande taille CSS ne communique pas à elle seule un niveau de titre.'
      ]
    ],
    reasoning: [
      'On isole deux décisions : le texte « Club astronomie » est le contenu du paragraphe ; navy règle la propriété color dans une règle CSS. Changer cette règle ne réécrit pas la phrase.',
      'On repère le #, qui annonce une cible locale. On compare ensuite caractère par caractère programme ou sources avec la valeur d’id : un s manquant change la cible.',
      'On demande d’abord quel est le rôle du texte. Si c’est le titre principal, h1 porte ce rôle pour tous les modes de lecture ; son apparence peut ensuite être définie séparément.'
    ]
  },
  'snt-http': {
    intro: [
      'Tu cherches un livre et cliques sur la deuxième page de résultats. L’adresse change et une machine distante répond à ton navigateur.',
      'Quelles informations l’adresse contient-elle, qui demande quoi et que protège le mot https ?',
      'Lire une URL et un échange client-serveur aide à comprendre les paramètres et à examiner un site sans confondre chiffrement et honnêteté.',
      [
        'Découper une adresse en parties.',
        'Suivre une demande HTTP et sa réponse.',
        'Situer le travail du navigateur, du serveur et la protection de HTTPS.'
      ]
    ],
    recap: [
      [
        'Ressource',
        'Un contenu que l’on peut demander, comme une page, une image ou un résultat de recherche.',
        'La liste des livres sur le thème mer est une ressource.'
      ],
      [
        'Client et serveur',
        'Le client formule une demande ; le serveur reçoit la demande et produit une réponse.',
        'Le navigateur demande une page à un programme Web distant.'
      ],
      [
        'Paramètre',
        'Une information nommée qui précise une demande ; le signe = relie ici le nom à sa valeur.',
        'page=2 demande la page numérotée 2.'
      ]
    ],
    life: [
      [
        'Commander dans un restaurant',
        'Tu demandes un plat avec une option et le serveur te rapporte une réponse.',
        'Le client choisit une ressource et des paramètres, puis le serveur répond ; les rôles concernent l’échange.',
        'Un serveur Web est un programme ; le dialogue HTTP suit une syntaxe stricte et ne comprend pas une intention implicite.'
      ],
      [
        'Un courrier sous enveloppe fermée',
        'Une enveloppe protège la lecture d’un message pendant son transport.',
        'HTTPS protège notamment la confidentialité et l’intégrité des échanges avec le domaine contacté.',
        'L’enveloppe ne prouve pas la sincérité du vendeur ; HTTPS non plus ne certifie pas les promesses d’un site.'
      ]
    ],
    sections: [
      [
        'Une adresse comporte plusieurs informations',
        'L’URL https://catalogue.example/livres?theme=mer&page=2#avis nomme une ressource. Le schéma https indique le mode d’échange ; catalogue.example désigne le domaine du service ; /livres est le chemin. Après ?, la requête contient des paramètres. theme=mer est une paire nom-valeur et & sépare la paire suivante, page=2. Enfin #avis est un fragment pour se placer dans le document. On ne compte donc pas les mots de l’adresse : on repère d’abord les séparateurs et leurs rôles.'
      ],
      [
        'HTTP : une demande puis une réponse',
        'HTTP est un protocole, c’est-à-dire un ensemble de règles de communication pour le Web. Le navigateur joue le rôle de client et envoie une requête ; le serveur répond avec un statut et éventuellement un contenu. GET /livres?theme=mer&page=2 HTTP/1.1 se lit : méthode GET pour demander une ressource, chemin et paramètres, puis version du protocole. La réponse comporte des informations d’en-tête et un corps, par exemple du HTML décrivant la page. Des statuts tels que 200 ou 404 décrivent le résultat de la demande.'
      ],
      [
        'Le fragment reste côté navigateur',
        'Le fragment #avis n’est pas inclus dans la requête HTTP de cette URL : le navigateur l’utilise après réception pour chercher la partie nommée avis. À l’inverse, theme=mer et page=2 sont transmis et peuvent modifier la réponse du serveur. Un paramètre doit être lu avec son nom : le 2 appartient à page, pas à theme. Si l’on te demande le nombre de paramètres, compte les deux paires séparées par &, pas les caractères = et ? comme s’ils étaient des données supplémentaires.'
      ],
      [
        'Deux machines peuvent calculer',
        'Le serveur peut calculer un prix ou produire une liste avant d’envoyer du HTML : c’est un traitement côté serveur. Après réception, le navigateur peut exécuter du JavaScript, un langage de programmation, pour cacher un panneau ou modifier un affichage : c’est un traitement côté client. Le texte HTML visible n’est pas forcément le programme qui a construit la page distante. Le serveur peut aussi envoyer du JavaScript au client. Pour expliquer un comportement, on cherche donc où le calcul s’exécute et quelles données sont échangées.'
      ],
      [
        'HTTPS protège un échange précis',
        'HTTPS utilise une connexion chiffrée reposant sur TLS, un protocole de protection des échanges. Le chiffrement rend les données transportées illisibles pour un observateur sans les clés ; les mécanismes d’intégrité aident à détecter des modifications et un certificat contribue à vérifier le domaine contacté. Cela ne prouve pas la qualité de la boutique ni la véracité d’un cadeau promis. On lit le domaine exact avant d’entrer un secret. Les paramètres d’une URL peuvent par ailleurs apparaître dans des historiques ou journaux : chiffrer le trajet ne les efface pas.'
      ]
    ],
    pauses: [
      [
        2,
        'Dans ?theme=mer&page=2#avis, combien de paramètres partent dans cette demande ?',
        [
          ['Deux : theme et page', '2'],
          ['Trois, avec avis', '3']
        ],
        '2',
        'Le caractère & sépare deux paires nom-valeur. avis est après # : c’est le fragment que le navigateur utilise localement.'
      ],
      [
        4,
        'Une boutique utilise HTTPS. Peut-on en déduire qu’elle livrera ?',
        [
          ['Non, le protocole ne vérifie pas cette promesse', 'non'],
          ['Oui, le chiffrement garantit la livraison', 'oui']
        ],
        'non',
        'HTTPS protège les échanges avec le domaine ; il ne contrôle ni le stock, ni les intentions, ni l’exécution d’une commande.'
      ]
    ],
    reasoning: [
      'On cherche d’abord le #, puis le texte qui le suit. Le navigateur conserve cette indication de position ; le serveur reçoit /lecon?id=4 mais pas #exercice.',
      'On suit le temps : le prix est calculé avant l’envoi de la réponse ; le panneau est masqué après réception. Ces deux actions se déroulent donc sur deux côtés différents.',
      'On peut établir une liaison protégée avec un domaine malveillant. Il faut encore examiner le domaine, la demande de secret et la crédibilité de l’offre.'
    ]
  },
  'snt-recherche-publication': {
    intro: [
      'Deux pages donnent le même chiffre pour un exposé, et une belle photo semble parfaite pour l’illustrer. Trouver un résultat ne suffit pas à le vérifier ou à le republier.',
      'Comment passer d’une recherche par mots à une information justifiée et à une publication autorisée ?',
      'Un moteur facilite la découverte ; il reste nécessaire d’examiner les sources, la date et les conditions de réutilisation.',
      [
        'Comprendre un index de mots.',
        'Comparer des sources réellement indépendantes.',
        'Écrire une recherche simple puis préparer les crédits d’une publication.'
      ]
    ],
    recap: [
      [
        'Document et mot',
        'Un document est ici un texte ; un mot de notre modèle est une partie séparée par des espaces.',
        '"mer vent" contient mer et vent ; ce modèle ignore des subtilités de ponctuation.'
      ],
      [
        'Indice Python',
        'La position d’un élément dans une liste ; on commence à 0.',
        'Dans ["A", "B"], la chaîne "A" est à l’indice 0.'
      ],
      [
        'Licence',
        'Un texte qui précise les conditions d’utilisation autorisées par les titulaires des droits.',
        'Une licence peut demander de citer l’auteur et de conserver un lien vers ses conditions.'
      ]
    ],
    life: [
      [
        'Le catalogue d’une médiathèque',
        'Un catalogue indique dans quels ouvrages un sujet est traité.',
        'Un index Web associe aussi des termes à des documents pour retrouver rapidement des candidats.',
        'Être dans un catalogue ou dans un résultat de recherche ne garantit pas que toutes les affirmations soient exactes.'
      ],
      [
        'Une rumeur répétée dans le voisinage',
        'Trois personnes racontent la même histoire mais l’ont toutes apprise de la même personne.',
        'Des pages copiées peuvent partager une source unique ; leur nombre ne forme pas plusieurs confirmations indépendantes.',
        'Une indépendance de sources n’est pas non plus une preuve absolue : on examine leurs méthodes et leurs éléments.'
      ]
    ],
    sections: [
      [
        'Pourquoi un moteur peut répondre vite',
        'Avant ta demande, un moteur a déjà pu explorer des pages en suivant des liens. Il analyse des contenus et construit un index : une structure associant des termes aux documents où ils apparaissent. Avec A = « mer et vent » et B = « montagne et vent », le terme vent renvoie à A et B ; mer renvoie seulement à A. La recherche interroge cet index puis classe des candidats. Le moteur ne lit donc pas nécessairement chaque page du Web au moment de ton clic, et toutes les pages n’y figurent pas.'
      ],
      [
        'Résultat trouvé et résultat digne de confiance',
        'Un classement tient à de nombreux critères ; la première place ne suffit pas à établir la vérité. On cherche l’auteur, la date, la question traitée et les éléments qui appuient l’affirmation. Pour un chiffre, on regarde ce qui a été compté, sur quelle population et pendant quelle période. Une source primaire présente l’observation ou le texte d’origine ; une autre page peut seulement la commenter. Deux sites qui copient la même annonce ne constituent pas deux observations indépendantes. Remonter à l’origine aide à retrouver le contexte.'
      ],
      [
        'Construire une recherche de mots en Python',
        'def rechercher(documents, mot): définit la fonction ; documents est une liste de textes. len(documents) donne son nombre d’éléments et range(len(documents)) produit leurs indices de 0 à la dernière position. documents[i] lit le texte à la position i. lower() met le texte en minuscules pour ignorer la casse, c’est-à-dire la différence entre majuscule et minuscule. split() sans argument sépare selon les espaces. Le test mot.lower() in documents[i].lower().split() vérifie la présence du mot entier dans notre modèle.'
      ],
      [
        'Garder les positions des résultats',
        'resultat = [] crée une liste vide avant le parcours. Pour chaque document contenant le mot, resultat.append(i) ajoute son indice. return resultat après la boucle renvoie toutes les positions trouvées ; une liste vide signifie aucun résultat. Pour « vent », les textes « mer vent » et « montagne vent » correspondent, mais « ventilateur » ne correspond pas puisque ce n’est pas le même mot. Le modèle des exercices n’enlève pas la ponctuation : « vent, » peut rester différent de « vent ». On annonce cette limite au lieu de prétendre reproduire un moteur complet.',
        'def rechercher(documents, mot):\n    resultat = []\n    for i in range(len(documents)):\n        if mot.lower() in documents[i].lower().split():\n            resultat.append(i)\n    return resultat'
      ],
      [
        'Publier exige un examen des droits',
        'Voir gratuitement une image ne vaut pas autorisation de la republier. Avant d’intégrer une photographie, on identifie l’auteur, l’autorisation ou la licence et ses conditions. CC BY est une famille de licences permettant certaines réutilisations avec attribution ; on lit la version applicable et ses termes sur le site Creative Commons. On conserve par exemple titre, auteur, source et lien de licence, et on indique les modifications si nécessaire. Les droits de la personne représentée peuvent aussi compter. Sans autorisation établie, on choisit un autre contenu ou on demande un accord.'
      ]
    ],
    pauses: [
      [
        1,
        'Deux blogs recopient le même communiqué. Combien de sources initiales a-t-on retrouvées ?',
        [
          ['Une seule pour ce communiqué', '1'],
          ['Deux mesures indépendantes', '2']
        ],
        '1',
        'Le nombre de copies est différent du nombre d’observations. Il faut retrouver le document ou la mesure dont les pages dépendent.'
      ],
      [
        4,
        'Une image visible sans paiement est-elle automatiquement republiable ?',
        [
          ['Non, il faut examiner les droits', 'non'],
          ['Oui, gratuitement signifie librement réutilisable', 'oui']
        ],
        'non',
        'L’accès gratuit concerne la consultation. La republication est un autre usage qui doit être autorisé ou couvert par un cadre applicable.'
      ]
    ],
    reasoning: [
      'On examine A : vent y figure, donc on retient A. On examine B : vent y figure aussi, donc on retient B. Pour mer, seul A est retenu ; le contenu reste à évaluer ensuite.',
      'On suit les références des deux blogs. Si elles conduisent au même document, les pages apportent deux relais du même chiffre plutôt que deux mesures.',
      'On relève les informations de crédit puis on lit les conditions de la version annoncée. La présence de l’image dans les résultats d’un moteur ne remplace aucune de ces étapes.'
    ]
  },
  'snt-traces': {
    intro: [
      'Tu effaces l’historique d’un appareil partagé et penses avoir tout supprimé. Pourtant le site peut encore conserver une connexion ou un achat.',
      'Où des traces d’une navigation peuvent-elles rester, et quel réglage répond à quel besoin ?',
      'Repérer les lieux de stockage aide à protéger ses usages et à examiner une demande avant de cliquer ou de transmettre un secret.',
      [
        'Distinguer historique local, cookies et journaux distants.',
        'Choisir des réglages en fonction d’un objectif.',
        'Examiner domaine, pièce jointe et demande de connexion.'
      ]
    ],
    recap: [
      [
        'Navigateur et site',
        'Le navigateur est le logiciel de l’appareil ; le site est un service auquel il échange des demandes et réponses.',
        'Effacer un réglage du navigateur ne modifie pas forcément le compte stocké sur le site.'
      ],
      [
        'Donnée locale ou distante',
        'Locale signifie conservée sur ton appareil ; distante signifie sur une autre machine.',
        'L’historique de navigation peut être local et un journal de connexion conservé par un serveur.'
      ],
      [
        'Nom de domaine',
        'La partie de l’adresse qui désigne le service contacté, après https:// et avant le premier /.',
        'Dans https://compte.example/aide, le domaine est compte.example.'
      ]
    ],
    life: [
      [
        'Le ticket et le cahier du magasin',
        'Tu jettes ton ticket mais le magasin conserve sa propre trace de vente.',
        'Effacer une trace sur l’appareil n’efface pas la copie que le service distant a déjà enregistrée.',
        'Les données numériques peuvent exister dans plusieurs systèmes et obéir à des durées différentes, au-delà de ce seul exemple.'
      ],
      [
        'Une porte avec un badge',
        'Un badge évite de te présenter à chaque passage.',
        'Un cookie de session peut reconnaître une session déjà authentifiée, ce qui explique son utilité.',
        'Un cookie est une donnée échangée par un logiciel, pas une preuve physique d’identité ; d’autres usages peuvent servir le suivi publicitaire.'
      ]
    ],
    sections: [
      [
        'Les traces ne sont pas toutes au même endroit',
        'Sur un appareil partagé, l’historique peut révéler les pages consultées. Le navigateur peut aussi conserver des fichiers téléchargés, des données de formulaire et des cookies, petits éléments de données associés aux sites. Le serveur distant peut garder ses propres journaux de demandes ou d’achats. On commence par distinguer qui conserve quoi : l’appareil, le service, éventuellement d’autres intermédiaires. Un bouton d’effacement local n’a pas le pouvoir de supprimer automatiquement toutes ces informations distantes.'
      ],
      [
        'Un cookie a un usage à identifier',
        'Un cookie peut contenir un identifiant de session, c’est-à-dire un repère permettant au site de reconnaître une suite d’échanges après connexion. Il peut aussi servir à mémoriser une préférence ou à suivre l’activité à des fins publicitaires. Le mot cookie n’indique donc pas à lui seul la finalité. Refuser certains cookies peut limiter certains suivis ; supprimer un cookie de session peut obliger à se reconnecter. On lit les catégories et le rôle annoncé avant de décider, au lieu de traiter toutes les données comme identiques.'
      ],
      [
        'Choisir le bon réglage pour le bon objectif',
        'Pour un appareil partagé, on peut fermer la session du compte et examiner les téléchargements, l’historique et les mots de passe mémorisés. Pour limiter l’accès à un capteur, on examine les permissions, autorisations accordées à un site pour la caméra, le micro ou la position. La navigation privée limite certaines traces conservées localement à la fermeture ; elle ne rend pas invisible au service visité. Retirer une permission limite un accès futur mais n’efface pas les données déjà transmises : la conservation relève d’une autre démarche.'
      ],
      [
        'Lire l’adresse avant de fournir un secret',
        'Un message peut imiter une institution pour obtenir un mot de passe : c’est une tentative d’hameçonnage. On examine le nom de domaine exact, pas seulement le logo ou le texte du bouton. Dans https://banque.example.piege.invalid/connexion, le mot banque au début ne prouve pas le bon propriétaire. Une demande urgente peut pousser à agir sans vérifier. Pour une connexion sensible, on peut passer par une adresse déjà connue ou un favori vérifié et examiner les demandes inattendues. HTTPS protège le trajet avec le domaine contacté, même s’il est trompeur.'
      ],
      [
        'Une pièce jointe mérite aussi une vérification',
        'Un fichier reçu n’est pas fiable seulement parce que le nom d’un proche apparaît : un compte peut être compromis. On vérifie le contexte attendu et la nature du fichier avant de l’ouvrir, et on demande une précision par un canal déjà connu si nécessaire. Une extension est la fin du nom, comme .pdf, mais le nom visible ne suffit pas à garantir le contenu. Le cours ne propose pas d’ouvrir des fichiers suspects : il apprend à expliquer une décision. Un réglage de confidentialité réduit certains risques, sans remplacer l’examen de la demande et de ses destinataires.'
      ]
    ],
    pauses: [
      [
        1,
        'Un cookie de connexion a-t-il forcément un usage publicitaire ?',
        [
          ['Non, il peut reconnaître une session', 'non'],
          ['Oui, tous les cookies ont une même finalité', 'oui']
        ],
        'non',
        'Cookie décrit un mécanisme de conservation et d’échange de données. La finalité doit être identifiée séparément.'
      ],
      [
        2,
        'Effacer l’historique local supprime-t-il un journal du serveur ?',
        [
          ['Non, ce sont deux lieux distincts', 'non'],
          ['Oui, toutes les copies suivent le navigateur', 'oui']
        ],
        'non',
        'Le navigateur peut effacer ses propres données, mais le serveur contrôle son journal distant. Une action locale ne commande pas toutes les copies.'
      ]
    ],
    reasoning: [
      'On demande quelle fonction le cookie remplit. Si c’est l’identifiant d’une session, le supprimer peut interrompre cette reconnaissance ; sa simple présence ne prouve pas un ciblage publicitaire.',
      'On nomme d’abord le lieu de l’action : l’historique de cet appareil. Les journaux du service ont un autre propriétaire et ne reçoivent pas automatiquement cet ordre d’effacement.',
      'On compare l’adresse réelle à une adresse connue plutôt qu’au logo du message. Une apparence familière est facile à reproduire et ne constitue pas une preuve de destination.'
    ]
  }
};

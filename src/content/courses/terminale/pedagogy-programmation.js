import { pedagogy, pause } from './pedagogy-utils.js';

export default {
  calculabilite: pedagogy({
    program: [
      'Un cas particulier dont l’arrêt se démontre',
      'La fonction additionne_dix fait parcourir range(10), donc dix valeurs de 0 à 9, à la variable i. Chaque corps de boucle n’effectue qu’une addition et une affectation, qui terminent. Dix passages finis donnent un calcul fini ; return transmet ensuite le total, 45. Cette démonstration porte sur ce programme précis et ne construit pas un décideur pour toutes les descriptions possibles.',
      'def additionne_dix():\n    total = 0\n    for i in range(10):\n        total = total + i\n    return total'
    ],
    intro: [
      'Un calcul tourne depuis longtemps. Tu voudrais un outil qui dise toujours, pour n’importe quel programme et son entrée, s’il finira ou continuera sans fin.',
      'Peut-on construire ce détecteur universel, ou existe-t-il une limite qui ne dépend ni de la vitesse ni du langage ?',
      'La calculabilité distingue ce qu’un algorithme peut résoudre de ce qu’un ordinateur particulier peut faire assez vite ; cette distinction évite des promesses impossibles.'
    ],
    journey: [
      'Comprendre qu’un programme peut être une donnée.',
      'Distinguer terminer, calculer lentement et décider.',
      'Supposer un détecteur universel pour tester sa promesse.',
      'Dérouler les deux cas d’une contradiction.'
    ],
    recap: [
      [
        'Programme et entrée',
        'Un programme décrit une suite d’instructions ; une entrée est l’information donnée à cette exécution.',
        'Un programme de somme reçoit par exemple les nombres 2 et 3.'
      ],
      [
        'Boucle et arrêt',
        'Une boucle répète des instructions ; un programme termine quand son exécution se finit après un nombre fini d’étapes.',
        'Répéter toujours la même instruction sans sortie peut produire une exécution infinie.'
      ],
      [
        'Raisonnement par contradiction',
        'On suppose une promesse vraie, puis on montre qu’elle force un résultat incompatible avec cette promesse.',
        'Si les réponses oui et non rendent chacune le détecteur incorrect, aucun détecteur respectant la promesse ne peut exister.'
      ]
    ],
    life: [
      [
        'Un outil d’analyse de code',
        'Un éditeur veut prévenir qu’un programme soumis par un utilisateur risque de ne jamais terminer.',
        'L’outil peut détecter des cas et signaler des inconnues, mais ne peut promettre une réponse toujours correcte et toujours finie sur tous les programmes.',
        'Cette limite ne rend pas les analyses inutiles : elles restent capables de prouver de nombreux cas particuliers.'
      ],
      [
        'Une attente devant un calcul',
        'Une personne laisse un calcul fonctionner cinq secondes sans obtenir de résultat.',
        'Une observation finie est compatible avec un calcul très long comme avec une boucle infinie ; elle ne décide pas entre les deux.',
        'Une attente humaine n’est pas un modèle de calcul ; le parallèle explique seulement pourquoi un délai ne constitue pas une preuve.'
      ]
    ],
    sections: [
      [
        'Un programme devient une donnée lorsqu’on le lit',
        'Un fichier Python est d’abord une suite de caractères. Un éditeur la montre et la modifie ; un interpréteur est un programme qui lit ces instructions et les exécute. Le texte print(2+3) peut donc être la donnée fournie à un interpréteur ; print demande un affichage et 2+3 vaut 5. De même, un programme d’analyse peut recevoir la description d’un autre programme.'
      ],
      [
        'Définir précisément le problème de l’arrêt',
        'Notons P un programme et x son entrée. La question est : « P exécuté sur x finit-il ? » Un décideur serait un algorithme qui termine lui-même à chaque fois et répond correctement oui ou non. Un problème décidable possède un tel algorithme ; indécidable signifie qu’il n’en existe pas pour tous les cas du domaine. Ce mot ne signifie pas simplement long, coûteux ou difficile à programmer.',
        pause(
          'Un programme peut-il être une entrée pour un autre programme ?',
          'Oui, sa description peut être lue comme un texte.',
          'Non, seules des données numériques peuvent être lues.',
          'Le code est représenté par des caractères ou des octets. Un interpréteur, un éditeur ou un analyseur peut donc le recevoir comme donnée.'
        )
      ],
      [
        'Supposer l’outil puis fabriquer son opposé',
        'Supposons un outil arrete(P,x) qui répond toujours correctement. Construisons D, un nouveau programme qui reçoit la description d’un programme P. D consulte arrete(P,P), donc demande si P finit lorsqu’il lit sa propre description. Si la réponse est oui, D se met à boucler sans fin ; si la réponse est non, D termine immédiatement. La lettre D nomme ce programme opposant ; aucune réponse approximative n’est autorisée à l’outil supposé.'
      ],
      [
        'Tester D sur sa propre description',
        'Demandons arrete(D,D). Premier cas : l’outil répond oui, donc annonce que D(D) termine. Mais la règle de D choisit alors la boucle infinie : réponse fausse. Deuxième cas : il répond non, donc annonce une exécution infinie. La règle de D choisit alors de terminer : réponse encore fausse. Les deux seules réponses possibles contredisent la promesse ; le décideur universel supposé ne peut donc pas exister.',
        pause(
          'Quelle réponse du détecteur supposé échappe à la contradiction pour D(D) ?',
          'Aucune : oui et non contredisent tous deux sa promesse.',
          'Oui, si la machine est plus rapide.',
          'La contradiction vient de la règle de D, pas d’un délai matériel. Accélérer les étapes ne change pas le fait que D fait le contraire de la prédiction.'
        )
      ],
      [
        'Ce qu’on peut encore prouver',
        'Une boucle for i in range(10) parcourt dix valeurs, de 0 à 9 ; si son corps termine à chaque passage, la boucle termine. On peut donc démontrer des arrêts particuliers. Les langages universels usuels décrivent les mêmes calculs effectifs dans un modèle idéal à mémoire non bornée : changer de syntaxe ne supprime pas l’indécidabilité. Les machines réelles ajoutent leurs limites de mémoire et de durée, distinctes de cette impossibilité générale.'
      ]
    ],
    reasoning: [
      'Le texte print(2+3) est lu par le programme interpréteur. Celui-ci reconnaît une addition : 2 + 3 donne 5. Il reconnaît ensuite la demande print, qui affiche ce résultat. Le texte joue donc le rôle de donnée pour l’interpréteur et celui de programme lorsqu’il est exécuté.',
      'range(10) fournit dix valeurs, de zéro à neuf. La boucle fait donc dix passages et ne choisit pas un onzième. Il reste une condition à vérifier : chaque passage de son corps doit lui-même terminer. Sous cette hypothèse, ce programme particulier a un arrêt démontrable.',
      'Cinq secondes d’attente établissent seulement que le résultat n’est pas encore arrivé. Un programme qui finit après six secondes et un programme qui ne finit jamais satisfont tous deux cette observation. Le délai ne permet donc pas de conclure à une non-terminaison générale.'
    ]
  }),
  recursivite: pedagogy({
    program: [
      'Relier chaque ligne à la trace',
      'Le premier test refuse les nombres négatifs par ValueError, une erreur explicite de valeur. Le deuxième traite la base zéro. Dans le dernier return, l’addition attend le résultat de somme(n - 1) avant de terminer : chaque appel conserve son n. L’indentation aligne les deux tests et le retour final dans le corps de la fonction. Le résultat de l’appel récursif doit participer au retour, sinon la remontée perdrait l’addition attendue.',
      'def somme(n):\n    if n < 0:\n        raise ValueError("entier naturel requis")\n    if n == 0:\n        return 0\n    return n + somme(n - 1)'
    ],
    intro: [
      'Pour compter des objets répartis dans des boîtes emboîtées, tu peux compter ce qui est devant toi puis demander le même travail pour la boîte suivante.',
      'Comment un traitement peut-il se rappeler lui-même sans recommencer indéfiniment ni perdre les résultats en attente ?',
      'La récursivité exprime certains problèmes à partir de versions plus petites ; comprendre les appels et les retours aide ensuite à traiter des arbres ou des divisions successives.'
    ],
    journey: [
      'Revoir une fonction et son résultat.',
      'Décomposer une somme en un reste plus petit.',
      'Arrêter les appels dans un cas connu.',
      'Remonter les résultats et contrôler les ressources.'
    ],
    recap: [
      [
        'Fonction, paramètre, retour',
        'Une fonction nomme un traitement ; son paramètre reçoit une entrée et return transmet le résultat à l’appelant.',
        'def double(x): return 2*x définit un calcul ; double(3) fournit le nombre 6.'
      ],
      [
        'Entier naturel',
        'Un entier naturel est un nombre entier supérieur ou égal à zéro ; on ne suppose pas de valeur négative.',
        '0, 1 et 4 sont naturels ; -1 n’appartient pas au domaine choisi.'
      ],
      [
        'Pile d’attentes',
        'Une pile retire le dernier élément ajouté ; elle permet de conserver les opérations en attente des appels.',
        'L’appel de somme(2) doit revenir avant que somme(3) termine son addition.'
      ]
    ],
    life: [
      [
        'Boîtes emboîtées',
        'Chaque boîte contient une quantité d’objets et une boîte plus petite ; la dernière ne contient aucune autre boîte.',
        'On ajoute la quantité locale au résultat du même comptage sur la boîte suivante ; la dernière fournit le cas de base.',
        'Les programmes ne nécessitent pas de boîtes physiques : ils doivent surtout garantir que les appels atteignent un cas connu.'
      ],
      [
        'Additionner les étages',
        'Pour compter les marches de trois étages identiques, on compte un étage puis les deux étages restants.',
        'Décomposer en une contribution et un reste plus petit reprend le principe d’un appel récursif.',
        'La récursivité n’est pas nécessaire pour chaque comptage ; une multiplication ou une boucle peut être plus simple.'
      ]
    ],
    sections: [
      [
        'Un appel reçoit une entrée et renvoie un résultat',
        'En Python, def commence une fonction, les parenthèses nomment ses paramètres et les lignes indentées forment son corps. return renvoie une valeur à l’endroit de l’appel. Appeler somme(3) demande un calcul avec le paramètre n égal à 3 ; la lettre n représente ici le dernier entier à additionner. Une fonction récursive utilise, dans son propre corps, un appel à elle-même.'
      ],
      [
        'Enlever un terme pour réduire le problème',
        'La somme de 1 à 3 vaut 3 plus la somme de 1 à 2. De même, somme(n) = n + somme(n-1) : n-1 signifie le nombre précédent. Le signe = dans cette phrase décrit une égalité mathématique ; en Python, = affecte et == compare. La taille du problème diminue lorsque n est un naturel positif, mais il faut encore une valeur connue à laquelle s’arrêter.'
      ],
      [
        'Le cas de base coupe la chaîne',
        'Nous fixons somme(0) à zéro : il n’y a aucun entier positif à additionner. Le test if n == 0 déclenche alors return 0 sans autre appel. Sinon return n + somme(n - 1) demande d’abord le résultat plus petit. Pour n négatif, retirer un éloigne de zéro ; on refuse donc l’entrée avec raise ValueError, une erreur de valeur, avant de commencer la descente.',
        pause(
          'Pourquoi somme(0) doit-elle renvoyer directement zéro ?',
          'Pour arrêter les appels avec une réponse déjà connue.',
          'Pour lancer somme(-1) et continuer.',
          'Le cas de base termine la descente. Un appel supplémentaire vers -1 sortirait du domaine naturel et ne rapprocherait plus de zéro.'
        )
      ],
      [
        'Déplier puis remonter sans sauter de calcul',
        'somme(3) garde 3 + ... en attente et appelle somme(2), qui attend 2 + somme(1). somme(1) attend 1 + somme(0). La base renvoie 0 ; on calcule alors 1 + 0 = 1, puis 2 + 1 = 3, puis 3 + 3 = 6. Chaque appel possède sa propre valeur de n. Les retours suivent l’ordre inverse des appels, comme une pile : dernier appel, premier résultat.',
        pause(
          'Après le retour de somme(0), quel calcul termine en premier ?',
          'somme(1), qui calcule 1 + 0.',
          'somme(3), en ignorant les autres appels.',
          'Le plus récent appel en attente reprend d’abord. somme(1) rend 1 ; ensuite somme(2) puis somme(3) peuvent terminer leurs propres additions.'
        )
      ],
      [
        'Terminaison et mémoire sont deux vérifications',
        'Une preuve d’arrêt précise le domaine, le cas de base et une quantité naturelle qui diminue vers ce cas. Elle ne garantit pas une mémoire physique illimitée : chaque appel en attente conserve son contexte. Une grande profondeur peut dépasser la capacité de la pile Python. Pour la somme, une boucle avec un accumulateur permet le même résultat sans empiler tous ces appels. Oublier return peut également perdre un résultat pourtant bien calculé.'
      ]
    ],
    reasoning: [
      'Descends d’abord : somme(3) attend 3 + somme(2), qui attend 2 + somme(1), qui attend 1 + somme(0). La base rend 0. Remonte ensuite dans l’ordre : 1 + 0 = 1, 2 + 1 = 3, puis 3 + 3 = 6. Le résultat final ne se calcule qu’après ces retours.',
      'Le paramètre vaut zéro dès le départ. La condition du cas de base est vraie ; return 0 répond immédiatement. Aucun appel à une valeur plus petite n’est exécuté : il n’y a donc ni descente ni addition en attente à poursuivre.',
      'Le domaine autorisé comprend zéro et les entiers positifs. Moins un est rejeté avant la récursion par ValueError. Sans ce contrôle, les appels prendraient -2, -3 puis des nombres encore plus petits, sans jamais atteindre le cas de base zéro.'
    ]
  }),
  'modules-api': pedagogy({
    program: [
      'Décrire un module de conversion',
      'Le bloc entre triples guillemets est la docstring de secondes. Il explique que minutes est une durée non négative et que le résultat est en secondes ; le code refuse un négatif avant de multiplier par 60. Placée dans conversion.py, la définition s’utilise ensuite avec import conversion puis conversion.secondes(2). Le module définit le service sans lancer de saisie ni de conversion au moment de son import.',
      'def secondes(minutes):\n    """Convertit des minutes non negatives en secondes.\n\n    Une valeur negative provoque ValueError.\n    Exemple : secondes(2) renvoie 120.\n    """\n    if minutes < 0:\n        raise ValueError("duree negative")\n    return minutes * 60'
    ],
    intro: [
      'Un appareil est livré avec une notice : elle dit quels boutons utiliser, ce qu’ils font et quelles précautions respecter, sans expliquer tout le mécanisme interne.',
      'Comment réutiliser du code écrit ailleurs en comprenant précisément les entrées attendues, les résultats et les erreurs possibles ?',
      'Les modules et leurs interfaces permettent de composer des programmes lisibles ; une documentation précise évite notamment les confusions d’unités et de domaines.'
    ],
    journey: [
      'Revoir le contrat d’une fonction.',
      'Identifier le module qui fournit un service.',
      'Lire paramètres, unités et erreurs.',
      'Écrire une documentation permettant une réutilisation.'
    ],
    recap: [
      [
        'Fonction et argument',
        'Une fonction réalise un traitement nommé ; un argument est une valeur fournie lors de l’appel.',
        'secondes(2) demande une conversion avec l’argument 2.'
      ],
      [
        'Fichier et module',
        'Un fichier conserve du texte ; un module Python est un fichier de code contenant des définitions réutilisables.',
        'Le fichier conversion.py peut fournir la fonction secondes.'
      ],
      [
        'Unité et domaine',
        'L’unité donne le sens d’un nombre ; le domaine précise quelles entrées sont autorisées.',
        'Deux minutes et deux secondes n’ont pas la même durée ; une moyenne peut exiger une liste non vide.'
      ]
    ],
    life: [
      [
        'Notice d’un appareil',
        'La notice précise comment obtenir une mesure et indique son unité.',
        'Une API, interface de programmation, décrit de même les opérations disponibles et leur contrat pour le programme utilisateur.',
        'La notice humaine n’est pas exécutable ; le code doit en plus respecter les noms et la syntaxe exacts de l’interface.'
      ],
      [
        'Convertir une durée',
        'Un minuteur est réglé en minutes, alors qu’un service attend des secondes.',
        'La documentation du paramètre oblige à convertir : deux minutes donnent deux fois soixante, soit 120 secondes.',
        'Un nom évocateur ne remplace pas une spécification : les arrondis ou valeurs négatives doivent aussi être documentés.'
      ]
    ],
    sections: [
      [
        'Demander un service plutôt que recopier son code',
        'Une fonction possède un nom, des paramètres et un résultat. Son contrat précise les valeurs acceptées et les erreurs possibles. Une API est un ensemble de services avec leurs règles d’utilisation ; elle n’implique pas nécessairement un accès à Internet. Pour appeler secondes(2), il faut savoir si 2 représente des minutes, si les décimaux sont permis et ce que la fonction renvoie.'
      ],
      [
        'Importer un module et localiser un nom',
        'Le module math regroupe des outils mathématiques. import math le rend accessible ; math.sqrt(9) demande sa fonction racine carrée, qui renvoie 3.0, car 3 multiplié par 3 donne 9. Le point indique l’origine du nom sqrt. from math import sqrt rend directement disponible sqrt(9). Un fichier local nommé math.py peut masquer le module attendu : le nom du fichier compte.',
        pause(
          'Que précise le préfixe math dans math.sqrt(9) ?',
          'Le module qui fournit la fonction.',
          'Une multiplication par le mot math.',
          'Le point sélectionne un nom dans le module importé. Cette écriture rend l’origine de la fonction visible sans lire toute son implémentation.'
        )
      ],
      [
        'Lire les détails qui changent le résultat',
        'Une moyenne exige parfois une liste non vide : la somme divisée par zéro n’a pas de résultat défini ici. Une conversion minutes-vers-secondes multiplie par 60 ; fournir des millisecondes sans adapter les unités donnerait un résultat faux. Les erreurs annoncées font partie du service, comme les effets de bord : une fonction peut par exemple modifier une liste reçue, ou garantir de la conserver intacte.'
      ],
      [
        'Documenter une fonction pour un lecteur débutant',
        'Une docstring est un texte placé juste après la ligne def qui commence la fonction, généralement entre triples guillemets. Elle indique à quoi sert le résultat, explique chaque paramètre, son type, son unité et ses limites, puis les erreurs possibles. Un exemple d’appel et de résultat concret vérifie la compréhension. Le nom moyenne ne dit pas à lui seul si le vide est autorisé, ni comment il est traité.',
        pause(
          'Une fonction documentée est-elle obligée d’accepter moyenne([]) ?',
          'Non, son contrat peut interdire la liste vide.',
          'Oui, toute valeur Python doit être acceptée.',
          'La documentation fixe le domaine. L’utilisateur doit traiter le vide avant l’appel ou accepter l’erreur documentée ; ignorer cette condition ne change pas le contrat.'
        )
      ],
      [
        'Éviter les surprises lors de la réutilisation',
        'Importer un module exécute son code de niveau principal ; un module réutilisable ne devrait donc pas déclencher une saisie ou modifier des données par surprise. Les exemples de l’atelier fournissent des fichiers auxiliaires locaux. Pour des nombres approchés, math.isclose compare avec une tolérance : 1e-12 signifie 0,000000000001. Cette tolérance est une décision liée au problème, pas une égalité exacte universelle.'
      ]
    ],
    reasoning: [
      'Lis d’abord le contrat : l’argument exprime des minutes et le résultat des secondes. Une minute vaut 60 secondes. Avec l’argument 2, le calcul effectue 2 × 60 = 120 ; le résultat signifie donc 120 secondes, pas 120 minutes.',
      'import math rend le module disponible sous le nom math. Le point de math.sqrt sélectionne la fonction sqrt de ce module. L’argument 9 demande le nombre non négatif dont le carré vaut 9 : 3 × 3 donne 9, donc le résultat numérique est 3.0.',
      'Le contrat interdit une liste vide, car la moyenne annoncée n’est pas définie sur cette entrée. L’appelant peut choisir une branche particulière pour ce cas ou laisser remonter l’erreur prévue. La présence d’une documentation ne transforme pas une entrée interdite en une entrée acceptée.'
    ]
  }),
  paradigmes: pedagogy({
    program: [
      'Voir une transformation sans mutation',
      'Ce programme crée resultat au lieu de modifier valeurs. Pour chaque x, x % 2 calcule le reste de sa division entière par deux ; l’égalité à zéro reconnaît un pair. x * x calcule son carré et append ajoute ce nouveau nombre à la liste de sortie. La présence d’une boucle est compatible avec une fonction sans effet de bord extérieur : le style du corps et la pureté observable sont deux descriptions différentes.',
      'def carres_pairs(valeurs):\n    resultat = []\n    for x in valeurs:\n        if x % 2 == 0:\n            resultat.append(x * x)\n    return resultat'
    ],
    intro: [
      'Pour préparer les mêmes portions, une personne suit une suite d’actions, une autre transforme une liste d’ingrédients, une troisième décrit des commandes qui évoluent.',
      'Comment plusieurs façons d’organiser les instructions peuvent-elles résoudre un même problème tout en rendant certains aspects plus lisibles ?',
      'Comparer les styles impératif, fonctionnel et objet aide à choisir une organisation adaptée et à repérer les modifications de données qui peuvent surprendre.'
    ],
    journey: [
      'Observer un état qui change étape par étape.',
      'Construire un résultat sans modifier l’entrée.',
      'Réunir un état et des actions dans un objet.',
      'Comparer les effets plutôt que les seuls mots du code.'
    ],
    recap: [
      [
        'Variable et état',
        'Une variable est un nom associé à une valeur ; l’état regroupe les informations présentes à un moment.',
        'total = 0 puis total = total + 3 fait passer le total de 0 à 3.'
      ],
      [
        'Fonction et liste',
        'Une fonction reçoit des arguments et peut renvoyer un résultat ; une liste conserve des valeurs ordonnées.',
        'Une fonction peut recevoir [1,2] et renvoyer une nouvelle liste [1,4].'
      ],
      [
        'Objet et méthode',
        'Un objet regroupe ses informations, appelées attributs, et ses opérations, appelées méthodes.',
        'Un robot peut conserver position = 0 et proposer avancer(2).'
      ]
    ],
    life: [
      [
        'Gérer un panier',
        'Un panier reçoit des produits un à un ; on peut suivre le total à chaque ajout ou recalculer une somme sur la liste des prix.',
        'Le premier traitement montre un état modifié ; le second peut produire un résultat à partir de l’entrée sans la modifier.',
        'Le contexte réel inclut remises et taxes : changer de style ne remplace pas les règles de calcul à définir.'
      ],
      [
        'Flotte de petits robots',
        'Chaque robot possède sa position et répond aux commandes de déplacement.',
        'Le style objet associe les données de chaque robot aux méthodes qui contrôlent leur évolution.',
        'Un objet logiciel n’agit sur un robot physique que si des composants et commandes effectives réalisent le déplacement.'
      ]
    ],
    sections: [
      [
        'Un paradigme est une façon d’organiser le programme',
        'Prenons la liste [1,2,3,4] et la demande « garder les nombres pairs puis calculer leur carré ». Un carré est le produit d’un nombre par lui-même : 2 donne 4, 4 donne 16. Un nombre pair se divise par deux sans reste. Le résultat attendu est donc [4,16]. Les styles de programmation changent l’organisation de la résolution, pas ce résultat demandé.'
      ],
      [
        'Impératif : faire évoluer un état',
        'Le style impératif décrit une suite d’actions. Pour une somme, total = 0 prépare le compteur ; une boucle for x in valeurs prend chaque élément et total += x signifie ajouter x à l’ancien total. Sur [2,4], les états du total sont 0, puis 2, puis 6. L’ordre des instructions et les modifications de variables sont au premier plan.',
        pause(
          'total = 0 puis deux ajouts de 2 et 4 décrivent quel aspect ?',
          'Un état qui évolue par instructions.',
          'Un objet sans aucune donnée.',
          'Le compteur change à chaque étape. Ce suivi explicite de l’état caractérise ici l’approche impérative ; il faut vérifier son initialisation et chaque mise à jour.'
        )
      ],
      [
        'Fonctionnel : transformer sans effet de bord',
        'Une fonction pure dépend de ses arguments et ne modifie pas de donnée extérieure observable. La compréhension [x*x for x in valeurs if x % 2 == 0] crée une nouvelle liste. for prend chaque x ; % calcule le reste de la division entière ; == compare ce reste à zéro ; if ne garde que les pairs ; * multiplie x par lui-même. L’entrée reste intacte et le résultat contient 4 puis 16.'
      ],
      [
        'Objet : réunir des données et leurs actions',
        'Un objet Robot peut posséder un attribut position et une méthode avancer. Une classe est la description permettant de créer ces objets ; chaque instance peut conserver son propre état. La méthode vérifie les règles avant de modifier la position. Cette organisation convient quand plusieurs entités évoluent avec les mêmes opérations, mais elle n’oblige pas à tout transformer en classes.'
      ],
      [
        'Identifier les effets et combiner les styles',
        'Une fonction définie par def peut modifier une liste extérieure : globale.append(x) ajoute x dans une donnée partagée. La présence du mot fonction ne garantit donc pas la pureté. Un même programme peut utiliser des objets pour les entités, des boucles pour les interactions et des fonctions sans mutation pour les calculs. Un effet de bord est une modification observable au-delà du résultat renvoyé ; on doit l’annoncer et le contrôler.',
        pause(
          'Le seul mot def suffit-il à reconnaître une fonction pure ?',
          'Non, il faut examiner les données qu’elle modifie.',
          'Oui, toute fonction est pure.',
          'Une fonction peut lire ou modifier un état extérieur. La pureté dépend de son comportement et de ses dépendances, pas seulement de sa syntaxe.'
        )
      ]
    ],
    reasoning: [
      'Au départ total vaut zéro. Chaque passage de boucle remplace total par son ancienne valeur plus x ; le résultat dépend donc de mises à jour successives. Ce choix explicite de variables modifiées et d’ordre d’exécution correspond au style impératif.',
      'Teste les quatre entrées dans l’ordre : 1 et 3 ont un reste de 1 dans la division par deux et sont écartés. 2 et 4 ont un reste nul ; leurs carrés valent 4 et 16. Une nouvelle liste reçoit ces valeurs tandis que l’entrée est préservée : c’est la transformation fonctionnelle présentée.',
      'def indique seulement qu’on définit une fonction. Dans son corps, globale.append(x) modifie une liste extérieure à l’appel. Cet effet reste observable après le retour, indépendamment d’un éventuel résultat renvoyé ; la fonction n’est donc pas pure.'
    ]
  }),
  bugs: pedagogy({
    program: [
      'Un maximum qui couvre les négatifs',
      'Le contrat choisit de refuser le vide avec ValueError. Pour une liste non vide, meilleur reçoit une vraie valeur de l’entrée, celle d’indice zéro. Chaque comparaison remplace meilleur seulement si une valeur plus grande existe. Parcourir aussi le premier élément est inoffensif : il n’est pas strictement supérieur à lui-même. Sur [-8,-3], meilleur vaut d’abord -8 puis devient -3 ; aucune valeur artificielle n’est introduite.',
      'def maximum(valeurs):\n    if valeurs == []:\n        raise ValueError("liste vide")\n    meilleur = valeurs[0]\n    for valeur in valeurs:\n        if valeur > meilleur:\n            meilleur = valeur\n    return meilleur'
    ],
    intro: [
      'Un calcul de maximum annonce zéro alors que toutes les valeurs sont négatives. Modifier des lignes au hasard peut cacher le problème au lieu d’en expliquer la cause.',
      'Comment passer d’un résultat surprenant à une cause précise, puis vérifier que la correction résout le problème sans en créer un autre ?',
      'La mise au point apprend à reproduire, réduire et expliquer un défaut ; elle aide à distinguer mauvais contrat, mauvaise entrée et mauvaise instruction.'
    ],
    journey: [
      'Comparer résultat attendu et observé.',
      'Réduire une entrée pour isoler le défaut.',
      'Examiner bornes, références et types.',
      'Corriger puis rejouer des cas qui distinguent les comportements.'
    ],
    recap: [
      [
        'Test',
        'Un test fixe une entrée, une réponse attendue et une observation permettant de comparer les deux.',
        'Pour maximum([-8,-3]), le résultat attendu est -3, pas zéro.'
      ],
      [
        'Indice et longueur',
        'L’indice est une position ; une liste de longueur n possède les positions 0 à n-1.',
        'Une liste de trois éléments a les indices 0, 1 et 2, jamais 3.'
      ],
      [
        'Référence et copie',
        'Deux noms peuvent désigner le même objet ; une copie crée une nouvelle liste distincte.',
        'b = a partage la liste ; b = a.copy() en crée une nouvelle liste extérieure.'
      ]
    ],
    life: [
      [
        'Une facture incorrecte',
        'Une facture comporte un total inattendu ; tu reconstruis le calcul avec seulement deux articles pour repérer l’erreur.',
        'Réduire le cas garde le défaut visible tout en diminuant le nombre d’étapes à examiner.',
        'Un défaut informatique peut venir de plusieurs états combinés : une réduction qui retire le déclencheur n’explique plus l’erreur initiale.'
      ],
      [
        'Deux étiquettes, un même dossier',
        'Deux étiquettes indiquent le même dossier ; ajouter une feuille par l’une est visible lorsqu’on ouvre le dossier par l’autre.',
        'Cela illustre deux variables qui référencent une même liste : une mutation par un nom est visible via l’autre.',
        'Une copie de liste Python peut encore partager ses objets internes ; copier l’enveloppe ne recopie pas nécessairement tout son contenu.'
      ]
    ],
    sections: [
      [
        'Établir le défaut avant de corriger',
        'Notons l’entrée exacte, le résultat attendu selon le contrat et celui observé. Pour le maximum de [-8,-3], -3 est plus grand que -8 et appartient aux données ; zéro n’y appartient pas. Une initialisation à zéro explique que rien ne le dépasse. Réduire à deux nombres négatifs garde le défaut et permet de suivre chaque comparaison au lieu de modifier le programme au hasard.'
      ],
      [
        'Examiner les bornes et les cas oubliés',
        'Le signe > signifie strictement supérieur, < strictement inférieur et == égal. Classer un nombre avec seulement x > 0 et x < 0 oublie donc zéro. range(n) fournit les positions 0 à n-1, tandis que range(n+1) inclut n et peut dépasser une liste de longueur n. Si une fonction finit sans return exécuté, Python renvoie None, qui signifie ici absence de résultat explicite.',
        pause(
          'Si x vaut zéro, quel test est vrai parmi x > 0 et x < 0 ?',
          'Aucun : il manque le cas d’égalité.',
          'Les deux, car zéro est un nombre.',
          'Zéro n’est ni strictement positif ni strictement négatif. Une branche particulière ou une condition inclusive doit couvrir le résultat prévu par le contrat.'
        )
      ],
      [
        'Suivre les objets, pas seulement les noms',
        'Avec a = [1], puis b = a, les deux noms désignent la même liste. b.append(2) ajoute un élément dans cet objet ; a montre donc [1,2]. Si le contrat exige de préserver l’entrée, on peut copier la liste extérieure avant de la modifier. a.copy() réalise cette copie superficielle ; des listes imbriquées peuvent toutefois encore être partagées. Il faut adapter la copie à la structure réelle des données.'
      ],
      [
        'Distinguer nombres, textes et approximations',
        'Le texte "3" est un caractère numérique, l’entier 3 sert au calcul ; les convertir doit répondre au contrat. Les nombres flottants sont des représentations approchées : 0.1 + 0.2 peut différer de 0.3. math.isclose compare avec une tolérance choisie ; 1e-12 signifie un millionième de millionième. Des noms comme seuil et indice rendent le rôle clair ; nommer une variable list peut masquer la fonction Python du même nom.'
      ],
      [
        'Corriger puis retester ce qui pourrait casser',
        'Une correction doit viser la cause : pour un maximum non vide, partir du premier élément traite aussi les négatifs. On rejoue le cas qui échouait, puis un cas courant, une borne, le vide s’il est autorisé et une entrée invalide selon le contrat. Une assertion vérifie une propriété attendue ; une exception signale une erreur prévue. Attraper toute erreur en silence ne prouve pas que le défaut est résolu.',
        pause(
          'Après avoir corrigé le maximum, quel test est indispensable ?',
          'Rejouer le cas négatif qui échouait.',
          'Tester seulement des valeurs positives.',
          'Le cas déclencheur distingue l’ancien programme de la correction. Les cas usuels complètent cette vérification, mais ne remplacent pas la reproduction du défaut.'
        )
      ]
    ],
    reasoning: [
      'Remplace x par zéro : zéro > zéro est faux et zéro < zéro est faux. Aucun traitement prévu par les deux branches ne s’exécute. Le contrat doit annoncer ce qu’on veut pour zéro ; on ajoute alors une branche d’égalité ou une borne inclusive adaptée, puis on teste ce cas.',
      'La première instruction crée une liste contenant 1 et la nomme a. b = a ne construit rien de nouveau : elle donne un deuxième nom au même objet. append(2) modifie cet objet partagé ; lire a après cette mutation montre donc [1,2].',
      'Avec une initialisation à zéro, ni -8 ni -3 n’est plus grand que le maximum provisoire ; zéro reste donc artificiellement conservé. Initialise au premier élément -8, puis compare -3 : il est plus grand et le remplace. Le maximum correct est -3.'
    ]
  })
};

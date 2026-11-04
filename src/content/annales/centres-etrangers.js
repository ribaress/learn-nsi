import { answer, python, sql } from './helpers.js';

const tree = [
  26,
  [3, [1, null, null], [15, [13, null, null], [19, null, null]]],
  [42, [29, null, [32, [30, null, null], [37, null, null]]], null]
];
const calendar = `jours = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi']
mois = {1:('janvier',31), 2:('février',28), 3:('mars',31), 4:('avril',30),
        5:('mai',31), 6:('juin',30), 7:('juillet',31), 8:('aout',31),
        9:('septembre',30), 10:('octobre',31), 11:('novembre',30), 12:('décembre',31)}
`;
const podcasts = `CREATE TABLE emission(id_emission INTEGER PRIMARY KEY, nom TEXT, radio TEXT, animateur TEXT);
CREATE TABLE podcast(id_podcast INTEGER PRIMARY KEY, theme TEXT, annee INTEGER, id_emission INTEGER REFERENCES emission(id_emission));
INSERT INTO emission VALUES
(10081,'Entendez-vous l’éco ?','France culture','Tiphaine De R.'),
(10175,'Le Temps du débat','France culture','Léa S.'),
(10183,'Soft power','France culture','Frédéric M.'),
(10212,'La tête au carré','France inter','Mathieu V.');
INSERT INTO podcast VALUES
(1,'Le système d’enseignement supérieur français est-il juste et efficace ?',2022,10081),
(2,'Trois innovations pour la croissance future (1/3) : La révolution blockchain.',2021,10081),
(3,'Travailleurs de plateformes : vers un nouveau prolétariat ?',2021,10175),
(4,'Le poids de la souveraineté numérique française',2019,10183),
(40,'Le poids de la souveraineté numérique française',2019,10183),
(5,'Dans le cloud en Islande, terre des data center',2019,10212);`;
const nextState = `def etat_suivant(etat):
    suivant = [len(etat)]
    for taille in etat:
        if taille > 1:
            suivant.append(taille - 1)
    suivant.sort()
    return suivant
`;
const frames = [
  {
    num_serie: 623,
    altitude: 620.1,
    datetime: '2024-07-01T01:58:55.000Z',
    latitude: 43.20223,
    longitude: -72.05708
  },
  {
    num_serie: 500,
    altitude: 6375.75,
    datetime: '2024-07-01T23:35:32.000Z',
    latitude: -20.8759,
    longitude: 55.58805
  },
  {
    num_serie: 623,
    altitude: 622.6,
    datetime: '2024-07-01T01:59:01.000Z',
    latitude: 43.20224,
    longitude: -72.05711
  },
  {
    num_serie: 700,
    altitude: 60000,
    datetime: '2024-07-01T11:51:23.000000Z',
    latitude: 40.87873,
    longitude: 29.09587
  }
];

export default {
  'annale-2021-centres-etrangers-arbres': {
    introduction:
      'Dans un arbre de recherche, chaque décision dépend de la racine rencontrée, mais les contraintes des ancêtres restent valables. Nous allons insérer une valeur, délimiter les valeurs permises, puis produire un parcours trié.',
    prerequisites: [
      'Un arbre binaire possède au plus deux enfants par nœud.',
      'Dans ce sujet, les valeurs de gauche sont strictement plus petites ; celles de droite sont supérieures ou égales.',
      'Un parcours infixe examine la gauche, puis la racine, puis la droite.'
    ],
    adaptation:
      'Extrait de l’exercice 3. Les deux premières réponses sont saisies comme listes de valeurs au lieu d’un dessin. Pour la question 4, les objets du sujet sont sérialisés sous la forme [valeur,gauche,droite], avec null dans les données JSON et None en Python pour un arbre vide. La fonction renvoie la liste au lieu de l’afficher.',
    context: `Ordre d’insertion du sujet : [26,3,42,15,29,19,13,1,32,37,30]\nArbre sérialisé :\n${JSON.stringify(tree)}\nLe nœud04 contient 29 ; son enfant gauche est vide.\nLes trois ateliers utilisent l’arbre initial : l’insertion de 25 du premier n’est pas conservée dans les suivants.`,
    exercises: [
      answer(
        'Suivre l’insertion de 25',
        'Question 1. Pars de la racine et décide à chaque étape de partir à gauche ou à droite pour insérer 25. Donne les valeurs des nœuds traversés, puis la nouvelle valeur 25, sous forme de liste JSON.',
        '[26,3,15,19,25]',
        [
          'Compare la valeur à insérer à la racine courante ; une seule branche reste possible.',
          'Tu t’arrêtes quand l’enfant vers lequel tu dois aller est vide.'
        ],
        [
          '25 est plus petit que 26 : on va vers 3. Il est ensuite supérieur à 3, puis à 15, puis à 19 : les décisions suivantes vont à droite.',
          'L’enfant droit de 19 est vide. C’est là que le nouveau nœud est créé ; les autres liens ne sont pas déplacés.',
          'Le chemin est [26,3,15,19,25]. La valeur 25 devient l’enfant droit du nœud de valeur 19, nommé noeud05 dans le sujet.'
        ],
        {
          guidance: 'Dessine une flèche par comparaison et annonce la condition qui la justifie.',
          pitfall:
            'Comparer uniquement à 26 ne suffit pas à choisir une place précise dans le sous-arbre gauche.'
        }
      ),
      answer(
        'Respecter aussi les ancêtres',
        'Question 2, sur l’arbre initial. Quels entiers peuvent occuper l’enfant gauche de 29 (nœud04), actuellement vide ? Donne toutes les valeurs possibles dans l’ordre croissant sous forme de liste JSON.',
        '[26,27,28]',
        [
          'Remonte du futur nœud jusqu’à la racine en conservant chaque contrainte rencontrée.',
          'Relis la convention du sujet : les doublons sont autorisés du côté droit.'
        ],
        [
          'Être à gauche de 29 impose une valeur strictement inférieure à 29. Mais ce nœud appartient aussi au sous-arbre droit de la racine 26.',
          'Il faut donc une valeur supérieure ou égale à 26 et strictement inférieure à 29. La contrainte du passage à gauche de 42 ne resserre pas davantage cet intervalle.',
          'Les entiers autorisés sont 26, 27 et 28. Le 26 est admis à cause de la convention « supérieur ou égal » pour le sous-arbre droit ; une autre convention changerait cette réponse.'
        ],
        {
          guidance:
            'Écris une borne basse et une borne haute, puis précise si chacune est incluse.',
          pitfall:
            'Exclure 26 par habitude appliquerait une règle différente de celle donnée dans le sujet.'
        }
      ),
      python(
        'Renvoyer les valeurs dans l’ordre croissant',
        'Question 4, adaptation. Écris parcours_infixe(arbre), sur [valeur,gauche,droite] ou None. Renvoie les valeurs dans l’ordre gauche, racine, droite. Les tests comprennent un arbre vide et un doublon autorisé à droite.',
        'parcours_infixe',
        'def parcours_infixe(arbre):\n    # Construis une liste sans modifier l’arbre\n    pass',
        `def parcours_infixe(arbre):
    resultat = []
    def visiter(noeud):
        if noeud is not None:
            visiter(noeud[1])
            resultat.append(noeud[0])
            visiter(noeud[2])
    visiter(arbre)
    return resultat`,
        [
          [[tree], [1, 3, 13, 15, 19, 26, 29, 30, 32, 37, 42]],
          [[null], []],
          [[[7, null, null]], [7]],
          [[[26, null, [26, null, null]]], [26, 26]]
        ],
        [
          'Décide à quel moment ajouter la racine par rapport aux appels sur ses deux enfants.',
          'Le sous-arbre vide doit arrêter l’exploration avant tout accès à une case.'
        ],
        [
          'La propriété de recherche place toutes les valeurs de gauche avant la racine et toutes celles de droite après elle. Le parcours infixe applique cet ordre à chaque nœud.',
          'Pour l’arbre fourni, le résultat est [1,3,13,15,19,26,29,30,32,37,42]. La valeur 25 n’y figure pas car on reprend l’arbre initial.',
          'La fonction auxiliaire ajoute chaque valeur une seule fois dans une liste commune : le temps est linéaire dans le nombre de nœuds et la pile d’appels dépend de la hauteur.'
        ],
        {
          guidance: 'Déroule d’abord une feuille, puis un parent ayant deux feuilles.',
          pitfall:
            'Ajouter la racine avant la visite de gauche réalise un parcours préfixe et ne produit pas la liste triée.'
        }
      )
    ],
    takeaway:
      'Une place dans un arbre doit respecter tous ses ancêtres. Le parcours infixe transforme cette organisation en une suite ordonnée, avec la convention de doublons imposée par le sujet.'
  },
  'annale-2022-centres-etrangers-dates': {
    introduction:
      'Les jours et les mois reviennent en cycle, tandis que le numéro du jour et l’année changent aux frontières du calendrier. On sépare ces mécanismes pour éviter les erreurs du 31 décembre ou de fin février.',
    prerequisites: [
      'Les indices de la liste jours vont de 0 à 6.',
      'Le dictionnaire mois utilise des clés de 1 à 12 ; chaque valeur contient un nom et une durée.',
      'Le reste d’une division, calculé avec %, permet de revenir dans un cycle.'
    ],
    adaptation:
      'Exercice 1, questions 1b, 3b et 4b. La question 3b devient la fonction testable mois_plus_tard. La syntaxe Python de la méthode index est corrigée : jours.index(j), avec des parenthèses. Conformément au sujet, février a toujours 28 jours, sans années bissextiles.',
    context:
      calendar +
      '\nUne date est représentée par (nom_jour, numero_jour, numero_mois, annee).\nLes dates reçues sont valides dans ce calendrier simplifié.',
    exercises: [
      answer(
        'Lire un cycle de sept jours',
        'Question 1b. Quelle chaîne renvoie jours[18 % 7] avec la liste fournie ? Donne seulement le nom du jour.',
        'jeudi',
        [
          'Commence par calculer le reste, puis utilise-le comme indice.',
          'Le premier élément porte l’indice 0 ; ce n’est pas le premier entier positif.'
        ],
        [
          '18 = 2 × 7 + 4 : le reste vaut 4. Le calcul élimine deux cycles complets de sept jours.',
          'Dans jours, les indices 0,1,2,3,4 correspondent à dimanche,lundi,mardi,mercredi,jeudi.',
          'L’expression renvoie donc jeudi. Le modulo est un calcul sur l’indice ; il ne choisit pas directement une position numérotée à partir de 1.'
        ],
        {
          guidance: 'Numérote les sept jours avant de lire le résultat du modulo.',
          pitfall: 'Répondre mercredi revient à décaler les indices d’une position.'
        }
      ),
      python(
        'Avancer de plusieurs mois',
        'Question 3b, adaptation. Écris mois_plus_tard(numero_mois,x) et renvoie le nom du mois x mois après numero_mois. Le numéro reçu est de 1 à 12, x est un entier positif ou nul, éventuellement supérieur à 12. Utilise le dictionnaire fourni.',
        'mois_plus_tard',
        calendar + '\ndef mois_plus_tard(numero_mois, x):\n    pass',
        calendar +
          '\ndef mois_plus_tard(numero_mois, x):\n    numero = (numero_mois - 1 + x) % 12 + 1\n    return mois[numero][0]',
        [
          [[4, 5], 'septembre'],
          [[10, 3], 'janvier'],
          [[12, 0], 'décembre'],
          [[12, 1], 'janvier'],
          [[1, 24], 'janvier'],
          [[8, 13], 'septembre']
        ],
        [
          'Le reste modulo 12 appartient à 0..11, alors que les clés utiles appartiennent à 1..12.',
          'Un changement de repère avant le modulo, puis le changement inverse après, évite de créer une clé 0.'
        ],
        [
          'On retire 1 au numéro de mois pour travailler dans 0..11. On ajoute le décalage et on prend le reste modulo 12.',
          'On ajoute ensuite 1 pour revenir aux clés 1..12 du dictionnaire. Le nom est le premier élément du tuple associé, donc l’indice 0.',
          'La formule (numero_mois-1+x)%12+1 donne 1 pour octobre plus trois mois, et 12 pour décembre plus zéro mois. Elle fonctionne aussi après plusieurs années de décalage.'
        ],
        {
          guidance: 'Teste décembre avec zéro mois d’avance, puis avec un mois d’avance.',
          pitfall: '(numero_mois+x)%12 donne 0 pour certains mois, clé absente du dictionnaire.'
        }
      ),
      python(
        'Passer au lendemain',
        'Question 4b. Programme jour_suivant(date) et renvoie le tuple du lendemain : (nom_jour,numero_jour,numero_mois,annee). Février vaut toujours 28 jours. Les données de test fournies sous forme de listes JSON deviennent des séquences Python ; le résultat tuple est accepté.',
        'jour_suivant',
        calendar + '\ndef jour_suivant(date):\n    pass',
        calendar +
          `
def jour_suivant(date):
    nom, jour, numero_mois, annee = date
    nom = jours[(jours.index(nom) + 1) % 7]
    jour += 1
    if jour > mois[numero_mois][1]:
        jour = 1
        numero_mois += 1
        if numero_mois > 12:
            numero_mois = 1
            annee += 1
    return nom, jour, numero_mois, annee`,
        [
          [[['samedi', 21, 10, 1995]], ['dimanche', 22, 10, 1995]],
          [[['mardi', 31, 10, 1995]], ['mercredi', 1, 11, 1995]],
          [[['samedi', 31, 12, 2022]], ['dimanche', 1, 1, 2023]],
          [[['dimanche', 28, 2, 2021]], ['lundi', 1, 3, 2021]],
          [[['jeudi', 30, 4, 2020]], ['vendredi', 1, 5, 2020]]
        ],
        [
          'L’avancement du nom du jour ne dépend pas de la durée du mois.',
          'Traite les passages de frontière dans l’ordre : fin du mois, puis fin de l’année.'
        ],
        [
          'Le nom avance d’une position modulo 7. Le numéro du jour augmente ensuite de 1, puis on compare à la durée du mois courant.',
          'Si la durée est dépassée, le numéro du jour revient à 1 et le mois augmente. Si le mois dépasse 12, il revient à 1 et l’année augmente.',
          'Les trois types de tests sont indispensables : jour ordinaire, fin de mois et fin d’année. Cette fonction suit le calendrier simplifié du sujet, et n’est pas un calendrier civil complet.'
        ],
        {
          guidance:
            'Explique ce qui change, et ce qui reste identique, pour chacun des trois types de date.',
          pitfall: 'Passer décembre à janvier sans augmenter l’année produit une date incohérente.'
        }
      )
    ],
    takeaway:
      'Le modulo traite les cycles réguliers. Les frontières dont la durée varie demandent un contrôle supplémentaire, dans un ordre qui conserve la cohérence de la date.'
  },
  'annale-2023-centres-etrangers-podcasts': {
    introduction:
      'Le catalogue de podcasts contient une émission en double et une erreur de nom. SQL permet de lire une sélection, supprimer une ligne précise et corriger un attribut sans réécrire la table.',
    prerequisites: [
      'Une clé primaire distingue les lignes, même si elles ont le même thème.',
      'WHERE fixe quelles lignes sont concernées.',
      'Une suppression enlève une ligne ; une mise à jour en conserve l’identité.'
    ],
    adaptation:
      'Exercice 1, questions 2b, 3b et 4a. Les tables podcast et emission de l’extrait sont reprises ; la table description, inutile pour ces trois questions, n’est pas créée. Le laboratoire réinitialise les données à chaque essai.',
    context:
      'podcast(id_podcast,theme,annee,id_emission)\nemission(id_emission,nom,radio,animateur)\nLes identifiants 4 et 40 sont deux lignes distinctes portant le même thème.\nLes tables complètes de départ sont consultables dans chaque éditeur.',
    exercises: [
      sql(
        'Sélectionner les podcasts de 2019',
        'Question 2b. Renvoie seulement les thèmes des podcasts de l’année 2019. Les doublons présents dans la table doivent être conservés ; aucun ordre n’est demandé.',
        podcasts,
        'SELECT theme FROM podcast WHERE annee = 2019;',
        [
          ['Le poids de la souveraineté numérique française'],
          ['Le poids de la souveraineté numérique française'],
          ['Dans le cloud en Islande, terre des data center']
        ],
        [
          'La colonne demandée et la colonne du filtre ne sont pas la même.',
          'N’ajoute pas une opération de dédoublonnage qui n’est pas demandée.'
        ],
        [
          'SELECT theme indique l’unique colonne du résultat. FROM podcast fixe la table ; WHERE annee = 2019 garde les lignes de l’année demandée.',
          'Les lignes d’identifiant 4, 40 et 5 passent le filtre. Le thème commun à 4 et 40 apparaît donc deux fois.',
          'DISTINCT changerait ce résultat : ici, on conserve les occurrences des lignes. Sans ORDER BY, leur ordre de retour n’est pas imposé.'
        ],
        {
          guidance:
            'Compte d’abord combien de lignes satisfont le filtre avant de regarder leurs thèmes.',
          pitfall: 'Dédupliquer spontanément les thèmes fait disparaître une ligne attendue.'
        }
      ),
      sql(
        'Supprimer une seule occurrence',
        'Question 3b. Supprime la ligne de podcast d’identifiant 40, en conservant tous les autres podcasts.',
        podcasts,
        'DELETE FROM podcast WHERE id_podcast = 40;',
        [[1], [2], [3], [4], [5]],
        [
          'Le doublon porte le même thème qu’une ligne à conserver : le thème n’est donc pas un filtre assez précis.',
          'Une suppression s’exprime avec DELETE ; choisis une clé pour identifier sa cible.'
        ],
        [
          'DELETE FROM podcast annonce la table modifiée. WHERE id_podcast = 40 cible exactement l’occurrence indésirable.',
          'La ligne 4, qui porte le même thème, doit rester présente. Un filtre sur theme supprimerait les deux lignes.',
          'Le contrôle relit tous les identifiants et attend [1,2,3,4,5]. Cela vérifie aussi l’absence de suppressions collatérales, pas seulement la disparition de 40.'
        ],
        {
          verifyQuery: 'SELECT id_podcast FROM podcast ORDER BY id_podcast;',
          ordered: true,
          guidance: 'Décris quelle ligne doit rester même si son thème est identique.',
          pitfall: 'Un DELETE sans WHERE vide toute la table.'
        }
      ),
      sql(
        'Corriger le nom de l’animateur',
        'Question 4a. Dans emission, remplace le nom de l’animateur de Le Temps du débat par Emmanuel L. Ne change aucune autre émission.',
        podcasts,
        "UPDATE emission SET animateur = 'Emmanuel L.' WHERE nom = 'Le Temps du débat';",
        [
          [10081, 'Tiphaine De R.'],
          [10175, 'Emmanuel L.'],
          [10183, 'Frédéric M.'],
          [10212, 'Mathieu V.']
        ],
        [
          'La ligne existe déjà : sa clé primaire ne doit pas être remplacée par une nouvelle ligne.',
          'Le filtre doit désigner l’émission ; la valeur modifiée appartient à une autre colonne.'
        ],
        [
          "UPDATE emission modifie une table existante. SET animateur = 'Emmanuel L.' donne la nouvelle valeur textuelle.",
          "WHERE nom = 'Le Temps du débat' choisit l’émission. On peut aussi filtrer sur son identifiant 10175, puisqu’il correspond à cette même ligne dans l’extrait.",
          'Le contrôle relit tous les animateurs. La modification est correcte si une seule valeur change et si l’identifiant de l’émission est conservé.'
        ],
        {
          verifyQuery: 'SELECT id_emission,animateur FROM emission ORDER BY id_emission;',
          ordered: true,
          guidance: 'Sépare dans ta phrase l’objet visé, l’attribut corrigé et sa nouvelle valeur.',
          pitfall: 'INSERT ajouterait une émission au lieu de corriger celle qui existe.'
        }
      )
    ],
    takeaway:
      'Deux lignes ayant le même contenu visible peuvent avoir des identifiants différents. Pour modifier une base, choisis le filtre selon ce que tu dois conserver autant que selon ce que tu veux changer.'
  },
  'annale-2024-centres-etrangers-solitaire': {
    introduction:
      'Au solitaire bulgare, chaque tour retire une carte de chaque pile pour former une nouvelle pile. Certaines parties se stabilisent ; d’autres reviennent à un ancien état. L’historique permet de les distinguer.',
    prerequisites: [
      'Un état est une liste triée de tailles de piles strictement positives.',
      'Deux états sont égaux quand leurs listes triées contiennent les mêmes valeurs.',
      'Une boucle doit reconnaître les répétitions si elle ne peut pas compter sur une diminution des cartes.'
    ],
    adaptation:
      'Sujet bis des Centres étrangers 2024, exercice 1, questions 1, 3 et 5. Les méthodes de la classe Partie sont transposées en fonctions pures et le dessin d’états est saisi comme liste JSON. Les listes fournies sont non vides. On explique la stabilité avant le cycle pour ne pas les confondre.',
    context:
      'Un tour : prendre une carte de chaque pile, supprimer les piles vidées, ajouter une pile contenant les cartes prélevées, puis trier les tailles.\nExemple fourni : [4,6,10] devient [3,3,5,9].\nLa somme des tailles est conservée. Un état stable revient immédiatement sur lui-même ; un cycle non stable comporte plusieurs états.',
    exercises: [
      answer(
        'Trouver l’état stable de dix cartes',
        'Question 1. Pars de [10] et simule les tours jusqu’à atteindre un état qui reste identique au tour suivant. Donne cette liste de tailles triées sous forme JSON.',
        '[1,2,3,4]',
        [
          'La taille de la nouvelle pile dépend du nombre de piles avant le tour.',
          'Une pile de taille un disparaît ; elle ne reste pas comme une pile de taille zéro.'
        ],
        [
          'La suite commence par [10], [1,9], [2,8], [1,2,7], puis [1,3,6]. Chaque somme vaut encore 10.',
          'Le tour suivant donne [2,3,5], puis [1,2,3,4]. En repartant de cet état, les quatre cartes prélevées forment une pile de 4, avec les restes 1,2,3.',
          'L’état stable est [1,2,3,4]. La répétition immédiate prouve sa stabilité ; le seul fait d’avoir déjà rencontré un état ne précise pas encore la longueur du cycle.'
        ],
        {
          guidance: 'Vérifie après chaque tour la somme des cartes et l’absence de zéro.',
          pitfall:
            'Calculer la nouvelle pile après suppression des piles vides sous-estime le nombre de cartes prélevées.'
        }
      ),
      python(
        'Construire l’état suivant',
        'Question 3, adaptation. Écris etat_suivant(etat), qui renvoie la nouvelle liste triée des tailles après un tour. etat est une liste non vide de tailles strictement positives. La fonction ne doit pas modifier son paramètre.',
        'etat_suivant',
        'def etat_suivant(etat):\n    # Construis une nouvelle liste de tailles\n    pass',
        nextState,
        [
          [[[4, 6, 10]], [3, 3, 5, 9]],
          [[[10]], [1, 9]],
          [[[1, 2, 3, 4]], [1, 2, 3, 4]],
          [[[1, 1, 1]], [3]],
          [[[2, 3, 5]], [1, 2, 3, 4]]
        ],
        [
          'Garde le nombre initial de piles avant de calculer leurs restes.',
          'Ajoute seulement les restes positifs, puis impose la représentation triée.'
        ],
        [
          'La nouvelle pile contient len(etat) cartes. Pour chaque ancienne pile de taille v, on garde v-1 si v est supérieur à 1.',
          'On construit une nouvelle liste pour ne pas changer l’état qui pourra être conservé dans l’historique. Le tri garantit que deux dispositions des mêmes piles ont la même représentation.',
          'Sur [1,1,1], les trois piles disparaissent mais les trois cartes prélevées forment [3]. Le nombre total de cartes est conservé, même quand plusieurs piles sont vidées.'
        ],
        {
          guidance:
            'Teste plusieurs piles d’une seule carte : c’est un bon contrôle de la disparition des piles.',
          pitfall:
            'Conserver des zéros crée des piles fictives qui ajouteraient des cartes au tour suivant.'
        }
      ),
      python(
        'Séparer stabilité et cycle',
        'Question 5, adaptation. Écris partie_stable(nb_cartes), qui commence à [nb_cartes] et renvoie True si la partie rejoint un état stable, False si elle boucle sur un cycle non stable. nb_cartes est strictement positif. Complète aussi etat_suivant en reprenant ton travail précédent.',
        'partie_stable',
        'def etat_suivant(etat):\n    # Reprends ton algorithme de l’atelier précédent\n    pass\n\ndef partie_stable(nb_cartes):\n    pass',
        nextState +
          `
def partie_stable(nb_cartes):
    courant = [nb_cartes]
    precedents = []
    while courant not in precedents:
        precedents.append(courant)
        suivant = etat_suivant(courant)
        if suivant == courant:
            return True
        courant = suivant
    return False`,
        [
          [[1], true],
          [[2], false],
          [[9], false],
          [[10], true],
          [[12], false],
          [[15], true]
        ],
        [
          'Une répétition immédiate et le retour à un état plus ancien ne décrivent pas la même situation.',
          'Conserve les états déjà visités et vérifie ce que signifie un nouveau tour identique au précédent.'
        ],
        [
          'On mémorise chaque état avant de calculer le suivant. Si suivant == courant, on a une stabilité et on peut renvoyer True.',
          'Sinon on continue. Retrouver un état dans l’historique montre qu’on recommencera la même évolution déterministe : c’est un cycle non stable et la réponse est False.',
          'Pour un nombre de cartes fixé, il existe un nombre fini de partitions possibles. L’historique garantit donc l’arrêt de cette exploration. Dix et quinze cartes se stabilisent ; neuf et douze reviennent sur un cycle plus long.'
        ],
        {
          guidance: 'Prends le temps de définir précisément les deux conditions d’arrêt.',
          pitfall:
            'Conclure False dès qu’un état se répète, sans traiter le point fixe, classerait aussi les parties stables comme des échecs.'
        }
      )
    ],
    takeaway:
      'Une quantité conservée ne prouve pas la terminaison. Quand les états possibles sont finis, mémoriser les répétitions permet d’arrêter la simulation et de distinguer point fixe et cycle.'
  },
  'annale-2025-centres-etrangers-sondes': {
    introduction:
      'Plusieurs mesures peuvent provenir de la même radiosonde. Pour exploiter les relevés, on doit extraire les informations utiles, contrôler les limites physiques annoncées et conserver les identifiants sans doublon.',
    prerequisites: [
      'Un dictionnaire se lit avec une clé textuelle.',
      'Une liste contient ici des dictionnaires complets, un par relevé.',
      'Une chaîne est une séquence de caractères dont les indices commencent à 0.'
    ],
    adaptation:
      'Exercice 3, questions 2, 4 et 5. La question de lecture de nettoyage_datetime reste une réponse ciblée ; les deux fonctions suivantes sont réellement exécutées. Les relevés de l’extrait sont conservés. Le contrôle d’altitude utilise le seuil fixé par le sujet, sans prétendre valider toutes les données météorologiques.',
    context: `Relevés de l’extrait :\n${JSON.stringify(frames, null, 2)}\nFonction donnée pour la question 2 :\ndef nettoyage_datetime(chaine):\n    date = ''\n    horaire = ''\n    for i in range(10):\n        date += chaine[i]\n    for i in range(8):\n        horaire += chaine[i+11]\n    return date, horaire\nIntervalle d’altitude autorisé par le sujet : de 0 à 35000 mètres inclus.`,
    exercises: [
      answer(
        'Lire la fonction d’extraction de date',
        'Question 2. Que renvoie nettoyage_datetime("2024-06-27T23:36:01.000000Z") ? Saisis une liste JSON avec les deux chaînes renvoyées, dans le même ordre : ["date","horaire"].',
        '["2024-06-27","23:36:01"]',
        [
          'Repère les indices visités par chacune des deux boucles.',
          'La seconde boucle ne commence pas au caractère qui suit immédiatement le premier groupe : lis le décalage ajouté à i.'
        ],
        [
          'La première boucle lit les dix caractères d’indices 0 à 9 : elle forme 2024-06-27.',
          'Le caractère T porte l’indice 10. La seconde boucle commence à 11 et lit huit caractères : 23:36:01.',
          'Le résultat est le tuple (2024-06-27,23:36:01), représenté ici par une liste JSON de deux chaînes. Les fractions de seconde et le Z ne sont pas conservés ; la fonction n’effectue aucune conversion de fuseau horaire.'
        ],
        {
          guidance: 'Numérote les caractères autour du T et du point pour repérer les limites.',
          pitfall:
            'Interpréter l’horodatage comme l’heure locale ferait une conversion que le code ne réalise pas.'
        }
      ),
      python(
        'Détecter les altitudes hors limites',
        'Question 4. Écris detecter_anomalie(enregistrement). Renvoie True si altitude est négative ou strictement supérieure à 35000, False sinon. La clé altitude est toujours présente et contient un nombre.',
        'detecter_anomalie',
        'def detecter_anomalie(enregistrement):\n    pass',
        "def detecter_anomalie(enregistrement):\n    altitude = enregistrement['altitude']\n    return altitude < 0 or altitude > 35000",
        [
          [[frames[3]], true],
          [[{ altitude: -1 }], true],
          [[{ altitude: 0 }], false],
          [[{ altitude: 35000 }], false],
          [[{ altitude: 35000.1 }], true],
          [[frames[0]], false]
        ],
        [
          'Décris les deux zones situées à l’extérieur de l’intervalle autorisé.',
          'Les bornes elles-mêmes ne sont pas des anomalies selon la formulation de la question.'
        ],
        [
          'On lit la valeur avec la clé altitude, puis on teste les deux situations interdites : moins de 0 ou plus de 35000.',
          'L’opérateur or convient car une seule des deux anomalies suffit. Utiliser and exigerait une altitude simultanément négative et supérieure à 35000, ce qui est impossible.',
          'Les valeurs 0 et 35000 sont acceptées ; -1 et 35000.1 sont refusées. Les tests aux bornes permettent de vérifier les signes stricts de comparaison.'
        ],
        {
          guidance:
            'Place d’abord les deux bornes sur une droite graduée, puis les valeurs juste à l’extérieur.',
          pitfall: 'Écrire >= 35000 rejette à tort la borne supérieure autorisée.'
        }
      ),
      python(
        'Conserver chaque numéro une seule fois',
        'Question 5. Écris liste_num_serie(frames). Renvoie les numéros de série distincts dans l’ordre de leur première apparition. Un numéro peut apparaître dans plusieurs relevés ; une liste vide donne [].',
        'liste_num_serie',
        'def liste_num_serie(frames):\n    pass',
        `def liste_num_serie(frames):
    numeros = []
    for enregistrement in frames:
        numero = enregistrement['num_serie']
        if numero not in numeros:
            numeros.append(numero)
    return numeros`,
        [
          [[frames], [623, 500, 700]],
          [[[]], []],
          [[[{ num_serie: 7 }, { num_serie: 7 }]], [7]],
          [[[{ num_serie: 9 }, { num_serie: 2 }, { num_serie: 9 }, { num_serie: 3 }]], [9, 2, 3]]
        ],
        [
          'Le résultat est une liste de numéros, pas une liste de relevés.',
          'Avant l’ajout d’un numéro, vérifie s’il figure déjà dans le résultat construit.'
        ],
        [
          'On parcourt les relevés dans leur ordre initial. Chaque dictionnaire fournit un numéro via la clé num_serie.',
          'Un numéro est ajouté seulement s’il est encore absent du résultat. Cela supprime les répétitions sans trier ni modifier l’ordre des premières apparitions.',
          'Les quatre relevés de l’extrait donnent [623,500,700]. Une liste convertie directement depuis un ensemble ne garantit pas l’ordre demandé ; une liste de présence suffit ici, avec un coût quadratique possible dans le nombre de numéros distincts.'
        ],
        {
          guidance:
            'Sur papier, fais évoluer le résultat après chaque relevé, y compris celui qui répète le premier numéro.',
          pitfall:
            'Trier les numéros produit bien des valeurs distinctes, mais perd l’ordre d’apparition demandé par cet atelier.'
        }
      )
    ],
    takeaway:
      'Extraire, contrôler et dédoublonner sont trois opérations différentes. Explicite les indices, les bornes incluses et l’ordre attendu avant d’écrire les conditions.'
  },
  'annale-2026-centres-etrangers-athletes': {
    introduction:
      'Les performances de quatre épreuves n’ont pas les mêmes unités. Le barème du sujet les transforme en points comparables, puis le programme classe les athlètes par score décroissant.',
    prerequisites: [
      'Un dictionnaire associe le nom d’une épreuve à une performance.',
      'Le barème fait intervenir une formule différente selon l’épreuve.',
      'Un tri par sélection recherche un extrême dans la partie qui reste à ranger.'
    ],
    adaptation:
      'Exercice 1, partie A : questions 1, 2 et 4. Pour tester le tri sur place, tester_classement renvoie les noms après l’appel de classer. Les classements de test utilisent des athlètes et scores pédagogiques supplémentaires, distincts d’Alex pour ne pas révéler la réponse du premier atelier. Les tests ne départagent pas des scores égaux et n’imposent pas de règle supplémentaire pour les ex æquo. Le type et le coût du tri des questions 5–6 sont expliqués après réussite.',
    context:
      'Barème donné :\n100m : (20 - temps) × 10\nlongueur : distance × 20\npoids : distance × 10\n1500m : 500 - temps\nPerformances d’Alex : 100m=13.0 s, longueur=5.2 m, poids=9.0 m, 1500m=310.0 s.\nUn athlète est décrit par un dictionnaire contenant notamment nom et score. Le classement va du plus grand au plus petit score.',
    exercises: [
      answer(
        'Calculer le total d’Alex',
        'Question 1. Applique les quatre formules du barème aux performances d’Alex, puis additionne les points. Donne seulement le score total.',
        454,
        [
          'Garde une ligne de calcul par épreuve : certaines récompensent un temps court, d’autres une distance longue.',
          'Le score total additionne les points convertis ; il n’additionne pas directement les performances brutes.'
        ],
        [
          'Le 100m rapporte (20-13)×10=70 points. Le saut rapporte 5.2×20=104 points.',
          'Le poids rapporte 9×10=90 points ; le 1500m rapporte 500-310=190 points.',
          'Le total est 70+104+90+190=454 points. On conserve exactement le barème du sujet, sans arrondir ni ajouter un plancher qui n’est pas prévu.'
        ],
        {
          guidance:
            'Indique les unités avant et après chaque conversion pour ne pas mélanger secondes, mètres et points.',
          pitfall: 'Confondre 100m et 1500m appliquerait le coefficient 10 à la mauvaise épreuve.'
        }
      ),
      python(
        'Traduire le barème en fonction',
        'Question 2. Complète nb_points(epreuve,valeur). epreuve vaut 100m, longueur, poids ou 1500m. Applique la formule correspondante et renvoie les points. Ne plafonne pas et n’arrondis pas le résultat.',
        'nb_points',
        'def nb_points(epreuve, valeur):\n    # Choisis la formule selon la clé de l’épreuve\n    pass',
        `def nb_points(epreuve, valeur):
    if epreuve == '100m':
        return (20 - valeur) * 10
    if epreuve == 'longueur':
        return valeur * 20
    if epreuve == 'poids':
        return valeur * 10
    return 500 - valeur`,
        [
          [['100m', 13], 70],
          [['longueur', 5.2], 104],
          [['poids', 9], 90],
          [['1500m', 310], 190],
          [['100m', 20], 0],
          [['1500m', 600], -100]
        ],
        [
          'La chaîne de caractères choisit la branche ; valeur est le nombre utilisé par cette branche.',
          'Teste au moins une entrée de chacune des quatre épreuves, au lieu de ne tester que le total d’un athlète.'
        ],
        [
          'Chaque branche reprend une formule du barème. Les deux courses utilisent une soustraction au temps de référence, puis un coefficient éventuel.',
          'Les deux lancers/sauts utilisent une multiplication de la distance. Le résultat doit être renvoyé, et pas seulement affecté à une variable locale.',
          'Les quatre exemples d’Alex redonnent 70,104,90,190. Une performance de 600 au 1500m produit -100 selon la formule imposée ; le sujet ne demande pas de ramener cette valeur à zéro.'
        ],
        {
          guidance: 'Écris les quatre paires nom d’épreuve → formule avant les conditions Python.',
          pitfall:
            'Un print affiche des points mais ne les renvoie pas à la fonction de calcul du score.'
        }
      ),
      python(
        'Classer par sélection décroissante',
        'Question 4, adaptation. Complète classer(l) : à chaque position, recherche l’athlète ayant le plus grand score dans le suffixe et échange-le avec la première place libre. Modifie l sur place. Garde tester_classement, qui renvoie seulement les noms pour les tests.',
        'tester_classement',
        'def classer(l):\n    # Tri par sélection, scores décroissants\n    pass\n\ndef tester_classement(l):\n    classer(l)\n    return [athlete["nom"] for athlete in l]',
        `def classer(l):
    for i in range(len(l)):
        max_index = i
        for j in range(i + 1, len(l)):
            if l[j]['score'] > l[max_index]['score']:
                max_index = j
        l[i], l[max_index] = l[max_index], l[i]

def tester_classement(l):
    classer(l)
    return [athlete['nom'] for athlete in l]`,
        [
          [
            [
              [
                { nom: 'Iris', score: 12 },
                { nom: 'Noé', score: 35 },
                { nom: 'Léa', score: 24 }
              ]
            ],
            ['Noé', 'Léa', 'Iris']
          ],
          [[[]], []],
          [[[{ nom: 'A', score: 10 }]], ['A']],
          [
            [
              [
                { nom: 'A', score: 3 },
                { nom: 'B', score: 8 },
                { nom: 'C', score: 5 }
              ]
            ],
            ['B', 'C', 'A']
          ]
        ],
        [
          'La comparaison doit favoriser le plus grand score ; le préfixe déjà classé n’est plus à explorer.',
          'Garde l’indice du meilleur candidat et effectue l’échange après la recherche dans le suffixe.'
        ],
        [
          'Au début du tour i, les positions avant i sont déjà classées. On initialise max_index à i, puis on compare les scores de toutes les positions suivantes.',
          'Si un score est plus grand, son indice devient max_index. Une seule permutation place ensuite le meilleur restant à la position i.',
          'C’est un tri par sélection décroissante. Le nombre de comparaisons est (n-1)+(n-2)+…+1=n(n-1)/2, donc un coût quadratique. Les tests vérifient le classement ; une relecture doit aussi confirmer l’emploi de la méthode demandée.'
        ],
        {
          guidance:
            'Déroule un tour sur trois athlètes en séparant recherche du maximum et permutation.',
          pitfall: 'Comparer avec < au lieu de > rangerait le plus petit score en tête.'
        }
      )
    ],
    takeaway:
      'Vérifie séparément le barème, la fonction de conversion et l’ordre du classement. Un programme qui trie correctement des scores mal calculés resterait faux pour le problème initial.'
  }
};

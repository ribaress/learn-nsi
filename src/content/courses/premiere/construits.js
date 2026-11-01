import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer as q,
  python as p,
  test as t,
  source
} from './authoring.js';
const listes = (changes) =>
  source(
    '2.1 Listes — exercice des jours et parcours d’une matrice',
    'T2_Representation_des_donnees/2.1_Listes/exercices.md',
    changes
  );
export default {
  id: 'construits',
  title: 'Construire et parcourir des données',
  lessons: [
    lesson({
      id: 'premiere-tuples',
      title: 'Renvoyer plusieurs résultats avec un tuple',
      duration: 25,
      prerequisites: ['Appeler une fonction et utiliser return.'],
      objectives: ['Regrouper et décomposer plusieurs valeurs.'],
      official: ['P-C1'],
      sections: [
        s(
          'Un résultat composé',
          'Un tuple regroupe des valeurs ordonnées. Le couple (3,5) contient deux positions, accessibles avec [0] et [1]. Les valeurs peuvent avoir des types différents : ("Ada",17). Un tuple est non modifiable après sa création.'
        ),
        s(
          'Renvoyer un couple',
          'Une fonction peut renvoyer quotient et reste ensemble. L’affectation q,r = division(17,5) décompose ce résultat en deux variables. Le nombre de variables doit correspondre au nombre de valeurs.',
          'def division(a,b):\n    return (a//b, a%b)\nq, r = division(17,5)'
        ),
        s(
          'Nommer les champs',
          'L’ordre d’un tuple est un contrat : (latitude,longitude) n’est pas (longitude,latitude). Un dictionnaire peut donner un nom aux champs pour lever une ambiguïté. On choisit la structure selon l’usage, sans confondre accès par position et accès par clé.'
        )
      ],
      examples: [
        e(
          'Une division',
          'division(17,5)',
          '17 = 3×5+2 : la première valeur est le quotient et la seconde le reste.',
          '(3,2)'
        ),
        e(
          'Des coordonnées',
          'point=(4,-2) ; x,y=point',
          'La décomposition respecte l’ordre des positions.',
          'x=4, y=−2'
        ),
        e(
          'Erreur de décomposition',
          'a,b=(1,2,3)',
          'Il y a trois valeurs pour deux variables ; aucune valeur ne doit être devinée ou ignorée.',
          'ValueError'
        )
      ],
      activity: a(
        'trace',
        'Suis le retour du couple quotient/reste.',
        'Le tuple devient deux variables par décomposition.',
        'La trace suit un cas non nul ; une division par zéro n’appartient pas au contrat.',
        {
          code: 'resultat = (17//5, 17%5)\nq, r = resultat',
          frames: [
            {
              line: 1,
              variables: { resultat: [3, 2] },
              explanation: 'Deux nombres sont regroupés.'
            },
            { line: 2, variables: { q: 3, r: 2 }, explanation: 'Les positions sont décomposées.' }
          ]
        }
      ),
      exercises: [
        q(
          'p-c1',
          'Lire un couple',
          'Avec p=(8,13), que vaut p[1] ?',
          13,
          [
            'Le premier indice est zéro.',
            'L’indice 1 désigne le second élément.',
            'Lis la valeur placée après la virgule.'
          ],
          'Le second élément est 13.',
          'Ne confonds pas indice et numéro usuel de position.'
        ),
        p(
          'p-c2',
          'Deux résultats utiles',
          'Écris quotient_reste(a,b) qui renvoie le tuple (quotient,reste), avec b>0.',
          'quotient_reste',
          'a, b',
          'def quotient_reste(a, b):\n    return (a//b, a%b)',
          [t([23, 7], [3, 2]), t([0, 3], [0, 0])],
          [
            'Le quotient entier utilise //.',
            'Le reste utilise %.',
            'Place les deux expressions entre parenthèses séparées par une virgule.'
          ],
          'Le couple satisfait a=b*q+r et 0<=r<b pour ces entiers positifs.',
          '/ produit un flottant ; utilise // pour le quotient entier.'
        ),
        p(
          'p-c3',
          'Déplacer un point',
          'Écris deplacer(point,dx,dy) qui renvoie un nouveau tuple de coordonnées sans changer point.',
          'deplacer',
          'point, dx, dy',
          'def deplacer(point, dx, dy):\n    x, y = point\n    return (x+dx, y+dy)',
          [t([[2, 3], -1, 4], [1, 7]), t([[0, 0], 0, 0], [0, 0])],
          [
            'Décompose les deux coordonnées.',
            'Ajoute dx à x et dy à y.',
            'Retourne un nouveau couple.'
          ],
          'La translation agit séparément sur les deux coordonnées ; aucun changement en place n’est nécessaire.',
          'Ne permute pas dx et dy : teste un déplacement horizontal seul.'
        )
      ],
      reflection: 'Quand un dictionnaire rendrait-il un résultat plus lisible qu’un tuple ?',
      review: [
        'Je lis un tuple par indice.',
        'Je décompose un retour de fonction.',
        'Je respecte l’ordre convenu des champs.'
      ]
    }),
    lesson({
      id: 'premiere-listes',
      title: 'Tableaux, indices et compréhensions',
      duration: 40,
      prerequisites: ['Boucles for, conditions et tuples.'],
      objectives: [
        'Modifier une case et parcourir un tableau.',
        'Construire une sélection en compréhension.'
      ],
      official: ['P-C2', 'P-C3', 'P-C5'],
      sections: [
        s(
          'Une case est repérée par un indice',
          'Pour t=[12,15,9], t[0] vaut 12 et t[2] vaut 9. Affecter t[1]=17 remplace une valeur ; cela ne crée pas un nouveau tableau. Les indices parcourus par range(len(t)) vont de zéro à len(t)−1.'
        ),
        s(
          'Valeurs ou positions',
          'for valeur in t convient pour calculer une somme. Si on veut remplacer chaque case, il faut connaître sa position : for i in range(len(t)): t[i] = 2*t[i]. Réaffecter seulement valeur ne remplace pas la case de t.'
        ),
        s(
          'Construire par compréhension',
          '[expression for element in tableau if condition] construit une nouvelle liste. La condition filtre les éléments et l’expression transforme ceux conservés. On utilise ici des tableaux dont les éléments ont le même type.',
          'mots = ["lune", "soleil", "mars"]\nlongueurs = [len(mot) for mot in mots]\ncourts = [mot for mot in mots if len(mot) <= 4]'
        )
      ],
      examples: [
        e(
          'Modifier',
          't=[4,7,2] ; t[1]=9',
          'L’indice 1 correspond au deuxième élément ; seul 7 est remplacé.',
          '[4,9,2]'
        ),
        e(
          'Filtrer et transformer',
          '[2*x for x in [1,2,3,4] if x%2==0]',
          'On garde 2 et 4 puis on les double.',
          '[4,8]'
        ),
        e(
          'Sortir du tableau',
          't=[5,6] ; t[2]',
          'Les seuls indices positifs valides sont 0 et 1.',
          'IndexError'
        )
      ],
      activity: a(
        'table',
        'Repère la case d’indice 2 et calcule son double.',
        'La troisième valeur est 8, donc son double est 16.',
        'Le tableau affiché est un modèle de données, pas une représentation de l’allocation mémoire.',
        {
          columns: ['indice', 'valeur'],
          rows: [
            [0, 3],
            [1, 5],
            [2, 8],
            [3, 10]
          ]
        }
      ),
      exercises: [
        q(
          'p-li1',
          'Un indice valide',
          'Quel est le dernier indice positif valide d’un tableau de 7 cases ?',
          6,
          ['Le premier est zéro.', 'Les indices sont 0,1,…', 'Soustrais 1 à la longueur.'],
          'Sept positions sont numérotées de 0 à 6.',
          'La longueur est un nombre de cases, pas un indice.'
        ),
        p(
          'p-li2',
          'Des noms de longueur donnée',
          'Écris mots_de_taille(mots,n), en compréhension, qui garde dans l’ordre les mots de n lettres.',
          'mots_de_taille',
          'mots, n',
          'def mots_de_taille(mots, n):\n    return [mot for mot in mots if len(mot) == n]',
          [t([['lune', 'mars', 'soleil'], 4], ['lune', 'mars']), t([['a', 'bb'], 3], [])],
          [
            'Parcours les mots sans les transformer.',
            'La condition compare len(mot) et n.',
            'La valeur produite par la compréhension est mot.'
          ],
          'Le filtre conserve l’ordre et peut produire une liste vide.',
          'Ne renvoie pas les longueurs : on demande les mots eux-mêmes.',
          listes(
            'Adaptation de la question sur les jours à cinq lettres : mots et longueur paramétrés, nouveau corpus astronomique, cas sans résultat et tests ajoutés.'
          )
        ),
        p(
          'p-li3',
          'Un filtre qui appelle une fonction',
          'Écris deux_e(mots) qui garde les mots contenant exactement deux lettres e minuscules, en utilisant une fonction compte_e définie dans ta solution.',
          'deux_e',
          'mots',
          'def compte_e(mot):\n    nombre = 0\n    for lettre in mot:\n        if lettre == "e":\n            nombre += 1\n    return nombre\n\ndef deux_e(mots):\n    return [mot for mot in mots if compte_e(mot) == 2]',
          [t([['terre', 'mer', 'neige', 'e']], ['terre', 'neige']), t([[]], [])],
          [
            'Écris d’abord compte_e avec un compteur initialisé à zéro.',
            'Teste compte_e sur terre : il faut obtenir 2.',
            'La compréhension conserve mot si compte_e(mot)==2.'
          ],
          'La fonction auxiliaire sépare le comptage du filtrage ; elle est réutilisée pour chaque mot.',
          'La présence de e ne suffit pas : il faut vérifier le nombre exact.',
          listes(
            'Adaptation des questions compte_e et filtrage des jours : corpus changé, fonction de sélection explicite, entrée vide, aides et tests automatiques ajoutés.'
          )
        )
      ],
      reflection:
        'Pourquoi modifier la variable d’une boucle sur les valeurs ne suffit-il pas pour remplacer les cases ?',
      review: [
        'Je distingue indice et valeur.',
        'Je parcours sans dépasser la dernière case.',
        'Je filtre et transforme avec une compréhension.'
      ]
    }),
    lesson({
      id: 'premiere-matrices',
      title: 'Des tableaux de tableaux aux matrices',
      duration: 35,
      prerequisites: ['Indices et boucles imbriquées.'],
      objectives: [
        'Accéder à une case par ligne puis colonne.',
        'Parcourir une matrice et créer des lignes indépendantes.'
      ],
      official: ['P-C4', 'P-C5'],
      sections: [
        s(
          'Deux niveaux d’accès',
          'm[i] désigne une ligne ; m[i][j] désigne sa colonne j. Dans [[2,4,6],[1,3,5]], il y a deux lignes et trois colonnes. Les deux indices commencent à zéro. Une matrice rectangulaire a le même nombre de colonnes dans toutes les lignes.'
        ),
        s(
          'Deux boucles complémentaires',
          'Une boucle visite les lignes et une autre leurs valeurs. Pour modifier les cases, on utilise les indices de ligne et de colonne. Les dimensions ne sont pas forcément égales : une image peut avoir 2 lignes et 100 colonnes.',
          'm = [[2,4,6],[1,3,5]]\nfor i in range(len(m)):\n    for j in range(len(m[i])):\n        m[i][j] += 1'
        ),
        s(
          'Éviter les lignes partagées',
          '[[0]*3]*2 répète deux références vers la même ligne ; modifier une case peut modifier deux lignes affichées. [[0 for j in range(3)] for i in range(2)] fabrique deux lignes indépendantes. L’objet liste est modifiable, contrairement à un tuple.'
        )
      ],
      examples: [
        e(
          'Lire',
          'm=[[2,4,6],[1,3,5]] ; m[1][2]',
          'La ligne 1 est [1,3,5] et sa colonne 2 vaut 5.',
          '5'
        ),
        e(
          'Parcourir',
          'Somme de [[1,2],[3,4],[5,6]]',
          'On additionne 3+7+11 en visitant les trois lignes.',
          '21'
        ),
        e(
          'Partage involontaire',
          'm=[[0]*2]*2 ; m[0][0]=9',
          'Les deux entrées désignent la même ligne.',
          '[[9,0],[9,0]]'
        )
      ],
      activity: a(
        'table',
        'Dessine une matrice 2×3, puis vise la ligne 1 colonne 2.',
        'Les indices 1,2 désignent la dernière case.',
        'L’affichage cache les références partagées ; le code permet de les étudier.',
        {
          columns: ['c0', 'c1', 'c2'],
          rows: [
            [2, 4, 6],
            [1, 3, 5]
          ]
        }
      ),
      exercises: [
        q(
          'p-ma1',
          'Dimensions',
          'Combien de cases comporte une matrice de 3 lignes et 5 colonnes ?',
          15,
          ['Chaque ligne possède 5 cases.', 'Il y a trois lignes de même taille.', 'Calcule 3×5.'],
          'On multiplie le nombre de lignes par le nombre de colonnes.',
          'Additionner les dimensions ne compte pas toutes les intersections.'
        ),
        p(
          'p-ma2',
          'Sommer les lignes',
          'Écris sommes_lignes(m) qui renvoie un tableau contenant la somme de chaque ligne.',
          'sommes_lignes',
          'm',
          'def sommes_lignes(m):\n    resultat = []\n    for ligne in m:\n        total = 0\n        for valeur in ligne:\n            total += valeur\n        resultat.append(total)\n    return resultat',
          [
            t(
              [
                [
                  [1, 2],
                  [3, 4],
                  [5, 6]
                ]
              ],
              [3, 7, 11]
            ),
            t([[[], [2]]], [0, 2]),
            t([[]], [])
          ],
          [
            'Le compteur de somme doit être remis à zéro pour chaque ligne.',
            'Utilise une boucle sur les lignes puis sur les valeurs.',
            'Ajoute une seule somme au résultat après la boucle intérieure.'
          ],
          'Chaque ligne donne exactement un nombre, y compris une ligne vide dont la somme est zéro.',
          'Si le compteur reste en dehors de la boucle des lignes, les sommes deviennent cumulées.'
        ),
        p(
          'p-ma3',
          'Construire une diagonale',
          'Écris identite(n), avec n>=0, qui crée une matrice carrée de zéros avec des 1 sur la diagonale.',
          'identite',
          'n',
          'def identite(n):\n    return [[1 if i == j else 0 for j in range(n)] for i in range(n)]',
          [
            t(
              [3],
              [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
              ]
            ),
            t([0], [])
          ],
          [
            'La diagonale vérifie i==j.',
            'Il faut une compréhension pour les lignes et une pour les colonnes.',
            'Crée une nouvelle ligne à chaque passage de i.'
          ],
          'Les lignes sont construites séparément et la condition place exactement un 1 par ligne.',
          'Évite la multiplication d’une liste contenant déjà une ligne : les références seraient partagées.'
        )
      ],
      reflection:
        'Comment vérifier qu’une fonction sur matrices fonctionne aussi pour une matrice rectangulaire ?',
      review: [
        'Je lis ligne puis colonne.',
        'Je parcours deux dimensions.',
        'Je crée des lignes indépendantes.'
      ]
    }),
    lesson({
      id: 'premiere-dictionnaires',
      title: 'Dictionnaires et enregistrements nommés',
      duration: 35,
      prerequisites: ['Tableaux et boucles.'],
      objectives: ['Créer et modifier une association.', 'Choisir entre keys, values et items.'],
      official: ['P-C6', 'P-C7'],
      sections: [
        s(
          'Accéder par un nom',
          'Un dictionnaire associe des clés uniques à des valeurs. fiche={"nom":"Ada","score":12} décrit un enregistrement. fiche["score"]=15 remplace le score ; fiche["ville"]="Paris" ajoute un champ. Une clé n’est pas un indice de position.'
        ),
        s(
          'Trois parcours',
          'for cle in d ou d.keys() visite les clés ; d.values() les valeurs ; d.items() les couples clé,valeur. Les champs d’une fiche peuvent avoir des types différents, mais le sens de chaque champ doit rester cohérent.',
          'scores = {"Ada":12,"Lin":15}\nfor nom, score in scores.items():\n    print(nom, score)'
        ),
        s(
          'Clés absentes et comptages',
          'd[cle] lève KeyError si la clé est absente. d.get(cle,0) fournit ici une valeur par défaut utile pour un compteur. Ne pas confondre la présence d’une clé et la vérité de sa valeur : une clé peut être présente avec la valeur 0.'
        )
      ],
      examples: [
        e(
          'Ajouter',
          'd={"A":2} ; d["B"]=5',
          'B n’existe pas encore ; une nouvelle association est créée.',
          '{"A":2,"B":5}'
        ),
        e(
          'Additionner',
          'd={"A":2,"B":5} ; sum(d.values())',
          'values fournit les deux nombres, sans les clés.',
          '7'
        ),
        e(
          'Une absence',
          'd={"A":0} ; d["B"]',
          'B n’est pas une clé ; la valeur zéro de A ne change rien.',
          'KeyError ; d.get("B",0) vaudrait 0.'
        )
      ],
      activity: a(
        'table',
        'Transforme chaque ligne en association nom → score.',
        'Chaque nom ne peut porter qu’une valeur dans le dictionnaire.',
        'Deux fiches avec le même nom nécessiteraient un autre identifiant ou une liste de fiches.',
        {
          columns: ['nom', 'score'],
          rows: [
            ['Ada', 12],
            ['Lin', 15],
            ['Sam', 0]
          ]
        }
      ),
      exercises: [
        q(
          'p-d1',
          'Écraser une association',
          'Après d={"A":1}; d["A"]=4, combien d’associations contient d ?',
          1,
          [
            'La clé A existe déjà.',
            'L’affectation remplace sa valeur.',
            'Aucune nouvelle clé n’est ajoutée.'
          ],
          'Un dictionnaire n’a pas deux associations distinctes pour la même clé.',
          'Compte les clés distinctes, pas le nombre d’affectations.'
        ),
        p(
          'p-d2',
          'Extraire les réussites',
          'Écris admis(scores,seuil) qui renvoie les noms, triés alphabétiquement, dont le score est au moins le seuil.',
          'admis',
          'scores, seuil',
          'def admis(scores, seuil):\n    return sorted([nom for nom, score in scores.items() if score >= seuil])',
          [t([{ Ada: 12, Lin: 8, Sam: 15 }, 12], ['Ada', 'Sam']), t([{}, 10], [])],
          [
            'items() donne un nom et un score à chaque passage.',
            'Garde les noms pour lesquels score>=seuil.',
            'sorted fixe l’ordre alphabétique demandé.'
          ],
          'On filtre les associations puis on trie uniquement les noms.',
          'values() seul perd les noms : utilise les couples clé,valeur.'
        ),
        p(
          'p-d3',
          'Compter des catégories',
          'Écris effectifs(categories) qui renvoie un dictionnaire des nombres d’apparitions de chaque chaîne.',
          'effectifs',
          'categories',
          'def effectifs(categories):\n    comptes = {}\n    for categorie in categories:\n        comptes[categorie] = comptes.get(categorie, 0) + 1\n    return comptes',
          [t([['A', 'B', 'A']], { A: 2, B: 1 }), t([[]], {})],
          [
            'Commence avec un dictionnaire vide.',
            'Une catégorie absente possède un effectif initial nul.',
            'Utilise get(categorie,0)+1.'
          ],
          'Une association est créée lors de la première rencontre puis mise à jour.',
          'Réaffecter toujours 1 ferait perdre les apparitions précédentes.'
        )
      ],
      reflection:
        'Pourquoi une liste de fiches peut-elle contenir plusieurs personnes du même nom alors qu’un dictionnaire indexé par nom les écrase ?',
      review: [
        'Je distingue clé et indice.',
        'Je choisis le bon parcours.',
        'Je traite explicitement les clés absentes.'
      ]
    })
  ]
};

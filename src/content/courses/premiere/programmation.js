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
const fonctions = (changes) =>
  source(
    '1.5 Fonctions — exercices maxi et moyenne',
    'T1_Demarrer_en_Python/1.5_Fonctions/exercices.md',
    changes
  );
export default {
  id: 'programmation',
  title: 'Écrire des programmes fiables',
  lessons: [
    lesson({
      id: 'premiere-constructions',
      title: 'Affectations, conditions et boucles',
      duration: 40,
      prerequisites: ['Expressions et variables.'],
      objectives: [
        'Composer des instructions élémentaires.',
        'Choisir entre boucle bornée et boucle conditionnelle.'
      ],
      official: ['P-L1'],
      sections: [
        s(
          'Une séquence transforme un état',
          'Une affectation évalue l’expression de droite puis associe le résultat au nom de gauche. x=x+1 lit l’ancienne valeur avant de remplacer x. Une condition choisit une branche ; une séquence exécute les instructions dans l’ordre. Une fonction nomme un traitement et peut renvoyer un résultat.'
        ),
        s(
          'Un nombre de répétitions connu',
          'for i in range(n) parcourt 0 à n−1 : le nombre de passages est fixé par n. Un accumulateur doit être initialisé avant la boucle et mis à jour à chaque passage. Un return dans la boucle peut arrêter trop tôt.',
          'def somme_jusqua(n):\n    total = 0\n    for k in range(1,n+1):\n        total += k\n    return total'
        ),
        s(
          'Une condition d’arrêt',
          'while convient quand le nombre de répétitions dépend de l’état calculé. Il faut une progression vers l’arrêt. Une quantité entière positive qui diminue strictement peut justifier cette progression ; une condition vraie sans modification de l’état peut produire une boucle infinie.'
        )
      ],
      examples: [
        e(
          'Une affectation',
          'x=3 ; x=x*2 ; x=x+1',
          'Chaque expression utilise la valeur issue de l’étape précédente.',
          'x=7'
        ),
        e(
          'Une boucle bornée',
          'total=0 ; pour k de 1 à 3 : total+=k',
          'Les sommes successives sont 1,3 et 6.',
          '6'
        ),
        e(
          'Une boucle bloquée',
          'n=5 ; while n>0: total+=n',
          'n n’est jamais modifié ; la condition reste vraie.',
          'La boucle ne termine pas.'
        )
      ],
      activity: a(
        'trace',
        'Prévois les valeurs de total après les trois passages.',
        'Le total vaut 6 en sortie.',
        'La trace porte sur une exécution ; justifier une boucle pour tout n demande un raisonnement général.',
        {
          code: 'total=0\nfor k in range(1,4):\n    total+=k',
          frames: [
            { line: 1, variables: { total: 0 }, explanation: 'Initialisation unique.' },
            { line: 3, variables: { k: 1, total: 1 }, explanation: 'Premier ajout.' },
            { line: 3, variables: { k: 2, total: 3 }, explanation: 'Deuxième ajout.' },
            { line: 3, variables: { k: 3, total: 6 }, explanation: 'Dernier ajout.' }
          ]
        }
      ),
      exercises: [
        q(
          'p-pr1',
          'Lire range',
          'Combien de valeurs parcourt range(2,7) ?',
          5,
          ['La borne de droite est exclue.', 'Les valeurs sont 2,3,4,5,6.', 'Compte ces valeurs.'],
          'Il y a 7−2=5 passages.',
          'Ne compte pas 7 : la borne finale de range est exclue.'
        ),
        p(
          'p-pr2',
          'Accumuler',
          'Écris somme_entiers(n), n>=0, qui renvoie 1+2+...+n avec une boucle for.',
          'somme_entiers',
          'n',
          'def somme_entiers(n):\n    total = 0\n    for k in range(1,n+1):\n        total += k\n    return total',
          [t([4], 10), t([0], 0), t([1], 1)],
          ['Initialise total à zéro.', 'range(1,n+1) inclut n.', 'Place return après la boucle.'],
          'Pour n=0, aucun ajout n’est effectué ; la somme vide vaut zéro.',
          'Si le résultat vaut toujours 1, ton return est probablement dans la boucle.'
        ),
        p(
          'p-pr3',
          'Une boucle non bornée',
          'Écris jours_double(objectif) : une population initiale de 1 double chaque jour ; renvoie le nombre minimal de jours pour atteindre ou dépasser l’entier objectif>=1.',
          'jours_double',
          'objectif',
          'def jours_double(objectif):\n    population = 1\n    jours = 0\n    while population < objectif:\n        population *= 2\n        jours += 1\n    return jours',
          [t([1], 0), t([8], 3), t([9], 4)],
          [
            'La population vaut déjà 1 au jour zéro.',
            'Répète tant que population<objectif.',
            'Mets à jour population et jours ensemble.'
          ],
          'La population croît strictement ; les puissances de deux finissent par dépasser toute cible entière donnée.',
          'Utiliser <= ajoute un jour de trop quand la cible est une puissance de deux.'
        )
      ],
      reflection: 'Pourquoi la place du return fait-elle partie de la logique d’un algorithme ?',
      review: [
        'Je suis les valeurs après chaque affectation.',
        'J’utilise correctement les bornes de range.',
        'J’explique ce qui fait progresser un while.'
      ]
    }),
    lesson({
      id: 'premiere-contrats',
      title: 'Fonctions, prototypes et contrats',
      duration: 40,
      prerequisites: ['Fonctions et conditions.'],
      objectives: [
        'Définir entrées et sortie.',
        'Exprimer et vérifier préconditions et postconditions.'
      ],
      official: ['P-L3', 'P-L4', 'P-L5'],
      sections: [
        s(
          'Le prototype est une interface',
          'Le nom, les paramètres et la nature du résultat donnent le prototype d’une fonction. distance(a,b) doit préciser ce que représentent a et b, leurs types attendus et l’unité du résultat. L’appelant peut utiliser cette interface sans connaître tous les détails du calcul.'
        ),
        s(
          'Avant et après',
          'Une précondition décrit les entrées autorisées. Une postcondition décrit la propriété promise du résultat pour ces entrées. Pour quotient_reste(a,b), on exige b>0 ; on promet a=b*q+r et 0<=r<b. Le contrat ne se réduit pas à un exemple.'
        ),
        s(
          'Des assertions explicites',
          'assert condition vérifie une propriété et lève AssertionError si elle échoue. Dans un exercice, cela aide à documenter les hypothèses ; les assertions peuvent être désactivées dans certaines exécutions Python et ne remplacent pas la validation des entrées d’une application exposée.',
          'def carre_positif(n):\n    assert n >= 0\n    resultat = n*n\n    assert resultat >= 0\n    return resultat'
        )
      ],
      examples: [
        e(
          'Une postcondition',
          'maximum de a et b',
          'Le résultat doit être l’un des deux arguments et être supérieur ou égal aux deux.',
          'Deux propriétés générales, pas seulement un exemple.'
        ),
        e(
          'Une précondition',
          'Moyenne d’une liste',
          'La somme est définie même pour [], mais la division par sa longueur ne l’est pas.',
          'Exiger une liste non vide.'
        ),
        e(
          'Un contrat non respecté',
          'assert b>0 avec b=0',
          'Le programme signale immédiatement que son hypothèse est fausse.',
          'AssertionError avant le calcul du quotient.'
        )
      ],
      activity: a(
        'trace',
        'Lis le contrôle de précondition avant le calcul.',
        'Une entrée interdite s’arrête avant la division.',
        'La trace explique une assertion ; elle ne démontre pas à elle seule la postcondition générale.',
        {
          code: 'assert b > 0\nq = a//b\nr = a%b',
          frames: [
            { line: 1, variables: { a: 17, b: 5 }, explanation: 'b est strictement positif.' },
            { line: 2, variables: { q: 3 }, explanation: 'Quotient entier.' },
            { line: 3, variables: { r: 2 }, explanation: '17 = 5×3+2.' }
          ]
        }
      ),
      exercises: [
        q(
          'p-co1',
          'Séparer avant et après',
          'Pour moyenne(notes), « notes est non vide » est-elle une précondition ou une postcondition ?',
          'précondition',
          [
            'La phrase décrit l’argument.',
            'Elle doit être vraie avant de calculer.',
            'Le résultat est décrit par une postcondition.'
          ],
          'C’est une hypothèse sur l’entrée, donc une précondition.',
          'Repère si la propriété parle des données d’entrée ou du résultat.'
        ),
        p(
          'p-co2',
          'Un maximum contractualisé',
          'Écris maximum_deux(a,b) qui renvoie le plus grand nombre puis vérifie par assert que le résultat est l’un des arguments et domine les deux.',
          'maximum_deux',
          'a, b',
          'def maximum_deux(a, b):\n    if a >= b:\n        resultat = a\n    else:\n        resultat = b\n    assert resultat in (a,b)\n    assert resultat >= a and resultat >= b\n    return resultat',
          [t([-3, -8], -3), t([7, 7], 7), t([2, 9], 9)],
          [
            'Choisis a ou b avec une condition.',
            'Une assertion vérifie l’appartenance au couple.',
            'Une autre vérifie les deux inégalités.'
          ],
          'Le cas d’égalité appartient au contrat ; les propriétés sont vraies pour tout ordre des arguments.',
          'Initialiser à zéro ne convient pas à deux nombres négatifs.',
          fonctions(
            'Adaptation de l’exercice maxi : nouveaux noms et valeurs négatives, postconditions explicites en assertions, cas d’égalité et aides progressives ajoutés.'
          )
        ),
        p(
          'p-co3',
          'Préciser une moyenne',
          'Écris moyenne_trois(a,b,c), trois nombres entre 0 et 20. Vérifie la précondition par assert ; renvoie leur moyenne et vérifie que le résultat est entre 0 et 20.',
          'moyenne_trois',
          'a, b, c',
          'def moyenne_trois(a, b, c):\n    assert 0 <= a <= 20 and 0 <= b <= 20 and 0 <= c <= 20\n    resultat = (a+b+c)/3\n    assert 0 <= resultat <= 20\n    return resultat',
          [
            t([0, 10, 20], 10),
            t([20, 20, 20], 20),
            { args: [-1, 10, 10], expected: null, expectedError: 'AssertionError' }
          ],
          [
            'Teste chacun des trois arguments.',
            'La division porte sur la somme entière.',
            'Le résultat doit rester entre les bornes communes.'
          ],
          'La moyenne de nombres dans [0,20] reste dans cet intervalle ; la précondition est vérifiée avant le calcul.',
          'Des parenthèses manquantes dans a+b+c/3 ne calculent pas la moyenne.',
          fonctions(
            'Adaptation de la moyenne de trois nombres : contexte de notes bornées, préconditions et postcondition, entrée interdite et test d’erreur ajoutés.'
          )
        )
      ],
      reflection:
        'Pourquoi une postcondition doit-elle décrire plus qu’une valeur obtenue sur un seul exemple ?',
      review: [
        'Je rédige une interface précise.',
        'Je sépare hypothèses et promesses.',
        'J’utilise une assertion à bon escient.'
      ]
    }),
    lesson({
      id: 'premiere-tests',
      title: 'Mettre au point avec des jeux de tests',
      duration: 35,
      prerequisites: ['Fonctions, conditions et contrats.'],
      objectives: [
        'Construire des tests nominaux, limites et invalides.',
        'Chercher un contre-exemple à un programme.'
      ],
      official: ['P-L6'],
      sections: [
        s(
          'Tester une spécification',
          'Un test choisit des entrées et un résultat attendu déduit du contrat, puis compare au résultat effectif. Le test doit pouvoir échouer. Il est utile de calculer l’attendu à la main avant de lancer le programme pour éviter de recopier la même erreur dans le test.'
        ),
        s(
          'Varier les cas',
          'Tester un maximum avec [1,3,2] ne détecte pas une initialisation incorrecte à zéro. Un tableau entièrement négatif la révèle. Tester les limites inclut un seul élément, les bornes exactes et le cas vide si le contrat l’autorise. Les entrées interdites se vérifient par l’erreur annoncée.'
        ),
        s(
          'Un succès n’est pas une preuve',
          'Une suite finie de tests ne garantit pas la correction pour toutes les entrées possibles. Lorsqu’un échec apparaît, on peut réduire le cas fautif, tracer les variables, corriger la cause et conserver ce test de régression. Les invariants complètent les tests par un raisonnement général.'
        )
      ],
      examples: [
        e(
          'Contre-exemple',
          'maximum initialisé à 0 ; tableau [-5,-2]',
          'Aucune valeur ne dépasse 0 ; le programme renvoie un nombre absent du tableau.',
          'Résultat faux : 0 au lieu de −2.'
        ),
        e(
          'Frontière',
          'Fonction majeur(age) avec condition age>18',
          'Le cas 18 distingue > et >=.',
          'Test attendu : majeur(18) == True.'
        ),
        e(
          'Test trop faible',
          'Tester somme([2,3]) seulement en vérifiant resultat>0',
          'De nombreux résultats faux restent positifs.',
          'Vérifier l’égalité à 5.'
        )
      ],
      activity: a(
        'trace',
        'Cherche pourquoi le maximum ci-dessous reste zéro.',
        'Le tableau négatif révèle l’initialisation fautive.',
        'La trace fournit un contre-exemple ; l’initialisation à la première valeur permet ensuite une justification générale.',
        {
          code: 'maximum=0\nfor valeur in [-5,-2]:\n    if valeur>maximum:\n        maximum=valeur',
          frames: [
            {
              line: 1,
              variables: { maximum: 0 },
              explanation: 'Hypothèse implicite erronée : maximum positif.'
            },
            { line: 3, variables: { valeur: -5, maximum: 0 }, explanation: 'Le test échoue.' },
            {
              line: 3,
              variables: { valeur: -2, maximum: 0 },
              explanation: 'Le test échoue encore.'
            }
          ]
        }
      ),
      exercises: [
        q(
          'p-te1',
          'Un cas discriminant',
          'Donne l’âge frontière qui révèle l’erreur dans age>18 pour décider de la majorité à partir de 18 ans.',
          18,
          [
            'Choisis une valeur où > et >= diffèrent.',
            '17 est refusé par les deux conditions.',
            'La différence porte sur l’égalité à la borne.'
          ],
          'À 18, > renvoie faux alors que >= renvoie vrai.',
          'Un âge éloigné du seuil peut passer malgré la mauvaise condition.'
        ),
        p(
          'p-te2',
          'Réparer une borne',
          'Répare majeur(age) pour qu’il renvoie True à partir de 18 ans inclus.',
          'majeur',
          'age',
          'def majeur(age):\n    return age >= 18',
          [t([17], false), t([18], true), t([19], true)],
          [
            'Le contrat comprend 18.',
            'Utilise une comparaison inclusive.',
            'La comparaison est déjà un booléen retournable.'
          ],
          'Les trois tests encadrent la transition et évitent un cas toujours vrai ou toujours faux.',
          'Si 18 est refusé, la comparaison est encore stricte.'
        ),
        p(
          'p-te3',
          'Produire un rapport de tests',
          'Écris verifier(cas) où chaque cas est [obtenu,attendu]. Renvoie les indices des tests qui échouent, dans l’ordre.',
          'verifier',
          'cas',
          'def verifier(cas):\n    echecs = []\n    for i in range(len(cas)):\n        obtenu, attendu = cas[i]\n        if obtenu != attendu:\n            echecs.append(i)\n    return echecs',
          [
            t(
              [
                [
                  [5, 5],
                  [0, 3],
                  [7, 8]
                ]
              ],
              [1, 2]
            ),
            t([[[true, true]]], []),
            t([[]], [])
          ],
          [
            'Parcours les positions pour conserver les indices.',
            'Décompose chaque couple en obtenu et attendu.',
            'Ajoute i lorsque obtenu != attendu.'
          ],
          'Le rapport localise les échecs sans les masquer ; une liste vide signifie seulement qu’aucun de ces cas n’a échoué.',
          'Ne retourne pas dès le premier succès : il peut rester des échecs plus loin.'
        )
      ],
      reflection:
        'Quel défaut un tableau entièrement négatif révèle-t-il qu’un tableau positif ne révèle pas ?',
      review: [
        'Je calcule un attendu indépendamment.',
        'Je choisis des tests qui distinguent les erreurs.',
        'Je distingue tests et preuve.'
      ]
    }),
    lesson({
      id: 'premiere-langages-bibliotheques',
      title: 'Bibliothèques, modules et diversité des langages',
      duration: 40,
      prerequisites: ['Fonctions et boucles.'],
      objectives: [
        'Lire la documentation d’une fonction.',
        'Réutiliser un module.',
        'Reconnaître des constructions dans un autre langage.'
      ],
      official: ['P-L2', 'P-L7'],
      sections: [
        s(
          'Lire avant d’appeler',
          'La documentation précise signature, types, valeur renvoyée et erreurs possibles. math.isqrt(n) attend un entier non négatif et renvoie la racine carrée entière, c’est-à-dire le plus grand entier r tel que r*r<=n. Importer une bibliothèque évite de réécrire un outil, mais ne supprime pas son contrat.',
          'from math import isqrt\nprint(isqrt(15))  # 3'
        ),
        s(
          'Découper en modules',
          'Un module Python est un fichier regroupant des définitions. from geometrie import aire rend une fonction disponible. On évite de copier plusieurs versions d’un même calcul : un contrat clair et des tests rendent la réutilisation plus fiable. Dans les exercices, les modules auxiliaires fournis sont affichables et modifiables.'
        ),
        s(
          'Unité et diversité',
          'Python et JavaScript possèdent affectations, conditions, boucles et appels, avec des syntaxes différentes : Python utilise l’indentation, JavaScript souvent des accolades. Le style impératif décrit des étapes ; le style fonctionnel combine des fonctions ; l’événementiel réagit aux événements ; l’objet organise état et méthodes. HTML décrit une structure et SQL exprime des requêtes : leurs usages se distinguent d’un langage généraliste.',
          '// JavaScript : même calcul impératif qu’une somme Python\nlet total = 0;\nfor (let k = 1; k <= 3; k++) { total += k; }'
        )
      ],
      examples: [
        e(
          'Consulter un contrat',
          'isqrt(16) et isqrt(17)',
          'La fonction renvoie un entier r dont le carré ne dépasse pas la cible.',
          '4 dans les deux cas.'
        ),
        e(
          'Reconnaître une boucle',
          'JavaScript : for(let i=0;i<3;i++) ; Python : range(3)',
          'Les deux font varier i sur 0,1,2. La ponctuation diffère, le parcours est le même.',
          'Trois passages.'
        ),
        e(
          'Mauvais domaine',
          'isqrt(-1)',
          'Aucun entier au carré n’est négatif ; la bibliothèque rejette cet argument.',
          'ValueError'
        )
      ],
      activity: a(
        'trace',
        'Compare les états de la somme en Python et en JavaScript.',
        'Les deux notations produisent total=6.',
        'La simulation illustre des constructions communes ; elle ne convertit pas automatiquement tous les langages.',
        {
          code: 'total = 0\nfor k in range(1,4):\n    total += k',
          frames: [
            {
              line: 1,
              variables: { total: 0 },
              explanation: 'Initialisation commune aux deux versions.'
            },
            { line: 3, variables: { k: 1, total: 1 }, explanation: 'Premier passage.' },
            { line: 3, variables: { k: 2, total: 3 }, explanation: 'Deuxième passage.' },
            { line: 3, variables: { k: 3, total: 6 }, explanation: 'Fin du parcours.' }
          ]
        }
      ),
      exercises: [
        q(
          'p-bi1',
          'Lire une documentation',
          'D’après le contrat de math.isqrt, que renvoie isqrt(24) ?',
          4,
          [
            'Cherche un entier dont le carré ne dépasse pas 24.',
            '4² vaut 16 et 5² vaut 25.',
            'Le plus grand entier admissible est 4.'
          ],
          'isqrt tronque la racine carrée vers l’entier inférieur pour les arguments autorisés.',
          'La fonction ne renvoie ni un flottant ni l’entier le plus proche.'
        ),
        p(
          'p-bi2',
          'Utiliser une bibliothèque',
          'Écris carre_parfait(n), n>=0 entier, qui utilise math.isqrt et renvoie True si n est un carré entier.',
          'carre_parfait',
          'n',
          'from math import isqrt\n\ndef carre_parfait(n):\n    racine = isqrt(n)\n    return racine*racine == n',
          [t([0], true), t([16], true), t([15], false)],
          [
            'La racine entière fournit un candidat exact.',
            'Multiplie ce candidat par lui-même.',
            'Compare son carré à n.'
          ],
          'Cette vérification reste entière et évite une égalité entre flottants.',
          'Une racine entière existe aussi pour les non-carrés : compare bien son carré à n.'
        ),
        Object.assign(
          p(
            'p-bi3',
            'Réutiliser un module fourni',
            'Le fichier mesures.py fournit convertir_cm(cm), qui renvoie des mètres. Écris perimetre_m(largeur_cm,hauteur_cm) en réutilisant cette fonction importée.',
            'perimetre_m',
            'largeur_cm, hauteur_cm',
            'from mesures import convertir_cm\n\ndef perimetre_m(largeur_cm, hauteur_cm):\n    return 2*(convertir_cm(largeur_cm)+convertir_cm(hauteur_cm))',
            [t([100, 50], 3), t([0, 0], 0), t([250, 150], 8)],
            [
              'Lis le fichier mesures.py.',
              'Importe convertir_cm depuis mesures.',
              'Convertis les deux longueurs puis calcule 2*(largeur+hauteur).'
            ],
            'La conversion est isolée dans une fonction documentée ; le périmètre utilise des mètres de bout en bout.',
            'Ne mélange pas une longueur en centimètres et une autre en mètres.'
          ),
          {
            files: {
              'mesures.py':
                'def convertir_cm(cm):\n    """Renvoie en mètres une longueur donnée en centimètres."""\n    return cm / 100\n'
            }
          }
        )
      ],
      reflection:
        'Quelles informations de documentation faut-il vérifier avant d’utiliser une fonction inconnue ?',
      review: [
        'Je lis la signature et le domaine.',
        'J’importe et réutilise un module.',
        'Je reconnais des constructions malgré une autre syntaxe.'
      ]
    })
  ]
};

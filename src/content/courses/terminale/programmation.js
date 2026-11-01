import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer,
  python,
  source
} from './helpers.js';

export default {
  id: 'programmation',
  title: 'Langages et programmation',
  lessons: [
    lesson(
      'calculabilite',
      'Programme comme donnée et problème de l’arrêt',
      ['T-P1', 'T-P2', 'T-P3'],
      ['Fonctions, conditions et boucles'],
      [
        'Expliquer comment un programme devient la donnée d’un autre',
        'Distinguer calculabilité et efficacité',
        'Reconstituer la contradiction du problème de l’arrêt'
      ],
      [
        s(
          'Un programme peut être lu',
          'Le fichier contenant du code est une suite de caractères ou d’octets. Un éditeur le transforme, un compilateur le traduit, un interpréteur l’exécute. Le même objet est donc un programme pour un usage et une donnée pour un autre. On peut analyser du texte de code sans l’exécuter ; télécharger un logiciel consiste aussi à transporter ces données.'
        ),
        s(
          'Changer de langage ne supprime pas une limite',
          'Dans le modèle idéal avec une mémoire non bornée, les langages usuels universels permettent de décrire les mêmes calculs effectifs. Ils diffèrent en facilité d’écriture, vitesse ou bibliothèques, mais un problème indécidable ne devient pas décidable en changeant de syntaxe. Les machines physiques ont en plus des limites de temps et de mémoire ; celles-ci ne définissent pas à elles seules la calculabilité.'
        ),
        s(
          'La contradiction de l’arrêt',
          'Supposons une fonction arrete(P,x) qui termine toujours et dit correctement si tout programme P termine sur x. Construisons D(P) : si arrete(P,P) annonce oui, D boucle ; sinon D termine. Que dit arrete(D,D) ? Oui rend D(D) infini ; non le fait terminer. Les deux réponses contredisent la promesse. Il n’existe donc pas de décideur total valable pour tous les couples programme-entrée. Cela n’empêche pas de prouver l’arrêt de programmes particuliers.'
        )
      ],
      [
        e(
          'Un interpréteur',
          'Python lit le texte "print(2+3)".',
          'Le texte est la donnée fournie au programme interpréteur.',
          'Le programme exécuté affiche 5.'
        ),
        e(
          'Un cas prouvable',
          'for i in range(10): ...',
          'Le nombre d’itérations est borné si le corps termine.',
          'On peut démontrer l’arrêt de ce programme particulier.'
        ),
        e(
          'Limite d’un chronomètre',
          'Un calcul n’a pas terminé après cinq secondes.',
          'Une longue attente n’est pas une preuve de non-terminaison.',
          'Un délai dépassé ne résout pas le problème général de l’arrêt.'
        )
      ],
      a(
        'trace',
        'Lis les deux branches du programme diagonal hypothétique sans essayer de les exécuter.',
        'Si le décideur annonce que D(D) termine, que fait D(D) ?',
        'La trace est un raisonnement par contradiction. arrete est une hypothèse impossible, pas une fonction disponible dans l’application.',
        {
          code: 'def D(P):\n    if arrete(P, P):\n        while True:\n            pass\n    return 0',
          frames: [
            {
              line: 2,
              variables: { hypothese: 'arrete(D,D) = True' },
              explanation: 'Le décideur supposé annonce une terminaison.'
            },
            {
              line: 3,
              variables: { effet: 'boucle infinie' },
              explanation: 'La branche choisie contredit cette réponse.'
            },
            {
              line: 5,
              variables: { hypothese: 'arrete(D,D) = False', effet: 'retour 0' },
              explanation: 'La réponse opposée est aussi contredite.'
            }
          ]
        }
      ),
      [
        answer(
          '1. Nommer une donnée',
          'Un compilateur lit un fichier source pour le traduire. Pour le compilateur, ce fichier est-il une donnée ou un processeur ? Donne un seul mot.',
          'donnée',
          [
            'Il s’agit de l’entrée du compilateur.',
            'Ce fichier n’exécute pas lui-même la traduction.',
            'Une suite de caractères peut représenter du code.'
          ],
          'Le programme source joue le rôle de donnée d’entrée du compilateur. Les rôles dépendent du programme qui le traite.',
          'Distingue l’outil qui traite et son entrée. Le même code peut être lu comme un texte.'
        ),
        python(
          '2. Manipuler du code comme du texte',
          'Écris lignes_utiles(code), qui compte les lignes non vides et dont le premier caractère non blanc n’est pas #. C’est une analyse de texte simplifiée, pas un parseur Python complet.',
          'lignes_utiles',
          'def lignes_utiles(code):\n    pass',
          'def lignes_utiles(code):\n    total = 0\n    for ligne in code.splitlines():\n        texte = ligne.strip()\n        if texte and not texte.startswith("#"):\n            total += 1\n    return total',
          [
            [['# titre\nx = 2\n\nprint(x)'], 2],
            [['  # commentaire\n'], 0],
            [[''], 0]
          ],
          [
            'Sépare les lignes avec splitlines.',
            'strip retire les blancs avant le test.',
            'Ne compte pas les lignes vides ni celles commençant par #.'
          ],
          'On traite le code comme des caractères sans l’exécuter. Une chaîne multiligne serait mal comprise par ce modèle : sa limite est annoncée.',
          'Une ligne contenant seulement des espaces est vide après strip. Teste ce cas avant de compter.'
        ),
        answer(
          '3. Fermer la contradiction',
          'Dans D(P), si arrete(P,P) répond oui, D boucle, sinon D retourne. Si arrete(D,D) répond non, D(D) termine-t-il ? Réponds oui ou non.',
          'oui',
          [
            'Remplace P par D.',
            'La réponse non choisit la branche sinon.',
            'Cette branche atteint un retour.'
          ],
          'D(D) termine dans ce cas, alors que le décideur supposé annonçait le contraire. L’autre réponse est également contredite : l’hypothèse du décideur universel est impossible.',
          'Suis la branche dictée par non, sans modifier la règle de D. C’est son effet qui contredit ensuite l’annonce.'
        )
      ],
      'Pourquoi savoir démontrer l’arrêt d’un tri ne contredit-il pas l’indécidabilité du problème général ?'
    ),

    lesson(
      'recursivite',
      'Récursivité : descendre puis remonter les appels',
      ['T-P4', 'T-P5'],
      ['Fonctions, conditions et pile'],
      [
        'Identifier cas de base et réduction du problème',
        'Tracer appels et retours récursifs',
        'Justifier une terminaison et anticiper la pile'
      ],
      [
        s(
          'Définir par un problème plus petit',
          'Une fonction récursive s’appelle elle-même. Pour calculer la somme des entiers de 1 à n, on sépare n du reste : somme(n)=n+somme(n-1). Le cas n=0 vaut zéro. L’écriture doit préciser un domaine, ici les entiers naturels, et une quantité qui décroît jusqu’au cas de base.',
          'def somme(n):\n    if n < 0:\n        raise ValueError("entier naturel requis")\n    if n == 0:\n        return 0\n    return n + somme(n - 1)'
        ),
        s(
          'L’appelant attend le résultat',
          'Lors de somme(3), l’addition avec 3 reste en attente pendant le calcul de somme(2). Chaque appel possède son propre paramètre n et son contexte. Les retours remontent dans l’ordre inverse : 0,1,3,6. Ce mécanisme explique le lien avec la pile LIFO et l’erreur consistant à oublier return devant un appel récursif.'
        ),
        s(
          'Domaine et ressources',
          'Un paramètre qui diminue n’assure pas l’arrêt s’il ne peut pas rejoindre le cas de base : en partant d’un entier négatif et en retirant un, on s’en éloigne. Même lorsqu’un calcul termine mathématiquement, une grande profondeur peut dépasser la pile disponible en Python. Remplacer la récursion par une boucle peut alors réduire la mémoire sans changer la fonction calculée.'
        )
      ],
      [
        e('Déplier', 'somme(3)', '3+somme(2)=3+2+somme(1)=3+2+1+somme(0).', '6'),
        e('Base immédiate', 'somme(0)', 'Le cas de base ne déclenche aucun autre appel.', '0'),
        e(
          'Domaine rejeté',
          'somme(-1)',
          'La précondition des entiers naturels est violée.',
          'ValueError au lieu d’une récursion qui s’éloigne de zéro.'
        )
      ],
      a(
        'recursion',
        'Déplie factorielle(4) et observe la remontée des résultats.',
        'Pourquoi faut-il mémoriser le facteur 4 pendant le calcul de factorielle(3) ?',
        'Le modèle représente une pile d’appels finie. Il ne supprime ni la limite réelle de récursion de Python ni l’obligation d’un cas de base.',
        { n: 4, mode: 'factorial' }
      ),
      [
        answer(
          '1. Compter les appels',
          'somme(n) appelle somme(n-1) jusqu’à somme(0). Combien d’appels, initial inclus, pour somme(4) ?',
          '5',
          [
            'Écris les paramètres successifs.',
            'Ils sont 4,3,2,1,0.',
            'Le cas de base est aussi un appel.'
          ],
          'Cinq contextes sont créés, y compris l’appel initial et celui du cas de base.',
          'Tu as peut-être compté seulement les appels récursifs. Le contexte initial fait partie de la pile.'
        ),
        python(
          '2. Une somme récursive',
          'Écris somme(n) pour les entiers naturels avec un cas de base zéro et un appel récursif. Les tests restent petits pour respecter la pile.',
          'somme',
          'def somme(n):\n    pass',
          'def somme(n):\n    if n == 0:\n        return 0\n    return n + somme(n - 1)',
          [
            [[0], 0],
            [[4], 10],
            [[10], 55]
          ],
          [
            'Zéro ne déclenche pas d’appel.',
            'Isole le dernier entier n.',
            'Ajoute-le au résultat de somme(n-1).'
          ],
          'Le paramètre naturel diminue jusqu’à zéro ; chaque retour ajoute un entier. Le coût est linéaire en n en temps et en pile.',
          'Oublier return produit None dans l’appelant. Trace le retour de somme(1).',
          source(
            'T2_Programmation/2.2_Recursivite',
            'Cours : fonction mystere, somme des entiers',
            'Fonction nommée somme, contrat explicite sur les naturels et tests de base ajoutés ; trace et correction intégrées.'
          )
        ),
        python(
          '3. Un produit récursif',
          'Écris factorielle(n), avec 0!=1, pour les entiers naturels. Utilise n*factorielle(n-1) hors du cas de base.',
          'factorielle',
          'def factorielle(n):\n    pass',
          'def factorielle(n):\n    if n == 0:\n        return 1\n    return n * factorielle(n - 1)',
          [
            [[0], 1],
            [[1], 1],
            [[5], 120]
          ],
          [
            'Le produit vide vaut un.',
            'Le cas de base doit accepter zéro.',
            'Un appel sur n-1 rend le problème plus petit.'
          ],
          'Le facteur n est conservé dans l’appelant jusqu’au retour du produit des entiers précédents. Le cas zéro évite une descente indéfinie.',
          'Un cas de base seulement n==1 échoue pour zéro. Teste zéro avant le cas général.',
          source(
            'T2_Programmation/2.2_Recursivite',
            'Cours : exercice 2, factorielle itérative puis récursive',
            'Convention étendue explicitement à 0!, nom et valeurs de tests modifiés ; correction autonome et aide sur le cas limite.'
          )
        )
      ],
      'Une preuve mathématique de terminaison garantit-elle qu’un appel avec un million d’étages fonctionne en Python ?'
    ),

    lesson(
      'modules-api',
      'Modules et API : lire un contrat avant d’appeler',
      ['T-P6', 'T-P7', 'T-P8'],
      ['Fonctions, paramètres et fichiers Python'],
      [
        'Lire signature, domaine et retour d’une API',
        'Importer et utiliser un module documenté',
        'Créer un module simple avec sa documentation'
      ],
      [
        s(
          'Une interface entre deux morceaux de code',
          'Une API décrit des services utilisables sans lire toute leur implémentation : noms, paramètres, types attendus, résultats et erreurs. La documentation peut préciser des effets de bord ou des unités. Une fonction qui reçoit une durée en secondes ne doit pas être appelée avec des millisecondes sans conversion. Lire seulement le nom ne suffit pas.'
        ),
        s(
          'Importer sans tout recopier',
          'Un module est un fichier Python qui regroupe des définitions. import statistiques permet d’appeler statistiques.moyenne(notes) ; from statistiques import moyenne importe directement le nom. Le premier style rend l’origine visible. Donner au fichier le même nom qu’une bibliothèque utilisée peut masquer cette bibliothèque et causer un import inattendu.',
          'import math\n\nperimetre = 2 * math.pi * 3\n# Documentation : math.isclose(a,b,rel_tol=...,abs_tol=...)\nproches = math.isclose(0.1 + 0.2, 0.3, abs_tol=1e-12)'
        ),
        s(
          'Documenter pour un autre utilisateur',
          'Une docstring juste après def explique le résultat, les paramètres, le domaine accepté et les erreurs. Un exemple d’appel rend les unités concrètes. Un module réutilisable ne doit pas lancer une saisie ou modifier des données lors de son import. Les exercices suivants fournissent un fichier auxiliaire local : aucune API distante ni clé réseau n’est nécessaire.'
        )
      ],
      [
        e(
          'Lire une unité',
          'conversion.secondes(minutes) attend un nombre de minutes.',
          'secondes(2) multiplie par soixante.',
          '120 secondes.'
        ),
        e(
          'Localiser un nom',
          'import math ; math.sqrt(9)',
          'Le préfixe indique le module qui fournit la fonction.',
          '3.0'
        ),
        e(
          'Domaine invalide',
          'moyenne([]) annoncée comme interdite.',
          'L’utilisateur doit traiter la liste vide ou accepter l’erreur documentée.',
          'Une API documentée n’accepte pas nécessairement toute valeur.'
        )
      ],
      a(
        'trace',
        'Suis l’appel à une fonction importée et distingue client et module.',
        'Le client doit-il connaître l’algorithme interne pour utiliser la fonction ?',
        'La trace représente deux fichiers locaux et leur contrat. Elle ne réalise pas de requête vers un service externe.',
        {
          code: 'from conversion import secondes\nduree = secondes(3)',
          frames: [
            {
              line: 1,
              variables: { service: 'secondes(minutes) -> minutes*60' },
              explanation: 'L’import rend la fonction disponible.'
            },
            {
              line: 2,
              variables: { minutes: 3, duree: 180 },
              explanation: 'Le contrat permet de prévoir le résultat sans recopier la fonction.'
            }
          ]
        }
      ),
      [
        answer(
          '1. Lire un contrat',
          'Une API attend un délai en secondes. Quelle valeur lui fournir pour deux minutes ?',
          '120',
          [
            'Une minute vaut soixante secondes.',
            'Convertis avant d’appeler.',
            'Multiplie deux par soixante.'
          ],
          'Le client fournit 120 dans l’unité promise. Une API ne devine pas l’unité pensée par l’utilisateur.',
          'Le nombre deux est correct en minutes seulement. Relis l’unité du paramètre avant de convertir.'
        ),
        python(
          '2. Appeler le module fourni',
          'Le fichier conversion.py fournit secondes(minutes), qui renvoie minutes*60. Écris duree(minutes) en important et en utilisant cette fonction.',
          'duree',
          'from conversion import secondes\n\ndef duree(minutes):\n    pass',
          'from conversion import secondes\n\ndef duree(minutes):\n    return secondes(minutes)',
          [
            [[3], 180],
            [[0], 0],
            [[1.5], 90]
          ],
          [
            'L’import est déjà indiqué.',
            'La fonction importée attend les minutes.',
            'Renvoie son résultat au client.'
          ],
          'Le client dépend du contrat secondes(minutes), pas de la façon dont le module réalise la multiplication.',
          'Une fonction qui appelle sans return renvoie None. Propage le résultat du module.',
          undefined,
          {
            files: {
              'conversion.py':
                '"""Conversions de durée. Entrées en minutes ; sorties en secondes."""\n\ndef secondes(minutes):\n    """Renvoie la durée en secondes pour minutes >= 0."""\n    return minutes * 60\n'
            }
          }
        ),
        python(
          '3. Créer un module documenté',
          'Crée dans statistiques.py la fonction moyenne(notes), pour une liste non vide de nombres, qui lève ValueError si elle est vide. Écris calcul(notes) dans le fichier principal pour importer et appeler moyenne. Les fichiers auxiliaires sont éditables.',
          'calcul',
          'from statistiques import moyenne\n\ndef calcul(notes):\n    return moyenne(notes)',
          'from statistiques import moyenne\n\ndef calcul(notes):\n    return moyenne(notes)',
          [
            [[[10, 16, 13]], 13],
            [[[0]], 0],
            [[[]], null, 'ValueError']
          ],
          [
            'La docstring doit préciser le cas vide.',
            'Teste notes avant de diviser par sa longueur.',
            'Écris la fonction dans statistiques.py, puis importe-la dans le principal.'
          ],
          'Le module définit le service et son erreur. Le client reste court ; les tests vérifient la moyenne et le comportement documenté pour la liste vide.',
          'Corriger seulement le fichier principal ne crée pas le service réutilisable. Vérifie statistiques.py et son import.',
          undefined,
          {
            files: {
              'statistiques.py':
                '"""Outils de calcul sur des notes."""\n\ndef moyenne(notes):\n    """Renvoie la moyenne ; liste vide interdite (ValueError)."""\n    pass\n'
            },
            solutionFiles: {
              'statistiques.py':
                '"""Outils de calcul sur des notes."""\n\ndef moyenne(notes):\n    """Renvoie la moyenne arithmétique ; ValueError si notes est vide."""\n    if not notes:\n        raise ValueError("liste vide")\n    return sum(notes) / len(notes)\n'
            }
          }
        )
      ],
      'Quelles informations manquent à une documentation qui dit seulement « calcule une moyenne » ?'
    ),

    lesson(
      'paradigmes',
      'Impératif, fonctionnel et objet : trois approches',
      ['T-P9', 'T-P10'],
      ['Boucles, fonctions et classes'],
      [
        'Reconnaître mutation impérative et composition fonctionnelle',
        'Identifier état et méthodes dans une approche objet',
        'Choisir une approche adaptée à une transformation ou un modèle'
      ],
      [
        s(
          'Décrire une suite d’actions',
          'Le style impératif organise le programme en instructions qui modifient un état : un compteur commence à zéro puis augmente à chaque élément retenu. Ce style rend les étapes explicites et convient à une simulation séquentielle. Le risque est de laisser un état partagé ou un effet de bord difficile à suivre.'
        ),
        s(
          'Exprimer une transformation',
          'Le style fonctionnel privilégie des fonctions dont le résultat dépend de leurs arguments et qui ne modifient pas leurs entrées. Transformer puis agréger une liste peut s’écrire en composant des fonctions. Une compréhension Python facilite ce style, mais la présence d’une fonction ne suffit pas : une fonction qui modifie une liste globale possède un effet de bord.',
          'def carres_pairs(valeurs):\n    return [x*x for x in valeurs if x % 2 == 0]'
        ),
        s(
          'Modéliser des objets qui évoluent',
          'Le style objet regroupe un état et des méthodes, par exemple un robot avec sa position et ses déplacements. Il aide à maintenir les invariants de plusieurs entités. Un même programme Python peut combiner objets pour le modèle, boucles pour l’interaction et fonctions sans mutation pour les calculs. Le choix dépend de la clarté du problème, pas d’une hiérarchie absolue entre styles.'
        )
      ],
      [
        e(
          'Accumuler',
          'total=0 puis total+=x pour chaque x.',
          'L’état total change à chaque étape.',
          'Style impératif.'
        ),
        e(
          'Transformer sans modifier',
          'carres_pairs([1,2,3,4])',
          'Une nouvelle liste est construite et la liste d’entrée est conservée.',
          '[4,16], approche fonctionnelle.'
        ),
        e(
          'Fausse pureté',
          'def f(x): globale.append(x)',
          'Le mot def ne supprime pas l’effet sur une donnée extérieure.',
          'Fonction à effet de bord, pas une transformation pure.'
        )
      ],
      a(
        'trace',
        'Compare l’accumulation des carrés pairs et la création d’une nouvelle liste.',
        'Quel état est modifié, et quelle donnée doit rester intacte ?',
        'La trace présente un style impératif ; les exercices reformulent le même résultat avec d’autres choix. Aucun style n’est imposé à tout un langage.',
        {
          code: 'resultat = []\nfor x in [1,2,3,4]:\n    if x % 2 == 0:\n        resultat.append(x*x)',
          frames: [
            { line: 1, variables: { resultat: [] }, explanation: 'Création de l’accumulateur.' },
            { line: 4, variables: { x: 2, resultat: [4] }, explanation: 'Premier entier pair.' },
            {
              line: 4,
              variables: { x: 4, resultat: [4, 16] },
              explanation: 'Le résultat augmente sans modifier les données parcourues.'
            }
          ]
        }
      ),
      [
        answer(
          '1. Reconnaître le regroupement',
          'Un programme décrit des robots possédant position, energie et une méthode avancer. Quel paradigme structure ce modèle : impératif, fonctionnel ou objet ?',
          'objet',
          [
            'Chaque robot porte son propre état.',
            'Les opérations sont rattachées aux entités.',
            'Les méthodes manipulent leurs attributs.'
          ],
          'Le modèle associe état et comportement dans des instances : c’est une organisation objet.',
          'La présence d’un déplacement ne suffit pas à choisir impératif. Observe où sont regroupés état et méthodes.'
        ),
        python(
          '2. Une transformation sans mutation',
          'Écris positifs(valeurs) qui renvoie une nouvelle liste contenant les nombres strictement positifs dans le même ordre. Ne modifie pas valeurs.',
          'positifs',
          'def positifs(valeurs):\n    pass',
          'def positifs(valeurs):\n    return [x for x in valeurs if x > 0]',
          [
            [[[-2, 0, 3, 1]], [3, 1]],
            [[[]], []],
            [[[0, -1]], []]
          ],
          [
            'Une compréhension construit une nouvelle liste.',
            'Le filtre est strict : zéro est exclu.',
            'Conserve l’ordre du parcours.'
          ],
          'Le résultat est une transformation des arguments sans effet de bord sur l’entrée, ce qui facilite sa composition et son test.',
          'Supprimer dans la liste pendant son parcours peut sauter des valeurs. Construis une nouvelle liste.'
        ),
        python(
          '3. Deux styles, même contrat',
          'Écris somme_carres(valeurs) avec une boucle et un accumulateur local. La fonction doit garder le même contrat qu’une version sum(x*x for x in valeurs).',
          'somme_carres',
          'def somme_carres(valeurs):\n    pass',
          'def somme_carres(valeurs):\n    total = 0\n    for x in valeurs:\n        total += x * x\n    return total',
          [
            [[[2, -3]], 13],
            [[[]], 0],
            [[[0]], 0]
          ],
          [
            'Le total initial est l’élément neutre de l’addition.',
            'Ajoute le carré de chaque élément.',
            'Renvoie après la boucle.'
          ],
          'Le style interne est impératif ; l’état est local et l’entrée n’est pas modifiée. Deux implémentations peuvent respecter le même contrat observable.',
          'Ne renvoie pas après le premier élément. Teste une liste contenant au moins deux nombres.'
        )
      ],
      'Dans un simulateur de réseau, quelles parties écrirais-tu comme objets et quelles transformations comme fonctions sans mutation ?'
    ),

    lesson(
      'bugs',
      'Mettre au point : isoler, corriger, retester',
      ['T-P11'],
      ['Conditions, indices, types et fonctions'],
      [
        'Construire un contre-exemple minimal',
        'Corriger bornes, effets de bord et conditions incomplètes',
        'Traiter types, flottants et noms sans masquer les erreurs'
      ],
      [
        s(
          'Reproduire avant de modifier',
          'Une erreur se diagnostique à partir d’une entrée, d’un résultat attendu et d’un résultat observé. Réduire l’entrée aide à identifier la cause. Les tests utiles comprennent un cas usuel, une borne, le vide si autorisé et une entrée invalide. Une assertion exprime une propriété interne ; une exception explicite peut refuser une entrée hors contrat. Attraper toute exception sans explication cache souvent le bug.'
        ),
        s(
          'Bornes et effets de bord',
          'Les indices d’une liste de longueur n vont de 0 à n-1. range(n+1) peut donc déborder. Choisir < plutôt que <= peut perdre un cas frontière. Un if sans branche pour l’égalité peut produire None. Deux variables peuvent référencer la même liste : modifier l’une affecte l’autre ; une copie explicite est nécessaire si le contrat promet de préserver l’entrée.'
        ),
        s(
          'Types, nombres approchés et noms',
          'Le texte "3" et l’entier 3 ne jouent pas le même rôle ; une conversion doit répondre au contrat. Les flottants binaires ne représentent pas exactement tous les décimaux : 0.1+0.2 n’est généralement pas égal à 0.3. Une comparaison approchée utilise une tolérance adaptée, par exemple math.isclose. Des noms comme seuil et indice évitent les confusions ; appeler une variable list ou sum masque une fonction utile.',
          'import math\nassert math.isclose(0.1 + 0.2, 0.3, abs_tol=1e-12)\n\na = [1, 2]\nb = a.copy()\nb.append(3)\nassert a == [1, 2]'
        )
      ],
      [
        e(
          'Condition non exhaustive',
          'positif si x>0, négatif si x<0 ; x=0.',
          'Aucune branche ne couvre l’égalité.',
          'Ajouter explicitement le cas zéro.'
        ),
        e(
          'Aliasing',
          'a=[1]; b=a; b.append(2)',
          'a et b désignent la même liste.',
          'a vaut [1,2].'
        ),
        e(
          'Tous les nombres négatifs',
          'Maximum de [-8,-3], initialisé à 0.',
          'Zéro n’appartient pas aux données et reste artificiellement maximal.',
          'Initialiser avec le premier élément, résultat -3.'
        )
      ],
      a(
        'trace',
        'Repère l’initialisation qui fait échouer le maximum sur des nombres négatifs.',
        'Pourquoi le résultat ne peut-il pas être zéro pour [-8,-3] ?',
        'Cette trace isole un contre-exemple. Un seul test réussi ne prouve pas l’absence de bugs dans toutes les branches.',
        {
          code: 'maximum = 0\nfor valeur in [-8,-3]:\n    if valeur > maximum:\n        maximum = valeur',
          frames: [
            {
              line: 1,
              variables: { maximum: 0 },
              explanation: 'Valeur initiale non issue des données.'
            },
            {
              line: 3,
              variables: { valeur: -8, maximum: 0 },
              explanation: 'Le premier nombre ne dépasse pas zéro.'
            },
            {
              line: 3,
              variables: { valeur: -3, maximum: 0 },
              explanation: 'Le défaut persiste avec le second nombre.'
            }
          ]
        }
      ),
      [
        answer(
          '1. Dernier indice valide',
          'Une liste possède cinq éléments. Quel est son dernier indice Python non négatif ?',
          '4',
          [
            'Le premier indice est zéro.',
            'Il y a cinq indices au total.',
            'Le dernier vaut longueur moins un.'
          ],
          'Les indices 0,1,2,3,4 couvrent cinq éléments. L’indice 5 est hors limites.',
          'Confondre longueur et dernier indice provoque un débordement. Écris les indices en face des valeurs.'
        ),
        python(
          '2. Un maximum sans faux zéro',
          'Écris maximum(valeurs), sans max(). La liste est non vide ; si elle est vide, lève ValueError. Pense aux listes entièrement négatives.',
          'maximum',
          'def maximum(valeurs):\n    resultat = 0  # à corriger\n    pass',
          'def maximum(valeurs):\n    if not valeurs:\n        raise ValueError("liste vide")\n    resultat = valeurs[0]\n    for valeur in valeurs[1:]:\n        if valeur > resultat:\n            resultat = valeur\n    return resultat',
          [
            [[[-8, -3]], -3],
            [[[5]], 5],
            [[[]], null, 'ValueError']
          ],
          [
            'Teste le vide avant valeurs[0].',
            'Choisis le premier élément comme candidat.',
            'Compare les autres au candidat courant.'
          ],
          'L’invariant est que resultat est le maximum des éléments déjà visités. L’initialisation avec une donnée le rend valable même si toutes sont négatives.',
          'Une initialisation à zéro suppose des nombres positifs sans le dire. Utilise le cas [-8,-3] pour confirmer la correction.',
          source(
            'T2_Programmation/2.4_Pratiques_de_programmation',
            'Bonnes pratiques : tests de maxi(liste)',
            'Exercice de maximum transformé en diagnostic d’initialisation ; cas négatifs, singleton et erreur vide ajoutés ; exception explicite documentée.'
          )
        ),
        python(
          '3. Copier avant de compléter',
          'Écris ajouter_sans_modifier(valeurs,x), qui renvoie une nouvelle liste contenant les anciennes valeurs puis x. L’entrée doit rester inchangée, même si la nouvelle liste est modifiée ensuite.',
          'ajouter_sans_modifier',
          'def ajouter_sans_modifier(valeurs, x):\n    pass',
          'def ajouter_sans_modifier(valeurs, x):\n    resultat = valeurs.copy()\n    resultat.append(x)\n    return resultat',
          [
            [
              [[1, 2], 3],
              [1, 2, 3]
            ],
            [[[], 4], [4]]
          ],
          [
            'resultat=valeurs ne copie pas.',
            'copy crée une nouvelle liste extérieure.',
            'Ajoute x dans la copie puis renvoie-la.'
          ],
          'Une copie superficielle suffit ici au contrat qui ajoute un élément au niveau extérieur. Des objets internes mutables resteraient partagés : ce serait un autre contrat.',
          'Si le tableau de départ change, tu manipules encore la même référence. Copie avant append.'
        )
      ],
      'Quel test minimal ajouterais-tu pour un if qui traite positif et négatif mais oublie zéro ?'
    )
  ]
};

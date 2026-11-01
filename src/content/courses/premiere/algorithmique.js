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
const parcours = (changes) =>
  source(
    '4.1 Extremums et moyennes — maximum, moyenne et occurrences',
    'T4_Algorithmique/4.1_Extremums_et_moyennes/cours.md',
    changes
  );
export default {
  id: 'algorithmique',
  title: 'Choisir et justifier des algorithmes',
  lessons: [
    lesson({
      id: 'premiere-parcours',
      title: 'Rechercher, calculer extrema et moyennes',
      duration: 45,
      prerequisites: ['Tableaux et boucles.'],
      objectives: [
        'Programmer un parcours linéaire.',
        'Justifier l’initialisation d’un extremum.',
        'Comparer les coûts en nombre d’éléments.'
      ],
      official: ['P-A1', 'P-A2', 'P-A3'],
      sections: [
        s(
          'Chercher sans hypothèse sur l’ordre',
          'La recherche séquentielle examine les cases jusqu’à trouver la cible ou atteindre la fin. Elle fonctionne pour des chaînes comme pour des nombres, tant qu’une égalité est disponible. Si on retourne le premier indice, l’absence peut être représentée par −1 ; ce choix appartient au contrat.'
        ),
        s(
          'Un extremum bien initialisé',
          'Pour une liste non vide, on initialise le maximum à sa première valeur. Après avoir traité un préfixe du tableau, le maximum courant est le plus grand élément de ce préfixe : c’est un invariant. Initialiser à zéro échoue si toutes les valeurs sont négatives. Le minimum se construit de la même façon en inversant la comparaison.'
        ),
        s(
          'Moyenne et coût',
          'On accumule la somme puis on divise par le nombre d’éléments, qui doit être non nul. Un parcours complet visite n valeurs : son coût est linéaire en n, à coût élémentaire supposé constant. Rechercher une absence visite aussi n cases dans le pire cas ; trouver la première case peut ne demander qu’un test.',
          'def moyenne(tab):\n    assert len(tab)>0\n    total=0\n    for valeur in tab:\n        total+=valeur\n    return total/len(tab)'
        )
      ],
      examples: [
        e(
          'Premier indice',
          'Chercher "B" dans ["A","B","B"]',
          'La première correspondance est à la position 1 ; on peut s’arrêter.',
          '1'
        ),
        e(
          'Maximum négatif',
          '[-7,-2,-9]',
          'Initialiser à −7, remplacer par −2, puis conserver −2.',
          '−2'
        ),
        e(
          'Moyenne vide',
          '[]',
          'La somme vaut zéro mais le nombre d’éléments aussi ; on ne peut diviser par zéro.',
          'Entrée interdite par la précondition.'
        )
      ],
      activity: a(
        'trace',
        'Prévois le maximum après chaque valeur négative.',
        'Le maximum final vaut −2 et appartient au tableau.',
        'La trace est un exemple ; l’invariant du préfixe justifie les autres tableaux non vides.',
        {
          code: 'maximum = tab[0]\nfor valeur in tab:\n    if valeur > maximum:\n        maximum = valeur',
          frames: [
            { line: 1, variables: { maximum: -7 }, explanation: 'Première valeur.' },
            {
              line: 4,
              variables: { valeur: -2, maximum: -2 },
              explanation: 'Un plus grand élément a été rencontré.'
            },
            {
              line: 3,
              variables: { valeur: -9, maximum: -2 },
              explanation: '−9 ne dépasse pas −2.'
            }
          ]
        }
      ),
      exercises: [
        q(
          'p-al1',
          'Prévoir un coût',
          'Dans le pire cas, combien de cases une recherche séquentielle d’une valeur absente inspecte-t-elle dans un tableau de 120 cases ?',
          120,
          [
            'Aucun arrêt anticipé n’a lieu.',
            'Chaque case doit être exclue.',
            'Le nombre de visites est la longueur du tableau.'
          ],
          'On doit examiner les 120 éléments pour conclure à l’absence.',
          'L’absence ne peut pas être décidée après une seule case sans propriété supplémentaire.'
        ),
        p(
          'p-al2',
          'Tous les indices',
          'Écris indices(tab,cible) qui renvoie tous les indices où cible apparaît, dans l’ordre. Les valeurs peuvent être des chaînes.',
          'indices',
          'tab, cible',
          'def indices(tab, cible):\n    resultat=[]\n    for i in range(len(tab)):\n        if tab[i] == cible:\n            resultat.append(i)\n    return resultat',
          [t([['A', 'B', 'A'], 'A'], [0, 2]), t([[1, 2], 7], []), t([[], 3], [])],
          [
            'Il faut parcourir les indices, pas seulement les valeurs.',
            'Ajoute l’indice si l’égalité est vraie.',
            'Ne retourne pas dès la première occurrence.'
          ],
          'Le parcours complet est nécessaire pour collecter toutes les positions ; une cible absente produit [].',
          'Retourner les valeurs au lieu des indices perd leur position.',
          parcours(
            'Adaptation de recherche_occurrence : signature réorganisée, données textuelles et cas vide, aides et tests d’absence ajoutés.'
          )
        ),
        p(
          'p-al3',
          'Une synthèse statistique',
          'Écris bilan(tab), tab non vide, qui renvoie le tuple (minimum,maximum,moyenne) avec un seul parcours et sans min, max ni sum.',
          'bilan',
          'tab',
          'def bilan(tab):\n    assert len(tab)>0\n    minimum=tab[0]\n    maximum=tab[0]\n    total=0\n    for valeur in tab:\n        if valeur<minimum:\n            minimum=valeur\n        if valeur>maximum:\n            maximum=valeur\n        total+=valeur\n    return (minimum,maximum,total/len(tab))',
          [t([[-5, -1, -3]], [-5, -1, -3]), t([[8]], [8, 8, 8]), t([[2, 4, 6]], [2, 6, 4])],
          [
            'Initialise les deux extrema à la première case.',
            'Initialise séparément total à zéro.',
            'Mets à jour les trois informations dans la même boucle.'
          ],
          'Les extrema concernent le préfixe déjà traité et total sa somme ; une seule visite de chaque élément donne un coût linéaire.',
          'Un extremum initialisé à zéro échoue avec le jeu de valeurs négatives.',
          parcours(
            'Adaptation et combinaison des algorithmes maximum et moyenne : ajout du minimum et retour tuple, un seul parcours exigé, données négatives, singleton et tests ajoutés.'
          )
        )
      ],
      reflection:
        'Pourquoi calculer trois statistiques pendant un seul parcours garde-t-il un coût linéaire ?',
      review: [
        'Je recherche une occurrence de type quelconque.',
        'J’initialise les extrema sans supposer leur signe.',
        'Je justifie un coût linéaire.'
      ]
    }),
    lesson({
      id: 'premiere-insertion',
      title: 'Trier par insertion et prouver le préfixe trié',
      duration: 45,
      prerequisites: ['Indices, boucles imbriquées et comparaisons.'],
      objectives: [
        'Insérer une valeur dans un préfixe trié.',
        'Expliquer invariant, terminaison et coût quadratique.'
      ],
      official: ['P-A4', 'P-A5'],
      sections: [
        s(
          'Le geste d’insertion',
          'On considère la première case comme un préfixe déjà trié. Pour chaque position i à partir de 1, on garde sa valeur dans une variable puis on décale vers la droite les éléments précédents qui lui sont supérieurs. La valeur gardée prend la place libérée. On ne doit pas l’écraser pendant les décalages.'
        ),
        s(
          'Une preuve par invariant',
          'Au début de l’étape i, les cases 0 à i−1 sont triées et contiennent les mêmes valeurs que le préfixe initial. L’insertion place l’élément suivant à sa bonne position, donc le préfixe jusqu’à i est trié sans perdre de valeurs. Initialement un élément est trié ; à la fin le préfixe est tout le tableau.'
        ),
        s(
          'Pourquoi cela finit et ce que cela coûte',
          'La boucle extérieure est bornée. Dans la boucle intérieure, j diminue strictement ; j+1 est un entier non négatif à chaque test réussi. Elle finit donc. Dans l’ordre inverse, on décale 1+2+...+(n−1)=n(n−1)/2 éléments : coût quadratique. Pour un tableau déjà trié, les décalages sont nuls et le parcours est linéaire.'
        )
      ],
      examples: [
        e(
          'Une première insertion',
          '[5,2,4] à i=1',
          'Garder 2, décaler 5 à droite puis placer 2 au début.',
          '[2,5,4]'
        ),
        e('Continuer', '[2,5,4] à i=2', 'Garder 4, décaler 5, puis s’arrêter devant 2.', '[2,4,5]'),
        e(
          'Une frontière dangereuse',
          'while t[j]>valeur and j>=0',
          'Python lit t[j] avant de vérifier la borne ; un indice négatif désigne une case en fin de liste.',
          'Tester j>=0 avant t[j]>valeur.'
        )
      ],
      activity: a(
        'sort',
        'Prévois le préfixe trié après chaque insertion.',
        'Après la première insertion, les deux premières cases sont triées.',
        'Le modèle compte des étapes pédagogiques ; leur durée n’est pas une mesure de performance réelle.',
        { values: [5, 2, 4, 1], algorithm: 'insertion' }
      ),
      exercises: [
        q(
          'p-in1',
          'Une étape',
          'Après insertion de la valeur 3 dans le préfixe [2,7] du tableau [2,7,3], quel est le tableau ? Sépare ses valeurs par des virgules, sans espaces ni crochets.',
          '2,3,7',
          [
            'Garde 3 en mémoire.',
            'Décale 7 d’une case.',
            '2 est plus petit que 3 : place 3 après lui.'
          ],
          'Le préfixe [2,7] devient [2,3,7] après un seul décalage.',
          'Ne permute pas uniquement les extrêmes : insère à la position correcte.'
        ),
        p(
          'p-in2',
          'Programmer le tri',
          'Écris tri_insertion(tab) qui renvoie une copie triée, sans utiliser sorted ni sort.',
          'tri_insertion',
          'tab',
          'def tri_insertion(tab):\n    resultat = list(tab)\n    for i in range(1,len(resultat)):\n        valeur=resultat[i]\n        j=i-1\n        while j>=0 and resultat[j]>valeur:\n            resultat[j+1]=resultat[j]\n            j-=1\n        resultat[j+1]=valeur\n    return resultat',
          [t([[5, 2, 4, 1]], [1, 2, 4, 5]), t([[]], []), t([[3, 3, -1]], [-1, 3, 3])],
          [
            'Copie tab avant tout déplacement.',
            'Conserve la valeur courante avant de la remplacer.',
            'Après les décalages, insère à j+1.'
          ],
          'Le préfixe trié grandit d’une case par étape et les éléments égaux ne sont pas déplacés devant la valeur gardée.',
          'Si une valeur disparaît, vérifie que tu l’as mémorisée avant les décalages.'
        ),
        p(
          'p-in3',
          'Compter le pire cas',
          'Écris decalages_inverse(n), n>=0, qui renvoie le nombre total de décalages du tri par insertion d’un tableau strictement décroissant de n valeurs.',
          'decalages_inverse',
          'n',
          'def decalages_inverse(n):\n    total=0\n    for i in range(1,n):\n        total+=i\n    return total',
          [t([4], 6), t([1], 0), t([0], 0), t([10], 45)],
          [
            'À l’étape i, tous les i éléments précédents sont décalés.',
            'Additionne de 1 à n−1.',
            'La formule de vérification est n*(n−1)//2.'
          ],
          'La somme des préfixes successifs explique le terme quadratique ; doubler n multiplie approximativement ce travail par quatre.',
          'n*n surestime le compte exact même s’il indique le bon ordre de grandeur.'
        )
      ],
      reflection: 'Pourquoi l’invariant doit-il aussi dire que les valeurs sont conservées ?',
      review: [
        'Je réalise une insertion.',
        'J’explique initialisation et conservation de l’invariant.',
        'Je relie les décalages au coût quadratique.'
      ]
    }),
    lesson({
      id: 'premiere-selection',
      title: 'Trier par sélection et justifier le minimum restant',
      duration: 40,
      prerequisites: ['Recherche de minimum et échanges.'],
      objectives: [
        'Sélectionner le minimum d’un suffixe.',
        'Prouver le tri et comparer les coûts.'
      ],
      official: ['P-A4', 'P-A5'],
      sections: [
        s(
          'Choisir le prochain élément',
          'À l’étape i, on cherche l’indice du plus petit élément dans les cases i à n−1. On échange ensuite cet élément avec la case i. On effectue un échange après la recherche complète, pas une succession d’échanges au hasard de chaque comparaison.'
        ),
        s(
          'Un invariant plus fort',
          'Au début de l’étape i, le préfixe de longueur i est trié, contient les i plus petites valeurs, et chaque élément de ce préfixe est inférieur ou égal à ceux du suffixe. Sélectionner le minimum restant prolonge ce préfixe et l’échange conserve toutes les valeurs. L’invariant est vrai pour le préfixe vide puis couvre tout le tableau.'
        ),
        s(
          'Terminaison et coût',
          'Les deux boucles sont bornées : i augmente jusqu’à n−2 et la recherche interne visite un suffixe fini. Le nombre de comparaisons vaut (n−1)+(n−2)+...+1, que le tableau soit déjà trié ou non. Le coût est donc quadratique même pour une entrée triée, contrairement au meilleur cas de l’insertion.'
        )
      ],
      examples: [
        e(
          'Premier minimum',
          '[5,2,4,1]',
          'Le minimum global est 1 en position 3 ; échanger avec la position 0.',
          '[1,2,4,5]'
        ),
        e(
          'Étape sans échange utile',
          '[1,2,4,5] à i=1',
          'Le minimum du suffixe [2,4,5] est déjà à la position 1.',
          'Le tableau reste inchangé.'
        ),
        e(
          'Un préfixe insuffisant',
          '[2,4,1,3] : préfixe [2,4] trié',
          'Ce préfixe est trié mais ne contient pas les deux plus petites valeurs ; cela ne suffit pas pour l’invariant de sélection.',
          'Il manque la propriété « plus petites valeurs ».'
        )
      ],
      activity: a(
        'sort',
        'Trouve d’abord l’indice du minimum avant de prévoir l’échange.',
        'Le premier échange place 1 au début.',
        'Le modèle illustre la sélection ; il ne donne pas un classement absolu des temps d’exécution des tris.',
        { values: [5, 2, 4, 1], algorithm: 'selection' }
      ),
      exercises: [
        q(
          'p-se1',
          'Compter les comparaisons',
          'Combien de comparaisons de valeurs effectue la sélection sur 5 éléments avec des suffixes de tailles 5,4,3,2 ?',
          10,
          [
            'Chercher le minimum de m valeurs demande m−1 comparaisons.',
            'Additionne 4+3+2+1.',
            'Les échanges ne sont pas demandés.'
          ],
          'La somme vaut 10, indépendamment de l’ordre initial.',
          'Ne compte pas une comparaison de plus pour la dernière valeur déjà connue.'
        ),
        p(
          'p-se2',
          'Indice du minimum restant',
          'Écris indice_minimum(tab,debut) qui renvoie l’indice du premier minimum parmi debut..len(tab)−1, avec 0<=debut<len(tab).',
          'indice_minimum',
          'tab, debut',
          'def indice_minimum(tab, debut):\n    indice=debut\n    for j in range(debut+1,len(tab)):\n        if tab[j]<tab[indice]:\n            indice=j\n    return indice',
          [t([[1, 5, 2, 2], 1], 2), t([[4], 0], 0), t([[0, -2, 3], 0], 1)],
          [
            'Initialise le candidat à debut.',
            'Compare tab[j] avec tab[indice].',
            'Une comparaison stricte conserve le premier minimum en cas d’égalité.'
          ],
          'L’indice candidat désigne le minimum des cases déjà visitées du suffixe.',
          'Retourner la valeur minimale ne convient pas : on demande sa position pour échanger.'
        ),
        p(
          'p-se3',
          'Programmer la sélection',
          'Écris tri_selection(tab) qui renvoie une copie triée sans sorted ni sort.',
          'tri_selection',
          'tab',
          'def tri_selection(tab):\n    resultat=list(tab)\n    for i in range(len(resultat)-1):\n        minimum=i\n        for j in range(i+1,len(resultat)):\n            if resultat[j]<resultat[minimum]:\n                minimum=j\n        resultat[i],resultat[minimum]=resultat[minimum],resultat[i]\n    return resultat',
          [t([[4, 1, 3, 2]], [1, 2, 3, 4]), t([[]], []), t([[2, 2, -1]], [-1, 2, 2])],
          [
            'Cherche le minimum du suffixe pour chaque position i.',
            'Garde son indice, pas seulement sa valeur.',
            'Échange après la boucle intérieure avec une affectation simultanée.'
          ],
          'Chaque étape fixe une position définitive du préfixe ; le tableau vide ne déclenche aucune recherche.',
          'Un échange avec deux affectations naïves peut écraser une valeur : utilise une variable temporaire ou une affectation simultanée.'
        )
      ],
      reflection:
        'Pourquoi un tableau déjà trié ne réduit-il pas le nombre de comparaisons de la sélection ?',
      review: [
        'Je trouve le minimum d’un suffixe.',
        'Je formule l’invariant complet de sélection.',
        'Je justifie la terminaison des boucles bornées.'
      ]
    }),
    lesson({
      id: 'premiere-dichotomie',
      title: 'Dichotomie et variant de boucle',
      duration: 45,
      prerequisites: ['Tableaux triés et division entière.'],
      objectives: [
        'Réduire un intervalle de recherche.',
        'Prouver la terminaison avec la longueur restante.'
      ],
      official: ['P-A7'],
      sections: [
        s(
          'Exploiter l’ordre',
          'La dichotomie exige un tableau trié dans l’ordre croissant. On compare la cible à une valeur médiane. Si la médiane est trop petite, toutes les cases à gauche sont trop petites aussi ; on élimine cette moitié. Sans l’hypothèse de tri, ce raisonnement est faux.'
        ),
        s(
          'Des bornes cohérentes',
          'Avec un intervalle fermé [gauche,droite], on commence à 0 et n−1. Le milieu vaut (gauche+droite)//2. Après comparaison, gauche=milieu+1 ou droite=milieu−1 élimine la case testée. L’intervalle est vide lorsque gauche>droite.',
          'def contient(tab,cible):\n    gauche,droite=0,len(tab)-1\n    while gauche<=droite:\n        milieu=(gauche+droite)//2\n        if tab[milieu]==cible:\n            return True\n        if tab[milieu]<cible:\n            gauche=milieu+1\n        else:\n            droite=milieu-1\n    return False'
        ),
        s(
          'Une terminaison démontrable',
          'Tant que la boucle continue, droite−gauche+1 est un entier positif. Après une comparaison sans succès, cette longueur diminue strictement car la médiane est exclue : c’est un variant. Un entier positif ne peut pas diminuer indéfiniment. Environ log2(n) comparaisons suffisent dans le pire cas ; sur 1024 cases, il en faut au plus 11 pour cette version.'
        )
      ],
      examples: [
        e(
          'Trouver',
          '[1,3,5,7,9], cible 7',
          'Milieu 2 vaut 5 : garder [3,4] ; milieu 3 vaut 7.',
          'Indice 3 en deux comparaisons.'
        ),
        e(
          'Une absence',
          '[1,3,5], cible 4',
          'Après 3, garder [2,2] ; 5 est trop grand puis droite devient 1.',
          'Intervalle vide ; cible absente.'
        ),
        e(
          'Une boucle bloquée',
          'Remplacer gauche=milieu+1 par gauche=milieu',
          'Sur un intervalle d’une case trop petite, milieu=gauche ; la borne ne progresse plus.',
          'Le variant ne diminue plus : risque de non-terminaison.'
        )
      ],
      activity: a(
        'search',
        'Prévois la moitié éliminée à chaque comparaison.',
        'La cible 7 est trouvée après avoir éliminé les valeurs <=5.',
        'Le modèle suppose le tableau trié et des comparaisons cohérentes ; il ne trie pas gratuitement les données.',
        { values: [1, 3, 5, 7, 9], target: 7 }
      ),
      exercises: [
        q(
          'p-di1',
          'Choisir le variant',
          'Pour l’intervalle fermé [3,7], quelle est la valeur du variant droite−gauche+1 ?',
          5,
          ['Les bornes sont incluses.', 'Les indices sont 3,4,5,6,7.', 'Calcule 7−3+1.'],
          'La longueur vaut cinq ; droite−gauche seul compte les écarts entre indices.',
          'Le +1 est indispensable pour un intervalle fermé.'
        ),
        p(
          'p-di2',
          'Une recherche complète',
          'Écris dichotomie(tab,cible) sur un tableau trié croissant ; renvoie un indice de la cible ou −1.',
          'dichotomie',
          'tab, cible',
          'def dichotomie(tab, cible):\n    gauche,droite=0,len(tab)-1\n    while gauche<=droite:\n        milieu=(gauche+droite)//2\n        if tab[milieu]==cible:\n            return milieu\n        if tab[milieu]<cible:\n            gauche=milieu+1\n        else:\n            droite=milieu-1\n    return -1',
          [t([[1, 3, 5, 7, 9], 7], 3), t([[1, 3, 5], 4], -1), t([[], 2], -1), t([[2], 2], 0)],
          [
            'Utilise des bornes inclusives.',
            'Élimine toujours milieu quand il ne correspond pas.',
            'L’absence est décidée après la boucle.'
          ],
          'Si la cible existe, elle reste dans l’intervalle courant ; sa longueur positive décroît jusqu’au succès ou au vide.',
          'Teste un singleton absent pour détecter un +1 ou −1 manquant.'
        ),
        p(
          'p-di3',
          'Observer la diminution',
          'Écris longueurs(tab,cible) qui renvoie les longueurs des intervalles au début de chaque passage de la dichotomie, et s’arrête quand la cible est trouvée ou l’intervalle vide.',
          'longueurs',
          'tab, cible',
          'def longueurs(tab, cible):\n    gauche,droite=0,len(tab)-1\n    trace=[]\n    while gauche<=droite:\n        trace.append(droite-gauche+1)\n        milieu=(gauche+droite)//2\n        if tab[milieu]==cible:\n            break\n        if tab[milieu]<cible:\n            gauche=milieu+1\n        else:\n            droite=milieu-1\n    return trace',
          [t([[1, 3, 5, 7, 9], 7], [5, 2]), t([[1, 3, 5], 4], [3, 1]), t([[], 0], [])],
          [
            'Ajoute droite−gauche+1 avant de comparer.',
            'Conserve les mêmes règles de mise à jour que la recherche.',
            'Ne rajoute pas la longueur zéro après la sortie.'
          ],
          'La trace illustre la décroissance du variant ; la preuve vient de la suppression de la médiane à chaque échec.',
          'Si deux longueurs successives sont égales, vérifie l’exclusion de milieu.'
        )
      ],
      reflection:
        'Pourquoi observer quelques traces décroissantes ne remplace-t-il pas la preuve de terminaison ?',
      review: [
        'Je vérifie la précondition de tri.',
        'J’actualise des bornes cohérentes.',
        'Je démontre la décroissance du variant.'
      ]
    }),
    lesson({
      id: 'premiere-knn',
      title: 'Prédire par les k plus proches voisins',
      duration: 45,
      prerequisites: ['Tri selon une clé, dictionnaires et distances.'],
      objectives: [
        'Calculer des distances et sélectionner k voisins.',
        'Prédire une classe majoritaire en annonçant les conventions.'
      ],
      official: ['P-A6'],
      sections: [
        s(
          'Des exemples étiquetés',
          'Chaque observation d’apprentissage porte des caractéristiques numériques et une classe connue. Pour une observation nouvelle, k-NN cherche les exemples les plus proches puis effectue un vote. Le programme apprend au sens où ses décisions dépendent des exemples fournis ; il ne déduit pas une loi certaine.'
        ),
        s(
          'Distance puis vote',
          'Dans un plan, la distance euclidienne au carré vaut (x1−x2)**2+(y1−y2)**2. La racine carrée n’est pas nécessaire pour classer les distances. On trie les points, on garde les k premiers et on compte les classes. Il faut 1<=k<=nombre de points et une règle explicite pour les égalités.'
        ),
        s(
          'Des limites à discuter',
          'k trop petit rend la prédiction sensible au bruit ; trop grand peut effacer des groupes locaux. Une caractéristique exprimée sur une échelle énorme peut dominer la distance. Les données doivent représenter le problème : une prédiction n’est ni une explication causale ni une certitude. Ici, un tri stable garde l’ordre initial pour les distances égales et le vote égal est départagé alphabétiquement.'
        )
      ],
      examples: [
        e(
          'Calculer',
          'Distance au carré de (1,2) à (4,6)',
          'Les différences sont 3 et 4 ; 9+16=25.',
          '25'
        ),
        e(
          'Voter',
          'Trois voisins de classes A,B,A',
          'Le compteur de A vaut 2 et celui de B vaut 1.',
          'Classe A.'
        ),
        e(
          'Égalité',
          'Deux voisins A et B avec k=2',
          'Aucune classe n’est strictement majoritaire ; sans convention, le résultat est ambigu.',
          'Avec départage alphabétique : A.'
        )
      ],
      activity: a(
        'knn',
        'Compare la prédiction pour k=1 puis k=3.',
        'La classe majoritaire des voisins peut changer quand k change.',
        'La carte utilise deux caractéristiques et une distance simplifiée ; elle ne valide pas la qualité d’un modèle réel.',
        {
          points: [
            { x: 1, y: 1, label: 'A' },
            { x: 2, y: 2, label: 'A' },
            { x: 4, y: 3, label: 'B' },
            { x: 5, y: 5, label: 'B' }
          ],
          target: { x: 3, y: 2 },
          k: 3
        }
      ),
      exercises: [
        q(
          'p-kn1',
          'Un vote local',
          'Les cinq plus proches voisins ont les classes B,A,B,B,A. Quelle classe est prédite ?',
          'B',
          ['Compte séparément A et B.', 'B apparaît trois fois.', 'A n’apparaît que deux fois.'],
          'Le vote majoritaire donne B avec trois voisins sur cinq.',
          'La classe du seul plus proche voisin ne suffit pas lorsque k vaut 5.'
        ),
        p(
          'p-kn2',
          'Une distance comparable',
          'Écris distance2(a,b) où a et b sont des couples de coordonnées ; renvoie la distance euclidienne au carré.',
          'distance2',
          'a, b',
          'def distance2(a, b):\n    return (a[0]-b[0])**2 + (a[1]-b[1])**2',
          [
            t(
              [
                [1, 2],
                [4, 6]
              ],
              25
            ),
            t(
              [
                [0, 0],
                [0, 0]
              ],
              0
            ),
            t(
              [
                [-1, 2],
                [2, -2]
              ],
              25
            )
          ],
          [
            'Calcule séparément les différences de coordonnées.',
            'Mets chaque différence au carré.',
            'Additionne les carrés sans racine carrée.'
          ],
          'La valeur n’est jamais négative et suffit à comparer les proximités.',
          'La somme des différences peut s’annuler : les carrés sont indispensables.'
        ),
        p(
          'p-kn3',
          'Une prédiction entière',
          'Écris predire(points,cible,k). Les points sont [x,y,classe] et cible=[x,y]. Trie par distance au carré, garde k voisins, compte les classes ; en égalité de vote, choisis la classe alphabétiquement première. Les distances égales gardent l’ordre d’entrée.',
          'predire',
          'points, cible, k',
          'def predire(points, cible, k):\n    assert 1 <= k <= len(points)\n    voisins = sorted(points, key=lambda p: (p[0]-cible[0])**2+(p[1]-cible[1])**2)\n    votes={}\n    for i in range(k):\n        classe=voisins[i][2]\n        votes[classe]=votes.get(classe,0)+1\n    return sorted(votes, key=lambda classe: (-votes[classe],classe))[0]',
          [
            t(
              [
                [
                  [0, 0, 'A'],
                  [1, 0, 'A'],
                  [3, 0, 'B']
                ],
                [2, 0],
                3
              ],
              'A'
            ),
            t(
              [
                [
                  [0, 0, 'B'],
                  [2, 0, 'A']
                ],
                [1, 0],
                2
              ],
              'A'
            ),
            t(
              [
                [
                  [0, 0, 'B'],
                  [2, 0, 'A']
                ],
                [1, 0],
                1
              ],
              'B'
            )
          ],
          [
            'sorted conserve l’ordre pour des clés de distance égales.',
            'Compte uniquement les k premiers points.',
            'Trie les classes par (-effectif,classe) pour appliquer le départage.'
          ],
          'La convention rend les tests reproductibles, y compris un vote égal ou des distances égales.',
          'Ne confonds pas départage des distances et départage des votes : les deux règles sont distinctes.'
        )
      ],
      reflection:
        'Pourquoi changer l’unité d’une caractéristique peut-il changer les voisins sans changer le phénomène étudié ?',
      review: [
        'Je calcule et compare des distances.',
        'Je réalise un vote sur k voisins.',
        'Je indique les conventions et limites du modèle.'
      ]
    }),
    lesson({
      id: 'premiere-gloutons',
      title: 'Choix gloutons et limites de l’optimalité',
      duration: 40,
      prerequisites: ['Boucles et division euclidienne.'],
      objectives: [
        'Exprimer un choix local.',
        'Comparer une solution gloutonne à un contre-exemple optimal.'
      ],
      official: ['P-A8'],
      sections: [
        s(
          'Un choix local irrévocable',
          'Un algorithme glouton choisit à chaque étape ce qui semble le meilleur immédiatement, sans revenir sur les décisions passées. Pour rendre de la monnaie, on peut prendre la plus grande pièce qui ne dépasse pas le reste à rendre, puis recommencer. La règle est simple, mais sa qualité dépend du problème.'
        ),
        s(
          'Une méthode ne prouve pas tout',
          'Avec les pièces 1,2,5 et la somme 8, le glouton donne 5+2+1. Avec 1,3,4 et la somme 6, il donne 4+1+1, alors que 3+3 utilise moins de pièces. Cet unique contre-exemple suffit à réfuter l’optimalité générale, même si beaucoup d’essais réussissent.'
        ),
        s(
          'Terminer et annoncer son contrat',
          'On suppose une réserve illimitée de chaque pièce et des valeurs entières strictement positives. En incluant 1, toute somme entière non négative est réalisable. Le reste diminue strictement après chaque pièce : il finit à zéro. Pour un sac à dos, choisir selon la valeur ou le rapport valeur/poids sont aussi des heuristiques différentes ; les objets indivisibles peuvent empêcher un optimum global.'
        )
      ],
      examples: [
        e(
          'Un rendu',
          'Pièces [5,2,1], somme 8',
          'Prendre 5, puis 2, puis 1.',
          '[5,2,1], trois pièces.'
        ),
        e(
          'Un contre-exemple',
          'Pièces [4,3,1], somme 6',
          'Glouton : 4 puis 1 puis 1 ; autre rendu : 3 puis 3.',
          'Trois pièces au lieu de deux.'
        ),
        e(
          'Un système incomplet',
          'Pièces [4,2], somme 3',
          'Après 2, le reste 1 ne peut être réalisé.',
          'Signaler l’impossibilité selon le contrat, sans boucle infinie.'
        )
      ],
      activity: a(
        'dynamic',
        'Compare les rendus de 6 avec les pièces 1,3,4 et explique le choix local du glouton.',
        'La solution minimale 3+3 bat la solution gloutonne 4+1+1.',
        'L’activité compare des possibilités ; la solution de programmation demandée reste gloutonne et ne prétend pas explorer tous les rendus.',
        { coins: [1, 3, 4], amount: 6 }
      ),
      exercises: [
        q(
          'p-gl1',
          'Suivre la règle',
          'Avec les pièces 10,5,2,1, combien de pièces choisit le glouton pour rendre 18 ?',
          4,
          ['Prends d’abord 10 ; le reste vaut 8.', 'Prends 5 puis 2.', 'Le reste final est 1.'],
          '10+5+2+1 utilise quatre pièces.',
          'Rends le reste à chaque étape, pas toujours la somme initiale.'
        ),
        p(
          'p-gl2',
          'Programmer le rendu',
          'Écris rendu(pieces,somme), avec somme>=0 et pièces entières positives contenant 1. Renvoie les pièces choisies dans l’ordre décroissant par la méthode gloutonne, réserve illimitée.',
          'rendu',
          'pieces, somme',
          'def rendu(pieces, somme):\n    resultat=[]\n    for piece in sorted(pieces, reverse=True):\n        while somme>=piece:\n            resultat.append(piece)\n            somme-=piece\n    return resultat',
          [t([[1, 2, 5], 8], [5, 2, 1]), t([[1, 3, 4], 6], [4, 1, 1]), t([[1, 2], 0], [])],
          [
            'Trie les pièces de la plus grande à la plus petite.',
            'Utilise une pièce tant qu’elle ne dépasse pas le reste.',
            'Soustrais chaque pièce effectivement ajoutée.'
          ],
          'Le reste est entier non négatif et diminue ; la pièce 1 assure qu’il finit à zéro. Cette terminaison ne prouve pas l’optimalité.',
          'Si tu renvoies [3,3] pour 6 avec 1,3,4, tu n’as pas suivi la règle gloutonne demandée.'
        ),
        p(
          'p-gl3',
          'Mesurer la qualité d’un rendu',
          'Écris ecart(glouton,reference) qui vérifie par assert que les deux listes de pièces rendent la même somme, puis renvoie le nombre de pièces supplémentaires de glouton par rapport à reference.',
          'ecart',
          'glouton, reference',
          'def ecart(glouton, reference):\n    assert sum(glouton)==sum(reference)\n    return len(glouton)-len(reference)',
          [
            t(
              [
                [4, 1, 1],
                [3, 3]
              ],
              1
            ),
            t(
              [
                [5, 2, 1],
                [5, 2, 1]
              ],
              0
            ),
            { args: [[4], [3]], expected: null, expectedError: 'AssertionError' }
          ],
          [
            'Compare les sommes avant le nombre de pièces.',
            'Le défaut mesuré est len(glouton)−len(reference).',
            'Une assertion signale deux montants différents.'
          ],
          'Un rendu de référence ne prouve un écart d’optimalité que si son optimalité est établie ; ici [3,3] est optimal pour 6 car une seule pièce de 6 n’existe pas.',
          'Comparer des nombres de pièces pour des sommes différentes n’a pas de sens.'
        )
      ],
      reflection:
        'Pourquoi un contre-exemple suffit-il à réfuter une affirmation d’optimalité pour tous les systèmes de pièces ?',
      review: [
        'Je décris un choix local précis.',
        'Je programme un glouton qui termine.',
        'Je distingue validité et optimalité.'
      ]
    })
  ]
};

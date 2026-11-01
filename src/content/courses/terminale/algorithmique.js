import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer,
  python,
  source
} from './helpers.js';

const tree = {
  value: 8,
  left: { value: 3, left: { value: 1 }, right: { value: 6 } },
  right: { value: 10 }
};
const graph = {
  nodes: [
    { id: 'A', label: 'A', x: 15, y: 45 },
    { id: 'B', label: 'B', x: 45, y: 15 },
    { id: 'C', label: 'C', x: 45, y: 75 },
    { id: 'D', label: 'D', x: 80, y: 45 }
  ],
  edges: [
    ['A', 'B', 1],
    ['A', 'C', 1],
    ['B', 'D', 1],
    ['C', 'D', 1]
  ],
  start: 'A',
  goal: 'D'
};

export default {
  id: 'algorithmique',
  title: 'Algorithmique',
  lessons: [
    lesson(
      'parcours-arbres',
      'Mesurer un arbre et le parcourir dans quatre ordres',
      ['T-G1', 'T-G2'],
      ['Arbre binaire, cas de base et récursivité'],
      [
        'Calculer taille et hauteur récursivement',
        'Tracer préfixe, infixe et suffixe',
        'Utiliser une file pour parcourir en largeur'
      ],
      [
        s(
          'Une définition qui devient un programme',
          'Avec None pour le vide et [valeur,gauche,droite] pour un nœud, taille(vide)=0 et taille(nœud)=1+taille(gauche)+taille(droite). Pour la hauteur comptée en nœuds, hauteur(vide)=0 et hauteur(nœud)=1+max(hauteur(gauche),hauteur(droite)). Le premier calcul additionne ; le second choisit le chemin le plus long. Tous deux visitent chaque nœud une fois.',
          'def mesures(arbre):\n    if arbre is None:\n        return (0, 0)\n    tg, hg = mesures(arbre[1])\n    td, hd = mesures(arbre[2])\n    return (1 + tg + td, 1 + max(hg, hd))'
        ),
        s(
          'Où placer la visite de la racine ?',
          'Le parcours préfixe visite racine, gauche puis droite ; l’infixe visite gauche, racine puis droite ; le suffixe visite gauche, droite puis racine. La récursion assure l’exploration des sous-arbres, mais la position de l’ajout de la racine change le résultat. Infixe n’est croissant que si l’arbre respecte en plus la propriété d’arbre binaire de recherche.'
        ),
        s(
          'En largeur avec une file',
          'Le parcours en largeur traite les nœuds niveau par niveau. On met la racine dans une file ; tant qu’elle n’est pas vide, on retire un nœud, le visite puis enfile ses enfants gauche et droit présents. Une pile donnerait une exploration en profondeur. Un deque évite le coût linéaire de pop(0) répété.',
          'from collections import deque\n\ndef largeur(arbre):\n    if arbre is None:\n        return []\n    file = deque([arbre])\n    resultat = []\n    while file:\n        valeur, gauche, droite = file.popleft()\n        resultat.append(valeur)\n        if gauche is not None:\n            file.append(gauche)\n        if droite is not None:\n            file.append(droite)\n    return resultat'
        )
      ],
      [
        e(
          'Quatre ordres',
          'Racine 8, gauche 3 avec enfants 1 et 6, droite 10.',
          'La place de la racine change dans les parcours profonds ; la file regroupe les niveaux.',
          'Préfixe 8,3,1,6,10 ; infixe 1,3,6,8,10 ; suffixe 1,6,3,10,8 ; largeur 8,3,10,1,6.'
        ),
        e(
          'Mesures distinctes',
          'Même arbre à cinq nœuds.',
          'On additionne tous les nœuds, mais le plus long chemin en contient trois.',
          'Taille 5, hauteur 3.'
        ),
        e(
          'Arbre vide',
          'None',
          'Les cas de base empêchent toute lecture d’enfant absent.',
          'Taille et hauteur 0 ; parcours [].'
        )
      ],
      a(
        'tree',
        'Prévois chaque ordre avant de suivre le parcours ; compare infixe et largeur.',
        'Quel ordre visite les deux enfants avant la racine ?',
        'Le dessin représente un arbre particulier. Un résultat infixe croissant dépend de ses valeurs ordonnées en ABR, pas du seul parcours.',
        { tree }
      ),
      [
        answer(
          '1. Identifier un ordre',
          'Quel parcours visite gauche, droite puis racine ? Réponds préfixe, infixe, suffixe ou largeur.',
          'suffixe',
          [
            'La racine est visitée en dernier.',
            'Préfixe la place en premier.',
            'Le nom suffixe évoque la fin.'
          ],
          'Le parcours suffixe attend les résultats des sous-arbres avant de visiter la racine, utile par exemple pour évaluer une expression.',
          'Place la visite de la racine sur une ligne, puis nomme l’ordre qui la met après les deux sous-arbres.'
        ),
        python(
          '2. Taille et hauteur en un passage',
          'Écris mesures(arbre) qui renvoie [taille,hauteur] avec hauteur du vide zéro et d’une feuille un.',
          'mesures',
          'def mesures(arbre):\n    pass',
          'def mesures(arbre):\n    if arbre is None:\n        return [0, 0]\n    tg, hg = mesures(arbre[1])\n    td, hd = mesures(arbre[2])\n    return [1 + tg + td, 1 + max(hg, hd)]',
          [
            [[null], [0, 0]],
            [[[8, [3, [1, null, null], [6, null, null]], [10, null, null]]], [5, 3]],
            [[[2, null, null]], [1, 1]]
          ],
          [
            'Traite None avant les indices.',
            'La taille additionne les deux sous-arbres et la racine.',
            'La hauteur prend le maximum des deux hauteurs puis ajoute un.'
          ],
          'Chaque appel renvoie les deux mesures pour éviter deux parcours séparés. La complexité temporelle est linéaire dans la taille.',
          'Additionner les hauteurs confond longueur d’un chemin et nombre de nœuds total. Teste un arbre à deux enfants.'
        ),
        python(
          '3. Trois parcours récursifs',
          'Écris parcours(arbre,ordre), avec ordre égal à pre, in ou post. Renvoie les valeurs dans l’ordre préfixe, infixe ou suffixe. Le vide renvoie [].',
          'parcours',
          'def parcours(arbre, ordre):\n    pass',
          'def parcours(arbre, ordre):\n    if arbre is None:\n        return []\n    v, g, d = arbre\n    gauche = parcours(g, ordre)\n    droite = parcours(d, ordre)\n    if ordre == "pre":\n        return [v] + gauche + droite\n    if ordre == "in":\n        return gauche + [v] + droite\n    return gauche + droite + [v]',
          [
            [
              [[2, [1, null, null], [3, null, null]], 'pre'],
              [2, 1, 3]
            ],
            [
              [[2, [1, null, null], [3, null, null]], 'in'],
              [1, 2, 3]
            ],
            [
              [[2, [1, null, null], [3, null, null]], 'post'],
              [1, 3, 2]
            ],
            [[null, 'in'], []]
          ],
          [
            'Calcule les parcours gauche et droit.',
            'Place [valeur] avant, entre ou après eux.',
            'Ne change pas l’ordre relatif gauche-droite.'
          ],
          'La même décomposition récursive donne trois ordres en déplaçant uniquement la visite de la racine. Les concaténations de listes sont pédagogiques et peuvent copier des éléments.',
          'Un parcours qui trie les valeurs au lieu de suivre l’arbre peut masquer une erreur. Vérifie le préfixe sur une racine intermédiaire.'
        )
      ],
      'Quel ordre choisir pour supprimer les enfants avant leur parent et quel ordre pour traiter les niveaux ?'
    ),

    lesson(
      'abr',
      'Arbre binaire de recherche : chercher et insérer',
      ['T-G3'],
      ['Arbres binaires et comparaisons de clés'],
      [
        'Utiliser la propriété globale d’un ABR',
        'Rechercher en éliminant un sous-arbre',
        'Insérer une clé sans perdre les clés existantes'
      ],
      [
        s(
          'Un invariant dans tous les sous-arbres',
          'Dans notre ABR sans doublons, toutes les clés du sous-arbre gauche sont strictement plus petites que la racine et toutes celles du droit strictement plus grandes. La règle s’applique récursivement. Comparer uniquement la racine à ses enfants immédiats ne suffit pas à vérifier la propriété globale. Le parcours infixe d’un tel arbre donne les clés dans l’ordre croissant.'
        ),
        s(
          'Rechercher sur un seul chemin',
          'Comparer la cible à la racine : égalité signifie trouvé ; plus petite conduit à gauche, plus grande à droite. Un sous-arbre vide prouve l’absence. On ne visite donc qu’un chemin de longueur au plus la hauteur. Si l’arbre est équilibré, cette hauteur est logarithmique ; une insertion de clés déjà triées peut produire une chaîne et un coût linéaire.',
          'def recherche(arbre, cle):\n    while arbre is not None:\n        valeur, gauche, droite = arbre\n        if cle == valeur:\n            return True\n        arbre = gauche if cle < valeur else droite\n    return False'
        ),
        s(
          'Insérer à la première place vide',
          'L’insertion suit les mêmes comparaisons que la recherche. Arriver au vide crée une feuille ; arriver sur une clé égale ne fait rien dans notre convention. Une fonction récursive peut renvoyer une nouvelle racine et reconstruire le chemin modifié. Il faut réaffecter le sous-arbre renvoyé, et conserver intact l’autre sous-arbre.'
        )
      ],
      [
        e(
          'Trouver 6',
          'Racine 8, gauche 3, enfant droit de 3 égal à 6.',
          '6<8 conduit à gauche, puis 6>3 à droite.',
          'Clé trouvée en trois comparaisons de nœuds.'
        ),
        e(
          'Insérer 4',
          'Même ABR, 6 a un sous-arbre gauche vide.',
          '4<8, 4>3, 4<6 : on crée une feuille à gauche de 6.',
          'L’infixe devient 1,3,4,6,8,10.'
        ),
        e(
          'Doublon',
          'Insérer à nouveau 8.',
          'La clé est déjà à la racine et la convention exclut les doublons.',
          'La taille ne change pas.'
        )
      ],
      a(
        'tree',
        'Suis les comparaisons pour chercher 6 puis prévois l’emplacement de 4.',
        'Pourquoi ne faut-il pas examiner le sous-arbre droit de 8 pour chercher 6 ?',
        'Le dessin est un ABR sans doublons. Tous les arbres binaires ne respectent pas l’invariant permettant cette élimination.',
        { tree }
      ),
      [
        answer(
          '1. Choisir un côté',
          'La racine d’un ABR vaut 20. Pour chercher 13, quel sous-arbre visiter : gauche ou droit ?',
          'gauche',
          [
            'Compare 13 et 20.',
            'La cible est strictement plus petite.',
            'L’invariant place ces clés dans le sous-arbre gauche.'
          ],
          'La propriété d’ABR exclut toutes les clés du sous-arbre droit, qui sont supérieures à 20.',
          'Ne choisis pas selon la forme du dessin. La comparaison des clés détermine le côté.'
        ),
        python(
          '2. Rechercher une clé',
          'Écris recherche(arbre,cle) sur None ou [valeur,gauche,droite], en suivant un seul sous-arbre à chaque comparaison.',
          'recherche',
          'def recherche(arbre, cle):\n    pass',
          'def recherche(arbre, cle):\n    while arbre is not None:\n        valeur, gauche, droite = arbre\n        if cle == valeur:\n            return True\n        if cle < valeur:\n            arbre = gauche\n        else:\n            arbre = droite\n    return False',
          [
            [[null, 5], false],
            [[[8, [3, null, [6, null, null]], [10, null, null]], 6], true],
            [[[8, [3, null, null], null], 4], false]
          ],
          [
            'Le vide signifie absent.',
            'Teste l’égalité avant de choisir un enfant.',
            'Ne cherche pas dans les deux sous-arbres.'
          ],
          'La recherche exploite l’invariant pour supprimer une partie de l’espace de recherche. Son coût dépend de la hauteur, pas seulement de la taille.',
          'Une récursion sur les deux enfants n’utilise pas l’avantage de l’ABR. Trace seulement les comparaisons nécessaires.'
        ),
        python(
          '3. Insérer sans doublon',
          'Écris inserer(arbre,cle) qui renvoie l’ABR après insertion. Ne crée aucun doublon. Une reconstruction des listes est autorisée.',
          'inserer',
          'def inserer(arbre, cle):\n    pass',
          'def inserer(arbre, cle):\n    if arbre is None:\n        return [cle, None, None]\n    valeur, gauche, droite = arbre\n    if cle < valeur:\n        return [valeur, inserer(gauche, cle), droite]\n    if cle > valeur:\n        return [valeur, gauche, inserer(droite, cle)]\n    return arbre',
          [
            [
              [null, 7],
              [7, null, null]
            ],
            [
              [[8, [3, null, null], null], 5],
              [8, [3, null, [5, null, null]], null]
            ],
            [
              [[8, null, null], 8],
              [8, null, null]
            ]
          ],
          [
            'Le vide devient une feuille.',
            'Reconstruis le parent en plaçant le résultat récursif du bon côté.',
            'Sur égalité, renvoie l’arbre inchangé.'
          ],
          'Le chemin de recherche mène à une place unique compatible avec l’invariant. L’autre sous-arbre est préservé et l’égalité respecte la convention sans doublon.',
          'Oublier de replacer le sous-arbre renvoyé fait perdre l’insertion. Vérifie un ajout à profondeur deux.'
        )
      ],
      'Que devient le coût de recherche si l’on insère dans l’ordre les clés 1,2,3,4,5 sans équilibrage ?'
    ),

    lesson(
      'parcours-graphes',
      'Graphes : profondeur, largeur, chemins et cycles',
      ['T-G4', 'T-G5', 'T-G6'],
      ['Listes d’adjacence, piles et files'],
      [
        'Distinguer parcours en profondeur et en largeur',
        'Reconstruire un chemin depuis les prédécesseurs',
        'Détecter un cycle sans confondre retour au parent'
      ],
      [
        s(
          'Visiter une seule fois',
          'Un parcours part d’un sommet et ne touche que sa composante accessible. En profondeur, on poursuit une branche avant de revenir ; une pile ou la récursion convient. En largeur, une file explore par distance en nombre d’arêtes. Un ensemble visités empêche les revisites et les boucles ; en largeur, on marque dès l’enfilage pour ne pas insérer plusieurs fois le même sommet.',
          'def profondeur(g, depart):\n    vus = set()\n    ordre = []\n    def visiter(u):\n        vus.add(u)\n        ordre.append(u)\n        for v in g[u]:\n            if v not in vus:\n                visiter(v)\n    visiter(depart)\n    return ordre'
        ),
        s(
          'Un chemin avec la largeur',
          'Lors de la première découverte de v depuis u, mémoriser parent[v]=u. Depuis la cible, on remonte ces parents jusqu’au départ puis on inverse la liste. Si la cible n’a jamais été découverte, aucun chemin n’existe depuis ce départ. Dans un graphe non pondéré, BFS fournit un chemin de longueur minimale ; ce n’est pas garanti pour la somme de poids variables.',
          'from collections import deque\n\ndef chemin(g, depart, cible):\n    parent = {depart: None}\n    file = deque([depart])\n    while file:\n        u = file.popleft()\n        for v in g[u]:\n            if v not in parent:\n                parent[v] = u\n                file.append(v)\n    if cible not in parent:\n        return []\n    resultat = []\n    u = cible\n    while u is not None:\n        resultat.append(u)\n        u = parent[u]\n    return resultat[::-1]'
        ),
        s(
          'Détecter le bon type de cycle',
          'Dans un graphe non orienté simple, voir un voisin déjà visité autre que le parent révèle un cycle. Le parent seul représente le retour normal sur l’arête empruntée. Pour un graphe orienté, ce critère ne convient pas : on utilise par exemple trois états, non vu, en cours, terminé ; un arc vers un sommet en cours révèle un cycle. Il faut lancer un parcours depuis chaque sommet non visité pour couvrir un graphe non connexe.'
        )
      ],
      [
        e(
          'Deux parcours',
          'A a pour voisins B,C ; B mène à D ; C mène à D.',
          'Avec voisins alphabétiques, DFS pousse une branche et BFS traite les voisins du départ.',
          'DFS : A,B,D,C ; BFS : A,B,C,D.'
        ),
        e(
          'Cible isolée',
          'A—B et sommet Z isolé.',
          'Le parcours de A ne découvre jamais Z.',
          'Aucun chemin A→Z.'
        ),
        e(
          'Le parent n’est pas un cycle',
          'Deux sommets A—B seulement.',
          'Depuis B, revoir A est le retour de l’arête d’arrivée.',
          'Pas de cycle dans ce graphe non orienté simple.'
        )
      ],
      a(
        'graph',
        'Compare profondeur et largeur sur le losange, puis recherche un chemin A-D.',
        'Pourquoi D ne doit-il être enfilé qu’une seule fois même si B et C le connaissent ?',
        'L’activité utilise des arêtes non orientées et des poids égaux. Les chemins minimaux en nombre d’arêtes ne résolvent pas les coûts pondérés d’OSPF.',
        graph
      ),
      [
        answer(
          '1. Lire une largeur',
          'Avec voisins ordonnés, A:[B,C], B:[D], C:[D], D:[], donne le parcours BFS de A, séparé par des virgules sans espaces.',
          'A,B,C,D',
          [
            'La file commence avec A.',
            'B puis C sont découverts depuis A.',
            'D, découvert depuis B, ne doit pas être ajouté deux fois.'
          ],
          'Le premier niveau est A, le suivant B,C, puis D. Marquer à la découverte évite le doublon par C.',
          'Un ordre A,B,D,C décrit la profondeur. Écris la file après chaque retrait.'
        ),
        python(
          '2. Chercher un chemin en largeur',
          'Écris chemin(g,depart,cible) sur un dictionnaire de listes de successeurs. Renvoie un chemin BFS, dans l’ordre des voisins fourni, ou [] si impossible. Si depart==cible, renvoie [depart].',
          'chemin',
          'def chemin(g, depart, cible):\n    pass',
          'from collections import deque\n\ndef chemin(g, depart, cible):\n    parent = {depart: None}\n    file = deque([depart])\n    while file:\n        u = file.popleft()\n        for v in g[u]:\n            if v not in parent:\n                parent[v] = u\n                file.append(v)\n    if cible not in parent:\n        return []\n    resultat = []\n    u = cible\n    while u is not None:\n        resultat.append(u)\n        u = parent[u]\n    return resultat[::-1]',
          [
            [
              [{ A: ['B', 'C'], B: ['D'], C: ['D'], D: [] }, 'A', 'D'],
              ['A', 'B', 'D']
            ],
            [[{ A: [], Z: [] }, 'A', 'Z'], []],
            [[{ A: [] }, 'A', 'A'], ['A']]
          ],
          [
            'Mémorise le parent à la découverte.',
            'Les clés du dictionnaire parent servent aussi de sommets visités.',
            'Remonte depuis la cible puis inverse la liste.'
          ],
          'La première découverte en largeur fournit un chemin minimal en nombre d’arcs. Le départ est découvert initialement et possède un parent None.',
          'La liste des sommets visités n’est pas forcément un chemin. Utilise les parents pour relier réellement les étapes.'
        ),
        python(
          '3. Détecter un cycle non orienté',
          'Écris cycle(g) sur un graphe non orienté simple (sans boucle ni arêtes multiples), éventuellement non connexe. Renvoie un booléen.',
          'cycle',
          'def cycle(g):\n    pass',
          'def cycle(g):\n    vus = set()\n    def visiter(u, parent):\n        vus.add(u)\n        for v in g[u]:\n            if v not in vus:\n                if visiter(v, u):\n                    return True\n            elif v != parent:\n                return True\n        return False\n    for u in g:\n        if u not in vus and visiter(u, None):\n            return True\n    return False',
          [
            [[{ A: ['B'], B: ['A'] }], false],
            [[{ A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B'] }], true],
            [[{ Z: [], A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B'] }], true],
            [[{}], false]
          ],
          [
            'Le parent doit être transmis dans la récursion.',
            'Un voisin déjà visité autre que le parent signale un cycle.',
            'Relance depuis chaque composante encore non visitée.'
          ],
          'Le retour vers le parent est normal dans un graphe non orienté ; une autre arête vers un sommet déjà visité ferme un cycle. La boucle extérieure couvre les composantes isolées.',
          'Le test « voisin déjà visité » seul déclare à tort une unique arête comme cycle. Ignore précisément le parent, pas tous les voisins visités.'
        )
      ],
      'Pourquoi la détection de cycles doit-elle annoncer si le graphe est orienté ou non orienté ?'
    ),

    lesson(
      'tri-fusion',
      'Diviser pour régner et tri fusion',
      ['T-G7'],
      ['Récursivité, listes et coût d’un parcours'],
      [
        'Séparer division, résolution et combinaison',
        'Fusionner deux listes déjà triées',
        'Expliquer le coût en n log2(n) du tri fusion'
      ],
      [
        s(
          'Trois étapes distinctes',
          'Diviser pour régner consiste à diviser un problème en sous-problèmes plus petits, les résoudre puis combiner leurs solutions. Pour le tri fusion, on coupe la liste en deux moitiés, on trie chaque moitié récursivement puis on les fusionne. Une liste de zéro ou un élément est déjà triée et constitue le cas de base.'
        ),
        s(
          'Fusionner en comparant les têtes',
          'Deux indices suivent les éléments non encore consommés des listes triées. Le plus petit est ajouté au résultat, puis seul son indice avance. Dès qu’une liste est épuisée, on ajoute le reste de l’autre. Sur égalité, choisir la gauche préserve l’ordre initial des éléments égaux : c’est la stabilité. Chaque élément est copié une fois pendant la fusion.',
          'def fusion(gauche, droite):\n    i = j = 0\n    resultat = []\n    while i < len(gauche) and j < len(droite):\n        if gauche[i] <= droite[j]:\n            resultat.append(gauche[i])\n            i += 1\n        else:\n            resultat.append(droite[j])\n            j += 1\n    return resultat + gauche[i:] + droite[j:]'
        ),
        s(
          'Compter par niveaux',
          'La division par deux crée environ log2(n) niveaux. À un niveau, les sous-listes contiennent ensemble n éléments et les fusions ont un coût total linéaire. Le tri atteint donc O(n log n), y compris dans le pire cas, contre O(n²) pour l’insertion dans son pire cas. L’implémentation par listes utilise une mémoire auxiliaire linéaire ; récursivité ne signifie pas mémoire constante.'
        )
      ],
      [
        e(
          'Fusion',
          '[1,4,7] et [2,4,8]',
          'On retire mentalement la plus petite tête, puis on recommence.',
          '[1,2,4,4,7,8]'
        ),
        e(
          'Deux niveaux',
          'Trier [4,1,3,2].',
          'Les couples donnent [1,4] et [2,3], puis la fusion les combine.',
          '[1,2,3,4]'
        ),
        e(
          'Cas limite',
          'Trier [] ou [5].',
          'Aucune division n’est nécessaire ; longueur <=1 suffit.',
          '[] et [5] restent inchangées.'
        )
      ],
      a(
        'sort',
        'Suis les divisions puis les fusions ; repère où deux sous-listes triées deviennent une seule.',
        'Pourquoi la fusion peut-elle comparer seulement les premières valeurs restantes ?',
        'Le modèle montre le mécanisme de fusion. Le chronométrage d’une petite animation ne mesure pas la complexité asymptotique.',
        { values: [5, 2, 4, 1], algorithm: 'merge' }
      ),
      [
        answer(
          '1. Nombre de divisions',
          'En divisant toujours en deux, combien de divisions successives réduisent une liste de 8 éléments à une liste de 1 élément ?',
          '3',
          [
            'Écris les tailles successives.',
            'Elles sont 8,4,2,1.',
            'Compte les transitions, pas les tailles.'
          ],
          'Trois divisions suffisent : c’est log2(8). Le nombre de niveaux explique le facteur logarithmique.',
          'Tu as peut-être compté le niveau initial comme une division. Compte les flèches 8→4→2→1.'
        ),
        python(
          '2. Fusionner sans trier à nouveau',
          'Écris fusion(g,d) pour deux listes croissantes d’entiers. Renvoie une liste croissante contenant tous les éléments, doublons compris. N’utilise ni sort ni sorted.',
          'fusion',
          'def fusion(g, d):\n    pass',
          'def fusion(g, d):\n    i = j = 0\n    r = []\n    while i < len(g) and j < len(d):\n        if g[i] <= d[j]:\n            r.append(g[i])\n            i += 1\n        else:\n            r.append(d[j])\n            j += 1\n    return r + g[i:] + d[j:]',
          [
            [
              [
                [1, 4, 7],
                [2, 4, 8]
              ],
              [1, 2, 4, 4, 7, 8]
            ],
            [[[], [1]], [1]],
            [[[], []], []]
          ],
          [
            'Deux indices avancent séparément.',
            'Ajoute la plus petite tête disponible.',
            'Après la boucle, ajoute les éléments non consommés.'
          ],
          'L’invariant est que r contient les plus petits éléments déjà consommés dans l’ordre. Les restes sont déjà triés et plus grands que les éléments sortis.',
          'Oublier les restes perd des valeurs quand une liste finit avant l’autre. Teste une entrée vide.'
        ),
        python(
          '3. Trier par fusion',
          'Écris tri_fusion(valeurs) en divisant, triant récursivement et fusionnant. Renvoie une nouvelle liste, sans sort ni sorted.',
          'tri_fusion',
          'def tri_fusion(valeurs):\n    pass',
          'def fusion(g, d):\n    i = j = 0\n    r = []\n    while i < len(g) and j < len(d):\n        if g[i] <= d[j]:\n            r.append(g[i])\n            i += 1\n        else:\n            r.append(d[j])\n            j += 1\n    return r + g[i:] + d[j:]\n\ndef tri_fusion(valeurs):\n    if len(valeurs) <= 1:\n        return list(valeurs)\n    m = len(valeurs) // 2\n    return fusion(tri_fusion(valeurs[:m]), tri_fusion(valeurs[m:]))',
          [
            [[[5, -1, 5, 2]], [-1, 2, 5, 5]],
            [[[]], []],
            [[[1]], [1]]
          ],
          [
            'Traite zéro et un élément dans le même cas de base.',
            'Le milieu vaut len(valeurs)//2.',
            'Les deux appels doivent être triés avant la fusion.'
          ],
          'Le cas de base couvre le vide ; chaque division diminue strictement la taille, puis la fusion restaure l’ordre global. Le contrat conserve les doublons.',
          'Fusionner les moitiés brutes suppose à tort qu’elles sont déjà triées. Trie récursivement les deux avant de combiner.'
        )
      ],
      'Pourquoi le tri fusion garde-t-il le même ordre de coût même lorsque la liste est initialement décroissante ?'
    ),

    lesson(
      'dynamique',
      'Programmation dynamique : mémoriser les sous-problèmes',
      ['T-G8'],
      ['Récursivité, tableaux et minimum'],
      [
        'Repérer des sous-problèmes recouvrants',
        'Construire une table dans un ordre de dépendances',
        'Comparer une décision gloutonne et un optimum dynamique'
      ],
      [
        s(
          'Le calcul répété coûte cher',
          'La définition F(n)=F(n-1)+F(n-2) répète les mêmes calculs dans deux branches récursives : F(n-2) revient plusieurs fois. Une mémoïsation conserve un résultat après son premier calcul ; une tabulation remplit les résultats du plus petit au plus grand. On échange de la mémoire contre moins de répétitions, sans changer la relation de récurrence.'
        ),
        s(
          'Une table de dépendances',
          'Pour Fibonacci, F(0)=0 et F(1)=1 ; calculer F(k) exige seulement les valeurs précédentes. Un tableau jusqu’à n donne un coût linéaire en nombre d’étapes et en cases. Si seule la dernière valeur est demandée, deux variables suffisent. La taille des grands entiers influence toutefois le coût réel des additions : on distingue ce coût du simple comptage d’étapes.',
          'def fibo(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a'
        ),
        s(
          'Un optimum de rendu de monnaie',
          'Pour un montant m et des pièces de valeurs positives, dp[0]=0 et dp[m]=1+min(dp[m-c]) pour les pièces c<=m dont le reste est possible. Remplir les montants croissants respecte les dépendances. Une valeur infinie indique l’impossibilité. Avec [1,3,4] et 6, le glouton prend 4+1+1 alors que le minimum est 3+3. Le coût est O(m*k) étapes pour k valeurs de pièces, avec O(m) cases.'
        )
      ],
      [
        e(
          'Recouvrement',
          'F(5) appelle F(4) et F(3) ; F(4) appelle aussi F(3).',
          'F(3) peut être mémorisé au lieu d’être recalculé.',
          'Une seule résolution par indice.'
        ),
        e(
          'Glouton battu',
          'Pièces [1,3,4], montant 6.',
          'Le plus gros choix immédiat ne donne pas forcément le minimum final.',
          'Deux pièces de 3, au lieu de trois pièces 4+1+1.'
        ),
        e(
          'Montant impossible',
          'Pièces [4,6], montant 3.',
          'Aucune pièce n’est utilisable et aucune combinaison ne peut atteindre 3.',
          'Résultat -1 dans le contrat de l’exercice.'
        )
      ],
      a(
        'dynamic',
        'Remplis les montants de zéro à six avec [1,3,4]. Compare avec le choix de la plus grande pièce.',
        'Quelle dépendance permet de calculer le meilleur résultat pour six ?',
        'Le modèle suppose un nombre illimité de chaque pièce et des valeurs entières positives. Un stock limité demanderait un autre état de programmation dynamique.',
        { coins: [1, 3, 4], amount: 6 }
      ),
      [
        answer(
          '1. Déjouer le glouton',
          'Avec les pièces 1,3,4 en quantité illimitée, quel est le nombre minimal de pièces pour rendre 6 ?',
          '2',
          [
            'Le choix 4 mène à 1+1.',
            'Essaie de commencer par 3.',
            'Deux pièces de 3 suffisent, et aucune pièce ne vaut 6.'
          ],
          'Trois plus trois donne une solution à deux pièces ; une pièce est impossible, donc deux est optimal.',
          'Le plus grand choix local donne trois pièces. Compare aussi les autres premiers choix.'
        ),
        python(
          '2. Fibonacci sans répétition',
          'Écris fibo(n) avec tabulation ou deux valeurs mémorisées, pour n naturel, avec F0=0 et F1=1. Évite la récursion naïve.',
          'fibo',
          'def fibo(n):\n    pass',
          'def fibo(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a',
          [
            [[0], 0],
            [[1], 1],
            [[10], 55],
            [[30], 832040]
          ],
          [
            'Mémorise deux termes consécutifs.',
            'L’affectation simultanée utilise les anciennes valeurs.',
            'Après n étapes, a contient F(n).'
          ],
          'Chaque nouveau terme est calculé une seule fois ; les deux cases suffisent si l’on n’a pas besoin de toute la suite.',
          'Mettre a=b puis b=a+b utilise a déjà modifié. Utilise l’affectation simultanée ou une variable temporaire.',
          source(
            'T3_Algorithmique/3.2_Programmation_dynamique',
            'Cours : Fibonacci, mémoïsation et programmation dynamique',
            'Mesure lente de F(40) remplacée par une implémentation à deux états et tests exacts ; discussion mémoire ajoutée.'
          )
        ),
        python(
          '3. Minimum de pièces',
          'Écris monnaie(pieces,montant), qui renvoie le nombre minimal de pièces (stock illimité), ou -1 si impossible. Les valeurs sont des entiers strictement positifs ; montant est naturel.',
          'monnaie',
          'def monnaie(pieces, montant):\n    pass',
          'def monnaie(pieces, montant):\n    inf = montant + 1\n    dp = [0] + [inf] * montant\n    for m in range(1, montant + 1):\n        for c in pieces:\n            if c <= m and dp[m-c] != inf:\n                dp[m] = min(dp[m], 1 + dp[m-c])\n    return -1 if dp[montant] == inf else dp[montant]',
          [
            [[[1, 3, 4], 6], 2],
            [[[4, 6], 3], -1],
            [[[], 0], 0],
            [[[], 5], -1]
          ],
          [
            'dp[0] vaut zéro.',
            'Pour chaque montant, essaie chaque dernière pièce possible.',
            'Conserve une sentinelle pour les montants inatteignables.'
          ],
          'Toutes les solutions finissent par une pièce c ; comparer leurs meilleurs restes couvre donc toutes les possibilités. La sentinelle montant+1 dépasse tout minimum réalisable avec des pièces positives.',
          'Une valeur initiale zéro pour tous les montants fait croire que tout est gratuit. Initialise les montants positifs comme impossibles.'
        )
      ],
      'Quel nouvel état faudrait-il mémoriser si chaque type de pièce n’était disponible qu’en quantité limitée ?'
    ),

    lesson(
      'boyer-moore',
      'Recherche textuelle et prétraitement de Boyer-Moore',
      ['T-G9'],
      ['Indices de chaînes et dictionnaires'],
      [
        'Comparer le motif de droite à gauche',
        'Prétraiter la dernière position des caractères',
        'Justifier un décalage sans manquer les chevauchements'
      ],
      [
        s(
          'Des alignements à éliminer',
          'La recherche naïve essaie chaque position où le motif tient dans le texte. Boyer-Moore compare de droite à gauche et utilise des informations prétraitées du motif pour éviter certains alignements impossibles. Après un échec à l’indice j du motif, le caractère du texte observé permet un décalage justifié ; on ne saute pas arbitrairement une longueur entière.'
        ),
        s(
          'Règle du mauvais caractère',
          'On construit dernier[c], dernière position de c dans le motif, ou -1 si absent. Lors d’un échec sur le caractère c à la position j, le décalage max(1,j-dernier[c]) aligne cette dernière occurrence ou dépasse le caractère absent. Le maximum avec un évite un recul ou un décalage nul. C’est la variante utilisant la règle du mauvais caractère ; l’algorithme complet peut aussi employer la règle du bon suffixe. Elle est distinguée ici de Horspool, qui choisit son décalage à partir du caractère en fin de fenêtre.',
          'def derniers(motif):\n    d = {}\n    for i, c in enumerate(motif):\n        d[c] = i\n    return d'
        ),
        s(
          'Succès, chevauchement et limites',
          'Après une occurrence complète, décaler d’une position conserve tous les chevauchements dans notre variante simple. Le motif vide est traité explicitement : dans le contrat choisi, il apparaît à toutes les frontières 0 à len(texte). Le motif plus long ne possède aucun alignement. Le prétraitement coûte un parcours du motif ; les gains dépendent ensuite des caractères rencontrés. Aucune preuve générale d’un coût sous-linéaire n’est exigée ni annoncée pour cette version.'
        )
      ],
      [
        e(
          'Caractère absent',
          'Motif ABCD ; échec en j=3 sur X absent.',
          'dernier[X]=-1 donc décalage=max(1,3-(-1)).',
          'Décalage de 4.'
        ),
        e(
          'Caractère présent',
          'Motif ABCA ; échec en j=2 sur B.',
          'La dernière position de B est 1 ; le décalage vaut 2-1.',
          'Décalage de 1.'
        ),
        e(
          'Chevauchements',
          'Texte AAAAA, motif AAA.',
          'Les occurrences commencent en 0,1,2 ; sauter trois après un succès en perdrait.',
          '[0,1,2]'
        )
      ],
      a(
        'text-search',
        'Compare les lettres depuis la droite et calcule chaque décalage avec la table du motif.',
        'Une occurrence trouvée permet-elle toujours de sauter la longueur complète du motif ?',
        'Le modèle illustre les alignements et la recherche d’un motif. Le cours précise la règle du mauvais caractère et les chevauchements ; il ne représente pas toutes les optimisations du Boyer-Moore complet.',
        { text: 'ABRACADABRA', pattern: 'ABRA' }
      ),
      [
        answer(
          '1. Calculer un décalage',
          'Avec motif ABCD et un échec à j=3 sur X absent du motif, quelle valeur donne max(1,j-dernier[X]) avec dernier[X]=-1 ?',
          '4',
          [
            'Remplace j par trois.',
            'Un caractère absent a pour position moins un.',
            'Soustraire moins un ajoute un.'
          ],
          'Le décalage vaut max(1,3+1)=4 ; aucun alignement intermédiaire ne peut couvrir ce X avec le motif.',
          'Ne remplace pas un caractère absent par zéro : zéro est une vraie position du motif.'
        ),
        python(
          '2. Prétraiter le motif',
          'Écris derniers(motif), dictionnaire de chaque caractère vers son dernier indice. Inclue ici le dernier caractère du motif : nous utilisons la règle du mauvais caractère, pas la table de Horspool.',
          'derniers',
          'def derniers(motif):\n    pass',
          'def derniers(motif):\n    d = {}\n    for i, c in enumerate(motif):\n        d[c] = i\n    return d',
          [
            [['ABRA'], { A: 3, B: 1, R: 2 }],
            [[''], {}],
            [['AAA'], { A: 2 }]
          ],
          [
            'Parcours les indices dans l’ordre croissant.',
            'Une nouvelle affectation remplace l’ancien indice.',
            'Une chaîne vide donne un dictionnaire vide.'
          ],
          'La mise à jour conserve la dernière occurrence. Le choix d’inclure tout le motif correspond à la formule j-dernier[c] utilisée ensuite.',
          'Ne conserve pas seulement la première occurrence. Teste un motif dont le premier caractère revient à la fin.',
          source(
            'T3_Algorithmique/3.3_Recherche_textuelle',
            'Cours : fonction préparatoire dico_lettres, exercice 4',
            'Table adaptée de la variante présentée : dernier caractère inclus pour la règle du mauvais caractère ; distinction explicite avec Horspool et nouveaux tests.'
          )
        ),
        python(
          '3. Rechercher par mauvais caractère',
          'Écris occurrences(texte,motif) avec comparaisons de droite à gauche et décalage max(1,j-dernier[c]) après échec. Renvoie tous les indices, chevauchements inclus. Le motif vide correspond à toutes les frontières du texte.',
          'occurrences',
          'def occurrences(texte, motif):\n    pass',
          'def occurrences(texte, motif):\n    n, m = len(texte), len(motif)\n    if m == 0:\n        return list(range(n + 1))\n    dernier = {c: i for i, c in enumerate(motif)}\n    resultat = []\n    i = 0\n    while i <= n - m:\n        j = m - 1\n        while j >= 0 and texte[i+j] == motif[j]:\n            j -= 1\n        if j < 0:\n            resultat.append(i)\n            i += 1\n        else:\n            i += max(1, j - dernier.get(texte[i+j], -1))\n    return resultat',
          [
            [
              ['ABRACADABRA', 'ABRA'],
              [0, 7]
            ],
            [
              ['AAAAA', 'AAA'],
              [0, 1, 2]
            ],
            [['ABC', 'Z'], []],
            [['A', 'AB'], []],
            [
              ['AB', ''],
              [0, 1, 2]
            ]
          ],
          [
            'Prépare le dictionnaire des dernières positions une seule fois.',
            'Commence j à len(motif)-1 et diminue pendant les égalités.',
            'Après succès, avance de un ; après échec, applique la formule et avance au moins de un.'
          ],
          'La comparaison inversée révèle un caractère incompatible ; le prétraitement permet alors un saut sûr. Le traitement séparé du vide et l’avancée de un après succès protègent les cas limites.',
          'Un saut systématique de la longueur du motif perd les chevauchements. Teste AAAAA avec AAA puis vérifie le dernier alignement possible.'
        )
      ],
      'Pourquoi payer un prétraitement du motif peut-il faire gagner du travail lors de la recherche dans un long texte ?'
    )
  ]
};

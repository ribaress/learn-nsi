import { pedagogy, pause } from './pedagogy-utils.js';

export default {
  'parcours-arbres': pedagogy({
    program: [
      'Lire un parcours préfixe complet',
      'Le vide rend une liste vide avant tout accès. Pour un nœud, [arbre[0]] place sa valeur seule dans une nouvelle liste. Le signe + concatène ici des listes : on ajoute ensuite le parcours gauche puis le parcours droit. Les appels portent sur des sous-arbres strictement plus petits, ce qui rejoint le vide dans un arbre fini. Déplacer [arbre[0]] entre les deux appels donnerait l’infixe ; le placer après donnerait le suffixe.',
      'def prefixe(arbre):\n    if arbre is None:\n        return []\n    gauche = prefixe(arbre[1])\n    droite = prefixe(arbre[2])\n    return [arbre[0]] + gauche + droite'
    ],
    intro: [
      'Un dossier contient des sous-dossiers. Tu peux examiner chaque dossier avant son contenu, après son contenu ou niveau après niveau.',
      'Comment visiter toute une hiérarchie en choisissant un ordre précis, et comment compter ses éléments sans confondre taille et hauteur ?',
      'Les parcours d’arbres organisent l’exploration d’une hiérarchie ; leurs traces rendent visibles les appels récursifs et l’usage d’une file.'
    ],
    journey: [
      'Reconstituer un arbre avec racine et enfants.',
      'Mesurer en additionnant ou en choisissant un maximum.',
      'Déplacer la visite de la racine pour changer l’ordre.',
      'Utiliser une file pour examiner les niveaux.'
    ],
    recap: [
      [
        'Arbre binaire',
        'Un arbre part d’une racine ; chaque nœud possède ici au plus deux enfants distingués en gauche et droite.',
        '[8,[3,None,None],[10,None,None]] a la racine 8 et deux feuilles 3 et 10.'
      ],
      [
        'Représentation et absence',
        'Une liste [valeur,gauche,droite] décrit un nœud ; les indices 0, 1 et 2 désignent ces trois positions ; None désigne le vide.',
        'arbre[1] lit le sous-arbre gauche et peut renvoyer None.'
      ],
      [
        'Récursion et file',
        'La récursion appelle le même traitement sur une partie plus petite ; une file retire le plus ancien élément ajouté.',
        'Traiter le sous-arbre gauche répète le travail sur un arbre plus petit ; une file conserve les nœuds en attente.'
      ]
    ],
    life: [
      [
        'Compter des dossiers',
        'Tu veux connaître le nombre total de dossiers d’un projet et son imbrication la plus profonde.',
        'La taille additionne tous les nœuds ; la hauteur conserve seulement le chemin le plus long.',
        'Des raccourcis peuvent créer des liens multiples ou des boucles ; notre modèle suppose une véritable hiérarchie sans ces liens.'
      ],
      [
        'Explorer par étages',
        'Une équipe inspecte les espaces d’un bâtiment en finissant tous les espaces d’un niveau avant de descendre plus loin.',
        'Une file conserve les éléments découverts et les traite dans cet ordre, comme le parcours en largeur.',
        'Les étages physiques ne sont pas nécessairement un arbre ; l’exemple suppose une hiérarchie d’accès déjà modélisée.'
      ]
    ],
    sections: [
      [
        'Reconstruire l’arbre avant de calculer',
        'Un nœud conserve une valeur et ses sous-arbres. Prenons la racine 8, sa gauche 3, sa droite 10, puis les enfants 1 et 6 de 3. Les nœuds sans enfant sont des feuilles. Une fonction récursive reçoit un arbre, traite d’abord le vide, puis rappelle le même travail sur gauche et droite. return transmet le résultat de chaque appel ; sans cas vide, on tenterait de lire des enfants qui n’existent pas.'
      ],
      [
        'Taille et hauteur utilisent deux opérations',
        'Le vide a taille zéro et hauteur zéro. Pour un nœud, la taille vaut un pour lui-même plus les deux tailles : pour 8, on obtient 1 + 3 + 1 = 5. La hauteur est comptée en nœuds et choisit le plus long côté : 1 + max(2,1) = 3 ; max sélectionne la plus grande valeur. En code, tg et td peuvent nommer les tailles gauche et droite, hg et hd leurs hauteurs.',
        pause(
          'Pour la hauteur, faut-il additionner la hauteur gauche et la hauteur droite ?',
          'Non, on garde la plus grande puis on ajoute la racine.',
          'Oui, les deux branches forment un seul chemin.',
          'Un chemin racine-feuille descend d’un seul côté à la fois. Additionner les deux branches compterait des nœuds qu’un même chemin ne traverse pas.'
        )
      ],
      [
        'Trois ordres profonds, une même exploration',
        'Visiter signifie ici ajouter la valeur au résultat. Préfixe ajoute la racine AVANT gauche puis droite. Infixe traite gauche, ajoute la racine, puis traite droite. Suffixe traite gauche puis droite, et ajoute la racine APRÈS. Sur une racine 8 avec feuilles 3 et 10, on obtient respectivement [8,3,10], [3,8,10] et [3,10,8]. Le même choix est répété dans chaque sous-arbre.'
      ],
      [
        'Dérouler le grand exemple',
        'En préfixe, écrivons 8, puis visitons 3 avant ses feuilles 1 et 6, puis 10 : 8,3,1,6,10. En infixe, la gauche de 3 donne 1, puis 3, puis 6 ; ensuite viennent 8 puis 10 : 1,3,6,8,10. En suffixe, 1 et 6 précèdent 3, puis 10 précède 8 : 1,6,3,10,8. L’infixe n’est croissant que si une règle de recherche ordonne en plus les valeurs de l’arbre.'
      ],
      [
        'La file produit les niveaux',
        'Plaçons 8 dans une file. Son retrait l’ajoute au résultat puis enfile 3 et 10. Le retrait de 3 ajoute ensuite 1 et 6 derrière 10 : la file devient [10,1,6]. On retire donc 10 avant 1 et 6 : résultat 8,3,10,1,6. deque est une file fournie par le module collections ; append ajoute à droite et popleft retire à gauche sans décaler tout un tableau à chaque retrait.',
        pause(
          'Après avoir traité 8 puis 3, pourquoi visiter 10 avant 1 ?',
          '10 attendait déjà avant les enfants de 3.',
          'Parce que 10 est toujours la plus grande valeur.',
          'La largeur dépend de l’ordre de découverte dans la file, pas de la valeur numérique. Les enfants de 3 sont ajoutés derrière 10, déjà en attente.'
        )
      ]
    ],
    reasoning: [
      'En préfixe, note chaque racine avant ses enfants : 8,3,1,6,10. En infixe, note-la entre gauche et droite : 1,3,6,8,10. En suffixe, note-la après : 1,6,3,10,8. Pour la largeur, la file contient après 8 les nœuds 3,10, puis après 3 les nœuds 10,1,6 : on obtient 8,3,10,1,6.',
      'Compte tous les nœuds : 8,3,1,6,10, soit cinq. Cherche ensuite seulement le chemin le plus long : 8,3,1 et 8,3,6 contiennent chacun trois nœuds. La taille additionne les deux parties, mais la hauteur choisit la plus profonde : cinq et trois répondent à deux mesures différentes.',
      'None signifie aucun nœud. Le cas de base de chaque fonction répond avant de lire des attributs ou indices : taille zéro, hauteur zéro. Pour un parcours, aucune valeur n’est ajoutée au résultat ; on renvoie donc une liste vide.'
    ]
  }),
  abr: pedagogy({
    program: [
      'Écrire la recherche sur un chemin',
      'La boucle conserve dans arbre le sous-arbre encore possible. Les trois positions de la liste sont décomposées dans valeur, gauche et droite. Si cle égale valeur, True annonce la réussite. Sinon un test choisit un seul côté. La boucle continue avec ce sous-arbre ; lorsqu’il devient None, aucun candidat ne reste et False annonce l’absence. La fonction suppose l’invariant ABR vrai : elle ne vérifie pas le rangement avant chaque recherche.',
      'def contient(arbre, cle):\n    while arbre is not None:\n        valeur, gauche, droite = arbre\n        if cle == valeur:\n            return True\n        if cle < valeur:\n            arbre = gauche\n        else:\n            arbre = droite\n    return False'
    ],
    intro: [
      'Dans un rangement, chaque étiquette te dit de chercher à gauche si ton nombre est plus petit, à droite s’il est plus grand.',
      'Quelle règle doit être vraie dans tout le rangement pour éliminer un côté sans risquer d’y laisser la valeur cherchée ?',
      'Un arbre binaire de recherche permet de suivre un seul chemin et d’insérer une valeur tout en préservant une règle globale.'
    ],
    journey: [
      'Revoir racine, sous-arbres et comparaisons.',
      'Imposer une règle à toutes les valeurs d’un côté.',
      'Suivre une recherche de 6 étape par étape.',
      'Insérer à la première place vide et étudier la hauteur.'
    ],
    recap: [
      [
        'Arbre et sous-arbre',
        'Un arbre binaire possède une racine et deux sous-arbres éventuels, gauche et droit ; None représente le vide.',
        'Dans [8,[3,None,None],[10,None,None]], gauche contient 3 et droite contient 10.'
      ],
      [
        'Comparaison',
        'Le signe < signifie strictement plus petit, > strictement plus grand et == égal en Python.',
        '6 < 8 est vrai ; 6 > 3 est vrai ; 6 == 6 est vrai.'
      ],
      [
        'Récursion et invariant',
        'La récursion répète un traitement sur un cas plus petit ; un invariant est une règle qui doit rester vraie.',
        'L’insertion dans un sous-arbre doit conserver le tri de toutes ses valeurs, pas seulement celui de sa racine.'
      ]
    ],
    life: [
      [
        'Rangement avec panneaux de choix',
        'À chaque embranchement, un panneau dirige les petits numéros à gauche et les grands à droite.',
        'La recherche peut abandonner un côté entier si toutes les valeurs de ce côté respectent le panneau.',
        'Sans vérification de tout le sous-rangement, un numéro mal placé peut devenir introuvable malgré des panneaux localement corrects.'
      ],
      [
        'Construire un index',
        'Une application ajoute progressivement des numéros de fiches pour les retrouver par comparaisons.',
        'Les insertions créent des feuilles et la forme obtenue détermine le nombre de comparaisons nécessaires.',
        'Les index réels peuvent employer d’autres arbres et des rééquilibrages ; notre ABR simple n’effectue pas ces corrections automatiquement.'
      ]
    ],
    sections: [
      [
        'La règle porte sur tout un côté',
        'ABR signifie arbre binaire de recherche. Chaque nœud possède une clé, ici un nombre. Toutes les clés de son sous-arbre gauche doivent être strictement plus petites ; toutes celles du droit strictement plus grandes. La même règle vaut à chaque nœud. Nous refusons les doublons : une clé égale ne crée rien. Comparer seulement les enfants directs ne suffit pas à contrôler un descendant mal placé.'
      ],
      [
        'Chercher en éliminant une partie',
        'Cherchons 6 dans un arbre de racine 8, avec 3 à gauche et 6 à droite de 3. D’abord 6 < 8 : le côté droit entier est impossible. À 3, 6 > 3 : son côté gauche est impossible. À 6, l’égalité prouve la présence. Les lettres cle et valeur peuvent nommer la cible et la clé du nœud courant. Si le chemin atteint None, aucune position possible ne reste.',
        pause(
          'Pourquoi peut-on ignorer tout le côté droit de 8 en cherchant 6 ?',
          'Toutes ses clés sont supérieures à 8.',
          'Seul son premier enfant est trop grand.',
          'L’invariant concerne chaque descendant du sous-arbre droit. Comme 6 est inférieur à 8, aucun de ces descendants ne peut contenir la cible.'
        )
      ],
      [
        'Insérer en suivant le même chemin',
        'Pour ajouter 4, compare à 8 : 4 est plus petit, donc gauche. Compare à 3 : 4 est plus grand, donc droite. Compare à 6 : 4 est plus petit, donc gauche. Cette place est vide : on crée une feuille [4,None,None]. Les décisions précédentes garantissent que 4 est à la fois inférieur à 8, supérieur à 3 et inférieur à 6. L’invariant est ainsi conservé dans tout le chemin.'
      ],
      [
        'Renvoyer la racine après une insertion récursive',
        'Une fonction récursive peut recevoir un arbre et renvoyer l’arbre après insertion. Dans le vide, elle renvoie la nouvelle feuille. Sinon elle insère dans le bon sous-arbre et réaffecte ce côté au résultat renvoyé, puis renvoie la racine. Les positions de [valeur,gauche,droite] sont 0,1,2. Oublier de récupérer le sous-arbre renvoyé peut perdre une feuille nouvellement créée. Sur égalité, on conserve simplement l’arbre.',
        pause(
          'Dans notre convention, insérer une seconde fois la clé 8 doit-il augmenter la taille ?',
          'Non, une clé égale est déjà présente.',
          'Oui, chaque appel ajoute obligatoirement un nœud.',
          'La convention exclut les doublons. Rencontrer la clé recherchée termine l’insertion sans créer de nouvelle feuille.'
        )
      ],
      [
        'La forme décide du coût',
        'La hauteur compte ici les nœuds du chemin le plus long. Une recherche visite au plus cette quantité de nœuds. Dans un arbre équilibré, chaque choix réduit fortement le nombre de candidats ; la hauteur est de l’ordre de log2(n), nombre de divisions par deux nécessaires pour réduire n valeurs. Mais insérer 1,2,3,4 produit une chaîne : il faut alors parfois visiter n nœuds. L’ABR simple ne garantit donc pas une recherche rapide dans tous les cas.'
      ]
    ],
    reasoning: [
      'La cible 6 est comparée à 8 : elle est plus petite, on prend gauche. On compare ensuite à 3 : elle est plus grande, on prend droite. La troisième comparaison de nœud rencontre 6 et réussit. Aucun nœud des côtés éliminés ne pouvait contenir la cible si l’invariant est respecté.',
      'Partons de 8 : 4 < 8 impose gauche. À 3, 4 > 3 impose droite. À 6, 4 < 6 impose gauche ; cette place étant vide, on crée 4 comme feuille. Le parcours infixe place alors 4 entre 3 et 6 : 1,3,4,6,8,10.',
      'La première comparaison porte sur la racine 8. La nouvelle clé vaut aussi 8 : on atteint le cas égal. Notre contrat exclut les doublons ; l’insertion renvoie l’arbre tel quel, sans parcourir un côté ni ajouter de nœud. La taille est donc conservée.'
    ]
  }),
  'parcours-graphes': pedagogy({
    program: [
      'Une largeur avec marquage dès l’arrivée',
      'g est un dictionnaire sommet vers liste de voisins. {depart} crée un ensemble contenant le départ ; deque([depart]) crée la file, importée depuis collections. popleft retire le plus ancien sommet et ordre.append le visite. Un voisin est marqué avec add avant d’être enfilé, pour qu’une seconde découverte ne le remette pas en attente. Le test v not in vus signifie que v n’appartient pas encore à l’ensemble.',
      'from collections import deque\n\ndef largeur(g, depart):\n    vus = {depart}\n    file = deque([depart])\n    ordre = []\n    while file:\n        u = file.popleft()\n        ordre.append(u)\n        for v in g[u]:\n            if v not in vus:\n                vus.add(v)\n                file.append(v)\n    return ordre'
    ],
    intro: [
      'Pour visiter des lieux reliés, tu peux suivre une route aussi loin que possible ou explorer d’abord tous les voisins proches. Un carnet évite de visiter sans fin les mêmes lieux.',
      'Comment explorer un réseau sans boucler, retrouver un chemin et reconnaître un vrai cycle plutôt qu’un simple retour ?',
      'Les parcours de graphes traitent des itinéraires, des connexions et des dépendances ; leur fiabilité repose sur l’ordre des attentes et la mémorisation des découvertes.'
    ],
    journey: [
      'Définir sommets, voisins et chemins.',
      'Marquer les découvertes pour éviter les répétitions.',
      'Comparer profondeur et largeur sur un même réseau.',
      'Reconstituer un chemin et distinguer les cycles.'
    ],
    recap: [
      [
        'Graphe',
        'Un graphe décrit des sommets reliés ; une arête est sans sens, un arc possède un départ et une arrivée.',
        'A—B permet les deux directions ; A vers B ne garantit pas B vers A.'
      ],
      [
        'Pile et file',
        'Une pile retire le dernier arrivé ; une file retire le premier encore en attente.',
        'La profondeur peut employer une pile ; la largeur emploie une file.'
      ],
      [
        'Ensemble et dictionnaire',
        'Un ensemble conserve des valeurs sans répétition ; un dictionnaire associe une clé à une valeur.',
        'vus peut contenir A et B ; parent[B] = A mémorise depuis quel sommet B a été découvert.'
      ]
    ],
    life: [
      [
        'Explorer un quartier',
        'Tu choisis soit de continuer une rue avant de revenir, soit d’inspecter tous les lieux à une intersection de ton départ.',
        'La première règle ressemble à la profondeur ; la seconde à la largeur en nombre de liaisons.',
        'Une liaison peut mesurer une distance très différente d’une autre : le plus petit nombre de rues n’est pas toujours la plus courte distance.'
      ],
      [
        'Dépendances de tâches',
        'Des tâches doivent attendre la fin d’autres tâches ; une chaîne d’attentes revient parfois à son point de départ.',
        'Un graphe orienté représente ces dépendances ; un retour vers une tâche encore en cours révèle un cycle.',
        'Toute relation de travail n’est pas une dépendance ; le modèle doit préciser le sens exact des arcs.'
      ]
    ],
    sections: [
      [
        'Conserver une trace des découvertes',
        'Une liste de voisins indique où aller directement depuis chaque sommet. Un chemin suit plusieurs liaisons successives. Un parcours commence à un sommet et découvre seulement les lieux accessibles depuis lui. Un ensemble vus mémorise les sommets déjà rencontrés : on les marque avant de poursuivre leurs voisins. Sans cette mémoire, A—B peut entraîner A, B, A, B sans fin. set() crée un ensemble vide en Python.'
      ],
      [
        'Profondeur : poursuivre puis revenir',
        'DFS est le nom abrégé du parcours en profondeur. Avec A relié à B et C, puis B et C reliés à D, et les voisins pris alphabétiquement, on visite A puis B puis D. D permet de découvrir C avant de revenir : ordre A,B,D,C. La récursion conserve les retours en attente ; une pile explicite peut jouer le même rôle. L’ordre exact dépend de l’ordre annoncé des voisins.',
        pause(
          'Le parcours de A doit-il découvrir un sommet Z complètement isolé ?',
          'Non, aucun chemin ne mène à Z depuis A.',
          'Oui, tout parcours d’un sommet visite tous les sommets.',
          'Un parcours depuis un départ explore sa partie accessible. Pour couvrir toutes les composantes du graphe, on doit relancer depuis les sommets encore non vus.'
        )
      ],
      [
        'Largeur : respecter les couches de découverte',
        'BFS abrège le parcours en largeur. La file reçoit A ; on retire A et ajoute B puis C. On retire B et ajoute D derrière C : la file contient C,D. On retire ensuite C, puis D ; l’ordre est A,B,C,D. On marque dès l’enfilage pour que C n’ajoute pas une deuxième fois D. Dans un graphe non pondéré, ces couches correspondent au nombre minimal de liaisons depuis le départ.'
      ],
      [
        'Remonter les parents pour fabriquer un chemin',
        'Lorsqu’on découvre B depuis A, on écrit parent[B] = A ; pour A, la valeur None marque l’absence de parent. Si D est découvert depuis B, on garde parent[D] = B. Depuis D, les parents donnent D,B,A. On inverse cette liste pour obtenir A,B,D. L’écriture Python [::-1] produit l’ordre inverse. Si la cible n’a jamais été découverte, aucun chemin depuis ce départ n’a été trouvé ; une largeur complète prouve alors son absence.'
      ],
      [
        'Reconnaître le cycle adapté au graphe',
        'Dans un graphe non orienté simple, revoir le parent est normal : on revient par l’arête d’arrivée. Un voisin déjà visité autre que ce parent révèle un cycle. Dans un graphe orienté, on distingue non vu, en cours et terminé ; un arc vers un sommet encore en cours révèle un cycle dirigé. On doit examiner toutes les composantes pour conclure sur tout le graphe. Les lettres u et v désignent habituellement le sommet courant et son voisin.',
        pause(
          'Dans le graphe non orienté A—B seul, B revoit A : est-ce un cycle ?',
          'Non, A est simplement le parent de B.',
          'Oui, toute revisite est un cycle.',
          'L’arête A—B est vue depuis ses deux extrémités. Le retour immédiat vers le parent ne constitue pas un cycle dans un graphe simple non orienté.'
        )
      ]
    ],
    reasoning: [
      'Fixe les voisins dans l’ordre alphabétique. La profondeur suit A, puis B, puis D et peut découvrir C depuis D avant de revenir : A,B,D,C. La largeur met B et C en attente après A ; D découvert depuis B passe derrière C : A,B,C,D. Les marques empêchent une deuxième visite de D.',
      'Au départ on découvre A, puis son voisin B. Aucun de ces sommets n’a de liaison vers Z ; les attentes finissent donc par se vider sans découvrir Z. La reconstruction n’a aucune chaîne de parents pour Z : aucun chemin depuis A n’existe dans ce graphe.',
      'A découvre B par leur unique arête. Depuis B, le voisin A est déjà visité, mais c’est précisément le parent par lequel B a été atteint. Cette lecture inverse de la même arête est normale ; aucun autre voisin déjà visité ne ferme un cycle.'
    ]
  }),
  'tri-fusion': pedagogy({
    program: [
      'Programmer la combinaison de deux moitiés',
      'Les indices i et j suivent les premières valeurs non copiées. La condition and exige que les deux listes possèdent encore une valeur à comparer. Après chaque copie, seul l’indice choisi augmente de un. Quand la boucle finit, une des deux listes est épuisée ; les tranches gauche[i:] et droite[j:] ajoutent ce qui reste. La fonction n’appelle pas pop : elle lit les entrées sans les vider.',
      'def fusion(gauche, droite):\n    i = 0\n    j = 0\n    resultat = []\n    while i < len(gauche) and j < len(droite):\n        if gauche[i] <= droite[j]:\n            resultat.append(gauche[i])\n            i = i + 1\n        else:\n            resultat.append(droite[j])\n            j = j + 1\n    return resultat + gauche[i:] + droite[j:]'
    ],
    intro: [
      'Deux paquets de cartes sont déjà classés. Tu peux en fabriquer un seul paquet classé en choisissant à chaque fois la plus petite carte encore visible devant les deux paquets.',
      'Comment utiliser ce mélange ordonné pour trier une liste entière, et pourquoi la couper peut-elle réduire le travail ?',
      'Le tri fusion montre les trois étapes de diviser pour régner : réduire, résoudre puis combiner, avec un comptage explicite des niveaux et de la mémoire.'
    ],
    journey: [
      'Définir ce que signifie une liste triée.',
      'Fusionner deux listes déjà ordonnées.',
      'Couper jusqu’aux cas déjà résolus.',
      'Compter le travail de chaque niveau.'
    ],
    recap: [
      [
        'Ordre et liste',
        'Une liste triée par ordre croissant place chaque valeur avant une valeur au moins aussi grande.',
        '[1,4,4,8] est triée ; les valeurs égales restent autorisées.'
      ],
      [
        'Indice et longueur',
        'Un indice désigne une position à partir de zéro ; len donne le nombre d’éléments.',
        'Dans [1,4,7], les indices 0,1,2 correspondent aux trois éléments.'
      ],
      [
        'Récursion et base',
        'Une fonction récursive rappelle le même travail sur une entrée plus petite et s’arrête sur un cas déjà résolu.',
        'Une liste de zéro ou un élément est triée sans comparaison.'
      ]
    ],
    life: [
      [
        'Deux paquets classés',
        'Deux personnes ont trié chacune un paquet de cartes numérotées et veulent les réunir.',
        'Comparer les deux premières cartes disponibles permet de produire une seule suite triée sans recommencer le tri de chaque paquet.',
        'Les listes informatiques permettent de conserver les positions sans déplacer physiquement toutes les cartes à chaque étape.'
      ],
      [
        'Classement partagé',
        'Une équipe répartit des fiches en moitiés, classe chaque partie puis rassemble les parties ordonnées.',
        'La décomposition crée des sous-problèmes indépendants, et la fusion combine leurs solutions.',
        'Notre programme peut exécuter les appels successivement : diviser le problème ne signifie pas automatiquement utiliser plusieurs processeurs.'
      ]
    ],
    sections: [
      [
        'Commencer par deux suites déjà triées',
        'Fusionner exige deux entrées déjà triées. Avec [1,4,7] et [2,4,8], le plus petit élément restant est nécessairement devant l’une des deux listes. Les lettres i et j nomment les positions courantes, initialement zéro. Compare 1 et 2 : copie 1 et avance seulement i. Compare ensuite 4 et 2 : copie 2 et avance seulement j. Le résultat commence donc par [1,2].'
      ],
      [
        'Finir la fusion sans perdre de valeur',
        'Compare maintenant 4 et 4 : choisir la gauche copie un premier 4 ; le second suivra ensuite. Puis 7 est comparé à 8 et passe avant lui ; il reste 8 à recopier. Résultat : [1,2,4,4,7,8]. Quand une liste est épuisée, le reste de l’autre est déjà trié. En Python, gauche[i:] signifie toutes les valeurs à partir de i ; + concatène ici les listes. <= signifie inférieur ou égal.',
        pause(
          'Après avoir copié une valeur depuis la gauche, quel indice avancer ?',
          'Seulement l’indice de gauche.',
          'Les deux indices en même temps.',
          'Une seule valeur a été consommée. Avancer les deux indices ferait perdre la valeur de droite qui attend encore sa comparaison.'
        )
      ],
      [
        'Diviser jusqu’aux réponses immédiates',
        'Pour trier [4,1,3,2], coupe en [4,1] et [3,2], puis en [4], [1], [3], [2]. Les listes d’un élément sont déjà triées : ce sont les cas de base. Fusionne [4] et [1] en [1,4], puis [3] et [2] en [2,3]. Leur fusion finale produit [1,2,3,4]. // 2 calcule la division entière par deux pour choisir une coupure ; la tranche avant la coupure et celle après ne doivent perdre aucun élément.'
      ],
      [
        'Garantir ordre et stabilité',
        'Le résultat doit contenir exactement les mêmes valeurs, avec leurs répétitions, dans l’ordre croissant. La stabilité ajoute une règle : deux éléments de même clé gardent leur ordre d’origine. Sur une égalité, choisir la gauche avant la droite préserve cet ordre entre les deux moitiés. Remplacer <= par < peut choisir la droite d’abord et perdre cette stabilité, même si les nombres obtenus paraissent triés.',
        pause(
          'Deux valeurs égales doivent-elles être fusionnées en une seule ?',
          'Non, le tri conserve les répétitions.',
          'Oui, une liste triée n’a pas de doublons.',
          'Trier réorganise les éléments ; supprimer des répétitions serait une autre opération. Chaque occurrence doit apparaître dans le résultat.'
        )
      ],
      [
        'Compter par niveaux et par mémoire',
        'Notons n le nombre de valeurs. Pour huit valeurs, les tailles des problèmes descendent 8,4,2,1 : trois divisions par deux. log2(n) exprime ce nombre de divisions pour une puissance de deux. À chaque niveau, les fusions traitent au total environ n valeurs ; le coût grandit donc comme n multiplié par log2(n), noté O(n log n). O décrit un ordre de croissance, pas des secondes. Les listes de résultat demandent aussi une mémoire auxiliaire linéaire en n.'
      ]
    ],
    reasoning: [
      'Compare 1 et 2 : prends 1. Compare 4 et 2 : prends 2. Compare les deux 4 : prends celui de gauche puis celui de droite. Compare 7 et 8 : prends 7 ; la gauche est alors épuisée et on recopie 8. Chaque entrée apparaît une fois, donc [1,2,4,4,7,8].',
      'Coupe d’abord en [4,1] et [3,2], puis en quatre listes d’un élément déjà triées. Les fusions de 4 avec 1 et de 3 avec 2 donnent [1,4] et [2,3]. La dernière fusion choisit 1, puis 2, puis 3, puis 4 : on obtient [1,2,3,4].',
      'len([]) vaut zéro et len([5]) vaut un. Les deux vérifient la condition de base longueur <= 1. La fonction rend alors la liste immédiatement, sans nouvelle division ni fusion. Ce cas évite aussi de rappeler indéfiniment le tri sur une liste vide.'
    ]
  }),
  dynamique: pedagogy({
    program: [
      'Vérifier les deux valeurs conservées',
      'La fonction fibo reçoit l’indice naturel n. Avant chaque tour, a et b contiennent deux valeurs consécutives de la suite. Les variables suivant, a puis b mettent à jour ce couple sans perdre l’ancien b. La variable etape ne sert qu’à compter les n répétitions de range(n). Pour n = 3, les couples sont (0,1), puis (1,1), (1,2), (2,3) ; renvoyer a donne donc F(3) = 2.',
      'def fibo(n):\n    if n < 0:\n        raise ValueError("indice negatif")\n    a = 0\n    b = 1\n    for etape in range(n):\n        suivant = a + b\n        a = b\n        b = suivant\n    return a'
    ],
    intro: [
      'Pour rendre six unités avec des pièces de 1, 3 et 4, prendre d’abord la plus grosse pièce donne 4+1+1. Deux pièces de 3 suffisent pourtant.',
      'Comment trouver un meilleur résultat en réutilisant les réponses à de plus petits montants au lieu de refaire les mêmes calculs ?',
      'La programmation dynamique mémorise des sous-problèmes et respecte leurs dépendances ; elle permet de prouver un optimum plutôt que de suivre seulement un choix immédiat.'
    ],
    journey: [
      'Repérer un calcul qui revient plusieurs fois.',
      'Mémoriser une réponse et construire une table.',
      'Calculer Fibonacci pas à pas.',
      'Comparer tous les derniers choix possibles pour la monnaie.'
    ],
    recap: [
      [
        'Sous-problème et récursion',
        'Un sous-problème est une version plus petite de la même question ; la récursion peut rappeler le traitement pour la résoudre.',
        'Rendre 6 après avoir pris une pièce de 3 laisse le sous-problème rendre 3.'
      ],
      [
        'Tableau et indice',
        'Un tableau conserve des valeurs par position ; l’indice permet de retrouver la réponse associée à une taille.',
        'dp[3] pourra désigner le nombre minimal de pièces pour un montant de 3.'
      ],
      [
        'Minimum et somme',
        'Le minimum est la plus petite valeur parmi plusieurs possibilités ; une somme combine des quantités.',
        'Parmi 3 et 2 pièces, le minimum est 2 ; ajouter une pièce à une solution de 1 pièce donne 2 pièces.'
      ]
    ],
    life: [
      [
        'Rendu de monnaie',
        'Une caisse fictive possède autant de pièces de 1, 3 et 4 que nécessaire pour rendre un montant entier.',
        'La table conserve le meilleur nombre de pièces pour chaque petit montant, puis les combine pour le montant demandé.',
        'Des stocks limités changeraient le problème ; les valeurs de pièces et leur disponibilité sont des hypothèses du modèle.'
      ],
      [
        'Résultats intermédiaires conservés',
        'Une personne note les réponses déjà calculées dans un carnet pour éviter de refaire les mêmes sous-calculs.',
        'La mémoïsation enregistre une réponse à sa première demande ; la tabulation les prépare dans un ordre qui respecte les dépendances.',
        'Mémoriser ne garantit pas un optimum à soi seul : il faut une relation correcte entre les sous-problèmes.'
      ]
    ],
    sections: [
      [
        'Trouver la répétition avant de chercher la vitesse',
        'Fibonacci est ici une suite de nombres : F(0) = 0, F(1) = 1, puis chaque valeur additionne les deux précédentes. F(n) désigne la valeur à l’indice n, un entier naturel. Calculer F(5) demande F(4) et F(3) ; calculer F(4) redemande F(3). Une récursion naïve refait ce travail. Une mémoïsation garde F(3) après son premier calcul ; une tabulation remplit les indices dans l’ordre.'
      ],
      [
        'Remplir les réponses dans le bon ordre',
        'Avec les bases 0 et 1, on calcule F(2) = 1 + 0 = 1, puis F(3) = 1 + 1 = 2, F(4) = 2 + 1 = 3, F(5) = 3 + 2 = 5. Chaque case dépend seulement de deux cases antérieures. Si on veut seulement la dernière valeur, deux variables a et b suffisent ; l’affectation a,b = b,a+b calcule d’abord les deux expressions avec les anciennes valeurs, puis les remplace ensemble.',
        pause(
          'Pourquoi peut-on remplir Fibonacci de gauche à droite ?',
          'Chaque réponse utilise des réponses déjà calculées.',
          'L’ordre est sans importance pour des cases vides.',
          'La dépendance porte sur les deux indices précédents. Les bases puis l’ordre croissant garantissent qu’ils sont disponibles au moment d’une addition.'
        )
      ],
      [
        'Définir précisément la meilleure monnaie',
        'Notons m le montant et dp[m] le minimum de pièces pour le rendre. Pour zéro, dp[0] vaut zéro : aucune pièce. Si on choisit en dernier une pièce de valeur c, le reste vaut m-c ; on obtient une pièce plus le meilleur résultat pour ce reste. On examine toutes les pièces c <= m, où <= signifie inférieur ou égal, puis on garde le plus petit total parmi les restes possibles.'
      ],
      [
        'Construire la table pour six',
        'Avec les pièces 1,3,4, les réponses de 0 à 4 sont 0,1,2,1,1. Pour 5 : une pièce de 1 laisse 4, donc 2 pièces ; une de 3 laisse 2, donc 3 pièces ; une de 4 laisse 1, donc 2 pièces. Pour 6 : une de 1 laisse 5, donc 3 ; une de 3 laisse 3, donc 2 ; une de 4 laisse 2, donc 3. Le minimum est 2, atteint par 3+3.',
        pause(
          'Pourquoi prendre immédiatement 4 n’est-il pas optimal pour 6 ?',
          'Il reste 2, qui exige deux pièces de 1.',
          'Parce que les pièces de 4 sont interdites.',
          'Le choix 4 est autorisé, mais son reste donne trois pièces au total. Examiner aussi la pièce de 3 révèle deux pièces, donc une solution meilleure.'
        )
      ],
      [
        'Représenter l’impossible et compter le travail',
        'Avec seulement 4 et 6, le montant 3 n’a aucun choix possible. Une valeur spéciale, souvent l’infini pendant le calcul puis -1 dans le résultat de l’exercice, distingue cette impossibilité de zéro pièce. Avec un montant m et k valeurs de pièces, on examine au plus k choix par montant : O(m*k) étapes et O(m) cases. O décrit une croissance ; ce comptage simplifié ne mesure pas le coût des grands entiers ni les secondes d’exécution.'
      ]
    ],
    reasoning: [
      'Déplie les appels : F(5) demande F(4) et F(3). Puis F(4) demande à son tour F(3) et F(2). Le même sous-problème F(3) apparaît donc dans deux branches. Conserver sa réponse lors de la première résolution permet de la relire à la seconde demande sans refaire ses appels.',
      'Le choix immédiat 4 laisse 2 : seules deux pièces de 1 complètent ce reste, soit trois pièces. Le choix d’une pièce de 3 laisse 3, qu’une seconde pièce de 3 rend directement. Deux pièces font mieux que trois ; les essais des derniers choix montrent que le minimum vaut deux.',
      'Les pièces autorisées valent 4 et 6, toutes deux supérieures à 3. Aucune ne peut être choisie et aucune somme de valeurs positives au moins égales à 4 ne donnera 3. La case reste impossible ; le contrat de l’exercice traduit cette situation par -1, et non par zéro pièce.'
    ]
  }),
  'boyer-moore': pedagogy({
    program: [
      'Construire le prétraitement en un parcours',
      'Le dictionnaire resultat associe chaque caractère à son dernier indice rencontré. enumerate(motif) fournit le couple i, c : i est la position et c le caractère. Chaque affectation remplace l’ancienne valeur de la même clé. Pour ABCA, on écrit A:0, B:1, C:2 puis A:3 ; le résultat conserve donc A:3. Pendant la recherche, resultat.get(c,-1) fournit la valeur spéciale -1 si le caractère ne figure pas dans ce prétraitement.',
      'def derniers(motif):\n    resultat = {}\n    for i, c in enumerate(motif):\n        resultat[c] = i\n    return resultat'
    ],
    intro: [
      'Tu cherches un mot dans un long texte. Recommencer une comparaison à chaque caractère est simple, mais un échec peut parfois prouver que plusieurs départs ne conviennent pas.',
      'Comment sauter des positions en justifiant chaque saut, sans perdre un mot présent ou une occurrence qui chevauche la précédente ?',
      'Le prétraitement de Boyer-Moore montre comment des informations sur le motif évitent certaines comparaisons inutiles tout en gardant une recherche correcte.'
    ],
    journey: [
      'Numéroter texte et motif à partir de zéro.',
      'Comparer une fenêtre de droite à gauche.',
      'Construire la dernière position de chaque caractère.',
      'Calculer un décalage puis traiter succès et cas limites.'
    ],
    recap: [
      [
        'Texte, caractère, motif',
        'Un texte est une suite de caractères ; le motif est la suite exacte qu’on cherche à l’intérieur.',
        'Dans ABRACADABRA, le motif ABRA commence aux positions 0 et 7.'
      ],
      [
        'Indice et longueur',
        'Un indice numérote une position à partir de zéro ; len donne le nombre de caractères.',
        'ABCD a quatre caractères aux indices 0,1,2,3.'
      ],
      [
        'Dictionnaire et maximum',
        'Un dictionnaire associe une clé à une valeur ; max sélectionne la plus grande valeur donnée.',
        'dernier["B"] = 1 conserve un indice ; max(1,0) donne 1.'
      ]
    ],
    life: [
      [
        'Recherche dans un document',
        'Une fonction recherche toutes les apparitions exactes d’un mot dans un texte enregistré.',
        'La recherche compare des alignements et peut sauter ceux que la règle du mauvais caractère démontre impossibles.',
        'Les recherches réelles peuvent ignorer les accents ou la casse ; notre comparaison exige les mêmes caractères exacts.'
      ],
      [
        'Étiquettes qui se chevauchent',
        'Sur une bande AAAAA, tu poses une fenêtre de trois cases pour repérer toutes les suites AAA.',
        'La fenêtre commence en 0, puis 1, puis 2 ; les occurrences partagent des caractères et doivent toutes être conservées.',
        'La fenêtre physique aide à voir les alignements mais ne constitue pas une preuve des décalages calculés après un échec.'
      ]
    ],
    sections: [
      [
        'Essayer un alignement',
        'Un alignement place le premier caractère du motif devant une position du texte. Pour ABCD, les indices du motif sont 0 à 3. La méthode naïve essaie chaque départ possible ; la variante de Boyer-Moore présentée compare chaque fenêtre de droite à gauche. Si le caractère à l’indice 3 correspond, on essaie l’indice 2, puis 1, puis 0. Un échec ne permet un saut que si les départs sautés sont impossibles.'
      ],
      [
        'Préparer la dernière position de chaque caractère',
        'Le prétraitement parcourt le motif et mémorise la dernière position de chaque caractère dans un dictionnaire dernier. Pour ABCA, A apparaît en 0 puis en 3 : l’affectation finale remplace 0 par 3. B garde 1 et C garde 2. Pour un caractère absent, on choisit la valeur spéciale -1 ; elle n’est pas un indice de lecture, mais un code utilisé dans le calcul de décalage.',
        pause(
          'Dans le motif ABCA, quelle valeur mémoriser pour A ?',
          '3, sa dernière position.',
          '0, seulement sa première position.',
          'Le parcours met à jour l’association à chaque occurrence. La dernière occurrence de A est à l’indice 3 ; la règle étudiée utilise cette position.'
        )
      ],
      [
        'Calculer le saut après un échec',
        'Notons j l’indice du motif où la comparaison échoue, c le caractère du texte rencontré, et dernier[c] sa dernière position dans le motif ou -1. La règle calcule max(1, j - dernier[c]) : - soustrait et max empêche un déplacement nul ou négatif. Avec ABCD et X absent en j = 3, on obtient 3 - (-1) = 4 ; soustraire moins un ajoute un. On avance alors de quatre positions.'
      ],
      [
        'Vérifier un cas présent et la portée de la règle',
        'Avec ABCA, un échec en j = 2 sur B utilise dernier[B] = 1. Le calcul 2 - 1 donne 1 ; max(1,1) reste 1. Si la dernière occurrence était à droite de j, le résultat brut serait négatif ; le minimum d’un pas maintient un progrès prudent. Cette variante utilise la règle du mauvais caractère. Boyer-Moore complet peut ajouter le bon suffixe ; Horspool emploie une autre règle liée au caractère en fin de fenêtre.',
        pause(
          'Pourquoi prendre max avec 1 dans le calcul du décalage ?',
          'Pour garantir un déplacement vers l’avant.',
          'Pour supprimer toutes les répétitions du motif.',
          'Une différence nulle ou négative ne ferait pas progresser la recherche. La borne d’un pas évite de rester au même alignement ou de reculer.'
        )
      ],
      [
        'Conserver les succès et les cas limites',
        'Après un succès complet, notre variante avance d’un seul caractère pour préserver les chevauchements. Pour AAAAA et AAA, les départs possibles sont 0,1,2 ; sauter trois perdrait deux résultats. Un motif plus long que le texte n’a aucun départ valide. Le motif vide est accepté à toutes les frontières, de zéro à la longueur du texte incluse. Les gains du prétraitement dépendent du texte et du motif ; on n’annonce pas ici une vitesse toujours sous-linéaire.'
      ]
    ],
    reasoning: [
      'L’échec se produit au dernier indice 3 du motif ABCD. Le caractère X est absent, donc sa dernière position conventionnelle vaut -1. Le calcul donne 3 - (-1) = 3 + 1 = 4. Le maximum entre 1 et 4 vaut 4 : le décalage de quatre élimine ces alignements impossibles.',
      'Le motif ABCA possède B à l’indice 1. L’échec annoncé se trouve à l’indice 2, donc la différence vaut 2 - 1 = 1. Le maximum entre 1 et 1 reste 1. On avance d’une position ; la présence de B interdit ici de justifier le grand saut du cas absent.',
      'Le motif AAA occupe trois caractères. Dans AAAAA, les fenêtres de trois caractères peuvent commencer en 0,1,2, et chacune vaut AAA. Après le premier succès, avancer d’un seul indice permet de vérifier les deux suivantes ; avancer de trois passerait au-delà et perdrait ces occurrences chevauchantes.'
    ]
  })
};

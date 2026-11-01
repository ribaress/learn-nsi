import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer,
  python,
  source
} from './helpers.js';

const linearSource = (title, changes) =>
  source('T1_Structures_de_donnees/1.1_Listes_Piles_Files', title, changes);
const treeView = {
  value: 8,
  left: { value: 3, left: { value: 1 }, right: { value: 6 } },
  right: { value: 10 }
};
const graph = {
  nodes: [
    { id: 'A', label: 'A', x: 15, y: 40 },
    { id: 'B', label: 'B', x: 50, y: 15 },
    { id: 'C', label: 'C', x: 80, y: 45 }
  ],
  edges: [
    ['A', 'B', 1],
    ['B', 'C', 1]
  ],
  start: 'A',
  goal: 'C'
};

export default {
  id: 'structures',
  title: 'Structures de données',
  lessons: [
    lesson(
      'interfaces',
      'L’interface promet, l’implémentation réalise',
      ['T-S1', 'T-S2', 'T-S3'],
      ['Fonctions et listes Python'],
      [
        'Spécifier les opérations d’une file',
        'Distinguer contrat et choix de stockage',
        'Comparer deux implémentations de FIFO'
      ],
      [
        s(
          'Un contrat observable',
          'L’interface d’une file propose créer, est_vide, enfiler(x) et défiler(). Défiler retire et renvoie la plus ancienne valeur encore présente ; sa précondition est une file non vide. Une spécification décrit les arguments, le résultat, les effets et les erreurs, sans imposer les attributs internes.'
        ),
        s(
          'Une file avec un tableau',
          'Avec une liste Python, append ajoute à droite et pop(0) retire à gauche. Le contrat FIFO est respecté mais pop(0) décale les éléments : son coût est linéaire. Le programme client doit appeler défiler plutôt que manipuler le tableau directement, sinon le remplacement de la représentation cassera son code.',
          'class FileTableau:\n    def __init__(self):\n        self.valeurs = []\n    def est_vide(self):\n        return self.valeurs == []\n    def enfiler(self, x):\n        self.valeurs.append(x)\n    def defiler(self):\n        if self.est_vide():\n            raise IndexError("file vide")\n        return self.valeurs.pop(0)'
        ),
        s(
          'Une file avec deux piles',
          'Une pile reçoit les entrées. Pour défiler, si la pile des sorties est vide, on y transfère toutes les entrées : cette inversion place le plus ancien élément au sommet. Chaque élément est transféré au plus une fois. Un retrait isolé peut être linéaire, mais une suite de n opérations a un coût total linéaire.',
          'class FileDeuxPiles:\n    def __init__(self):\n        self.entrees, self.sorties = [], []\n    def est_vide(self):\n        return not self.entrees and not self.sorties\n    def enfiler(self, x):\n        self.entrees.append(x)\n    def defiler(self):\n        if not self.sorties:\n            while self.entrees:\n                self.sorties.append(self.entrees.pop())\n        if not self.sorties:\n            raise IndexError("file vide")\n        return self.sorties.pop()'
        )
      ],
      [
        e(
          'Même réponse',
          'Enfiler A puis B ; défiler.',
          'Les deux représentations retirent le plus ancien élément.',
          'A'
        ),
        e(
          'Ne pas retransférer trop tôt',
          'Sorties=[B,A], entrées=[C], sommets à droite.',
          'A attend déjà au sommet des sorties ; C est plus récent.',
          'Le prochain retrait vaut A.'
        ),
        e(
          'Précondition violée',
          'Défiler une file vide.',
          'Aucun premier élément n’existe ; le contrat annonce une erreur.',
          'IndexError, jamais une valeur inventée.'
        )
      ],
      a(
        'stack',
        'Ajoute trois demandes puis retire la plus ancienne. Compare ensuite avec le mode pile.',
        'Quel identifiant sort en premier en mode file ?',
        'Le modèle montre l’ordre FIFO. Il ne mesure ni les décalages mémoire ni le coût amorti de deux piles.',
        { values: ['A', 'B'], mode: 'queue' }
      ),
      [
        answer(
          '1. Lire une promesse',
          'Une file reçoit 4, 7, 9 puis subit deux retraits. Quelle valeur renvoie le deuxième ?',
          '7',
          [
            'Écris les arrivées de gauche à droite.',
            'Le premier retrait renvoie 4.',
            'Le deuxième est le plus ancien encore présent.'
          ],
          'Le FIFO conserve l’ordre d’arrivée : 4 puis 7.',
          'Tu as peut-être utilisé le sommet d’une pile. Repars de l’ordre d’arrivée.'
        ),
        python(
          '2. Exécuter le contrat',
          'Écris servir(valeurs) : enfile les valeurs dans une liste puis renvoie tous les retraits FIFO dans une nouvelle liste.',
          'servir',
          'def servir(valeurs):\n    pass',
          'def servir(valeurs):\n    file = []\n    for x in valeurs:\n        file.append(x)\n    resultat = []\n    while file:\n        resultat.append(file.pop(0))\n    return resultat',
          [
            [[[5, 2, 8]], [5, 2, 8]],
            [[[]], []]
          ],
          [
            'Enfile avec append.',
            'Retire à l’indice zéro.',
            'N’appelle pop que si la file est non vide.'
          ],
          'La boucle de retrait suit la spécification FIFO. Le coût quadratique de cette implémentation n’est pas celui d’une file avec un deque.',
          'Un pop() sans indice retire la dernière arrivée. Utilise la bonne extrémité.'
        ),
        python(
          '3. Implémenter avec deux piles',
          'Écris retraits(operations) où ["+",x] enfile x et ["-"] défile. Une opération de retrait n’est fournie que si la file est non vide. Utilise deux piles et renvoie la liste des valeurs retirées.',
          'retraits',
          'def retraits(operations):\n    entrees, sorties = [], []\n    pass',
          'def retraits(operations):\n    entrees, sorties = [], []\n    resultat = []\n    for op in operations:\n        if op[0] == "+":\n            entrees.append(op[1])\n        else:\n            if not sorties:\n                while entrees:\n                    sorties.append(entrees.pop())\n            resultat.append(sorties.pop())\n    return resultat',
          [
            [[[['+', 3], ['+', 8], ['-'], ['+', 5], ['-'], ['-']]], [3, 8, 5]],
            [[[]], []]
          ],
          [
            'Les nouvelles valeurs vont dans entrees.',
            'Transfère seulement lorsque sorties est vide.',
            'Le sommet de sorties est alors la plus ancienne valeur.'
          ],
          'Le transfert inverse l’ordre une fois ; une arrivée ultérieure ne doit pas passer devant les anciennes sorties.',
          'Transférer à chaque retrait mélange les générations de demandes. Trace séparément les deux piles.',
          linearSource(
            'Cours : implémentation d’une file avec deux piles',
            'Transformation de la construction de classe en traitement d’opérations ; tests mêlant arrivées et départs ; correction autonome.'
          )
        )
      ],
      'Pourquoi deux files peuvent-elles avoir la même interface et des coûts différents ?'
    ),

    lesson(
      'objets',
      'Classes, attributs et méthodes',
      ['T-S4', 'T-S5'],
      ['Fonctions, paramètres et affectations'],
      [
        'Définir une classe avec un constructeur',
        'Accéder à des attributs et appeler des méthodes',
        'Préserver un invariant sur des objets distincts'
      ],
      [
        s(
          'Une classe décrit des objets',
          'Une classe définit une manière de fabriquer des objets avec un état et des opérations. Le constructeur __init__ reçoit l’objet en cours de création sous le nom self. Chaque instance possède ses propres attributs : deux comptes construits séparément ne doivent pas partager leur solde.'
        ),
        s(
          'Une méthode transforme l’état',
          'Une méthode reçoit self implicitement lorsqu’on écrit compte.deposer(5). Elle peut consulter ou modifier les attributs. On fixe ici l’invariant solde >= 0 ; toute méthode publique doit le préserver. Une opération interdite doit échouer sans laisser un état partiellement modifié.',
          'class Compte:\n    def __init__(self, solde=0):\n        if solde < 0:\n            raise ValueError("solde negatif")\n        self.solde = solde\n    def deposer(self, montant):\n        if montant < 0:\n            raise ValueError("montant negatif")\n        self.solde += montant'
        ),
        s(
          'Observer et protéger',
          'L’expression c.solde lit un attribut, tandis que c.deposer(4) appelle une méthode. Python permet souvent de modifier directement un attribut, mais le client doit respecter l’interface documentée. La classe peut évoluer sans que l’utilisateur réécrive ses appels si le contrat des méthodes reste identique.'
        )
      ],
      [
        e(
          'Deux instances',
          'a=Compte(10), b=Compte(2), a.deposer(3)',
          'Seul l’objet référencé par a est modifié.',
          'a.solde=13 et b.solde=2'
        ),
        e(
          'Accès ou appel',
          'c.solde ; c.deposer(5)',
          'Le premier lit une valeur ; le second exécute une opération.',
          'Un attribut n’est pas une méthode.'
        ),
        e(
          'Montant invalide',
          'Compte(-1)',
          'Le constructeur refuse un solde qui viole l’invariant.',
          'ValueError'
        )
      ],
      a(
        'trace',
        'Suis la création de deux objets et la modification du premier.',
        'Quel est le solde de b après le dépôt sur a ?',
        'La trace représente des états choisis ; les variables référencent des objets, elles ne contiennent pas toutes une copie indépendante.',
        {
          code: 'a = Compte(10)\nb = Compte(2)\na.deposer(3)',
          frames: [
            {
              line: 1,
              variables: { 'a.solde': 10 },
              explanation: 'Une première instance est construite.'
            },
            {
              line: 2,
              variables: { 'a.solde': 10, 'b.solde': 2 },
              explanation: 'La seconde instance a son propre état.'
            },
            {
              line: 3,
              variables: { 'a.solde': 13, 'b.solde': 2 },
              explanation: 'La méthode agit sur self, ici a.'
            }
          ]
        }
      ),
      [
        answer(
          '1. Lire un attribut',
          'Avec c=Compte(12) puis c.deposer(8), quelle est la valeur de c.solde ?',
          '20',
          ['Le solde initial est 12.', 'Le dépôt ajoute 8.', 'La méthode change l’attribut de c.'],
          'Le dépôt conserve l’ancien solde et ajoute le montant : 12+8=20.',
          'Ne remplace pas le solde par le montant. Écris l’état avant et après le dépôt.'
        ),
        python(
          '2. Fabriquer une instance',
          'Définis une classe Capteur avec l’attribut valeur et une méthode lire(). Écris mesure(x) qui construit un Capteur(x) et renvoie sa lecture.',
          'mesure',
          'class Capteur:\n    pass\n\ndef mesure(x):\n    pass',
          'class Capteur:\n    def __init__(self, valeur):\n        self.valeur = valeur\n    def lire(self):\n        return self.valeur\n\ndef mesure(x):\n    return Capteur(x).lire()',
          [
            [[18], 18],
            [[0], 0],
            [[-4], -4]
          ],
          [
            'Le constructeur reçoit self et valeur.',
            'Stocke valeur dans self.valeur.',
            'Appelle lire avec des parenthèses sur l’instance.'
          ],
          'L’attribut mémorise la mesure ; la méthode représente le service de lecture offert au client.',
          'Une variable locale du constructeur disparaît à la fin de l’appel. Utilise self.valeur.'
        ),
        python(
          '3. Conserver un invariant',
          'Définis Compteur, initialement à zéro, avec ajouter(n) qui ajoute un entier positif ou nul et ignore les négatifs. Écris compter(valeurs) qui utilise cette classe et renvoie sa valeur finale.',
          'compter',
          'class Compteur:\n    pass\n\ndef compter(valeurs):\n    pass',
          'class Compteur:\n    def __init__(self):\n        self.valeur = 0\n    def ajouter(self, n):\n        if n >= 0:\n            self.valeur += n\n\ndef compter(valeurs):\n    c = Compteur()\n    for n in valeurs:\n        c.ajouter(n)\n    return c.valeur',
          [
            [[[3, -8, 4]], 7],
            [[[]], 0],
            [[[-1, 0]], 0]
          ],
          [
            'Initialise un attribut par instance.',
            'Teste le signe avant de modifier la valeur.',
            'La fonction doit appeler ajouter pour chaque élément.'
          ],
          'L’invariant valeur >= 0 est garanti par le constructeur et par la condition de la méthode.',
          'Vérifie les paramètres self et n ; puis teste uniquement des nombres négatifs pour isoler la condition.'
        )
      ],
      'Quel avantage apporte une méthode contrôlant un dépôt par rapport à une affectation directe ?'
    ),

    lesson(
      'listes',
      'Listes chaînées et tableaux dynamiques',
      ['T-S6', 'T-S7'],
      ['Classes et références Python'],
      [
        'Décrire les cellules d’une liste chaînée',
        'Parcourir une liste jusqu’à None',
        'Choisir entre accès indicé et chaînage'
      ],
      [
        s(
          'Une cellule et un lien',
          'Une liste chaînée est vide, ou possède une cellule contenant une valeur et une référence vers la suite. None marque la fin. L’ordre est celui des liens, sans exiger que les cellules soient voisines en mémoire. Changer le lien d’une cellule peut donc modifier la suite accessible.'
        ),
        s(
          'Avancer sans perdre la tête',
          'Pour lire toute la liste, une variable courante suit les liens jusqu’à None. La variable tête reste conservée. Accéder au k-ième élément nécessite de franchir k liens : ce coût est linéaire en k, contrairement à l’accès par indice dans le tableau dynamique Python.',
          'class Cellule:\n    def __init__(self, valeur, suivante=None):\n        self.valeur = valeur\n        self.suivante = suivante\n\ndef longueur(tete):\n    n = 0\n    courante = tete\n    while courante is not None:\n        n += 1\n        courante = courante.suivante\n    return n'
        ),
        s(
          'Le coût dépend de l’opération',
          'Ajouter une cellule en tête consiste à relier une nouvelle cellule à l’ancienne tête : coût constant. Insérer au milieu coûte constant si la cellule précédente est déjà connue, mais sa recherche peut être linéaire. Une list Python est un tableau dynamique : accès indicé constant, insertion en tête linéaire.'
        )
      ],
      [
        e(
          'Trois liens',
          'Cellule(4,Cellule(8,Cellule(2)))',
          'Chaque cellule mène à la suivante, puis à None.',
          'La troisième valeur est 2.'
        ),
        e(
          'Ajouter en tête',
          'tete=Cellule(5,tete) devant [4,8]',
          'Le lien de la nouvelle cellule pointe vers l’ancienne tête.',
          '[5,4,8]'
        ),
        e(
          'Liste vide',
          'tete=None',
          'Le test de la boucle échoue avant toute lecture d’attribut.',
          'Longueur zéro ; lire tete.valeur provoquerait une erreur.'
        )
      ],
      a(
        'trace',
        'Compte les cellules sans déplacer la référence de tête.',
        'Quand courante devient None, faut-il compter une cellule supplémentaire ?',
        'Le dessin linéaire des cellules est un modèle de liens ; il ne représente pas leur position physique en mémoire.',
        {
          code: 'n = 0\nwhile courante is not None:\n    n += 1\n    courante = courante.suivante',
          frames: [
            {
              line: 1,
              variables: { n: 0, courante: '4→8→None' },
              explanation: 'Avant le premier lien.'
            },
            {
              line: 4,
              variables: { n: 1, courante: '8→None' },
              explanation: 'La première cellule est comptée.'
            },
            {
              line: 4,
              variables: { n: 2, courante: 'None' },
              explanation: 'La fin ne représente pas une cellule.'
            }
          ]
        }
      ),
      [
        answer(
          '1. Suivre les liens',
          'La tête vaut Cellule(6,Cellule(9,Cellule(1))). Que vaut tete.suivante.valeur ?',
          '9',
          [
            'La tête contient 6.',
            'suivante suit exactement un lien.',
            'Lis ensuite la valeur de cette cellule.'
          ],
          'Un lien conduit à la deuxième cellule qui contient 9.',
          'Tu comptes peut-être None comme une cellule. Dessine les trois cellules et leurs flèches.',
          linearSource(
            'Cours : accès aux cellules d’une liste chaînée, exercice 1',
            'Valeurs changées ; question réduite à un accès ; ajout d’aides et d’un diagnostic sur le chaînage.'
          )
        ),
        python(
          '2. Parcourir une représentation récursive',
          'Une liste est représentée par None ou [valeur,suite]. Écris longueur(liste) sans modifier cette structure.',
          'longueur',
          'def longueur(liste):\n    pass',
          'def longueur(liste):\n    n = 0\n    while liste is not None:\n        n += 1\n        liste = liste[1]\n    return n',
          [
            [[[4, [8, [2, null]]]], 3],
            [[null], 0]
          ],
          [
            'None représente la liste vide.',
            'La suite est à l’indice 1.',
            'Incrémente une fois par cellule rencontrée.'
          ],
          'On compte les cellules, pas les deux champs de chaque cellule. Le parcours termine au marqueur None.',
          'len(liste) compte les champs d’une cellule. Suis les liens pour compter tous les éléments.'
        ),
        python(
          '3. Retrouver une valeur',
          'Avec la même représentation, écris contient(liste,x), qui renvoie un booléen et s’arrête à la première occurrence.',
          'contient',
          'def contient(liste, x):\n    pass',
          'def contient(liste, x):\n    while liste is not None:\n        if liste[0] == x:\n            return True\n        liste = liste[1]\n    return False',
          [
            [[[3, [7, null]], 7], true],
            [[[3, [7, null]], 8], false],
            [[null, 1], false]
          ],
          [
            'Compare x au premier champ.',
            'Si la comparaison échoue, avance dans la suite.',
            'Après None, aucune occurrence n’a été trouvée.'
          ],
          'La recherche visite au plus n cellules. Une réussite permet un retour immédiat ; l’absence est décidée après la fin.',
          'Un return False à l’intérieur de la boucle abandonne après la première cellule. Teste une réussite en fin de liste.'
        )
      ],
      'Pourquoi une insertion annoncée constante peut-elle malgré tout demander un temps linéaire ?'
    ),

    lesson(
      'piles-files',
      'Piles et files : choisir l’ordre de sortie',
      ['T-S6', 'T-S7'],
      ['Listes Python et conditions'],
      [
        'Distinguer FIFO et LIFO',
        'Écrire les opérations d’une pile',
        'Utiliser une pile pour contrôler des parenthèses'
      ],
      [
        s(
          'Une pile pour revenir en arrière',
          'Une pile ne donne accès qu’à son sommet. Empiler ajoute un élément, dépiler retire et renvoie le dernier arrivé. Ce LIFO convient aux retours arrière et aux appels de fonctions. Avec une liste Python et le sommet à droite, append et pop réalisent ces opérations sans décaler tous les éléments.'
        ),
        s(
          'Une file pour respecter les arrivées',
          'Une file rend d’abord le plus ancien élément encore en attente : FIFO. Elle convient à une file d’impression ou à un parcours en largeur. Une priorité change ce contrat ; une file de priorité n’est donc pas une simple file FIFO. Toujours préciser l’extrémité où entrent et sortent les valeurs.'
        ),
        s(
          'Contrôler l’imbrication',
          'Pour chaque parenthèse ouvrante, on empile une marque. Pour une fermante, il faut une marque disponible, puis la dépiler. À la fin, la pile doit être vide. Une fermeture sans ouverture est une erreur immédiate ; une pile non vide indique des ouvertures jamais fermées.',
          'def equilibree(texte):\n    pile = []\n    for c in texte:\n        if c == "(":\n            pile.append(c)\n        elif c == ")":\n            if not pile:\n                return False\n            pile.pop()\n    return pile == []'
        )
      ],
      [
        e(
          'Annuler',
          'Actions A, B, C puis annulation.',
          'La dernière action doit être annulée en premier.',
          'La pile retire C.'
        ),
        e(
          'Imprimer',
          'Documents A, B, C puis service.',
          'Le premier document arrivé doit être servi.',
          'La file retire A.'
        ),
        e(
          'Fermeture prématurée',
          '")("',
          'Le premier caractère tente de dépiler une pile vide.',
          'Non équilibré, même avec autant de signes de chaque type.'
        )
      ],
      a(
        'stack',
        'Empile A, B et C ; retire un élément puis passe au raisonnement FIFO.',
        'Quelle valeur sort de la pile en premier ?',
        'Cette manipulation représente une structure abstraite ; elle ne donne pas accès à un élément enfoui sans retirer les éléments au-dessus.',
        { values: ['A', 'B'], mode: 'stack' }
      ),
      [
        answer(
          '1. Prévoir un dépilement',
          'Empile 2, puis 6 ; dépile ; empile 9 ; dépile. Quelle valeur renvoie le dernier retrait ?',
          '9',
          [
            'Après le premier retrait il reste 2.',
            '9 devient le nouveau sommet.',
            'Le sommet sort en premier.'
          ],
          'La pile contient successivement [2,6], [2], [2,9] puis [2]. Le dernier retrait vaut 9.',
          'Écris un état après chaque opération, en conservant le sommet à droite.'
        ),
        python(
          '2. Annuler dans l’ordre',
          'Écris annuler(actions) qui utilise une pile pour renvoyer les actions dans l’ordre où elles seraient annulées, sans modifier la liste initiale.',
          'annuler',
          'def annuler(actions):\n    pass',
          'def annuler(actions):\n    pile = list(actions)\n    resultat = []\n    while pile:\n        resultat.append(pile.pop())\n    return resultat',
          [
            [[['A', 'B', 'C']], ['C', 'B', 'A']],
            [[[]], []]
          ],
          [
            'Copie actions dans une pile.',
            'pop retire le sommet à droite.',
            'Accumule les valeurs retirées dans une nouvelle liste.'
          ],
          'L’annulation remonte l’historique en LIFO. La copie protège l’historique fourni par le client.',
          'La liste d’entrée ne doit pas être vidée. Fais d’abord une copie puis vérifie l’ordre inverse.'
        ),
        python(
          '3. Parenthèses équilibrées',
          'Écris equilibree(texte). Ignore les autres caractères ; renvoie True uniquement si toutes les parenthèses sont correctement imbriquées.',
          'equilibree',
          'def equilibree(texte):\n    pass',
          'def equilibree(texte):\n    pile = []\n    for c in texte:\n        if c == "(":\n            pile.append(c)\n        elif c == ")":\n            if not pile:\n                return False\n            pile.pop()\n    return not pile',
          [
            [['(a+(b))'], true],
            [[')('], false],
            [['(('], false],
            [[''], true]
          ],
          [
            'Empile à chaque ouverture.',
            'Une fermeture exige une pile non vide.',
            'Vérifie aussi les ouvertures restantes après la boucle.'
          ],
          'Le compteur implicite de la pile ne peut jamais devenir négatif et doit finir à zéro. Le texte vide respecte cette condition.',
          'Compter seulement les deux sortes de signes accepte à tort ")(". Vérifie chaque préfixe du texte.'
        )
      ],
      'Quel ordre de sortie choisirais-tu pour explorer des pages puis revenir à la page précédente ?'
    ),

    lesson(
      'dictionnaires',
      'Dictionnaires : accéder par une clé',
      ['T-S7', 'T-S8'],
      ['Listes et boucles Python'],
      [
        'Distinguer une clé d’une valeur',
        'Comparer recherche séquentielle et accès par clé',
        'Construire un index de fréquences'
      ],
      [
        s(
          'La clé identifie une association',
          'Un dictionnaire associe une clé unique à une valeur. Affecter deux fois la même clé remplace sa valeur ; cela ne crée pas deux associations. En Python, les clés doivent être hachables : une chaîne ou un entier convient, une liste mutable ne convient pas. Les valeurs peuvent se répéter.'
        ),
        s(
          'Deux questions différentes',
          'Dans une liste de couples, chercher un identifiant peut nécessiter de visiter tous les couples. Un dictionnaire construit sur cet identifiant permet un accès moyen constant à sa valeur. Le test x in d porte sur les clés ; chercher x parmi les valeurs demande en général de les parcourir. Les coûts dépendent aussi de la construction préalable de l’index.'
        ),
        s(
          'Compter et traiter l’absence',
          'Pour compter des mots, la première occurrence initialise une clé et les suivantes augmentent le compteur. La méthode get(mot,0) traite explicitement l’absence. Au contraire d[mot] lève KeyError si la clé manque. Il faut choisir si une absence signifie zéro, une valeur de secours ou une erreur de données.',
          'def frequences(mots):\n    compte = {}\n    for mot in mots:\n        compte[mot] = compte.get(mot, 0) + 1\n    return compte'
        )
      ],
      [
        e(
          'Clé remplacée',
          'd={"A":2} puis d["A"]=5',
          'Une clé n’a qu’une association à la fois.',
          '{"A":5}'
        ),
        e(
          'Valeurs répétées',
          'd={"A":2,"B":2}',
          'Les clés sont différentes, les deux valeurs identiques sont autorisées.',
          'Deux associations.'
        ),
        e(
          'Clé absente',
          'd={"A":2} ; d["C"]',
          'L’accès direct exige l’existence de la clé.',
          'KeyError ; d.get("C",0) aurait renvoyé 0.'
        )
      ],
      a(
        'table',
        'Associe chaque identifiant à son score, puis prévois une mise à jour.',
        'Que devient le score de A si on affecte A à 15 ?',
        'La table visualise les associations. Elle ne simule ni collisions de hachage ni organisation mémoire du dictionnaire.',
        {
          columns: ['clé', 'valeur'],
          rows: [
            ['A', 12],
            ['B', 15],
            ['C', 12]
          ]
        }
      ),
      [
        answer(
          '1. Chercher une clé',
          'Avec d={"Ada":14,"Lin":17}, que vaut len(d) après d["Ada"]=18 ?',
          '2',
          [
            'Les clés présentes sont Ada et Lin.',
            'Une affectation sur Ada remplace son score.',
            'Aucune nouvelle clé n’est créée.'
          ],
          'Le nombre d’associations reste deux, même si une valeur est modifiée.',
          'Une mise à jour n’est pas une insertion quand la clé existe déjà. Compte les clés distinctes.'
        ),
        python(
          '2. Indexer des fréquences',
          'Écris frequences(mots), qui renvoie un dictionnaire mot → nombre d’occurrences.',
          'frequences',
          'def frequences(mots):\n    pass',
          'def frequences(mots):\n    d = {}\n    for mot in mots:\n        d[mot] = d.get(mot, 0) + 1\n    return d',
          [
            [[['nsi', 'sql', 'nsi']], { nsi: 2, sql: 1 }],
            [[[]], {}]
          ],
          [
            'Commence avec un dictionnaire vide.',
            'Une clé absente doit commencer à zéro.',
            'Ajoute un à chaque occurrence, même si la clé existe.'
          ],
          'L’index se construit en un passage ; chaque occurrence effectue un accès et une mise à jour moyens constants.',
          'Réinitialiser le compteur à un écrase les occurrences précédentes. Teste deux mots identiques.'
        ),
        python(
          '3. Retrouver les indices',
          'Écris indexer(valeurs) qui associe chaque valeur à la liste croissante de ses indices. Les valeurs sont des chaînes.',
          'indexer',
          'def indexer(valeurs):\n    pass',
          'def indexer(valeurs):\n    d = {}\n    for i, valeur in enumerate(valeurs):\n        if valeur not in d:\n            d[valeur] = []\n        d[valeur].append(i)\n    return d',
          [
            [[['x', 'y', 'x']], { x: [0, 2], y: [1] }],
            [[[]], {}]
          ],
          [
            'Une valeur peut être présente à plusieurs positions.',
            'Crée une liste d’indices uniquement à la première occurrence.',
            'Ajoute ensuite l’indice courant.'
          ],
          'La clé représente le contenu recherché et sa valeur liste toutes les positions. Ce nouvel index accélère les recherches répétées.',
          'Une seule position par clé perd les doublons. Stocke une liste plutôt qu’un entier.'
        )
      ],
      'Quand le coût de construction d’un dictionnaire est-il justifié par les recherches futures ?'
    ),

    lesson(
      'arbres-structure',
      'Arbres : organiser une hiérarchie',
      ['T-S9', 'T-S10'],
      ['Listes récursives et références'],
      [
        'Reconnaître racine, feuille et sous-arbres',
        'Distinguer taille et hauteur avec une convention',
        'Encadrer la taille d’un arbre binaire'
      ],
      [
        s(
          'Hiérarchie sans retour',
          'Un arbre possède une racine et chaque nœud non racine a un unique parent. Un arbre de dossiers ou de décisions représente une hiérarchie. Une relation d’amitié n’est généralement pas un arbre : elle peut relier des nœuds déjà reliés et créer des cycles. Une feuille n’a aucun enfant.'
        ),
        s(
          'Binaire signifie deux places',
          'Dans un arbre binaire, chaque nœud a un sous-arbre gauche et un sous-arbre droit, éventuellement vides. Leur ordre compte : un enfant gauche seul ne donne pas le même arbre qu’un enfant droit seul. On adopte ici None pour le vide et [valeur,gauche,droite] pour un nœud.'
        ),
        s(
          'Mesurer avec une convention explicite',
          'La taille compte les nœuds. La hauteur compte ici les nœuds du plus long chemin racine-feuille : hauteur(vide)=0, hauteur(feuille)=1. Pour un arbre non vide de hauteur h et de taille n, h <= n <= 2**h-1. Donc la hauteur est entre ceil(log2(n+1)) et n. Une autre convention compte les arêtes et décale la hauteur de un.'
        )
      ],
      [
        e(
          'Arbre ramifié',
          '[8,[3,[1,None,None],[6,None,None]],[10,None,None]]',
          'La racine 8 a deux sous-arbres ; 1, 6 et 10 sont des feuilles.',
          'Taille 5, hauteur 3.'
        ),
        e(
          'Chaîne',
          'Trois nœuds avec un seul enfant à chaque étage.',
          'Le plus long chemin contient tous les nœuds.',
          'Taille 3, hauteur 3.'
        ),
        e(
          'Cas limite vide',
          'None',
          'Il n’y a ni racine ni feuille ; on applique directement la convention.',
          'Taille 0, hauteur 0.'
        )
      ],
      a(
        'tree',
        'Repère la racine, compte les feuilles et suis le chemin le plus long.',
        'Une branche courte change-t-elle la hauteur si la plus longue reste identique ?',
        'La hauteur affichée doit se lire avec la convention donnée : ici on compte les nœuds, et le vide vaut zéro.',
        { tree: treeView }
      ),
      [
        answer(
          '1. Taille maximale',
          'Avec la convention en nœuds, quelle est la taille maximale d’un arbre binaire de hauteur 4 ?',
          '15',
          [
            'Le premier niveau contient au plus un nœud.',
            'Les suivants contiennent au plus 2, 4 puis 8 nœuds.',
            'Additionne 1+2+4+8.'
          ],
          'Un arbre complet de hauteur quatre contient 2**4-1=15 nœuds.',
          'Tu comptes peut-être les arêtes. Ici une feuille a la hauteur un, donc quatre niveaux.'
        ),
        python(
          '2. Compter les feuilles',
          'Écris feuilles(arbre) avec None ou [valeur,gauche,droite]. Renvoie le nombre de nœuds sans enfant.',
          'feuilles',
          'def feuilles(arbre):\n    pass',
          'def feuilles(arbre):\n    if arbre is None:\n        return 0\n    if arbre[1] is None and arbre[2] is None:\n        return 1\n    return feuilles(arbre[1]) + feuilles(arbre[2])',
          [
            [[null], 0],
            [[[8, [3, null, null], [10, null, null]]], 2]
          ],
          [
            'Le vide ne contient aucune feuille.',
            'Un nœud est feuille si ses deux enfants sont vides.',
            'Sinon additionne les feuilles des sous-arbres.'
          ],
          'On distingue le vide d’un nœud sans enfant : seul ce dernier compte comme une feuille.',
          'Ne compte pas chaque None comme une feuille ; vérifie d’abord si le nœud lui-même existe.'
        ),
        python(
          '3. Reconnaître un arbre binaire plein',
          'Écris plein(arbre), vrai si chaque nœud a zéro ou deux enfants. Le vide est accepté. Cela ne signifie pas que toutes les feuilles sont à la même profondeur.',
          'plein',
          'def plein(arbre):\n    pass',
          'def plein(arbre):\n    if arbre is None:\n        return True\n    gauche, droite = arbre[1], arbre[2]\n    if (gauche is None) != (droite is None):\n        return False\n    return plein(gauche) and plein(droite)',
          [
            [[null], true],
            [[[1, [2, null, null], null]], false],
            [[[1, [2, null, null], [3, null, null]]], true]
          ],
          [
            'Le vide satisfait la propriété.',
            'Exactement un enfant viole la propriété.',
            'Il faut contrôler récursivement les deux sous-arbres.'
          ],
          'La condition locale zéro ou deux enfants doit être vraie à tous les nœuds ; la racine seule ne suffit pas.',
          'Un test sur la seule racine accepte des défauts plus bas. Propage la vérification aux sous-arbres.'
        )
      ],
      'Pourquoi faut-il annoncer la convention de hauteur avant de comparer deux corrections ?'
    ),

    lesson(
      'graphes-structure',
      'Graphes : matrices et listes de voisins',
      ['T-S11', 'T-S12', 'T-S13'],
      ['Tableaux à deux dimensions et dictionnaires'],
      [
        'Modéliser sommets, arcs et arêtes',
        'Construire matrice et listes d’adjacence',
        'Convertir les représentations et calculer les prédécesseurs'
      ],
      [
        s(
          'Choisir le sens des relations',
          'Un graphe est défini par ses sommets et ses relations. Une arête non orientée relie deux sommets symétriquement ; un arc orienté distingue départ et arrivée. Des routes à sens unique exigent des arcs. Un poids peut représenter une distance, mais il faut distinguer cette information de l’existence de la liaison.'
        ),
        s(
          'Deux stockages, deux usages',
          'Avec les sommets numérotés de 0 à n-1, M[i][j]=1 signifie qu’un arc va de i vers j. La matrice occupe n² cases et teste une liaison directement. Une liste de successeurs ne stocke que les voisins sortants : elle convient aux graphes peu denses et aux parcours. Une matrice d’un graphe non orienté est symétrique.'
        ),
        s(
          'Convertir sans inverser les arcs',
          'Pour construire les listes de successeurs depuis la matrice, lire chaque ligne i et recueillir les colonnes j contenant 1. Pour obtenir les prédécesseurs de j, lire les entrées de sa colonne. Lors d’une conversion inverse, conserver aussi les sommets isolés : une liste vide reste une information utile.',
          'def successeurs(matrice):\n    return [[j for j, lien in enumerate(ligne) if lien] for ligne in matrice]'
        )
      ],
      [
        e(
          'Arc A vers B',
          'Ordre des sommets A,B ; matrice [[0,1],[0,0]].',
          'La ligne A contient une liaison vers la colonne B.',
          'Successeurs(A)=[B], prédécesseurs(B)=[A].'
        ),
        e(
          'Relation symétrique',
          'A—B, B—C',
          'Chaque arête est représentée dans les deux sens.',
          'M[A][B]=M[B][A]=1.'
        ),
        e(
          'Sommet isolé',
          'A n’a ni entrée ni sortie.',
          'Il doit rester dans l’ensemble des sommets.',
          'Ligne et colonne nulles, liste de voisins vide.'
        )
      ],
      a(
        'graph',
        'Repère les liaisons et écris la matrice avec l’ordre A,B,C.',
        'Combien de cases valent un si les deux arêtes sont non orientées ?',
        'Le dessin utilise des arêtes non orientées. Un graphe orienté demande des flèches ; les poids ne sont pas des sommets.',
        graph
      ),
      [
        answer(
          '1. Lire une matrice',
          'Dans [[0,1,0],[0,0,1],[0,0,0]], combien d’arcs entrent dans le sommet 1 (indices dès zéro) ?',
          '1',
          [
            'Les entrées se lisent dans une colonne.',
            'Lis la colonne d’indice 1.',
            'Ses valeurs sont 1,0,0.'
          ],
          'Seul l’arc 0→1 entre dans le sommet 1.',
          'Tu as peut-être lu la ligne qui donne les sorties. Sépare prédécesseurs et successeurs.'
        ),
        python(
          '2. Matrice vers listes',
          'Écris voisins(matrice) qui renvoie les listes de successeurs par ordre croissant. La matrice est carrée avec des zéros et des uns.',
          'voisins',
          'def voisins(matrice):\n    pass',
          'def voisins(matrice):\n    return [[j for j, x in enumerate(ligne) if x == 1] for ligne in matrice]',
          [
            [
              [
                [
                  [0, 1, 0],
                  [0, 0, 1],
                  [0, 0, 0]
                ]
              ],
              [[1], [2], []]
            ],
            [[[]], []]
          ],
          [
            'Construis une liste pour chaque ligne.',
            'Ajoute l’indice de chaque colonne contenant un.',
            'Même une ligne nulle donne une liste vide.'
          ],
          'La ligne décrit les arcs sortants. L’ordre des colonnes garantit des successeurs croissants.',
          'Renvoie les indices des colonnes, pas les valeurs 0 et 1. Garde la liste du sommet isolé.'
        ),
        python(
          '3. Listes vers matrice et prédécesseurs',
          'Écris matrice(succ) : succ[i] liste les successeurs du sommet i. Renvoie la matrice d’adjacence orientée.',
          'matrice',
          'def matrice(succ):\n    pass',
          'def matrice(succ):\n    n = len(succ)\n    m = [[0 for _ in range(n)] for _ in range(n)]\n    for i in range(n):\n        for j in succ[i]:\n            m[i][j] = 1\n    return m',
          [
            [
              [[[1], [2], []]],
              [
                [0, 1, 0],
                [0, 0, 1],
                [0, 0, 0]
              ]
            ],
            [[[[]]], [[0]]],
            [[[]], []]
          ],
          [
            'Crée n lignes indépendantes.',
            'Pour chaque arc i→j, place un dans m[i][j].',
            'Ne place pas automatiquement l’arc inverse.'
          ],
          'La matrice encode exactement les arcs donnés. Des lignes indépendantes évitent qu’une modification affecte tous les sommets.',
          '[[0]*n]*n partage une même ligne. Construis les lignes séparément et teste un graphe non symétrique.'
        )
      ],
      'Pour un réseau de mille sommets avec deux voisins par sommet, quelle représentation choisiras-tu et pourquoi ?'
    )
  ]
};

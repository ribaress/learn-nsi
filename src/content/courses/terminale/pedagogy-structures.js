import { pedagogy, pause } from './pedagogy-utils.js';

export default {
  interfaces: pedagogy({
    program: [
      'Écrire une première interface de file',
      'Ces fonctions partagent une liste passée comme argument : le nom file désigne son état. creer renvoie une liste vide ; enfiler appelle append ; defiler teste le vide avant pop(0). raise déclenche une exception, ici IndexError. Le code montre une réalisation minimale du contrat ; le client utilise ces fonctions sans retirer lui-même une case. Une réalisation à deux piles peut ensuite offrir les mêmes opérations.',
      'def creer():\n    return []\n\ndef enfiler(file, valeur):\n    file.append(valeur)\n\ndef defiler(file):\n    if file == []:\n        raise IndexError("file vide")\n    return file.pop(0)'
    ],
    intro: [
      'Au guichet, on attend que la personne arrivée en premier soit servie en premier. Deux employés peuvent ranger les tickets différemment tout en respectant cet ordre.',
      'Comment promettre le même service même si la façon de ranger les informations change complètement ?',
      'Séparer la promesse et la réalisation permet de remplacer un stockage sans réécrire les programmes qui utilisent le service.'
    ],
    journey: [
      'Décrire l’ordre d’arrivée sur des tickets.',
      'Écrire les opérations autorisées et leurs conditions.',
      'Réaliser une file avec une liste puis deux piles.',
      'Comparer les réponses et le travail effectué.'
    ],
    recap: [
      [
        'Fonction et argument',
        'Une fonction est un traitement nommé ; un argument est la valeur fournie lors de son appel.',
        'enfiler(7) demande l’ajout de la valeur 7.'
      ],
      [
        'Liste Python',
        'Une liste est une suite ordonnée de valeurs, écrite entre crochets ; la première position porte le numéro zéro.',
        '[4, 7] contient 4 à la position 0 et 7 à la position 1.'
      ],
      [
        'État et objet',
        'L’état est l’information conservée à un instant ; un objet regroupe cet état avec des opérations nommées méthodes.',
        'Une file contenant A puis B possède un état différent de la file vide.'
      ]
    ],
    life: [
      [
        'Tickets au guichet',
        'Un guichet donne les tickets 41 puis 42 et appelle ensuite un numéro.',
        'La règle premier arrivé, premier sorti décrit une file, indépendamment du rangement des tickets.',
        'Une urgence peut introduire une priorité : ce nouveau service ne respecte plus la file simple étudiée.'
      ],
      [
        'Prise électrique',
        'Tu branches une lampe sans ouvrir le mur pour examiner le trajet des fils.',
        'L’interface décrit le service utilisable ; l’implémentation désigne comment le système fournit ce service.',
        'Une interface informatique doit aussi préciser les résultats, erreurs et effets sur les données ; la prise ne les explique pas.'
      ]
    ],
    sections: [
      [
        'Partir de trois tickets',
        'Notons les demandes A, B puis C, dans leur ordre d’arrivée. Une file doit retirer A, puis B, puis C : c’est FIFO, abréviation de « premier entré, premier sorti ». Enfiler ajoute une demande ; défiler retire et renvoie la plus ancienne. Une file vide ne contient rien à servir : on doit annoncer ce cas avant d’écrire le programme.'
      ],
      [
        'Écrire la promesse',
        'Une interface énumère les opérations disponibles : créer une file, savoir si elle est vide, ajouter une valeur et retirer la première. Le contrat précise ce que reçoit chaque opération et ce qu’elle renvoie. La précondition est une condition exigée avant l’appel : défiler exige ici une file non vide. Une exception est l’erreur annoncée lorsque cette condition échoue.',
        pause(
          'Défiler une file vide doit-il inventer une valeur ?',
          'Non, le contrat annonce une erreur.',
          'Oui, renvoyer zéro convient toujours.',
          'Zéro peut être une vraie donnée. Une erreur explicite distingue l’absence d’élément de la valeur zéro et respecte la promesse annoncée.'
        )
      ],
      [
        'Première réalisation : une liste',
        'Avec la liste [A,B], append(C) ajoute C à droite. pop(0) retire et renvoie la valeur à la position zéro : A. Les valeurs B et C doivent alors être décalées. L’implémentation est cette manière concrète de stocker et d’agir. Le programme utilisateur, appelé client, doit demander un retrait plutôt que modifier lui-même les cases : il dépend ainsi seulement du contrat.'
      ],
      [
        'Deux piles produisent le même ordre',
        'Une pile retire le dernier élément ajouté, comme des assiettes empilées. Fixons son sommet à droite. Les arrivées A puis B donnent une pile d’entrées [A,B]. Transférer B puis A vers une pile de sorties donne [B,A] : son prochain retrait est A. Une arrivée C reste dans les entrées tant que des sorties attendent ; la transférer trop tôt ferait passer C devant B.',
        pause(
          'Sorties [B,A], entrées [C] : quelle demande retirer ?',
          'A, déjà au sommet des sorties.',
          'C, arrivée le plus récemment.',
          'La pile des sorties est déjà dans l’ordre du service. Le transfert n’a lieu que lorsqu’elle est vide ; A reste donc la plus ancienne demande.'
        )
      ],
      [
        'Même résultat, coûts différents',
        'Le coût compte ici des opérations élémentaires, pas une durée en secondes. Pour n demandes, où n désigne leur nombre, retirer au début d’une liste peut déplacer presque n valeurs : coût linéaire. Avec deux piles, un retrait peut transférer beaucoup de valeurs, mais chaque valeur ne change de pile qu’une fois. Sur toute une suite d’opérations, on répartit ce travail : c’est un coût amorti.'
      ]
    ],
    reasoning: [
      'Après l’arrivée de A, la file contient A. Après B, A reste le plus ancien. Une liste retire donc sa première case A ; les deux piles transfèrent B puis A et retirent également A. La représentation change mais pas la réponse du contrat.',
      'Le sommet est à droite, donc la pile des sorties [B,A] propose A avant B. C vient d’arriver dans les entrées ; son ancienneté est inférieure à celle des deux sorties. On ne transfère rien tant que les sorties sont non vides, puis on retire A.',
      'On commence par tester l’état vide : il ne possède aucun plus ancien élément. Le contrat exigeait une file non vide. Au lieu de confondre une absence avec une donnée comme zéro, l’opération signale l’exception IndexError.'
    ]
  }),
  objets: pedagogy({
    program: [
      'Lire une petite classe complète',
      'class annonce la description Compte. Le constructeur __init__ reçoit self, l’objet à initialiser, puis le solde fourni. Dans la méthode deposer, self désigne le destinataire de l’appel. Le signe += ajoute à l’ancienne valeur ; raise ValueError refuse l’entrée avant la modification. Après a = Compte(10), a.deposer(3) donne donc a.solde égal à 13. On crée b par un autre appel pour obtenir un état séparé.',
      'class Compte:\n    def __init__(self, solde=0):\n        if solde < 0:\n            raise ValueError("solde negatif")\n        self.solde = solde\n\n    def deposer(self, montant):\n        if montant < 0:\n            raise ValueError("montant negatif")\n        self.solde += montant'
    ],
    intro: [
      'Deux tirelires contiennent 10 euros et 2 euros. Ajouter 3 euros à la première ne doit pas changer le contenu de la seconde.',
      'Comment représenter plusieurs choses de même nature en conservant pour chacune ses informations et les actions autorisées ?',
      'Les objets permettent de rassembler un état et les opérations qui le font évoluer sans mélanger les exemplaires.'
    ],
    journey: [
      'Nommer l’état de chaque compte.',
      'Construire deux objets avec une même classe.',
      'Lire un attribut et appeler une méthode.',
      'Empêcher une opération de casser une règle.'
    ],
    recap: [
      [
        'Variable et affectation',
        'Une variable est un nom associé à une valeur ou à un objet ; le signe = établit cette association.',
        'solde = 10 associe le nom solde à la valeur 10.'
      ],
      [
        'Fonction et paramètre',
        'Une fonction décrit un traitement ; le paramètre est un nom qui reçoit la valeur fournie à chaque appel.',
        'deposer(3) fournit 3 au paramètre montant.'
      ],
      [
        'Condition',
        'Une condition est une question dont la réponse est vraie ou fausse et qui permet de choisir une action.',
        'montant < 0 demande si le montant est strictement négatif.'
      ]
    ],
    life: [
      [
        'Deux tirelires',
        'Lou possède une tirelire de 10 euros et Sami une tirelire de 2 euros.',
        'La classe décrit la même organisation, tandis que chaque instance conserve son propre solde.',
        'Deux noms Python peuvent aussi désigner la même instance : il faut vérifier qu’on a bien construit deux objets.'
      ],
      [
        'Thermostats de deux pièces',
        'Deux pièces ont chacune une température mesurée et une consigne réglable.',
        'Chaque thermostat peut être représenté par un état et des méthodes de lecture ou de réglage.',
        'Un objet logiciel ne mesure aucune température tout seul ; un vrai capteur et un dispositif physique sont nécessaires.'
      ]
    ],
    sections: [
      [
        'Nommer les informations et les actions',
        'Pour un compte simplifié, le solde est l’information qui doit rester disponible entre deux actions. Déposer est une action qui ajoute un montant. En programmation orientée objet, un objet réunit ces informations, appelées attributs, et ces actions, appelées méthodes. Ce modèle de compte sert à apprendre ; il ne décrit pas toutes les règles d’un compte bancaire réel.'
      ],
      [
        'Une classe fabrique des instances',
        'Une classe est une description commune ; une instance est un exemplaire créé à partir d’elle. En Python, class Compte: commence cette description. Compte(10) crée une instance initialisée à 10. La méthode spéciale __init__ réalise l’initialisation. Son premier paramètre self désigne l’instance en cours ; self.solde = solde conserve la valeur dans cet objet, au lieu d’une variable temporaire.',
        pause(
          'Deux appels séparés Compte(10) et Compte(2) créent-ils un seul solde partagé ?',
          'Non, chaque instance possède son état.',
          'Oui, la classe impose une seule valeur.',
          'La classe est la description commune. Chaque construction crée ici un objet distinct, avec son propre attribut solde initialisé séparément.'
        )
      ],
      [
        'Lire et agir sont deux demandes',
        'Si c désigne un compte, c.solde lit son attribut : le point sélectionne une information de c. c.deposer(5) appelle une méthode ; les parenthèses fournissent le montant 5. Dans le corps de la méthode, self désigne alors c. L’écriture self.solde += montant signifie remplacer le solde par son ancienne valeur plus le montant. Pour 12 puis 8, on calcule 12 + 8, donc 20.'
      ],
      [
        'Préserver une règle',
        'Un invariant est une propriété qui doit rester vraie après chaque opération autorisée. Ici, solde >= 0 signifie « solde supérieur ou égal à zéro ». On refuse un montant négatif avant de modifier l’objet ; raise ValueError signale cette entrée invalide. Tester après la modification laisserait momentanément ou définitivement un état interdit. Le constructeur doit lui aussi vérifier cette règle.',
        pause(
          'Quand faut-il refuser un dépôt négatif ?',
          'Avant de changer le solde.',
          'Après avoir laissé le solde modifié.',
          'La méthode vérifie d’abord le montant. Si elle échoue, l’état initial est conservé ; la propriété annoncée reste donc vraie après l’erreur.'
        )
      ],
      [
        'Suivre chaque objet séparément',
        'Créons a avec 10 et b avec 2. a.deposer(3) choisit l’objet a : son solde devient 13, celui de b reste 2. En revanche b = a associerait deux noms au même objet et ne créerait aucune copie. Respecter les méthodes documentées permet ensuite de changer la classe sans modifier les appels du programme utilisateur ; accéder directement aux détails internes peut empêcher cette évolution.'
      ]
    ],
    reasoning: [
      'Construire a initialise un premier attribut solde à 10. Construire b initialise un deuxième attribut à 2. Dans a.deposer(3), self désigne a : 10 + 3 donne 13. Aucune opération n’a pris b comme destinataire, donc son solde reste 2.',
      'Le point choisit une information de l’objet c. Sans parenthèses, c.solde lit sa valeur actuelle. Avec les parenthèses de c.deposer(5), on exécute une méthode en lui fournissant 5 ; cette action peut modifier l’état. Il faut donc distinguer observation et traitement.',
      'Le constructeur reçoit moins un. Avant toute affectation à l’attribut, il teste solde < 0 ; ce test est vrai. Il signale alors ValueError. Aucun compte utilisable avec un solde interdit n’est produit par cette construction.'
    ]
  }),
  listes: pedagogy({
    program: [
      'Construire et compter une chaîne',
      'class Cellule décrit les objets de la chaîne. __init__ initialise leurs attributs et self désigne l’objet créé. suivante=None donne une valeur par défaut lorsque le deuxième argument manque. Dans longueur, courante suit les références et n compte les cellules déjà lues ; is not None vérifie qu’un objet existe avant tout accès. return n intervient après la boucle, lorsque le comptage est fini.',
      'class Cellule:\n    def __init__(self, valeur, suivante=None):\n        self.valeur = valeur\n        self.suivante = suivante\n\ndef longueur(tete):\n    n = 0\n    courante = tete\n    while courante is not None:\n        n = n + 1\n        courante = courante.suivante\n    return n'
    ],
    intro: [
      'Une chasse au trésor commence avec une première carte. Chaque carte contient une indication et l’adresse de la carte suivante, jusqu’à la dernière.',
      'Comment conserver une suite lorsque chaque élément indique simplement où trouver le suivant ?',
      'Le chaînage montre pourquoi certains rangements facilitent l’ajout mais demandent du travail pour atteindre une position précise.'
    ],
    journey: [
      'Construire une cellule avec une valeur et un lien.',
      'Suivre les liens sans perdre le départ.',
      'Ajouter une nouvelle tête.',
      'Comparer les opérations au tableau Python.'
    ],
    recap: [
      [
        'Objet et attribut',
        'Un objet conserve des informations nommées attributs ; le point permet de les lire.',
        'carte.suivante lit le lien conservé dans la carte.'
      ],
      [
        'Référence',
        'Une référence permet de retrouver un objet ; copier cette référence ne copie pas l’objet.',
        'courante = tete donne deux noms à la même première cellule.'
      ],
      [
        'Boucle et fin',
        'Une boucle répète une opération tant qu’une condition reste vraie ; None indique ici l’absence d’objet.',
        'while courante is not None poursuit tant qu’une cellule existe.'
      ]
    ],
    life: [
      [
        'Chasse au trésor',
        'Une carte contient un indice et l’emplacement de la prochaine carte ; seule la première est donnée au départ.',
        'Chaque cellule possède sa valeur et un lien suivant ; pour atteindre la troisième, on suit deux liens.',
        'Les cartes physiques ont des distances et peuvent être perdues ; ces propriétés ne sont pas modélisées dans la liste.'
      ],
      [
        'Wagons reliés',
        'On ajoute un wagon avant le premier wagon d’une petite rame en changeant l’attelage de tête.',
        'Ajouter une cellule en tête demande un lien vers l’ancienne tête, sans déplacer toutes les valeurs.',
        'Les wagons peuvent se détacher et leurs attelages sont physiques ; une référence Python est une information en mémoire.'
      ]
    ],
    sections: [
      [
        'Une cellule conserve deux informations',
        'Pour représenter 4 puis 8, fabriquons une cellule contenant 4 et une autre contenant 8. La première conserve aussi une référence vers la seconde. Une cellule est donc un objet avec les attributs valeur et suivante. La dernière utilise None, qui signifie absence de cellule suivante. Une classe Cellule est la description servant à fabriquer ces objets ; son constructeur initialise les deux attributs.'
      ],
      [
        'La tête donne accès à la suite',
        'La tête est la référence vers la première cellule. Avec 4, puis 8, puis 2, tete.valeur donne 4. tete.suivante suit un lien et désigne la cellule de 8 ; ajouter .valeur lit donc 8. Le mot k désignera un nombre de liens à suivre. Pour atteindre un élément éloigné, on ne connaît pas immédiatement son adresse : on suit successivement les références.',
        pause(
          'Que lit tete.suivante.valeur dans la suite 4, 8, 2 ?',
          '8, après un seul lien.',
          '2, en sautant directement à la fin.',
          'suivante avance d’une cellule seulement. La tête contient 4 ; sa suivante contient 8 ; le point valeur lit cette deuxième cellule.'
        )
      ],
      [
        'Compter sans perdre le départ',
        'Initialisons un compteur n à zéro et une référence courante égale à la tête. Tant que courante ne vaut pas None, on ajoute un à n, puis on remplace courante par courante.suivante. Sur 4 puis 8, les états sont : n vaut 0 devant 4, puis 1 devant 8, puis 2 devant None. La tête n’a pas changé. L’écriture n += 1 signifie n = n + 1.'
      ],
      [
        'Ajouter avant l’ancienne tête',
        'Pour placer 5 devant 4 puis 8, on construit Cellule(5, tete) : son premier argument est la valeur 5, son deuxième est la référence vers l’ancienne tête. Ensuite tete = nouvelle associe la tête à la cellule créée. L’ordre devient 5, 4, 8. On n’a modifié ni la valeur 4 ni le lien de 4 vers 8 : une nouvelle porte d’entrée suffit.',
        pause(
          'La liste vide contient-elle une cellule None à compter ?',
          'Non, None indique qu’aucune cellule n’existe.',
          'Oui, elle contient une cellule sans valeur.',
          'Le test de la boucle précède toute lecture d’attribut. Une tête None fait zéro passage ; le compteur reste donc à zéro.'
        )
      ],
      [
        'Comparer avec une liste Python',
        'Une list Python est un tableau dynamique : les positions sont numérotées et l’accès à une case se fait directement. Dans une liste chaînée, atteindre la dixième cellule exige de traverser les précédentes. Ajouter en tête ne parcourt pas la chaîne, mais ajouter en tête d’un tableau décale ses valeurs. On dit coût constant pour un travail indépendant de la longueur, et linéaire lorsqu’il grandit proportionnellement.'
      ]
    ],
    reasoning: [
      'Lis la construction de l’intérieur vers l’extérieur : Cellule(2) termine la suite avec un lien None. Cellule(8, ...) pointe vers elle. Cellule(4, ...) devient la tête. À partir de cette tête, un lien atteint 8, un deuxième atteint 2 : la troisième valeur est 2.',
      'Conserve d’abord la référence vers l’ancienne tête contenant 4. Construis une nouvelle cellule contenant 5 dont le lien désigne cette ancienne tête. Réaffecte enfin tete à la nouvelle cellule : le parcours lit maintenant 5, puis 4, puis 8, sans perdre la suite.',
      'Au départ tete vaut None : aucune cellule n’existe. La condition courante is not None est donc fausse dès son premier examen ; le compteur reste zéro. Lire tete.valeur serait au contraire demander un attribut à une absence d’objet, ce qui provoque une erreur.'
    ]
  }),
  'piles-files': pedagogy({
    program: [
      'Un programme qui contrôle les parenthèses',
      'La variable pile garde les ouvertures en attente et c reçoit les caractères successifs. not pile est vrai quand la liste est vide. Une fermeture sans marque disponible produit un retour faux immédiatement ; sinon pop retire l’ouverture la plus récente. Le return final compare à la liste vide pour refuser aussi les ouvertures oubliées. Les autres caractères ne déclenchent aucune de ces deux branches.',
      'def parenthese_correcte(texte):\n    pile = []\n    for c in texte:\n        if c == "(":\n            pile.append(c)\n        elif c == ")":\n            if not pile:\n                return False\n            pile.pop()\n    return pile == []'
    ],
    intro: [
      'Pour retirer une assiette d’une pile on prend celle du dessus. À la boulangerie, on sert généralement la personne qui attend depuis le plus longtemps.',
      'Pourquoi ces deux règles de retrait donnent-elles des résultats différents à partir des mêmes arrivées ?',
      'Choisir le bon ordre de sortie permet de gérer une annulation, une attente ou des parenthèses sans mélanger les étapes.'
    ],
    journey: [
      'Observer le dernier arrivé dans une pile.',
      'Comparer au premier arrivé dans une file.',
      'Traduire les opérations avec une liste.',
      'Vérifier des parenthèses dans leur ordre.'
    ],
    recap: [
      [
        'Suite ordonnée',
        'Une suite conserve une position pour chaque élément ; changer l’ordre peut changer le résultat.',
        'Les arrivées A puis B ne sont pas les arrivées B puis A.'
      ],
      [
        'Liste et méthodes',
        'Une liste Python est écrite entre crochets ; append ajoute à droite et pop retire à droite.',
        'Après pile = [2] puis pile.append(6), pile.pop() renvoie 6.'
      ],
      [
        'Booléen et condition',
        'Un booléen est une valeur vraie ou fausse ; un test permet de choisir une action.',
        'True signifie vrai ; False signifie faux en Python.'
      ]
    ],
    life: [
      [
        'Annuler une rédaction',
        'Tu écris un titre, ajoutes une image puis déplaces l’image ; tu demandes une annulation.',
        'On annule d’abord le déplacement, dernière action enregistrée : c’est l’ordre de sortie d’une pile.',
        'Une application réelle doit conserver assez d’informations pour inverser chaque action, pas seulement son nom.'
      ],
      [
        'Documents à imprimer',
        'Trois documents arrivent A, B, C dans une imprimante configurée sans priorité.',
        'La file conserve l’ordre d’arrivée et sert A avant B et C.',
        'Une imprimante peut gérer des priorités ou des erreurs ; notre modèle suppose une file simple sans réorganisation.'
      ]
    ],
    sections: [
      [
        'Une pile expose son sommet',
        'Empiler signifie ajouter au sommet ; dépiler signifie retirer et renvoyer ce sommet. Fixons le sommet à droite : empiler A puis B donne [A,B], et dépiler renvoie B. LIFO est l’abréviation anglaise de « dernier entré, premier sorti ». On ne retire pas directement une valeur enfouie sous le sommet : cette restriction fait partie du service proposé.'
      ],
      [
        'Une file respecte les arrivées',
        'Une file reçoit aussi A puis B, mais son premier retrait renvoie A. FIFO signifie « premier entré, premier sorti ». Enfiler ajoute à l’arrière et défiler retire à l’avant. Le choix dépend du besoin : annuler la dernière action demande une pile ; servir les demandes dans leur ordre demande une file. Une priorité est une autre règle, à annoncer séparément.',
        pause(
          'Avec A puis B puis C, quel retrait correspond à une file simple ?',
          'A, le plus ancien.',
          'C, le plus récent.',
          'La file respecte l’ancienneté. C serait la sortie d’une pile ayant son sommet à droite ; les deux structures n’offrent pas le même contrat.'
        )
      ],
      [
        'Lire les opérations Python',
        'La liste vide s’écrit []. append(x) ajoute la valeur nommée x à droite ; pop() retire celle de droite ; pop(0) retire celle à la position zéro, donc à gauche. if not pile teste ici si la pile est vide. Il faut tester avant un retrait : une structure vide n’a aucune valeur à fournir. Copier une liste avec list(actions) protège l’original lorsqu’on souhaite la vider pour l’examiner.'
      ],
      [
        'Chaque fermeture attend une ouverture',
        'Dans un texte, une parenthèse ouvrante ( empile une marque. Une parenthèse fermante ) exige une marque disponible, puis la retire. Sur (()), la pile contient successivement une marque, deux marques, une marque puis zéro. Les lettres et autres signes sont ignorés ici. La boucle for c in texte prend chaque caractère dans l’ordre ; c est le nom donné au caractère en cours.'
      ],
      [
        'Deux contrôles empêchent les faux positifs',
        'Sur )(, la toute première fermeture trouve une pile vide : on renvoie immédiatement False, donc faux. Sur ((, aucune fermeture prématurée n’existe, mais des marques restent à la fin : on renvoie aussi False. Il faut donc vérifier le déroulement ET l’état final. La comparaison pile == [] demande si la pile est vide ; == compare, tandis que = affecte une valeur.',
        pause(
          'Le même nombre d’ouvertures et de fermetures suffit-il pour accepter )(?',
          'Non, la première fermeture est prématurée.',
          'Oui, une ouverture compensera ensuite.',
          'Une fermeture doit correspondre à une ouverture déjà rencontrée. Une ouverture située plus tard ne peut pas réparer le premier préfixe invalide.'
        )
      ]
    ],
    reasoning: [
      'Après A, puis B, puis C, le sommet de la pile est C. Annuler doit traiter la dernière action avant celles sur lesquelles elle s’appuie. Le premier dépilement renvoie C et laisse A, B dans cet ordre ; un deuxième renverrait B.',
      'A arrive avant B, qui arrive avant C. La file ajoute les nouvelles demandes derrière les anciennes. Au premier service, A est donc encore la plus ancienne demande ; son retrait laisse B puis C en attente.',
      'Au départ la pile est vide. Le premier caractère est une fermeture ; elle demanderait de retirer une ouverture inexistante. On conclut immédiatement faux, avant de lire l’ouverture suivante. L’égalité des nombres totaux ne garantit pas l’ordre correct.'
    ]
  }),
  dictionnaires: pedagogy({
    program: [
      'Traduire le compteur en Python',
      'Le dictionnaire compte démarre vide. La boucle reçoit un mot à la fois. get(mot,0) lit son compteur ou utilise zéro lorsque la clé manque ; ajouter un tient compte de la nouvelle occurrence et l’affectation enregistre cette valeur. return transmet tout le dictionnaire après la boucle. Sur nsi, sql, nsi, les compteurs après les trois passages sont respectivement nsi:1, puis sql:1 ajouté, puis nsi:2.',
      'def compter_mots(mots):\n    compte = {}\n    for mot in mots:\n        ancien = compte.get(mot, 0)\n        compte[mot] = ancien + 1\n    return compte'
    ],
    intro: [
      'Dans un carnet, tu retrouves le numéro d’une personne à partir de son nom. Tu ne demandes pas « la troisième ligne », mais « le numéro de Mina ».',
      'Comment ranger des informations pour les retrouver à partir d’une étiquette plutôt que d’une position ?',
      'Les dictionnaires servent à retrouver des données, compter des mots et construire des index qui évitent de tout parcourir à chaque recherche.'
    ],
    journey: [
      'Associer une clé à une valeur.',
      'Différencier remplacer une valeur et ajouter une clé.',
      'Prévoir ce qui arrive quand la clé manque.',
      'Construire un compteur puis un index de positions.'
    ],
    recap: [
      [
        'Valeur et type',
        'Une valeur peut être un nombre, un texte ou une liste ; son type précise les opérations possibles.',
        '"Ada" est un texte, 14 est un entier, [0,2] est une liste.'
      ],
      [
        'Indice',
        'Un indice est le numéro d’une position dans une liste ; en Python la première porte le numéro zéro.',
        'Dans ["x","y","x"], les positions de "x" sont 0 et 2.'
      ],
      [
        'Affectation et comparaison',
        'Le signe = stocke une valeur ; le signe == demande si deux valeurs sont égales.',
        'score = 2 mémorise 2 ; score == 2 produit une réponse vraie.'
      ]
    ],
    life: [
      [
        'Annuaire personnel',
        'Tu cherches un numéro en donnant un identifiant unique de contact dans ton répertoire.',
        'L’identifiant joue le rôle de clé et le numéro associé joue le rôle de valeur.',
        'Les noms humains peuvent être identiques : il faut alors choisir une clé plus précise que le seul prénom.'
      ],
      [
        'Inventaire d’une épicerie',
        'Un commerçant compte combien de fois chaque produit apparaît dans une livraison.',
        'Le nom du produit sert de clé et le nombre d’occurrences devient sa valeur mise à jour.',
        'Le compteur informatique suppose des noms cohérents ; deux orthographes différentes sont deux clés distinctes.'
      ]
    ],
    sections: [
      [
        'Une association a une clé et une valeur',
        'Prenons {"Ada":14,"Lin":17}. Les accolades délimitent un dictionnaire ; les deux-points relient une clé à sa valeur et les virgules séparent les associations. La clé "Ada" donne accès à 14, sa valeur. Une clé n’apparaît qu’une fois, alors que plusieurs clés peuvent avoir la même valeur. On choisit ici des textes ou des entiers pour les clés.'
      ],
      [
        'Remplacer ne crée pas une nouvelle clé',
        'L’instruction d["Ada"] = 18 lit le dictionnaire nommé d, cherche la clé "Ada" et remplace sa valeur. Si Ada et Lin étaient les seules clés, len(d), qui compte les associations, vaut toujours 2. Affecter d["Mina"] = 18 ajoute au contraire une nouvelle clé. Les valeurs 18 peuvent se répéter sans fusionner les deux personnes.',
        pause(
          'Après {"A":2} puis d["A"]=5, combien d’associations reste-t-il ?',
          'Une, avec la valeur 5.',
          'Deux, une pour 2 et une pour 5.',
          'La clé A existait déjà. L’affectation remplace sa valeur ; elle n’ajoute pas une deuxième association portant la même clé.'
        )
      ],
      [
        'Décider du sens d’une absence',
        'd["C"] demande une valeur qui doit exister ; si la clé C manque, Python signale KeyError, une erreur de clé. d.get("C",0) renvoie au contraire zéro lorsque C manque. Le test "C" in d demande si C est une clé, pas une valeur. get n’ajoute pas automatiquement la clé manquante. La valeur par défaut doit correspondre au problème : zéro convient pour compter, moins pour un numéro de téléphone.'
      ],
      [
        'Compter un passage à la fois',
        'Pour les mots nsi, sql, nsi, on part de {}. Le premier nsi n’existe pas : get(nsi,0) donne 0 ; on ajoute 1 et on mémorise 1. sql reçoit aussi 1. Au deuxième nsi, la valeur existante est 1 ; 1 + 1 donne 2. Dans la boucle for mot in mots, mot désigne chaque texte successif. Le dictionnaire final contient nsi associé à 2 et sql associé à 1.',
        pause(
          'Faut-il remettre le compteur de nsi à 1 à chaque occurrence ?',
          'Non, on ajoute un au compteur existant.',
          'Oui, la dernière occurrence suffit.',
          'Remettre à un effacerait les occurrences précédentes. On lit l’ancienne valeur, ou zéro si elle manque, puis on lui ajoute un.'
        )
      ],
      [
        'Comprendre l’index et ses coûts',
        'Un index associe un contenu à ses positions. Pour x, y, x, la clé x conserve [0,2] et y conserve [1] : une liste préserve toutes les occurrences. Construire cet index demande un parcours initial. Les dictionnaires Python utilisent un hachage, calcul qui oriente la recherche vers une zone de rangement ; l’accès est en moyenne constant, sans promettre que chaque accès particulier a toujours le même coût. Une liste mutable ne peut pas servir directement de clé.'
      ]
    ],
    reasoning: [
      'Le dictionnaire initial contient une seule clé A liée à 2. L’affectation utilise exactement cette clé : elle remplace 2 par 5. On compte ensuite les clés présentes, pas les valeurs successivement observées : il reste A et donc une seule association.',
      'Lis séparément les clés A et B : elles sont différentes. Lis ensuite les valeurs : chacune vaut 2. La règle d’unicité concerne uniquement les clés ; aucune association n’est supprimée parce que les valeurs coïncident. On conserve donc deux associations.',
      'La seule clé initiale est A. L’accès direct à C demande une association inexistante et déclenche KeyError. Si le problème autorise zéro en l’absence de C, get("C",0) suit explicitement cette règle et renvoie 0 sans ajouter C.'
    ]
  }),
  'arbres-structure': pedagogy({
    program: [
      'Mesurer avec deux appels sur les enfants',
      'Ce programme reprend le comptage des nœuds pour préparer les exercices récursifs. Il renvoie zéro si arbre est None. Sinon arbre[1] et arbre[2] désignent ses sous-arbres ; chaque appel taille répète le comptage sur une partie plus petite. Le résultat gauche et le résultat droit sont additionnés avec un pour la racine. Pour une feuille, les deux appels rendent zéro, donc la taille vaut un.',
      'def taille(arbre):\n    if arbre is None:\n        return 0\n    gauche = taille(arbre[1])\n    droite = taille(arbre[2])\n    return 1 + gauche + droite'
    ],
    intro: [
      'Un dossier contient des sous-dossiers, qui peuvent eux-mêmes en contenir. Pour atteindre un document on descend depuis un dossier de départ.',
      'Comment décrire cette organisation par niveaux et mesurer sa profondeur sans confondre tous les éléments avec le plus long trajet ?',
      'Les arbres modélisent des hiérarchies et préparent les algorithmes qui explorent des dossiers ou organisent une recherche.'
    ],
    journey: [
      'Nommer les éléments d’une hiérarchie.',
      'Distinguer gauche, droite et absence d’enfant.',
      'Compter la taille puis la hauteur.',
      'Construire les bornes niveau après niveau.'
    ],
    recap: [
      [
        'Lien et hiérarchie',
        'Un lien relie deux éléments ; une hiérarchie organise des éléments depuis un départ commun.',
        'Un dossier principal contient un sous-dossier Images.'
      ],
      [
        'Liste et absence',
        'Les crochets rangent plusieurs valeurs ; None indique ici qu’aucun arbre n’est présent.',
        '[8,None,None] décrit un nœud contenant 8 et aucun enfant.'
      ],
      [
        'Puissance de deux',
        'Une puissance compte des multiplications répétées ; Python écrit la puissance avec **.',
        '2**3 signifie 2 × 2 × 2, donc 8.'
      ]
    ],
    life: [
      [
        'Dossiers d’un projet',
        'Un dossier Projet contient Images et Textes, puis Images contient Vacances.',
        'Les dossiers sont des nœuds, Projet est la racine, et un dossier sans sous-dossier est une feuille de ce modèle.',
        'Les raccourcis et liens symboliques peuvent créer d’autres relations ; on les écarte pour conserver une vraie hiérarchie.'
      ],
      [
        'Choix dans un jeu',
        'Une question propose deux réponses, chacune menant à une autre question ou à une conclusion.',
        'Chaque question peut être un nœud binaire avec un choix gauche et un choix droit ; les conclusions sont des feuilles.',
        'Un vrai dialogue peut revenir à une question précédente ; ce retour crée un graphe plutôt qu’un arbre simple.'
      ]
    ],
    sections: [
      [
        'Une racine et des descendants',
        'Un arbre est une organisation sans boucle autour d’un point de départ, la racine. Ses éléments sont des nœuds. Chaque nœud autre que la racine possède un seul parent, c’est-à-dire le nœud immédiatement au-dessus de lui. Les éléments immédiatement en dessous sont ses enfants. Une feuille n’a aucun enfant. Un sous-arbre est un nœud accompagné de tous ses descendants.'
      ],
      [
        'Deux places ne signifie pas deux enfants obligatoires',
        'Un arbre binaire prévoit au plus deux enfants par nœud, distingués comme gauche et droit. Un seul enfant à gauche diffère d’un seul enfant à droite. Ici, None représente le vide ; [valeur,gauche,droite] représente un nœud et ses deux sous-arbres. Les positions de cette liste sont 0 pour la valeur, 1 pour la gauche, 2 pour la droite. Un arbre plein impose zéro ou deux enfants à chaque nœud.',
        pause(
          'Un nœud binaire peut-il avoir seulement un enfant droit ?',
          'Oui, les deux places sont facultatives.',
          'Non, binaire impose deux enfants présents.',
          'Binaire limite le nombre d’enfants à deux et distingue leurs places. La propriété supplémentaire zéro ou deux concerne un arbre plein, pas tous les arbres binaires.'
        )
      ],
      [
        'La taille compte tous les nœuds',
        'La taille est le nombre total de nœuds. Avec la racine 8, son enfant 3, les enfants 1 et 6 de 3, puis l’enfant 10 de 8, on compte 8, 3, 1, 6, 10 : cinq nœuds. None ne compte pas comme un nœud. On peut décomposer ce comptage : un pour la racine, trois dans la partie gauche et un dans la partie droite donnent 1 + 3 + 1 = 5.'
      ],
      [
        'La hauteur suit seulement le plus long chemin',
        'Nous comptons la hauteur en nœuds, pas en liens. Le vide a hauteur zéro ; une feuille a hauteur un. Dans l’arbre précédent, le chemin 8, 3, 1 contient trois nœuds ; 8, 10 n’en contient que deux. La hauteur vaut donc trois. La profondeur d’un nœud compte les liens depuis la racine ; elle est différente de cette convention de hauteur.',
        pause(
          'Une branche courte ajoutée augmente-t-elle toujours la hauteur ?',
          'Non, seul le chemin le plus long décide.',
          'Oui, chaque nœud ajoute un à la hauteur.',
          'Un ajout augmente la taille. Il augmente la hauteur seulement s’il produit un chemin racine-feuille plus long que tous ceux qui existaient.'
        )
      ],
      [
        'Encadrer en remplissant les niveaux',
        'Notons h la hauteur et n la taille. Une chaîne de hauteur h possède au moins h nœuds. Au maximum, les niveaux contiennent 1, puis 2, puis 4, puis 8 nœuds : chaque nœud ouvre deux places. À hauteur 4, la somme est 1 + 2 + 4 + 8 = 15. En général ce maximum s’écrit 2**h - 1. On obtient h <= n <= 2**h - 1, où <= signifie inférieur ou égal. Le nombre minimal de niveaux est l’arrondi supérieur de log2(n+1) : log2 indique combien de doublements sont nécessaires.'
      ]
    ],
    reasoning: [
      'Repère d’abord la racine 8, puis les nœuds 3, 1, 6 et 10 : il y en a cinq. Les nœuds 1, 6 et 10 n’ont pas d’enfant et sont donc les feuilles. Les chemins les plus longs 8,3,1 et 8,3,6 contiennent trois nœuds ; la hauteur vaut trois.',
      'Une chaîne de trois nœuds ne se ramifie pas. Compter tous ses nœuds donne une taille de trois. Son unique chemin de la racine à la feuille les traverse tous ; avec la convention en nœuds, sa hauteur vaut elle aussi trois.',
      'None représente l’absence d’arbre et non une feuille sans valeur. Il n’y a aucun nœud à compter : taille zéro. Il n’y a pas non plus de chemin racine-feuille : la convention choisie attribue au vide la hauteur zéro.'
    ]
  }),
  'graphes-structure': pedagogy({
    program: [
      'Convertir explicitement ligne par ligne',
      'La variable ligne reçoit chaque ligne de la matrice. Pour cette ligne, enumerate produit j, l’indice de colonne, et lien, sa valeur zéro ou un. On ajoute j seulement lorsque lien vaut un. La liste voisins est ajoutée même lorsqu’elle reste vide : elle conserve le sommet isolé. On évite ici une écriture condensée pour rendre visibles les deux boucles et le moment où chaque liste est créée.',
      'def successeurs(matrice):\n    resultat = []\n    for ligne in matrice:\n        voisins = []\n        for j, lien in enumerate(ligne):\n            if lien == 1:\n                voisins.append(j)\n        resultat.append(voisins)\n    return resultat'
    ],
    intro: [
      'Une carte de rues montre des lieux reliés par des routes ; certaines rues autorisent les deux sens et d’autres un seul.',
      'Comment enregistrer les lieux et leurs liaisons pour répondre sans ambiguïté à la question « où peut-on aller depuis ici » ?',
      'Les graphes représentent des réseaux ; choisir leur stockage permet ensuite de chercher les voisins, les chemins ou les liaisons entrantes.'
    ],
    journey: [
      'Distinguer lieu, liaison et sens.',
      'Numéroter les lieux pour construire une matrice.',
      'Écrire les voisins sortants de chacun.',
      'Convertir sans perdre les lieux isolés.'
    ],
    recap: [
      [
        'Indice',
        'Un indice est le numéro d’une position ; la première position Python porte le numéro zéro.',
        'Les lieux A, B, C portent ici les indices 0, 1, 2.'
      ],
      [
        'Tableau de lignes',
        'Une liste de listes permet de ranger des cases en lignes et en colonnes.',
        'M[0][1] sélectionne la ligne 0 puis la colonne 1.'
      ],
      [
        'Relation orientée',
        'Une relation orientée distingue le départ et l’arrivée ; le retour n’est pas automatique.',
        'Une rue autorisée de A vers B ne garantit pas le trajet de B vers A.'
      ]
    ],
    life: [
      [
        'Rues à sens unique',
        'La rue entre la place A et la place B permet uniquement de circuler de A vers B.',
        'A et B sont des sommets et la rue est un arc orienté A vers B ; le sens inverse doit être enregistré séparément.',
        'Une vraie carte inclut horaires, virages et types de véhicules ; notre graphe retient seulement les relations annoncées.'
      ],
      [
        'Réseau d’amitiés',
        'Trois personnes déclarent des liens d’amitié réciproques ; une quatrième n’en déclare aucun.',
        'Les personnes sont des sommets, les amitiés des arêtes non orientées, et la quatrième personne reste un sommet isolé.',
        'Une relation humaine n’est pas un simple état binaire ; le modèle simplifie volontairement cette information.'
      ]
    ],
    sections: [
      [
        'Nommer ce que le dessin représente',
        'Un graphe rassemble des sommets et des relations entre eux. Un sommet peut représenter un lieu ; une arête est une relation sans sens, un arc une relation avec un départ et une arrivée. Un poids est un nombre attaché à une liaison, par exemple sa distance. Il ne faut pas confondre une distance de zéro et une absence de liaison ; ici nous stockons seulement l’existence avec 0 ou 1.'
      ],
      [
        'Fixer un ordre avant de remplir la grille',
        'Pour A, B, C, choisissons l’ordre des indices 0, 1, 2. Une matrice est une grille carrée ; les lignes indiquent les départs et les colonnes les arrivées. M[0][1] = 1 enregistre A vers B. Une case zéro indique ici l’absence d’arc. Avec n sommets, où n est leur nombre, chaque ligne possède n cases et les n lignes occupent n × n, aussi écrit n², cases.',
        pause(
          'La ligne de A indique-t-elle les sorties ou les entrées de A ?',
          'Les sorties de A vers les colonnes.',
          'Les entrées des autres sommets vers A.',
          'Le premier indice choisit le départ. Pour lire les entrées de A, il faut au contraire parcourir la colonne de A.'
        )
      ],
      [
        'Une liste de voisins par sommet',
        'On peut stocker seulement les successeurs : les sommets atteignables par un arc direct sortant. Si A mène à B et B mène à C, les listes deviennent [[1],[2],[]]. La première contient l’indice de B, la deuxième celui de C ; la troisième est vide parce que C n’a aucune sortie. On conserve une liste pour C : l’absence de liaison ne signifie pas l’absence de sommet.'
      ],
      [
        'Convertir une case à la fois',
        'Pour convertir [[0,1],[0,0]] en voisins, lisons la ligne zéro : la colonne zéro vaut 0, la colonne un vaut 1 ; les voisins de zéro sont donc [1]. La ligne un ne contient aucun 1 ; ses voisins sont []. En sens inverse, créons deux lignes indépendantes remplies de zéros, puis plaçons un 1 à chaque couple départ-arrivée présent. enumerate fournit à la fois une position et la valeur lue à cette position.'
      ],
      [
        'Retrouver les prédécesseurs et comparer les rangements',
        'Un prédécesseur de B est un sommet qui possède un arc vers B : on le cherche dans la colonne de B. Pour une arête non orientée A—B, on enregistre A vers B ET B vers A ; la matrice est alors symétrique, avec des cases miroirs égales. Une matrice facilite le test direct d’une liaison ; les listes de voisins évitent de stocker beaucoup de zéros dans un réseau peu relié.',
        pause(
          'Faut-il ajouter automatiquement B vers A quand on enregistre l’arc A vers B ?',
          'Non, seulement si la relation est réciproque.',
          'Oui, toute liaison a un retour.',
          'Le sens appartient au modèle. Un arc n’a pas de retour implicite ; une arête non orientée se représente en revanche dans les deux sens.'
        )
      ]
    ],
    reasoning: [
      'L’ordre A,B donne la ligne zéro à A et la colonne un à B. La case située à leur intersection vaut 1 : il existe A vers B. La ligne B est nulle : B n’a pas de sortie. En lisant la colonne B, on retrouve A comme prédécesseur.',
      'Une arête A—B autorise les deux sens, donc on marque la case de A vers B puis la case de B vers A. On fait de même pour B—C. Les cases opposées de part et d’autre de la diagonale sont égales : cette égalité exprime la symétrie.',
      'A existe dans l’ensemble des sommets même sans liaison. Sa liste de voisins est donc présente mais vide. Comme aucun arc ne sort de A, sa ligne est nulle ; comme aucun arc n’y entre, sa colonne l’est également. Supprimer la ligne ferait perdre le sommet.'
    ]
  })
};

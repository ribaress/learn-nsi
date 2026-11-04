import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const construitsPedagogy = {
  'premiere-tuples': {
    duration: 55,
    introduction: intro(
      'Pour retrouver une case sur une carte, tu donnes deux indications : une colonne et une ligne. Si tu en oublies une, ou si tu les inverses, ton camarade ne trouve pas le bon endroit.',
      'Comment renvoyer plusieurs informations ensemble tout en conservant leur ordre et leur sens ?',
      'Un tuple regroupe un résultat composé : coordonnées, quotient et reste, ou informations de natures différentes.',
      [
        'Construire un couple ordonné.',
        'Lire une position en comptant depuis zéro.',
        'Renvoyer et décomposer plusieurs valeurs.',
        'Choisir des noms et distinguer changement et création.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Valeur et variable',
        'Une valeur est une donnée, par exemple 8 ou un prénom. Une variable est un nom auquel le programme associe une valeur.',
        'age = 17 associe le nombre 17 au nom age ; = est une affectation.'
      ),
      recap(
        'Ordre et position',
        'Une collection ordonnée distingue la première place de la deuxième. En Python, on numérote ces places à partir de zéro.',
        'Dans (8, 13), la place 0 contient 8 et la place 1 contient 13.'
      ),
      recap(
        'Partage avec reste',
        'Le quotient compte les groupes complets ; le reste est ce qui ne suffit pas à former un groupe supplémentaire.',
        '17 objets partagés en groupes de 5 donnent 3 groupes et un reste de 2.'
      )
    ],
    realLifeExamples: [
      life(
        'Les coordonnées d’un siège',
        'Un billet précise une rangée et un numéro de siège, dans cet ordre.',
        'Un couple permet de conserver les deux valeurs dans un seul résultat ; leur ordre appartient à la convention de lecture.',
        'Un billet comporte aussi des noms de champs ; un tuple simple ne les stocke pas avec chaque valeur.'
      ),
      life(
        'Des sachets de biscuits',
        'On répartit 17 biscuits dans des sachets de 5 et veut annoncer sachets complets et biscuits restants.',
        'Une fonction peut renvoyer le couple (3, 2), afin que le même calcul fournisse deux informations liées.',
        'Le tuple conserve des nombres ; il ne réalise pas physiquement l’emballage ni le partage.'
      )
    ],
    sections: [
      s(
        'Construire un résultat à plusieurs places',
        'Un tuple est une suite ordonnée de valeurs regroupées, souvent écrite entre parenthèses et séparée par des virgules. point = (4, -2) associe un couple au nom point. Le premier nombre peut représenter le déplacement horizontal et le second le déplacement vertical. Un tuple peut aussi mélanger les types de données : ("Ada", 17) contient un texte et un nombre. Cette liberté exige une convention claire sur chaque place.'
      ),
      s(
        'Lire une position sans la confondre avec son numéro usuel',
        'L’indice est le numéro utilisé par le programme pour repérer une place. Il commence à zéro : point[0] lit la première valeur et point[1] la deuxième. Les crochets signifient ici « accéder à la place indiquée ». Avec p = (8, 13), p[1] vaut donc 13. Un couple n’a pas de place 2 : tenter de la lire provoque IndexError, un signal indiquant que l’indice dépasse les places disponibles.',
        {
          checkpoint: pause(
            'Dans (7, 12), quelle valeur occupe l’indice 0 ?',
            '7, la première valeur',
            '12, car zéro ne compterait pas',
            'L’indice zéro désigne précisément la première place. Il ne signifie pas « aucune valeur ».'
          )
        }
      ),
      s(
        'Définir une fonction qui renvoie un couple',
        'Une fonction est un traitement nommé que l’on peut appeler avec des valeurs. def partage(a, b): déclare son nom et ses deux paramètres ; les instructions décalées forment son corps. a // b calcule le quotient entier et a % b le reste du partage. return (a // b, a % b) renvoie les deux résultats ensemble et termine l’appel. Avec 17 et 5, on obtient (3, 2), car 17 = 5 fois 3 plus 2. On suppose ici b strictement positif pour éviter une division impossible.',
        { code: 'def partage(a, b):\n    return (a // b, a % b)\n\nresultat = partage(17, 5)' }
      ),
      s(
        'Décomposer en plusieurs variables',
        'q, r = partage(17, 5) distribue les valeurs du résultat : q reçoit la première, r la seconde. Cela s’appelle une décomposition ; ce n’est pas un second calcul de division. Il doit y avoir autant de variables que de valeurs. a, b = (1, 2, 3) échoue avec ValueError, car aucune règle ne dit où mettre la troisième valeur. Pour un déplacement, x, y = point prépare x + dx et y + dy ; + additionne les coordonnées aux déplacements.',
        {
          checkpoint: pause(
            'Après x, y = (4, -2), que vaut y ?',
            '−2',
            '4',
            'Les affectations suivent l’ordre du couple : x reçoit la première place et y la seconde.'
          )
        }
      ),
      s(
        'Conserver le point et fabriquer un nouveau résultat',
        'Un tuple est non modifiable : on ne remplace pas directement une de ses places après sa création. Pour déplacer (4, -2) de 3 horizontalement et de 1 verticalement, on construit (4 + 3, -2 + 1), soit (7, -1). Le point de départ reste disponible. L’ordre constitue un contrat : (latitude, longitude) n’a pas le même sens que (longitude, latitude). Si les positions deviennent difficiles à mémoriser, un dictionnaire associe des noms aux valeurs ; il répond à un autre besoin de lecture.'
      )
    ],
    exampleMethods: [
      'Commence par rechercher les groupes complets : trois groupes de cinq utilisent quinze objets ; dix-sept moins quinze en laisse deux. Place le quotient avant le reste pour respecter le contrat.',
      'Écris les positions du couple : indice 0 pour 4, indice 1 pour −2. La décomposition transfère ces deux positions dans les noms x et y sans modifier le tuple.',
      'Compte avant d’affecter : la source comporte trois places et la destination deux noms. L’échec signale cette différence de taille ; Python ne choisit pas de valeur à supprimer.'
    ]
  },
  'premiere-listes': {
    duration: 65,
    introduction: intro(
      'Tu as relevé les températures de cinq jours sur cinq cases d’un carnet. Tu veux corriger celle du mardi, puis extraire les jours chauds sans perdre l’ordre des relevés.',
      'Comment conserver une suite de valeurs, accéder à une case et construire une nouvelle suite par une règle ?',
      'Les listes servent à traiter des séries de mesures, des mots ou des scores sans écrire une variable différente pour chaque élément.',
      [
        'Créer une liste et repérer ses indices.',
        'Distinguer une valeur de sa case.',
        'Parcourir les valeurs ou les positions.',
        'Filtrer et transformer avec une compréhension.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Liste et élément',
        'Une liste Python est une collection ordonnée écrite entre crochets ; chaque donnée qu’elle contient est appelée un élément.',
        '[12, 15, 9] contient trois éléments, qui sont ici trois nombres.'
      ),
      recap(
        'Chaîne',
        'Une chaîne est du texte entre guillemets. Elle est composée de caractères et peut aussi être parcourue caractère par caractère.',
        '"terre" contient cinq lettres, dont deux e minuscules.'
      ),
      recap(
        'Condition',
        'Une condition produit vrai ou faux. Elle permet de choisir les éléments que l’on conserve dans une collection.',
        'len("lune") == 4 vérifie si le mot lune possède exactement quatre caractères.'
      )
    ],
    realLifeExamples: [
      life(
        'Une liste de courses corrigée',
        'Tu remplaces le deuxième article par un autre tout en gardant le reste de la liste.',
        'Affecter une nouvelle valeur à l’indice 1 change la deuxième case de la liste Python.',
        'Un papier ne possède pas automatiquement des indices ; le programme impose cette numérotation.'
      ),
      life(
        'Les mots d’une affiche',
        'Pour fabriquer une affiche, tu gardes seulement les mots de quatre lettres d’un texte.',
        'Une compréhension peut parcourir les mots, tester leur longueur et construire une nouvelle liste dans le même ordre.',
        'La longueur de texte compte des caractères ; elle ne mesure pas la largeur visuelle du mot sur l’affiche.'
      )
    ],
    sections: [
      s(
        'Créer des cases et numéroter depuis zéro',
        'notes = [12, 15, 9] crée une liste et associe cette liste au nom notes ; = est l’affectation. Les indices sont 0, 1 et 2. notes[1] lit 15, la deuxième case. len(notes) vaut 3 : len compte les éléments. Le dernier indice non négatif est donc la longueur moins un, ici 2. notes[3] dépasse la fin et provoque IndexError. Une liste vide s’écrit [] et ne possède aucune case à lire.'
      ),
      s(
        'Modifier une case et distinguer la copie de lecture',
        'notes[1] = 17 remplace directement la deuxième valeur. Si on écrit seulement valeur = notes[1] puis valeur = 17, on change le nom valeur, pas la case notes[1]. Cette différence explique pourquoi parcourir les valeurs ne suffit pas à remplacer les cases. Pour conserver l’original avant des remplacements simples, copie = list(notes) construit une nouvelle liste de ces éléments ; pour des listes imbriquées, les objets intérieurs demanderaient davantage de précautions.',
        {
          checkpoint: pause(
            'Dans [4, 7, 2], quelle case remplace t[1] = 9 ?',
            'La deuxième : le 7',
            'La première : le 4',
            'L’indice 1 désigne la deuxième place, puisque la première porte l’indice 0.'
          )
        }
      ),
      s(
        'Parcourir des éléments ou des indices',
        'Une boucle répète un bloc d’instructions. for valeur in notes: prend chaque nombre dans l’ordre ; les lignes décalées dessous s’exécutent pour ce nombre. Pour utiliser les positions, for i in range(len(notes)): parcourt 0, 1 et 2 ; range exclut sa borne supérieure. notes[i] = 2 * notes[i] remplace alors chaque case par son double ; * multiplie. Un compteur nombre commence à zéro et nombre += 1 signifie nombre = nombre + 1. if lettre == "e": utilise == pour comparer, et = reste réservé à l’affectation.'
      ),
      s(
        'Lire une compréhension dans l’ordre du parcours',
        'Une compréhension écrit en une ligne la construction d’une nouvelle liste. Dans [2 * x for x in [1, 2, 3, 4] if x % 2 == 0], commence par lire for : x reçoit chaque nombre. Puis if conserve ceux dont le reste de division par 2 est nul ; % calcule ce reste, donc repère ici les nombres pairs. Enfin 2 * x transforme les nombres gardés. Le résultat est [4, 8]. Sans partie if, toutes les valeurs sont transformées ; la liste source reste inchangée.',
        {
          checkpoint: pause(
            'Dans une compréhension, à quoi sert la partie if ?',
            'À décider quels éléments garder',
            'À modifier toutes les cases de la source',
            'La condition filtre les éléments visités ; la compréhension construit une nouvelle liste avec ceux qui satisfont le test.'
          )
        }
      ),
      s(
        'Nommer une règle réutilisable pour les mots',
        'Une fonction est un traitement nommé : def compte_e(mot): reçoit le texte dans le paramètre mot. On crée nombre = 0, on parcourt les lettres, et on ajoute une unité seulement pour chaque "e". return nombre, après la boucle, renvoie le total ; placé dans la boucle, il arrêterait le comptage trop tôt. Une autre fonction peut employer [mot for mot in mots if compte_e(mot) == 2]. Cela sépare deux tâches : compter dans un mot puis choisir des mots. Les majuscules E ne correspondent pas à "e" : la règle demandée porte précisément sur les minuscules.',
        {
          code: 'def compte_a(mot):\n    nombre = 0\n    for lettre in mot:\n        if lettre == "a":\n            nombre += 1\n    return nombre'
        }
      )
    ],
    exampleMethods: [
      'Note les indices 0, 1, 2 sous les valeurs 4, 7, 2. L’affectation vise seulement la case d’indice 1 ; on recopie les autres valeurs dans leur ordre initial.',
      'Examine les quatre valeurs : 1 et 3 ont un reste de 1 dans la division par 2, donc sont rejetées. 2 et 4 ont un reste nul, puis leur double fournit les deux résultats.',
      'Compare l’indice demandé à la longueur : deux cases correspondent aux indices 0 et 1. L’indice 2 serait celui d’une troisième case inexistante ; aucune valeur par défaut n’est inventée.'
    ]
  },
  'premiere-matrices': {
    duration: 65,
    introduction: intro(
      'Le plan d’une salle de cinéma indique des rangées et des sièges. Pour connaître un siège précis, donner seulement le numéro de rangée ne suffit pas.',
      'Comment organiser et parcourir un tableau qui possède des lignes et des colonnes ?',
      'Les listes de listes représentent des grilles, des images ou des tableaux de mesures, avec deux positions à suivre sans les inverser.',
      [
        'Passer d’une ligne à une grille.',
        'Lire les deux indices dans le bon ordre.',
        'Parcourir et totaliser les lignes.',
        'Construire des lignes indépendantes et une diagonale.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Liste',
        'Une liste est une suite de valeurs entre crochets. len(liste) compte ses éléments et liste[0] lit sa première case.',
        '[2, 4, 6] est une ligne de trois nombres dont le premier vaut 2.'
      ),
      recap(
        'Ligne et colonne',
        'Une ligne se lit horizontalement ; une colonne regroupe les positions verticales correspondantes. Les deux dimensions peuvent être différentes.',
        'Une salle de 3 rangées avec 5 sièges par rangée possède 15 sièges.'
      ),
      recap(
        'Boucle',
        'Une boucle répète un bloc. Si on place une boucle dans une autre, chaque passage extérieur déclenche tout le parcours intérieur.',
        'Pour chaque rangée, on visite successivement chacun de ses sièges.'
      )
    ],
    realLifeExamples: [
      life(
        'Un plan de places',
        'On veut indiquer si chaque siège d’une salle est libre ou occupé.',
        'La liste extérieure regroupe les rangées ; chaque liste intérieure conserve les sièges de cette rangée.',
        'Le nombre de sièges peut varier dans une vraie salle ; une matrice rectangulaire suppose des lignes de même longueur.'
      ),
      life(
        'Une petite image quadrillée',
        'Un dessin noir et blanc occupe une grille de carrés dont chacun est clair ou sombre.',
        'Chaque case peut conserver un nombre ; deux indices repèrent sa ligne et sa colonne.',
        'Une image réelle peut avoir plusieurs composantes de couleur par pixel, et non une simple valeur binaire.'
      )
    ],
    sections: [
      s(
        'Construire une liste contenant des listes',
        'm = [[2, 4, 6], [1, 3, 5]] contient deux éléments qui sont eux-mêmes des listes. Ces éléments sont les lignes ; chacune possède trois colonnes. On appelle matrice ce tableau à deux dimensions. Dans une matrice rectangulaire, toutes les lignes ont la même longueur. len(m) vaut 2, tandis que len(m[0]) vaut 3. Trois lignes de cinq colonnes contiennent quinze cases, car chaque ligne apporte cinq cases.'
      ),
      s(
        'Lire la ligne puis la colonne',
        'Dans m[1][2], le premier accès m[1] choisit la deuxième ligne, [1, 3, 5]. Le deuxième accès choisit sa troisième valeur, 5. Chaque indice commence à zéro. Les lettres i et j servent souvent de noms : i désigne le numéro de ligne et j celui de colonne, mais ce sont des conventions à annoncer. Inverser les deux indices peut lire une autre valeur ou dépasser le nombre de lignes.',
        {
          checkpoint: pause(
            'Dans [[8, 9, 10], [3, 4, 5]], que vaut m[1][0] ?',
            '3',
            '9',
            'On prend d’abord la deuxième ligne [3, 4, 5], puis sa première valeur, d’indice zéro.'
          )
        }
      ),
      s(
        'Calculer une somme pour chaque ligne',
        'Une fonction est un traitement nommé : def sommes(m): reçoit la matrice dans son paramètre m. resultat = [] crée la liste des sommes. for ligne in m: visite chaque ligne ; à chaque nouvelle ligne, total = 0 remet le compteur à zéro. Une boucle intérieure for valeur in ligne: additionne ses valeurs avec total += valeur, abréviation de total = total + valeur. resultat.append(total) ajoute ensuite une seule somme par ligne. return resultat se place après le parcours complet, afin de renvoyer toutes les sommes et non seulement la première.'
      ),
      s(
        'Fabriquer des lignes vraiment distinctes',
        'Une liste est un objet modifiable : plusieurs noms ou plusieurs cases peuvent désigner le même objet. Avec [[0] * 3] * 2, * répète ici des éléments de liste ; il ne fabrique pas deux lignes indépendantes. Les deux places extérieures désignent la même ligne. Un changement dans l’une apparaît donc dans l’autre. Pour obtenir deux lignes indépendantes, [[0 for j in range(3)] for i in range(2)] construit une nouvelle ligne à chaque passage extérieur. range(3) parcourt 0, 1, 2 et la borne 3 est exclue.',
        {
          checkpoint: pause(
            'Pourquoi [[0] * 2] * 2 peut-il changer deux lignes à la fois ?',
            'Les deux places désignent la même liste intérieure',
            'Python remplit automatiquement les colonnes identiques',
            'La répétition extérieure recopie une référence vers la ligne. Construire chaque ligne séparément évite ce partage involontaire.'
          )
        }
      ),
      s(
        'Placer les uns d’une diagonale',
        'Une matrice carrée possède autant de lignes que de colonnes. Sa diagonale principale va du coin supérieur gauche au coin inférieur droit : les deux indices y sont égaux. Pour une taille n de trois, les cases (0, 0), (1, 1) et (2, 2) valent 1, les autres 0. L’expression Python 1 if i == j else 0 choisit 1 si les indices sont égaux et 0 sinon ; == compare. Des compréhensions imbriquées permettent de créer toutes les cases. Pour n égal à zéro, range(0) ne fournit aucun indice et le résultat extérieur est [].',
        { code: 'grille = [[0 for colonne in range(3)] for ligne in range(2)]\ngrille[0][1] = 7' }
      )
    ],
    exampleMethods: [
      'Décompose les deux accès avant tout calcul : m[1] donne la liste complète de la seconde ligne ; dans cette liste, l’indice 2 sélectionne la troisième valeur. Les indices ne sont pas des nombres de cases.',
      'Calcule séparément 1 + 2 = 3, puis 3 + 4 = 7, puis 5 + 6 = 11. La somme générale est 3 + 7 + 11 ; un total par ligne demanderait de garder les trois résultats séparés.',
      'La multiplication extérieure duplique l’accès à une ligne, pas la ligne elle-même. L’écriture dans m[0][0] atteint donc l’objet que m[1] désigne aussi ; les deux lignes affichées révèlent ce partage.'
    ]
  },
  'premiere-dictionnaires': {
    duration: 60,
    introduction: intro(
      'Dans un répertoire de contacts, tu cherches le numéro associé au nom d’une personne. Connaître sa position dans une liste serait fragile si de nouveaux contacts étaient ajoutés.',
      'Comment retrouver une valeur par un nom plutôt que par un numéro de position ?',
      'Les dictionnaires décrivent des fiches et des correspondances ; ils servent aussi à compter les apparitions de catégories.',
      [
        'Associer une clé à une valeur.',
        'Ajouter et remplacer un champ.',
        'Choisir un parcours de clés ou de valeurs.',
        'Traiter une absence et construire un compteur.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Clé',
        'Une clé est l’information utilisée pour retrouver une association. Dans un même dictionnaire, deux associations ne possèdent pas la même clé.',
        'Dans un répertoire simplifié, le nom "Ada" peut servir de clé pour retrouver son score.'
      ),
      recap(
        'Valeur et type',
        'Une valeur peut être un nombre ou un texte. Son type indique les opérations qui ont un sens ; un nom et un score ne se traitent pas pareil.',
        '"12" est du texte, alors que 12 est un nombre auquel on peut ajouter 1.'
      ),
      recap(
        'Seuil',
        'Un seuil est une limite de décision. « Au moins le seuil » comprend l’égalité, ce que Python écrit avec >=.',
        'Un score de 10 est admis lorsque le seuil est 10 et que la règle est inclusive.'
      )
    ],
    realLifeExamples: [
      life(
        'Une fiche d’adhérent',
        'Une fiche de club contient un nom, une ville et un score.',
        'Un dictionnaire peut associer les clés "nom", "ville" et "score" à des valeurs de types différents.',
        'Le dictionnaire ne vérifie pas automatiquement qu’un score est valide ; les règles du club doivent être programmées.'
      ),
      life(
        'Le comptage des votes de la classe',
        'Chaque élève choisit une activité ; on veut le nombre de votes pour chacune.',
        'Un dictionnaire associe le nom de l’activité à un compteur que chaque nouvelle réponse augmente.',
        'Compter des votes ne décide pas de leur légitimité ni de la règle de départage en cas d’égalité.'
      )
    ],
    sections: [
      s(
        'Donner des noms aux champs',
        'Un dictionnaire associe des clés uniques à des valeurs et s’écrit entre accolades. fiche = {"nom": "Ada", "score": 12} possède deux associations : chaque paire utilise deux-points entre la clé et sa valeur, puis une virgule sépare les paires. fiche["score"] retrouve 12 par le nom du champ. Les crochets ne désignent plus un indice de position comme dans une liste. Les guillemets indiquent ici des clés qui sont du texte.'
      ),
      s(
        'Ajouter ou remplacer sans confondre les deux opérations',
        'fiche["score"] = 15 remplace la valeur de la clé existante : le nombre de champs ne change pas. fiche["ville"] = "Paris" ajoute une nouvelle association, car cette clé était absente. = affecte une valeur ; == compare. Deux écritures de la même clé ne créent pas deux champs indépendants. Il faut donc choisir des clés adaptées : si deux adhérents ont le même prénom, utiliser ce seul prénom comme identifiant peut écraser une information.',
        {
          checkpoint: pause(
            'Après d = {"A": 1} puis d["A"] = 4, combien de clés a d ?',
            'Une seule',
            'Deux, car deux nombres ont été écrits',
            'L’affectation à une clé existante remplace sa valeur. La clé A reste unique et désigne maintenant 4.'
          )
        }
      ),
      s(
        'Choisir ce que la boucle doit lire',
        'Une boucle for repète un bloc pour chaque élément visité. for cle in d: ou for cle in d.keys(): visite les clés. d.values() fournit les valeurs ; sum(d.values()) additionne ces valeurs lorsqu’elles sont numériques. d.items() fournit des couples clé-valeur : for nom, score in scores.items(): les décompose en deux variables. Pour filtrer, if score >= seuil: garde les personnes admissibles. sorted(...) produit une nouvelle liste ordonnée, alphabétiquement pour des noms de texte.'
      ),
      s(
        'Une absence n’est pas un zéro',
        'Lire d["B"] lorsque B n’est pas une clé provoque KeyError. Le test "B" in d vérifie la présence de cette clé. d.get("B", 0) lit sa valeur si elle existe et fournit zéro sinon ; ce zéro par défaut ne crée pas la clé. Une clé peut exister avec une valeur nulle : {"A": 0} contient bien A. Tester seulement si la valeur est vraie ou fausse mélangerait la présence d’une donnée et sa valeur.',
        {
          checkpoint: pause(
            'Dans {"A": 0}, la clé A est-elle présente ?',
            'Oui, elle est associée au nombre zéro',
            'Non, car zéro est une absence',
            'La présence concerne la clé, pas le nombre stocké. Le test "A" in d est vrai même lorsque sa valeur est 0.'
          )
        }
      ),
      s(
        'Nommer une fonction de comptage',
        'Une fonction est un traitement nommé ; def effectifs(categories): reçoit les catégories dans un paramètre. comptes = {} crée un dictionnaire vide. La boucle for categorie in categories: lit les catégories dans l’ordre. comptes[categorie] = comptes.get(categorie, 0) + 1 récupère l’ancien compteur, ou zéro à la première apparition, puis ajoute une unité. À la fin, return comptes renvoie le résultat ; le décalage de cette ligne doit la placer après la boucle. Pour renvoyer des noms admissibles triés, une compréhension [nom for nom, score in scores.items() if score >= seuil] construit d’abord la liste des noms, puis sorted la classe.',
        {
          code: 'comptes = {}\nfor couleur in ["bleu", "rouge", "bleu"]:\n    comptes[couleur] = comptes.get(couleur, 0) + 1'
        }
      )
    ],
    exampleMethods: [
      'Repère d’abord les clés existantes : seul A est présent. B est nouveau, donc l’affectation ajoute une association sans toucher à la valeur de A ; le résultat a deux clés.',
      'Demande ce que values fournit : les nombres 2 et 5, tandis qu’un parcours direct de d donnerait les textes A et B. Additionne ensuite seulement les deux valeurs numériques.',
      'Vérifie la présence exacte de B : elle est absente, indépendamment de la présence de A. L’accès direct signale cette absence ; get permet au contraire une convention explicite de valeur par défaut.'
    ]
  }
};

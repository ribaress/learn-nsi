import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const representationsPedagogy = {
  'premiere-signes': {
    duration: 60,
    introduction: intro(
      'Le thermomètre de la cour indique 7 degrés le matin et moins 3 degrés la nuit. Un appareil doit mémoriser ces deux mesures avec les mêmes petites cases qui ne contiennent que 0 ou 1.',
      'Comment les mêmes cases peuvent-elles représenter un nombre positif et un nombre négatif ?',
      'Le complément à deux donne une règle précise pour lire les températures négatives et savoir quand le format devient trop petit.',
      [
        'Construire des nombres avec des interrupteurs.',
        'Donner un poids négatif à la première case.',
        'Coder puis relire une température.',
        'Préparer le décodage en Python et détecter les dépassements.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Bit et mot binaire',
        'Un bit est une case qui vaut 0 ou 1. Un mot binaire est une suite de ces cases ; sa longueur est le nombre de bits conservés.',
        '1101 est un mot de quatre bits, même si on ignore encore sa valeur.'
      ),
      recap(
        'Poids des positions',
        'En lecture non signée, la case de droite vaut une unité ; chaque case vers la gauche vaut le double. On additionne seulement les poids dont le bit vaut 1.',
        '1101 vaut 8 + 4 + 0 + 1, donc 13 en lecture non signée.'
      ),
      recap(
        'Nombre négatif',
        'Un nombre négatif se situe sous zéro. Ajouter son opposé ramène à zéro ; soustraire un nombre positif fait descendre sur une droite graduée.',
        '13 − 16 = −3 : partir de 13 puis reculer de seize unités.'
      )
    ],
    realLifeExamples: [
      life(
        'Une chambre froide',
        'Une sonde doit enregistrer moins 7 degrés aussi facilement que plus 7 degrés.',
        'Le format signé attribue un sens négatif à certains mots de bits. La taille choisie fixe les températures entières accessibles.',
        'Le codage ne donne pas la précision physique du capteur ; les degrés fractionnaires demandent une autre convention.'
      ),
      life(
        'Le solde de jetons',
        'Un jeu affiche les jetons gagnés ou une dette après une pénalité.',
        'Un compteur signé peut mémoriser une dette, mais ne peut dépasser les bornes du nombre de bits réservés.',
        'La dette du jeu peut être arbitrairement grande sur le papier ; le compteur de taille fixe ne le peut pas.'
      )
    ],
    sections: [
      s(
        'Fixer les cases avant de leur donner un sens',
        'Imagine quatre interrupteurs dont les positions sont écrites de gauche à droite. En lecture non signée, leurs poids sont 8, 4, 2 et 1. Le mot 0101 vaut donc 0 + 4 + 0 + 1 = 5. Le mot ne porte aucune étiquette positive ou négative : une convention de lecture est nécessaire. Nous gardons toujours quatre cases dans ce premier essai, y compris les zéros à gauche.'
      ),
      s(
        'Remplacer le poids de gauche par un poids négatif',
        'La convention appelée complément à deux donne aux quatre cases les poids −8, 4, 2 et 1. Les trois poids de droite restent positifs. Ainsi 1101 se lit −8 + 4 + 0 + 1 = −3. Pour 0101, le poids négatif est absent et le résultat reste 5. Un premier bit égal à 1 indique ici une valeur négative ; il ne se retire pas simplement pour lire une grandeur.',
        {
          checkpoint: pause(
            'Que représente 1000 sur quatre bits en complément à deux ?',
            '−8',
            '0 avec un signe moins',
            'La première case porte le poids −8 ; les trois autres cases sont nulles. Le résultat est −8 et non un zéro signé.'
          )
        }
      ),
      s(
        'Écrire moins sept et vérifier le résultat',
        'Sur huit bits, les poids positifs de droite sont 64, 32, 16, 8, 4, 2 et 1 ; celui de gauche vaut −128. Une écriture négative se trouve en retirant sa grandeur à 256, le nombre de configurations sur huit bits. Pour −7, calculer 256 − 7 = 249 donne 11111001. Vérifions avec les poids signés : −128 + 64 + 32 + 16 + 8 + 1 = −7. Cette vérification évite de retenir une recette sans sens.'
      ),
      s(
        'Mesurer le domaine représentable',
        'Sur quatre bits, le plus petit nombre est −8 et le plus grand est 4 + 2 + 1 = 7. Sur huit bits, le domaine va de −128 à 127. Pour généraliser, n désigne le nombre de bits ; 2 ** n signifie multiplier n fois le nombre 2 par lui-même. Le domaine signé est de −2 ** (n − 1) à 2 ** (n − 1) − 1. La somme 100 + 60 vaut 160 : elle dépasse 127, mais tient sur neuf bits, dont le maximum est 255.',
        {
          checkpoint: pause(
            'Peut-on coder 128 sur huit bits signés dans cette convention ?',
            'Non, le maximum est 127',
            'Oui, 10000000 représente 128',
            '10000000 se lit −128 dans le format signé. Le même mot représente 128 seulement avec une lecture non signée.'
          )
        }
      ),
      s(
        'Préparer un décodeur Python',
        'Une fonction est un traitement nommé : def decode_signe(mot): définit le nom et le paramètre mot, c’est-à-dire le texte reçu. Les lignes décalées sous def forment son corps. Une variable conserve une valeur : valeur = int(mot, 2) lit le texte en base 2 ; len(mot) compte ses caractères. mot[0] lit le premier caractère, l’indice commençant à zéro. if teste une condition ; == compare, alors que = affecte. Si ce caractère est "1", retirer 2 ** len(mot) remplace le poids positif de gauche par son opposé. valeur -= nombre signifie valeur = valeur − nombre. Enfin return valeur renvoie le résultat et termine la fonction ; Python lui-même ne limite pas ses entiers à huit bits.',
        {
          code: 'def lire_quatre_bits(mot):\n    valeur = int(mot, 2)\n    if mot[0] == "1":\n        valeur = valeur - 16\n    return valeur'
        }
      )
    ],
    exampleMethods: [
      'Écris d’abord les huit poids non signés : 128, 64, 32, 16, 8, 4, 2, 1. Les bits actifs donnent 246. Comme le premier bit vaut 1, retire 256 ; cette correction change seulement le rôle du premier poids.',
      'Commence par choisir huit cases : sans cette taille, la soustraction ne serait pas définie. Décompose ensuite 249 en 128 + 64 + 32 + 16 + 8 + 1 et garde les zéros manquants avant de vérifier avec le poids −128.',
      'Compare la valeur demandée aux bornes avant de chercher des bits. Huit bits signés atteignent seulement 127 ; écrire une neuvième case changerait le format au lieu de résoudre le problème dans le format demandé.'
    ]
  },
  'premiere-flottants': {
    duration: 65,
    introduction: intro(
      'Tu partages un gâteau en trois et essaies de noter exactement la taille d’une part avec seulement quatre chiffres après la virgule. La calculatrice est confrontée à une difficulté comparable, mais avec des chiffres binaires.',
      'Pourquoi une machine peut-elle afficher une petite différence entre une somme calculée et le nombre attendu ?',
      'Comprendre les approximations évite de rejeter une mesure correcte ou de prendre un résultat arrondi pour une valeur exacte.',
      [
        'Partager une unité en moitiés successives.',
        'Construire quelques écritures binaires après la virgule.',
        'Comprendre pourquoi la mémoire impose un arrondi.',
        'Comparer des mesures avec une tolérance annoncée.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Fraction',
        'Une fraction décrit un partage : le dénominateur indique en combien de parts égales on partage, le numérateur combien on en prend.',
        'Un quart est 1/4, c’est-à-dire une part lorsque l’unité est divisée en quatre.'
      ),
      recap(
        'Position binaire',
        'Un chiffre binaire vaut 0 ou 1. Après la virgule, les poids sont divisés par deux à chaque déplacement vers la droite.',
        'Les trois premiers poids sont une moitié, un quart et un huitième.'
      ),
      recap(
        'Distance et tolérance',
        'La distance entre deux valeurs est l’écart sans signe. Une tolérance est l’écart maximal que le problème accepte dans une unité donnée.',
        '1,001 m et 1 m sont séparés de 0,001 m, soit un millimètre.'
      )
    ],
    realLifeExamples: [
      life(
        'Une règle graduée au millimètre',
        'Tu mesures une feuille et obtiens environ 29,7 cm ; la règle ne donne pas une infinité de chiffres.',
        'Un flottant conserve aussi une quantité finie d’information et représente certaines valeurs par une valeur voisine.',
        'La règle a une incertitude physique ; le flottant suit une règle mathématique de représentation et d’arrondi.'
      ),
      life(
        'Une caisse en centimes',
        'Pour trois articles à 10 centimes, on veut facturer exactement 30 centimes.',
        'Compter les centimes avec des entiers évite une approximation binaire de 0,10 euro et une égalité flottante fragile.',
        'Cette solution convient à des montants en centimes entiers ; un calcul de taux peut nécessiter une règle d’arrondi supplémentaire.'
      )
    ],
    sections: [
      s(
        'Composer une part avec des moitiés',
        'Pour faire 0,625 d’un gâteau, prends une moitié puis un huitième : 0,5 + 0,125 = 0,625. Une écriture binaire après la virgule dispose précisément de moitiés, quarts, huitièmes, puis seizièmes. Écrire 0,101 en base 2 signifie prendre une moitié, aucun quart et un huitième. Les chiffres sont des choix de parts, pas des dixièmes et centièmes comme dans l’écriture décimale.'
      ),
      s(
        'Extraire les chiffres un par un',
        'On peut chercher les parts avec des multiplications par deux. Pour 0,625, doubler donne 1,25 : le premier chiffre est 1 et le reste 0,25. Doubler ce reste donne 0,5 : le chiffre suivant est 0. Doubler 0,5 donne 1 : le troisième chiffre est 1 et le reste est nul. Chaque fois, on retire la partie entière, c’est-à-dire le nombre avant la virgule. Un reste nul permet de compléter avec des zéros.',
        {
          checkpoint: pause(
            'Quels sont les deux chiffres binaires de 0,25 après la virgule ?',
            '01 : aucun demi et un quart',
            '10 : un demi et aucun quart',
            'Le premier poids est 1/2, trop grand pour 0,25. Le deuxième est 1/4 et fournit exactement la valeur voulue.'
          )
        }
      ),
      s(
        'Comprendre ce que conserve un flottant',
        'Certains partages ne se terminent pas : un tiers donne déjà 0,333… en écriture décimale. En binaire, 0,1 décimal demande aussi une suite infinie. Un flottant est un format approché : il conserve un signe, un groupe limité de chiffres significatifs appelé significande et un exposant qui place la virgule à une certaine échelle. La machine choisit une valeur représentable voisine ; cet arrondi explique pourquoi 0.1 + 0.2 peut donner 0.30000000000000004 en Python. Le point remplace ici la virgule française.'
      ),
      s(
        'Remplacer une égalité par une question adaptée',
        'Dire que deux mesures sont assez proches exige une unité et un seuil. On soustrait leurs valeurs puis on ignore le signe de l’écart : la valeur absolue est notée abs en Python. Si la distance vaut 0,0004 m et que la tolérance est 0,001 m, on accepte. <= signifie inférieur ou égal : la frontière est incluse. Une tolérance trop grande laisserait passer de vraies erreurs ; il faut la choisir d’après le problème, pas pour rendre tous les tests verts.',
        {
          checkpoint: pause(
            'Avec une tolérance de 0,01, accepte-t-on les valeurs 2 et 2,02 ?',
            'Non, la distance vaut 0,02',
            'Oui, car les deux valeurs commencent par 2',
            'La décision porte sur la distance : 0,02 dépasse le seuil 0,01. Des chiffres initiaux communs ne suffisent pas.'
          )
        }
      ),
      s(
        'Écrire le calcul sans sauter le vocabulaire Python',
        'Une fonction est un calcul nommé ; def proches(x, y, tolerance): reçoit trois paramètres, les valeurs fournies lors de l’appel. return rend le résultat à l’appelant. La comparaison abs(x - y) <= tolerance renvoie True pour vrai ou False pour faux. Pour construire des chiffres, une variable resultat commence avec la chaîne vide "". Une chaîne est du texte ; + en concatène deux. for _ in range(n): répète n fois ; _ indique qu’on n’utilise pas le numéro du passage. x *= 2 double x ; int(x) extrait sa partie entière positive ; str(chiffre) transforme ce nombre en texte. x -= chiffre conserve le reste pour le passage suivant. La boucle produit les n premiers chiffres, donc une troncature ; elle ne calcule pas une infinité.',
        {
          code: 'def mesures_proches(a, b):\n    distance = abs(a - b)\n    return distance <= 0.001'
        }
      )
    ],
    exampleMethods: [
      'Écris les trois poids 0,5 ; 0,25 ; 0,125. Après avoir pris 0,5, il reste 0,125 : le quart est trop grand et le huitième convient. Les choix successifs sont donc 1, 0, 1.',
      'Suis les restes : 0,1 doublé donne 0,2 ; puis 0,4 ; puis 0,8 ; puis 1,6. On extrait 1 et garde 0,6. Les restes finissent par se répéter : les mêmes étapes reproduisent les mêmes chiffres.',
      'Sépare la valeur mathématique attendue de la représentation stockée. L’opérateur == demande une égalité exacte des valeurs stockées ; une distance sous 1e-12, soit un millième de milliardième, pose une autre question adaptée à cet exemple.'
    ]
  },
  'premiere-logique': {
    duration: 60,
    introduction: intro(
      'Pour ouvrir le portail du collège, il faut un badge valide et une autorisation. Pour allumer une lampe à deux commandes, on peut au contraire vouloir qu’une seule commande active suffise.',
      'Comment transformer ces règles de langage courant en décisions dont tous les cas sont prévus ?',
      'Les booléens permettent de préciser les autorisations, les conditions d’un programme et les sorties de circuits simples.',
      [
        'Distinguer une valeur vraie d’un nombre.',
        'Comparer ET, OU et négation sur quatre cas.',
        'Construire le OU exclusif et une addition de deux bits.',
        'Comprendre dans quel ordre Python examine les conditions.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Affirmation',
        'Une affirmation peut être évaluée comme vraie ou fausse dans une situation donnée. Une question ou une consigne n’est pas directement une valeur de vérité.',
        '« Le badge est valide » est vrai pour certains badges et faux pour les autres.'
      ),
      recap(
        'Comparaison',
        'Comparer vérifie une relation entre deux valeurs : égalité, différence ou ordre. Le résultat de la comparaison est vrai ou faux.',
        '5 > 3 se lit « cinq est strictement supérieur à trois » et vaut vrai.'
      ),
      recap(
        'Bit',
        'Un bit est une donnée qui vaut 0 ou 1. Pour représenter une valeur logique, on peut convenir que 0 signifie faux et 1 vrai.',
        'Deux entrées binaires donnent quatre couples : 00, 01, 10 et 11.'
      )
    ],
    realLifeExamples: [
      life(
        'Le départ d’une sortie',
        'Une sortie est autorisée si l’autorisation est signée et si une place est disponible.',
        'Le mot et correspond à AND : les deux conditions doivent être vraies ensemble pour autoriser le départ.',
        'Le programme évalue des données déjà saisies ; il ne peut pas vérifier seul l’authenticité d’une signature.'
      ),
      life(
        'Deux offres incompatibles',
        'Un billet propose soit le tarif groupe, soit le tarif étudiant, mais jamais les deux en même temps.',
        'Le OU exclusif, XOR, accepte exactement une des deux conditions. Il refuse aucune offre et les deux offres ensemble.',
        'Une politique commerciale peut permettre un tarif normal sans réduction ; ce cas doit être modélisé séparément.'
      )
    ],
    sections: [
      s(
        'Donner un nom aux deux réponses possibles',
        'Un booléen est une valeur qui vaut vrai ou faux. Python écrit True et False, avec une majuscule et sans guillemets. badge = True affecte la valeur vraie au nom badge ; = conserve une valeur dans une variable, alors que == compare deux valeurs. Une comparaison comme age >= 18 produit elle-même un booléen ; >= inclut l’égalité. Une décision de programme peut ainsi combiner des résultats déjà évalués.'
      ),
      s(
        'Établir les quatre cas du ET et du OU',
        'Pour deux conditions, examinons faux/faux, faux/vrai, vrai/faux et vrai/vrai : il n’y a que quatre cas. and signifie ET et exige que les deux soient vraies. or signifie OU inclusif et accepte qu’au moins une soit vraie, donc accepte aussi deux vraies. Une table de vérité est le tableau qui associe à chaque combinaison d’entrées son résultat. On la construit ligne après ligne au lieu de deviner une règle à partir d’un seul essai.',
        {
          table: {
            caption: 'Deux règles différentes',
            columns: ['a', 'b', 'a and b', 'a or b'],
            rows: [
              ['False', 'False', 'False', 'False'],
              ['False', 'True', 'False', 'True'],
              ['True', 'False', 'False', 'True'],
              ['True', 'True', 'True', 'True']
            ]
          },
          checkpoint: pause(
            'Avec deux conditions vraies, que donne le OU inclusif ?',
            'True',
            'False, car une seule devrait être vraie',
            'Le OU inclusif accepte une condition vraie ou les deux. La règle qui refuse deux vraies s’appelle le OU exclusif.'
          )
        }
      ),
      s(
        'Nier une condition et isoler deux cas exclusifs',
        'not inverse une vérité : not True vaut False, et not False vaut True. Pour accepter a seul, écrire a and not b ; pour accepter b seul, écrire not a and b. Leur combinaison par or décrit le XOR, le OU exclusif : exactement une entrée doit être vraie. Les parenthèses rendent les deux cas visibles. Une fonction nomme ce traitement : def exclusif(a, b): reçoit les entrées et return (a and not b) or (not a and b) en renvoie la valeur.'
      ),
      s(
        'Passer des vérités à un petit circuit',
        'Une porte logique est un composant modélisé par une règle entre entrées et sortie. Un circuit combinatoire ne garde pas d’historique : sa sortie dépend des entrées présentes. Pour additionner deux bits, on distingue la somme dans la colonne de droite et la retenue à reporter à gauche. Avec 1 et 1, on obtient le nombre binaire 10 : somme 0 et retenue 1. XOR donne le bit de somme ; AND donne la retenue. Ce demi-additionneur ne reçoit pas de retenue issue d’une colonne précédente.',
        {
          checkpoint: pause(
            'Pour 1 + 1, quels sont le bit de somme et la retenue ?',
            'Somme 0, retenue 1',
            'Somme 1, retenue 0',
            'Deux unités forment une paire : l’écriture binaire est 10. Le chiffre de droite est 0 et la paire reportée vaut 1.'
          )
        }
      ),
      s(
        'Lire de gauche à droite et préparer une table Python',
        'Python évalue a and b en commençant par a : si a est faux, b n’est pas nécessaire. Pour x != 0 and 1 / x > 0, != signifie différent et / divise ; avec x égal à zéro, la division n’est donc pas exécutée. Une fonction de table peut créer table = [], une liste vide. for a in [False, True]: visite les deux valeurs ; une seconde boucle décalée sous la première visite b pour chacune d’elles. if choisit un cas, elif teste un autre cas et else traite le reste. table.append([a, b, resultat]) ajoute une ligne ; return table doit être après les deux boucles pour conserver les quatre lignes. Les espaces en début de ligne indiquent ces niveaux.'
      )
    ],
    exampleMethods: [
      'Remplace d’abord les noms par leurs valeurs. La porte est fermée, donc not porte_ouverte est vrai. Il reste True and True : la règle exige deux vraies et renvoie vrai.',
      'Écris l’addition ordinaire : 1 + 1 = 2. Deux s’écrit 10 en base 2. Vérifie séparément les deux sorties : XOR est faux pour des entrées égales et AND est vrai pour deux bits actifs.',
      'Lis seulement le premier test au départ : 0 != 0 est faux. La règle de and garantit alors le résultat faux sans demander la seconde expression ; ce n’est pas une division par zéro qui serait calculée puis ignorée.'
    ]
  },
  'premiere-encodages': {
    duration: 65,
    introduction: intro(
      'Tu envoies le prénom Zoé à quelqu’un et son écran montre des caractères étranges à la place de l’accent. Le texte était pourtant lisible avant l’envoi.',
      'Quelles règles doivent partager l’expéditeur et le destinataire pour retrouver exactement les mêmes caractères ?',
      'Distinguer caractère, numéro et octets permet de lire un fichier sans détruire ses accents et de changer son encodage correctement.',
      [
        'Séparer le texte visible de ses octets.',
        'Comparer ASCII, Latin-1 et Unicode.',
        'Suivre un encodage puis un décodage.',
        'Convertir un fichier en explicitant les formats et les erreurs.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Caractère et chaîne',
        'Un caractère est un élément de texte, comme une lettre ou un espace. Une chaîne est une suite de caractères, conservée entre guillemets dans un programme.',
        '"café" est une chaîne qui contient notamment le caractère accentué é.'
      ),
      recap(
        'Octet',
        'Un octet est un groupe de huit bits, donc huit cases 0 ou 1. Lu comme un entier non signé, il peut prendre une valeur de 0 à 255.',
        'L’octet de valeur 65 peut servir à représenter A si la convention choisie le prévoit.'
      ),
      recap(
        'Convention partagée',
        'Une convention associe une signification à des signes. Le destinataire doit connaître la même association pour retrouver l’information.',
        'Le nombre 233 ne décrit pas à lui seul comment retrouver un caractère dans tout format possible.'
      )
    ],
    realLifeExamples: [
      life(
        'Les prénoms de la classe',
        'Un export d’inscriptions contient les prénoms Zoé, André et Maël.',
        'Déclarer UTF-8 à la lecture permet de reconstruire les caractères et de conserver les accents lors d’un nouvel export.',
        'Un encodage exact ne corrige pas une faute de frappe déjà présente dans le prénom.'
      ),
      life(
        'Un colis et son étiquette de lecture',
        'Un carton contient des cartes numérotées ; la fiche explicative dit comment interpréter chaque numéro.',
        'Les octets sont comparables aux cartes, l’encodage à la règle de lecture. Changer de règle sans convertir les données peut changer le texte obtenu.',
        'UTF-8 utilise parfois plusieurs octets pour un caractère ; ce n’est pas un simple dictionnaire « une carte égale une lettre ».'
      )
    ],
    sections: [
      s(
        'Un texte affiché et des nombres conservés',
        'L’écran dessine des lettres, mais un fichier conserve des octets. Un encodage est une règle de transformation du texte en une suite d’octets ; le décodage applique la règle inverse. Le nombre de caractères peut différer du nombre d’octets. Le caractère A tient sur un octet en UTF-8, tandis que é en occupe deux. Compter les lettres du mot ne suffit donc pas à connaître sa place dans le fichier.'
      ),
      s(
        'Trois noms qui ne désignent pas la même chose',
        'ASCII associe 128 valeurs à des caractères surtout non accentués, comme A de numéro 65. Latin-1, aussi nommé ISO-8859-1, utilise un octet par caractère et comprend é, mais pas le symbole euro. Unicode est un répertoire qui attribue un numéro, appelé point de code, à un très grand ensemble de caractères. UTF-8 est une manière de transformer ces numéros Unicode en octets. Le point de code de é vaut 233 ; ses octets UTF-8 valent 195 et 169.',
        {
          checkpoint: pause(
            'Un caractère occupe-t-il toujours exactement un octet en UTF-8 ?',
            'Non, é en occupe deux',
            'Oui, un caractère est toujours un octet',
            'Le répertoire des caractères et leur représentation en octets sont distincts. UTF-8 utilise une longueur variable selon le caractère.'
          )
        }
      ),
      s(
        'Suivre la conversion dans le bon sens',
        'Python distingue str, le texte, et bytes, une suite d’octets. bytes([99, 97, 102, 233]) construit ici les octets de café en Latin-1. La méthode .decode("latin-1") transforme ces octets en texte ; une méthode est un traitement attaché à une valeur et appelé après un point. Sur le texte obtenu, .encode("utf-8") fabrique les octets UTF-8. Une fonction est un traitement nommé : def convertir(octets): reçoit un paramètre ; une variable texte garde le résultat intermédiaire ; return renvoie le résultat final. list(...) transforme la suite d’octets en liste de nombres affichables.'
      ),
      s(
        'Ne pas confondre réussite et bonne lecture',
        'Décoder des octets avec la mauvaise règle peut produire une erreur ou un texte incohérent sans erreur. Il faut connaître l’encodage source au lieu d’essayer au hasard. UnicodeEncodeError signifie que le texte ne peut pas être écrit dans l’encodage destination : le symbole euro ne peut pas être encodé en Latin-1. Remplacer silencieusement un caractère par ? détruit une information. Une conversion correcte garde le texte, même lorsque les octets et la taille changent.',
        {
          checkpoint: pause(
            'Pour convertir correctement de Latin-1 vers UTF-8, quelle étape vient d’abord ?',
            'Décoder les octets Latin-1 en texte',
            'Déclarer que les mêmes octets sont déjà UTF-8',
            'On retrouve d’abord les caractères avec leur règle source. On les encode ensuite avec la règle destination ; renommer un format ne transforme pas les octets.'
          )
        }
      ),
      s(
        'Lire et écrire un fichier sans perdre le fil',
        'Un fichier est un contenu enregistré sous un nom. open(nom, encoding="utf-8") ouvre un accès en lecture de texte ; with ... as fichier: donne le nom fichier à cet accès et le ferme après le bloc décalé. fichier.read() lit tout le texte. Pour écrire, open("sortie.txt", "w", encoding="latin-1") choisit le mode écriture : w signifie write et peut remplacer le contenu existant de cette sortie. fichier.write(texte) écrit les caractères avec le format annoncé. Le mode "rb" signifie lecture binaire : on récupère les octets, sans décodage. Dans une fonction, return list(fichier.read()) renvoie alors leurs valeurs numériques. Les exercices utilisent uniquement les fichiers de leur espace de travail.',
        {
          code: 'texte = bytes([233]).decode("latin-1")\noctets = texte.encode("utf-8")\nprint(list(octets))  # [195, 169]'
        }
      )
    ],
    exampleMethods: [
      'Cherche séparément le caractère et sa représentation. A possède le numéro Unicode 65 ; UTF-8 reprend pour ce caractère la même valeur que l’ancien ASCII. La liste ne contient donc qu’un nombre.',
      'Ne transforme pas directement 233 en un seul octet UTF-8. Pars du caractère é, puis applique la règle UTF-8 : elle produit deux octets. Le numéro du répertoire et les nombres du fichier n’ont pas le même rôle.',
      'Vérifie le répertoire autorisé avant de calculer une taille. Latin-1 ne possède pas ce caractère : aucun octet ne convient. L’erreur protège ici le texte contre une substitution silencieuse.'
    ]
  }
};

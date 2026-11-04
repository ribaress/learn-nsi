const s = (title, paragraphs, extra = {}) => ({ title, text: paragraphs.join('\n\n'), ...extra });
const table = (caption, columns, rows) => ({ caption, columns, rows });
const check = (question, choices, answer, explanation) => ({
  question,
  choices: choices.map(([value, label]) => ({ value, label })),
  answer,
  explanation
});

export const basesFoundation = {
  duration: 90,
  prerequisites: [
    'Aucune notion informatique à connaître avant de commencer : les calculs et le vocabulaire nécessaires sont repris ci-dessous.'
  ],
  objectives: [
    'Comprendre pourquoi une même quantité peut s’écrire de plusieurs façons.',
    'Lire et construire un nombre en binaire, puis en hexadécimal.',
    'Expliquer ce qu’un octet permet de représenter et vérifier la place nécessaire.'
  ],
  introduction: {
    situation:
      'Tu comptes 13 billes sur une table. Tu peux écrire « treize », dessiner les 13 billes ou écrire 13 : la quantité ne change pas. Dans cette leçon, nous allons découvrir une autre écriture de cette même quantité, composée uniquement de 0 et de 1. Il n’est pas nécessaire de la connaître au départ.',
    question:
      'Comment représenter les mêmes 13 billes avec seulement deux chiffres, puis lire cette écriture sans deviner ?',
    why: 'Un appareil numérique utilise des états que l’on distingue facilement, comme deux niveaux électriques. On les représente par 0 et 1. Comprendre comment ces symboles représentent un nombre permet ensuite de lire un code de couleur, de choisir la taille d’un compteur et de comprendre pourquoi une valeur peut dépasser la place prévue.',
    journey: [
      'Repartir des unités, dizaines et centaines que tu utilises déjà.',
      'Construire le binaire avec des cases de valeur 1, 2, 4, 8…',
      'Regrouper huit bits dans un octet, puis découvrir les raccourcis hexadécimaux.',
      'Dérouler les méthodes de conversion et les vérifier avant de programmer.'
    ]
  },
  prerequisiteRecap: [
    {
      term: 'Un chiffre et un nombre',
      explanation:
        'Un chiffre est un symbole qui sert à écrire. Un nombre exprime une quantité. Dans notre écriture habituelle, on dispose de dix chiffres, de 0 à 9 ; on les combine pour écrire des nombres plus grands.',
      example:
        'Dans 347, il y a trois chiffres. Le nombre représente trois cent quarante-sept objets, et pas seulement 3 + 4 + 7 objets.'
    },
    {
      term: 'Multiplier : compter des groupes identiques',
      explanation:
        'Multiplier indique combien d’objets on obtient avec plusieurs groupes de même taille. Le signe × se lit « fois ». Dans du code Python, la multiplication s’écrit avec *.',
      example:
        '3 × 10 signifie trois groupes de dix, donc 30. 1 × 8 vaut 8 et 0 × 8 vaut 0 : aucun groupe de huit.'
    },
    {
      term: 'Diviser et garder un reste',
      explanation:
        'Une division entière compte les groupes complets ; le reste est ce qui ne forme pas un groupe complet. Le reste est toujours plus petit que la taille d’un groupe.',
      example:
        '13 objets permettent de faire 6 groupes de 2, et il reste 1 objet : 13 = 6 × 2 + 1. En Python, 13 // 2 vaut 6 et 13 % 2 vaut 1.'
    },
    {
      term: 'Une puissance : une multiplication répétée',
      explanation:
        'Le petit nombre en haut indique combien de fois on multiplie la base par elle-même. La puissance zéro vaut 1 pour une base non nulle ; elle sert à nommer la colonne des unités.',
      example:
        '2³ = 2 × 2 × 2 = 8 ; 2² = 4 ; 2¹ = 2 ; 2⁰ = 1. Dans du code Python, 2**3 écrit la même opération que 2³.'
    }
  ],
  realLifeExamples: [
    {
      title: 'Une rangée d’interrupteurs',
      situation:
        'Une petite guirlande possède quatre interrupteurs indépendants. Chacun est éteint ou allumé. Pour noter un réglage sur papier, tu choisis 0 pour éteint et 1 pour allumé.',
      connection:
        'Tu peux alors noter quatre états avec quatre bits. Si nous attribuons aux interrupteurs les valeurs 8, 4, 2 et 1, le réglage 1101 représente 8 + 4 + 1, donc 13. Cette attribution est exactement la règle de lecture du binaire.',
      difference:
        'Une guirlande n’additionne pas naturellement ses lampes pour afficher 13. Les poids 8, 4, 2 et 1 sont la convention de notre modèle, à distinguer du simple nombre de lampes allumées : ici, il y en a trois.'
    },
    {
      title: 'Choisir une couleur dans un logiciel de dessin',
      situation:
        'Un sélecteur de couleur peut afficher #20A0FF au lieu de trois nombres. Ce code paraît mystérieux avant de connaître l’hexadécimal.',
      connection:
        'Les deux caractères 20 donnent la composante rouge, A0 la verte et FF la bleue. Après la leçon, tu pourras retrouver leurs valeurs : 32, 160 et 255. Chaque composante est stockée ici sur un octet.',
      difference:
        'Ce code décrit une couleur numérique selon une convention précise. Il ne décrit pas les quantités de peinture à mélanger : les couleurs d’un écran et celles des pigments ne se combinent pas de la même façon.'
    }
  ],
  sections: [
    s(
      'Commençons par 347 : ce que tu sais déjà faire',
      [
        'Quand tu lis 347, tu ne fais pas 3 + 4 + 7. Le 3 représente trois centaines, le 4 représente quatre dizaines et le 7 représente sept unités. La position d’un chiffre change donc sa contribution au nombre. On appelle cette contribution son poids.',
        'Une centaine est un groupe de dix dizaines ; une dizaine est un groupe de dix unités. De droite à gauche, les valeurs des colonnes sont 1, puis 10, puis 100 : chaque colonne vaut dix fois la précédente. C’est pour cela que notre écriture habituelle s’appelle la base dix, ou base décimale.',
        'Le zéro sert aussi à réserver une position : 307 représente trois centaines, aucune dizaine et sept unités. Enlever ce zéro et écrire 37 changerait la quantité. En revanche, écrire 0347 ajoute une colonne vide à gauche et ne change pas la valeur.'
      ],
      {
        table: table(
          'Décomposer 347 avec les colonnes décimales',
          ['Colonne', 'Nombre de groupes', 'Valeur du groupe', 'Contribution'],
          [
            ['Centaines', 3, 100, '3 × 100 = 300'],
            ['Dizaines', 4, 10, '4 × 10 = 40'],
            ['Unités', 7, 1, '7 × 1 = 7'],
            ['Total', '', '', '300 + 40 + 7 = 347']
          ]
        )
      }
    ),
    s(
      'Changer de base : changer les regroupements, pas la quantité',
      [
        'Reprenons nos 13 billes. En base dix, nous faisons un groupe de dix et gardons trois unités : nous écrivons 13. Imaginons maintenant une règle différente : dès que nous avons deux unités, nous les regroupons. Deux groupes de deux forment un groupe de quatre ; deux groupes de quatre forment un groupe de huit.',
        'Avec cette règle, nous n’avons besoin que des chiffres 0 et 1 dans chaque colonne : soit aucun groupe de cette taille, soit un groupe. Dès que nous aurions deux groupes identiques, nous les échangeons contre un groupe de la colonne suivante. Cette écriture s’appelle la base deux, ou écriture binaire.',
        'Treize billes peuvent ainsi se répartir en un groupe de huit, un groupe de quatre, aucun groupe de deux et une unité. Nous écrirons 1101 en base deux. Nous allons apprendre à le relire : il ne faut pas l’interpréter comme « mille cent un ». Le petit ₂ dans 1101₂ annonce la base deux ; le petit ₁₀ dans 13₁₀ annonce la base dix.'
      ],
      {
        checkpoint: check(
          'On remplace l’écriture 13₁₀ par 1101₂ pour désigner les mêmes billes. Qu’est-ce qui change ?',
          [
            ['quantite', 'La quantité de billes change.'],
            ['ecriture', 'La façon d’écrire la quantité change.'],
            ['objets', 'Les billes deviennent un autre objet.']
          ],
          'ecriture',
          'La quantité reste la même : il y a toujours treize billes. Seule la règle de regroupement et donc l’écriture du nombre change.'
        )
      }
    ),
    s(
      'Un bit : une case avec deux états possibles',
      [
        'Un bit est une case d’information qui peut valoir 0 ou 1. Pour un interrupteur, nous pouvons choisir 0 = éteint et 1 = allumé. Le sens de ces états dépend de la convention : un bit ne représente pas automatiquement un nombre, une lettre ou une couleur.',
        'Pour écrire des entiers positifs ou nuls en binaire, nous décidons que les bits occupent des colonnes de valeurs 1, 2, 4, 8, et ainsi de suite. Chaque colonne vaut deux fois celle située à sa droite. Un 1 signifie « je prends cette valeur » ; un 0 signifie « je ne la prends pas ». La valeur du nombre est la somme des valeurs choisies.',
        'Avec deux cases seulement, nous pouvons écrire 00, 01, 10 et 11. Il y a quatre écritures différentes, représentant les nombres de zéro à trois. Attention : 10₂ signifie un groupe de deux et zéro unité, donc deux. Ce n’est pas dix.'
      ],
      {
        table: table(
          'Tous les nombres représentables avec deux bits',
          ['Écriture', 'Groupes de 2', 'Unités', 'Nombre décimal'],
          [
            ['00', '0 × 2', '0 × 1', 0],
            ['01', '0 × 2', '1 × 1', 1],
            ['10', '1 × 2', '0 × 1', 2],
            ['11', '1 × 2', '1 × 1', 3]
          ]
        )
      }
    ),
    s(
      'Lire un nombre binaire, une colonne après l’autre',
      [
        'Plaçons 10110₂ dans cinq colonnes. La colonne de droite vaut 1 ; en allant vers la gauche, nous doublons : 2, 4, 8, puis 16. Nous associons chaque chiffre à la valeur de sa colonne avant de calculer. Les zéros comptent comme des positions, même si leur contribution est nulle.',
        'Nous lisons donc un groupe de seize, aucun groupe de huit, un groupe de quatre, un groupe de deux et aucune unité. Le calcul complet est 1 × 16 + 0 × 8 + 1 × 4 + 1 × 2 + 0 × 1. Cela donne 16 + 0 + 4 + 2 + 0 = 22. En retirant seulement les contributions nulles, on retrouve 16 + 4 + 2 = 22.',
        'Le vocabulaire « rang » et les puissances permettent ensuite de décrire cette règle de manière générale : le rang est la position en comptant depuis zéro à droite. Au rang zéro, le poids est 2⁰ = 1 ; au rang un, 2¹ = 2 ; au rang deux, 2² = 4. La formule n’ajoute pas une nouvelle méthode : elle donne un nom au doublement que tu viens de faire.'
      ],
      {
        table: table(
          'Pourquoi 10110₂ vaut 22',
          ['Poids de la colonne', 'Bit', 'Contribution'],
          [
            [16, 1, 16],
            [8, 0, 0],
            [4, 1, 4],
            [2, 1, 2],
            [1, 0, 0]
          ]
        )
      }
    ),
    s(
      'À toi de construire treize avec quatre interrupteurs',
      [
        'Dans le petit laboratoire ci-dessous, chaque bouton représente un bit. Le grand chiffre indique son état, 0 ou 1. Le petit nombre indique la valeur de sa colonne. Commence avec toutes les cases à zéro : la somme vaut zéro.',
        'Pour construire 13, allume la case de valeur 8 : il reste à représenter 13 − 8 = 5. Ajoute la case 4 : il reste 1. N’allume pas la case 2, qui serait trop grande pour ce reste. Ajoute la case 1 : il ne reste rien. Les bits affichent maintenant 1101.',
        'Tu peux vérifier dans l’autre sens : 8 + 4 + 1 = 13. Les trois cases allumées ne représentent pas le nombre 3 ; elles représentent la somme de leurs poids. Essaie ensuite de construire 6, puis 15. Une fois les quatre cases à 1, tu ne peux pas représenter un nombre plus grand sans ajouter une case.'
      ],
      {
        inlineActivity: { type: 'bits', config: { value: 0, bits: 4, signed: false } },
        checkpoint: check(
          'Les cases de valeurs 8 et 2 sont allumées ; les autres sont éteintes. Quel nombre lit-on ?',
          [
            ['2', '2, parce qu’il y a deux cases allumées.'],
            ['10', '10, parce que 8 + 2 = 10.'],
            ['82', '82, en collant les valeurs des cases.']
          ],
          '10',
          'On additionne les poids des cases à 1 : 8 + 2 = 10. Le nombre de cases allumées n’est pas la valeur du nombre.'
        )
      }
    ),
    s(
      'Une autre méthode : diviser par deux et garder les restes',
      [
        'La méthode des colonnes est pratique pour de petits nombres. Pour obtenir une écriture binaire de façon systématique, nous pouvons aussi utiliser des divisions entières par deux. À chaque division, le reste vaut forcément 0 ou 1 : ce sont exactement les chiffres autorisés en binaire.',
        'Avec 13, on obtient 13 = 6 × 2 + 1 ; puis 6 = 3 × 2 + 0 ; puis 3 = 1 × 2 + 1 ; enfin 1 = 0 × 2 + 1. On s’arrête lorsque le quotient est zéro. Les restes arrivent d’abord pour les petites colonnes : il faut donc les lire du dernier au premier, en remontant le tableau.',
        'En remontant, nous lisons 1, 1, 0, 1 : 13₁₀ = 1101₂. Lisons une dernière fois 8 + 4 + 1 pour vérifier. Pour zéro, nous écrivons directement 0 ; nous n’écrivons pas une chaîne vide. Si nous imposons quatre ou huit cases, on complète à gauche avec des zéros sans modifier la quantité.'
      ],
      {
        table: table(
          'Les divisions successives de 13 : lire les restes de bas en haut',
          ['Nombre à diviser', 'Quotient entier', 'Reste'],
          [
            [13, 6, 1],
            [6, 3, 0],
            [3, 1, 1],
            [1, 0, 1]
          ]
        ),
        checkpoint: check(
          'Les restes de divisions par deux arrivent dans l’ordre 1, 0, 1, 1. Quelle écriture faut-il lire ?',
          [
            ['1011', '1011, dans l’ordre d’arrivée.'],
            ['1101', '1101, en remontant les restes.'],
            ['111', '111, en retirant le zéro.']
          ],
          '1101',
          'Le premier reste décrit la colonne des unités, à droite. Il faut remonter les restes pour écrire le nombre de gauche à droite : 1101. Le zéro conserve sa position.'
        )
      }
    ),
    s(
      'Un octet : huit bits, pas huit nombres',
      [
        'Un octet est un groupe de huit bits. Pour lire un entier positif ou nul sur un octet, nous utilisons les colonnes 128, 64, 32, 16, 8, 4, 2 et 1. On dit « non signé » parce que nous n’utilisons pas ce format pour représenter des nombres négatifs dans cette leçon.',
        'Toutes les cases à zéro donnent 00000000₂, donc zéro. Toutes les cases à un donnent 11111111₂, soit 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255. Entre ces deux extrêmes, chaque configuration représente un entier différent : il y a 256 possibilités, de 0 à 255 inclus.',
        'Pourquoi 256 possibilités ? Pour chaque case, il y a deux choix. Une case donne 2 possibilités ; deux cases en donnent 2 × 2 = 4 ; trois en donnent 2 × 2 × 2 = 8. Avec huit cases, cela donne 2⁸ = 256. Le maximum est 255 et non 256 parce que l’une des possibilités sert à représenter zéro.'
      ],
      {
        table: table(
          'Quelques tailles de stockage non signé',
          ['Nombre de bits', 'Nombre de possibilités', 'Valeurs représentables'],
          [
            [1, 2, '0 à 1'],
            [2, 4, '0 à 3'],
            [3, 8, '0 à 7'],
            [4, 16, '0 à 15'],
            [8, 256, '0 à 255']
          ]
        ),
        checkpoint: check(
          'Un entier non signé est stocké sur trois bits. Quelle est sa valeur maximale ?',
          [
            ['8', '8 : il y a huit possibilités.'],
            ['7', '7 : les huit possibilités vont de zéro à sept.'],
            ['3', '3 : il y a trois bits.']
          ],
          '7',
          'Les possibilités sont 000, 001, 010, 011, 100, 101, 110 et 111. Elles représentent 0 à 7. Huit est le nombre de possibilités ; sept est la plus grande valeur.'
        )
      }
    ),
    s(
      'Pourquoi inventer encore une écriture : l’hexadécimal ?',
      [
        'L’écriture 10100111₂ contient déjà huit chiffres. Quand on lit beaucoup d’octets, les longues suites de 0 et de 1 deviennent difficiles à recopier. Nous cherchons donc une écriture plus courte qui reste facile à traduire en binaire. Nous ne changeons toujours pas la quantité représentée.',
        'Quatre bits donnent 2 × 2 × 2 × 2 = 16 possibilités, de 0 à 15. Il serait pratique de remplacer chaque groupe de quatre bits par un seul chiffre parmi seize. La base seize, appelée hexadécimal, fait exactement cela.',
        'Nous gardons les symboles 0 à 9 pour les valeurs zéro à neuf. Comme il nous manque six symboles, nous utilisons A pour dix, B pour onze, C pour douze, D pour treize, E pour quatorze et F pour quinze. Ici, ces lettres sont des chiffres : A ne désigne pas une variable inconnue. Après F vient 10₁₆, qui représente un groupe de seize et zéro unité, donc seize.'
      ],
      {
        table: table(
          'Les seize chiffres hexadécimaux et leurs quatre bits',
          ['Valeur décimale', 'Chiffre hexadécimal', 'Quatre bits'],
          [
            [0, '0', '0000'],
            [1, '1', '0001'],
            [2, '2', '0010'],
            [3, '3', '0011'],
            [4, '4', '0100'],
            [5, '5', '0101'],
            [6, '6', '0110'],
            [7, '7', '0111'],
            [8, '8', '1000'],
            [9, '9', '1001'],
            [10, 'A', '1010'],
            [11, 'B', '1011'],
            [12, 'C', '1100'],
            [13, 'D', '1101'],
            [14, 'E', '1110'],
            [15, 'F', '1111']
          ]
        )
      }
    ),
    s(
      'Passer entre le binaire et l’hexadécimal sans sauter d’étape',
      [
        'Prenons 10100111₂. On sépare les huit bits en deux groupes de quatre : 1010 et 0111. Le premier groupe vaut 8 + 2 = 10, donc il s’écrit A. Le second vaut 4 + 2 + 1 = 7, donc il s’écrit 7. Nous obtenons A7₁₆. Un octet possède huit bits : deux groupes de quatre, donc deux chiffres hexadécimaux suffisent.',
        'Pour relire A7₁₆ sans tableau binaire, utilise ses deux colonnes : la première vaut seize et la seconde vaut un. A vaut dix ; le calcul est donc 10 × 16 + 7 × 1 = 160 + 7 = 167. Vérifions avec les huit bits : 128 + 32 + 4 + 2 + 1 = 167. Les deux chemins donnent le même nombre.',
        'Dans l’autre sens, 3C₁₆ donne 0011 pour le chiffre 3 et 1100 pour le chiffre C. En plaçant les groupes l’un à côté de l’autre, nous obtenons 00111100₂. Les deux zéros initiaux gardent un format de huit bits ; ils ne changent pas la valeur. Si le nombre binaire ne remplit pas des groupes de quatre, on complète à gauche avec des zéros : 1101₂ devient 00001101₂ sur un octet, soit 0D₁₆.'
      ],
      {
        table: table(
          'Trois écritures d’une seule et même quantité',
          ['Décimal', 'Binaire sur huit bits', 'Hexadécimal sur deux chiffres'],
          [
            [13, '00001101', '0D'],
            [60, '00111100', '3C'],
            [167, '10100111', 'A7'],
            [255, '11111111', 'FF']
          ]
        )
      }
    ),
    s('Un exemple réel : lire le code d’une couleur', [
      'Dans un code de couleur Web de la forme #RRGGBB, les deux premiers chiffres décrivent le rouge, les deux suivants le vert et les deux derniers le bleu. « RVB » signifie rouge, vert, bleu ; les lettres anglaises RGB veulent dire la même chose. Dans cette convention, chaque composante est un entier de 0 à 255, donc tient dans un octet.',
      'Décomposons #20A0FF. Pour le rouge, 20₁₆ vaut 2 × 16 + 0 = 32. Pour le vert, A0₁₆ vaut 10 × 16 + 0 = 160. Pour le bleu, FF₁₆ vaut 15 × 16 + 15 = 255. Le code correspond donc au triplet (32, 160, 255). Le signe # annonce le format du code de couleur ; il ne participe pas au calcul.',
      'Il ne faut pas convertir 20A0FF comme un seul nombre si la question demande les trois composantes. Nous découpons d’abord les trois couples, puis nous traduisons chacun d’eux. Tu peux maintenant reconnaître ce même format dans un logiciel de dessin ou dans le style d’une page Web.'
    ]),
    s(
      'Prévoir la place et comprendre un dépassement',
      [
        'Le plus grand entier non signé sur un octet est 255. Que se passe-t-il si nous voulons représenter le résultat de 255 + 1 ? La réponse mathématique est 256. Or l’écriture binaire de 256 est 100000000 : un 1 suivi de huit zéros, donc neuf bits. Le résultat ne tient plus dans les huit cases prévues. C’est un dépassement de capacité.',
        'Il faut distinguer le calcul mathématique et ce que fait un appareil avec sa mémoire limitée. Selon le système et le programme, il peut signaler une erreur ou garder seulement une partie du résultat. Nous ne supposons pas un comportement universel. Les entiers Python ordinaires peuvent utiliser davantage de place automatiquement : ils ne sont pas limités à un octet.',
        'La règle générale arrive maintenant après les petits cas : avec n bits, où n est le nombre de cases, on obtient 2ⁿ configurations. Pour les entiers non signés, les valeurs vont de 0 à 2ⁿ − 1. Pour six bits, cela donne 2⁶ = 64 configurations et une valeur maximale de 63. Pour trouver le minimum de bits d’un nombre, cherche donc la première taille dont le maximum est assez grand.'
      ],
      {
        checkpoint: check(
          'Pourquoi 256 ne tient-il pas dans un octet non signé ?',
          [
            ['chiffres', 'Parce que son écriture décimale a trois chiffres.'],
            ['capacite', 'Parce que huit bits ne représentent que les valeurs de zéro à 255.'],
            ['python', 'Parce que Python ne sait pas calculer 255 + 1.']
          ],
          'capacite',
          'Un octet non signé offre 256 configurations, utilisées pour 0 à 255. La valeur 256 est la suivante : elle exige une neuvième case en binaire.'
        )
      }
    ),
    s('Pour une somme ou un produit : prévoir un maximum, pas une taille obligatoire', [
      'Sur trois bits non signés, chaque nombre peut aller au plus jusqu’à 7. La plus grande somme possible est donc 7 + 7 = 14. Son écriture est 1110₂ : quatre bits suffisent. On est passé de trois bits pour chaque nombre à quatre bits pour leur somme.',
      'Le plus grand produit possible est 7 × 7 = 49. Pour le lire en binaire, on décompose 49 en 32 + 16 + 1 : 110001₂, sur six bits. Ces exemples illustrent deux bornes générales : additionner deux nombres écrits sur n bits non signés peut demander n + 1 bits ; les multiplier peut demander jusqu’à 2 × n bits.',
      '« Peut demander » ne signifie pas « demande toujours ». Si les deux nombres sont 1 et 1, leur somme est 2, qui s’écrit 10₂ sur deux bits, et leur produit est 1, sur un bit. Prévoir quatre ou six cases dans l’exemple précédent donne une place suffisante pour tous les nombres possibles sur trois bits, pas la taille minimale de chaque résultat. Pour zéro, nous conservons au moins un chiffre dans l’écriture usuelle.'
    ]),
    s(
      'Utiliser Python pour vérifier un calcul que tu comprends déjà',
      [
        'Le code suivant sert de vérification, pas de raccourci mystérieux. La fonction int reçoit ici le texte "A7" et le nombre 16 pour préciser sa base. Elle renvoie l’entier décimal 167. Le signe = associe ce résultat au nom n : n est une variable.',
        'print affiche une valeur dans la console. bin(n) fabrique un texte représentant n en binaire, avec le préfixe 0b ; hex(n) fabrique une écriture hexadécimale avec le préfixe 0x. Ces préfixes indiquent la base, et ne sont pas des chiffres du nombre. Python écrit les lettres hexadécimales en minuscules : 0xa7 et A7₁₆ représentent la même quantité.',
        'La première ligne d’affichage donnera 167 ; la suivante donnera 0b10100111 ; la dernière donnera 0xa7. Vérifie ces résultats à l’aide des colonnes de la leçon. Changer d’écriture n’a pas changé la valeur conservée dans n.'
      ],
      {
        code: 'n = int("A7", 16)  # Lire le texte A7 comme un nombre de base 16\nprint(n)           # 167 : le nombre affiché en décimal\nprint(bin(n))      # 0b10100111 : une écriture binaire\nprint(hex(n))      # 0xa7 : une écriture hexadécimale'
      }
    ),
    s(
      'Avant le dernier exercice : comprendre la petite boucle Python',
      [
        'L’exercice demande une fonction : un petit programme auquel nous donnons un nombre n et qui renvoie combien de chiffres binaires sont nécessaires. La ligne def bits_necessaires(n): définit cette fonction. Le nom n reçoit la valeur fournie lors de l’appel. return renvoie la réponse et termine la fonction ; ce n’est pas la même chose que print, qui ne fait qu’afficher.',
        'Nous pouvons compter les chiffres grâce aux divisions par deux. Initialisons un compteur à 1, car même zéro et un s’écrivent avec un chiffre. Tant que le nombre est au moins 2, divisons-le par deux en gardant le quotient entier et ajoutons 1 au compteur. En Python, while signifie « tant que » et >= signifie « supérieur ou égal ». L’écriture n //= 2 est un raccourci pour n = n // 2. De même, compteur += 1 signifie compteur = compteur + 1.',
        'Traçons l’idée avec 13 : au départ, n vaut 13 et le compteur vaut 1. Après la première division, n vaut 6 et le compteur 2 ; puis n vaut 3 et le compteur 3 ; enfin n vaut 1 et le compteur 4. Le test n >= 2 est alors faux : la répétition s’arrête. On renvoie 4, ce qui correspond bien aux quatre chiffres de 1101. Le bloc répété est décalé vers la droite : c’est l’indentation. La réponse sera renvoyée après la boucle, pas au premier tour.'
      ],
      {
        table: table(
          'Trace du comptage pour n = 13',
          ['Moment', 'Valeur de n', 'Compteur', 'Continuer ?'],
          [
            ['Départ', 13, 1, '13 ≥ 2 : oui'],
            ['Après une division', 6, 2, '6 ≥ 2 : oui'],
            ['Après deux divisions', 3, 3, '3 ≥ 2 : oui'],
            ['Après trois divisions', 1, 4, '1 ≥ 2 : non, renvoyer 4']
          ]
        )
      }
    )
  ],
  examples: [
    {
      title: 'Lire 11001₂ sans deviner',
      input: 'On veut connaître la quantité écrite 11001 en base deux.',
      reasoning:
        '1. Il y a cinq positions : en partant de la droite, leurs poids sont 1, 2, 4, 8, 16.\n2. On aligne chaque bit avec son poids : 1×16, 1×8, 0×4, 0×2, 1×1.\n3. On garde les contributions des bits à 1 : 16 + 8 + 1.\n4. On additionne : 16 + 8 = 24, puis 24 + 1 = 25.',
      result:
        '11001₂ = 25₁₀. Les cinq chiffres binaires représentent vingt-cinq objets, et pas onze mille un.'
    },
    {
      title: 'Relier 3C₁₆, ses bits et sa valeur',
      input: 'Un octet est écrit 3C en hexadécimal.',
      reasoning:
        '1. Le chiffre 3 vaut trois ; sur quatre bits, il s’écrit 0011.\n2. C est le chiffre qui vaut douze ; douze = 8 + 4, donc 1100 sur quatre bits.\n3. On place les deux groupes côte à côte : 0011 1100.\n4. Les bits à 1 pèsent 32, 16, 8 et 4 : leur somme vaut 60.\n5. On vérifie directement en hexadécimal : 3 × 16 + 12 = 48 + 12 = 60.',
      result:
        '3C₁₆ = 00111100₂ = 60₁₀. Les deux zéros initiaux fixent le format d’un octet sans changer la valeur.'
    },
    {
      title: 'Que manque-t-il pour écrire 255 + 1 ?',
      input: 'Un compteur non signé dispose de huit bits et contient déjà 255.',
      reasoning:
        '1. Huit bits à 1 donnent 11111111₂, soit 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255.\n2. En ajoutant un, on doit reporter une retenue au-delà de toutes les colonnes déjà pleines, comme lorsque 99 + 1 devient 100 en décimal.\n3. La nouvelle colonne vaut 256 ; le résultat s’écrit 100000000₂.\n4. Cette écriture contient neuf bits : il manque une case dans le format prévu.',
      result:
        'Le calcul donne 256, mais il ne tient pas dans un octet non signé. Il faut au moins neuf bits ; le comportement d’un compteur matériel dépend du système.'
    }
  ],
  activity: {
    type: 'bits',
    prompt:
      'Commence avec zéro sur les huit cases. Construis 13 avec les cases 8, 4 et 1, puis 173 avec 128, 32, 8, 4 et 1. Compare l’écriture binaire et le raccourci hexadécimal. Termine en allumant toutes les cases.',
    prediction:
      'Quel nombre les huit cases à 1 représenteront-elles ? Explique comment tu peux le prévoir avec leurs poids.',
    explanation:
      'Chaque case à 1 ajoute son poids ; une case à 0 n’ajoute rien mais conserve sa position. Pour 13, on obtient 00001101₂ et 0D₁₆ ; pour 173, 10101101₂ et AD₁₆. Toutes les cases à 1 donnent 255, soit FF₁₆. Ce laboratoire représente seulement des entiers positifs ou nuls sur un octet ; il ne montre pas ici les formats de nombres négatifs.',
    config: { value: 0, bits: 8, signed: false, showHex: true }
  },
  reflection:
    'Avec l’exemple de 13 billes, explique pourquoi 13₁₀, 1101₂ et D₁₆ désignent la même quantité. Comment vérifies-tu ensuite qu’un résultat tient dans le nombre de bits prévu ?',
  review: [
    'Je peux repartir des colonnes pour lire ou construire un nombre sans réciter une formule.',
    'Je sais expliquer le lien entre quatre bits et un chiffre hexadécimal.',
    'Je distingue le nombre de configurations et la plus grande valeur, puis je vérifie un cas limite.'
  ]
};

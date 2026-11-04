export default {
  'snt-photosites-exif': {
    intro: [
      'Tu réduis une photo avant de l’envoyer : le fichier devient plus petit mais l’appareil qui l’a prise n’a pas changé. Des informations de lieu peuvent aussi rester dans le fichier.',
      'Qu’est-ce qui distingue le capteur, les pixels de l’image, la taille du fichier et les informations ajoutées ?',
      'Ces distinctions permettent de calculer une taille brute et d’examiner ce qu’une photo peut révéler avant de la partager.',
      [
        'Relier lumière, photosites et pixels.',
        'Compter les pixels puis les octets du modèle RVB.',
        'Lire les métadonnées et tester la présence de coordonnées sans rejeter zéro.'
      ]
    ],
    recap: [
      [
        'Pixel',
        'Un élément de l’image numérique auquel sont associées des valeurs de couleur.',
        'Une image de largeur 4 et hauteur 3 contient 4 × 3 = 12 pixels.'
      ],
      [
        'Bit, octet et méga',
        'Un bit vaut 0 ou 1 ; huit bits font un octet. Ici méga signifie un million.',
        '3 000 000 pixels correspondent à 3 mégapixels, notés 3 MP.'
      ],
      [
        'Dictionnaire et absence Python',
        'Un dictionnaire associe une clé à une valeur ; None est une valeur spéciale signalant ici l’absence de donnée.',
        'exif.get("GPSLatitude") lit la valeur de cette clé ou renvoie None si elle est absente.'
      ]
    ],
    life: [
      [
        'Une mosaïque de carreaux',
        'Une mosaïque comporte un certain nombre de carreaux par ligne et un certain nombre de lignes.',
        'Les dimensions d’une image comptent aussi des éléments ; leur produit donne le nombre de pixels.',
        'Un pixel est une information numérique ; sa taille physique affichée peut changer avec l’écran ou l’impression.'
      ],
      [
        'La note au dos d’une photo',
        'Une ancienne photo porte une date et un nom de lieu au verso.',
        'Les métadonnées décrivent aussi le contexte d’un fichier sans être les couleurs de son image.',
        'Les métadonnées numériques peuvent être modifiées ou supprimées automatiquement ; leur présence n’atteste pas la vérité de la scène.'
      ]
    ],
    sections: [
      [
        'De la lumière à une image calculée',
        'Un appareil photo reçoit de la lumière sur un capteur. Ses photosites sont de petits éléments sensibles qui fournissent des mesures électriques. Sur de nombreux capteurs, des filtres de couleur font que chaque photosite mesure surtout une composante ; un traitement reconstruit ensuite les trois composantes de chaque pixel. Un photosite physique et un pixel de l’image finale ne sont donc pas simplement la même chose. Le réglage de sortie peut produire plusieurs dimensions d’image avec le même capteur. D’autres traitements influencent encore le résultat.'
      ],
      [
        'Compter les pixels sans confondre les dimensions',
        'Une image de 2 000 pixels de large et 1 500 de haut possède 1 500 lignes de 2 000 pixels. On calcule 2 000 × 1 500 = 3 000 000 pixels, puis 3 000 000 / 1 000 000 = 3 MP. La définition désigne ce nombre de pixels. Diviser chaque dimension par deux donne un produit divisé par quatre : 4 000 × 3 000 = 12 millions, mais 2 000 × 1 500 = 3 millions. Une dimension en pixels n’est pas directement une longueur en centimètres : l’affichage ou l’impression détermine cette correspondance.'
      ],
      [
        'Passer des pixels à la taille brute',
        'RVB signifie rouge, vert, bleu. Dans notre modèle, un pixel contient trois composantes de couleur, chacune codée sur 8 bits, soit un octet. Un pixel occupe donc 3 octets. Une image 100 × 100 contient 10 000 pixels ; 10 000 × 3 = 30 000 octets. Cette taille est brute, sans compression et sans métadonnées. JPEG peut compresser l’image et modifier les informations conservées ; le poids du fichier ne se déduit donc pas uniquement de sa définition. La profondeur indique combien de bits sont utilisés pour coder les couleurs.'
      ],
      [
        'Lire ce que racontent les métadonnées EXIF',
        'EXIF est un format de métadonnées souvent présent dans des photographies : modèle d’appareil, paramètres de prise de vue, dates ou coordonnées peuvent y figurer. Une date interne de prise de vue n’est pas forcément la date de copie du fichier. Ces valeurs peuvent être absentes ou modifiées ; elles ne suffisent pas à prouver l’authenticité. Supprimer les coordonnées réduit une source de localisation, mais un panneau d’adresse visible, un monument ou d’autres indices peuvent encore révéler le lieu. Il faut donc examiner aussi le contenu de l’image.'
      ],
      [
        'Tester une présence sans confondre zéro et absence',
        'Dans l’exercice, exif est un dictionnaire Python. Une fonction commence par def gps_present(exif): et son corps indenté utilise return. exif.get("GPSLatitude") récupère une valeur ou None si la clé est absente. is not None teste qu’elle n’est pas cette valeur d’absence. and exige que les deux tests soient vrais pour latitude et longitude. Tester seulement si une valeur est « vraie » serait incorrect : 0 est une coordonnée valide, à l’équateur ou sur le méridien de référence. Le code vérifie la présence, pas la plausibilité ni l’exactitude du lieu.',
        'def gps_present(exif):\n    return exif.get("GPSLatitude") is not None and exif.get("GPSLongitude") is not None'
      ]
    ],
    pauses: [
      [
        1,
        'Diviser largeur et hauteur par deux change le nombre de pixels comment ?',
        [
          ['Il est divisé par quatre', '4'],
          ['Il est seulement divisé par deux', '2']
        ],
        '4',
        'Le produit contient deux facteurs divisés par deux : (largeur / 2) × (hauteur / 2) = largeur × hauteur / 4.'
      ],
      [
        4,
        'Une latitude égale à 0 doit-elle être traitée comme absente ?',
        [
          ['Non, zéro est une coordonnée valide', 'non'],
          ['Oui, zéro signifie toujours aucune donnée', 'oui']
        ],
        'non',
        'L’absence est représentée ici par None. Zéro est un nombre indiquant notamment l’équateur pour la latitude.'
      ]
    ],
    reasoning: [
      'On calcule séparément 4 000 × 3 000 = 12 000 000 et 2 000 × 1 500 = 3 000 000. Puis 12 / 3 = 4 : les deux divisions par deux se multiplient.',
      'Une ligne contient 100 pixels et il y a 100 lignes : 10 000 pixels. Chaque pixel utilise trois octets, donc 10 000 + 10 000 + 10 000 = 30 000 octets.',
      'On identifie l’événement de chaque date et leur lieu de stockage. Une copie peut changer une date du système sans changer la prise de vue ; inversement les valeurs internes peuvent être éditées.'
    ]
  },
  'snt-transformer-pixels': {
    intro: [
      'Un filtre de photo transforme les couleurs de toute l’image. Derrière le bouton, une règle peut être appliquée à chaque petit élément coloré.',
      'Comment représenter ces éléments et calculer un négatif, un gris ou un éclaircissement sans perdre l’original ?',
      'Écrire les valeurs intermédiaires rend un traitement d’image vérifiable et montre les limites d’un filtre simple.',
      [
        'Lire un pixel RVB et une image organisée en lignes.',
        'Calculer négatif et gris composante par composante.',
        'Construire de nouvelles listes et limiter les valeurs à 255.'
      ]
    ],
    recap: [
      [
        'Liste et indice',
        'Une liste Python s’écrit entre crochets ; les indices commencent à zéro.',
        'pixel = [20, 100, 240] puis pixel[0] vaut 20.'
      ],
      [
        'RVB sur 8 bits',
        'Un pixel comprend rouge, vert, bleu ; dans ce modèle chaque composante est un entier de 0 à 255.',
        '[0, 0, 0] est noir et [255, 255, 255] est blanc dans ce codage.'
      ],
      [
        'Moyenne et division entière',
        'On additionne les valeurs puis on divise par leur nombre ; // garde le quotient entier pour les valeurs positives utilisées ici.',
        '(30 + 60 + 90) // 3 vaut 180 // 3, donc 60.'
      ]
    ],
    life: [
      [
        'Trois variateurs de lumière',
        'Tu règles séparément une lumière rouge, une verte et une bleue pour composer une couleur.',
        'Un pixel RVB est aussi décrit par trois valeurs indépendantes ; modifier l’une change la couleur résultante.',
        'Un écran et un éclairage réel ont des comportements physiques et perceptuels que trois nombres seuls ne décrivent pas complètement.'
      ],
      [
        'Recopier une mosaïque avec une règle',
        'Tu reproduis une mosaïque en remplaçant chaque carreau par une nouvelle teinte.',
        'Une transformation parcourt chaque pixel et construit une nouvelle image, ce qui permet de conserver la version initiale.',
        'Les filtres plus complexes utilisent aussi les pixels voisins ; les trois filtres du cours agissent ici localement.'
      ]
    ],
    sections: [
      [
        'Une couleur représentée par trois nombres',
        'Dans le codage RVB utilisé ici, [20, 100, 240] décrit les composantes rouge, verte et bleue d’un pixel. Chaque entier varie de 0 à 255 parce que huit bits permettent 256 valeurs, en comptant zéro. Une image est une liste de lignes et chaque ligne une liste de pixels. image[1][2] lit la deuxième ligne puis son troisième pixel : le premier indice est 0. Une image de deux lignes et trois colonnes n’a donc pas de ligne d’indice 2. On annonce l’ordre ligne puis colonne avant de parcourir les données.'
      ],
      [
        'Un négatif composante par composante',
        'Le négatif simple remplace chaque valeur c par 255 − c. Le nom c représente ici une composante, pas le pixel entier. Pour [20, 100, 240], on calcule 255 − 20 = 235, 255 − 100 = 155, 255 − 240 = 15 : le résultat est [235, 155, 15]. Refaire l’opération donne 255 − (255 − c) = c, donc ce négatif est réversible dans notre modèle. En Python, def negatif_pixel(pixel): suivi de return [255 - c for c in pixel] construit une nouvelle liste en parcourant les trois valeurs.'
      ],
      [
        'Construire un gris avec une moyenne',
        'Un gris de ce modèle a trois composantes égales. Pour [30, 60, 90], on additionne 30 + 60 + 90 = 180, on divise par trois : 180 // 3 = 60, puis on produit [60, 60, 60]. sum(pixel) calcule la somme des composantes ; // effectue la division entière pour conserver des valeurs entières. Il ne faut pas renvoyer le seul nombre 60 : l’image attend encore trois composantes. Cette moyenne traite les couleurs de la même façon ; elle ne modélise pas exactement la sensibilité de l’œil.'
      ],
      [
        'Parcourir les lignes en gardant l’original',
        'Pour transformer une image entière, resultat = [] prépare une nouvelle image. for ligne in image: commence un parcours ; nouvelle = [] prépare la nouvelle ligne. À l’intérieur, for pixel in ligne: calcule le gris et nouvelle.append([m, m, m]) ajoute le pixel. Après la boucle des pixels, resultat.append(nouvelle) ajoute la ligne complète. return resultat est placé après les deux parcours. L’indentation marque ces niveaux. Modifier directement pixel[0] changerait l’objet d’origine ; nos nouvelles listes évitent cette modification et une image vide produit [].',
        'def gris(image):\n    resultat = []\n    for ligne in image:\n        nouvelle = []\n        for pixel in ligne:\n            m = sum(pixel) // 3\n            nouvelle.append([m, m, m])\n        resultat.append(nouvelle)\n    return resultat'
      ],
      [
        'Éclaircir avec une limite explicite',
        'Pour ajouter 30 à une composante 240, le calcul brut donnerait 270, au-delà de la plage 0 à 255. On conserve alors 255 : c’est une saturation. min(255, c + ajout) choisit le plus petit des deux nombres, donc 255 dans ce cas ; pour c = 100, il garde 130. La compréhension [min(255, c + ajout) for c in pixel] produit les trois nouvelles composantes. def eclaircir(pixel, ajout): puis return cette liste définit la fonction. L’ajout est positif ou nul dans le contrat. La saturation perd les différences entre valeurs trop élevées et n’est pas réversible en général.'
      ]
    ],
    pauses: [
      [
        1,
        'Quel négatif pour une composante qui vaut 20 ?',
        [
          ['235', '235'],
          ['275', '275']
        ],
        '235',
        'La règle est 255 moins la valeur : 255 − 20 = 235. On n’ajoute pas la valeur à 255.'
      ],
      [
        4,
        'Avec une composante 240 et un ajout de 30, quel résultat autorisé ?',
        [
          ['255 après saturation', '255'],
          ['270 sans limite', '270']
        ],
        '255',
        '240 + 30 = 270, mais la composante doit rester au plus à 255. min(255, 270) renvoie 255.'
      ]
    ],
    reasoning: [
      'On traite les trois nombres dans le même ordre rouge, vert, bleu : 255 − 20 = 235 ; 255 − 100 = 155 ; 255 − 240 = 15. La liste conserve trois éléments.',
      'On calcule d’abord la somme 30 + 60 = 90 puis 90 + 90 = 180. La moyenne 180 // 3 vaut 60, que l’on inscrit dans chacun des trois canaux.',
      'Deux lignes ont les indices 0 et 1 ; trois colonnes ont les indices 0, 1, 2. La paire [1][2] est donc valide, alors que [2][1] cherche une troisième ligne absente.'
    ]
  },
  'snt-fabriquer-photo': {
    intro: [
      'Deux photos d’une scène peuvent sembler différentes malgré le même appareil : la durée de prise de vue, les calculs et la compression changent le résultat.',
      'Quelles décisions et quels traitements séparent la lumière reçue du fichier que l’on regarde ?',
      'Comprendre cette chaîne aide à expliquer le flou, les limites d’une fusion et l’intérêt de conserver un original.',
      [
        'Identifier les compromis de la prise de vue.',
        'Distinguer reconstruction, réduction du bruit et stabilisation.',
        'Calculer une fusion simple puis reconnaître une perte d’information.'
      ]
    ],
    recap: [
      [
        'Pixel et composante',
        'Un pixel est un élément d’image ; notre modèle RVB le représente par une liste rouge, vert, bleu.',
        '[98, 120, 150] contient trois composantes dont les indices sont 0, 1, 2.'
      ],
      [
        'Moyenne entière',
        'On additionne les valeurs, puis // divise en conservant un entier pour les valeurs positives.',
        '(98 + 102) // 2 = 200 // 2 = 100.'
      ],
      [
        'Compression avec perte',
        'Une réduction de représentation qui supprime certaines informations ; elles ne sont pas toutes récupérables à partir du fichier obtenu.',
        'Conserver un original évite de dépendre seulement d’une version déjà simplifiée.'
      ]
    ],
    life: [
      [
        'Lire une plaque depuis un bus en mouvement',
        'Pendant que le bus avance, une observation longue mélange plusieurs positions de la plaque.',
        'Une exposition trop longue peut étaler le sujet sur plusieurs positions et produire du flou de mouvement.',
        'Une caméra accumule de la lumière selon des paramètres précis ; notre observation humaine n’est qu’un point de départ pour expliquer le déplacement.'
      ],
      [
        'Résumer puis recopier un texte',
        'Tu fais un résumé qui omet des phrases, puis recopies ce résumé sans erreur.',
        'Une sauvegarde sans perte d’une version déjà appauvrie conserve cette version sans retrouver les détails supprimés avant.',
        'Les algorithmes de compression ne rédigent pas de résumé sémantique ; l’analogie concerne seulement l’information irrécupérable.'
      ]
    ],
    sections: [
      [
        'La prise de vue impose des compromis',
        'L’exposition correspond à la lumière recueillie pendant la prise de vue. Allonger la durée peut recueillir davantage de lumière, mais un sujet en mouvement occupe plusieurs positions pendant cette durée et peut devenir flou. Une durée plus courte peut limiter ce déplacement tout en nécessitant d’autres réglages. L’autofocus cherche une mise au point et la stabilisation compense certains mouvements de l’appareil ; elle n’immobilise pas une personne qui court. On identifie donc la cause du défaut avant de choisir le traitement censé l’aider.'
      ],
      [
        'Les mesures ne sont pas encore la photo finale',
        'Le capteur contient des éléments sensibles à la lumière, les photosites. Sur de nombreux capteurs, des filtres font mesurer différentes composantes colorées ; des calculs reconstruisent les couleurs des pixels. D’autres traitements peuvent régler l’équilibre des couleurs, renforcer des contours ou réduire du bruit. Le bruit est une variation de mesure qui ne correspond pas seulement au signal souhaité. Une image plus lisse peut aussi perdre des détails fins : un algorithme fait des choix et ne retrouve pas automatiquement une vérité unique cachée dans les mesures.'
      ],
      [
        'Fusionner suppose des vues compatibles',
        'Un appareil peut combiner plusieurs prises pour améliorer un résultat. Dans un modèle simple, deux mesures d’un même pixel sont 98 et 102 ; leur somme vaut 200 et leur moyenne 200 / 2 = 100. Cette moyenne peut atténuer certaines fluctuations si les deux mesures décrivent réellement le même point de la même scène. Il faut aligner les images : associer les pixels correspondant à ce point. Si le sujet a bougé, une moyenne aveugle peut au contraire créer une image double ou brouillée. La fusion ne garantit donc pas toujours plus de netteté.'
      ],
      [
        'Programmer une fusion canal par canal',
        'La fonction fusion(a, b) reçoit deux pixels sous forme de listes RVB. Leurs trois composantes ont les indices 0, 1, 2. range(3) fournit précisément ces indices, sans 3. Pour chaque i, (a[i] + b[i]) // 2 calcule la moyenne entière des deux composantes correspondantes. Les parenthèses imposent l’addition avant la division ; // garde un entier. La compréhension entre crochets construit une nouvelle liste, puis return la renvoie. Avec a = [98, 20, 255] et b = [102, 40, 1], on obtient [100, 30, 128]. Les pixels sont supposés alignés.',
        'def fusion(a, b):\n    return [(a[i] + b[i]) // 2 for i in range(3)]'
      ],
      [
        'Compresser puis conserver un original',
        'Un fichier peut être compressé sans perte, ce qui permet de retrouver exactement les données compressées, ou avec perte, ce qui en supprime certaines. JPEG peut employer une compression avec perte : des réenregistrements successifs peuvent ajouter des pertes. Réenregistrer ensuite sans perte garde fidèlement la version actuelle, mais ne recrée pas les détails déjà supprimés. Un fichier devenu plus gros n’est pas forcément plus riche. Pour comparer des traitements, on conserve un original et on examine les changements sur un même détail, en distinguant taille du fichier, définition et qualité visuelle.'
      ]
    ],
    pauses: [
      [
        2,
        'Moyenner deux photos améliore-t-il forcément un sujet mobile ?',
        [
          ['Non, les points peuvent ne plus correspondre', 'non'],
          ['Oui, toute moyenne crée de la netteté', 'oui']
        ],
        'non',
        'Le modèle suppose des pixels représentant le même point. Un mouvement entre prises peut violer cette hypothèse et produire un mélange indésirable.'
      ],
      [
        4,
        'Une sauvegarde sans perte peut-elle recréer un détail déjà supprimé ?',
        [
          ['Non, elle conserve la version disponible', 'non'],
          ['Oui, sans perte signifie tout retrouver', 'oui']
        ],
        'non',
        'Sans perte décrit la conservation des données actuelles pendant cette nouvelle opération. Les données retirées auparavant ne sont plus dans cette version.'
      ]
    ],
    reasoning: [
      'On sépare le mouvement de l’appareil de celui du sujet. Même avec un appareil immobile, le coureur change de position pendant l’exposition et peut laisser une trace étalée.',
      'On vérifie d’abord l’alignement et l’identité du point mesuré. Ensuite seulement 98 + 102 = 200 puis 200 / 2 = 100 donne un résultat interprétable.',
      'Chaque réencodage avec perte peut simplifier des données déjà simplifiées. Augmenter ensuite la taille ne réintroduit pas une information qui n’existe plus dans l’entrée.'
    ]
  }
};

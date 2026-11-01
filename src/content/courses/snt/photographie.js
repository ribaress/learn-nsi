import { lesson, answer as a, python as p, tableActivity as table } from './authoring.js';
export default {
  id: 'photographie',
  title: 'La photographie numérique',
  lessons: [
    lesson({
      id: 'snt-photosites-exif',
      title: 'Du photosite au pixel, avec les métadonnées',
      duration: 40,
      prerequisites: ['Multiplication, unités et fichiers.'],
      objectives: [
        'Distinguer capteur, définition d’image et profondeur de couleur.',
        'Lire des métadonnées sans leur attribuer une preuve absolue.'
      ],
      official: ['photosites', 'exif'],
      sections: [
        [
          'Le capteur ne livre pas directement tous les pixels RVB',
          'Un photosite est un élément sensible du capteur qui mesure une lumière reçue. Dans une mosaïque de Bayer courante, chaque photosite porte un filtre rouge, vert ou bleu ; deux filtres verts apparaissent pour un rouge et un bleu dans un motif de quatre. Des calculs reconstruisent ensuite les trois composantes des pixels de l’image finale. Un photosite n’est donc pas simplement un pixel RVB prêt à afficher ; d’autres architectures de capteurs existent aussi.'
        ],
        [
          'Définition, taille et profondeur',
          'Une image de 4000 × 3000 pixels possède 12 millions de pixels. Un réglage de sortie peut réduire cette définition sans changer le nombre physique de photosites. Pour éviter l’ambiguïté du mot résolution, on précise si l’on compte les photosites, les pixels ou les pixels par unité de longueur à l’impression. Avec 8 bits pour chacune des trois composantes RVB, un pixel non compressé utilise 24 bits, soit 3 octets. Le nombre de pixels ne détermine pas seul la netteté, le bruit ou la qualité optique.'
        ],
        [
          'Ce que raconte EXIF',
          'Un fichier photographique peut contenir des métadonnées EXIF : appareil, date de prise de vue, durée d’exposition, ouverture et parfois coordonnées. Elles peuvent être absentes, supprimées par un partage ou modifiées ; elles ne certifient pas l’authenticité de la scène. Pour les retrouver, on utilise les informations détaillées du fichier ou un outil EXIF sur une copie non sensible, en distinguant date système et date interne. Avant de diffuser, on examine notamment la localisation ; enlever EXIF ne masque pas les indices visibles dans l’image.'
        ]
      ],
      examples: [
        [
          'Comparer deux sorties',
          'Un capteur produit des images 4000 × 3000 ou 2000 × 1500 selon le réglage.',
          'Les nombres de pixels sont 12 millions et 3 millions ; le capteur physique reste le même.',
          'Diviser chaque dimension par 2 divise le nombre de pixels par 4.'
        ],
        [
          'Une taille brute',
          'Une image 100 × 100 en RVB sur 8 bits par composante.',
          '10 000 pixels occupent chacun 3 octets avant compression et métadonnées.',
          'La taille brute vaut 30 000 octets ; le fichier JPEG peut avoir une autre taille.'
        ],
        [
          'Une date non certaine',
          'EXIF indique une date de prise de vue différente de la date de copie du fichier.',
          'Ces dates décrivent des événements distincts et peuvent avoir été modifiées.',
          'On ne déduit pas une falsification ni une authenticité de cette seule différence.'
        ]
      ],
      activity: table(
        'Compare le nombre de pixels de deux réglages puis distingue les champs EXIF des dimensions.',
        'Prévois si réduire la sortie change le capteur physique.',
        'Ce modèle utilise des métadonnées fictives affichées dans une table ; il ne lit pas un véritable fichier EXIF.',
        ['propriété', 'valeur'],
        [
          ['capteur', '12 millions de photosites'],
          ['sortie grande', '4000 × 3000 pixels'],
          ['sortie réduite', '2000 × 1500 pixels'],
          ['DateTimeOriginal', '2025:04:08 10:30:00'],
          ['GPSLatitude', 'non renseignée']
        ]
      ),
      exercises: [
        a(
          'Une image mesure 2000 × 1500 pixels. Combien compte-t-elle de mégapixels (1 MP = 1 000 000 pixels) ?',
          '3',
          ['Multiplie les dimensions.', '2000 × 1500 vaut 3 000 000.', 'Divise par un million.'],
          'La définition est de 3 mégapixels, sans information suffisante sur sa qualité optique.',
          'Additionner les dimensions ne compte pas les cases de l’image ; calcule leur produit.'
        ),
        p(
          'Écris gps_present(exif) qui renvoie True si le dictionnaire contient GPSLatitude ET GPSLongitude, chacune différente de None. La valeur 0 est une coordonnée valide.',
          'gps_present',
          'def gps_present(exif):\n    pass',
          'def gps_present(exif):\n    return exif.get("GPSLatitude") is not None and exif.get("GPSLongitude") is not None',
          [
            [[{ GPSLatitude: 0, GPSLongitude: 0 }], true],
            [[{ GPSLatitude: 48 }], false],
            [[{ GPSLatitude: null, GPSLongitude: 2 }], false],
            [[{}], false]
          ],
          [
            'Utilise get pour une clé possiblement absente.',
            'Teste is not None, pas la valeur booléenne de la coordonnée.',
            'Les deux coordonnées doivent être présentes.'
          ],
          'Zéro indique l’équateur ou le méridien de référence et ne signifie pas absence ; le dictionnaire modélise des EXIF déjà extraites.',
          'Si le cas zéro échoue, tu as confondu coordonnée nulle et donnée manquante.'
        ),
        a(
          'Une photo ne contient plus de coordonnées EXIF mais montre un panneau d’adresse. Sa localisation est-elle forcément impossible ? Réponds oui ou non.',
          'non',
          [
            'L’image elle-même contient des indices.',
            'Un texte visible peut indiquer un lieu.',
            'Les métadonnées ne sont pas la seule source d’information.'
          ],
          'Retirer les coordonnées limite une source de localisation, sans effacer les indices visuels.',
          'Ne réduis pas la confidentialité à EXIF : inspecte aussi le contenu visible.'
        )
      ],
      reflection:
        'Autoévaluation pratique : sur une copie d’une photo personnelle non sensible, retrouve dimensions et EXIF avec un outil adapté, puis compare à une copie exportée. Note les champs présents et absents sans publier leurs valeurs privées ; distingue ce travail de la table fictive.',
      review: [
        'Je distingue photosite et pixel.',
        'Je calcule la définition et la taille brute.',
        'Je lis EXIF avec prudence.'
      ]
    }),
    lesson({
      id: 'snt-transformer-pixels',
      title: 'Transformer une image en agissant sur ses pixels',
      duration: 50,
      prerequisites: ['Listes, boucles et fonctions Python.'],
      objectives: [
        'Transformer les trois composantes RVB.',
        'Parcourir une matrice d’image sans confondre ligne et colonne.'
      ],
      official: ['transformer-image'],
      sections: [
        [
          'Représenter des couleurs',
          'Une couleur RVB est décrite ici par trois entiers de 0 à 255. Dans ce modèle additif, [0,0,0] est noir et [255,255,255] blanc ; augmenter une composante ajoute de cette lumière. Une image est une liste de lignes, chaque ligne une liste de pixels et chaque pixel une liste de trois composantes. image[y][x] désigne le pixel de colonne x et ligne y, en commençant à zéro. Le modèle contient réellement les valeurs traitées, sans bibliothèque d’image à installer.'
        ],
        [
          'Négatif et niveaux de gris',
          'Le négatif simple remplace chaque composante c par 255 − c. Un gris peut être calculé par une moyenne entière des trois composantes puis répété dans les trois canaux. Cette moyenne est un choix pédagogique : la perception n’accorde pas le même poids au rouge, au vert et au bleu, et d’autres méthodes produisent d’autres luminances. Changer seulement le rouge ne rend pas en général un pixel gris ; l’égalité des trois valeurs est nécessaire dans cette représentation.'
        ],
        [
          'Parcourir sans détruire involontairement',
          'On peut construire une nouvelle image ligne après ligne en créant de nouvelles listes de pixels. Cela conserve l’original pour comparer. Réutiliser la même liste pour toutes les lignes crée des dépendances surprenantes ; modifier un pixel peut alors sembler en modifier plusieurs. On vérifie d’abord une image d’un pixel, puis plusieurs lignes, et une image vide. Les bornes 0 et 255 et la forme de la matrice font partie du contrat de chaque transformation.',
          'def negatif_pixel(pixel):\n    return [255 - composante for composante in pixel]'
        ]
      ],
      examples: [
        [
          'Le calcul du négatif',
          'Le pixel est [20, 100, 240].',
          'On calcule 255−20, 255−100 et 255−240 indépendamment.',
          'Le résultat est [235,155,15] ; appliquer deux fois ce négatif retrouve le pixel initial.'
        ],
        [
          'Un gris moyen',
          'Le pixel [30, 60, 90] possède une somme 180.',
          'La moyenne entière vaut 180//3 = 60 ; on la répète dans les trois canaux.',
          'Le résultat [60,60,60] est gris ; ce calcul n’est pas une mesure perceptuelle exacte.'
        ],
        [
          'Une position précise',
          'Une matrice de deux lignes contient trois pixels par ligne.',
          'L’indice de ligne vient avant l’indice de colonne ; image[1][2] est le dernier pixel.',
          'Les coordonnées commencent à zéro ; image[2][1] dépasserait ici le nombre de lignes.'
        ]
      ],
      activity: {
        type: 'pixels',
        prompt:
          'Modifie les composantes et observe les variations de couleur ; prédis ensuite leur négatif.',
        prediction: 'Des composantes égales produisent-elles toujours un gris dans ce modèle ?',
        explanation:
          'Ce modèle représente un pixel en RVB 8 bits ; il ne simule pas le capteur, la calibration de l’écran ni tous les espaces colorimétriques.',
        config: { color: [20, 100, 240] }
      },
      exercises: [
        p(
          'Écris negatif_pixel(pixel) qui renvoie une nouvelle liste des trois composantes du négatif, sans changer pixel. Les valeurs sont des entiers de 0 à 255.',
          'negatif_pixel',
          'def negatif_pixel(pixel):\n    pass',
          'def negatif_pixel(pixel):\n    return [255 - c for c in pixel]',
          [
            [[[20, 100, 240]], [235, 155, 15]],
            [[[0, 0, 0]], [255, 255, 255]],
            [[[255, 128, 1]], [0, 127, 254]]
          ],
          [
            'Traite les trois valeurs.',
            'Chaque nouvelle valeur vaut 255 moins l’ancienne.',
            'Construis une liste nouvelle.'
          ],
          'La transformation inverse les niveaux sur l’intervalle fermé 0 à 255.',
          'Ne change pas seulement un canal ; vérifie noir, blanc et une couleur mélangée.'
        ),
        p(
          'Écris gris(image) qui renvoie une nouvelle image de même forme, chaque pixel [r,v,b] devenant [m,m,m] avec m=(r+v+b)//3. L’image peut être vide.',
          'gris',
          'def gris(image):\n    pass',
          'def gris(image):\n    resultat = []\n    for ligne in image:\n        nouvelle = []\n        for pixel in ligne:\n            m = sum(pixel) // 3\n            nouvelle.append([m, m, m])\n        resultat.append(nouvelle)\n    return resultat',
          [
            [
              [
                [
                  [
                    [30, 60, 90],
                    [0, 0, 0]
                  ]
                ]
              ],
              [
                [
                  [60, 60, 60],
                  [0, 0, 0]
                ]
              ]
            ],
            [[[]], []],
            [[[[[255, 255, 255]], [[3, 6, 9]]]], [[[255, 255, 255]], [[6, 6, 6]]]]
          ],
          [
            'Crée une nouvelle liste pour l’image.',
            'Dans chaque ligne, calcule la moyenne de chaque pixel.',
            'Reproduis cette moyenne dans les trois canaux.'
          ],
          'Le double parcours conserve les lignes et colonnes ; la transformation choisie utilise une moyenne entière.',
          'Si la forme change, vérifie que tu ajoutes les pixels à leur ligne avant d’ajouter la ligne à l’image.'
        ),
        p(
          'Écris eclaircir(pixel, ajout), pour ajout entier >= 0 : augmenter chaque composante sans dépasser 255, et renvoyer un nouveau pixel.',
          'eclaircir',
          'def eclaircir(pixel, ajout):\n    pass',
          'def eclaircir(pixel, ajout):\n    return [min(255, c + ajout) for c in pixel]',
          [
            [
              [[240, 100, 0], 30],
              [255, 130, 30]
            ],
            [
              [[0, 0, 0], 0],
              [0, 0, 0]
            ],
            [
              [[255, 250, 1], 10],
              [255, 255, 11]
            ]
          ],
          [
            'Ajoute la même valeur aux trois canaux.',
            'Une valeur au-dessus de 255 doit être bornée.',
            'Utilise min(255, c + ajout).'
          ],
          'L’écrêtage respecte les bornes du modèle ; les valeurs saturées perdent une information de différence.',
          'Un dépassement ne doit pas revenir à zéro : borne la valeur au maximum annoncé.'
        )
      ],
      reflection:
        'Autoévaluation : applique à la main deux fois le négatif puis deux fois l’éclaircissement sur [240,100,0]. Explique pourquoi la première transformation est réversible et la seconde peut perdre une information.',
      review: [
        'Je parcours les pixels d’une matrice.',
        'Je traite les trois canaux.',
        'Je comprends l’écrêtage et ses pertes.'
      ]
    }),
    lesson({
      id: 'snt-fabriquer-photo',
      title: 'Comprendre les algorithmes de fabrication d’une photo',
      duration: 40,
      prerequisites: ['Photosites, pixels et transformations RVB.'],
      objectives: [
        'Situer les traitements avant et après la capture.',
        'Expliquer les compromis d’une fusion et d’une compression.'
      ],
      official: ['algorithmes-photo', 'construction-image'],
      sections: [
        [
          'Décider avant et pendant la prise',
          'L’appareil estime l’exposition et la mise au point à partir de mesures et de calculs. La durée d’exposition influence la quantité de lumière reçue et le flou de mouvement ; l’ouverture et la sensibilité interviennent aussi. Une stabilisation peut compenser certains bougés mais pas immobiliser un sujet qui court. Une décision automatique optimise un objectif prévu ; elle peut être mise en difficulté par un contre-jour ou une scène inhabituelle. Le photographe peut examiner le résultat et modifier ses choix.'
        ],
        [
          'Construire l’image finale',
          'Après la mesure du capteur, le développement reconstruit les composantes colorées, corrige la balance des blancs, ajuste tonalité et contraste, réduit éventuellement le bruit et compense certaines déformations optiques. Ces étapes produisent des pixels qui ne sont pas une copie directe des photosites. Leur ordre et leurs paramètres varient selon l’appareil. Un fichier RAW conserve des données de capture et des informations associées ; un JPEG contient déjà une image développée puis compressée.'
        ],
        [
          'Combiner et compresser',
          'La fusion de plusieurs vues peut réduire un bruit aléatoire, assembler un panorama ou combiner des expositions pour une image HDR. Les scènes mobiles compliquent l’alignement et peuvent produire des artefacts. La compression sans perte permet de retrouver exactement les données codées ; une compression avec perte comme le JPEG habituel sacrifie des informations pour réduire la taille. Agrandir ou réenregistrer une image ne restaure pas les détails perdus ; un résultat visuellement convaincant ne garantit pas un document fidèle à la scène.'
        ]
      ],
      examples: [
        [
          'Un sujet en mouvement',
          'Une personne court pendant une exposition longue.',
          'La lumière du sujet se répartit sur plusieurs positions ; stabiliser l’appareil ne bloque pas son mouvement.',
          'Une durée plus courte peut réduire ce flou, avec d’autres compromis d’exposition.'
        ],
        [
          'Une moyenne de prises',
          'Deux mesures d’un même pixel sont 98 et 102 dans un modèle de bruit symétrique.',
          'La moyenne vaut 100 si les vues sont correctement alignées et représentent la même scène.',
          'La fusion peut réduire ce bruit ; elle ne garantit pas la netteté d’un sujet mobile.'
        ],
        [
          'Un fichier réduit',
          'Un JPEG est réenregistré plusieurs fois avec forte compression.',
          'Les nouvelles pertes peuvent s’ajouter aux anciennes sans récupérer les informations supprimées.',
          'Pour préserver le travail, on conserve un original ; un fichier plus gros après réexport n’est pas forcément plus riche.'
        ]
      ],
      activity: table(
        'Remets les étapes dans leur rôle : acquisition, développement ou stockage.',
        'Prévois si la compression JPEG intervient avant la mesure des photosites.',
        'Ce modèle de chaîne photographique est simplifié ; appareils et logiciels peuvent modifier l’ordre et combiner plusieurs traitements.',
        ['étape', 'rôle'],
        [
          ['mise au point et exposition', 'préparer la capture'],
          ['mesure des photosites', 'acquérir'],
          ['reconstruction RVB et balance des blancs', 'développer'],
          ['compression JPEG et EXIF', 'stocker']
        ]
      ),
      exercises: [
        a(
          'Quel traitement compense certains bougés de l’appareil : « stabilisation » ou « retrait EXIF » ?',
          'stabilisation',
          [
            'On cherche un effet lié au mouvement.',
            'Les métadonnées ne changent pas le bougé.',
            'La stabilisation vise certains déplacements de l’appareil.'
          ],
          'La stabilisation compense une partie du bougé, sans garantir l’immobilité du sujet.',
          'Ne confonds pas description du fichier et traitement de la prise de vue.'
        ),
        p(
          'Modèle de fusion de deux pixels alignés : écris fusion(a,b) qui renvoie la moyenne entière canal par canal des deux listes RVB.',
          'fusion',
          'def fusion(a, b):\n    pass',
          'def fusion(a, b):\n    return [(a[i] + b[i]) // 2 for i in range(3)]',
          [
            [
              [
                [98, 50, 200],
                [102, 60, 220]
              ],
              [100, 55, 210]
            ],
            [
              [
                [0, 0, 0],
                [255, 255, 255]
              ],
              [127, 127, 127]
            ],
            [
              [
                [8, 8, 8],
                [8, 8, 8]
              ],
              [8, 8, 8]
            ]
          ],
          [
            'Associe les composantes de même indice.',
            'Additionne les deux valeurs puis divise par 2.',
            'Utilise // pour la moyenne entière demandée.'
          ],
          'Cette fusion suppose les images alignées et une même scène ; elle ne réalise pas un HDR complet.',
          'Ne moyenne pas les six nombres ensemble : chaque canal doit conserver son rôle.'
        ),
        a(
          'Une compression avec perte a supprimé des détails. Réenregistrer ensuite sans perte suffit-il à retrouver ces détails ? Réponds oui ou non.',
          'non',
          [
            'Sans perte conserve ce qui reste.',
            'Les détails supprimés ne sont plus disponibles.',
            'Il faut conserver l’original pour revenir en arrière.'
          ],
          'Un codage ultérieur sans perte ne peut pas reconstruire une information déjà supprimée.',
          'Une augmentation de taille de fichier ne prouve pas une récupération de détails.'
        )
      ],
      reflection:
        'Autoévaluation : raconte la fabrication d’une photo depuis la décision d’exposition jusqu’au fichier partagé. Place au moins une limite de prise de vue, une limite de fusion et une limite de compression ; vérifie ton récit avec les étapes de la leçon.',
      review: [
        'Je situe exposition et mise au point.',
        'Je distingue capture et développement.',
        'Je comprends la perte irréversible de certaines compressions.'
      ]
    })
  ]
};

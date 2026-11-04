export default {
  'snt-descrire-donnees': {
    intro: [
      'Une association garde les coordonnées de ses lieux d’activité dans un tableau. Un code comme 0012 y ressemble à un nombre, mais ses zéros doivent rester.',
      'Comment décrire et échanger une collection sans perdre le sens de ses colonnes ni modifier ses identifiants ?',
      'Une structure claire et un format bien lu rendent les données utilisables ; examiner leur origine et leur caractère personnel prépare un partage responsable.',
      [
        'Distinguer objet, propriété et valeur dans un tableau.',
        'Lire les en-têtes et les séparateurs d’un CSV.',
        'Conserver les codes et examiner licence, date et identification indirecte.'
      ]
    ],
    recap: [
      [
        'Table',
        'Un tableau organisé en lignes et colonnes ; une cellule est leur croisement.',
        'La ligne de la station Nord croise la colonne altitude_m à la valeur 120.'
      ],
      [
        'Chaîne et nombre',
        'Une chaîne est du texte ; un nombre sert aux calculs. Des chiffres peuvent faire partie d’un texte.',
        '"0012" reste un code ; int("0012") donne le nombre 12.'
      ],
      [
        'En-tête et unité',
        'L’en-tête nomme la propriété de la colonne ; l’unité précise comment interpréter sa quantité.',
        'altitude_m signifie ici altitude en mètres.'
      ]
    ],
    life: [
      [
        'Le carnet des adhérents',
        'Un carnet contient pour chaque personne un nom, une ville et un numéro d’adhérent.',
        'Chaque personne est un objet décrit par les mêmes propriétés ; le numéro est un identifiant, pas une quantité à additionner.',
        'Une table réelle peut être incomplète ou contenir des doublons ; la présence de colonnes ne garantit pas la qualité des informations.'
      ],
      [
        'Une étiquette sur un colis',
        'Une étiquette contient un code postal et une masse.',
        'Le code doit rester textuel pour préserver sa forme, alors que la masse peut être convertie pour calculer un total.',
        'Une suite de chiffres n’a donc pas un type universel ; c’est son rôle qui détermine l’usage.'
      ]
    ],
    sections: [
      [
        'Partir d’un objet décrit par des propriétés',
        'Pour chaque station météo, on note un nom, une altitude et une commune. La station est l’objet décrit. Un descripteur est le nom d’une propriété, comme altitude_m ; une valeur est ce que cette propriété prend pour un objet, comme 120. Dans une table, chaque ligne décrit une station et chaque colonne correspond à un descripteur. La cellule au croisement de la ligne S1 et de la colonne altitude_m contient 120. Le suffixe _m annonce l’unité mètre : le nombre seul ne suffit pas à comprendre la mesure.'
      ],
      [
        'Ne pas transformer tous les chiffres en quantités',
        'Un identifiant sert à distinguer un objet, par exemple le code de station "0012". Additionner deux codes n’aurait pas de sens. Une chaîne Python est un texte entouré de guillemets ; un entier est un nombre sans partie décimale. Convertir "0012" avec int donne 12 et perd la représentation à quatre caractères. Pour une altitude à additionner, une conversion peut être utile ; pour ce code, on garde le texte. On choisit donc le type d’après le sens de la propriété, pas seulement d’après l’apparence de ses valeurs.'
      ],
      [
        'Un CSV est un texte organisé',
        'CSV est un format représentant une table dans du texte. La première ligne peut contenir les en-têtes, puis chaque ligne décrit un objet. Le séparateur, ici ;, sépare les cellules. Avec code;nom puis 0012;Nord, on obtient deux colonnes. Mais 0001;"Nord; annexe" contient un point-virgule à l’intérieur d’un nom protégé par des guillemets : ce n’est pas une troisième colonne. Un simple découpage à chaque ; échouerait. JSON est un autre format qui peut contenir des listes et des objets imbriqués ; une image JPEG n’est pas une table CSV.'
      ],
      [
        'Utiliser le lecteur CSV de Python',
        'Un module est un ensemble de fonctions disponibles ; import csv et import io donnent accès aux outils de lecture. io.StringIO(texte) présente notre chaîne comme un fichier lisible. csv.DictReader(..., delimiter=";") lit le CSV en respectant les guillemets et associe chaque en-tête à sa cellule. Dans for ligne in lignes:, ligne est un dictionnaire ; ligne["code"] récupère le code textuel. On peut ajouter ce code à une liste avec append puis return la liste après la boucle. Une compréhension [ligne["code"] for ligne in lignes] est une forme abrégée de ce parcours.',
        'import csv\nimport io\n\ndef codes(texte):\n    lignes = csv.DictReader(io.StringIO(texte), delimiter=";")\n    resultat = []\n    for ligne in lignes:\n        resultat.append(ligne["code"])\n    return resultat'
      ],
      [
        'Examiner ce qu’on peut partager',
        'Une donnée personnelle concerne une personne identifiée ou identifiable : la [définition de la CNIL](https://www.cnil.fr/fr/definition/donnee-personnelle) inclut l’identification indirecte. Des trajets précis peuvent ainsi reconnaître quelqu’un sans donner son nom. Une donnée ouverte est réutilisable selon les conditions de sa licence ; téléchargeable ne signifie pas automatiquement ouverte. Pour explorer [data.gouv.fr](https://www.data.gouv.fr/), on note producteur, date, licence, unités et documentation avant de choisir une ressource. Les stations de notre activité sont fictives et ne prétendent pas être un jeu réel du portail.'
      ]
    ],
    pauses: [
      [
        1,
        'Pourquoi conserver "0012" comme chaîne pour un code ?',
        [
          ['Pour préserver les zéros et son rôle d’identifiant', 'texte'],
          ['Parce que tous les nombres sont interdits', 'interdit']
        ],
        'texte',
        'Le code sert à reconnaître un objet. La conversion en 12 changerait sa représentation sans apporter un calcul utile.'
      ],
      [
        2,
        'Dans 0001;"Nord; annexe", combien de cellules lit le CSV ?',
        [
          ['Deux, les guillemets protègent le nom', '2'],
          ['Trois, chaque point-virgule coupe toujours', '3']
        ],
        '2',
        'Le lecteur CSV reconnaît le point-virgule à l’intérieur du champ entre guillemets comme une partie de sa valeur.'
      ]
    ],
    reasoning: [
      'On pose trois questions : quel objet ? S1. Quelle propriété ? altitude_m. Quelle valeur pour cet objet ? 120. Ce découpage évite de confondre l’en-tête et le contenu de la cellule.',
      'On compare avant et après conversion : quatre caractères dans "0012", puis la quantité 12. Comme l’objectif est de garder le code et non de compter, on ne convertit pas.',
      'On combine les lieux et les horaires plutôt que de chercher seulement une colonne nom. Un domicile probable et des habitudes régulières peuvent permettre une identification indirecte.'
    ]
  },
  'snt-traiter-tables': {
    intro: [
      'Une bibliothèque veut connaître les prêts de sa commune et retrouver les titres à partir de leurs codes. Le tableau contient plus de lignes que celles qui l’intéressent.',
      'Comment choisir les bonnes lignes, les ordonner et relier deux listes sans mélanger les objets ?',
      'Filtre, tri et jointure répondent à des questions différentes ; les séparer évite de calculer un résultat exact sur les mauvaises données.',
      [
        'Lire le rôle de chaque colonne.',
        'Filtrer puis calculer, et trier selon le bon type.',
        'Associer des lignes à l’aide d’un identifiant commun et écrire ces opérations en Python.'
      ]
    ],
    recap: [
      [
        'Ligne et colonne',
        'Une ligne décrit un objet ou un événement ; une colonne décrit la même propriété pour plusieurs lignes.',
        'Dans ["Nord", 4], le nom et le nombre de prêts ont des rôles différents.'
      ],
      [
        'Condition',
        'Une question donnant True ou False ; >= signifie supérieur ou égal et == teste l’égalité.',
        'prets >= 5 conserve aussi un prêt de valeur 5.'
      ],
      [
        'Liste et dictionnaire Python',
        'Une liste ordonne des valeurs ; un dictionnaire associe une clé à une valeur consultable entre crochets.',
        'titres["L2"] lit le titre du livre dont la clé est L2.'
      ]
    ],
    life: [
      [
        'Le ticket des produits frais',
        'Dans un panier complet, tu retiens seulement les produits frais puis calcules leur prix total.',
        'Le filtre sélectionne les lignes avant que la somme réponde à la question sur ce sous-ensemble.',
        'Le programme ne devine pas les catégories ; elles doivent être correctement décrites dans les données.'
      ],
      [
        'Les clés et les étiquettes de casiers',
        'Une liste associe un numéro à un casier et une autre indique les personnes auxquelles les clés ont été prêtées.',
        'Le numéro commun permet d’associer les informations même si les deux listes sont dans un ordre différent.',
        'Le croisement suppose des numéros stables et correctement saisis ; deux noms identiques ne suffisent pas à identifier un même objet.'
      ]
    ],
    sections: [
      [
        'Définir la question avant l’opération',
        'Dans Nord 4, Sud 7, Nord 3, chaque ligne décrit un groupe de prêts. Une recherche trouve une ligne précise ; un filtre garde toutes les lignes répondant à une condition. Pour le total de Nord, le filtre garde 4 et 3 ; on calcule ensuite 4 + 3 = 7. Le total de toutes les lignes serait 4 + 7 + 3 = 14 et répondrait à une autre question. Un tri, lui, change l’ordre sans supprimer de ligne : il ne remplace pas la sélection du bon ensemble.'
      ],
      [
        'Trier des textes et trier des nombres',
        'Les données lues dans un CSV sont souvent des chaînes, c’est-à-dire du texte. Un tri textuel de "10", "2", "30" compare d’abord leurs premiers caractères et peut donner "10", "2", "30". Les quantités numériques doivent être converties pour obtenir 2, 10, 30. Mais convertir un code "0012" en entier serait inapproprié si ses zéros font partie de son identifiant. sorted(collection) produit une nouvelle liste triée sans modifier la collection d’origine. Pour des noms, l’exercice demande un tri alphabétique.'
      ],
      [
        'Construire un filtre en Python',
        'def selection(lignes, seuil): définit une fonction dont le corps est indenté. noms = [] crée une liste vide. for nom, prets in lignes: prend chaque ligne à deux éléments et donne un nom à chacun. if prets >= seuil: pose le test et le bloc plus indenté ajoute le nom avec noms.append(nom). return sorted(noms), après la boucle, renvoie tous les noms retenus dans l’ordre demandé. Pour un seuil de 5, une ligne à 5 est gardée, une ligne à 4 ne l’est pas. Une liste sans correspondance donne [].',
        'def selection(lignes, seuil):\n    noms = []\n    for nom, prets in lignes:\n        if prets >= seuil:\n            noms.append(nom)\n    return sorted(noms)'
      ],
      [
        'Croiser avec un identifiant, pas avec la position',
        'Une table livres associe L1 à Océan et L2 à Vent. Une liste de prêts peut contenir L2 puis L1 puis L2. La jointure, ou croisement, retrouve pour chaque code le bon titre : Vent, Océan, Vent. Aligner visuellement deux lignes ne fonctionnerait pas si l’ordre change. En Python, titres est un dictionnaire et titres[identifiant] lit la valeur de sa clé. La forme [titres[identifiant] for identifiant in prets] construit une nouvelle liste dans l’ordre des prêts ; deux occurrences de L2 produisent deux occurrences de Vent.'
      ],
      [
        'Contrôler les hypothèses avant de conclure',
        'Dans les exercices, les lignes sont complètes, les noms de sélection sont uniques et tous les codes de prêts existent dans titres. Ce sont des hypothèses annoncées, pas des garanties universelles sur les fichiers réels. Un identifiant dupliqué peut associer plusieurs objets ; un identifiant absent empêche de retrouver le titre. Une valeur manquante n’est pas automatiquement zéro : l’utiliser comme zéro peut fausser une moyenne. Avant de commenter un total, on examine le filtre, les unités, les conversions et les clés utilisées, même si le programme s’exécute sans erreur.'
      ]
    ],
    pauses: [
      [
        0,
        'Quel total répond aux prêts de Nord pour Nord 4, Sud 7, Nord 3 ?',
        [
          ['7, après avoir gardé Nord', '7'],
          ['14, toutes communes confondues', '14']
        ],
        '7',
        'On choisit les deux lignes de Nord avant l’addition : 4 + 3 = 7. Le total général inclut Sud et répond à une autre question.'
      ],
      [
        3,
        'Faut-il relier les tables par leur ordre de lignes ou par le code du livre ?',
        [
          ['Par le code commun', 'code'],
          ['Par le numéro visuel de ligne', 'ligne']
        ],
        'code',
        'Le code conserve l’identité du livre quand les lignes sont triées différemment. Une position n’est pas une identité stable.'
      ]
    ],
    reasoning: [
      'On barre provisoirement la ligne Sud 7 puis on additionne les deux valeurs restantes : 4 + 3 = 7. Trier les lignes auparavant ne changerait pas cette somme.',
      'On identifie si les valeurs sont des textes ou des quantités. Les premières lettres de "10" et "2" déterminent un ordre textuel, alors que 2 est numériquement inférieur à 10.',
      'La ligne de prêt porte la clé L2. On cherche L2 dans la table des livres et on lit Vent, quelle que soit la position de cette ligne dans le tableau.'
    ]
  },
  'snt-cloud': {
    intro: [
      'Tu modifies un document sur un téléphone et le retrouves sur un ordinateur. Puis une suppression faite sur l’un apparaît aussi sur l’autre.',
      'Où le document est-il conservé, quelles copies sont synchronisées et comment retrouver une version supprimée ?',
      'Comprendre métadonnées, droits et sauvegardes permet de travailler à plusieurs et de reconnaître les machines et l’énergie derrière le mot nuage.',
      [
        'Séparer le fichier des informations qui le décrivent.',
        'Distinguer synchronisation, partage et sauvegarde.',
        'Calculer une énergie simple avec des unités explicites.'
      ]
    ],
    recap: [
      [
        'Fichier et serveur',
        'Un fichier est un ensemble de données conservé sous un nom ; un serveur fournit un service depuis une autre machine.',
        'Un document peut exister sur ton appareil et sur le serveur d’un espace partagé.'
      ],
      [
        'Version',
        'Un état du contenu à un moment donné, qui peut être différent d’un autre état portant le même nom.',
        'La version du lundi contient deux paragraphes ; celle du mardi en contient trois.'
      ],
      [
        'Puissance et énergie',
        'La puissance mesure un rythme de consommation ; l’énergie accumulée dépend aussi de la durée.',
        'Un appareil de 1 kW utilisé 2 h consomme 2 kWh dans un modèle constant.'
      ]
    ],
    life: [
      [
        'Le cahier recopié à jour',
        'Deux personnes rendent leurs cahiers identiques après chaque modification, y compris les pages supprimées.',
        'La synchronisation vise un état cohérent et peut donc propager une suppression au lieu de conserver l’ancien contenu.',
        'Les logiciels peuvent gérer conflits et versions selon leurs réglages ; deux cahiers ne décrivent pas toutes ces fonctions.'
      ],
      [
        'Une copie datée dans un tiroir',
        'Avant de corriger un texte, tu mets une copie datée à part.',
        'Une sauvegarde séparée permet de retrouver un état antérieur qu’une simple synchronisation pourrait remplacer.',
        'La récupération dépend de la durée de conservation et de la possibilité réelle de lire la copie ; le mot sauvegarde ne suffit pas.'
      ]
    ],
    sections: [
      [
        'Le contenu et sa description',
        'Un document contient du texte ; son nom, sa taille, son auteur annoncé ou ses dates sont des métadonnées, informations qui décrivent le fichier ou son histoire. Un fichier créé lundi puis copié mardi peut avoir une date de copie différente de la date interne de création. Une métadonnée peut être modifiée ou interprétée selon le logiciel. On commence donc par demander quel événement chaque date décrit. Le cloud, ou nuage, désigne des services fournis par des machines distantes, pas une disparition du fichier hors du monde matériel.'
      ],
      [
        'Partager un accès précis',
        'Un dossier partagé peut accorder la lecture, qui permet de consulter, ou la modification, qui permet de changer le contenu. Pour demander seulement une relecture, on choisit lecture si c’est bien le besoin. Une personne peut aussi recevoir un lien ou une invitation associée à son compte : on vérifie l’audience effective. Autoriser la lecture n’empêche pas forcément toute copie ou capture. Avant de partager, on distingue le contenu du document, les métadonnées éventuelles et les droits nécessaires au travail demandé.'
      ],
      [
        'Synchroniser ne suffit pas à sauvegarder',
        'La synchronisation cherche à répercuter les changements entre appareils et serveur : une suppression peut donc se propager partout. Une sauvegarde vise la récupération d’un état antérieur. On peut conserver des versions séparées et vérifier comment les restaurer, selon les outils utilisés. Deux fichiers toujours rendus identiques ne constituent pas à eux seuls une garantie contre l’erreur. Si deux personnes travaillent hors ligne puis modifient la même partie, un conflit de versions peut apparaître ; il faut savoir quel état garder au lieu de supposer une fusion toujours juste.'
      ],
      [
        'Des machines consomment de l’énergie',
        'Stocker et transmettre mobilise disques, processeurs, équipements réseau et souvent refroidissement. Une puissance se mesure en watts, symbole W ; 1 000 W font 1 kilowatt, kW. Si un serveur fictif consomme 500 W pendant 4 h, on convertit d’abord : 500 / 1 000 = 0,5 kW. L’énergie vaut puissance × durée : 0,5 × 4 = 2 kWh. Le kWh est une quantité d’énergie, le kW une puissance. Sans mesure supplémentaire, on n’ajoute pas un refroidissement inventé et on ne transforme pas cette énergie directement en émissions.'
      ],
      [
        'Écrire le calcul et vérifier son périmètre',
        'En Python, def energie(puissance_w, heures): définit une fonction avec deux paramètres, noms recevant les valeurs d’entrée. Son corps indenté contient return puissance_w * heures / 1000 : * multiplie et / divise. Multiplier des watts par des heures donne des Wh ; diviser par 1 000 donne des kWh. Pour 500 et 4, on obtient 500 × 4 = 2 000 Wh puis 2 000 / 1 000 = 2 kWh. Les exercices ne demandent pas d’arrondi : round serait une transformation supplémentaire non nécessaire.',
        'def energie(puissance_w, heures):\n    return puissance_w * heures / 1000'
      ]
    ],
    pauses: [
      [
        2,
        'Une suppression se propage sur deux copies synchronisées. Peut-on compter sur leur seule existence pour restaurer ?',
        [
          ['Non, il faut une version récupérable', 'non'],
          ['Oui, deux copies suffisent toujours', 'oui']
        ],
        'non',
        'Les deux copies peuvent contenir la même suppression. La récupération demande un état ancien conservé et accessible.'
      ],
      [
        3,
        'Quelle unité convient au résultat de 0,5 kW × 4 h ?',
        [
          ['2 kWh d’énergie', 'energie'],
          ['2 kW de puissance', 'puissance']
        ],
        'energie',
        'Multiplier la puissance par la durée donne une énergie. Les heures restent dans l’unité kWh.'
      ]
    ],
    reasoning: [
      'On associe chaque date à un événement : création du contenu lundi, copie mardi. Deux événements différents peuvent légitimement avoir deux dates différentes.',
      'On suit l’action : suppression sur le premier appareil, synchronisation, suppression sur le second. Les deux états finaux sont identiques ; seul un état antérieur conservé ailleurs permettrait un retour.',
      'Première méthode : 500 / 1 000 = 0,5 kW, puis 0,5 × 4 = 2 kWh. Deuxième vérification : 500 × 4 = 2 000 Wh, soit aussi 2 kWh.'
    ]
  }
};

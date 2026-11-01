import { lesson, answer as a, python as p, tableActivity as table } from './authoring.js';
export default {
  id: 'donnees',
  title: 'Les données structurées',
  lessons: [
    lesson({
      id: 'snt-descrire-donnees',
      title: 'Décrire une collection et lire un fichier CSV',
      duration: 40,
      prerequisites: ['Chaînes et nombres en Python.'],
      objectives: [
        'Distinguer objet, descripteur et valeur.',
        'Choisir un format et documenter une donnée ouverte ou personnelle.'
      ],
      official: ['personnelle', 'formats', 'descripteurs', 'valeurs', 'open-data'],
      sections: [
        [
          'Donner une structure',
          'Dans une collection de stations météo, chaque station est un objet. nom, altitude et commune sont des descripteurs ; "Nord" et 120 sont des valeurs. Une ligne représente un objet et une colonne un descripteur. Le numéro de station peut être un identifiant textuel plutôt qu’un nombre à additionner : un code "0012" perdrait ses zéros avec une conversion intempestive. Une unité et un type rendent les valeurs interprétables ; une altitude sans unité ne suffit pas.'
        ],
        [
          'Conserver et échanger',
          'CSV représente une table dans un fichier texte, avec une ligne d’en-têtes et des valeurs séparées. Le séparateur peut être une virgule ou un point-virgule ; des guillemets protègent des valeurs contenant ce séparateur. JSON peut décrire des listes et des objets imbriqués ; une image JPEG ne s’analyse pas comme un CSV. Lire un fichier ne convertit pas automatiquement tous ses nombres : avec csv.DictReader, les valeurs restent des chaînes tant qu’on ne les transforme pas.'
        ],
        [
          'Ouverture et protection',
          'Une donnée personnelle concerne un individu déjà identifié ou que l’on peut reconnaître, y compris indirectement : un trajet précis peut l’être même sans nom. Voir la définition de la [CNIL](https://www.cnil.fr/fr/definition/donnee-personnelle). Une donnée ouverte peut être réutilisée sous les conditions annoncées par sa licence ; « disponible » ne signifie pas toujours « ouverte ». Pour sélectionner un jeu sur [data.gouv.fr](https://www.data.gouv.fr/), on examine producteur, licence, dates, unités et documentation avant de télécharger la ressource CSV. Les exercices ci-dessous utilisent des données fictives intégrées et ne prétendent pas reproduire un jeu du portail.'
        ]
      ],
      examples: [
        [
          'Une cellule de table',
          'La ligne de station S1 donne altitude_m = 120.',
          'S1 identifie un objet, altitude_m est un descripteur, 120 sa valeur pour cet objet.',
          'Le nombre 120 n’est pas un nom de colonne ; le suffixe _m indique les mètres.'
        ],
        [
          'Un code avec des zéros',
          'Le fichier contient code = "0012".',
          'Convertir ce code en entier donnerait 12, ce qui change sa représentation.',
          'On conserve une chaîne pour cet identifiant ; tous les chiffres ne sont pas des quantités.'
        ],
        [
          'Une identification indirecte',
          'Un fichier sans nom contient les lieux et horaires détaillés des déplacements d’un élève.',
          'La combinaison des habitudes peut permettre de reconnaître une personne.',
          'Retirer le nom ne suffit pas nécessairement à anonymiser une collection.'
        ]
      ],
      activity: table(
        'Repère objets, descripteurs et unités, puis propose un type pour chaque colonne.',
        'Prévois si le code de station doit servir à une addition.',
        'Cette collection fictive sert de modèle de données ; aucune mesure réelle n’a été collectée.',
        ['code', 'nom', 'altitude_m'],
        [
          ['0012', 'Nord', 120],
          ['0027', 'Sud', 85],
          ['0031', 'Est', 200]
        ]
      ),
      exercises: [
        a(
          'Dans la colonne altitude_m contenant 120, quel est le descripteur ?',
          'altitude_m',
          [
            'Le descripteur est le nom de la propriété.',
            '120 est une valeur.',
            'Lis l’en-tête de la colonne.'
          ],
          'altitude_m nomme la propriété commune aux stations.',
          'Une valeur décrit un objet particulier ; un descripteur nomme la propriété.'
        ),
        p(
          'Écris codes(texte) qui lit un CSV à séparateur ; avec en-têtes code;nom et renvoie la liste des codes, sans perdre les zéros initiaux. Utilise csv et io, disponibles en Python standard.',
          'codes',
          'import csv\nimport io\n\ndef codes(texte):\n    pass',
          'import csv\nimport io\n\ndef codes(texte):\n    lignes = csv.DictReader(io.StringIO(texte), delimiter=";")\n    return [ligne["code"] for ligne in lignes]',
          [
            [['code;nom\n0012;Nord\n0027;Sud\n'], ['0012', '0027']],
            [['code;nom\n'], []],
            [['code;nom\n0001;"Nord; annexe"\n'], ['0001']]
          ],
          [
            'Passe le texte à io.StringIO.',
            'Indique delimiter=";" dans DictReader.',
            'Récupère ligne["code"] sans conversion en entier.'
          ],
          'DictReader respecte les guillemets du CSV et conserve les codes sous forme de chaînes.',
          'Un simple split sur ; coupe les valeurs entre guillemets ; utilise le lecteur CSV.'
        ),
        a(
          'Un trajet horodaté permet de reconnaître une personne sans donner son nom. Peut-il constituer une donnée personnelle ? Réponds oui ou non.',
          'oui',
          [
            'L’identification peut être indirecte.',
            'Des lieux et habitudes peuvent reconnaître un individu.',
            'L’absence de nom ne suffit pas.'
          ],
          'Un identifiant indirect ou une combinaison de données peut permettre de reconnaître une personne.',
          'Ne limite pas les données personnelles aux seuls noms et prénoms.'
        )
      ],
      reflection:
        'Autoévaluation pratique : sélectionne sur data.gouv.fr un jeu sans donnée sensible, note producteur, licence et date, puis récupère un CSV et repère ses en-têtes. Compare cette vraie manipulation au modèle fictif du cours ; si elle n’est pas réalisée, garde-la comme travail restant.',
      review: [
        'Je distingue descripteur et valeur.',
        'Je préserve les identifiants textuels.',
        'Je documente la provenance et la licence.'
      ]
    }),
    lesson({
      id: 'snt-traiter-tables',
      title: 'Filtrer, trier et croiser des tables',
      duration: 45,
      prerequisites: ['Collections, boucles et conditions Python.'],
      objectives: [
        'Appliquer un filtre avant un calcul.',
        'Croiser deux tables au moyen d’un identifiant commun.'
      ],
      official: ['traitements'],
      sections: [
        [
          'Des opérations différentes',
          'Une recherche retrouve une valeur ou un objet précis. Un filtre conserve les lignes qui satisfont une condition ; un tri change l’ordre des lignes sans en supprimer. Une somme ou une moyenne transforme plusieurs valeurs en un indicateur. Pour calculer le total des prêts de livres d’une commune, on filtre d’abord sur cette commune puis on additionne les valeurs numériques. Faire la moyenne des codes de commune n’aurait aucun sens même si le logiciel accepte le calcul.'
        ],
        [
          'Trier selon le bon type',
          'Les chaînes "10" et "2" peuvent être ordonnées différemment des nombres 10 et 2 : le tri textuel examine des caractères. On convertit donc les quantités avant de comparer. Les cellules manquantes exigent une décision explicite : les exclure, les documenter ou utiliser une règle justifiée. Remplacer une absence par zéro peut fausser une moyenne. Dans cette leçon, les données fournies sont complètes ; l’absence d’erreur à l’exécution ne démontre pas que les données sources sont justes.'
        ],
        [
          'Relier sans recopier',
          'Une table livres contient id et titre ; une table prêts contient livre_id et nombre. Le descripteur commun permet d’associer un prêt au bon titre. Séparer les tables évite de recopier le titre dans chaque prêt et réduit les modifications incohérentes. Le croisement suppose des identifiants stables ; deux titres identiques ne suffisent pas à reconnaître un même livre. Un identifiant absent ou dupliqué doit être détecté et traité au lieu de produire silencieusement un résultat trompeur.'
        ]
      ],
      examples: [
        [
          'Filtrer puis sommer',
          'Prêts fictifs : Nord 4, Sud 7, Nord 3.',
          'Le filtre Nord conserve deux lignes ; on additionne ensuite 4 et 3.',
          'Le total Nord vaut 7 ; le total général serait 14.'
        ],
        [
          'Un tri surprenant',
          'Les valeurs CSV sont les chaînes "10", "2", "30".',
          'Le tri textuel compare d’abord le premier caractère ; le tri numérique compare des quantités.',
          'L’ordre numérique est 2, 10, 30 ; convertir les codes d’identification resterait injustifié.'
        ],
        [
          'Une jointure',
          'Livres : L1 → Océan, L2 → Vent ; prêts : L2 → 5.',
          'On fait correspondre L2 à L2, pas la position des lignes dans chaque table.',
          'Le prêt concerne Vent ; aligner visuellement les lignes n’est pas une jointure fiable.'
        ]
      ],
      activity: table(
        'Filtre les lignes Nord, calcule leur total puis classe-les par prêts décroissants.',
        'Prévois si trier avant le filtre change le total obtenu.',
        'Ce tableau est un jeu fictif complet ; les données réelles demandent aussi des contrôles d’unités, de doublons et de valeurs manquantes.',
        ['bibliothèque', 'commune', 'prêts'],
        [
          ['A', 'Nord', 4],
          ['B', 'Sud', 7],
          ['C', 'Nord', 3]
        ]
      ),
      exercises: [
        a(
          'Avec Nord 4, Sud 7, Nord 3, quel est le total des prêts de Nord ?',
          '7',
          ['Écarte la ligne Sud.', 'Garde 4 et 3.', 'Additionne les deux valeurs restantes.'],
          'Le filtre garde deux lignes ; leur somme vaut 7.',
          'Si tu obtiens 14, tu as calculé avant de sélectionner la commune demandée.'
        ),
        p(
          'Écris selection(lignes, seuil). Chaque ligne est [nom, prets]. Renvoyer les noms dont prets >= seuil, triés alphabétiquement. Les noms sont uniques.',
          'selection',
          'def selection(lignes, seuil):\n    pass',
          'def selection(lignes, seuil):\n    noms = []\n    for nom, prets in lignes:\n        if prets >= seuil:\n            noms.append(nom)\n    return sorted(noms)',
          [
            [
              [
                [
                  ['B', 7],
                  ['A', 4],
                  ['C', 3]
                ],
                4
              ],
              ['A', 'B']
            ],
            [[[], 4], []],
            [[[['A', 0]], 0], ['A']]
          ],
          [
            'Parcours les couples nom, prets.',
            'Conserve les noms satisfaisant >= seuil.',
            'Trie la liste des noms avant de la renvoyer.'
          ],
          'Le filtre sélectionne et le tri ordonne ; la valeur égale au seuil reste admise.',
          'Ne trie pas les nombres de prêts si le résultat demandé est une liste de noms.'
        ),
        p(
          'Écris titres_empruntes(titres, prets) : titres est un dictionnaire id → titre ; prets est une liste d’identifiants tous présents. Renvoyer les titres dans l’ordre des prêts, doublons conservés.',
          'titres_empruntes',
          'def titres_empruntes(titres, prets):\n    pass',
          'def titres_empruntes(titres, prets):\n    return [titres[identifiant] for identifiant in prets]',
          [
            [
              [{ L1: 'Océan', L2: 'Vent' }, ['L2', 'L1', 'L2']],
              ['Vent', 'Océan', 'Vent']
            ],
            [[{ L1: 'Océan' }, []], []],
            [[{ X: 'Sable' }, ['X']], ['Sable']]
          ],
          [
            'Parcours les prêts et non les titres.',
            'Utilise chaque identifiant comme clé du dictionnaire.',
            'Ne trie pas et ne supprime pas les doublons.'
          ],
          'Le croisement utilise l’identifiant commun ; la sortie conserve l’ordre et la multiplicité des prêts.',
          'L’ordre d’un dictionnaire n’aligne pas les tables : cherche chaque clé demandée.'
        )
      ],
      reflection:
        'Autoévaluation : explique le problème créé si un identifiant de prêt manque dans la table des livres. Propose un contrôle de qualité avant de calculer les résultats, sans inventer de titre.',
      review: [
        'Je distingue filtre et tri.',
        'Je choisis le type adapté au calcul.',
        'Je croise les lignes par identifiant.'
      ]
    }),
    lesson({
      id: 'snt-cloud',
      title: 'Métadonnées, synchronisation et énergie du nuage',
      duration: 40,
      prerequisites: ['Formats et fichiers.'],
      objectives: [
        'Inspecter des métadonnées et régler un partage.',
        'Distinguer synchronisation, sauvegarde et consommation électrique.'
      ],
      official: ['metadonnees', 'cloud', 'synchronisation', 'energie'],
      sections: [
        [
          'Le fichier et sa description',
          'Les métadonnées décrivent un fichier : taille, date, auteur ou coordonnées selon son format. Certaines viennent du système de fichiers, d’autres sont intégrées au document ; copier le fichier peut changer certaines dates sans modifier son texte. Pour retrouver ces informations sur un fichier personnel non sensible, on examine les propriétés du système et l’outil adapté au format. Un auteur déclaré n’est pas une preuve d’authenticité : les métadonnées peuvent être modifiées ou retirées.'
        ],
        [
          'Partager et conserver des versions',
          'Un stockage dans le nuage enregistre des données sur des serveurs distants accessibles par réseau. Un partage peut donner lecture ou modification à des personnes nommées ou à toute personne possédant un lien. La synchronisation répercute les changements entre appareils : une suppression peut donc se propager. Une sauvegarde indépendante et versionnée permet de revenir à un état antérieur ; elle ne se confond pas avec une deuxième copie synchronisée. Avant un essai, on utilise un fichier de démonstration et on vérifie les droits depuis une autre session.'
        ],
        [
          'Des machines et de l’énergie',
          'Serveurs, stockage, réseau et refroidissement consomment de l’électricité ; la fabrication demande aussi des ressources. L’AIE estime la consommation mondiale des centres de données à environ 415 TWh pour 2024, soit un ordre de grandeur de centaines de TWh : [rapport Energy and AI](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai). Ce chiffre daté ne mesure pas tout le numérique. Pour un appareil de puissance constante, énergie = puissance × durée ; une estimation de ce type ne suffit pas à attribuer exactement l’impact d’un fichier individuel.'
        ]
      ],
      examples: [
        [
          'Des dates qui diffèrent',
          'Un fichier créé lundi est copié sur une clé mardi.',
          'Le système peut dater la copie tandis que le document conserve d’autres métadonnées internes.',
          'Une seule date ne décrit pas toute l’histoire du contenu.'
        ],
        [
          'Un effacement synchronisé',
          'Un dossier partagé disparaît sur deux ordinateurs après une suppression.',
          'La synchronisation cherche la cohérence des états, elle peut propager une erreur.',
          'Une sauvegarde versionnée séparée peut aider ; deux copies synchronisées ne suffisent pas.'
        ],
        [
          'Une estimation énergétique',
          'Un serveur fictif consomme 500 W pendant 4 heures.',
          '500 W = 0,5 kW ; multiplier par 4 heures donne des kWh.',
          'L’énergie vaut 2 kWh dans ce modèle, sans ajouter un refroidissement non mesuré.'
        ]
      ],
      activity: table(
        'Compare lecture, modification et lien public puis choisis le minimum nécessaire à une relecture.',
        'Prévois si l’accès en lecture empêche toute copie du contenu.',
        'Ce modèle présente des droits de partage ; il ne se connecte à aucun compte cloud et n’effectue aucune sauvegarde.',
        ['option', 'effet'],
        [
          ['lecture nominative', 'consulter'],
          ['modification nominative', 'changer le fichier'],
          ['lien accessible', 'accès selon détenteurs du lien']
        ]
      ),
      exercises: [
        a(
          'Pour demander une relecture sans permettre de modifier le fichier, choisis « lecture » ou « modification ».',
          'lecture',
          [
            'La tâche consiste à consulter.',
            'Le droit de modification est plus large.',
            'Choisis le niveau minimal nécessaire.'
          ],
          'La lecture répond au besoin annoncé ; un commentaire éventuel dépend d’un droit distinct selon le service.',
          'Ne donne pas la modification par habitude : pars de l’action réellement demandée.'
        ),
        p(
          'Écris energie(puissance_w, heures) qui renvoie des kWh pour une puissance constante, sans arrondi.',
          'energie',
          'def energie(puissance_w, heures):\n    pass',
          'def energie(puissance_w, heures):\n    return puissance_w * heures / 1000',
          [
            [[500, 4], 2],
            [[1000, 1], 1],
            [[200, 0], 0]
          ],
          [
            'Multiplie watts par heures.',
            '1000 Wh correspondent à 1 kWh.',
            'Divise le produit par 1000.'
          ],
          'Le produit puissance × durée fournit une énergie ; le facteur 1000 convertit Wh en kWh.',
          'Ne confonds pas puissance et énergie : les watts seuls ne tiennent pas compte de la durée.'
        ),
        a(
          'Deux copies synchronisées répercutent toutes les suppressions. Suffisent-elles à garantir la récupération d’une version supprimée ? Réponds oui ou non.',
          'non',
          [
            'Une erreur peut être propagée.',
            'Cherche une version antérieure indépendante.',
            'Synchronisation et sauvegarde répondent à des buts différents.'
          ],
          'Sans historique conservé ou sauvegarde indépendante, les deux copies peuvent perdre la même version.',
          'Le nombre de copies ne suffit pas : examine comment elles évoluent et combien de versions subsistent.'
        )
      ],
      reflection:
        'Autoévaluation pratique : sur un fichier d’essai, inspecte les propriétés, utilise un stockage cloud disponible, règle un partage en lecture puis désactive-le. Observe les options de synchronisation et localise une sauvegarde indépendante. Ne considère pas le tableau comme la réalisation de ces manipulations.',
      review: [
        'Je repère les métadonnées d’un fichier.',
        'Je distingue synchroniser et sauvegarder.',
        'Je calcule une énergie avec ses unités.'
      ]
    })
  ]
};

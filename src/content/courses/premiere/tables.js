import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer as q,
  python as p,
  test as t,
  source
} from './authoring.js';
const tri = (changes) =>
  source(
    '5.2 Trier des données — filtres et clés de tri',
    'T5_Traitement_de_donnees/5.2_Trier_des_donnees/cours.md',
    changes
  );
export default {
  id: 'tables',
  title: 'Exploiter des tables',
  lessons: [
    lesson({
      id: 'premiere-csv',
      title: 'Importer une table CSV et typer les données',
      duration: 40,
      prerequisites: ['Listes de dictionnaires et encodage UTF-8.'],
      objectives: [
        'Lire des descripteurs et des lignes.',
        'Convertir et vérifier les domaines de valeurs.'
      ],
      official: ['P-T1'],
      sections: [
        s(
          'Un schéma commun',
          'Une table contient des enregistrements partageant les mêmes descripteurs : par exemple nom,club,score. CSV est un format de texte, sans formules ni mise en forme de tableur. Le séparateur peut être une virgule, un point-virgule ou une tabulation ; il doit être connu.'
        ),
        s(
          'Confier les séparateurs au module csv',
          'Le module csv traite aussi les séparateurs à l’intérieur de champs entre guillemets. Découper simplement chaque ligne par split peut casser ces champs. DictReader utilise la première ligne comme noms de colonnes.',
          'import csv\nwith open("scores.csv", encoding="utf-8", newline="") as fichier:\n    lignes = list(csv.DictReader(fichier, delimiter=";"))'
        ),
        s(
          'Des chaînes à valider',
          'Un score lu depuis CSV est d’abord une chaîne. int(ligne["score"]) le convertit, mais une case vide échoue. Le domaine impose aussi des valeurs acceptables : un score entier entre 0 et 20, un identifiant non vide. Convertir et valider sont deux étapes différentes.'
        )
      ],
      examples: [
        e(
          'Une ligne simple',
          'nom;score puis Ada;12',
          'Les deux descripteurs deviennent des clés ; les champs restent du texte.',
          '{"nom":"Ada","score":"12"}'
        ),
        e(
          'Un champ protégé',
          '"Club;Nord";15',
          'Le point-virgule dans les guillemets appartient au nom, pas à la structure.',
          'Deux champs : Club;Nord et 15.'
        ),
        e(
          'Une valeur absente',
          'int("")',
          'Une chaîne vide ne décrit pas un entier. Il faut signaler ou traiter l’absence selon le contrat.',
          'ValueError, à distinguer d’un score nul.'
        )
      ],
      activity: a(
        'table',
        'Indique le type et le domaine attendu de chaque colonne.',
        'La colonne score doit être convertie après import.',
        'La table affichée ne lit pas réellement un fichier ; l’exercice Python réalise l’import.',
        {
          columns: ['nom', 'club', 'score'],
          rows: [
            ['Ada', 'Nord', '12'],
            ['Lin', 'Sud', '0'],
            ['Sam', 'Nord', '18']
          ]
        }
      ),
      exercises: [
        q(
          'p-t1',
          'Un type après import',
          'Avant conversion, quel est le type Python du champ score égal à "12" lu par DictReader ? Réponds str ou int.',
          'str',
          [
            'Le fichier est un texte.',
            'DictReader découpe les champs sans deviner leurs types numériques.',
            'Une valeur entourée de guillemets est une chaîne.'
          ],
          'DictReader retourne des chaînes ; le programme choisit ensuite les conversions.',
          'L’apparence numérique ne suffit pas pour obtenir le type int.'
        ),
        p(
          'p-t2',
          'Lire un CSV en mémoire',
          'Écris importer(texte) qui lit un CSV séparé par des points-virgules avec colonnes nom;score et renvoie une liste de dictionnaires en convertissant score en entier.',
          'importer',
          'texte',
          'import csv\nimport io\n\ndef importer(texte):\n    lecteur = csv.DictReader(io.StringIO(texte), delimiter=";")\n    return [{"nom":ligne["nom"], "score":int(ligne["score"])} for ligne in lecteur]',
          [
            t(
              ['nom;score\nAda;12\nLin;0'],
              [
                { nom: 'Ada', score: 12 },
                { nom: 'Lin', score: 0 }
              ]
            ),
            t(['nom;score\n'], [])
          ],
          [
            'StringIO transforme une chaîne en flux lisible par csv.',
            'Utilise DictReader avec delimiter=";".',
            'Reconstruis chaque ligne avec int(ligne["score"]).'
          ],
          'L’en-tête devient un schéma ; le cas sans ligne produit une liste vide.',
          'Ne traite pas l’en-tête comme un participant et n’oublie pas la conversion du score.'
        ),
        p(
          'p-t3',
          'Vérifier le domaine',
          'Écris valides(table) qui renvoie True si tous les noms sont non vides et tous les scores entiers sont entre 0 et 20 inclus.',
          'valides',
          'table',
          'def valides(table):\n    for ligne in table:\n        if ligne["nom"] == "" or not 0 <= ligne["score"] <= 20:\n            return False\n    return True',
          [
            t([[{ nom: 'Ada', score: 20 }]], true),
            t([[{ nom: '', score: 12 }]], false),
            t([[{ nom: 'Lin', score: 21 }]], false),
            t([[]], true)
          ],
          [
            'Une seule ligne invalide suffit à rejeter la table.',
            'Teste le nom vide et les deux bornes du score.',
            'Retourne True après le parcours complet.'
          ],
          'Le domaine ne se réduit pas au type : 21 est entier mais hors de l’intervalle choisi.',
          'Un return True à l’intérieur de la boucle peut ignorer les autres lignes.'
        )
      ],
      reflection:
        'Pourquoi zéro et valeur manquante doivent-ils être distingués dans une table de mesures ?',
      review: [
        'Je reconnais en-tête et séparateur.',
        'J’importe sans découper naïvement les guillemets.',
        'Je convertis puis valide les domaines.'
      ]
    }),
    lesson({
      id: 'premiere-selection-tri',
      title: 'Sélectionner, contrôler et trier une table',
      duration: 40,
      prerequisites: ['Tables et expressions booléennes.'],
      objectives: [
        'Combiner des critères de sélection.',
        'Repérer doublons et incohérences.',
        'Trier selon une clé numérique.'
      ],
      official: ['P-T2', 'P-T3'],
      sections: [
        s(
          'Une condition sur chaque ligne',
          'Sélectionner consiste à garder les lignes qui rendent une expression vraie. Pour un club et un seuil : ligne["club"] == club and ligne["score"] >= seuil. Les parenthèses aident à vérifier les combinaisons de and, or et not.'
        ),
        s(
          'Contrôler avant d’interpréter',
          'Deux identifiants identiques peuvent révéler un doublon ; deux noms identiques ne prouvent pas qu’il s’agit de la même personne. Un contrôle de cohérence compare aussi des champs : une date de fin ne doit pas précéder la date de début. Il faut annoncer la clé et les règles utilisées.'
        ),
        s(
          'Trier sans changer les fiches',
          'sorted(table,key=...) produit une nouvelle liste ordonnée. Une clé numérique doit être un nombre : les chaînes "10" et "2" se classent dans l’ordre inverse des nombres 10 et 2. Pour une égalité, un second critère peut rendre l’ordre explicite.',
          'def cle(ligne):\n    return int(ligne["score"])\nclassement = sorted(table, key=cle, reverse=True)'
        )
      ],
      examples: [
        e(
          'Deux conditions',
          'Nord,12 ; Sud,18 ; Nord,8 ; seuil=10',
          'Le club et le seuil doivent être satisfaits ensemble.',
          'Seule la fiche Nord,12 est retenue.'
        ),
        e(
          'Un doublon',
          'Identifiants 4,8,4',
          'L’identifiant 4 a déjà été rencontré quand il réapparaît.',
          'Deux lignes partagent la clé 4.'
        ),
        e(
          'Un tri trompeur',
          'Scores "2", "10"',
          'Les chaînes se comparent caractère par caractère ; 1 précède 2.',
          'Tri textuel : 10,2 ; tri numérique : 2,10.'
        )
      ],
      activity: a(
        'table',
        'Sélectionne le club Nord puis classe ses scores.',
        'Les deux fiches Nord donnent 8 puis 12 en ordre croissant.',
        'Le modèle n’infère ni types ni validité des données.',
        {
          columns: ['id', 'club', 'score'],
          rows: [
            [1, 'Nord', 12],
            [2, 'Sud', 18],
            [3, 'Nord', 8]
          ]
        }
      ),
      exercises: [
        q(
          'p-t4',
          'Compter une sélection',
          'Scores [8,12,15,10] : combien vérifient score>=10 and score<15 ?',
          2,
          [
            'Les bornes ne sont pas toutes deux incluses.',
            '12 et 10 conviennent.',
            '15 échoue à la condition stricte score<15.'
          ],
          'Les valeurs 12 et 10 satisfont les deux conditions.',
          'Lis précisément < et <= : 15 ne doit pas être retenu.'
        ),
        p(
          'p-t5',
          'Filtrer un club',
          'Écris selection(table,club,seuil) qui garde dans l’ordre les fiches du club ayant un score au moins égal au seuil.',
          'selection',
          'table, club, seuil',
          'def selection(table, club, seuil):\n    return [ligne for ligne in table if ligne["club"] == club and ligne["score"] >= seuil]',
          [
            t(
              [
                [
                  { club: 'Nord', score: 12 },
                  { club: 'Sud', score: 18 },
                  { club: 'Nord', score: 8 }
                ],
                'Nord',
                10
              ],
              [{ club: 'Nord', score: 12 }]
            ),
            t([[], 'Nord', 0], [])
          ],
          [
            'Le filtre porte sur chaque dictionnaire.',
            'Compare le champ club puis le champ score.',
            'Les deux conditions doivent être reliées par and.'
          ],
          'Une compréhension conserve les fiches et leur ordre initial.',
          'or accepterait des lignes du mauvais club ou sous le seuil.',
          tri(
            'Adaptation du filtre joueursEquipe : table fournie en argument, contexte de scores, second critère numérique, tests et aides ajoutés.'
          )
        ),
        p(
          'p-t6',
          'Trier des valeurs CSV',
          'Écris classer(table) qui renvoie les fiches par score numérique croissant ; les scores sont encore des chaînes.',
          'classer',
          'table',
          'def classer(table):\n    return sorted(table, key=lambda ligne: int(ligne["score"]))',
          [
            t(
              [
                [
                  { nom: 'A', score: '2' },
                  { nom: 'B', score: '10' },
                  { nom: 'C', score: '1' }
                ]
              ],
              [
                { nom: 'C', score: '1' },
                { nom: 'A', score: '2' },
                { nom: 'B', score: '10' }
              ]
            ),
            t([[]], [])
          ],
          [
            'sorted a besoin du paramètre key pour des dictionnaires.',
            'La clé doit lire le champ score.',
            'Convertis seulement la clé avec int, sans changer la fiche.'
          ],
          'Le tri utilise les nombres pour comparer mais conserve les dictionnaires originaux.',
          'Une clé laissée sous forme de chaîne classe 10 avant 2.',
          tri(
            'Adaptation du tri numérique des tailles de joueurs : nouvelles fiches synthétiques et champ score, conservation des chaînes dans le résultat, contre-exemple 2/10 et tests ajoutés.'
          )
        )
      ],
      reflection: 'Quelle clé choisir pour signaler un doublon sans confondre deux homonymes ?',
      review: [
        'Je combine correctement les critères.',
        'Je définis mes règles de cohérence.',
        'Je choisis une clé de tri du bon type.'
      ]
    }),
    lesson({
      id: 'premiere-fusion',
      title: 'Fusionner des tables sur une clé',
      duration: 35,
      prerequisites: ['Listes de dictionnaires et parcours imbriqués.'],
      objectives: [
        'Relier deux tables par une clé commune.',
        'Anticiper absences et clés multiples.'
      ],
      official: ['P-T4', 'P-T2'],
      sections: [
        s(
          'Ne pas aligner seulement les lignes',
          'Une table élèves contient id,nom et une table résultats contient eleve,score. La fusion doit comparer id et eleve, car les ordres peuvent différer. Le domaine de ces deux champs doit être le même : les entiers 7 et les chaînes "7" ne sont pas égaux.'
        ),
        s(
          'Construire les lignes compatibles',
          'Une fusion interne produit une nouvelle fiche pour chaque paire dont les clés sont égales. On parcourt les deux tables, on teste la clé, puis on construit un dictionnaire avec les champs voulus. Les fiches d’origine restent intactes.',
          'fusion = []\nfor eleve in eleves:\n    for resultat in resultats:\n        if eleve["id"] == resultat["eleve"]:\n            fusion.append({"nom":eleve["nom"],"score":resultat["score"]})'
        ),
        s(
          'Prévoir la cardinalité',
          'Un élève sans résultat disparaît d’une fusion interne. Deux résultats pour le même élève créent deux lignes. Une clé unique dans la première table n’est donc pas nécessairement unique dans la seconde. Le schéma final évite aussi les collisions entre deux champs nommés nom.'
        )
      ],
      examples: [
        e(
          'Ordres différents',
          'Élèves 1:Ada,2:Lin ; résultats 2:15,1:12',
          'Les clés relient 1 à 1 et 2 à 2, indépendamment des positions.',
          'Ada:12 ; Lin:15'
        ),
        e(
          'Plusieurs résultats',
          'Élève 1:Ada ; résultats 1:12,1:16',
          'Les deux paires satisfont la condition.',
          'Deux lignes pour Ada.'
        ),
        e(
          'Une clé incompatible',
          'id=7 et eleve="7"',
          'Un entier et une chaîne sont des types différents. Une conversion validée doit précéder la fusion.',
          'Aucune correspondance directe.'
        )
      ],
      activity: a(
        'table',
        'Repère la clé commune avant de prévoir le résultat de fusion.',
        'L’ordre des fiches ne suffit pas pour relier les données.',
        'Le modèle expose les données ; l’exercice réalise la fusion et explicite le cas sans correspondance.',
        {
          columns: ['élève id', 'nom', 'résultat eleve', 'score'],
          rows: [
            [1, 'Ada', 2, 15],
            [2, 'Lin', 1, 12]
          ]
        }
      ),
      exercises: [
        q(
          'p-fu1',
          'Prévoir le nombre de lignes',
          'Une fusion interne relie 1 élève de clé 4 à 3 résultats de clé 4. Combien de lignes produit-elle ?',
          3,
          [
            'Chaque résultat peut former une paire avec l’élève.',
            'La clé est la même pour les trois résultats.',
            'Compte les paires compatibles.'
          ],
          'Les trois paires donnent chacune une ligne.',
          'Une fusion ne supprime pas les résultats répétés à moins de le programmer.'
        ),
        p(
          'p-fu2',
          'Relier des fiches',
          'Écris fusionner(eleves,resultats) qui renvoie les dictionnaires {nom,score} correspondant aux clés id et eleve, dans l’ordre élèves puis résultats.',
          'fusionner',
          'eleves, resultats',
          'def fusionner(eleves, resultats):\n    table = []\n    for eleve in eleves:\n        for resultat in resultats:\n            if eleve["id"] == resultat["eleve"]:\n                table.append({"nom":eleve["nom"], "score":resultat["score"]})\n    return table',
          [
            t(
              [
                [
                  { id: 1, nom: 'Ada' },
                  { id: 2, nom: 'Lin' }
                ],
                [
                  { eleve: 2, score: 15 },
                  { eleve: 1, score: 12 }
                ]
              ],
              [
                { nom: 'Ada', score: 12 },
                { nom: 'Lin', score: 15 }
              ]
            ),
            t([[{ id: 1, nom: 'Ada' }], []], [])
          ],
          [
            'Utilise deux boucles pour former toutes les paires.',
            'Compare les deux champs qui jouent le rôle de clé.',
            'Construis une nouvelle fiche uniquement quand les clés sont égales.'
          ],
          'La comparaison des clés remplace toute hypothèse sur l’ordre des tables.',
          'Un zip des tables échoue dès que les ordres diffèrent.'
        ),
        p(
          'p-fu3',
          'Détecter la non-unicité',
          'Écris doublons(table) qui renvoie dans l’ordre de découverte les id qui réapparaissent, chaque id une seule fois.',
          'doublons',
          'table',
          'def doublons(table):\n    vus = []\n    repetes = []\n    for ligne in table:\n        identifiant = ligne["id"]\n        if identifiant in vus and identifiant not in repetes:\n            repetes.append(identifiant)\n        vus.append(identifiant)\n    return repetes',
          [
            t([[{ id: 2 }, { id: 1 }, { id: 2 }, { id: 2 }, { id: 1 }]], [2, 1]),
            t([[{ id: 3 }]], [])
          ],
          [
            'Garde la trace des identifiants déjà rencontrés.',
            'Une deuxième liste empêche de signaler trois fois le même doublon.',
            'Ajoute à repetes si id est dans vus mais pas dans repetes.'
          ],
          'La vérification distingue les occurrences multiples du nombre d’identifiants concernés.',
          'Ne compare pas seulement les lignes voisines : un doublon peut être éloigné.'
        )
      ],
      reflection:
        'Quels contrôles appliquer avant d’utiliser une fusion pour produire un bulletin ?',
      review: [
        'Je fusionne selon une clé.',
        'Je vérifie le domaine des clés.',
        'Je prévois absences et multiplicités.'
      ]
    })
  ]
};

import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer,
  sql,
  source
} from './helpers.js';

const setup = `PRAGMA foreign_keys=ON;
CREATE TABLE auteur(id INTEGER PRIMARY KEY, nom TEXT NOT NULL);
CREATE TABLE livre(id INTEGER PRIMARY KEY, titre TEXT NOT NULL, annee INTEGER CHECK(annee>=0), auteur_id INTEGER REFERENCES auteur(id));
CREATE TABLE emprunt(id INTEGER PRIMARY KEY, livre_id INTEGER REFERENCES livre(id), lecteur TEXT NOT NULL);
INSERT INTO auteur VALUES(1,'Ada'),(2,'Lin'),(3,'Sam');
INSERT INTO livre VALUES(10,'Algorithmes',2020,1),(11,'Reseaux',2018,2),(12,'Graphes',2023,1),(13,'SQL',2023,2);
INSERT INTO emprunt VALUES(1,10,'Mina'),(2,12,'Noe'),(3,10,'Noe');`;
const notes = `CREATE TABLE note(id INTEGER PRIMARY KEY, nom TEXT NOT NULL, nsi INTEGER CHECK(nsi BETWEEN 0 AND 20));
INSERT INTO note VALUES(1,'Mina',17),(2,'Noe',10),(3,'Lea',18);`;
const noteSource = (title, changes) =>
  source('T4_Bases_de_donnees/4.2_Langage_SQL', title, changes);

export default {
  id: 'bases',
  title: 'Bases de données',
  lessons: [
    lesson(
      'modele-relationnel',
      'Schéma, intégrité, anomalies et SGBD',
      ['T-B1', 'T-B2', 'T-B3', 'T-B4'],
      ['Tables, lignes, colonnes et identifiants'],
      [
        'Distinguer schéma relationnel et contenu',
        'Repérer une anomalie et une contrainte d’intégrité',
        'Expliquer persistance, concurrence, efficacité et droits du SGBD'
      ],
      [
        s(
          'Une structure et des lignes',
          'Un schéma relationnel décrit les relations, leurs attributs et leurs domaines. Le contenu est l’ensemble des lignes à un instant donné. Une clé primaire identifie chaque ligne de manière unique et non nulle ; une clé étrangère référence une clé d’une autre relation. Une clé peut être composée de plusieurs attributs, par exemple le couple élève-évaluation.'
        ),
        s(
          'Éviter les anomalies',
          'Répéter le nom et le téléphone d’un auteur sur chaque livre crée des redondances : une modification peut laisser deux téléphones contradictoires, supprimer le dernier livre peut faire perdre l’auteur, et créer un auteur sans livre peut être impossible. On sépare Auteur(id,nom,téléphone) et Livre(id,titre,auteur_id). Les contraintes de domaine, d’unicité et de référence protègent alors des propriétés distinctes.'
        ),
        s(
          'Le SGBD rend plusieurs services',
          'Le SGBD conserve les données après la fin du programme : persistance. Il coordonne les accès concurrents pour limiter les incohérences, choisit des stratégies et des index pour exécuter efficacement les requêtes, et contrôle les accès selon les droits. Un fichier CSV ne fournit pas seul ces services. Les droits ne dispensent pas de limiter les données personnelles collectées.',
          'CREATE TABLE auteur(id INTEGER PRIMARY KEY, nom TEXT NOT NULL);\nCREATE TABLE livre(\n    id INTEGER PRIMARY KEY, titre TEXT NOT NULL,\n    auteur_id INTEGER REFERENCES auteur(id)\n);'
        )
      ],
      [
        e(
          'Schéma inchangé',
          'Ajouter un livre de 2024.',
          'Le nombre de lignes change ; les colonnes et les contraintes restent les mêmes.',
          'Le contenu change, pas le schéma.'
        ),
        e(
          'Clé composée',
          'Une note par couple (élève,évaluation).',
          'Un élève a plusieurs notes et une évaluation concerne plusieurs élèves.',
          '(élève,évaluation) peut identifier une note.'
        ),
        e(
          'Référence invalide',
          'Livre.auteur_id=99 mais aucun auteur 99.',
          'La clé étrangère vise une ligne absente.',
          'Violation de l’intégrité référentielle si la contrainte est activée.'
        )
      ],
      a(
        'table',
        'Repère les informations sur l’auteur répétées dans les lignes de livres.',
        'Quelle information deviendrait contradictoire si un seul téléphone était corrigé ?',
        'Cette table permet de raisonner sur les anomalies ; le moteur SQL des exercices contrôle ensuite les contraintes explicites.',
        {
          columns: ['livre', 'auteur', 'téléphone'],
          rows: [
            ['L1', 'Ada', '0101'],
            ['L2', 'Ada', '0101'],
            ['L3', 'Lin', '0202']
          ]
        }
      ),
      [
        answer(
          '1. Nommer la contrainte',
          'Une ligne de Livre référence un auteur inexistant. Quelle contrainte est violée ? Réponds par le seul mot : référence, domaine ou unicité.',
          'référence',
          [
            'La valeur pourrait être un entier valide.',
            'Le problème est l’absence de ligne cible.',
            'Cela concerne une clé étrangère.'
          ],
          'Une clé étrangère impose que la valeur non nulle existe dans la relation référencée : c’est une contrainte de référence.',
          'Le type de la valeur ne suffit pas. Cherche si la ligne cible de la clé étrangère existe.'
        ),
        answer(
          '2. Prévoir une perte de données',
          'Si les informations d’un auteur figurent uniquement dans ses livres, supprimer son dernier livre fait disparaître l’auteur. Est-ce une anomalie d’insertion, de modification ou de suppression ? Donne le dernier mot.',
          'suppression',
          [
            'Observe l’opération réalisée.',
            'Une donnée indépendante disparaît en même temps que le livre.',
            'Le remède est de séparer Auteur et Livre.'
          ],
          'L’anomalie de suppression vient d’une dépendance artificielle entre l’existence d’un auteur et celle de ses livres.',
          'Rattache l’anomalie à l’opération qui déclenche la perte, puis propose deux relations séparées.'
        ),
        sql(
          '3. Observer structure et contenu',
          'La base locale contient Auteur, Livre et Emprunt. Renvoie le nombre de lignes de Livre dans une colonne total. Le résultat décrit le contenu, pas le nombre d’attributs.',
          setup,
          'SELECT ... FROM livre;',
          'SELECT COUNT(*) AS total FROM livre;',
          [[4]],
          [
            'COUNT compte les lignes.',
            'FROM désigne la relation étudiée.',
            'Donne le nom total au résultat avec AS.'
          ],
          'La relation contient quatre livres ; ses attributs sont décrits séparément par le schéma.',
          'SELECT * montre les lignes mais ne les compte pas. Utilise une agrégation sur la bonne relation.'
        )
      ],
      'Quels services faudrait-il ajouter à un simple fichier partagé pour gérer correctement plusieurs utilisateurs ?'
    ),

    lesson(
      'sql-selection',
      'SQL : projeter, filtrer et trier',
      ['T-B5', 'T-B6'],
      ['Schéma relationnel et conditions booléennes'],
      [
        'Lire SELECT, FROM et WHERE',
        'Combiner filtres et ordre de sortie',
        'Distinguer lignes, valeurs distinctes et agrégats'
      ],
      [
        s(
          'De la demande à la requête',
          'SELECT indique les attributs à afficher ; FROM indique les relations utilisées ; WHERE conserve les lignes dont la condition est vraie. SQL est déclaratif : on exprime le résultat souhaité, le moteur choisit la stratégie. Une projection de colonnes ne supprime pas automatiquement les doublons.',
          'SELECT titre, annee FROM livre WHERE annee >= 2020;'
        ),
        s(
          'Écrire des conditions précises',
          'AND exige deux conditions vraies ; OR en exige au moins une. Les parenthèses rendent explicite leur combinaison. Une borne inclusive utilise >= ou <=. Les textes sont entre apostrophes, contrairement aux noms de colonnes. Une valeur NULL n’est pas une chaîne vide et se teste avec IS NULL.'
        ),
        s(
          'Ordonner et résumer',
          'Sans ORDER BY, l’ordre des lignes n’est pas garanti. On peut ajouter un deuxième critère pour départager les ex aequo. DISTINCT retire les doublons du résultat projeté ; COUNT(*) compte les lignes, MIN et MAX donnent des extrêmes et AVG une moyenne. Ces opérations ne changent pas les données de la base.',
          'SELECT titre, annee FROM livre ORDER BY annee DESC, titre ASC;\nSELECT DISTINCT auteur_id FROM livre;'
        )
      ],
      [
        e(
          'Borne incluse',
          'annee >= 2020 sur 2018,2020,2023.',
          '2020 satisfait l’égalité de la condition.',
          '2020 et 2023 sont conservées.'
        ),
        e(
          'Deux tris',
          '2023 : SQL et Graphes.',
          'Le deuxième critère titre ASC départage les années égales.',
          'Graphes avant SQL.'
        ),
        e(
          'Aucun résultat',
          'WHERE annee > 3000',
          'Aucune ligne ne satisfait le filtre ; ce n’est pas une erreur SQL.',
          'Table de résultat vide.'
        )
      ],
      a(
        'table',
        'Choisis les livres d’au moins 2020 puis trie par année décroissante.',
        'Combien de lignes passent le filtre, en comptant l’année 2020 ?',
        'La manipulation sépare filtrage et tri ; exécute ensuite les mêmes idées dans le moteur SQL local.',
        {
          columns: ['titre', 'année'],
          rows: [
            ['Algorithmes', 2020],
            ['Reseaux', 2018],
            ['Graphes', 2023],
            ['SQL', 2023]
          ]
        }
      ),
      [
        sql(
          '1. Sélectionner les bonnes colonnes',
          'La table note(id,nom,nsi) contient trois élèves. Renvoie nom et nsi pour les notes supérieures ou égales à 17, par nom croissant.',
          notes,
          'SELECT ...\nFROM note\nWHERE ...;',
          'SELECT nom,nsi FROM note WHERE nsi>=17 ORDER BY nom;',
          [
            ['Lea', 18],
            ['Mina', 17]
          ],
          [
            'SELECT nom,nsi donne les deux colonnes.',
            'Le seuil 17 doit être inclus.',
            'ORDER BY nom donne l’ordre demandé.'
          ],
          'Mina obtient 17 et Lea 18. Le filtre est inclusif, puis le tri alphabétique place Lea avant Mina.',
          'Une borne stricte exclut Mina à tort. Vérifie >= puis l’ordre des colonnes.',
          {
            ordered: true,
            source: noteSource(
              'Cours SQL : table de notes, projection et filtre',
              'Base de notes recréée localement, noms et scores changés ; filtre inclusif et ordre exigé ; aucun fichier livres.db tiers réutilisé.'
            )
          }
        ),
        sql(
          '2. Compter les auteurs distincts',
          'Dans la base de bibliothèque, renvoie le nombre d’auteurs différents ayant au moins un livre, colonne total.',
          setup,
          'SELECT ... FROM livre;',
          'SELECT COUNT(DISTINCT auteur_id) AS total FROM livre;',
          [[2]],
          [
            'Un auteur peut avoir plusieurs livres.',
            'DISTINCT porte ici sur auteur_id.',
            'COUNT doit compter ces identifiants distincts.'
          ],
          'Les livres citent les auteurs 1,2,1,2 : deux auteurs distincts. L’auteur 3 n’a pas de livre.',
          'Compter les lignes de Auteur ou de Livre répond à une autre question. Pars de Livre et élimine les répétitions.'
        ),
        sql(
          '3. Composer les conditions',
          'Renvoie titre et annee des livres parus entre 2019 et 2023 inclus et écrits par l’auteur 1, par année décroissante puis titre croissant.',
          setup,
          'SELECT titre,annee FROM livre WHERE ...;',
          'SELECT titre,annee FROM livre WHERE annee>=2019 AND annee<=2023 AND auteur_id=1 ORDER BY annee DESC,titre ASC;',
          [
            ['Graphes', 2023],
            ['Algorithmes', 2020]
          ],
          [
            'Il faut satisfaire les deux bornes et l’auteur.',
            'Utilise AND entre les trois conditions.',
            'La direction DESC ne s’applique qu’à annee.'
          ],
          'Les trois filtres conservent les livres 10 et 12 ; le tri met le plus récent en premier.',
          'OR élargit la sélection au lieu de l’intersecter. Teste chaque ligne contre les trois conditions.',
          { ordered: true }
        )
      ],
      'Pourquoi deux requêtes correctes peuvent-elles produire les mêmes lignes dans un ordre différent ?'
    ),

    lesson(
      'sql-jointures',
      'SQL : relier plusieurs relations',
      ['T-B1', 'T-B5', 'T-B6'],
      ['SELECT, clés primaires et étrangères'],
      [
        'Relier les clés dans une jointure',
        'Préfixer les attributs avec des alias',
        'Comprendre répétitions et absence de correspondance'
      ],
      [
        s(
          'Une jointure crée des correspondances',
          'Livre contient un identifiant d’auteur, pas forcément son nom. JOIN Auteur ON Livre.auteur_id=Auteur.id associe chaque livre à la ligne qui décrit son auteur. La condition ON exprime le lien ; WHERE peut ensuite filtrer ces lignes. Omettre la condition crée des associations sans rapport entre toutes les lignes.'
        ),
        s(
          'Nommer sans ambiguïté',
          'Si deux relations possèdent id, le nom seul devient ambigu. Les alias l pour Livre et a pour Auteur rendent la requête courte et claire. On suit les clés annoncées par le schéma, jamais la position des lignes : leur ordre physique ne constitue pas une relation.',
          'SELECT l.titre,a.nom\nFROM livre AS l\nJOIN auteur AS a ON l.auteur_id=a.id;'
        ),
        s(
          'Une ligne peut apparaître plusieurs fois',
          'Un livre peut avoir plusieurs emprunts. Le joindre à Emprunt produit alors une ligne par emprunt, ce qui est correct. DISTINCT est utile si la question demande seulement les noms des lecteurs sans répétition. Une jointure interne JOIN exclut les lignes sans correspondance ; elle ne montre pas les auteurs sans livre.'
        )
      ],
      [
        e(
          'Deux livres, un auteur',
          'Algorithmes et Graphes référencent Ada.',
          'Chaque livre rencontre la même ligne d’Auteur.',
          'Deux lignes de résultat avec le nom Ada.'
        ),
        e(
          'Deux emprunts',
          'Livre 10 emprunté par Mina puis Noe.',
          'Le lien livre_id associe le livre à deux lignes d’Emprunt.',
          'Deux lignes pour Algorithmes.'
        ),
        e(
          'Auteur sans livre',
          'Sam a id=3 mais aucun livre.',
          'Aucune égalité auteur_id=3 ne peut être satisfaite dans Livre.',
          'Sam absent d’une jointure interne.'
        )
      ],
      a(
        'table',
        'Relie chaque auteur_id au bon id d’auteur.',
        'Le nom d’auteur doit-il être recopié dans chaque livre pour être affiché ?',
        'Le tableau résume le résultat d’une jointure, il n’ajoute pas réellement une colonne dans la relation Livre.',
        {
          columns: ['livre.id', 'auteur_id', 'auteur.nom'],
          rows: [
            [10, 1, 'Ada'],
            [11, 2, 'Lin'],
            [12, 1, 'Ada']
          ]
        }
      ),
      [
        sql(
          '1. Afficher le nom de l’auteur',
          'Renvoie titre et nom d’auteur de chaque livre, par id du livre croissant.',
          setup,
          'SELECT l.titre,a.nom FROM livre AS l JOIN auteur AS a ON ...;',
          'SELECT l.titre,a.nom FROM livre AS l JOIN auteur AS a ON l.auteur_id=a.id ORDER BY l.id;',
          [
            ['Algorithmes', 'Ada'],
            ['Reseaux', 'Lin'],
            ['Graphes', 'Ada'],
            ['SQL', 'Lin']
          ],
          [
            'Livre.auteur_id est la clé étrangère.',
            'Auteur.id est la clé référencée.',
            'Trie avec l.id sans forcément l’afficher.'
          ],
          'La jointure suit la clé étrangère et produit une ligne pour chacun des quatre livres.',
          'Relier l.id à a.id compare deux identifiants de natures différentes. Lis le schéma avant de choisir ON.',
          { ordered: true }
        ),
        sql(
          '2. Reconstituer les emprunts',
          'Renvoie lecteur et titre pour les emprunts de Noe, classés par id d’emprunt.',
          setup,
          'SELECT e.lecteur,l.titre FROM emprunt AS e JOIN livre AS l ON ... WHERE ...;',
          "SELECT e.lecteur,l.titre FROM emprunt AS e JOIN livre AS l ON e.livre_id=l.id WHERE e.lecteur='Noe' ORDER BY e.id;",
          [
            ['Noe', 'Graphes'],
            ['Noe', 'Algorithmes']
          ],
          [
            'La relation de départ est Emprunt.',
            'Relie e.livre_id à l.id.',
            'Filtre ensuite le texte lecteur avec des apostrophes.'
          ],
          'Noe apparaît dans les emprunts 2 et 3. La jointure remplace les identifiants des livres par leurs titres.',
          'Le prénom n’est pas un nom de colonne. Vérifie les apostrophes et l’ordre des tables.',
          { ordered: true }
        ),
        sql(
          '3. Traverser deux liens',
          'Renvoie, sans doublon et par ordre alphabétique, les noms d’auteurs dont Noe a emprunté au moins un livre.',
          setup,
          'SELECT DISTINCT a.nom FROM emprunt AS e\nJOIN livre AS l ON ...\nJOIN auteur AS a ON ...\nWHERE ...;',
          "SELECT DISTINCT a.nom FROM emprunt AS e JOIN livre AS l ON e.livre_id=l.id JOIN auteur AS a ON l.auteur_id=a.id WHERE e.lecteur='Noe' ORDER BY a.nom;",
          [['Ada']],
          [
            'Traverse Emprunt→Livre puis Livre→Auteur.',
            'Les deux livres empruntés ont le même auteur.',
            'DISTINCT évite d’afficher deux fois son nom.'
          ],
          'Les deux chemins relationnels conduisent à Ada ; la question porte sur les auteurs distincts, donc une seule ligne est attendue.',
          'Une jointure ne retire pas automatiquement les doublons. Observe d’abord les lignes avant DISTINCT.',
          { ordered: true }
        )
      ],
      'Pourquoi supprimer aveuglément tous les doublons d’une jointure peut-il faire perdre une information utile ?'
    ),

    lesson(
      'sql-modifications',
      'SQL : insérer, mettre à jour, supprimer',
      ['T-B7', 'T-B4'],
      ['Filtres SQL et contraintes d’intégrité'],
      [
        'Insérer une ligne avec ses attributs',
        'Limiter UPDATE et DELETE avec WHERE',
        'Vérifier une modification et anticiper les contraintes'
      ],
      [
        s(
          'Insérer en respectant les contraintes',
          'INSERT INTO relation(colonnes) VALUES(valeurs) crée une ligne. Indiquer les colonnes explicite la correspondance, même si leur ordre physique change. Une clé déjà présente viole l’unicité ; une référence absente viole l’intégrité référentielle. L’échec d’une insertion ne doit pas être confondu avec un résultat de requête vide.',
          "INSERT INTO note(id,nom,nsi) VALUES(4,'Iris',15);"
        ),
        s(
          'Cibler les lignes modifiées',
          'UPDATE remplace des valeurs dans les lignes sélectionnées ; DELETE retire ces lignes entières. Sans WHERE, ces commandes portent sur toutes les lignes de la relation. Avant d’écrire, il est utile de lire avec le même filtre pour contrôler la cible. Une clé primaire est souvent préférable à un nom qui peut se répéter.',
          'UPDATE note SET nsi=12 WHERE id=2;\nDELETE FROM note WHERE id=3;'
        ),
        s(
          'Vérifier après l’écriture',
          'Une modification SQL n’a pas nécessairement de table de résultat. On relit ensuite l’état avec SELECT pour vérifier à la fois la cible modifiée et les lignes préservées. Ici chaque exercice repart d’une base neuve et le moteur contrôle un SELECT de vérification. Une suppression d’auteur encore référencé peut être refusée ; il faut décider d’une politique cohérente au lieu de désactiver les contraintes.'
        )
      ],
      [
        e(
          'Insérer',
          'Nouvelle élève Iris, id=4, nsi=15.',
          'id=4 est libre et 15 appartient au domaine autorisé.',
          'La table passe de trois à quatre lignes.'
        ),
        e(
          'Corriger une seule note',
          'UPDATE note SET nsi=12 WHERE id=2;',
          'La clé primaire désigne un seul élève.',
          'Noe passe à 12 ; les autres notes restent identiques.'
        ),
        e(
          'Oubli dangereux du filtre',
          'DELETE FROM note;',
          'Aucune condition ne limite l’opération.',
          'Les trois lignes sont supprimées, la table existe encore.'
        )
      ],
      a(
        'table',
        'Prévois la table après une correction de l’id 2, puis après la suppression de l’id 3.',
        'Une commande DELETE enlève-t-elle la structure de la table ?',
        'Le tableau sert de prédiction ; les exercices exécutent réellement INSERT, UPDATE et DELETE sur une copie initialisée à chaque essai.',
        {
          columns: ['id', 'nom', 'nsi'],
          rows: [
            [1, 'Mina', 17],
            [2, 'Noe', 10],
            [3, 'Lea', 18]
          ]
        }
      ),
      [
        sql(
          '1. Insérer Iris',
          'Ajoute à note la ligne id=4, nom Iris, nsi=15. Les trois lignes existantes doivent être conservées.',
          notes,
          'INSERT INTO note(...) VALUES(...);',
          "INSERT INTO note(id,nom,nsi) VALUES(4,'Iris',15);",
          [
            [1, 'Mina', 17],
            [2, 'Noe', 10],
            [3, 'Lea', 18],
            [4, 'Iris', 15]
          ],
          [
            'Liste les colonnes id,nom,nsi.',
            'Iris est un texte entre apostrophes.',
            'L’identifiant 4 n’est pas encore utilisé.'
          ],
          'L’insertion ajoute une quatrième ligne. La vérification relit toute la table pour détecter une modification involontaire des anciennes données.',
          'Ne renvoie pas seulement un SELECT de la ligne attendue. Il faut que la ligne soit réellement insérée.',
          { verifyQuery: 'SELECT id,nom,nsi FROM note ORDER BY id;', ordered: true }
        ),
        sql(
          '2. Corriger Noe',
          'Mets la note NSI de l’élève d’id 2 à 12, sans toucher aux autres lignes.',
          notes,
          'UPDATE note SET ... WHERE ...;',
          'UPDATE note SET nsi=12 WHERE id=2;',
          [
            [1, 'Mina', 17],
            [2, 'Noe', 12],
            [3, 'Lea', 18]
          ],
          [
            'SET indique l’attribut à corriger.',
            'WHERE porte sur la clé primaire 2.',
            'La valeur remplace 10 : ce n’est pas une addition.'
          ],
          'La correction vise une ligne précise et préserve les notes de Mina et Lea. Le SELECT de contrôle prouve l’état obtenu.',
          'Un WHERE absent change toutes les notes. Vérifie les lignes conservées dans le tableau final.',
          {
            verifyQuery: 'SELECT id,nom,nsi FROM note ORDER BY id;',
            ordered: true,
            source: noteSource(
              'Cours SQL : exemple 18, modification avec UPDATE',
              'Adaptation de la correction d’une note : noms, matière et données changés, cible par clé primaire ; vérification de la table entière ajoutée.'
            )
          }
        ),
        sql(
          '3. Supprimer les notes strictement basses',
          'Supprime les lignes dont nsi est strictement inférieur à 17. Conserve les élèves ayant exactement 17.',
          notes,
          'DELETE FROM note WHERE ...;',
          'DELETE FROM note WHERE nsi<17;',
          [
            [1, 'Mina', 17],
            [3, 'Lea', 18]
          ],
          [
            'DELETE porte sur des lignes.',
            'Le filtre doit exclure la borne 17.',
            'Une seule ligne satisfait la condition initialement.'
          ],
          'Seul Noe a une note inférieure à 17. DELETE conserve la définition de la table et les lignes non sélectionnées.',
          'Avec <=, Mina disparaît à tort. Teste le cas frontière exactement égal à 17.',
          { verifyQuery: 'SELECT id,nom,nsi FROM note ORDER BY id;', ordered: true }
        )
      ],
      'Comment prouver qu’une modification a atteint sa cible sans altérer les autres données ?'
    )
  ]
};

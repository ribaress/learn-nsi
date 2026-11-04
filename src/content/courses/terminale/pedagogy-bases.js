import { pedagogy, pause } from './pedagogy-utils.js';

export default {
  'modele-relationnel': pedagogy({
    intro: [
      'Une bibliothèque note les livres et leurs auteurs. Si le téléphone d’un auteur est répété sur chaque fiche de livre, il faut corriger plusieurs fiches quand il change.',
      'Comment organiser les informations pour retrouver les correspondances et éviter des versions contradictoires de la même donnée ?',
      'Le modèle relationnel permet d’organiser des informations durables et de définir des règles que le logiciel contrôle lors des modifications.'
    ],
    journey: [
      'Distinguer une table de ses lignes.',
      'Choisir une clé pour identifier chaque ligne.',
      'Relier deux tables sans recopier toutes leurs informations.',
      'Comprendre les services du logiciel de gestion.'
    ],
    recap: [
      [
        'Table, ligne et colonne',
        'Une table range des informations de même nature ; une ligne décrit un cas et une colonne un renseignement.',
        'Dans une table de livres, une ligne décrit un livre et la colonne titre donne son titre.'
      ],
      [
        'Identifiant',
        'Un identifiant est une valeur choisie pour reconnaître un élément sans le confondre avec un autre.',
        'Deux personnes nommées Sam peuvent recevoir les identifiants 3 et 9.'
      ],
      [
        'Type et contrainte',
        'Un type décrit les valeurs permises ; une contrainte impose une règle que chaque modification doit respecter.',
        'Une année doit être un entier ; un identifiant de livre ne doit pas être répété.'
      ]
    ],
    life: [
      [
        'Adresse d’un adhérent',
        'Une association conserve les adhérents et leurs inscriptions à plusieurs ateliers.',
        'Une table Adherent conserve l’adresse une fois ; les inscriptions utilisent son identifiant pour le retrouver.',
        'Séparer les tables ne garantit pas la vérité de l’adresse : une saisie erronée reste possible même si les liens sont valides.'
      ],
      [
        'Livres et auteurs',
        'Un auteur publie trois livres et change son numéro de téléphone.',
        'Le téléphone appartient à la ligne de l’auteur, tandis que chaque livre conserve seulement une référence à cet auteur.',
        'Un livre peut avoir plusieurs auteurs ; notre premier schéma suppose un auteur par livre et doit évoluer pour ce cas.'
      ]
    ],
    sections: [
      [
        'Décrire le rangement avant les données',
        'Une relation est une table dans le modèle étudié. Ses attributs sont les colonnes et leurs domaines précisent les valeurs autorisées. Le schéma décrit ces colonnes et règles ; le contenu désigne les lignes présentes maintenant. Ajouter un livre change le contenu, pas forcément le schéma. Livre(id,titre,auteur_id) se lit : table Livre avec un identifiant, un titre et une référence vers un auteur.'
      ],
      [
        'Identifier une ligne sans ambiguïté',
        'Une clé primaire distingue chaque ligne : sa valeur doit être unique et non absente. Le titre d’un livre peut se répéter ; un identifiant numérique choisi par la bibliothèque convient mieux. Parfois plusieurs colonnes sont nécessaires : pour une note par élève et par évaluation, ni l’élève seul ni l’évaluation seule ne suffit. Leur couple forme une clé composée.',
        pause(
          'Deux élèves peuvent-ils avoir le même prénom si la clé primaire est leur identifiant ?',
          'Oui, les identifiants doivent être différents.',
          'Non, toutes les colonnes doivent être uniques.',
          'L’unicité porte sur la clé déclarée. Un prénom peut se répéter sans ambiguïté lorsque chaque ligne possède un identifiant distinct.'
        )
      ],
      [
        'Relier par une clé étrangère',
        'Une clé étrangère est une colonne, ou un groupe de colonnes, qui référence une clé d’une autre table. Si Livre.auteur_id vaut 2, on cherche la ligne d’Auteur dont id vaut 2. Le point indique ici la table puis la colonne. L’intégrité référentielle interdit une référence vers un auteur inexistant lorsque la contrainte est activée. Une valeur absente, nommée NULL en SQL, demande aussi une règle explicite.'
      ],
      [
        'Éviter trois anomalies',
        'Répéter le téléphone d’un auteur pour chaque livre produit une redondance. À la modification, deux fiches peuvent garder deux numéros différents. À la suppression du dernier livre, le téléphone peut disparaître avec lui. À l’insertion, il peut devenir impossible d’enregistrer un auteur qui n’a pas encore de livre. Séparer Auteur et Livre évite ces trois anomalies dans ce modèle, tout en conservant le lien par identifiant.'
      ],
      [
        'Le SGBD fait appliquer les règles',
        'Un système de gestion de base de données, abrégé SGBD, conserve les tables après la fermeture d’un programme : c’est la persistance. Il contrôle les contraintes et les droits, coordonne les accès simultanés et choisit des stratégies pour les requêtes, c’est-à-dire les demandes de lecture ou d’écriture. SQL est le langage de ces demandes. CREATE TABLE crée une table ; INTEGER décrit un entier, TEXT du texte, PRIMARY KEY la clé et REFERENCES un lien.',
        pause(
          'Une clé étrangère correcte prouve-t-elle que le nom d’auteur saisi est vrai ?',
          'Non, elle contrôle l’existence de la référence.',
          'Oui, toutes les données deviennent exactes.',
          'Le SGBD peut vérifier qu’une ligne cible existe. Il ne peut pas deviner si les informations du monde réel ont été saisies correctement.'
        )
      ]
    ],
    reasoning: [
      'Regarde d’abord les colonnes et règles de la table : elles restent identiques. L’ajout apporte seulement une nouvelle ligne décrivant un livre de 2024. Le nombre de livres augmente, donc le contenu change, mais pas la description du rangement appelée schéma.',
      'Un élève possède plusieurs notes : son identifiant seul se répéterait. Une évaluation concerne plusieurs élèves : son identifiant seul se répéterait aussi. Le couple des deux identifie une note si la règle autorise exactement une note par élève pour cette évaluation.',
      'Le livre porte la référence 99. On cherche donc dans Auteur la clé primaire 99. Aucune ligne ne la possède : il n’existe pas de cible pour cette référence. Si le contrôle des clés étrangères est actif, l’écriture est refusée pour préserver l’intégrité référentielle.'
    ]
  }),
  'sql-selection': pedagogy({
    intro: [
      'Le catalogue d’une médiathèque contient de nombreux livres. Tu veux seulement les titres publiés depuis 2020, classés du plus récent au plus ancien.',
      'Comment transformer une demande ordinaire en une consigne précise qui choisit les bonnes lignes, les bonnes colonnes et le bon ordre ?',
      'Une lecture SQL permet d’extraire une information utile sans modifier le catalogue ni parcourir manuellement chaque fiche.'
    ],
    journey: [
      'Repérer la table et les colonnes.',
      'Écrire le choix des lignes avec une condition.',
      'Combiner des conditions en expliquant leurs bornes.',
      'Trier ou résumer le résultat sans modifier la base.'
    ],
    recap: [
      [
        'Table et colonne',
        'Une table contient des lignes de même nature ; chaque colonne conserve un type de renseignement.',
        'La table livre contient les colonnes titre et annee.'
      ],
      [
        'Condition et comparaison',
        'Une condition pose une question vraie ou fausse ; >= signifie supérieur ou égal et > strictement supérieur.',
        '2020 >= 2020 est vrai ; 2020 > 2020 est faux.'
      ],
      [
        'Texte et nombre',
        'Un texte représente des caractères et s’écrit en SQL entre apostrophes ; un nombre sert aux calculs et comparaisons numériques.',
        "Le titre s’écrit 'Graphes', l’année s’écrit 2023."
      ]
    ],
    life: [
      [
        'Filtre d’un catalogue',
        'Tu demandes les romans de 2020 ou après et affiches seulement leur titre.',
        'WHERE choisit les lignes et SELECT choisit les colonnes visibles ; ce sont deux décisions différentes.',
        'L’interface graphique peut ajouter des filtres cachés ; ici chaque condition utile doit être écrite explicitement.'
      ],
      [
        'Classement de résultats',
        'Un club affiche les scores décroissants et départage les égalités par ordre alphabétique.',
        'ORDER BY peut exprimer un premier critère puis un second pour rendre l’ordre souhaité explicite.',
        'Un classement humain peut imposer d’autres règles de départage ; SQL n’en devine aucune sans indication.'
      ]
    ],
    sections: [
      [
        'Nommer ce qu’on veut lire',
        'SQL est un langage de demandes à une base de données. Une requête SELECT lit un résultat sans modifier les tables. SELECT titre, annee demande les colonnes titre et annee ; la virgule sépare les noms. FROM livre indique la table source. Le point-virgule termine la demande. On décrit le résultat souhaité : le moteur du SGBD choisit comment le produire.'
      ],
      [
        'Choisir les lignes une à une',
        'WHERE ajoute une condition. Dans WHERE annee >= 2020, annee est la colonne examinée et >= signifie « supérieur ou égal ». Pour 2018, la condition est fausse ; pour 2020 elle est vraie grâce à l’égalité ; pour 2023 elle est vraie car l’année est plus grande. Une projection choisit des colonnes ; une sélection filtre des lignes : afficher moins de colonnes ne choisit pas automatiquement moins de livres.',
        pause(
          'Avec annee >= 2020, faut-il garder un livre de 2020 ?',
          'Oui, l’égalité est incluse.',
          'Non, seulement après 2020.',
          'Le signe >= inclut la borne. Le signe > serait strict et exclurait 2020 ; les deux demandes ne sont pas équivalentes.'
        )
      ],
      [
        'Combiner et traiter les absences',
        "AND signifie que les deux conditions doivent être vraies ; OR exige au moins l’une des deux. Les parenthèses regroupent les conditions et rendent la demande lisible. Pour comparer à un titre, on écrit titre = 'Graphes' : = compare en SQL et les apostrophes délimitent le texte. NULL représente une valeur absente ou inconnue ; on la teste avec IS NULL, pas avec une égalité à un texte vide."
      ],
      [
        'Donner un ordre explicite',
        'ORDER BY annee DESC trie les années de la plus grande à la plus petite. ASC désigne l’ordre croissant. Avec ORDER BY annee DESC, titre ASC, on compare d’abord les années ; en cas d’égalité on compare les titres. Sans ORDER BY, SQL ne garantit aucun ordre de restitution. Deux résultats peuvent donc contenir les mêmes lignes dans un ordre différent.',
        pause(
          'Deux livres ont l’année 2023 : Graphes et SQL. Le second critère titre ASC donne quel ordre ?',
          'Graphes puis SQL.',
          'SQL puis Graphes.',
          'Les années sont égales, donc le second critère décide. En ordre alphabétique croissant, Graphes précède SQL ; DESC ne concerne ici que les années.'
        )
      ],
      [
        'Résumer sans confondre lignes et valeurs',
        'DISTINCT retire les répétitions dans les colonnes affichées. Deux livres d’un même auteur donnent deux identifiants d’auteur sans DISTINCT, un seul avec. COUNT(*) compte les lignes ; MIN et MAX trouvent des extrêmes ; SUM additionne ; AVG calcule une moyenne. Si un SELECT simple ne retient aucune ligne, son résultat est vide. En revanche, un agrégat sans GROUP BY, donc sans regroupement par catégories, renvoie une ligne même sur une entrée vide : COUNT(*) vaut 0 et MIN, MAX, SUM ou AVG donnent NULL. Ce ne sont pas des erreurs de requête.'
      ]
    ],
    reasoning: [
      'Applique le même test à chaque valeur : 2018 est inférieur à 2020 et est écarté. 2020 est égal à la borne : le signe >= l’accepte. 2023 est supérieur et reste aussi. Le résultat garde donc les lignes de 2020 et 2023, sans changer les autres dans la base.',
      'Compare d’abord les années : elles valent toutes les deux 2023, donc le premier critère ne départage rien. Passe ensuite au titre en ordre croissant, indiqué par ASC. Graphes commence par G et SQL par S ; Graphes doit donc apparaître avant SQL.',
      'Lis le filtre comme une question adressée à chaque ligne : son année dépasse-t-elle strictement 3000 ? Aucun livre fourni ne répond oui. Le résultat ne contient donc aucune ligne ; la syntaxe peut néanmoins être tout à fait valide et les données de départ sont conservées.'
    ]
  }),
  'sql-jointures': pedagogy({
    intro: [
      'Une fiche de livre mentionne le numéro 2 comme auteur ; une autre table indique que l’auteur numéro 2 s’appelle Ada.',
      'Comment afficher le titre du livre et le nom de son auteur alors que ces informations sont conservées dans deux tables ?',
      'Une jointure reconstitue les correspondances utiles sans recopier systématiquement les informations d’une table dans l’autre.'
    ],
    journey: [
      'Revoir une table et ses identifiants.',
      'Repérer les colonnes qui portent le lien.',
      'Construire les paires de lignes correspondantes.',
      'Expliquer répétitions et absences dans le résultat.'
    ],
    recap: [
      [
        'Table et clé primaire',
        'Une table contient des lignes ; une clé primaire distingue chaque ligne par une valeur unique et non absente.',
        'Auteur.id = 2 identifie une seule ligne d’auteur.'
      ],
      [
        'Clé étrangère',
        'Une clé étrangère conserve une référence vers une clé d’une autre table.',
        'Livre.auteur_id = 2 renvoie à l’auteur dont id vaut 2.'
      ],
      [
        'Lecture SQL',
        'SELECT choisit les colonnes du résultat, FROM la source, WHERE un filtre sur les lignes.',
        'SELECT titre FROM livre lit les titres sans modifier les livres.'
      ]
    ],
    life: [
      [
        'Commande et client',
        'Une boutique possède une table Commande avec client_id et une table Client avec nom et adresse.',
        'La jointure associe une commande au client dont l’identifiant correspond, pour afficher une étiquette de livraison.',
        'Une adresse de livraison peut différer de l’adresse actuelle du client ; le schéma réel doit prévoir cette histoire.'
      ],
      [
        'Prêts de bibliothèque',
        'Le même livre a été emprunté une fois par Mina et une autre fois par Noe.',
        'Joindre le livre à ses emprunts crée une ligne pour chacun des deux prêts ; répéter le titre est alors normal.',
        'Une jointure seule n’indique pas quel prêt est en cours : il faut aussi une règle sur les dates ou le statut.'
      ]
    ],
    sections: [
      [
        'Lire les deux fiches avant la syntaxe',
        'Prenons Livre avec la ligne numéro 10, titre Algorithmes, auteur_id 2. Dans Auteur, la ligne id 2 porte le nom Ada. Pour réunir titre et nom, on ne rapproche ni les positions des lignes ni leurs noms ressemblants : on compare la référence auteur_id à la clé id. L’égalité de ces valeurs exprime le lien prévu par le schéma.'
      ],
      [
        'Écrire la correspondance avec JOIN',
        'FROM Livre JOIN Auteur ON Livre.auteur_id = Auteur.id associe les lignes pour lesquelles la condition après ON est vraie. JOIN signifie joindre ; ON annonce la règle de correspondance. Le point sélectionne une colonne dans une table, et = compare les deux valeurs. SELECT Livre.titre, Auteur.nom choisit ensuite les informations visibles. Chaque livre est comparé aux auteurs compatibles avec cette règle.',
        pause(
          'Faut-il joindre la première ligne de Livre avec la première ligne d’Auteur ?',
          'Non, on suit les identifiants déclarés.',
          'Oui, l’ordre des lignes définit le lien.',
          'L’ordre physique des lignes ne porte aucune relation garantie. La clé étrangère et la clé référencée définissent la correspondance, même si les tables sont réordonnées.'
        )
      ],
      [
        'Nommer les colonnes sans ambiguïté',
        'Livre et Auteur peuvent avoir chacun une colonne id. Écrire seulement id ne précise pas laquelle on demande. Un alias est un nom court temporaire : Livre AS l permet d’écrire l.titre ; Auteur AS a permet a.nom. AS annonce ici ce surnom. La condition devient l.auteur_id = a.id. Un WHERE supplémentaire peut filtrer les paires formées, par exemple sur une année de publication.'
      ],
      [
        'Comprendre pourquoi une ligne se répète',
        'Si deux livres ont auteur_id 2, chacun rencontre la même ligne Ada : le résultat comporte deux paires, avec deux titres et le nom Ada répété. Si le livre 10 possède deux emprunts, la jointure avec Emprunt produit deux lignes pour lui. La répétition suit le nombre de correspondances. DISTINCT peut éliminer des répétitions affichées, mais seulement lorsque la question demande des valeurs distinctes.'
      ],
      [
        'Lire les absences et vérifier la condition',
        'La jointure interne, écrite JOIN ici, ne conserve que les paires qui correspondent. Un auteur sans livre n’apparaît donc pas dans ce résultat, même s’il reste dans la base. Sans condition correcte, on risque d’associer chaque livre à tous les auteurs, ce qui multiplie les lignes sans lien réel. Avant de conclure, il faut vérifier les colonnes comparées et le nombre attendu de correspondances.',
        pause(
          'Un auteur sans livre apparaît-il dans cette jointure interne Livre JOIN Auteur ?',
          'Non, aucune paire ne satisfait le lien.',
          'Oui, tous les auteurs sont conservés.',
          'Une jointure interne exige une correspondance. L’absence du résultat ne supprime pas l’auteur de sa table ; elle traduit seulement l’absence de livre correspondant.'
        )
      ]
    ],
    reasoning: [
      'Considère le livre Algorithmes : sa référence rencontre la ligne Ada et produit une première paire. Fais la même comparaison pour Graphes : elle rencontre aussi Ada et produit une deuxième paire. La clé d’Auteur reste unique ; c’est sa présence dans plusieurs paires qui répète le nom.',
      'Repère l’identifiant 10 dans la table Livre. Dans Emprunt, deux lignes possèdent livre_id 10, l’une pour Mina et l’autre pour Noe. Chacune satisfait la condition de jointure et produit une paire ; le titre Algorithmes apparaît donc deux fois, une fois par emprunt.',
      'Sam possède l’identifiant 3. Il faudrait un livre dont auteur_id vaut 3 pour créer une paire. Aucun livre ne possède cette référence : aucune condition d’égalité ne réussit pour Sam. La jointure interne ne l’affiche pas, mais sa ligne reste bien présente dans Auteur.'
    ]
  }),
  'sql-modifications': pedagogy({
    intro: [
      'Le catalogue doit accueillir un nouveau livre, corriger un titre puis retirer une fiche créée en double. Une mauvaise cible peut modifier tous les livres.',
      'Comment ajouter, corriger ou supprimer exactement les lignes voulues, puis contrôler ce qui a réellement changé ?',
      'Les écritures SQL demandent de comprendre la cible et les contraintes ; relire l’état après l’action permet de vérifier les effets.'
    ],
    journey: [
      'Retrouver lignes, colonnes et identifiants.',
      'Créer une ligne avec ses valeurs.',
      'Cibler une mise à jour ou une suppression.',
      'Relire les lignes modifiées et celles qui devaient rester.'
    ],
    recap: [
      [
        'Ligne et colonne',
        'Une ligne décrit un élément complet ; une colonne représente une information commune aux éléments.',
        'Supprimer une ligne de livre retire sa fiche, pas seulement son titre.'
      ],
      [
        'Clés et contraintes',
        'Une clé primaire identifie une ligne ; une référence doit viser une ligne existante si la contrainte est activée.',
        'Un deuxième livre portant le même id ne respecte pas l’unicité de la clé.'
      ],
      [
        'Filtre WHERE',
        'WHERE choisit les lignes dont la condition est vraie ; = compare des valeurs dans cette condition.',
        'WHERE id = 10 cible la fiche dont l’identifiant vaut 10.'
      ]
    ],
    life: [
      [
        'Corriger une adresse',
        'Une association corrige l’adresse de l’adhérent numéro 42, sans changer celle des autres adhérents.',
        'UPDATE remplace une valeur et WHERE id = 42 limite cette action à la personne identifiée.',
        'Un changement d’adresse dans une table n’envoie aucun courrier ni notification par lui-même.'
      ],
      [
        'Retirer une inscription',
        'Un atelier annule une inscription précise alors que d’autres participants restent inscrits.',
        'DELETE retire une ligne choisie ; une lecture avant puis après contrôle que les autres inscriptions existent toujours.',
        'Une application peut conserver un historique au lieu de supprimer ; cette décision métier précède la commande technique.'
      ]
    ],
    sections: [
      [
        'Trois actions différentes sur un catalogue',
        'Une lecture SELECT consulte les informations. Une insertion ajoute une ligne, une mise à jour change certaines valeurs de lignes présentes, une suppression retire des lignes entières. Avant toute écriture, formulons l’état attendu : « ajouter le livre 12 » ou « changer seulement le titre du livre 10 ». Cette phrase doit préciser l’identité de la cible et les informations à préserver.'
      ],
      [
        'INSERT fournit une valeur par colonne',
        "INSERT INTO livre(id,titre,auteur_id) VALUES(12,'Arbres',2) crée une ligne : INSERT INTO nomme la table, la première parenthèse liste les colonnes, VALUES annonce les valeurs dans le même ordre. Le texte Arbres est entre apostrophes. La valeur 12 doit respecter la clé primaire ; la référence 2 doit respecter la clé étrangère. Une contrainte violée peut faire échouer l’écriture.",
        pause(
          'Une insertion avec un id déjà utilisé doit-elle créer un deuxième exemplaire de cette clé primaire ?',
          'Non, la contrainte d’unicité l’interdit.',
          'Oui, les deux lignes partageront leur identité.',
          'La clé primaire doit distinguer les lignes. Réutiliser une valeur existante viole ce contrat ; il faut choisir une nouvelle clé ou modifier la ligne existante selon le besoin.'
        )
      ],
      [
        'UPDATE change les colonnes annoncées',
        "UPDATE livre SET titre = 'Graphes' WHERE id = 10 choisit la table livre, remplace titre grâce à SET, et limite l’action avec WHERE. Le signe = après SET indique la valeur à affecter ; dans WHERE il teste la cible. Avant l’écriture, SELECT avec le même WHERE permet de voir quelles lignes seront concernées. Un nom peut se répéter ; un identifiant primaire vise plus précisément une ligne."
      ],
      [
        'DELETE retire des lignes entières',
        'DELETE FROM livre WHERE id = 10 retire la ligne du livre 10, avec toutes ses colonnes. Sans WHERE, DELETE vise toutes les lignes ; de même UPDATE sans WHERE modifie toutes les lignes de la table. Une suppression peut être refusée si d’autres tables référencent encore le livre, selon les contraintes déclarées. Retirer une valeur de titre et retirer une fiche sont donc deux actions différentes.',
        pause(
          'Quel est l’effet de DELETE FROM livre sans WHERE ?',
          'Toutes les lignes sont visées.',
          'Seule la première ligne est visée.',
          'Aucun filtre ne limite la commande. Elle vise toute la table ; l’ordre des lignes n’a pas de rôle pour choisir une prétendue première fiche.'
        )
      ],
      [
        'Contrôler l’état après l’action',
        'Une écriture ne renvoie pas nécessairement une table de résultat. On exécute ensuite SELECT pour vérifier la cible et les lignes qui devaient être préservées. Compter les lignes ne suffit pas : une mauvaise fiche peut avoir été changée sans modifier ce nombre. Dans ces exercices, chaque essai reconstruit une base de départ ; cette remise à zéro appartient à l’atelier et n’est pas une propriété générale de SQL.'
      ]
    ],
    reasoning: [
      'L’identifiant 4 n’est pas encore présent : la contrainte d’unicité est respectée. La note 15 appartient au domaine autorisé. INSERT ajoute donc la ligne d’Iris aux trois lignes existantes ; le nombre de lignes devient 3 + 1 = 4, sans modifier les autres élèves.',
      'Le filtre WHERE id = 2 compare la clé primaire à 2 et désigne la seule ligne de Noe. SET nsi = 12 remplace uniquement sa note par 12. Les autres identifiants ne satisfont pas le filtre et leurs notes restent inchangées ; une lecture SELECT peut contrôler les deux propriétés.',
      'La commande nomme la table note mais ne contient aucun WHERE. Aucun filtre ne réduit donc les lignes visées : les trois fiches sont supprimées. DELETE retire les lignes et non la définition de la table ; on peut encore interroger cette table, qui est désormais vide.'
    ]
  })
};

import { answer, python, sql } from './helpers.js';

const names = ['alice', 'bob', 'etienne', 'hector', 'lea', 'nathan', 'paul'];
const furniture = `CREATE TABLE Clients(id INTEGER PRIMARY KEY, nom TEXT, prenom TEXT, adresse TEXT, ville TEXT);
CREATE TABLE Meubles(id INTEGER PRIMARY KEY, intitule TEXT, prix REAL, stock INTEGER, description TEXT);
INSERT INTO Clients VALUES (1,'Martin','Lina','10 rue des Fleurs','Paris'),(2,'Petit','Noé','4 rue du Parc','Lyon'),(3,'Diallo','Sara','2 rue Haute','Paris');
INSERT INTO Meubles VALUES (62,'skap',69.99,2,'Armoire blanche 3 portes'),(63,'skap',69.99,3,'Armoire noire 3 portes'),(74,'stol',39.99,10,'Chaise en bois avec tissu bleu'),(98,'hylla',99.99,0,'Bibliothèque 5 étages blanche');`;
const guitars = `CREATE TABLE inventaire(id INTEGER PRIMARY KEY, marque TEXT, modele TEXT, annee INTEGER, num_ser TEXT, prix INTEGER);
INSERT INTO inventaire VALUES
(1,'Gibson','Les Paul Goldtop',1956,'@70562',100000),
(2,'Gibson','Les Paul Goldtop',1988,'81738349',20000),
(3,'Gibson','Les Paul Standard',1959,'@90663',250000),
(4,'Gibson','Les Paul Standard',1987,'81757532',25000),
(5,'Fender','Telecaster',1952,'000230',150000),
(6,'Fender','Telecaster',1965,'81345673',10000),
(7,'Fender','Stratocaster',1956,'001359',200000),
(8,'Fender','Stratocaster',1965,'81757532',15000);
CREATE TABLE marque(id INTEGER PRIMARY KEY, nom TEXT);
CREATE TABLE modele(id INTEGER PRIMARY KEY, nom TEXT, id_marque INTEGER REFERENCES marque(id));
CREATE TABLE guitare(id INTEGER PRIMARY KEY, id_modele INTEGER REFERENCES modele(id), annee INTEGER, num_ser TEXT, prix INTEGER);
INSERT INTO marque VALUES(1,'Gibson'),(2,'Fender');
INSERT INTO modele VALUES(1,'Les Paul Goldtop',1),(2,'Les Paul Standard',1),(3,'Telecaster',2),(4,'Stratocaster',2);
INSERT INTO guitare SELECT id, CASE WHEN id<=2 THEN 1 WHEN id<=4 THEN 2 WHEN id<=6 THEN 3 ELSE 4 END, annee, num_ser, prix FROM inventaire;`;
const siteClass = `class Site:
    def __init__(self, nom):
        self.nom = nom
        self.predecesseurs = []
        self.popularite = 0

    def calculPopularite(self):
        # À compléter : affecter ET renvoyer la popularité
        pass

def eval_popularite(predecesseurs):
    site = Site('test')
    site.predecesseurs = predecesseurs
    resultat = site.calculPopularite()
    return resultat, site.popularite
`;

export default {
  'annale-2021-ecrit-dichotomie': {
    introduction:
      'Chercher un prénom dans une liste triée ressemble à chercher un mot dans un dictionnaire : on peut décider quelle moitié ne peut pas contenir la réponse. Nous allons rendre cette décision visible, puis l’écrire de deux façons.',
    prerequisites: [
      'Un indice commence à 0 : liste[0] est le premier élément.',
      'Une fonction reçoit des paramètres et renvoie un résultat avec return.',
      'Le tableau doit être trié avec le même ordre que les comparaisons.'
    ],
    adaptation:
      'Extrait guidé de l’exercice 2. La trace complète est expliquée ; sa vérification porte sur l’indice final. Le nom recherche_indice est choisi pour tester la variante demandée. Les questions de QCM et le quotient par soustractions ne sont pas traités ici.',
    context: `Lnoms = ["alice", "bob", "etienne", "hector", "lea", "nathan", "paul"]\nÉlément recherché pour la trace : "lea"`,
    exercises: [
      answer(
        'Suivre la recherche',
        'Partie B, question 3. Avec deb=0, fin=6 et milieu=(deb+fin)//2, compare le nom du milieu à "lea" puis réduis l’intervalle. Quel indice est finalement trouvé ? Donne seulement cet indice.',
        4,
        [
          'Écris les numéros des cases au-dessus des noms : la première case porte 0.',
          'Après une comparaison, élimine aussi la case du milieu déjà examinée.'
        ],
        [
          'Au départ, les bornes 0 et 6 donnent le milieu 3 : hector précède lea. La cible ne peut donc se trouver que dans les cases 4 à 6.',
          'Le milieu devient 5 : nathan vient après lea. La borne droite devient 4. Les deux bornes valent alors 4 et la comparaison réussit.',
          'La trace des triplets (deb, fin, milieu) est (0,6,3), (4,6,5), (4,4,4). La réponse est l’indice 4, soit la cinquième case.'
        ],
        {
          guidance:
            'Sépare la position dans la vie courante (premier, deuxième…) de l’indice utilisé par Python.',
          pitfall: 'Renvoyer 5 confond numéro de place et indice.'
        }
      ),
      python(
        'Renvoyer la position',
        'Partie B, question 4. Programme recherche_indice(elem, liste), sur une liste triée : renvoie un indice contenant elem, ou -1 s’il est absent. Ne trie pas la liste pour effectuer la recherche.',
        'recherche_indice',
        'def recherche_indice(elem, liste):\n    # Garde les bornes de la zone encore possible\n    pass',
        `def recherche_indice(elem, liste):
    deb = 0
    fin = len(liste) - 1
    while deb <= fin:
        m = (deb + fin) // 2
        if liste[m] == elem:
            return m
        if liste[m] > elem:
            fin = m - 1
        else:
            deb = m + 1
    return -1`,
        [
          [['lea', names], 4],
          [['alice', names], 0],
          [['paul', names], 6],
          [['zoe', names], -1],
          [['alice', []], -1],
          [['bob', ['bob']], 0]
        ],
        [
          'La borne droite dépend de la longueur reçue, pas de la liste d’exemple.',
          'La recherche continue tant qu’il reste au moins une case ; distingue réussite et intervalle épuisé.'
        ],
        [
          'La propriété conservée est : si la cible existe, elle se trouve encore entre deb et fin. Une comparaison sur un tableau trié permet d’écarter un côté entier.',
          'Le décalage de 1 empêche de réexaminer le milieu. L’intervalle se réduit strictement à chaque tour non concluant : la boucle termine.',
          'return -1 se place après la boucle. Une liste vide donne tout de suite deb=0 et fin=-1 ; aucune case n’est lue. Le nombre de comparaisons est logarithmique.'
        ],
        {
          guidance:
            'Commence par écrire les cas trouvé et absent avant les modifications de bornes.',
          pitfall:
            'Utiliser fin=m ou deb=m peut empêcher la terminaison sur un intervalle d’une ou deux cases.'
        }
      ),
      python(
        'Passer à la récursivité',
        'Partie C. Écris recherche_recursive(elem, liste), qui renvoie un booléen. Utilise une fonction interne récursive recevant deux indices, pour éviter de recopier des moitiés de liste.',
        'recherche_recursive',
        'def recherche_recursive(elem, liste):\n    def chercher(deb, fin):\n        pass\n    return chercher(0, len(liste) - 1)',
        `def recherche_recursive(elem, liste):
    def chercher(deb, fin):
        if deb > fin:
            return False
        m = (deb + fin) // 2
        if liste[m] == elem:
            return True
        if elem < liste[m]:
            return chercher(deb, m - 1)
        return chercher(m + 1, fin)
    return chercher(0, len(liste) - 1)`,
        [
          [['lea', names], true],
          [['zoe', names], false],
          [['a', []], false],
          [['bob', ['bob']], true]
        ],
        [
          'Repère deux arrêts : plus aucune case possible, ou valeur du milieu égale à la cible.',
          'Un appel récursif doit communiquer son résultat à l’appel qui l’attend.'
        ],
        [
          'Une fonction récursive s’appelle elle-même avec un problème plus petit. Ici, seule une moitié de l’intervalle reste à examiner.',
          'Le cas vide est testé avant tout accès à liste[m]. Chaque branche renvoie le résultat de son appel : sans return, Python renverrait None.',
          'On conserve la liste et on change seulement les indices. Cela évite les copies par tranches et garde un nombre logarithmique de comparaisons. La pile des appels occupe aussi un espace logarithmique.'
        ],
        {
          guidance:
            'Explique à voix haute pourquoi le nouvel intervalle est plus petit que le précédent.',
          pitfall: 'Confondre False et -1 : les deux variantes n’ont pas le même contrat.'
        }
      )
    ],
    takeaway:
      'La même idée se traduit par une boucle ou des appels récursifs : garder une zone possible, la réduire, puis reconnaître une réussite ou un échec.'
  },
  'annale-2022-ecrit-parentheses': {
    introduction:
      'Un texte peut contenir autant d’ouvertures que de fermetures et être pourtant incorrect. Comme avec des boîtes emboîtées, on doit fermer ce qui a été ouvert dans un ordre précis.',
    prerequisites: [
      'Une boucle lit les caractères dans leur ordre.',
      'Un compteur retient un nombre ; une pile retient aussi les éléments.',
      'Dans une liste utilisée comme pile, append ajoute au sommet et pop retire le dernier élément.'
    ],
    adaptation:
      'Exercice 1 : trace de l’expression C, complétion du parenthésage et traduction en Python de l’algorithme de balisage fourni. Le dernier atelier prolonge les questions de trace par un programme testable ; il ne remplace pas un analyseur HTML réel.',
    context: `Expression C : "(( )))(" (sans espaces : "(()))(")\nBalises simplifiées : ["<p>", "<em>", "</em>", "</p>"]\nOn exclut attributs, commentaires et balises sans fermeture.`,
    exercises: [
      answer(
        'Tracer le contrôleur',
        'Partie A, question 2. Pars de 0, ajoute 1 pour "(" et retire 1 pour ")". Pour "(()))(" donne les six valeurs successives sous forme de liste JSON, par exemple [1,2,3].',
        '[1,2,1,0,-1,0]',
        [
          'Ne te contente pas du résultat final : écris une valeur après chaque caractère.',
          'Une fermeture peut arriver alors qu’aucune ouverture n’attend encore.'
        ],
        [
          'Les deux premières ouvertures font monter le compteur à 1 puis 2. Les fermetures suivantes donnent 1 puis 0, puis -1.',
          'La dernière ouverture remet le total à 0, mais ne peut pas réparer une fermeture arrivée trop tôt. Un programme de vérification peut donc s’arrêter dès -1.',
          'La trace complète demandée est [1,2,1,0,-1,0]. Il faut vérifier chaque préfixe, pas seulement compter toutes les ouvertures et fermetures à la fin.'
        ],
        {
          guidance: 'Un préfixe est simplement le début du texte lu jusqu’à l’instant présent.',
          pitfall:
            'Un total final nul ne suffit pas à prouver que les parenthèses sont bien placées.'
        }
      ),
      python(
        'Vérifier toutes les parenthèses',
        'Partie A, question 3. Programme parenthesage_correct(expression), avec uniquement des parenthèses dans la chaîne. Renvoie True exactement si le parenthésage est correct. La chaîne vide est acceptée.',
        'parenthesage_correct',
        'def parenthesage_correct(expression):\n    controleur = 0\n    # Parcours puis contrôle final\n    pass',
        `def parenthesage_correct(expression):
    controleur = 0
    for parenthese in expression:
        if parenthese == '(':
            controleur += 1
        else:
            controleur -= 1
        if controleur < 0:
            return False
    return controleur == 0`,
        [
          [['()(())'], true],
          [['(()))('], false],
          [['((()()'], false],
          [[''], true],
          [[')('], false],
          [['((()))'], true]
        ],
        [
          'Le compteur représente les ouvertures qui attendent encore leur fermeture.',
          'Distingue le contrôle à chaque tour du contrôle une fois le parcours fini.'
        ],
        [
          'Pendant le parcours, un compteur négatif prouve une fermeture prématurée. Le résultat peut être rejeté immédiatement.',
          'À la fin, un compteur positif signale des fermetures manquantes. Un compteur nul, après tous les contrôles intermédiaires, permet de conclure.',
          'Les deux conditions recherchées dans le sujet sont controleur < 0 et controleur == 0. Chaque caractère est lu une fois, donc le temps est linéaire et la mémoire supplémentaire constante.'
        ],
        {
          guidance: 'Teste séparément une fermeture trop tôt et une ouverture jamais fermée.',
          pitfall:
            'return True à l’intérieur de la boucle accepterait un texte après son premier préfixe correct.'
        }
      ),
      python(
        'Vérifier les noms des balises',
        'Partie B, adaptation en Python. Programme balisage_correct(balises) sur une liste de balises simplifiées de la forme <nom> ou </nom>. Renvoie un booléen. Les balises sont déjà séparées : aucun découpage HTML n’est demandé.',
        'balisage_correct',
        'def balisage_correct(balises):\n    pile = []\n    pass',
        `def balisage_correct(balises):
    pile = []
    for balise in balises:
        if balise.startswith('</'):
            if not pile or pile.pop() != balise[2:-1]:
                return False
        else:
            pile.append(balise[1:-1])
    return pile == []`,
        [
          [[['<p>', '<em>', '</em>', '</p>']], true],
          [[['<p>', '<em>', '</p>', '</em>']], false],
          [[['</p>']], false],
          [[['<p>']], false],
          [[[]], true]
        ],
        [
          'Les fermetures doivent correspondre à la dernière ouverture encore en attente.',
          'Avant de retirer le sommet, vérifie qu’il existe ; après le parcours, vérifie qu’il ne reste rien.'
        ],
        [
          'Pour <p><em></em></p>, la pile des noms devient [p], [p,em], [p], puis []. Une fermeture dépile l’ouverture la plus récente : c’est le comportement LIFO.',
          'Dans <p><em></p></em>, les nombres d’ouvertures et fermetures conviennent, mais </p> rencontre em au sommet. Un simple compteur ne peut pas mémoriser ce nom.',
          'La pile doit être vide après un parcours sans erreur. Avec 12 balises toutes appariées, le maximum est 6 ouvertures imbriquées, puis 6 fermetures.'
        ],
        {
          guidance: 'Écris les noms dans la pile, en retirant les caractères <, > et /.',
          pitfall: 'Comparer seulement les quantités autorise des fermetures croisées.'
        }
      )
    ],
    takeaway:
      'Le compteur vérifie une profondeur ; la pile conserve aussi l’identité et l’ordre des ouvertures. Choisis la structure selon l’information nécessaire.'
  },
  'annale-2023-ecrit-meubles': {
    introduction:
      'Dans le magasin, une lecture, une correction de stock et l’arrivée d’un nouveau meuble sont trois opérations différentes. On les construit une par une, avec une base réinitialisée à chaque essai.',
    prerequisites: [
      'Une table contient des lignes et des colonnes.',
      'SELECT lit, UPDATE modifie une ligne existante, INSERT ajoute une ligne.',
      'Une clé primaire identifie une ligne sans ambiguïté.'
    ],
    adaptation:
      'Questions 3 à 5 reformulées, schéma et extrait Meubles conservés. Les trois clients sont des données pédagogiques ajoutées pour exécuter la question 3. Les questions de modèle relationnel et de lecture de requête ne sont pas corrigées ici.',
    context:
      'Clients(id, nom, prenom, adresse, ville)\nMeubles(id, intitule, prix, stock, description)\nLes données complètes de chaque essai sont consultables dans son éditeur SQL.',
    exercises: [
      sql(
        'Choisir les clients parisiens',
        'Question 3. Renvoie les colonnes nom puis prenom des clients dont la ville est Paris, sans colonne supplémentaire et sans imposer d’ordre.',
        furniture,
        "SELECT nom, prenom FROM Clients WHERE ville = 'Paris';",
        [
          ['Martin', 'Lina'],
          ['Diallo', 'Sara']
        ],
        [
          'Sépare les colonnes à afficher du critère qui choisit les lignes.',
          'Les noms des colonnes sont des identifiants ; la ville recherchée est une valeur textuelle.'
        ],
        [
          'SELECT nom, prenom fixe la forme du résultat : deux colonnes dans cet ordre. FROM Clients fixe la table interrogée.',
          "WHERE ville = 'Paris' est évalué pour chaque client. Les lignes de Lina et Sara passent le filtre ; celle de Noé est écartée.",
          'La requête ne modifie pas Clients. Sans ORDER BY, on n’exige pas un ordre des lignes ; les tests comparent donc les mêmes lignes indépendamment de leur ordre.'
        ],
        {
          guidance:
            'Reformule d’abord : je garde quelles personnes et je veux connaître quelles informations ?',
          pitfall: 'SELECT * renvoie trop de colonnes, même si le filtre est correct.'
        }
      ),
      sql(
        'Mettre à jour un stock',
        'Question 4. Le meuble d’identifiant 98 a désormais un stock de 50. Modifie cette ligne sans changer les autres meubles.',
        furniture,
        'UPDATE Meubles SET stock = 50 WHERE id = 98;',
        [
          [62, 2],
          [63, 3],
          [74, 10],
          [98, 50]
        ],
        [
          'L’objet existe déjà : il faut modifier sa ligne, pas en créer une seconde.',
          'Choisis le filtre qui identifie ce meuble de façon unique.'
        ],
        [
          'UPDATE Meubles annonce une modification. SET stock = 50 donne la nouvelle valeur absolue : on ne demande pas d’ajouter 50 au stock.',
          'WHERE id = 98 limite la modification à une seule ligne, grâce à la clé primaire. Oublier WHERE donnerait le même stock à tout le catalogue.',
          'Une requête de contrôle relit tous les identifiants et stocks : elle vérifie aussi que les trois autres lignes sont intactes. Chaque essai repart de la base initiale.'
        ],
        {
          verifyQuery: 'SELECT id, stock FROM Meubles ORDER BY id;',
          ordered: true,
          guidance: 'Écris la cible et la nouvelle valeur avant la syntaxe SQL.',
          pitfall: 'Un UPDATE sans WHERE est valide en SQL, mais faux pour cette demande.'
        }
      ),
      sql(
        'Ajouter le nouveau meuble',
        'Question 5. Ajoute le meuble id=65, intitule=matta, prix=95.99, stock=25, description=Tapis vert à pois rouges. Conserve tous les meubles existants.',
        furniture,
        "INSERT INTO Meubles (id, intitule, prix, stock, description) VALUES (65, 'matta', 95.99, 25, 'Tapis vert à pois rouges');",
        [
          [62, 'skap', 69.99, 2, 'Armoire blanche 3 portes'],
          [63, 'skap', 69.99, 3, 'Armoire noire 3 portes'],
          [65, 'matta', 95.99, 25, 'Tapis vert à pois rouges'],
          [74, 'stol', 39.99, 10, 'Chaise en bois avec tissu bleu'],
          [98, 'hylla', 99.99, 0, 'Bibliothèque 5 étages blanche']
        ],
        [
          'Associe chaque valeur à sa colonne, dans le même ordre.',
          'La description et l’intitulé sont du texte ; le prix utilise un point décimal.'
        ],
        [
          'INSERT INTO Meubles énumère explicitement les colonnes choisies. VALUES fournit un tuple de valeurs dans le même ordre.',
          'L’identifiant 65 n’existe pas encore : la contrainte de clé primaire est respectée. Une seconde insertion du même identifiant échouerait.',
          'Le contrôle relit le catalogue entier. Il attend une seule ligne nouvelle, avec les bonnes valeurs, et toutes les lignes initiales conservées.'
        ],
        {
          verifyQuery: 'SELECT id,intitule,prix,stock,description FROM Meubles ORDER BY id;',
          ordered: true,
          guidance: 'Compare le nombre de colonnes et le nombre de valeurs avant d’exécuter.',
          pitfall:
            'UPDATE corrigerait une ligne ; il n’ajoute pas l’identifiant 65 absent de la table.'
        }
      )
    ],
    takeaway:
      'Construis chaque requête à partir de son effet attendu. Pour une modification, contrôle aussi les lignes qui devaient rester intactes.'
  },
  'annale-2024-ecrit-sites': {
    introduction:
      'Les liens d’un site vers un autre forment un graphe orienté. Ici, la popularité est une somme de liens entrants, puis un parcours explore les sites accessibles.',
    prerequisites: [
      'Un prédécesseur pointe vers le site ; un successeur est pointé par le site.',
      'Un couple (site, poids) associe un voisin et un nombre de liens.',
      'Un objet porte des attributs ; une méthode peut les modifier.'
    ],
    adaptation:
      'Questions 4, 5 et 8. La méthode conserve le nom du sujet ; eval_popularite est un adaptateur de test. Le parcours à tracer est réécrit sur un dictionnaire de noms, dans le même ordre de voisins. Les poids n’y servent pas à choisir la prochaine visite.',
    context: `Liens entrants de site1 : [(site2, 4), (site4, 2)]\nSuccesseurs dans l’ordre du sujet :\nsite1 → site3, site4, site5\nsite2 → site1, site3, site4\nsite3 → site5\nsite4 → site1, site5\nsite5 → site3`,
    exercises: [
      answer(
        'Mesurer la popularité',
        'Question 4. Le site site1 reçoit 4 liens de site2 et 2 liens de site4. Quelle est sa popularité selon la définition du sujet ? Donne un entier.',
        6,
        [
          'La mesure porte sur les liens reçus, pas sur les liens que le site envoie.',
          'Un même site peut contenir plusieurs liens vers un autre : regarde les poids.'
        ],
        [
          'Les deux prédécesseurs ne comptent pas chacun pour 1 : leurs poids indiquent combien de liens ils apportent.',
          'La contribution de site2 est 4 et celle de site4 est 2. La somme vaut 6.',
          'Cette mesure simple ne suffit pas à reproduire le classement d’un moteur de recherche ; on applique exactement la définition de cet exercice.'
        ],
        {
          guidance: 'Distingue le nombre de sites citant un site et le nombre de citations.',
          pitfall: 'Répondre 2 compte les prédécesseurs et ignore le poids de leurs liens.'
        }
      ),
      python(
        'Écrire la méthode de calcul',
        'Question 5. Complète seulement calculPopularite : additionne les poids des couples de self.predecesseurs, affecte self.popularite et renvoie ce total. Garde eval_popularite : il vérifie à la fois le résultat et l’attribut.',
        'eval_popularite',
        siteClass,
        siteClass.replace(
          '        # À compléter : affecter ET renvoyer la popularité\n        pass',
          '        total = 0\n        for site, poids in self.predecesseurs:\n            total += poids\n        self.popularite = total\n        return total'
        ),
        [
          [
            [
              [
                ['site2', 4],
                ['site4', 2]
              ]
            ],
            [6, 6]
          ],
          [[[]], [0, 0]],
          [[[['unique', 9]]], [9, 9]]
        ],
        [
          'Chaque élément contient deux informations ; seule l’une doit être additionnée.',
          'La consigne demande deux effets distincts : mémoriser dans l’objet et renvoyer.'
        ],
        [
          'Le total commence à 0 car aucun lien n’a encore été compté. La boucle ajoute le poids de chaque prédécesseur.',
          'Après la boucle, self.popularite = total modifie l’objet, puis return total transmet le résultat. Renvoyer seul laisserait l’attribut à son ancienne valeur.',
          'Le cas sans prédécesseur donne 0. Le total est recalculé depuis zéro à chaque appel pour ne pas doubler les liens lors d’un second calcul.'
        ],
        {
          guidance: 'Teste aussi un objet qui ne reçoit aucun lien.',
          pitfall:
            'Incrémenter directement un ancien total sans le remettre à zéro compte plusieurs fois les mêmes liens.'
        }
      ),
      python(
        'Reconstruire le parcours en largeur',
        'Question 8, adaptation. Programme parcours(graphe, depart) et renvoie les noms visités dans l’ordre. graphe associe chaque nom à sa liste ordonnée de successeurs. Visite seulement les sites accessibles ; chaque site apparaît au plus une fois.',
        'parcours',
        'def parcours(graphe, depart):\n    # Prépare les sites en attente et les sites déjà découverts\n    pass',
        `def parcours(graphe, depart):
    attente = [depart]
    decouverts = {depart}
    resultat = []
    while attente:
        site = attente.pop(0)
        resultat.append(site)
        for voisin in graphe[site]:
            if voisin not in decouverts:
                decouverts.add(voisin)
                attente.append(voisin)
    return resultat`,
        [
          [
            [
              {
                site1: ['site3', 'site4', 'site5'],
                site2: ['site1', 'site3', 'site4'],
                site3: ['site5'],
                site4: ['site1', 'site5'],
                site5: ['site3']
              },
              'site1'
            ],
            ['site1', 'site3', 'site4', 'site5']
          ],
          [
            [{ A: ['B', 'C'], B: ['A', 'D'], C: ['D'], D: [] }, 'A'],
            ['A', 'B', 'C', 'D']
          ],
          [[{ A: [] }, 'A'], ['A']]
        ],
        [
          'La structure d’attente retire le premier élément ajouté et conserve l’ordre des voisins.',
          'Marque un site dès sa découverte, pour empêcher deux voisins de l’ajouter avant sa visite.'
        ],
        [
          'append avec pop(0) réalise une file FIFO : les sites proches du départ sont traités avant les plus lointains. C’est un parcours en largeur.',
          'Depuis site1, on ajoute site3, site4, site5. Le traitement suivant ne découvre aucun nouveau site. site2 reste inaccessible depuis ce départ.',
          'L’ordre obtenu est site1, site3, site4, site5. Pour un très grand graphe, pop(0) décale une liste entière ; une vraie file évite ce surcoût.'
        ],
        {
          guidance:
            'Sur papier, tiens deux listes : attente et résultat. Ce sont deux rôles différents.',
          pitfall: 'Utiliser pop() sans indice transforme la file en pile et change le parcours.'
        }
      )
    ],
    takeaway:
      'Vérifie toujours le sens des flèches, le rôle des poids et la structure d’attente. Ces trois choix changent le résultat d’un algorithme sur un graphe.'
  },
  'annale-2025-ecrit-guitares': {
    introduction:
      'Une collection peut être décrite dans une seule grande table ou répartie entre plusieurs tables reliées. Les trois défis font passer du filtre simple à une jointure, puis à un calcul sur les lignes sélectionnées.',
    prerequisites: [
      'WHERE filtre les lignes et SELECT choisit les colonnes.',
      'Une clé étrangère fait référence à l’identifiant d’une autre table.',
      'Une fonction d’agrégation combine plusieurs valeurs en un résultat.'
    ],
    adaptation:
      'Extrait : questions 3, 7 et 10 uniquement. Les huit guitares, noms, identifiants et relations de l’extrait officiel sont repris comme données de test. Les deux représentations coexistent dans le laboratoire pour permettre des essais indépendants. Les réponses rédigées et les autres requêtes du sujet ne sont pas évaluées.',
    context:
      'Partie A : inventaire(id, marque, modele, annee, num_ser, prix)\nPartie B : marque(id, nom), modele(id, nom, id_marque), guitare(id, id_modele, annee, num_ser, prix)\nDans la partie B, id_marque référence marque.id et id_modele référence modele.id.',
    exercises: [
      sql(
        'Retrouver les années d’un modèle',
        'Question 3. Dans inventaire, renvoie seulement les années des guitares dont le modèle est Les Paul Standard. Aucun ordre particulier n’est demandé.',
        guitars,
        "SELECT annee FROM inventaire WHERE modele = 'Les Paul Standard';",
        [[1959], [1987]],
        [
          'Quelle colonne veut-on afficher et quelle autre colonne sert à sélectionner ?',
          'Copie exactement le nom du modèle comme valeur textuelle.'
        ],
        [
          'La question porte sur la représentation de la partie A : une table suffit. SELECT annee choisit l’information demandée.',
          "FROM inventaire indique où la lire. WHERE modele = 'Les Paul Standard' garde les lignes des deux guitares de ce modèle.",
          'Le résultat contient les années 1959 et 1987, chacune dans une ligne. Un filtre sur marque seul garderait aussi les Goldtop et serait trop large.'
        ],
        {
          guidance: 'Écris la demande en français avant de choisir les clauses SQL.',
          pitfall:
            'La colonne modele de la grande table est un texte ; elle n’est pas l’identifiant de la table modele.'
        }
      ),
      sql(
        'Relier guitares et modèles',
        'Question 7. Utilise la représentation de la partie B. Renvoie num_ser puis annee des guitares dont le nom de modèle est Les Paul Standard. Aucun ordre particulier n’est demandé.',
        guitars,
        "SELECT guitare.num_ser, guitare.annee FROM guitare JOIN modele ON guitare.id_modele = modele.id WHERE modele.nom = 'Les Paul Standard';",
        [
          ['@90663', 1959],
          ['81757532', 1987]
        ],
        [
          'Les colonnes du résultat et le nom du modèle ne sont pas dans la même table.',
          'Écris d’abord sur papier la clé étrangère et la clé primaire qui doivent correspondre.'
        ],
        [
          'guitare contient les numéros de série et années, mais seulement un identifiant pour le modèle. modele contient le nom lisible : il faut relier les deux.',
          'JOIN modele ON guitare.id_modele = modele.id associe chaque guitare à son modèle exact. WHERE modele.nom filtre ensuite le modèle voulu.',
          'La projection donne (@90663,1959) et (81757532,1987). Relier les deux colonnes id entre elles confondrait deux identifiants de rôles différents.'
        ],
        {
          guidance: 'Ne rapproche pas deux colonnes simplement parce qu’elles portent le même nom.',
          pitfall:
            'Oublier la condition ON produit des combinaisons sans rapport et multiplie les lignes.'
        }
      ),
      sql(
        'Calculer la valeur des Stratocaster',
        'Question 10. Dans la représentation de la partie B, renvoie une seule valeur : la somme des prix des guitares dont le nom de modèle est Stratocaster.',
        guitars,
        "SELECT SUM(guitare.prix) FROM guitare JOIN modele ON guitare.id_modele = modele.id WHERE modele.nom = 'Stratocaster';",
        [[215000]],
        [
          'Commence par retrouver les seules lignes qui participent au calcul.',
          'Il faut combiner les prix, pas compter les guitares ni additionner leurs années.'
        ],
        [
          'On retrouve le nom du modèle par la même jointure que dans l’atelier précédent. Le filtre doit être appliqué aux Stratocaster.',
          'Les deux prix retenus sont 200000 et 15000. SUM(guitare.prix) les additionne et renvoie une ligne contenant 215000.',
          'Un SELECT prix renverrait deux lignes ; COUNT donnerait 2. Une jointure incorrecte peut produire des doublons et gonfler la somme, même si la requête est syntaxiquement valide.'
        ],
        {
          guidance:
            'Vérifie d’abord ton filtre avec une lecture des lignes, puis remplace l’affichage par le calcul.',
          pitfall:
            'Une requête qui s’exécute sans erreur n’est pas forcément correcte : contrôle les lignes sur lesquelles porte la somme.'
        }
      )
    ],
    takeaway:
      'Filtrer, relier et agréger sont trois opérations distinctes. Une bonne jointure commence par le schéma, puis la requête exprime exactement le résultat demandé.'
  },
  'annale-2026-ecrit-reseau': {
    introduction:
      'L’ordinateur atteint ses voisins mais pas Internet. Pour comprendre, il faut séparer adresse de machine, adresse de réseau et passerelle, puis vérifier les limites du sous-réseau.',
    prerequisites: [
      'Une adresse IPv4 contient quatre octets de 8 bits.',
      'Dans un octet, les poids sont 128, 64, 32, 16, 8, 4, 2 et 1.',
      'Un masque distingue les bits du réseau des bits utilisables pour les machines.'
    ],
    adaptation:
      'Extrait exact du périmètre : exercice 1, partie A, questions 1 à 3. Les réponses sont saisies dans un format ciblé pour vérifier les calculs ; la rédaction et les justifications doivent aussi être préparées par l’élève. Les parties routage et chiffrement ne sont pas corrigées dans cette fiche.',
    context:
      'Configuration donnée :\naddress 172.16.32.15\nnetmask 255.255.240.0\ngateway 172.16.48.254\nConvention du sujet : la passerelle utilise la dernière adresse hôte du sous-réseau.\nLe test de connectivité vers 172.16.47.254 réussit.',
    exercises: [
      answer(
        'Écrire l’adresse et le masque en binaire',
        'Question 1. Convertis 172.16.32.15 puis 255.255.240.0. Saisis une liste JSON contenant ces deux chaînes, chacune avec quatre groupes de huit bits séparés par des points : ["adresse en binaire","masque en binaire"].',
        '["10101100.00010000.00100000.00001111","11111111.11111111.11110000.00000000"]',
        [
          'Traite chaque octet séparément ; les zéros au début d’un octet comptent dans les huit bits.',
          'Pour contrôler, additionne les poids des positions à 1 et retrouve l’octet décimal initial.'
        ],
        [
          '172 se décompose en 128+32+8+4, soit 10101100. 16 est 00010000, 32 est 00100000, et 15 est 00001111.',
          'Dans le masque, 255 donne huit bits à 1 ; 240 vaut 128+64+32+16 et donne 11110000. Le dernier octet vaut 00000000.',
          'L’adresse est 10101100.00010000.00100000.00001111 et le masque 11111111.11111111.11110000.00000000. Les 20 premiers bits du masque valent 1 : on parle d’un /20.'
        ],
        {
          guidance:
            'Écris les huit poids sur papier avant de convertir. Contrôle chaque groupe de huit caractères.',
          pitfall:
            'Oublier les zéros de tête change le découpage réseau/machine et rend le résultat ambigu.'
        }
      ),
      answer(
        'Délimiter les adresses utilisables',
        'Question 2. Donne [nombre_d_hotes,"premiere_adresse","derniere_adresse"] pour ce sous-réseau. Utilise les adresses hôtes utilisables, en excluant réseau et diffusion.',
        '[4094,"172.16.32.1","172.16.47.254"]',
        [
          'Compte les bits réservés aux machines. Deux combinaisons sont réservées dans ce réseau.',
          'Le troisième octet se regroupe par blocs déterminés par le masque ; repère le bloc contenant l’adresse donnée.'
        ],
        [
          'Le masque /20 laisse 12 bits pour les machines : 2 puissance 12 donne 4096 adresses. On réserve l’adresse réseau et la diffusion, d’où 4094 adresses hôtes.',
          'Le troisième octet 32 commence un bloc de 16 valeurs allant de 32 à 47. L’adresse réseau est 172.16.32.0 et la diffusion est 172.16.47.255.',
          'La première adresse hôte est 172.16.32.1 et la dernière 172.16.47.254. Le troisième octet peut varier : le masque n’est pas un /24.'
        ],
        {
          guidance: 'La partie réseau d’un octet peut utiliser seulement certains de ses bits.',
          pitfall:
            'Remplacer automatiquement le dernier octet par 1 et 254 sans examiner le masque ne suffit pas avec /20.'
        }
      ),
      answer(
        'Corriger la passerelle',
        'Question 3. L’accès local fonctionne et le test vers 172.16.47.254 réussit. Avec la convention de dernière adresse hôte imposée dans le sujet, quelle adresse doit remplacer la passerelle actuelle ? Donne uniquement l’adresse IPv4.',
        '172.16.47.254',
        [
          'Une passerelle directement utilisée par cet hôte doit être joignable dans son sous-réseau.',
          'Compare l’adresse configurée aux limites que tu viens de calculer, puis applique la convention du sujet.'
        ],
        [
          '172.16.48.254 est dans le bloc suivant : elle n’appartient pas au sous-réseau de l’hôte. La machine peut joindre ses voisins locaux, mais sa sortie est mal configurée.',
          'Le test fourni confirme que 172.16.47.254 est joignable. Cette adresse est aussi la dernière adresse hôte du bloc demandé.',
          'Il faut remplacer gateway 172.16.48.254 par gateway 172.16.47.254. C’est la convention de ce sujet ; une passerelle réelle ne porte pas nécessairement la dernière adresse hôte.'
        ],
        {
          guidance:
            'N’accuse pas d’abord le câble ou Internet : confronte la configuration aux calculs et au test fourni.',
          pitfall:
            'L’adresse de diffusion termine aussi le bloc mais ne peut pas servir de passerelle.'
        }
      )
    ],
    takeaway:
      'Le masque détermine les limites. On vérifie ensuite si l’hôte et sa passerelle se trouvent dans le même sous-réseau, en tenant compte de la convention de l’exercice.'
  }
};

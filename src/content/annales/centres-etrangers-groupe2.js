import { answer, python, sql } from './helpers.js';

const models = `class Maison:
    def __init__(self, position):
        self._position = position
    def get_pos_maison(self):
        return self._position

class Antenne:
    def __init__(self, position, rayon):
        self._position = position
        self._rayon = rayon
    def get_pos_antenne(self):
        return self._position
    def get_rayon(self):
        return self._rayon
`;
const palindromeHelpers = `def palindrome(txt):
    return txt == txt[::-1]

def complementaire(txt):
    lettres = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
    return ''.join(lettres[c] for c in txt)

`;
const pension = `CREATE TABLE client(num_client INTEGER PRIMARY KEY, nom_client TEXT, prenom_client TEXT);
CREATE TABLE animal(num_animal INTEGER PRIMARY KEY, nom_animal TEXT, categorie_animal TEXT, taille_animal TEXT, num_client INTEGER REFERENCES client(num_client));
CREATE TABLE cage(num_cage INTEGER PRIMARY KEY, taille_cage TEXT, secteur_cage TEXT);
CREATE TABLE reservation(num_reservation INTEGER PRIMARY KEY, date_debut_reservation TEXT, date_fin_reservation TEXT, num_client INTEGER REFERENCES client(num_client), num_animal INTEGER REFERENCES animal(num_animal), num_cage INTEGER REFERENCES cage(num_cage));
INSERT INTO client VALUES (16,'Dupont','Marc'),(345,'Morel','Fabien'),(141,'Martin','Lina'),(237,'Roux','Paul'),(259,'Petit','Anne'),(342,'Durand','Sara'),(26,'Morel','Luc');
INSERT INTO animal VALUES (22,'Yuki','souris','petit',16),(112,'Balou','chat','moyen',141),(320,'Api','chien','grand',237),(423,'Rex','chien','moyen',259),(491,'Rex','chien','petit',345);
INSERT INTO cage VALUES (12,'petit','chien'),(23,'moyen','chien');
INSERT INTO reservation VALUES (44,'2022-08-23','2022-08-25',16,22,12),(45,'2022-07-11','2022-07-22',345,491,23),(46,'2022-08-11','2022-08-22',345,491,23),(47,'2022-08-23','2022-09-10',345,491,23),(48,'2022-10-11','2022-10-22',345,491,23);`;
const sortHelper = `def clefs_triees_selon_volume(dmatos):
    return sorted(dmatos, key=lambda clef: dmatos[clef]['volume'])

`;
const loadAdapter = `
def tester_remplissage(dmatos, vmax):
    elements = remplissage(dmatos, vmax)
    return [elements, {clef: dico['nb'] for clef, dico in dmatos.items()}]
`;
const material = {
  costume_A: { nb: 3, volume: 2, poids: 1 },
  costume_B: { nb: 1, volume: 6, poids: 2 },
  chaise_bois: { nb: 40, volume: 50, poids: 4 },
  chapeau_A: { nb: 2, volume: 3, poids: 1 },
  chapeau_B: { nb: 4, volume: 7, poids: 1 }
};

export default {
  'annale-2021-groupe2-panier': {
    introduction:
      'Comment transformer une règle commerciale en calcul fiable ? On commence par additionner, puis on distingue une réduction liée à la position d’un article d’une réduction liée à la taille du panier.',
    prerequisites: [
      'Une liste s’indexe à partir de zéro.',
      'Un accumulateur conserve le résultat partiel d’une boucle.',
      'Une baisse de r % multiplie un prix par 1 − r/100.'
    ],
    adaptation:
      'Questions 1a, 1b et 2 de l’exercice 3. Les fonctions sont écrites en entier au lieu de compléter les blancs. Des paniers supplémentaires testent les limites ; aucune réduction ne se cumule avec une autre.',
    context:
      'Un panier est une liste de prix positifs, dans l’ordre choisi par le client. Chaque atelier calcule une offre indépendante. On accepte le panier vide, dont le prix est nul.',
    exercises: [
      python(
        'Additionner les prix',
        'Question 1a. Écris total_hors_reduction(tab), qui renvoie le prix total avant promotion.',
        'total_hors_reduction',
        'def total_hors_reduction(tab):\n    # Parcours les prix\n    pass',
        'def total_hors_reduction(tab):\n    total = 0\n    for prix in tab:\n        total += prix\n    return total',
        [
          [[[]], 0],
          [[[12, 8, 5]], 25],
          [[[30.5, 15, 6, 20, 5, 35, 10.5]], 122]
        ],
        [
          'Quelle valeur représente une somme avant d’avoir lu un prix ?',
          'Ajoute chaque prix une seule fois au résultat partiel.'
        ],
        [
          'Au départ, total vaut zéro. Cela traite aussi le panier vide, car la boucle n’effectue alors aucun tour.',
          'Après chaque tour, total représente la somme des articles déjà parcourus : cet invariant explique la validité de l’accumulation.',
          'Le return se place après la boucle pour additionner tous les articles. Le coût est linéaire en nombre d’articles, avec une mémoire supplémentaire constante.'
        ],
        {
          guidance: 'Trace une colonne prix et une colonne total sur un panier de trois articles.',
          pitfall: 'Un return dans la boucle arrête le calcul au premier article.'
        }
      ),
      python(
        'Appliquer l’offre de bienvenue',
        'Question 1b. Écris offre_bienvenue(tab) : premier article à −20 %, deuxième à −30 %, suivants sans réduction.',
        'offre_bienvenue',
        'def offre_bienvenue(tab):\n    pass',
        'def offre_bienvenue(tab):\n    total = 0\n    for i in range(len(tab)):\n        if i == 0:\n            total += tab[i] * 0.8\n        elif i == 1:\n            total += tab[i] * 0.7\n        else:\n            total += tab[i]\n    return total',
        [
          [[[]], 0],
          [[[20]], 16],
          [[[20, 10]], 23],
          [[[20, 10, 5]], 28]
        ],
        [
          'Identifie les indices des deux positions bénéficiant d’une réduction.',
          'Raisonne sur trois cas : premier, deuxième, puis tous les autres.'
        ],
        [
          'Une réduction de 20 % laisse 80 % du prix, soit le coefficient 0,8 ; une réduction de 30 % laisse le coefficient 0,7.',
          'La boucle par indices permet de choisir le coefficient selon la position, sans accéder à un deuxième article qui n’existerait pas.',
          'Les autres articles gardent leur prix. L’ordre du panier compte : il ne faut donc pas trier la liste avant ce calcul.'
        ],
        {
          guidance: 'Teste séparément zéro, un, deux et trois articles.',
          pitfall: 'Multiplier par 0,2 calcule la remise, pas le prix à payer.'
        }
      ),
      python(
        'Appliquer les soldes au panier entier',
        'Question 2. Écris prix_solde(tab). La réduction globale est de 10 % pour un article, 20 % pour deux, 30 % pour trois, 40 % pour quatre, 50 % pour cinq ou plus.',
        'prix_solde',
        'def prix_solde(tab):\n    pass',
        'def prix_solde(tab):\n    total = 0\n    for prix in tab:\n        total += prix\n    taux = min(len(tab), 5) / 10\n    return total * (1 - taux)',
        [
          [[[]], 0],
          [[[10]], 9],
          [[[10, 10]], 16],
          [[[10, 10, 10, 10]], 24],
          [[[10, 10, 10, 10, 10, 10]], 30]
        ],
        [
          'Sépare le calcul du total et le choix du taux.',
          'Au-delà de cinq articles, le taux ne doit plus augmenter.'
        ],
        [
          'Le montant avant réduction se calcule avec la même accumulation que dans le premier atelier.',
          'Le taux dépend du nombre d’articles, plafonné à cinq : min(len(tab), 5)/10. Une chaîne de conditions équivalente convient aussi.',
          'On multiplie une seule fois le total par 1 − taux. Pour six articles à 10 €, on paie 30 € ; le taux reste de 50 %, et non de 60 %.'
        ],
        {
          guidance:
            'Vérifie particulièrement le passage de quatre à cinq, puis de cinq à six articles.',
          pitfall:
            'Ne combine pas l’offre de bienvenue et les soldes : ce sont deux calculs indépendants.'
        }
      )
    ],
    takeaway:
      'Une règle de prix se traduit en trois décisions : quelles données parcourir, quelle condition appliquer et à quel montant appliquer le coefficient. Les cas limites vérifient le contrat, pas seulement l’exemple principal.'
  },
  'annale-2022-groupe2-adn': {
    introduction:
      'Comparer deux extrémités, transformer chaque lettre, puis composer deux fonctions : ces trois gestes permettent d’étudier une séquence sans mélanger les définitions.',
    prerequisites: [
      'Une chaîne s’indexe comme une liste.',
      'Les chaînes sont immuables : on construit un nouveau résultat.',
      'Un booléen représente la réponse à une propriété.'
    ],
    adaptation:
      'Questions 3, 4a et 4c de l’exercice 4. La dernière étape fournit deux fonctions auxiliaires pour pouvoir être travaillée indépendamment. Les entrées ADN contiennent uniquement A, T, C et G en majuscules.',
    context:
      'Palindrome : chaîne identique dans les deux sens, y compris la chaîne vide. Complémentaire : remplacer A par T, T par A, C par G et G par C, sans changer l’ordre. Dans ce sujet, une séquence est dite palindromique si sa concaténation avec son complémentaire est un palindrome.',
    exercises: [
      python(
        'Comparer les lettres en miroir',
        'Question 3. Écris une fonction palindrome(txt) itérative, sans appel récursif.',
        'palindrome',
        'def palindrome(txt):\n    pass',
        'def palindrome(txt):\n    for i in range(len(txt) // 2):\n        if txt[i] != txt[len(txt) - 1 - i]:\n            return False\n    return True',
        [
          [[''], true],
          [['A'], true],
          [['LAVAL'], true],
          [['ABBA'], true],
          [['ABCA'], false],
          [['AB'], false]
        ],
        [
          'Associe l’indice i à son indice miroir depuis la fin.',
          'Un seul désaccord suffit à conclure ; tous les accords sont nécessaires pour accepter.'
        ],
        [
          'La lettre d’indice i se compare à celle d’indice len(txt) − 1 − i.',
          'Parcourir la première moitié suffit : la seconde répéterait les mêmes comparaisons. En cas de différence, on renvoie immédiatement False.',
          'Si aucune différence n’est trouvée, on renvoie True après la boucle. Pour zéro ou une lettre, aucune comparaison n’est nécessaire.'
        ],
        {
          guidance: 'Numérote les positions de ABBA et relie les paires comparées.',
          pitfall:
            'Accepter dès la première paire égale ignore une éventuelle différence au centre.'
        }
      ),
      python(
        'Construire le complémentaire',
        'Question 4a. Écris complementaire(txt) selon les associations données dans le contexte.',
        'complementaire',
        'def complementaire(txt):\n    pass',
        "def complementaire(txt):\n    correspondance = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}\n    resultat = ''\n    for lettre in txt:\n        resultat += correspondance[lettre]\n    return resultat",
        [
          [[''], ''],
          [['A'], 'T'],
          [['ACGT'], 'TGCA'],
          [['GAATTC'], 'CTTAAG']
        ],
        [
          'Le dictionnaire représente une correspondance entre lettres.',
          'Parcours les lettres de gauche à droite en construisant une nouvelle chaîne.'
        ],
        [
          'Chaque lettre doit produire exactement une lettre complémentaire. Un dictionnaire évite une répétition de conditions.',
          'On ajoute les lettres transformées dans le même ordre : complémenter ne signifie pas inverser.',
          'La longueur est conservée. Appliquer deux fois cette transformation redonne la chaîne initiale, ce qui fournit un test supplémentaire utile.'
        ],
        {
          guidance: 'Écris sous chaque lettre sa lettre associée avant de programmer.',
          pitfall: 'Inverser la chaîne à cette étape change la transformation demandée.'
        }
      ),
      python(
        'Composer les deux propriétés',
        'Question 4c. Écris est_palindromique(txt). Les fonctions palindrome et complementaire sont fournies ; utilise la définition du sujet.',
        'est_palindromique',
        `${palindromeHelpers}def est_palindromique(txt):\n    pass`,
        `${palindromeHelpers}def est_palindromique(txt):\n    return palindrome(txt + complementaire(txt))`,
        [
          [[''], true],
          [['GAATTC'], true],
          [['GAAT'], false],
          [['GATCGT'], false],
          [['AT'], true],
          [['A'], false]
        ],
        [
          'Décris la chaîne que tu dois examiner avant d’appeler le test de palindrome.',
          'Le symbole + concatène deux chaînes sans modifier leurs lettres.'
        ],
        [
          'La définition porte sur txt suivi de son complémentaire, pas sur txt seul.',
          'On construit donc txt + complementaire(txt), puis on transmet cette nouvelle chaîne à palindrome.',
          'Le résultat est directement le booléen renvoyé par cette fonction. Cette composition garde séparées la transformation et la vérification.'
        ],
        {
          guidance: 'Traduis la définition en une suite : transformer, concaténer, tester.',
          pitfall:
            'Une séquence palindromique au sens du sujet n’est pas forcément elle-même un palindrome.'
        }
      )
    ],
    takeaway:
      'Nommer les transformations et préciser leurs contrats permet de les composer sans ambiguïté. Les tests courts distinguent palindrome ordinaire, complémentaire et séquence palindromique.'
  },
  'annale-2023-groupe2-pension': {
    introduction:
      'Un même nom peut désigner plusieurs animaux ; un même client peut réserver plusieurs fois. On apprend à suivre les identifiants plutôt qu’à joindre les tables par leurs noms.',
    prerequisites: [
      'WHERE sélectionne les lignes qui satisfont une condition.',
      'Une clé primaire identifie une ligne.',
      'Une clé étrangère relie une ligne à une autre table.'
    ],
    adaptation:
      'Questions 2a, 2b et 2c de l’exercice 2. La question de lecture 2a devient une requête exécutable. Les extraits sont complétés par des clients fictifs pour assurer les références ; les coordonnées et tables inutiles sont omises. Le client 342 existe. Chaque atelier repart de la base initiale.',
    context:
      'Tables disponibles : client(num_client,nom_client,prenom_client), animal(num_animal,nom_animal,categorie_animal,taille_animal,num_client), cage(num_cage,taille_cage,secteur_cage), reservation(num_reservation,date_debut_reservation,date_fin_reservation,num_client,num_animal,num_cage). La cage 23 a été réservée plusieurs fois par le client 345. Les noms d’animaux peuvent être identiques.',
    exercises: [
      sql(
        'Sélectionner les chiens',
        'Question 2a adaptée. Écris la requête qui renvoie seulement les noms des animaux de catégorie chien. Garde les doublons ; l’ordre des lignes est libre.',
        pension,
        "SELECT nom_animal FROM animal WHERE categorie_animal = 'chien';",
        [['Api'], ['Rex'], ['Rex']],
        [
          'La catégorie est une condition sur les lignes, pas une colonne à afficher.',
          'Deux animaux peuvent porter le même nom sans être la même ligne.'
        ],
        [
          "FROM animal choisit la table ; WHERE categorie_animal = 'chien' élimine les autres catégories.",
          'SELECT nom_animal ne garde que la colonne demandée.',
          'Les résultats sont Api, Rex et Rex. Sans DISTINCT, les deux animaux nommés Rex restent bien deux lignes distinctes.'
        ],
        {
          guidance:
            'Distingue la colonne utilisée pour filtrer de celle que tu souhaites afficher.',
          pitfall: 'DISTINCT supprimerait ici une occurrence attendue de Rex.'
        }
      ),
      sql(
        'Remonter d’une réservation au client',
        'Question 2b. Affiche nom_client pour les clients ayant réservé la cage 23. Une ligne par client : supprime les répétitions causées par ses réservations.',
        pension,
        'SELECT DISTINCT client.nom_client FROM client JOIN reservation ON client.num_client = reservation.num_client WHERE reservation.num_cage = 23;',
        [['Morel']],
        [
          'Quelle table indique la cage, et quelle table contient le nom du client ?',
          'Relie les identifiants de client avant de filtrer la cage.'
        ],
        [
          'La relation reservation porte num_cage et num_client. La jointure sur num_client permet de retrouver le nom dans client.',
          'Le filtre num_cage = 23 conserve les quatre réservations du client 345.',
          'DISTINCT évite de répéter Morel quatre fois. Pour distinguer des clients homonymes dans une vraie liste de personnes, on conserverait aussi leur identifiant.'
        ],
        {
          guidance:
            'Dessine le trajet cage → réservation → client et écris la condition de jointure.',
          pitfall:
            'Joindre sur un nom confondrait les homonymes ; les identifiants sont faits pour relier les tables.'
        }
      ),
      sql(
        'Enregistrer Suki',
        'Question 2c. Insère l’animal 492, Suki, un chat de taille petit appartenant au client 342. La vérification porte sur la ligne insérée.',
        pension,
        "INSERT INTO animal(num_animal, nom_animal, categorie_animal, taille_animal, num_client) VALUES (492, 'Suki', 'chat', 'petit', 342);",
        [[492, 'Suki', 'chat', 'petit', 342]],
        [
          'Associe chaque valeur à sa colonne avant d’écrire VALUES.',
          'Les chaînes sont entre apostrophes ; les identifiants sont des entiers.'
        ],
        [
          'La liste explicite des colonnes sécurise la correspondance avec les valeurs.',
          '492 identifie le nouvel animal ; 342 référence le propriétaire déjà enregistré.',
          'INSERT INTO animal(...) VALUES(...) ajoute une ligne. Le test relit cette ligne pour vérifier toutes les données, pas seulement l’absence d’erreur SQL.'
        ],
        {
          verifyQuery:
            'SELECT num_animal, nom_animal, categorie_animal, taille_animal, num_client FROM animal WHERE num_animal = 492;',
          guidance: 'Relis la paire colonne/valeur pour éviter de permuter taille et catégorie.',
          pitfall: 'Le propriétaire existe déjà : on ajoute un animal, pas un nouveau client.'
        }
      )
    ],
    takeaway:
      'Une requête s’explique en séparant table de départ, lien entre identifiants, condition de sélection et colonnes affichées. Les doublons se traitent selon le sens du résultat attendu.'
  },
  'annale-2024-groupe2-antennes': {
    introduction:
      'Pour couvrir une rue, on transforme d’abord des positions en objets, on définit précisément la couverture, puis on choisit où placer la prochaine antenne.',
    prerequisites: [
      'Un constructeur crée un objet avec ses attributs.',
      'Un accesseur lit une information sans accéder directement à l’attribut.',
      'La distance sur une droite vaut la valeur absolue de la différence des positions.'
    ],
    adaptation:
      'Questions 4, 5 et 8 de l’exercice 1. Des adaptateurs convertissent les objets en positions ou booléens pour les tests. La troisième étape fournit couvre pour rester indépendante. Les maisons sont triées ; le cas vide est ajouté. Le rayon est positif ou nul.',
    context:
      'Maison(position) propose get_pos_maison(). Antenne(position,rayon) propose get_pos_antenne() et get_rayon(). Une maison est couverte si sa distance à l’antenne ne dépasse pas le rayon, borne incluse. Les méthodes et fonctions à écrire sont précisées dans chaque atelier.',
    exercises: [
      python(
        'Construire la rue',
        'Question 4. Écris creation_rue(pos) : trie pos sur place et renvoie les objets Maison correspondants. L’adaptateur affiche leurs positions.',
        'tester_rue',
        `${models}\ndef creation_rue(pos):\n    pass\n\ndef tester_rue(pos):\n    return [m.get_pos_maison() for m in creation_rue(pos)]`,
        `${models}\ndef creation_rue(pos):\n    pos.sort()\n    maisons = []\n    for p in pos:\n        maisons.append(Maison(p))\n    return maisons\n\ndef tester_rue(pos):\n    return [m.get_pos_maison() for m in creation_rue(pos)]`,
        [
          [[[]], []],
          [[[3.5, 1]], [1, 3.5]],
          [[[4, 0, 2]], [0, 2, 4]]
        ],
        [
          'La liste attendue contient des objets, pas seulement les nombres de départ.',
          'Après le tri, crée une Maison pour chaque position parcourue.'
        ],
        [
          'pos.sort() remet les positions dans l’ordre et modifie la liste existante ; son résultat de retour ne doit pas être utilisé comme liste.',
          'Pour chaque position p, Maison(p) construit un objet, ajouté à maisons.',
          'La fonction renvoie cette liste d’objets. L’adaptateur ne fait que lire leurs positions pour rendre les résultats visibles dans les tests.'
        ],
        {
          guidance:
            'Écris le type de pos puis celui de maisons ; ils ne contiennent pas les mêmes éléments.',
          pitfall:
            'Renvoyer pos conserve des nombres : les accesseurs ne seront alors pas disponibles.'
        }
      ),
      python(
        'Définir la couverture',
        'Question 5. Ajoute la méthode couvre(self,maison) dans Antenne. Lis la position de la maison avec son accesseur. L’adaptateur reçoit position, rayon et position de maison.',
        'tester_couverture',
        `${models}    def couvre(self, maison):\n        pass\n\ndef tester_couverture(position, rayon, maison):\n    return Antenne(position, rayon).couvre(Maison(maison))`,
        `${models}    def couvre(self, maison):\n        return abs(self.get_pos_antenne() - maison.get_pos_maison()) <= self.get_rayon()\n\ndef tester_couverture(position, rayon, maison):\n    return Antenne(position, rayon).couvre(Maison(maison))`,
        [
          [[2.5, 1, 1], false],
          [[2.5, 1, 4], false],
          [[2.5, 1, 3.5], true],
          [[2.5, 1, 1.5], true],
          [[2, 0, 2], true]
        ],
        [
          'Une distance doit être positive, quel que soit l’ordre des positions.',
          'Vérifie une maison située exactement à la limite du rayon.'
        ],
        [
          'La différence de positions peut être négative : abs donne la distance réelle.',
          'La couverture inclut la limite : on compare donc avec <=, pas seulement <.',
          'L’accesseur get_pos_maison évite de lire directement un attribut d’une autre classe. La méthode renvoie le booléen de la comparaison.'
        ],
        {
          guidance: 'Place mentalement une maison à gauche puis à droite à la même distance.',
          pitfall:
            'Tester seulement une différence signée couvre à tort toutes les maisons d’un côté.'
        }
      ),
      python(
        'Décaler chaque nouvelle antenne',
        'Question 8. Écris strategie_2(maisons,rayon). Parcours les maisons triées ; si une maison n’est pas encore couverte, place une antenne à sa position + rayon. Renvoie les antennes. L’adaptateur affiche leurs positions.',
        'tester_strategie',
        `${models}    def couvre(self, maison):\n        return abs(self._position - maison.get_pos_maison()) <= self._rayon\n\ndef strategie_2(maisons, rayon):\n    pass\n\ndef tester_strategie(positions, rayon):\n    maisons = [Maison(p) for p in positions]\n    return [a.get_pos_antenne() for a in strategie_2(maisons, rayon)]`,
        `${models}    def couvre(self, maison):\n        return abs(self._position - maison.get_pos_maison()) <= self._rayon\n\ndef strategie_2(maisons, rayon):\n    antennes = []\n    for maison in maisons:\n        if not antennes or not antennes[-1].couvre(maison):\n            antennes.append(Antenne(maison.get_pos_maison() + rayon, rayon))\n    return antennes\n\ndef tester_strategie(positions, rayon):\n    maisons = [Maison(p) for p in positions]\n    return [a.get_pos_antenne() for a in strategie_2(maisons, rayon)]`,
        [
          [[[], 2], []],
          [
            [[0, 2, 3, 4, 5, 7, 9, 10.5, 11.5], 2],
            [2, 7, 12.5]
          ],
          [
            [[1, 1, 3], 0],
            [1, 3]
          ],
          [[[0, 4], 2], [2]]
        ],
        [
          'Garde la dernière antenne pour tester la maison courante.',
          'Avant toute création, traite aussi le cas où aucune antenne n’existe encore.'
        ],
        [
          'Pour la première maison non couverte à x, une antenne doit rester au plus à x + rayon. Cette position maximise sa portée vers les maisons suivantes.',
          'On ajoute donc Antenne(x + rayon, rayon), puis on continue. Comme les maisons sont triées, la dernière antenne est celle qui s’étend le plus à droite.',
          'Sur la rue proposée avec rayon 2, les antennes sont en 2, 7 et 12,5. Après le tri, le parcours est linéaire : chaque maison est examinée une fois.'
        ],
        {
          guidance:
            'Trace l’intervalle couvert après chaque nouvelle antenne avant de passer à la maison suivante.',
          pitfall:
            'Placer l’antenne sur la maison applique la première stratégie, pas la stratégie améliorée.'
        }
      )
    ],
    takeaway:
      'Le choix glouton se justifie ici par la première maison non couverte : déplacer l’antenne au maximum vers la droite la couvre encore et ne pénalise aucune maison à venir. Cette justification est nécessaire ; un choix local n’est pas toujours optimal dans d’autres problèmes.'
  },
  'annale-2025-groupe2-terminaison': {
    introduction:
      'Observer quelques tours d’une boucle aide à comprendre son évolution, mais ne prouve pas toujours son arrêt. On distingue une preuve sur un programme précis d’une tentative de détecteur général.',
    prerequisites: [
      'La condition while est testée avant chaque tour.',
      'Une affectation remplace la valeur précédente.',
      'Du code peut être stocké sous forme de chaîne sans être exécuté.'
    ],
    adaptation:
      'Questions 1, 3 et 6 de l’exercice 1. Les justifications sont travaillées avec des conseils puis expliquées après réussite ; seules les valeurs et classifications sont vérifiées automatiquement. Aucune boucle potentiellement infinie n’est exécutée pour classer les programmes. La dernière fonction analyse une chaîne sans exec.',
    context:
      'Programme 1 : x=10, y=10 ; tant que x>0 : x=x−1 puis y=y+1.\nProgrammes 3 à 6 : chacun commence par x=10.\n3 : tant que x != 0, faire x=x−2.\n4 : tant que x>0, faire x=x+2.\n5 : tant que x<0, faire x=x+4.\n6 : tant que x != 0, faire x=x−4.\nCes programmes sont à étudier sur papier, sans lancer de boucle infinie.',
    exercises: [
      answer(
        'Suivre deux variables',
        'Question 1. Après le programme 1, donne [x,y] sous forme de liste JSON.',
        '[0,20]',
        [
          'Observe comment les deux variables évoluent à chaque tour.',
          'Détermine le premier x qui rend la condition fausse, puis compte les tours.'
        ],
        [
          'x diminue de 1 à chaque tour. Partant de 10, il atteint 0 après dix tours ; la condition x>0 devient alors fausse.',
          'y augmente de 1 pendant ces mêmes dix tours : sa valeur passe de 10 à 20.',
          'Le résultat est [0,20]. La somme x+y reste constante et fournit un contrôle indépendant de la trace.'
        ],
        {
          guidance: 'Fais un tableau avec l’état initial, le premier tour et le dernier tour.',
          pitfall:
            'Le dernier test de condition ne modifie pas les variables : il ne compte pas comme un tour.'
        }
      ),
      answer(
        'Décider pour quatre boucles précises',
        'Question 3. Dans l’ordre 3, 4, 5, 6, donne une liste JSON de booléens : true si le programme termine, false sinon.',
        '[true,false,true,false]',
        [
          'Teste d’abord chaque condition avec la valeur initiale.',
          'Pour les boucles exécutées, demande-toi si les valeurs successives peuvent réellement rendre le test faux.'
        ],
        [
          'Le programme 3 atteint 0 en retirant 2 cinq fois ; il termine. Le programme 4 augmente une valeur déjà positive : son test reste vrai.',
          'Le programme 5 termine sans aucun tour : 10<0 est faux dès le début.',
          'Le programme 6 suit 10,6,2,−2,… et ne vaut jamais 0 : toutes ses valeurs sont congrues à 2 modulo 4. La classification est [true,false,true,false].'
        ],
        {
          guidance:
            'Pour chaque boucle, écris soit un nombre de tours, soit une propriété qui maintient le test vrai.',
          pitfall:
            'Une valeur qui décroît ne garantit pas l’arrêt si la condition exige d’atteindre exactement zéro.'
        }
      ),
      python(
        'Programmer une heuristique, puis en discuter',
        'Question 6. Écris arret_essai2(programme) : renvoie True si le texte ne contient pas la sous-chaîne exacte "while", False sinon. Cette règle textuelle est une heuristique à étudier, pas une preuve de terminaison. N’exécute pas le programme reçu.',
        'arret_essai2',
        'def arret_essai2(programme):\n    pass',
        "def arret_essai2(programme):\n    return 'while' not in programme",
        [
          [['print(7)'], true],
          [['while False:\n    pass'], false],
          [['# while dans un commentaire'], false],
          [['def f():\n    return f()\nf()'], true]
        ],
        [
          'Le paramètre est du texte : la recherche porte sur les caractères, sans interprétation Python.',
          'L’opérateur in teste la présence d’une sous-chaîne ; réfléchis au booléen inverse.'
        ],
        [
          "L’expression 'while' in programme détecte le texte recherché. Le contrat demande son contraire : 'while' not in programme.",
          'Une boucle while False termine, mais l’heuristique répond False. Un commentaire contenant while produit aussi cette réponse : la règle ignore la syntaxe.',
          'Une boucle for parcourant un itérateur infini peut continuer sans contenir while. L’heuristique renverrait True à tort : elle respecte son contrat textuel, mais ne décide pas la terminaison.'
        ],
        {
          guidance:
            'Teste une chaîne contenant le mot dans un commentaire pour vérifier que tu respectes bien le contrat textuel.',
          pitfall:
            'exec lancerait le programme reçu : il ne faut pas l’utiliser pour une analyse de texte.'
        }
      )
    ],
    takeaway:
      'Question 7 : la présence de while ne suffit pas à conclure, car while False termine. Son absence ne garantit pas l’arrêt : « from itertools import count », suivi de « for n in count(): pass », parcourt une suite infinie sans contenir ce mot. Il n’est pas nécessaire d’exécuter cet exemple pour le comprendre. Dans le modèle théorique du problème de l’arrêt, aucun algorithme qui termine toujours ne décide la terminaison de tous les programmes. La preuve par paradoxe du sujet n’est pas intégralement traitée ici.'
  },
  'annale-2026-groupe2-chargement': {
    introduction:
      'Une quantité, un volume unitaire et un volume total ne désignent pas la même chose. On apprend à lire des dictionnaires imbriqués, puis à maintenir un chargement et un stock cohérents.',
    prerequisites: [
      'Un dictionnaire associe une clé à une valeur.',
      'Une valeur peut être elle-même un dictionnaire.',
      'Modifier une quantité dans un objet reçu a un effet sur cet objet.'
    ],
    adaptation:
      'Questions 6, 7 et 10 de la partie B de l’exercice 1. Le script 6 est encapsulé dans total_elements. Pour 7, les deux tableaux sont renvoyés dans une liste plutôt qu’un tuple. Pour 10, le tri est fourni ; les tests vérifient le chargement et les quantités restantes avec tester_remplissage. Les volumes sont strictement positifs, les quantités et la capacité sont positives ou nulles. Les volumes des types de matériel sont distincts dans les tests.',
    context: `Chaque type de matériel a nb exemplaires, un volume unitaire et un poids unitaire. Exemple de données du sujet :\n${JSON.stringify(material, null, 2)}\nLa capacité du véhicule concerne le volume, pas le poids. Chaque test repart d’un stock neuf.`,
    exercises: [
      python(
        'Compter les éléments, pas les catégories',
        'Question 6 adaptée. Écris total_elements(dmatos) qui additionne les quantités nb de tous les types de matériel.',
        'total_elements',
        'def total_elements(dmatos):\n    pass',
        "def total_elements(dmatos):\n    total = 0\n    for clef in dmatos:\n        total += dmatos[clef]['nb']\n    return total",
        [
          [[{}], 0],
          [[{ robe: { nb: 2, volume: 3, poids: 1 }, banc: { nb: 4, volume: 8, poids: 5 } }], 6],
          [[{ lampe: { nb: 0, volume: 2, poids: 1 } }], 0]
        ],
        [
          'Quel niveau de dictionnaire contient la quantité d’un type de matériel ?',
          'Compare le nombre de clés au nombre d’exemplaires : ils n’ont pas la même signification.'
        ],
        [
          'La boucle sur dmatos donne les clés des catégories. dmatos[clef] fournit le dictionnaire décrivant une catégorie.',
          "La quantité est ensuite accessible avec ['nb']. On l’ajoute à un accumulateur initialisé à zéro.",
          'len(dmatos) compterait les catégories, pas les objets à transporter. Le parcours des catégories suffit et ne nécessite pas de créer une liste de tous les exemplaires.'
        ],
        {
          guidance: 'Écris d’abord le chemin complet qui mène à une quantité dans un exemple.',
          pitfall:
            'Additionner les volumes ou le nombre de catégories ne répond pas au comptage demandé.'
        }
      ),
      python(
        'Conserver la correspondance clé-volume',
        'Question 7. Écris tab_clefs_tab_volumes(dmatos). Renvoie [liste_des_cles,liste_des_volumes_unitaires] dans l’ordre du dictionnaire, avec la même correspondance par indice.',
        'tab_clefs_tab_volumes',
        'def tab_clefs_tab_volumes(dmatos):\n    pass',
        "def tab_clefs_tab_volumes(dmatos):\n    clefs = []\n    volumes = []\n    for clef, dico in dmatos.items():\n        clefs.append(clef)\n        volumes.append(dico['volume'])\n    return [clefs, volumes]",
        [
          [[{}], [[], []]],
          [
            [{ rideau: { nb: 4, volume: 9, poids: 2 }, lampe: { nb: 2, volume: 3, poids: 1 } }],
            [
              ['rideau', 'lampe'],
              [9, 3]
            ]
          ],
          [[{ banc: { nb: 0, volume: 7, poids: 5 } }], [['banc'], [7]]]
        ],
        [
          'items() donne la clé et sa valeur pendant le même tour de boucle.',
          'Ajoute les deux informations correspondantes au même moment.'
        ],
        [
          "Pour chaque paire clef,dico, on ajoute clef au premier tableau et dico['volume'] au second.",
          'Les deux listes ont donc toujours la même longueur et leurs indices désignent le même type de matériel.',
          'Il s’agit du volume unitaire : on ne multiplie pas par nb et on n’élimine pas les catégories de quantité nulle. Le renvoi en liste est seulement une adaptation des tests JSON.'
        ],
        {
          guidance: 'Contrôle que le volume d’indice i correspond bien à la clé d’indice i.',
          pitfall: 'Trier une seule des deux listes détruit la correspondance.'
        }
      ),
      python(
        'Remplir sans dépasser la capacité',
        'Question 10. Écris remplissage(dmatos,vmax). Considère les catégories par volume unitaire décroissant. Charge un exemplaire tant qu’il en reste et qu’il tient ; sinon passe à la catégorie suivante. Renvoie les clés chargées et décrémente les nb dans dmatos. Le tri et l’adaptateur sont fournis.',
        'tester_remplissage',
        `${sortHelper}def remplissage(dmatos, vmax):\n    pass\n${loadAdapter}`,
        `${sortHelper}def remplissage(dmatos, vmax):\n    volume = 0\n    clefs = clefs_triees_selon_volume(dmatos)\n    i = len(clefs) - 1\n    elements = []\n    while i >= 0 and volume < vmax:\n        clef = clefs[i]\n        if dmatos[clef]['nb'] == 0:\n            i -= 1\n        elif volume + dmatos[clef]['volume'] <= vmax:\n            volume += dmatos[clef]['volume']\n            elements.append(clef)\n            dmatos[clef]['nb'] -= 1\n        else:\n            i -= 1\n    return elements\n${loadAdapter}`,
        [
          [
            [{}, 10],
            [[], {}]
          ],
          [
            [{ grand: { nb: 2, volume: 8, poids: 1 }, petit: { nb: 3, volume: 3, poids: 1 } }, 14],
            [['grand', 'petit', 'petit'], { grand: 1, petit: 1 }]
          ],
          [
            [{ grand: { nb: 1, volume: 8, poids: 1 }, petit: { nb: 2, volume: 3, poids: 1 } }, 6],
            [['petit', 'petit'], { grand: 1, petit: 0 }]
          ],
          [
            [{ objet: { nb: 2, volume: 4, poids: 1 } }, 0],
            [[], { objet: 2 }]
          ],
          [
            [{ objet: { nb: 0, volume: 4, poids: 1 } }, 10],
            [[], { objet: 0 }]
          ]
        ],
        [
          'Garde le volume déjà chargé et l’indice de la catégorie en cours.',
          'À chaque tour, il faut soit diminuer une quantité, soit avancer vers une autre catégorie.'
        ],
        [
          'On trie les clés par volume croissant, puis on les lit depuis la fin. Les catégories vides sont ignorées.',
          'Avant tout ajout, on vérifie volume + volume_unitaire <= vmax. Un ajout met à jour ensemble le volume chargé, la liste et le stock ; on garde la même catégorie pour éventuellement charger un autre exemplaire.',
          'Si un objet ne tient pas, on passe à une catégorie plus petite. La boucle termine car chaque tour diminue le stock restant ou l’indice. Cette stratégie gloutonne respecte la capacité mais ne garantit pas le remplissage optimal.'
        ],
        {
          guidance:
            'Sur papier, suis quatre colonnes : catégorie, volume chargé, quantité restante et liste chargée.',
          pitfall:
            'Passer à la catégorie suivante après chaque ajout empêche de charger plusieurs exemplaires ; oublier de décrémenter le stock rend le résultat incohérent.'
        }
      )
    ],
    takeaway:
      'Le stock et le chargement doivent décrire la même opération. Le glouton choisit le plus gros objet qui tient ; il peut laisser de la place qu’une autre combinaison aurait remplie. Par exemple, pour une capacité de 6, un objet de volume 4 peut bloquer deux objets de volume 3 : faisabilité et optimalité sont deux propriétés différentes.'
  }
};

import { answer, python } from './helpers.js';
import practical2025 from './practical-2025.js';

const tree = {
  F: ['B', 'G'],
  B: ['A', 'D'],
  A: ['', ''],
  D: ['C', 'E'],
  C: ['', ''],
  E: ['', ''],
  G: ['', 'I'],
  I: ['', 'H'],
  H: ['', '']
};
const swapStarter = `def echange(tab, i, j):
    # Modifie tab sur place
    pass

def tester_echange(tab, i, j):
    echange(tab, i, j)
    return tab`;
const sortStarter = `def tri_selection(tab):
    # Trie tab sur place par sélection
    pass

def tester_tri(tab):
    tri_selection(tab)
    return tab`;

export default {
  ...practical2025,
  'annale-2023-pratique-vote': {
    introduction:
      'Deux situations différentes demandent un parcours de liste : vérifier un ordre et compter des bulletins. Le dernier atelier apprend à conserver tous les gagnants lorsqu’il y a égalité.',
    prerequisites: [
      'Une liste a des indices allant de 0 à len(liste)-1.',
      'Un dictionnaire associe chaque clé à une valeur.',
      'Un test conditionnel peut arrêter une fonction avec return.'
    ],
    adaptation:
      'Les deux exercices sont reformulés ; le second est scindé entre depouille et vainqueur. On conserve leurs contrats. Les fonctions sont à écrire au lieu de recopier le code à trous ; le cas vide de vote est un complément pédagogique dont le résultat attendu est annoncé.',
    context:
      'Le tableau numérique de verifie est non vide et l’ordre croissant autorise les égalités.\nUn bulletin vaut A, B ou C. Le dépouillement associe chaque issue rencontrée à son nombre de bulletins.\nLe résultat des gagnants est une liste, pas un seul nom.',
    exercises: [
      python(
        'Vérifier un ordre croissant',
        'Exercice 1. Programme verifie(tab) : renvoie True si les valeurs de ce tableau non vide sont dans l’ordre croissant au sens large, False sinon. Évite de trier pour vérifier : examine les voisins.',
        'verifie',
        'def verifie(tab):\n    # Compare les cases voisines\n    pass',
        `def verifie(tab):
    for i in range(len(tab) - 1):
        if tab[i] > tab[i + 1]:
            return False
    return True`,
        [
          [[[0, 5, 8, 8, 9]], true],
          [[[8, 12, 4]], false],
          [[[-1, 4]], true],
          [[[5]], true],
          [[[3, 3]], true],
          [[[2, 1]], false]
        ],
        [
          'Une seule paire de voisins dans le mauvais ordre suffit à rejeter le tableau.',
          'Regarde la dernière case que tu peux comparer à sa voisine de droite sans sortir du tableau.'
        ],
        [
          'Pour chaque i de 0 à len(tab)-2, on compare tab[i] à tab[i+1]. Si la première valeur est strictement plus grande, le tableau n’est pas trié.',
          'Si aucune paire ne contredit l’ordre, la réponse est True après le parcours. Les égalités restent autorisées : [3,3] est trié.',
          'Avec une seule valeur, il n’existe aucune paire à rejeter : la boucle ne fait aucun tour et renvoie True. Le coût est linéaire au pire, avec un arrêt plus tôt possible.'
        ],
        {
          guidance: 'Commence par un tableau de deux valeurs, puis un tableau d’une seule valeur.',
          pitfall: 'Un return True dans la boucle n’inspecterait que la première paire correcte.'
        }
      ),
      python(
        'Compter les bulletins',
        'Exercice 2, première fonction. Écris depouille(urne), qui renvoie le dictionnaire des effectifs des issues présentes. Chaque bulletin vaut A, B ou C. Complément de test : une urne vide donne {}.',
        'depouille',
        'def depouille(urne):\n    resultat = {}\n    pass',
        `def depouille(urne):
    resultat = {}
    for bulletin in urne:
        if bulletin in resultat:
            resultat[bulletin] += 1
        else:
            resultat[bulletin] = 1
    return resultat`,
        [
          [[['A', 'A', 'A', 'B', 'C', 'B', 'C', 'B', 'C', 'B']], { A: 3, B: 4, C: 3 }],
          [[['C']], { C: 1 }],
          [[[]], {}],
          [[['B', 'B', 'A']], { B: 2, A: 1 }]
        ],
        [
          'Au premier bulletin d’un candidat, sa clé n’existe pas encore.',
          'Après chaque bulletin, la somme des compteurs doit augmenter d’une unité.'
        ],
        [
          'Un dictionnaire vide ne contient aucune issue comptée. Le premier bulletin d’une issue crée son entrée avec la valeur 1.',
          'Les bulletins suivants de cette issue augmentent le compteur. Le résultat ne dépend pas de l’ordre de stockage des clés.',
          'Dans l’urne d’exemple, on obtient A:3, B:4, C:3. La somme vaut 10, comme le nombre de bulletins : c’est un contrôle utile pour repérer un oubli ou un double comptage.'
        ],
        {
          guidance: 'Fais à la main trois bulletins A, B, A et observe quand une clé apparaît.',
          pitfall:
            'Écrire resultat[bulletin] += 1 sans création préalable provoque une erreur sur la première occurrence.'
        }
      ),
      python(
        'Garder tous les ex æquo',
        'Exercice 2, seconde fonction. Écris vainqueur(election), qui renvoie tous les noms ayant l’effectif maximal, dans l’ordre de parcours du dictionnaire. Complément de test : un dictionnaire vide donne [].',
        'vainqueur',
        'def vainqueur(election):\n    # Détermine le maximum puis récupère tous les noms correspondants\n    pass',
        `def vainqueur(election):
    nmax = 0
    for candidat in election:
        if election[candidat] > nmax:
            nmax = election[candidat]
    return [nom for nom in election if election[nom] == nmax]`,
        [
          [[{ A: 3, B: 4, C: 3 }], ['B']],
          [[{ A: 4, B: 4, C: 1 }], ['A', 'B']],
          [[{ C: 7 }], ['C']],
          [[{}], []]
        ],
        [
          'Un seul nom mémorisé pendant la recherche du maximum ne suffit pas en cas d’égalité.',
          'Sépare deux tâches : trouver l’effectif maximal, puis sélectionner les noms qui l’atteignent.'
        ],
        [
          'Le premier parcours détermine seulement le nombre maximal de voix. Avec des effectifs positifs, on peut commencer à 0.',
          'Le second parcours compare chaque effectif au maximum et ajoute tous les noms correspondants. Il ne choisit pas arbitrairement un seul candidat.',
          'Pour A:4, B:4, C:1, la réponse est [A,B]. Deux parcours successifs restent linéaires : on additionne leurs coûts, on ne les multiplie pas.'
        ],
        {
          guidance:
            'Teste un gagnant unique puis deux gagnants à égalité ; ce ne sont pas des cas interchangeables.',
          pitfall: 'Ne conserver que le dernier nom ayant battu le record perd les ex æquo.'
        }
      )
    ],
    takeaway:
      'Un parcours sert à chercher une anomalie, à accumuler des effectifs ou à sélectionner des maxima. Le bon invariant dépend du résultat demandé.'
  },
  'annale-2024-pratique-arbres': {
    introduction:
      'Pour compter un arbre, on combine la racine et les deux sous-arbres. Pour trier, on réduit aussi une zone encore à traiter, mais on agit cette fois sur les cases d’un tableau.',
    prerequisites: [
      'Un dictionnaire peut représenter les enfants de chaque nœud.',
      'La récursivité exige un cas de base et des appels sur des problèmes plus petits.',
      'Modifier une liste sur place signifie changer la liste reçue, pas seulement une copie locale.'
    ],
    adaptation:
      'Les deux exercices du sujet 01 sont couverts : taille, échange et tri. Le dictionnaire d’arbre et le tableau d’exemple sont conservés. Des fonctions tester_echange et tester_tri sont ajoutées pour observer les modifications sur place dans le moteur de tests ; elles ne font pas partie du sujet officiel.',
    context: `Arbre fourni :\n${JSON.stringify(tree, null, 2)}\nUn enfant absent est représenté par la chaîne vide ''.\nTableau d’exemple : [41,55,21,18,12,6,25]`,
    exercises: [
      python(
        'Compter les nœuds par récursivité',
        'Exercice 1. Écris taille(arbre, lettre) : le dictionnaire associe un nœud à [enfant_gauche,enfant_droit]. Renvoie le nombre de nœuds du sous-arbre enraciné en lettre. Tu peux traiter lettre="" comme un sous-arbre vide.',
        'taille',
        'def taille(arbre, lettre):\n    # Cas vide puis combinaison des enfants\n    pass',
        `def taille(arbre, lettre):
    if lettre == '':
        return 0
    gauche, droite = arbre[lettre]
    return 1 + taille(arbre, gauche) + taille(arbre, droite)`,
        [
          [[tree, 'F'], 9],
          [[tree, 'B'], 5],
          [[tree, 'I'], 2],
          [[tree, 'A'], 1],
          [[{ R: ['', ''] }, 'R'], 1],
          [[{}, ''], 0]
        ],
        [
          'Que doit compter un sous-arbre sans racine ? Et une racine sans enfants ?',
          'Le dictionnaire complet reste le même : c’est la lettre de la racine examinée qui change.'
        ],
        [
          "Le cas lettre vide renvoie 0 avant de lire une clé du dictionnaire : sinon arbre[''] provoquerait une erreur.",
          'Pour un nœud existant, le 1 compte la racine. On ajoute les tailles des deux enfants, même lorsqu’un seul côté est présent.',
          'F donne 1+5+3=9. I donne 1+0+1=2. Chaque nœud est compté une fois : le temps est linéaire dans la taille du sous-arbre, la pile d’appels dépend de sa hauteur.'
        ],
        {
          guidance: 'Déroule d’abord une feuille, puis un parent ayant un seul enfant.',
          pitfall:
            'len(arbre) compterait tout le dictionnaire, même quand on demande seulement le sous-arbre B.'
        }
      ),
      python(
        'Échanger sans perdre une valeur',
        'Exercice 2, fonction echange. Complète echange(tab,i,j) pour permuter ces deux cases sur place. Garde tester_echange, qui renvoie la liste après ton appel uniquement pour les tests.',
        'tester_echange',
        swapStarter,
        swapStarter.replace(
          '    # Modifie tab sur place\n    pass',
          '    temp = tab[i]\n    tab[i] = tab[j]\n    tab[j] = temp'
        ),
        [
          [
            [[41, 55, 21, 18, 12, 6, 25], 0, 5],
            [6, 55, 21, 18, 12, 41, 25]
          ],
          [
            [[1, 2], 0, 1],
            [2, 1]
          ],
          [[[7], 0, 0], [7]],
          [
            [[3, 3], 0, 1],
            [3, 3]
          ]
        ],
        [
          'Après la première affectation, l’ancienne valeur de cette case ne doit pas être perdue.',
          'Un échange d’une case avec elle-même doit laisser le tableau identique.'
        ],
        [
          'On commence par copier l’ancienne valeur tab[i] dans temp. Cette sauvegarde n’est pas un indice : c’est la valeur de la case.',
          'On peut ensuite écrire tab[j] dans tab[i], puis temp dans tab[j]. Les deux valeurs sont conservées, simplement déplacées.',
          'Échanger les indices 0 et 5 du tableau de départ place 6 en tête et 41 à la place du 6. La liste reçue est modifiée ; aucun nouveau tableau n’est nécessaire.'
        ],
        {
          guidance:
            'Note deux cases sur papier et barre une ancienne valeur seulement si elle est conservée ailleurs.',
          pitfall: 'Deux affectations tab[i]=tab[j], puis tab[j]=tab[i] dupliquent la même valeur.'
        }
      ),
      python(
        'Trier par sélection',
        'Exercice 2, tri_selection. Trie tab sur place dans l’ordre croissant par sélection : cherche le minimum de la partie non triée et échange-le avec sa première case. Garde tester_tri pour observer la liste modifiée.',
        'tester_tri',
        sortStarter,
        sortStarter.replace(
          '    # Trie tab sur place par sélection\n    pass',
          '    for k in range(len(tab) - 1):\n        imin = k\n        for i in range(k + 1, len(tab)):\n            if tab[i] < tab[imin]:\n                imin = i\n        tab[k], tab[imin] = tab[imin], tab[k]'
        ),
        [
          [[[41, 55, 21, 18, 12, 6, 25]], [6, 12, 18, 21, 25, 41, 55]],
          [[[3, 1, 3, -2]], [-2, 1, 3, 3]],
          [[[]], []],
          [[[4]], [4]],
          [[[1, 2, 3]], [1, 2, 3]]
        ],
        [
          'La zone déjà rangée doit rester intacte ; le minimum se cherche dans les cases restantes.',
          'Conserve l’indice du minimum pour savoir quelles cases échanger à la fin du parcours intérieur.'
        ],
        [
          'Au tour k, les cases avant k contiennent déjà les plus petits éléments dans l’ordre. imin commence à k, puis on compare toutes les cases suivantes.',
          'L’échange est fait après avoir terminé la recherche. Les deux premiers tours donnent [6,55,21,18,12,41,25] puis [6,12,21,18,55,41,25].',
          'La dernière case est forcément rangée après les autres. Les comparaisons sont (n-1)+(n-2)+…+1, donc le coût est quadratique, même si le tableau est déjà trié. Les tests de résultat ne prouvent pas à eux seuls que la méthode choisie est bien le tri par sélection : relis aussi ton raisonnement.'
        ],
        {
          guidance:
            'Écris la séparation entre préfixe rangé et suffixe non trié après chaque tour.',
          pitfall: 'Réinitialiser imin à 0 fait revenir la recherche dans la partie déjà rangée.'
        }
      )
    ],
    takeaway:
      'La récursivité découpe l’arbre en sous-arbres. La sélection agrandit un préfixe trié. Dans les deux cas, explicite ce qui est déjà résolu et ce qui reste à traiter.'
  },
  'annale-2026-pratique-rle': {
    introduction:
      'Une image en niveaux de gris est une suite de valeurs entre 0 et 255. RLE remplace chaque série identique par un nombre de répétitions et une valeur. Nous testons ce principe sur des listes, y compris quand une série dépasse la capacité d’un octet.',
    prerequisites: [
      'Un octet représente ici un entier de 0 à 255.',
      'Une liste RLE alterne un compte et une valeur.',
      'Une boucle while permet d’avancer d’un nombre de cases calculé pendant le parcours.'
    ],
    adaptation:
      'Sujet 1 de la banque 2026, questions 1, 2 et 4. La question 3 sur les fichiers PNG et Pillow n’est pas reproduite. Les listes remplacent les images : aucun module supplémentaire n’est nécessaire. Pour la question 4, on fixe la convention de séries découpées à 255 ; le décodage de la question 2 doit alors rester compatible.',
    context:
      'Convention : [compte1,valeur1,compte2,valeur2,…].\nLes comptes sont strictement positifs et les valeurs sont des octets.\nLe décodage reçoit une liste valide de longueur paire.\nDans le fichier fourni au bac, enregistrer_octets ramène toute valeur supérieure à 255 à 255 : ce comportement peut perdre de l’information.',
    exercises: [
      answer(
        'Chercher un contre-exemple à la compression',
        'Question 1, vérification ciblée. Pour la liste de pixels [2,7,9], donne la liste RLE obtenue. Saisis une liste JSON. Compare ensuite mentalement les deux longueurs pour discuter l’affirmation « RLE ne prend jamais plus de place ».',
        '[1,2,1,7,1,9]',
        [
          'Ici, aucune valeur n’est répétée consécutivement.',
          'Chaque série, même de longueur un, doit produire deux nombres dans la liste codée.'
        ],
        [
          'Le premier pixel est une série d’un 2, puis on trouve une série d’un 7 et une série d’un 9.',
          'Le codage vaut [1,2,1,7,1,9] : six nombres pour trois nombres au départ. C’est un contre-exemple à une compression toujours efficace.',
          'RLE est utile pour de longues séries, mais peut agrandir des données très variées. Une seule entrée qui contredit une affirmation universelle suffit à la réfuter.'
        ],
        {
          guidance: 'Ne te fie pas au mot compression : compte ce que le format stocke réellement.',
          pitfall:
            'Mélanger (valeur,compte) avec la convention (compte,valeur) rendrait le décodage incohérent.'
        }
      ),
      python(
        'Décoder la liste RLE',
        'Question 2. Écris decodage_rle(liste_rle), qui restitue la liste de pixels. Les couples sont aplatis [compte,valeur,…] ; une liste vide donne une liste vide. Deux couples consécutifs peuvent décrire la même valeur.',
        'decodage_rle',
        'def decodage_rle(liste_rle):\n    # Lis les comptes et valeurs sans les mélanger\n    pass',
        `def decodage_rle(liste_rle):
    pixels = []
    for i in range(0, len(liste_rle), 2):
        compte = liste_rle[i]
        valeur = liste_rle[i + 1]
        for _ in range(compte):
            pixels.append(valeur)
    return pixels`,
        [
          [[[2, 255, 1, 0, 3, 255]], [255, 255, 0, 255, 255, 255]],
          [[[]], []],
          [[[1, 0]], [0]],
          [[[2, 7, 1, 7]], [7, 7, 7]],
          [[[255, 12, 5, 12]], Array(260).fill(12)]
        ],
        [
          'Lis deux cases à la fois : elles n’ont pas le même rôle.',
          'Une série doit ajouter sa valeur autant de fois que l’annonce son compte.'
        ],
        [
          'Le parcours avance de 2 pour lire chaque compte puis la valeur voisine. Avancer de 1 prendrait une couleur pour un compte.',
          'La boucle intérieure ajoute compte exemplaires de valeur. La taille du résultat est la somme des comptes, pas la longueur de la liste codée.',
          'Les couples (255,12) et (5,12) se décodent sans règle spéciale en 260 pixels de valeur 12. Cette propriété permet de découper une longue série sans modifier le format du décodeur.'
        ],
        {
          guidance: 'Vérifie la longueur attendue par une addition des comptes avant d’exécuter.',
          pitfall:
            'Ajouter seulement une fois chaque valeur supprime les répétitions que le codage devait préserver.'
        }
      ),
      python(
        'Rester dans la capacité d’un octet',
        'Question 4, convention choisie pour cet atelier. Écris codage_rle(liste_octets), qui produit le codage RLE avec des comptes de 1 à 255. Une série plus longue doit être découpée en plusieurs couples consécutifs. Aucun pixel ne doit être perdu ; la liste vide donne [].',
        'codage_rle',
        'def codage_rle(liste_octets):\n    # Regroupe les valeurs identiques avec des comptes stockables\n    pass',
        `def codage_rle(liste_octets):
    resultat = []
    i = 0
    while i < len(liste_octets):
        valeur = liste_octets[i]
        compte = 1
        while i + compte < len(liste_octets) and liste_octets[i + compte] == valeur and compte < 255:
            compte += 1
        resultat.extend([compte, valeur])
        i += compte
    return resultat`,
        [
          [[[4, 4, 4, 0, 5, 5]], [3, 4, 1, 0, 2, 5]],
          [[[]], []],
          [[Array(254).fill(12)], [254, 12]],
          [[Array(255).fill(12)], [255, 12]],
          [[Array(256).fill(12)], [255, 12, 1, 12]],
          [[Array(511).fill(0)], [255, 0, 255, 0, 1, 0]],
          [[[2, 7, 9]], [1, 2, 1, 7, 1, 9]]
        ],
        [
          'La même valeur peut occuper plusieurs couples, sans changer le sens du décodage.',
          'Vérifie les frontières juste avant, juste à et juste après la plus grande valeur stockable.'
        ],
        [
          'Le code fourni au bac peut produire un compte supérieur à 255. Lors de l’enregistrement, ce compte est ramené à 255 : les répétitions supplémentaires disparaissent.',
          'On arrête une série au plus tard à 255 et on avance i du nombre exact de pixels consommés. Le tour suivant reprend les pixels restants, même si leur valeur est identique.',
          '256 pixels de valeur 12 deviennent [255,12,1,12]. Le décodeur produit 255 puis 1 pixel, soit 256 au total. Les tests à 254, 255, 256 et 511 vérifient les frontières ; un aller-retour décodage(encodage(pixels)) doit restituer les pixels initiaux.'
        ],
        {
          guidance:
            'Ne réduis jamais le compte sans conserver les pixels restants pour un autre couple.',
          pitfall:
            'Remplacer un compte 260 par 255 au lieu de le découper rend le fichier plus petit en perdant cinq pixels.'
        }
      )
    ],
    takeaway:
      'Un format doit préserver les données et respecter la taille des champs qu’il stocke. Les tests aux limites et les allers-retours détectent des pertes invisibles sur de petits exemples.'
  }
};

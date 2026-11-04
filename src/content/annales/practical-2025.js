import { answer, python } from './helpers.js';

export default {
  'annale-2025-pratique-graphes': {
    introduction:
      'Un tableau peut décrire ce qui sort de chaque sommet, alors que la question porte sur ce qui y entre. La seconde partie change de représentation : on lit les groupes de chiffres d’une chaîne pour fabriquer le terme suivant.',
    prerequisites: [
      'Dans adj[y], les numéros désignent les successeurs de y.',
      'Le test x in liste vérifie la présence de x dans une liste.',
      'Une chaîne s’écrit entre guillemets ; str(nombre) convertit un compteur en texte.'
    ],
    adaptation:
      'Les deux exercices du sujet 01 sont couverts. Le premier est précédé d’une trace ciblée sur le graphe fourni. Le code à trous de nombre_suivant est remplacé par un éditeur de fonction ; les chaînes reçues sont non vides et composées de chiffres, comme dans le sujet.',
    context:
      'Graphe : adj = [[1,2],[2],[0],[0]]\nLa ligne y contient les destinations des flèches qui partent de y.\nPour la seconde partie, on lit les groupes de chiffres identiques consécutifs et on écrit leur effectif suivi du chiffre. On travaille sur des chaînes, sans convertir le nombre entier.',
    exercises: [
      answer(
        'Lire le sens des flèches',
        'Exercice 1, préparation. Dans adj=[[1,2],[2],[0],[0]], quels sommets pointent vers 0 ? Donne leurs numéros dans l’ordre croissant sous forme de liste JSON.',
        '[2,3]',
        [
          'Cherche la destination 0 dans toutes les lignes, pas seulement dans la ligne numéro 0.',
          'Pour chaque occurrence trouvée, conserve le numéro de la ligne qui la contient.'
        ],
        [
          'La ligne 0 décrit les destinations 1 et 2 : ce sont des voisins sortants de 0. Elle ne répond pas à la recherche de voisins entrants.',
          'Le numéro 0 figure dans les lignes 2 et 3. Il existe donc une flèche 2 vers 0 et une flèche 3 vers 0.',
          'Le résultat est [2,3]. Dans un graphe orienté, une flèche ne se parcourt pas automatiquement dans les deux sens.'
        ],
        {
          guidance: 'Lis chaque ligne comme une phrase : depuis y, on va vers…',
          pitfall: 'Renvoyer adj[0] donne les voisins sortants, ce qui inverse la question.'
        }
      ),
      python(
        'Rechercher tous les voisins entrants',
        'Exercice 1. Écris voisins_entrants(adj,x). Les sommets portent les numéros de 0 à len(adj)-1. Renvoie, dans l’ordre croissant, les numéros y dont la liste de successeurs contient x. Le sommet x est un numéro valide.',
        'voisins_entrants',
        'def voisins_entrants(adj, x):\n    # Examine les listes de destinations\n    pass',
        `def voisins_entrants(adj, x):
    resultat = []
    for y in range(len(adj)):
        if x in adj[y]:
            resultat.append(y)
    return resultat`,
        [
          [
            [[[1, 2], [2], [0], [0]], 0],
            [2, 3]
          ],
          [[[[1, 2], [2], [0], [0]], 1], [0]],
          [[[[1], [], []], 2], []],
          [[[[0]], 0], [0]]
        ],
        [
          'Tu ne connais pas les prédécesseurs à l’avance : il faut inspecter les lignes qui décrivent les sorties.',
          'Le résultat contient des numéros de sommets, pas leurs listes de voisins.'
        ],
        [
          'On parcourt y dans l’ordre croissant des numéros de sommets. Le test x in adj[y] demande s’il existe un arc de y vers x.',
          'Si ce test réussit, y est ajouté une seule fois. Il n’est pas nécessaire de modifier le graphe reçu.',
          'Un sommet sans arc entrant donne []. Une boucle d’un sommet vers lui-même compte aussi : avec adj=[[0]], les voisins entrants de 0 sont [0]. Le coût dépend des listes d’adjacence parcourues.'
        ],
        {
          guidance: 'Vérifie un sommet sans prédécesseur puis une boucle vers soi-même.',
          pitfall:
            'Ajouter x au résultat répéterait la destination au lieu d’identifier les origines des arcs.'
        }
      ),
      python(
        'Décrire les groupes de chiffres',
        'Exercice 2. Écris nombre_suivant(s), pour une chaîne de chiffres non vide. Pour chaque groupe consécutif, écris son nombre de répétitions puis le chiffre, et concatène les descriptions. Renvoie une chaîne.',
        'nombre_suivant',
        'def nombre_suivant(s):\n    # Retenir le chiffre du groupe courant et son effectif\n    pass',
        `def nombre_suivant(s):
    resultat = ''
    chiffre = s[0]
    compte = 1
    for i in range(1, len(s)):
        if s[i] == chiffre:
            compte += 1
        else:
            resultat += str(compte) + chiffre
            chiffre = s[i]
            compte = 1
    resultat += str(compte) + chiffre
    return resultat`,
        [
          [['1211'], '111221'],
          [['311'], '1321'],
          [['1'], '11'],
          [['111111111111'], '121'],
          [['0'], '10'],
          [['1122'], '2122']
        ],
        [
          'Un changement de chiffre ferme un groupe ; le suivant commence avec un premier chiffre déjà lu.',
          'Le dernier groupe ne sera suivi d’aucun changement : prévois ce qu’il faut faire après la boucle.'
        ],
        [
          'La première case initialise le groupe : chiffre=s[0] et compte=1. La boucle commence donc à 1 pour éviter de compter ce premier chiffre deux fois.',
          'Tant que le chiffre reste identique, compte augmente. Au changement, on écrit str(compte)+chiffre, puis on initialise le nouveau groupe.',
          'Après la boucle, il faut encore écrire le groupe en cours. Pour 1211 : un 1, un 2, deux 1 donnent 11 puis 12 puis 21, soit la chaîne 111221. L’oubli du dernier groupe fait notamment échouer toute entrée d’un seul chiffre.'
        ],
        {
          guidance:
            'Teste une chaîne d’un seul chiffre pour vérifier le travail effectué après la boucle.',
          pitfall:
            'Compter toutes les occurrences d’un chiffre dans la chaîne confond des groupes qui ne sont pas consécutifs.'
        }
      )
    ],
    takeaway:
      'Identifie le sens de la représentation avant de parcourir les données. Dans une lecture par groupes, explique ce qui déclenche une sortie et ce qu’il reste à écrire à la fin.'
  }
};

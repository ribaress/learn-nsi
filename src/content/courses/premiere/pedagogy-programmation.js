import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const programmationPedagogy = {
  'premiere-constructions': {
    duration: 80,
    introduction: intro(
      'Pour préparer des enveloppes, tu comptes celles qui sont prêtes et tu recommences le même geste. Certaines tâches demandent un nombre fixé de répétitions ; d’autres continuent jusqu’à ce qu’un objectif soit atteint.',
      'Comment écrire des étapes que l’ordinateur exécutera dans le bon ordre, avec des choix et des répétitions ?',
      'Les variables, conditions, fonctions et boucles constituent les premiers outils pour transformer une méthode expliquée en mots en un programme exécutable.',
      [
        'Lire une instruction et une affectation.',
        'Définir une fonction et son résultat.',
        'Répéter un nombre fixé de fois avec for.',
        'Continuer sous condition avec while et vérifier l’arrêt.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Programme et exécution',
        'Un programme est un texte d’instructions écrit dans un langage défini. L’exécuter signifie faire appliquer ces instructions à des données.',
        'Pour obtenir un total, on peut demander de partir de zéro puis d’ajouter chaque quantité.'
      ),
      recap(
        'Nom et valeur',
        'Une variable est un nom associé à une valeur. Une affectation choisit une nouvelle valeur pour ce nom ; ce n’est pas une égalité mathématique à résoudre.',
        'x = 3 puis x = x + 1 laisse la valeur 4 associée à x.'
      ),
      recap(
        'Comparaison et booléen',
        'Une comparaison donne vrai ou faux, écrit True ou False. < signifie strictement inférieur, <= inférieur ou égal et == égalité.',
        '3 < 5 vaut True ; 5 < 5 vaut False ; 5 <= 5 vaut True.'
      )
    ],
    realLifeExamples: [
      life(
        'Des enveloppes en nombre connu',
        'Il faut ajouter une étiquette sur chacune des dix enveloppes préparées.',
        'Une boucle for convient lorsque le nombre de passages est déterminé par une collection ou une plage connue.',
        'Le programme ne colle rien physiquement ; il répète les instructions définies dans son bloc.'
      ),
      life(
        'Remplir une réserve',
        'On ajoute une quantité tant que la réserve reste sous le niveau demandé.',
        'Une boucle while réévalue une condition après chaque passage et s’arrête quand l’objectif est atteint.',
        'Si l’ajout est nul ou va dans le mauvais sens, la simple présence d’une condition ne garantit pas l’arrêt.'
      )
    ],
    sections: [
      s(
        'Lire une ligne puis la suivante',
        'Python exécute une séquence d’instructions dans l’ordre. x = 3 associe 3 à x ; x = x * 2 lit 3, multiplie par 2 puis conserve 6 ; x = x + 1 conserve enfin 7. * multiplie et + additionne des nombres. Le signe = affecte, tandis que == compare. Un commentaire commence par # et n’est pas exécuté. print(x) affiche une valeur pour la regarder, mais afficher ne suffit pas à la renvoyer comme résultat d’une fonction.'
      ),
      s(
        'Nommer un traitement et choisir une branche',
        'Une fonction regroupe des instructions sous un nom. def double(nombre): définit la fonction et son paramètre, le nom donné à l’entrée. Le deux-points annonce un bloc et les espaces au début de chaque ligne, appelés indentation, indiquent quelles instructions en font partie. return nombre * 2 renvoie la sortie et termine l’appel. double(4) appelle le traitement avec 4 et produit 8. Pour choisir, if condition: exécute son bloc seulement si la condition est vraie ; else: indique le bloc alternatif.',
        {
          checkpoint: pause(
            'Que fait x = x + 1 lorsque x vaut 5 ?',
            'Lit 5 puis conserve 6 dans x',
            'Vérifie si 5 est égal à 6',
            'La partie droite est calculée avec l’ancienne valeur, puis le résultat est affecté au nom de gauche. Une comparaison utiliserait ==.'
          )
        }
      ),
      s(
        'Comprendre range avant d’additionner',
        'Une boucle for visite des valeurs dans l’ordre. range(2, 7) fournit 2, 3, 4, 5, 6 : le début est inclus et la fin exclue, soit cinq passages. range(n) commence à zéro et va jusqu’à n exclu. Pour additionner de 1 à n inclus, range(1, n + 1) inclut la bonne dernière valeur. total = 0 initialise l’accumulateur avant la boucle ; total += k abrège total = total + k. return total doit suivre la boucle, car un return intérieur arrêterait dès le premier passage.'
      ),
      s(
        'Répéter tant que l’objectif reste à atteindre',
        'while condition: répète son bloc tant que condition est vraie. Pour une population initiale de 1 qui double, on initialise population = 1 et jours = 0 ; tant que population < objectif, population *= 2 double la population et jours += 1 compte un jour. Pour objectif 8, les états sont 1 au jour 0, 2 au jour 1, 4 au jour 2 et 8 au jour 3. On s’arrête à l’égalité : <= ajouterait ici un jour inutile.',
        {
          checkpoint: pause(
            'Une population commence déjà à 1 ; quel nombre de jours pour atteindre l’objectif 1 ?',
            'Zéro jour',
            'Un jour obligatoirement',
            'La condition population < objectif est fausse dès le départ. Une boucle while peut donc effectuer zéro passage.'
          )
        }
      ),
      s(
        'Justifier la progression et contrôler les cas simples',
        'Une boucle conditionnelle doit faire évoluer ce qui décide de sa continuation. Avec n = 5 et while n > 0: total += n, n ne change jamais : la condition reste vraie. C’est une boucle infinie. Pour un décompte, diminuer un entier positif à chaque passage peut justifier l’arrêt ; pour le doublement, les valeurs grandissent jusqu’à dépasser toute cible entière fixée. Avant d’exécuter, trace quelques états sur papier, puis teste le cas sans passage, le cas d’égalité et un objectif entre deux valeurs atteintes. Les tests complètent l’explication de l’arrêt.',
        {
          code: 'def total_jusqua(n):\n    total = 0\n    for k in range(1, n + 1):\n        total += k\n    return total'
        }
      )
    ],
    exampleMethods: [
      'Écris la valeur après chaque ligne, pas seulement après la première : 3 devient 6 avec la multiplication, puis 6 devient 7 avec l’addition. Chaque ligne lit l’état laissé par la précédente.',
      'Le compteur commence à zéro en dehors de la boucle. Ajoute successivement 1, puis 2, puis 3 : les résultats intermédiaires sont 1, 3 et 6, ce qui explique le total final.',
      'Repère la variable testée dans la condition, ici n. Aucune instruction du bloc ne la modifie ; le total change mais cela n’a aucun effet sur la vérité de n > 0.'
    ]
  },
  'premiere-contrats': {
    duration: 65,
    introduction: intro(
      'Une recette précise les ingrédients nécessaires et ce qu’elle permet d’obtenir. Si elle demande trois portions, lui donner une liste vide ne respecte pas ses conditions de départ.',
      'Comment annoncer clairement ce qu’une fonction accepte et ce qu’elle garantit à la personne qui l’utilise ?',
      'Un contrat évite les suppositions cachées : il permet d’utiliser, de tester et de corriger une fonction à partir de promesses explicites.',
      [
        'Définir entrées, sortie et interface.',
        'Séparer précondition et postcondition.',
        'Construire une promesse générale sur un maximum.',
        'Vérifier des propriétés avec assert sans confondre contrôle et preuve.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Fonction',
        'Une fonction est un traitement nommé qui reçoit des entrées et peut renvoyer une sortie. Les paramètres sont les noms des entrées dans sa définition.',
        'def double(n): reçoit un nombre ; return 2 * n renverrait son double.'
      ),
      recap(
        'Moyenne',
        'Une moyenne s’obtient en additionnant des valeurs puis en divisant par leur nombre. Le nombre de valeurs doit être non nul.',
        'Les notes 0, 10 et 20 donnent une somme de 30, divisée par 3, donc une moyenne de 10.'
      ),
      recap(
        'Propriété générale',
        'Une propriété décrit une règle applicable à toutes les entrées autorisées, et non seulement un exemple observé.',
        'Le maximum de deux nombres est supérieur ou égal à chacun, quels que soient ces deux nombres.'
      )
    ],
    realLifeExamples: [
      life(
        'Une règle de réservation',
        'Un service accepte une réservation pour un nombre positif de personnes et promet une confirmation ou un refus annoncé.',
        'Les entrées autorisées évoquent la précondition ; ce qui est garanti après traitement évoque la postcondition.',
        'Une promesse en langage courant peut rester ambiguë ; le contrat informatique doit préciser les cas et les résultats.'
      ),
      life(
        'Une prise et sa fiche technique',
        'Tu utilises un appareil grâce aux valeurs d’alimentation acceptées et au service annoncé.',
        'L’interface d’une fonction permet aussi de l’utiliser sans connaître son calcul interne, à condition d’en respecter les entrées.',
        'La fiche d’un appareil comporte des contraintes physiques ; une fonction opère ici sur des données abstraites.'
      )
    ],
    sections: [
      s(
        'Décrire la fonction du point de vue de son utilisateur',
        'Le prototype, ou signature dans ce contexte, annonce le nom de la fonction, ses paramètres et la nature du résultat attendu. Pour distance(a, b), il faut aussi définir ce que sont a et b et l’unité de la sortie. L’interface est ce que l’utilisateur a besoin de connaître pour appeler la fonction. Deux calculs internes différents peuvent respecter la même interface et fournir la même promesse.'
      ),
      s(
        'Dire ce qui est exigé avant et promis après',
        'Une précondition est une hypothèse sur l’entrée qui doit être vraie avant le calcul. Une postcondition décrit ce que le résultat garantit lorsque les hypothèses sont respectées. Pour une moyenne, la liste non vide est une précondition : une liste vide n’a aucune longueur positive par laquelle diviser. « Le résultat est compris entre la plus petite et la plus grande note » est une postcondition. Une promesse ne se limite pas à « avec 10 et 12, on a obtenu 11 ». ',
        {
          checkpoint: pause(
            '« Les notes sont non vides » décrit quel côté du contrat de moyenne ?',
            'Une précondition sur l’entrée',
            'Une postcondition sur le résultat',
            'La phrase concerne les données à fournir avant l’exécution. Elle ne décrit pas la moyenne renvoyée.'
          )
        }
      ),
      s(
        'Décomposer la promesse d’un maximum',
        'Le maximum de deux nombres est le plus grand des deux. Exiger seulement qu’un résultat dépasse les deux serait insuffisant : 100 dépasse 3 et 5 sans être leur maximum. Il faut aussi qu’il soit égal à l’un des arguments. En Python, resultat in (a, b) vérifie cette appartenance au couple ; resultat >= a and resultat >= b vérifie les deux bornes. in signifie appartenance et and exige les deux conditions. Les nombres négatifs et l’égalité entre les arguments restent des entrées normales.'
      ),
      s(
        'Transformer une propriété en assertion',
        'assert condition demande à Python de vérifier une condition à ce point du programme ; si elle est fausse, il signale AssertionError et arrête le calcul normal. Pour des notes entre 0 et 20, assert 0 <= a <= 20 vérifie une borne inclusive ; and permet de vérifier les trois notes. Une assertion avant le calcul exprime la précondition ; une assertion sur le résultat exprime la postcondition. Des assertions peuvent être désactivées dans certaines exécutions : elles ne remplacent pas la validation des données d’une application exposée.',
        {
          checkpoint: pause(
            'Un résultat égal à 100 satisfait-il le contrat complet du maximum de 3 et 5 ?',
            'Non, il n’est égal à aucun argument',
            'Oui, il est plus grand que les deux',
            'Être un majorant ne suffit pas. Le maximum doit également faire partie des valeurs proposées.'
          )
        }
      ),
      s(
        'Écrire le calcul et ses vérifications dans le bon ordre',
        'def maximum_deux(a, b): définit une fonction et ses deux paramètres. Une variable resultat conserve le choix ; if a >= b: choisit a et else: choisit b. = affecte, == compare et les espaces de début de ligne délimitent les blocs. Les assertions suivent ce choix puis return resultat renvoie le nombre. Pour une moyenne, (a + b + c) / 3 additionne d’abord les trois notes ; les parenthèses sont nécessaires, car / divise avant les additions non regroupées. On contrôle les entrées avant cette opération, puis la sortie après. Tester quelques appels n’est pas encore démontrer le contrat pour tous les appels autorisés.'
      )
    ],
    exampleMethods: [
      'Cherche une propriété trop faible : être supérieur à a et b autoriserait des résultats artificiellement grands. Ajoute alors la contrainte d’appartenir aux deux valeurs proposées ; ensemble, ces propriétés caractérisent le maximum.',
      'Compte les éléments avant de diviser. Une liste vide a pour longueur zéro ; même si une somme vide est définie comme zéro, la division zéro par zéro n’est pas une moyenne définie.',
      'Évalue d’abord l’assertion avec b égal à zéro : 0 > 0 est faux. Le signal AssertionError survient avant le quotient, ce qui localise la violation du contrat au lieu de laisser le calcul continuer.'
    ]
  },
  'premiere-tests': {
    duration: 65,
    introduction: intro(
      'Un réveil sonne correctement à sept heures pendant trois jours. Cela ne prouve pas encore qu’il gère le changement de jour ou une alarme réglée à minuit.',
      'Comment choisir des essais qui révèlent des erreurs au lieu de vérifier seulement les cas faciles ?',
      'Des tests précis rendent une erreur reproductible et permettent de vérifier qu’une correction conserve les comportements attendus.',
      [
        'Construire un attendu indépendant.',
        'Choisir les cas ordinaires, frontières et interdits.',
        'Lire une trace pour trouver une cause.',
        'Conserver un test après correction et comprendre ce que les tests ne prouvent pas.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Contrat',
        'Le contrat décrit les entrées autorisées et les propriétés promises du résultat. C’est lui qui permet de savoir ce qu’un test doit attendre.',
        'Pour majeur(age), « à partir de 18 ans inclus » exige vrai exactement à 18.'
      ),
      recap(
        'Attendu et obtenu',
        'L’attendu est le résultat correct calculé indépendamment ; l’obtenu est le résultat réellement fourni par le programme exécuté.',
        'Pour somme([2, 3]), on attend 5 même si le programme renvoie autre chose.'
      ),
      recap(
        'Indice de liste',
        'Un indice est une position numérotée à partir de zéro. Il permet de localiser un test dans une liste de cas.',
        'Dans trois cas de test, les indices sont 0, 1 et 2.'
      )
    ],
    realLifeExamples: [
      life(
        'Le contrôle d’un distributeur',
        'On essaie le prix exact, une pièce insuffisante et un montant plus grand.',
        'Des cas autour d’une frontière distinguent « au moins le prix » de « strictement plus que le prix ».',
        'La maquette d’un programme n’examine pas les défauts mécaniques ni les pièces physiques.'
      ),
      life(
        'Une correction de calculatrice',
        'Une erreur apparaît pour une valeur négative ; on garde cet exemple après réparation.',
        'Ce cas devient un test de régression : il avertit si une modification future réintroduit la même erreur.',
        'Un exemple conservé ne couvre pas tous les nombres négatifs et ne remplace pas un raisonnement général.'
      )
    ],
    sections: [
      s(
        'Faire du test une comparaison précise',
        'Un test fixe des entrées, calcule un attendu selon le contrat puis compare cet attendu à l’obtenu. Il doit pouvoir échouer : vérifier seulement que somme([2, 3]) est positif accepterait 1 ou 100. L’égalité à 5 est plus précise. Calcule l’attendu à la main avant l’exécution ; réutiliser la même formule erronée dans le programme et le test peut rendre leurs résultats identiques sans les rendre justes.'
      ),
      s(
        'Choisir des cas qui séparent deux règles',
        'Pour être majeur à partir de 18 ans, age > 18 et age >= 18 donnent le même résultat à 17 ou à 19. Ils diffèrent exactement à 18 : c’est le cas frontière discriminant. On peut tester 17, 18 et 19 pour encadrer la transition. Un cas nominal représente une utilisation courante ; un cas limite vise une frontière ; un cas invalide vérifie l’erreur promise pour une entrée interdite. Il faut lire le contrat avant de décider si une liste vide est autorisée.',
        {
          checkpoint: pause(
            'Quel âge révèle précisément la différence entre > 18 et >= 18 ?',
            '18',
            '30',
            'Les deux règles acceptent 30. Seule l’égalité à la frontière 18 les distingue directement.'
          )
        }
      ),
      s(
        'Réduire un échec et suivre l’état',
        'Un contre-exemple est une entrée pour laquelle la promesse échoue ; un seul suffit à réfuter la correction générale. Un maximum initialisé à zéro paraît fonctionner sur des nombres positifs. Sur [-5, -2], aucun élément ne dépasse zéro : l’obtenu reste zéro alors que l’attendu est −2. Une trace note les valeurs après chaque étape. Réduire un cas fautif à peu de données facilite la recherche de la cause au lieu de modifier le programme au hasard.'
      ),
      s(
        'Corriger la cause puis garder la vérification',
        'Dans l’exemple du maximum, la cause est l’hypothèse cachée que le maximum serait positif. Initialiser au premier élément d’une liste non vide supprime cette hypothèse. On garde ensuite le cas négatif comme test de régression. Une suite finie de tests réussis signifie que ces essais précis ont réussi ; elle ne prouve pas toutes les entrées possibles. Une démonstration peut utiliser un invariant, une propriété maintenue après chaque étape, pour compléter les observations.',
        {
          checkpoint: pause(
            'Dix tests réussis prouvent-ils qu’un programme fonctionne pour toute entrée possible ?',
            'Non, ils établissent le succès de ces dix cas',
            'Oui, si on n’a vu aucune erreur',
            'Une entrée non testée peut encore révéler une erreur. Les tests et un raisonnement général apportent des garanties différentes.'
          )
        }
      ),
      s(
        'Produire un rapport de tests en Python',
        'Une fonction est un traitement nommé : def verifier(cas): reçoit une liste de cas. Chaque cas contient [obtenu, attendu] ; obtenu, attendu = cas[i] décompose ces deux valeurs. echecs = [] crée la liste résultat. for i in range(len(cas)): parcourt les indices de zéro à la longueur exclue ; len compte les cas. if obtenu != attendu: teste une différence et echecs.append(i) conserve l’indice fautif. return echecs doit venir après le parcours complet ; un retour au premier succès masquerait les échecs suivants. Pour la majorité, return age >= 18 renvoie directement le booléen de la comparaison, True ou False.'
      )
    ],
    exampleMethods: [
      'Exécute les comparaisons : −5 > 0 est faux, puis −2 > 0 est encore faux. Le zéro initial survit donc, alors qu’il ne figure même pas parmi les données ; le contre-exemple révèle l’initialisation fautive.',
      'Calcule l’attendu selon les mots « à partir de 18 » : 18 doit être accepté. Compare ensuite les deux expressions ; le symbole strict refuse cette entrée et le symbole inclusif l’accepte.',
      'Cherche des résultats faux qui satisferaient le test proposé : 1, 4 ou 100 restent positifs. Le contrat donne une valeur exacte, 5 ; le test doit vérifier cette information plus forte.'
    ]
  },
  'premiere-langages-bibliotheques': {
    duration: 70,
    introduction: intro(
      'Pour mesurer une pièce, tu peux réutiliser un mètre au lieu de fabriquer une règle. Il faut néanmoins connaître son unité et savoir comment lire la graduation.',
      'Comment réutiliser une fonction écrite par quelqu’un d’autre et reconnaître une même idée exprimée dans plusieurs langages ?',
      'Les bibliothèques évitent de réécrire des outils, à condition de lire leurs contrats ; la diversité des syntaxes n’efface pas les constructions communes.',
      [
        'Lire nom, entrées, sortie et erreurs.',
        'Importer une fonction et suivre ses unités.',
        'Réunir des fonctions dans des modules.',
        'Reconnaître des boucles et distinguer plusieurs usages des langages.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Fonction et appel',
        'Une fonction est un traitement nommé. Son appel fournit des arguments, les valeurs d’entrée, puis récupère la valeur qu’elle renvoie.',
        'convertir_cm(100) peut renvoyer 1 si le contrat annonce une conversion en mètres.'
      ),
      recap(
        'Carré et racine entière',
        'Le carré d’un entier est son produit par lui-même. La racine carrée entière d’un nombre positif est le plus grand entier dont le carré ne le dépasse pas.',
        'Pour 17, 4 fois 4 vaut 16 et 5 fois 5 vaut 25 : la racine entière est 4.'
      ),
      recap(
        'Unité',
        'Une unité indique comment lire une grandeur. Les opérations d’un même calcul doivent utiliser des unités compatibles.',
        '100 cm et 1 m décrivent la même longueur ; additionner 100 et 1 sans conversion mélange les unités.'
      )
    ],
    realLifeExamples: [
      life(
        'L’outil avec sa notice',
        'Une balance indique la masse en grammes ; sa notice annonce ses bornes et sa précision.',
        'La documentation d’une fonction annonce pareillement les arguments acceptés, la sortie et les erreurs possibles.',
        'Une fonction peut être exacte sur des entiers, alors qu’une mesure physique conserve une incertitude matérielle.'
      ),
      life(
        'Deux recettes du même plat',
        'Deux recettes en langues différentes décrivent la même succession de gestes avec des mots distincts.',
        'Deux langages peuvent exprimer une boucle et une affectation avec des syntaxes différentes tout en calculant le même résultat.',
        'La traduction de programmes n’est pas une simple substitution de mots : types et règles d’exécution peuvent différer.'
      )
    ],
    sections: [
      s(
        'Lire une documentation comme un contrat',
        'Une bibliothèque regroupe des outils réutilisables. La documentation précise la signature, c’est-à-dire le nom et les paramètres, les types acceptés, la sortie et les erreurs possibles. math.isqrt(n) accepte un entier non négatif et renvoie sa racine carrée entière. Le nom n désigne l’entrée ; si le résultat est r, sa propriété est r * r <= n, mais (r + 1) * (r + 1) > n. * multiplie et <= signifie inférieur ou égal. isqrt(24) vaut donc 4, sans arrondir au nombre le plus proche.'
      ),
      s(
        'Importer puis appeler dans le bon domaine',
        'from math import isqrt rend la fonction isqrt du module math disponible dans le programme. Un module est un fichier ou ensemble organisé de définitions ; une bibliothèque peut en regrouper plusieurs. isqrt(16) et isqrt(17) valent tous deux 4. isqrt(-1) provoque ValueError, car l’entrée négative viole son domaine. Pour savoir si n est un carré parfait, on calcule racine = isqrt(n) puis on vérifie racine * racine == n ; == compare et = affecte.',
        {
          checkpoint: pause(
            'Que renvoie isqrt(24) selon son contrat ?',
            '4, car 16 <= 24 < 25',
            '5, car il serait le plus proche',
            'isqrt prend la plus grande racine entière dont le carré ne dépasse pas l’entrée. Le carré de 5 vaut 25 et dépasse 24.'
          )
        }
      ),
      s(
        'Réutiliser un module local en conservant les unités',
        'Un fichier mesures.py peut définir convertir_cm(cm), qui renvoie des mètres. from mesures import convertir_cm importe ce nom ; on ne met pas .py dans l’instruction. Une fonction est définie par def, reçoit ses paramètres et renvoie une valeur avec return. Pour un rectangle, on additionne largeur et hauteur, puis on multiplie par deux pour le périmètre. Convertir les deux longueurs avant cette opération évite de mélanger centimètres et mètres. Une variable peut conserver chaque résultat intermédiaire pour en rendre l’unité visible.'
      ),
      s(
        'Reconnaître une boucle à travers la syntaxe',
        'Python utilise l’indentation pour ses blocs ; JavaScript emploie souvent des accolades. En Python, for i in range(3): visite 0, 1 et 2 ; en JavaScript, for (let i = 0; i < 3; i++) fait ici la même chose : let crée la variable, i < 3 contrôle la continuation et i++ augmente i d’une unité. Les points-virgules séparent les trois parties de l’en-tête. Dans les deux cas, total += i ajoute i au total. Il faut comparer les valeurs parcourues, pas seulement la ressemblance des mots.',
        {
          checkpoint: pause(
            'Combien de passages fait range(3) en Python ?',
            'Trois : pour 0, 1 et 2',
            'Quatre : pour 0, 1, 2 et 3',
            'La borne supérieure est exclue. La boucle JavaScript équivalente teste elle aussi i < 3, pas i <= 3.'
          )
        }
      ),
      s(
        'Distinguer les façons de décrire un traitement',
        'Le style impératif décrit des étapes qui changent un état ; le style fonctionnel combine des fonctions et leurs résultats ; l’événementiel déclenche des traitements en réponse à des événements ; le style objet regroupe état et méthodes, des traitements associés aux objets. Plusieurs styles peuvent coexister dans un langage. HTML décrit la structure de documents et SQL exprime des demandes sur des données ; ils n’ont pas le même usage qu’un langage généraliste comme Python. Réutiliser un outil nécessite toujours d’en comprendre la documentation : l’importation ne choisit pas les bonnes unités ni les bonnes entrées à notre place.',
        {
          code: 'from math import isqrt\n\ndef est_carre(n):\n    racine = isqrt(n)\n    return racine * racine == n'
        }
      )
    ],
    exampleMethods: [
      'Compare les carrés voisins dans les deux cas : 4 au carré vaut 16, qui ne dépasse ni 16 ni 17 ; 5 au carré vaut 25 et dépasse les deux. Le contrat impose le même entier 4.',
      'Décompose le parcours : la variable démarre à zéro, le test autorise les valeurs strictement inférieures à trois et l’incrément ajoute un. Les états visités sont donc 0, 1, 2 dans les deux syntaxes.',
      'Vérifie l’hypothèse avant l’appel : l’argument doit être non négatif. Un carré d’entier ne peut pas valoir −1 ; l’erreur documentée est une réaction prévue et non un résultat numérique à arrondir.'
    ]
  }
};

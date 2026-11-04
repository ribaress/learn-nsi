import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const algorithmiquePedagogy = {
  'premiere-parcours': {
    duration: 70,
    introduction: intro(
      'Le professeur possède une liste de températures relevées dans la cour. Il veut retrouver une mesure précise, connaître la plus basse, la plus haute et calculer une valeur moyenne.',
      'Quelles informations faut-il conserver pendant la lecture pour ne pas recommencer inutilement tout le travail ?',
      'Un parcours transforme une suite de données en un bilan tout en permettant de justifier le résultat et le nombre de cases examinées.',
      [
        'Lire une liste case par case.',
        'Chercher une valeur et conserver ses positions.',
        'Mettre à jour un minimum et un maximum.',
        'Accumuler une somme puis calculer une moyenne non vide.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Liste et indice',
        'Une liste est une suite ordonnée. Ses indices numérotent les positions à partir de zéro ; len compte les cases.',
        'Dans ["A", "B", "B"], les deux B occupent les indices 1 et 2.'
      ),
      recap(
        'Minimum et maximum',
        'Le minimum est la plus petite valeur et le maximum la plus grande. Ils peuvent être négatifs si toutes les données le sont.',
        'Pour −7, −2 et −9, le plus grand est −2, même s’il reste sous zéro.'
      ),
      recap(
        'Moyenne',
        'La moyenne est la somme des valeurs divisée par leur nombre. Il faut au moins une valeur pour ne pas diviser par zéro.',
        'Pour 8, 10 et 12, on obtient 30 divisé par 3, donc 10.'
      )
    ],
    realLifeExamples: [
      life(
        'Chercher un prénom dans l’appel',
        'Une liste de présence n’est pas classée, et tu cherches tous les élèves portant un prénom précis.',
        'La recherche séquentielle examine les éléments dans l’ordre ; pour toutes les positions, il faut continuer après le premier succès.',
        'Des homonymes peuvent représenter des personnes différentes ; la recherche de texte ne prouve pas une identité.'
      ),
      life(
        'Le bilan des températures',
        'La semaine a connu uniquement des températures négatives et tu veux le maximum.',
        'Initialiser le maximum à la première mesure garantit que le résultat reste une vraie valeur observée, contrairement à zéro.',
        'La moyenne des mesures n’indique pas leur durée respective ni toute la météo entre deux relevés.'
      )
    ],
    sections: [
      s(
        'Chercher sans supposer de classement',
        'Une recherche séquentielle lit les cases l’une après l’autre et compare chaque valeur à la cible. Elle fonctionne même si la liste n’est pas triée. Si on demande le premier indice, on peut s’arrêter au premier succès ; si on demande tous les indices, il faut poursuivre. Pour l’absence, −1 est une convention fréquente dans un résultat numérique, mais il faut l’annoncer : ce n’est pas une preuve qu’une case d’indice −1 serait vide.'
      ),
      s(
        'Choisir ce qui doit survivre entre les étapes',
        'Pour une liste non vide, on prend sa première valeur comme maximum courant, puis on la remplace lorsqu’une valeur plus grande apparaît. Avec [-7, -2, -9], partir de −7, remplacer par −2 puis garder −2 fournit le bon maximum. Une propriété qui reste vraie à chaque étape s’appelle un invariant : le maximum courant est le plus grand des éléments déjà lus. Initialiser à zéro violerait cette propriété dès le départ pour cette liste négative.',
        {
          checkpoint: pause(
            'Quel départ convient au maximum d’une liste non vide entièrement négative ?',
            'Sa première valeur',
            'Zéro, puisqu’il est facile à initialiser',
            'Le premier élément appartient réellement aux données. Zéro pourrait être plus grand que toutes les données sans être un résultat autorisé.'
          )
        }
      ),
      s(
        'Accumuler un bilan dans un seul passage',
        'On peut conserver en même temps minimum, maximum et total. Le minimum change si la valeur lue est plus petite ; le maximum si elle est plus grande ; le total reçoit toutes les valeurs. Une fois le parcours terminé, on divise le total par le nombre de cases pour la moyenne. Une liste vide ne fournit ni premier élément ni moyenne : la précondition doit donc exiger une liste non vide avant d’accéder à la case zéro.'
      ),
      s(
        'Compter les cases pour évaluer le travail',
        'Le coût désigne ici le nombre d’éléments examinés, sans mesurer des secondes. Pour une cible absente dans 120 cases, on doit vérifier les 120 : aucune case oubliée ne peut être déclarée différente sans être lue. Pour une cible en première case, une seule comparaison suffit si on cherche seulement une occurrence. Quand le travail augmente proportionnellement à la longueur n, on parle de coût linéaire ; n est simplement le nombre de cases.',
        {
          checkpoint: pause(
            'Pour constater une absence dans une liste non triée de 120 valeurs, combien de cases peut-il falloir examiner ?',
            'Les 120 cases',
            'Une seule case centrale',
            'Sans ordre connu, la valeur peut se trouver dans n’importe quelle case non lue. Toutes doivent être écartées pour conclure à l’absence.'
          )
        }
      ),
      s(
        'Écrire les parcours en Python',
        'Une fonction est un traitement nommé : def indices(tab, cible): reçoit la liste et la valeur cherchée. resultat = [] initialise une liste vide ; for i in range(len(tab)): visite les indices depuis zéro jusqu’à la longueur exclue. if tab[i] == cible: compare, et resultat.append(i) conserve chaque position. return resultat doit suivre la boucle. Pour un bilan, assert len(tab) > 0 vérifie la précondition ; minimum = tab[0] et maximum = tab[0] initialisent les bornes. < et > comparent ; total += valeur abrège total = total + valeur. return (minimum, maximum, total / len(tab)) renvoie un tuple, un groupe ordonné de trois résultats ; / divise.'
      )
    ],
    exampleMethods: [
      'Numérote les places 0, 1 et 2. La première comparaison avec A échoue ; celle avec B réussit à l’indice 1. On peut s’arrêter seulement parce que cet exemple demande la première position.',
      'Écris le maximum après chaque lecture : −7, puis −2, puis encore −2 puisque −9 est inférieur. Le résultat reste à chaque fois le plus grand élément de la partie déjà traitée.',
      'Compte les éléments avant le calcul : zéro donnée signifie un dénominateur égal à zéro. La convention de somme vide ne suffit pas à définir une moyenne ; le contrat exclut donc cette entrée.'
    ]
  },
  'premiere-insertion': {
    duration: 75,
    introduction: intro(
      'En recevant des cartes une par une, tu ranges chaque nouvelle carte au bon endroit dans celles déjà classées. Tu n’as pas besoin de retrier tout le paquet à chaque arrivée.',
      'Comment reproduire ce geste avec des cases de liste sans perdre la valeur que l’on déplace ?',
      'Le tri par insertion permet de suivre précisément un tri, puis d’expliquer pourquoi une partie déjà ordonnée grandit jusqu’à couvrir toute la liste.',
      [
        'Définir le tri et le préfixe.',
        'Garder une valeur avant de décaler.',
        'Justifier la partie déjà triée.',
        'Vérifier les bornes, l’arrêt et le nombre de déplacements.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Tri croissant',
        'Trier consiste à réordonner les mêmes valeurs. L’ordre croissant place chaque valeur avant des valeurs supérieures ou égales.',
        '[2, 4, 5] est un tri de [5, 2, 4] ; aucune valeur ne doit disparaître.'
      ),
      recap(
        'Indice et préfixe',
        'L’indice est une position numérotée depuis zéro. Un préfixe est la partie allant du début à une position choisie.',
        'Dans [2, 5, 4], le préfixe de deux cases est [2, 5].'
      ),
      recap(
        'Copie et variable',
        'Une variable peut garder une valeur temporaire pendant qu’on modifie des cases. Une copie de liste permet de laisser la source intacte.',
        'valeur = t[2] garde le 4 avant qu’une autre valeur ne soit écrite dans cette case.'
      )
    ],
    realLifeExamples: [
      life(
        'Les cartes en main',
        'Tu reçois un 4 après avoir rangé un 2 et un 5 ; tu écartes le 5 et insères le 4 entre les deux.',
        'Le tri par insertion garde la nouvelle valeur puis déplace vers la droite les valeurs plus grandes du préfixe.',
        'Les cases numériques ne s’écartent pas physiquement : il faut copier les valeurs dans le bon ordre.'
      ),
      life(
        'Des fiches presque rangées',
        'Une pile de fiches est déjà classée et quelques nouvelles fiches seulement sont à insérer.',
        'Lorsque les valeurs sont déjà bien placées, le tri par insertion réalise peu de décalages.',
        'Une insertion dans une longue liste peut encore déplacer beaucoup de valeurs ; le bon cas ne garantit pas le pire cas.'
      )
    ],
    sections: [
      s(
        'Décider ce qui est déjà rangé',
        'Le premier élément seul forme une partie triée : il ne possède aucun voisin contradictoire. On appelle préfixe cette partie au début de la liste. Pour [5, 2, 4], on commence avec [5], puis on prend 2. La position de cet élément à insérer est souvent nommée i ; les indices commencent à zéro et la première insertion utilise i égal à 1. Le but est de prolonger le préfixe tout en gardant exactement les mêmes valeurs.'
      ),
      s(
        'Mettre de côté avant de décaler',
        'On garde d’abord la valeur 2 dans une variable temporaire. Comme 5 est plus grand, on copie 5 dans la case de droite. La liste contient momentanément deux 5, mais le 2 n’est pas perdu puisqu’il est conservé à part. On place ensuite ce 2 dans la case libérée au début : [2, 5, 4]. À l’étape suivante, garder 4 puis décaler 5 permet d’obtenir [2, 4, 5].',
        {
          checkpoint: pause(
            'Pourquoi garder la valeur à insérer avant les décalages ?',
            'Pour ne pas la perdre lorsqu’on écrase sa case',
            'Pour supprimer les doublons du tableau',
            'Les copies vers la droite peuvent remplacer la case d’origine. La variable temporaire conserve la valeur jusqu’à sa nouvelle place.'
          )
        }
      ),
      s(
        'Expliquer la propriété conservée',
        'Un invariant est une propriété vraie au départ puis maintenue après chaque étape. Ici le préfixe est trié et contient les mêmes valeurs que le préfixe initial correspondant. Au départ, une seule case suffit. L’insertion déplace seulement les valeurs plus grandes puis place la nouvelle à sa position : elle conserve l’ordre et les valeurs. Après la dernière insertion, le préfixe est toute la liste ; cette propriété justifie donc le résultat général et pas seulement un exemple.'
      ),
      s(
        'Surveiller la frontière gauche et la fin des boucles',
        'L’indice j désigne la case examinée à gauche de l’insertion. Il diminue d’une unité à chaque décalage. Il faut vérifier j >= 0 avant de lire t[j], car un indice négatif Python lit depuis la fin de la liste. and évalue d’abord sa condition gauche et n’évalue pas la droite si elle est fausse : while j >= 0 and t[j] > valeur protège donc l’accès. Le nombre de positions à examiner diminue, ce qui explique l’arrêt.',
        {
          checkpoint: pause(
            'Quelle partie tester en premier dans la condition de décalage ?',
            'j >= 0, avant de lire t[j]',
            't[j] > valeur, même si j est négatif',
            'La borne protège l’accès. Un indice négatif a un sens en Python et pourrait lire une valeur qui n’appartient plus à la recherche à gauche.'
          )
        }
      ),
      s(
        'Préparer le programme et comprendre son coût',
        'Une fonction est un traitement nommé : def tri_insertion(tab): reçoit une liste. resultat = list(tab) crée sa copie ; for i in range(1, len(resultat)): visite les positions après la première, avec une borne finale exclue. = affecte ; j -= 1 signifie j = j - 1 ; resultat[j + 1] = resultat[j] copie vers la droite. Après la boucle intérieure, resultat[j + 1] = valeur réalise l’insertion ; return resultat vient après toutes les étapes. Sur n valeurs inversées, les décalages sont 1 puis 2 jusqu’à n − 1 : leur somme vaut n * (n − 1) / 2 et croît comme un carré, d’où le mot quadratique. Une liste déjà triée ne demande aucun décalage : son parcours reste linéaire.'
      )
    ],
    exampleMethods: [
      'Fixe la zone triée à [5] et garde le 2 séparément. Compare avec 5, copie ce 5 à droite puis place le 2 dans la première case ; la troisième case n’a pas encore été traitée.',
      'La partie [2, 5] est déjà triée. Garde 4, déplace 5 d’une case vers la droite, puis compare avec 2 : comme 2 ne dépasse pas 4, la place d’insertion est juste après lui.',
      'Lis l’expression dans l’ordre imposé par and. Si t[j] est lu avant la borne, j égal à −1 désigne le dernier élément ; la condition ne protège donc pas le parcours gauche comme on l’espérait.'
    ]
  },
  'premiere-selection': {
    duration: 75,
    introduction: intro(
      'Pour ranger des coureurs par temps, tu choisis d’abord le plus petit temps parmi tous, puis le plus petit parmi ceux qui restent. Chaque choix fixe définitivement une nouvelle place.',
      'Comment construire le classement en choisissant à chaque étape le minimum encore disponible ?',
      'Le tri par sélection illustre une méthode différente de l’insertion et montre qu’une partie triée doit aussi contenir les bonnes valeurs pour justifier ce tri.',
      [
        'Repérer le minimum d’une partie.',
        'Échanger deux cases sans perdre leurs valeurs.',
        'Construire un invariant adapté à la sélection.',
        'Compter les comparaisons même sur une entrée déjà triée.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Minimum',
        'Le minimum est la plus petite valeur d’un ensemble non vide. Pour le trouver, on conserve le meilleur candidat rencontré.',
        'Dans [5, 2, 4, 1], les candidats successifs peuvent être 5, puis 2, puis 1.'
      ),
      recap(
        'Préfixe et suffixe',
        'Un préfixe commence au début d’une liste ; un suffixe en constitue la fin. La frontière sépare ce qui est fixé de ce qui reste à traiter.',
        'Après avoir fixé le premier 1 de [1, 2, 4, 5], le suffixe restant est [2, 4, 5].'
      ),
      recap(
        'Indice',
        'Un indice est une position depuis zéro. La position du minimum est utile pour échanger sa case avec celle du début de la zone restante.',
        'Le minimum 1 de [5, 2, 4, 1] se trouve à l’indice 3.'
      )
    ],
    realLifeExamples: [
      life(
        'Le classement des temps',
        'On extrait le meilleur temps restant pour attribuer la place suivante du classement.',
        'La sélection choisit le minimum du suffixe et l’amène à la première place encore libre.',
        'Dans une liste, on échange les cases au lieu de retirer physiquement une fiche de la pile.'
      ),
      life(
        'Une étagère déjà bien rangée',
        'Tu vérifies encore tous les objets restants pour être sûr que le premier est le plus petit.',
        'Le tri par sélection compare le suffixe même si le minimum est déjà à sa bonne place.',
        'Voir une étagère peut permettre une reconnaissance globale humaine ; l’algorithme annoncé examine des valeurs une à une.'
      )
    ],
    sections: [
      s(
        'Chercher un indice plutôt qu’une simple valeur',
        'À la position i, on veut placer le plus petit élément des positions i jusqu’à la fin. On commence par supposer que l’indice minimum est i, puis on compare les valeurs suivantes à ce candidat. Si une valeur strictement plus petite apparaît, on garde son indice. Cela permet ensuite de retrouver la case à échanger. Avec des valeurs égales, ne remplacer le candidat que pour < conserve l’indice du premier minimum rencontré.'
      ),
      s(
        'Attendre la fin de la recherche pour échanger',
        'Dans [5, 2, 4, 1], la recherche complète trouve 1 à l’indice 3. L’échange avec la case 0 donne [1, 2, 4, 5]. Les deux valeurs sont conservées : 5 n’est pas supprimé, il prend l’ancienne place du 1. Échanger après chaque comparaison compliquerait inutilement le geste annoncé. On fixe une place seulement après avoir comparé tous les candidats de la partie restante.',
        {
          checkpoint: pause(
            'À la première étape sur [5, 2, 4, 1], quelle valeur doit être placée en tête ?',
            '1, le minimum de toute la partie restante',
            '2, le premier nombre inférieur à 5',
            'Trouver une valeur plus petite ne prouve pas qu’elle est la plus petite. Il faut terminer la recherche du minimum avant l’échange.'
          )
        }
      ),
      s(
        'Formuler une propriété plus forte que « trié »',
        'Le préfixe fixé doit être trié, contenir les plus petites valeurs de toute la liste et ne dépasser aucune valeur restante. Le préfixe [2, 4] de [2, 4, 1, 3] est trié, mais ne respecte pas ces deux dernières conditions. Un invariant est une propriété maintenue à chaque étape : sélectionner le minimum restant prolonge ce bon préfixe d’une case. Au départ, le préfixe vide respecte la propriété ; à la fin, il couvre tout le tableau.'
      ),
      s(
        'Compter les comparaisons sans se fier à l’apparence',
        'Sur cinq valeurs, comparer le premier candidat aux quatre autres demande quatre comparaisons. L’étape suivante en demande trois, puis deux, puis une : dix au total. Cela reste vrai si la liste est déjà triée ; le minimum doit toujours être vérifié. Pour n valeurs, la somme des comparaisons vaut n * (n − 1) / 2. n désigne la longueur de liste et * multiplie ; la croissance comme un carré est appelée quadratique. Les boucles portent sur des intervalles finis, ce qui assure leur terminaison.',
        {
          checkpoint: pause(
            'Sur cinq valeurs déjà triées, la sélection évite-t-elle la recherche des minima ?',
            'Non, elle fait encore 4 + 3 + 2 + 1 comparaisons',
            'Oui, elle ne compare plus aucune valeur',
            'Cette méthode ne détecte pas un arrêt anticipé par l’ordre initial. Chaque suffixe doit encore être parcouru pour vérifier son minimum.'
          )
        }
      ),
      s(
        'Écrire les deux boucles en Python',
        'Une fonction est un traitement nommé : def tri_selection(tab): reçoit la liste. resultat = list(tab) crée une copie. for i in range(len(resultat) - 1): visite les places à fixer, et for j in range(i + 1, len(resultat)): examine les suivantes ; range exclut la borne finale. if resultat[j] < resultat[minimum]: compare les valeurs ; minimum = j garde l’indice. L’affectation resultat[i], resultat[minimum] = resultat[minimum], resultat[i] échange les deux valeurs simultanément. return resultat vient après toutes les étapes. La fonction indice_minimum(tab, debut) utilise le même parcours limité à partir de debut et renvoie l’indice avec return indice.'
      )
    ],
    exampleMethods: [
      'Compare successivement 5 à 2, puis le candidat 2 à 4, puis 2 à 1. Le dernier candidat est le minimum global. Son échange avec la première case conserve toutes les valeurs.',
      'La place 0 est déjà fixée. Cherche seulement dans les positions 1, 2 et 3 : la valeur 2 est minimale et se trouve déjà au début du suffixe ; échanger une case avec elle-même ne change rien.',
      'Sépare ordre interne et position globale : 2 précède bien 4, mais les valeurs 1 et 3 devraient entrer avant ou entre elles dans le tri final. Le préfixe ne peut donc pas être considéré comme définitivement fixé.'
    ]
  },
  'premiere-dichotomie': {
    duration: 75,
    introduction: intro(
      'Pour trouver une page dans un dictionnaire alphabétique, tu ouvres vers le milieu. Selon le mot trouvé, tu peux ignorer toute la moitié qui est du mauvais côté.',
      'Pourquoi peut-on éliminer autant de cases d’un coup, et comment éviter une recherche qui reste bloquée sur la même case ?',
      'La dichotomie utilise l’ordre pour accélérer la recherche ; ses bornes et son variant permettent d’expliquer exactement son arrêt.',
      [
        'Vérifier que la liste est triée.',
        'Définir un intervalle de recherche fermé.',
        'Comparer au milieu puis exclure la case examinée.',
        'Suivre la longueur restante pour prouver l’arrêt.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Ordre croissant',
        'Une liste est triée dans l’ordre croissant lorsque chaque valeur est inférieure ou égale à toutes celles qui la suivent.',
        'Dans [1, 3, 5, 7, 9], toute valeur située après 5 est au moins égale à 5.'
      ),
      recap(
        'Intervalle fermé',
        'Un intervalle fermé d’indices inclut ses deux bornes. Sa longueur se calcule en comptant aussi la case de départ.',
        'Les indices de 3 à 7 inclus sont 3, 4, 5, 6, 7 : cinq cases.'
      ),
      recap(
        'Division entière',
        'La division entière // garde le quotient sans partie fractionnaire pour les nombres positifs considérés ici.',
        '(0 + 5) // 2 vaut 2 et fournit un milieu entier de positions.'
      )
    ],
    realLifeExamples: [
      life(
        'Le mot dans le dictionnaire',
        'Tu compares le mot recherché avec un mot central puis conserves les pages situées du bon côté.',
        'L’ordre alphabétique garantit que la moitié exclue ne contient pas la cible, comme l’ordre numérique dans une liste triée.',
        'Un dictionnaire papier n’offre pas un accès indexé exact aussi simple qu’une case de liste.'
      ),
      life(
        'Le jeu du nombre caché',
        'On cherche un nombre entre 1 et 100 en demandant s’il est plus grand ou plus petit qu’un milieu.',
        'Chaque réponse permet de réduire un intervalle ordonné et d’éliminer le milieu déjà testé.',
        'La garantie dépend de réponses cohérentes ; des indications erronées casseraient la propriété utilisée.'
      )
    ],
    sections: [
      s(
        'Justifier la moitié rejetée',
        'La dichotomie exige une liste triée croissante. Si la cible vaut 7 et la valeur médiane 5, toutes les valeurs à gauche sont inférieures ou égales à 5 : elles ne valent donc pas 7. On peut les éliminer d’un seul raisonnement. Dans une liste non triée, un 7 pourrait se cacher à gauche malgré un milieu égal à 5. La précondition de tri est une hypothèse indispensable, pas un confort de présentation.'
      ),
      s(
        'Choisir des bornes et compter les cases',
        'gauche et droite sont les indices extrêmes encore possibles, inclus tous les deux. Au départ, ils valent 0 et la longueur moins un. Pour [3, 7] comme intervalle d’indices, la longueur est 7 − 3 + 1 = 5 : le +1 compte la case de départ. Le milieu se calcule par (gauche + droite) // 2. Un intervalle est vide quand gauche dépasse droite ; une liste vide commence justement avec gauche égal à 0 et droite égal à −1.',
        {
          checkpoint: pause(
            'Combien de cases contient l’intervalle fermé d’indices [3, 7] ?',
            'Cinq',
            'Quatre',
            'Les bornes sont incluses : les cases sont 3, 4, 5, 6 et 7. La différence seule oublie une case.'
          )
        }
      ),
      s(
        'Éliminer aussi la case déjà examinée',
        'Si la valeur médiane est égale à la cible, on peut renvoyer son indice. Si elle est trop petite, on fixe gauche à milieu + 1 ; si elle est trop grande, droite à milieu − 1. Ces déplacements excluent le milieu, dont on sait qu’il ne convient pas. Pour [1, 3, 5, 7, 9] et cible 7, le milieu d’indice 2 contient 5 ; garder les indices 3 et 4 donne ensuite le milieu 3, qui contient 7.'
      ),
      s(
        'Prouver que la recherche ne peut pas piétiner',
        'Un variant est une quantité entière non négative qui diminue strictement lors de chaque étape sans succès. Ici, tant que l’intervalle est non vide, droite − gauche + 1 mesure le nombre de candidats. Exclure le milieu le fait diminuer ; une quantité positive ne peut pas diminuer indéfiniment. Avec gauche = milieu au lieu de milieu + 1, un intervalle d’une seule case trop petite garderait la même borne : aucun progrès n’aurait lieu. Le nombre d’étapes croît très lentement, car on divise environ la longueur par deux à chaque fois.',
        {
          checkpoint: pause(
            'Pourquoi écrire gauche = milieu + 1 plutôt que gauche = milieu après un échec à droite ?',
            'Pour retirer la case déjà comparée et faire progresser les bornes',
            'Pour laisser obligatoirement une case vide entre les candidats',
            'Le milieu a été testé et ne peut plus être la cible. Le retirer assure la diminution de la longueur, notamment quand il ne restait qu’une case.'
          )
        }
      ),
      s(
        'Traduire la recherche et sa trace en Python',
        'Une fonction est un traitement nommé : def dichotomie(tab, cible): reçoit deux paramètres. gauche, droite = 0, len(tab) - 1 initialise les bornes ; len compte les cases. while gauche <= droite: répète tant que l’intervalle est non vide. == compare une égalité ; if choisit un cas et else l’autre. return milieu termine l’appel en cas de succès ; return -1 après la boucle représente l’absence selon le contrat. Pour conserver une trace, trace = [] puis trace.append(droite - gauche + 1) ajoute la longueur au début de chaque passage. break quitte seulement la boucle quand la cible est trouvée ; return trace peut alors renvoyer toutes les longueurs. Aucune formule logarithmique n’est nécessaire pour suivre ces étapes.'
      )
    ],
    exampleMethods: [
      'Numérote les cases de 0 à 4. La première médiane est 2, de valeur 5 : la cible est plus grande, donc la nouvelle gauche vaut 3. La médiane suivante vaut 3 et correspond exactement à 7.',
      'Sur les indices 0 à 2, la médiane contient 3, trop petit pour 4. Il reste la case 2, qui contient 5 ; réduire droite à 1 rend alors gauche supérieur à droite et signifie l’absence.',
      'Prends une seule case de valeur inférieure à la cible : gauche, droite et milieu sont identiques. Réaffecter gauche au même milieu ne change aucune valeur ; la longueur ne diminue donc plus.'
    ]
  },
  'premiere-knn': {
    duration: 85,
    introduction: intro(
      'Tu tries des fruits dont l’étiquette manque en les comparant à des fruits déjà identifiés : masse, largeur et ressemblance avec leurs voisins. Le résultat reste une proposition fondée sur les exemples disponibles.',
      'Comment transformer une idée de proximité en une prédiction calculable sans la prendre pour une certitude ?',
      'Les k plus proches voisins relient mesure, distance et vote ; leurs limites rendent visibles le rôle des données et des conventions dans une prédiction.',
      [
        'Choisir des caractéristiques numériques.',
        'Calculer une distance entre deux points.',
        'Garder un nombre de voisins puis compter les classes.',
        'Départager les égalités et discuter les échelles et les biais.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Coordonnées',
        'Un point est décrit ici par deux nombres ordonnés, une position horizontale x et une position verticale y. Chaque nombre est une caractéristique choisie.',
        '(1, 2) et (4, 6) diffèrent de 3 horizontalement et de 4 verticalement.'
      ),
      recap(
        'Carré et distance',
        'Le carré d’un nombre est son produit par lui-même. Une distance mesure un écart et reste non négative.',
        'Les carrés des écarts 3 et 4 valent 9 et 16, dont la somme est 25.'
      ),
      recap(
        'Classe et vote',
        'Une classe est une étiquette de catégorie. Un vote compte combien de voisins portent chaque étiquette, selon une règle de décision annoncée.',
        'Les classes A, B, A donnent deux voix pour A et une pour B.'
      )
    ],
    realLifeExamples: [
      life(
        'Des fruits mesurés',
        'On compare la masse et le diamètre d’un fruit inconnu à ceux de fruits déjà nommés.',
        'Ces mesures deviennent des coordonnées ; les exemples proches votent pour une classe, comme pomme ou poire.',
        'La ressemblance ne garantit pas l’espèce : deux fruits différents peuvent avoir des mesures proches.'
      ),
      life(
        'Comparer des logements',
        'On rapproche des logements selon leur surface et leur distance à un arrêt de bus.',
        'Une distance entre caractéristiques peut aider à sélectionner des exemples voisins avant une estimation ou une classification.',
        'Changer les kilomètres en mètres modifie les écarts numériques ; les unités doivent être traitées avant d’interpréter la proximité.'
      )
    ],
    sections: [
      s(
        'Décrire les exemples avant la prédiction',
        'Une observation d’apprentissage réunit des caractéristiques numériques et une classe connue. Avec deux caractéristiques, on la représente par [x, y, classe] ; x et y sont les mesures et classe l’étiquette. La cible possède seulement les mesures à classer. k désigne le nombre de voisins retenus ; k-NN est le nom abrégé de la méthode des k plus proches voisins. Les exemples fournis influencent la réponse : il ne s’agit pas d’une loi certaine découverte sur tous les cas possibles.'
      ),
      s(
        'Construire la distance à partir des écarts',
        'Pour les points (1, 2) et (4, 6), l’écart horizontal vaut 4 − 1 = 3 et le vertical 6 − 2 = 4. On additionne leurs carrés : 3 * 3 + 4 * 4 = 25. C’est la distance euclidienne au carré ; la distance elle-même vaut 5, car 5 * 5 = 25. Pour classer les proximités, prendre la racine ne change pas l’ordre : comparer les sommes des carrés suffit. En général, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 utilise ** 2 pour le carré.',
        {
          checkpoint: pause(
            'Pourquoi peut-on comparer les distances au carré sans calculer leurs racines ?',
            'Elles donnent le même ordre de proximité',
            'Parce que toutes les distances ont la même valeur',
            'Sur des valeurs non négatives, prendre la racine ne change pas leur classement. Cela évite un calcul inutile pour choisir les voisins.'
          )
        }
      ),
      s(
        'Choisir les voisins puis faire voter leurs classes',
        'On calcule la proximité de chaque exemple, on les trie et on conserve les k premiers. k doit être au moins 1 et ne pas dépasser le nombre d’exemples. Pour A, B, A, le compteur de A reçoit deux unités et celui de B une unité ; A gagne. Un dictionnaire associe chaque classe à son nombre de votes. Une égalité doit avoir une convention : ici la classe alphabétiquement première gagne ; des distances égales gardent l’ordre des exemples fourni en entrée.'
      ),
      s(
        'Séparer une prédiction de ses limites',
        'Avec un seul voisin, une mesure bruitée ou mal étiquetée peut décider de toute la réponse. Avec trop de voisins, des groupes différents peuvent être mélangés. Une caractéristique variant de zéro à mille peut dominer une autre variant de zéro à un : choisir les unités ou normaliser les échelles change alors les proximités. Des exemples non représentatifs conduisent à des réponses biaisées. La classe prédite décrit une ressemblance selon les choix faits, pas une cause ni une preuve certaine.',
        {
          checkpoint: pause(
            'Deux voisins A et B ont chacun une voix ; peut-on décider sans convention supplémentaire ?',
            'Non, il faut annoncer une règle de départage',
            'Oui, k-NN fournit toujours une majorité stricte',
            'Deux classes peuvent obtenir autant de voix. Le résultat déterministe dépend alors d’une règle explicite, alphabétique dans cet exercice.'
          )
        }
      ),
      s(
        'Préparer les fonctions et le tri Python',
        'Une fonction est un traitement nommé : def distance2(a, b): reçoit deux couples et return renvoie la somme des carrés. Les indices [0] et [1] lisent la première et la deuxième coordonnée ; = affecte une valeur à une variable. sorted(points, key=...) trie une nouvelle liste ; lambda p: expression définit une petite fonction de clé calculant la distance. Le tri Python est stable : il garde l’ordre d’entrée pour des clés égales. for i in range(k): visite les k premiers indices. votes.get(classe, 0) + 1 augmente un compteur, zéro étant la valeur par défaut. Pour départager, la clé (-votes[classe], classe) trie d’abord les effectifs décroissants grâce au signe moins, puis les noms croissants. [0] lit le premier gagnant et return le renvoie ; assert 1 <= k <= len(points) vérifie le domaine.'
      )
    ],
    exampleMethods: [
      'Calcule d’abord les écarts pour chaque coordonnée, puis leurs carrés et leur somme. Ne soustrais pas les points comme un seul nombre et ne confonds pas la distance 5 avec son carré 25.',
      'Écris deux compteurs initialisés à zéro. La première classe augmente A, la seconde B et la troisième A : les effectifs finaux 2 et 1 permettent de justifier la décision.',
      'Compte avant de décider : chaque classe possède une voix, donc il n’existe pas de vainqueur strict. La convention alphabétique choisit A ; une autre convention aurait pu donner un autre résultat.'
    ]
  },
  'premiere-gloutons': {
    duration: 75,
    introduction: intro(
      'Pour rendre de la monnaie, tu prends la plus grande pièce qui ne dépasse pas la somme restante, puis tu recommences. Ce geste paraît économique, mais il n’est pas toujours le meilleur possible.',
      'Un choix immédiatement avantageux garantit-il le plus petit nombre total de pièces ?',
      'Les algorithmes gloutons rendent explicite un choix local et permettent de distinguer une méthode qui termine d’une méthode qui trouve toujours un optimum.',
      [
        'Définir l’objectif avant le choix.',
        'Exécuter la règle gloutonne sur un rendu.',
        'Chercher un contre-exemple à l’optimalité.',
        'Annoncer les hypothèses, l’arrêt et le rôle de la référence.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Somme restante',
        'La somme restante est ce qu’il reste à atteindre après les choix précédents. Chaque pièce choisie est soustraite à ce reste.',
        'Pour rendre 8, prendre une pièce de 5 laisse 3 à rendre.'
      ),
      recap(
        'Optimum',
        'Un optimum est la meilleure solution selon un objectif annoncé. Ici on cherche le plus petit nombre de pièces, pas la plus grande première pièce.',
        'Pour rendre 6 avec 1, 3 et 4, deux pièces de 3 valent mieux que trois pièces 4, 1 et 1.'
      ),
      recap(
        'Contre-exemple',
        'Un contre-exemple est un cas qui contredit une affirmation générale. Un seul cas suffit à montrer que « toujours » est faux.',
        'Un seul système de pièces défavorable réfute la garantie d’optimalité pour tous les systèmes.'
      )
    ],
    realLifeExamples: [
      life(
        'La monnaie au guichet',
        'On rend 18 avec les pièces 10, 5, 2 et 1 en choisissant la plus grande possible à chaque étape.',
        'Le glouton choisit 10, puis 5, puis 2, puis 1, en recalculant le reste après chaque choix.',
        'Une vraie caisse peut manquer de certaines pièces ; l’exercice suppose une réserve illimitée.'
      ),
      life(
        'Le sac de randonnée',
        'Tu choisis les objets les plus intéressants selon un critère local jusqu’à remplir ton sac.',
        'Choisir par valeur ou par rapport valeur-poids évoque une heuristique gloutonne, une règle pratique de choix.',
        'Des objets indivisibles peuvent rendre cette règle sous-optimale ; le critère local ne démontre pas le meilleur ensemble global.'
      )
    ],
    sections: [
      s(
        'Séparer le but et la règle de choix',
        'Le problème du rendu demande des pièces dont la somme égale le montant ; l’objectif supplémentaire est souvent d’en utiliser le moins possible. Un algorithme glouton choisit à chaque étape la plus grande pièce qui ne dépasse pas le reste et ne revient pas sur les choix précédents. Ce caractère local et irrévocable définit la méthode. L’objectif global et la règle locale sont deux descriptions différentes : il faut encore établir si la règle atteint l’objectif.'
      ),
      s(
        'Exécuter un rendu en gardant le reste visible',
        'Avec les pièces 5, 2, 1 et le montant 8, la première pièce est 5 : le reste devient 3. La pièce 5 ne convient plus ; 2 convient et laisse 1 ; enfin 1 donne zéro. Le résultat [5, 2, 1] contient trois pièces et leur somme vaut bien 8. Vérifier le montant rendu précède la discussion du nombre de pièces : une liste courte qui ne rend pas la bonne somme n’est pas une solution.',
        {
          checkpoint: pause(
            'Après une pièce de 5 pour rendre 8, quelle est la plus grande pièce admissible parmi 5, 2, 1 ?',
            '2, car le reste vaut 3',
            '5, car c’est toujours la plus grande',
            'Le choix doit respecter le reste à chaque étape. Une seconde pièce de 5 dépasserait le montant restant.'
          )
        }
      ),
      s(
        'Trouver un cas où le choix local perd',
        'Avec les pièces 4, 3, 1 et le montant 6, le glouton choisit 4 et laisse 2 ; il ajoute 1 puis 1, soit trois pièces. Pourtant 3 + 3 rend aussi 6 avec deux pièces. La méthode termine et fournit une somme correcte, mais elle n’atteint pas le nombre minimal ici. Un seul contre-exemple suffit à réfuter une promesse générale d’optimalité ; des milliers de rendus réussis ne répareraient pas cette promesse fausse.'
      ),
      s(
        'Dire quand le rendu est possible et pourquoi il finit',
        'On suppose ici des valeurs de pièces entières strictement positives, un montant entier non négatif et une réserve illimitée. La présence d’une pièce de valeur 1 rend toute somme réalisable. Après chaque pièce, le reste diminue d’une quantité positive et ne devient pas négatif : cet entier ne peut pas décroître indéfiniment. Sans pièce de 1, le rendu peut rester impossible ; avec 4 et 2, rendre 3 laisse 1 sans choix possible. Le contrat doit prévoir ce cas au lieu de répéter une boucle sans progrès.',
        {
          checkpoint: pause(
            'Le rendu 4 + 1 + 1 pour 6 prouve-t-il que le glouton a toujours le nombre minimal de pièces ?',
            'Non, 3 + 3 en utilise moins',
            'Oui, la somme rendue est correcte',
            'La validité du montant et l’optimalité du nombre de pièces sont deux propriétés distinctes. Le contre-exemple montre leur différence.'
          )
        }
      ),
      s(
        'Préparer la fonction et comparer une référence',
        'Une fonction est un traitement nommé : def rendu(pieces, somme): reçoit les valeurs disponibles et le montant. resultat = [] crée la liste choisie ; sorted(pieces, reverse=True) parcourt les valeurs décroissantes. for piece in ...: visite ces valeurs ; while somme >= piece: répète l’utilisation tant que la pièce convient. resultat.append(piece) ajoute la pièce et somme -= piece retire sa valeur ; return resultat vient après les boucles. Pour comparer deux rendus, sum(liste) additionne leurs pièces et len(liste) les compte. assert sum(glouton) == sum(reference) vérifie le même montant ; return len(glouton) - len(reference) renvoie le surplus. Une référence n’est dite optimale que si cette propriété a été établie séparément.'
      )
    ],
    exampleMethods: [
      'Note les restes 8, 3, 1, 0 et, à chaque étape, choisis la plus grande pièce qui ne dépasse pas ce reste. Vérifie ensuite les deux informations distinctes : somme 8 et trois pièces.',
      'Applique d’abord exactement la règle annoncée pour obtenir 4, 1, 1. Construis ensuite une autre solution valide, 3, 3. Comparer les longueurs 3 et 2 suffit à contredire la garantie d’un minimum.',
      'Après une pièce de 2, le reste est 1 ; aucune des valeurs 4 et 2 ne le réduit sans le dépasser. La présence de pièces positives ne suffit donc pas à rendre toute somme réalisable.'
    ]
  }
};

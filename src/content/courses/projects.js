const example = (title, input, reasoning, result) => ({ title, input, reasoning, result });
const answer = (id, title, prompt, value, hints, explanation, choices) => ({
  id,
  title,
  kind: 'answer',
  prompt,
  answer: value,
  solution: value,
  hints,
  explanation,
  feedbackWrong:
    'Reprends les étapes du projet et distingue les données nécessaires de celles qui ne doivent pas être publiées.',
  ...(choices ? { choices } : {})
});
const python = (
  id,
  title,
  prompt,
  functionName,
  starter,
  solution,
  tests,
  hints,
  explanation,
  extra = {}
) => ({
  id,
  title,
  kind: 'python',
  prompt,
  functionName,
  starter,
  solution,
  tests,
  hints,
  explanation,
  feedbackWrong: 'Teste un petit exemple, puis le cas vide. Vérifie ce que ta fonction renvoie.',
  ...extra
});
const sql = (
  id,
  title,
  prompt,
  setup,
  starter,
  solution,
  expected,
  hints,
  explanation,
  extra = {}
) => ({
  id,
  title,
  kind: 'sql',
  prompt,
  setup,
  starter,
  solution,
  expected,
  hints,
  explanation,
  feedbackWrong:
    'Observe les colonnes, les clés et le résultat attendu avant de modifier la requête.',
  ...extra
});
const common = {
  official: [],
  review: [
    'Je peux expliquer les données et les étapes de mon projet.',
    'J’ai testé un cas normal et un cas limite.',
    'Je sais expliquer un choix et une limite de ma réalisation.'
  ],
  reflection:
    'Présente ton projet à un camarade : quel problème résout-il, comment as-tu vérifié son résultat et quelle amélioration proposerais-tu ?'
};
const reportage = {
  ...common,
  id: 'projet-reportage',
  title: 'Mon reportage numérique responsable',
  duration: 70,
  prerequisites: ['Les pixels et les métadonnées', 'Les dictionnaires', 'Une page HTML simple'],
  objectives: [
    'Préparer des données, transformer un pixel et publier un reportage sans localisation privée.'
  ],
  sections: [
    {
      title: 'Préparer le reportage',
      text: 'Tu présentes une promenade dans un parc. Une photographie contient des pixels, mais aussi des métadonnées : auteur, date, appareil et parfois position GPS. Dresse la liste de ce que tu veux partager avant de fabriquer la page.'
    },
    {
      title: 'Traiter une copie',
      text: 'Garde le document original pour toi. Sur une copie destinée à la publication, conserve le nom de l’auteur et le titre, mais retire les coordonnées. Ton programme doit fabriquer un nouveau dictionnaire sans modifier le dictionnaire reçu.'
    },
    {
      title: 'Publier et relire',
      text: 'Construis une page avec un titre, une image décrite pour les personnes qui ne la voient pas et un crédit. Essaie-la dans l’aperçu. Dans une réalisation réelle, il faut aussi obtenir l’accord des personnes reconnaissables et vérifier les fichiers réellement publiés.'
    }
  ],
  examples: [
    example(
      'Une donnée utile',
      'Auteur : Ana ; titre : Le parc.',
      'Le crédit explique qui a produit le document et permet de respecter son attribution.',
      'Conserver auteur et titre.'
    ),
    example(
      'Une donnée privée',
      'GPSLatitude : -1.28 ; GPSLongitude : 36.82.',
      'Ces coordonnées peuvent révéler le lieu de prise de vue. Le lecteur n’en a pas besoin pour comprendre le reportage.',
      'Retirer les deux coordonnées de la copie.'
    ),
    example(
      'Cas limite : aucun GPS',
      'Les métadonnées ne contiennent que auteur et titre.',
      'Retirer une clé absente ne doit pas provoquer une erreur. La copie doit rester égale aux données utiles.',
      'Le programme produit une copie sans inventer de position.'
    )
  ],
  activity: {
    type: 'pixels',
    prompt: 'Prépare la couleur dominante d’une illustration du reportage.',
    prediction: 'Que devient le pixel si tu calcules son négatif ?',
    explanation:
      'Ce laboratoire transforme un pixel synthétique ; une image entière applique ce calcul à tous ses pixels. La gestion des métadonnées est un autre traitement.',
    config: { color: [40, 150, 80] }
  },
  exercises: [
    answer(
      'choisir-donnees',
      'Choisir ce que je partage',
      'Quelle information retirer en priorité pour ne pas publier le lieu exact de la photo ?',
      'gps',
      [
        'Distingue le contenu visible et les métadonnées.',
        'Une position est une paire de coordonnées.',
        'Retire latitude et longitude GPS.'
      ],
      'Les coordonnées GPS permettent de situer la prise de vue ; un titre et un crédit restent utiles au reportage.',
      [
        { label: 'Le titre', value: 'titre' },
        { label: 'Les coordonnées GPS', value: 'gps' },
        { label: 'Le nom de l’auteur', value: 'auteur' }
      ]
    ),
    python(
      'nettoyer-metadonnees',
      'Fabriquer une copie publiable',
      'Écris copie_publique(meta) : renvoie un nouveau dictionnaire sans les clés GPSLatitude et GPSLongitude. Conserve toutes les autres clés.',
      'copie_publique',
      'def copie_publique(meta):\n    # Construis une nouvelle copie\n    pass',
      'def copie_publique(meta):\n    return {cle: valeur for cle, valeur in meta.items()\n            if cle not in ("GPSLatitude", "GPSLongitude")}',
      [
        {
          args: [{ auteur: 'Ana', GPSLatitude: -1.28, GPSLongitude: 36.82 }],
          expected: { auteur: 'Ana' }
        },
        { args: [{ titre: 'Parc' }], expected: { titre: 'Parc' } },
        { args: [{}], expected: {} }
      ],
      [
        'Parcours les couples clé/valeur.',
        'Copie seulement les clés qui ne sont pas dans la liste à retirer.',
        'Pour {"auteur":"Ana","GPSLatitude":1}, le résultat est {"auteur":"Ana"}.'
      ],
      'Une compréhension de dictionnaire fabrique une copie. Le filtre concerne les deux clés de localisation ; aucune donnée supplémentaire n’est supprimée.'
    ),
    {
      id: 'page-reportage',
      title: 'Assembler ma page',
      kind: 'web',
      prompt:
        'Complète la page : un h1 « Une promenade au parc », un élément img avec un attribut alt non vide, et un paragraphe de classe credit contenant « Illustration : Ana ». Utilise l’image synthétique fournie (elle ne contient pas de GPS).',
      starter:
        '<!doctype html><html lang="fr"><meta charset="utf-8"><title>Mon reportage</title><body>\n<h1>À compléter</h1>\n<img src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%2780%27%3E%3Crect width=%27160%27 height=%2780%27 fill=%27%23289650%27/%3E%3C/svg%3E" alt="">\n<p class="credit"></p>\n</body></html>',
      solution:
        '<!doctype html><html lang="fr"><meta charset="utf-8"><title>Mon reportage</title><h1>Une promenade au parc</h1><img alt="Illustration verte représentant le parc" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%2780%27%3E%3Crect width=%27160%27 height=%2780%27 fill=%27%23289650%27/%3E%3C/svg%3E"><p class="credit">Illustration : Ana</p></html>',
      checks: [
        { selector: 'h1', text: 'Une promenade au parc' },
        { selector: 'img[alt]:not([alt=""])' },
        { selector: '.credit', text: 'Illustration : Ana' }
      ],
      hints: [
        'Le titre principal utilise h1.',
        'alt décrit l’image ; le crédit est un texte visible.',
        'Écris <h1>Une promenade au parc</h1> puis complète alt et le paragraphe credit.'
      ],
      explanation:
        'Le titre structure le document, alt décrit le contenu et le crédit identifie l’autrice. Vérifie également à l’œil la lisibilité de ton reportage.',
      feedbackWrong: 'Vérifie le titre, la description de l’image et le crédit.'
    }
  ]
};
const csv = 'nom;score\nAda;12\nLin;18\nSam;15';
const exploration = {
  ...common,
  id: 'projet-donnees',
  title: 'Un tableau de bord pour le club',
  duration: 90,
  prerequisites: ['Fichiers CSV', 'Listes et dictionnaires', 'Parcours et fonctions'],
  objectives: ['Transformer un petit fichier CSV en indicateurs vérifiables.'],
  sections: [
    {
      title: 'Comprendre les données',
      text: 'Un club conserve des scores fictifs. Chaque ligne possède le même schéma : nom et score. Le séparateur est le point-virgule. Les scores sont des nombres entre 0 et 20 ; la première ligne contient les noms des colonnes.'
    },
    {
      title: 'Construire les traitements',
      text: 'Découpe le projet en trois fonctions : lire le CSV, calculer la moyenne et produire la liste des membres au-dessus d’un seuil. Le lecteur CSV renvoie des chaînes ; convertis explicitement les scores en entiers.'
    },
    {
      title: 'Vérifier puis présenter',
      text: 'Calcule la moyenne à la main sur trois personnes pour comparer. Essaie un fichier ne contenant que l’en-tête. Ton tableau de bord doit annoncer ce qu’il mesure et éviter de présenter les données fictives comme une étude de population.'
    }
  ],
  examples: [
    example(
      'Lire une ligne',
      'Ada;12',
      'La clé nom reçoit Ada et la clé score reçoit la chaîne 12. Il faut convertir 12 avant un calcul.',
      '{"nom":"Ada", "score":12} après conversion.'
    ),
    example(
      'Calculer une moyenne',
      '12, 18, 15',
      'Le total est 45 ; il y a trois scores.',
      '45 / 3 = 15.'
    ),
    example(
      'Un club sans résultat',
      'Seulement nom;score dans le fichier.',
      'Il n’y a aucune ligne de données. La moyenne n’existe pas ; on choisit None dans le contrat.',
      'Liste vide pour la lecture ; None pour la moyenne.'
    )
  ],
  activity: {
    type: 'table',
    prompt: 'Explore les données fictives du club avant de programmer.',
    prediction: 'Quel nom apparaîtra en premier si tu tries les scores dans l’ordre décroissant ?',
    explanation:
      'Le filtre du laboratoire cherche du texte dans une colonne. Le filtre numérique de l’exercice doit, lui, comparer des nombres.',
    config: {
      columns: ['nom', 'score'],
      rows: [
        ['Ada', 12],
        ['Lin', 18],
        ['Sam', 15]
      ]
    }
  },
  exercises: [
    python(
      'lire-csv',
      'Lire les données',
      'Écris lire_scores(texte) qui renvoie la liste des scores entiers du CSV séparé par ;. Utilise csv.DictReader. Un fichier avec seulement l’en-tête donne [].',
      'lire_scores',
      'import csv\nimport io\n\ndef lire_scores(texte):\n    pass',
      'import csv\nimport io\n\ndef lire_scores(texte):\n    return [int(ligne["score"]) for ligne in csv.DictReader(io.StringIO(texte), delimiter=";")]',
      [
        { args: [csv], expected: [12, 18, 15] },
        { args: ['nom;score\n'], expected: [] }
      ],
      [
        'L’en-tête permet d’utiliser ligne["score"].',
        'DictReader lit un fichier ; io.StringIO transforme ton texte en fichier en mémoire.',
        'Convertis chaque score avec int avant de le mettre dans la liste.'
      ],
      'DictReader reconnaît les descripteurs. La conversion en entier rend les données utilisables pour les calculs.'
    ),
    python(
      'moyenne-club',
      'Calculer un indicateur',
      'Écris moyenne(scores) qui renvoie la moyenne ou None si la liste est vide.',
      'moyenne',
      'def moyenne(scores):\n    pass',
      'def moyenne(scores):\n    if not scores:\n        return None\n    return sum(scores) / len(scores)',
      [
        { args: [[12, 18, 15]], expected: 15 },
        { args: [[0, 20]], expected: 10 },
        { args: [[]], expected: null }
      ],
      [
        'La moyenne est total / effectif.',
        'Il faut traiter le cas vide avant la division.',
        'Pour [12,18,15], 45 / 3 donne 15.'
      ],
      'Le cas vide doit être explicite : renvoyer zéro confondrait absence de données et moyenne réellement nulle.'
    ),
    python(
      'selection-club',
      'Changer la question',
      'Le club cherche maintenant les membres dont le score atteint au moins seuil. Écris selection(texte,seuil), qui renvoie leurs noms dans l’ordre du CSV.',
      'selection',
      'import csv\nimport io\n\ndef selection(texte, seuil):\n    pass',
      'import csv\nimport io\n\ndef selection(texte, seuil):\n    return [ligne["nom"] for ligne in csv.DictReader(io.StringIO(texte), delimiter=";")\n            if int(ligne["score"]) >= seuil]',
      [
        { args: [csv, 15], expected: ['Lin', 'Sam'] },
        { args: [csv, 20], expected: [] },
        { args: ['nom;score\n', 0], expected: [] }
      ],
      [
        'Le seuil est inclus dans « au moins ».',
        'Compare int(ligne["score"]) à seuil.',
        'Avec le seuil 15, Lin et Sam sont conservés.'
      ],
      'Le même fichier répond à une autre question. Le filtrage conserve l’ordre des lignes et ne modifie pas les données.'
    )
  ]
};
const quiz = {
  ...common,
  id: 'projet-quiz',
  title: 'Un quiz Web qui explique les réponses',
  duration: 90,
  prerequisites: ['HTML et formulaires', 'Événements JavaScript', 'Client et serveur'],
  objectives: ['Construire une interface qui reçoit une réponse et affiche un retour expliqué.'],
  sections: [
    {
      title: 'Définir une interaction',
      text: 'Le quiz pose une question avec trois réponses. L’élève sélectionne une proposition, clique sur Vérifier et reçoit une explication. L’action a lieu dans le navigateur ; aucune réponse n’est envoyée à un serveur dans ce projet.'
    },
    {
      title: 'Séparer contenu et comportement',
      text: 'HTML décrit le titre, la liste et le bouton. JavaScript relie l’événement clic à une fonction. Le résultat est écrit dans une zone qui annonce ses changements aux technologies d’assistance avec aria-live.'
    },
    {
      title: 'Tester les deux chemins',
      text: 'Teste une bonne réponse puis une mauvaise. Cliquer plusieurs fois ne doit pas augmenter indéfiniment le score : celui-ci vaut ici zéro ou un pour la question courante. Explique ensuite comment tu ajouterais d’autres questions.'
    }
  ],
  examples: [
    example(
      'Une bonne réponse',
      'La valeur choisie est python.',
      'Le gestionnaire compare la valeur à la réponse attendue et met le score à 1.',
      'Le retour félicite et explique.'
    ),
    example(
      'Une mauvaise réponse',
      'La valeur choisie est html.',
      'HTML décrit une structure de document ; la réponse attendue à « quel langage exécute cette fonction ? » est Python.',
      'Le score reste 0 et le retour donne une piste.'
    ),
    example(
      'Le double clic',
      'Deux clics sur une bonne réponse.',
      'On affecte score = 1 ; on n’ajoute pas 1 à chaque clic.',
      'Le score reste 1.'
    )
  ],
  activity: {
    type: 'web',
    prompt: 'Modifie le texte de ce bouton et observe son événement.',
    prediction: 'Que deviendra le paragraphe après un clic ?',
    explanation:
      'L’événement est exécuté dans une page isolée. Ce projet ne simule pas un serveur ; le JavaScript agit sur le document du navigateur.',
    config: {
      html: '<!doctype html><html lang="fr"><meta charset="utf-8"><button onclick="document.querySelector(\'p\').textContent=\'Le clic a été reçu.\'">Essaie-moi</button><p>En attente.</p></html>'
    }
  },
  exercises: [
    answer(
      'lieu-code',
      'Situer le programme',
      'Dans ce quiz sans serveur, où s’exécute le gestionnaire JavaScript du clic ?',
      'client',
      [
        'Observe où s’affiche la page.',
        'Le navigateur reçoit et exécute le JavaScript.',
        'C’est une exécution côté client.'
      ],
      'Le navigateur traite l’événement. Un serveur n’interviendrait que si une requête lui était envoyée.',
      [
        { label: 'Dans le navigateur (client)', value: 'client' },
        { label: 'Obligatoirement sur GitHub', value: 'github' },
        { label: 'Dans le routeur', value: 'routeur' }
      ]
    ),
    {
      id: 'structure-quiz',
      title: 'Préparer une interface accessible',
      kind: 'web',
      prompt:
        'Ajoute un h1 « Mon quiz NSI », une liste select d’id reponse avec une option value="python", et un bouton d’id verifier portant le texte « Vérifier ». Associe un label à la liste.',
      starter:
        '<!doctype html><html lang="fr"><meta charset="utf-8"><title>Quiz</title><body>\n<!-- Le titre, le label, la liste et le bouton -->\n</body></html>',
      solution:
        '<!doctype html><html lang="fr"><meta charset="utf-8"><h1>Mon quiz NSI</h1><label for="reponse">Le langage de cette fonction ?</label><select id="reponse"><option value="html">HTML</option><option value="python">Python</option></select><button id="verifier">Vérifier</button></html>',
      checks: [
        { selector: 'h1', text: 'Mon quiz NSI' },
        { selector: 'label[for="reponse"]' },
        { selector: '#reponse option[value="python"]' },
        { selector: '#verifier', text: 'Vérifier' }
      ],
      hints: [
        'Les contrôles portent des identifiants uniques.',
        'Le for du label doit être égal à l’id du select.',
        'Utilise <label for="reponse"> puis <select id="reponse">.'
      ],
      explanation:
        'Un label explique la question et aide à utiliser la liste au clavier. Les identifiants permettront au programme de retrouver les éléments.',
      feedbackWrong: 'Vérifie les identifiants et le lien entre label et liste.'
    },
    {
      id: 'interaction-quiz',
      title: 'Programmer le retour du quiz',
      kind: 'web',
      prompt:
        'Complète le script : lors du clic sur #verifier, écris 1 dans #score si la valeur sélectionnée est python, sinon 0. Affiche aussi une explication non vide dans #retour. Essaie les deux réponses dans l’aperçu.',
      starter:
        '<!doctype html><html lang="fr"><meta charset="utf-8"><pre><code>def double(n): return 2 * n</code></pre><label for="reponse">Quel est le langage de cette fonction ?</label><select id="reponse"><option value="html">HTML</option><option value="python">Python</option></select><button id="verifier">Vérifier</button><p>Score : <span id="score">0</span></p><p id="retour" aria-live="polite"></p><script>\n// Écoute le clic et actualise score et retour.\n<\/script></html>',
      solution:
        '<!doctype html><html lang="fr"><meta charset="utf-8"><pre><code>def double(n): return 2 * n</code></pre><label for="reponse">Quel est le langage de cette fonction ?</label><select id="reponse"><option value="html">HTML</option><option value="python">Python</option></select><button id="verifier">Vérifier</button><p>Score : <span id="score">0</span></p><p id="retour" aria-live="polite"></p><script>document.querySelector("#verifier").addEventListener("click",()=>{const ok=document.querySelector("#reponse").value==="python";document.querySelector("#score").textContent=ok?"1":"0";document.querySelector("#retour").textContent=ok?"Oui : Python exécute la fonction.":"HTML décrit le document. La fonction étudiée est écrite en Python.";});<\/script></html>',
      checks: [
        {
          selector: '#score',
          text: '1',
          actions: [
            { selector: '#reponse', value: 'python' },
            { selector: '#verifier', click: true }
          ]
        },
        { selector: '#score', text: '1', actions: [{ selector: '#verifier', click: true }] },
        {
          selector: '#score',
          text: '0',
          actions: [
            { selector: '#reponse', value: 'html' },
            { selector: '#verifier', click: true }
          ]
        },
        { selector: '#retour:not(:empty)' }
      ],
      hints: [
        'Relie addEventListener("click", ...) au bouton.',
        'Lis .value sur le select et écris .textContent dans les zones de retour.',
        'const ok = document.querySelector("#reponse").value === "python" ; le score vaut ok ? "1" : "0".'
      ],
      explanation:
        'Le score dépend de la réponse courante. Les vérifications essaient bonne réponse, double clic puis mauvaise réponse ; le retour explique le résultat.',
      feedbackWrong: 'Teste les deux choix et vérifie que le score ne s’accumule pas.'
    }
  ]
};
const maze = {
  ...common,
  id: 'projet-labyrinthe',
  title: 'Trouver une sortie dans un labyrinthe',
  duration: 110,
  prerequisites: ['Graphes et parcours en largeur', 'Files', 'Coordonnées dans un tableau'],
  objectives: [
    'Modéliser un labyrinthe puis calculer une distance minimale et contrôler un chemin.'
  ],
  sections: [
    {
      title: 'Choisir un modèle',
      text: 'La grille contient 0 pour une case libre et 1 pour un mur. Une case libre est un sommet du graphe. Deux sommets sont voisins s’ils se touchent par un côté ; les diagonales ne comptent pas.'
    },
    {
      title: 'Explorer sans tourner en rond',
      text: 'Le parcours en largeur place les cases découvertes dans une file. On marque une case dès son ajout pour ne pas la remettre plusieurs fois. La distance augmente de un quand on franchit une arête.'
    },
    {
      title: 'Vérifier une solution',
      text: 'Plusieurs chemins minimaux peuvent exister. Tester seulement une liste modèle refuserait des solutions valables. Nous testons la distance minimale et, séparément, les propriétés d’un chemin : cases libres, positions dans la grille, déplacements d’une case.'
    }
  ],
  examples: [
    example(
      'Une case voisine',
      'Depuis (0,0) dans une grille 2×3 libre.',
      'Les positions négatives sortent de la grille ; droite et bas sont autorisés.',
      'Voisins : (0,1) et (1,0).'
    ),
    example(
      'La distance',
      'De (0,0) à (1,2) sans mur.',
      'Deux pas horizontaux et un vertical sont nécessaires.',
      'Distance minimale : 3.'
    ),
    example(
      'Pas de sortie',
      'Un mur sépare le départ de l’arrivée.',
      'La file finit par se vider sans atteindre l’arrivée.',
      'La fonction renvoie -1 selon notre contrat.'
    )
  ],
  activity: {
    type: 'graph',
    prompt: 'Explore les cases libres comme un graphe.',
    prediction:
      'La largeur ou la profondeur trouve-t-elle d’abord un chemin minimal en nombre de pas ?',
    explanation:
      'Le modèle représente quelques cases libres. La largeur explore par distance ; la profondeur explore un chemin avant de revenir. Toutes les arêtes ont le même coût.',
    config: {
      nodes: [
        { id: 'A', label: 'Départ', x: 10, y: 20 },
        { id: 'B', label: 'Case B', x: 40, y: 20 },
        { id: 'C', label: 'Case C', x: 70, y: 20 },
        { id: 'D', label: 'Case D', x: 10, y: 70 },
        { id: 'E', label: 'Case E', x: 40, y: 70 },
        { id: 'F', label: 'Sortie', x: 70, y: 70 }
      ],
      edges: [
        ['A', 'B', 1],
        ['B', 'C', 1],
        ['C', 'F', 1],
        ['A', 'D', 1],
        ['D', 'E', 1],
        ['E', 'F', 1]
      ],
      start: 'A',
      goal: 'F'
    }
  },
  exercises: [
    python(
      'voisins-grille',
      'Construire le graphe implicite',
      'Écris voisins(grille,ligne,colonne) qui renvoie les coordonnées libres voisines dans cet ordre : haut, gauche, droite, bas. La position de départ est valide.',
      'voisins',
      'def voisins(grille, ligne, colonne):\n    pass',
      'def voisins(grille, ligne, colonne):\n    resultat = []\n    for dl, dc in [(-1,0),(0,-1),(0,1),(1,0)]:\n        l, c = ligne + dl, colonne + dc\n        if 0 <= l < len(grille) and 0 <= c < len(grille[0]) and grille[l][c] == 0:\n            resultat.append((l,c))\n    return resultat',
      [
        {
          args: [
            [
              [0, 0, 0],
              [0, 1, 0]
            ],
            0,
            0
          ],
          expected: [
            [0, 1],
            [1, 0]
          ]
        },
        { args: [[[0]], 0, 0], expected: [] }
      ],
      [
        'Prépare quatre déplacements relatifs.',
        'Vérifie les bornes avant de lire grille[l][c].',
        'À partir de (0,0), haut et gauche sont hors grille.'
      ],
      'Les tests des bornes évitent les indices négatifs de Python. L’ordre demandé rend l’interface prévisible, sans imposer un unique chemin de sortie.'
    ),
    python(
      'distance-grille',
      'Explorer avec une file',
      'Écris distance(grille,depart,arrivee), qui renvoie le minimum de déplacements, ou -1 si aucune route n’existe. depart et arrivee sont des coordonnées libres valides.',
      'distance',
      'from collections import deque\n\ndef distance(grille, depart, arrivee):\n    pass',
      'from collections import deque\n\ndef distance(grille, depart, arrivee):\n    depart, arrivee = tuple(depart), tuple(arrivee)\n    file = deque([(depart,0)])\n    vus = {depart}\n    while file:\n        (l,c), d = file.popleft()\n        if (l,c) == arrivee:\n            return d\n        for dl,dc in [(-1,0),(0,-1),(0,1),(1,0)]:\n            nl,nc = l+dl,c+dc\n            if 0 <= nl < len(grille) and 0 <= nc < len(grille[0]) and grille[nl][nc] == 0 and (nl,nc) not in vus:\n                vus.add((nl,nc))\n                file.append(((nl,nc),d+1))\n    return -1',
      [
        {
          args: [
            [
              [0, 0, 0],
              [0, 0, 0]
            ],
            [0, 0],
            [1, 2]
          ],
          expected: 3
        },
        { args: [[[0, 1, 0]], [0, 0], [0, 2]], expected: -1 },
        { args: [[[0]], [0, 0], [0, 0]], expected: 0 }
      ],
      [
        'Mémorise la distance avec chaque position.',
        'Retire en tête de la file ; ajoute les voisins non visités en queue.',
        'Départ égal arrivée : la distance est zéro, pas un.'
      ],
      'La file traite les distances dans l’ordre croissant. La première visite de l’arrivée donne donc une distance minimale.'
    ),
    python(
      'controler-chemin',
      'Accepter plusieurs solutions',
      'Écris chemin_valide(grille,chemin). Un chemin non vide est valide si toutes ses positions sont libres et dans la grille, et si chaque déplacement va vers une case voisine par un côté.',
      'chemin_valide',
      'def chemin_valide(grille, chemin):\n    pass',
      'def chemin_valide(grille, chemin):\n    if not chemin:\n        return False\n    for l,c in chemin:\n        if not (0 <= l < len(grille) and 0 <= c < len(grille[0])) or grille[l][c] != 0:\n            return False\n    return all(abs(a[0]-b[0])+abs(a[1]-b[1]) == 1 for a,b in zip(chemin,chemin[1:]))',
      [
        {
          args: [
            [
              [0, 0],
              [0, 0]
            ],
            [
              [0, 0],
              [0, 1],
              [1, 1]
            ]
          ],
          expected: true
        },
        {
          args: [
            [
              [0, 0],
              [0, 0]
            ],
            [
              [0, 0],
              [1, 1]
            ]
          ],
          expected: false
        },
        { args: [[[0]], []], expected: false },
        { args: [[[0]], [[0, 0]]], expected: true }
      ],
      [
        'Contrôle les positions puis les déplacements.',
        'La distance de Manhattan entre deux voisins vaut un.',
        'Une diagonale change ligne et colonne : la somme des écarts vaut deux.'
      ],
      'Le validateur accepte plusieurs chemins. Il ne prouve pas qu’un chemin est minimal : c’est une propriété distincte de sa validité.'
    )
  ]
};
const database =
  "CREATE TABLE livres(id INTEGER PRIMARY KEY,titre TEXT NOT NULL); CREATE TABLE membres(id INTEGER PRIMARY KEY,nom TEXT NOT NULL); CREATE TABLE prets(livre INTEGER REFERENCES livres(id),membre INTEGER REFERENCES membres(id)); INSERT INTO livres VALUES(1,'Python'),(2,'Graphes'),(3,'Images'); INSERT INTO membres VALUES(1,'Ada'),(2,'Lin'); INSERT INTO prets VALUES(1,1),(2,2);";
const library = {
  ...common,
  id: 'projet-mediatheque',
  title: 'Gérer les prêts d’une médiathèque',
  duration: 100,
  prerequisites: ['Modèle relationnel', 'Clés et contraintes', 'Requêtes SQL et jointures'],
  objectives: ['Relier des tables et vérifier les changements d’une base de prêts.'],
  sections: [
    {
      title: 'Décrire les relations',
      text: 'La table livres contient un identifiant et un titre ; membres contient un identifiant et un nom. La relation prets associe un livre à un membre par leurs clés. Les données sont fictives.'
    },
    {
      title: 'Interroger et modifier',
      text: 'Une jointure reconstitue une information lisible sans recopier les noms dans chaque prêt. Pour transférer un prêt, on modifie la clé du membre. Une condition WHERE précise le prêt concerné.'
    },
    {
      title: 'Contrôler l’intégrité',
      text: 'Un prêt doit désigner un livre et un membre existants. SQLite active ici les clés étrangères. Chaque essai repart des mêmes données, ce qui permet de comparer les requêtes sans conserver les modifications du précédent essai.'
    }
  ],
  examples: [
    example(
      'Lire un prêt',
      'prets contient (1,1).',
      'Le livre 1 est Python et le membre 1 est Ada. Les deux jointures remplacent les identifiants par leur signification.',
      'Python est prêté à Ada.'
    ),
    example(
      'Transférer un prêt',
      'Le livre 1 passe d’Ada à Lin.',
      'UPDATE ne change que membre pour la ligne où livre vaut 1.',
      'Les autres prêts restent identiques.'
    ),
    example(
      'Une référence absente',
      'Le membre 99 n’existe pas.',
      'Ajouter un prêt vers 99 violerait la contrainte de référence.',
      'La base refuse l’insertion ; il faut créer un membre valide ou corriger la clé.'
    )
  ],
  activity: {
    type: 'table',
    prompt: 'Repère les références dans les prêts avant d’écrire les jointures.',
    prediction: 'Pourquoi la table des prêts garde-t-elle des identifiants plutôt que des noms ?',
    explanation:
      'Ce tableau aide à lire les données ; les exercices exécutent ensuite les vraies requêtes SQLite sur les trois relations.',
    config: {
      columns: ['livre', 'membre'],
      rows: [
        [1, 1],
        [2, 2]
      ]
    }
  },
  exercises: [
    sql(
      'lire-prets',
      'Présenter les prêts',
      'Affiche titre et nom du membre pour chaque prêt, dans l’ordre alphabétique des titres.',
      database,
      'SELECT ...',
      'SELECT l.titre, m.nom FROM prets p JOIN livres l ON p.livre=l.id JOIN membres m ON p.membre=m.id ORDER BY l.titre',
      [
        ['Graphes', 'Lin'],
        ['Python', 'Ada']
      ],
      [
        'Il faut joindre trois relations.',
        'Relie p.livre à l.id et p.membre à m.id.',
        'SELECT l.titre, m.nom FROM prets p JOIN livres l ON p.livre=l.id JOIN membres m ON p.membre=m.id ORDER BY l.titre.'
      ],
      'Chaque prêt retrouve son livre et son membre par les clés. La jointure exprime le lien sans dupliquer les données.',
      { ordered: true }
    ),
    sql(
      'transferer-pret',
      'Modifier une seule association',
      'Transfère à Lin (id 2) le prêt du livre Python (id 1). Ne modifie pas le prêt de Graphes.',
      database,
      'UPDATE prets SET ...',
      'UPDATE prets SET membre=2 WHERE livre=1',
      [
        [1, 2],
        [2, 2]
      ],
      [
        'La commande est UPDATE.',
        'Le SET concerne membre ; le WHERE concerne livre.',
        'UPDATE prets SET membre=2 WHERE livre=1.'
      ],
      'WHERE limite la modification à un prêt. Sans cette condition, tous les membres des prêts auraient changé.',
      { verifyQuery: 'SELECT livre,membre FROM prets ORDER BY livre', ordered: true }
    ),
    sql(
      'nouveau-pret',
      'Enregistrer puis vérifier un nouveau prêt',
      'Ajoute le prêt du livre Images (id 3) à Ada (id 1). Les prêts existants doivent être conservés.',
      database,
      'INSERT INTO prets ...',
      'INSERT INTO prets(livre,membre) VALUES(3,1)',
      [
        ['Graphes', 'Lin'],
        ['Images', 'Ada'],
        ['Python', 'Ada']
      ],
      [
        'INSERT ajoute une ligne.',
        'Les colonnes du prêt sont livre et membre.',
        'INSERT INTO prets(livre,membre) VALUES(3,1).'
      ],
      'L’insertion ajoute une association valide. La requête de contrôle relit toutes les relations pour vérifier que les anciens prêts sont encore présents.',
      {
        verifyQuery:
          'SELECT l.titre,m.nom FROM prets p JOIN livres l ON p.livre=l.id JOIN membres m ON p.membre=m.id ORDER BY l.titre',
        ordered: true
      }
    )
  ]
};
export const projects = {
  snt: [reportage],
  premiere: [exploration, quiz],
  terminale: [maze, library]
};
export const projectsFor = (level) => projects[level] || [];

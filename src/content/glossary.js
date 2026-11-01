export const glossary = [
  {
    term: 'Internet',
    definition:
      'Un réseau mondial de réseaux qui échangent des paquets selon des protocoles communs. Le Web, le courrier et de nombreux autres services utilisent Internet.'
  },
  {
    term: 'Web',
    definition:
      'Un service de ressources reliées par des liens hypertextes et consultées notamment avec HTTP. Le Web utilise Internet, mais les deux mots ne désignent pas la même chose.'
  },
  {
    term: 'DOM',
    definition:
      'Une représentation d’un document en objets reliés. JavaScript peut retrouver ces objets et modifier le contenu ou réagir aux événements.'
  },
  {
    term: 'RVB',
    definition:
      'Rouge, vert, bleu : trois composantes combinées pour représenter une couleur. Dans les exercices, chaque composante va de 0 à 255.'
  },
  {
    term: 'FIFO',
    definition:
      'First In, First Out : premier entré, premier sorti. C’est le comportement d’une file.'
  },
  {
    term: 'LIFO',
    definition:
      'Last In, First Out : dernier entré, premier sorti. C’est le comportement d’une pile.'
  },
  {
    term: 'GitHub',
    definition:
      'Un service qui héberge des dépôts de code et leur historique. Il permet de partager des projets ; la licence de chaque ressource détermine ses conditions de réutilisation.'
  },
  {
    term: 'standard',
    aliases: ['standards', 'norme', 'normes'],
    definition:
      'Une règle commune qui permet à des outils différents de fonctionner ensemble. Par exemple, les standards du Web définissent comment lire une page.'
  },
  {
    term: 'protocole',
    aliases: ['protocoles'],
    definition:
      'Un ensemble de règles pour échanger des informations : format des messages, ordre d’envoi et réactions attendues.'
  },
  {
    term: 'TCP/IP',
    definition:
      'Une famille de protocoles : IP achemine les paquets ; TCP organise un échange fiable entre deux applications.'
  },
  {
    term: 'TCP',
    definition:
      'Un protocole qui remet les données dans l’ordre et fait retransmettre celles qui manquent. Il s’appuie sur IP.'
  },
  {
    term: 'IP',
    definition:
      'Le protocole qui adresse et transporte les paquets entre réseaux. Il ne garantit pas à lui seul leur livraison.'
  },
  {
    term: 'DNS',
    definition:
      'Le système qui associe notamment un nom de domaine, comme exemple.fr, à une adresse IP. C’est une recherche de correspondance, pas le transport de la page.'
  },
  {
    term: 'HTTP',
    definition:
      'Le protocole de dialogue du Web : un client envoie une requête et un serveur renvoie une réponse.'
  },
  {
    term: 'HTTPS',
    definition:
      'HTTP dans une connexion chiffrée et authentifiée avec TLS. Le contenu est protégé pendant le transport ; cela ne garantit pas que le site est honnête.'
  },
  {
    term: 'TLS',
    definition:
      'Un protocole qui protège une communication grâce au chiffrement et à l’authentification du serveur.'
  },
  {
    term: 'HTML',
    definition:
      'Un langage qui décrit la structure d’une page : titres, paragraphes, liens, images et formulaires.'
  },
  {
    term: 'CSS',
    definition:
      'Un langage qui règle la présentation d’une page : couleurs, tailles, espaces et disposition.'
  },
  {
    term: 'JavaScript',
    definition:
      'Un langage de programmation utilisé notamment dans le navigateur pour faire réagir une page aux actions de l’utilisateur.'
  },
  {
    term: 'Python',
    definition:
      'Un langage de programmation. Dans cet atelier, son code s’exécute dans ton navigateur ; une fonction reçoit des paramètres et peut renvoyer un résultat.'
  },
  {
    term: 'SQL',
    definition:
      'Un langage pour interroger et modifier des données relationnelles. Une requête décrit les données recherchées plutôt que chaque étape du parcours.'
  },
  {
    term: 'SQLite',
    definition:
      'Un moteur de base de données relationnelle. Ici, il exécute réellement tes requêtes SQL sur une copie des données de l’exercice.'
  },
  {
    term: 'CSV',
    definition:
      'Un fichier texte de données en lignes et colonnes, séparées par un caractère comme une virgule ou un point-virgule.'
  },
  {
    term: 'JSON',
    definition:
      'Un format texte pour représenter des données : objets, listes, nombres, chaînes et booléens. Les sauvegardes de l’atelier utilisent ce format.'
  },
  {
    term: 'UTF-8',
    definition:
      'Une manière de coder les caractères Unicode en octets. Un caractère utilise un à quatre octets, et pas forcément un seul.'
  },
  {
    term: 'Unicode',
    definition:
      'Un répertoire qui associe un numéro à chaque caractère. UTF-8 est une façon de coder ces numéros en octets.'
  },
  {
    term: 'ASCII',
    definition:
      'Un ancien codage sur 7 bits pour 128 caractères. Il ne contient pas toutes les lettres accentuées.'
  },
  {
    term: 'algorithme',
    aliases: ['algorithmes'],
    definition:
      'Une suite précise d’étapes pour résoudre une catégorie de problèmes. On peut le décrire avant de l’écrire dans un langage de programmation.'
  },
  {
    term: 'variable',
    aliases: ['variables'],
    definition:
      'Un nom associé à une valeur dans un programme. Une affectation peut associer une nouvelle valeur à ce nom.'
  },
  {
    term: 'fonction',
    aliases: ['fonctions'],
    definition:
      'Un bloc de code réutilisable, appelé avec des paramètres, qui effectue un traitement et peut renvoyer un résultat.'
  },
  {
    term: 'paramètre',
    aliases: ['paramètres'],
    definition:
      'Un nom prévu par une fonction pour recevoir une valeur au moment de son appel. Dans double(n), n est un paramètre.'
  },
  {
    term: 'argument',
    aliases: ['arguments'],
    definition:
      'Une valeur donnée lors de l’appel d’une fonction. Dans double(3), 3 est l’argument.'
  },
  {
    term: 'booléen',
    aliases: ['booléens', 'booléenne', 'booléennes'],
    definition:
      'Une valeur logique parmi deux possibilités : vrai ou faux. En Python, on écrit True et False.'
  },
  {
    term: 'bit',
    aliases: ['bits'],
    definition: 'Une unité d’information qui peut prendre deux valeurs, généralement notées 0 et 1.'
  },
  {
    term: 'octet',
    aliases: ['octets'],
    definition:
      'Un groupe de huit bits. Un octet permet de distinguer 256 configurations différentes.'
  },
  {
    term: 'binaire',
    definition:
      'Une écriture en base 2 qui utilise les chiffres 0 et 1. Les positions ont les poids 1, 2, 4, 8…'
  },
  {
    term: 'hexadécimal',
    aliases: ['hexadécimale'],
    definition:
      'Une écriture en base 16 utilisant 0 à 9 et A à F. Un chiffre hexadécimal représente quatre bits.'
  },
  {
    term: 'flottant',
    aliases: ['flottants'],
    definition:
      'Une représentation approchée de nombres avec une précision finie. Certaines valeurs, comme 0,1, ne sont pas codées exactement en binaire.'
  },
  {
    term: 'boucle',
    aliases: ['boucles'],
    definition:
      'Une instruction qui répète un bloc de code, par exemple pour chaque élément d’une liste ou tant qu’une condition est vraie.'
  },
  {
    term: 'récursivité',
    aliases: ['récursif', 'récursive'],
    definition:
      'Une façon de résoudre un problème en appelant la même fonction sur un problème plus petit, jusqu’à un cas de base.'
  },
  {
    term: 'dictionnaire',
    aliases: ['dictionnaires'],
    definition:
      'Une structure qui associe des clés à des valeurs. On recherche une valeur par sa clé plutôt que par sa position.'
  },
  {
    term: 'tuple',
    aliases: ['tuples', 'p-uplet', 'p-uplets'],
    definition:
      'Une collection ordonnée dont les éléments ne sont pas remplaçables après sa création. On peut y stocker des données de types différents.'
  },
  {
    term: 'indice',
    aliases: ['indices'],
    definition:
      'En programmation, la position d’un élément dans une collection. En Python, le premier indice est souvent 0. Dans une aide pédagogique, « indice » signifie aussi une piste.'
  },
  {
    term: 'interface',
    aliases: ['interfaces'],
    definition:
      'Ce qu’un outil permet de faire et la manière de l’utiliser, sans devoir connaître tous ses détails internes.'
  },
  {
    term: 'implémentation',
    aliases: ['implémentations'],
    definition: 'La réalisation concrète d’une interface ou d’un algorithme dans du code.'
  },
  {
    term: 'API',
    definition:
      'Une interface de programmation : des fonctions, méthodes et règles documentées pour utiliser un logiciel depuis un programme.'
  },
  {
    term: 'module',
    aliases: ['modules'],
    definition:
      'Un fichier ou ensemble de code organisé pour être importé et réutilisé par un autre programme.'
  },
  {
    term: 'assertion',
    aliases: ['assertions'],
    definition:
      'Un test de cohérence écrit dans le programme. En Python, assert déclenche une erreur si sa condition est fausse ; c’est un outil de mise au point.'
  },
  {
    term: 'précondition',
    aliases: ['préconditions'],
    definition:
      'Une condition qui doit être respectée avant d’appeler une fonction pour que son contrat s’applique.'
  },
  {
    term: 'postcondition',
    aliases: ['postconditions'],
    definition:
      'Une propriété que la fonction doit garantir après son exécution si ses préconditions sont respectées.'
  },
  {
    term: 'complexité',
    definition:
      'Une manière de décrire comment les ressources nécessaires à un algorithme évoluent quand la taille des données augmente.'
  },
  {
    term: 'dichotomie',
    definition:
      'Une recherche qui divise l’intervalle restant en deux à chaque étape. Pour chercher une valeur dans un tableau, celui-ci doit être trié.'
  },
  {
    term: 'pile',
    aliases: ['piles'],
    definition:
      'Une structure où le dernier élément entré est le premier sorti : LIFO. Comme une pile d’assiettes.'
  },
  {
    term: 'file',
    aliases: ['files'],
    definition:
      'Une structure où le premier élément entré est le premier sorti : FIFO. Comme une file d’attente.'
  },
  {
    term: 'graphe',
    aliases: ['graphes'],
    definition:
      'Un ensemble de sommets reliés par des arêtes ou des arcs. Il peut représenter des routes, des liens ou des relations.'
  },
  {
    term: 'arbre',
    aliases: ['arbres'],
    definition:
      'Une structure hiérarchique de nœuds. Dans un arbre enraciné, chaque nœud sauf la racine possède un parent.'
  },
  {
    term: 'clé primaire',
    aliases: ['clef primaire'],
    definition:
      'Un attribut ou groupe d’attributs qui identifie une ligne de manière unique dans une relation.'
  },
  {
    term: 'clé étrangère',
    aliases: ['clef étrangère'],
    definition:
      'Un attribut ou groupe d’attributs qui référence une clé d’une autre relation, afin de relier des données cohérentes.'
  },
  {
    term: 'jointure',
    aliases: ['jointures'],
    definition:
      'Une opération qui combine des lignes de plusieurs relations selon une condition de correspondance.'
  },
  {
    term: 'SGBD',
    definition:
      'Un système de gestion de bases de données : il organise l’accès, les modifications, la cohérence et la conservation des données.'
  },
  {
    term: 'processus',
    definition:
      'Un programme en cours d’exécution, avec son état et ses ressources. Plusieurs processus peuvent partager le processeur dans le temps.'
  },
  {
    term: 'interblocage',
    definition:
      'Une situation où des processus attendent mutuellement des ressources détenues par les autres, sans pouvoir avancer.'
  },
  {
    term: 'chiffrement',
    definition:
      'Une transformation qui rend un message illisible sans la clé appropriée. Il protège la confidentialité ; ce n’est pas une compression.'
  },
  {
    term: 'paquet',
    aliases: ['paquets'],
    definition:
      'Un morceau de données accompagné d’informations de transport ou d’adressage, transmis dans un réseau.'
  },
  {
    term: 'routeur',
    aliases: ['routeurs'],
    definition:
      'Un équipement qui transmet les paquets d’un réseau à un autre selon ses informations de routage.'
  },
  {
    term: 'RIP',
    definition:
      'Un protocole de routage qui utilise le nombre de sauts comme métrique ; la route retenue n’est pas nécessairement la plus rapide.'
  },
  {
    term: 'OSPF',
    definition:
      'Un protocole de routage qui calcule des routes selon des coûts. Le cours manipule un modèle à coûts fixés.'
  },
  {
    term: 'IHM',
    definition:
      'L’interface humain-machine : les commandes, affichages et réactions qui permettent à une personne d’utiliser un système.'
  },
  {
    term: 'pixel',
    aliases: ['pixels'],
    definition:
      'Un élément d’une image numérique. En RVB, sa couleur est représentée par des composantes rouge, verte et bleue.'
  },
  {
    term: 'photosite',
    aliases: ['photosites'],
    definition:
      'Un élément sensible à la lumière sur un capteur photo. Un photosite du capteur n’est pas la même chose qu’un pixel de l’image finale.'
  },
  {
    term: 'métadonnée',
    aliases: ['métadonnées'],
    definition:
      'Une donnée qui décrit un document ou une autre donnée : date, auteur, format ou parfois localisation.'
  },
  {
    term: 'EXIF',
    definition:
      'Un format de métadonnées d’image qui peut conserver les réglages de prise de vue et des coordonnées GPS.'
  },
  {
    term: 'GPS',
    definition:
      'Un système de positionnement par satellites. Le récepteur calcule une position à partir de signaux reçus ; il n’envoie pas sa position aux satellites GPS.'
  },
  {
    term: 'NMEA',
    definition:
      'Une famille de formats de messages utilisés notamment pour transmettre des informations de navigation, comme des coordonnées GPS.'
  },
  {
    term: 'capteur',
    aliases: ['capteurs'],
    definition:
      'Un composant qui mesure une grandeur physique et fournit une donnée au système : température, lumière, position…'
  },
  {
    term: 'actionneur',
    aliases: ['actionneurs'],
    definition:
      'Un composant commandé par un système pour agir sur le monde physique, comme un moteur, une lampe ou un chauffage.'
  },
  {
    term: 'cloud',
    definition:
      'Des services et données hébergés sur des machines accessibles par réseau. Les données sont toujours sur des équipements physiques, même si tu ne les vois pas.'
  },
  {
    term: 'client',
    definition:
      'Une application qui demande un service à une autre, appelée serveur. Ton navigateur est un client Web.'
  },
  {
    term: 'serveur',
    aliases: ['serveurs'],
    definition:
      'Un programme qui répond aux demandes de clients, et par extension la machine qui l’héberge.'
  },
  {
    term: 'URL',
    definition:
      'L’adresse d’une ressource : elle indique notamment le protocole, le nom de domaine et le chemin.'
  },
  {
    term: 'CPU',
    definition:
      'Le processeur qui exécute les instructions d’un programme, en interaction avec la mémoire et les entrées-sorties.'
  },
  {
    term: 'SoC',
    definition:
      'Un système sur puce qui rassemble plusieurs fonctions électroniques dans un même circuit, par exemple processeur, mémoire et contrôleurs.'
  }
];
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const entries = glossary.flatMap((entry) =>
  [entry.term, ...(entry.aliases || [])].map((term) => ({ term, definition: entry.definition }))
);
const byTerm = new Map(entries.map((entry) => [entry.term.toLocaleLowerCase('fr'), entry]));
const expression = entries
  .map((entry) => entry.term)
  .sort((a, b) => b.length - a.length)
  .map(escape)
  .join('|');
export function glossaryTokens(text, seen = new Set()) {
  const regex = new RegExp(`(?<![\\p{L}\\p{N}_])(${expression})(?![\\p{L}\\p{N}_])`, 'giu');
  const tokens = [];
  let cursor = 0;
  for (const match of text.matchAll(regex)) {
    const key = match[0].toLocaleLowerCase('fr');
    if (seen.has(key)) continue;
    if (match.index > cursor) tokens.push({ kind: 'text', label: text.slice(cursor, match.index) });
    tokens.push({ kind: 'term', label: match[0], definition: byTerm.get(key).definition });
    seen.add(key);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) tokens.push({ kind: 'text', label: text.slice(cursor) });
  return tokens;
}

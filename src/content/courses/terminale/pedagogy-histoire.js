import { pedagogy, pause } from './pedagogy-utils.js';

export default {
  histoire: pedagogy({
    program: [
      'Ranger les dates avec un petit programme',
      'Pour préparer la chronologie, un jalon est une liste [année,nom] : l’indice 0 donne l’année et l’indice 1 le nom. sorted fabrique une nouvelle liste triée et préserve l’entrée. key annonce le critère ; lambda jalon: jalon[0] est une petite fonction qui prend un jalon et renvoie son année. Le programme ci-dessous conserve les couples triés. Une boucle peut ensuite prendre chaque couple et ajouter seulement son nom à une liste de résultat.',
      'def ranger_jalons(jalons):\n    return sorted(jalons, key=lambda jalon: jalon[0])'
    ],
    intro: [
      'Sur un téléphone, tu peux écouter une chanson, écrire un message puis regarder une carte sans changer les composants de l’appareil.',
      'Comment une même machine peut-elle accomplir des tâches aussi différentes, et comment cette idée s’est-elle construite ?',
      'Comprendre cette histoire permet de distinguer les instructions, le matériel, les réseaux et les services que nous utilisons.'
    ],
    journey: [
      'Séparer la machine et ce qu’on lui demande.',
      'Comprendre le programme conservé en mémoire.',
      'Distinguer relier des ordinateurs et publier des pages.',
      'Replacer les bases de données et les puces dans cette histoire.'
    ],
    recap: [
      [
        'Instruction',
        'Une consigne élémentaire que la machine peut exécuter dans un ordre précis.',
        'Additionner 2 et 3 est une instruction de calcul.'
      ],
      [
        'Programme et donnée',
        'Un programme est une suite d’instructions ; une donnée est une information qu’il traite.',
        'Le lecteur audio est le programme, la chanson est une donnée.'
      ],
      [
        'Matériel et mémoire',
        'Le matériel est l’ensemble des composants physiques ; la mémoire conserve des informations utilisables.',
        'Un circuit de calcul lit des instructions placées dans la mémoire.'
      ]
    ],
    life: [
      [
        'Un appareil, plusieurs usages',
        'Une famille remplace une application de dessin par un lecteur de musique sur le même ordinateur.',
        'Les composants restent présents ; charger d’autres instructions change le traitement effectué.',
        'Un programme ne crée pas un composant manquant : enregistrer une voix exige encore un microphone.'
      ],
      [
        'Transport et bibliothèque',
        'Une route permet d’atteindre une bibliothèque, dont un catalogue aide à trouver les documents.',
        'Le réseau transporte les informations ; le Web organise un service de pages et de liens au-dessus de ce transport.',
        'Un réseau informatique transporte aussi des usages sans pages Web ; une route ne reproduit pas ses protocoles.'
      ]
    ],
    sections: [
      [
        'Une machine suit des instructions',
        'Pour écouter une chanson, il faut conserver des sons, lire leur description et produire un signal. Le programme indique les opérations ; les données décrivent la chanson. Le processeur est le composant qui exécute les instructions. Changer de chanson change les données ; passer à un éditeur de texte change aussi les instructions.'
      ],
      [
        '1936 : penser une machine universelle',
        'Alan Turing décrit un modèle mathématique de calcul : une machine idéale, pas un téléphone construit. Une machine universelle peut lire la description d’une autre machine et simuler son travail. Ainsi la description d’un programme peut devenir une donnée. Universelle signifie capable de simuler tout calcul du modèle, sans promettre de résoudre toute question imaginable.',
        pause(
          'Universelle signifie-t-elle que toute question possède une solution calculable ?',
          'Non, certains problèmes ont une limite démontrée.',
          'Oui, il suffit d’attendre assez longtemps.',
          'Pouvoir simuler des programmes ne fournit pas un programme qui résout chaque problème. Le problème général de l’arrêt est une limite de ce pouvoir.'
        )
      ],
      [
        '1948 : conserver le programme',
        'Le Manchester Baby exécute en 1948 un programme enregistré en mémoire électronique. Imagine des instructions qu’on peut remplacer en mémoire plutôt qu’un circuit à reconstruire pour chaque tâche. Les instructions et les données deviennent accessibles à la machine pendant l’exécution. Cela éclaire le passage d’un lecteur audio à un éditeur avec le même matériel.'
      ],
      [
        '1969 et 1989 : relier puis publier',
        'En 1969, les premiers nœuds d’ARPANET relient des ordinateurs. Un nœud est ici une machine participant au réseau ; un paquet est un morceau de message transporté séparément. En 1989, Tim Berners-Lee propose le Web au CERN : des documents accessibles et liés entre eux. Les deux jalons sont séparés de vingt ans et concernent des objets différents.',
        pause(
          'À quelle invention rattacher les premiers nœuds de 1969 ?',
          'ARPANET, un jalon de l’histoire des réseaux.',
          'La proposition du Web au CERN.',
          'Le réseau permet le transport. Le Web, proposé en 1989, est un service de documents liés ; il ne faut pas lui attribuer la date du réseau.'
        )
      ],
      [
        '1970 et les intégrations matérielles',
        'Edgar F. Codd propose en 1970 le modèle relationnel : on organise les informations dans des tables reliées sans imposer tous les détails de leur rangement physique. Une table décrit par exemple des livres avec une ligne par livre. Un système sur puce rassemble plusieurs fonctions matérielles sur un circuit. Organiser les données et intégrer des composants répondent donc à deux besoins complémentaires.'
      ]
    ],
    reasoning: [
      'Repère d’abord ce qui reste physiquement identique : processeur et mémoire. Le lecteur utilise des instructions pour les sons ; l’éditeur en utilise d’autres pour les caractères. Ce changement d’instructions, accompagné de nouvelles données, explique les deux usages.',
      'Compare d’abord 1936 à 1948 : 1936 vient avant. Ajoute 1969 après 1948, puis 1970 après 1969. La chronologie obtenue décrit successivement un modèle de calcul, un programme enregistré, une interconnexion puis un modèle d’organisation des données.',
      'Cherche ce que la date qualifie : 1969 désigne les premiers nœuds d’ARPANET, pas des pages liées. La proposition du Web date de 1989. Il manque donc vingt ans et surtout un changement de service ; la phrase confond réseau et Web.'
    ]
  })
};

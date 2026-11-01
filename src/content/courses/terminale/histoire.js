import { lesson, section as s, example as e, activity as a, answer, python } from './helpers.js';

export default {
  id: 'histoire',
  title: 'Histoire de l’informatique',
  lessons: [
    lesson(
      'histoire',
      'Une même machine, plusieurs programmes',
      ['T-H1', 'T-H2'],
      ['Repères de première : algorithme, programme et ordinateur'],
      [
        'Relier une date à une idée et à ses protagonistes',
        'Expliquer le rôle du programme enregistré',
        'Distinguer évolution logicielle et intégration matérielle'
      ],
      [
        s(
          '1936 : une limite et une universalité',
          'Alan Turing décrit en 1936 un modèle abstrait de calcul. Une machine universelle peut interpréter la description d’une autre machine : un programme devient une donnée. Ce résultat ne signifie pas que tous les problèmes sont calculables ; le problème de l’arrêt montre précisément une limite générale.'
        ),
        s(
          '1948 puis 1969 : stocker et relier',
          'Le Manchester Baby exécute en 1948 un programme conservé en mémoire électronique. Changer le traitement ne demande plus de reconstruire tout le circuit. En 1969, les premiers nœuds d’ARPANET ouvrent une étape de l’histoire des réseaux à commutation de paquets ; ARPANET et le Web ne désignent pas la même invention.'
        ),
        s(
          'Des relations aux systèmes sur puce',
          'Edgar F. Codd propose en 1970 le modèle relationnel : les données sont organisées indépendamment de nombreux détails physiques du stockage. En 1989, Tim Berners-Lee propose le Web au CERN. L’intégration de processeurs et de contrôleurs sur une puce rapproche ensuite des fonctions matérielles, pilotées par des interfaces logicielles. Aucune de ces évolutions ne supprime l’autre composante.'
        )
      ],
      [
        e(
          'Changer de tâche',
          'Un appareil exécute un lecteur audio puis un éditeur.',
          'Le matériel est réutilisé ; les instructions et les données chargées changent.',
          'Un même ordinateur sert à plusieurs traitements.'
        ),
        e(
          'Ordonner des jalons',
          'Turing 1936 ; programme enregistré 1948 ; ARPANET 1969 ; modèle relationnel 1970.',
          'La théorie du calcul précède la construction puis l’interconnexion et la structuration des données.',
          '1936 < 1948 < 1969 < 1970'
        ),
        e(
          'Une confusion à éviter',
          '« Le Web existe depuis 1969. »',
          '1969 concerne les premiers nœuds d’ARPANET ; la proposition initiale du Web date de 1989.',
          'Affirmation fausse : Internet et Web ont des histoires distinctes.'
        )
      ],
      a(
        'table',
        'Classe les jalons et relie chaque idée au chapitre où elle sera utile.',
        'Quel jalon permet de considérer un programme comme une donnée ?',
        'Cette frise choisit quelques jalons. L’informatique résulte de contributions collectives, pas d’une unique suite d’inventeurs isolés.',
        {
          columns: ['année', 'idée'],
          rows: [
            [1936, 'machine universelle'],
            [1948, 'programme en mémoire'],
            [1969, 'ARPANET'],
            [1970, 'modèle relationnel'],
            [1989, 'Web']
          ]
        }
      ),
      [
        answer(
          '1. Replacer le modèle relationnel',
          'En quelle année Codd publie-t-il son modèle relationnel ?',
          '1970',
          [
            'Cherche la section sur les bases.',
            'Ce jalon suit 1969.',
            'Il précède de dix-neuf ans la proposition du Web.'
          ],
          'Le modèle de Codd date de 1970. Il sépare l’organisation logique de nombreux détails physiques.',
          'Tu as peut-être confondu réseau et base de données. Reprends la frise avec une idée par date.'
        ),
        answer(
          '2. Identifier une personne',
          'Donne le nom de famille du chercheur associé ici à la machine universelle de 1936.',
          'Turing',
          [
            'Le premier paragraphe donne son prénom.',
            'Il étudie aussi les limites du calcul.',
            'Son prénom est Alan.'
          ],
          'Alan Turing étudie une machine abstraite universelle et l’indécidabilité, avant les ordinateurs électroniques.',
          'La machine universelle est un modèle de calcul. Relis le premier jalon, sans le confondre avec le Web.'
        ),
        python(
          '3. Trier une chronologie',
          'Écris chronologie(jalons), qui reçoit des couples [année, nom] et renvoie les noms par année croissante. Ne modifie pas la liste fournie.',
          'chronologie',
          'def chronologie(jalons):\n    pass',
          'def chronologie(jalons):\n    return [nom for annee, nom in sorted(jalons, key=lambda x: x[0])]',
          [
            [
              [
                [
                  [1989, 'Web'],
                  [1936, 'Turing'],
                  [1970, 'Codd']
                ]
              ],
              ['Turing', 'Codd', 'Web']
            ],
            [[[]], []]
          ],
          [
            'Trie les couples sur leur première composante.',
            'sorted construit une nouvelle liste.',
            'Une compréhension peut ensuite extraire les noms.'
          ],
          'Le tri sépare le critère chronologique du texte affiché. La liste vide ne nécessite aucune exception.',
          'Trier les noms par ordre alphabétique perd les dates. Vérifie la clé de tri et le cas vide.'
        )
      ],
      'Quelle évolution de ce parcours dépend simultanément d’une idée logicielle et d’une possibilité matérielle ? Justifie avec deux jalons.'
    )
  ]
};

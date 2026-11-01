import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer as q,
  python as p,
  test as t
} from './authoring.js';
export default {
  id: 'histoire',
  title: 'Une histoire des idées et des machines',
  lessons: [
    lesson({
      id: 'premiere-histoire',
      title: 'Des procédures aux machines universelles',
      duration: 30,
      prerequisites: ['Distinguer une donnée et un traitement.'],
      objectives: ['Placer des repères historiques et expliquer ce qui change à chaque étape.'],
      official: ['P-H1'],
      sections: [
        s(
          'Une procédure avant l’ordinateur',
          'L’algorithme d’Euclide, connu dans l’Antiquité, calcule un plus grand commun diviseur. Au IXe siècle, Al-Khwarizmi décrit des procédés de calcul : son nom est à l’origine du mot algorithme. Une procédure est une suite de règles ; elle peut être exécutée sur papier.'
        ),
        s(
          'Du calcul mécanique au programme',
          'Pascal construit sa machine à calculer au XVIIe siècle. Au XIXe siècle, Babbage imagine une machine analytique programmable ; Ada Lovelace décrit en 1843 un procédé pour cette machine. En 1936, Alan Turing formalise une machine universelle : les instructions peuvent elles-mêmes être des données. Les travaux sur les ordinateurs à programme enregistré se concrétisent dans les années 1940, avec notamment le Manchester Baby en 1948.'
        ),
        s(
          'Relier les machines et les personnes',
          'En 1969, ARPANET relie des machines. Les protocoles TCP/IP rendent possible l’interconnexion de réseaux ; le Web, proposé par Tim Berners-Lee en 1989, ajoute des documents reliés par des hyperliens. Grace Hopper contribue aux compilateurs et à la diffusion de langages plus proches des usages humains. Ces avancées sont collectives : une frise donne des repères, pas une liste exhaustive d’inventeurs isolés.'
        )
      ],
      examples: [
        e(
          'Un algorithme ancien',
          'PGCD de 18 et 12',
          '18 % 12 vaut 6 ; 12 % 6 vaut 0. La dernière valeur non nulle est 6.',
          '6, obtenu sans ordinateur.'
        ),
        e(
          'Une machine générale',
          'Même ordinateur : calculer une somme puis afficher un texte',
          'Le matériel peut rester le même ; charger d’autres instructions change le traitement.',
          'Un changement de programme suffit.'
        ),
        e(
          'Confusion à éviter',
          '« Le Web a commencé en 1969 »',
          '1969 correspond au développement d’ARPANET ; le projet Web est proposé vingt ans plus tard. Un service et son réseau support ont des histoires distinctes.',
          'Web : 1989 ; ARPANET : 1969.'
        )
      ],
      activity: a(
        'table',
        'Classe les repères par date puis relie chacun à une idée.',
        'Le programme enregistré précède le Web.',
        'Cette table simplifie une histoire collective ; les dates désignent ici une proposition ou un événement précis.',
        {
          columns: ['date', 'repère'],
          rows: [
            [1843, 'Lovelace'],
            [1936, 'Turing'],
            [1948, 'Manchester Baby'],
            [1969, 'ARPANET'],
            [1989, 'Web']
          ]
        }
      ),
      exercises: [
        q(
          'p-h1',
          'Repérer un jalon',
          'En quelle année Turing formalise-t-il la machine universelle ?',
          1936,
          [
            'Cherche la partie consacrée au programme.',
            'Il s’agit d’un résultat théorique des années 1930.',
            'La date précède 1948 de douze ans.'
          ],
          '1936 désigne le modèle théorique, pas la construction du premier ordinateur.',
          'Tu confonds peut-être formalisation et construction : relis les deux dates.'
        ),
        q(
          'p-h2',
          'Comparer deux dates',
          'Combien d’années séparent ARPANET (1969) de la proposition du Web (1989) ?',
          20,
          [
            'Il faut calculer un écart.',
            'Soustrais la date la plus ancienne de la plus récente.',
            '1989 − 1969 donne deux décennies.'
          ],
          'Le calcul donne 20 ans ; Internet et Web ne sont donc pas synonymes historiques.',
          'Ne donne pas une date : on demande une durée.'
        ),
        p(
          'p-h3',
          'Construire une frise',
          'Écris frise(reperes) qui renvoie les couples [année, nom] par année croissante sans modifier l’entrée.',
          'frise',
          'reperes',
          'def frise(reperes):\n    return sorted(reperes, key=lambda repere: repere[0])',
          [
            t(
              [
                [
                  [1989, 'Web'],
                  [1936, 'Turing']
                ]
              ],
              [
                [1936, 'Turing'],
                [1989, 'Web']
              ]
            ),
            t([[]], [])
          ],
          [
            'Chaque repère est un couple dont la date est en position 0.',
            'sorted construit une nouvelle liste.',
            'Utilise key=lambda repere: repere[0].'
          ],
          'La clé de tri est la date, pas le nom du protagoniste ; une liste vide reste vide.',
          'Vérifie la clé : trier par le nom ne produit pas une chronologie.'
        )
      ],
      reflection: 'Pourquoi une procédure peut-elle exister avant la machine qui l’exécute ?',
      review: [
        'Je distingue un modèle théorique d’une machine construite.',
        'Je situe des protagonistes et des idées.',
        'Je distingue Internet et Web.'
      ]
    })
  ]
};

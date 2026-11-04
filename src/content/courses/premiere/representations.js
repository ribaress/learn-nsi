import {
  lesson,
  section as s,
  example as e,
  activity as a,
  answer as q,
  python as p,
  test as t,
  source
} from './authoring.js';
import { basesFoundation } from './bases-foundation.js';
const bases = (changes) =>
  source(
    '2.4 Représentation d’un entier positif dans différentes bases',
    'T2_Representation_des_donnees/2.4_Bases/cours.md',
    changes
  );
export default {
  id: 'representations',
  title: 'Représenter les données',
  lessons: [
    lesson({
      id: 'premiere-bases',
      title: 'Bases, octets et hexadécimal',
      ...basesFoundation,
      official: ['P-B1', 'P-B2'],
      exercises: [
        q(
          'p-b1',
          'Un format de capteur',
          'Un capteur stocke un entier non signé sur 6 bits. Quelle valeur maximale peut-il stocker ?',
          63,
          [
            'Les 6 bits sont tous à 1 au maximum.',
            'Il existe 2**6 configurations, en comptant zéro.',
            'La dernière valeur est 2**6 − 1.'
          ],
          'Les 64 configurations représentent 0 à 63.',
          'Compte aussi la valeur zéro avant de déduire le maximum.',
          bases(
            'Adaptation de l’exercice sur le maximum d’un octet : passage à un capteur 6 bits, reformulation, aides graduées et justification ajoutées.'
          )
        ),
        q(
          'p-b2',
          'Une couleur en hexadécimal',
          'Quel code hexadécimal complet correspond à RGB (32, 160, 255) ? Réponds sous la forme #RRGGBB.',
          '#20A0FF',
          [
            'Chaque composante occupe deux chiffres hexadécimaux.',
            '32 = 2×16 ; 160 = 10×16.',
            'Les trois couples sont 20, A0 et FF.'
          ],
          'On concatène les trois octets : #20A0FF.',
          'Ne convertis pas les trois composantes comme un seul entier.',
          bases(
            'Adaptation de la conversion RGB de l’exercice 2 : nouvelle couleur, réponse canonique complète, étapes et retour d’erreur ajoutés.'
          )
        ),
        p(
          'p-b3',
          'Compter les bits',
          'Écris bits_necessaires(n), pour n entier positif ou nul. Zéro doit renvoyer 1. Utilise des divisions par 2.',
          'bits_necessaires',
          'n',
          'def bits_necessaires(n):\n    nombre = 1\n    while n >= 2:\n        n //= 2\n        nombre += 1\n    return nombre',
          [t([0], 1), t([255], 8), t([256], 9)],
          [
            'Une division entière retire le dernier chiffre binaire.',
            'Commence avec un chiffre même pour zéro.',
            'Tant que n >= 2, divise n et incrémente le compteur.'
          ],
          'Après chaque division, le quotient a un chiffre de moins ; la boucle finit car le quotient diminue.',
          'Teste 0 et 1 : une boucle qui commence uniquement sur n>0 peut retourner zéro bit.'
        )
      ]
    }),
    lesson({
      id: 'premiere-signes',
      title: 'Entiers signés et complément à deux',
      duration: 35,
      prerequisites: ['Représentation binaire non signée.'],
      objectives: [
        'Coder un entier négatif sur une taille fixée.',
        'Détecter une valeur hors domaine.'
      ],
      official: ['P-B2', 'P-B3'],
      sections: [
        s(
          'Le bit de gauche change de rôle',
          'En complément à deux sur n bits, le bit de poids fort pèse −2**(n−1), les autres gardent leurs poids positifs. Le domaine est donc −2**(n−1) à 2**(n−1)−1. Sur 8 bits, 11111111 représente −128+127, donc −1.'
        ),
        s(
          'Coder un négatif',
          'Pour coder −x sur n bits, on peut calculer 2**n−x puis écrire cet entier non signé sur n bits. Autre méthode équivalente : inverser les bits de x puis ajouter 1. La taille doit être fixée avant le calcul.',
          'print(format((1 << 8) - 5, "08b"))  # 11111011'
        ),
        s(
          'Calculer et surveiller le domaine',
          'Les mêmes circuits d’addition servent aux entiers signés et non signés. Le résultat mathématique peut sortir du domaine : 127+1 n’est pas représentable sur 8 bits signés. Python ne reproduit pas ce débordement automatiquement, car ses entiers ne sont pas limités à huit bits.'
        )
      ],
      examples: [
        e(
          'Lire un mot',
          '11110110 sur 8 bits signés',
          'La lecture non signée vaut 246 ; retirer 256 donne −10.',
          '−10'
        ),
        e(
          'Coder une température',
          '−7 sur 8 bits',
          '256−7=249 ; 249 s’écrit 11111001.',
          '11111001'
        ),
        e(
          'Valeur interdite',
          'Coder 128 en signé sur 8 bits',
          'Le domaine s’arrête à 127 ; 10000000 coderait −128.',
          'Impossible dans ce format.'
        )
      ],
      activity: a(
        'bits',
        'Compare le même mot avec et sans interprétation signée.',
        'Le bit de gauche à 1 rend la valeur signée négative.',
        'Le mot n’a pas de signe intrinsèque : le format détermine sa lecture.',
        { value: 249, bits: 8, signed: true }
      ),
      exercises: [
        q(
          'p-s1',
          'Lire sur quatre bits',
          'Que représente 1101 en complément à deux sur 4 bits ?',
          -3,
          ['Le poids de gauche est −8.', 'Les autres bits valent 4, 0 et 1.', 'Calcule −8+4+1.'],
          '−8+4+1 vaut −3 ; soustraire 16 à 13 donne le même résultat.',
          'N’utilise pas le premier bit comme un simple signe suivi de la valeur 101.'
        ),
        q(
          'p-s2',
          'Dimensionner une somme',
          'Quel est le nombre minimal de bits signés nécessaires pour coder 100+60 ?',
          9,
          [
            'La somme est 160.',
            'Sur 8 bits signés, le maximum est 127.',
            'Sur 9 bits signés, le maximum est 255.'
          ],
          '160 est hors du domaine à 8 bits mais entre dans celui à 9 bits.',
          'Le domaine signé perd une puissance de deux positive : ne raisonne pas comme en non signé.'
        ),
        p(
          'p-s3',
          'Décoder un mot',
          'Écris decode_signe(mot), où mot est une chaîne binaire non vide.',
          'decode_signe',
          'mot',
          'def decode_signe(mot):\n    valeur = int(mot, 2)\n    if mot[0] == "1":\n        valeur -= 2 ** len(mot)\n    return valeur',
          [t(['11111111'], -1), t(['0111'], 7), t(['1000'], -8)],
          [
            'Lis d’abord le mot comme un entier non signé.',
            'Regarde le premier caractère.',
            'S’il vaut 1, retire 2**len(mot).'
          ],
          'La soustraction remplace le poids +2**(n−1) par son opposé.',
          'La taille est len(mot), pas la taille minimale de l’entier après conversion.'
        )
      ],
      reflection: 'Pourquoi préciser « sur 8 bits » est-il indispensable pour coder un négatif ?',
      review: [
        'Je donne le domaine signé.',
        'Je code et décode le complément à deux.',
        'Je détecte un débordement.'
      ]
    }),
    lesson({
      id: 'premiere-flottants',
      title: 'Approcher les réels avec des flottants',
      duration: 35,
      prerequisites: ['Puissances de deux et fractions.'],
      objectives: [
        'Développer une fraction en base 2.',
        'Comparer des résultats approchés avec une tolérance.'
      ],
      official: ['P-B4'],
      sections: [
        s(
          'Des chiffres après la virgule',
          'Après la virgule binaire, les poids sont 1/2, 1/4, 1/8… Pour obtenir un chiffre, on multiplie la partie fractionnaire par 2 ; sa partie entière est le chiffre suivant. 0,25 = 0,01₂ est fini ; 1/3 = 0,010101…₂ ne l’est pas.'
        ),
        s(
          'Une mémoire finie impose un arrondi',
          'Un flottant conserve un signe, une significande de taille limitée et un exposant. Il ne peut conserver toutes les fractions. 0,1 décimal produit une répétition binaire et est arrondi. Ajouter deux approximations peut conduire à une autre approximation.',
          'print(0.1 + 0.2)\nprint((0.1 + 0.2) == 0.3)'
        ),
        s(
          'Comparer selon le problème',
          'Une égalité exacte entre calculs flottants peut échouer. On utilise une tolérance absolue choisie selon l’unité, ou math.isclose avec tolérances relative et absolue. Une tolérance trop grande masque une erreur ; pour compter des centimes exactement, des entiers sont souvent préférables.'
        )
      ],
      examples: [
        e(
          'Fraction finie',
          '0,625',
          '0,625 = 1/2 + 1/8 ; les trois bits après la virgule sont 101.',
          '0,101₂'
        ),
        e(
          'Fraction périodique',
          '0,1 décimal',
          'Les multiplications par deux donnent 0,0,0,1,1,0,0,1,1… Une répétition apparaît.',
          '0,000110011…₂'
        ),
        e(
          'Égalité trompeuse',
          '0.1 + 0.2 == 0.3',
          'Les opérandes et le résultat sont arrondis en binaire. La différence est très petite, mais non nulle.',
          'False ; abs((0.1+0.2)-0.3) < 1e-12 vaut True.'
        )
      ],
      activity: a(
        'trace',
        'Observe l’arrondi puis le test avec tolérance.',
        'L’égalité exacte échoue ; le test de proximité réussit.',
        'La trace présente un calcul précis, sans simuler tous les formats flottants.',
        {
          code: 'x = 0.1 + 0.2\negal = x == 0.3\nproche = abs(x - 0.3) < 1e-12',
          frames: [
            {
              line: 1,
              variables: { x: 0.30000000000000004 },
              explanation: 'Addition de représentations approchées.'
            },
            { line: 2, variables: { egal: false }, explanation: 'La différence n’est pas zéro.' },
            {
              line: 3,
              variables: { proche: true },
              explanation: 'La différence est sous la tolérance.'
            }
          ]
        }
      ),
      exercises: [
        q(
          'p-f1',
          'Représenter un quart',
          'Donne les deux chiffres après la virgule dans 0,25 en base 2.',
          '01',
          [
            'Les poids sont 1/2 puis 1/4.',
            'Le poids 1/2 est trop grand.',
            'Prends zéro moitié et un quart.'
          ],
          '0×1/2 + 1×1/4 = 0,25.',
          'Lis les poids fractionnaires de gauche à droite ; ils ne sont pas 1 et 2.'
        ),
        p(
          'p-f2',
          'Comparer des mesures',
          'Écris proches(x,y,tolerance) qui renvoie True si la distance absolue est inférieure ou égale à la tolérance, supposée positive.',
          'proches',
          'x, y, tolerance',
          'def proches(x, y, tolerance):\n    return abs(x-y) <= tolerance',
          [t([0.1 + 0.2, 0.3, 1e-12], true), t([1, 2, 0.2], false), t([-2, -2, 0], true)],
          [
            'La distance doit rester positive.',
            'Utilise abs sur la différence.',
            'Le seuil lui-même est accepté : utilise <=.'
          ],
          'La valeur absolue rend la comparaison symétrique ; on choisit ici une tolérance absolue.',
          'Soustraire sans abs accepte à tort toute différence très négative.'
        ),
        p(
          'p-f3',
          'Développer une fraction',
          'Écris chiffres_binaires(x,n) qui renvoie une chaîne des n premiers chiffres binaires après la virgule, pour 0 <= x < 1.',
          'chiffres_binaires',
          'x, n',
          'def chiffres_binaires(x, n):\n    resultat = ""\n    for _ in range(n):\n        x *= 2\n        chiffre = int(x)\n        resultat += str(chiffre)\n        x -= chiffre\n    return resultat',
          [t([0.625, 3], '101'), t([0.25, 4], '0100'), t([0.5, 0], '')],
          [
            'Multiplie le reste fractionnaire par 2 à chaque étape.',
            'Le prochain chiffre est int(x) après multiplication.',
            'Retire ce chiffre à x avant l’étape suivante.'
          ],
          'Chaque étape extrait un poids fractionnaire. Le programme produit une troncature ; il ne reconstruit pas une précision infinie.',
          'Si tu ne retires pas la partie entière, les chiffres suivants dépassent 1.'
        )
      ],
      reflection:
        'Quel test de proximité conviendrait à une mesure en mètres précise au millimètre ?',
      review: [
        'Je décompose une fraction en base 2.',
        'Je sais pourquoi certains réels sont approchés.',
        'Je choisis une tolérance explicitement.'
      ]
    }),
    lesson({
      id: 'premiere-logique',
      title: 'Booléens, tables et circuits',
      duration: 35,
      prerequisites: ['Expressions de comparaison.'],
      objectives: [
        'Construire une table de vérité.',
        'Distinguer ET, OU inclusif, XOR et négation.'
      ],
      official: ['P-B5'],
      sections: [
        s(
          'Composer des conditions',
          'and exige deux conditions vraies, or au moins une, not inverse la vérité. Pour deux variables, la table comporte quatre lignes : faux/faux, faux/vrai, vrai/faux, vrai/vrai. Les parenthèses rendent la structure visible.'
        ),
        s(
          'Du XOR à l’addition',
          'Le OU exclusif est vrai quand les deux entrées diffèrent. Pour additionner deux bits, la somme est leur XOR et la retenue leur AND : 1+1 donne somme 0, retenue 1. Un circuit combinatoire calcule une sortie déterminée par les entrées présentes.'
        ),
        s(
          'Une évaluation séquentielle',
          'Python n’évalue pas la seconde partie de a and b si a est faux, ni celle de a or b si a est vrai. Cela permet de protéger un accès ou une division.',
          'def positif_inverse(x):\n    return x != 0 and 1 / x > 0'
        )
      ],
      examples: [
        e(
          'Autoriser',
          'badge=True, porte_ouverte=False ; badge and not porte_ouverte',
          'not False vaut True ; les deux opérandes de and sont alors vrais.',
          'True'
        ),
        e(
          'Un demi-additionneur',
          'a=1, b=1',
          'Les entrées sont identiques donc XOR=0 ; AND=1 car les deux bits valent 1.',
          'Somme=0, retenue=1'
        ),
        e(
          'Éviter une erreur',
          'x=0 ; x != 0 and 1/x > 0',
          'La première condition est fausse ; la division n’est pas exécutée.',
          'False, sans division par zéro.'
        )
      ],
      activity: a(
        'logic',
        'Construis les quatre lignes de la porte AND puis compare avec OR.',
        'Seule la ligne 1,1 allume AND.',
        'La porte est un modèle logique sans délai électrique ni tension physique.',
        { gate: 'AND' }
      ),
      exercises: [
        q(
          'p-lb1',
          'Une ligne de table',
          'Que vaut (True or False) and not True ? Réponds True ou False.',
          'False',
          [
            'Calcule d’abord la parenthèse.',
            'not True donne False.',
            'True and False donne False.'
          ],
          'L’OU vaut True, puis l’ET avec False rend toute l’expression fausse.',
          'Respecte les parenthèses et la négation avant de combiner les valeurs.'
        ),
        p(
          'p-lb2',
          'Programmer le XOR',
          'Écris xor(a,b) sur deux booléens sans utiliser !=.',
          'xor',
          'a, b',
          'def xor(a, b):\n    return (a and not b) or (not a and b)',
          [
            t([true, false], true),
            t([true, true], false),
            t([false, false], false),
            t([false, true], true)
          ],
          [
            'Les deux cas vrais sont a seul et b seul.',
            'Écris chaque cas avec and et not.',
            'Relie ces deux cas par or.'
          ],
          'Les cas sont exclusifs ; deux entrées vraies doivent rendre False.',
          'a or b est inclusif : teste spécifiquement True,True.'
        ),
        p(
          'p-lb3',
          'Lister une table',
          'Écris table_logique(operation) qui renvoie les lignes [a,b,resultat], dans l’ordre False/False, False/True, True/False, True/True. operation vaut "and", "or" ou "xor" ; applique cet opérateur aux deux entrées.',
          'table_logique',
          'operation',
          'def table_logique(operation):\n    table = []\n    for a in [False,True]:\n        for b in [False,True]:\n            if operation == "and":\n                resultat = a and b\n            elif operation == "or":\n                resultat = a or b\n            else:\n                resultat = a != b\n            table.append([a,b,resultat])\n    return table',
          [
            t(
              ['and'],
              [
                [false, false, false],
                [false, true, false],
                [true, false, false],
                [true, true, true]
              ]
            ),
            t(
              ['or'],
              [
                [false, false, false],
                [false, true, true],
                [true, false, true],
                [true, true, true]
              ]
            ),
            t(
              ['xor'],
              [
                [false, false, false],
                [false, true, true],
                [true, false, true],
                [true, true, false]
              ]
            )
          ],
          [
            'Il faut deux boucles imbriquées.',
            'a varie dans la boucle extérieure ; b dans la boucle intérieure.',
            'Choisis le calcul avec if/elif selon operation ; le XOR vaut a!=b.'
          ],
          'Les deux boucles produisent toutes les combinaisons ; le choix d’opérateur change uniquement le troisième champ. La dernière ligne distingue OR et XOR.',
          'Si OR et XOR donnent la même table, vérifie le cas où les deux entrées valent True.'
        )
      ],
      reflection:
        'Pourquoi déplacer les opérandes d’un and peut-il provoquer une erreur alors que sa table de vérité ne change pas ?',
      review: [
        'Je construis toutes les lignes d’une table.',
        'Je distingue OR et XOR.',
        'Je prévois le court-circuit logique.'
      ]
    }),
    lesson({
      id: 'premiere-encodages',
      title: 'Caractères, octets et encodages',
      duration: 35,
      prerequisites: ['Octet et écriture hexadécimale.'],
      objectives: [
        'Différencier caractère, point de code et octets.',
        'Transcoder un texte sans perdre ses caractères.'
      ],
      official: ['P-B6', 'P-B7'],
      sections: [
        s(
          'Des alphabets différents',
          'ASCII code 128 symboles et ne contient pas é. ISO-8859-1, ou Latin-1, utilise un octet et couvre notamment des caractères d’Europe occidentale. Unicode associe un point de code à un très grand ensemble de caractères ; UTF-8 représente ces points par un nombre variable d’octets.'
        ),
        s(
          'Décoder puis encoder',
          'Lire des octets demande de connaître leur encodage. Après décodage, Python manipule une chaîne Unicode. On peut alors encoder cette chaîne dans un autre format.',
          'texte = bytes([99,97,102,233]).decode("latin-1")\nut8 = texte.encode("utf-8")\nprint(list(ut8))'
        ),
        s(
          'Un fichier ne révèle pas toujours son format',
          'Décoder avec le mauvais encodage peut provoquer une erreur ou du texte corrompu. Le simple fait qu’une opération réussisse ne prouve pas que l’encodage est correct. Pour convertir un fichier, on lit avec son encodage source, puis on écrit la chaîne dans l’encodage destination. Le texte est conservé si tous ses caractères sont représentables ; les octets peuvent changer. Il faut préciser encoding à chaque ouverture, sans remplacer silencieusement les caractères impossibles.'
        )
      ],
      examples: [
        e(
          'ASCII',
          '"A"',
          'Le point de code de A vaut 65 ; ASCII et UTF-8 donnent ici le même octet.',
          '[65]'
        ),
        e(
          'UTF-8',
          '"é"',
          'Le point de code vaut 233 ; UTF-8 le représente par deux octets de valeurs 195 et 169.',
          '[195, 169]'
        ),
        e(
          'Format trop restreint',
          '"€".encode("latin-1")',
          'Le symbole euro n’appartient pas à ISO-8859-1 ; remplacer un caractère perdrait de l’information.',
          'UnicodeEncodeError'
        )
      ],
      activity: a(
        'table',
        'Compare longueur du texte et nombre d’octets.',
        'Un caractère n’occupe pas toujours un octet.',
        'Les valeurs décrivent des encodages précis ; le modèle ne détecte pas un encodage inconnu.',
        {
          columns: ['texte', 'encodage', 'octets'],
          rows: [
            ['A', 'UTF-8', '65'],
            ['é', 'Latin-1', '233'],
            ['é', 'UTF-8', '195,169']
          ]
        }
      ),
      exercises: [
        q(
          'p-e1',
          'Compter les octets',
          'Combien d’octets UTF-8 occupe le texte "été", sachant que é en prend deux et t un seul ?',
          5,
          [
            'Il y a deux é.',
            'Additionne 2+1+2.',
            'La longueur en caractères est 3, mais ce n’est pas la réponse.'
          ],
          'Deux caractères accentués et une lettre ASCII occupent cinq octets.',
          'Ne confonds pas len(texte) et len(texte.encode("utf-8")).'
        ),
        p(
          'p-e2',
          'Transcoder des octets',
          'Écris vers_utf8(octets), une liste d’entiers en Latin-1, qui renvoie la liste des octets UTF-8 du même texte.',
          'vers_utf8',
          'octets',
          'def vers_utf8(octets):\n    texte = bytes(octets).decode("latin-1")\n    return list(texte.encode("utf-8"))',
          [t([[233]], [195, 169]), t([[65, 66]], [65, 66]), t([[]], [])],
          [
            'Construis bytes(octets).',
            'Décode avec latin-1 avant de réencoder.',
            'Convertis les bytes UTF-8 en liste pour la réponse.'
          ],
          'Le texte intermédiaire préserve les caractères ; les octets changent.',
          'Réinterpréter directement les octets comme UTF-8 ne réalise pas une conversion.'
        ),
        Object.assign(
          p(
            'p-e3',
            'Transcoder un fichier texte',
            'Écris transcoder_fichier(nom) : lis le fichier donné en UTF-8, écris le même texte en Latin-1 dans sortie.txt, puis renvoie la liste des octets de sortie.txt. Les fichiers accent.txt contenant été et vide.txt sont fournis. Tous leurs caractères existent en Latin-1.',
            'transcoder_fichier',
            'nom',
            'def transcoder_fichier(nom):\n    with open(nom, encoding="utf-8") as fichier:\n        texte = fichier.read()\n    with open("sortie.txt", "w", encoding="latin-1") as fichier:\n        fichier.write(texte)\n    with open("sortie.txt", "rb") as fichier:\n        return list(fichier.read())',
            [t(['accent.txt'], [233, 116, 233]), t(['vide.txt'], [])],
            [
              'Lis la source avec open(nom, encoding="utf-8") puis read().',
              'Écris cette chaîne avec le mode w et encoding="latin-1" dans sortie.txt.',
              'Rouvre sortie.txt en mode rb pour lire ses octets et transforme-les en liste.'
            ],
            'La lecture décode UTF-8 en caractères et l’écriture réencode ces mêmes caractères en Latin-1. Le résultat été occupe trois octets Latin-1 au lieu de cinq UTF-8. Chaque with ferme le fichier avant l’étape suivante.',
            'Si tu obtiens 195 et 169, tu lis encore les octets UTF-8 : vérifie l’encodage du fichier de sortie et ferme-le avant sa relecture.'
          ),
          { dataFiles: { 'accent.txt': 'été', 'vide.txt': '' } }
        )
      ],
      reflection: 'Pourquoi UTF-8 et Unicode ne désignent-ils pas exactement la même chose ?',
      review: [
        'Je distingue point de code et octets.',
        'Je décode avant de réencoder.',
        'Je fixe l’encodage des fichiers.'
      ]
    })
  ]
};

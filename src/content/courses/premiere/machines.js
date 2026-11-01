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
const cpu = (changes) =>
  source(
    '3.2 Architecture Von Neumann — simulation assembleur, activités 1 et 2.3',
    'T3_Architecture_materielle/3.2_Architecture_Von_Neumann/cours.md',
    changes
  );
export default {
  id: 'machines',
  title: 'Machines, réseaux et systèmes',
  lessons: [
    lesson({
      id: 'premiere-processeur',
      title: 'Processeur, mémoire et circuits combinatoires',
      duration: 45,
      prerequisites: ['Bits, logique et affectations.'],
      objectives: [
        'Décrire le rôle des constituants.',
        'Tracer des instructions élémentaires.',
        'Relier un circuit à une fonction booléenne.'
      ],
      official: ['P-M1', 'P-M2'],
      sections: [
        s(
          'Des rôles distincts',
          'La mémoire contient des données et des instructions. Le processeur comprend notamment une unité de contrôle qui organise l’exécution, une unité arithmétique et logique qui calcule, et des registres de travail rapides. Les bus transportent informations et adresses ; les entrées-sorties relient la machine à l’extérieur. Un stockage persistant n’a pas le même rôle que la mémoire vive.'
        ),
        s(
          'Chercher, décoder, exécuter',
          'Le compteur ordinal indique l’instruction à lire. L’unité de contrôle la décode ; l’opération agit sur des registres ou la mémoire, puis l’exécution avance ou saute. Dans notre pseudo-machine, LOAD x charge la valeur x, ADD y ajoute y, STORE écrit le registre et HALT arrête. Ce vocabulaire est pédagogique et ne décrit pas un processeur commercial précis.'
        ),
        s(
          'Des portes aux architectures',
          'Un circuit combinatoire réalise une fonction booléenne : la somme de deux bits combine XOR et AND. Une architecture monoprocesseur possède un processeur ; plusieurs processeurs peuvent coopérer et partager des ressources. La fréquence seule ne donne pas le temps d’un programme : nombre d’instructions, mémoire et parallélisme interviennent.'
        )
      ],
      examples: [
        e(
          'Une addition',
          'LOAD 4 ; ADD 7 ; STORE r',
          'Le registre reçoit 4 puis 11 ; STORE copie 11 dans la mémoire r.',
          'r=11'
        ),
        e(
          'Une soustraction',
          'LOAD 20 ; SUB 6 ; SUB 3',
          'Chaque instruction lit le registre laissé par la précédente.',
          'Registre final : 11.'
        ),
        e(
          'Confusion de mémoire',
          'Éteindre puis rallumer une machine',
          'La mémoire vive perd habituellement son état sans alimentation ; le disque conserve les fichiers.',
          'Un programme non sauvegardé peut être perdu.'
        )
      ],
      activity: a(
        'cpu',
        'Exécute une instruction à la fois et distingue registre et mémoire.',
        'Une addition change d’abord un registre avant une éventuelle écriture mémoire.',
        'La simulation réduit l’architecture à quelques composants et instructions ; caches et exécution parallèle ne sont pas modélisés.',
        {}
      ),
      exercises: [
        q(
          'p-m1',
          'Tracer un registre',
          'Le registre reçoit 6 puis l’instruction ADD 9 est exécutée. Quelle valeur contient-il ensuite ?',
          15,
          [
            'LOAD a placé 6 dans le registre.',
            'ADD utilise cette valeur comme premier opérande.',
            'Calcule 6+9.'
          ],
          'L’UAL calcule 15, qui remplace le contenu du registre.',
          'ADD ne charge pas simplement son opérande : conserve la valeur précédente.',
          cpu(
            'Adaptation de la simulation a+b : jeu d’instructions simplifié, nombres remplacés par 6 et 9, question de trace locale et aides ajoutées.'
          )
        ),
        p(
          'p-m2',
          'Interpréter un calcul en étapes',
          'Écris calcul_registres(w,x,y) simulant R1=x, R2=y, R2=R2+R1, R3=w, R3=R3−R2 ; renvoie R3.',
          'calcul_registres',
          'w, x, y',
          'def calcul_registres(w, x, y):\n    r1 = x\n    r2 = y\n    r2 = r2 + r1\n    r3 = w\n    r3 = r3 - r2\n    return r3',
          [t([18, 4, 7], 7), t([3, 5, 2], -4), t([0, 0, 0], 0)],
          [
            'Suis le registre destination à chaque étape.',
            'La somme finale reste dans r2.',
            'La dernière opération est w−(x+y).'
          ],
          'La trace respecte l’ordre : la soustraction utilise la somme construite avant elle.',
          'Si tu obtiens x+y−w, tu as inversé source et destination de la soustraction.',
          cpu(
            'Adaptation de l’exercice assembleur w−(x+y) : pseudo-registres Python exécutables, entrées paramétrées et différentes, cas négatif, jeux de tests et retour d’erreur ajoutés.'
          )
        ),
        p(
          'p-m3',
          'Un demi-additionneur',
          'Écris demi_additionneur(a,b), avec a et b égaux à 0 ou 1, qui renvoie (somme,retenue), deux entiers.',
          'demi_additionneur',
          'a, b',
          'def demi_additionneur(a, b):\n    return (int(a != b), int(a == 1 and b == 1))',
          [t([0, 0], [0, 0]), t([1, 0], [1, 0]), t([1, 1], [0, 1])],
          [
            'La somme vaut le XOR des entrées.',
            'La retenue vaut leur AND.',
            'Convertis les résultats booléens avec int.'
          ],
          'L’addition 1+1 vaut 10₂, soit une somme de poids faible nulle et une retenue.',
          'Ne renvoie pas le nombre 2 dans la case somme : chaque sortie est un bit.'
        )
      ],
      reflection:
        'Pourquoi un programme enregistré en mémoire relie-t-il les idées de données et d’instructions ?',
      review: [
        'Je distingue mémoire, registre et stockage.',
        'Je trace une instruction et son résultat.',
        'Je relie une porte logique à une opération.'
      ]
    }),
    lesson({
      id: 'premiere-reseaux',
      title: 'Paquets, encapsulation et protocole du bit alterné',
      duration: 45,
      prerequisites: ['Messages et graphe simple.'],
      objectives: [
        'Expliquer le découpage et les couches.',
        'Simuler perte, accusé et retransmission sans doublon.'
      ],
      official: ['P-M3', 'P-M4', 'P-M5'],
      sections: [
        s(
          'Un réseau de rôles',
          'Un commutateur relie des équipements dans un réseau local ; un routeur fait communiquer des réseaux ; un serveur fournit un service. Des liens composent un chemin entre source et destination. Découper un message en paquets permet de partager les liens et de retransmettre une partie perdue plutôt que tout le message.'
        ),
        s(
          'Envelopper pour transporter',
          'L’encapsulation ajoute des informations à plusieurs niveaux : données d’application, segment de transport, paquet IP, trame du lien local. Les adresses ont des rôles différents. Les en-têtes aident à acheminer, identifier ou contrôler les données ; le destinataire retire les enveloppes dans l’ordre inverse.'
        ),
        s(
          'Le bit alterné',
          'L’émetteur envoie un paquet numéroté 0 et attend son accusé. Si le délai expire, il renvoie le même paquet avec le même bit. Le récepteur livre le paquet seulement si son bit est celui attendu, mais accuse aussi un doublon déjà reçu. Après succès, les deux côtés alternent 0 et 1. Un accusé perdu doit donc provoquer un renvoi sans double livraison. Ce modèle arrêt-et-attente suppose ici l’absence de réordonnancement très tardif entre plusieurs cycles.'
        )
      ],
      examples: [
        e(
          'Une perte de données',
          'Paquet 0 perdu, aucun accusé',
          'Le délai expire ; l’émetteur réémet 0. Le récepteur le livre une fois et attend ensuite 1.',
          'Une retransmission permet de progresser.'
        ),
        e(
          'Un accusé perdu',
          '0 reçu et livré, accusé 0 perdu',
          'Le renvoi 0 est reconnu comme doublon car le récepteur attend 1. Il n’est pas livré mais il est de nouveau accusé.',
          'Une livraison, deux réceptions possibles.'
        ),
        e(
          'Une mauvaise alternance',
          'Changer de bit juste après envoi sans attendre l’accusé',
          'L’émetteur pourrait abandonner un paquet perdu.',
          'Alterner seulement après réception de l’accusé attendu.'
        )
      ],
      activity: a(
        'network',
        'Supprime mentalement le premier accusé et raconte les étapes de récupération.',
        'Le paquet est reçu deux fois mais livré une seule fois.',
        'Le graphe montre les liens ; les pertes et délais doivent être tracés dans le protocole, il ne s’agit pas d’une mesure d’un réseau réel.',
        {
          nodes: [
            { id: 'A', label: 'Poste', x: 10, y: 40 },
            { id: 'B', label: 'Commutateur', x: 45, y: 40 },
            { id: 'C', label: 'Routeur', x: 75, y: 40 },
            { id: 'D', label: 'Serveur', x: 95, y: 75 }
          ],
          edges: [
            ['A', 'B', 1],
            ['B', 'C', 1],
            ['C', 'D', 1]
          ],
          start: 'A',
          goal: 'D'
        }
      ),
      exercises: [
        q(
          'p-r1',
          'Découper un message',
          'Un message de 2500 octets est découpé en charges utiles de 1000 octets maximum. Combien de paquets sont nécessaires, sans compter les en-têtes ?',
          3,
          [
            'Deux paquets portent seulement 2000 octets.',
            'Il reste encore 500 octets.',
            'Le dernier paquet peut être plus court.'
          ],
          'Deux paquets pleins et un paquet partiel transportent le message.',
          'La division entière seule oublie le reste.'
        ),
        p(
          'p-r2',
          'Simuler le récepteur',
          'Écris livraisons(bits) : le récepteur attend 0 initialement, livre et alterne seulement si le bit reçu égale le bit attendu. Renvoie le nombre de livraisons. Les doublons sont ignorés pour la livraison.',
          'livraisons',
          'bits',
          'def livraisons(bits):\n    attendu = 0\n    nombre = 0\n    for bit in bits:\n        if bit == attendu:\n            nombre += 1\n            attendu = 1-attendu\n    return nombre',
          [t([[0, 0, 1]], 2), t([[0, 1, 1, 0]], 3), t([[1, 1]], 0), t([[]], 0)],
          [
            'Initialise attendu à 0 et le compteur à 0.',
            'Un bit inattendu n’incrémente rien.',
            'Après une livraison, attendu devient 1−attendu.'
          ],
          'Le second 0 de [0,0,1] correspond à une réémission et n’est pas livré ; ce modèle ne représente que le récepteur.',
          'Alterner après chaque réception, y compris un doublon, casse le protocole.'
        ),
        p(
          'p-r3',
          'Découper sans perdre de données',
          'Écris paquets(texte,taille), avec taille>0, qui renvoie les fragments consécutifs de taille au plus taille. Une chaîne vide donne [].',
          'paquets',
          'texte, taille',
          'def paquets(texte, taille):\n    morceaux = []\n    for debut in range(0, len(texte), taille):\n        morceaux.append(texte[debut:debut+taille])\n    return morceaux',
          [t(['ABCDE', 2], ['AB', 'CD', 'E']), t(['ABCD', 2], ['AB', 'CD']), t(['', 3], [])],
          [
            'Les débuts sont 0, taille, 2*taille…',
            'range accepte un pas.',
            'texte[debut:debut+taille] conserve aussi le dernier morceau court.'
          ],
          'Les morceaux reconstruisent le texte par concaténation. On découpe ici des caractères, pas des octets réseau ; une vraie charge utile doit être définie en octets.',
          'Ne supprime pas le dernier fragment sous prétexte qu’il est plus court.'
        )
      ],
      reflection:
        'Pourquoi un récepteur doit-il accuser un paquet qu’il reconnaît comme un doublon ?',
      review: [
        'Je distingue les rôles des équipements.',
        'J’explique paquets et encapsulation.',
        'Je trace une perte d’accusé sans double livraison.'
      ]
    }),
    lesson({
      id: 'premiere-systemes',
      title: 'Linux, fichiers, commandes et permissions',
      duration: 40,
      prerequisites: ['Dossiers et fichiers.'],
      objectives: [
        'Identifier les services du système.',
        'Naviguer et régler des permissions dans un terminal.'
      ],
      official: ['P-M6', 'P-M7', 'P-M8'],
      sections: [
        s(
          'Le système organise les ressources',
          'Le système d’exploitation gère notamment mémoire, processus, périphériques et fichiers. Un interpréteur de commandes demande ces services au système. GNU/Linux est un exemple de système libre : les libertés d’étudier, modifier et redistribuer le code se distinguent du prix. Un système propriétaire peut imposer d’autres conditions d’usage.'
        ),
        s(
          'Naviguer avec des chemins',
          'pwd donne le dossier courant ; ls liste son contenu ; cd change de dossier ; mkdir crée un répertoire ; cp copie et mv déplace ou renomme. Un chemin absolu commence à la racine / ; un chemin relatif part du dossier courant. .. désigne le parent. Dans l’atelier, on pratique dans un bac à sable avant d’agir sur de vrais fichiers.',
          'pwd\nls\nmkdir essais\ncd essais\ncd ..'
        ),
        s(
          'Lire et attribuer les droits',
          'Les permissions r,w,x s’appliquent au propriétaire, au groupe et aux autres. r vaut 4, w vaut 2, x vaut 1 dans l’écriture octale. chmod 640 notes.txt donne rw- au propriétaire, r-- au groupe, --- aux autres. Sur un dossier, x autorise la traversée : les droits ne se lisent pas exactement comme ceux d’un fichier.'
        )
      ],
      examples: [
        e(
          'Un chemin relatif',
          'Courant /home/ada/cours ; cd ../projets',
          '.. remonte vers /home/ada puis projets descend dans son sous-dossier.',
          '/home/ada/projets'
        ),
        e(
          'Décomposer un droit',
          'rwxr-x---',
          'Le propriétaire peut lire, écrire, exécuter ; le groupe lire et exécuter ; les autres rien.',
          '750'
        ),
        e(
          'Un refus utile',
          'Un membre du groupe tente de modifier un fichier 640',
          'Le groupe n’a que r, sans w.',
          'Écriture refusée, sauf autre autorisation spécifique.'
        )
      ],
      activity: a(
        'shell',
        'Exécute pwd et ls, crée un dossier puis vérifie le chemin courant.',
        'mkdir ne change pas le dossier courant ; cd le fait.',
        'Ce terminal est pédagogique : ses fichiers et commandes simulés ne modifient pas le système réel.',
        {}
      ),
      exercises: [
        q(
          'p-os1',
          'Choisir la commande',
          'Quelle commande affiche le chemin du dossier courant sous Linux ?',
          'pwd',
          [
            'La commande ne change pas de dossier.',
            'ls affiche le contenu, pas le chemin.',
            'Son nom abrège print working directory.'
          ],
          'pwd affiche le répertoire de travail actuel.',
          'cd sert à se déplacer ; ls à lister le contenu.'
        ),
        q(
          'p-os2',
          'Interpréter chmod',
          'Quelle écriture numérique correspond à rw-r----- ?',
          640,
          [
            'Sépare les groupes rw-, r-- et ---.',
            'Chaque groupe additionne r=4, w=2, x=1.',
            'On obtient 6,4,0.'
          ],
          'Le propriétaire a 4+2, le groupe 4, les autres 0.',
          'Écris trois chiffres sans additionner les trois catégories entre elles.'
        ),
        p(
          'p-os3',
          'Calculer un groupe de droits',
          'Écris valeur_droits(texte), où texte contient trois caractères comme rw- ou r-x, qui renvoie la valeur octale de ce seul groupe.',
          'valeur_droits',
          'texte',
          'def valeur_droits(texte):\n    valeur = 0\n    if texte[0] == "r":\n        valeur += 4\n    if texte[1] == "w":\n        valeur += 2\n    if texte[2] == "x":\n        valeur += 1\n    return valeur',
          [t(['rwx'], 7), t(['r-x'], 5), t(['---'], 0), t(['rw-'], 6)],
          [
            'Chaque position représente une permission différente.',
            'Ajoute 4 pour r, 2 pour w et 1 pour x.',
            'Un tiret ne contribue pas à la somme.'
          ],
          'Le nombre est la somme des poids activés dans le groupe.',
          'Ne traite pas x comme une multiplication : c’est la permission d’exécuter ou traverser.'
        )
      ],
      reflection:
        'Pourquoi les permissions du dossier parent peuvent-elles empêcher l’accès à un fichier pourtant lisible ?',
      review: [
        'Je décris plusieurs fonctions du système.',
        'J’utilise des chemins absolus et relatifs.',
        'Je décompose les permissions par catégorie.'
      ]
    }),
    lesson({
      id: 'premiere-capteurs',
      title: 'Capteurs, actionneurs et cahier des charges',
      duration: 35,
      prerequisites: ['Conditions et boucles.'],
      objectives: [
        'Relier une mesure à une commande.',
        'Traduire une règle d’interface en programme testable.'
      ],
      official: ['P-M9', 'P-M10'],
      sections: [
        s(
          'Acquérir puis agir',
          'Un capteur mesure une grandeur et produit une donnée : température, lumière, distance. Un actionneur agit sur l’environnement : moteur, voyant, chauffage. Une interface homme-machine peut aussi recueillir une consigne par bouton et montrer un état sur un écran.'
        ),
        s(
          'Un cahier des charges précis',
          '« Allumer quand il fait chaud » est ambigu. « Allumer le ventilateur si la température est supérieure ou égale à 25 °C, sauf si l’utilisateur désactive le système » fixe une frontière et une priorité. Le programme doit traiter les valeurs égales au seuil et la désactivation.'
        ),
        s(
          'Une boucle et ses limites',
          'Le système répète acquisition, traitement puis commande. Une mesure peut être bruitée ou absente. Deux seuils distincts, pour allumer et éteindre, peuvent éviter des basculements répétés autour d’une seule frontière. Le simulateur n’est ni un étalonnage ni une garantie de sûreté matérielle.'
        )
      ],
      examples: [
        e(
          'Au-dessus du seuil',
          'Température 27 ; seuil 25 ; actif=True',
          'La mesure atteint le seuil et le système est autorisé.',
          'Ventilateur allumé.'
        ),
        e(
          'Frontière',
          'Température 25 ; règle >=25',
          'L’égalité est incluse dans la règle.',
          'Ventilateur allumé.'
        ),
        e(
          'Priorité',
          'Température 30 ; actif=False',
          'La désactivation interdit l’action même si la température est élevée.',
          'Ventilateur éteint.'
        )
      ],
      activity: a(
        'sensor',
        'Fais varier la mesure de part et d’autre de 25 et prévois l’état.',
        'La frontière exacte fait partie de la spécification.',
        'Le curseur remplace un capteur parfait ; bruit, panne, délais et puissance du ventilateur sont absents.',
        { initial: 23, threshold: 25 }
      ),
      exercises: [
        q(
          'p-ca1',
          'Reconnaître une fonction',
          'Un moteur qui ferme un volet est-il un capteur ou un actionneur ?',
          'actionneur',
          [
            'Il ne mesure pas la lumière.',
            'Il transforme une commande en mouvement.',
            'Il agit sur le volet.'
          ],
          'Le moteur réalise une action physique : c’est un actionneur.',
          'Un dispositif peut contenir les deux rôles, mais on demande ici le moteur.'
        ),
        p(
          'p-ca2',
          'Commander selon les exigences',
          'Écris ventiler(temperature,actif) qui renvoie True si actif est vrai et temperature>=25.',
          'ventiler',
          'temperature, actif',
          'def ventiler(temperature, actif):\n    return actif and temperature >= 25',
          [t([25, true], true), t([24, true], false), t([30, false], false)],
          [
            'Il faut satisfaire deux conditions.',
            'Le seuil est inclusif.',
            'Utilise and avec actif et temperature>=25.'
          ],
          'La frontière et la désactivation sont testées séparément.',
          'Si 25 échoue, remplace > par >= ; si la désactivation est ignorée, vérifie and.'
        ),
        {
          id: 'p-ca3',
          title: 'Réaliser le tableau de commande',
          kind: 'web',
          prompt:
            'Réalise une IHM locale : un input range #temperature (0 à 40, valeur initiale 23), un input checkbox #actif initialement coché et un output #etat. Affiche Allumé uniquement si la case est cochée et la température vaut au moins 25 ; sinon Éteint. Associe des labels aux entrées et actualise après chaque événement input ou change. Le curseur simule le capteur ; aucun appareil réel n’est commandé.',
          starter:
            '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Ventilation</title></head><body><!-- Construis les commandes et leur traitement --></body></html>',
          solution:
            '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Ventilation</title></head><body><label for="temperature">Température en °C</label><input id="temperature" type="range" min="0" max="40" value="23"><label for="actif">Système actif</label><input id="actif" type="checkbox" checked><output id="etat" aria-live="polite">Éteint</output><script>const temperature=document.querySelector("#temperature");const actif=document.querySelector("#actif");const etat=document.querySelector("#etat");function actualiser(){etat.textContent=actif.checked && Number(temperature.value)>=25 ? "Allumé" : "Éteint";}temperature.addEventListener("input",actualiser);actif.addEventListener("change",actualiser);actualiser();</script></body></html>',
          checks: [
            { selector: 'input#temperature', attribute: 'type', value: 'range' },
            { selector: 'input#actif', attribute: 'type', value: 'checkbox' },
            { selector: 'label[for="temperature"]' },
            { selector: 'label[for="actif"]' },
            { selector: 'output#etat', text: 'Éteint' },
            {
              selector: 'output#etat',
              text: 'Éteint',
              actions: [{ selector: '#temperature', value: '24' }]
            },
            {
              selector: 'output#etat',
              text: 'Allumé',
              actions: [{ selector: '#temperature', value: '25' }]
            },
            {
              selector: 'output#etat',
              text: 'Allumé',
              actions: [{ selector: '#temperature', value: '30' }]
            },
            {
              selector: 'output#etat',
              text: 'Éteint',
              actions: [
                { selector: '#temperature', value: '30' },
                { selector: '#actif', click: true }
              ]
            }
          ],
          hints: [
            'Crée les deux inputs avec des id et des labels liés par for.',
            'La condition en JavaScript est actif.checked && Number(temperature.value)>=25.',
            'Définis actualiser puis associe-la à input sur le curseur et change sur la case ; appelle-la aussi au chargement.'
          ],
          explanation:
            'Le curseur remplace la mesure, la case donne une consigne humaine et output représente la commande de l’actionneur. La même fonction calcule l’état initial et toutes les mises à jour. Dans l’aperçu, vérifie 24, 25, 30 puis décoche la case à 30 : le résultat doit devenir Éteint.',
          feedbackWrong:
            'Si décocher ne change rien, vérifie le gestionnaire change et la priorité donnée à actif.checked. Si 25 reste éteint, la comparaison doit être inclusive.'
        }
      ],
      reflection:
        'Quelles hypothèses du capteur parfait faudra-t-il revoir avant une réalisation matérielle ?',
      review: [
        'Je distingue acquisition et action.',
        'J’écris une frontière sans ambiguïté.',
        'Je teste les transitions d’une IHM.'
      ]
    })
  ]
};

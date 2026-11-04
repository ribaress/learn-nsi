import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const machinesPedagogy = {
  'premiere-processeur': {
    duration: 65,
    introduction: intro(
      'Tu suis une recette : tu lis une étape, gardes une quantité en tête, fais le calcul demandé et notes le résultat. Une machine exécute aussi des instructions en conservant des données de travail.',
      'Quels éléments de la machine lisent, calculent, transportent et conservent les informations ?',
      'Distinguer ces rôles rend compréhensible le fonctionnement d’un programme et la différence entre mémoire de travail et fichiers sauvegardés.',
      [
        'Séparer programme, données et matériel.',
        'Repérer mémoire et processeur.',
        'Suivre une instruction après l’autre.',
        'Relier les opérations à des portes et préparer une simulation Python.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Instruction',
        'Une instruction est une action élémentaire exprimée dans un langage défini. Le programme est une suite de ces instructions.',
        '« Charger 4, puis ajouter 7 » décrit deux actions à exécuter dans cet ordre.'
      ),
      recap(
        'Mémoire',
        'Une mémoire conserve des informations pour les retrouver. Il faut distinguer les données utilisées pendant un calcul des fichiers conservés durablement.',
        'Un document enregistré sur disque peut survivre à l’arrêt ; la mémoire vive perd habituellement son contenu.'
      ),
      recap(
        'Bit et addition binaire',
        'Un bit vaut 0 ou 1. En base 2, deux unités forment une paire, écrite 10 : une retenue à gauche et zéro unité à droite.',
        '1 + 1 donne un bit de somme égal à 0 et une retenue égale à 1.'
      )
    ],
    realLifeExamples: [
      life(
        'La recette sur le plan de travail',
        'Une recette est posée à côté d’un cuisinier qui garde quelques quantités dans des bols.',
        'La recette évoque les instructions ; les bols évoquent les registres, petits espaces de travail utilisés pendant les opérations.',
        'Un processeur ne comprend pas la recette en français ; il exécute un jeu d’instructions codées précisément.'
      ),
      life(
        'Un devoir oublié avant extinction',
        'Un élève ferme l’alimentation sans enregistrer le dernier paragraphe de son devoir.',
        'Le travail en mémoire vive peut disparaître tandis que la version enregistrée sur le stockage persistant reste disponible.',
        'Des logiciels disposent de sauvegardes automatiques ; leur existence dépend d’un mécanisme supplémentaire.'
      )
    ],
    sections: [
      s(
        'Répartir les tâches entre les composants',
        'Le processeur exécute les instructions ; la mémoire vive conserve les données et instructions en cours d’utilisation. Dans le processeur, l’unité de contrôle organise les étapes et l’unité arithmétique et logique effectue calculs et comparaisons. Des registres sont de petites mémoires de travail rapides. Les entrées-sorties relient clavier, écran et autres périphériques. Un stockage persistant, comme un disque, garde les fichiers au-delà de l’exécution courante.'
      ),
      s(
        'Transporter une valeur et son adresse',
        'Pour lire une case mémoire, la machine doit indiquer où elle se trouve : son adresse joue ce rôle. Un bus est un ensemble de liaisons transportant des informations, notamment données, adresses ou signaux de contrôle. Il ne faut pas confondre l’adresse d’une case avec le contenu de cette case. Un registre peut recevoir une donnée lue en mémoire puis fournir le résultat d’une opération avant qu’il soit écrit ailleurs.',
        {
          checkpoint: pause(
            'Quel composant effectue les opérations arithmétiques du processeur ?',
            'L’unité arithmétique et logique',
            'Le disque qui conserve les fichiers',
            'Le stockage garde les fichiers ; l’unité arithmétique et logique réalise les opérations demandées pendant l’exécution.'
          )
        }
      ),
      s(
        'Chercher, décoder puis exécuter',
        'Le compteur ordinal garde l’adresse de la prochaine instruction. L’unité de contrôle va la chercher, la décode pour déterminer l’action, puis déclenche son exécution. Dans notre pseudo-machine, LOAD 4 charge la valeur 4 dans le registre, ADD 7 lui ajoute 7, SUB 3 retire 3, STORE r copie sa valeur dans une mémoire nommée r, et HALT arrête l’exécution. Ce vocabulaire est une convention pédagogique. Après chaque étape, on utilise le registre laissé par l’étape précédente, pas sa valeur initiale.'
      ),
      s(
        'Décomposer une addition en deux sorties',
        'Une porte logique transforme des bits selon une règle. XOR, le OU exclusif, vaut 1 lorsque les entrées diffèrent ; AND, le ET, vaut 1 lorsque les deux entrées valent 1. Un demi-additionneur combine les deux : XOR fournit le bit de somme et AND la retenue. Il ne reçoit pas de retenue antérieure. Un circuit combinatoire dépend seulement des entrées présentes ; mémoriser un état est une fonction supplémentaire, ce que ce circuit simple ne décrit pas.',
        {
          checkpoint: pause(
            'Avec deux bits égaux à 1, que doit produire le demi-additionneur ?',
            'Somme 0 et retenue 1',
            'Somme 1 et retenue 1',
            'Le nombre obtenu est deux, écrit 10 en binaire : la colonne des unités vaut zéro, celle des paires vaut un.'
          )
        }
      ),
      s(
        'Simuler des registres et distinguer modèle et vitesse réelle',
        'Une fonction Python est un traitement nommé : def calcul(w, x, y): reçoit trois paramètres. r1 = x associe une valeur à un nom ; r2 = r2 + r1 lit les anciennes valeurs, additionne puis remplace r2. return r3 renvoie le résultat final. != teste une différence ; == une égalité ; and exige deux conditions vraies ; int transforme True et False en 1 et 0 pour simuler les sorties du demi-additionneur. La simulation n’est pas un processeur matériel. Une architecture peut aussi posséder plusieurs processeurs ; la fréquence seule ne donne pas le temps d’exécution, car accès mémoire et organisation du calcul interviennent.'
      )
    ],
    exampleMethods: [
      'Note le registre après chaque instruction : 4 après LOAD, puis 11 après ADD. STORE ne refait pas l’addition ; il copie cette dernière valeur dans la destination r.',
      'Suis un seul état qui évolue : après le chargement, il vaut 20 ; retirer 6 donne 14, puis retirer 3 donne 11. Repartir de 20 à chaque étape simulerait un autre programme.',
      'Sépare ce qui a été enregistré sur disque et ce qui n’existait qu’en mémoire vive. L’arrêt peut faire perdre cette seconde partie, mais pas automatiquement tous les fichiers de la machine.'
    ]
  },
  'premiere-reseaux': {
    duration: 75,
    introduction: intro(
      'Tu dictes plusieurs morceaux d’un message au téléphone et demandes « bien reçu ? » après chacun. Si tu n’entends pas la confirmation, tu dois répéter sans que l’autre personne note le morceau deux fois.',
      'Comment faire progresser un échange quand une donnée ou sa confirmation peut être perdue ?',
      'Le découpage en paquets, les enveloppes de protocole et le bit alterné montrent comment organiser un transport avec retransmissions et détection de doublons.',
      [
        'Identifier les chemins et équipements.',
        'Découper et envelopper un message.',
        'Suivre les bits et accusés.',
        'Traiter une perte puis simuler seulement les aspects annoncés.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Réseau et lien',
        'Un réseau relie des équipements par des liens qui transportent des informations. Un chemin est une succession de liens entre départ et arrivée.',
        'Un poste peut passer par un commutateur puis un routeur pour joindre un serveur.'
      ),
      recap(
        'Octet et charge utile',
        'Un octet regroupe huit bits. La charge utile est la partie du message qui contient les données à transporter, sans les informations ajoutées pour le transport.',
        'Un paquet peut contenir 1000 octets utiles plus des en-têtes de protocole.'
      ),
      recap(
        'Accusé et délai',
        'Un accusé de réception confirme une réception. Un délai d’attente fixe combien de temps on attend cette confirmation avant de réagir.',
        'Sans accusé après le délai, un émetteur peut renvoyer le même morceau.'
      )
    ],
    realLifeExamples: [
      life(
        'Un colis en plusieurs cartons',
        'Une commande trop volumineuse voyage dans plusieurs cartons, chacun portant des informations de livraison.',
        'Le découpage évoque les paquets et les étiquettes évoquent les en-têtes ajoutés aux données.',
        'Les paquets suivent des protocoles précis et peuvent partager les mêmes liens avec d’autres messages.'
      ),
      life(
        'Une dictée avec confirmation',
        'Un camarade confirme chaque morceau, mais sa réponse peut être couverte par du bruit.',
        'Un numéro alterné permet de reconnaître une répétition et de confirmer à nouveau sans noter deux fois le même morceau.',
        'Le modèle à un seul bit suppose ici qu’un très ancien morceau ne réapparaisse pas après plusieurs cycles.'
      )
    ],
    sections: [
      s(
        'Reconnaître les rôles des équipements',
        'Un commutateur relie des équipements d’un réseau local ; un routeur fait communiquer des réseaux différents ; un serveur fournit un service. Ces rôles sont distincts même si un même boîtier peut en réunir plusieurs. Les données traversent une succession de liens. Les partager en paquets permet d’alterner plusieurs échanges sur ces liens et de retransmettre une partie manquante plutôt que nécessairement tout le message.'
      ),
      s(
        'Découper puis ajouter des enveloppes',
        'Un message de 2500 octets utiles découpé par morceaux de 1000 utilise deux morceaux pleins et un dernier de 500, soit trois paquets. L’encapsulation ajoute des informations autour des données : l’application produit un contenu, le transport y ajoute son en-tête, IP fournit des informations d’acheminement et le lien local utilise une trame. Le destinataire retire ces enveloppes dans l’ordre inverse. Les différents types d’adresses n’ont pas tous la même fonction.',
        {
          checkpoint: pause(
            'Deux paquets de 1000 octets utiles transportent-ils 2500 octets ?',
            'Non, il reste 500 octets à transporter',
            'Oui, on ignore le reste de la division',
            'Le dernier paquet peut être partiel, mais les données restantes ne peuvent pas être abandonnées.'
          )
        }
      ),
      s(
        'Attendre la bonne confirmation avant de changer de bit',
        'Dans le protocole du bit alterné, l’émetteur commence avec le bit 0 et envoie un paquet portant ce numéro. Il attend l’accusé 0 ; après réception de cet accusé, il passe au bit 1 pour le prochain paquet. Si le délai expire, il renvoie le même paquet avec le même bit. Le récepteur attend lui aussi 0 au départ ; lorsqu’il reçoit le bit attendu, il livre les données à l’application puis attend l’autre bit.'
      ),
      s(
        'Recevoir deux fois sans livrer deux fois',
        'Si le paquet 0 arrive mais que son accusé se perd, l’émetteur le renvoie. Le récepteur attend désormais 1 : il reconnaît donc ce nouveau 0 comme un doublon. Il ne livre pas à nouveau les données, mais renvoie tout de même l’accusé 0 pour permettre à l’émetteur d’avancer. Réception et livraison sont deux événements différents. Un seul bit ne résout pas tous les scénarios de réordonnancement tardif ; cette activité reste un modèle arrêt-et-attente.',
        {
          checkpoint: pause(
            'Après la perte d’un accusé, que faire d’un paquet reconnu comme doublon ?',
            'Le confirmer sans le livrer à nouveau',
            'Le livrer à nouveau pour être certain',
            'L’accusé répété permet la progression de l’émetteur ; la livraison unique évite que l’application traite les données en double.'
          )
        }
      ),
      s(
        'Traduire deux petites tâches en Python',
        'Une fonction est un traitement nommé ; def livraisons(bits): reçoit une liste de bits. attendu = 0 et nombre = 0 initialisent deux variables. for bit in bits: parcourt la liste ; if bit == attendu: compare le numéro reçu à celui attendu. nombre += 1 augmente le compteur et attendu = 1 - attendu alterne entre 0 et 1 seulement après une livraison. return nombre est après la boucle. Pour découper une chaîne, len(texte) compte les caractères ; range(0, len(texte), taille) visite les débuts avec un pas donné. texte[debut:debut + taille] est une tranche qui exclut la borne de droite et garde le dernier fragment court ; morceaux.append(...) l’ajoute. Ces caractères ne sont pas nécessairement des octets réseau.'
      )
    ],
    exampleMethods: [
      'Sépare l’état des deux côtés : le récepteur attend toujours 0 puisque rien n’est arrivé ; l’émetteur garde aussi 0 tant qu’il n’a pas reçu son accusé. La répétition est donc celle du même paquet.',
      'Après la première réception, le récepteur attend 1. Le nouvel envoi 0 ne satisfait pas cette attente : aucune seconde livraison n’a lieu, mais l’accusé 0 est réémis pour débloquer l’émetteur.',
      'Imagine que le paquet 0 a été perdu. Passer immédiatement à 1 ferait considérer le morceau suivant comme le premier succès sans jamais récupérer le morceau manquant ; l’accusé doit décider du changement.'
    ]
  },
  'premiere-systemes': {
    duration: 65,
    introduction: intro(
      'Tu ouvres un document, branches un clavier et lances plusieurs applications. Ces programmes doivent partager la mémoire, retrouver les fichiers et savoir qui peut les modifier.',
      'Quel logiciel organise ces ressources, et comment lui demander des actions précises sur les fichiers ?',
      'Comprendre le système et les chemins permet de naviguer sans deviner où une commande agit et de lire les permissions sans confondre les personnes concernées.',
      [
        'Identifier les services du système.',
        'Se repérer avec fichiers et dossiers.',
        'Distinguer chemins absolus et relatifs.',
        'Lire les droits par groupes puis les convertir.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Fichier et dossier',
        'Un fichier conserve un contenu sous un nom. Un dossier, aussi nommé répertoire, peut contenir des fichiers et d’autres dossiers.',
        'Le dossier cours peut contenir notes.txt et un sous-dossier exercices.'
      ),
      recap(
        'Racine et parent',
        'Les dossiers forment une arborescence : la racine est son départ et le parent d’un dossier est celui qui le contient directement.',
        'Dans /home/ada/cours, le parent de cours est /home/ada.'
      ),
      recap(
        'Permission',
        'Une permission autorise une action à un utilisateur ou groupe d’utilisateurs. Lire et modifier sont deux actions distinctes.',
        'On peut autoriser la lecture d’un devoir sans autoriser son remplacement.'
      )
    ],
    realLifeExamples: [
      life(
        'Le casier commun',
        'Un groupe peut consulter un dossier partagé, mais seul son responsable peut en modifier les fiches.',
        'Les permissions distinguent les droits du propriétaire, de son groupe et des autres utilisateurs.',
        'Les permissions dépendent des identités reconnues par le système, pas de l’appartenance déclarée oralement.'
      ),
      life(
        'Un itinéraire depuis la salle',
        '« Remonte d’un étage puis entre dans projets » dépend de l’endroit où tu te trouves au départ.',
        'Un chemin relatif part du dossier courant ; un chemin absolu part au contraire de la racine connue.',
        'L’arborescence logique des fichiers n’est pas un bâtiment ; ses séparateurs et commandes suivent une syntaxe précise.'
      )
    ],
    sections: [
      s(
        'Nommer le logiciel qui organise la machine',
        'Le système d’exploitation gère mémoire, programmes en exécution appelés processus, périphériques et fichiers. Un interpréteur de commandes, ou shell, lit des instructions textuelles et demande ces services au système. GNU/Linux est un exemple de système libre : ses licences accordent des libertés d’utilisation, d’étude, de modification et de redistribution selon leurs conditions. « Libre » ne signifie pas seulement gratuit ; un système propriétaire peut fixer d’autres conditions de copie et d’accès au code.'
      ),
      s(
        'Observer avant de changer de dossier',
        'Dans le shell Linux, pwd affiche le chemin du dossier courant et ls liste son contenu. mkdir essais crée le dossier essais ; cd essais s’y déplace ; cd .. remonte vers son parent. Une commande est un nom suivi éventuellement d’arguments, des précisions séparées par des espaces. cp copie et mv déplace ou renomme ; leurs arguments déterminent les chemins concernés. L’atelier est un terminal simulé : ses commandes ne modifient pas les vrais fichiers de ta machine.',
        {
          checkpoint: pause(
            'Quelle commande indique où se trouve actuellement le shell ?',
            'pwd',
            'mkdir',
            'pwd affiche le chemin courant. mkdir crée un dossier mais ne change pas la position du shell.'
          )
        }
      ),
      s(
        'Suivre un chemin étape par étape',
        'Un chemin absolu commence à la racine / : /home/ada/projets nomme la destination depuis ce point fixe. Un chemin relatif commence au dossier courant. Depuis /home/ada/cours, ../projets utilise d’abord .. pour remonter à /home/ada, puis descend dans projets. Le séparateur / marque les étapes. Créer un dossier ne le rend pas automatiquement courant ; c’est l’action cd qui change le point de départ des futurs chemins relatifs.'
      ),
      s(
        'Lire neuf caractères de permissions',
        'Pour un fichier, r autorise la lecture, w l’écriture et x l’exécution ; un tiret marque l’absence de ce droit. On lit trois groupes de trois caractères : propriétaire, groupe, autres. rwxr-x--- donne tous les droits au propriétaire, lecture et exécution au groupe, aucun aux autres. La notation numérique additionne des poids dans chaque groupe : r vaut 4, w vaut 2, x vaut 1. Les trois groupes précédents donnent donc 7, 5 et 0, soit 750.',
        {
          checkpoint: pause(
            'Que peut faire le groupe avec un fichier de droits 640 ?',
            'Lire, car son groupe de droits vaut 4',
            'Lire et modifier, car le propriétaire a 6',
            'Les chiffres se lisent séparément : 6 pour le propriétaire, 4 pour le groupe, 0 pour les autres. Le groupe n’a pas le droit w.'
          )
        }
      ),
      s(
        'Appliquer les droits et préparer leur calcul',
        'chmod 640 notes.txt attribue les trois groupes : rw- au propriétaire, r-- au groupe et --- aux autres. Sur un dossier, x permet de le traverser : les mêmes lettres ne se lisent pas exactement comme pour un fichier. Pour calculer la valeur d’un seul groupe dans une fonction Python, def valeur_droits(texte): reçoit les trois caractères ; valeur = 0 initialise le total. texte[0], texte[1] et texte[2] lisent les positions à partir de zéro. if texte[0] == "r": teste la lecture ; valeur += 4 ajoute son poids. Des tests indépendants ajoutent ensuite 2 pour w et 1 pour x. return valeur renvoie le total après tous les tests.',
        { code: 'pwd\nls\nmkdir essais\ncd essais\ncd ..' }
      )
    ],
    exampleMethods: [
      'Prends le chemin courant comme point de départ, puis applique un déplacement à la fois : .. enlève le dernier dossier cours ; projets est ensuite cherché dans /home/ada, pas dans cours.',
      'Découpe les neuf caractères en rwx, r-x et ---. Additionne 4 + 2 + 1, puis 4 + 1, puis zéro. Concatène les trois chiffres dans l’ordre des catégories d’utilisateurs.',
      'Identifie d’abord à quelle catégorie appartient la personne : membre du groupe. Lis seulement le chiffre central, 4, qui correspond à r-- ; le droit d’écriture du propriétaire ne lui est pas transmis.'
    ]
  },
  'premiere-capteurs': {
    duration: 75,
    introduction: intro(
      'Dans une serre, un ventilateur doit démarrer lorsqu’il fait trop chaud. Le jardinier veut aussi un interrupteur pour désactiver le système, quelle que soit la température.',
      'Comment passer d’une demande courante à une règle de mesure et de commande testable, y compris exactement au seuil ?',
      'Un cahier des charges précis relie capteur, calcul, actionneur et interface ; il permet de vérifier le comportement sans prétendre tester un appareil réel.',
      [
        'Distinguer mesurer et agir.',
        'Préciser seuil et priorité.',
        'Suivre acquisition, traitement et commande.',
        'Construire une interface simulée et vérifier les cas frontières.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Grandeur et unité',
        'Une grandeur est ce que l’on mesure ; l’unité précise l’échelle utilisée. Le nombre seul ne suffit pas pour interpréter une mesure.',
        '25 °C est une température ; 25 sans unité pourrait être une durée ou une distance.'
      ),
      recap(
        'Booléen',
        'Un booléen vaut vrai ou faux, écrit True ou False en Python. Il peut représenter une autorisation ou une condition satisfaite.',
        'actif = False signifie ici que l’utilisateur n’autorise pas la ventilation.'
      ),
      recap(
        'Seuil et comparaison',
        'Un seuil est une frontière de décision. >= signifie supérieur ou égal et accepte donc la valeur exactement sur cette frontière.',
        'temperature >= 25 est vrai à 25 °C comme à 27 °C, mais faux à 24 °C.'
      )
    ],
    realLifeExamples: [
      life(
        'La lumière automatique',
        'Une lampe s’allume lorsque la luminosité devient insuffisante.',
        'Le capteur produit une mesure de lumière et l’actionneur réalise l’allumage décidé par le programme.',
        'Un curseur de simulation donne directement un nombre ; un capteur physique nécessite une acquisition et peut être imprécis.'
      ),
      life(
        'La ventilation de la serre',
        'Le jardinier coupe l’autorisation pendant une intervention, même s’il fait chaud.',
        'La règle combine actif et temperature >= 25 avec ET pour donner priorité à la désactivation.',
        'La maquette ne vérifie pas les délais, les pannes électriques ou les exigences de sûreté d’une installation.'
      )
    ],
    sections: [
      s(
        'Attribuer un rôle à chaque élément',
        'Un capteur acquiert une information sur l’environnement : température, lumière ou distance. Un actionneur agit : moteur, lampe ou ventilateur. Une interface homme-machine, abrégée IHM, permet à une personne de saisir une consigne et de lire un état. Ces rôles ne se confondent pas : le thermomètre ne ventile pas, et le moteur ne mesure pas à lui seul la température. Le programme relie l’information acquise à la commande produite.'
      ),
      s(
        'Transformer « trop chaud » en règle testable',
        '« Allumer quand il fait chaud » laisse ouvertes la température et la priorité. Écrivons plutôt : le ventilateur est allumé si le système est actif et si la température atteint au moins 25 °C. Une fonction Python est un traitement nommé ; def ventiler(temperature, actif): reçoit ces deux paramètres. return actif and temperature >= 25 renvoie un booléen ; and exige les deux conditions, >= inclut 25. Une variable garde la température mesurée ; return rend la décision sans commander lui-même un appareil.',
        {
          checkpoint: pause(
            'À 30 °C, avec actif égal à False, quelle décision impose la règle ?',
            'Éteindre',
            'Allumer puisque 30 dépasse le seuil',
            'La désactivation rend une des deux conditions fausse. Le ET interdit alors l’allumage quelle que soit la température.'
          )
        }
      ),
      s(
        'Répéter acquisition, traitement et commande',
        'Le système lit une mesure, calcule sa décision puis transmet la commande à l’actionneur. Ce cycle est répété pour tenir compte des nouvelles mesures. Une valeur bruitée peut osciller autour du seuil et provoquer des changements fréquents. Utiliser un seuil pour allumer et un autre pour éteindre peut stabiliser le comportement, mais exige de conserver l’état précédent. Notre règle d’exercice reste volontairement à un seuil ; elle ne décrit pas un système de sûreté complet.'
      ),
      s(
        'Construire les entrées de la simulation',
        'HTML décrit les éléments avec des balises et des attributs. input type="range" crée un curseur ; min="0", max="40" et value="23" donnent ses bornes et son départ. input type="checkbox" crée une case, checked la coche au départ. id identifie chaque élément ; label for="temperature" l’associe au contrôle portant cet id ; output affiche le résultat. Une page complète utilise <!doctype html>, html lang="fr", head avec meta charset="utf-8" et title, puis body pour le contenu visible. Le curseur remplace le capteur uniquement dans la maquette.',
        {
          checkpoint: pause(
            'Quelle propriété logique du programme doit être testée exactement à 25 °C ?',
            'L’égalité au seuil est acceptée si actif est vrai',
            'L’égalité au seuil est toujours refusée',
            'La règle utilise « au moins » et donc >=. Le test de frontière permet de distinguer cette règle de la comparaison stricte >.'
          )
        }
      ),
      s(
        'Faire réagir les contrôles et observer le résultat',
        'JavaScript utilise document.querySelector("#temperature") pour retrouver l’élément par son id ; const lui donne un nom. temperature.value fournit un texte : Number(...) le convertit en nombre. actif.checked donne un booléen ; && signifie ET en JavaScript. L’expression condition ? "Allumé" : "Éteint" choisit un des deux textes. etat.textContent = ... modifie la sortie. function actualiser() { ... } définit la réaction ; addEventListener("input", actualiser) l’associe au curseur et "change" à la case. L’appel actualiser() initialise l’affichage. Il faut essayer la frontière, la désactivation et un nouveau déplacement, pas seulement vérifier le texte initial.'
      )
    ],
    exampleMethods: [
      'Vérifie les deux conditions séparément : 27 est supérieur ou égal à 25, et actif vaut vrai. Leur combinaison par ET est donc vraie ; aucune des conditions ne suffit isolément.',
      'Lis précisément le symbole >= : il accepte la supériorité ou l’égalité. À la frontière exacte, la comparaison est vraie ; remplacer >= par > changerait le cahier des charges.',
      'Commence par l’autorisation de l’utilisateur. Elle est fausse, donc le ET donne faux malgré une mesure élevée. Ce cas vérifie la priorité annoncée au lieu d’observer seulement la température.'
    ]
  }
};

import { pedagogy, pause } from './pedagogy-utils.js';

export default {
  soc: pedagogy({
    program: [
      'Calculer un modèle d’énergie',
      'Dans ce modèle, n compte les échanges, e est l’énergie d’un échange et p est la proportion restant externe. Une proportion de 0,25 signifie un quart : sur dix échanges à deux unités, l’énergie initiale vaut 10 × 2 = 20 et la restante 20 × 0,25 = 5. L’économie est la différence, 20 - 5 = 15. Le programme ci-dessous calcule seulement l’énergie restante. Le signe * multiplie et return renvoie le résultat ; ce modèle ne prétend pas prévoir toute la consommation réelle d’une puce.',
      'def energie_restante(n, e, p):\n    return n * e * p'
    ],
    intro: [
      'Un téléphone prend une photo, traite l’image puis la transmet, tout en fonctionnant sur batterie. Plusieurs composants doivent coopérer dans un espace réduit.',
      'Pourquoi réunir plusieurs fonctions sur une puce, et comment reconnaître ce qui calcule, conserve ou communique ?',
      'Lire un schéma de système sur puce aide à comprendre la coopération du matériel et du logiciel sans attribuer tous les rôles au seul processeur.'
    ],
    journey: [
      'Séparer calcul, mémoire et communication.',
      'Repérer les fonctions intégrées dans un circuit.',
      'Suivre le trajet d’une mesure ou d’une image.',
      'Comprendre les gains et les limites de l’intégration.'
    ],
    recap: [
      [
        'Composant et circuit',
        'Un composant est un élément matériel ; un circuit électronique relie des éléments pour réaliser des fonctions.',
        'Un capteur reçoit une grandeur physique et produit une mesure exploitable.'
      ],
      [
        'Processeur et mémoire',
        'Le processeur exécute des instructions ; la mémoire conserve les informations qu’il utilise.',
        'Une image peut rester en mémoire pendant qu’un calcul modifie ses pixels.'
      ],
      [
        'Entrée et sortie',
        'Une entrée apporte une information au système ; une sortie transmet une information vers l’extérieur.',
        'Le microphone apporte du son ; l’écran présente une image.'
      ]
    ],
    life: [
      [
        'Photographie sur téléphone',
        'Le téléphone reçoit les mesures du capteur photo, transforme l’image puis l’affiche.',
        'Un système sur puce peut réunir calcul général, traitement graphique et contrôleurs qui organisent ces échanges.',
        'Le capteur, l’écran et certaines mémoires peuvent rester externes : intégrer des fonctions ne rassemble pas tout dans la même puce.'
      ],
      [
        'Montre connectée',
        'Une montre traite une mesure de mouvement et transmet un résumé en limitant la consommation de sa batterie.',
        'L’intégration réduit certaines distances de communication et peut diminuer l’énergie utilisée pour ces échanges.',
        'L’autonomie dépend aussi de l’écran, du logiciel et de l’usage ; l’intégration ne garantit pas seule une durée de batterie.'
      ]
    ],
    sections: [
      [
        'Un appareil accomplit plusieurs fonctions',
        'Pour prendre une photo, il faut acquérir une mesure, conserver des valeurs, effectuer des calculs et afficher ou transmettre le résultat. Le CPU est le processeur chargé des instructions générales. Le GPU est une unité adaptée à certains calculs graphiques parallèles, c’est-à-dire plusieurs opérations menées ensemble. Une mémoire conserve les données ; un contrôleur organise les échanges avec un composant.'
      ],
      [
        'Ce que signifie système sur puce',
        'SoC abrège System on Chip, traduit par système sur puce. Un même circuit réunit plusieurs fonctions : cœurs de processeur, accélérateurs spécialisés, mémoires locales, contrôleurs et communication. Un cœur est une unité capable d’exécuter une suite d’instructions. La frontière dessinée autour de la puce compte : un composant relié mais situé dehors reste externe.',
        pause(
          'Une mémoire dessinée hors du SoC contredit-elle le terme système sur puce ?',
          'Non, des composants peuvent rester externes.',
          'Oui, tout l’appareil doit tenir dans la puce.',
          'Le terme décrit l’intégration de plusieurs fonctions sur un circuit. Il ne promet ni que toute mémoire ni que chaque capteur de l’appareil y soit intégré.'
        )
      ],
      [
        'Lire les flèches du schéma',
        'Partons d’un capteur : il fournit une mesure à un contrôleur d’entrée. Les données peuvent rejoindre une mémoire ; le CPU ou un accélérateur les traite ; un autre contrôleur les transmet à l’écran ou au réseau. Les liaisons transportent informations et commandes. Il faut suivre les fonctions dans cet ordre pour ne pas confondre mémoire, qui conserve, et processeur, qui exécute des calculs.'
      ],
      [
        'Pourquoi rapprocher les fonctions',
        'Un échange entre circuits traverse des connexions et consomme du temps et de l’énergie. Rapprocher certaines fonctions peut réduire une partie de ces échanges. Un accélérateur exécute efficacement des tâches particulières lorsqu’un logiciel sait les lui confier. Mais un calcul non adapté ne devient pas automatiquement plus rapide. La chaleur, la surface du circuit et son coût de conception limitent aussi les choix.',
        pause(
          'Ajouter un GPU rend-il chaque programme plus rapide ?',
          'Non, le travail doit pouvoir l’utiliser utilement.',
          'Oui, tous les calculs passent immédiatement au GPU.',
          'Une unité spécialisée accélère certaines opérations. Le logiciel doit les lui confier et le gain dépend du travail effectué ainsi que des communications nécessaires.'
        )
      ],
      [
        'Le logiciel donne accès au matériel',
        'Un système d’exploitation organise l’utilisation des ressources de l’appareil. Un pilote est un logiciel qui connaît la manière de commander un composant. Une interface de programmation, ou API, expose des opérations documentées : demander une mesure, par exemple. L’application utilise ce service sans écrire les détails électriques. Une interface logicielle ne remplace toutefois pas le capteur : sans matériel, aucune mesure physique n’est produite.'
      ]
    ],
    reasoning: [
      'Repère d’abord le CPU, chargé des instructions générales, puis le GPU, spécialisé dans certains calculs graphiques. Ajoute le contrôleur radio et la mémoire locale. Si ces fonctions sont intégrées à l’intérieur de la même frontière de circuit, le schéma représente un système sur puce.',
      'Le traitement comporte des opérations adaptées au GPU. Le logiciel peut lui confier cette partie au lieu de tout faire exécuter au CPU. Le CPU garde son rôle de coordination et ses autres calculs ; l’accélération ne signifie donc pas sa disparition ni un gain pour toutes les tâches.',
      'Lis la frontière de la puce avant les liaisons : la mémoire est dessinée à l’extérieur mais communique avec le système intégré. Le terme SoC n’exige pas que tous les composants de l’appareil soient internes. Cette présence externe est donc compatible avec le schéma.'
    ]
  }),
  processus: pedagogy({
    program: [
      'Représenter les tâches prêtes par leurs indices',
      'La liste durees conserve le travail restant de chaque tâche ; enumerate donne i, son indice à partir de zéro, et duree, sa valeur. Le programme produit les tâches ayant encore du travail. Pour simuler le tourniquet complet, on travaille sur une copie des durées : après chaque unité d’une tâche, on lui retire un, puis on recommence un tour tant qu’une durée positive reste. Une tâche initialement à zéro ne doit recevoir aucune unité.',
      'def taches_pretes(durees):\n    indices = []\n    for i, duree in enumerate(durees):\n        if duree > 0:\n            indices.append(i)\n    return indices'
    ],
    intro: [
      'Pendant que tu écoutes une chanson, un téléchargement continue et ton éditeur répond au clavier. Plusieurs activités semblent avancer sur la même machine.',
      'Comment le système partage-t-il les ressources entre ces activités, et pourquoi certaines attendes peuvent-elles bloquer tout progrès ?',
      'La notion de processus explique les tâches en cours, leur alternance et les cycles d’attente qui produisent un interblocage.'
    ],
    journey: [
      'Distinguer un programme enregistré d’une exécution.',
      'Suivre les états prêt, exécuté et bloqué.',
      'Simuler un partage par petites durées.',
      'Reconnaître un cycle d’attente entre ressources.'
    ],
    recap: [
      [
        'Programme et exécution',
        'Un programme décrit des instructions ; une exécution est leur réalisation effective avec des données particulières.',
        'Le même lecteur audio peut être lancé pour lire deux fichiers différents.'
      ],
      [
        'Ressource',
        'Une ressource est un moyen utilisé par une tâche, parfois indisponible pour les autres pendant son utilisation.',
        'Un processus peut attendre un accès à une imprimante déjà occupée.'
      ],
      [
        'État et durée',
        'L’état décrit la situation actuelle ; une durée mesure un intervalle de temps et doit avoir une unité.',
        'Un quantum de une unité autorise une étape avant de donner la main au suivant.'
      ]
    ],
    life: [
      [
        'Plusieurs travaux sur un ordinateur',
        'Un éditeur et un lecteur audio sont ouverts pendant qu’un fichier est téléchargé.',
        'Chaque exécution possède un contexte ; le système répartit les occasions de travailler et les attentes.',
        'Une application peut utiliser plusieurs processus et plusieurs fils d’exécution ; une fenêtre ne correspond pas toujours à un seul processus.'
      ],
      [
        'Deux personnes et deux outils',
        'Une personne garde un tournevis et attend la pince ; l’autre garde la pince et attend le tournevis.',
        'Si chacune refuse de rendre son outil avant d’obtenir l’autre, le cycle d’attente illustre un interblocage.',
        'Les humains peuvent décider de coopérer spontanément ; le programme doit disposer d’une règle explicite pour éviter ce cycle.'
      ]
    ],
    sections: [
      [
        'Le programme est une description, le processus une activité',
        'Le fichier d’un programme reste enregistré même quand rien ne s’exécute. Un processus est une instance en cours avec ses données, sa mémoire et son contexte : les informations nécessaires pour reprendre son travail. Il possède un identifiant, appelé PID. Deux lancements du même code peuvent créer deux processus distincts ; le nombre de fenêtres ne suffit pas à les identifier.'
      ],
      [
        'Trois états pour savoir qui peut avancer',
        'Un processus prêt peut travailler dès qu’un processeur lui est attribué. Il est élu ou exécuté lorsqu’il utilise effectivement un cœur. Il est bloqué lorsqu’il attend un événement, comme une donnée à lire. L’ordonnanceur est la partie du système qui choisit le prochain processus prêt. Un processus bloqué redevient prêt quand l’événement attendu survient ; attendre une lecture ne doit pas occuper inutilement le cœur.',
        pause(
          'Un processus bloqué en attente de données est-il prêt à calculer immédiatement ?',
          'Non, il attend encore l’événement nécessaire.',
          'Oui, bloqué et prêt signifient la même chose.',
          'Un processus prêt peut utiliser le cœur. Un processus bloqué manque d’une ressource ou d’un événement ; le choisir ne lui permettrait pas de progresser.'
        )
      ],
      [
        'Alterner avec un quantum',
        'Un quantum est une durée maximale de travail accordée avant de passer la main. Avec A demandant trois unités et B deux, tous deux prêts au temps zéro, un quantum de une unité donne : A reste à deux, B reste à une, A reste à une, B termine, A termine. L’ordre est A,B,A,B,A. Ce partage en tourniquet fait progresser plusieurs tâches sur un seul cœur, à des moments différents.'
      ],
      [
        'Observer la concurrence',
        'La concurrence signifie que plusieurs activités progressent pendant une même période ; cela n’impose pas qu’elles s’exécutent exactement au même instant. Le parallélisme désigne des travaux effectivement simultanés, par exemple sur plusieurs cœurs. Dans un système de type Unix, ps affiche des informations de processus et top actualise une observation. Lire ces informations n’exige pas d’arrêter les tâches : un nom seul ne suffit jamais à choisir une interruption.'
      ],
      [
        'Détecter un cycle sans le confondre avec une lenteur',
        'Notons P et Q deux processus, R1 et R2 deux ressources non partageables. P garde R1 et attend R2 ; Q garde R2 et attend R1. Aucun ne libère ce que l’autre attend : c’est un interblocage. Une tâche lente peut au contraire encore progresser. Imposer à tous l’ordre R1 puis R2 évite ce cycle particulier en empêchant Q de garder R2 avant d’obtenir R1.',
        pause(
          'Une tâche lente prouve-t-elle un interblocage ?',
          'Non, il faut établir les dépendances d’attente.',
          'Oui, toute attente longue est un cycle.',
          'La durée observée ne suffit pas. Un interblocage exige une situation où les attentes et les ressources conservées empêchent chaque participant de progresser.'
        )
      ]
    ],
    reasoning: [
      'Un programme est le même ensemble d’instructions enregistré. Chaque lancement peut créer un contexte avec sa propre mémoire et son identifiant PID. Les deux exécutions utilisent donc le même code sans être une seule activité ; elles peuvent être distinguées comme deux processus.',
      'Au départ A possède trois unités restantes et B deux. Après A puis B, il reste respectivement deux et une. Après le deuxième A, il reste une à chacun ; le deuxième B termine B. Seul A reste prêt et effectue sa dernière unité : A,B,A,B,A.',
      'P ne peut obtenir le scanner tant que Q le garde. Q ne peut obtenir l’imprimante tant que P la garde. Si les deux conservent leur ressource et attendent l’autre, aucune action de ce scénario ne peut les débloquer : le cycle constitue un interblocage possible.'
    ]
  }),
  routage: pedagogy({
    program: [
      'Calculer un chemin sans additionner ses débits',
      'Le paramètre debits est la liste des débits, tous strictement positifs, exprimés en Mbit/s. La variable d prend chaque débit ; / calcule d’abord le coût de sa liaison. total mémorise ensuite la somme des coûts déjà traités. Sur [100,20], les coûts sont 1 puis 5 ; le total passe de 0 à 1 puis à 6. Une liste vide n’exécute aucun passage et donne zéro. Cette fonction applique uniquement la convention pédagogique annoncée.',
      'def cout_chemin(debits):\n    total = 0\n    for d in debits:\n        cout = 100 / d\n        total = total + cout\n    return total'
    ],
    intro: [
      'Pour rejoindre un lieu, un trajet avec moins de rues peut être moins intéressant qu’un trajet plus long en nombre de rues mais plus facile à parcourir.',
      'Comment un réseau choisit-il où transmettre un message lorsque plusieurs routes existent et que les critères ne sont pas les mêmes ?',
      'Comparer nombre de sauts et coût des liaisons permet de lire une route et de ne pas confondre préférence de routage, débit et temps réel.'
    ],
    journey: [
      'Décrire un paquet et un routeur.',
      'Lire la prochaine étape dans une table.',
      'Compter les sauts avec RIP.',
      'Additionner des coûts avec le modèle OSPF.'
    ],
    recap: [
      [
        'Réseau et paquet',
        'Un réseau relie des machines ; un paquet transporte une partie d’un message avec les informations nécessaires à son acheminement.',
        'Une vidéo est transmise en nombreux morceaux plutôt qu’en un objet indivisible.'
      ],
      [
        'Graphe et chemin',
        'Un graphe décrit des points reliés ; un chemin est une suite de liaisons entre ces points.',
        'A-B-C relie A à C par deux liaisons successives.'
      ],
      [
        'Débit et division',
        'Un débit indique une quantité transmise par unité de temps ; une division partage une quantité par une autre.',
        '100 divisé par 20 vaut 5 ; un débit doit être exprimé dans l’unité annoncée.'
      ]
    ],
    life: [
      [
        'Choisir un itinéraire',
        'Un itinéraire comporte deux routes, un autre quatre ; certaines routes sont plus faciles à parcourir.',
        'RIP préfère moins de sauts ; un calcul de coût peut préférer davantage de liaisons si leur somme est plus faible.',
        'La circulation réelle varie : ce parallèle ne transforme pas un coût de routage en durée garantie de trajet.'
      ],
      [
        'Relais de livraison',
        'Un colis passe par des centres successifs ; chaque centre choisit vers quel voisin l’envoyer.',
        'Le routeur consulte une table pour décider de la prochaine étape du paquet, sans transporter lui-même tout le message jusqu’au destinataire.',
        'Un paquet et un colis n’ont pas les mêmes contraintes ; les protocoles réseau peuvent changer rapidement les routes disponibles.'
      ]
    ],
    sections: [
      [
        'Transmettre de proche en proche',
        'Un routeur est une machine qui transmet des paquets entre réseaux. Sa table de routage associe une destination à une interface de sortie et parfois à un prochain routeur. Une interface est une connexion locale ; le prochain routeur est le voisin qui recevra le paquet. Une destination directement connectée peut être atteinte sans routeur intermédiaire. Chaque étape prend sa propre décision à partir de sa table.'
      ],
      [
        'RIP compare un nombre de sauts',
        'Dans notre graphe de routeurs, un saut correspond à une liaison empruntée. RIP utilise une métrique, c’est-à-dire un nombre qui mesure la préférence d’une route, fondée sur les sauts. A-D compte un saut ; A-B-C-D en compte trois. Selon ce critère, la route directe est préférée, même si sa liaison possède un débit plus faible. Ce calcul ne mesure donc pas la vitesse réelle du transfert.',
        pause(
          'RIP doit-il choisir une route de trois sauts parce que ses liaisons sont plus rapides ?',
          'Non, son critère étudié est le nombre de sauts.',
          'Oui, il additionne les débits.',
          'Dans le modèle RIP présenté, on minimise les sauts. Un autre critère peut choisir autrement, mais il ne faut pas attribuer ce critère au calcul effectué par RIP.'
        )
      ],
      [
        'Construire un coût avec une unité',
        'OSPF utilise des informations sur l’état des liaisons et recherche un chemin de coût minimal. Dans la convention pédagogique choisie, coût = 100 / débit : / représente la division et le débit est exprimé en Mbit/s, millions de bits par seconde. Avec 20 Mbit/s, on calcule 100 / 20 = 5. Avec 100 Mbit/s, le coût vaut 1. Plus le débit est grand, plus ce coût est petit.'
      ],
      [
        'Additionner les coûts, pas les débits',
        'Comparons A-D de coût 9 et A-B-C-D dont chaque liaison coûte 1. La route directe a un total de 9 ; l’autre a 1 + 1 + 1 = 3. OSPF préfère 3 à 9, donc trois liaisons plutôt qu’une. RIP préfère une liaison à trois et répond différemment. Les deux choix suivent correctement deux règles différentes ; additionner 20 et 100 Mbit/s ne remplace pas cette somme de coûts.'
      ],
      [
        'Garder les limites du modèle',
        'Les routeurs échangent des informations pour apprendre leurs routes. Après un changement ou une panne, ils peuvent avoir besoin d’un temps de convergence pour disposer d’informations cohérentes. Le coût choisi exprime une préférence ; il ne garantit pas la durée d’un paquet, car les files d’attente et la charge interviennent. Il faut donc annoncer le critère et les unités avant toute comparaison de routes.',
        pause(
          'Un coût plus petit garantit-il un temps réel plus court pour chaque paquet ?',
          'Non, il exprime une préférence du modèle.',
          'Oui, coût et secondes sont la même grandeur.',
          'Les coûts de la convention ne sont pas des secondes mesurées. L’attente, la charge et les changements de réseau peuvent modifier les durées réelles.'
        )
      ]
    ],
    reasoning: [
      'Pour RIP, compte les liaisons : une entre A et D contre trois par B et C ; une est plus petite, donc A-D est préférée. Pour OSPF, additionne les coûts : 9 contre 1 + 1 + 1 = 3. Trois étant inférieur à neuf, le chemin par B et C est préféré.',
      'Vérifie l’unité : le débit vaut 20 Mbit/s, comme l’exige la convention. Remplace alors le mot débit par 20 dans 100 / débit. Puis calcule 100 / 20 = 5. Ce résultat est un coût de préférence, pas une durée en secondes.',
      'La question OSPF demande de minimiser une somme de coûts. Il faut donc d’abord convertir chaque débit avec la règle annoncée, puis additionner les coûts du chemin. Additionner directement des débits et maximiser cette somme suit une autre opération et ne résout pas le problème donné.'
    ]
  }),
  cryptographie: pedagogy({
    program: [
      'Passer d’un nombre à une liste d’octets',
      'Un octet regroupe huit bits et représente ici un entier de 0 à 255. L’opérateur Python ^ applique XOR bit à bit à deux entiers : le petit programme ci-dessous traite un seul octet. Pour une liste, on doit traiter les couples d’octets aux mêmes positions puis conserver les résultats dans une nouvelle liste. Vérifier auparavant que les longueurs sont égales avec len et != évite d’ignorer des données ; raise ValueError signale une taille incompatible.',
      'def xor_octet(message, masque):\n    return message ^ masque'
    ],
    intro: [
      'Tu envoies un message sur un réseau que d’autres personnes peuvent observer. Le cacher ne suffit pas si la clé utilisée appartient à un imposteur.',
      'Comment rendre un message lisible au bon destinataire tout en vérifiant que l’on communique avec la bonne personne ?',
      'La cryptographie distingue confidentialité, clés et authentification ; elle explique le rôle complémentaire des mécanismes employés pour un échange protégé.'
    ],
    journey: [
      'Nommer message clair, chiffré et clé.',
      'Comprendre un secret partagé avec XOR.',
      'Distinguer clé publique et clé privée.',
      'Relier identité et chiffrement dans un protocole hybride.'
    ],
    recap: [
      [
        'Bit et binaire',
        'Un bit vaut zéro ou un ; plusieurs bits permettent d’écrire un nombre en base deux.',
        'Les trois positions 4, 2, 1 donnent 110 pour 6 et 011 pour 3.'
      ],
      [
        'Clé et algorithme',
        'Un algorithme décrit les étapes d’un calcul ; une clé est une information qui paramètre un mécanisme cryptographique.',
        'Connaître la règle ne doit pas suffire à retrouver le secret sans la clé.'
      ],
      [
        'Confidentialité et identité',
        'La confidentialité limite qui peut lire ; l’authentification vérifie à qui l’on parle.',
        'Un message caché pour un imposteur est confidentiel mais envoyé au mauvais destinataire.'
      ]
    ],
    life: [
      [
        'Secret entre deux correspondants',
        'Deux correspondants possèdent déjà la même clé secrète et veulent échanger un document.',
        'Un chiffrement symétrique utilise leur secret partagé ; chacun doit empêcher qu’un tiers le récupère.',
        'Un simple code inventé ou César n’offre pas la protection d’un mécanisme cryptographique adapté aux usages réels.'
      ],
      [
        'Destinataire vérifié',
        'Avant un échange confidentiel, tu vérifies que les coordonnées utilisées appartiennent bien à la personne prévue.',
        'De même, une clé publique doit être rattachée à la bonne identité ; un certificat participe à cette vérification.',
        'La ressemblance avec une vérification humaine ne décrit pas les calculs, signatures et règles de confiance d’un protocole réel.'
      ]
    ],
    sections: [
      [
        'Cacher une information avec une clé',
        'Le message clair est l’information lisible au départ ; le message chiffré est le résultat transformé. Chiffrer et déchiffrer appliquent des opérations prévues par un algorithme avec une clé. Dans un mécanisme symétrique, les correspondants partagent un même secret. Le défi inclut sa mise en place : envoyer ce secret en clair sur le même canal observé ne règle pas le problème.'
      ],
      [
        'Un calcul XOR expliqué bit par bit',
        'XOR est une opération sur deux bits : elle donne 1 si les bits diffèrent et 0 s’ils sont égaux. Écrivons 6 en 110 et 3 en 011. Les trois comparaisons donnent 1 avec 0 → 1, 1 avec 1 → 0, 0 avec 1 → 1 : résultat 101, soit 5. Appliquer encore XOR avec 011 donne 110, donc 6. En Python, ^ représente XOR sur les entiers.',
        pause(
          'Après 6 XOR 3 = 5, que donne 5 XOR 3 ?',
          '6, on retrouve le message initial.',
          '3, on retrouve seulement la clé.',
          'XOR avec le même masque deux fois annule la transformation. Les bits 101 comparés à 011 donnent 110, c’est-à-dire le nombre 6.'
        )
      ],
      [
        'Réversible ne veut pas dire sûr',
        'Le calcul précédent illustre un mécanisme de retour, pas une protection prête à l’emploi. Le masque jetable exige un masque réellement aléatoire, secret, aussi long que le message et utilisé une seule fois. Un masque répété ou devinable ne respecte pas ces conditions. Il faut donc distinguer une démonstration d’opération et un système de chiffrement sûr ; César et le petit XOR de l’atelier servent à observer, pas à protéger un site.'
      ],
      [
        'Une paire de clés et une identité',
        'Dans le modèle asymétrique étudié, Bob possède une clé publique diffusée et une clé privée conservée secrète. Alice utilise la clé publique authentifiée de Bob pour chiffrer un message destiné à Bob ; celui-ci déchiffre avec sa clé privée. Si un intermédiaire remplace la clé publique, Alice chiffre pour l’intermédiaire. Une signature aide à vérifier l’origine ; un certificat relie une clé publique à une identité selon une chaîne de confiance.',
        pause(
          'Quelle clé Alice utilise-t-elle dans ce modèle pour chiffrer à destination de Bob ?',
          'La clé publique de Bob, après authentification.',
          'La clé publique de l’intermédiaire, sans vérification.',
          'La clé publique choisit le destinataire du chiffrement. Vérifier à qui elle appartient est nécessaire pour éviter de protéger le message au bénéfice d’un imposteur.'
        )
      ],
      [
        'Combiner des mécanismes dans un échange',
        'Un protocole est un ensemble de règles d’échange. Le schéma pédagogique d’HTTPS associe la vérification de l’identité du serveur et l’établissement d’un secret partagé, puis protège les données avec des clés symétriques. Chiffrer une clé de session avec une clé publique illustre un schéma hybride historique. Les protocoles modernes peuvent utiliser un accord de clés ; cette leçon explique les rôles, sans prétendre fournir une implémentation complète de TLS.'
      ]
    ],
    reasoning: [
      'Écris 6 sous la forme 110 et 3 sous la forme 011. XOR met 1 lorsque les bits diffèrent : on obtient 101, soit 5. Recommence avec 101 et 011 : le résultat 110 vaut 6. Le même masque restitue donc le message, sans prouver à lui seul la sécurité du mécanisme.',
      'Le destinataire prévu est Bob. Alice doit donc obtenir sa clé publique et vérifier qu’elle appartient bien à Bob. Le message est chiffré pour cette clé ; dans le modèle étudié, seule la clé privée correspondante permet à Bob de le déchiffrer. La clé privée n’a pas à être envoyée à Alice.',
      'L’intermédiaire fournit sa propre clé en se présentant comme le serveur. Si le navigateur l’accepte sans authentification, le message est chiffré pour l’intermédiaire, qui possède la clé privée associée. Le calcul peut fonctionner correctement tout en protégeant le mauvais échange : il faut vérifier l’identité.'
    ]
  })
};

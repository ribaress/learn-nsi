import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const webPedagogy = {
  'premiere-evenements': {
    duration: 70,
    introduction: intro(
      'Un distributeur affiche « Prêt » jusqu’à ce que tu appuies sur un bouton. Une page peut elle aussi afficher un message puis réagir à un clic sans être remplacée entièrement.',
      'Comment décrire les éléments visibles et programmer une réaction qui attend réellement l’action de la personne ?',
      'La séparation entre structure et réaction permet de créer une interface compréhensible dont le comportement peut être essayé.',
      [
        'Construire un bouton et un champ nommé.',
        'Retrouver un élément dans la page.',
        'Associer un événement à une fonction.',
        'Observer l’état après plusieurs actions et comprendre sa durée de vie.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Page et navigateur',
        'Une page est un document affiché par un navigateur, le logiciel qui interprète sa structure et peut exécuter son code interactif.',
        'Un navigateur peut afficher un bouton et modifier son texte après un clic.'
      ),
      recap(
        'Élément HTML',
        'HTML est un langage qui décrit la structure du document. Un élément se note généralement avec une balise ouvrante et une balise fermante.',
        '<button>Saluer</button> décrit un bouton portant le texte Saluer.'
      ),
      recap(
        'Fonction et état',
        'Une fonction est une suite d’instructions nommée ou fournie comme valeur. L’état est l’ensemble des valeurs conservées à un instant.',
        'Un compteur commence à zéro ; une fonction peut lui ajouter un à chaque clic.'
      )
    ],
    realLifeExamples: [
      life(
        'La sonnette',
        'Une sonnette attend que quelqu’un appuie pour déclencher un son.',
        'L’appui correspond à l’événement ; le code associé au clic correspond à la réaction préparée à l’avance.',
        'Le navigateur reçoit un événement logiciel ; il ne commande pas nécessairement un appareil physique.'
      ),
      life(
        'Un compteur de visiteurs',
        'Une personne appuie une fois sur un bouton chaque fois qu’un visiteur entre.',
        'Une variable peut garder le nombre entre deux événements, puis un élément de sortie l’affiche.',
        'Recharger la page peut effacer ce compteur local si aucune sauvegarde n’a été prévue.'
      )
    ],
    sections: [
      s(
        'Construire les contrôles avant leur comportement',
        'HTML décrit des éléments : button est un bouton ; input est une entrée de saisie ; label est son nom visible ; output présente un résultat. Un attribut précise un élément : id="prenom" donne un identifiant unique à l’entrée ; for="prenom" sur son label crée l’association. input n’a pas de balise fermante. type="button" crée un bouton ordinaire. Dans une page complète, <!doctype html> annonce HTML, html lang="fr" précise la langue, head contient les informations du document, meta charset="utf-8" précise l’encodage, title son titre et body son contenu visible.'
      ),
      s(
        'Retrouver un élément sans modifier toute la page',
        'JavaScript est le langage qui peut faire évoluer la page. Le navigateur expose document, un objet représentant le document ; document.querySelector("#message") retrouve l’élément dont l’id vaut message. Le signe # signifie « identifiant » dans ce sélecteur ; "button" vise une balise de ce nom. const sortie = ... donne un nom à l’élément retrouvé. Le point accède à une propriété ou une méthode : sortie.textContent = "Bonjour" remplace le texte de cet élément. = affecte une valeur ; les guillemets entourent du texte.',
        {
          checkpoint: pause(
            'Que retrouve le sélecteur "#message" ?',
            'L’élément dont l’id est message',
            'Tout le texte contenant le mot message',
            'Le préfixe # sélectionne un identifiant HTML. Il n’effectue pas une recherche de mots dans le texte affiché.'
          )
        }
      ),
      s(
        'Préparer une réaction qui sera appelée plus tard',
        'Un événement est un signal du navigateur, comme click pour un clic, input pour une saisie ou change pour une modification validée selon le contrôle. addEventListener("click", saluer) associe au bouton la fonction saluer ; cette fonction regroupe les instructions à exécuter plus tard. Écrire saluer() l’appelle immédiatement : les parenthèses déclenchent l’appel. La forme () => { ... } définit directement une fonction sans nom ; les accolades contiennent ses instructions. Le code s’associe une fois, puis le navigateur l’appelle à chaque événement.'
      ),
      s(
        'Suivre les changements d’état au fil des clics',
        'let n = 0 crée une variable qui peut changer ; const fixe au contraire l’association d’un nom. Dans une réaction, n += 1 signifie n = n + 1. Après deux clics, n vaut 2 si on ne l’a pas remis à zéro. Placer let n = 0 à l’intérieur de la fonction recréerait zéro à chaque clic. Les instructions entre accolades appartiennent au même bloc. Le gestionnaire, nom donné à la fonction qui traite l’événement, doit être placé après les éléments dans un script pour les retrouver au moment prévu.',
        {
          checkpoint: pause(
            'Quel argument prépare saluer pour un futur clic sans l’appeler immédiatement ?',
            'saluer, sans parenthèses',
            'saluer(), avec parenthèses',
            'Les parenthèses exécutent la fonction maintenant. Le navigateur a besoin de recevoir la fonction elle-même pour l’appeler lors du clic.'
          )
        }
      ),
      s(
        'Essayer l’interface et annoncer les limites de l’état local',
        'Le balisage rend le contrôle visible, CSS peut régler son apparence et JavaScript décrit sa réaction ; chacun a un rôle différent. Pour tester, on clique réellement puis on vérifie le texte de output, au lieu de chercher seulement le mot Bonjour dans le code. Une variable locale à la page peut disparaître lors d’une nouvelle navigation ; afficher un résultat ne l’envoie pas automatiquement à un serveur. La fonction ci-dessous ne contient pas de return : elle agit sur le document plutôt que de renvoyer une valeur calculée.',
        {
          code: 'const bouton = document.querySelector("#saluer");\nconst sortie = document.querySelector("#message");\nfunction saluer() {\n  sortie.textContent = "Bonjour";\n}\nbouton.addEventListener("click", saluer);'
        }
      )
    ],
    exampleMethods: [
      'Sépare les deux rôles : la balise rend le bouton présent dans le document ; le gestionnaire explique ensuite la conséquence du clic. Sans gestionnaire, ce bouton ordinaire n’a pas cette réaction personnalisée.',
      'Note la valeur avant et après chaque appel : zéro avant le premier, un après, puis deux après le deuxième. Cette progression suppose une variable définie en dehors du gestionnaire.',
      'Lis les parenthèses comme une demande d’exécution immédiate. Le résultat de saluer() serait transmis à addEventListener, alors que cette méthode attend une fonction à rappeler plus tard.'
    ]
  },
  'premiere-http': {
    duration: 60,
    introduction: intro(
      'Quand tu consultes les places encore disponibles pour un spectacle, l’écran ne peut pas connaître seul les réservations effectuées par les autres personnes.',
      'Que se passe-t-il entre la demande du navigateur, le travail à distance et l’affichage de la réponse ?',
      'Identifier client, serveur et transmission aide à savoir où vivent les données et ce que protège une connexion HTTPS.',
      [
        'Suivre une requête et une réponse.',
        'Distinguer les calculs locaux et distants.',
        'Localiser les différentes formes d’état.',
        'Définir la protection HTTPS et les limites d’un contrôle de texte.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Client et serveur',
        'Un client demande un service ; un serveur est un programme qui reçoit la demande et produit une réponse. Ces rôles ne désignent pas uniquement la taille des machines.',
        'Le navigateur demande une page et le serveur du site lui envoie un document.'
      ),
      recap(
        'URL',
        'Une URL est une adresse de ressource. Son début, appelé schéma, indique notamment le protocole utilisé.',
        'Dans https://exemple.fr/places, https indique une connexion HTTP protégée par TLS.'
      ),
      recap(
        'État',
        'L’état est l’ensemble des données conservées à un moment. Deux programmes peuvent garder des états différents et ne les partager qu’en les transmettant.',
        'Un compteur de clics dans la page n’apparaît pas automatiquement dans la base du serveur.'
      )
    ],
    realLifeExamples: [
      life(
        'Le guichet de réservation',
        'Tu demandes au guichet combien de sièges restent et reçois une réponse basée sur le registre commun.',
        'La requête ressemble à la demande et la réponse au renseignement produit par le serveur qui possède l’état partagé.',
        'Un serveur traite des messages formalisés ; il ne comprend pas toutes les intentions implicites d’une conversation humaine.'
      ),
      life(
        'Une enveloppe scellée',
        'Un message voyage dans une enveloppe qui empêche un passant de le lire ou de le modifier discrètement.',
        'HTTPS chiffre l’échange et en protège l’intégrité, avec une authentification du serveur dans le cadre TLS.',
        'Le destinataire ouvre l’enveloppe : HTTPS ne cache pas les données au site et ne garantit pas son honnêteté.'
      )
    ],
    sections: [
      s(
        'Décomposer le voyage d’une demande',
        'HTTP est un protocole, c’est-à-dire un ensemble de règles pour échanger des messages entre client et serveur. La requête indique une méthode, comme GET pour demander une ressource, l’adresse de cette ressource et des en-têtes qui donnent des informations supplémentaires. Le serveur renvoie une réponse avec un statut, des en-têtes et un corps. Le statut indique par exemple une réussite ou une ressource introuvable ; le corps peut être le document HTML à afficher.'
      ),
      s(
        'Choisir où le calcul s’exécute',
        'Le navigateur interprète le HTML reçu et peut exécuter son JavaScript : ces traitements sont côté client. Changer la couleur d’un titre déjà présent ne demande pas forcément de nouvel échange. En revanche, obtenir des places disponibles nécessite de consulter l’état partagé du serveur. Le serveur peut faire un calcul, interroger ses données puis construire une réponse ; le navigateur l’affiche ensuite. La présence de code JavaScript sur une page ne signifie donc pas que toutes ses données sont déjà disponibles localement.',
        {
          checkpoint: pause(
            'Où s’exécute habituellement le gestionnaire du clic dans une page ?',
            'Dans le navigateur client',
            'Nécessairement sur le serveur',
            'Le navigateur exécute le JavaScript de la page. Ce code peut ensuite demander des données distantes si un échange est prévu.'
          )
        }
      ),
      s(
        'Localiser les données conservées',
        'Une variable JavaScript appartient au programme de la page. localStorage est un stockage du navigateur qui peut survivre au rechargement ; il n’est pas envoyé automatiquement au site. Un cookie est une petite donnée que le navigateur peut retransmettre au serveur selon son domaine et ses attributs. Une table conservée sur le serveur est distante. « Sauvegardé » ne dit donc pas où la donnée existe : il faut préciser la localisation et le mécanisme de transmission.'
      ),
      s(
        'Comprendre la promesse de HTTPS',
        'HTTPS transporte les messages HTTP dans une connexion protégée par TLS. Le chiffrement rend leur contenu difficile à lire pour un observateur du trajet ; l’intégrité permet de détecter certaines modifications et l’authentification sert à vérifier le serveur visé. Le serveur destinataire reçoit néanmoins les données en clair pour les traiter. POST, une méthode HTTP, n’ajoute pas ce chiffrement. Une connexion HTTPS ne garantit pas non plus que le contenu publié soit vrai ni que le vendeur soit honnête.',
        {
          checkpoint: pause(
            'POST suffit-il à rendre confidentiel un formulaire envoyé en HTTP ?',
            'Non, il faut la protection HTTPS du trajet',
            'Oui, parce que le contenu n’est pas dans l’URL',
            'POST décrit la forme de l’envoi, pas son chiffrement. Le corps de la requête HTTP peut être lu sur le trajet sans la protection TLS.'
          )
        }
      ),
      s(
        'Contrôler un schéma dans une fonction Python',
        'Une fonction est un traitement nommé : def est_https(url): reçoit l’adresse sous forme de chaîne, du texte. Le paramètre url est le nom utilisé dans la fonction ; une variable peut garder une version transformée. url.lower() renvoie le texte en minuscules ; le point appelle une méthode attachée au texte. .startswith("https://") renvoie True si le début correspond exactement au préfixe demandé et False sinon. return transmet ce booléen à l’appelant. Ce test de texte ne tente aucune connexion, ne vérifie aucun certificat et ne suffit donc pas à démontrer la sécurité du site.',
        {
          code: 'def schema_protege(adresse):\n    minuscule = adresse.lower()\n    return minuscule.startswith("https://")'
        }
      )
    ],
    exampleMethods: [
      'Demande quelles informations sont nécessaires : la couleur choisie et le code de modification sont déjà dans la page. Le navigateur peut donc transformer l’affichage sans consulter une donnée commune distante.',
      'Suis quatre étapes distinctes : le client demande, le serveur lit son état et calcule, il répond, puis le navigateur affiche. Confondre la dernière étape avec tout le traitement cacherait la source de l’information.',
      'Distingue emplacement et protection. POST place les paramètres dans le corps plutôt que dans l’adresse, mais le corps reste une partie du message transporté. Seule une protection de connexion apporte ici le chiffrement.'
    ]
  },
  'premiere-formulaires': {
    duration: 70,
    introduction: intro(
      'Sur un site de bibliothèque, tu saisis « lune » dans la recherche, puis tu remplis une inscription. Les champs se ressemblent, mais les données n’ont pas le même rôle et ne devraient pas voyager de la même manière.',
      'Comment un formulaire transforme-t-il une saisie en paramètres adressés au serveur ?',
      'Comprendre les noms de champs et les méthodes évite les champs oubliés et les informations confidentielles exposées dans une adresse partageable.',
      [
        'Construire des champs avec un nom transmis.',
        'Lire la destination et la méthode du formulaire.',
        'Décomposer une adresse de recherche GET.',
        'Comparer POST et HTTPS puis encoder des paramètres.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Formulaire',
        'Un formulaire regroupe des contrôles de saisie et décrit la destination de leur envoi. Le navigateur prépare le message lorsque l’envoi est déclenché.',
        'Une zone de recherche et son bouton peuvent appartenir au même formulaire.'
      ),
      recap(
        'Paramètre',
        'Un paramètre transmis associe un nom à une valeur. Le serveur utilise le nom pour retrouver la saisie dans le message reçu.',
        'q=lune associe le nom q au texte lune, selon la convention du site.'
      ),
      recap(
        'HTTP et HTTPS',
        'HTTP organise les demandes et réponses ; HTTPS ajoute une protection de la connexion par TLS, indépendamment du choix entre GET et POST.',
        'Une requête POST envoyée en HTTP n’est pas chiffrée simplement parce qu’elle utilise POST.'
      )
    ],
    realLifeExamples: [
      life(
        'Une recherche à partager',
        'Tu recherches « lune » puis veux envoyer à un camarade le lien vers cette même recherche.',
        'GET place les paramètres dans l’adresse, ce qui permet de reproduire cette demande en partageant l’URL.',
        'Le résultat peut évoluer si le catalogue change ; une adresse partageable ne fige pas les données du serveur.'
      ),
      life(
        'Une fiche d’inscription',
        'Tu transmets un pseudo pour demander une nouvelle inscription au club.',
        'Un formulaire POST décrit une opération d’envoi et place habituellement les paramètres dans le corps de la requête.',
        'POST n’apporte pas de chiffrement ; HTTPS est nécessaire pour protéger le transport des informations.'
      )
    ],
    sections: [
      s(
        'Nommer les éléments de la page',
        'HTML décrit la structure avec des balises : form regroupe le formulaire, input reçoit une saisie, label donne son nom visible et button crée un bouton. Les attributs sont des précisions écrites dans la balise ouvrante. id="pseudo" identifie l’entrée dans la page ; for="pseudo" sur label l’associe à cette entrée. name="pseudo" indique le nom du paramètre envoyé. Ces rôles sont différents : un id seul ne suffit pas pour transmettre un champ nommé. type="submit" fait du bouton un déclencheur d’envoi.'
      ),
      s(
        'Lire la destination et le choix de méthode',
        'L’attribut action="/inscription" annonce la ressource destinataire sur le site ; method="post" choisit la méthode HTTP. Un input de type text fournit du texte ; un groupe de boutons radio ne transmet que la value de l’option sélectionnée sous leur name commun. Dans une page complète, <!doctype html> annonce HTML ; html lang="fr" donne la langue ; head contient meta charset="utf-8" et title ; body contient la partie visible. Ces balises entourent le formulaire sans remplacer ses champs.',
        {
          checkpoint: pause(
            'Quel attribut donne le nom reçu par le serveur pour une saisie ?',
            'name',
            'id',
            'id identifie l’élément dans le document. name détermine le nom du paramètre transmis avec sa valeur.'
          )
        }
      ),
      s(
        'Suivre un envoi GET dans l’adresse',
        'GET convient à une demande de ressource comme une recherche sans modification. Pour action="/recherche", un champ name="q" de valeur lune produit /recherche?q=lune. Le caractère ? commence la partie paramètres ; = sépare un nom de sa valeur et & sépare plusieurs paramètres. Les espaces et certains caractères ont une écriture encodée, afin de ne pas être confondus avec ces signes de structure. Concaténer directement une saisie contenant & créerait une ambiguïté.'
      ),
      s(
        'Choisir POST sans lui attribuer le chiffrement',
        'POST transmet habituellement les paramètres dans le corps de la requête et convient notamment à des opérations qui modifient l’état du serveur. Une adresse peut être conservée dans l’historique ou partagée : elle ne doit donc pas contenir un mot de passe. Le corps n’est pas pour autant secret sur le trajet ; la protection dépend de HTTPS. La maquette d’exercice envoie vers un chemin fictif et sert à vérifier la structure du formulaire, sans créer un compte réel.',
        {
          checkpoint: pause(
            'Une recherche que l’on veut partager dans son URL utilise ici quelle méthode ?',
            'GET',
            'POST uniquement',
            'GET encode les paramètres de recherche dans l’adresse. La situation décrit une consultation et demande explicitement une URL partageable.'
          )
        }
      ),
      s(
        'Encoder une adresse avec un outil Python',
        'Une fonction est un traitement nommé : def recherche_url(terme): reçoit le texte recherché. from urllib.parse import urlencode importe un outil de la bibliothèque standard : un module regroupe des fonctions réutilisables. {"q": terme} est un dictionnaire qui associe le nom q à la saisie. urlencode transforme cette association en paramètres correctement encodés, avec + pour les espaces dans cette convention. Le signe + entre deux chaînes les concatène ; return renvoie l’adresse construite. Cette fonction ne contacte aucun serveur et n’effectue pas la recherche. Une variable adresse peut conserver le résultat pour le relire.',
        {
          code: 'from urllib.parse import urlencode\n\ndef adresse_catalogue(mot):\n    parametres = urlencode({"q": mot})\n    return "/catalogue?" + parametres'
        }
      )
    ],
    exampleMethods: [
      'Repère action comme début d’adresse, puis le nom q comme clé du paramètre. La valeur lune est placée après = ; le point d’interrogation sépare la ressource de ses paramètres.',
      'Sépare ce qui sert au navigateur de ce qui sert au destinataire. Le sélecteur peut utiliser #pseudo, mais le formulaire envoie le nom utilisateur ; le serveur n’a pas à deviner l’id.',
      'Cherche l’attribut name dans la balise : il manque. L’entrée peut rester visible et modifiable grâce à son id, mais elle ne fournit pas de paramètre nommé lors de cet envoi.'
    ]
  }
};

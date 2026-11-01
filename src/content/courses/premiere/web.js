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
const page = (body) =>
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Atelier Web</title></head><body>${body}</body></html>`;
const origine = (changes) =>
  source(
    '6.1 Pages web et interactions — page HTML et JavaScript local',
    'T6_IHM_Web/6.1_Interactions_page_web/cours.md',
    changes
  );
export default {
  id: 'web',
  title: 'Interagir sur le Web',
  lessons: [
    lesson({
      id: 'premiere-evenements',
      title: 'Composants graphiques et événements',
      duration: 40,
      prerequisites: ['Lire une balise HTML et une affectation.'],
      objectives: [
        'Relier structure HTML et comportement JavaScript.',
        'Modifier la fonction appelée par un clic.'
      ],
      official: ['P-W1', 'P-W2', 'P-W3'],
      sections: [
        s(
          'La structure décrit les contrôles',
          'button décrit un bouton ; input recueille une saisie ; label donne un nom visible à un champ. CSS règle la présentation. Aucun de ces rôles ne suffit à décrire tout le comportement : il faut préciser la réaction aux actions de l’utilisateur.'
        ),
        s(
          'Un événement déclenche un traitement',
          'Un clic émet l’événement click ; une modification de champ peut émettre input ou change. addEventListener associe un traitement à un composant. La fonction s’exécute au moment de l’événement, pas au moment où on l’associe.',
          'const bouton = document.querySelector("button");\nbouton.addEventListener("click", () => {\n  document.querySelector("output").textContent = "Bonjour";\n});'
        ),
        s(
          'Un état local change',
          'Un compteur JavaScript peut rester dans la mémoire de la page et augmenter après chaque clic. Une nouvelle navigation peut perdre cet état s’il n’a pas été sauvegardé. Modifier textContent affiche du texte ; le modèle d’activité reste entièrement local au navigateur.'
        )
      ],
      examples: [
        e(
          'Un bouton',
          'button puis un gestionnaire click',
          'Le HTML crée le contrôle et le JavaScript explique la réaction.',
          'Le clic peut modifier un output.'
        ),
        e(
          'Deux clics',
          'let n=0 ; lors de click : n+=1',
          'Le même état survit entre les deux appels du gestionnaire.',
          'n passe de 0 à 1 puis 2.'
        ),
        e(
          'Un appel trop tôt',
          'addEventListener("click", saluer())',
          'Les parenthèses appellent saluer immédiatement ; on veut fournir une fonction à appeler plus tard.',
          'Passer saluer, ou () => saluer().'
        )
      ],
      activity: a(
        'web',
        'Prévois le texte après deux clics, puis teste.',
        'La sortie affiche 2.',
        'Tout se passe dans le client ; aucune requête ni sauvegarde distante n’est effectuée.',
        {
          html: page(
            '<button id="plus">Ajouter</button><output id="compte">0</output><script>let n=0;document.querySelector("#plus").addEventListener("click",()=>{n+=1;document.querySelector("#compte").textContent=n;});</script>'
          )
        }
      ),
      exercises: [
        q(
          'p-w1',
          'Choisir un événement',
          'Quel événement associer à une action déclenchée par un clic sur un bouton ? Réponds avec son nom JavaScript.',
          'click',
          [
            'Il s’agit de l’action de la souris sur le contrôle.',
            'Le nom anglais est celui utilisé par addEventListener.',
            'Ce n’est ni load ni change.'
          ],
          'click correspond à l’activation du bouton.',
          'change convient à une modification validée d’un champ ; reprends le contrôle demandé.'
        ),
        {
          id: 'p-w2',
          title: 'Construire un contrôle accessible',
          kind: 'web',
          prompt:
            'Crée une page HTML complète avec un label « Prénom » associé à un input d’id prenom et un bouton de type button portant « Saluer ». Aucun envoi serveur n’est requis.',
          starter: page('<!-- Ajoute les composants -->'),
          solution: page(
            '<label for="prenom">Prénom</label><input id="prenom" name="prenom"><button type="button">Saluer</button>'
          ),
          checks: [
            { selector: 'label[for="prenom"]', text: 'Prénom' },
            { selector: 'input#prenom' },
            { selector: 'button', text: 'Saluer', attribute: 'type', value: 'button' }
          ],
          hints: [
            'Le label utilise for pour désigner l’id du champ.',
            'L’input doit avoir id="prenom".',
            'Le type button évite un envoi implicite de formulaire.'
          ],
          explanation:
            'Les attributs for et id relient le nom visible au champ ; le bouton a une fonction locale explicite.',
          feedbackWrong:
            'Un texte posé près du champ ne l’associe pas automatiquement : vérifie for et id.',
          source: origine(
            'Adaptation de la création de page HTML : remplacement image/lien par une petite IHM accessible, composants imposés, document autonome et vérifications ajoutés.'
          )
        },
        {
          id: 'p-w3',
          title: 'Réagir au clic',
          kind: 'web',
          prompt:
            'Crée une page avec un bouton #saluer « Saluer » et un output #message initialement « Prêt ». Au clic, affiche « Bonjour » dans output, en JavaScript local.',
          starter: page(
            '<button id="saluer" type="button">Saluer</button><output id="message">Prêt</output><script>// Associe le clic</script>'
          ),
          solution: page(
            '<button id="saluer" type="button">Saluer</button><output id="message">Prêt</output><script>document.querySelector("#saluer").addEventListener("click",()=>{document.querySelector("#message").textContent="Bonjour";});</script>'
          ),
          checks: [
            { selector: 'button#saluer', text: 'Saluer' },
            { selector: 'output#message', text: 'Prêt' },
            {
              selector: 'output#message',
              text: 'Bonjour',
              actions: [{ selector: '#saluer', click: true }]
            }
          ],
          hints: [
            'Sélectionne le bouton par #saluer.',
            'Associe click à une fonction avec addEventListener.',
            'Dans la fonction, remplace textContent de #message.'
          ],
          explanation:
            'Le document est d’abord prêt, puis l’événement exécute le remplacement. La vérification clique sur le bouton et contrôle le texte obtenu ; teste aussi le clic dans l’aperçu pour relier le geste au gestionnaire.',
          feedbackWrong:
            'Si le message change au chargement, tu as appelé le traitement trop tôt. Place l’affectation dans la fonction du clic.',
          source: origine(
            'Adaptation de l’exercice de page dynamique et du changement de couleur : sortie textuelle locale, composants nommés, démarrage observable, aides et correction ajoutés.'
          )
        }
      ],
      reflection:
        'Quelle partie du code décide de la présence du bouton et quelle partie décide de son effet ?',
      review: [
        'J’identifie les composants HTML.',
        'J’associe un événement à son traitement.',
        'Je distingue une fonction et son appel.'
      ]
    }),
    lesson({
      id: 'premiere-http',
      title: 'Client, serveur, état et HTTPS',
      duration: 35,
      prerequisites: ['Navigateur et page Web.'],
      objectives: [
        'Remettre une interaction réseau dans l’ordre.',
        'Distinguer mémoire locale, transmission et chiffrement.'
      ],
      official: ['P-W4', 'P-W5', 'P-W6'],
      sections: [
        s(
          'Une requête et une réponse',
          'Le navigateur client construit une requête HTTP comprenant une méthode, une ressource et des en-têtes. Le serveur reçoit la requête, effectue éventuellement un calcul et renvoie un statut, des en-têtes et un corps. Le navigateur interprète ensuite le HTML et exécute le JavaScript reçu.'
        ),
        s(
          'Des états à des endroits différents',
          'Une variable JavaScript vit dans la page ; localStorage est conservé dans le navigateur ; un cookie peut être retransmis dans les requêtes selon son domaine et ses attributs. Une table du serveur est distante. Une donnée locale n’est envoyée que si un mécanisme de transmission la prévoit.'
        ),
        s(
          'HTTPS protège le trajet',
          'HTTPS transporte HTTP dans une connexion chiffrée et authentifiée par TLS. Cela protège notamment le contenu et l’intégrité des échanges contre un observateur du trajet. Cela ne rend pas un site honnête et ne cache pas les données au serveur qui les reçoit. Le destinataire et le volume du trafic peuvent rester observables.'
        )
      ],
      examples: [
        e(
          'Calcul local',
          'Changer une couleur avec JavaScript',
          'La page dispose déjà du code et de la couleur ; le serveur n’a pas besoin de recalculer.',
          'Traitement client sans nouvelle requête nécessaire.'
        ),
        e(
          'Calcul distant',
          'Consulter des places disponibles',
          'La disponibilité commune est conservée côté serveur, qui reçoit la demande avant de produire une réponse.',
          'Requête → traitement serveur → réponse → affichage.'
        ),
        e(
          'Fausses garanties',
          'Un formulaire POST envoyé en HTTP',
          'POST place des paramètres dans le corps, mais n’ajoute aucun chiffrement.',
          'Les données peuvent être lisibles sur le trajet ; utiliser HTTPS.'
        )
      ],
      activity: a(
        'network',
        'Parcours du navigateur A au serveur C via le routeur B : place calcul et affichage.',
        'Le calcul serveur précède l’affichage de sa réponse.',
        'Le graphe représente des rôles et des étapes ; il ne simule pas TLS ni un véritable serveur HTTP.',
        {
          nodes: [
            { id: 'A', label: 'Client', x: 10, y: 50 },
            { id: 'B', label: 'Routeur', x: 50, y: 50 },
            { id: 'C', label: 'Serveur', x: 90, y: 50 }
          ],
          edges: [
            ['A', 'B', 1],
            ['B', 'C', 1]
          ],
          start: 'A',
          goal: 'C'
        }
      ),
      exercises: [
        q(
          'p-w4',
          'Localiser un calcul',
          'Où s’exécute normalement le JavaScript qui réagit à un clic dans une page reçue ? Réponds client ou serveur.',
          'client',
          [
            'Le navigateur a reçu le programme.',
            'Aucune demande distante n’est nécessaire pour changer un texte local.',
            'Le navigateur tient le rôle de client.'
          ],
          'Le gestionnaire du clic s’exécute dans le navigateur.',
          'Une page provenant d’un serveur peut contenir un programme destiné au client.'
        ),
        q(
          'p-w5',
          'Comprendre la mémoire',
          'Un cookie destiné à un site peut-il être retransmis automatiquement au serveur de ce site ? Réponds oui ou non.',
          'oui',
          [
            'Un cookie possède un domaine et des règles de transmission.',
            'Il diffère d’une simple variable JavaScript.',
            'Pour une requête qui satisfait ses règles, le navigateur le joint.'
          ],
          'Les cookies admissibles sont joints aux requêtes ; cela ne signifie pas que tout stockage local est automatiquement transmis.',
          'Ne généralise pas le comportement de localStorage aux cookies.'
        ),
        p(
          'p-w6',
          'Reconnaître le transport',
          'Écris est_https(url) qui renvoie True seulement si la chaîne commence par https://, sans distinction de majuscules. Il s’agit d’un contrôle pédagogique du schéma, pas d’une validation de certificat.',
          'est_https',
          'url',
          'def est_https(url):\n    return url.lower().startswith("https://")',
          [
            t(['https://exemple.test'], true),
            t(['HTTP://exemple.test'], false),
            t(['HTTPS://exemple.test'], true),
            t(['texte https://exemple.test'], false)
          ],
          [
            'Normalise les majuscules avec lower().',
            'Le schéma doit être au début.',
            'startswith évite d’accepter une simple mention au milieu du texte.'
          ],
          'La présence du schéma suggère l’usage de TLS, mais ce test ne contacte pas le site et ne vérifie pas sa sécurité.',
          'Tester seulement si https apparaît quelque part accepte une chaîne sans schéma valide.'
        )
      ],
      reflection:
        'Pourquoi le serveur doit-il valider les données même si le formulaire les vérifie déjà dans le navigateur ?',
      review: [
        'J’ordonne requête et réponse.',
        'Je localise les données et les traitements.',
        'J’explique les garanties limitées de HTTPS.'
      ]
    }),
    lesson({
      id: 'premiere-formulaires',
      title: 'Formulaires et paramètres GET ou POST',
      duration: 35,
      prerequisites: ['Composants HTML et dialogue HTTP.'],
      objectives: [
        'Lire action, method, name et value.',
        'Choisir un mode d’envoi adapté à l’usage.'
      ],
      official: ['P-W7', 'P-W8'],
      sections: [
        s(
          'Les champs qui voyagent',
          'action indique la destination et method la méthode HTTP. Le champ doit avoir un name pour être transmis. id sert à l’interface et aux sélecteurs, mais ne remplace pas name. Un champ radio transmet la value de l’option sélectionnée.'
        ),
        s(
          'GET pour demander une ressource',
          'Un formulaire GET encode les paramètres dans la partie requête de l’URL, après ?. Les paramètres se séparent par &. Cette forme est pratique pour une recherche partageable. Les caractères réservés sont échappés ; une URL ne doit pas être assemblée en concaténant des données brutes.'
        ),
        s(
          'POST et confidentialité',
          'POST transmet généralement les paramètres dans le corps de la requête, et convient notamment à une opération qui modifie le serveur. Cela ne chiffre pas le contenu : HTTPS reste nécessaire. Un mot de passe ne doit pas figurer dans une URL conservée dans l’historique ou partagée.'
        )
      ],
      examples: [
        e(
          'Une recherche',
          'action="/recherche", method="get", name="q", value="lune"',
          'Le nom du champ devient le nom du paramètre dans l’URL.',
          '/recherche?q=lune'
        ),
        e(
          'Un nom distinct',
          'input id="pseudo" name="utilisateur" value="Ada"',
          'Le destinataire reçoit le name, même s’il diffère de l’id.',
          'Paramètre utilisateur=Ada'
        ),
        e(
          'Une erreur de champ',
          'input id="age" value="17", sans name',
          'L’id ne détermine pas le nom envoyé.',
          'Le champ n’est pas transmis comme paramètre nommé.'
        )
      ],
      activity: a(
        'web',
        'Inspecte ce formulaire de recherche : quels noms seront transmis ?',
        'Seul le champ q nommé voyage ; le label nomme visuellement la saisie.',
        'L’aperçu est une maquette : aucune recherche distante n’est fournie.',
        {
          html: page(
            '<form action="/recherche" method="get"><label for="q">Recherche</label><input id="q" name="q" value="lune"><button type="submit">Chercher</button></form>'
          )
        }
      ),
      exercises: [
        q(
          'p-w7',
          'Lire la méthode',
          'Quelle méthode HTTP convient à une recherche sans modification dont on veut partager l’URL ?',
          'GET',
          [
            'L’URL doit conserver les paramètres.',
            'On demande une ressource sans modifier l’état du serveur.',
            'La méthode étudiée place les paramètres après ?.'
          ],
          'GET permet de représenter la recherche dans l’URL.',
          'POST ne rend pas une recherche directement partageable par son URL.'
        ),
        {
          id: 'p-w8',
          title: 'Un formulaire complet',
          kind: 'web',
          prompt:
            'Crée un formulaire qui envoie par POST à /inscription un champ texte nommé pseudo et un bouton « Inscrire ». Associe un label à l’input d’id pseudo. Ce chemin est une maquette ; aucun compte ne sera créé.',
          starter: page('<!-- Formulaire -->'),
          solution: page(
            '<form action="/inscription" method="post"><label for="pseudo">Pseudo</label><input id="pseudo" name="pseudo"><button type="submit">Inscrire</button></form>'
          ),
          checks: [
            { selector: 'form', attribute: 'method', value: 'post' },
            { selector: 'form', attribute: 'action', value: '/inscription' },
            { selector: 'input#pseudo', attribute: 'name', value: 'pseudo' },
            { selector: 'button', text: 'Inscrire' }
          ],
          hints: [
            'action est le chemin /inscription.',
            'method doit être post.',
            'Le champ porte à la fois id et name ; le label utilise for.'
          ],
          explanation:
            'Le navigateur utilisera le corps de la requête ; un véritable service devrait aussi être en HTTPS et valider le pseudo côté serveur.',
          feedbackWrong: 'Un id sans name ne suffit pas pour transmettre le champ.'
        },
        p(
          'p-w9',
          'Encoder des paramètres',
          'Écris recherche_url(terme) qui produit /recherche?q=... avec urllib.parse.urlencode ; les espaces sont encodées par +.',
          'recherche_url',
          'terme',
          'from urllib.parse import urlencode\n\ndef recherche_url(terme):\n    return "/recherche?" + urlencode({"q":terme})',
          [
            t(['lune mars'], '/recherche?q=lune+mars'),
            t(['A&B'], '/recherche?q=A%26B'),
            t([''], '/recherche?q=')
          ],
          [
            'Importe urlencode depuis urllib.parse.',
            'Passe-lui un dictionnaire {"q":terme}.',
            'Préfixe le résultat par /recherche?.'
          ],
          'L’esperluette d’une valeur est encodée et ne devient pas un séparateur de paramètres.',
          'Une concaténation brute échoue sur & et sur les caractères non ASCII.'
        )
      ],
      reflection: 'Pourquoi POST et HTTPS répondent-ils à deux questions différentes ?',
      review: [
        'Je lis la destination et les noms envoyés.',
        'Je distingue GET et POST.',
        'J’encode les valeurs sans concaténation brute.'
      ]
    })
  ]
};

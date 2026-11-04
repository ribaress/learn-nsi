import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const histoirePedagogy = {
  'premiere-histoire': {
    duration: 65,
    introduction: intro(
      'Une recette de partage peut être suivie sur papier, une calculatrice réalise certaines opérations, et un téléphone peut changer d’activité en lançant une autre application. Ces trois objets ne font pas intervenir les mêmes idées au même moment de l’histoire.',
      'Qu’est-ce qui distingue une méthode de calcul, une machine programmable et un réseau de documents ?',
      'Construire ces distinctions donne du sens aux repères historiques et évite d’attribuer à une seule invention tout ce que font les ordinateurs actuels.',
      [
        'Reconnaître une méthode sans ordinateur.',
        'Distinguer calcul mécanique et programme.',
        'Comprendre une machine générale.',
        'Séparer les réseaux de leurs services et lire une chronologie.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Algorithme',
        'Un algorithme est une méthode faite d’étapes précises pour obtenir un résultat. Il peut être appliqué par une personne sur papier.',
        'Partager des objets en groupes puis recompter le reste constitue déjà une procédure de calcul.'
      ),
      recap(
        'Programme et machine',
        'Un programme exprime des instructions dans un langage ; une machine est le dispositif qui les exécute selon ses règles.',
        'Un même ordinateur peut calculer une somme puis afficher du texte en changeant de programme.'
      ),
      recap(
        'Chronologie',
        'Une chronologie ordonne des événements selon leurs dates. Une date est un repère choisi pour un fait précis, pas le début de toutes les idées liées.',
        'Entre 1969 et 1989, on compte 1989 − 1969 = 20 années.'
      )
    ],
    realLifeExamples: [
      life(
        'Une recette transmise sans appareil',
        'Une personne explique comment partager équitablement une quantité en répétant des divisions.',
        'La méthode existe indépendamment du support qui l’exécute, comme les algorithmes étudiés avant les ordinateurs.',
        'Une recette courante peut laisser des gestes implicites ; un algorithme doit fixer les opérations et les conditions d’arrêt.'
      ),
      life(
        'Les routes et les adresses de magasins',
        'Des routes relient des lieux ; des magasins utilisent ces routes pour recevoir des personnes ou des colis.',
        'La distinction évoque le réseau de communication et un service qui l’utilise, comme le Web sur Internet.',
        'Les liens Web ne sont pas des routes physiques ; ils relient des ressources par leurs adresses.'
      )
    ],
    sections: [
      s(
        'Une procédure peut précéder sa machine',
        'Un algorithme est une méthode de résolution, pas nécessairement un programme déjà exécuté. L’algorithme d’Euclide, connu dans l’Antiquité, calcule le plus grand diviseur commun de deux entiers, c’est-à-dire le plus grand nombre qui les divise sans reste. Au IXe siècle, Al-Khwarizmi décrit des procédés de calcul ; son nom est à l’origine du mot algorithme. Ces repères montrent que les règles de calcul ont une histoire antérieure à l’informatique électronique.'
      ),
      s(
        'Suivre un petit calcul ancien pas à pas',
        'Pour 18 et 12, on partage 18 par groupes de 12 : il reste 6. On reprend ensuite 12 et ce reste 6 : deux groupes de 6 remplissent exactement 12, le reste vaut zéro. Le dernier reste non nul, 6, est le plus grand diviseur commun. Le symbole Python % calcule un reste de division entière : 18 % 12 vaut 6 et 12 % 6 vaut 0. La méthode peut être suivie sur papier ; son existence ne suppose pas une machine électrique.',
        {
          checkpoint: pause(
            'Une méthode de calcul précise peut-elle être un algorithme sans ordinateur ?',
            'Oui, une personne peut en appliquer les étapes',
            'Non, il faut nécessairement un écran',
            'Un algorithme est une méthode. Le support qui l’exécute est une question distincte, comme le montre le calcul d’Euclide sur papier.'
          )
        }
      ),
      s(
        'Du calcul mécanique à un programme modifiable',
        'Au XVIIe siècle, Pascal construit une machine à calculer mécanique. Au XIXe siècle, Babbage imagine une machine analytique programmable ; Ada Lovelace décrit en 1843 un procédé destiné à cette machine. En 1936, Turing formalise une machine universelle, modèle de machine capable de simuler des traitements décrits par des instructions. L’idée de programme enregistré permet de conserver les instructions en mémoire comme des données ; les années 1940 voient sa concrétisation, notamment avec le Manchester Baby en 1948. Modèle théorique, projet et réalisation matérielle sont des étapes différentes.'
      ),
      s(
        'Relier des machines puis relier des documents',
        'ARPANET relie des machines à partir de 1969. Les protocoles TCP/IP sont des règles qui rendent possible l’interconnexion de réseaux. Le Web, proposé par Tim Berners-Lee en 1989, est un service de documents reliés par des hyperliens, des liens vers des ressources. Il ne se confond pas avec son réseau support. Grace Hopper contribue aux compilateurs, des outils traduisant des programmes, et à la diffusion de langages plus proches des usages humains. Ces évolutions sont collectives ; une frise retient des jalons sans résumer tous les participants.',
        {
          checkpoint: pause(
            'La proposition du Web en 1989 est-elle le même événement que le début d’ARPANET en 1969 ?',
            'Non, le service et le réseau ont des repères distincts',
            'Oui, les deux mots désignent exactement la même invention',
            'ARPANET concerne la liaison entre machines ; le projet Web concerne des documents reliés. Les dates renvoient à deux événements différents.'
          )
        }
      ),
      s(
        'Lire et construire une frise sans changer les faits',
        'Une frise classe des repères, par exemple [1989, "Web"] et [1969, "ARPANET"], selon leur année. Une fonction Python est un traitement nommé : def frise(reperes): reçoit la liste de ces couples. Chaque couple contient d’abord l’année à l’indice 0, puis le texte à l’indice 1 ; les indices commencent à zéro. sorted(reperes, key=...) crée une nouvelle liste triée. lambda repere: repere[0] définit le petit calcul de clé qui extrait l’année ; key indique sur quelle valeur comparer. return renvoie la nouvelle liste et laisse l’entrée inchangée. Une variable peut garder le résultat. Trier n’explique pas à lui seul pourquoi un événement a eu lieu : la chronologie doit rester accompagnée de ses distinctions et de son contexte.'
      )
    ],
    exampleMethods: [
      'Définis le reste comme ce qui n’entre pas dans les groupes complets : 18 laisse 6 après un groupe de 12, puis 12 ne laisse rien après deux groupes de 6. Le 6 est le dernier reste non nul de cette procédure.',
      'Distingue matériel et instructions : la machine peut conserver ses composants pendant que le traitement exécuté change. Un programme de somme et un programme d’affichage décrivent deux activités du même dispositif.',
      'Identifie le fait attaché à chaque date avant de soustraire les années. 1969 renvoie ici à ARPANET et 1989 à la proposition du Web ; l’écart de vingt ans ne transforme pas ces deux faits en une seule invention.'
    ]
  }
};

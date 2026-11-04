import { intro, recap, life, section as s, pause } from './pedagogy-tools.js';
export const tablesPedagogy = {
  'premiere-csv': {
    duration: 65,
    introduction: intro(
      'Le club sportif envoie un fichier avec une ligne par adhérent : son nom, son club et son score. À l’écran, tout paraît bien rangé ; dans le fichier, ce sont pourtant des caractères et des séparateurs.',
      'Comment retrouver les fiches, leurs champs et leurs nombres sans découper le texte au mauvais endroit ?',
      'Une importation fiable permet de calculer sur des données externes et de repérer les informations absentes avant de les interpréter.',
      [
        'Reconnaître lignes, colonnes et noms de champs.',
        'Lire un CSV avec ses règles de séparation.',
        'Transformer le texte des scores en nombres.',
        'Vérifier les valeurs et préparer une fonction d’importation.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Table et fiche',
        'Une table regroupe des fiches qui possèdent les mêmes champs. Une ligne décrit un objet, et une colonne donne le même type d’information sur tous les objets.',
        'Une ligne Ada;12 décrit un nom et un score, selon les colonnes annoncées.'
      ),
      recap(
        'Chaîne et entier',
        'Une chaîne est du texte entre guillemets ; un entier est un nombre sans partie fractionnaire. Les mêmes chiffres peuvent avoir ces deux rôles.',
        '"12" est du texte lu dans un fichier ; int("12") fabrique l’entier 12.'
      ),
      recap(
        'Dictionnaire',
        'Un dictionnaire associe un nom de champ à sa valeur. On accède à la valeur en écrivant la clé entre crochets.',
        'ligne["score"] lit le champ score de la fiche appelée ligne.'
      )
    ],
    realLifeExamples: [
      life(
        'Les scores du tournoi',
        'Un organisateur exporte les résultats depuis un tableur et les transmet au club.',
        'Le CSV conserve les valeurs sous forme de texte ; on peut le relire en connaissant son séparateur, son encodage et ses colonnes.',
        'Le CSV ne conserve pas les couleurs, les formules et toute la mise en page du tableur.'
      ),
      life(
        'Un nom avec point-virgule',
        'Le nom officiel d’une équipe est Club;Nord et doit rester dans une seule case.',
        'Les guillemets protègent le séparateur intérieur. Un lecteur CSV reconnaît cette règle et ne crée pas une colonne supplémentaire.',
        'Un simple découpage sur chaque point-virgule ne comprend pas la convention des guillemets.'
      )
    ],
    sections: [
      s(
        'Donner le schéma de la table',
        'CSV signifie valeurs séparées par des virgules, mais le séparateur réel peut aussi être un point-virgule ou une tabulation. La première ligne peut annoncer nom;score : ces noms de colonnes sont des descripteurs. Les suivantes décrivent des enregistrements, autrement dit des fiches. Le schéma précise les champs attendus et leur sens ; on ne peut pas déduire qu’un nombre correspond à un âge ou à un score sans cette information.'
      ),
      s(
        'Lire les séparateurs selon une convention',
        'Le texte "Club;Nord";15 contient deux champs : les guillemets signalent que le point-virgule du nom est un caractère ordinaire. Le module Python csv, un ensemble de traitements réutilisables, connaît cette règle. import csv rend son nom accessible ; csv.DictReader construit des dictionnaires avec les noms de la première ligne. delimiter=";" indique le séparateur. Une méthode split qui découperait à chaque point-virgule obtiendrait un résultat faux pour ce nom.',
        {
          checkpoint: pause(
            'Combien de champs contient la ligne "Club;Nord";15 ?',
            'Deux : le nom complet et le score',
            'Trois, un par fragment séparé par ;',
            'Les guillemets protègent le point-virgule intérieur. Seul celui situé après les guillemets sépare les deux champs.'
          )
        }
      ),
      s(
        'Passer du fichier ou du texte aux fiches',
        'Un fichier est un contenu conservé sous un nom. with open("scores.csv", encoding="utf-8", newline="") as fichier: ouvre une lecture et ferme l’accès après le bloc. encoding précise comment les octets deviennent des caractères ; newline laisse au lecteur CSV le traitement des fins de ligne. Pour un texte déjà fourni dans une variable, io.StringIO(texte) offre un accès comparable à celui d’un fichier en mémoire ; import io rend cet outil disponible. list(lecteur) rassemble les fiches lues dans une liste.'
      ),
      s(
        'Convertir ne suffit pas à valider',
        'Les champs lus sont des chaînes, y compris "12". int(ligne["score"]) convertit cette écriture en entier. int("") provoque ValueError : la chaîne vide ne décrit aucun entier et ne vaut pas zéro. Une fois converti, un score de 80 reste un entier correct pour Python mais peut être interdit par la règle du tournoi. Il faut donc vérifier ensuite que 0 <= score <= 20, c’est-à-dire entre zéro et vingt inclus, et que le nom n’est pas vide.',
        {
          checkpoint: pause(
            'Après une lecture CSV, le champ "12" est-il déjà un entier ?',
            'Non, c’est une chaîne à convertir',
            'Oui, car son écriture utilise des chiffres',
            'Le format CSV ne donne pas automatiquement un type numérique au champ. Le programme doit appliquer une conversion choisie selon le schéma.'
          )
        }
      ),
      s(
        'Organiser l’importation et le contrôle en Python',
        'Une fonction est un traitement nommé : def importer(texte): reçoit le CSV comme paramètre ; une variable lecteur conserve le lecteur construit. Une boucle for ligne in lecteur: visite les fiches ; [] crée une liste vide et .append(...) y ajoute une fiche. {"nom": ligne["nom"], "score": int(ligne["score"])} construit la nouvelle fiche convertie. Une compréhension peut écrire ce même parcours entre crochets. return renvoie la liste après le parcours. Pour valider toute une table, on renvoie False dès qu’un nom == "" ou qu’un score est hors limites ; == compare, or signifie « au moins une condition », not inverse une condition. return True doit rester après la boucle, lorsque toutes les fiches ont été examinées.',
        {
          code: 'import csv\nimport io\n\nlecteur = csv.DictReader(io.StringIO("nom;score\\nAda;12"), delimiter=";")\nfor ligne in lecteur:\n    print(int(ligne["score"]))'
        }
      )
    ],
    exampleMethods: [
      'Lis d’abord l’en-tête pour connaître les deux noms de champs. Associe ensuite Ada à nom et les caractères 12 à score ; aucune opération numérique n’a encore été demandée.',
      'Repère le début et la fin du champ entre guillemets avant de compter les séparateurs actifs. Le point-virgule intérieur appartient au nom et seul le suivant sépare le score.',
      'Distingue une mesure absente d’un résultat nul. Zéro possède l’écriture "0" ; la chaîne vide ne contient aucun chiffre. La conversion ne peut donc pas inventer un score.'
    ]
  },
  'premiere-selection-tri': {
    duration: 65,
    introduction: intro(
      'Pour publier le classement du club Nord, tu reçois toutes les fiches du tournoi. Il faut choisir les bons adhérents, contrôler leurs données et les ranger par score.',
      'Comment distinguer choisir des lignes, vérifier leur cohérence et changer leur ordre ?',
      'Ces trois opérations différentes donnent un résultat interprétable sans confondre un score textuel, un doublon et une fiche hors du groupe demandé.',
      [
        'Décider quelles fiches garder.',
        'Repérer les identifiants répétés.',
        'Comparer nombres et textes.',
        'Choisir une clé de tri et préserver les fiches.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Fiche et champ',
        'Une fiche associe des noms de champs à des valeurs. Une table est une liste de fiches partageant les mêmes noms de champs.',
        '{"club": "Nord", "score": 12} décrit le club et le score d’une ligne.'
      ),
      recap(
        'Condition composée',
        'and exige que deux conditions soient vraies ensemble ; or suffit si au moins une est vraie. >= inclut la frontière du seuil.',
        'club == "Nord" and score >= 10 garde un score de 10 du club Nord.'
      ),
      recap(
        'Ordre numérique et textuel',
        'Les nombres se comparent par leur grandeur. Les textes sont comparés caractère après caractère, ce qui peut donner un ordre différent.',
        'Le texte "10" précède "2", alors que le nombre 10 est supérieur à 2.'
      )
    ],
    realLifeExamples: [
      life(
        'Le groupe pour une finale',
        'On cherche les membres du club Nord qui ont obtenu au moins dix points.',
        'La sélection conserve une fiche seulement si le club et le score satisfont ensemble la règle.',
        'Sélectionner ne classe pas les finalistes et ne vérifie pas automatiquement leur identité.'
      ),
      life(
        'Deux adhérents du même prénom',
        'Deux fiches portent le prénom Alex, mais chacune possède un numéro d’adhérent différent.',
        'Le contrôle de doublon doit comparer l’identifiant choisi, pas déduire une identité à partir du seul prénom.',
        'Même un identifiant répété demande une interprétation : cela peut être une erreur ou plusieurs résultats autorisés.'
      )
    ],
    sections: [
      s(
        'Appliquer une règle à une fiche à la fois',
        'Sélectionner signifie construire une table avec certaines lignes de la table de départ. Pour Nord et un seuil de 10, on vérifie d’abord le champ club, puis le score. Une fiche Sud,18 échoue malgré son score ; une fiche Nord,8 échoue malgré son club. La règle doit donc utiliser ET, écrit and en Python. Une sélection conserve l’ordre initial si on ajoute simplement les fiches admissibles au fur et à mesure du parcours.'
      ),
      s(
        'Lire les frontières de la condition',
        'ligne["club"] lit le club dans un dictionnaire ; == compare avec le club attendu. ligne["score"] >= seuil accepte aussi le score égal au seuil. Pour demander au moins 10 et strictement moins de 15, on combine score >= 10 and score < 15. < exclut 15. Sur 8, 12, 15, 10, seuls 12 et 10 conviennent. Les cas égaux aux bornes permettent de vérifier la formulation sans ambiguïté.',
        {
          checkpoint: pause(
            'Un score de 15 satisfait-il score >= 10 and score < 15 ?',
            'Non, la borne 15 est exclue',
            'Oui, car il dépasse 10',
            'Les deux conditions doivent être vraies. La première est vraie, mais 15 < 15 est faux.'
          )
        }
      ),
      s(
        'Annoncer la règle de cohérence',
        'Un identifiant est un champ choisi pour distinguer les objets, par exemple le numéro d’adhérent. Un doublon est ici la réapparition d’un même identifiant lorsque cette clé devrait être unique. On conserve les identifiants déjà vus, puis on teste chaque nouvelle fiche. Deux noms identiques ne suffisent pas à conclure. On peut aussi contrôler plusieurs champs ensemble : une date de fin située avant la date de début viole une règle de cohérence, même si chaque date existe.'
      ),
      s(
        'Choisir la valeur qui pilote le tri',
        'Trier change l’ordre des fiches selon une valeur appelée clé de tri. sorted(table, key=cle) produit une nouvelle liste ; cle est une fonction qui reçoit une fiche et renvoie la valeur à comparer. Si le score est encore du texte, int(ligne["score"]) fournit sa valeur numérique. reverse=True inverse l’ordre pour aller du plus grand au plus petit. Un second critère, comme le nom, peut départager des égalités ; sans critère ajouté, le tri Python garde l’ordre d’entrée entre clés égales.',
        {
          checkpoint: pause(
            'Pour trier numériquement les scores "2" et "10", que comparer ?',
            'Les entiers obtenus avec int',
            'Les chaînes telles qu’elles ont été lues',
            'Le texte se compare caractère par caractère. La conversion permet de comparer les grandeurs 2 et 10.'
          )
        }
      ),
      s(
        'Écrire une sélection et une clé sans raccourci mystérieux',
        'Une fonction est un traitement nommé ; def selection(table, club, seuil): reçoit trois paramètres. La compréhension [ligne for ligne in table if condition] parcourt les fiches et garde celles qui vérifient condition. return renvoie la nouvelle liste à l’appelant. Pour un tri, def cle(ligne): return int(ligne["score"]) nomme le calcul de la clé. lambda ligne: int(ligne["score"]) est une écriture courte du même petit calcul, fournie directement à sorted ; elle ne trie rien toute seule. Les dictionnaires des fiches ne sont pas réécrits : la liste résultante réorganise leur ordre.',
        {
          code: 'def score_numerique(ligne):\n    return int(ligne["score"])\n\nclassement = sorted(table, key=score_numerique)'
        }
      )
    ],
    exampleMethods: [
      'Teste séparément chaque moitié de la règle pour chaque fiche. Nord,12 passe les deux contrôles ; Sud,18 échoue au club ; Nord,8 échoue au seuil. Une bonne réponse sur un seul champ ne suffit pas.',
      'Construis la mémoire des clés : après 4 elle vaut [4], puis [4, 8]. À la troisième fiche, 4 y figure déjà : on a découvert une répétition de l’identifiant.',
      'Compare d’abord les premiers caractères : "1" précède "2", donc le tri des textes commence par "10". Après conversion, les grandeurs sont 10 et 2 et l’ordre numérique commence par 2.'
    ]
  },
  'premiere-fusion': {
    duration: 65,
    introduction: intro(
      'Le secrétariat possède les noms des élèves avec leurs numéros ; le professeur possède les scores avec ces mêmes numéros. Les deux fichiers ne sont pas rangés dans le même ordre.',
      'Comment réunir le bon nom et le bon score sans associer simplement les premières lignes entre elles ?',
      'Une fusion sur une clé rassemble des informations provenant de sources différentes tout en rendant visibles les absences et les répétitions.',
      [
        'Définir les clés à comparer.',
        'Construire les paires compatibles.',
        'Prévoir les lignes absentes ou multiples.',
        'Écrire la fusion et repérer les identifiants répétés.'
      ]
    ),
    prerequisiteRecap: [
      recap(
        'Identifiant',
        'Un identifiant sert à distinguer une personne ou un objet. Son sens vient du système qui l’attribue ; il n’est pas une position dans la table.',
        'L’élève de numéro 7 garde son numéro même si sa fiche devient la première ligne.'
      ),
      recap(
        'Dictionnaire',
        'Une fiche peut être un dictionnaire : des noms de champs, appelés clés, permettent de lire les valeurs entre crochets.',
        'eleve["id"] lit le numéro d’une fiche élève ; resultat["eleve"] lit le numéro associé au score.'
      ),
      recap(
        'Égalité et type',
        'Deux données doivent avoir des représentations compatibles pour être comparées comme prévu. Python distingue un entier et une chaîne de chiffres.',
        '7 == "7" vaut False ; convertir un champ demande de vérifier sa signification.'
      )
    ],
    realLifeExamples: [
      life(
        'Un carnet et les notes séparées',
        'Le carnet contient id et nom ; les notes contiennent eleve et score, avec un ordre différent.',
        'Comparer id et eleve reconstitue chaque association correcte indépendamment de la position des lignes.',
        'Deux champs portant des numéros n’identifient la même personne que si leur système d’attribution est commun.'
      ),
      life(
        'Plusieurs emprunts de bibliothèque',
        'Une fiche lecteur est associée à trois fiches de livres empruntés.',
        'Une fusion interne produit une ligne par correspondance, donc trois lignes pour ce lecteur.',
        'La répétition du lecteur dans le résultat ne prouve pas une erreur : elle reflète ici plusieurs emprunts légitimes.'
      )
    ],
    sections: [
      s(
        'Choisir le lien avant de parcourir',
        'Une fusion rassemble des champs provenant de tables différentes. La clé de liaison est la donnée commune qui permet de décider quelles fiches vont ensemble. Ici id dans la table élèves correspond à eleve dans la table résultats ; les noms des champs peuvent différer. Ces valeurs doivent désigner le même élève et utiliser des types compatibles. L’ordre des lignes ne constitue pas un lien fiable : deux tris différents suffisent à le changer.'
      ),
      s(
        'Essayer chaque paire de fiches',
        'Pour un élève, on examine tous les résultats et on garde ceux dont la clé correspond. Puis on passe à l’élève suivant. Une fusion interne crée une fiche seulement pour une paire compatible. Si Ada possède l’id 1 et que les résultats arrivent dans l’ordre 2:15 puis 1:12, la première paire est rejetée et la seconde fournit Ada:12. La fiche finale choisit ses champs, par exemple nom et score, au lieu de recopier aveuglément des champs de même nom.',
        {
          checkpoint: pause(
            'Faut-il associer la première ligne des élèves à la première ligne des résultats ?',
            'Non, il faut comparer leurs clés',
            'Oui, si les tables ont la même longueur',
            'La longueur ne garantit aucune correspondance des personnes. Seules les clés choisies permettent d’identifier les paires compatibles.'
          )
        }
      ),
      s(
        'Prévoir le nombre de lignes résultantes',
        'Si un élève ne possède aucun résultat, il n’apparaît pas dans cette fusion interne. S’il possède deux résultats, il apparaît deux fois, chaque fois avec le score correspondant. Le nombre de lignes obtenues est donc le nombre de paires compatibles et non nécessairement le nombre d’élèves. La cardinalité désigne ce nombre de lignes. Si deux tables ont chacune plusieurs fiches pour une même clé, toutes leurs combinaisons compatibles peuvent multiplier les lignes.'
      ),
      s(
        'Construire le parcours Python avec deux niveaux',
        'Une fonction est un traitement nommé : def fusionner(eleves, resultats): reçoit les deux listes. table = [] crée la liste résultat. for eleve in eleves: est la boucle extérieure ; for resultat in resultats:, décalé dessous, recommence le parcours des résultats pour chaque élève. if eleve["id"] == resultat["eleve"]: compare les valeurs ; == signifie égalité et = affectation. table.append({"nom": eleve["nom"], "score": resultat["score"]}) ajoute une nouvelle fiche pour chaque succès. return table se place après les deux boucles pour renvoyer toute la fusion.',
        {
          checkpoint: pause(
            'Un élève correspond à trois résultats : combien de lignes crée cette fusion interne ?',
            'Trois lignes',
            'Une ligne, puisque l’élève est unique',
            'Chaque paire élève-résultat fournit une fiche. Une seule fiche élève peut participer à trois paires différentes.'
          )
        }
      ),
      s(
        'Contrôler les répétitions sans les multiplier',
        'Pour signaler des identifiants répétés, on peut utiliser deux listes : vus et repetes, initialement vides. La boucle lit chaque identifiant. identifiant in vus vérifie s’il a déjà été rencontré ; identifiant not in repetes évite de le signaler une seconde fois. and exige les deux conditions. On ajoute alors la clé à repetes avec append, puis on ajoute dans tous les cas la clé à vus. return repetes garde l’ordre de découverte des répétitions. Ce contrôle n’interdit pas automatiquement des résultats multiples : c’est le contrat de chaque table qui dit si une répétition est normale.'
      )
    ],
    exampleMethods: [
      'Écris les clés à côté des noms et compare les numéros, pas les positions. Le résultat de clé 2 appartient à Lin, même s’il arrive en premier ; celui de clé 1 appartient à Ada.',
      'Fixe la fiche élève Ada puis parcours les deux scores. La condition est vraie deux fois : deux dictionnaires distincts sont construits, sans écraser le premier par le second.',
      'Lis les types avant la comparaison. id contient le nombre 7 et eleve le texte "7" ; Python ne les rend pas égaux implicitement. Une conversion justifiée doit précéder le rapprochement.'
    ]
  }
};

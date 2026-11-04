# Atelier NSI

Une plateforme pédagogique interactive en français, de la seconde à la terminale : comprendre, prévoir, manipuler, programmer, tester et expliquer.

Les trois sections proposent **82 leçons**, **5 projets de synthèse** et **261 exercices**. Une matrice indépendante relie **154 capacités attendues** des programmes officiels aux leçons : 54 en SNT, 52 en première NSI et 48 en terminale NSI. Les sept thèmes SNT et la programmation transversale, les huit rubriques de première et les six rubriques de terminale sont présents. Les durées sont indicatives ; cette couverture documentaire ne constitue ni une certification de maîtrise ni une validation sur une classe réelle.

L’ancien chapitre « Du problème à la solution » reste disponible comme atelier introductif de six missions : livres et boîtes, robot, sous-tâches et dépendances, traces d’exécution, contre-exemples et Python. Ses anciennes adresses et les deux prolongements sur les contrats et la récursivité restent accessibles.

## Les trois parcours

- **Seconde SNT** : programmation, Internet, Web, réseaux sociaux, données structurées, localisation et cartographie, informatique embarquée et photographie numérique.
- **Première NSI** : histoire, représentations des données, types construits, tables, interactions Web, machines et systèmes, programmation et algorithmique.
- **Terminale NSI** : histoire, structures, bases de données et SQL, architectures et réseaux, langages et programmation, algorithmique.

L’accueil donne accès aux niveaux ; **Les programmes** affiche la correspondance capacité → leçon et la page du programme officiel. Dans chaque niveau, un bouton reprend la dernière leçon. Les sommaires sont légers ; le contenu complet est chargé par chapitre lors de son ouverture.

Les cinq projets sont un reportage numérique responsable en SNT, un tableau de bord CSV et un quiz Web en première, un labyrinthe et une médiathèque SQL en terminale. Leurs étapes, données, exemples, outils, tests et corrigés restent dans le site.

## Les annales guidées

La rubrique **Annales guidées**, dans la navigation et depuis la terminale, propose **22 tutoriels et 66 ateliers supplémentaires**, sur une sélection de sujets officiels de **2021 à 2026**. Elle est accessible à **http://localhost:4173/#/annales** en développement, ou **http://localhost:4174/#/annales** dans l’aperçu du build. Des filtres permettent de choisir le centre, le groupe des Centres étrangers, l’année, le format écrit/pratique et le thème ou la référence. La recherche reconnaît aussi le nom de la session et la zone, avec ou sans accents.

### Centres étrangers

La sélection **Centres étrangers** comporte **12 tutoriels, un par groupe et par année de 2021 à 2026**, soit **36 ateliers**. Accès direct : **http://localhost:4173/#/annales?centre=centres-etrangers** en développement ou **http://localhost:4174/#/annales?centre=centres-etrangers** pour le build. Les deux groupes sont affichés par défaut. Les filtres Centre et Groupe sont conservés dans l’adresse et se combinent avec l’année et la recherche. Ajouter `&groupe=1` ou `&groupe=2` au lien sélectionne un groupe directement. Changer de centre efface le filtre de groupe. Les tutoriels Métropole restent disponibles. La banque pratique est nationale : elle est distincte des centres d’examen de l’écrit et possède sa propre option dans le filtre.

**Groupe 1** :

| Année | Référence      | Extrait guidé                                                                                 |
| ----- | -------------- | --------------------------------------------------------------------------------------------- |
| 2021  | `21-NSIJ1G11`  | Arbres binaires de recherche : insertion, bornes et parcours infixe.                          |
| 2022  | `22-NSIJ1G11`  | Jours, mois, modulo et calcul du lendemain, sans années bissextiles.                          |
| 2023  | `23-NSIJ1G11`  | Catalogue de podcasts : sélection SQL, suppression d’un doublon et correction d’un animateur. |
| 2024  | `24-NSIG11BIS` | **Sujet bis** : solitaire bulgare, état suivant, stabilité et cycles.                         |
| 2025  | `25-NSIJ1G11`  | Radiosondes : horodatages, limites d’altitude et numéros de série uniques.                    |
| 2026  | `26-NSIJ1G11`  | Athlètes : conversion des performances en points et tri par score décroissant.                |

**Groupe 2** :

| Année | Référence     | Zone retenue     | Extrait guidé                                                                   |
| ----- | ------------- | ---------------- | ------------------------------------------------------------------------------- |
| 2021  | `21-NSIJ1AN1` | Amérique du Nord | Panier, offre de bienvenue et soldes.                                           |
| 2022  | `22-NSIJ1AN1` | Amérique du Nord | Palindrome itératif, complémentaire ADN et composition.                         |
| 2023  | `23-NSIJ1LI1` | Liban            | Pension d’animaux : sélection, jointure et insertion SQL.                       |
| 2024  | `24-NSIJ1JA1` | Asie / Japon     | Maisons et antennes : objets, couverture et stratégie gloutonne.                |
| 2025  | `25-NSIJ1JA1` | Asie / Japon     | Traces de boucles, terminaison et limites d’une heuristique textuelle.          |
| 2026  | `26-NSIJ1JA1` | Asie / Japon     | Matériel de danse : dictionnaires imbriqués, volumes et stock après chargement. |

Le groupe 2 comprend plusieurs zones et ne correspond pas au jour 2 d’une épreuve. Le rattachement dépend de la session : le Liban appartient au groupe 2 dans le [tableau officiel de 2023](https://cache.media.education.gouv.fr/file/45/75/0/ensel620_annexe1_1428750.pdf), tandis qu’il figure dans le groupe 1 en 2026. Le Japon reste dans le groupe 2 du [tableau officiel de 2026](https://www.education.gouv.fr/media/230070/download). La fiche indique donc toujours la zone et le code réel du sujet, sans inventer de référence « G2 » commune.

Les fiches indiquent les pages, questions et adaptations effectivement traitées ; la sélection ne couvre pas chaque sujet entier, les deux jours ou toutes les zones de chaque groupe. Le verrou pédagogique de 2025–2026 s’applique aux deux groupes. Les tests d’un exercice récent n’utilisent pas comme données les réponses à trouver dans un autre atelier de la même fiche.

Les autres écrits, de Métropole, abordent la dichotomie (2021), le parenthésage et les piles (2022), SQL et les meubles (2023), les objets et graphes de sites Web (2024), les jointures et agrégations sur les guitares (2025) et le sous-réseau du lycée (2026). Les pratiques portent sur le tri et les votes (sujet 01 de 2023), les arbres et le tri par sélection (sujet 01 de 2024), les voisins entrants et les groupes de chiffres (sujet 01 de 2025) et le codage RLE (sujet 1 de 2026).

Chaque fiche précise le code du sujet, la session, les questions et pages retenues, les adaptations et le lien direct vers le document du ministère. Les énoncés sont reformulés ; les résolutions sont des propositions pédagogiques d’Atelier NSI, pas des corrigés officiels. La sélection d’extraits ne couvre pas l’intégralité de chaque sujet ni toutes les annales disponibles. Les sujets ne sont pas attribués à la licence des ressources libres de Gilles Lassus.

Le tutoriel présente les données et rappels, puis trois ateliers avec conseils, indices, réponses ou code à tester, résolution expliquée et erreur fréquente. **Pour 2021 à 2024**, les corrections sont consultables pendant le travail et leur consultation marque l’aide apportée. **Pour 2025 et 2026**, toutes les corrections de la fiche restent masquées jusqu’à la réussite des trois ateliers dans l’application : deux pistes restent proposées, mais ni troisième indice résolu, ni modèle, ni explication donnant la réponse. Les tableaux de tests montrent les résultats du programme de l’élève et les réussites/échecs, en masquant la colonne des résultats attendus jusqu’au déblocage. Une tentative, une autoévaluation ou la lecture du sujet ne débloque rien. Les réussites sont reconnues par les vérifications de réponses et les tests Python/SQL existants.

Les réponses, programmes, indices, réussites et notes sont sauvegardés avec la terminale, sous des identifiants `annale-…`, et inclus dans l’export/import JSON habituel. Le déblocage acquis reste disponible après rechargement ou import d’une sauvegarde. Après trois réussites, l’élève peut cocher trois critères de relecture ; les règles habituelles de XP s’appliquent. Ces tutoriels restent distincts du décompte des 82 leçons du programme.

Les réponses courtes vérifient des résultats ciblés ; la rédaction libre n’est pas notée. Les tests de sortie ne prouvent pas que le code utilise effectivement une méthode imposée : une relecture du raisonnement reste nécessaire. Le verrou est **pédagogique et local** : une modification volontaire des sources ou de la sauvegarde peut le contourner. Les corrigés ne constituent pas un secret protégé par un serveur. Les liens officiels nécessitent Internet et peuvent évoluer. Le RLE s’exerce sur des listes de pixels : la manipulation des fichiers PNG avec Pillow n’est pas incluse.

Pour vérifier cette rubrique :

```sh
npm test -- tests/unit/annales.test.js
npm run test:e2e -- annales.spec.js
npm run test:solutions
```

La dernière commande vérifie aussi toutes les solutions Python et SQL des annales avec le vrai Pyodide, en complément des cours et projets. La publication reste celle du site complet : compiler, puis transférer `dist/` et ses fichiers Python vers l’hébergement statique.

## Ouvrir le site

Sur cet ordinateur Windows, double-cliquer sur **lancer.cmd**. Il utilise la version récente de Node fournie par Codex lorsqu’elle est disponible, sans changer l’installation système. Puis ouvrir **http://localhost:4173/**. Si un serveur est déjà ouvert sur ce port, utiliser cette adresse directement. Garder son terminal ouvert pendant l’utilisation ; Ctrl+C l’arrête.

Depuis PowerShell, le même lancement se fait avec :

```powershell
Set-Location -LiteralPath 'D:\Data Perso\Asa\learn-nsi'
.\lancer.cmd
```

Pour une installation classique : **Node.js 24 LTS** recommandé (minimum 22.18), npm récent, puis :

```sh
npm install
npm run dev
```

La version Node 14 initialement installée sur cette machine est trop ancienne. Avec un nouveau Node installé, rouvrir le terminal avant de lancer npm.

Le serveur de développement écoute aussi sur le réseau local. Pour essayer sur un téléphone connecté au même réseau, utiliser l’adresse « Network » affichée par Vite, avec le port 4173. L’accès dépend des règles réseau et du pare-feu de l’ordinateur.

## Vérifier et compiler

Exécuter les commandes depuis la racine du projet, là où se trouve `package.json`.

| Commande                 | Rôle                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `node --version`         | Vérifier la version de Node.js utilisée dans le terminal.                                                                                                                      |
| `npm --version`          | Vérifier que npm est disponible.                                                                                                                                               |
| `npm install`            | Installer les dépendances ; préparer automatiquement les fichiers Python locaux.                                                                                               |
| `npm ci`                 | Réinstaller exactement les versions du fichier `package-lock.json`, par exemple sur une autre machine ou en intégration continue. Remplace le dossier `node_modules` existant. |
| `npm run dev`            | Démarrer le serveur de développement sur **http://localhost:4173/** avec rechargement après modification des sources.                                                          |
| `npm test`               | Exécuter les tests unitaires des exercices, de la progression et des sauvegardes.                                                                                              |
| `npm run test:e2e`       | Vérifier le parcours dans Chrome, y compris Python, les sauvegardes et l’affichage mobile.                                                                                     |
| `npm run test:solutions` | Exécuter toutes les corrections Python et SQL des cours et projets dans le vrai Pyodide local. Préparer le runtime avec `npm install` ou `npm run build` auparavant.           |
| `npm run content:index`  | Régénérer les sommaires après ajout ou modification d’une leçon. Le build le fait automatiquement.                                                                             |
| `npm run format:check`   | Vérifier la mise en forme des fichiers sans les modifier.                                                                                                                      |
| `npm run format`         | Appliquer la mise en forme avec Prettier ; cette commande modifie les fichiers concernés.                                                                                      |
| `npm run build`          | Préparer Python et produire la version publiable dans `dist/`.                                                                                                                 |
| `npm run preview`        | Servir le dernier build sur **http://localhost:4174/** pour le vérifier localement. Ne recompile pas les sources.                                                              |

Pour vérifier une modification puis regarder son résultat compilé :

```sh
npm test
npm run test:e2e
npm run test:solutions
npm run format:check
npm run build
npm run preview
```

Arrêter le serveur avec **Ctrl+C** dans son terminal. Après une modification des sources, relancer `npm run build` avant de consulter le résultat avec `npm run preview`.

### Résoudre les problèmes de lancement

- **Version de Node trop ancienne** : vérifier `node --version`. Utiliser le lanceur Windows fourni sur cet ordinateur, ou installer une version compatible puis rouvrir le terminal.
- **Dépendances absentes** : exécuter `npm install` depuis la racine du projet.
- **Port 4173 déjà utilisé** : consulter le site déjà ouvert sur ce port s’il s’agit d’Atelier NSI, ou arrêter son serveur dans le terminal qui l’a lancé avant de recommencer.
- **Pas de dossier `dist/`** : exécuter `npm run build` avant `npm run preview`.
- **Python ne se charge pas** : vérifier la connexion et relancer l’exercice. Si les fichiers `public/python/` manquent, exécuter `npm install` ou `npm run build` pour les recréer.

Les tests navigateur utilisent Google Chrome installé et un serveur dédié sur http://localhost:4180. Ce port distinct évite de tester par erreur un ancien build ouvert sur le port 4173. Ils couvrent le parcours complet, la reprise, les variantes accompagnées, le transfert JSON, les prolongements, l’exécution réelle de Python, les erreurs, l’arrêt, le délai maximal et le format 360 px. Playwright peut lancer le serveur de test automatiquement si aucun n’est déjà ouvert. Les résultats temporaires des tests sont écrits dans le dossier temporaire du système.

Pour vérifier seulement les trois améliorations pédagogiques :

```sh
npm test -- tests/unit/interactive-learning.test.js
npm run test:e2e -- interactive-learning.spec.js
```

Le script de préparation, exécuté par `postinstall` et avant chaque build, copie le runtime **Pyodide 0.29.3** depuis le paquet npm vers `public/python/`. Il télécharge aussi la roue SQLite correspondant au verrou Pyodide, vérifie son empreinte SHA256 et la conserve localement. Une connexion est nécessaire lors de la première préparation de cette roue ; les préparations suivantes réutilisent le fichier vérifié.

La distribution sert ses propres fichiers Python et SQLite, sans appel à un CDN pendant les exercices. Python est chargé à la demande, SQLite au premier exercice SQL. Un seul moteur Python reste actif à la fois pour limiter la mémoire. Les programmes reçoivent des paramètres et renvoient leurs résultats sans `input()`. Nombres, booléens, chaînes, listes, tuples et dictionnaires sont comparés structurellement ; un booléen n’est pas confondu avec un entier. Les tuples renvoyés sont représentés comme des listes JSON. Les modules et fichiers de données fournis sont recréés dans un répertoire virtuel pour chaque essai.

SQL est réellement exécuté avec SQLite en mémoire. Chaque essai repart de ses données initiales, avec contraintes de clés étrangères actives. Pour les requêtes de modification, une requête de contrôle vérifie le contenu final. Les lignes sont comparées sans imposer un ordre, sauf si l’exercice le demande explicitement. Arrêt manuel, limite de cinq secondes et limitation des sorties restent actifs.

Pour publier, transférer tout le contenu de **dist/**, y compris **python/**, vers un hébergement statique HTTPS qui sert les fichiers `.wasm` avec le type `application/wasm`. Le routage hash et les chemins relatifs permettent l’hébergement dans un sous-dossier. Ne pas ouvrir `index.html` directement en `file://` : les modules et workers nécessitent un serveur HTTP. La publication n’est pas effectuée automatiquement.

## Fonctionnement pédagogique

- Les cours partent de zéro : une situation familière pose la question avant le vocabulaire ou les formules. L’introduction explique l’utilité de la notion et annonce le chemin de compréhension. Les notions préalables sont réexpliquées sur place, avec de petits exemples, sans imposer de consulter un autre cours.
- Les raisonnements sont déroulés étape par étape. Des tableaux rendent visibles les calculs ou les états successifs ; des pauses de compréhension proposent une réponse et un retour expliqué, que l’élève peut revoir. Deux exemples de vie quotidienne accompagnent les exemples scolaires, avec leur lien précis à la notion et la limite de chaque comparaison.
- La leçon « Bases, octets et hexadécimal » repart de 13 billes et des centaines/dizaines/unités. Elle construit ensuite le binaire avec quatre interrupteurs, explique l’octet puis l’hexadécimal, et seulement ensuite les puissances, les limites de stockage et la syntaxe Python nécessaire. Le petit laboratoire intégré ne présente pas les nombres négatifs avant la leçon qui les introduit.
- Chaque leçon contient des objectifs et prérequis, des explications en petites étapes, trois exemples variés, une manipulation et trois exercices guidé/application/transfert, puis une reformulation et trois critères d’autoévaluation.
- Les niveaux et leçons restent accessibles librement. **À l’intérieur d’une leçon**, une première reformulation ouvre la manipulation ; une prévision, une action et une observation expliquée ouvrent les exercices. Répondre à un exercice ouvre le suivant ; après trois essais, le bilan devient accessible. Une mauvaise réponse permet donc de poursuivre l’entraînement, mais ne valide pas la leçon.
- Une leçon est terminée après trois exercices réussis et trois critères de relecture cochés. Les réponses libres sont autoévaluées : le site vérifie qu’elles sont renseignées, sans prétendre noter leur justesse.
- L’atelier introductif suit Découvrir, Manipuler, Expliquer et Bilan. Il demande une reformulation avant de manipuler, les activités réussies avant d’expliquer, et une explication écrite ou déclarée à voix haute avant le bilan.
- Les termes techniques soulignés en pointillés ouvrent une définition courte au survol, au focus clavier ou au toucher. Échap ou la perte du focus ferme la définition. Les acronymes sont reconnus comme des mots entiers ; les termes à l’intérieur des URL et du code ne sont pas réécrits.
- Les réponses aux pauses et les états des petits laboratoires de lecture sont sauvegardés. Ils ne rapportent pas de points supplémentaires et ne modifient pas les réussites des exercices. Les XP restent calculés sur les réussites uniques. Les étoiles et flèches de navigation utilisent des icônes vectorielles centrées dans leurs pastilles.
- Les indices utilisent un fond ivoire doré, une bordure or, un texte sombre et une indication du niveau d’aide. Deux premières pistes guident ; le troisième indice ou le corrigé distingue une réussite accompagnée. Lire une correction ne valide pas un exercice.
- Les exercices jugent des résultats et des contraintes, pas la ressemblance avec une réponse modèle. Plusieurs chemins et ordres sont acceptés quand ils respectent les dépendances.
- Trois aides : question de guidage, indice concret, exemple résolu. La consultation du troisième niveau classe la variante comme accompagnée. Une nouvelle variante peut être réussie sans corrigé.
- Une mission est terminée lorsque tous ses exercices sont réussis et que les quatre critères de relecture sont cochés. Les réponses libres ne sont pas notées automatiquement ; elles peuvent aussi être formulées à voix haute.
- Les badges Décomposer, Prévoir et Tester signalent un entraînement réussi. Expliquer repose sur une autoévaluation, clairement indiquée. Ils ne constituent pas une certification de maîtrise.
- Les simulations préparées proposent lecture, pause et pas-à-pas. Le code Python libre est exécuté et testé ; il ne dispose pas d’un débogueur générique pas-à-pas.

### XP, niveaux, badges et défis

L’aventure affiche les XP et le rang sur l’accueil et dans les leçons ; le bilan des compétences présente les six badges supplémentaires et le prochain défi. Une réussite sans corrigé vaut **30 XP**, une réussite accompagnée **15 XP**, une leçon ou mission terminée ajoute **40 XP** et un projet terminé **80 XP**. Les deux premières aides ne diminuent pas les points.

Les points sont dérivés des réussites enregistrées : rejouer ou relancer les tests ne multiplie pas les récompenses. Aucun classement, compte, pénalité d’erreur ou série quotidienne obligatoire. Les sauvegardes transportent les réussites ; XP et badges sont recalculés après import. Ils représentent un entraînement et une autoévaluation, pas une certification.

### Ressources libres

Les rubriques thématiques de première et terminale comportent chacune au moins deux exercices adaptés de ressources de Gilles Lassus, soit **25 adaptations**. Chaque exercice indique son auteur, le fichier GitHub à un SHA précis, la licence annoncée et les modifications. Les dépôts [première](https://github.com/glassus/premiere_nsi) et [terminale](https://github.com/glassus/terminale_nsi) annoncent CC-BY-SA sans numéro de version : le site conserve cette précision et n’invente pas une version. Les contenus tiers, notamment les sujets de bac hébergés dans les dépôts, ne sont pas automatiquement couverts par cette attribution.

Les exercices originaux sont identifiés. Les énoncés et les données sont intégrés localement ; les liens sources servent à retrouver l’origine. Les adaptations conservent les conditions de partage annoncées ; celles-ci ne doivent pas être confondues avec une licence générale du code de l’application.

## Manipuler les livres et suivre le code

### Mission 1 : un rangement que l’élève construit

L’atelier commence avec les livres sur la table et une seule boîte vide. Sélectionner un livre, puis **Placer ici** dans la boîte choisie. Après chaque placement, le prochain livre disponible est sélectionné. Chaque livre garde son numéro pour pouvoir suivre son déplacement.

- **Ajouter une boîte** prépare une nouvelle boîte vide, sans calculer la solution à la place de l’élève.
- Cliquer sur un livre rangé le remet sur la table ; on peut alors le placer ailleurs.
- **Retirer la boîte vide** permet de comparer un rangement avec plus ou moins de boîtes. Une boîte contenant encore des livres ne peut pas être retirée.
- Une boîte pleine refuse un livre supplémentaire et explique pourquoi. Aucun livre n’est dupliqué ou perdu.
- **Tout remettre sur la table** demande confirmation et recommence seulement le rangement de cette variante ; la réponse et les réussites restent conservées.

Les commandes fonctionnent au clic, au toucher et avec Tab/Entrée/Espace. Le rangement est sauvegardé automatiquement par variante. Il reste facultatif : l’élève peut aussi prévoir la réponse de tête et la vérifier directement.

### Mission 4 : deux façons de comprendre l’exécution

**Faire mes prédictions** conserve l’exercice par tour : prévoir les livres restants et le nombre de boîtes, vérifier, puis avancer.

**Observer le code** affiche en même temps :

- les sept lignes du corps d’une fonction Python, avec la ligne qui vient d’être exécutée surlignée ;
- les valeurs de `restants`, `boites` et `ranges`, avec une mise en évidence de celles qui changent ;
- les livres encore sur la table et ceux qui sont rangés dans les boîtes ;
- une explication de l’étape et le résultat vrai/faux de la condition de boucle.

Les commandes **Précédent**, **Suivant**, **Lire/Pause** et **Revenir au début du code** permettent d’avancer à son rythme. Le curseur est conservé après rechargement ; rouvrir la vue « Observer le code » pour le retrouver. Le symbole `—` indique qu’une variable n’a pas encore été initialisée. La variable intermédiaire `ranges` rend le calcul du minimum visible avant de retirer les livres.

Cette vue est une trace préparée de l’algorithme du chapitre. Elle ne débogue pas le code libre de la mission Python. Observer toute la simulation ne valide pas automatiquement les prédictions : revenir à l’autre vue pour les effectuer.

### Des retours adaptés à la réponse

Les messages distinguent une donnée manquante, un détail inutile, un nombre invalide, un manque de places et des boîtes en trop. Exemple : pour 13 livres et des boîtes de 6, proposer 2 boîtes fait apparaître les 12 places et le livre sans place. Les prédictions distinguent une erreur sur les livres restants d’un oubli du compteur, notamment pour la dernière boîte incomplète. La mission de tests réutilise ces explications lorsque le résultat attendu est incorrect.

## Progression et données

Un seul espace élève par navigateur, sans compte, serveur applicatif, analytics ni IA. Réponses, explications, code, aides, essais, réussites et états des manipulations restent dans `localStorage`. Les progrès des cours et projets sont séparés de ceux de l’atelier introductif. En cas de stockage indisponible ou plein, le site continue en mémoire et propose l’export.

L’export JSON UTF-8 au **format 2** contient `formatVersion`, `contentVersion`, `exportedAt` et `progress`. Les sauvegardes historiques au format 1 (`2026-10-chapitre-1`) sont migrées en conservant missions, réponses et prolongements. La clé navigateur historique est conservée. L’import, limité à 5 Mo, valide le fichier, affiche un résumé et demande confirmation avant remplacement ; il ne fusionne pas les parcours. Un fichier invalide ne remplace pas le travail courant. La réinitialisation efface aussi les cours, projets et récompenses. Sur un appareil partagé, exporter avant de réinitialiser ou de fermer le navigateur.

Le rangement manuel et le curseur de la trace sont inclus dans la sauvegarde. Ces champs sont facultatifs : les fichiers créés avant ces améliorations restent compatibles. Les affectations impossibles, les boîtes surchargées et les curseurs de forme incorrecte sont refusés lors de l’import.

Les essais restent illimités. Le carnet des exercices de tests conserve les 100 derniers essais par variante pour garder les sauvegardes légères et réimportables.

Le site suppose un navigateur récent compatible WebAssembly et une connexion pour charger les fichiers. Aucun mode hors ligne ni synchronisation entre appareils n’est garanti. Le fonctionnement sur téléphone est vérifié en émulation Chrome ; le clavier virtuel et les performances d’un téléphone réel restent à essayer sur les appareils des élèves.

## Organisation

```text
src/content/       Missions, variantes, indices, corrigés et sources
src/content/courses/ Parcours par niveau et chapitre, capacités officielles et projets
src/content/annales/ Catalogue des sujets, tutoriels, indices et résolutions
src/content/glossary.js Définitions contextuelles des termes informatiques
src/domain/        Validation des exercices et des sauvegardes
src/domain/annales.js Déblocage des corrigés et filtrage des annales
src/composables/   État Vue et persistance
src/components/    Illustrations, activités, éditeur et éléments partagés
src/components/courses/ Cadre des leçons, laboratoires, définitions, aides et récompenses
src/python/        Worker Pyodide et gestion des exécutions
src/views/         Parcours, missions, bilan, sauvegarde, sources, défis
tests/unit/        Contrats des validateurs et de la progression
tests/e2e/         Scénarios navigateur
```

Pour modifier l’atelier introductif, commencer par `src/content/missions.js`. Pour les nouveaux parcours, lire [le contrat de contenu](docs/course-authoring.md), puis modifier le chapitre du niveau concerné. Chaque `coverage.js` recense indépendamment les capacités officielles ; les tests détectent une capacité sans leçon, des références inconnues, une rubrique vide ou un nombre insuffisant d’exemples, d’exercices et d’adaptations. Exécuter `npm run content:index` après une modification du sommaire, puis les tests et le build.

## Limites des laboratoires

Les réseaux, le terminal Linux, les objets connectés, le processeur et la cryptographie sont des modèles pédagogiques explicités, pas des équipements réels. La pratique Linux sur un système libre, les capteurs physiques, certaines manipulations de logiciels et le travail collectif nécessitent une mise en situation complémentaire ; les leçons distinguent cette pratique de l’entraînement dans le site.

L’aperçu Web exécute HTML, CSS et JavaScript dans une iframe isolée sans accès au document parent. Les images et scripts externes, `fetch` et formulaires sont bloqués par la politique de contenu. Cela n’interdit pas toute navigation de l’iframe elle-même : l’aperçu n’est pas un environnement réseau totalement fermé. Les exemples fournis utilisent des ressources locales et les échanges client-serveur du cours sont simulés.

La couverture des programmes a été reliée aux capacités des textes officiels en vigueur, vérifiés le **1er novembre 2026**. Les chiffres et usages qui évoluent sont datés et sourcés dans les leçons. Une validation en classe, sur appareils réels et avec un enseignant reste nécessaire pour évaluer la qualité des apprentissages.

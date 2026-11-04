# Annales guidées — conception et réalisation

La sélection approfondie demandée couvre les sujets écrits et pratiques du bac NSI, de 2021 à 2026. Les références sont les documents publics du ministère ; les corrigés sont des propositions pédagogiques rédigées pour Atelier NSI, sans les présenter comme des corrigés officiels.

## Parcours retenu

Une rubrique indépendante `/annales`, accessible depuis la navigation et la terminale, filtre les tutoriels par année, format et thème. Chaque fiche indique le code du sujet, les pages et questions effectivement travaillées, les adaptations et un lien vers l'original. Une fiche peut porter sur un extrait : elle ne doit jamais annoncer la correction du sujet entier dans ce cas.

Chaque tutoriel comporte trois ateliers : comprendre les données, construire une solution, puis vérifier un cas délicat. Chaque atelier propose des conseils, un essai corrigé automatiquement et une résolution détaillée avec justification et erreurs fréquentes. Python et SQLite utilisent les outils existants. Les choix de réponses courtes restent explicitement des vérifications ciblées, sans prétendre noter une rédaction de bac.

Les résolutions de 2021 à 2024 sont consultables pendant le travail. Pour 2025 et 2026, les trois ateliers doivent être réussis dans l'application avant d'afficher les corrections. Ni un essai, ni les indices, ni une autoévaluation ne débloquent le corrigé. Deux pistes sans solution restent disponibles. Les explications révélant la réponse, le troisième indice et les modèles de code restent masqués avant la réussite complète.

La sélection comporte désormais vingt-deux tutoriels (dix-huit écrits et quatre pratiques) et soixante-six ateliers. Douze écrits couvrent les Centres étrangers : un sujet sélectionné par année et par groupe de 2021 à 2026, dont le sujet bis de 2024 pour le groupe 1. Le groupe 2 est représenté par l’Amérique du Nord (2021–2022), le Liban (2023, selon le rattachement officiel de cette session) et l’Asie/Japon (2024–2026). Les pratiques de 2025 et 2026 sont incluses. Les sorties attendues des tests restent également absentes du tableau avant déblocage ; l’élève conserve ses propres sorties et le statut des tests.

Le catalogue distingue Centres étrangers, Métropole et banque pratique nationale. Le filtre de centre est représenté dans la query `centre` et fonctionne aussi à l’ouverture directe d’un lien. Pour les Centres étrangers, la query `groupe=1` ou `groupe=2` filtre le champ numérique `group` des métadonnées ; son absence sélectionne les deux groupes. Un changement de centre efface le groupe. La recherche inclut le libellé de session et sa zone. Les contenus des Centres étrangers se chargent dans un module par groupe ; leurs identifiants propres préservent les réussites déjà enregistrées sur les tutoriels Métropole et groupe 1.

Les groupes ne sont pas les jours d’épreuve. Les codes régionaux AN et JA sont conservés pour le groupe 2 ; la zone et l’année servent à vérifier le rattachement dans les tableaux officiels. Voir les liens et la sélection dans le README. Les adaptations des exercices sont explicites : objets convertis par adaptateurs, retour d’une liste à la place d’un tuple, encapsulation d’un script et contrôle de la mutation du stock. La terminaison de 2025 se raisonne sans exécuter les boucles infinies. Le remplissage de 2026 illustre une stratégie gloutonne faisable sans la présenter comme toujours optimale.

L'état utilise les entrées de leçons de terminale avec des identifiants `annale-…`, ce qui préserve sauvegarde, export/import et réussites accompagnées. Les annales restent distinctes du décompte des 82 leçons du programme. Le verrou est pédagogique dans une application locale : il ne protège pas contre une modification volontaire des fichiers ou de la sauvegarde.

## Approches

- Ajouter les annales comme chapitres du programme brouillerait la couverture et le décompte des cours.
- Un catalogue de PDF n'apporterait pas le guidage ni l'exécution demandés.
- Une rubrique dédiée réutilisant exercices et sauvegarde permet le parcours demandé sans dupliquer le moteur Python. C'est le choix de réalisation.

## Étapes et vérification

1. Vérifier les sources, références et extraits des sujets sélectionnés.
2. Tester le verrou : années anciennes, réussite partielle, essai incorrect, trois réussites et import de sauvegarde.
3. Rédiger les fiches, indices et résolutions ; exécuter les solutions Python/SQL dans Pyodide.
4. Ajouter catalogue et vue du tutoriel, adapter les composants d'aide sans changer les cours existants.
5. Vérifier au navigateur filtres, navigation directe, erreur d'identifiant, absence de fuite de corrigé, déblocage réel et persistance, sur ordinateur et mobile.
6. Mettre à jour le README français ; lancer tests unitaires, tests ciblés navigateur, vérification des solutions, formatage et compilation.

Points de relecture : un corrigé récent ne doit pas apparaître dans le DOM masqué ; le troisième indice et le message de réussite ne doivent pas le révéler ; une réussite importée doit conserver le déblocage ; chaque préparation SQL repart des mêmes données ; les fonctions qui modifient une liste sont vérifiées par un adaptateur explicitement annoncé.

# Contrat des parcours

Les contenus sont des modules JavaScript, sans HTML injecté dans les explications.
`duration` est un nombre de minutes. Après une modification des titres, objectifs,
durées ou exercices, lancer `npm run content:index` pour actualiser les sommaires.
Chaque niveau possède `src/content/courses/<niveau>/index.js`, qui exporte `chapters` :
`[{ id, title, description, load: () => import('./<chapitre>.js') }]`.
Chaque chapitre exporte par défaut `{ id, title, lessons: [...] }`.

Une leçon contient `id`, `title`, `duration`, `prerequisites` (textes), `objectives`
(textes), `official` (`[{id, label, page}]`, identifiants stables propres au niveau),
`sections` (`[{title,text,code?}]`), trois `examples`
(`[{title,input,reasoning,result}]`), `activity`, trois `exercises`, `reflection` et
`review` (trois affirmations d’autoévaluation). Les capacités officielles sont
également recensées indépendamment dans `coverage.js` par niveau : export
`capabilities = [{id,label,page,chapter}]`. Elles reprennent toutes les capacités
attendues des tableaux du programme. Une capacité peut être travaillée dans plusieurs
leçons. La rubrique historique peut être contextualisée, mais possède une leçon.

Activités disponibles : `{type,prompt,prediction,explanation,config}`.

- `bits`: `{value:13,bits:8,signed:false}` ; `logic`: `{gate:'AND'}`.
- `network`, `graph`, `map`: `{nodes:[{id:'A',label:'A',x:30,y:30}],edges:[['A','B',1]],start:'A',goal:'B'}`.
- `table`: `{columns:['nom','score'],rows:[['Ada',12],['Lin',15]]}`.
- `sensor`: `{initial:18,threshold:20}` ; `pixels`: `{color:[120,80,40]}`.
- `sort`: `{values:[5,2,4,1],algorithm:'insertion'}` (selection ou merge possibles).
- `search`: `{values:[1,3,5,7,9],target:7}`.
- `knn`: `{points:[{x:1,y:2,label:'A'}],target:{x:3,y:3},k:3}`.
- `stack`: `{values:['A','B'],mode:'stack'}` (ou queue).
- `tree`: `{tree:{value:8,left:{value:3},right:{value:10}}}`.
- `recursion`: `{n:4,mode:'factorial'}` (ou sum).
- `process`: `{}` ; `crypto`: `{message:'BONJOUR',shift:3}`.
- `dynamic`: `{coins:[1,3,4],amount:6}` ; `text-search`: `{text:'ABRACADABRA',pattern:'ABRA'}`.
- `shell`: `{}` ; `cpu`: `{}`.
- `trace`: `{code:'...',frames:[{line:1,variables:{x:1},explanation:'...'}]}`.
- `web`: `{html:'<!doctype html>...'}`.

Exercices : champs communs `id,title,kind,prompt,hints` (trois aides spécifiques),
`solution` (réponse ou programme complet), `explanation` (raisonnement détaillé),
`feedbackWrong` (cause fréquente et prochaine action), `source?`.

- `answer` : `answer` (chaîne canonique), `accepted?` (autres chaînes),
  `choices?` (`[{label,value}]`). Préférer des résultats calculables précis ; éviter
  de noter automatiquement une explication libre par mots-clefs.
- `python` : `functionName`, `starter`, `tests:[{args,expected,expectedError?}]`,
  `files?` (objet nom → texte de modules auxiliaires), `solutionFiles?`,
  `dataFiles?` (données de lecture .txt, .csv ou .json préparées à chaque essai).
- `sql` : `setup` (script SQL), `starter`, `expected` (tableau de lignes),
  `verifyQuery?` (pour contrôler INSERT/UPDATE/DELETE), `ordered?` (false par défaut).
- `web` : `starter` et `solution` HTML complets, `checks:[{selector,text?,attribute?,value?}]`.
  Chaque contrôle peut contenir `actions:[{selector,value?,click?}]` pour essayer les
  événements avant de vérifier l’état du document. Tester les réactions effectives,
  pas la présence d’un mot dans le code source.

Les étapes se débloquent avec les réponses : reformulation de l’objectif, prévision
et observation d’une manipulation, puis trois exercices essayés. La réussite reste
distincte d’un essai : trois réussites et trois critères de relecture valident la
leçon. Les XP sont dérivés de ces réussites, jamais d’un compteur incrémenté à chaque clic.
Les termes des explications sont reliés au glossaire sans injecter de HTML arbitraire.

Chaque rubrique thématique NSI hors histoire comporte au moins deux adaptations
effectives de documents GitHub libres, après lecture. Chaque source possède
`{title,author,url,revision,license,licenseUrl,changes}` avec un permalien fichier
contenant le SHA complet. Les exercices originaux n’ont pas de source et sont
présentés comme tels. Ne pas inventer une provenance ou copier un sujet de bac tiers
en lui attribuant la licence du dépôt hôte.

## Livraison

Les tests de chaque niveau vérifient la couverture à partir du recensement officiel,
les trois exemples et exercices, les aides et les liens de provenance. Les solutions
exécutables sont ensuite toutes éprouvées dans le moteur réel par les tests communs.
Le texte des leçons doit être autonome et particulier à la notion : pas de gabarit
répété qui se contente de changer le titre. Les simulations restent des modèles
pédagogiques, avec leurs limites précisées dans leur explication.

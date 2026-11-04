// Ces helpers mettent en forme des textes écrits pour chaque notion ; ils ne
// fabriquent aucune explication à partir d'un titre ou d'un identifiant.
export function pause(question, correct, distractor, explanation) {
  return {
    question,
    choices: [
      { label: correct, value: 'a' },
      { label: distractor, value: 'b' }
    ],
    answer: 'a',
    explanation
  };
}

const pythonRecap = [
  [
    'Lire une fonction Python',
    'def commence la définition d’une fonction ; les noms entre parenthèses sont ses paramètres. Les deux-points et l’indentation délimitent son corps. return renvoie le résultat à l’appelant, qui peut le conserver dans une variable avec =.',
    'def double(x): suivi d’une ligne indentée return 2 * x calcule double(3) = 6. Les parenthèses de l’appel fournissent ici 3.'
  ],
  [
    'Choisir et répéter',
    'if exécute un bloc si son test est vrai ; elif essaie un autre test et else traite le cas restant. for x in valeurs prend les éléments dans l’ordre. while répète tant qu’un test reste vrai. True et False signifient vrai et faux ; None marque une absence.',
    'for x in [2,4] fait deux passages, avec x égal à 2 puis à 4. range(3) fournit 0, 1 et 2 ; un bloc indenté précise ce qui est répété.'
  ],
  [
    'Opérateurs et collections',
    '= affecte ; == compare ; != signifie différent ; < et > sont stricts, <= et >= incluent l’égalité. and exige deux tests vrais, or au moins un, not inverse un test. [] contient une liste, {} un dictionnaire vide, len donne la longueur, enumerate fournit indice et valeur.',
    'a[0] lit la première case ; a.append(5) ajoute 5 à droite ; a.pop() retire à droite. Les apostrophes ou guillemets délimitent un texte. Les indices commencent à zéro.'
  ]
];

export function pedagogy({
  intro,
  journey,
  recap,
  life,
  sections,
  reasoning,
  program,
  duration = 60
}) {
  const reading = program ? [...recap, ...pythonRecap] : recap;
  const steps = program ? [...sections, [program[0], program[1], undefined, program[2]]] : sections;
  return {
    introduction: { situation: intro[0], question: intro[1], why: intro[2], journey },
    prerequisiteRecap: reading.map(([term, explanation, example]) => ({
      term,
      explanation,
      example
    })),
    realLifeExamples: life.map(([title, situation, connection, difference]) => ({
      title,
      situation,
      connection,
      difference
    })),
    sections: steps.map(([title, text, checkpoint, code]) => ({
      title,
      text,
      ...(checkpoint ? { checkpoint } : {}),
      ...(code ? { code } : {})
    })),
    reasoning,
    duration
  };
}

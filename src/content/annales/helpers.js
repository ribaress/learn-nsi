// Les énoncés sont reformulés et les explications rédigées pour l'atelier.
// Les deux premières aides guident sans donner de réponse ; la troisième est un modèle.
export function answer(title, prompt, value, hints, resolution, extras = {}) {
  return {
    title,
    prompt,
    kind: 'answer',
    answer: String(value),
    solution: String(value),
    hints: [...hints, resolution.at(-1)],
    explanation: resolution.join(' '),
    resolution,
    feedbackWrong:
      'Ce résultat ne convient pas encore. Reprends la représentation des données et vérifie chaque étape.',
    ...extras
  };
}
export function python(
  title,
  prompt,
  functionName,
  starter,
  solution,
  cases,
  hints,
  resolution,
  extras = {}
) {
  return {
    title,
    prompt,
    kind: 'python',
    functionName,
    starter,
    solution,
    tests: cases.map(([args, expected]) => ({ args, expected })),
    hints: [...hints, resolution.at(-1)],
    explanation: resolution.join(' '),
    resolution,
    ...extras
  };
}
export function sql(title, prompt, setup, solution, expected, hints, resolution, extras = {}) {
  return {
    title,
    prompt,
    kind: 'sql',
    setup,
    starter: '-- Écris ta requête ici\n',
    solution,
    expected,
    hints: [...hints, resolution.at(-1)],
    explanation: resolution.join(' '),
    resolution,
    ...extras
  };
}

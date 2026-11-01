import { capabilities } from './coverage.js';

export const section = (title, text, code) => ({ title, text, ...(code ? { code } : {}) });
export const example = (title, input, reasoning, result) => ({ title, input, reasoning, result });
export const activity = (type, prompt, prediction, explanation, config) => ({
  type,
  prompt,
  prediction,
  explanation,
  config
});
export function lesson(
  id,
  title,
  officialIds,
  prerequisites,
  objectives,
  sections,
  examples,
  manipulation,
  exercises,
  reflection
) {
  return {
    id: `terminale-${id}`,
    title,
    duration: 35,
    prerequisites,
    objectives,
    official: officialIds.map((id) => {
      const { label, page } = capabilities.find((c) => c.id === id);
      return { id, label, page };
    }),
    sections,
    examples,
    activity: manipulation,
    exercises: exercises.map((e, i) => ({ ...e, id: `terminale-${id}-ex${i + 1}` })),
    reflection,
    review: objectives.slice(0, 3).map((o) => `Je sais ${o[0].toLowerCase()}${o.slice(1)}.`)
  };
}
export function answer(title, prompt, value, hints, explanation, feedbackWrong, source) {
  return {
    title,
    kind: 'answer',
    prompt: `${source ? 'Adaptation pédagogique.' : 'Exercice original.'} ${prompt}`,
    answer: String(value),
    solution: String(value),
    hints,
    explanation,
    feedbackWrong,
    ...(source ? { source } : {})
  };
}
export function python(
  title,
  prompt,
  functionName,
  starter,
  solution,
  tests,
  hints,
  explanation,
  feedbackWrong,
  source,
  extras = {}
) {
  return {
    title,
    kind: 'python',
    prompt: `${source ? 'Adaptation pédagogique.' : 'Exercice original.'} ${prompt}`,
    functionName,
    starter,
    solution,
    tests: tests.map(([args, expected, expectedError]) => ({
      args,
      expected,
      ...(expectedError ? { expectedError } : {})
    })),
    hints,
    explanation,
    feedbackWrong,
    ...(source ? { source } : {}),
    ...extras
  };
}
export function sql(
  title,
  prompt,
  setup,
  starter,
  solution,
  expected,
  hints,
  explanation,
  feedbackWrong,
  extras = {}
) {
  return {
    title,
    kind: 'sql',
    prompt: `${extras.source ? 'Adaptation pédagogique.' : 'Exercice original.'} ${prompt}`,
    setup,
    starter,
    solution,
    expected,
    hints,
    explanation,
    feedbackWrong,
    ...extras
  };
}
export const sourceRevision = '7aa8b69454283e865ab63f41b8e570a755f44d18';
export function source(path, title, changes) {
  return {
    title,
    author: 'Gilles Lassus',
    url: `https://github.com/glassus/terminale_nsi/blob/${sourceRevision}/docs/${path}/cours.md`,
    revision: sourceRevision,
    license: 'CC BY-SA (version non précisée par l’auteur)',
    licenseUrl: `https://github.com/glassus/terminale_nsi/blob/${sourceRevision}/mkdocs.yml`,
    changes
  };
}

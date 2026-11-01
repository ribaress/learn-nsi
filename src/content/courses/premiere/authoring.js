// Petits constructeurs de structure : les explications restent écrites par notion.
import { capabilities } from './coverage.js';
export function lesson(data) {
  return {
    ...data,
    exercises: data.exercises.map((exercise) => ({
      ...exercise,
      prompt: `${exercise.source ? 'Adaptation pédagogique.' : 'Exercice original.'} ${exercise.prompt}`
    })),
    official: data.official.map((id) => {
      const cap = capabilities.find((c) => c.id === id);
      if (!cap) throw new Error(`Capacité inconnue : ${id}`);
      return { id, label: cap.label, page: cap.page };
    })
  };
}
export const section = (title, text, code) => ({ title, text, ...(code ? { code } : {}) });
export const example = (title, input, reasoning, result) => ({ title, input, reasoning, result });
export const activity = (type, prompt, prediction, explanation, config) => ({
  type,
  prompt,
  prediction,
  explanation,
  config
});
export function answer(id, title, prompt, value, hints, explanation, feedbackWrong, source) {
  return {
    id,
    title,
    kind: 'answer',
    prompt,
    answer: String(value),
    solution: String(value),
    hints,
    explanation,
    feedbackWrong,
    ...(source ? { source } : {})
  };
}
export function python(
  id,
  title,
  prompt,
  name,
  parameters,
  solution,
  tests,
  hints,
  explanation,
  feedbackWrong,
  source
) {
  return {
    id,
    title,
    kind: 'python',
    prompt,
    functionName: name,
    starter: `def ${name}(${parameters}):\n    # À compléter\n    pass\n`,
    solution,
    tests,
    hints,
    explanation,
    feedbackWrong,
    ...(source ? { source } : {})
  };
}
export const test = (args, expected) => ({ args, expected });
export function source(title, path, changes) {
  const revision = 'c18fe56389098950a9355bc4468938cc9edd310d';
  return {
    title,
    author: 'Gilles Lassus',
    url: `https://github.com/glassus/premiere_nsi/blob/${revision}/docs/${path}`,
    revision,
    license: 'CC-BY-SA (version non précisée par l’auteur)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/',
    changes
  };
}

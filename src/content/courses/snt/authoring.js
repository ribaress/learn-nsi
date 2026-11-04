import { capabilities } from './coverage.js';
import { expandPedagogy } from './pedagogy.js';

// Aides d’écriture : elles assemblent les champs, sans fabriquer les explications.
export const answer = (prompt, value, hints, explanation, feedbackWrong) => ({
  kind: 'answer',
  prompt,
  answer: String(value),
  solution: `Réponse attendue : ${value}.`,
  hints,
  explanation,
  feedbackWrong
});
export const python = (
  prompt,
  functionName,
  starter,
  solution,
  tests,
  hints,
  explanation,
  feedbackWrong
) => ({
  kind: 'python',
  prompt,
  functionName,
  starter,
  solution,
  tests: tests.map(([args, expected]) => ({ args, expected })),
  hints,
  explanation,
  feedbackWrong
});
export const web = (prompt, starter, solution, checks, hints, explanation, feedbackWrong) => ({
  kind: 'web',
  prompt,
  starter,
  solution,
  checks,
  hints,
  explanation,
  feedbackWrong
});
export const lesson = (data, pedagogyEntry) => ({
  ...data,
  official: data.official.map((id) => {
    const cap = capabilities.find((c) => c.id === `snt-${id}`);
    if (!cap) throw new Error(id);
    return { id: cap.id, label: cap.label, page: cap.page };
  }),
  sections: data.sections.map(([title, text, code]) => ({
    title,
    text,
    ...(code ? { code } : {})
  })),
  examples: data.examples.map(([title, input, reasoning, result]) => ({
    title,
    input,
    reasoning,
    result
  })),
  exercises: data.exercises.map((ex, i) => ({
    ...ex,
    id: `${data.id}-ex${i + 1}`,
    title: [
      'Guidé : raisonner pas à pas',
      'Application : faire soi-même',
      'Transfert : changer de situation'
    ][i]
  })),
  ...expandPedagogy(data, pedagogyEntry)
});
export const tableActivity = (prompt, prediction, explanation, columns, rows) => ({
  type: 'table',
  prompt,
  prediction,
  explanation,
  config: { columns, rows }
});
export const networkActivity = (type, prompt, prediction, explanation, edges) => ({
  type,
  prompt,
  prediction,
  explanation,
  config: {
    nodes: [
      { id: 'A', label: 'A', x: 15, y: 45 },
      { id: 'B', label: 'B', x: 45, y: 15 },
      { id: 'C', label: 'C', x: 45, y: 75 },
      { id: 'D', label: 'D', x: 85, y: 45 }
    ],
    edges,
    start: 'A',
    goal: 'D'
  }
});

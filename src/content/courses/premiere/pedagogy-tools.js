// Constructeurs de données uniquement : chaque explication est écrite pour sa notion.
export const intro = (situation, question, why, journey) => ({ situation, question, why, journey });
export const recap = (term, explanation, example) => ({ term, explanation, example });
export const life = (title, situation, connection, difference) => ({
  title,
  situation,
  connection,
  difference
});
export const section = (title, text, extra = {}) => ({ title, text, ...extra });
export const pause = (question, right, wrong, explanation) => ({
  question,
  choices: [
    { label: right, value: 'compris' },
    { label: wrong, value: 'a-revoir' }
  ],
  answer: 'compris',
  explanation
});

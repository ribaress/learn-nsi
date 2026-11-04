// Ces tableaux contiennent des textes écrits pour chaque notion. Cet assemblage
// ne déduit aucune explication d'un titre ou d'un identifiant.
export function expandPedagogy(data, entry) {
  if (!entry) throw new Error(`Pédagogie SNT absente : ${data.id}`);
  const [situation, question, why, journey] = entry.intro;
  return {
    introduction: { situation, question, why, journey },
    prerequisiteRecap: entry.recap.map(([term, explanation, example]) => ({
      term,
      explanation,
      example
    })),
    realLifeExamples: entry.life.map(([title, situation, connection, difference]) => ({
      title,
      situation,
      connection,
      difference
    })),
    sections: entry.sections.map(([title, text, code], i) => {
      const pause = entry.pauses.find(([index]) => index === i);
      return {
        title,
        text,
        ...(code ? { code } : {}),
        ...(pause
          ? {
              checkpoint: {
                question: pause[1],
                choices: pause[2].map(([label, value]) => ({ label, value })),
                answer: pause[3],
                explanation: pause[4]
              }
            }
          : {})
      };
    }),
    examples: data.examples.map(([title, input, reasoning, result], i) => ({
      title,
      input,
      reasoning: `${reasoning} ${entry.reasoning[i]}`,
      result
    }))
  };
}

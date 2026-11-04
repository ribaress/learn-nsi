// Une question conserve son identité même si l'ordre du sommaire évolue.
export function assembleAnnale(summary, legacy, complete) {
  if (!complete?.sections?.length) throw new Error(`Sujet sans exercice : ${summary.id}`);
  const references = [], ids = new Set();
  const sections = complete.sections.map(section => {
    if (!section.questions?.length) throw new Error(`Exercice vide : ${summary.id}/${section.id}`);
    const exercises = section.questions.map(question => {
      const reused = question.reuse !== undefined;
      const original = reused ? legacy.exercises[question.reuse] : {};
      if (!original) throw new Error(`Ancien atelier introuvable : ${summary.id}`);
      const reference = `${section.id}:${question.question}`;
      references.push(reference);
      const suffix = String(question.question).replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      const id = reused ? `${summary.id}-ex${question.reuse + 1}` : `${summary.id}-${section.id}-q${suffix}`;
      if (ids.has(id)) throw new Error(`Question répétée : ${id}`);
      ids.add(id);
      return { ...original, ...question, id, sectionId: section.id, officialQuestion: question.question };
    });
    return { ...section, exercises };
  });
  const expected = complete.inventory;
  if (!Array.isArray(expected) || new Set(expected).size !== expected.length || references.length !== expected.length || references.some(ref => !expected.includes(ref)))
    throw new Error(`Inventaire incomplet : ${summary.id}`);
  return {
    ...summary, ...legacy, ...complete,
    coverage: 'complete', sections,
    exercises: sections.flatMap(section => section.exercises)
  };
}

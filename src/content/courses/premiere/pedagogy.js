// Assemble une leçon sans modifier ses exercices, leurs identifiants ou leurs sources.
export function enrichChapter(module, pedagogies) {
  return {
    ...module,
    default: {
      ...module.default,
      lessons: module.default.lessons.map((lesson) => {
        const pedagogy = pedagogies[lesson.id];
        if (!pedagogy) return lesson;
        const { exampleMethods, ...content } = pedagogy;
        return {
          ...lesson,
          ...content,
          examples: lesson.examples.map((example, index) => ({
            ...example,
            reasoning: `${exampleMethods[index]} ${example.reasoning}`
          }))
        };
      })
    }
  };
}

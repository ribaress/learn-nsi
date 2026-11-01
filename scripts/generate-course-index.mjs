import { writeFile } from 'node:fs/promises';
import { format, resolveConfig } from 'prettier';
import { fileURLToPath } from 'node:url';
const summary = {};
for (const level of ['snt', 'premiere', 'terminale']) {
  const { chapters } = await import(`../src/content/courses/${level}/index.js`);
  summary[level] = await Promise.all(
    chapters.map(async (descriptor) => {
      const chapter = (await descriptor.load()).default;
      return {
        id: descriptor.id,
        title: descriptor.title,
        description: descriptor.description,
        lessons: chapter.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          duration: lesson.duration,
          objectives: lesson.objectives,
          exercises: lesson.exercises.map((e) => ({ id: e.id }))
        }))
      };
    })
  );
}
const target = new URL('../src/content/courses/summaries.json', import.meta.url);
const options = await resolveConfig(fileURLToPath(target));
await writeFile(target, await format(JSON.stringify(summary), { ...options, parser: 'json' }));
console.log('Sommaires légers des trois niveaux préparés.');

// Les mêmes données et le même exécuteur que le navigateur, avec le vrai Python WASM.
import { readFile } from 'node:fs/promises';
import { loadPyodide } from 'pyodide';
import { fileURLToPath } from 'node:url';
import { projectsFor } from '../src/content/courses/projects.js';
import { annales, loadAnnale } from '../src/content/annales/catalog.js';
const root = new URL('../', import.meta.url);
const executor = await readFile(new URL('src/python/executor.py', root), 'utf8');
const pyodide = await loadPyodide({ indexURL: fileURLToPath(new URL('public/python/', root)) });
await pyodide.loadPackage('sqlite3');
let checked = 0,
  failed = 0,
  answers = 0;
const selected = new Set(process.argv.filter(arg => arg.startsWith('--annale=')).map(arg => arg.slice('--annale='.length)));
for (const id of selected) if (!annales.some(item => item.id === id)) throw new Error(`Annale inconnue : ${id}`);
for (const level of ['snt', 'premiere', 'terminale']) {
  if (selected.size && level !== 'terminale') continue;
  const { chapters } = await import(new URL(`src/content/courses/${level}/index.js`, root));
  const loaded = await Promise.all(chapters.map(async (c) => (await c.load()).default));
  const lessons = selected.size ? [] : [...loaded.flatMap((c) => c.lessons), ...projectsFor(level)];
  if (level === 'terminale')
    lessons.push(...(await Promise.all(annales.filter(a => !selected.size || selected.has(a.id)).map((a) => loadAnnale(a.id)))));
  for (const lesson of lessons)
    for (const exercise of lesson.exercises) {
      if (exercise.kind === 'answer') {
        if (exercise.answer === undefined) {
          console.error(`${level}/${lesson.id}/${exercise.id} : réponse absente`);
          failed++;
        } else answers++;
        continue;
      }
      if (!['python', 'sql'].includes(exercise.kind)) continue;
      const namespace = pyodide.globals.get('dict')();
      const request = {
        ...exercise,
        mode: exercise.kind,
        code: exercise.solution,
        files: exercise.solutionFiles || exercise.files || {}
      };
      namespace.set('__atelier_request', JSON.stringify(request));
      try {
        const result = JSON.parse(await pyodide.runPythonAsync(executor, { globals: namespace }));
        checked++;
        if (result.error || !result.results?.length || !result.results.every((r) => r.passed)) {
          console.error(`${level}/${lesson.id}/${exercise.id}: ${JSON.stringify(result)}`);
          failed++;
        }
      } catch (error) {
        console.error(`${level}/${lesson.id}/${exercise.id}: ${error.message}`);
        failed++;
      } finally {
        namespace.destroy();
      }
    }
}
console.log(
  `${checked} solutions Python/SQL exécutées ; ${answers} réponses simples présentes ; ${failed} échec(s).`
);
process.exitCode = failed ? 1 : 0;

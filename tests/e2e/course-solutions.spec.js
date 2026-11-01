import { test, expect } from '@playwright/test';
import { prepareCourse } from './helpers.js';

for (const level of ['snt', 'premiere', 'terminale']) {
  test(`toutes les corrections Python et SQL de ${level} s’exécutent dans le navigateur`, async ({
    page
  }) => {
    test.setTimeout(180000);
    await page.goto('/');
    const result = await page.evaluate(async (level) => {
      const { chapters } = await import(`/src/content/courses/${level}/index.js`);
      const { projectsFor } = await import('/src/content/courses/projects.js');
      const { PythonRunner } = await import('/src/python/runner.js');
      const runner = new PythonRunner();
      const failures = [];
      let checked = 0;
      try {
        const loaded = await Promise.all(chapters.map(async (c) => (await c.load()).default));
        for (const lesson of [...loaded.flatMap((c) => c.lessons), ...projectsFor(level)]) {
          for (const exercise of lesson.exercises.filter((e) =>
            ['python', 'sql'].includes(e.kind)
          )) {
            const result = await runner.run({
              ...exercise,
              mode: exercise.kind,
              code: exercise.solution,
              files: exercise.solutionFiles || exercise.files || {}
            });
            checked++;
            if (result.error || !result.results?.length || !result.results.every((t) => t.passed))
              failures.push({ lesson: lesson.id, exercise: exercise.id, result });
          }
        }
      } finally {
        runner.dispose();
      }
      return { checked, failures };
    }, level);
    expect(result.checked).toBeGreaterThan(10);
    expect(result.failures).toEqual([]);
  });
}

test('les projets Web vérifient aussi les interactions et acceptent leur correction', async ({
  page
}) => {
  await prepareCourse(page, '/#/niveau/premiere/projet/projet-quiz', {
    attempted: ['lieu-code', 'structure-quiz']
  });
  await page.getByRole('button', { name: '3 Exercices', exact: true }).click();
  const solution = await page.evaluate(async () => {
    const { projectsFor } = await import('/src/content/courses/projects.js');
    return projectsFor('premiere').find((p) => p.id === 'projet-quiz').exercises[2].solution;
  });
  const exercise = page.locator('#exercice-interaction-quiz');
  await exercise.getByLabel('Ton document Web').fill(solution);
  await exercise.getByRole('button', { name: 'Afficher et vérifier la page' }).click();
  await expect(exercise.locator('.course-status')).toContainText('Sans corrigé');
  await expect(exercise.locator('.web-results')).not.toContainText('À revoir');
  const frame = exercise.frameLocator('iframe');
  await frame.locator('#reponse').selectOption('python');
  await frame.getByRole('button', { name: 'Vérifier' }).click();
  await expect(frame.locator('#score')).toHaveText('1');
});

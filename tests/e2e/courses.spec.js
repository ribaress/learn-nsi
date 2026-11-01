import { test, expect } from '@playwright/test';
import { prepareCourse } from './helpers.js';

test('les trois sections sont ouvertes et une leçon conserve les aides dorées', async ({
  page
}) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explorer la SNT' })).toBeVisible();
  await page.getByRole('link', { name: 'Explorer la SNT' }).click();
  await expect(page.locator('.course-chapter')).toHaveCount(8);
  await page.locator('.course-lesson-link').first().click();
  await expect(page.getByRole('heading', { name: 'Trois exemples pour comprendre' })).toBeVisible();
  await expect(
    page.getByRole('button', { name: '3 Exercices · verrouillé', exact: true })
  ).toBeDisabled();
  await page
    .getByPlaceholder('Je vais apprendre à…')
    .fill('Je vais situer Internet et le Web dans le temps.');
  await page.getByRole('button', { name: '2 Manipuler', exact: true }).click();
  await page
    .getByPlaceholder('Avant de manipuler, je pense que…')
    .fill('TCP/IP est plus ancien que le Web.');
  await page.locator('.data-lab input').first().fill('1983');
  await page
    .getByPlaceholder('J’ai changé… J’ai observé… Cela s’explique par…')
    .fill('Le filtre retrouve le jalon TCP/IP.');
  await page.getByRole('button', { name: '3 Exercices', exact: true }).click();
  await page.getByRole('button', { name: 'Afficher un indice', exact: true }).first().click();
  await expect(page.locator('.gold-hint').first()).toBeVisible();
  await page.reload();
  await expect(page.locator('.gold-hint').first()).toBeVisible();
});

test('le moteur traite les listes, dictionnaires, booléens, modules et SQL dans un vrai worker', async ({
  page
}) => {
  await page.goto('/');
  const result = await page.evaluate(async () => {
    const { PythonRunner } = await import('/src/python/runner.js');
    const runner = new PythonRunner();
    const cases = [];
    try {
      cases.push(
        await runner.run({
          code: 'def f(values):\n    return {"ok": True, "values": tuple(reversed(values))}',
          functionName: 'f',
          tests: [{ args: [[1, 2, 3]], expected: { values: [3, 2, 1], ok: true } }]
        })
      );
      cases.push(
        await runner.run({
          code: 'from outils import double\ndef f(n):\n    return double(n)',
          files: { 'outils.py': 'def double(n):\n    return n*2' },
          functionName: 'f',
          tests: [{ args: [4], expected: 8 }]
        })
      );
      cases.push(
        await runner.run({
          code: 'def f(n):\n    import outils\n    return outils.double(n)',
          files: { 'outils.py': 'def double(n):\n    return n*3' },
          functionName: 'f',
          tests: [{ args: [4], expected: 12 }]
        })
      );
      cases.push(
        await runner.run({
          mode: 'sql',
          code: 'SELECT nom FROM livres WHERE pages > 100 ORDER BY nom',
          setup:
            "CREATE TABLE livres(nom TEXT,pages INTEGER); INSERT INTO livres VALUES ('Ada',120),('Lin',80);",
          expected: [['Ada']],
          ordered: true
        })
      );
      cases.push(
        await runner.run({
          mode: 'sql',
          code: "UPDATE livres SET pages=200 WHERE nom='Lin';",
          setup:
            "CREATE TABLE livres(nom TEXT,pages INTEGER); INSERT INTO livres VALUES ('Lin',80);",
          verifyQuery: 'SELECT pages FROM livres',
          expected: [[200]]
        })
      );
      return cases.map((c) => ({ error: c.error, passed: c.results?.every((r) => r.passed) }));
    } finally {
      runner.dispose();
    }
  });
  expect(result).toEqual(Array.from({ length: 5 }, () => ({ error: undefined, passed: true })));
});

test('la navigation des niveaux fonctionne sur téléphone sans débordement', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/#/niveau/terminale');
  await expect(page.locator('.course-chapter').first()).toBeVisible();
  await page.locator('.course-lesson-link').first().click();
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('les éditeurs visibles exécutent leurs entrées réactives Python et SQL', async ({ page }) => {
  await prepareCourse(page, '/#/niveau/snt/projet/projet-reportage', {
    attempted: ['choisir-donnees']
  });
  await page.getByRole('button', { name: '3 Exercices', exact: true }).click();
  const solution = await page.evaluate(async () => {
    const { projectsFor } = await import('/src/content/courses/projects.js');
    return projectsFor('snt')[0].exercises[1].solution;
  });
  const python = page.locator('#exercice-nettoyer-metadonnees');
  await python.getByLabel('Ton code Python').fill(solution);
  await python.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(python.locator('.python-results')).toContainText('3 / 3', { timeout: 45000 });
  await expect(python.locator('.course-status')).toContainText('Sans corrigé');
  await prepareCourse(page, '/#/niveau/terminale/projet/projet-mediatheque');
  await page.getByRole('button', { name: '3 Exercices', exact: true }).click();
  const sql = page.locator('#exercice-lire-prets');
  await sql
    .getByLabel('Ta requête SQL')
    .fill(
      'SELECT l.titre,m.nom FROM prets p JOIN livres l ON p.livre=l.id JOIN membres m ON p.membre=m.id ORDER BY l.titre'
    );
  await sql.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(sql.locator('.python-results')).toContainText('1 / 1', { timeout: 45000 });
});

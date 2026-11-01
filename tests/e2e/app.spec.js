import { test, expect } from '@playwright/test';
import { answerIntro } from './helpers.js';
const solution =
  'def nb_boites(nb_livres, capacite):\n    return (nb_livres + capacite - 1) // capacite\n';
async function practice(page, id) {
  await page.goto(`/#/mission/${id}`);
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
}
test('le parcours est lisible et une réponse est conservée après rechargement', async ({
  page
}) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Un grand problème');
  await expect(page.locator('.mission-row')).toHaveCount(6);
  await page.getByRole('link', { name: /Commencer le chapitre/ }).click();
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
  await page.getByRole('button', { name: '13 livres', exact: false }).click();
  await page.getByRole('button', { name: '6 places', exact: false }).click();
  await page.getByLabel('Nombre de boîtes nécessaires').fill('3');
  await page.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await expect(page.locator('.feedback.positive')).toContainText('Bien vu');
  await page.reload();
  await expect(page.getByLabel('Nombre de boîtes nécessaires')).toHaveValue('3');
  await expect(page.getByRole('button', { name: /13 livres/ })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(errors).toEqual([]);
});
test('le vrai runtime Python accepte deux méthodes, explique une erreur et redémarre après timeout', async ({
  page
}) => {
  await practice(page, 'programmer');
  const editor = page.getByLabel('Ton code Python');
  await editor.fill(solution);
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('5 / 5', { timeout: 45000 });
  await editor.fill(
    'def nb_boites(n, k):\n    restants = n\n    boites = 0\n    while restants > 0:\n        restants -= min(restants, k)\n        boites += 1\n    return boites'
  );
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('5 / 5');
  await editor.fill('def nb_boites(:\n    pass');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-error')).toContainText('SyntaxError');
  await editor.fill('while True:\n    pass');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-error')).toContainText('5 secondes', { timeout: 12000 });
  await editor.fill(solution);
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('5 / 5', { timeout: 45000 });
});
test('les missions et l’éditeur restent utilisables à 360 px sans débordement', async ({
  page
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Ma sauvegarde', exact: true })).toBeVisible();
  for (const id of ['comprendre', 'ordonner', 'decomposer', 'prevoir', 'tester', 'programmer']) {
    await practice(page, id);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
    ).toBe(true);
  }
  await page.getByLabel('Ton code Python').fill(solution);
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('5 / 5', { timeout: 45000 });
});

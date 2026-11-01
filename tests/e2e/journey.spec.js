import { test, expect } from '@playwright/test';
import { answerIntro, openMissionReflection } from './helpers.js';
import { readFile } from 'node:fs/promises';

async function go(page, id) {
  await page.goto(`/#/mission/${id}`);
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
}
async function reflect(page) {
  await page.getByRole('button', { name: 'Expliquer', exact: true }).first().click();
  await page
    .getByLabel('Mon explication')
    .fill('Je repère les données, je découpe la tâche et je vérifie le résultat avec un exemple.');
  for (const box of await page.locator('.review-checklist input').all()) await box.check();
  await page.getByRole('button', { name: 'Bilan', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Une nouvelle étape franchie !' })).toBeVisible();
}

test('un élève peut terminer les six missions et obtenir un bilan fidèle', async ({ page }) => {
  test.setTimeout(120000);
  await go(page, 'comprendre');
  for (const [n, k, b] of [
    [13, 6, 3],
    [19, 5, 4]
  ]) {
    await page.getByRole('button', { name: `${n} livres à ranger`, exact: true }).click();
    await page.getByRole('button', { name: `${k} places par boîte`, exact: true }).click();
    await page.getByLabel('Nombre de boîtes nécessaires').fill(String(b));
    await page.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
    await expect(page.locator('.round-success')).toContainText('sans corrigé');
    if (n === 13) await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  }
  await reflect(page);
  await go(page, 'ordonner');
  for (const round of [0, 1]) {
    for (const name of round === 0
      ? ['Droite', 'Droite', 'Droite', 'Bas', 'Bas', 'Bas']
      : ['Droite', 'Droite', 'Droite'])
      await page.getByRole('button', { name, exact: true }).click();
    await page.getByRole('button', { name: 'Vérifier mon chemin', exact: true }).click();
    await expect(page.locator('.round-success')).toBeVisible();
    if (!round) await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  }
  await reflect(page);
  await go(page, 'decomposer');
  for (const round of [0, 1]) {
    for (let i = 0; i < 3; i++)
      await page.getByRole('button', { name: 'Monter : Compter les objets', exact: true }).click();
    await page
      .getByRole('button', { name: 'Monter : Lire la capacité d’une boîte', exact: true })
      .click();
    for (let i = 0; i < 2; i++)
      await page
        .getByRole('button', { name: 'Monter : Prévoir le nombre de boîtes', exact: true })
        .click();
    for (const [label, group] of [
      ['Compter les objets', 'data'],
      ['Lire la capacité d’une boîte', 'data'],
      ['Prévoir le nombre de boîtes', 'organise'],
      ['Répartir les objets', 'organise'],
      ['Vérifier que tout est rangé', 'control']
    ])
      await page.getByLabel(`Groupe pour ${label}`, { exact: true }).selectOption(group);
    await page.getByRole('button', { name: 'Vérifier ma décomposition', exact: true }).click();
    await expect(page.locator('.round-success')).toBeVisible();
    if (!round) await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  }
  await reflect(page);
  await go(page, 'prevoir');
  for (const [round, states] of [
    [
      0,
      [
        [7, 1],
        [1, 2],
        [0, 3]
      ]
    ],
    [
      1,
      [
        [6, 1],
        [2, 2],
        [0, 3]
      ]
    ]
  ]) {
    for (const [remaining, boxes] of states) {
      await page.getByLabel('Livres restants', { exact: true }).fill(String(remaining));
      await page.getByLabel('Boîtes utilisées', { exact: true }).fill(String(boxes));
      await page.getByRole('button', { name: 'Vérifier et avancer', exact: true }).click();
    }
    await expect(page.locator('.round-success')).toBeVisible();
    if (!round) await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  }
  await reflect(page);
  await go(page, 'tester');
  for (const [round, tests] of [
    [
      0,
      [
        [7, 2],
        [0, 0]
      ]
    ],
    [
      1,
      [
        [5, 2],
        [4, 1]
      ]
    ]
  ]) {
    for (const [n, expected] of tests) {
      await page.getByLabel('Nombre de livres', { exact: true }).fill(String(n));
      await page.getByLabel('Boîtes attendues', { exact: true }).fill(String(expected));
      await page.getByRole('button', { name: 'Lancer ce test', exact: true }).click();
    }
    await expect(page.locator('.round-success')).toBeVisible();
    if (!round) await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  }
  await reflect(page);
  await go(page, 'programmer');
  for (const [round, fn] of [
    [0, 'nb_boites'],
    [1, 'nb_boites'],
    [2, 'nb_vehicules']
  ]) {
    await page.getByLabel('Ton code Python').fill(`def ${fn}(n, k):\n    return (n + k - 1) // k`);
    await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
    await expect(page.locator('.python-results')).toContainText('5 / 5', { timeout: 45000 });
    await expect(page.locator('.round-success')).toBeVisible();
    if (round < 2)
      await page.getByRole('button', { name: `Exercice ${round + 2}`, exact: true }).click();
  }
  await reflect(page);
  await page.goto('/#/competences');
  await expect(page.locator('.page-heading')).toContainText(
    '6 / 6 missions de l’atelier introductif terminées'
  );
  await expect(page.locator('.badge-card.earned')).toHaveCount(4);
  await expect(page.locator('.badge-card.earned').last()).toContainText('Autoévalué');
});

test('exporter puis importer remplace le travail après confirmation et refuse un fichier invalide', async ({
  page
}) => {
  await openMissionReflection(page);
  await page
    .getByLabel('Mon explication')
    .fill('Mon raisonnement à retrouver sur un autre appareil.');
  await page.goto('/#/sauvegarde');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exporter ma sauvegarde', exact: true }).click();
  const download = await downloadPromise,
    buffer = await readFile(await download.path());
  await page.goto('/#/mission/comprendre');
  await page.getByRole('button', { name: 'Expliquer', exact: true }).click();
  await page.getByLabel('Mon explication').fill('Un nouveau brouillon.');
  await page.goto('/#/sauvegarde');
  const file = page.locator('input[type=file]');
  await file.setInputFiles({
    name: 'invalide.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{}')
  });
  await expect(page.getByRole('alert')).toContainText('conservé');
  await file.setInputFiles({ name: 'atelier.json', mimeType: 'application/json', buffer });
  await expect(page.getByRole('dialog').first()).toBeVisible();
  await page.getByRole('button', { name: 'Annuler', exact: true }).click();
  await page.goto('/#/mission/comprendre');
  await page.getByRole('button', { name: 'Expliquer', exact: true }).click();
  await expect(page.getByLabel('Mon explication')).toHaveValue('Un nouveau brouillon.');
  await page.goto('/#/sauvegarde');
  await page
    .locator('input[type=file]')
    .setInputFiles({ name: 'atelier.json', mimeType: 'application/json', buffer });
  await page.getByRole('button', { name: 'Remplacer et reprendre', exact: true }).click();
  await page.goto('/#/mission/comprendre');
  await page.getByRole('button', { name: 'Expliquer', exact: true }).click();
  await expect(page.getByLabel('Mon explication')).toHaveValue(
    'Mon raisonnement à retrouver sur un autre appareil.'
  );
});

test('un corrigé consulté est distingué et une nouvelle variante peut être réussie sans corrigé', async ({
  page
}) => {
  await go(page, 'comprendre');
  for (const name of ['Voir un indice', 'Un autre indice', 'Voir le corrigé'])
    await page.getByRole('button', { name, exact: true }).click();
  await page.getByRole('button', { name: '13 livres à ranger', exact: true }).click();
  await page.getByRole('button', { name: '6 places par boîte', exact: true }).click();
  await page.getByLabel('Nombre de boîtes nécessaires').fill('3');
  await page.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await expect(page.locator('.round-success')).toContainText('avec corrigé');
  await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  await page.getByRole('button', { name: '19 livres à ranger', exact: true }).click();
  await page.getByRole('button', { name: '5 places par boîte', exact: true }).click();
  await page.getByLabel('Nombre de boîtes nécessaires').fill('4');
  await page.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await expect(page.locator('.round-success')).toContainText('sans corrigé');
});

test('un échec de chargement Python puis un arrêt manuel permettent de réessayer', async ({
  page
}) => {
  await go(page, 'programmer');
  await page.route('**/python/pyodide.mjs', (route) => route.abort());
  await page.getByLabel('Ton code Python').fill('def nb_boites(n, k):\n    return (n+k-1)//k');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-error')).toContainText('chargé');
  await page.unroute('**/python/pyodide.mjs');
  await page.getByLabel('Ton code Python').fill('while True:\n    pass');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.runtime-status')).toContainText('s’exécute', { timeout: 45000 });
  await page.getByRole('button', { name: 'Arrêter', exact: true }).click();
  await expect(page.locator('.python-error')).toContainText('arrêtée');
  await page
    .getByLabel('Ton code Python')
    .fill('print("x" * 15000)\ndef nb_boites(n, k):\n    return (n+k-1)//k');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('5 / 5', { timeout: 45000 });
  expect((await page.locator('.python-console pre').textContent()).length).toBe(10000);
});

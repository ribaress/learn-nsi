import { test, expect } from '@playwright/test';
import { answerIntro } from './helpers.js';
async function practice(page, id) {
  await page.goto(`/#/mission/${id}`);
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
}

test('les livres se placent et se retirent sans dépasser la capacité, puis le rangement se retrouve', async ({
  page
}) => {
  await practice(page, 'comprendre');
  const workshop = page.getByRole('region', { name: 'Atelier de rangement', exact: true });
  await expect(workshop).toBeVisible();
  for (let i = 0; i < 6; i++)
    await workshop.getByRole('button', { name: /^Placer le livre \d+ dans la boîte 1$/ }).click();
  await workshop.getByRole('button', { name: /^Placer le livre \d+ dans la boîte 1$/ }).click();
  await expect(workshop.getByRole('status')).toContainText('pleine');
  await expect(workshop.locator('.manual-box').first()).toContainText('6 / 6');
  await workshop.getByRole('button', { name: 'Ajouter une boîte', exact: true }).click();
  await workshop
    .getByRole('button', { name: 'Placer le livre 7 dans la boîte 2', exact: true })
    .click();
  await workshop
    .getByRole('button', { name: 'Retirer le livre 2 de la boîte 1', exact: true })
    .click();
  await expect(workshop.locator('.packing-summary')).toContainText('6 livres rangés');
  await page.reload();
  await expect(workshop.locator('.manual-box').first()).toContainText('5 / 6');
  await expect(
    workshop.getByRole('button', { name: 'Retirer le livre 7 de la boîte 2', exact: true })
  ).toBeVisible();
  await workshop.getByRole('button', { name: 'Ajouter une boîte', exact: true }).click();
  await workshop.getByRole('button', { name: 'Retirer la boîte 3', exact: true }).click();
  await expect(workshop.locator('.manual-box')).toHaveCount(2);
});

test('le code, les variables et les livres avancent et reculent ensemble sans valider les prédictions', async ({
  page
}) => {
  await practice(page, 'prevoir');
  await expect(page.getByRole('button', { name: 'Observer le code', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Observer le code', exact: true }).click();
  const player = page.getByRole('region', { name: 'Le code pas à pas', exact: true });
  for (let i = 0; i < 5; i++)
    await player.getByRole('button', { name: 'Étape suivante', exact: true }).click();
  await expect(player.locator('[aria-current=step]')).toContainText('restants = restants - ranges');
  await expect(player.getByLabel('Valeur de restants', { exact: true })).toHaveText('7');
  await expect(player.getByLabel('Valeur de boites', { exact: true })).toHaveText('0');
  await player.getByRole('button', { name: 'Étape suivante', exact: true }).click();
  await expect(player.getByLabel('Valeur de boites', { exact: true })).toHaveText('1');
  await player.getByRole('button', { name: 'Étape précédente', exact: true }).click();
  await expect(player.getByLabel('Valeur de boites', { exact: true })).toHaveText('0');
  await page.reload();
  await page.getByRole('button', { name: 'Observer le code', exact: true }).click();
  await expect(player.getByLabel('Valeur de restants', { exact: true })).toHaveText('7');
  while (await player.getByRole('button', { name: 'Étape suivante', exact: true }).isEnabled())
    await player.getByRole('button', { name: 'Étape suivante', exact: true }).click();
  await expect(player.locator('[aria-current=step]')).toContainText('return boites');
  await expect(player.getByLabel('Valeur de boites', { exact: true })).toHaveText('3');
  await expect(page.locator('.round-success')).toHaveCount(0);
  await page.getByRole('button', { name: 'Faire mes prédictions', exact: true }).click();
  await expect(page.getByLabel('Livres restants', { exact: true })).toHaveValue('');
});

test('un manque de places et une erreur sur la dernière boîte reçoivent un retour précis', async ({
  page
}) => {
  await practice(page, 'comprendre');
  await page.getByRole('button', { name: '13 livres à ranger', exact: true }).click();
  await page.getByRole('button', { name: '6 places par boîte', exact: true }).click();
  await page.getByLabel('Nombre de boîtes nécessaires').fill('2');
  await page.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await expect(page.locator('.answer-feedback')).toContainText('12 places');
  await expect(page.locator('.answer-feedback')).toContainText('1 livre');
  await practice(page, 'prevoir');
  for (const [remaining, boxes] of [
    [7, 1],
    [1, 2]
  ]) {
    await page.getByLabel('Livres restants', { exact: true }).fill(String(remaining));
    await page.getByLabel('Boîtes utilisées', { exact: true }).fill(String(boxes));
    await page.getByRole('button', { name: 'Vérifier et avancer', exact: true }).click();
  }
  await page.getByLabel('Livres restants', { exact: true }).fill('6');
  await page.getByLabel('Boîtes utilisées', { exact: true }).fill('3');
  await page.getByRole('button', { name: 'Vérifier et avancer', exact: true }).click();
  await expect(page.locator('.prediction-feedback')).toContainText('1 livre');
});

test.describe('Manipulations tactiles', () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });
  test('les boîtes et le lecteur de code restent utilisables à 360 px', async ({ page }) => {
    await practice(page, 'comprendre');
    await expect(
      page.getByRole('button', { name: 'Ajouter une boîte', exact: true })
    ).toBeVisible();
    await page
      .getByRole('button', { name: 'Placer le livre 1 dans la boîte 1', exact: true })
      .tap();
    await page.getByRole('button', { name: 'Retirer le livre 1 de la boîte 1', exact: true }).tap();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await practice(page, 'prevoir');
    await page.getByRole('button', { name: 'Observer le code', exact: true }).tap();
    await page.getByRole('button', { name: 'Étape suivante', exact: true }).tap();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
});

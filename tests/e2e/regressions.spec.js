import { test, expect } from '@playwright/test';
import { answerIntro } from './helpers.js';
test('Tab quitte l’éditeur et Maj+Tab permet de revenir aux commandes', async ({ page }) => {
  await page.goto('/#/mission/programmer');
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
  const editor = page.getByLabel('Ton code Python');
  await editor.focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Exécuter les tests', exact: true })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(editor).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(editor).not.toBeFocused();
});
test('le corrigé d’une variante ne révèle pas la suivante', async ({ page }) => {
  await page.goto('/#/mission/comprendre');
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
  for (const name of ['Voir un indice', 'Un autre indice', 'Voir le corrigé'])
    await page.getByRole('button', { name, exact: true }).click();
  await expect(page.locator('.hints')).toContainText('13 livres');
  await expect(page.locator('.hints')).not.toContainText('19 livres');
});
test('la comparaison Python n’est disponible qu’après une réussite ou comptée comme corrigé', async ({
  page
}) => {
  await page.goto('/#/mission/programmer');
  await answerIntro(page);
  await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
  await page.getByRole('button', { name: 'Exercice 2', exact: true }).click();
  await expect(
    page.getByText('Une autre version possible : quotient et reste', { exact: true })
  ).toHaveCount(0);
});

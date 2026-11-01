import { test, expect } from '@playwright/test';

test('les étapes et exercices se débloquent après réponse, les définitions et XP sont utilisables', async ({
  page
}) => {
  await page.goto('/#/niveau/snt/chapitre/programmation/lecon/snt-reperes-historiques');
  await expect(
    page.getByRole('button', { name: '2 Manipuler · verrouillé', exact: true })
  ).toBeDisabled();
  await expect(
    page.getByRole('button', { name: '3 Exercices · verrouillé', exact: true })
  ).toBeDisabled();
  const term = page
    .locator('.glossary-trigger')
    .filter({ hasText: /^TCP\/IP$/ })
    .first();
  await term.focus();
  await expect(page.getByRole('tooltip')).toContainText('famille de protocoles');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await page
    .getByPlaceholder('Je vais apprendre à…')
    .fill('Je vais distinguer Internet et le Web.');
  await page.getByRole('button', { name: '2 Manipuler', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Passer aux exercices →', exact: true })
  ).toBeDisabled();
  await page.getByPlaceholder('Avant de manipuler, je pense que…').fill('TCP/IP est plus ancien.');
  await page.locator('.data-lab input').first().fill('1983');
  await page
    .getByPlaceholder('J’ai changé… J’ai observé… Cela s’explique par…')
    .fill('Le filtre retrouve la ligne de 1983.');
  await page.getByRole('button', { name: 'Passer aux exercices →', exact: true }).click();
  await expect(page.locator('.course-exercise')).toHaveCount(1);
  await expect(page.locator('.locked-exercise')).toHaveCount(2);
  const first = page.locator('.course-exercise').first();
  await first.getByLabel('Ta réponse', { exact: true }).fill('TCP/IP');
  await first.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await expect(page.locator('.course-exercise')).toHaveCount(2);
  await expect(page.locator('.game-topline')).toContainText('30 XP');
  await first.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await expect(page.locator('.game-topline')).toContainText('30 XP');
  const second = page.locator('.course-exercise').nth(1);
  await second.getByLabel('Ta réponse', { exact: true }).fill('4');
  await second.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  const third = page.locator('.course-exercise').nth(2);
  await third.getByLabel('Ta réponse', { exact: true }).fill('Internet');
  await third.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
  await page.getByRole('button', { name: 'Relire et faire mon bilan →', exact: true }).click();
  for (const box of await page.locator('.review-checklist input').all()) await box.check();
  await expect(page.locator('.game-topline')).toContainText('130 XP');
  await page.reload();
  await expect(page.locator('.game-topline')).toContainText('130 XP');
  await expect(
    page.getByRole('heading', { name: 'Une nouvelle leçon terminée !', exact: true })
  ).toBeVisible();
  await page.goto('/#/competences');
  await expect(page.locator('.game-badges .earned')).toHaveCount(2);
});

test.describe('Définitions tactiles', () => {
  test.use({ viewport: { width: 360, height: 800 }, hasTouch: true, isMobile: true });
  test('les définitions restent accessibles au toucher sur un petit écran', async ({ page }) => {
    await page.goto('/#/niveau/snt/chapitre/programmation/lecon/snt-reperes-historiques');
    const term = page
      .locator('.glossary-trigger')
      .filter({ hasText: /^TCP\/IP$/ })
      .first();
    await term.tap();
    await expect(page.getByRole('tooltip')).toBeVisible();
    expect(
      await page.getByRole('tooltip').evaluate((e) => {
        const r = e.getBoundingClientRect();
        return r.left >= 0 && r.right <= innerWidth;
      })
    ).toBe(true);
  });
});

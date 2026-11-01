import { test, expect } from '@playwright/test';
import { openMissionReflection } from './helpers.js';
test('le prolongement première vérifie les préconditions et la récursivité s’exécute vraiment', async ({
  page
}) => {
  await page.goto('/#/prolongements');
  await page.getByLabel('Ton code Python').fill('def nb_boites(n, k):\n    return (n+k-1)//k');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('3 / 5', { timeout: 45000 });
  await page
    .getByLabel('Ton code Python')
    .fill(
      'def nb_boites(n, k):\n    assert isinstance(n, int) and n >= 0\n    assert isinstance(k, int) and k > 0\n    return (n+k-1)//k'
    );
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('5 / 5');
  await page.getByRole('button', { name: 'Terminale NSI', exact: true }).click();
  await page
    .getByLabel('Ton code Python')
    .fill(
      'def nb_boites(n, k):\n    if n == 0:\n        return 0\n    return 1 + nb_boites(max(0, n-k), k)'
    );
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.locator('.python-results')).toContainText('3 / 3', { timeout: 45000 });
});
test('le parcours continue et peut être exporté quand le stockage est indisponible', async ({
  page
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError');
      }
    });
  });
  await page.goto('/');
  await expect(page.locator('.storage-warning')).toBeVisible();
  await openMissionReflection(page);
  await page.getByLabel('Mon explication').fill('Une explication en mémoire.');
  await page.goto('/#/sauvegarde');
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exporter ma sauvegarde', exact: true }).click();
  expect((await download).suggestedFilename()).toContain('atelier-nsi');
});
test('les raccourcis de navigation gardent une route correcte', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Aller au contenu', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Un grand problème');
  await page.getByRole('link', { name: 'Comment ça marche', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Comment fonctionne l’atelier ?', exact: true })
  ).toBeVisible();
});

import { test, expect } from '@playwright/test';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test('les bases commencent par une situation concrète et une pause explique les erreurs', async ({
  page
}) => {
  await page.goto('/#/niveau/premiere/chapitre/representations/lecon/premiere-bases');
  await expect(page.locator('.lesson-opening')).toContainText('13');
  await expect(
    page.getByRole('heading', { name: 'Les mots et les outils dont tu as besoin', exact: true })
  ).toBeVisible();
  await expect(page.locator('.prerequisite-card')).toHaveCount(4);
  await page.screenshot({
    path: join(tmpdir(), 'atelier-nsi-bases-introduction.png'),
    fullPage: false
  });
  const first = page.locator('.reading-check').first();
  await first.getByRole('radio', { name: 'La quantité de billes change.', exact: true }).check();
  await first.getByRole('button', { name: 'Vérifier ma compréhension', exact: true }).click();
  await expect(first.getByRole('status')).toContainText('La quantité reste la même');
  await first
    .getByRole('radio', { name: 'La façon d’écrire la quantité change.', exact: true })
    .check();
  await first.getByRole('button', { name: 'Vérifier ma compréhension', exact: true }).click();
  await expect(first.getByRole('status')).toContainText('Bien compris');
  await page.reload();
  await expect(
    page
      .locator('.reading-check')
      .first()
      .getByRole('radio', { name: 'La façon d’écrire la quantité change.', exact: true })
  ).toBeChecked();
  const lab = page.locator('.inline-reading-lab').first();
  for (const weight of [8, 4, 1])
    await lab.getByRole('button', { name: `Bit de poids ${weight} : 0`, exact: true }).click();
  await expect(lab.locator('.lab-observation')).toContainText('13');
  await expect(lab).not.toContainText('Complément à deux');
  await lab.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: join(tmpdir(), 'atelier-nsi-bases-interrupteurs.png'),
    fullPage: false
  });
  await expect(page.locator('.life-example')).toHaveCount(2);
  await page.locator('.paired-examples').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: join(tmpdir(), 'atelier-nsi-bases-exemples.png'),
    fullPage: false
  });
});

test('les icônes de progression et des chapitres sont centrées dans leur pastille', async ({
  page
}) => {
  await page.goto('/');
  await expect(page.locator('.game-star svg')).toBeVisible();
  const starOffset = await page.locator('.game-star svg').evaluate((svg) => {
    const a = svg.getBoundingClientRect(),
      b = svg.parentElement.getBoundingClientRect();
    return (
      Math.abs(a.x + a.width / 2 - b.x - b.width / 2) +
      Math.abs(a.y + a.height / 2 - b.y - b.height / 2)
    );
  });
  expect(starOffset).toBeLessThanOrEqual(1);
  await page.goto('/#/niveau/premiere');
  const icon = page.locator('.course-lesson-link .lesson-dot svg').first();
  await expect(icon).toBeVisible();
  const offset = await icon.evaluate((svg) => {
    const icon = svg.getBoundingClientRect(),
      parent = svg.parentElement.getBoundingClientRect();
    return {
      x: Math.abs(icon.x + icon.width / 2 - parent.x - parent.width / 2),
      y: Math.abs(icon.y + icon.height / 2 - parent.y - parent.height / 2)
    };
  });
  expect(offset.x).toBeLessThanOrEqual(1);
  expect(offset.y).toBeLessThanOrEqual(1);
});

test('le cours reste lisible sur téléphone avec ses tableaux et ses exemples réels', async ({
  page
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/#/niveau/premiere/chapitre/representations/lecon/premiere-bases');
  await expect(page.locator('.lesson-opening')).toBeVisible();
  const table = page.locator('.reading-table').first();
  await table.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const everyday = page.locator('.life-example').first();
  await everyday.scrollIntoViewIfNeeded();
  await expect(everyday).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: join(tmpdir(), 'atelier-nsi-bases-mobile.png') });
});

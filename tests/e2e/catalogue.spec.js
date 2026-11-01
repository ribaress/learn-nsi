import { test, expect } from '@playwright/test';
import path from 'node:path';
import os from 'node:os';

for (const level of ['snt', 'premiere', 'terminale']) {
  test(`toutes les manipulations ${level} se montent sans erreur`, async ({ page }) => {
    test.setTimeout(120000);
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('/');
    const lessons = await page.evaluate(async (level) => {
      const { chapters } = await import(`/src/content/courses/${level}/index.js`);
      const result = [];
      const saved = {
        formatVersion: 2,
        contentVersion: '2026-11-programmes-complets',
        progress: {
          contentVersion: '2026-11-programmes-complets',
          lastMission: 'comprendre',
          missions: {},
          extensions: {},
          courses: { [level]: { lessons: {} } }
        }
      };
      for (const descriptor of chapters) {
        const chapter = (await descriptor.load()).default;
        for (const lesson of chapter.lessons) {
          result.push({ id: lesson.id, chapter: chapter.id, title: lesson.title });
          saved.progress.courses[level].lessons[lesson.id] = {
            exercises: {},
            discoveryAnswer: 'Je peux reformuler l’objectif.',
            reflection: '',
            selfReview: [],
            activity: {
              prediction: 'Je prévois un résultat.',
              observed: true,
              explanation: 'Je peux expliquer la comparaison.'
            },
            step: 1
          };
        }
      }
      localStorage.setItem('atelier-nsi.progress.v1', JSON.stringify(saved));
      return result;
    }, level);
    for (const [index, lesson] of lessons.entries()) {
      await page.goto(
        `${index === 0 ? '/?catalogue=1' : '/'}#/niveau/${level}/chapitre/${lesson.chapter}/lecon/${lesson.id}`
      );
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(lesson.title);
      // Une navigation qui change la query recharge la page ; les suivantes utilisent le hash.
      const manipulate = page.getByRole('button', { name: '2 Manipuler', exact: true });
      await manipulate.click();
      await expect(page.locator('.interactive-activity')).toBeVisible();
      await expect(page.locator('.interactive-activity')).not.toContainText('undefined');
    }
    expect(errors).toEqual([]);
  });
}

test('preuves visuelles bureau et téléphone, y compris le survol d’un terme', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explorer la SNT', exact: true })).toBeVisible();
  await page.screenshot({
    path: path.join(os.tmpdir(), 'atelier-nsi-accueil-bureau.png'),
    fullPage: false
  });
  await page.goto('/#/niveau/snt/chapitre/programmation/lecon/snt-reperes-historiques');
  const term = page
    .locator('.glossary-trigger')
    .filter({ hasText: /^TCP\/IP$/ })
    .first();
  await term.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await page.screenshot({
    path: path.join(os.tmpdir(), 'atelier-nsi-definition.png'),
    fullPage: false
  });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({
    path: path.join(os.tmpdir(), 'atelier-nsi-accueil-mobile.png'),
    fullPage: false
  });
});

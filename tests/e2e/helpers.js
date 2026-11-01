export async function answerIntro(page) {
  const step = page.getByRole('button', { name: 'Manipuler', exact: true });
  await step.waitFor({ state: 'visible' });
  const field = page.getByLabel('Avant de manipuler, reformule le but de cette mission.');
  if (await step.isDisabled())
    await field.fill('Je repère les données et je cherche une solution que je pourrai vérifier.');
}
export async function openMissionReflection(page) {
  await page.goto('/#/mission/comprendre');
  const explain = page.getByRole('button', { name: 'Expliquer', exact: true }).first();
  if (await explain.isDisabled()) {
    await answerIntro(page);
    await page.getByRole('button', { name: 'Manipuler', exact: true }).click();
    for (const [index, n, k, b] of [
      [0, 13, 6, 3],
      [1, 19, 5, 4]
    ]) {
      await page.getByRole('button', { name: `Exercice ${index + 1}`, exact: true }).click();
      await page.getByRole('button', { name: `${n} livres à ranger`, exact: true }).click();
      await page.getByRole('button', { name: `${k} places par boîte`, exact: true }).click();
      await page.getByLabel('Nombre de boîtes nécessaires').fill(String(b));
      await page.getByRole('button', { name: 'Vérifier ma réponse', exact: true }).click();
    }
  }
  await explain.click();
}
// Les tests d’outils commencent après une manipulation déjà répondue.
export async function prepareCourse(page, url, { attempted = [] } = {}) {
  await page.goto('/');
  await page.evaluate(
    ({ url, attempted }) => {
      const parts = url.replace('/#/', '').split('/');
      const level = parts[1],
        id = parts.at(-1);
      const key = 'atelier-nsi.progress.v1';
      const saved = JSON.parse(localStorage.getItem(key) || 'null') || {
        formatVersion: 2,
        contentVersion: '2026-11-programmes-complets',
        progress: {
          contentVersion: '2026-11-programmes-complets',
          lastMission: 'comprendre',
          missions: {},
          extensions: {},
          courses: {}
        }
      };
      saved.progress.courses ||= {};
      saved.progress.courses[level] ||= { lessons: {} };
      saved.progress.courses[level].lessons[id] = {
        exercises: {},
        discoveryAnswer: 'Je vais comprendre cette notion.',
        reflection: '',
        selfReview: [],
        activity: {
          prediction: 'Je prévois un résultat.',
          observed: true,
          explanation: 'J’ai comparé la prévision et le résultat.'
        },
        step: 2
      };
      for (const exerciseId of attempted)
        saved.progress.courses[level].lessons[id].exercises[exerciseId] = {
          answer: '',
          code: '',
          files: {},
          hints: 0,
          modelSeen: false,
          attempted: true,
          success: false
        };
      localStorage.setItem(key, JSON.stringify(saved));
    },
    { url, attempted }
  );
  // Une navigation avec une nouvelle query recharge réellement l’application et son stockage.
  await page.goto(url.replace('/#/', '/?test-fixture=course#/'));
}

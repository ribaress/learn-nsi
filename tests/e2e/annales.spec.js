import { test, expect } from '@playwright/test';

test('filtrer les annales et ouvrir une référence officielle', async ({ page }) => {
  await page.goto('/#/annales');
  await expect(
    page.getByRole('heading', { name: 'Les annales guidées', exact: true })
  ).toBeVisible();
  await page.getByLabel('Année').selectOption('2026');
  await expect(page.locator('.annale-card')).toHaveCount(4);
  await page.getByLabel('Format').selectOption('pratique');
  await expect(page.locator('.annale-card')).toHaveCount(1);
  await page.getByRole('link', { name: /Codage RLE/ }).click();
  await expect(page.getByRole('link', { name: /Ouvrir le sujet officiel/ })).toHaveAttribute(
    'href',
    /^https:\/\/sujets.examens-concours.gouv.fr\//
  );
  await expect(page.getByText('Corrigé verrouillé', { exact: true })).toBeVisible();
});

test('les Centres étrangers sont accessibles par lien direct, année et recherche', async ({
  page
}) => {
  await page.goto('/#/annales?centre=centres-etrangers');
  await expect(page.getByRole('combobox', { name: 'Centre', exact: true })).toHaveValue(
    'centres-etrangers'
  );
  await expect(page.locator('.annale-card')).toHaveCount(12);
  await expect(page.locator('.annale-card').filter({ hasText: 'Métropole' })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Groupe', exact: true }).selectOption('1');
  await expect(page).toHaveURL(/groupe=1/);
  await expect(page.locator('.annale-card')).toHaveCount(6);
  await page.getByRole('combobox', { name: 'Année', exact: true }).selectOption('2026');
  await expect(page.locator('.annale-card')).toHaveCount(1);
  await page
    .getByRole('link', { name: 'Calculer les points et classer les athlètes', exact: true })
    .click();
  await expect(
    page.getByText('26-NSIJ1G11 · Centres étrangers · groupe 1 · jour 1', { exact: true })
  ).toBeVisible();
  await expect(page.getByText('Corrigé verrouillé', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(0);
  await page.goto('/#/annales');
  await page.getByLabel('Rechercher', { exact: true }).fill('centres etrangers');
  await expect(page.locator('.annale-card')).toHaveCount(12);
});

test('groupe 2 : lien direct, filtres combinés et retour aux autres centres', async ({ page }) => {
  await page.goto('/#/annales?centre=centres-etrangers&groupe=2');
  await expect(page.getByRole('combobox', { name: 'Groupe', exact: true })).toHaveValue('2');
  await expect(page.locator('.annale-card')).toHaveCount(6);
  await page.reload();
  await expect(page.locator('.annale-card')).toHaveCount(6);
  await page.getByRole('combobox', { name: 'Année', exact: true }).selectOption('2023');
  await page.getByLabel('Rechercher', { exact: true }).fill('Liban');
  await expect(page.locator('.annale-card')).toHaveCount(1);
  await expect(page.locator('.annale-card')).toContainText('23-NSIJ1LI1');
  await page.getByLabel('Rechercher', { exact: true }).fill('');
  await page.getByRole('combobox', { name: 'Centre', exact: true }).selectOption('metropole');
  await expect(page.getByRole('combobox', { name: 'Groupe', exact: true })).toHaveCount(0);
  await expect(page).not.toHaveURL(/groupe=/);
  await expect(page.locator('.annale-card')).toHaveCount(1);
});

test('groupe 2 en 2025 : déblocage après trois réussites et persistance', async ({ page }) => {
  await page.goto('/#/annales/annale-2025-groupe2-terminaison');
  const exercises = page.locator('.course-exercise');
  await expect(exercises).toHaveCount(3);
  await expect(page.locator('.exercise-solution')).toHaveCount(0);
  await exercises
    .nth(2)
    .locator('.python-editor textarea')
    .fill('def arret_essai2(programme):\n    return True');
  await exercises.nth(2).getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(exercises.nth(2).locator('.python-results')).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Attendu', exact: true })).toHaveCount(0);
  await expect(page.locator('.annale-resolution')).toHaveCount(0);
  for (const [index, value] of ['[0,20]', '[true,false,true,false]'].entries()) {
    await exercises.nth(index).getByLabel('Ta réponse', { exact: true }).fill(value);
    await exercises.nth(index).getByRole('button', { name: 'Vérifier ma réponse' }).click();
    await expect(page.locator('.exercise-solution')).toHaveCount(0);
  }
  await exercises
    .nth(2)
    .locator('.python-editor textarea')
    .fill("def arret_essai2(programme):\n    return 'while' not in programme");
  await exercises.nth(2).getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(3);
  await page.reload();
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
});

test('Centres étrangers 2026 : les essais de tri ne révèlent pas le score à trouver et les réussites débloquent le corrigé', async ({
  page
}) => {
  await page.goto('/#/annales/annale-2026-centres-etrangers-athletes');
  const exercises = page.locator('.course-exercise');
  await expect(exercises).toHaveCount(3);
  await exercises
    .nth(2)
    .locator('.python-editor textarea')
    .fill('def tester_classement(l):\n    return []');
  await exercises.nth(2).getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
  await expect(exercises.nth(2).locator('.python-results')).toBeVisible();
  await expect(exercises.nth(2).locator('.python-results')).not.toContainText('454');
  await expect(page.getByText('Corrigé verrouillé', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(0);
  await exercises.nth(0).getByLabel('Ta réponse', { exact: true }).fill('454');
  await exercises.nth(0).getByRole('button', { name: 'Vérifier ma réponse' }).click();
  const codes = [
    "def nb_points(epreuve,valeur):\n    if epreuve == '100m': return (20-valeur)*10\n    if epreuve == 'longueur': return valeur*20\n    if epreuve == 'poids': return valeur*10\n    return 500-valeur",
    "def classer(l):\n    for i in range(len(l)):\n        meilleur = max(range(i,len(l)), key=lambda j: l[j]['score'])\n        l[i],l[meilleur] = l[meilleur],l[i]\n\ndef tester_classement(l):\n    classer(l)\n    return [a['nom'] for a in l]"
  ];
  for (const [index, code] of codes.entries()) {
    const exercise = exercises.nth(index + 1);
    await exercise.locator('.python-editor textarea').fill(code);
    await exercise.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
    await expect(exercise.locator('.course-status.done')).toBeVisible();
    if (index === 0) await expect(page.locator('.exercise-solution')).toHaveCount(0);
  }
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(3);
  await page.reload();
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
});

test('2026 : seules les trois réponses justes débloquent les résolutions, avec reprise', async ({
  page
}) => {
  await page.goto('/#/annales/annale-2026-ecrit-reseau');
  const exercises = page.locator('.course-exercise');
  await expect(exercises).toHaveCount(3);
  await expect(page.locator('.exercise-solution')).toHaveCount(0);
  await expect(page.locator('.annale-resolution')).toHaveCount(0);
  await exercises.nth(0).getByRole('button', { name: 'Afficher un indice', exact: true }).click();
  await exercises.nth(0).getByRole('button', { name: 'Afficher un indice', exact: true }).click();
  await expect(
    exercises.nth(0).getByRole('button', { name: 'Afficher un indice', exact: true })
  ).toHaveCount(0);
  await expect(page.getByText(/Exemple résolu consulté/)).toHaveCount(0);
  await exercises.nth(0).getByLabel('Ta réponse', { exact: true }).fill('incorrect');
  await exercises.nth(0).getByRole('button', { name: 'Vérifier ma réponse' }).click();
  await expect(page.getByText('Corrigé verrouillé', { exact: true })).toBeVisible();
  const responses = [
    '["10101100.00010000.00100000.00001111","11111111.11111111.11110000.00000000"]',
    '[4094,"172.16.32.1","172.16.47.254"]',
    '172.16.47.254'
  ];
  for (const [index, response] of responses.entries()) {
    await exercises.nth(index).getByLabel('Ta réponse', { exact: true }).fill(response);
    await exercises.nth(index).getByRole('button', { name: 'Vérifier ma réponse' }).click();
    if (index < 2) await expect(page.locator('.exercise-solution')).toHaveCount(0);
  }
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(3);
  await page.locator('.annale-resolution summary').first().click();
  await expect(
    page
      .locator('.annale-resolution')
      .first()
      .getByText(/172 se décompose/)
  ).toBeVisible();
  await page.reload();
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
});

test('2025 : pas de modèle ni de résolution après un essai SQL incorrect', async ({ page }) => {
  await page.goto('/#/annales/annale-2025-ecrit-guitares');
  await expect(page.getByText('Corrigé verrouillé', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(0);
  await page.locator('.python-editor textarea').first().fill('SELECT 0;');
  await page.getByRole('button', { name: 'Exécuter les tests', exact: true }).first().click();
  await expect(page.locator('.python-results').first()).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Attendu', exact: true })).toHaveCount(0);
  await expect(page.getByText('Corrigé verrouillé', { exact: true })).toBeVisible();
  await expect(page.locator('.annale-resolution')).toHaveCount(0);
});

test('2025 pratique : le vrai Python débloque les corrigés seulement après toutes les réussites', async ({
  page
}) => {
  await page.goto('/#/annales/annale-2025-pratique-graphes');
  const exercises = page.locator('.course-exercise');
  await expect(exercises).toHaveCount(3);
  await exercises.nth(0).getByLabel('Ta réponse', { exact: true }).fill('[2,3]');
  await exercises.nth(0).getByRole('button', { name: 'Vérifier ma réponse' }).click();
  const codes = [
    'def voisins_entrants(adj, x):\n    return [y for y in range(len(adj)) if x in adj[y]]',
    `def nombre_suivant(s):
    groupes = []
    i = 0
    while i < len(s):
        j = i + 1
        while j < len(s) and s[j] == s[i]:
            j += 1
        groupes.append(str(j-i) + s[i])
        i = j
    return ''.join(groupes)`
  ];
  for (const [index, code] of codes.entries()) {
    const exercise = exercises.nth(index + 1);
    await exercise.locator('.python-editor textarea').fill(code);
    await exercise.getByRole('button', { name: 'Exécuter les tests', exact: true }).click();
    await expect(exercise.locator('.course-status.done')).toBeVisible();
    if (index === 0) {
      await expect(page.locator('.exercise-solution')).toHaveCount(0);
      await expect(page.getByRole('columnheader', { name: 'Attendu', exact: true })).toHaveCount(0);
    }
  }
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
  await expect(page.locator('.exercise-solution')).toHaveCount(3);
  await expect(page.getByRole('columnheader', { name: 'Attendu', exact: true })).toHaveCount(2);
  await page.reload();
  await expect(page.getByText('Corrigé débloqué', { exact: true })).toBeVisible();
});

test('une annale ancienne propose les corrections, sans réussite automatique, et tient sur mobile', async ({
  page
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/#/annales/annale-2023-pratique-vote');
  await expect(page.locator('.exercise-solution')).toHaveCount(3);
  await page.locator('.exercise-solution summary').first().click();
  await expect(page.getByText('0 / 3 ateliers réussis', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true
  );
  await page.goto('/#/annales/inconnu');
  await expect(page.getByRole('heading', { name: 'Tutoriel introuvable' })).toBeVisible();
});

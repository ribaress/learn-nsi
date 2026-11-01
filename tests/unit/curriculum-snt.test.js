import { describe, it, expect } from 'vitest';

const expected = {
  programmation: ['programmer'],
  internet: ['ip-tcp', 'routage', 'fiabilite', 'dns', 'pair-a-pair', 'supports', 'trafic'],
  web: [
    'histoire-web',
    'droit',
    'hypertexte',
    'contenu-style',
    'modifier-html',
    'url',
    'https',
    'http',
    'client-serveur',
    'moteurs',
    'publication',
    'reglages',
    'navigation'
  ],
  reseaux: [
    'identite',
    'caracteristiques',
    'confidentialite-sociale',
    'revenus',
    'graphes',
    'petit-monde',
    'harcelement-droit',
    'cyberviolence'
  ],
  donnees: [
    'personnelle',
    'formats',
    'descripteurs',
    'valeurs',
    'open-data',
    'traitements',
    'metadonnees',
    'cloud',
    'synchronisation',
    'energie'
  ],
  cartographie: [
    'satellites',
    'couches',
    'osm',
    'nmea',
    'logiciel-itineraire',
    'graphe-itineraire',
    'position-privee'
  ],
  embarquee: ['controle', 'ihm', 'acquisition'],
  photographie: [
    'photosites',
    'exif',
    'transformer-image',
    'algorithmes-photo',
    'construction-image'
  ]
};

const load = async () => {
  let index, coverage;
  try {
    index = await import('../../src/content/courses/snt/index.js');
    coverage = await import('../../src/content/courses/snt/coverage.js');
  } catch {
    return { chapters: [], capabilities: [] };
  }
  return {
    chapters: await Promise.all(
      index.chapters.map(async (meta) => ({ meta, chapter: (await meta.load()).default }))
    ),
    capabilities: coverage.capabilities
  };
};

describe('parcours SNT conforme au contrat et aux capacités officielles', () => {
  it('valide les effets des commandes de l’IHM et pas seulement ses boutons', async () => {
    const { chapters } = await load();
    const exercice = chapters
      .flatMap(({ chapter }) => chapter.lessons)
      .find((l) => l.id === 'snt-ihm-objet')
      ?.exercises.find((e) => e.kind === 'web');
    expect(
      exercice?.checks.some((c) => c.text === 'allumée' && c.actions?.some((a) => a.click))
    ).toBe(true);
    expect(
      exercice?.checks.some((c) => c.text === 'éteinte' && c.actions?.some((a) => a.click))
    ).toBe(true);
  });
  it('explique aussi la neutralité du réseau, enjeu culturel associé à Internet', async () => {
    const { chapters } = await load();
    const internet = chapters.find(({ meta }) => meta.id === 'internet');
    expect(
      internet?.chapter.lessons.some((l) => l.sections.some((s) => /neutralité/i.test(s.title)))
    ).toBe(true);
  });
  it('recense indépendamment toutes les capacités et les relie à des leçons', async () => {
    const { chapters, capabilities } = await load();
    expect(chapters.map((c) => c.meta.id).sort()).toEqual(Object.keys(expected).sort());
    const ids = Object.values(expected)
      .flat()
      .map((id) => `snt-${id}`)
      .sort();
    expect(capabilities.map((c) => c.id).sort()).toEqual(ids);
    expect(new Set(capabilities.map((c) => c.id)).size).toBe(ids.length);
    const official = chapters.flatMap((c) => c.chapter.lessons.flatMap((l) => l.official));
    for (const cap of capabilities) {
      expect(cap.chapter).toBe(
        Object.entries(expected).find(([, v]) => v.includes(cap.id.slice(4)))[0]
      );
      expect(cap.page).toBeGreaterThan(0);
      expect(
        official.some((o) => o.id === cap.id && o.page === cap.page && o.label === cap.label),
        cap.id
      ).toBe(true);
    }
    for (const o of official) expect(ids).toContain(o.id);
  });
  it('fournit des contenus autonomes, des activités valides et des exercices progressifs', async () => {
    const { chapters } = await load();
    const lessons = chapters.flatMap((c) => c.chapter.lessons);
    expect(lessons.length).toBeGreaterThanOrEqual(24);
    expect(lessons.length).toBeLessThanOrEqual(28);
    expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
    const allowed = [
      'bits',
      'logic',
      'network',
      'graph',
      'map',
      'table',
      'sensor',
      'pixels',
      'sort',
      'search',
      'knn',
      'stack',
      'tree',
      'recursion',
      'process',
      'crypto',
      'dynamic',
      'text-search',
      'shell',
      'cpu',
      'trace',
      'web'
    ];
    for (const { meta, chapter } of chapters) {
      expect(chapter.id).toBe(meta.id);
      expect(meta.description.length).toBeGreaterThan(30);
      for (const l of chapter.lessons) {
        expect(l.duration).toBeTruthy();
        expect(l.prerequisites.length).toBeGreaterThan(0);
        expect(l.objectives.length).toBeGreaterThanOrEqual(2);
        expect(l.sections.length).toBeGreaterThanOrEqual(3);
        expect(l.sections.map((s) => s.text).join(' ').length, l.id).toBeGreaterThan(1000);
        expect(l.examples).toHaveLength(3);
        for (const ex of l.examples)
          for (const key of ['title', 'input', 'reasoning', 'result'])
            expect(ex[key].length, `${l.id}:${key}`).toBeGreaterThan(10);
        expect(allowed).toContain(l.activity.type);
        for (const key of ['prompt', 'prediction', 'explanation'])
          expect(l.activity[key].length).toBeGreaterThan(20);
        expect(l.activity.config).toBeTypeOf('object');
        expect(l.exercises).toHaveLength(3);
        expect(l.review).toHaveLength(3);
        expect(l.reflection.length).toBeGreaterThan(40);
        for (const ex of l.exercises) {
          expect(['answer', 'python', 'sql', 'web']).toContain(ex.kind);
          expect(ex.hints).toHaveLength(3);
          expect(new Set(ex.hints).size).toBe(3);
          for (const key of ['prompt', 'solution', 'explanation', 'feedbackWrong'])
            expect(ex[key].length, `${l.id}:${key}`).toBeGreaterThan(15);
          if (ex.kind === 'answer') expect(ex.answer).toBeTypeOf('string');
          if (ex.kind === 'python') {
            expect(ex.tests.length).toBeGreaterThanOrEqual(3);
            expect(ex.starter).toContain(`def ${ex.functionName}`);
          }
          if (ex.kind === 'web') {
            expect(ex.solution).toContain('<!doctype html>');
            expect(ex.checks.length).toBeGreaterThan(0);
          }
        }
      }
    }
    expect(
      lessons.flatMap((l) => l.exercises).filter((e) => e.kind === 'python').length
    ).toBeGreaterThanOrEqual(15);
    expect(lessons.some((l) => l.id === 'snt-reperes-historiques')).toBe(true);
  });
});

import { courseLessonComplete, missionComplete } from './progress.js';
import { missions } from '../content/missions.js';
const ranks = [
  ['Explorateur', 0],
  ['Apprenti', 100],
  ['Bâtisseur', 300],
  ['Résolveur', 700],
  ['Architecte', 1500],
  ['Expert en herbe', 3000],
  ['Créateur', 6000],
  ['Passeur de savoirs', 10000]
];
export function gameSummary(progress) {
  let xp = 0,
    successful = 0,
    autonomous = 0,
    finished = 0,
    projects = 0;
  const activeLevels = new Set();
  const count = (success) => {
    if (!['autonome', 'accompagne'].includes(success)) return;
    successful++;
    xp += success === 'autonome' ? 30 : 15;
    if (success === 'autonome') autonomous++;
  };
  for (const mission of missions) {
    for (const success of Object.values(progress.missions?.[mission.id]?.successes || {}))
      count(success);
    if (missionComplete(progress, mission.id)) {
      finished++;
      xp += 40;
    }
  }
  for (const [level, course] of Object.entries(progress.courses || {})) {
    for (const [id, lesson] of Object.entries(course.lessons || {})) {
      for (const exercise of Object.values(lesson.exercises || {})) {
        count(exercise.success);
        if (exercise.success) activeLevels.add(level);
      }
      if (courseLessonComplete(lesson, Object.keys(lesson.exercises || {}))) {
        finished++;
        const project = id.startsWith('projet-');
        if (project) projects++;
        xp += project ? 80 : 40;
      }
    }
  }
  const rankIndex = ranks.findLastIndex(([, minimum]) => xp >= minimum),
    rank = ranks[rankIndex],
    next = ranks[rankIndex + 1];
  const badges = [
    {
      id: 'premier-pas',
      title: 'Premier déclic',
      description: 'Réussir un exercice.',
      earned: successful >= 1
    },
    {
      id: 'premiere-lecon',
      title: 'Une étape de plus',
      description: 'Terminer une leçon ou une mission.',
      earned: finished >= 1
    },
    {
      id: 'cinq-autonomes',
      title: 'Je prends confiance',
      description: 'Réussir cinq exercices sans corrigé.',
      earned: autonomous >= 5
    },
    {
      id: 'dix-reussites',
      title: 'Collection d’idées',
      description: 'Réussir dix exercices.',
      earned: successful >= 10
    },
    {
      id: 'trois-niveaux',
      title: 'Esprit curieux',
      description: 'Réussir un exercice dans chacun des trois niveaux.',
      earned: activeLevels.size === 3
    },
    {
      id: 'premier-projet',
      title: 'Je construis',
      description: 'Terminer un projet de synthèse.',
      earned: projects >= 1
    }
  ];
  const target =
    successful < 1
      ? 1
      : successful < 5
        ? 5
        : successful < 10
          ? 10
          : Math.ceil((successful + 1) / 10) * 10;
  return {
    xp,
    successful,
    autonomous,
    finished,
    projects,
    badges,
    rank: rank[0],
    rankLevel: rankIndex + 1,
    next: next ? { title: next[0], xp: next[1] } : null,
    percent: next ? Math.min(100, ((xp - rank[1]) / (next[1] - rank[1])) * 100) : 100,
    quest: { target, done: successful, title: `Réussir ${target} exercice${target > 1 ? 's' : ''}` }
  };
}

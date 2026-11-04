import { missions } from '../content/missions.js';
export const STORAGE_KEY = 'atelier-nsi.progress.v1';
export const CONTENT_VERSION = '2026-11-programmes-complets';
const LEGACY_CONTENT_VERSION = '2026-10-chapitre-1';
const ids = missions.map((m) => m.id);
const criteria = ['but', 'donnees', 'etapes', 'test'];
export function freshProgress() {
  return {
    contentVersion: CONTENT_VERSION,
    lastMission: 'comprendre',
    missions: {},
    extensions: {},
    courses: {}
  };
}
export function freshMission() {
  return {
    step: 0,
    round: 0,
    successes: {},
    hints: {},
    reflection: '',
    selfReview: [],
    codeByTask: {},
    activity: {},
    modelSeen: false
  };
}
export function appendTest(history, test) {
  history.push(test);
  // Keep attempts unlimited while ensuring the portable file stays readable.
  if (history.length > 100) history.splice(0, history.length - 100);
}
export function recordSuccess(p, id, round, helped) {
  const m = (p.missions[id] ||= freshMission());
  m.successes ||= {};
  if (!m.successes[round]) m.successes[round] = helped ? 'accompagne' : 'autonome';
}
export function activityComplete(p, id) {
  const m = missions.find((m) => m.id === id);
  return Array.from({ length: m.rounds }, (_, i) => i).every((i) =>
    Boolean(p.missions[id]?.successes?.[i])
  );
}
export function reflectionComplete(entry) {
  return criteria.every((c) => entry?.selfReview?.includes(c));
}
export function missionComplete(p, id) {
  return activityComplete(p, id) && reflectionComplete(p.missions[id]);
}
export function getBadges(p) {
  const badges = [];
  if (activityComplete(p, 'decomposer')) badges.push('decomposer');
  if (activityComplete(p, 'prevoir')) badges.push('prevoir');
  if (activityComplete(p, 'tester')) badges.push('tester');
  if (Object.values(p.missions).some(reflectionComplete)) badges.push('expliquer');
  return badges;
}
export function createExport(progress) {
  return {
    formatVersion: 2,
    contentVersion: CONTENT_VERSION,
    exportedAt: new Date().toISOString(),
    progress: JSON.parse(JSON.stringify(progress))
  };
}
const plain = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype;
const fail = () => {
  throw new Error(
    'Ce fichier n’est pas une sauvegarde compatible d’Atelier NSI. Ton travail actuel est conservé.'
  );
};
function safeData(value, depth = 0) {
  if (depth > 14) return false;
  if (typeof value === 'string') return value.length <= 100000;
  if (typeof value === 'number') return Number.isFinite(value) && Math.abs(value) <= 100000;
  if (value === null || typeof value === 'boolean') return true;
  if (Array.isArray(value))
    return value.length <= 500 && value.every((v) => safeData(v, depth + 1));
  return (
    plain(value) &&
    Object.keys(value).length <= 100 &&
    Object.entries(value).every(
      ([k, v]) => !['__proto__', 'constructor', 'prototype'].includes(k) && safeData(v, depth + 1)
    )
  );
}
function validActivity(activity, missionId) {
  if (!plain(activity) || !safeData(activity)) return false;
  for (const [round, a] of Object.entries(activity)) {
    if (!plain(a)) return false;
    if (
      a.codeCursor !== undefined &&
      (!Number.isInteger(a.codeCursor) || a.codeCursor < 0 || a.codeCursor > 1000)
    )
      return false;
    if (a.packing !== undefined) {
      const n = round === '0' ? 13 : round === '1' ? 19 : null;
      const capacity = round === '0' ? 6 : 5;
      const p = a.packing;
      if (
        missionId !== 'comprendre' ||
        n === null ||
        !plain(p) ||
        !Number.isInteger(p.boxCount) ||
        p.boxCount < 0 ||
        p.boxCount > n ||
        !Array.isArray(p.locations) ||
        p.locations.length !== n
      )
        return false;
      if (
        !p.locations.every(
          (box) => box === null || (Number.isInteger(box) && box >= 0 && box < p.boxCount)
        )
      )
        return false;
      for (let box = 0; box < p.boxCount; box++)
        if (p.locations.filter((location) => location === box).length > capacity) return false;
    }
    for (const key of ['selected', 'instructions', 'order', 'tested', 'predicted'])
      if (key in a && !Array.isArray(a[key])) return false;
    if (
      a.predicted &&
      (!a.predicted.every((i) => Number.isInteger(i) && i >= 1 && i <= 3) ||
        new Set(a.predicted).size !== a.predicted.length)
    )
      return false;
    for (const key of ['selected', 'instructions', 'order'])
      if (a[key] && !a[key].every((v) => typeof v === 'string')) return false;
    if (
      a.instructions &&
      (a.instructions.length > 128 ||
        !a.instructions.every((v) => ['up', 'down', 'left', 'right'].includes(v)))
    )
      return false;
    if (
      a.order &&
      (a.order.length !== 5 ||
        new Set(a.order).size !== 5 ||
        !a.order.every((v) => ['count', 'capacity', 'plan', 'pack', 'check'].includes(v)))
    )
      return false;
    if (
      a.groups &&
      (!plain(a.groups) ||
        !Object.values(a.groups).every((v) => ['', 'data', 'organise', 'control'].includes(v)))
    )
      return false;
    if (a.index !== undefined && (!Number.isInteger(a.index) || a.index < 0 || a.index > 100))
      return false;
    for (const key of ['expected', 'predictionRemaining', 'predictionBoxes', 'testBooks'])
      if (key in a && !['string', 'number'].includes(typeof a[key])) return false;
    if (
      a.tested &&
      !a.tested.every(
        (t) =>
          plain(t) &&
          Number.isInteger(t.n) &&
          Number.isInteger(t.expected) &&
          Number.isInteger(t.actual) &&
          typeof t.correct === 'boolean'
      )
    )
      return false;
  }
  return true;
}
export function parseExport(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    fail();
  }
  if (!plain(data)) fail();
  const legacy = data.formatVersion === 1 && data.contentVersion === LEGACY_CONTENT_VERSION;
  if (!legacy && (data.formatVersion !== 2 || data.contentVersion !== CONTENT_VERSION)) fail();
  const p = data.progress;
  if (
    !plain(p) ||
    p.contentVersion !== (legacy ? LEGACY_CONTENT_VERSION : CONTENT_VERSION) ||
    !ids.includes(p.lastMission) ||
    !plain(p.missions) ||
    !plain(p.extensions) ||
    !safeData(p.extensions)
  )
    fail();
  if (legacy) {
    p.contentVersion = CONTENT_VERSION;
    p.courses = {};
    data.contentVersion = CONTENT_VERSION;
    data.formatVersion = 2;
  }
  if (!validCourses(p.courses)) fail();
  for (const [id, extension] of Object.entries(p.extensions)) {
    if (
      !['premiere', 'terminale'].includes(id) ||
      !plain(extension) ||
      typeof extension.code !== 'string' ||
      typeof extension.reflection !== 'string' ||
      typeof extension.modelSeen !== 'boolean' ||
      typeof extension.success !== 'boolean'
    )
      fail();
  }
  for (const [id, m] of Object.entries(p.missions)) {
    if (!ids.includes(id) || !plain(m) || !safeData(m)) fail();
    if (m.step !== undefined && (!Number.isInteger(m.step) || m.step < 0 || m.step > 3)) fail();
    if (
      m.round !== undefined &&
      (!Number.isInteger(m.round) ||
        m.round < 0 ||
        m.round >= missions.find((v) => v.id === id).rounds)
    )
      fail();
    if (m.code !== undefined && typeof m.code !== 'string') fail();
    if (m.reflection !== undefined && typeof m.reflection !== 'string') fail();
    if (m.modelSeen !== undefined && typeof m.modelSeen !== 'boolean') fail();
    if (m.discoveryAnswer !== undefined && typeof m.discoveryAnswer !== 'string') fail();
    if (m.oralExplanation !== undefined && typeof m.oralExplanation !== 'boolean') fail();
    if (
      m.selfReview !== undefined &&
      (!Array.isArray(m.selfReview) || !m.selfReview.every((c) => criteria.includes(c)))
    )
      fail();
    if (
      m.successes !== undefined &&
      (!plain(m.successes) ||
        !Object.entries(m.successes).every(
          ([r, v]) =>
            /^[0-2]$/.test(r) &&
            Number(r) < missions.find((v) => v.id === id).rounds &&
            ['autonome', 'accompagne'].includes(v)
        ))
    )
      fail();
    if (
      m.hints !== undefined &&
      (!plain(m.hints) ||
        !Object.entries(m.hints).every(
          ([r, v]) => /^[0-2]$/.test(r) && Number.isInteger(v) && v >= 0 && v <= 3
        ))
    )
      fail();
    if (
      m.codeByTask !== undefined &&
      (!plain(m.codeByTask) ||
        !Object.entries(m.codeByTask).every(([r, v]) => /^[0-2]$/.test(r) && typeof v === 'string'))
    )
      fail();
    if (m.activity !== undefined && !validActivity(m.activity, id)) fail();
  }
  return data;
}

export function freshCourseLesson() {
  return {
    exercises: {},
    discoveryAnswer: '',
    reflection: '',
    selfReview: [],
    activity: {},
    step: 0
  };
}
export function courseLessonComplete(entry, exerciseIds) {
  return Boolean(
    entry &&
    (exerciseIds.length === 3 ||
      (entry.requiredExerciseIds?.length > 0 &&
        exerciseIds.length === entry.requiredExerciseIds.length &&
        exerciseIds.every(id => entry.requiredExerciseIds.includes(id)))) &&
    exerciseIds.every((id) =>
      ['autonome', 'accompagne'].includes(entry.exercises?.[id]?.success)
    ) &&
    [0, 1, 2].every((id) => entry.selfReview?.includes(id))
  );
}
function validCourses(courses) {
  const slug = (id) => /^[a-z0-9][a-z0-9._-]{0,100}$/.test(id);
  if (!plain(courses) || !safeData(courses)) return false;
  for (const [level, course] of Object.entries(courses)) {
    if (
      !['snt', 'premiere', 'terminale'].includes(level) ||
      !plain(course) ||
      !plain(course.lessons)
    )
      return false;
    if (
      course.lastLesson !== undefined &&
      (!plain(course.lastLesson) ||
        !slug(course.lastLesson.chapter) ||
        !slug(course.lastLesson.lesson))
    )
      return false;
    for (const [id, lesson] of Object.entries(course.lessons)) {
      if (
        !slug(id) ||
        !plain(lesson) ||
        !plain(lesson.exercises) ||
        typeof lesson.reflection !== 'string' ||
        !Array.isArray(lesson.selfReview) ||
        !lesson.selfReview.every((n) => [0, 1, 2].includes(n)) ||
        !validCourseActivity(lesson.activity) ||
        !Number.isInteger(lesson.step) ||
        lesson.step < 0 ||
        lesson.step > 3
      )
        return false;
      if (lesson.discoveryAnswer !== undefined && typeof lesson.discoveryAnswer !== 'string')
        return false;
      if (lesson.requiredExerciseIds !== undefined &&
        (!Array.isArray(lesson.requiredExerciseIds) || !lesson.requiredExerciseIds.length ||
          new Set(lesson.requiredExerciseIds).size !== lesson.requiredExerciseIds.length ||
          !lesson.requiredExerciseIds.every(slug))) return false;
      if (
        lesson.readingChecks !== undefined &&
        (!plain(lesson.readingChecks) ||
          !Object.entries(lesson.readingChecks).every(
            ([key, value]) =>
              /^\d+$/.test(key) &&
              plain(value) &&
              typeof value.answer === 'string' &&
              typeof value.submitted === 'boolean'
          ))
      )
        return false;
      if (
        lesson.readingActivities !== undefined &&
        (!plain(lesson.readingActivities) ||
          !Object.entries(lesson.readingActivities).every(
            ([key, value]) => /^\d+$/.test(key) && validCourseActivity(value)
          ))
      )
        return false;
      for (const [exerciseId, exercise] of Object.entries(lesson.exercises)) {
        if (!slug(exerciseId) || !plain(exercise)) return false;
        if (
          exercise.success !== undefined &&
          ![false, 'autonome', 'accompagne'].includes(exercise.success)
        )
          return false;
        if (
          exercise.hints !== undefined &&
          (!Number.isInteger(exercise.hints) || exercise.hints < 0 || exercise.hints > 3)
        )
          return false;
        if (exercise.modelSeen !== undefined && typeof exercise.modelSeen !== 'boolean')
          return false;
        if (exercise.attempted !== undefined && typeof exercise.attempted !== 'boolean')
          return false;
        if (
          exercise.attempts !== undefined &&
          (!Number.isInteger(exercise.attempts) ||
            exercise.attempts < 0 ||
            exercise.attempts > 10000)
        )
          return false;
        for (const field of ['answer', 'code', 'draft'])
          if (exercise[field] !== undefined && typeof exercise[field] !== 'string') return false;
        if (
          exercise.files !== undefined &&
          (!plain(exercise.files) ||
            !Object.values(exercise.files).every((text) => typeof text === 'string'))
        )
          return false;
      }
    }
  }
  return true;
}
function validCourseActivity(activity) {
  if (!plain(activity)) return false;
  for (const field of [
    'prediction',
    'explanation',
    'html',
    'valuesText',
    'text',
    'pattern',
    'message',
    'messageText',
    'filterText',
    'cwd'
  ])
    if (activity[field] !== undefined && typeof activity[field] !== 'string') return false;
  for (const field of ['observed', 'a', 'b'])
    if (activity[field] !== undefined && typeof activity[field] !== 'boolean') return false;
  for (const field of ['number', 'value', 'temperature', 'threshold', 'x', 'y', 'shift', 'k'])
    if (
      activity[field] !== undefined &&
      (typeof activity[field] !== 'number' || !Number.isFinite(activity[field]))
    )
      return false;
  for (const field of ['cursor', 'cryptoStep'])
    if (
      activity[field] !== undefined &&
      (!Number.isInteger(activity[field]) || activity[field] < 0 || activity[field] > 5000)
    )
      return false;
  if (
    activity.color !== undefined &&
    (!Array.isArray(activity.color) ||
      activity.color.length !== 3 ||
      !activity.color.every((c) => Number.isInteger(c) && c >= 0 && c <= 255))
  )
    return false;
  if (
    activity.path !== undefined &&
    (!Array.isArray(activity.path) || !activity.path.every((id) => typeof id === 'string'))
  )
    return false;
  if (
    activity.items !== undefined &&
    (!Array.isArray(activity.items) ||
      !activity.items.every((item) => ['string', 'number'].includes(typeof item)))
  )
    return false;
  if (
    activity.shellFiles !== undefined &&
    (!plain(activity.shellFiles) ||
      !Object.values(activity.shellFiles).every((v) => v === null || typeof v === 'string'))
  )
    return false;
  if (
    activity.permissions !== undefined &&
    (!plain(activity.permissions) ||
      !Object.values(activity.permissions).every((v) => /^[0-7]{3}$/.test(v)))
  )
    return false;
  if (
    activity.locks !== undefined &&
    (!plain(activity.locks) ||
      !Object.entries(activity.locks).every(
        ([key, value]) => ['A', 'B'].includes(key) && ['P1', 'P2'].includes(value)
      ))
  )
    return false;
  if (
    activity.waiting !== undefined &&
    (!plain(activity.waiting) ||
      !Object.entries(activity.waiting).every(
        ([key, value]) => ['P1', 'P2'].includes(key) && ['A', 'B'].includes(value)
      ))
  )
    return false;
  return true;
}

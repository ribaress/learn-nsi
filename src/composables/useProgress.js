import { reactive, computed, watch } from 'vue';
import {
  freshProgress,
  freshMission,
  STORAGE_KEY,
  createExport,
  parseExport,
  recordSuccess,
  missionComplete,
  getBadges
} from '../domain/progress.js';
import { missions } from '../content/missions.js';
const storage = reactive({ available: true, message: '' });
function read() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseExport(saved).progress : freshProgress();
  } catch {
    storage.message =
      'La sauvegarde locale n’est pas accessible ou n’a pas pu être lue. Tu peux continuer et exporter ton travail.';
    storage.available = false;
    return freshProgress();
  }
}
const progress = reactive(read());
watch(
  progress,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(createExport(progress)));
    } catch {
      storage.available = false;
      storage.message =
        'La sauvegarde locale est indisponible. Pense à exporter ton travail avant de fermer cette page.';
    }
  },
  { deep: true, flush: 'sync' }
);
export function useProgress() {
  const entry = (id) => {
    if (!progress.missions[id]) progress.missions[id] = freshMission();
    const value = progress.missions[id];
    for (const [key, defaultValue] of Object.entries(freshMission()))
      if (value[key] === undefined) value[key] = defaultValue;
    return value;
  };
  const success = (id, round) =>
    recordSuccess(progress, id, round, (entry(id).hints[round] || 0) >= 3);
  const complete = (id) => missionComplete(progress, id);
  const completed = computed(() => missions.filter((m) => complete(m.id)).length);
  const badges = computed(() => getBadges(progress));
  function replace(next) {
    for (const key of Object.keys(progress)) if (!(key in next)) delete progress[key];
    Object.assign(progress, next);
  }
  return {
    progress,
    storage,
    entry,
    success,
    complete,
    completed,
    badges,
    replace,
    reset: () => replace(freshProgress())
  };
}

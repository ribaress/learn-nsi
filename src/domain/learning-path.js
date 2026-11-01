const answered = (value) => typeof value === 'string' && value.trim().length > 0;
export const exerciseAttempted = (entry) => Boolean(entry?.attempted || entry?.success);
export function unlockedStep(entry, exerciseIds) {
  if (!entry) return 0;
  const priorWork = exerciseIds.some((id) => exerciseAttempted(entry.exercises?.[id]));
  if (!answered(entry.discoveryAnswer) && !priorWork) return 0;
  const activity = entry.activity || {};
  if (
    !priorWork &&
    !(answered(activity.prediction) && activity.observed && answered(activity.explanation))
  )
    return 1;
  if (!exerciseIds.every((id) => exerciseAttempted(entry.exercises?.[id]))) return 2;
  return 3;
}
export function unlockedMissionStep(entry, rounds) {
  if (!entry) return 0;
  const priorWork = Object.values(entry.successes || {}).some(Boolean);
  if (!answered(entry.discoveryAnswer) && !priorWork) return 0;
  if (!Array.from({ length: rounds }, (_, i) => entry.successes?.[i]).every(Boolean)) return 1;
  if (!answered(entry.reflection) && !entry.oralExplanation) return 2;
  return 3;
}

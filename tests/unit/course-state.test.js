import { it, expect } from 'vitest';
import { watchEffect, nextTick } from 'vue';
import { useCourses } from '../../src/composables/useCourses.js';
import { useProgress } from '../../src/composables/useProgress.js';

it('actualise immédiatement le premier indice et remet aussi les cours à zéro', async () => {
  const { reset, progress } = useProgress();
  reset();
  const { exerciseEntry } = useCourses('snt');
  const state = exerciseEntry('snt-essai', 'ex1');
  let rendered = -1;
  const stop = watchEffect(() => {
    rendered = state.hints;
  });
  state.hints = 1;
  await nextTick();
  expect(rendered).toBe(1);
  expect(progress.courses.snt.lessons['snt-essai'].exercises.ex1.hints).toBe(1);
  reset();
  expect(progress.courses).toEqual({});
  stop();
});

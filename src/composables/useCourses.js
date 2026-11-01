import { computed } from 'vue';
import { useProgress } from './useProgress.js';
import { freshCourseLesson, courseLessonComplete } from '../domain/progress.js';
export function useCourses(level) {
  const { progress } = useProgress();
  const course = computed(() => {
    const id = typeof level === 'string' ? level : level.value;
    if (!progress.courses[id]) progress.courses[id] = { lessons: {} };
    return progress.courses[id];
  });
  const entry = (id) => {
    if (!course.value.lessons[id]) course.value.lessons[id] = freshCourseLesson();
    return course.value.lessons[id];
  };
  const exerciseEntry = (lesson, id, starter = '', files = {}) => {
    const current = entry(lesson);
    if (!current.exercises[id])
      current.exercises[id] = {
        answer: '',
        code: starter,
        files: { ...files },
        hints: 0,
        modelSeen: false,
        success: false
      };
    return current.exercises[id];
  };
  const remember = (chapter, lesson) => {
    course.value.lastLesson = { chapter, lesson };
  };
  const complete = (lesson) =>
    courseLessonComplete(
      course.value.lessons[lesson.id],
      lesson.exercises.map((e) => e.id)
    );
  return { course, entry, exerciseEntry, remember, complete };
}

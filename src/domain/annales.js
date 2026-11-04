export function annaleSolved(tutorial, entry) {
  return Boolean(
    tutorial.exercises.length > 0 &&
    tutorial.exercises.every((exercise) =>
      ['autonome', 'accompagne'].includes(entry?.exercises?.[exercise.id]?.success)
    )
  );
}

export function correctionAvailable(tutorial, entry, sectionId) {
  if (sectionId) {
    const section = tutorial.sections?.find(item => item.id === sectionId);
    return Boolean(section && (tutorial.year < 2025 || annaleSolved(section, entry)));
  }
  return tutorial.year < 2025 || annaleSolved(tutorial, entry);
}

export function filterAnnales(
  entries,
  { year = '', format = '', centre = '', group = '', search = '' } = {}
) {
  const normalize = (text) =>
    String(text)
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase('fr');
  const query = normalize(search.trim());
  return entries.filter(
    (entry) =>
      (!year || String(entry.year) === String(year)) &&
      (!format || entry.format === format) &&
      (!centre || entry.centre === centre) &&
      (!group || String(entry.group) === String(group)) &&
      (!query ||
        normalize(
          [entry.title, entry.reference, entry.session || '', ...entry.themes].join(' ')
        ).includes(query))
  );
}

export function boxCount(n, capacity) {
  if (!Number.isSafeInteger(n) || n < 0 || !Number.isSafeInteger(capacity) || capacity <= 0)
    throw new Error(
      'Utilise un nombre entier positif ou nul et une capacité strictement positive.'
    );
  return Math.ceil(n / capacity);
}
export function packingTrace(n, capacity) {
  boxCount(n, capacity);
  if (n > 1000) throw new Error('Cette simulation accepte au maximum 1 000 objets.');
  const states = [{ remaining: n, boxes: 0, moved: 0 }];
  while (n > 0) {
    const moved = Math.min(n, capacity);
    n -= moved;
    states.push({ remaining: n, boxes: states.length, moved });
  }
  return states;
}
export function robotResult(instructions, target = [3, 3]) {
  let x = 0,
    y = 0;
  const path = [[0, 0]],
    moves = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] };
  for (const direction of instructions) {
    if (!moves[direction]) return { success: false, reason: 'instruction', path, x, y };
    const [dx, dy] = moves[direction];
    const nx = x + dx,
      ny = y + dy;
    if (nx < 0 || ny < 0 || nx > 3 || ny > 3)
      return { success: false, reason: 'outside', path, x, y };
    if (nx === 1 && ny === 1) return { success: false, reason: 'obstacle', path, x, y };
    x = nx;
    y = ny;
    path.push([x, y]);
  }
  return { success: x === target[0] && y === target[1], reason: 'end', path, x, y };
}
export function validDecomposition(order) {
  if (!Array.isArray(order) || order.length !== 5 || new Set(order).size !== 5) return false;
  const pos = (id) => order.indexOf(id);
  return (
    ['count', 'capacity', 'plan', 'pack', 'check'].every((id) => pos(id) >= 0) &&
    pos('count') < pos('plan') &&
    pos('capacity') < pos('plan') &&
    pos('plan') < pos('pack') &&
    pos('pack') < pos('check')
  );
}
export function counterexample(n, capacity, expected) {
  try {
    return boxCount(n, capacity) === expected && Math.floor(n / capacity) !== expected;
  } catch {
    return false;
  }
}
export function checkUnderstanding(selected, expected, n, capacity) {
  return (
    selected.length === 2 &&
    selected.includes('books') &&
    selected.includes('capacity') &&
    Number(expected) === boxCount(n, capacity) &&
    String(expected).trim() !== ''
  );
}

/** Each index is one book; a location is either a box index or null (on the table). */
export function createPacking(n) {
  boxCount(n, 1);
  if (n > 100) throw new Error('L’atelier accepte au maximum 100 livres.');
  return { boxCount: n === 0 ? 0 : 1, locations: Array(n).fill(null) };
}

export function placeBook(packing, book, box, capacity) {
  const valid =
    Number.isInteger(book) &&
    book >= 0 &&
    book < packing.locations.length &&
    Number.isInteger(box) &&
    box >= 0 &&
    box < packing.boxCount &&
    Number.isInteger(capacity) &&
    capacity > 0;
  if (!valid) return { ok: false, packing, message: 'Choisis un livre et une boîte disponibles.' };
  if (packing.locations[book] !== null)
    return {
      ok: false,
      packing,
      message: 'Ce livre est déjà rangé. Retire-le de sa boîte pour le déplacer.'
    };
  const count = packing.locations.filter((location) => location === box).length;
  if (count >= capacity)
    return {
      ok: false,
      packing,
      message: `La boîte ${box + 1} est pleine (${capacity} / ${capacity}). Ajoute une autre boîte ou retire un livre avant d’en placer un nouveau.`
    };
  const locations = packing.locations.slice();
  locations[book] = box;
  return {
    ok: true,
    packing: { ...packing, locations },
    message: `Le livre ${book + 1} est rangé dans la boîte ${box + 1}.`
  };
}

export function removePackedBook(packing, book) {
  if (!Number.isInteger(book) || book < 0 || book >= packing.locations.length) return packing;
  const locations = packing.locations.slice();
  locations[book] = null;
  return { ...packing, locations };
}

export function removePackingBox(packing, box) {
  if (!Number.isInteger(box) || box < 0 || box >= packing.boxCount) return { ok: false, packing };
  if (packing.locations.includes(box))
    return {
      ok: false,
      packing,
      message: 'Retire les livres de cette boîte avant de la supprimer.'
    };
  return {
    ok: true,
    packing: {
      boxCount: packing.boxCount - 1,
      locations: packing.locations.map((location) =>
        location !== null && location > box ? location - 1 : location
      )
    }
  };
}

const countLabel = (n, word) => `${n} ${word}${n > 1 ? 's' : ''}`;
const answer = (code, message) => ({ code, message, success: code === 'correct' });
export function understandingFeedback(selected, expected, n, capacity) {
  if (selected.some((id) => !['books', 'capacity'].includes(id)))
    return answer(
      'irrelevant',
      'La couleur des couvertures est un détail : change-t-elle la place disponible dans une boîte ? Garde seulement les informations nécessaires au calcul.'
    );
  if (!selected.includes('books'))
    return answer(
      'missing-books',
      'Sans le nombre de livres, peut-on savoir combien de boîtes préparer ? Repère cette donnée dans l’énoncé.'
    );
  if (!selected.includes('capacity'))
    return answer(
      'missing-capacity',
      'Tu connais les livres à ranger. Il manque encore la capacité : combien de livres une boîte peut-elle contenir au maximum ?'
    );
  const boxes = Number(expected);
  if (String(expected).trim() === '' || !Number.isSafeInteger(boxes) || boxes < 0)
    return answer(
      'invalid',
      'Écris un nombre entier de boîtes, positif ou nul. Une partie de boîte ne suffit pas pour ranger un livre.'
    );
  const places = boxes * capacity;
  if (places < n)
    return answer(
      'shortage',
      `${countLabel(boxes, 'boîte')} ${boxes > 1 ? 'offrent' : 'offre'} ${countLabel(places, 'place')}. Tu as ${countLabel(n, 'livre')} : il reste ${countLabel(n - places, 'livre')} sans place. Où peux-tu ${n - places > 1 ? 'les' : 'le'} ranger ?`
    );
  if (boxes > boxCount(n, capacity)) {
    if (n === 0)
      return answer(
        'excess',
        'Il n’y a aucun livre à ranger. As-tu besoin de préparer une boîte vide ?'
      );
    return answer(
      'excess',
      `${countLabel(boxes, 'boîte')} ${boxes > 1 ? 'offrent' : 'offre'} ${countLabel(places, 'place')}. Une boîte de moins offrirait encore ${countLabel((boxes - 1) * capacity, 'place')} : est-ce suffisant pour ${countLabel(n, 'livre')} ? On cherche le minimum.`
    );
  }
  return answer(
    'correct',
    `Bien vu ! Tu as repéré les deux données utiles. ${countLabel(boxes, 'boîte')} ${boxes > 1 ? 'offrent' : 'offre'} ${countLabel(places, 'place')} pour ${countLabel(n, 'livre')} : toutes les boîtes sont utiles, même si la dernière n’est pas pleine.`
  );
}

export function predictionFeedback(state, capacity, remainingAnswer, boxesAnswer) {
  const remaining = Number(remainingAnswer),
    boxes = Number(boxesAnswer);
  if (
    [remainingAnswer, boxesAnswer].some((value) => String(value).trim() === '') ||
    !Number.isSafeInteger(remaining) ||
    !Number.isSafeInteger(boxes) ||
    remaining < 0 ||
    boxes < 0
  )
    return answer(
      'invalid',
      'Écris deux nombres entiers positifs ou nuls : les livres restants et les boîtes utilisées après ce tour.'
    );
  const moved = Math.min(state.remaining, capacity),
    wanted = state.remaining - moved;
  if (remaining !== wanted) {
    if (state.remaining < capacity)
      return answer(
        'last-box',
        `Il reste seulement ${countLabel(state.remaining, 'livre')} avant ce tour. Les ${capacity} places sont un maximum : on range ${state.remaining === 1 ? 'ce dernier livre' : 'ces derniers livres'}, sans en inventer. Que reste-t-il après ?`
      );
    return answer(
      'remaining',
      `Au début du tour, il reste ${countLabel(state.remaining, 'livre')}. Cette boîte peut en recevoir ${capacity} au maximum. Retire ${moved} de ${state.remaining} : combien en reste-t-il ?`
    );
  }
  if (boxes !== state.boxes + 1)
    return answer(
      'counter',
      `Le nombre de livres restants est juste. Une nouvelle boîte vient d’être utilisée : le compteur ${state.boxes} doit augmenter de 1, même si cette boîte n’est pas pleine.`
    );
  return answer(
    'correct',
    `Bien vu ! Tu ranges ${countLabel(moved, 'livre')} ; il en reste ${remaining}. Le compteur passe de ${state.boxes} à ${boxes}.`
  );
}

/** Prepared execution of the displayed Python, independent of the free Python editor. */
export function packingExecution(n, capacity) {
  boxCount(n, capacity);
  if (n > 1000) throw new Error('Cette simulation accepte au maximum 1 000 livres.');
  let remaining = null,
    boxes = null,
    moved = null;
  const frames = [];
  const snapshot = (line, message, condition = null) =>
    frames.push({ line, remaining, boxes, moved, condition, message });
  snapshot(
    0,
    'Avant de commencer : les paramètres sont connus, les variables du calcul ne sont pas encore initialisées.'
  );
  remaining = n;
  snapshot(1, `La variable restants reçoit ${n}, le nombre de livres au départ.`);
  boxes = 0;
  snapshot(2, 'Le compteur boites commence à 0. Aucun rangement n’a encore été effectué.');
  while (true) {
    const condition = remaining > 0;
    snapshot(
      3,
      `${remaining} > 0 est ${condition ? 'vrai : on entre dans la boucle.' : 'faux : on sort de la boucle.'}`,
      condition
    );
    if (!condition) break;
    moved = Math.min(remaining, capacity);
    snapshot(
      4,
      `Le minimum entre ${remaining} livres restants et ${capacity} places est ${moved}. C’est le nombre de livres à ranger ce tour.`
    );
    remaining -= moved;
    snapshot(
      5,
      `On retire ${moved} livres : il en reste ${remaining}. Le compteur de boîtes sera mis à jour à la ligne suivante.`
    );
    boxes++;
    snapshot(6, `Une boîte de plus est utilisée. Le compteur vaut maintenant ${boxes}.`);
  }
  snapshot(7, `La fonction renvoie ${boxes}. Tous les livres sont rangés.`);
  return frames;
}

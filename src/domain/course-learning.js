// Fonctions pures : mêmes calculs pour la manipulation et pour les tests.
export function equalResult(actual, expected) {
  if (actual === expected) return true;
  if (!actual || !expected || typeof actual !== typeof expected) return false;
  if (Array.isArray(actual) !== Array.isArray(expected)) return false;
  if (Array.isArray(actual))
    return actual.length === expected.length && actual.every((v, i) => equalResult(v, expected[i]));
  if (typeof actual === 'object') {
    const keys = Object.keys(actual);
    return (
      keys.length === Object.keys(expected).length &&
      keys.every((k) => Object.hasOwn(expected, k) && equalResult(actual[k], expected[k]))
    );
  }
  return false;
}
export function checkAnswer(exercise, answer) {
  const normalize = (value) =>
    String(value).normalize('NFKC').trim().toLocaleLowerCase('fr').replace(/\s+/g, ' ');
  if (!normalize(answer)) return false;
  return [exercise.answer, ...(exercise.accepted || [])].some((expected) => {
    if (normalize(answer) === normalize(expected)) return true;
    try {
      return equalResult(JSON.parse(String(answer)), JSON.parse(String(expected)));
    } catch {
      return false;
    }
  });
}
export function sortFrames(input, algorithm = 'insertion') {
  const values = [...input];
  const frames = [
    { values: [...values], explanation: 'Voici les valeurs avant le tri.', active: [] }
  ];
  const add = (explanation, active = []) =>
    frames.push({ values: [...values], explanation, active });
  if (algorithm === 'selection') {
    for (let i = 0; i < values.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < values.length; j++) {
        if (values[j] < values[min]) min = j;
        add(`Je cherche le minimum dans la partie non triée : ${values[min]}.`, [min, j]);
      }
      [values[i], values[min]] = [values[min], values[i]];
      add(`Je place ${values[i]} à l’indice ${i}.`, [i]);
    }
  } else if (algorithm === 'merge') {
    function merge(lo, hi) {
      if (hi - lo < 2) return;
      const mid = Math.floor((lo + hi) / 2);
      merge(lo, mid);
      merge(mid, hi);
      const left = values.slice(lo, mid),
        right = values.slice(mid, hi);
      let i = 0,
        j = 0;
      for (let k = lo; k < hi; k++) {
        values[k] =
          j >= right.length || (i < left.length && left[i] <= right[j]) ? left[i++] : right[j++];
        add(`Je fusionne les deux parties triées ; j’écris ${values[k]} à l’indice ${k}.`, [k]);
      }
    }
    merge(0, values.length);
  } else {
    for (let i = 1; i < values.length; i++) {
      const value = values[i];
      let j = i - 1;
      add(`Je prends ${value} pour l’insérer dans la partie gauche déjà triée.`, [i]);
      while (j >= 0 && values[j] > value) {
        values[j + 1] = values[j];
        add(`Je décale ${values[j]} vers la droite.`, [j, j + 1]);
        j--;
      }
      values[j + 1] = value;
      add(`J’insère ${value} à l’indice ${j + 1}.`, [j + 1]);
    }
  }
  add('Le tableau est trié. Chaque valeur est inférieure ou égale à la suivante.');
  return frames;
}
export function searchFrames(values, target) {
  let lo = 0,
    hi = values.length - 1;
  const frames = [
    { values: [...values], active: [], explanation: 'La dichotomie exige un tableau trié.', lo, hi }
  ];
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    frames.push({
      values: [...values],
      active: [mid],
      lo,
      hi,
      explanation: `Je compare ${target} à la valeur ${values[mid]} à l’indice ${mid}.`
    });
    if (values[mid] === target) {
      frames.push({
        values: [...values],
        active: [mid],
        found: mid,
        explanation: `Trouvé à l’indice ${mid}.`
      });
      return frames;
    }
    if (values[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  frames.push({
    values: [...values],
    active: [],
    found: -1,
    explanation: 'L’intervalle de recherche est vide : la valeur est absente.'
  });
  return frames;
}
export function routePath(config, weighted = false) {
  const distances = new Map([[config.start, 0]]),
    previous = new Map(),
    visited = new Set();
  const nodes = config.nodes.map((n) => n.id);
  while (true) {
    const current = nodes
      .filter((n) => !visited.has(n) && distances.has(n))
      .sort((a, b) => distances.get(a) - distances.get(b))[0];
    if (current === undefined) return [];
    if (current === config.goal) break;
    visited.add(current);
    for (const [a, b, w = 1] of config.edges) {
      const neighbor = a === current ? b : b === current ? a : null;
      if (neighbor === null) continue;
      const cost = distances.get(current) + (weighted ? w : 1);
      if (cost < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, cost);
        previous.set(neighbor, current);
      }
    }
  }
  const path = [config.goal];
  while (path[0] !== config.start) path.unshift(previous.get(path[0]));
  return path;
}
export function graphOrder(config, mode = 'bfs') {
  const visited = new Set(),
    pending = [config.start],
    order = [];
  while (pending.length) {
    const id = mode === 'dfs' ? pending.pop() : pending.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    order.push(id);
    const neighbors = config.edges
      .flatMap(([a, b]) => (a === id ? [b] : b === id ? [a] : []))
      .filter((n) => !visited.has(n));
    pending.push(...(mode === 'dfs' ? neighbors.reverse() : neighbors));
  }
  return order;
}
export function treeOrder(tree, mode = 'infix') {
  if (!tree) return [];
  if (mode === 'breadth') {
    const queue = [tree],
      order = [];
    while (queue.length) {
      const n = queue.shift();
      order.push(n.value);
      if (n.left) queue.push(n.left);
      if (n.right) queue.push(n.right);
    }
    return order;
  }
  const left = treeOrder(tree.left, mode),
    right = treeOrder(tree.right, mode);
  return mode === 'prefix'
    ? [tree.value, ...left, ...right]
    : mode === 'suffix'
      ? [...left, ...right, tree.value]
      : [...left, tree.value, ...right];
}
export function dynamicFrames(coins, amount) {
  amount = Math.max(0, Math.min(500, Math.trunc(Number(amount) || 0)));
  coins = coins.filter((coin) => Number.isInteger(coin) && coin > 0);
  const values = Array(amount + 1).fill(null);
  values[0] = 0;
  const frames = [
    {
      values: [...values],
      active: [0],
      explanation: 'Pour un montant de zéro, il faut zéro pièce.',
      result: 0
    }
  ];
  for (let n = 1; n <= amount; n++) {
    const candidates = coins
      .filter((c) => c > 0 && c <= n && values[n - c] !== null)
      .map((c) => values[n - c] + 1);
    values[n] = candidates.length ? Math.min(...candidates) : null;
    frames.push({
      values: [...values],
      active: [n],
      result: values[n],
      explanation:
        values[n] === null
          ? `Le montant ${n} est impossible avec ces pièces.`
          : `Pour ${n}, le meilleur sous-problème donne ${values[n]} pièce(s).`
    });
  }
  return frames;
}
export function textSearchFrames(text, pattern) {
  if (!pattern)
    return [
      {
        values: [...text],
        active: [],
        explanation: 'Le motif vide est présent à l’indice zéro.',
        found: 0
      }
    ];
  const frames = [],
    last = new Map([...pattern].map((c, i) => [c, i]));
  let start = 0;
  while (start <= text.length - pattern.length) {
    let j = pattern.length - 1;
    while (j >= 0 && text[start + j] === pattern[j]) j--;
    frames.push({
      values: [...text],
      active: Array.from({ length: pattern.length }, (_, i) => start + i),
      explanation:
        j < 0
          ? `Motif trouvé à l’indice ${start}.`
          : `Différence à l’indice ${start + j} : je décale le motif grâce à la table des caractères.`,
      found: j < 0 ? start : undefined
    });
    if (j < 0) return frames;
    start += Math.max(1, j - (last.get(text[start + j]) ?? -1));
  }
  frames.push({
    values: [...text],
    active: [],
    explanation: 'Tous les alignements possibles sont éliminés : motif absent.',
    found: -1
  });
  return frames;
}

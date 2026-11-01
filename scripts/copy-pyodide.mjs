import { cp, mkdir, readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
const source = fileURLToPath(new URL('../node_modules/pyodide/', import.meta.url));
const target = fileURLToPath(new URL('../public/python/', import.meta.url));
await mkdir(target, { recursive: true });
for (const file of await readdir(source)) {
  if (!/\.(mjs|js|wasm|zip|json)$/.test(file)) continue;
  let unchanged = false;
  try {
    unchanged = (await readFile(`${source}/${file}`)).equals(await readFile(`${target}/${file}`));
  } catch {}
  if (!unchanged) await cp(`${source}/${file}`, `${target}/${file}`);
}
const lock = JSON.parse(await readFile(`${source}/pyodide-lock.json`, 'utf8'));
const sqlite = lock.packages.sqlite3;
const wheel = `${target}/${sqlite.file_name}`;
const digest = (buffer) => createHash('sha256').update(buffer).digest('hex');
let prepared = false;
try {
  prepared = digest(await readFile(wheel)) === sqlite.sha256;
} catch {}
if (!prepared) {
  const version = JSON.parse(await readFile(`${source}/package.json`, 'utf8')).version;
  const url = `https://cdn.jsdelivr.net/pyodide/v${version}/full/${sqlite.file_name}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
  if (!response.ok)
    throw new Error(
      `Impossible de préparer SQLite (${response.status}). Relance npm install avec une connexion.`
    );
  const buffer = Buffer.from(await response.arrayBuffer());
  if (digest(buffer) !== sqlite.sha256)
    throw new Error('L’empreinte de SQLite ne correspond pas au verrou Pyodide.');
  await writeFile(wheel, buffer);
}
console.log('Runtime Python et SQLite locaux prêts.');

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 18)) {
  console.error(
    'Atelier NSI nécessite Node.js 24 LTS (ou Node 22.18 minimum). Installe-le depuis https://nodejs.org/ puis relance ce fichier.'
  );
  process.exit(1);
}
if (!existsSync(resolve(root, 'node_modules/vite/bin/vite.js'))) {
  console.error(
    'Les dépendances ne sont pas installées. Dans ce dossier, lance npm install, puis npm run dev.'
  );
  process.exit(1);
}
const nodeFolder = dirname(process.execPath);
const child = spawn(
  process.execPath,
  [
    resolve(root, 'node_modules/vite/bin/vite.js'),
    '--host',
    '0.0.0.0',
    '--port',
    '4173',
    '--strictPort'
  ],
  {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, PATH: nodeFolder + ';' + process.env.PATH }
  }
);
child.on('exit', (code) => process.exit(code ?? 0));
process.on('SIGINT', () => child.kill('SIGINT'));

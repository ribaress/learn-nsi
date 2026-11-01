import executor from './executor.py?raw';
let pyodide;
let output = '',
  stderr = '';
function append(text, kind = 'out') {
  if (kind === 'out') output = (output + text + '\n').slice(0, 10000);
  else stderr = (stderr + text + '\n').slice(0, 10000);
}
self.onmessage = async ({ data }) => {
  if (data.type === 'init') {
    try {
      const { loadPyodide } = await import(/* @vite-ignore */ `${data.baseUrl}pyodide.mjs`);
      pyodide = await loadPyodide({
        indexURL: data.baseUrl,
        stdout: (t) => append(t),
        stderr: (t) => append(t, 'err')
      });
      self.postMessage({ type: 'ready' });
    } catch (e) {
      self.postMessage({
        type: 'initError',
        error: `Python n’a pas pu être chargé. Tu peux réessayer. (${e.message})`
      });
    }
    return;
  }
  if (data.type !== 'run') return;
  output = '';
  stderr = '';
  let namespace;
  try {
    if (data.mode === 'sql') await pyodide.loadPackage('sqlite3');
    output = '';
    stderr = '';
    namespace = pyodide.globals.get('dict')();
    namespace.set('__atelier_request', JSON.stringify(data));
    const encoded = await pyodide.runPythonAsync(executor, {
      globals: namespace,
      filename: 'atelier.py'
    });
    self.postMessage({
      type: 'result',
      id: data.id,
      ...JSON.parse(encoded),
      stdout: output,
      stderr
    });
  } catch (e) {
    self.postMessage({ type: 'result', id: data.id, error: e.message, stdout: output, stderr });
  } finally {
    namespace?.destroy?.();
  }
};

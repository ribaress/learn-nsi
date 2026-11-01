let activeRunner;
export class PythonRunner {
  constructor(onState = () => {}) {
    this.onState = onState;
    this.worker = null;
    this.pending = null;
    this.counter = 0;
  }
  async init() {
    if (this.ready) return;
    if (activeRunner && activeRunner !== this) activeRunner.dispose();
    activeRunner = this;
    this.onState('loading');
    this.worker = new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' });
    this.worker.onmessage = ({ data }) => {
      if (data.type === 'ready') {
        this.ready = true;
        this.finish(null);
      }
      if (data.type === 'initError') this.stop(data.error, 'error');
      if (data.type === 'result' && data.id === this.counter) this.finish(null, data);
    };
    this.worker.onerror = () =>
      this.stop('Python a rencontré un problème de chargement. Tu peux réessayer.', 'error');
    const loading = this.wait(
      45000,
      'Le chargement de Python prend trop de temps. Vérifie ta connexion et réessaie.'
    );
    this.worker.postMessage({ type: 'init', baseUrl: new URL('python/', document.baseURI).href });
    await loading;
  }
  wait(duration, message) {
    return new Promise((resolve, reject) => {
      this.pending = {
        resolve,
        reject,
        timer: setTimeout(() => this.stop(message, 'error'), duration)
      };
    });
  }
  finish(error, result) {
    if (!this.pending) return;
    clearTimeout(this.pending.timer);
    const p = this.pending;
    this.pending = null;
    error ? p.reject(new Error(error)) : p.resolve(result);
  }
  async run(request) {
    // Les props Vue peuvent être des Proxy : le Worker reçoit des données JSON indépendantes.
    const payload = JSON.parse(JSON.stringify(request));
    await this.init();
    this.onState('running');
    this.counter++;
    const response = this.wait(
      5000,
      'Exécution interrompue après 5 secondes. Vérifie que ta boucle peut se terminer, puis réessaie.'
    );
    this.worker.postMessage({ ...payload, type: 'run', id: this.counter });
    const result = await response;
    this.onState(result.error ? 'error' : 'ready');
    return result;
  }
  stop(
    message = 'Exécution arrêtée. Tu peux modifier ton code puis réessayer.',
    state = 'stopped'
  ) {
    this.worker?.terminate();
    this.worker = null;
    this.ready = false;
    this.finish(message);
    this.onState(state);
  }
  dispose() {
    this.stop();
  }
}

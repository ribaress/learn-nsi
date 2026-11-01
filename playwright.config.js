import { defineConfig } from '@playwright/test';
import os from 'node:os';
import path from 'node:path';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  outputDir: path.join(os.tmpdir(), 'atelier-nsi-test-results'),
  use: {
    baseURL: 'http://localhost:4180',
    headless: true,
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
    screenshot: 'only-on-failure'
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js --host 0.0.0.0 --port 4180 --strictPort',
    url: 'http://localhost:4180',
    reuseExistingServer: true,
    timeout: 30000
  }
});

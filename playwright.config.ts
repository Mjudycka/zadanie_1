import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

// Tryb przeglądarki – zmień ręcznie w kodzie:
//   true  = headless (bez okna, np. CI),
//   false = widoczne okno przeglądarki (np. podgląd lokalny).
const HEADLESS = true;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,
    headless: HEADLESS,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        // Zwykły user-agent Chrome (bez "HeadlessChrome") – tak samo w headless i headed.
        ...devices['Desktop Chrome'],
        // Nadpisuje domyślny viewport z urządzenia (1280x720).
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});

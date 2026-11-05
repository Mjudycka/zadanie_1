
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

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
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      //use: { ...devices['Desktop Chrome'] },
    },
  ],
});

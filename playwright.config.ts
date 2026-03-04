import { defineConfig, devices } from '@playwright/test';

// Playwright Test configuration
// - Runs the same E2E suite on Chromium, Firefox, and WebKit
// - Uses a baseURL so tests can call page.goto('/') if desired
export default defineConfig({
  testDir: './tests',

  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },

  reporter: [['list']],

  use: {
    baseURL: 'https://www.epam.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

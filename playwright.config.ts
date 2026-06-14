import * as dotenv from 'dotenv';
dotenv.config();

import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './utils/config';

// defineConfig gives us TypeScript autocomplete and validation on every option
export default defineConfig({

  // Runs once before any test — cleans allure-results/ so each run starts fresh
  globalSetup: './utils/global-setup',

  // Where Playwright looks for test files
  // We use tests/e2e so the old learning files in other folders are not picked up
  testDir: './tests/e2e',

  // How long a single test is allowed to run before Playwright marks it as failed
  // 90 seconds — raised from 60s because tests running late in the suite (TC_DL_38 and others)
  // were hitting the wall during beforeEach navigation when the preprod server is under load.
  // MP4 upload tests (TC_DL_22_4, TC_DL_22_5) override this further to 120s individually.
  timeout: 90 * 1000,

  // How long expect() assertions wait for the condition to become true
  // For example: expect(page).toHaveURL(...) will retry for up to 15 seconds
  expect: { timeout: 15 * 1000 },

  // false = run tests one after another, not in parallel
  // We use false because all tests share one login session via auth.json
  // Running in parallel would cause session conflicts
  fullyParallel: false,

  // Only 1 worker = only 1 browser running at a time
  // Keeps things stable and predictable while learning
  workers: 1,

  // line = shows real-time test progress in the terminal
  // allure-playwright = generates allure-results/ folder for the Allure report
  // After a run: npx allure generate allure-results --clean && npx allure open
  reporter: [
     ['line'],
     ['allure-playwright'],
     ['html', { open: 'never' }],
  ],

  use: {
    // baseURL means you can write page.goto('/home') instead of the full URL
    // It automatically uses the right server based on the ENV in your .env file
    baseURL: BASE_URL,

    // Capture a trace (like a recording of the test) only when a test fails on retry
    // Open traces with: npx playwright show-trace trace.zip
    trace: 'on-first-retry',

    // Take a screenshot only when a test fails — helps debug what went wrong
    screenshot: 'only-on-failure',

    // false = browser window is VISIBLE when tests run
    // Change to true if you want tests to run in the background (CI mode)
    headless: false,
  },

  // projects define different "modes" tests can run in
  // We need TWO projects: one for login setup, one for the actual tests
  projects: [

    {
      // 'setup' project runs FIRST, before any real tests
      // Its only job is to log in and save the session to auth.json
      name: 'setup',

      // testDir overrides the global testDir for this project only
      // auth.setup.ts lives at the project root, not inside tests/e2e
      testDir: '.',

      // testMatch tells this project to ONLY run files matching this pattern
      // So it will only run auth.setup.ts and nothing else
      testMatch: /auth\.setup\.ts/,
    },

    {
      // 'chromium' project runs all the actual test files
      name: 'chromium',

      use: {
        // Use the default Desktop Chrome browser settings
        ...devices['Desktop Chrome'],

        // THIS IS THE KEY LINE — instead of logging in again at the start of every test,
        // Playwright loads the saved session from auth.json
        // auth.json was created by the 'setup' project above
        // This means every test starts already logged in — no login code needed in tests
        storageState: 'auth.json',
      },

      // dependencies tells Playwright: always run 'setup' BEFORE running these tests
      // If auth.json doesn't exist yet, setup will create it first
      dependencies: ['setup'],
    },

  ],
});

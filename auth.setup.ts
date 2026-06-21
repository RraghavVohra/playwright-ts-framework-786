import { test as setup, expect } from '@playwright/test';
import { ENV, USER_EMAIL, USER_PASSWORD } from './utils/config';

// 'setup' is just the name Playwright shows in the report for this step
// It is not a regular test — it is a one-time login that runs before all tests
setup('authenticate', async ({ page }) => {

  // Step 1: Navigate to the home page
  // baseURL is already set in playwright.config.ts so '/' resolves to the full URL
  // Digipulse's login page lives at '/home' specifically — other environments use '/'
  await page.goto(ENV === 'digipulse' ? '/home' : '/');

  // Step 2: Wait for the username field to be visible before typing
  // The app is Angular-based and takes a moment to render the login form
  await page.locator('#username').waitFor({ state: 'visible' });

  // Step 3: Fill in the username
  // fill() clears the field first, then types — more reliable than click + type
  await page.locator('#username').fill(USER_EMAIL);

  // Step 4: Fill in the password
  await page.locator('#password').fill(USER_PASSWORD);

  // Step 5: Click the submit button
  // The xpath gets the first submit button on the page
  await page.locator('(//button[@type="submit"])[1]').click();

  // Step 6: Wait until the URL contains 'AssetLibrary'
  // This confirms login was successful and the redirect completed
  // If login fails, this line will timeout and the setup will fail — no tests will run
  await page.waitForURL('**/AssetLibrary', { timeout: 60000 });

  // Step 7: Save the entire session to auth.json
  // auth.json captures cookies + localStorage — everything the browser uses to stay logged in
  // Every test will load this file instead of logging in again
  await page.context().storageState({ path: 'auth.json' });

  console.log('✅ Login successful — session saved to auth.json');
});

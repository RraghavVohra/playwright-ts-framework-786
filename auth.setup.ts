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

  // Step 3 & 4: Fill in username and password, then verify the values actually stuck.
  // Angular re-renders the login form shortly after its first paint (SPA bootstrap) —
  // #username can be "visible" before that re-render happens, so a fill() here can get
  // silently wiped moments later with no error thrown. Same race class as the KTMenu
  // dropdown fixed in TestimonialsPage — don't trust one action, verify and retry.
  await expect(async () => {
    await page.locator('#username').fill(USER_EMAIL);
    await page.locator('#password').fill(USER_PASSWORD);

    const usernameValue = await page.locator('#username').inputValue();
    const passwordValue = await page.locator('#password').inputValue();
    if (usernameValue !== USER_EMAIL || passwordValue !== USER_PASSWORD) {
      throw new Error('Login fields were cleared before submit — retrying');
    }
  }).toPass({ timeout: 30000 });

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

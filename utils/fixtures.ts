import { test as base, expect } from '@playwright/test';
import { PushNotificationPage } from '../pages/PushNotificationPage';

// ─────────────────────────────────────────────────────────────────────
// WHY FIXTURES?
//
// Without fixtures, every test would have to do this manually:
//   const pushNotificationPage = new PushNotificationPage(page);
//
// With fixtures, you just declare it as a parameter in your test:
//   test('my test', async ({ pushNotificationPage }) => { ... })
//
// Playwright sees the parameter name, creates the page object automatically,
// and injects it — just like how it injects 'page' and 'browser' already.
// ─────────────────────────────────────────────────────────────────────

// This type tells TypeScript what custom fixtures we are adding
// Each key is the parameter name you will use in your test functions
type MyFixtures = {
  pushNotificationPage: PushNotificationPage;
};

// base.extend() takes the standard Playwright 'test' and adds our custom fixtures to it
// We export this as 'test' so test files import from here instead of '@playwright/test'
export const test = base.extend<MyFixtures>({

  // This function runs automatically before each test that uses 'pushNotificationPage'
  // Playwright injects 'page' (the browser tab) — we use it to create our page object
  // 'use' is a callback — we pass our page object to it and Playwright injects it into the test
  pushNotificationPage: async ({ page }, use) => {
    const pushNotificationPage = new PushNotificationPage(page);
    // 'use' hands the page object to the test — the test runs at this point
    await use(pushNotificationPage);
    // After the test completes, any cleanup code would go here (currently none needed)
  },

});

// Re-export 'expect' from here so test files only need ONE import line:
//   import { test, expect } from '../utils/fixtures';
// instead of importing from two different places
export { expect };

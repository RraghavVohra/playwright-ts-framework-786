import { test as base, expect } from '@playwright/test';
import { PushNotificationPage } from '../pages/PushNotificationPage';
import { DocumentLibraryPage } from '../pages/DocumentLibraryPage';
import { SocialAutoPostPage } from '../pages/SocialAutoPostPage';
import { TestimonialsPage } from '../pages/TestimonialsPage';
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
//
// Adding a new page object here means EVERY test file gets access to it
// just by declaring it as a parameter — no manual instantiation needed.
// ─────────────────────────────────────────────────────────────────────

// This type tells TypeScript what custom fixtures we are adding
// Each key is the parameter name you will use in your test functions
// When you add a new page object, add its type here first
type MyFixtures = {
  pushNotificationPage: PushNotificationPage;
  documentLibraryPage:  DocumentLibraryPage;
  socialAutoPostPage:   SocialAutoPostPage;
  testimonialsPage: TestimonialsPage;
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

  // Same pattern as pushNotificationPage above
  // Any test that declares 'documentLibraryPage' as a parameter gets this injected automatically
  documentLibraryPage: async ({ page }, use) => {
    const documentLibraryPage = new DocumentLibraryPage(page);
    // Playwright runs the test at this 'use' call — setup above, teardown below
    await use(documentLibraryPage);
  },

  // Same pattern — any test declaring 'socialAutoPostPage' gets this injected automatically
  socialAutoPostPage: async ({ page }, use) => {
    const socialAutoPostPage = new SocialAutoPostPage(page);
    await use(socialAutoPostPage);
  },

// Same pattern — any test declaring 'testimonialsPage' gets this injected automatically
  testimonialsPage: async ({ page },use) => {
    const testimonialsPage = new TestimonialsPage(page);
    await use(testimonialsPage);
  }

});

// Re-export 'expect' from here so test files only need ONE import line:
//   import { test, expect } from '../utils/fixtures';
// instead of importing from two different places
export { expect };

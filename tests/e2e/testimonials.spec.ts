
// Import from OUR fixtures file, not '@playwright/test' —
// that's what gives us the custom 'testimonialsPage' fixture.
import { test, expect } from '../../utils/fixtures';
// Runs before EVERY test in this file: land on the home page first.
// Login already handled by auth.json (storageState), so we arrive logged in.
test.beforeEach(async ({ page }) => {
    await page.goto('/home');
});

// TC_TST_01 — navigate to the Testimonials screen and verify the URL
test('TC_TST_01 - navigates to Testimonials screen', async ({ testimonialsPage, page }) => {

  // Use the page object's method — the fixture already built it for us (no 'new')
  await testimonialsPage.navigateToTestimonials();

  // Auto-waiting URL assertion — retries until the URL matches or times out
  await expect(page).toHaveURL(/framework\/testimonial/);
});

// TC_TST_02 — Actions menu shows the correct two options
test('TC_TST_02 - actions menu shows Create New and Delete', async ({ testimonialsPage }) => {

  // Get to the list page, then open the Actions menu
  await testimonialsPage.navigateToTestimonials();
  await testimonialsPage.openActionsMenu();

  // toBeVisible auto-waits/retries until the option appears (up to 15s) — no timing race.
  // await expect because the matcher polls the live page.
  await expect(testimonialsPage.getCreateNewOption()).toBeVisible();
  await expect(testimonialsPage.getDeleteOption()).toBeVisible();
});

// TC_TST_03 — Actions → Create New lands on the Add Testimonial page
// Verifies BOTH: the URL is the create page AND the heading says "Add Testimonial"
test('TC_TST_03 - navigates to Create Testimonial screen', async ({ testimonialsPage, page }) => {

  // One method does the whole flow: list → Actions → Create New
  await testimonialsPage.navigateToCreateTestimonial();

  // Check 1: the URL is now the create page
  // await expect because toHaveURL polls the live page until it matches
  await expect(page).toHaveURL(/framework\/create\/testimonial/);

  // Check 2: read the heading text, then assert on it
  // No await on expect here — 'heading' is already a plain string (unwrapped above)
  const heading = await testimonialsPage.getAddTestimonialHeading();
  expect(heading).toBe('Add Testimonial');
});






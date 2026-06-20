
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


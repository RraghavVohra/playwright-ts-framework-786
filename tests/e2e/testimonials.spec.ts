
// Import from OUR fixtures file, not '@playwright/test' —
// that's what gives us the custom 'testimonialsPage' fixture.
import { test, expect } from '../../utils/fixtures';
import { TestimonialsPage } from '../../pages/TestimonialsPage';
import {
  generateTestimonialName,
  generateCompanyName,
  generateDesignation,
  generateTestimonialText,
} from '../../utils/testData';
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

// TC_TST_04 — Happy path: every field filled, valid image attached
// Verifies the success message appears AND the new row's data matches exactly what was entered
test('TC_TST_04 - creates a testimonial with all fields filled', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  const name = generateTestimonialName();
  const company = generateCompanyName();
  const designation = generateDesignation();
  const testimonialText = generateTestimonialText();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.PNG_FILE);
  await testimonialsPage.enterName(name);
  await testimonialsPage.enterCompany(company);
  await testimonialsPage.enterDesignation(designation);
  await testimonialsPage.enterTestimonialText(testimonialText);
  // Status left on its default (Active) — matches the form's default state
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();

  const row = await testimonialsPage.getFirstTestimonialRowData();
  expect(row.name).toBe(name);
  expect(row.company).toBe(company);
  expect(row.designation).toBe(designation);
  expect(row.testimonialText).toBe(testimonialText);
  expect(row.status).toBe('Active');

  // Cleanup — this runs on production, don't leave test data behind
  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_05 — Happy path with ONLY the required fields (Name, Testimonial Text)
// Confirms Company/Designation really are optional, not just visually unmarked
test('TC_TST_05 - creates a testimonial with only required fields filled', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  const name = generateTestimonialName();
  const testimonialText = generateTestimonialText();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.PNG_FILE);
  await testimonialsPage.enterName(name);
  await testimonialsPage.enterTestimonialText(testimonialText);
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();

  const row = await testimonialsPage.getFirstTestimonialRowData();
  expect(row.name).toBe(name);
  expect(row.company).toBe('');
  expect(row.designation).toBe('');
  expect(row.testimonialText).toBe(testimonialText);

  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_06 — Name left blank
// #name has the HTML `required` attribute, so the browser blocks submission with its own
// constraint-validation tooltip. That tooltip isn't part of the DOM as visible text, so we
// read it via el.validationMessage instead of getByText.
test('TC_TST_06 - shows native validation when Name is left blank', async ({ testimonialsPage }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  expect(await testimonialsPage.getNameValidationMessage()).toBe('Please fill out this field.');
});

// TC_TST_07 — Testimonial Text left blank
// Same mechanism as TC_TST_06, but for #testimonial_msg (the other `required` field)
test('TC_TST_07 - shows native validation when Testimonial Text is left blank', async ({ testimonialsPage }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.clickAddTestimonialButton();

  expect(await testimonialsPage.getTestimonialTextValidationMessage()).toBe('Please fill out this field.');
});

// TC_TST_08 — Cancel via the "Testimonials List" breadcrumb without submitting
// Guards against a "ghost record" bug — leaving the form should discard everything,
// not silently create a half-filled testimonial in the background.
test('TC_TST_08 - cancels without creating a testimonial via the breadcrumb', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  const name = generateTestimonialName();
  await testimonialsPage.enterName(name);
  await testimonialsPage.enterTestimonialText(generateTestimonialText());

  await testimonialsPage.clickTestimonialsListBreadcrumb();
  await expect(page).toHaveURL(/framework\/testimonial/);

  await testimonialsPage.searchTestimonial(name);
  await expect(testimonialsPage.getNoMatchingRecordsMessage()).toBeVisible();
});

// TC_TST_09 — No profile picture uploaded
// The label shows an asterisk on "Profile Picture*", but #image has no `required` attribute —
// this test proves the UI's asterisk is misleading and creation succeeds without an image.
test('TC_TST_09 - creates a testimonial without a profile picture', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  const name = generateTestimonialName();
  await testimonialsPage.enterName(name);
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();

  const row = await testimonialsPage.getFirstTestimonialRowData();
  expect(row.name).toBe(name);

  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_10 — Invalid file format (.webp) is rejected
// Allowed formats are jpeg/jpg/png/gif — this is server-side validation (full page re-render
// with an error banner), unlike the required-field checks above, so getByText works fine here.
test('TC_TST_10 - rejects an invalid file format on upload', async ({ testimonialsPage }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.INVALID_FILE);
  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(testimonialsPage.getInvalidInputBanner()).toBeVisible();
  await expect(testimonialsPage.getInvalidFileTypeError()).toBeVisible();
});

// TC_TST_11 — Create with Status set to Inactive
test('TC_TST_11 - creates a testimonial with Inactive status', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.PNG_FILE);
  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.selectInactiveStatus();
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await testimonialsPage.closeSuccessMessage();

  const row = await testimonialsPage.getFirstTestimonialRowData();
  expect(row.status).toBe('Inactive');

  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_12–15 — One dedicated test per allowed image format.
// Each uses a distinct sample file so every format the error message promises is actually
// exercised, not just assumed to work because .png (used elsewhere) works.
test('TC_TST_12 - accepts a .png profile picture', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.PNG_FILE);
  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();
  await testimonialsPage.deleteFirstTestimonial();
});

test('TC_TST_13 - accepts a .jpg profile picture', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.JPG_FILE);
  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();
  await testimonialsPage.deleteFirstTestimonial();
});

test('TC_TST_14 - accepts a .jpeg profile picture', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.JPEG_FILE);
  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();
  await testimonialsPage.deleteFirstTestimonial();
});

test('TC_TST_15 - accepts a .gif profile picture', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.GIF_FILE);
  await testimonialsPage.enterName(generateTestimonialName());
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();
  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_16 — Upload an image, then remove it via the "Remove" link before submitting
// Confirms the Remove control actually clears the selection and the form still submits fine
test('TC_TST_16 - removes an uploaded image before submitting', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  await testimonialsPage.uploadProfilePicture(TestimonialsPage.PNG_FILE);
  await testimonialsPage.removeProfilePicture();

  const name = generateTestimonialName();
  await testimonialsPage.enterName(name);
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await expect(testimonialsPage.getSuccessMessage()).toBeVisible();
  await testimonialsPage.closeSuccessMessage();

  const row = await testimonialsPage.getFirstTestimonialRowData();
  expect(row.name).toBe(name);

  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_17 — Stored-XSS safety check
// Submits a <script> tag as the Testimonial Text. A correctly-built app escapes this and
// renders it as literal text; a vulnerable one would execute it as markup when the listing
// page renders the row. The dialog listener catches that second case directly — if the
// script actually ran, alert() would fire and dialogAppeared would flip to true.
test('TC_TST_17 - renders script-like input as literal text, not executable markup', async ({ testimonialsPage, page }) => {
  let dialogAppeared = false;
  page.on('dialog', async (dialog) => {
    dialogAppeared = true;
    await dialog.dismiss();
  });

  await testimonialsPage.navigateToCreateTestimonial();

  const name = generateTestimonialName();
  const xssPayload = `<script>alert('xss')</script>`;

  await testimonialsPage.enterName(name);
  await testimonialsPage.enterTestimonialText(xssPayload);
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await testimonialsPage.closeSuccessMessage();

  // The app sanitizes by stripping dangerous characters (< > ( ) /) rather than
  // HTML-encoding them, so the stored text won't equal the raw payload — assert the
  // actual security property instead: no reconstructable <script> tag, and no alert fired.
  const row = await testimonialsPage.getFirstTestimonialRowData();
  expect(row.testimonialText).not.toContain('<script>');
  expect(row.testimonialText).not.toContain('</script>');
  expect(dialogAppeared).toBe(false);

  await testimonialsPage.deleteFirstTestimonial();
});

// TC_TST_18 — Full delete flow: create one, delete it, confirm it's gone via search
// This is the test that actually proves deleteFirstTestimonial() works — every other test
// above just reuses it for cleanup once this one has verified the mechanism.
test('TC_TST_18 - deletes a testimonial and confirms it no longer appears in search', async ({ testimonialsPage, page }) => {
  await testimonialsPage.navigateToCreateTestimonial();

  const name = generateTestimonialName();
  await testimonialsPage.enterName(name);
  await testimonialsPage.enterTestimonialText(generateTestimonialText());
  await testimonialsPage.clickAddTestimonialButton();

  await expect(page).toHaveURL(/framework\/testimonial/);
  await testimonialsPage.closeSuccessMessage();

  await testimonialsPage.deleteFirstTestimonial();

  await testimonialsPage.searchTestimonial(name);
  await expect(testimonialsPage.getNoMatchingRecordsMessage()).toBeVisible();
});


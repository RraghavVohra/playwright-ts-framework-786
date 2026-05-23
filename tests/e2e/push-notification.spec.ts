// Import from fixtures — NOT from '@playwright/test'
// This gives us our custom 'pushNotificationPage' fixture automatically
import { test, expect } from '../../utils/fixtures';
import { PARTNER_CATEGORY_NAME } from '../../utils/config';

// ─────────────────────────────────────────────────────────────────────
// BEFORE EACH TEST
// Runs before every single test in this file
// Job: navigate to the home page — that's it
// Login is already handled by auth.json (storageState in playwright.config.ts)
// ─────────────────────────────────────────────────────────────────────
test.beforeEach(async ({ page }) => {
  // '/home' resolves to the full preprod URL because baseURL is set in playwright.config.ts
  // The session from auth.json is already loaded — we arrive already logged in
  await page.goto('/home');
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_01 — User is taken to the Push Notification screen
// Verifies: page heading text + URL contains the correct path
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_01 - navigates to Push Notification list screen', async ({ page, pushNotificationPage }) => {

  await pushNotificationPage.navigateToPushNotificationList();

  // Verify the heading on the page says "PUSH NOTIFICATION"
  const heading = await pushNotificationPage.getPageHeading();
  expect(heading).toBe('PUSH NOTIFICATION');

  // Verify the URL contains the expected path segment
  // toHaveURL auto-waits — no manual sleep needed
  await expect(page).toHaveURL(/AgencyCommunication\/list/);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_04 — User is taken to the Create App Notification screen
// Verifies: URL changes to the create page after clicking Actions → Create
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_04 - navigates to Create App Notification screen', async ({ page, pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  await expect(page).toHaveURL(/AgencyCommunication\/create/);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_03 — Actions menu shows the correct 3 options
// Verifies: the dropdown contains exactly Create App Notification, WhatsApp Template List, Delete
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_03 - actions menu shows correct options', async ({ pushNotificationPage }) => {

  // openActionsMenu opens the dropdown WITHOUT clicking any option inside it
  await pushNotificationPage.openActionsMenu();

  const options = await pushNotificationPage.getActionMenuOptions();

  expect(options).toEqual([
    'Create App Notification',
    'WhatsApp Template List',
    'Delete',
  ]);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_06 — Notification channel radio buttons work correctly
// Verifies: selecting WhatsApp deselects Push, and vice versa
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_06 - notification channel selection works', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  // Select WhatsApp — it should be selected, Push should not be
  await pushNotificationPage.selectWhatsAppChannel();
  expect(await pushNotificationPage.isWhatsAppSelected()).toBe(true);
  expect(await pushNotificationPage.isPushNotificationSelected()).toBe(false);

  // Switch back to Push Notification — it should now be selected, WhatsApp should not
  await pushNotificationPage.selectPushNotificationChannel();
  expect(await pushNotificationPage.isPushNotificationSelected()).toBe(true);
  expect(await pushNotificationPage.isWhatsAppSelected()).toBe(false);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_13 — "Send To" radio buttons are mutually exclusive
// Verifies: selecting Upload List deselects Partner Category, and vice versa
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_13 - send to options are mutually exclusive', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  // Select Upload List — it should be selected, Partner Category should not be
  await pushNotificationPage.selectUploadListRadio();
  expect(await pushNotificationPage.isUploadListSelected()).toBe(true);
  expect(await pushNotificationPage.isPartnerCategorySelected()).toBe(false);

  // Switch back to Partner Category
  await pushNotificationPage.selectPartnerCategoryRadio();
  expect(await pushNotificationPage.isPartnerCategorySelected()).toBe(true);
  expect(await pushNotificationPage.isUploadListSelected()).toBe(false);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_16 — Search textfield in category dropdown works
// Verifies: typing 'Raj2024' shows the matching category in the list
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_16 - category search textfield works', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  await pushNotificationPage.openCategoryDropdown();

  // Search for the category name and verify it appears in the results
  const found = await pushNotificationPage.searchAndValidateCategory(PARTNER_CATEGORY_NAME);
  expect(found).toBe(true);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_15 — Select All option in category dropdown works
// Verifies: after clicking Select All, the button text shows categories were selected
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_15 - select all categories works', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  await pushNotificationPage.openCategoryDropdown();
  await pushNotificationPage.clickSelectAll();

  // The button text changes to show how many categories are selected
  const text = await pushNotificationPage.getCategoryButtonText();
  expect(text).not.toBe('');
  expect(text.length).toBeGreaterThan(0);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_07 — Submit without Notification Name shows validation message
// Verifies: browser HTML5 validation tooltip says "Please fill out this field."
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_07 - missing notification name shows validation message', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  // Fill every field EXCEPT the notification name
  await pushNotificationPage.enterNotificationMessage('Automation Message');
  await pushNotificationPage.openCategoryDropdown();
  await pushNotificationPage.searchCategory('Raj2024');
  await pushNotificationPage.selectTargetCategory();
  await pushNotificationPage.clickBlankSpace();
  await pushNotificationPage.clickCustomLinkOption();
  await pushNotificationPage.enterCustomLink();

  const futureDate = pushNotificationPage.getFutureDate(30);
  await pushNotificationPage.enterSchedulingDateTime(futureDate, '11:30');

  await pushNotificationPage.clickSubmit();

  // The browser shows a tooltip on the empty required field
  const validationMsg = await pushNotificationPage.getNotificationNameValidation();
  expect(validationMsg).toBe('Please fill out this field.');
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_08 — Submit without Notification Message shows validation message
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_08 - missing notification message shows validation message', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  // Unique name so this test does not conflict with other runs
  const name = `Push_${Date.now()}`;
  await pushNotificationPage.enterNotificationName(name);

  // Fill every field EXCEPT the message
  await pushNotificationPage.openCategoryDropdown();
  await pushNotificationPage.searchCategory('Raj2024');
  await pushNotificationPage.selectTargetCategory();
  await pushNotificationPage.clickBlankSpace();
  await pushNotificationPage.clickCustomLinkOption();
  await pushNotificationPage.enterCustomLink();

  const futureDate = pushNotificationPage.getFutureDate(30);
  await pushNotificationPage.enterSchedulingDateTime(futureDate, '11:30');

  await pushNotificationPage.clickSubmit();

  const validationMsg = await pushNotificationPage.getNotificationMessageValidation();
  expect(validationMsg).toBe('Please fill out this field.');
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_17 — Submit without selecting a Category
// Verifies: form stays on the create page (does not navigate away)
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_17 - missing category keeps form on create page', async ({ page, pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  const name = `Push_${Date.now()}`;
  await pushNotificationPage.enterNotificationName(name);
  await pushNotificationPage.enterNotificationMessage('Automation Message');

  // Intentionally skip category selection
  await pushNotificationPage.clickCustomLinkOption();
  await pushNotificationPage.enterCustomLink();

  const futureDate = pushNotificationPage.getFutureDate(30);
  await pushNotificationPage.enterSchedulingDateTime(futureDate, '11:30');

  await pushNotificationPage.clickSubmit();

  // If category is missing, the form should NOT submit — URL stays on the create page
  await expect(page).toHaveURL(/AgencyCommunication\/create/);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_19 — Custom Link selected but URL field left empty
// Verifies: inline error message appears below the custom link field
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_19 - missing custom link URL shows validation error', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  const name = `Push_${Date.now()}`;
  await pushNotificationPage.enterNotificationName(name);
  await pushNotificationPage.enterNotificationMessage('Automation Message');
  await pushNotificationPage.openCategoryDropdown();
  await pushNotificationPage.searchCategory('Raj2024');
  await pushNotificationPage.selectTargetCategory();
  await pushNotificationPage.clickBlankSpace();
  await pushNotificationPage.uploadImage('test-data/Amsterdam.png');

  // Select Custom Link option but do NOT enter a URL
  await pushNotificationPage.clickCustomLinkOption();

  const futureDate = pushNotificationPage.getFutureDate(30);
  await pushNotificationPage.enterSchedulingDateTime(futureDate, '11:30');

  await pushNotificationPage.clickSubmit();

  // An inline error span appears below the custom link field
  const errorMsg = await pushNotificationPage.getCustomLinkValidationError();
  expect(errorMsg).toBe('Please enter Custom Link to proceed');
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_23 — Full successful submission with all fields
// Verifies: success toast appears with correct message
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_23 - full form submission shows success toast', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  const name = `Push_${Date.now()}`;
  await pushNotificationPage.enterNotificationName(name);
  await pushNotificationPage.enterNotificationMessage('Automation Message');
  await pushNotificationPage.openCategoryDropdown();
  await pushNotificationPage.searchCategory('Raj2024');
  await pushNotificationPage.selectTargetCategory();
  await pushNotificationPage.clickBlankSpace();
  await pushNotificationPage.uploadImage('test-data/Amsterdam.png');
  await pushNotificationPage.clickCustomLinkOption();
  await pushNotificationPage.enterCustomLink();

  const futureDate = pushNotificationPage.getFutureDate(30);
  await pushNotificationPage.enterSchedulingDateTime(futureDate, '11:30');

  await pushNotificationPage.clickSubmit();

  // After successful submission the toast appears in the corner
  const toast = await pushNotificationPage.getToastMessageText();
  expect(toast).toBe('Push Notification Saved.');

  await pushNotificationPage.closeToast();
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_49 — Special characters in notification name and message
// Verifies: the message field correctly stores and retains special characters
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_49 - special characters are accepted in message field', async ({ pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  const name = `Push_${Date.now()}`;
  await pushNotificationPage.enterNotificationName(name);

  const specialMessage = '!@#$%^&*() Notification Test';
  await pushNotificationPage.enterNotificationMessage(specialMessage);

  // Verify the field accepted and retained the special characters
  // getNotificationMessageText() reads the current value of the textarea
  const fieldValue = await pushNotificationPage.getNotificationMessageText();
  expect(fieldValue).toBe(specialMessage);
});


// ─────────────────────────────────────────────────────────────────────
// TC_PN_50 — Upload List selected but no CSV file uploaded
// Verifies: form stays on create page (browser validation blocks submission)
// ─────────────────────────────────────────────────────────────────────
test('TC_PN_50 - missing CSV keeps form on create page', async ({ page, pushNotificationPage }) => {

  await pushNotificationPage.navigateToCreateNotification();

  const name = `Push_${Date.now()}`;
  await pushNotificationPage.enterNotificationName(name);
  await pushNotificationPage.enterNotificationMessage('Automation Message');

  // Select Upload List but do NOT upload any CSV
  await pushNotificationPage.selectUploadListRadio();

  await pushNotificationPage.clickSubmit();

  // Without a CSV the form should not submit — URL stays on create page
  await expect(page).toHaveURL(/AgencyCommunication\/create/);
});

import { test, expect } from '../../utils/fixtures';
import { SocialAutoPostPage } from '../../pages/SocialAutoPostPage';
import { SOCIAL_TITLE, SOCIAL_DESCRIPTION, SOCIAL_CUSTOM_URL } from '../../utils/config';

// SocialAutoPostPage is imported NOT to create instances — the fixture handles that.
// We import the class only to access its static file path constants (SocialAutoPostPage.PNG_FILE etc.)
//
// SOCIAL_TITLE / SOCIAL_DESCRIPTION / SOCIAL_CUSTOM_URL come from .env (or defaults in config.ts)
// so they can differ per environment without touching test code.

test.describe('Social Auto Post', () => {

  // ─────────────────────────────────────────────────────────────────────
  // beforeEach — resets to home then navigates to the Create Post form
  //
  // Why navigate all the way to Create Post here?
  // Every Social Auto Post test starts on the Create Post form.
  // Putting the full navigation path in beforeEach keeps each test focused
  // on what it actually verifies — the form interaction — not the navigation steps.
  // ─────────────────────────────────────────────────────────────────────
  test.beforeEach(async ({ page, socialAutoPostPage }) => {
    await page.goto('/home');
    await socialAutoPostPage.navigateToSocialAutoPost();
    await socialAutoPostPage.clickActionsButton();
    await socialAutoPostPage.clickCreatePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_01 — Post PNG image with cobranding enabled on Facebook
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: a PNG image upload with cobranding enabled,
  // a partner category selected, Facebook checked, and a scheduled future
  // date results in a post being scheduled without error.
  //
  // Why Date.now() appended to the title?
  // Each run generates a unique title — prevents conflicts if the app stores
  // post titles and rejects duplicates.
  //
  // Why daysFromNow=1 (tomorrow)?
  // The picker disables past dates. Using tomorrow ensures the selected day
  // is always valid regardless of when the test runs.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_01 - Post PNG image with cobranding enabled on Facebook', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadFileInPNG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.clickEnableCobrandingButton();
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.clickFacebook();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_02 — Post JPG image with cobranding enabled on Facebook
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: same flow as TC_SAP_01 but using a JPG file.
  // Covers a different file format on the same form path.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_02 - Post JPG image with cobranding enabled on Facebook', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadFileInJPG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.clickEnableCobrandingButton();
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.clickFacebook();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_03 — Post MP4 video with JPG thumbnail and cobranding enabled
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: video uploads require a separate thumbnail input.
  // This test confirms both the file and thumbnail upload work together.
  //
  // Why test.setTimeout(120000)?
  // MP4 uploads are large — the server takes longer to process them.
  // The default 90s global timeout can expire before the post is scheduled.
  //
  // Why no clickFacebook() here?
  // The Java test (TC_SAP_03) also skips explicit social channel selection —
  // the form uses the default/pre-selected state for video posts.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_03 - Post MP4 video with JPG thumbnail and cobranding enabled', async ({ socialAutoPostPage }) => {
    test.setTimeout(120000);

    await socialAutoPostPage.uploadFileInMP4();
    await socialAutoPostPage.uploadThumbnailInJPG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.clickEnableCobrandingButton();
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_04 — Post with special characters in title and description
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Edge Case
  //
  // What it verifies: special characters (apostrophes, ampersands) in both
  // title and description are accepted by the form and submitted without error.
  //
  // Why are special characters already in SOCIAL_TITLE / SOCIAL_DESCRIPTION?
  // The defaults are set to "Social's Auto-post" and "This's is only for testing..."
  // — both contain apostrophes and ampersands. No extra handling needed here.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_04 - Post with special characters in title and description', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadFileInJPG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.clickEnableCobrandingButton();
    // SOCIAL_TITLE default contains apostrophe ("Social's Auto-post") — verifies special char in title
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    // SOCIAL_DESCRIPTION default contains apostrophe + ampersand — verifies special chars in description
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.clickFacebook();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_05 — Post on all social channels with Custom URL
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: selecting Twitter, LinkedIn, and Facebook together with
  // the Custom URL radio option and a valid URL results in a successful post.
  //
  // Why no cobranding here?
  // TC_SAP_05 intentionally skips cobranding — tests the form behaviour
  // without it, specifically in combination with the custom URL option.
  //
  // Why SOCIAL_CUSTOM_URL from config?
  // Custom URLs differ per environment and should be changeable without
  // modifying test code.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_05 - Post on all social channels with Custom URL', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadFileInJPG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.clickCustomUrlRadio();
    await socialAutoPostPage.enterCustomUrl(SOCIAL_CUSTOM_URL);

    await socialAutoPostPage.clickTwitter();
    await socialAutoPostPage.clickLinkedIn();
    await socialAutoPostPage.clickFacebook();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_06 — Post on all social channels with None URL option
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: selecting the "None" URL radio option (no link attached
  // to the post) is accepted when all three social channels are selected.
  //
  // Why test the None option separately?
  // It represents a distinct post type — no URL attached. The server may
  // validate or process the form differently. Testing it explicitly confirms
  // the radio option works and the form submits without a URL being required.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_06 - Post on all social channels with None URL option', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadFileInJPG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.clickNoneRadio();

    await socialAutoPostPage.clickTwitter();
    await socialAutoPostPage.clickLinkedIn();
    await socialAutoPostPage.clickFacebook();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_07 — Post on all social channels with Microsite URL (default)
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: the default URL option (Microsite — no radio button
  // click needed) works with all three social channels. Also uses a different
  // time slot (17:30) to verify the time picker handles evening hours correctly.
  //
  // Why no URL radio click here?
  // Microsite is the default selection when the form loads — no click required.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_07 - Post on all social channels with Microsite URL (default)', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadFileInJPG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.enterTitle(`${SOCIAL_TITLE}_${Date.now()}`);
    await socialAutoPostPage.enterDescription(SOCIAL_DESCRIPTION);

    await socialAutoPostPage.scrollDownByFiveHundred();
    await socialAutoPostPage.clickPartnerCategoryButton();
    await socialAutoPostPage.selectPartnerCategory();
    await socialAutoPostPage.closePartnerCategoryDropdown();

    await socialAutoPostPage.clickTwitter();
    await socialAutoPostPage.clickLinkedIn();
    await socialAutoPostPage.clickFacebook();

    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.openDateTimePicker();
    const { day, monthYear } = socialAutoPostPage.getFutureScheduleDate(1);
    await socialAutoPostPage.selectFutureDate(day, monthYear);
    // Evening time slot — verifies the time picker handles 17:30 correctly
    await socialAutoPostPage.selectTime('17', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_08 — Verify Image Allowed Sizes tooltip renders correct data
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: UI / Informational Verification
  //
  // What it verifies: hovering the info icon next to "Image Allowed Sizes"
  // triggers a Bootstrap tooltip containing a non-empty list of dimension strings.
  //
  // Why not assert exact size values?
  // The app controls this list — it can change per environment or release.
  // We verify structure (non-empty, each entry matches "number x number") rather
  // than hardcoding values that would make the test brittle.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_08 - Verify Image Allowed Sizes tooltip renders correct data', async ({ socialAutoPostPage }) => {
    const sizes = await socialAutoPostPage.getImageAllowedSizes();

    console.log('Image Allowed Sizes from tooltip:', sizes);

    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) {
      expect(size).toMatch(/^\d+ x \d+$/);
    }
  });

});

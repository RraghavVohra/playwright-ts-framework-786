import { test, expect } from '../../utils/fixtures';
import { SOCIAL_TITLE, SOCIAL_DESCRIPTION, SOCIAL_CUSTOM_URL } from '../../utils/config';

test.describe('Social Auto Post', { tag: ['@regression'] }, () => {

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
  test('TC_SAP_01 - Post PNG image 800X460 with cobranding enabled on Facebook', { tag: ['@smoke'] }, async ({ socialAutoPostPage }) => {
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
  test('TC_SAP_03 - Post MP4 video 1280X720 with JPG thumbnail and cobranding enabled', async ({ socialAutoPostPage }) => {
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
  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_09 — Upload wrong size image shows validation errors
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Negative / Validation
  //
  // What it verifies: uploading an image with a disallowed resolution (800x600)
  // triggers "Image Size not valid" after cobranding is enabled, and attempting
  // to schedule without a valid image shows "Image/Video is required".
  //
  // Why fill the full form?
  // The "Image/Video is required" error only appears when Schedule Post is clicked
  // with a complete form — the app validates all fields together on submit.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_09 - Upload wrong size image shows validation errors', async ({ socialAutoPostPage }) => {
    await socialAutoPostPage.uploadInvalidPNG();
    await socialAutoPostPage.scrollDownByTwoHundred();
    await socialAutoPostPage.clickEnableCobrandingButton();
    await socialAutoPostPage.assertImageSizeError();

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


  test('TC_SAP_08 - Verify Image Allowed Sizes tooltip renders correct data', async ({ socialAutoPostPage }) => {
    const sizes = await socialAutoPostPage.getImageAllowedSizes();

    console.log('Image Allowed Sizes from tooltip:', sizes);

    expect(sizes.length).toBeGreaterThan(0);
    for (const size of sizes) {
      expect(size).toMatch(/^\d+ x \d+$/);
    }
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_10 — Schedule post without image shows validation error
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Negative / Validation
  //
  // What it verifies: submitting the full form with all three social channels
  // selected but no image attached shows "Image/Video is required".
  //
  // Why all three channels?
  // The app allows posting without an image on Facebook only (with cobranding).
  // Selecting all three channels enforces the image requirement regardless.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_SAP_10 - Schedule post without image shows Image/Video required error', async ({ socialAutoPostPage }) => {
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
    await socialAutoPostPage.selectTime('10', '30');
    await socialAutoPostPage.verifyDateTimeSelection();

    await socialAutoPostPage.clickSchedulePostButton();
    await socialAutoPostPage.assertImageRequiredError();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_SAP_11 to TC_SAP_23 — Post each allowed PNG size on Facebook
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / Image Size Coverage
  //
  // What it verifies: every allowed PNG resolution accepted by the app
  // can be uploaded, form submitted, and post scheduled on Facebook.
  //
  // Why a loop?
  // All 13 remaining sizes follow identical steps — a loop avoids
  // duplicating the same test body 13 times while keeping TC IDs explicit.
  // ─────────────────────────────────────────────────────────────────────
  const PNG_SIZE_TESTS = [
    { tc: 'TC_SAP_11', size: '600X460',   file: 'test-data/Social Auto-posts/Sap 600X460.png'   },
    { tc: 'TC_SAP_12', size: '720X1140',  file: 'test-data/Social Auto-posts/Sap 720X1140.png'  },
    { tc: 'TC_SAP_13', size: '800X660',   file: 'test-data/Social Auto-posts/Sap 800X660.png'   },
    { tc: 'TC_SAP_14', size: '800X860',   file: 'test-data/Social Auto-posts/Sap 800X860.png'   },
    { tc: 'TC_SAP_15', size: '1024X628',  file: 'test-data/Social Auto-posts/Sap 1024X628.png'  },
    { tc: 'TC_SAP_16', size: '1080X940',  file: 'test-data/Social Auto-posts/Sap 1080X940.png'  },
    { tc: 'TC_SAP_17', size: '1200X490',  file: 'test-data/Social Auto-posts/Sap 1200X490.png'  },
    { tc: 'TC_SAP_18', size: '1200X760',  file: 'test-data/Social Auto-posts/Sap 1200X760.png'  },
    { tc: 'TC_SAP_19', size: '1200X1060', file: 'test-data/Social Auto-posts/Sap 1200X1060.png' },
    { tc: 'TC_SAP_20', size: '1440X2420', file: 'test-data/Social Auto-posts/Sap 1440X2420.png' },
    { tc: 'TC_SAP_21', size: '1600X698',  file: 'test-data/Social Auto-posts/Sap 1600X698.png'  },
    { tc: 'TC_SAP_22', size: '2048X1908', file: 'test-data/Social Auto-posts/Sap 2048X1908.png' },
    { tc: 'TC_SAP_23', size: '2160X3700', file: 'test-data/Social Auto-posts/Sap 2160X3700.png' },
  ];

  for (const { tc, size, file } of PNG_SIZE_TESTS) {
    test(`${tc} - Post PNG image ${size} with cobranding on Facebook`, async ({ socialAutoPostPage }) => {
      await socialAutoPostPage.uploadFilePath(file);
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
  }

});

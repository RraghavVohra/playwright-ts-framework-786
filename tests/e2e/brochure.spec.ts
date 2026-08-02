import { test, expect } from '../../utils/fixtures';
import { BrochurePage } from '../../pages/BrochurePage';
import {
  BROCHURE_NAME,
  BROCHURE_CATEGORY,
  BROCHURE_HASHTAG,
  BROCHURE_CATEGORY_2,
  BROCHURE_HASHTAG_2,
  SOCIAL_PARTNER_SEARCH,
  SOCIAL_PARTNER_NAME,
} from '../../utils/config';

// Runs before EVERY test in this file: land on the home page first.
// Login already handled by auth.json (storageState), so we arrive logged in.
test.beforeEach(async ({ page }) => {
  await page.goto('/home');
});

// TC_BRO_01 — Happy path: create a Brochure (PDF upload) for BOTH Mobile App and Microsite,
// through the full "New Asset" wizard, then confirm it appears in the Asset Library listing.
// Selecting Microsite adds a second thumbnail/crop round that reuses the same uploaded PDF
// instead of attaching a new file — this test exercises that two-round path deliberately,
// since it's the more complex case (a Mobile-only run would only need one round).
test('TC_BRO_01 - creates a Brochure for Mobile App and Microsite and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Leaflet');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.selectMicrositeDistribution();

  // Round 1 (Mobile) — upload a new thumbnail, crop, then "Crop & Next" since Microsite's
  // round still remains.
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndNext();

  // Round 2 (Microsite) — reuses the same file instead of a new upload, crop, then
  // "Crop & Submit" since this is the last round.
  await brochurePage.selectUploadedFileForNextThumbnail(BrochurePage.PDF_FILE.split('/').pop()!);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  // "Crop & Submit" only finalizes the crop tool inline — the same "Save & Proceed"
  // button used on the previous step is what actually advances the wizard.
  await brochurePage.clickSaveAndProceed();

  // This specific save (two thumbnails to process — Mobile + Microsite) is genuinely
  // slower than the default 15s: the button greys out, a "Content saved successfully!"
  // toast appears and stays up with its own timer spanning the page transition, and only
  // then does the navigation to Publish Asset actually happen. Confirmed by manually
  // reproducing this exact flow — not a bug, just needs more patience than default.
  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectMicrositePlatform();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_02 — Mobile App only. Mobile is checked by default and Microsite is left
// unchecked, so this is the simpler single-round thumbnail/crop path (Crop & Submit
// directly, no Crop & Next), and only Mobile App gets checked on the Publish page.
test('TC_BRO_02 - creates a Brochure for Mobile App only and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Leaflet');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  // Mobile is already checked by default — no extra click needed here.
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_03 — Microsite only. Explicitly unchecks the default Mobile selection first,
// then checks Microsite — also a single-round thumbnail/crop path, and only Microsite
// Platform gets checked on the Publish page.
test('TC_BRO_03 - creates a Brochure for Microsite only and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Leaflet');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.deselectMobileDistribution();
  await brochurePage.selectMicrositeDistribution();
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMicrositePlatform();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  // Microsite-only needs only the first toggle, not both.
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByMicrosite();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_04 — Mobile App only, with special characters in both the uploaded PDF's filename
// and the brochure Name field (apostrophe, ampersand) — guards against the same class of
// bug as Fixes.md Fix 4 (an apostrophe breaking a hand-built XPath string).
test('TC_BRO_04 - creates a Brochure with special characters in the name and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `D'Souza & Sons_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.SPECIAL_CHAR_PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Leaflet');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_05 — Mobile App only, with MULTIPLE categories and hashtags selected together
// (open once, select each, close once — see selectCategories()/selectHashtags()).
test('TC_BRO_05 - creates a Brochure with multiple categories and hashtags and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY, BROCHURE_CATEGORY_2]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG, BROCHURE_HASHTAG_2]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Leaflet');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_06 — Mobile App only, Content Type left unselected entirely.
// The "Content Type" label showed no asterisk in the details-page screenshot (unlike
// "Name *"), suggesting it's optional — this test proves that rather than assuming it.
// If it turns out to actually be required, this assertion is the one to flip.
test('TC_BRO_06 - creates a Brochure without selecting a Content Type and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  // Deliberately no selectContentType() call here.
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_07 — Mobile App only, Content Type = Factsheet.
test('TC_BRO_07 - creates a Brochure with Content Type Factsheet and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Factsheet');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

// TC_BRO_08 — Mobile App only, Content Type = Product Presentation.
test('TC_BRO_08 - creates a Brochure with Content Type Product Presentation and confirms it appears in the Asset Library', async ({ brochurePage, page }) => {
  const brochureName = `${BROCHURE_NAME}_${Date.now()}`;

  await brochurePage.navigateToCreateBrochure();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await brochurePage.uploadAssetFile(BrochurePage.PDF_FILE);
  await brochurePage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await brochurePage.enterName(brochureName);
  await brochurePage.selectCategories([BROCHURE_CATEGORY]);
  await brochurePage.selectHashtags([BROCHURE_HASHTAG]);
  await brochurePage.enterDescription('This is only for testing purpose.');
  await brochurePage.selectContentType('Product Presentation');
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await brochurePage.uploadThumbnail(BrochurePage.THUMBNAIL_IMAGE);
  await brochurePage.dragCropSelection();
  await brochurePage.clickCropAndSubmit();
  await brochurePage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await brochurePage.selectMobileApp();
  await brochurePage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await brochurePage.checkCoBrandingPush();
  await brochurePage.checkCustomSwitch(1);
  await brochurePage.checkCustomSwitch(2);
  await brochurePage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await brochurePage.filterByBrochure();
  await brochurePage.searchLibrary(brochureName);

  await expect(brochurePage.getAssetByTitle(brochureName)).toBeVisible();
});

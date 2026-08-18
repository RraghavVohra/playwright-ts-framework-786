import { test, expect } from '../../utils/fixtures';
import { BannersPage } from '../../pages/BannersPage';
import { BANNER_NAME, SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME } from '../../utils/config';

// Runs before EVERY test in this file: land on the home page first.
// Login already handled by auth.json (storageState), so we arrive logged in.
// 
test.beforeEach(async ({ page }) => {
  await page.goto('/home');
});

// TC_BNR_01 — Happy path: create a Banner through the full "New Asset" wizard,
// then confirm it actually shows up in the Asset Library listing.
// Categories/Hashtags are skipped for this first pass — they're optional (no asterisk
// on the Global Fields form) and picking real values that exist on this environment
// is a separate thing to verify once the core flow is proven.
test('TC_BNR_01 - creates a Banner and confirms it appears in the Asset Library', async ({ bannersPage, page }) => {
  const bannerName = `${BANNER_NAME}_${Date.now()}`;

  await bannersPage.navigateToCreateBanner();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await bannersPage.uploadAssetImage(BannersPage.PNG_FILE);
  await bannersPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await bannersPage.enterName(bannerName);
  await bannersPage.enterDescription('This is only for testing purpose.');
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await bannersPage.uploadThumbnail(BannersPage.PNG_FILE);
  // No drag needed — the crop tool's default selection already matches the required
  // exact pixel dimensions; dragging it risks throwing that off (see Fixes.md Fix 27).
  await bannersPage.clickCropAndSubmit();
  // "Crop & Submit" only finalizes the crop tool inline — it doesn't navigate anywhere.
  // The same "Save & Proceed" button used on the previous step is what actually advances
  // the wizard to Publish Asset.
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/);
  // Partners access is already the default selection — no need to click it explicitly
  await bannersPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await bannersPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await bannersPage.filterByBanners();
  await bannersPage.searchLibrary(bannerName);

  await expect(bannersPage.getAssetByTitle(bannerName)).toBeVisible();
});

// TC_BNR_02–04 — Same full create-and-verify flow as TC_BNR_01, one per remaining valid
// image format. Each one proves a REAL banner gets created and published for that format,
// not just that the upload step lets you past "Next".
test('TC_BNR_02 - creates a Banner using a .jpg image and confirms it appears in the Asset Library', async ({ bannersPage, page }) => {
  const bannerName = `${BANNER_NAME}_${Date.now()}`;

  await bannersPage.navigateToCreateBanner();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await bannersPage.uploadAssetImage(BannersPage.JPG_FILE);
  await bannersPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await bannersPage.enterName(bannerName);
  await bannersPage.enterDescription('This is only for testing purpose.');
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await bannersPage.uploadThumbnail(BannersPage.JPG_FILE);
  // No drag needed — the crop tool's default selection already matches the required
  // exact pixel dimensions; dragging it risks throwing that off (see Fixes.md Fix 27).
  await bannersPage.clickCropAndSubmit();
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/);
  await bannersPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await bannersPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await bannersPage.filterByBanners();
  await bannersPage.searchLibrary(bannerName);

  await expect(bannersPage.getAssetByTitle(bannerName)).toBeVisible();
});

test('TC_BNR_03 - creates a Banner using a .jpeg image and confirms it appears in the Asset Library', async ({ bannersPage, page }) => {
  const bannerName = `${BANNER_NAME}_${Date.now()}`;

  await bannersPage.navigateToCreateBanner();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await bannersPage.uploadAssetImage(BannersPage.JPEG_FILE);
  await bannersPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await bannersPage.enterName(bannerName);
  await bannersPage.enterDescription('This is only for testing purpose.');
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await bannersPage.uploadThumbnail(BannersPage.JPEG_FILE);
  // No drag needed — the crop tool's default selection already matches the required
  // exact pixel dimensions; dragging it risks throwing that off (see Fixes.md Fix 27).
  await bannersPage.clickCropAndSubmit();
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/);
  await bannersPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await bannersPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await bannersPage.filterByBanners();
  await bannersPage.searchLibrary(bannerName);

  await expect(bannersPage.getAssetByTitle(bannerName)).toBeVisible();
});

test('TC_BNR_04 - creates a Banner using a .webp image and confirms it appears in the Asset Library', async ({ bannersPage, page }) => {
  const bannerName = `${BANNER_NAME}_${Date.now()}`;

  await bannersPage.navigateToCreateBanner();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await bannersPage.uploadAssetImage(BannersPage.WEBP_FILE);
  await bannersPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await bannersPage.enterName(bannerName);
  await bannersPage.enterDescription('This is only for testing purpose.');
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await bannersPage.uploadThumbnail(BannersPage.WEBP_FILE);
  // No drag needed — the crop tool's default selection already matches the required
  // exact pixel dimensions; dragging it risks throwing that off (see Fixes.md Fix 27).
  await bannersPage.clickCropAndSubmit();
  await bannersPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/);
  await bannersPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await bannersPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await bannersPage.filterByBanners();
  await bannersPage.searchLibrary(bannerName);

  await expect(bannersPage.getAssetByTitle(bannerName)).toBeVisible();
});

// TC_BNR_05–06 — Non-image formats on the asset upload step.
// KNOWN GAP: the asset upload step has no format validation yet — accept="image/*" on the
// <input> is only a client-side hint for the OS file picker, it doesn't block a
// programmatic upload, and there's no server-side check either. These currently SUCCEED,
// which is not the desired behavior. This is a characterization test — it documents what
// actually happens today, not what should happen. Once real validation is added, these
// assertions should flip to expect a rejection instead of a successful advance.
test('TC_BNR_05 - .pdf is currently NOT blocked from the asset upload (known validation gap)', async ({ bannersPage, page }) => {
  await bannersPage.navigateToCreateBanner();
  await bannersPage.uploadAssetImage(BannersPage.PDF_FILE);
  await bannersPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
});

test('TC_BNR_06 - .csv is currently NOT blocked from the asset upload (known validation gap)', async ({ bannersPage, page }) => {
  await bannersPage.navigateToCreateBanner();
  await bannersPage.uploadAssetImage(BannersPage.CSV_FILE);
  await bannersPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
});

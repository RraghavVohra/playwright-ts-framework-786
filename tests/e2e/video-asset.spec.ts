import { test, expect } from '../../utils/fixtures';
import { VideoAssetPage } from '../../pages/VideoAssetPage';
import {
  VIDEO_ASSET_NAME,
  BROCHURE_CATEGORY,
  VIDEO_HASHTAG,
  SOCIAL_PARTNER_SEARCH,
  SOCIAL_PARTNER_NAME,
} from '../../utils/config';

// Runs before EVERY test in this file: land on the home page first.
// Login already handled by auth.json (storageState), so we arrive logged in.
test.beforeEach(async ({ page }) => {
  await page.goto('/home');
});

// TC_VID_01 — Mobile App only, all three publish-page toggles on (Co-Branding with Start
// frame Cobrand, Push Notifications, Email Notifications). Mobile is checked by default —
// single-round thumbnail/crop path, same as Brochure's Mobile-only test.
test('TC_VID_01 - creates a Video asset for Mobile App only with all toggles and confirms it appears in the Asset Library', async ({ videoAssetPage, page }) => {
  const videoName = `${VIDEO_ASSET_NAME}_${Date.now()}`;

  await videoAssetPage.navigateToCreateVideo();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await videoAssetPage.uploadVideoFile(VideoAssetPage.VIDEO_FILE);
  await videoAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await videoAssetPage.enterName(videoName);
  await videoAssetPage.selectCategories([BROCHURE_CATEGORY]);
  await videoAssetPage.selectHashtags([VIDEO_HASHTAG]);
  await videoAssetPage.selectMicrositeUrl();
  await videoAssetPage.enterDescription('This is a video only for testing purpose.');
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  // Mobile is already checked by default — single thumbnail round.
  await videoAssetPage.uploadThumbnail(VideoAssetPage.THUMBNAIL_IMAGE);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndSubmit();
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await videoAssetPage.selectMobileApp();
  await videoAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await videoAssetPage.checkCoBrandingPush();
  await videoAssetPage.checkCoBrandingToggle();
  await videoAssetPage.selectStartFrameCobrand();
  await videoAssetPage.checkPushNotificationsToggle();
  await videoAssetPage.checkEmailNotificationsToggle();
  await videoAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await videoAssetPage.filterByVideo();
  await videoAssetPage.searchLibrary(videoName);

  await expect(videoAssetPage.getAssetByTitle(videoName)).toBeVisible();
});

// TC_VID_02 — Microsite only, Co-Branding + Push Notifications toggles on. Explicitly
// unchecks the default Mobile distribution first, then checks Microsite — single-round
// thumbnail/crop path, same as Brochure's TC_BRO_03.
// Email Notifications is deliberately NOT checked here — confirmed (via a real failure:
// the toggle rendered as <input disabled>) that it's only enabled when Mobile App is
// selected, not for Microsite-only. Genuine app behavior, not a locator bug.
test('TC_VID_02 - creates a Video asset for Microsite only with Co-Branding and Push Notifications toggles and confirms it appears in the Asset Library', async ({ videoAssetPage, page }) => {
  const videoName = `${VIDEO_ASSET_NAME}_${Date.now()}`;

  await videoAssetPage.navigateToCreateVideo();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await videoAssetPage.uploadVideoFile(VideoAssetPage.VIDEO_FILE);
  await videoAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await videoAssetPage.enterName(videoName);
  await videoAssetPage.selectCategories([BROCHURE_CATEGORY]);
  await videoAssetPage.selectHashtags([VIDEO_HASHTAG]);
  await videoAssetPage.selectMicrositeUrl();
  await videoAssetPage.enterDescription('This is a video only for testing purpose.');
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await videoAssetPage.deselectMobileDistribution();
  await videoAssetPage.selectMicrositeDistribution();
  await videoAssetPage.uploadThumbnail(VideoAssetPage.THUMBNAIL_IMAGE);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndSubmit();
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await videoAssetPage.selectMicrositePlatform();
  await videoAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await videoAssetPage.checkCoBrandingPush();
  await videoAssetPage.checkCoBrandingToggle();
  await videoAssetPage.selectStartFrameCobrand();
  await videoAssetPage.checkPushNotificationsToggle();
  // Deliberately no checkEmailNotificationsToggle() — disabled for Microsite-only.
  await videoAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await videoAssetPage.filterByMicrosite();
  await videoAssetPage.searchLibrary(videoName);

  await expect(videoAssetPage.getAssetByTitle(videoName)).toBeVisible();
});

// TC_VID_03 — Mobile App AND Microsite together, only the first two publish-page toggles
// (Co-Branding + Start frame Cobrand, Push Notifications); Email Notifications left off.
// Selecting both platforms triggers the two-round thumbnail/crop path — round 1 (Mobile)
// uploads a fresh file, round 2 (Microsite) reuses it, same as Brochure's TC_BRO_01.
test('TC_VID_03 - creates a Video asset for Mobile App and Microsite with Co-Branding and Push Notifications toggles and confirms it appears in the Asset Library', async ({ videoAssetPage, page }) => {
  const videoName = `${VIDEO_ASSET_NAME}_${Date.now()}`;

  await videoAssetPage.navigateToCreateVideo();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await videoAssetPage.uploadVideoFile(VideoAssetPage.VIDEO_FILE);
  await videoAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await videoAssetPage.enterName(videoName);
  await videoAssetPage.selectCategories([BROCHURE_CATEGORY]);
  await videoAssetPage.selectHashtags([VIDEO_HASHTAG]);
  await videoAssetPage.selectMicrositeUrl();
  await videoAssetPage.enterDescription('This is a video only for testing purpose.');
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await videoAssetPage.selectMicrositeDistribution();

  // Round 1 (Mobile) — fresh upload, crop, "Crop & Next" since Microsite's round remains.
  await videoAssetPage.uploadThumbnail(VideoAssetPage.THUMBNAIL_IMAGE);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndNext();

  // Round 2 (Microsite) — reuse the same file, crop, "Crop & Submit" as the last round.
  await videoAssetPage.selectUploadedFileForNextThumbnail(VideoAssetPage.VIDEO_FILE.split('/').pop()!);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndSubmit();
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await videoAssetPage.selectMobileApp();
  await videoAssetPage.selectMicrositePlatform();
  await videoAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await videoAssetPage.checkCoBrandingPush();
  await videoAssetPage.checkCoBrandingToggle();
  await videoAssetPage.selectStartFrameCobrand();
  await videoAssetPage.checkPushNotificationsToggle();
  // Deliberately no checkEmailNotificationsToggle() here.
  await videoAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await videoAssetPage.filterByVideo();
  await videoAssetPage.searchLibrary(videoName);

  // Publishing to BOTH platforms produces two Asset Library cards sharing the same title —
  // .first() avoids the strict-mode violation, same reasoning as Brochure's TC_BRO_01.
  await expect(videoAssetPage.getAssetByTitle(videoName).first()).toBeVisible();
});

// TC_VID_04 — Mobile App AND Microsite together, ONLY the Co-Branding toggle (with a frame
// choice); Push Notifications and Email Notifications both left off. Same dual-round
// thumbnail path as TC_VID_03.
test('TC_VID_04 - creates a Video asset for Mobile App and Microsite with only the Co-Branding toggle and confirms it appears in the Asset Library', async ({ videoAssetPage, page }) => {
  const videoName = `${VIDEO_ASSET_NAME}_${Date.now()}`;

  await videoAssetPage.navigateToCreateVideo();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await videoAssetPage.uploadVideoFile(VideoAssetPage.VIDEO_FILE);
  await videoAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await videoAssetPage.enterName(videoName);
  await videoAssetPage.selectCategories([BROCHURE_CATEGORY]);
  await videoAssetPage.selectHashtags([VIDEO_HASHTAG]);
  await videoAssetPage.selectMicrositeUrl();
  await videoAssetPage.enterDescription('This is a video only for testing purpose.');
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await videoAssetPage.selectMicrositeDistribution();

  await videoAssetPage.uploadThumbnail(VideoAssetPage.THUMBNAIL_IMAGE);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndNext();

  await videoAssetPage.selectUploadedFileForNextThumbnail(VideoAssetPage.VIDEO_FILE.split('/').pop()!);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndSubmit();
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await videoAssetPage.selectMobileApp();
  await videoAssetPage.selectMicrositePlatform();
  await videoAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await videoAssetPage.checkCoBrandingPush();
  await videoAssetPage.checkCoBrandingToggle();
  await videoAssetPage.selectStartFrameCobrand();
  // Deliberately no Push/Email toggles here.
  await videoAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await videoAssetPage.filterByVideo();
  await videoAssetPage.searchLibrary(videoName);

  await expect(videoAssetPage.getAssetByTitle(videoName).first()).toBeVisible();
});

// TC_VID_05 — Mobile App AND Microsite together (dual-round thumbnail path), but NONE of
// the three publish-page toggles (Co-Branding, Push Notifications, Email Notifications)
// touched — the bare-minimum dual-platform publish, distinct from TC_VID_03/04 which each
// check a different subset of toggles.
test('TC_VID_05 - creates a Video asset for Mobile App and Microsite with no toggles selected and confirms it appears in the Asset Library', async ({ videoAssetPage, page }) => {
  const videoName = `${VIDEO_ASSET_NAME}_${Date.now()}`;

  await videoAssetPage.navigateToCreateVideo();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await videoAssetPage.uploadVideoFile(VideoAssetPage.VIDEO_FILE);
  await videoAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await videoAssetPage.enterName(videoName);
  await videoAssetPage.selectCategories([BROCHURE_CATEGORY]);
  await videoAssetPage.selectHashtags([VIDEO_HASHTAG]);
  await videoAssetPage.selectMicrositeUrl();
  await videoAssetPage.enterDescription('This is a video only for testing purpose.');
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await videoAssetPage.selectMicrositeDistribution();

  // Round 1 (Mobile) — fresh upload, crop, "Crop & Next" since Microsite's round remains.
  await videoAssetPage.uploadThumbnail(VideoAssetPage.THUMBNAIL_IMAGE);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndNext();

  // Round 2 (Microsite) — reuse the same file, crop, "Crop & Submit" as the last round.
  await videoAssetPage.selectUploadedFileForNextThumbnail(VideoAssetPage.VIDEO_FILE.split('/').pop()!);
  await videoAssetPage.dragCropSelection();
  await videoAssetPage.clickCropAndSubmit();
  await videoAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/, { timeout: 45 * 1000 });
  await videoAssetPage.selectMobileApp();
  await videoAssetPage.selectMicrositePlatform();
  await videoAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await videoAssetPage.checkCoBrandingPush();
  // Deliberately no Co-Branding/Push Notifications/Email Notifications toggles here.
  await videoAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await videoAssetPage.filterByVideo();
  await videoAssetPage.searchLibrary(videoName);

  await expect(videoAssetPage.getAssetByTitle(videoName).first()).toBeVisible();
});

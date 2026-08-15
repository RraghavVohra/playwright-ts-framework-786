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

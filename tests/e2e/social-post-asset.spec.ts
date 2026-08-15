import { test, expect } from '../../utils/fixtures';
import { SocialPostAssetPage } from '../../pages/SocialPostAssetPage';
import { SOCIAL_POST_ASSET_NAME, BROCHURE_CATEGORY, BROCHURE_HASHTAG, SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME } from '../../utils/config';

// Runs before EVERY test in this file: land on the home page first.
// Login already handled by auth.json (storageState), so we arrive logged in.
test.beforeEach(async ({ page }) => {
  await page.goto('/home');
});

// TC_SPA_01 — Happy path: create a Social Post asset for WhatsApp with co-branding and a
// Microsite URL, through the full "New Asset" wizard, then confirm it appears in the
// Asset Library listing.
test('TC_SPA_01 - creates a WhatsApp Social Post asset with co-branding and confirms it appears in the Asset Library', async ({ socialPostAssetPage, page }) => {
  const assetName = `${SOCIAL_POST_ASSET_NAME}_${Date.now()}`;

  await socialPostAssetPage.navigateToCreateSocialPost();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await socialPostAssetPage.uploadAssetImage(SocialPostAssetPage.IMAGE_FILE);
  await socialPostAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await socialPostAssetPage.enterName(assetName);
  // "Term Plan" from the original codegen recording no longer exists in this category
  // list — switched to the same category already confirmed working for Brochure.
  await socialPostAssetPage.selectCategory(BROCHURE_CATEGORY);
  // Same reasoning as the category above — "BAA" is unconfirmed, "Rag09" is proven.
  await socialPostAssetPage.selectHashtag(BROCHURE_HASHTAG);
  await socialPostAssetPage.selectMicrositeUrl();
  await socialPostAssetPage.enterLongCaption('This is an image content only for testing purpose.');
  await socialPostAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await socialPostAssetPage.uploadThumbnail(SocialPostAssetPage.IMAGE_FILE);
  await socialPostAssetPage.dragCropSelection();
  await socialPostAssetPage.clickCropAndSubmit();
  // "Crop & Submit" only finalizes the crop tool inline — the same "Save & Proceed"
  // button used on the previous step is what actually advances the wizard.
  await socialPostAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/);
  await socialPostAssetPage.selectWhatsAppPlatform();
  await socialPostAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await socialPostAssetPage.checkCoBrandingPush();
  await socialPostAssetPage.checkCustomSwitch(1);
  await socialPostAssetPage.checkCustomSwitch(2);
  await socialPostAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await socialPostAssetPage.filterBySocialPost();
  await socialPostAssetPage.searchLibrary(assetName);

  await expect(socialPostAssetPage.getAssetByTitle(assetName)).toBeVisible();
});

// TC_SPA_02 — Same content, but for Social channels (Social/Facebook/Twitter/LinkedIn)
// instead of WhatsApp. Also exercises a special character (apostrophe) in the Name field.
test('TC_SPA_02 - creates a Social Post asset for Social/Facebook/Twitter/LinkedIn and confirms it appears in the Asset Library', async ({ socialPostAssetPage, page }) => {
  const assetName = `Testing image's_${Date.now()}`;

  await socialPostAssetPage.navigateToCreateSocialPost();
  await expect(page).toHaveURL(/home\/new-asset\/upload-asset/);

  await socialPostAssetPage.uploadAssetImage(SocialPostAssetPage.IMAGE_FILE_2);
  await socialPostAssetPage.clickNext();

  await expect(page).toHaveURL(/home\/new-asset\/global-asset-details/);
  await socialPostAssetPage.enterName(assetName);
  await socialPostAssetPage.selectCategory(BROCHURE_CATEGORY);
  await socialPostAssetPage.selectHashtag(BROCHURE_HASHTAG);
  await socialPostAssetPage.selectMicrositeUrl();
  await socialPostAssetPage.enterLongCaption('This is only for testing purpose.');
  await socialPostAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/base-asset-details/);
  await socialPostAssetPage.uploadThumbnail(SocialPostAssetPage.IMAGE_FILE_2);
  await socialPostAssetPage.dragCropSelection();
  await socialPostAssetPage.clickCropAndSubmit();
  await socialPostAssetPage.clickSaveAndProceed();

  await expect(page).toHaveURL(/home\/new-asset\/publish-asset/);
  await socialPostAssetPage.selectSocialPlatform();
  await socialPostAssetPage.selectFacebookPlatform();
  await socialPostAssetPage.selectTwitterPlatform();
  await socialPostAssetPage.selectLinkedInPlatform();
  await socialPostAssetPage.selectPartner(SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME);
  await socialPostAssetPage.checkCoBrandingPush();
  await socialPostAssetPage.checkCustomSwitch(1);
  await socialPostAssetPage.checkCustomSwitch(2);
  await socialPostAssetPage.clickPublish();

  await expect(page).toHaveURL(/home\/AssetLibrary/);
  await socialPostAssetPage.filterBySocialPost();
  await socialPostAssetPage.searchLibrary(assetName);

  await expect(socialPostAssetPage.getAssetByTitle(assetName)).toBeVisible();
});

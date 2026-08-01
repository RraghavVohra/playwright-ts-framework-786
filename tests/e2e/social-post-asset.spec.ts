import { test, expect } from '../../utils/fixtures';
import { SocialPostAssetPage } from '../../pages/SocialPostAssetPage';
import { SOCIAL_POST_ASSET_NAME, SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME } from '../../utils/config';

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
  await socialPostAssetPage.selectCategory('Term Plan');
  await socialPostAssetPage.selectHashtag('BAA');
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

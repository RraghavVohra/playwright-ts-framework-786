import { Page, Locator } from '@playwright/test';

// "Social Post" is one of four asset types (Brochure, Video, Social Post, Banners) that
// share the same "New Asset" wizard — this page object only covers the Social Post path
// through it. NOT to be confused with SocialAutoPostPage.ts, which is a completely
// different, unrelated feature (the social auto-post scheduler under Communication/Automation).

export class SocialPostAssetPage {

  private page: Page;

  // Navigation
  private addNewAssetButton: Locator;
  private socialPostTypeOption: Locator;

  // Upload Asset page — hidden file input, no id/name on it, but it's the only
  // file input on this page so a plain type selector is safe
  private assetFileInput: Locator;
  private nextButton: Locator;

  // Global Asset Details page — has more fields than Banners' equivalent page
  private nameInput: Locator;
  private categoriesButton: Locator;
  private hashtagsButton: Locator;
  private micrositeUrlRadio: Locator;
  private longCaptionInput: Locator;
  private saveAndProceedButton: Locator;

  // Base Asset Details page — thumbnail upload + crop (same widget as Banners)
  private thumbnailFileInput: Locator;
  private cropSelection: Locator;
  private cropAndSubmitButton: Locator;

  // Publish Asset page — has more fields than Banners' equivalent page.
  // Different combinations of platform checkboxes get checked depending on which channels
  // the content is for — TC_SPA_01 uses only WhatsApp, TC_SPA_02 uses Social/Facebook/
  // Twitter/LinkedIn instead.
  private whatsappPlatformCheckbox: Locator;
  private socialPlatformCheckbox: Locator;
  private facebookPlatformCheckbox: Locator;
  private twitterPlatformCheckbox: Locator;
  private linkedInPlatformCheckbox: Locator;
  private selectPartnersButton: Locator;
  // aria-autocomplete="list" is a deliberate accessibility attribute react-select always
  // sets — unlike its auto-generated id (confirmed to shift between page loads elsewhere
  // in this app), this attribute is stable. Same component as BannersPage's partner picker.
  private partnerSearchInput: Locator;
  private coBrandingPushCheckbox: Locator;
  private publishButton: Locator;

  // Asset Library listing — used to verify the asset was actually created
  private socialPostFilterButton: Locator;
  private searchLibraryInput: Locator;

  // TC_SPA_02 uses IMAGE_FILE_2 instead of IMAGE_FILE so the two tests don't create
  // identical-looking Asset Library entries — purely visual variety, no functional purpose.
  static readonly IMAGE_FILE = 'test-data/Amsterdam.png';
  static readonly IMAGE_FILE_2 = 'test-data/Sweden.png';

  constructor(page: Page) {
    this.page = page;

    this.addNewAssetButton = page.getByRole('button', { name: 'Add New Asset' });
    this.socialPostTypeOption = page.getByText('Social Post', { exact: true });

    this.assetFileInput = page.locator('input[type="file"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });

    this.nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
    this.categoriesButton = page.getByRole('textbox', { name: 'Select Categories' });
    this.hashtagsButton = page.getByRole('textbox', { name: 'Select Hashtags' });
    this.micrositeUrlRadio = page.getByText('Microsite URL');
    this.longCaptionInput = page.getByRole('textbox', { name: 'Long Caption *' });
    this.saveAndProceedButton = page.getByRole('button', { name: 'Save & Proceed' });

    this.thumbnailFileInput = page.locator('input[type="file"]');
    this.cropSelection = page.locator('.ReactCrop__crop-selection');
    this.cropAndSubmitButton = page.getByRole('button', { name: 'Crop & Submit' });

    this.whatsappPlatformCheckbox = page.locator('input[name="wh-platform"]');
    this.socialPlatformCheckbox = page.locator('input[name="so-platform"]');
    this.facebookPlatformCheckbox = page.locator('input[name="fb-platform"]');
    this.twitterPlatformCheckbox = page.locator('input[name="tw-platform"]');
    this.linkedInPlatformCheckbox = page.locator('input[name="in-platform"]');
    this.selectPartnersButton = page.getByRole('button', { name: 'Select Partners' });
    this.partnerSearchInput = page.locator('input[aria-autocomplete="list"]');
    this.coBrandingPushCheckbox = page.getByRole('checkbox', { name: 'Co-Branding Push' });
    this.publishButton = page.getByRole('button', { name: 'Publish' });

    this.socialPostFilterButton = page.getByRole('button', { name: 'Social Post' });
    this.searchLibraryInput = page.getByRole('textbox', { name: 'Search library' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────

  async navigateToCreateSocialPost(): Promise<void> {
    await this.addNewAssetButton.click();
    await this.socialPostTypeOption.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // UPLOAD ASSET PAGE
  // ─────────────────────────────────────────────────────────────────────

  // setInputFiles() works directly on the hidden input — no need to click
  // "Attach" first, same pattern as every other upload in this framework.
  async uploadAssetImage(filePath: string): Promise<void> {
    await this.assetFileInput.setInputFiles(filePath);
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // GLOBAL ASSET DETAILS PAGE
  // ─────────────────────────────────────────────────────────────────────

  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.categoriesButton.click();
    await this.page.getByText(categoryName, { exact: true }).click();
    await this.page.getByText('Categories', { exact: true }).click();
  }

  async selectHashtag(hashtagName: string): Promise<void> {
    await this.hashtagsButton.click();
    await this.page.getByText(hashtagName, { exact: true }).click();
    await this.page.getByText('Hashtags', { exact: true }).click();
  }

  async selectMicrositeUrl(): Promise<void> {
    await this.micrositeUrlRadio.click();
  }

  async enterLongCaption(text: string): Promise<void> {
    await this.longCaptionInput.fill(text);
  }

  async clickSaveAndProceed(): Promise<void> {
    await this.saveAndProceedButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // BASE ASSET DETAILS PAGE — THUMBNAIL + CROP
  // ─────────────────────────────────────────────────────────────────────

  async uploadThumbnail(filePath: string): Promise<void> {
    await this.thumbnailFileInput.setInputFiles(filePath);
  }

  // ReactCrop's selection box needs a real drag to move — a .click() does nothing.
  // Same drag pattern as BannersPage.dragCropSelection() — percentage of the crop box's
  // own size, not a fixed pixel offset, since a fixed offset can push the selection out
  // of bounds on a wide/panoramic image (confirmed on Banners' TC_BNR_03).
  async dragCropSelection(): Promise<void> {
    await this.cropSelection.waitFor({ state: 'visible' });
    const box = await this.cropSelection.boundingBox();
    if (box) {
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      const offsetX = box.width * 0.02;
      const offsetY = box.height * 0.02;
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(startX + offsetX, startY + offsetY);
      await this.page.mouse.up();
    }
  }

  async clickCropAndSubmit(): Promise<void> {
    await this.cropAndSubmitButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // PUBLISH ASSET PAGE
  // ─────────────────────────────────────────────────────────────────────

  async selectWhatsAppPlatform(): Promise<void> {
    await this.whatsappPlatformCheckbox.check();
  }

  async selectSocialPlatform(): Promise<void> {
    await this.socialPlatformCheckbox.check();
  }

  async selectFacebookPlatform(): Promise<void> {
    await this.facebookPlatformCheckbox.check();
  }

  async selectTwitterPlatform(): Promise<void> {
    await this.twitterPlatformCheckbox.check();
  }

  async selectLinkedInPlatform(): Promise<void> {
    await this.linkedInPlatformCheckbox.check();
  }

  // Opens the react-select partner dropdown, filters by searchTerm, clicks the option
  // matching exactName, then closes the dropdown. Same multi-select component and same
  // "click outside via an invisible overlay" close mechanism as BannersPage.selectPartner()
  // — see that method's comment for the full explanation of why { force: true } is needed.
  async selectPartner(searchTerm: string, exactName: string): Promise<void> {
    await this.selectPartnersButton.click();
    await this.partnerSearchInput.fill(searchTerm);
    await this.page.getByText(exactName, { exact: true }).click();
    await this.page.getByText('Publish Setup', { exact: true }).click({ force: true });
    await this.partnerSearchInput.waitFor({ state: 'hidden' });
  }

  async checkCoBrandingPush(): Promise<void> {
    await this.coBrandingPushCheckbox.check();
  }

  // Two more toggles exist on this page (#custom-switch, indexes 1 and 2) described only
  // as "for publishing the content with co-branding and other things" — no confirmed
  // individual labels, so these stay positional until we learn what each one actually is.
  async checkCustomSwitch(index: number): Promise<void> {
    await this.page.locator('#custom-switch').nth(index).check();
  }

  async clickPublish(): Promise<void> {
    await this.publishButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // ASSET LIBRARY LISTING — VERIFICATION
  // ─────────────────────────────────────────────────────────────────────

  async filterBySocialPost(): Promise<void> {
    await this.socialPostFilterButton.click();
  }

  async searchLibrary(term: string): Promise<void> {
    await this.searchLibraryInput.fill(term);
    await this.searchLibraryInput.press('Enter');
  }

  getAssetByTitle(title: string): Locator {
    return this.page.getByTitle(title);
  }
}

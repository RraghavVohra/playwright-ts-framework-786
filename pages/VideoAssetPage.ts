import { Page, Locator } from '@playwright/test';

// "Video" is one of four asset types (Brochure, Video, Social Post, Banners) that share
// the same "New Asset" wizard — this page object only covers the Video path through it.
// Heavily reuses Brochure's shared components (Categories/Hashtags multi-select, the
// react-select partner picker, Co-Branding Push, the "brochure-platform"/"*-platform"
// distribution checkboxes) — see individual comments below for what's confirmed shared
// vs. what's Video-specific.

export class VideoAssetPage {

  private page: Page;

  // Navigation
  private addNewAssetButton: Locator;
  private videoTypeOption: Locator;

  // Upload Asset page — codegen recorded setInputFiles() on the decorative "Attach"
  // button itself, which doesn't work; the real hidden input lives inside
  // div.files-upload-wrapper.video (confirmed via DevTools), scoped to that wrapper's
  // "video" class so it doesn't collide with any other asset type's equivalent input.
  private videoFileInput: Locator;
  private nextButton: Locator;

  // Global Asset Details page
  private nameInput: Locator;
  private categoriesButton: Locator;
  private hashtagsButton: Locator;
  // Same shared radio as SocialPostAssetPage.micrositeUrlRadio.
  private micrositeUrlRadio: Locator;
  private descriptionInput: Locator;
  private saveAndProceedButton: Locator;

  // Base Asset Details page — thumbnail upload + crop (same ReactCrop widget as
  // Banners/Social Post/Brochure). NOTE: unlike BrochurePage, this page object does not
  // yet have selectMobileDistribution()/selectMicrositeDistribution() — the checkboxes
  // that control whether a second thumbnail round appears here haven't been confirmed
  // against real markup yet (Video's publish-page checkbox names already turned out to
  // differ from Brochure's, so guessing these would be exactly the kind of assumption
  // that's bitten this project before). To add once TC_VID_02/05 need them.
  private thumbnailFileInput: Locator;
  private cropSelection: Locator;
  private cropAndNextButton: Locator;
  private cropAndSubmitButton: Locator;

  // Publish Asset page
  // Mobile App's real name coincidentally matches Brochure's ('brochure-platform') —
  // confirmed via DevTools, not assumed. Microsite's does NOT match Brochure
  // ('microsite-platform' here vs. plain 'microsite' on Brochure) — also confirmed.
  private mobileAppCheckbox: Locator;
  private micrositePlatformCheckbox: Locator;
  private selectPartnersButton: Locator;
  private partnerSearchInput: Locator;
  private coBrandingPushCheckbox: Locator;

  // Co-Branding / Push Notifications / Email Notifications toggles, and the Start/End
  // frame Cobrand radios, all share the same non-unique id="custom-switch" — confirmed
  // via DevTools screenshots. Unlike Brochure/Social Post (where individual labels were
  // never confirmed, so positional .nth() was the only option), Video's labels ARE
  // confirmed, and the radios only render conditionally once Co-Branding is toggled on —
  // meaning a positional index here would silently shift depending on what's already been
  // toggled. Scoping by each element's own .form-check container + label text sidesteps
  // both problems.
  private coBrandingToggle: Locator;
  private pushNotificationsToggle: Locator;
  private emailNotificationsToggle: Locator;
  private startFrameCobrandRadio: Locator;
  private endFrameCobrandRadio: Locator;

  private publishButton: Locator;

  // Asset Library listing — used to verify the asset was actually created.
  // Same getByRole('button', { name: ... }) pattern as every other filter button in this
  // framework — not confirmed against real markup, consistent with how Brochure's
  // equivalent filter buttons were originally added.
  private videoFilterButton: Locator;
  private searchLibraryInput: Locator;

  static readonly VIDEO_FILE = 'test-data/video.mp4';
  static readonly THUMBNAIL_IMAGE = 'test-data/Amsterdam.png';

  constructor(page: Page) {
    this.page = page;

    this.addNewAssetButton = page.getByRole('button', { name: 'Add New Asset' });
    this.videoTypeOption = page.getByText('Video', { exact: true });

    this.videoFileInput = page.locator('div.files-upload-wrapper.video input[type="file"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });

    this.nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
    this.categoriesButton = page.getByRole('textbox', { name: 'Select Categories' });
    this.hashtagsButton = page.getByRole('textbox', { name: 'Select Hashtags' });
    this.micrositeUrlRadio = page.getByText('Microsite URL');
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.saveAndProceedButton = page.getByRole('button', { name: 'Save & Proceed' });

    // Same duplicate-hidden-input situation as Brochure — .first() targets the round
    // actually being uploaded to.
    this.thumbnailFileInput = page.locator('input[type="file"]').first();
    this.cropSelection = page.locator('.ReactCrop__crop-selection');
    this.cropAndNextButton = page.getByRole('button', { name: 'Crop & Next' });
    this.cropAndSubmitButton = page.getByRole('button', { name: 'Crop & Submit' });

    this.mobileAppCheckbox = page.locator('input[name="brochure-platform"]');
    this.micrositePlatformCheckbox = page.locator('input[name="microsite-platform"]');
    this.selectPartnersButton = page.getByRole('button', { name: 'Select Partners' });
    this.partnerSearchInput = page.locator('input[aria-autocomplete="list"]');
    this.coBrandingPushCheckbox = page.getByRole('checkbox', { name: 'Co-Branding Push' });

    this.coBrandingToggle = page.locator('.form-check', { has: page.getByText('Co-Branding', { exact: true }) }).locator('input');
    this.pushNotificationsToggle = page.locator('.form-check', { has: page.getByText('Push Notifications', { exact: true }) }).locator('input');
    this.emailNotificationsToggle = page.locator('.form-check', { has: page.getByText('Email Notifications', { exact: true }) }).locator('input');
    this.startFrameCobrandRadio = page.locator('.form-check', { has: page.getByText('Start frame Cobrand', { exact: true }) }).locator('input');
    this.endFrameCobrandRadio = page.locator('.form-check', { has: page.getByText('End frame Cobrand', { exact: true }) }).locator('input');

    this.publishButton = page.getByRole('button', { name: 'Publish' });

    this.videoFilterButton = page.getByRole('button', { name: 'Video', exact: true });
    this.searchLibraryInput = page.getByRole('textbox', { name: 'Search library' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────

  async navigateToCreateVideo(): Promise<void> {
    await this.addNewAssetButton.click();
    await this.videoTypeOption.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // UPLOAD ASSET PAGE
  // ─────────────────────────────────────────────────────────────────────

  async uploadVideoFile(filePath: string): Promise<void> {
    await this.videoFileInput.setInputFiles(filePath);
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

  // Open-once/select-multiple/close-once pattern — same as BrochurePage.selectCategories().
  async selectCategories(categoryNames: string[]): Promise<void> {
    await this.categoriesButton.click();
    for (const name of categoryNames) {
      await this.page.getByText(name, { exact: true }).click();
      await this.page.waitForTimeout(500);
    }
    await this.page.getByText('Categories', { exact: true }).click();
  }

  async selectHashtags(hashtagNames: string[]): Promise<void> {
    await this.hashtagsButton.click();
    for (const name of hashtagNames) {
      await this.page.getByText(name, { exact: true }).click();
      await this.page.waitForTimeout(500);
    }
    await this.page.getByText('Hashtags', { exact: true }).click();
  }

  async selectMicrositeUrl(): Promise<void> {
    await this.micrositeUrlRadio.click();
  }

  async enterDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
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

  // Same reasoning as BrochurePage/SocialPostAssetPage/BannersPage — percentage of the
  // crop box's own size, not a fixed pixel offset.
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

  // Use when another thumbnail round remains (Microsite selected too).
  async clickCropAndNext(): Promise<void> {
    await this.cropAndNextButton.click();
  }

  // Use on the LAST (or only) thumbnail round.
  async clickCropAndSubmit(): Promise<void> {
    await this.cropAndSubmitButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // PUBLISH ASSET PAGE
  // ─────────────────────────────────────────────────────────────────────

  async selectMobileApp(): Promise<void> {
    await this.mobileAppCheckbox.check();
  }

  async selectMicrositePlatform(): Promise<void> {
    await this.micrositePlatformCheckbox.check();
  }

  // Opens the react-select partner dropdown, filters by searchTerm, clicks the option
  // matching exactName, then closes it by force-clicking the "Access" section heading —
  // same "click outside via an invisible overlay" mechanism as Banners/Brochure/Social
  // Post's selectPartner(), just a different stable anchor text for this page.
  async selectPartner(searchTerm: string, exactName: string): Promise<void> {
    await this.selectPartnersButton.click();
    await this.partnerSearchInput.fill(searchTerm);
    await this.page.getByText(exactName, { exact: true }).click();
    await this.page.getByText('Access', { exact: true }).click({ force: true });
    await this.partnerSearchInput.waitFor({ state: 'hidden' });
  }

  async checkCoBrandingPush(): Promise<void> {
    await this.coBrandingPushCheckbox.check();
  }

  async checkCoBrandingToggle(): Promise<void> {
    await this.coBrandingToggle.check();
  }

  async checkPushNotificationsToggle(): Promise<void> {
    await this.pushNotificationsToggle.check();
  }

  async checkEmailNotificationsToggle(): Promise<void> {
    await this.emailNotificationsToggle.check();
  }

  // Only visible once checkCoBrandingToggle() has been called.
  async selectStartFrameCobrand(): Promise<void> {
    await this.startFrameCobrandRadio.check();
  }

  async selectEndFrameCobrand(): Promise<void> {
    await this.endFrameCobrandRadio.check();
  }

  async clickPublish(): Promise<void> {
    await this.publishButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // ASSET LIBRARY LISTING — VERIFICATION
  // ─────────────────────────────────────────────────────────────────────

  async filterByVideo(): Promise<void> {
    await this.videoFilterButton.click();
  }

  async searchLibrary(term: string): Promise<void> {
    await this.searchLibraryInput.fill(term);
    await this.searchLibraryInput.press('Enter');
  }

  getAssetByTitle(title: string): Locator {
    return this.page.getByTitle(title);
  }
}

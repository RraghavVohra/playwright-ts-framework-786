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
  // Banners/Social Post/Brochure). These distribution checkboxes DO match Brochure's names
  // exactly ('mobile-app'/'microsite') — confirmed via DevTools, not assumed (worth noting
  // since Video's Publish-page checkboxes below turned out NOT to all match Brochure's).
  private mobileDistributionCheckbox: Locator;
  private micrositeDistributionCheckbox: Locator;
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
  // Microsite-only content shows under its own "Microsite" filter, not "Video" — same
  // assumption Brochure's micrositeFilterButton makes (global Asset Library filter,
  // shared across every asset type, not specific to this page object).
  private micrositeFilterButton: Locator;
  private searchLibraryInput: Locator;

  static readonly VIDEO_FILE = 'test-data/video.mp4';
  // Confirmed via the "Add Video" screen's own text ("Upload videos in mp4, MOV, and
  // YouTube video link format") that .mov is a second supported format — this file's own
  // name happens to already contain an apostrophe, incidentally exercising that too.
  static readonly VIDEO_FILE_MOV = "test-data/MOVS_Video's 1280X720.mov";
  // Rotated across the 11 tests in video-asset.spec.ts so created assets don't all show the
  // identical thumbnail in the Asset Library — purely visual variety, no functional purpose.
  static readonly THUMBNAIL_IMAGE = 'test-data/Amsterdam.png';
  static readonly THUMBNAIL_IMAGE_2 = 'test-data/Sweden.png';
  static readonly THUMBNAIL_IMAGE_3 = 'test-data/newzealnd.png';
  static readonly THUMBNAIL_IMAGE_4 = 'test-data/empirestate.png';
  static readonly THUMBNAIL_IMAGE_5 = 'test-data/indiagate.png';
  static readonly THUMBNAIL_IMAGE_6 = 'test-data/goldengate.jpg';

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

    this.mobileDistributionCheckbox = page.locator('input[name="mobile-app"]');
    this.micrositeDistributionCheckbox = page.locator('input[name="microsite"]');
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
    this.micrositeFilterButton = page.getByRole('button', { name: 'Microsite' });
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

  // Mobile is checked by default — uncheck it for a Microsite-only flow.
  // Call before selectMicrositeDistribution().
  async deselectMobileDistribution(): Promise<void> {
    await this.mobileDistributionCheckbox.uncheck();
  }

  // Checking this adds a SECOND thumbnail/crop round (Microsite) on top of the default
  // Mobile round — call before uploadThumbnail() if you want both.
  async selectMicrositeDistribution(): Promise<void> {
    await this.micrositeDistributionCheckbox.check();
  }

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

  // The second thumbnail round (Microsite) reuses the already-uploaded file instead of
  // attaching a new one — same mechanism as BrochurePage.selectUploadedFileForNextThumbnail()
  // (click a div showing the filename, spaces replaced by underscores). The nth(4) index
  // is carried over from Brochure's own best-effort, not independently confirmed for
  // Video — TC_VID_05 is what actually proves this works.
  async selectUploadedFileForNextThumbnail(fileName: string): Promise<void> {
    const displayName = fileName.replace(/ /g, '_');
    await this.page.locator('div').filter({ hasText: new RegExp(`^${displayName}$`) }).nth(4).click();
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

  async filterByMicrosite(): Promise<void> {
    await this.micrositeFilterButton.click();
  }

  async searchLibrary(term: string): Promise<void> {
    await this.searchLibraryInput.fill(term);
    await this.searchLibraryInput.press('Enter');
  }

  getAssetByTitle(title: string): Locator {
    return this.page.getByTitle(title);
  }
}

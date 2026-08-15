import { Page, Locator } from '@playwright/test';

// "Brochure" is one of four asset types (Brochure, Video, Social Post, Banners) that share
// the same "New Asset" wizard — this page object only covers the Brochure path through it.
// Same wizard shape as BannersPage.ts / SocialPostAssetPage.ts, different fields per step.

export class BrochurePage {

  private page: Page;

  // Navigation
  private addNewAssetButton: Locator;
  private brochureTypeOption: Locator;

  // Upload Asset page — hidden file input, no id/name on it, but it's the only
  // file input on this page so a plain type selector is safe. Brochure uploads a PDF,
  // not an image, unlike Banners/Social Post.
  private assetFileInput: Locator;
  private nextButton: Locator;

  // Global Asset Details page
  private nameInput: Locator;
  private categoriesButton: Locator;
  private hashtagsButton: Locator;
  private descriptionInput: Locator;
  private contentTypeDropdown: Locator;
  private saveAndProceedButton: Locator;

  // Base Asset Details page — thumbnail upload + crop (same widget as Banners/Social Post).
  // Brochure can need MULTIPLE thumbnail/crop rounds — one per distribution platform
  // selected (Mobile always gets one; checking "microsite" below adds a second round that
  // reuses the same already-uploaded file instead of attaching a new one).
  private mobileDistributionCheckbox: Locator;
  private micrositeDistributionCheckbox: Locator;
  private thumbnailFileInput: Locator;
  private cropSelection: Locator;
  // "Crop & Next" appears when more thumbnail rounds remain; "Crop & Submit" only on the
  // last one — different buttons, not the same button with two different labels.
  private cropAndNextButton: Locator;
  private cropAndSubmitButton: Locator;

  // Publish Asset page
  private mobileAppCheckbox: Locator;
  private micrositePlatformCheckbox: Locator;
  private selectPartnersButton: Locator;
  // aria-autocomplete="list" is a deliberate accessibility attribute react-select always
  // sets — unlike its auto-generated id (confirmed to shift between page loads elsewhere
  // in this app), this attribute is stable. Same component as Banners/Social Post's partner picker.
  private partnerSearchInput: Locator;
  private coBrandingPushCheckbox: Locator;
  private publishButton: Locator;

  // Asset Library listing — used to verify the asset was actually created.
  // Microsite-only content shows under its own "Microsite" filter, not "Brochure" — same
  // getByRole('button', { name: ... }) pattern as every other filter button in this
  // framework (Banners, Social Post, Brochure), so reasonably confident here even though
  // it's not confirmed against real markup.
  private brochureFilterButton: Locator;
  private micrositeFilterButton: Locator;
  private searchLibraryInput: Locator;

  // Matches the exact file used in the codegen recording that
  // selectUploadedFileForNextThumbnail() was built from — using the same file here
  // increases the odds that its filename-matching logic actually lines up.
  static readonly PDF_FILE = 'test-data/Autopost Done Notification.pdf';
  // Rotated across the 8 tests in brochure.spec.ts so created assets don't all show the
  // identical thumbnail in the Asset Library — purely visual variety, no functional purpose.
  static readonly THUMBNAIL_IMAGE = 'test-data/Amsterdam.png';
  static readonly THUMBNAIL_IMAGE_2 = 'test-data/Sweden.png';
  static readonly THUMBNAIL_IMAGE_3 = 'test-data/newzealnd.png';
  static readonly THUMBNAIL_IMAGE_4 = 'test-data/empirestate.png';
  static readonly THUMBNAIL_IMAGE_5 = 'test-data/indiagate.png';
  static readonly THUMBNAIL_IMAGE_6 = 'test-data/goldengate.jpg';

  // Ampersand AND apostrophe in the filename — deliberately exercises the same class of
  // bug as Fixes.md Fix 4 (an apostrophe breaking a hand-built XPath string).
  static readonly SPECIAL_CHAR_PDF_FILE = "test-data/Web & Email Stat's.pdf";

  constructor(page: Page) {
    this.page = page;

    this.addNewAssetButton = page.getByRole('button', { name: 'Add New Asset' });
    this.brochureTypeOption = page.getByText('Brochure', { exact: true });

    this.assetFileInput = page.locator('input[type="file"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });

    this.nameInput = page.getByRole('textbox', { name: 'Name', exact: true });
    this.categoriesButton = page.getByRole('textbox', { name: 'Select Categories' });
    this.hashtagsButton = page.getByRole('textbox', { name: 'Select Hashtags' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.contentTypeDropdown = page.getByLabel('select-type');
    this.saveAndProceedButton = page.getByRole('button', { name: 'Save & Proceed' });

    this.mobileDistributionCheckbox = page.locator('input[name="mobile-app"]');
    this.micrositeDistributionCheckbox = page.locator('input[name="microsite"]');
    // When both Mobile App and Microsite are checked, TWO hidden file inputs exist in the
    // DOM at once (one per platform's thumbnail round), even though only one "Upload
    // Thumbnail" section is visually active at a time — .first() targets the Mobile round,
    // which is the only one we actually upload a fresh file for (round 2 reuses it instead).
    this.thumbnailFileInput = page.locator('input[type="file"]').first();
    this.cropSelection = page.locator('.ReactCrop__crop-selection');
    this.cropAndNextButton = page.getByRole('button', { name: 'Crop & Next' });
    this.cropAndSubmitButton = page.getByRole('button', { name: 'Crop & Submit' });

    this.mobileAppCheckbox = page.locator("//input[@name='brochure-platform']");
    this.micrositePlatformCheckbox = page.locator('input[name="microsite-platform"]');
    this.selectPartnersButton = page.getByRole('button', { name: 'Select Partners' });
    this.partnerSearchInput = page.locator('input[aria-autocomplete="list"]');
    this.coBrandingPushCheckbox = page.getByRole('checkbox', { name: 'Co-Branding Push' });
    this.publishButton = page.getByRole('button', { name: 'Publish' });

    this.brochureFilterButton = page.getByRole('button', { name: 'Brochure' });
    this.micrositeFilterButton = page.getByRole('button', { name: 'Microsite' });
    this.searchLibraryInput = page.getByRole('textbox', { name: 'Search library' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────

  async navigateToCreateBrochure(): Promise<void> {
    await this.addNewAssetButton.click();
    await this.brochureTypeOption.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // UPLOAD ASSET PAGE
  // ─────────────────────────────────────────────────────────────────────

  // setInputFiles() works directly on the hidden input — no need to click
  // "Attach" first, same pattern as every other upload in this framework.
  async uploadAssetFile(filePath: string): Promise<void> {
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

  // Opens the dropdown ONCE, selects every name in the list (pausing briefly between each
  // so the checkbox state visibly registers before the next click — same reasoning as
  // SocialAutoPostPage.selectFutureDate()'s waitForTimeout, no better deterministic signal
  // to wait on here), then closes once at the end. Works for a single category too —
  // selectCategories(['Savings']) replaces the old single-value selectCategory().
  async selectCategories(categoryNames: string[]): Promise<void> {
    await this.categoriesButton.click();
    for (const name of categoryNames) {
      await this.page.getByText(name, { exact: true }).click();
      await this.page.waitForTimeout(500);
    }
    await this.page.getByText('Categories', { exact: true }).click();
  }

  // Same open-once/select-multiple/close-once pattern as selectCategories().
  async selectHashtags(hashtagNames: string[]): Promise<void> {
    await this.hashtagsButton.click();
    for (const name of hashtagNames) {
      await this.page.getByText(name, { exact: true }).click();
      await this.page.waitForTimeout(500);
    }
    await this.page.getByText('Hashtags', { exact: true }).click();
  }

  async enterDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  // This is a native <select>, not a custom click-to-choose dropdown (confirmed via
  // codegen: .selectOption('95')) — selecting by visible label instead of that fragile
  // numeric value, since a value like '95' means nothing to anyone reading the test.
  //
  // The follow-up click on the "Content Type" label is NOT just an incidental close click
  // (an earlier version of this method dropped it, assuming that) — leaving it out meant
  // the app never actually registered the selection: Playwright's selectOption() sets the
  // native <select>'s value, but confirmed by testing that the app's own state doesn't
  // pick it up without this click, same "commit" pattern as Categories/Hashtags.
  // contentType is one of: Leaflet, Factsheet, Product Presentation, Onepager
  async selectContentType(contentType: string): Promise<void> {
    await this.contentTypeDropdown.selectOption({ label: contentType });
    await this.page.getByText('Content Type', { exact: true }).click();
  }

  async clickSaveAndProceed(): Promise<void> {
    await this.saveAndProceedButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // BASE ASSET DETAILS PAGE — THUMBNAIL + CROP
  // ─────────────────────────────────────────────────────────────────────

  // Mobile is checked by default — uncheck it for a Microsite-only flow (otherwise you'd
  // still get two thumbnail rounds). Call before selectMicrositeDistribution().
  async deselectMobileDistribution(): Promise<void> {
    await this.mobileDistributionCheckbox.uncheck();
  }

  // Checking this adds a SECOND thumbnail/crop round (for the Microsite platform) on top
  // of the default Mobile round — call this before uploadThumbnail() if you want both.
  async selectMicrositeDistribution(): Promise<void> {
    await this.micrositeDistributionCheckbox.check();
  }

  async uploadThumbnail(filePath: string): Promise<void> {
    await this.thumbnailFileInput.setInputFiles(filePath);
  }

  // The second thumbnail round (Microsite) reuses the already-uploaded file instead of
  // attaching a new one — you select it by clicking a div showing its filename, with
  // spaces replaced by underscores in how the app displays it. The nth(4) index and exact
  // underscore substitution are best-effort from a single codegen recording, not confirmed
  // against the real DOM — likely needs adjustment once actually run.
  async selectUploadedFileForNextThumbnail(fileName: string): Promise<void> {
    const displayName = fileName.replace(/ /g, '_');
    await this.page.locator('div').filter({ hasText: new RegExp(`^${displayName}$`) }).nth(4).click();
  }

  // ReactCrop's selection box needs a real drag to move — a .click() does nothing.
  // Same drag pattern as BannersPage/SocialPostAssetPage — percentage of the crop box's
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

  // Use when another thumbnail round remains (e.g. Microsite was selected too) —
  // advances to the next round instead of finishing the wizard step.
  async clickCropAndNext(): Promise<void> {
    await this.cropAndNextButton.click();
  }

  // Use on the LAST thumbnail round — finalizes this step and moves on.
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

  async checkCoBrandingPush(): Promise<void> {
    await this.coBrandingPushCheckbox.check();
  }

  // Two more toggles exist on this page (#custom-switch, indexes 1 and 2), same as
  // SocialPostAssetPage — no confirmed individual labels, so these stay positional.
  async checkCustomSwitch(index: number): Promise<void> {
    await this.page.locator('#custom-switch').nth(index).check();
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

  async clickPublish(): Promise<void> {
    await this.publishButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // ASSET LIBRARY LISTING — VERIFICATION
  // ─────────────────────────────────────────────────────────────────────

  async filterByBrochure(): Promise<void> {
    await this.brochureFilterButton.click();
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

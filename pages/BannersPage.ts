import { Page, Locator } from '@playwright/test';

// Banners is one of four asset types (Brochure, Video, Social Post, Banners) that share
// the same "New Asset" wizard — this page object only covers the Banners path through it.
//
export class BannersPage {

  private page: Page;

  // Navigation
  private addNewAssetButton: Locator;
  private bannersTypeOption: Locator;

  // Upload Asset page — hidden file input, no id/name on it, but it's the only
  // file input on this page so a plain type selector is safe
  private assetFileInput: Locator;
  private nextButton: Locator;

  // Global Asset Details page
  private nameInput: Locator;
  private descriptionInput: Locator;
  private saveAndProceedButton: Locator;

  // Base Asset Details page — thumbnail upload + crop
  private thumbnailFileInput: Locator;
  private cropSelection: Locator;
  private cropAndSubmitButton: Locator;

  // Publish Asset page
  private partnersRadio: Locator;
  private selectPartnersButton: Locator;
  // aria-autocomplete="list" is a deliberate accessibility attribute react-select always
  // sets — unlike its auto-generated id (react-select-2-input, react-select-3-input, ...
  // confirmed to shift between page loads), this attribute is stable.
  private partnerSearchInput: Locator;
  private publishButton: Locator;

  // Asset Library listing — used to verify the banner was actually created
  private bannersFilterButton: Locator;
  private searchLibraryInput: Locator;

  // Valid image formats — expected to succeed
  static readonly PNG_FILE  = 'test-data/Amsterdam.png';
  static readonly JPG_FILE  = 'test-data/goldengate.jpg';
  static readonly JPEG_FILE = 'test-data/jpeg-home.jpeg';
  static readonly WEBP_FILE = 'test-data/12.webp';

  // Non-image formats — no format validation exists yet on the asset upload step, so
  // these currently succeed too (a known gap, not the desired behavior — see Fixes.md
  // and tests/e2e/banners.spec.ts for the characterization tests covering this).
  static readonly PDF_FILE = 'test-data/Document Object Model (DOM) Made Easy.pdf';
  static readonly CSV_FILE = 'test-data/pushnotificationsspuat - Production.csv';

  constructor(page: Page) {
    this.page = page;

    this.addNewAssetButton = page.getByRole('button', { name: 'Add New Asset' });
    // The asset-type card's actual visible text is singular "Banner", not "Banners" —
    // confirmed by the click failing to find "Banners" exactly.
    this.bannersTypeOption = page.getByText('Banner', { exact: true });

    this.assetFileInput = page.locator('input[type="file"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });

    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.saveAndProceedButton = page.getByRole('button', { name: 'Save & Proceed' });

    this.thumbnailFileInput = page.locator('input[type="file"]');
    this.cropSelection = page.locator('.ReactCrop__crop-selection');
    this.cropAndSubmitButton = page.getByRole('button', { name: 'Crop & Submit' });

    this.partnersRadio = page.getByRole('radio', { name: 'Partners' });
    this.selectPartnersButton = page.getByRole('button', { name: 'Select Partners' });
    this.partnerSearchInput = page.locator('input[aria-autocomplete="list"]');
    this.publishButton = page.getByRole('button', { name: 'Publish' });

    // Same singular/plural mismatch as bannersTypeOption — the filter button's actual
    // accessible name is "Banner", confirmed via the DOM snapshot on a failed run.
    this.bannersFilterButton = page.getByRole('button', { name: 'Banner', exact: true });
    this.searchLibraryInput = page.getByRole('textbox', { name: 'Search library' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────────────────────────────────────

  async navigateToCreateBanner(): Promise<void> {
    await this.addNewAssetButton.click();
    await this.bannersTypeOption.click();
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

  // ReactCrop's selection box needs a real drag to move — a .click() does nothing.
  // Same mouse.move/down/move/up pattern as DocumentLibraryPage.resizeCroppingArea().
  //
  // The drag distance is a PERCENTAGE of the crop box's own size, not a fixed pixel
  // offset. A fixed offset (e.g. +40px) works fine for a roughly-square image but can
  // push the selection out of bounds — or shrink it to a degenerate size — on a wide/
  // panoramic image, which the server then rejects on submit ("Something Went Wrong").
  // Scaling by the box's own dimensions keeps the drag proportional regardless of the
  // uploaded image's actual size or aspect ratio.
  async dragCropSelection(): Promise<void> {
    await this.cropSelection.waitFor({ state: 'visible' });
    const box = await this.cropSelection.boundingBox();
    if (box) {
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      // 5% was enough for a 1.78 aspect-ratio image (TC_BNR_02) but not a 2.0 ratio one
      // (TC_BNR_03 — "Something Went Wrong" on submit) — 2% holds up across both.
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

  async selectPartnersAccess(): Promise<void> {
    await this.partnersRadio.check();
  }

  // Opens the react-select partner dropdown, filters by searchTerm, clicks the option
  // matching exactName, then closes the dropdown.
  // This is a multi-select (smartFolder-multiSelect) — it intentionally stays open after
  // one selection (you might want to pick more), so Escape doesn't close it. It implements
  // "click outside to close" via an invisible overlay div sitting over the page — clicking
  // "Publish Setup" is a stable, visible target well outside the dropdown's own bounding
  // box, but Playwright's normal click() refuses to fire because that overlay is "in the
  // way" (subtree intercepts pointer events). The overlay IS what we want to hit — it's
  // the thing listening for the close click — so { force: true } bypasses that safety
  // check and lets the click land on it. Explicitly wait for the search input to
  // disappear afterward — same defensive pattern as
  // SocialAutoPostPage.closePartnerCategoryDropdown().
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

  async filterByBanners(): Promise<void> {
    await this.bannersFilterButton.click();
  }

  async searchLibrary(term: string): Promise<void> {
    await this.searchLibraryInput.fill(term);
    await this.searchLibraryInput.press('Enter');
  }

  getAssetByTitle(title: string): Locator {
    return this.page.getByTitle(title);
  }
}

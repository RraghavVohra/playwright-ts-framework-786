
import { Page, Locator, expect } from '@playwright/test';
// Import the Playwright TYPES this file uses:
//   Page    = the type for one browser tab (has goto, click, etc.)
//   Locator = the type for a handle to a single element on the screen


// 'export' lets other FILES (fixtures, tests) import and use this class.
// Without it, the class is trapped inside this file.
export class TestimonialsPage {
// A field named 'page' (our chosen label) whose TYPE is Page (Playwright's tab type).
// 'private' = only code inside this class can touch it. Encapsulation.
    private page: Page;
    private setupTab: Locator;
    private testimonialsNewOption: Locator;
    private actionsButton: Locator;
    private createNewOption: Locator;
    private deleteOption: Locator;
    private testimonialsHeading: Locator;
    private testimonialsListBreadcrumb: Locator;

    // Create Testimonial form
    private profilePictureInput: Locator;
    private removeImageLink: Locator;
    private nameInput: Locator;
    private companyInput: Locator;
    private designationInput: Locator;
    private testimonialTextInput: Locator;
    private activeRadio: Locator;
    private inactiveRadio: Locator;
    private addTestimonialButton: Locator;

    // Feedback after submit
    private successMessage: Locator;
    private invalidInputBanner: Locator;
    private invalidFileTypeError: Locator;

    // Listing table — newest testimonial always appears in the first row
    private firstTestimonialRow: Locator;

    // Delete flow
    private deleteConfirmOkButton: Locator;
    private searchBox: Locator;
    private noMatchingRecordsMessage: Locator;

    // Sample files for the format-specific upload tests — resolved relative to project root
    static readonly PNG_FILE     = 'test-data/Amsterdam.png';
    static readonly JPG_FILE     = 'test-data/goldengate.jpg';
    static readonly JPEG_FILE    = 'test-data/jpeg-home.jpeg';
    static readonly GIF_FILE     = 'test-data/download.gif';
    static readonly INVALID_FILE = 'test-data/12.webp';

 // Runs once when a test does: new TestimonialsPage(page)
// In TypeScript the constructor is ALWAYS the literal word 'constructor'.
  constructor(page: Page) {
// Store the parameter (page) into this object's field (this.page)
// so every method below can reach the browser tab later.
        this.page = page;
// Top-nav "Setup" menu — opens the dropdown containing Testimonials
        this.setupTab = page.getByText('Setup',{exact: true});
// "Testimonials New" option inside the Setup menu
        this.testimonialsNewOption = page.getByRole('link',{ name: 'Testimonials New'});
        this.actionsButton = page.locator(`//*[local-name()='svg' and @width='24px']`);
        this.createNewOption = page.locator(`a[href*="framework/create/testimonial"]`);
        this.deleteOption = page.locator(`//a[@id='Delete3']`);
        // Plain getByText('Add Testimonial', {exact:true}) matches TWO elements on this
        // page — the heading AND the submit button share the same exact text. Scoping to
        // the heading's own span.fs-2.fw-bolder class avoids the strict-mode collision.
        this.testimonialsHeading = page.locator('span.fs-2.fw-bolder', { hasText: 'Add Testimonial' });
        // Breadcrumb link back to the list — used by the "cancel without saving" test
        this.testimonialsListBreadcrumb = page.getByRole('link', { name: 'Testimonials List', exact: true });

        // Create Testimonial form — all fields have real ids, no need for XPath here
        this.profilePictureInput = page.locator('#image');
        this.removeImageLink     = page.getByRole('link', { name: 'Remove' });
        this.nameInput           = page.locator('#name');
        this.companyInput        = page.locator('#company');
        this.designationInput    = page.locator('#designation');
        this.testimonialTextInput = page.locator('#testimonial_msg');
        this.activeRadio         = page.locator('#active');
        this.inactiveRadio       = page.locator('#inactive');
        this.addTestimonialButton = page.getByRole('button', { name: 'Add Testimonial' });

        // Feedback after submit
        this.successMessage      = page.getByText('Testimonial Created Successfully.', { exact: true });
        // No 'exact: true' here — this text is a bare text node sharing a parent <div> with
        // the <ul> error list, so the parent's FULL text content isn't exactly this message
        // alone (it includes the list text too). Non-exact getByText matches on substring
        // instead, which handles that correctly.
        this.invalidInputBanner  = page.getByText('There were some problems with your input.');
        this.invalidFileTypeError = page.getByText('The image must be a file of type: jpeg, jpg, png, gif.', { exact: true });

        // 'sorting_1' is a class DataTables applies only to its own sortable column —
        // anchoring on it (instead of an unscoped 'table tbody tr') avoids accidentally
        // matching hidden duplicate markup elsewhere on the page (see Fixes.md Fix 2).
        this.firstTestimonialRow = page.locator('td.sorting_1').first().locator('xpath=ancestor::tr');

        // Delete flow
        this.deleteConfirmOkButton   = page.getByRole('button', { name: 'OK' });
        this.searchBox               = page.getByRole('searchbox', { name: 'Search:' });
        this.noMatchingRecordsMessage = page.getByText('No matching records found', { exact: true });
    }

// Navigates from the current page to the Testimonials screen
async navigateToTestimonials(): Promise<void> {
// async waits on the browser, Promise<void> does work, returns no value and await on each click
// don't fire the second click until the first finishes, "this." to reach the locators the constructor regsitered.     
    await this.setupTab.click();
    await this.testimonialsNewOption.click();

}

async openActionsMenu(): Promise<void> {
    // KTMenu's dropdown is flaky to open on a single click — same issue already fixed in
    // DocumentLibraryPage.clickUploadOption() (Fix 8) and PushNotificationPage's create-notification
    // flow (Fix 12). Retry the click until the menu is confirmed open instead of trusting one click.
    await expect(async () => {
      if (!(await this.createNewOption.isVisible())) {
        await this.actionsButton.click();
      }
      await this.createNewOption.waitFor({ state: 'visible', timeout: 2000 });
    }).toPass({ timeout: 30000 });
}

async navigateToCreateTestimonial(): Promise<void> {
    await this.navigateToTestimonials(); // reuse: get to the list page
    await this.openActionsMenu();  // reuse: open the Actions menu
    await this.createNewOption.click(); // click Create Ne
}

async getAddTestimonialHeading(): Promise<string> {
  return (await this.testimonialsHeading.textContent()) ?? '';
}

async clickTestimonialsListBreadcrumb(): Promise<void> {
  await this.testimonialsListBreadcrumb.click();
}


// ─────────────────────────────────────────────────────────────────────
// CREATE TESTIMONIAL FORM METHODS
// ─────────────────────────────────────────────────────────────────────

async uploadProfilePicture(filePath: string): Promise<void> {
  await this.profilePictureInput.setInputFiles(filePath);
}

async removeProfilePicture(): Promise<void> {
  await this.removeImageLink.click();
}

async enterName(name: string): Promise<void> {
  await this.nameInput.fill(name);
}

async enterCompany(company: string): Promise<void> {
  await this.companyInput.fill(company);
}

async enterDesignation(designation: string): Promise<void> {
  await this.designationInput.fill(designation);
}

async enterTestimonialText(text: string): Promise<void> {
  await this.testimonialTextInput.fill(text);
}

async selectActiveStatus(): Promise<void> {
  await this.activeRadio.check();
}

async selectInactiveStatus(): Promise<void> {
  await this.inactiveRadio.check();
}

async clickAddTestimonialButton(): Promise<void> {
  await this.addTestimonialButton.click();
}

// Name and Testimonial Text are the only fields with the HTML `required` attribute —
// their validation is the browser's own constraint-validation tooltip, which isn't
// part of the DOM as visible text (can't be located with getByText). Read it via
// el.validationMessage instead — same pattern as DocumentLibraryPage.getDocumentNameValidation().
async getNameValidationMessage(): Promise<string> {
  return await this.nameInput.evaluate((el: HTMLInputElement) => el.validationMessage);
}

async getTestimonialTextValidationMessage(): Promise<string> {
  return await this.testimonialTextInput.evaluate((el: HTMLTextAreaElement) => el.validationMessage);
}

getSuccessMessage(): Locator {
  return this.successMessage;
}

async closeSuccessMessage(): Promise<void> {
  await this.successMessage.click();
}

// Column order in a row: checkbox, Name, Image, Company, Designation, Testimonial Text, Status, Date, Edit
async getFirstTestimonialRowData(): Promise<{
  name: string;
  company: string;
  designation: string;
  testimonialText: string;
  status: string;
}> {
  const cells = this.firstTestimonialRow.locator('td');
  await cells.first().waitFor({ state: 'visible' });
  return {
    name:            (await cells.nth(1).innerText()).trim(),
    company:         (await cells.nth(3).innerText()).trim(),
    designation:     (await cells.nth(4).innerText()).trim(),
    testimonialText: (await cells.nth(5).innerText()).trim(),
    status:          (await cells.nth(6).innerText()).trim(),
  };
}

getInvalidInputBanner(): Locator {
  return this.invalidInputBanner;
}

getInvalidFileTypeError(): Locator {
  return this.invalidFileTypeError;
}


// Expose the option locators so tests can assert on them with auto-waiting.
// The selector STRING still lives only in this file — the test just gets a handle.
getCreateNewOption(): Locator {
  return this.createNewOption;
}

getDeleteOption(): Locator {
  return this.deleteOption;
}


// ─────────────────────────────────────────────────────────────────────
// DELETE FLOW METHODS
// ─────────────────────────────────────────────────────────────────────

async selectFirstTestimonialCheckbox(): Promise<void> {
  await this.firstTestimonialRow.locator('input.row-checkbox').check();
}

async clickDeleteOption(): Promise<void> {
  await this.deleteOption.click();
}

async confirmDelete(): Promise<void> {
  await this.deleteConfirmOkButton.click();
}

// Composed convenience method — selects the most-recently-created testimonial
// (always the first row) and deletes it via checkbox -> Actions -> Delete -> OK.
//
// Confirming delete triggers a real page refresh. The list page's URL is
// /framework/testimonial both BEFORE and AFTER that refresh — so waiting for it
// AFTER clicking OK doesn't work: waitForURL() checks whatever is true the moment it's
// called, and since the URL ALREADY matches before we even click, it can resolve
// instantly without ever waiting for the actual reload (confirmed via two separate CI
// failures — the search kept applying before the reload finished, wiping itself out).
// waitForURL() is the wrong tool here regardless of ordering, since it detects a URL
// MATCH, not a genuine navigation event — and this reload doesn't change the URL at all.
//
// page.waitForNavigation() is deprecated, but it's kept here deliberately: unlike
// waitForURL(), it waits for an actual navigation/reload lifecycle event, independent of
// whether the URL changes — which is exactly what a same-URL reload needs. Started
// BEFORE the click (via Promise.all) so there's no gap where the reload could start and
// finish before we begin watching for it.
async deleteFirstTestimonial(): Promise<void> {
  await this.selectFirstTestimonialCheckbox();
  await this.openActionsMenu();
  await this.clickDeleteOption();
  await Promise.all([
    this.page.waitForNavigation(),
    this.confirmDelete(),
  ]);
  await this.page.waitForLoadState('domcontentloaded');
}

async searchTestimonial(name: string): Promise<void> {
  await this.searchBox.fill(name);
}

getNoMatchingRecordsMessage(): Locator {
  return this.noMatchingRecordsMessage;
}




}


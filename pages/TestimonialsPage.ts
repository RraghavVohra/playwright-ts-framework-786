
import { Page, Locator} from '@playwright/test';
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
        this.testimonialsHeading = page.getByText('Add Testimonial', { exact: true });
    }

// Navigates from the current page to the Testimonials screen
async navigateToTestimonials(): Promise<void> {
// async waits on the browser, Promise<void> does work, returns no value and await on each click
// don't fire the second click until the first finishes, "this." to reach the locators the constructor regsitered.     
    await this.setupTab.click();
    await this.testimonialsNewOption.click();

}

async openActionsMenu(): Promise<void> {
    await this.actionsButton.click();
}

async navigateToCreateTestimonial(): Promise<void> {
    await this.navigateToTestimonials(); // reuse: get to the list page
    await this.openActionsMenu();  // reuse: open the Actions menu
    await this.createNewOption.click(); // click Create Ne
}

async getAddTestimonialHeading(): Promise<string> {
  return (await this.testimonialsHeading.textContent()) ?? '';
}


// Expose the option locators so tests can assert on them with auto-waiting.
// The selector STRING still lives only in this file — the test just gets a handle.
getCreateNewOption(): Locator {
  return this.createNewOption;
}

getDeleteOption(): Locator {
  return this.deleteOption;
}




}


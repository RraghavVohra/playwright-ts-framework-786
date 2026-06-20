
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
    }

// Navigates from the current page to the Testimonials screen
async navigateToTestimonials(): Promise<void> {
// async waits on the browser, Promise<void> does work, returns no value and await on each click
// don't fire the second click until the first finishes, "this." to reach the locators the constructor regsitered.     
    await this.setupTab.click();
    await this.testimonialsNewOption.click();

}
}


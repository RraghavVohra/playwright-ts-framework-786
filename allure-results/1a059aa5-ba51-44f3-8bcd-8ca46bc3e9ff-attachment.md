# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testimonials.spec.ts >> TC_TST_01 - navigates to Testimonials screen
- Location: tests\e2e\testimonials.spec.ts:12:5

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByText('Setup', { exact: true })

```

# Page snapshot

```yaml
- heading "403 Forbidden" [level=1] [ref=e3]
```

# Test source

```ts
  1  | 
  2  | import { Page, Locator} from '@playwright/test';
  3  | // Import the Playwright TYPES this file uses:
  4  | //   Page    = the type for one browser tab (has goto, click, etc.)
  5  | //   Locator = the type for a handle to a single element on the screen
  6  | 
  7  | 
  8  | // 'export' lets other FILES (fixtures, tests) import and use this class.
  9  | // Without it, the class is trapped inside this file.
  10 | export class TestimonialsPage {
  11 | // A field named 'page' (our chosen label) whose TYPE is Page (Playwright's tab type).
  12 | // 'private' = only code inside this class can touch it. Encapsulation.
  13 |     private page: Page;
  14 |     private setupTab: Locator;
  15 |     private testimonialsNewOption: Locator;
  16 |     private actionsButton: Locator;
  17 |     private createNewOption: Locator;
  18 |     private deleteOption: Locator;
  19 |     private testimonialsHeading: Locator;
  20 | 
  21 |  // Runs once when a test does: new TestimonialsPage(page)
  22 | // In TypeScript the constructor is ALWAYS the literal word 'constructor'.
  23 |   constructor(page: Page) {
  24 | // Store the parameter (page) into this object's field (this.page)
  25 | // so every method below can reach the browser tab later.
  26 |         this.page = page;
  27 | // Top-nav "Setup" menu — opens the dropdown containing Testimonials
  28 |         this.setupTab = page.getByText('Setup',{exact: true});
  29 | // "Testimonials New" option inside the Setup menu
  30 |         this.testimonialsNewOption = page.getByRole('link',{ name: 'Testimonials New'});
  31 |         this.actionsButton = page.locator(`//*[local-name()='svg' and @width='24px']`);
  32 |         this.createNewOption = page.locator(`a[href*="framework/create/testimonial"]`);
  33 |         this.deleteOption = page.locator(`//a[@id='Delete3']`);
  34 |         this.testimonialsHeading = page.getByText('Add Testimonial', { exact: true });
  35 |     }
  36 | 
  37 | // Navigates from the current page to the Testimonials screen
  38 | async navigateToTestimonials(): Promise<void> {
  39 | // async waits on the browser, Promise<void> does work, returns no value and await on each click
  40 | // don't fire the second click until the first finishes, "this." to reach the locators the constructor regsitered.     
> 41 |     await this.setupTab.click();
     |                         ^ Error: locator.click: Test timeout of 90000ms exceeded.
  42 |     await this.testimonialsNewOption.click();
  43 | 
  44 | }
  45 | 
  46 | async openActionsMenu(): Promise<void> {
  47 |     await this.actionsButton.click();
  48 | }
  49 | 
  50 | async navigateToCreateTestimonial(): Promise<void> {
  51 |     await this.navigateToTestimonials(); // reuse: get to the list page
  52 |     await this.openActionsMenu();  // reuse: open the Actions menu
  53 |     await this.createNewOption.click(); // click Create Ne
  54 | }
  55 | 
  56 | async getAddTestimonialHeading(): Promise<string> {
  57 |   return (await this.testimonialsHeading.textContent()) ?? '';
  58 | }
  59 | 
  60 | 
  61 | // Expose the option locators so tests can assert on them with auto-waiting.
  62 | // The selector STRING still lives only in this file — the test just gets a handle.
  63 | getCreateNewOption(): Locator {
  64 |   return this.createNewOption;
  65 | }
  66 | 
  67 | getDeleteOption(): Locator {
  68 |   return this.deleteOption;
  69 | }
  70 | 
  71 | 
  72 | 
  73 | 
  74 | }
  75 | 
  76 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testimonials.spec.ts >> TC_TST_03 - navigates to Create Testimonial screen
- Location: tests\e2e\testimonials.spec.ts:36:5

# Error details

```
Error: locator.textContent: Error: strict mode violation: getByText('Add Testimonial', { exact: true }) resolved to 2 elements:
    1) <span class="fs-2 fw-bolder">Add Testimonial</span> aka locator('span').filter({ hasText: 'Add Testimonial' })
    2) <button type="submit" class="btn btn-primary submitcls">Add Testimonial</button> aka getByRole('button', { name: 'Add Testimonial' })

Call log:
  - waiting for getByText('Add Testimonial', { exact: true })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - img "Logo" [ref=e8]
      - generic [ref=e9]:
        - generic [ref=e12]:
          - generic [ref=e15] [cursor=pointer]: Automation
          - link "AssetLibrary" [ref=e18] [cursor=pointer]:
            - /url: https://app.digipulsesp.in/home/AssetLibrary
            - generic [ref=e19]: AssetLibrary
          - generic [ref=e22] [cursor=pointer]: journey
          - generic [ref=e25] [cursor=pointer]: Campaign
          - generic [ref=e28] [cursor=pointer]: Conversion
          - generic [ref=e31] [cursor=pointer]: Social
          - generic [ref=e34] [cursor=pointer]: Communication
          - generic [ref=e37] [cursor=pointer]: Pipeline
          - generic [ref=e40] [cursor=pointer]: Dashboard
          - generic [ref=e43] [cursor=pointer]: Setup
        - generic [ref=e46]:
          - generic [ref=e49] [cursor=pointer]: 
          - text:  
    - generic [ref=e52]:
      - navigation "breadcrumb" [ref=e53]:
        - list [ref=e54]:
          - listitem [ref=e55]:
            - link "Testimonials List" [ref=e56] [cursor=pointer]:
              - /url: https://app.digipulsesp.in/framework/testimonial
            - text: /
          - listitem [ref=e57]: Create Testimonial
      - generic [ref=e58]:
        - text: Add Testimonial
        - separator [ref=e59]
      - generic [ref=e61]:
        - generic [ref=e62]:
          - generic [ref=e63]: Profile Picture*
          - generic [ref=e64]:
            - button "Choose File" [ref=e65] [cursor=pointer]
            - text: "(Allowed formats: png, jpg, jpeg, gif)"
        - generic [ref=e66]:
          - generic [ref=e67]: Name*
          - textbox "Enter name" [ref=e69]
        - generic [ref=e70]:
          - generic [ref=e71]: Company
          - textbox "Enter Company" [ref=e73]
        - generic [ref=e74]:
          - generic [ref=e75]: Designation
          - textbox "Enter Designation" [ref=e77]
        - generic [ref=e78]:
          - generic [ref=e79]: Testimonial Text*
          - textbox [ref=e81]
        - generic [ref=e83]:
          - generic [ref=e84]: Status*
          - generic [ref=e85]:
            - radio [checked] [ref=e86]
            - text: Active
            - radio [ref=e87]
            - text: Inactive
        - button "Add Testimonial" [ref=e90] [cursor=pointer]
  - text: 
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
  41 |     await this.setupTab.click();
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
> 57 |   return (await this.testimonialsHeading.textContent()) ?? '';
     |                                          ^ Error: locator.textContent: Error: strict mode violation: getByText('Add Testimonial', { exact: true }) resolved to 2 elements:
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
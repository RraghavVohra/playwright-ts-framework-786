# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testimonials.spec.ts >> TC_TST_02 - actions menu shows Create New and Delete
- Location: tests\e2e\testimonials.spec.ts:22:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('a[href*="framework/create/testimonial"]')
Expected: visible
Received: hidden
Timeout:  15000ms

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('a[href*="framework/create/testimonial"]')
    18 × locator resolved to <a class="menu-link px-3" href="https://app.digipulsesp.in/framework/create/testimonial">…</a>
       - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
      - generic [ref=e53]:
        - text: Testimonials List
        - button [active] [ref=e54] [cursor=pointer]:
          - img [ref=e56]
        - text:  
        - separator [ref=e62]
      - generic [ref=e64]:
        - generic [ref=e66]:
          - text: Show
          - combobox "Show entries" [ref=e67]:
            - option "10" [selected]
            - option "25"
            - option "50"
            - option "100"
          - text: entries
        - generic [ref=e69]:
          - text: "Search:"
          - searchbox "Search:" [ref=e70]
        - table [ref=e71]:
          - rowgroup [ref=e72]:
            - 'row "Name: activate to sort column ascending Profile Picture: activate to sort column ascending Company: activate to sort column ascending Designation: activate to sort column ascending Message: activate to sort column ascending Status: activate to sort column ascending Created Date: activate to sort column ascending Actions: activate to sort column ascending" [ref=e73]':
              - columnheader [ref=e74] [cursor=pointer]:
                - checkbox [ref=e75]
              - 'columnheader "Name: activate to sort column ascending" [ref=e76] [cursor=pointer]': Name
              - 'columnheader "Profile Picture: activate to sort column ascending" [ref=e77] [cursor=pointer]': Profile Picture
              - 'columnheader "Company: activate to sort column ascending" [ref=e78] [cursor=pointer]': Company
              - 'columnheader "Designation: activate to sort column ascending" [ref=e79] [cursor=pointer]': Designation
              - 'columnheader "Message: activate to sort column ascending" [ref=e80] [cursor=pointer]': Message
              - 'columnheader "Status: activate to sort column ascending" [ref=e81] [cursor=pointer]': Status
              - 'columnheader "Created Date: activate to sort column ascending" [ref=e82] [cursor=pointer]': Created Date
              - 'columnheader "Actions: activate to sort column ascending" [ref=e83] [cursor=pointer]': Actions
          - rowgroup [ref=e84]:
            - row "T.J. Mahal Tata Consultancy Services Ltd. Head of Operations This's is only for testing admin account's testimonials. Active 2025-09-03 11:25 AM  Edit" [ref=e85]:
              - cell [ref=e86]:
                - checkbox [ref=e87]
              - cell "T.J. Mahal" [ref=e88]
              - cell [ref=e89]:
                - img [ref=e90]
              - cell "Tata Consultancy Services Ltd." [ref=e91]
              - cell "Head of Operations" [ref=e92]
              - cell "This's is only for testing admin account's testimonials." [ref=e93]
              - cell "Active" [ref=e94]:
                - generic [ref=e95]: Active
              - cell "2025-09-03 11:25 AM" [ref=e96]
              - cell " Edit" [ref=e97]:
                - link " Edit" [ref=e98] [cursor=pointer]:
                  - /url: addTestimonials?id=SkRNMlNTa3ZNR0JnQ21BSw==&action=edit
                  - generic [ref=e99]: 
                  - text: Edit
            - row "Paul Pogba Milwaukee Bucks & GSW General Manager & Basketball Operations Insider This's is only for testing purpose. Active 2025-07-31 10:44 PM  Edit" [ref=e100]:
              - cell [ref=e101]:
                - checkbox [ref=e102]
              - cell "Paul Pogba" [ref=e103]
              - cell [ref=e104]:
                - img [ref=e105]
              - cell "Milwaukee Bucks & GSW" [ref=e106]
              - cell "General Manager & Basketball Operations Insider" [ref=e107]
              - cell "This's is only for testing purpose." [ref=e108]
              - cell "Active" [ref=e109]:
                - generic [ref=e110]: Active
              - cell "2025-07-31 10:44 PM" [ref=e111]
              - cell " Edit" [ref=e112]:
                - link " Edit" [ref=e113] [cursor=pointer]:
                  - /url: addTestimonials?id=SkRNMU1Vc3ZNR0JnQ21BSw==&action=edit
                  - generic [ref=e114]: 
                  - text: Edit
            - row "Antoine Greizmann Dallas Mavericks & Barkeley Sons General Manager - Basketball Operations This's is for testing only and we can do it. Active 2025-07-31 10:42 PM  Edit" [ref=e115]:
              - cell [ref=e116]:
                - checkbox [ref=e117]
              - cell "Antoine Greizmann" [ref=e118]
              - cell [ref=e119]:
                - img [ref=e120]
              - cell "Dallas Mavericks & Barkeley Sons" [ref=e121]
              - cell "General Manager - Basketball Operations" [ref=e122]
              - cell "This's is for testing only and we can do it." [ref=e123]
              - cell "Active" [ref=e124]:
                - generic [ref=e125]: Active
              - cell "2025-07-31 10:42 PM" [ref=e126]
              - cell " Edit" [ref=e127]:
                - link " Edit" [ref=e128] [cursor=pointer]:
                  - /url: addTestimonials?id=SkRNMU1VY3ZNR0JnQ21BSw==&action=edit
                  - generic [ref=e129]: 
                  - text: Edit
        - status [ref=e130]: Showing 1 to 3 of 3 entries
        - generic [ref=e131]:
          - link "Previous" [disabled] [ref=e132]
          - link "1" [ref=e134]
          - link "Next" [disabled] [ref=e135]
  - text: 
```

# Test source

```ts
  1  | 
  2  | // Import from OUR fixtures file, not '@playwright/test' —
  3  | // that's what gives us the custom 'testimonialsPage' fixture.
  4  | import { test, expect } from '../../utils/fixtures';
  5  | // Runs before EVERY test in this file: land on the home page first.
  6  | // Login already handled by auth.json (storageState), so we arrive logged in.
  7  | test.beforeEach(async ({ page }) => {
  8  |     await page.goto('/home');
  9  | });
  10 | 
  11 | // TC_TST_01 — navigate to the Testimonials screen and verify the URL
  12 | test('TC_TST_01 - navigates to Testimonials screen', async ({ testimonialsPage, page }) => {
  13 | 
  14 |   // Use the page object's method — the fixture already built it for us (no 'new')
  15 |   await testimonialsPage.navigateToTestimonials();
  16 | 
  17 |   // Auto-waiting URL assertion — retries until the URL matches or times out
  18 |   await expect(page).toHaveURL(/framework\/testimonial/);
  19 | });
  20 | 
  21 | // TC_TST_02 — Actions menu shows the correct two options
  22 | test('TC_TST_02 - actions menu shows Create New and Delete', async ({ testimonialsPage }) => {
  23 | 
  24 |   // Get to the list page, then open the Actions menu
  25 |   await testimonialsPage.navigateToTestimonials();
  26 |   await testimonialsPage.openActionsMenu();
  27 | 
  28 |   // toBeVisible auto-waits/retries until the option appears (up to 15s) — no timing race.
  29 |   // await expect because the matcher polls the live page.
> 30 |   await expect(testimonialsPage.getCreateNewOption()).toBeVisible();
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  31 |   await expect(testimonialsPage.getDeleteOption()).toBeVisible();
  32 | });
  33 | 
  34 | // TC_TST_03 — Actions → Create New lands on the Add Testimonial page
  35 | // Verifies BOTH: the URL is the create page AND the heading says "Add Testimonial"
  36 | test('TC_TST_03 - navigates to Create Testimonial screen', async ({ testimonialsPage, page }) => {
  37 | 
  38 |   // One method does the whole flow: list → Actions → Create New
  39 |   await testimonialsPage.navigateToCreateTestimonial();
  40 | 
  41 |   // Check 1: the URL is now the create page
  42 |   // await expect because toHaveURL polls the live page until it matches
  43 |   await expect(page).toHaveURL(/framework\/create\/testimonial/);
  44 | 
  45 |   // Check 2: read the heading text, then assert on it
  46 |   // No await on expect here — 'heading' is already a plain string (unwrapped above)
  47 |   const heading = await testimonialsPage.getAddTestimonialHeading();
  48 |   expect(heading).toBe('Add Testimonial');
  49 | });
  50 | 
  51 | 
  52 | 
  53 | 
  54 | 
  55 | 
```
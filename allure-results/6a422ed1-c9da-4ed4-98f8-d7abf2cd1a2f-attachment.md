# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: banners.spec.ts >> TC_BNR_02 - creates a Banner using a .jpg image and confirms it appears in the Asset Library
- Location: tests\e2e\banners.spec.ts:54:5

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Add New Asset' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e6]:
      - img "Company Logo" [ref=e9]
      - heading "Login" [level=3] [ref=e12]
      - generic [ref=e16]:
        - generic [ref=e18]:
          - radio "Login with password" [checked] [ref=e19]
          - generic [ref=e20]: Login with password
        - generic [ref=e22]:
          - radio "Login with OTP" [ref=e23]
          - generic [ref=e24]: Login with OTP
        - textbox "Email address" [ref=e26]
        - generic [ref=e27]:
          - textbox "Password" [ref=e28]
          - img [ref=e29] [cursor=pointer]
        - list [ref=e33]:
          - listitem [ref=e34]:
            - link "Forgot Password" [ref=e35] [cursor=pointer]:
              - /url: /home/
        - button "Submit" [ref=e36] [cursor=pointer]
        - paragraph [ref=e37]:
          - text: On logging in, you agree with our
          - link "Privacy Policy" [ref=e38] [cursor=pointer]:
            - /url: https://salespanda.com/privacy-policy
  - iframe [ref=e41]:
    - generic [ref=f1e6]:
      - text: protected by
      - strong [ref=f1e7]: reCAPTCHA
```

# Test source

```ts
  1   | import { Page, Locator } from '@playwright/test';
  2   | 
  3   | // Banners is one of four asset types (Brochure, Video, Social Post, Banners) that share
  4   | // the same "New Asset" wizard — this page object only covers the Banners path through it.
  5   | 
  6   | export class BannersPage {
  7   | 
  8   |   private page: Page;
  9   | 
  10  |   // Navigation
  11  |   private addNewAssetButton: Locator;
  12  |   private bannersTypeOption: Locator;
  13  | 
  14  |   // Upload Asset page — hidden file input, no id/name on it, but it's the only
  15  |   // file input on this page so a plain type selector is safe
  16  |   private assetFileInput: Locator;
  17  |   private nextButton: Locator;
  18  | 
  19  |   // Global Asset Details page
  20  |   private nameInput: Locator;
  21  |   private descriptionInput: Locator;
  22  |   private saveAndProceedButton: Locator;
  23  | 
  24  |   // Base Asset Details page — thumbnail upload + crop
  25  |   private thumbnailFileInput: Locator;
  26  |   private cropSelection: Locator;
  27  |   private cropAndSubmitButton: Locator;
  28  | 
  29  |   // Publish Asset page
  30  |   private partnersRadio: Locator;
  31  |   private selectPartnersButton: Locator;
  32  |   // aria-autocomplete="list" is a deliberate accessibility attribute react-select always
  33  |   // sets — unlike its auto-generated id (react-select-2-input, react-select-3-input, ...
  34  |   // confirmed to shift between page loads), this attribute is stable.
  35  |   private partnerSearchInput: Locator;
  36  |   private publishButton: Locator;
  37  | 
  38  |   // Asset Library listing — used to verify the banner was actually created
  39  |   private bannersFilterButton: Locator;
  40  |   private searchLibraryInput: Locator;
  41  | 
  42  |   // Valid image formats — expected to succeed
  43  |   static readonly PNG_FILE  = 'test-data/Amsterdam.png';
  44  |   static readonly JPG_FILE  = 'test-data/goldengate.jpg';
  45  |   static readonly JPEG_FILE = 'test-data/jpeg-home.jpeg';
  46  |   static readonly WEBP_FILE = 'test-data/12.webp';
  47  | 
  48  |   // Non-image formats — no format validation exists yet on the asset upload step, so
  49  |   // these currently succeed too (a known gap, not the desired behavior — see Fixes.md
  50  |   // and tests/e2e/banners.spec.ts for the characterization tests covering this).
  51  |   static readonly PDF_FILE = 'test-data/Document Object Model (DOM) Made Easy.pdf';
  52  |   static readonly CSV_FILE = 'test-data/pushnotificationsspuat - Production.csv';
  53  | 
  54  |   constructor(page: Page) {
  55  |     this.page = page;
  56  | 
  57  |     this.addNewAssetButton = page.getByRole('button', { name: 'Add New Asset' });
  58  |     this.bannersTypeOption = page.getByText('Banners', { exact: true });
  59  | 
  60  |     this.assetFileInput = page.locator('input[type="file"]');
  61  |     this.nextButton = page.getByRole('button', { name: 'Next' });
  62  | 
  63  |     this.nameInput = page.getByRole('textbox', { name: 'Name' });
  64  |     this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
  65  |     this.saveAndProceedButton = page.getByRole('button', { name: 'Save & Proceed' });
  66  | 
  67  |     this.thumbnailFileInput = page.locator('input[type="file"]');
  68  |     this.cropSelection = page.locator('.ReactCrop__crop-selection');
  69  |     this.cropAndSubmitButton = page.getByRole('button', { name: 'Crop & Submit' });
  70  | 
  71  |     this.partnersRadio = page.getByRole('radio', { name: 'Partners' });
  72  |     this.selectPartnersButton = page.getByRole('button', { name: 'Select Partners' });
  73  |     this.partnerSearchInput = page.locator('input[aria-autocomplete="list"]');
  74  |     this.publishButton = page.getByRole('button', { name: 'Publish' });
  75  | 
  76  |     this.bannersFilterButton = page.getByRole('button', { name: 'Banners' });
  77  |     this.searchLibraryInput = page.getByRole('textbox', { name: 'Search library' });
  78  |   }
  79  | 
  80  | 
  81  |   // ─────────────────────────────────────────────────────────────────────
  82  |   // NAVIGATION
  83  |   // ─────────────────────────────────────────────────────────────────────
  84  | 
  85  |   async navigateToCreateBanner(): Promise<void> {
> 86  |     await this.addNewAssetButton.click();
      |                                  ^ Error: locator.click: Test timeout of 90000ms exceeded.
  87  |     await this.bannersTypeOption.click();
  88  |   }
  89  | 
  90  | 
  91  |   // ─────────────────────────────────────────────────────────────────────
  92  |   // UPLOAD ASSET PAGE
  93  |   // ─────────────────────────────────────────────────────────────────────
  94  | 
  95  |   // setInputFiles() works directly on the hidden input — no need to click
  96  |   // "Attach" first, same pattern as every other upload in this framework.
  97  |   async uploadAssetImage(filePath: string): Promise<void> {
  98  |     await this.assetFileInput.setInputFiles(filePath);
  99  |   }
  100 | 
  101 |   async clickNext(): Promise<void> {
  102 |     await this.nextButton.click();
  103 |   }
  104 | 
  105 | 
  106 |   // ─────────────────────────────────────────────────────────────────────
  107 |   // GLOBAL ASSET DETAILS PAGE
  108 |   // ─────────────────────────────────────────────────────────────────────
  109 | 
  110 |   async enterName(name: string): Promise<void> {
  111 |     await this.nameInput.fill(name);
  112 |   }
  113 | 
  114 |   async enterDescription(description: string): Promise<void> {
  115 |     await this.descriptionInput.fill(description);
  116 |   }
  117 | 
  118 |   async clickSaveAndProceed(): Promise<void> {
  119 |     await this.saveAndProceedButton.click();
  120 |   }
  121 | 
  122 | 
  123 |   // ─────────────────────────────────────────────────────────────────────
  124 |   // BASE ASSET DETAILS PAGE — THUMBNAIL + CROP
  125 |   // ─────────────────────────────────────────────────────────────────────
  126 | 
  127 |   async uploadThumbnail(filePath: string): Promise<void> {
  128 |     await this.thumbnailFileInput.setInputFiles(filePath);
  129 |   }
  130 | 
  131 |   // ReactCrop's selection box needs a real drag to move — a .click() does nothing.
  132 |   // Same mouse.move/down/move/up pattern as DocumentLibraryPage.resizeCroppingArea().
  133 |   //
  134 |   // The drag distance is a PERCENTAGE of the crop box's own size, not a fixed pixel
  135 |   // offset. A fixed offset (e.g. +40px) works fine for a roughly-square image but can
  136 |   // push the selection out of bounds — or shrink it to a degenerate size — on a wide/
  137 |   // panoramic image, which the server then rejects on submit ("Something Went Wrong").
  138 |   // Scaling by the box's own dimensions keeps the drag proportional regardless of the
  139 |   // uploaded image's actual size or aspect ratio.
  140 |   async dragCropSelection(): Promise<void> {
  141 |     await this.cropSelection.waitFor({ state: 'visible' });
  142 |     const box = await this.cropSelection.boundingBox();
  143 |     if (box) {
  144 |       const startX = box.x + box.width / 2;
  145 |       const startY = box.y + box.height / 2;
  146 |       const offsetX = box.width * 0.05;
  147 |       const offsetY = box.height * 0.05;
  148 |       await this.page.mouse.move(startX, startY);
  149 |       await this.page.mouse.down();
  150 |       await this.page.mouse.move(startX + offsetX, startY + offsetY);
  151 |       await this.page.mouse.up();
  152 |     }
  153 |   }
  154 | 
  155 |   async clickCropAndSubmit(): Promise<void> {
  156 |     await this.cropAndSubmitButton.click();
  157 |   }
  158 | 
  159 | 
  160 |   // ─────────────────────────────────────────────────────────────────────
  161 |   // PUBLISH ASSET PAGE
  162 |   // ─────────────────────────────────────────────────────────────────────
  163 | 
  164 |   async selectPartnersAccess(): Promise<void> {
  165 |     await this.partnersRadio.check();
  166 |   }
  167 | 
  168 |   // Opens the react-select partner dropdown, filters by searchTerm, clicks the option
  169 |   // matching exactName, then closes the dropdown.
  170 |   // This is a multi-select (smartFolder-multiSelect) — it intentionally stays open after
  171 |   // one selection (you might want to pick more), so Escape doesn't close it. It implements
  172 |   // "click outside to close" via an invisible overlay div sitting over the page — clicking
  173 |   // "Publish Setup" is a stable, visible target well outside the dropdown's own bounding
  174 |   // box, but Playwright's normal click() refuses to fire because that overlay is "in the
  175 |   // way" (subtree intercepts pointer events). The overlay IS what we want to hit — it's
  176 |   // the thing listening for the close click — so { force: true } bypasses that safety
  177 |   // check and lets the click land on it. Explicitly wait for the search input to
  178 |   // disappear afterward — same defensive pattern as
  179 |   // SocialAutoPostPage.closePartnerCategoryDropdown().
  180 |   async selectPartner(searchTerm: string, exactName: string): Promise<void> {
  181 |     await this.selectPartnersButton.click();
  182 |     await this.partnerSearchInput.fill(searchTerm);
  183 |     await this.page.getByText(exactName, { exact: true }).click();
  184 |     await this.page.getByText('Publish Setup', { exact: true }).click({ force: true });
  185 |     await this.partnerSearchInput.waitFor({ state: 'hidden' });
  186 |   }
```
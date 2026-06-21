# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: social-autopost.spec.ts >> Social Auto Post >> TC_SAP_18 - Post PNG image 1200X760 with cobranding on Facebook
- Location: tests\e2e\social-autopost.spec.ts:435:9

# Error details

```
Test timeout of 90000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByText('Automation', { exact: true })

```

# Page snapshot

```yaml
- heading "403 Forbidden" [level=1] [ref=e3]
```

# Test source

```ts
  74  |   static readonly PNG_1200X760   = 'test-data/Social Auto-posts/Sap 1200X760.png';
  75  |   static readonly PNG_1200X1060  = 'test-data/Social Auto-posts/Sap 1200X1060.png';
  76  |   static readonly PNG_1440X2420  = 'test-data/Social Auto-posts/Sap 1440X2420.png';
  77  |   static readonly PNG_1600X698   = 'test-data/Social Auto-posts/Sap 1600X698.png';
  78  |   static readonly PNG_2048X1908  = 'test-data/Social Auto-posts/Sap 2048X1908.png';
  79  |   static readonly PNG_2160X3700  = 'test-data/Social Auto-posts/Sap 2160X3700.png';
  80  |   // JPG — to be updated when JPG files are added to Social Auto-posts/
  81  |   static readonly JPG_FILE       = 'test-data/goldengate.jpg';
  82  |   static readonly THUMBNAIL_JPG  = 'test-data/goldengate.jpg';
  83  |   // MP4 and invalid size
  84  |   static readonly MP4_FILE         = 'test-data/Social Auto-posts/video 1280X720.mp4';
  85  |   static readonly INVALID_PNG_FILE = 'test-data/Social Auto-posts/Hello.png';
  86  | 
  87  |   // ─────────────────────────────────────────────────────────────────────
  88  |   // CONSTRUCTOR
  89  |   // ─────────────────────────────────────────────────────────────────────
  90  | 
  91  |   constructor(page: Page) {
  92  |     this.page = page;
  93  | 
  94  |     // Navigation
  95  |     // communicationTab — same locator as DocumentLibraryPage for consistency
  96  |     this.communicationTab   = page.locator("//span[text()='Communication']");
  97  |     this.automationTabProd  = page.locator("//span[normalize-space()='Automation']");
  98  |     this.socialOptionProd   = page.locator("//a[normalize-space()='Social']");
  99  |     this.socialAutoPostLink = page.locator("//a[normalize-space()='Social Auto Post']");
  100 |     this.autoPostTabProd    = page.locator("//a[normalize-space()='Auto Post']");
  101 |     this.automationTabDigipulse = page.getByText('Automation' ,{ exact : true});
  102 |     this.autoPostOptionDigipulse = page.getByRole('link', { name: 'Auto Post' });
  103 | 
  104 |     // Actions
  105 |     // actionsButton uses data-bs-toggle to target the dropdown trigger specifically —
  106 |     // avoids matching other btn-group elements on the page
  107 |     this.actionsButton    = page.locator("//div[contains(@class,'btn-group')]//a[@data-bs-toggle='dropdown']");
  108 |     this.createPostButton = page.locator("//a[normalize-space()='Create Post']");
  109 | 
  110 |     // Image Allowed Sizes tooltip
  111 |     // Scoped to the label so it won't match other info icons on the page
  112 |     this.imageAllowedSizesIcon    = page.locator("//label[contains(text(),'Image Allowed Sizes')]//span[contains(@class,'fa-info-circle')]");
  113 |     // Bootstrap 5 appends .tooltip-inner to <body> when a tooltip is triggered
  114 |     this.imageAllowedSizesTooltip = page.locator(".tooltip-inner");
  115 | 
  116 |     // File Upload
  117 |     this.fileInput      = page.locator("#file-upload");
  118 |     // Note: Java project spells this 'social_tumbnail' (typo in the app's HTML) — kept as-is
  119 |     this.thumbnailInput = page.locator("#social_tumbnail");
  120 | 
  121 |     // Form Fields
  122 |     this.cobrandingButton = page.locator("#videobrand");
  123 |     this.titleField       = page.locator("//input[@name='title' and @id='title']");
  124 |     this.descriptionField = page.locator("//textarea[@id='description_link']");
  125 | 
  126 |     // Partner Category
  127 |     this.partnerCategoryButton = page.getByText('Select Category');
  128 |     this.searchBox             = page.getByRole('textbox', { name: 'Search' });
  129 |     this.categoryLabel         = page.getByText(SOCIAL_PARTNER_NAME);
  130 |     // facebookLabel used as a post-close confirmation — visible only when dropdown is closed
  131 |     this.facebookLabel = page.locator("//label[normalize-space()='Facebook']");
  132 | 
  133 |     // Social Media Checkboxes
  134 |     this.twitterLabel  = page.locator("//label[normalize-space()='Twitter']");
  135 |     this.linkedInLabel = page.locator("//label[normalize-space()='LinkedIn']");
  136 | 
  137 |     // URL Options
  138 |     // Radio buttons use evaluate() — they don't respond to Playwright's regular click()
  139 |     this.customUrlRadio = page.locator("//input[@type='radio' and @id='C']");
  140 |     this.customUrlInput = page.locator("//input[@name='custom_url']");
  141 |     this.noneRadio      = page.locator("//input[@type='radio' and @id='N']");
  142 | 
  143 |     // Date / Time Picker
  144 |     this.dateTimeInput = page.locator("//input[contains(@class,'form_datetime')]");
  145 |     // Scoped to xdsoft_datepicker to exclude the timepicker's own next button —
  146 |     // without this scope the locator matches 2 elements and Playwright throws a strict mode violation
  147 |     this.nextMonthButton = page.locator(
  148 |       "//div[contains(@class,'xdsoft_datepicker')]//button[contains(@class,'xdsoft_next')]"
  149 |     );
  150 | 
  151 |     // Submit
  152 |     this.sendNotificationCheckbox = page.getByRole('checkbox', { name: 'Send Notification' });
  153 |     this.schedulePostButton       = page.getByRole('button', { name: 'Schedule Post' });
  154 | 
  155 |     // Validation
  156 |     this.imageSizeError = page.getByText('Image Size not valid');
  157 |   }
  158 | 
  159 | 
  160 |   // ─────────────────────────────────────────────────────────────────────
  161 |   // NAVIGATION METHODS
  162 |   // ─────────────────────────────────────────────────────────────────────
  163 | 
  164 |   // Navigation path differs by environment:
  165 |   //   dev / preprod : Communication tab → Social Auto Post link
  166 |   //   prod          : Automation tab → Social → Auto Post
  167 |   //   digipulse     : Automation tab → Auto Post
  168 |   async navigateToSocialAutoPost(): Promise<void> {
  169 |     if (ENV === 'prod') {
  170 |       await this.automationTabProd.click();
  171 |       await this.socialOptionProd.click();
  172 |       await this.autoPostTabProd.click();
  173 |     } else if (ENV === 'digipulse') {
> 174 |       await this.automationTabDigipulse.click();
      |                                         ^ Error: locator.click: Test timeout of 90000ms exceeded.
  175 |       await this.autoPostOptionDigipulse.click();
  176 |     } else {
  177 |       await this.communicationTab.click();
  178 |       await this.socialAutoPostLink.click();
  179 |     }
  180 |   }
  181 | 
  182 |   async clickActionsButton(): Promise<void> {
  183 |     await this.actionsButton.waitFor({ state: 'visible' });
  184 |     await this.actionsButton.hover();
  185 |     await this.actionsButton.click();
  186 |   }
  187 | 
  188 |   async clickCreatePostButton(): Promise<void> {
  189 |     await this.createPostButton.click();
  190 |   }
  191 | 
  192 | 
  193 |   // ─────────────────────────────────────────────────────────────────────
  194 |   // FILE UPLOAD METHODS
  195 |   // ─────────────────────────────────────────────────────────────────────
  196 | 
  197 |   async uploadFile(filePath: string): Promise<void> {
  198 |     await this.fileInput.setInputFiles(filePath);
  199 |     await expect(this.imageSizeError).not.toBeVisible();
  200 |   }
  201 | 
  202 |   // Convenience wrappers — each calls uploadFile() with the right static path
  203 |   async uploadFileInPNG(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.PNG_FILE); }
  204 |   async uploadFileInJPG(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.JPG_FILE); }
  205 |   async uploadFileInMP4(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.MP4_FILE); }
  206 |   async uploadInvalidPNG(): Promise<void>    { await this.uploadFile(SocialAutoPostPage.INVALID_PNG_FILE); }
  207 |   async uploadFilePath(filePath: string): Promise<void> { await this.uploadFile(filePath); }
  208 | 
  209 |   async uploadThumbnailInJPG(): Promise<void> {
  210 |     await this.thumbnailInput.setInputFiles(SocialAutoPostPage.THUMBNAIL_JPG);
  211 |   }
  212 | 
  213 |   async assertImageSizeError(): Promise<void> {
  214 |     await expect(this.imageSizeError).toBeVisible();
  215 |   }
  216 | 
  217 |   async assertImageRequiredError(): Promise<void> {
  218 |     await this.page.waitForSelector('text=Image/Video is required while creating a social post!', { state: 'visible' });
  219 |   }
  220 | 
  221 | 
  222 |   // ─────────────────────────────────────────────────────────────────────
  223 |   // FORM FIELD METHODS
  224 |   // ─────────────────────────────────────────────────────────────────────
  225 | 
  226 |   // The cobranding checkbox (#videobrand) doesn't respond to Playwright's regular click()
  227 |   // evaluate() bypasses the issue by triggering click() directly in the browser's JS context
  228 |   async clickEnableCobrandingButton(): Promise<void> {
  229 |     await this.cobrandingButton.evaluate(el => (el as HTMLElement).click());
  230 |   }
  231 | 
  232 |   async enterTitle(title: string): Promise<void> {
  233 |     await this.titleField.fill(title);
  234 |   }
  235 | 
  236 |   async enterDescription(description: string): Promise<void> {
  237 |     await this.descriptionField.fill(description);
  238 |   }
  239 | 
  240 | 
  241 |   // ─────────────────────────────────────────────────────────────────────
  242 |   // PARTNER CATEGORY METHODS
  243 |   // ─────────────────────────────────────────────────────────────────────
  244 | 
  245 |   // Opens the partner category multi-select dropdown and waits for the search box to appear
  246 |   async clickPartnerCategoryButton(): Promise<void> {
  247 |     await this.partnerCategoryButton.waitFor({ state: 'visible' });
  248 |     await this.partnerCategoryButton.click();
  249 |     await this.searchBox.waitFor({ state: 'visible' });
  250 |   }
  251 | 
  252 |   // Types the search term to filter options, waits for the label to appear, then clicks it
  253 |   // SOCIAL_PARTNER_SEARCH and SOCIAL_PARTNER_NAME come from env so they can change per server
  254 |   async selectPartnerCategory(): Promise<void> {
  255 |     await this.searchBox.fill(SOCIAL_PARTNER_SEARCH);
  256 |     await this.categoryLabel.waitFor({ state: 'visible' });
  257 |     await this.categoryLabel.click();
  258 |   }
  259 | 
  260 |   // Closes the partner category dropdown
  261 |   // Waits for facebookLabel to confirm the dropdown is fully closed and social checkboxes are accessible
  262 |   async closePartnerCategoryDropdown(): Promise<void> {
  263 |     if (await this.searchBox.isVisible()) {
  264 |       await this.partnerCategoryButton.click();
  265 |       await this.searchBox.waitFor({ state: 'hidden' });
  266 |     }
  267 |     await this.facebookLabel.waitFor({ state: 'visible' });
  268 |   }
  269 | 
  270 | 
  271 |   // ─────────────────────────────────────────────────────────────────────
  272 |   // SOCIAL MEDIA CHECKBOX METHODS
  273 |   // ─────────────────────────────────────────────────────────────────────
  274 | 
```
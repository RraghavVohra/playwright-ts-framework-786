# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_22_1 - Upload document in JPG format
- Location: tests\e2e\document-library.spec.ts:241:7

# Error details

```
Test timeout of 90000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('//span[text()=\'Communication\']')

```

# Page snapshot

```yaml
- heading "403 Forbidden" [level=1] [ref=e3]
```

# Test source

```ts
  73  |   static readonly CSV_FILE  = 'test-data/pushnotificationsspuat - Production.csv';
  74  |   static readonly XLSX_FILE = 'test-data/SemgrepRescanpoints.xlsx';
  75  |   static readonly MP4_FILE  = 'test-data/video.mp4';
  76  |   static readonly GIF_FILE  = 'test-data/download.gif';
  77  | 
  78  |   // No separate thumbnail PNG — Amsterdam.png is used for both document and thumbnail uploads
  79  |   static readonly THUMBNAIL_PNG = 'test-data/Amsterdam.png';
  80  |   static readonly THUMBNAIL_GIF = 'test-data/download.gif';
  81  |   static readonly THUMBNAIL_JPG = 'test-data/goldengate.jpg';
  82  | 
  83  |   // ─────────────────────────────────────────────────────────────────────
  84  |   // CONSTRUCTOR
  85  |   // ─────────────────────────────────────────────────────────────────────
  86  | 
  87  |   constructor(page: Page) {
  88  |     this.page = page;
  89  | 
  90  |     // Navigation
  91  |     this.communicationTab    = page.locator("//span[text()='Communication']");
  92  |     this.documentLibraryLink = page.locator("//a[normalize-space()='Document Library']");
  93  | 
  94  |     // Actions button renders differently per environment:
  95  |     // dev      → first SVG icon on the page
  96  |     // preprod/prod → a div with 'btn-group dropdown' class
  97  |     this.actionsButton = ENV === 'dev'
  98  |       ? page.locator("(//*[name()='svg'])[1]")
  99  |       : page.locator("//div[contains(@class,'btn-group dropdown')]");
  100 | 
  101 |     // Actions menu items
  102 |     // contains(@href) instead of exact match — preprod adds a path prefix (/manager/...)
  103 |     // not(contains(@href,'document_id')) excludes row-level Edit buttons that share the same base URL
  104 |     this.uploadMenuOption        = page.locator("//a[contains(@href,'sp-upload-document.php') and not(contains(@href,'document_id'))]");
  105 |     this.accessMenuOption        = page.locator("#add_synd");
  106 |     this.updateHashtagMenuOption = page.locator("#add_hastag");
  107 |     this.deleteMenuOption        = page.locator("#Delete3");
  108 | 
  109 |     // Upload form
  110 |     this.uploadButton      = page.locator("//input[@id='share_button']");
  111 |     this.documentNameField = page.locator("#document_name");
  112 |     this.fileInput         = page.locator("#document_file");
  113 |     this.thumbnailInput    = page.locator("#img_validate");
  114 |     this.croppingHandle    = page.locator("//div[contains(@class,'imgareaselect-border4')]");
  115 |     this.applyButton       = page.locator("//a[@class='btn yes yellow-gold pull-right']");
  116 |     this.descriptionField  = page.locator("//textarea[@class='form-control h150']");
  117 | 
  118 |     // Document options — radio buttons selected by their value attribute
  119 |     this.documentOptionTwo   = page.locator("//input[@value='2']");
  120 |     this.documentOptionThree = page.locator("//input[@value='3']");
  121 |     // Toggle switch — clicking the off-handle turns the toggle on
  122 |     this.downloadableToggle  = page.locator("//span[@class='bootstrap-switch-handle-off bootstrap-switch-default']");
  123 | 
  124 |     // Hashtag autocomplete
  125 |     this.hashtagField = page.locator("#tagcsv");
  126 |     // On preprod/prod the suggestion li has extra classes so we also match by exact text
  127 |     // On dev the generic ui-menu-item match is enough
  128 |     this.hashtagSuggestion = ENV === 'dev'
  129 |       ? page.locator("//li[contains(@class,'ui-menu-item')]")
  130 |       : page.locator("//li[contains(@class,'ui-menu-item') and normalize-space()='teaser']");
  131 | 
  132 |     // Search & listing
  133 |     this.searchBox                = page.locator("//input[@type='search' and @placeholder='Search']");
  134 |     // First document name in the table — used to grab a real name before searching/deleting
  135 |     this.firstDocumentNameElement = page.locator("(//td[@class='wBreak d-none d-md-table-cell'])[1]");
  136 |     this.noRecordsElement         = page.locator("//td[contains(@class,'dataTables_empty') and normalize-space()='No matching records found']");
  137 | 
  138 |     // Delete flow
  139 |     this.okButton  = page.locator("//button[@type='button' and @class='btn btn-primary bootbox-accept' and text()='OK']");
  140 |     this.dialogBox = page.locator("//div[@class='bootbox-body']");
  141 | 
  142 |     // First checkbox in the listing and the dynamic text cell it unlocks
  143 |     this.checkboxOption = page.locator("(//input[@id='document_content'])[1]");
  144 |     // Finds a row containing a 'Draft' badge and targets its checkbox
  145 |     // Used in TC_DL_40 — access can only be updated for Draft documents
  146 |     this.draftDocumentCheckbox = page.getByText('Draft', { exact: true })
  147 |       .first()
  148 |       .locator('xpath=ancestor::tr')
  149 |       .locator('input[id="document_content"]');
  150 |     // This cell only shows cursor:no-drop style after a checkbox is selected
  151 |     this.dynamicElement = page.locator("(//td[@class='wBreak d-none d-md-table-cell' and @style='cursor: no-drop;'])[1]");
  152 | 
  153 |     // Access control
  154 |     this.teamRadioButton      = page.locator("#partners_option");
  155 |     this.partnerCategoryButton = page.locator("#btn_ptr_category");
  156 |     this.categoryLabel         = page.locator("//label[normalize-space()='Raj2024']");
  157 |     this.updateAccessButton    = page.locator("#synd_update_id");
  158 | 
  159 |     // Schedule
  160 |     this.scheduleCheckbox  = page.locator("#schedule");
  161 |     this.scheduleTextbox   = page.locator("#schedule_synd");
  162 |     this.contentUpdateDate = page.locator("//input[@id='start_date' and @name='start_date' and @type='text']");
  163 |   }
  164 | 
  165 | 
  166 |   // ─────────────────────────────────────────────────────────────────────
  167 |   // NAVIGATION METHODS
  168 |   // ─────────────────────────────────────────────────────────────────────
  169 | 
  170 |   // Compound navigation — clicks Communication tab then Document Library link
  171 |   // Used in beforeEach so every test starts on the Document Library list page
  172 |   async navigateToDocumentLibrary(): Promise<void> {
> 173 |     await this.communicationTab.click();
      |                                 ^ Error: locator.click: Test timeout of 90000ms exceeded.
  174 |     await this.documentLibraryLink.click();
  175 |     await this.page.waitForLoadState('domcontentloaded');
  176 |   }
  177 | 
  178 |   // Opens the Actions dropdown
  179 |   // actionsButton is already env-aware from the constructor — plain click works for all envs
  180 |   // .first() guards against multiple btn-group matches; waitFor ensures the dropdown is rendered
  181 |   async clickActionsButton(): Promise<void> {
  182 |     await this.actionsButton.first().waitFor({ state: 'visible' });
  183 |     await this.actionsButton.first().click();
  184 |   }
  185 | 
  186 | 
  187 |   // ─────────────────────────────────────────────────────────────────────
  188 |   // ACTIONS MENU METHODS
  189 |   // ─────────────────────────────────────────────────────────────────────
  190 | 
  191 |   // Returns the visible text of all 4 options in the open Actions menu
  192 |   // Reads each locator individually — same approach as the Java project
  193 |   async getDocumentLibraryOptions(): Promise<string[]> {
  194 |     return [
  195 |       (await this.uploadMenuOption.innerText()).trim(),
  196 |       (await this.accessMenuOption.innerText()).trim(),
  197 |       (await this.updateHashtagMenuOption.innerText()).trim(),
  198 |       (await this.deleteMenuOption.innerText()).trim(),
  199 |     ];
  200 |   }
  201 | 
  202 |   // Dropdown can close between clickActionsButton() and here — retry re-opening it
  203 |   // until the upload option is visible, then click.
  204 |   async clickUploadOption(): Promise<void> {
  205 |     await expect(async () => {
  206 |       if (!(await this.uploadMenuOption.isVisible())) {
  207 |         await this.actionsButton.click();
  208 |       }
  209 |       await this.uploadMenuOption.waitFor({ state: 'visible', timeout: 2000 });
  210 |     }).toPass({ timeout: 30000 });
  211 |     await this.uploadMenuOption.click();
  212 |     await this.page.waitForLoadState('domcontentloaded');
  213 |   }
  214 | 
  215 |   async clickAccessOption(): Promise<void> {
  216 |     await this.accessMenuOption.click();
  217 |   }
  218 | 
  219 |   async clickDeleteOption(): Promise<void> {
  220 |     await this.deleteMenuOption.click();
  221 |   }
  222 | 
  223 | 
  224 |   // ─────────────────────────────────────────────────────────────────────
  225 |   // UPLOAD FORM METHODS
  226 |   // ─────────────────────────────────────────────────────────────────────
  227 | 
  228 |   async enterDocumentName(name: string): Promise<void> {
  229 |     await this.documentNameField.fill(name);
  230 |   }
  231 | 
  232 |   // Core upload method — sets the file directly on the hidden input
  233 |   // No OS dialog, no AutoIt — Playwright handles file inputs natively
  234 |   async uploadDocument(filePath: string): Promise<void> {
  235 |     await this.fileInput.setInputFiles(filePath);
  236 |   }
  237 | 
  238 |   // Convenience wrappers — each one calls uploadDocument() with the right static path
  239 |   async uploadDocumentUsingPDF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PDF_FILE);  }
  240 |   async uploadDocumentUsingPNG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PNG_FILE);  }
  241 |   async uploadDocumentUsingJPG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.JPG_FILE);  }
  242 |   async uploadDocumentUsingXLSX(): Promise<void> { await this.uploadDocument(DocumentLibraryPage.XLSX_FILE); }
  243 |   async uploadDocumentUsingMP4():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.MP4_FILE);  }
  244 |   async uploadDocumentUsingGIF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.GIF_FILE);  }
  245 | 
  246 |   async attachThumbnail(thumbnailPath: string): Promise<void> {
  247 |     await this.thumbnailInput.setInputFiles(thumbnailPath);
  248 |   }
  249 | 
  250 |   // Drags the crop handle to resize the cropping area on the thumbnail
  251 |   // Playwright mouse API: move → down → move (drag) → up
  252 |   // boundingBox() gives us the element's position and size on screen
  253 |   async resizeCroppingArea(): Promise<void> {
  254 |     await this.croppingHandle.waitFor({ state: 'visible' });
  255 |     const box = await this.croppingHandle.boundingBox();
  256 |     if (box) {
  257 |       await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  258 |       await this.page.mouse.down();
  259 |       await this.page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 50);
  260 |       await this.page.mouse.up();
  261 |     }
  262 |   }
  263 | 
  264 |   async clickApplyButton(): Promise<void> {
  265 |     await this.applyButton.click();
  266 |   }
  267 | 
  268 |   async enterDescription(text: string): Promise<void> {
  269 |     await this.descriptionField.scrollIntoViewIfNeeded();
  270 |     await this.descriptionField.fill(text);
  271 |   }
  272 | 
  273 |   async clickUploadButton(): Promise<void> {
```
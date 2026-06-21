# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_22_3 - Upload document in XLSX format
- Location: tests\e2e\document-library.spec.ts:296:7

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.setInputFiles: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('#document_file')

```

# Page snapshot

```yaml
- heading "403 Forbidden" [level=1] [ref=e3]
```

# Test source

```ts
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
  173 |     await this.communicationTab.click();
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
> 235 |     await this.fileInput.setInputFiles(filePath);
      |     ^ Error: locator.setInputFiles: Test timeout of 90000ms exceeded.
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
  274 |     await this.uploadButton.scrollIntoViewIfNeeded();
  275 |     await this.uploadButton.click();
  276 |   }
  277 | 
  278 | 
  279 |   // ─────────────────────────────────────────────────────────────────────
  280 |   // DOCUMENT OPTIONS METHODS
  281 |   // ─────────────────────────────────────────────────────────────────────
  282 | 
  283 |   async clickDocumentOptionTwo(): Promise<void> {
  284 |     await this.documentOptionTwo.click();
  285 |   }
  286 | 
  287 |   async clickDocumentOptionThree(): Promise<void> {
  288 |     await this.documentOptionThree.click();
  289 |   }
  290 | 
  291 |   async clickDownloadableToggle(): Promise<void> {
  292 |     await this.downloadableToggle.click();
  293 |   }
  294 | 
  295 | 
  296 |   // ─────────────────────────────────────────────────────────────────────
  297 |   // HASHTAG METHODS
  298 |   // ─────────────────────────────────────────────────────────────────────
  299 | 
  300 |   async enterHashtag(text: string): Promise<void> {
  301 |     await this.hashtagField.fill(text);
  302 |   }
  303 | 
  304 |   // hashtagSuggestion is already env-aware from the constructor
  305 |   async selectHashtagSuggestion(): Promise<void> {
  306 |     await this.hashtagSuggestion.click();
  307 |   }
  308 | 
  309 | 
  310 |   // ─────────────────────────────────────────────────────────────────────
  311 |   // VALIDATION MESSAGE METHODS
  312 |   // ─────────────────────────────────────────────────────────────────────
  313 | 
  314 |   // evaluate() runs JS in the browser on the actual DOM element
  315 |   // el.validationMessage is the browser's built-in HTML5 validation tooltip text
  316 |   async getDocumentNameValidation(): Promise<string> {
  317 |     return await this.documentNameField.evaluate((el: HTMLInputElement) => el.validationMessage);
  318 |   }
  319 | 
  320 |   async getDescriptionValidation(): Promise<string> {
  321 |     return await this.descriptionField.evaluate((el: HTMLTextAreaElement) => el.validationMessage);
  322 |   }
  323 | 
  324 |   async getFileInputValidation(): Promise<string> {
  325 |     return await this.fileInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  326 |   }
  327 | 
  328 | 
  329 |   // ─────────────────────────────────────────────────────────────────────
  330 |   // SEARCH & LISTING METHODS
  331 |   // ─────────────────────────────────────────────────────────────────────
  332 | 
  333 |   async enterSearchTerm(text: string): Promise<void> {
  334 |     await this.searchBox.fill(text);
  335 |   }
```
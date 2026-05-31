# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_22_5 - Upload with GIF thumbnail
- Location: tests\e2e\document-library.spec.ts:358:7

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('//div[contains(@class,\'imgareaselect-border4\')]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - img [ref=e5]
    - list [ref=e8]:
      - listitem
      - listitem [ref=e9]:
        - link "AssetLibrary" [ref=e10] [cursor=pointer]:
          - /url: ../home/AssetLibrary
          - text:  AssetLibrary
      - listitem [ref=e11]:
        - link "Campaign" [ref=e12] [cursor=pointer]:
          - /url: javascript:;
          - text:  Campaign
      - listitem [ref=e13]:
        - link "Conversion" [ref=e14] [cursor=pointer]:
          - /url: javascript:;
          - text:  Conversion
      - listitem [ref=e15]:
        - link "journey" [ref=e16] [cursor=pointer]:
          - /url: javascript:;
          - text:  journey
      - listitem [ref=e17]:
        - link "Communication" [ref=e18] [cursor=pointer]:
          - /url: javascript:;
          - text:  Communication
      - listitem [ref=e19]:
        - link "Dashboard" [ref=e20] [cursor=pointer]:
          - /url: javascript:;
          - text:  Dashboard
      - listitem [ref=e21]:
        - link "" [ref=e22] [cursor=pointer]:
          - /url: javascript:;
          - generic [ref=e23]: 
    - list [ref=e25]:
      - listitem [ref=e26] [cursor=pointer]:
        - link [ref=e27]:
          - /url: javascript:;
          - generic [ref=e29]: 
        - text:   
  - generic [ref=e33]:
    - navigation "breadcrumb" [ref=e34]:
      - list [ref=e35]:
        - listitem [ref=e36]:
          - link "Dashboard" [ref=e37] [cursor=pointer]:
            - /url: master-dashboard.php
        - listitem [ref=e38]:
          - text: /
          - link "Documents List" [ref=e39] [cursor=pointer]:
            - /url: sp-document-list.php
        - listitem [ref=e40]: / Add New Document
    - heading "Upload Document Details" [level=4] [ref=e41]
    - form [ref=e43]:
      - generic [ref=e44]:
        - generic [ref=e45]:
          - generic [ref=e46]: Document Name*
          - textbox [active] [ref=e48]: AutoDoc_1780239559063
        - generic [ref=e50]:
          - generic [ref=e51]: Thumbnail*
          - generic [ref=e53]:
            - generic [ref=e54] [cursor=pointer]:
              - text: Select file
              - button "Choose File" [ref=e55]
            - img
            - dialog [ref=e56]:
              - generic [ref=e58]:
                - img [ref=e61]
                - generic [ref=e66]:
                  - link "Cancel" [ref=e67] [cursor=pointer]:
                    - /url: javascript:void(0)
                  - link "Apply" [ref=e68] [cursor=pointer]:
                    - /url: javascript:void(0)
        - generic [ref=e69]:
          - generic [ref=e70]: Document File*
          - generic [ref=e71]:
            - generic [ref=e73] [cursor=pointer]:
              - text: Upload Document
              - button "Choose File" [ref=e74]
            - text: "Note : PDFs, Excel Files, Images (JPEG, PNG) and Videos (mp4) are accepted."
        - generic [ref=e75]:
          - generic [ref=e76]: Description*
          - textbox [ref=e78]
        - generic [ref=e79]:
          - generic [ref=e80]: Document Option*
          - generic [ref=e81]:
            - generic:
              - generic [ref=e82]:
                - checkbox "Important Announcements" [checked] [ref=e83]
                - text: Important Announcements
              - generic [ref=e84]:
                - checkbox "Employee PMS & Perks" [ref=e85]
                - text: Employee PMS & Perks
              - generic [ref=e86]:
                - checkbox "Leader Announcements" [ref=e87]
                - text: Leader Announcements
              - generic [ref=e88]:
                - checkbox "Premier Agency" [ref=e89]
                - text: Premier Agency
              - generic [ref=e90]:
                - checkbox "R&R" [ref=e91]
                - text: R&R
              - generic [ref=e92]:
                - checkbox "Product" [ref=e93]
                - text: Product
              - generic [ref=e94]:
                - checkbox "ECM" [ref=e95]
                - text: ECM
              - generic [ref=e96]:
                - checkbox "System & Digital" [ref=e97]
                - text: System & Digital
              - generic [ref=e98]:
                - checkbox "NPS &Training" [ref=e99]
                - text: NPS &Training
              - generic [ref=e100]:
                - checkbox "Quiz" [ref=e101]
                - text: Quiz
        - generic [ref=e102]:
          - generic [ref=e103]: Make it Downloadable
          - generic [ref=e106] [cursor=pointer]:
            - generic [ref=e107]: "ON"
            - generic [ref=e109]: "OFF"
            - checkbox [ref=e110]
        - generic [ref=e111]:
          - generic [ref=e112]: Internal Hashtags
          - textbox [ref=e115]
          - generic [ref=e116]: Add new tag
        - button "Upload" [ref=e120] [cursor=pointer]
  - generic [ref=e121]: 
  - text: 
```

# Test source

```ts
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
> 254 |     await this.croppingHandle.waitFor({ state: 'visible' });
      |                               ^ Error: locator.waitFor: Test timeout of 120000ms exceeded.
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
  336 | 
  337 |   // Reads the first document name from the listing table
  338 |   // Used by TC_DL_37 to get a real name dynamically instead of relying on hardcoded config
  339 |   async getFirstDocumentName(): Promise<string> {
  340 |     await this.firstDocumentNameElement.waitFor({ state: 'visible' });
  341 |     return (await this.firstDocumentNameElement.innerText()).trim();
  342 |   }
  343 | 
  344 |   // Dynamic locator — built at call time with the exact text to match
  345 |   // getByRole('cell') avoids XPath string interpolation — safe for names with apostrophes or quotes
  346 |   async getSearchResultText(text: string): Promise<string> {
  347 |     return await this.page.getByRole('cell', { name: text, exact: true }).innerText();
  348 |   }
  349 | 
  350 |   async getNoRecordsText(): Promise<string> {
  351 |     await this.noRecordsElement.waitFor({ state: 'visible' });
  352 |     return await this.noRecordsElement.innerText();
  353 |   }
  354 | 
```
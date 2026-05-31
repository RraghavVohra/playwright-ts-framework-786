# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_34 - Upload with all fields and internal hashtag
- Location: tests\e2e\document-library.spec.ts:574:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('//li[contains(@class,\'ui-menu-item\') and text()=\'teaser\']')

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
          - textbox [ref=e48]: AutoDoc_1780212067963
        - generic [ref=e50]:
          - generic [ref=e51]: Thumbnail*
          - generic [ref=e53]:
            - generic [ref=e54] [cursor=pointer]:
              - text: Select file
              - button "Choose File" [ref=e55]
            - img [ref=e56]
        - generic [ref=e57]:
          - generic [ref=e58]: Document File*
          - generic [ref=e59]:
            - generic [ref=e61] [cursor=pointer]:
              - text: Upload Document
              - button "Choose File" [ref=e62]
            - text: "Note : PDFs, Excel Files, Images (JPEG, PNG) and Videos (mp4) are accepted."
        - generic [ref=e63]:
          - generic [ref=e64]: Description*
          - textbox [ref=e66]: Automated test description
        - generic [ref=e67]:
          - generic [ref=e68]: Document Option*
          - generic [ref=e69]:
            - generic:
              - generic [ref=e70]:
                - checkbox "Important Announcements" [checked] [ref=e71]
                - text: Important Announcements
              - generic [ref=e72]:
                - checkbox "Employee PMS & Perks" [checked] [ref=e73]
                - text: Employee PMS & Perks
              - generic [ref=e74]:
                - checkbox "Leader Announcements" [checked] [ref=e75]
                - text: Leader Announcements
              - generic [ref=e76]:
                - checkbox "Premier Agency" [ref=e77]
                - text: Premier Agency
              - generic [ref=e78]:
                - checkbox "R&R" [ref=e79]
                - text: R&R
              - generic [ref=e80]:
                - checkbox "Product" [ref=e81]
                - text: Product
              - generic [ref=e82]:
                - checkbox "ECM" [ref=e83]
                - text: ECM
              - generic [ref=e84]:
                - checkbox "System & Digital" [ref=e85]
                - text: System & Digital
              - generic [ref=e86]:
                - checkbox "NPS &Training" [ref=e87]
                - text: NPS &Training
              - generic [ref=e88]:
                - checkbox "Quiz" [ref=e89]
                - text: Quiz
        - generic [ref=e90]:
          - generic [ref=e91]: Make it Downloadable
          - generic [ref=e94] [cursor=pointer]:
            - generic [ref=e95]: "ON"
            - generic [ref=e97]: "OFF"
            - checkbox [checked] [ref=e98]
        - generic [ref=e99]:
          - generic [ref=e100]: Internal Hashtags
          - list [ref=e102]:
            - listitem [ref=e103]:
              - textbox [active] [ref=e104]: teaser
          - generic [ref=e105]: Add new tag
        - button "Upload" [ref=e109] [cursor=pointer]
  - generic [ref=e112]: 
  - text: 
  - list [ref=e113]:
    - listitem [ref=e114] [cursor=pointer]:
      - generic [ref=e115]: teaser
  - status [ref=e116]:
    - generic [ref=e117]: 1 result is available, use up and down arrow keys to navigate.
```

# Test source

```ts
  197 |   }
  198 | 
  199 |   // Waits for the Upload option to be visible before clicking
  200 |   // On preprod the dropdown can close before the element is interactable
  201 |   async clickUploadOption(): Promise<void> {
  202 |     await this.uploadMenuOption.waitFor({ state: 'visible' });
  203 |     await this.uploadMenuOption.click();
  204 |   }
  205 | 
  206 |   async clickAccessOption(): Promise<void> {
  207 |     await this.accessMenuOption.click();
  208 |   }
  209 | 
  210 |   async clickDeleteOption(): Promise<void> {
  211 |     await this.deleteMenuOption.click();
  212 |   }
  213 | 
  214 | 
  215 |   // ─────────────────────────────────────────────────────────────────────
  216 |   // UPLOAD FORM METHODS
  217 |   // ─────────────────────────────────────────────────────────────────────
  218 | 
  219 |   async enterDocumentName(name: string): Promise<void> {
  220 |     await this.documentNameField.fill(name);
  221 |   }
  222 | 
  223 |   // Core upload method — sets the file directly on the hidden input
  224 |   // No OS dialog, no AutoIt — Playwright handles file inputs natively
  225 |   async uploadDocument(filePath: string): Promise<void> {
  226 |     await this.fileInput.setInputFiles(filePath);
  227 |   }
  228 | 
  229 |   // Convenience wrappers — each one calls uploadDocument() with the right static path
  230 |   async uploadDocumentUsingPDF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PDF_FILE);  }
  231 |   async uploadDocumentUsingPNG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PNG_FILE);  }
  232 |   async uploadDocumentUsingJPG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.JPG_FILE);  }
  233 |   async uploadDocumentUsingXLSX(): Promise<void> { await this.uploadDocument(DocumentLibraryPage.XLSX_FILE); }
  234 |   async uploadDocumentUsingMP4():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.MP4_FILE);  }
  235 |   async uploadDocumentUsingGIF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.GIF_FILE);  }
  236 | 
  237 |   async attachThumbnail(thumbnailPath: string): Promise<void> {
  238 |     await this.thumbnailInput.setInputFiles(thumbnailPath);
  239 |   }
  240 | 
  241 |   // Drags the crop handle to resize the cropping area on the thumbnail
  242 |   // Playwright mouse API: move → down → move (drag) → up
  243 |   // boundingBox() gives us the element's position and size on screen
  244 |   async resizeCroppingArea(): Promise<void> {
  245 |     await this.croppingHandle.waitFor({ state: 'visible' });
  246 |     const box = await this.croppingHandle.boundingBox();
  247 |     if (box) {
  248 |       await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  249 |       await this.page.mouse.down();
  250 |       await this.page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 50);
  251 |       await this.page.mouse.up();
  252 |     }
  253 |   }
  254 | 
  255 |   async clickApplyButton(): Promise<void> {
  256 |     await this.applyButton.click();
  257 |   }
  258 | 
  259 |   async enterDescription(text: string): Promise<void> {
  260 |     await this.descriptionField.scrollIntoViewIfNeeded();
  261 |     await this.descriptionField.fill(text);
  262 |   }
  263 | 
  264 |   async clickUploadButton(): Promise<void> {
  265 |     await this.uploadButton.scrollIntoViewIfNeeded();
  266 |     await this.uploadButton.click();
  267 |   }
  268 | 
  269 | 
  270 |   // ─────────────────────────────────────────────────────────────────────
  271 |   // DOCUMENT OPTIONS METHODS
  272 |   // ─────────────────────────────────────────────────────────────────────
  273 | 
  274 |   async clickDocumentOptionTwo(): Promise<void> {
  275 |     await this.documentOptionTwo.click();
  276 |   }
  277 | 
  278 |   async clickDocumentOptionThree(): Promise<void> {
  279 |     await this.documentOptionThree.click();
  280 |   }
  281 | 
  282 |   async clickDownloadableToggle(): Promise<void> {
  283 |     await this.downloadableToggle.click();
  284 |   }
  285 | 
  286 | 
  287 |   // ─────────────────────────────────────────────────────────────────────
  288 |   // HASHTAG METHODS
  289 |   // ─────────────────────────────────────────────────────────────────────
  290 | 
  291 |   async enterHashtag(text: string): Promise<void> {
  292 |     await this.hashtagField.fill(text);
  293 |   }
  294 | 
  295 |   // hashtagSuggestion is already env-aware from the constructor
  296 |   async selectHashtagSuggestion(): Promise<void> {
> 297 |     await this.hashtagSuggestion.click();
      |                                  ^ Error: locator.click: Test timeout of 60000ms exceeded.
  298 |   }
  299 | 
  300 | 
  301 |   // ─────────────────────────────────────────────────────────────────────
  302 |   // VALIDATION MESSAGE METHODS
  303 |   // ─────────────────────────────────────────────────────────────────────
  304 | 
  305 |   // evaluate() runs JS in the browser on the actual DOM element
  306 |   // el.validationMessage is the browser's built-in HTML5 validation tooltip text
  307 |   async getDocumentNameValidation(): Promise<string> {
  308 |     return await this.documentNameField.evaluate((el: HTMLInputElement) => el.validationMessage);
  309 |   }
  310 | 
  311 |   async getDescriptionValidation(): Promise<string> {
  312 |     return await this.descriptionField.evaluate((el: HTMLTextAreaElement) => el.validationMessage);
  313 |   }
  314 | 
  315 |   async getFileInputValidation(): Promise<string> {
  316 |     return await this.fileInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  317 |   }
  318 | 
  319 | 
  320 |   // ─────────────────────────────────────────────────────────────────────
  321 |   // SEARCH & LISTING METHODS
  322 |   // ─────────────────────────────────────────────────────────────────────
  323 | 
  324 |   async enterSearchTerm(text: string): Promise<void> {
  325 |     await this.searchBox.fill(text);
  326 |   }
  327 | 
  328 |   // Reads the first document name from the listing table
  329 |   // Used by TC_DL_37 to get a real name dynamically instead of relying on hardcoded config
  330 |   async getFirstDocumentName(): Promise<string> {
  331 |     await this.firstDocumentNameElement.waitFor({ state: 'visible' });
  332 |     return (await this.firstDocumentNameElement.innerText()).trim();
  333 |   }
  334 | 
  335 |   // Dynamic locator — built at call time with the exact text to match
  336 |   // getByRole('cell') avoids XPath string interpolation — safe for names with apostrophes or quotes
  337 |   async getSearchResultText(text: string): Promise<string> {
  338 |     return await this.page.getByRole('cell', { name: text, exact: true }).innerText();
  339 |   }
  340 | 
  341 |   async getNoRecordsText(): Promise<string> {
  342 |     await this.noRecordsElement.waitFor({ state: 'visible' });
  343 |     return await this.noRecordsElement.innerText();
  344 |   }
  345 | 
  346 | 
  347 |   // ─────────────────────────────────────────────────────────────────────
  348 |   // DELETE FLOW METHODS
  349 |   // ─────────────────────────────────────────────────────────────────────
  350 | 
  351 |   // waitFor(visible) here so tests don't need a sleep before reading the dialog
  352 |   async getDialogBoxText(): Promise<string> {
  353 |     await this.dialogBox.waitFor({ state: 'visible' });
  354 |     return await this.dialogBox.innerText();
  355 |   }
  356 | 
  357 |   async clickOkButton(): Promise<void> {
  358 |     await this.okButton.click();
  359 |   }
  360 | 
  361 | 
  362 |   // ─────────────────────────────────────────────────────────────────────
  363 |   // CHECKBOX & DYNAMIC TEXT METHODS
  364 |   // ─────────────────────────────────────────────────────────────────────
  365 | 
  366 |   async clickCheckbox(): Promise<void> {
  367 |     await this.checkboxOption.click();
  368 |   }
  369 | 
  370 |   async clickDraftDocumentCheckbox(): Promise<void> {
  371 |     await this.draftDocumentCheckbox.first().click();
  372 |   }
  373 | 
  374 |   // dynamicElement only appears (with cursor:no-drop style) after a checkbox is selected
  375 |   async getDynamicText(): Promise<string> {
  376 |     await this.dynamicElement.waitFor({ state: 'visible' });
  377 |     return (await this.dynamicElement.innerText()).trim();
  378 |   }
  379 | 
  380 | 
  381 |   // ─────────────────────────────────────────────────────────────────────
  382 |   // ACCESS CONTROL METHODS
  383 |   // ─────────────────────────────────────────────────────────────────────
  384 | 
  385 |   async clickTeamRadioButton(): Promise<void> {
  386 |     await this.teamRadioButton.click();
  387 |   }
  388 | 
  389 |   async clickPartnerCategoryButton(): Promise<void> {
  390 |     await this.partnerCategoryButton.click();
  391 |   }
  392 | 
  393 |   async clickCategoryLabel(): Promise<void> {
  394 |     await this.categoryLabel.waitFor({ state: 'visible' });
  395 |     await this.categoryLabel.click();
  396 |   }
  397 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_22_6 - Upload with JPG thumbnail
- Location: tests\e2e\document-library.spec.ts:385:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /document-library|sp-document-list/
Received string:  "https://app.sppreprod.in/manager/sp-upload-document.php"

Call log:
  - Expect "toHaveURL" with timeout 60000ms
    36 × unexpected value "https://app.sppreprod.in/manager/sp-upload-document.php"

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
          - textbox [ref=e48]: AutoDoc_1780211857366
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
              - button "Choose File" [active] [ref=e62]
            - generic [ref=e63]: Max 10 MB document file is allowed.
            - text: "Note : PDFs, Excel Files, Images (JPEG, PNG) and Videos (mp4) are accepted."
        - generic [ref=e64]:
          - generic [ref=e65]: Description*
          - textbox [ref=e67]: Automated test description
        - generic [ref=e68]:
          - generic [ref=e69]: Document Option*
          - generic [ref=e70]:
            - generic:
              - generic [ref=e71]:
                - checkbox "Important Announcements" [checked] [ref=e72]
                - text: Important Announcements
              - generic [ref=e73]:
                - checkbox "Employee PMS & Perks" [ref=e74]
                - text: Employee PMS & Perks
              - generic [ref=e75]:
                - checkbox "Leader Announcements" [ref=e76]
                - text: Leader Announcements
              - generic [ref=e77]:
                - checkbox "Premier Agency" [ref=e78]
                - text: Premier Agency
              - generic [ref=e79]:
                - checkbox "R&R" [ref=e80]
                - text: R&R
              - generic [ref=e81]:
                - checkbox "Product" [ref=e82]
                - text: Product
              - generic [ref=e83]:
                - checkbox "ECM" [ref=e84]
                - text: ECM
              - generic [ref=e85]:
                - checkbox "System & Digital" [ref=e86]
                - text: System & Digital
              - generic [ref=e87]:
                - checkbox "NPS &Training" [ref=e88]
                - text: NPS &Training
              - generic [ref=e89]:
                - checkbox "Quiz" [ref=e90]
                - text: Quiz
        - generic [ref=e91]:
          - generic [ref=e92]: Make it Downloadable
          - generic [ref=e95] [cursor=pointer]:
            - generic [ref=e96]: "ON"
            - generic [ref=e98]: "OFF"
            - checkbox [ref=e99]
        - generic [ref=e100]:
          - generic [ref=e101]: Internal Hashtags
          - list [ref=e103]:
            - listitem [ref=e104]:
              - textbox [ref=e105]
          - generic [ref=e106]: Add new tag
        - button "Upload" [ref=e110] [cursor=pointer]
  - generic [ref=e113]: 
  - text: 
  - status [ref=e114]
```

# Test source

```ts
  302 |     await documentLibraryPage.uploadDocumentUsingXLSX();
  303 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  304 |     await documentLibraryPage.enterDocumentName(uniqueName);
  305 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  306 |     await documentLibraryPage.resizeCroppingArea();
  307 |     await documentLibraryPage.clickApplyButton();
  308 | 
  309 |     await documentLibraryPage.scrollDownByFiveHundred();
  310 |     await documentLibraryPage.enterDescription('Automated test description');
  311 |     await documentLibraryPage.scrollToBottom();
  312 |     await documentLibraryPage.clickUploadButton();
  313 | 
  314 |     await expect(page).toHaveURL(/document-library|sp-document-list/);
  315 |   });
  316 | 
  317 | 
  318 |   // ─────────────────────────────────────────────────────────────────────
  319 |   // TC_DL_22_4 — Upload document in MP4 format
  320 |   // ─────────────────────────────────────────────────────────────────────
  321 |   // TYPE: Happy Path
  322 |   // What it verifies: an MP4 file is accepted as a valid document format.
  323 |   //
  324 |   // Why timeout: 60000 on the URL assertion?
  325 |   // MP4 files are large — the server takes longer to process the upload.
  326 |   // The default assertion timeout is 15s which is not enough for video uploads
  327 |   // on preprod. We give it 60s to account for the slower server response.
  328 |   // ─────────────────────────────────────────────────────────────────────
  329 |   test('TC_DL_22_4 - Upload document in MP4 format', async ({ page, documentLibraryPage }) => {
  330 |     await documentLibraryPage.clickActionsButton();
  331 |     await documentLibraryPage.clickUploadOption();
  332 |     await expect(page).toHaveURL(/sp-upload-document/);
  333 | 
  334 |     await documentLibraryPage.uploadDocumentUsingMP4();
  335 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  336 |     await documentLibraryPage.enterDocumentName(uniqueName);
  337 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  338 |     await documentLibraryPage.resizeCroppingArea();
  339 |     await documentLibraryPage.clickApplyButton();
  340 | 
  341 |     await documentLibraryPage.scrollDownByFiveHundred();
  342 |     await documentLibraryPage.enterDescription('Automated test description');
  343 |     await documentLibraryPage.scrollToBottom();
  344 |     await documentLibraryPage.clickUploadButton();
  345 | 
  346 |     // Extended timeout — MP4 uploads take longer to process on the server
  347 |     await expect(page).toHaveURL(/document-library|sp-document-list/, { timeout: 60000 });
  348 |   });
  349 | 
  350 | 
  351 |   // ─────────────────────────────────────────────────────────────────────
  352 |   // TC_DL_22_5 — Upload with GIF thumbnail
  353 |   // ─────────────────────────────────────────────────────────────────────
  354 |   // TYPE: Happy Path
  355 |   // What it verifies: a GIF image is accepted as a valid thumbnail format.
  356 |   // Uses MP4 as the document to also keep the large-file timeout in place.
  357 |   // ─────────────────────────────────────────────────────────────────────
  358 |   test('TC_DL_22_5 - Upload with GIF thumbnail', async ({ page, documentLibraryPage }) => {
  359 |     await documentLibraryPage.clickActionsButton();
  360 |     await documentLibraryPage.clickUploadOption();
  361 |     await expect(page).toHaveURL(/sp-upload-document/);
  362 | 
  363 |     await documentLibraryPage.uploadDocumentUsingMP4();
  364 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  365 |     await documentLibraryPage.enterDocumentName(uniqueName);
  366 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_GIF);
  367 |     await documentLibraryPage.resizeCroppingArea();
  368 |     await documentLibraryPage.clickApplyButton();
  369 | 
  370 |     await documentLibraryPage.scrollDownByFiveHundred();
  371 |     await documentLibraryPage.enterDescription('Automated test description');
  372 |     await documentLibraryPage.scrollToBottom();
  373 |     await documentLibraryPage.clickUploadButton();
  374 | 
  375 |     await expect(page).toHaveURL(/document-library|sp-document-list/, { timeout: 60000 });
  376 |   });
  377 | 
  378 | 
  379 |   // ─────────────────────────────────────────────────────────────────────
  380 |   // TC_DL_22_6 — Upload with JPG thumbnail
  381 |   // ─────────────────────────────────────────────────────────────────────
  382 |   // TYPE: Happy Path
  383 |   // What it verifies: a JPG image is accepted as a valid thumbnail format.
  384 |   // ─────────────────────────────────────────────────────────────────────
  385 |   test('TC_DL_22_6 - Upload with JPG thumbnail', async ({ page, documentLibraryPage }) => {
  386 |     await documentLibraryPage.clickActionsButton();
  387 |     await documentLibraryPage.clickUploadOption();
  388 |     await expect(page).toHaveURL(/sp-upload-document/);
  389 | 
  390 |     await documentLibraryPage.uploadDocumentUsingMP4();
  391 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  392 |     await documentLibraryPage.enterDocumentName(uniqueName);
  393 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_JPG);
  394 |     await documentLibraryPage.resizeCroppingArea();
  395 |     await documentLibraryPage.clickApplyButton();
  396 | 
  397 |     await documentLibraryPage.scrollDownByFiveHundred();
  398 |     await documentLibraryPage.enterDescription('Automated test description');
  399 |     await documentLibraryPage.scrollToBottom();
  400 |     await documentLibraryPage.clickUploadButton();
  401 | 
> 402 |     await expect(page).toHaveURL(/document-library|sp-document-list/, { timeout: 60000 });
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  403 |   });
  404 | 
  405 | 
  406 |   // ─────────────────────────────────────────────────────────────────────
  407 |   // TC_DL_25 — Missing Description shows HTML5 validation message
  408 |   // ─────────────────────────────────────────────────────────────────────
  409 |   // TYPE: Validation test
  410 |   //
  411 |   // What it verifies: submitting the upload form without a description
  412 |   // triggers the browser's HTML5 validation tooltip on the description field.
  413 |   //
  414 |   // Why skip the description but fill everything else?
  415 |   // Same principle as TC_DL_18 — isolate the one missing field so the
  416 |   // browser stops exactly there and we know which validation we're reading.
  417 |   //
  418 |   // Why getDescriptionValidation() uses HTMLTextAreaElement not HTMLInputElement?
  419 |   // The description field is a <textarea>, not an <input>. TypeScript is strict
  420 |   // about types — using the wrong element type would cause a type error at compile
  421 |   // time even though both have the validationMessage property at runtime.
  422 |   // ─────────────────────────────────────────────────────────────────────
  423 |   test('TC_DL_25 - Missing Description shows validation message', async ({ page, documentLibraryPage }) => {
  424 |     await documentLibraryPage.clickActionsButton();
  425 |     await documentLibraryPage.clickUploadOption();
  426 |     await expect(page).toHaveURL(/sp-upload-document/);
  427 | 
  428 |     await documentLibraryPage.uploadDocumentUsingPDF();
  429 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  430 |     await documentLibraryPage.enterDocumentName(uniqueName);
  431 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  432 |     await documentLibraryPage.resizeCroppingArea();
  433 |     await documentLibraryPage.clickApplyButton();
  434 | 
  435 |     await documentLibraryPage.scrollDownByFiveHundred();
  436 |     // Description intentionally skipped
  437 |     await documentLibraryPage.scrollToBottom();
  438 |     await documentLibraryPage.clickUploadButton();
  439 |     await documentLibraryPage.scrollToTop();
  440 | 
  441 |     const validationMessage = await documentLibraryPage.getDescriptionValidation();
  442 |     expect(validationMessage).toBe('Please fill out this field.');
  443 |   });
  444 | 
  445 | 
  446 |   // ─────────────────────────────────────────────────────────────────────
  447 |   // TC_DL_28 — Missing Document Attachment shows HTML5 validation message
  448 |   // ─────────────────────────────────────────────────────────────────────
  449 |   // TYPE: Validation test
  450 |   //
  451 |   // What it verifies: submitting the upload form without attaching a document
  452 |   // file triggers the browser's HTML5 validation message on the file input.
  453 |   //
  454 |   // Why does a file input have a different validation message?
  455 |   // The browser distinguishes between empty text fields ("Please fill out this
  456 |   // field.") and empty file inputs ("Please select a file."). Each input type
  457 |   // has its own built-in message — so we assert the file-specific one here.
  458 |   //
  459 |   // Why fill all other fields including thumbnail and description?
  460 |   // If we skipped multiple fields, the browser would stop at the first invalid
  461 |   // one — which might not be the file input. Filling everything else guarantees
  462 |   // the file input is the only missing field the browser complains about.
  463 |   // ─────────────────────────────────────────────────────────────────────
  464 |   test('TC_DL_28 - Missing Document Attachment shows validation message', async ({ page, documentLibraryPage }) => {
  465 |     await documentLibraryPage.clickActionsButton();
  466 |     await documentLibraryPage.clickUploadOption();
  467 |     await expect(page).toHaveURL(/sp-upload-document/);
  468 | 
  469 |     // Document file intentionally skipped
  470 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  471 |     await documentLibraryPage.enterDocumentName(uniqueName);
  472 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  473 |     await documentLibraryPage.resizeCroppingArea();
  474 |     await documentLibraryPage.clickApplyButton();
  475 | 
  476 |     await documentLibraryPage.scrollDownByFiveHundred();
  477 |     await documentLibraryPage.enterDescription('Automated test description');
  478 |     await documentLibraryPage.scrollToBottom();
  479 |     await documentLibraryPage.clickUploadButton();
  480 |     await documentLibraryPage.scrollToTop();
  481 | 
  482 |     const validationMessage = await documentLibraryPage.getFileInputValidation();
  483 |     expect(validationMessage).toBe('Please select a file.');
  484 |   });
  485 | 
  486 | 
  487 |   // ─────────────────────────────────────────────────────────────────────
  488 |   // TC_DL_30 — Upload with mandatory fields + document options
  489 |   // ─────────────────────────────────────────────────────────────────────
  490 |   // TYPE: Happy Path
  491 |   // What it verifies: selecting document option radio buttons (option 2 and 3)
  492 |   // in addition to mandatory fields still results in a successful upload.
  493 |   //
  494 |   // Why click both option two and option three?
  495 |   // They are radio buttons — clicking two verifies that selecting different
  496 |   // options doesn't break the form. Option three is the final selection.
  497 |   // ─────────────────────────────────────────────────────────────────────
  498 |   test('TC_DL_30 - Upload with mandatory fields and document options', async ({ page, documentLibraryPage }) => {
  499 |     await documentLibraryPage.clickActionsButton();
  500 |     await documentLibraryPage.clickUploadOption();
  501 |     await expect(page).toHaveURL(/sp-upload-document/);
  502 | 
```
# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: document-library.spec.ts >> Document Library >> TC_DL_22 - Upload document in PNG format
- Location: tests\e2e\document-library.spec.ts:213:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /document-library|sp-document-list/
Received string:  "https://app.digipulsesp.in/manager/sp-upload-document.php"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    18 × unexpected value "https://app.digipulsesp.in/manager/sp-upload-document.php"

```

# Page snapshot

```yaml
- heading "403 Forbidden" [level=1] [ref=e3]
```

# Test source

```ts
  130 |   //   - toHaveURL() auto-waits up to the configured timeout for the URL to match
  131 |   // Explicit sleeps add time without adding reliability.
  132 |   //
  133 |   // Why scrollDownByFiveHundred() before entering the description?
  134 |   // The description field is below the fold on the upload form — scrolling
  135 |   // brings it into the viewport so fill() can interact with it reliably.
  136 |   // ─────────────────────────────────────────────────────────────────────
  137 |   test('TC_DL_17 - Upload document with all mandatory fields (PDF)', { tag: ['@smoke'] }, async ({ page, documentLibraryPage }) => {
  138 |     await documentLibraryPage.clickActionsButton();
  139 |     await documentLibraryPage.clickUploadOption();
  140 |     await expect(page).toHaveURL(/sp-upload-document/);
  141 | 
  142 |     await documentLibraryPage.uploadDocumentUsingPDF();
  143 | 
  144 |     // Unique name prevents conflicts between test runs
  145 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  146 |     await documentLibraryPage.enterDocumentName(uniqueName);
  147 | 
  148 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  149 |     // resizeCroppingArea() waits for the crop handle internally — no sleep needed
  150 |     await documentLibraryPage.resizeCroppingArea();
  151 |     await documentLibraryPage.clickApplyButton();
  152 | 
  153 |     await documentLibraryPage.scrollDownByFiveHundred();
  154 |     await documentLibraryPage.enterDescription('Automated test description');
  155 |     await documentLibraryPage.scrollToBottom();
  156 |     await documentLibraryPage.clickUploadButton();
  157 | 
  158 |     // toHaveURL auto-waits — no sleep needed before this assertion
  159 |     // regex covers both dev (document-library.php) and preprod (sp-document-list.php)
  160 |     await expect(page).toHaveURL(/document-library|sp-document-list/);
  161 |   });
  162 | 
  163 | 
  164 |   // ─────────────────────────────────────────────────────────────────────
  165 |   // TC_DL_18 — Missing Document Name shows HTML5 validation message
  166 |   // ─────────────────────────────────────────────────────────────────────
  167 |   // TYPE: Validation test
  168 |   //
  169 |   // What it verifies: submitting the upload form without a document name
  170 |   // triggers the browser's built-in HTML5 validation tooltip on that field.
  171 |   //
  172 |   // Why evaluate() and not a locator assertion?
  173 |   // The validation tooltip is not a DOM element — it's rendered natively by
  174 |   // the browser and is invisible to Playwright's locators. The only way to
  175 |   // read it is via el.validationMessage — a built-in browser property on
  176 |   // any form input. evaluate() lets us run that JavaScript in the browser
  177 |   // and return the value back to the test.
  178 |   //
  179 |   // Why fill all other fields but skip document name?
  180 |   // We want the form to fail specifically on the name field — if we skip
  181 |   // multiple fields, the browser stops at the first invalid one and we
  182 |   // can't be sure which validation we're reading.
  183 |   // ─────────────────────────────────────────────────────────────────────
  184 |   test('TC_DL_18 - Missing Document Name shows validation message', async ({ page, documentLibraryPage }) => {
  185 |     await documentLibraryPage.clickActionsButton();
  186 |     await documentLibraryPage.clickUploadOption();
  187 |     await expect(page).toHaveURL(/sp-upload-document/);
  188 | 
  189 |     await documentLibraryPage.uploadDocumentUsingPDF();
  190 |     // Document name intentionally skipped
  191 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  192 |     await documentLibraryPage.resizeCroppingArea();
  193 |     await documentLibraryPage.clickApplyButton();
  194 | 
  195 |     await documentLibraryPage.scrollDownByFiveHundred();
  196 |     await documentLibraryPage.enterDescription('Automated test description');
  197 |     await documentLibraryPage.scrollToBottom();
  198 |     await documentLibraryPage.clickUploadButton();
  199 |     await documentLibraryPage.scrollToTop();
  200 | 
  201 |     const validationMessage = await documentLibraryPage.getDocumentNameValidation();
  202 |     expect(validationMessage).toBe('Please fill out this field.');
  203 |   });
  204 | 
  205 | 
  206 |   // ─────────────────────────────────────────────────────────────────────
  207 |   // TC_DL_22 — Upload document in PNG format
  208 |   // ─────────────────────────────────────────────────────────────────────
  209 |   // TYPE: Happy Path
  210 |   // What it verifies: a PNG file is accepted as a valid document format
  211 |   // and the upload completes successfully, redirecting back to the list page.
  212 |   // ─────────────────────────────────────────────────────────────────────
  213 |   test('TC_DL_22 - Upload document in PNG format', async ({ page, documentLibraryPage }) => {
  214 |     await documentLibraryPage.clickActionsButton();
  215 |     await documentLibraryPage.clickUploadOption();
  216 |     await expect(page).toHaveURL(/sp-upload-document/);
  217 | 
  218 |     await documentLibraryPage.uploadDocumentUsingPNG();
  219 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  220 |     await documentLibraryPage.enterDocumentName(uniqueName);
  221 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  222 |     await documentLibraryPage.resizeCroppingArea();
  223 |     await documentLibraryPage.clickApplyButton();
  224 | 
  225 |     await documentLibraryPage.scrollDownByFiveHundred();
  226 |     await documentLibraryPage.enterDescription('Automated test description');
  227 |     await documentLibraryPage.scrollToBottom();
  228 |     await documentLibraryPage.clickUploadButton();
  229 | 
> 230 |     await expect(page).toHaveURL(/document-library|sp-document-list/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  231 |   });
  232 | 
  233 | 
  234 |   // ─────────────────────────────────────────────────────────────────────
  235 |   // TC_DL_22_1 — Upload document in JPG format
  236 |   // ─────────────────────────────────────────────────────────────────────
  237 |   // TYPE: Happy Path
  238 |   // What it verifies: a JPG file is accepted as a valid document format.
  239 |   // Uses a JPG thumbnail to also verify JPG works as a thumbnail format.
  240 |   // ─────────────────────────────────────────────────────────────────────
  241 |   test('TC_DL_22_1 - Upload document in JPG format', async ({ page, documentLibraryPage }) => {
  242 |     await documentLibraryPage.clickActionsButton();
  243 |     await documentLibraryPage.clickUploadOption();
  244 |     await expect(page).toHaveURL(/sp-upload-document/);
  245 | 
  246 |     await documentLibraryPage.uploadDocumentUsingJPG();
  247 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  248 |     await documentLibraryPage.enterDocumentName(uniqueName);
  249 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_JPG);
  250 |     await documentLibraryPage.resizeCroppingArea();
  251 |     await documentLibraryPage.clickApplyButton();
  252 | 
  253 |     await documentLibraryPage.scrollDownByFiveHundred();
  254 |     await documentLibraryPage.enterDescription('Automated test description');
  255 |     await documentLibraryPage.scrollToBottom();
  256 |     await documentLibraryPage.clickUploadButton();
  257 | 
  258 |     await expect(page).toHaveURL(/document-library|sp-document-list/);
  259 |   });
  260 | 
  261 | 
  262 |   // ─────────────────────────────────────────────────────────────────────
  263 |   // TC_DL_22_2 — Upload document in CSV format
  264 |   // ─────────────────────────────────────────────────────────────────────
  265 |   // TYPE: Happy Path
  266 |   // What it verifies: a CSV file is accepted as a document upload.
  267 |   // Note: this is a document CSV (not a recipient list like in Push Notifications).
  268 |   // ─────────────────────────────────────────────────────────────────────
  269 |   test('TC_DL_22_2 - Upload document in CSV format', async ({ page, documentLibraryPage }) => {
  270 |     await documentLibraryPage.clickActionsButton();
  271 |     await documentLibraryPage.clickUploadOption();
  272 |     await expect(page).toHaveURL(/sp-upload-document/);
  273 | 
  274 |     await documentLibraryPage.uploadDocument(DocumentLibraryPage.CSV_FILE);
  275 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  276 |     await documentLibraryPage.enterDocumentName(uniqueName);
  277 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  278 |     await documentLibraryPage.resizeCroppingArea();
  279 |     await documentLibraryPage.clickApplyButton();
  280 | 
  281 |     await documentLibraryPage.scrollDownByFiveHundred();
  282 |     await documentLibraryPage.enterDescription('Automated test description');
  283 |     await documentLibraryPage.scrollToBottom();
  284 |     await documentLibraryPage.clickUploadButton();
  285 | 
  286 |     await expect(page).toHaveURL(/document-library|sp-document-list/);
  287 |   });
  288 | 
  289 | 
  290 |   // ─────────────────────────────────────────────────────────────────────
  291 |   // TC_DL_22_3 — Upload document in XLSX format
  292 |   // ─────────────────────────────────────────────────────────────────────
  293 |   // TYPE: Happy Path
  294 |   // What it verifies: an XLSX file is accepted as a valid document format.
  295 |   // ─────────────────────────────────────────────────────────────────────
  296 |   test('TC_DL_22_3 - Upload document in XLSX format', async ({ page, documentLibraryPage }) => {
  297 |     await documentLibraryPage.clickActionsButton();
  298 |     await documentLibraryPage.clickUploadOption();
  299 |     await expect(page).toHaveURL(/sp-upload-document/);
  300 | 
  301 |     await documentLibraryPage.uploadDocumentUsingXLSX();
  302 |     const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
  303 |     await documentLibraryPage.enterDocumentName(uniqueName);
  304 |     await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
  305 |     await documentLibraryPage.resizeCroppingArea();
  306 |     await documentLibraryPage.clickApplyButton();
  307 | 
  308 |     await documentLibraryPage.scrollDownByFiveHundred();
  309 |     await documentLibraryPage.enterDescription('Automated test description');
  310 |     await documentLibraryPage.scrollToBottom();
  311 |     await documentLibraryPage.clickUploadButton();
  312 | 
  313 |     await expect(page).toHaveURL(/document-library|sp-document-list/);
  314 |   });
  315 | 
  316 | 
  317 |   // ─────────────────────────────────────────────────────────────────────
  318 |   // TC_DL_22_4 — Upload document in MP4 format
  319 |   // ─────────────────────────────────────────────────────────────────────
  320 |   // TYPE: Happy Path
  321 |   // What it verifies: an MP4 file is accepted as a valid document format.
  322 |   //
  323 |   // Why timeout: 60000 on the URL assertion?
  324 |   // MP4 files are large — the server takes longer to process the upload.
  325 |   // The default assertion timeout is 15s which is not enough for video uploads
  326 |   // on preprod. We give it 60s to account for the slower server response.
  327 |   // ─────────────────────────────────────────────────────────────────────
  328 |   test('TC_DL_22_4 - Upload document in MP4 format', async ({ page, documentLibraryPage }) => {
  329 |     test.setTimeout(120000);
  330 |     await documentLibraryPage.clickActionsButton();
```
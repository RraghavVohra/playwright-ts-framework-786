import { test, expect } from '../../utils/fixtures';
import { DocumentLibraryPage } from '../../pages/DocumentLibraryPage';
import { DOCUMENT_NAME, HASHTAG_TEXT } from '../../utils/config';

// DocumentLibraryPage is imported here NOT to create instances —
// the fixture handles that via 'documentLibraryPage' parameter.
// We import the class to access its static file path constants like
// DocumentLibraryPage.THUMBNAIL_PNG directly in the test.
//
// DOCUMENT_NAME is the base prefix for document names, set in .env.
// Date.now() is appended in each test to guarantee uniqueness across runs.

// ─────────────────────────────────────────────────────────────────────
// WHY import from fixtures and not '@playwright/test'?
//
// Our custom 'test' in fixtures.ts has 'documentLibraryPage' registered as a fixture.
// If we imported from '@playwright/test', Playwright wouldn't recognise that parameter
// and would throw an error. fixtures.ts is the single source for all our page objects.
// ─────────────────────────────────────────────────────────────────────

test.describe('Document Library', () => {

  // ─────────────────────────────────────────────────────────────────────
  // beforeEach — runs before every single test in this describe block
  //
  // Why page.goto('/home') first?
  // It resets the browser to a known clean state before each test.
  // If a previous test left you on the upload form or a dialog,
  // this ensures the next test always starts fresh from home.
  //
  // Why navigateToDocumentLibrary() after goto?
  // It clicks Communication tab → Document Library link,
  // landing us on the Document Library list page ready for each test.
  // ─────────────────────────────────────────────────────────────────────
  test.beforeEach(async ({ page, documentLibraryPage }) => {
    await page.goto('/home');
    await documentLibraryPage.navigateToDocumentLibrary();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_01 — Navigate to Document Library screen
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Navigation test
  //
  // What it verifies: clicking the Document Library link lands you on
  // the correct page — confirmed by checking the URL.
  //
  // Why a regex and not an exact URL string?
  // Dev lands on 'document-library.php', preprod lands on 'sp-document-list.php'.
  // A regex with both options means this assertion passes on any environment
  // without needing to change the test per environment.
  //
  // toHaveURL() auto-waits — no manual sleep needed.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_01 - Navigate to Document Library screen', async ({ page }) => {
    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_03 — Actions menu shows correct options
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: UI Verification
  //
  // What it verifies: clicking the Actions button opens a dropdown with
  // exactly these 4 options in this order: Upload, Access, Update Hashtag(s), Delete.
  //
  // Why verify the menu options at all?
  // If someone adds, removes, or renames a menu item on the server,
  // this test catches it immediately. It's a contract test for the UI.
  //
  // Why toEqual() and not toContain()?
  // toEqual() checks the full array — exact count, exact order, exact text.
  // toContain() would pass even if extra options appeared, which we don't want.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_03 - Actions menu shows correct options', async ({ documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();

    const actualOptions   = await documentLibraryPage.getDocumentLibraryOptions();
    const expectedOptions = ['Upload', 'Access', 'Update Hashtag(s)', 'Delete'];

    expect(actualOptions).toEqual(expectedOptions);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_04 — Clicking Upload navigates to the upload screen
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Navigation test
  //
  // What it verifies: after clicking Actions → Upload, the browser
  // lands on the upload form page confirmed by the URL.
  //
  // Why clickUploadOption() has a waitFor({ state: 'visible' }) inside it?
  // On preprod the Actions dropdown can close before the Upload option becomes
  // interactable — the wait ensures the dropdown is still open when we click.
  // The fix lives in the page object method, not here, so this test stays clean.
  //
  // Why toHaveURL with a regex?
  // Same reason as TC_DL_01 — dev and preprod use different URL paths for the
  // upload screen, so a regex covers both without environment-specific assertions.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_04 - Clicking Upload navigates to upload screen', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();

    await expect(page).toHaveURL(/sp-upload-document/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_17 — Upload document with all mandatory fields (PDF)
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  //
  // What it verifies: filling all mandatory fields and submitting the upload
  // form redirects back to the Document Library list page — confirming a
  // successful upload end to end.
  //
  // Why Date.now() for the document name?
  // Each test run generates a unique name like "AutoDoc_1716400000000".
  // This prevents conflicts if the test runs multiple times — a duplicate
  // name might cause the server to reject the upload or behave unexpectedly.
  //
  // Why no sleeps anywhere in this test?
  // Every page object method handles its own waiting internally:
  //   - resizeCroppingArea() waits for the crop handle to be visible before dragging
  //   - clickUploadButton() scrolls into view before clicking
  //   - toHaveURL() auto-waits up to the configured timeout for the URL to match
  // Explicit sleeps add time without adding reliability.
  //
  // Why scrollDownByFiveHundred() before entering the description?
  // The description field is below the fold on the upload form — scrolling
  // brings it into the viewport so fill() can interact with it reliably.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_17 - Upload document with all mandatory fields (PDF)', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingPDF();

    // Unique name prevents conflicts between test runs
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);

    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    // resizeCroppingArea() waits for the crop handle internally — no sleep needed
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();
    await documentLibraryPage.scrollToTop();

    // toHaveURL auto-waits — no sleep needed before this assertion
    // regex covers both dev (document-library.php) and preprod (sp-document-list.php)
    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_18 — Missing Document Name shows HTML5 validation message
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Validation test
  //
  // What it verifies: submitting the upload form without a document name
  // triggers the browser's built-in HTML5 validation tooltip on that field.
  //
  // Why evaluate() and not a locator assertion?
  // The validation tooltip is not a DOM element — it's rendered natively by
  // the browser and is invisible to Playwright's locators. The only way to
  // read it is via el.validationMessage — a built-in browser property on
  // any form input. evaluate() lets us run that JavaScript in the browser
  // and return the value back to the test.
  //
  // Why fill all other fields but skip document name?
  // We want the form to fail specifically on the name field — if we skip
  // multiple fields, the browser stops at the first invalid one and we
  // can't be sure which validation we're reading.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_18 - Missing Document Name shows validation message', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingPDF();
    // Document name intentionally skipped
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();
    await documentLibraryPage.scrollToTop();

    const validationMessage = await documentLibraryPage.getDocumentNameValidation();
    expect(validationMessage).toBe('Please fill out this field.');
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22 — Upload document in PNG format
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: a PNG file is accepted as a valid document format
  // and the upload completes successfully, redirecting back to the list page.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22 - Upload document in PNG format', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingPNG();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22_1 — Upload document in JPG format
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: a JPG file is accepted as a valid document format.
  // Uses a JPG thumbnail to also verify JPG works as a thumbnail format.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22_1 - Upload document in JPG format', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingJPG();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_JPG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22_2 — Upload document in CSV format
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: a CSV file is accepted as a document upload.
  // Note: this is a document CSV (not a recipient list like in Push Notifications).
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22_2 - Upload document in CSV format', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocument(DocumentLibraryPage.CSV_FILE);
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22_3 — Upload document in XLSX format
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: an XLSX file is accepted as a valid document format.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22_3 - Upload document in XLSX format', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingXLSX();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22_4 — Upload document in MP4 format
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: an MP4 file is accepted as a valid document format.
  //
  // Why timeout: 60000 on the URL assertion?
  // MP4 files are large — the server takes longer to process the upload.
  // The default assertion timeout is 15s which is not enough for video uploads
  // on preprod. We give it 60s to account for the slower server response.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22_4 - Upload document in MP4 format', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingMP4();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    // Extended timeout — MP4 uploads take longer to process on the server
    await expect(page).toHaveURL(/document-library|sp-document-list/, { timeout: 60000 });
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22_5 — Upload with GIF thumbnail
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: a GIF image is accepted as a valid thumbnail format.
  // Uses MP4 as the document to also keep the large-file timeout in place.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22_5 - Upload with GIF thumbnail', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingMP4();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_GIF);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/, { timeout: 60000 });
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_22_6 — Upload with JPG thumbnail
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: a JPG image is accepted as a valid thumbnail format.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_22_6 - Upload with JPG thumbnail', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingMP4();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_JPG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/, { timeout: 60000 });
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_25 — Missing Description shows HTML5 validation message
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Validation test
  //
  // What it verifies: submitting the upload form without a description
  // triggers the browser's HTML5 validation tooltip on the description field.
  //
  // Why skip the description but fill everything else?
  // Same principle as TC_DL_18 — isolate the one missing field so the
  // browser stops exactly there and we know which validation we're reading.
  //
  // Why getDescriptionValidation() uses HTMLTextAreaElement not HTMLInputElement?
  // The description field is a <textarea>, not an <input>. TypeScript is strict
  // about types — using the wrong element type would cause a type error at compile
  // time even though both have the validationMessage property at runtime.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_25 - Missing Description shows validation message', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingPDF();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    // Description intentionally skipped
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();
    await documentLibraryPage.scrollToTop();

    const validationMessage = await documentLibraryPage.getDescriptionValidation();
    expect(validationMessage).toBe('Please fill out this field.');
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_28 — Missing Document Attachment shows HTML5 validation message
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Validation test
  //
  // What it verifies: submitting the upload form without attaching a document
  // file triggers the browser's HTML5 validation message on the file input.
  //
  // Why does a file input have a different validation message?
  // The browser distinguishes between empty text fields ("Please fill out this
  // field.") and empty file inputs ("Please select a file."). Each input type
  // has its own built-in message — so we assert the file-specific one here.
  //
  // Why fill all other fields including thumbnail and description?
  // If we skipped multiple fields, the browser would stop at the first invalid
  // one — which might not be the file input. Filling everything else guarantees
  // the file input is the only missing field the browser complains about.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_28 - Missing Document Attachment shows validation message', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    // Document file intentionally skipped
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickUploadButton();
    await documentLibraryPage.scrollToTop();

    const validationMessage = await documentLibraryPage.getFileInputValidation();
    expect(validationMessage).toBe('Please select a file.');
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_30 — Upload with mandatory fields + document options
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: selecting document option radio buttons (option 2 and 3)
  // in addition to mandatory fields still results in a successful upload.
  //
  // Why click both option two and option three?
  // They are radio buttons — clicking two verifies that selecting different
  // options doesn't break the form. Option three is the final selection.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_30 - Upload with mandatory fields and document options', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingJPG();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickDocumentOptionTwo();
    await documentLibraryPage.clickDocumentOptionThree();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_32 — Upload with all fields and downloadable toggle enabled
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path
  // What it verifies: enabling the downloadable toggle on top of all other
  // fields still results in a successful upload.
  //
  // Why click the toggle and not a checkbox?
  // The downloadable option uses a bootstrap-switch toggle component —
  // it renders as a <span> not an <input type="checkbox">. Clicking
  // the off-handle span is how you enable it.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_32 - Upload with all fields and downloadable toggle enabled', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingJPG();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickDocumentOptionTwo();
    await documentLibraryPage.clickDocumentOptionThree();
    await documentLibraryPage.clickDownloadableToggle();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_34 — Upload with all fields and internal hashtag
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Happy Path / E2E
  // What it verifies: the full form including hashtag autocomplete selection
  // submits successfully.
  //
  // Why HASHTAG_TEXT from config and not a hardcoded string?
  // The hashtag must exist in the autocomplete on the target environment.
  // Different servers may have different hashtags — making it configurable
  // via .env means no test code changes when switching environments.
  //
  // Why selectHashtagSuggestion() handles env differences internally?
  // On dev any ui-menu-item is fine. On preprod/prod the suggestion <li>
  // has extra classes so we also match by text. The env decision lives in
  // the page object constructor — the test just calls one method.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_34 - Upload with all fields and internal hashtag', async ({ page, documentLibraryPage }) => {
    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickUploadOption();
    await expect(page).toHaveURL(/sp-upload-document/);

    await documentLibraryPage.uploadDocumentUsingJPG();
    const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
    await documentLibraryPage.enterDocumentName(uniqueName);
    await documentLibraryPage.attachThumbnail(DocumentLibraryPage.THUMBNAIL_PNG);
    await documentLibraryPage.resizeCroppingArea();
    await documentLibraryPage.clickApplyButton();

    await documentLibraryPage.scrollDownByFiveHundred();
    await documentLibraryPage.enterDescription('Automated test description');
    await documentLibraryPage.scrollToBottom();
    await documentLibraryPage.clickDocumentOptionTwo();
    await documentLibraryPage.clickDocumentOptionThree();
    await documentLibraryPage.clickDownloadableToggle();
    await documentLibraryPage.enterHashtag(HASHTAG_TEXT);
    // Playwright's click() auto-waits for the suggestion to appear — no sleep needed
    await documentLibraryPage.selectHashtagSuggestion();
    await documentLibraryPage.clickUploadButton();

    await expect(page).toHaveURL(/document-library|sp-document-list/);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_37 — Search functionality filters results correctly
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Functional test
  //
  // What it verifies: typing a document name in the search box filters
  // the table and the matching document appears in the results.
  //
  // Why read the first document name dynamically instead of hardcoding it?
  // A hardcoded search value like "My Test Doc" would fail on any environment
  // where that document doesn't exist. By reading the first document already
  // visible in the listing, the test is self-contained — it works on dev,
  // preprod, and prod without any config changes.
  //
  // Why waitForLoadState('domcontentloaded') before reading the table?
  // The data table is populated after the page loads. Without waiting,
  // getFirstDocumentName() might run before any rows appear and return empty.
  // We use 'domcontentloaded' instead of 'networkidle' because preprod has
  // background polling requests that never stop — 'networkidle' would time out.
  //
  // Why getSearchResultText(firstDocName) and not a generic locator?
  // The method builds the locator dynamically using the exact text we searched
  // for, so it only matches the right row regardless of how many results appear.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_37 - Search functionality filters results correctly', async ({ page, documentLibraryPage }) => {
    // Wait for the data table to populate before reading from it
    await page.waitForLoadState('domcontentloaded');

    // Grab the first document name already visible — no hardcoded value needed
    const firstDocName = await documentLibraryPage.getFirstDocumentName();

    await documentLibraryPage.enterSearchTerm(firstDocName);

    const searchResult = await documentLibraryPage.getSearchResultText(firstDocName);
    expect(searchResult).toBe(firstDocName);
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_38 — Delete without selecting content shows error dialog
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Validation test
  //
  // What it verifies: clicking Delete from the Actions menu without selecting
  // any document first shows a dialog with an error message, not a deletion.
  //
  // Why waitForLoadState('networkidle') here but 'domcontentloaded' in TC_DL_37?
  // In TC_DL_37 we only needed the table rows to be present in the DOM.
  // Here we need the Actions button itself to be fully interactive before
  // clicking it — on slower environments the button can appear in the DOM
  // before it is actually ready to respond to clicks. 'networkidle' gives
  // the page enough time to settle fully before we interact with it.
  //
  // Why is getDialogBoxText() safe to call without a sleep before it?
  // The method has waitFor({ state: 'visible' }) inside it — it waits for
  // the dialog to appear before reading its text. The wait lives in the
  // page object, not the test, so the test stays clean.
  //
  // Why clickOkButton() at the end?
  // The dialog blocks the page — dismissing it leaves the browser in a
  // clean state so the next test's beforeEach can navigate away without issues.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_38 - Delete without selecting content shows error dialog', async ({ page, documentLibraryPage }) => {
    // Wait for the page to fully settle before interacting with the Actions button
    await page.waitForLoadState('networkidle');

    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickDeleteOption();

    // getDialogBoxText() waits for the dialog internally — no sleep needed
    const dialogText = await documentLibraryPage.getDialogBoxText();
    expect(dialogText).toBe('Please select at least one document creative!');

    // Dismiss the dialog so the page is clean for the next test
    await documentLibraryPage.clickOkButton();
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_39 — Delete a document and verify it disappears from search
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Functional / E2E
  //
  // What it verifies: selecting a document, deleting it, then searching for
  // it returns "No matching records found" — confirming the deletion worked.
  //
  // Why clickCheckbox() before getDynamicText()?
  // The dynamicElement locator targets a <td> with @style='cursor: no-drop;'.
  // That style is only applied by the app AFTER a checkbox is selected.
  // Without clicking the checkbox first, getDynamicText() would find nothing.
  //
  // Why store the document name before deleting?
  // Once deleted, the row is gone from the DOM — we can no longer read its name.
  // We capture it upfront so we have something to search for after deletion.
  //
  // Why waitForLoadState('domcontentloaded') after clicking OK?
  // The page refreshes after a deletion. We wait for the DOM to settle before
  // entering a search term — otherwise the search box might not be ready yet.
  // 'domcontentloaded' is used over 'networkidle' for the same reason as before:
  // preprod background requests prevent 'networkidle' from ever resolving.
  //
  // Why getNoRecordsText() and not a URL assertion?
  // The page doesn't navigate after a search — the table filters in place.
  // The only way to verify zero results is to check the "No matching records"
  // message that the DataTable renders when nothing matches the search term.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_39 - Delete a document and verify it disappears from search', async ({ page, documentLibraryPage }) => {
    await page.waitForLoadState('networkidle');

    // Select the first document — this triggers the cursor:no-drop style on the name cell
    await documentLibraryPage.clickCheckbox();

    // Capture the name now — once deleted it will be gone from the DOM
    const documentName = await documentLibraryPage.getDynamicText();

    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickDeleteOption();
    // getDialogBoxText() waits for the dialog internally
    await documentLibraryPage.clickOkButton();

    // Wait for the page to settle after deletion before searching
    await page.waitForLoadState('domcontentloaded');

    await documentLibraryPage.enterSearchTerm(documentName);

    // getNoRecordsText() waits for the message to appear internally
    const noRecordsText = await documentLibraryPage.getNoRecordsText();
    expect(noRecordsText).toBe('No matching records found');
  });


  // ─────────────────────────────────────────────────────────────────────
  // TC_DL_40 — Update access control for a document
  // ─────────────────────────────────────────────────────────────────────
  // TYPE: Functional / E2E
  //
  // What it verifies: selecting a document, opening its Access form, setting
  // a team, partner category, and a schedule, then submitting — the full
  // access control update flow completes without error.
  //
  // Why 'domcontentloaded' here instead of 'networkidle'?
  // Same reason as TC_DL_37 — preprod background requests never stop,
  // so 'networkidle' always times out at 60s. The table and checkbox are
  // available as soon as the DOM is ready.
  //
  // Why clickPartnerCategoryButton() twice?
  // The first click opens the partner category dropdown.
  // The second click closes it after selecting the category.
  // The dropdown is a toggle — open → select → close.
  //
  // Why clickScheduleCheckbox() before clickScheduleTextbox()?
  // The schedule textbox is hidden until the schedule checkbox is enabled.
  // Clicking the checkbox first reveals the textbox so it can be interacted with.
  //
  // Why selectCurrentActiveTime() after clickScheduleTextbox()?
  // Clicking the textbox opens the xdsoft datetime picker.
  // selectCurrentActiveTime() then picks the already-highlighted time slot
  // (or the first available one if nothing is highlighted) and closes the picker.
  // The method has its own waitFor({ state: 'visible' }) internally.
  //
  // Why no assertion at the end?
  // The Java project also had none — the test verifies the flow doesn't throw
  // an error or redirect away unexpectedly. A toast or URL assertion could be
  // added once we confirm the exact success behaviour on the target environment.
  // ─────────────────────────────────────────────────────────────────────
  test('TC_DL_40 - Update access control for a document', async ({ page, documentLibraryPage }) => {
    await page.waitForLoadState('domcontentloaded');

    // Select the first document in the listing
    await documentLibraryPage.clickCheckbox();
    const documentName = await documentLibraryPage.getDynamicText();
    console.log(`Updating access for: ${documentName}`);

    await documentLibraryPage.clickActionsButton();
    await documentLibraryPage.clickAccessOption();

    // Set access to Team and pick a partner category
    await documentLibraryPage.clickTeamRadioButton();
    await documentLibraryPage.clickPartnerCategoryButton();  // open dropdown
    await documentLibraryPage.clickCategoryLabel();
    await documentLibraryPage.clickPartnerCategoryButton();  // close dropdown

    // Enable scheduling — reveals the schedule textbox
    await documentLibraryPage.clickScheduleCheckbox();

    // Open the datetime picker and select a time
    await documentLibraryPage.clickScheduleTextbox();
    await documentLibraryPage.selectCurrentActiveTime();

    await documentLibraryPage.clickUpdateAccessButton();
  });

});

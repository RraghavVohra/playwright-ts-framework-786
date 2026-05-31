import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../utils/config';

export class DocumentLibraryPage {

  private page: Page;

  // ─────────────────────────────────────────────────────────────────────
  // LOCATORS
  // ─────────────────────────────────────────────────────────────────────

  // Navigation
  private communicationTab:    Locator;
  private documentLibraryLink: Locator;
  private actionsButton:       Locator;

  // Actions menu items (also reused as click targets)
  private uploadMenuOption:       Locator;
  private accessMenuOption:       Locator;
  private updateHashtagMenuOption: Locator;
  private deleteMenuOption:        Locator;

  // Upload form
  private uploadButton:      Locator;
  private documentNameField: Locator;
  private fileInput:         Locator;
  private thumbnailInput:    Locator;
  private croppingHandle:    Locator;
  private applyButton:       Locator;
  private descriptionField:  Locator;

  // Document options
  private documentOptionTwo:   Locator;
  private documentOptionThree: Locator;
  private downloadableToggle:  Locator;

  // Hashtag
  private hashtagField:      Locator;
  private hashtagSuggestion: Locator;

  // Search & listing
  private searchBox:               Locator;
  private firstDocumentNameElement: Locator;
  private noRecordsElement:         Locator;

  // Delete flow
  private okButton:  Locator;
  private dialogBox: Locator;

  // Checkbox & dynamic text (used in delete / access tests)
  private checkboxOption:        Locator;
  private draftDocumentCheckbox: Locator;
  private dynamicElement:        Locator;

  // Access control
  private teamRadioButton:     Locator;
  private partnerCategoryButton: Locator;
  private categoryLabel:       Locator;
  private updateAccessButton:  Locator;

  // Schedule
  private scheduleCheckbox:   Locator;
  private scheduleTextbox:    Locator;
  private contentUpdateDate:  Locator;

  // ─────────────────────────────────────────────────────────────────────
  // FILE PATHS — resolved relative to the project root
  // setInputFiles() takes a plain string path — no Paths.get() needed in TS
  // ─────────────────────────────────────────────────────────────────────
  static readonly PDF_FILE  = 'test-data/Document Object Model (DOM) Made Easy.pdf';
  static readonly PNG_FILE  = 'test-data/Amsterdam.png';
  static readonly JPG_FILE  = 'test-data/goldengate.jpg';
  static readonly CSV_FILE  = 'test-data/pushnotificationsspuat - Production.csv';
  static readonly XLSX_FILE = 'test-data/SemgrepRescanpoints.xlsx';
  static readonly MP4_FILE  = 'test-data/video.mp4';
  static readonly GIF_FILE  = 'test-data/download.gif';

  // No separate thumbnail PNG — Amsterdam.png is used for both document and thumbnail uploads
  static readonly THUMBNAIL_PNG = 'test-data/Amsterdam.png';
  static readonly THUMBNAIL_GIF = 'test-data/download.gif';
  static readonly THUMBNAIL_JPG = 'test-data/goldengate.jpg';

  // ─────────────────────────────────────────────────────────────────────
  // CONSTRUCTOR
  // ─────────────────────────────────────────────────────────────────────

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.communicationTab    = page.locator("//span[text()='Communication']");
    this.documentLibraryLink = page.locator("//a[normalize-space()='Document Library']");

    // Actions button renders differently per environment:
    // dev      → first SVG icon on the page
    // preprod/prod → a div with 'btn-group dropdown' class
    this.actionsButton = ENV === 'dev'
      ? page.locator("(//*[name()='svg'])[1]")
      : page.locator("//div[contains(@class,'btn-group dropdown')]");

    // Actions menu items
    // contains(@href) instead of exact match — preprod adds a path prefix (/manager/...)
    // not(contains(@href,'document_id')) excludes row-level Edit buttons that share the same base URL
    this.uploadMenuOption        = page.locator("//a[contains(@href,'sp-upload-document.php') and not(contains(@href,'document_id'))]");
    this.accessMenuOption        = page.locator("#add_synd");
    this.updateHashtagMenuOption = page.locator("#add_hastag");
    this.deleteMenuOption        = page.locator("#Delete3");

    // Upload form
    this.uploadButton      = page.locator("//input[@id='share_button']");
    this.documentNameField = page.locator("#document_name");
    this.fileInput         = page.locator("#document_file");
    this.thumbnailInput    = page.locator("#img_validate");
    this.croppingHandle    = page.locator("//div[contains(@class,'imgareaselect-border4')]");
    this.applyButton       = page.locator("//a[@class='btn yes yellow-gold pull-right']");
    this.descriptionField  = page.locator("//textarea[@class='form-control h150']");

    // Document options — radio buttons selected by their value attribute
    this.documentOptionTwo   = page.locator("//input[@value='2']");
    this.documentOptionThree = page.locator("//input[@value='3']");
    // Toggle switch — clicking the off-handle turns the toggle on
    this.downloadableToggle  = page.locator("//span[@class='bootstrap-switch-handle-off bootstrap-switch-default']");

    // Hashtag autocomplete
    this.hashtagField = page.locator("#tagcsv");
    // On preprod/prod the suggestion li has extra classes so we also match by exact text
    // On dev the generic ui-menu-item match is enough
    this.hashtagSuggestion = ENV === 'dev'
      ? page.locator("//li[contains(@class,'ui-menu-item')]")
      : page.locator("//li[contains(@class,'ui-menu-item') and normalize-space()='teaser']");

    // Search & listing
    this.searchBox                = page.locator("//input[@type='search' and @placeholder='Search']");
    // First document name in the table — used to grab a real name before searching/deleting
    this.firstDocumentNameElement = page.locator("(//td[@class='wBreak d-none d-md-table-cell'])[1]");
    this.noRecordsElement         = page.locator("//td[contains(@class,'dataTables_empty') and normalize-space()='No matching records found']");

    // Delete flow
    this.okButton  = page.locator("//button[@type='button' and @class='btn btn-primary bootbox-accept' and text()='OK']");
    this.dialogBox = page.locator("//div[@class='bootbox-body']");

    // First checkbox in the listing and the dynamic text cell it unlocks
    this.checkboxOption = page.locator("(//input[@id='document_content'])[1]");
    // Finds a row containing a 'Draft' badge and targets its checkbox
    // Used in TC_DL_40 — access can only be updated for Draft documents
    this.draftDocumentCheckbox = page.getByText('Draft', { exact: true })
      .first()
      .locator('xpath=ancestor::tr')
      .locator('input[id="document_content"]');
    // This cell only shows cursor:no-drop style after a checkbox is selected
    this.dynamicElement = page.locator("(//td[@class='wBreak d-none d-md-table-cell' and @style='cursor: no-drop;'])[1]");

    // Access control
    this.teamRadioButton      = page.locator("#partners_option");
    this.partnerCategoryButton = page.locator("#btn_ptr_category");
    this.categoryLabel         = page.locator("//label[normalize-space()='Raj2024']");
    this.updateAccessButton    = page.locator("#synd_update_id");

    // Schedule
    this.scheduleCheckbox  = page.locator("#schedule");
    this.scheduleTextbox   = page.locator("#schedule_synd");
    this.contentUpdateDate = page.locator("//input[@id='start_date' and @name='start_date' and @type='text']");
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Compound navigation — clicks Communication tab then Document Library link
  // Used in beforeEach so every test starts on the Document Library list page
  async navigateToDocumentLibrary(): Promise<void> {
    await this.communicationTab.click();
    await this.documentLibraryLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Opens the Actions dropdown
  // actionsButton is already env-aware from the constructor — plain click works for all envs
  // .first() guards against multiple btn-group matches; waitFor ensures the dropdown is rendered
  async clickActionsButton(): Promise<void> {
    await this.actionsButton.first().waitFor({ state: 'visible' });
    await this.actionsButton.first().click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // ACTIONS MENU METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Returns the visible text of all 4 options in the open Actions menu
  // Reads each locator individually — same approach as the Java project
  async getDocumentLibraryOptions(): Promise<string[]> {
    return [
      (await this.uploadMenuOption.innerText()).trim(),
      (await this.accessMenuOption.innerText()).trim(),
      (await this.updateHashtagMenuOption.innerText()).trim(),
      (await this.deleteMenuOption.innerText()).trim(),
    ];
  }

  // Dropdown can close between clickActionsButton() and here — retry re-opening it
  // until the upload option is visible, then click.
  async clickUploadOption(): Promise<void> {
    await expect(async () => {
      if (!(await this.uploadMenuOption.isVisible())) {
        await this.actionsButton.click();
      }
      await this.uploadMenuOption.waitFor({ state: 'visible', timeout: 2000 });
    }).toPass({ timeout: 30000 });
    await this.uploadMenuOption.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAccessOption(): Promise<void> {
    await this.accessMenuOption.click();
  }

  async clickDeleteOption(): Promise<void> {
    await this.deleteMenuOption.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // UPLOAD FORM METHODS
  // ─────────────────────────────────────────────────────────────────────

  async enterDocumentName(name: string): Promise<void> {
    await this.documentNameField.fill(name);
  }

  // Core upload method — sets the file directly on the hidden input
  // No OS dialog, no AutoIt — Playwright handles file inputs natively
  async uploadDocument(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
  }

  // Convenience wrappers — each one calls uploadDocument() with the right static path
  async uploadDocumentUsingPDF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PDF_FILE);  }
  async uploadDocumentUsingPNG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.PNG_FILE);  }
  async uploadDocumentUsingJPG():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.JPG_FILE);  }
  async uploadDocumentUsingXLSX(): Promise<void> { await this.uploadDocument(DocumentLibraryPage.XLSX_FILE); }
  async uploadDocumentUsingMP4():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.MP4_FILE);  }
  async uploadDocumentUsingGIF():  Promise<void> { await this.uploadDocument(DocumentLibraryPage.GIF_FILE);  }

  async attachThumbnail(thumbnailPath: string): Promise<void> {
    await this.thumbnailInput.setInputFiles(thumbnailPath);
  }

  // Drags the crop handle to resize the cropping area on the thumbnail
  // Playwright mouse API: move → down → move (drag) → up
  // boundingBox() gives us the element's position and size on screen
  async resizeCroppingArea(): Promise<void> {
    await this.croppingHandle.waitFor({ state: 'visible' });
    const box = await this.croppingHandle.boundingBox();
    if (box) {
      await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await this.page.mouse.down();
      await this.page.mouse.move(box.x + box.width / 2 + 50, box.y + box.height / 2 + 50);
      await this.page.mouse.up();
    }
  }

  async clickApplyButton(): Promise<void> {
    await this.applyButton.click();
  }

  async enterDescription(text: string): Promise<void> {
    await this.descriptionField.scrollIntoViewIfNeeded();
    await this.descriptionField.fill(text);
  }

  async clickUploadButton(): Promise<void> {
    await this.uploadButton.scrollIntoViewIfNeeded();
    await this.uploadButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // DOCUMENT OPTIONS METHODS
  // ─────────────────────────────────────────────────────────────────────

  async clickDocumentOptionTwo(): Promise<void> {
    await this.documentOptionTwo.click();
  }

  async clickDocumentOptionThree(): Promise<void> {
    await this.documentOptionThree.click();
  }

  async clickDownloadableToggle(): Promise<void> {
    await this.downloadableToggle.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // HASHTAG METHODS
  // ─────────────────────────────────────────────────────────────────────

  async enterHashtag(text: string): Promise<void> {
    await this.hashtagField.fill(text);
  }

  // hashtagSuggestion is already env-aware from the constructor
  async selectHashtagSuggestion(): Promise<void> {
    await this.hashtagSuggestion.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // VALIDATION MESSAGE METHODS
  // ─────────────────────────────────────────────────────────────────────

  // evaluate() runs JS in the browser on the actual DOM element
  // el.validationMessage is the browser's built-in HTML5 validation tooltip text
  async getDocumentNameValidation(): Promise<string> {
    return await this.documentNameField.evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async getDescriptionValidation(): Promise<string> {
    return await this.descriptionField.evaluate((el: HTMLTextAreaElement) => el.validationMessage);
  }

  async getFileInputValidation(): Promise<string> {
    return await this.fileInput.evaluate((el: HTMLInputElement) => el.validationMessage);
  }


  // ─────────────────────────────────────────────────────────────────────
  // SEARCH & LISTING METHODS
  // ─────────────────────────────────────────────────────────────────────

  async enterSearchTerm(text: string): Promise<void> {
    await this.searchBox.fill(text);
  }

  // Reads the first document name from the listing table
  // Used by TC_DL_37 to get a real name dynamically instead of relying on hardcoded config
  async getFirstDocumentName(): Promise<string> {
    await this.firstDocumentNameElement.waitFor({ state: 'visible' });
    return (await this.firstDocumentNameElement.innerText()).trim();
  }

  // Dynamic locator — built at call time with the exact text to match
  // getByRole('cell') avoids XPath string interpolation — safe for names with apostrophes or quotes
  async getSearchResultText(text: string): Promise<string> {
    return await this.page.getByRole('cell', { name: text, exact: true }).innerText();
  }

  async getNoRecordsText(): Promise<string> {
    await this.noRecordsElement.waitFor({ state: 'visible' });
    return await this.noRecordsElement.innerText();
  }


  // ─────────────────────────────────────────────────────────────────────
  // DELETE FLOW METHODS
  // ─────────────────────────────────────────────────────────────────────

  // waitFor(visible) here so tests don't need a sleep before reading the dialog
  async getDialogBoxText(): Promise<string> {
    await this.dialogBox.waitFor({ state: 'visible' });
    return await this.dialogBox.innerText();
  }

  async clickOkButton(): Promise<void> {
    await this.okButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // CHECKBOX & DYNAMIC TEXT METHODS
  // ─────────────────────────────────────────────────────────────────────

  async clickCheckbox(): Promise<void> {
    await this.checkboxOption.click();
  }

  async clickDraftDocumentCheckbox(): Promise<void> {
    await this.draftDocumentCheckbox.first().click();
  }

  // dynamicElement only appears (with cursor:no-drop style) after a checkbox is selected
  async getDynamicText(): Promise<string> {
    await this.dynamicElement.waitFor({ state: 'visible' });
    return (await this.dynamicElement.innerText()).trim();
  }


  // ─────────────────────────────────────────────────────────────────────
  // ACCESS CONTROL METHODS
  // ─────────────────────────────────────────────────────────────────────

  async clickTeamRadioButton(): Promise<void> {
    await this.teamRadioButton.click();
  }

  async clickPartnerCategoryButton(): Promise<void> {
    await this.partnerCategoryButton.click();
  }

  async clickCategoryLabel(): Promise<void> {
    await this.categoryLabel.waitFor({ state: 'visible' });
    await this.categoryLabel.click();
  }

  async clickUpdateAccessButton(): Promise<void> {
    await this.updateAccessButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // SCHEDULE METHODS
  // ─────────────────────────────────────────────────────────────────────

  async clickScheduleCheckbox(): Promise<void> {
    await this.scheduleCheckbox.click();
  }

  async clickScheduleTextbox(): Promise<void> {
    await this.scheduleTextbox.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // CALENDAR METHODS (xdsoft datetime picker)
  // ─────────────────────────────────────────────────────────────────────

  // Private helper — shared by selectDateOfYourChoice() and selectCurrentActiveTime()
  // Clicks the currently highlighted time slot, or falls back to the first available one
  // Extracted so both callers share one implementation instead of copy-pasting
  private async selectActiveOrFirstTime(): Promise<void> {
    const activeTime = this.page.locator(
      "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]" +
      "//div[contains(@class,'xdsoft_time') and contains(@class,'xdsoft_current')]"
    );

    if (await activeTime.isVisible()) {
      await activeTime.scrollIntoViewIfNeeded();
      await activeTime.click();
    } else {
      const firstTime = this.page.locator(
        "(//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]" +
        "//div[contains(@class,'xdsoft_time')])[1]"
      );
      await firstTime.scrollIntoViewIfNeeded();
      await firstTime.click();
    }
  }

  async selectTodayInCalendar(): Promise<void> {
    await this.page.locator(
      "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
    ).waitFor({ state: 'visible' });

    const todayElement = this.page.locator(
      "//td[contains(@class,'xdsoft_date') and contains(@class,'xdsoft_today')]"
    );
    await todayElement.waitFor({ state: 'visible' });
    await todayElement.click();
  }

  // Selects a specific date in the xdsoft calendar picker
  // month is 1-based (January = 1) but xdsoft stores months 0-based internally
  async selectDateOfYourChoice(day: number, month: number, year: number): Promise<void> {
    const picker = this.page.locator(
      "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
    );
    await picker.waitFor({ state: 'visible' });

    // Year
    await picker.locator("div.xdsoft_label.xdsoft_year span").click();
    await picker.locator(`div.xdsoft_yearselect div[data-value='${year}']`).click();

    // Month — subtract 1 because xdsoft uses 0-based month index
    await picker.locator("div.xdsoft_label.xdsoft_month span").click();
    await picker.locator(`div.xdsoft_monthselect div[data-value='${month - 1}']`).click();
    // xdsoft re-renders the grid asynchronously after month selection — wait until at least
    // one cell from the new month is visible before targeting the specific day
    await picker.locator(`td.xdsoft_date[data-month='${month - 1}']`).first().waitFor({ state: 'visible' });

    // Day — data-month pins to the selected month, excluding overflow days from adjacent months
    await picker.locator(`td.xdsoft_date:not(.xdsoft_disabled)[data-date='${day}'][data-month='${month - 1}']`).click();

    await this.selectActiveOrFirstTime();
  }

  // Selects just the time from an already-open calendar picker
  async selectCurrentActiveTime(): Promise<void> {
    await this.page.locator(
      "//div[contains(@class,'xdsoft_datetimepicker') and contains(@style,'display: block')]"
    ).waitFor({ state: 'visible' });
    await this.selectActiveOrFirstTime();
  }


  // ─────────────────────────────────────────────────────────────────────
  // SCROLL HELPERS
  // page.evaluate() runs JavaScript directly in the browser
  // ─────────────────────────────────────────────────────────────────────

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollDownByFiveHundred(): Promise<void> {
    await this.page.evaluate(() => window.scrollBy(0, 500));
  }
}

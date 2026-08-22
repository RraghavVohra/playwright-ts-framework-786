import { Page, Locator, expect } from '@playwright/test';
import { ENV, SOCIAL_PARTNER_SEARCH, SOCIAL_PARTNER_NAME } from '../utils/config';

export class SocialAutoPostPage {

  private page: Page;

  // ─────────────────────────────────────────────────────────────────────
  // LOCATORS
  // ─────────────────────────────────────────────────────────────────────

  // Navigation
  private communicationTab:   Locator;
  private automationTabProd:  Locator;
  private socialOptionProd:   Locator;
  private socialAutoPostLink: Locator;
  private autoPostTabProd:    Locator;
  private automationTabDigipulse: Locator;
  private autoPostOptionDigipulse: Locator;

  // Actions
  private actionsButton:    Locator;
  private createPostButton: Locator;
  // Tool Tips for All the Sizes Icon
  private imageAllowedSizesIcon: Locator;
  private imageAllowedSizesTooltip: Locator;
  // File Upload
  private fileInput:      Locator;
  private thumbnailInput: Locator;

  // Form Fields
  private cobrandingButton: Locator;
  private titleField:       Locator;
  private descriptionField: Locator;

  // Partner Category
  private partnerCategoryButton:    Locator;
  private searchBox:                Locator;
  // The category's TEXT label (e.g. "Raj2024") is not the clickable target — confirmed via
  // codegen that clicking it does nothing. The actual checkbox lives inside
  // #multiSelectDropdown and must be checked directly.
  private categoryCheckbox:         Locator;
  // Clicking this field label (not re-clicking partnerCategoryButton) is what actually
  // closes the dropdown — confirmed via codegen, replacing the previous (wrong) assumption.
  private partnerCategoryFieldLabel: Locator;
  private facebookLabel:            Locator;

  // Social Media Checkboxes
  private twitterLabel:   Locator;
  private linkedInLabel:  Locator;
  private instagramLabel: Locator;

  // URL Options
  private customUrlRadio: Locator;
  private customUrlInput: Locator;
  private noneRadio:      Locator;

  // Date / Time Picker
  private dateTimeInput:   Locator;
  private nextMonthButton: Locator;

  // Submit
  private sendNotificationCheckbox: Locator;
  private schedulePostButton:       Locator;

  // Validation
  private imageSizeError: Locator;

  // ─────────────────────────────────────────────────────────────────────
  // FILE PATHS — resolved relative to the project root
  // ─────────────────────────────────────────────────────────────────────
  // Valid PNG sizes — all sourced from test-data/Social Auto-posts/
  static readonly PNG_FILE       = 'test-data/Social Auto-posts/Sap 800X460.png';
  static readonly PNG_600X460    = 'test-data/Social Auto-posts/Sap 600X460.png';
  static readonly PNG_720X1140   = 'test-data/Social Auto-posts/Sap 720X1140.png';
  static readonly PNG_800X660    = 'test-data/Social Auto-posts/Sap 800X660.png';
  static readonly PNG_800X860    = 'test-data/Social Auto-posts/Sap 800X860.png';
  static readonly PNG_1024X628   = 'test-data/Social Auto-posts/Sap 1024X628.png';
  static readonly PNG_1080X940   = 'test-data/Social Auto-posts/Sap 1080X940.png';
  static readonly PNG_1200X490   = 'test-data/Social Auto-posts/Sap 1200X490.png';
  static readonly PNG_1200X760   = 'test-data/Social Auto-posts/Sap 1200X760.png';
  static readonly PNG_1200X1060  = 'test-data/Social Auto-posts/Sap 1200X1060.png';
  static readonly PNG_1440X2420  = 'test-data/Social Auto-posts/Sap 1440X2420.png';
  static readonly PNG_1600X698   = 'test-data/Social Auto-posts/Sap 1600X698.png';
  static readonly PNG_2048X1908  = 'test-data/Social Auto-posts/Sap 2048X1908.png';
  static readonly PNG_2160X3700  = 'test-data/Social Auto-posts/Sap 2160X3700.png';
  // JPG — to be updated when JPG files are added to Social Auto-posts/
  static readonly JPG_FILE       = 'test-data/goldengate.jpg';
  static readonly THUMBNAIL_JPG  = 'test-data/goldengate.jpg';
  // MP4 and invalid size
  static readonly MP4_FILE         = 'test-data/Social Auto-posts/video 1280X720.mp4';
  static readonly INVALID_PNG_FILE = 'test-data/Social Auto-posts/Hello.png';
  // Portrait video for Instagram Reel/post content — added directly under test-data/,
  // not inside Social Auto-posts/ (that's just where it was dropped, not deliberate).
  static readonly MP4_720X1280     = 'test-data/720X1280.mp4';

  // ─────────────────────────────────────────────────────────────────────
  // CONSTRUCTOR
  // ─────────────────────────────────────────────────────────────────────

  constructor(page: Page) {
    this.page = page;

    // Navigation
    // communicationTab — same locator as DocumentLibraryPage for consistency
    this.communicationTab   = page.locator("//span[text()='Communication']");
    this.automationTabProd  = page.locator("//span[normalize-space()='Automation']");
    this.socialOptionProd   = page.locator("//a[normalize-space()='Social']");
    this.socialAutoPostLink = page.locator("//a[normalize-space()='Social Auto Post']");
    this.autoPostTabProd    = page.locator("//a[normalize-space()='Auto Post']");
    this.automationTabDigipulse = page.getByText('Automation' ,{ exact : true});
    this.autoPostOptionDigipulse = page.getByRole('link', { name: 'Auto Post' });

    // Actions
    // actionsButton uses data-bs-toggle to target the dropdown trigger specifically —
    // avoids matching other btn-group elements on the page
    this.actionsButton    = page.locator("//div[contains(@class,'btn-group')]//a[@data-bs-toggle='dropdown']");
    this.createPostButton = page.locator("//a[normalize-space()='Create Post']");

    // Image Allowed Sizes tooltip
    // Scoped to the label so it won't match other info icons on the page
    this.imageAllowedSizesIcon    = page.locator("//label[contains(text(),'Image Allowed Sizes')]//span[contains(@class,'fa-info-circle')]");
    // Bootstrap 5 appends .tooltip-inner to <body> when a tooltip is triggered
    this.imageAllowedSizesTooltip = page.locator(".tooltip-inner");

    // File Upload
    this.fileInput      = page.locator("#file-upload");
    // Note: Java project spells this 'social_tumbnail' (typo in the app's HTML) — kept as-is
    this.thumbnailInput = page.locator("#social_tumbnail");

    // Form Fields
    this.cobrandingButton = page.locator("#videobrand");
    this.titleField       = page.locator("//input[@name='title' and @id='title']");
    this.descriptionField = page.locator("//textarea[@id='description_link']");

    // Partner Category
    this.partnerCategoryButton     = page.getByText('Select Category');
    this.searchBox                 = page.getByRole('textbox', { name: 'Search' });
    // Scoped to the specific row containing the category name, not just "a checkbox inside
    // #multiSelectDropdown" — the search box doesn't actually filter the visible list (all
    // 14 categories stay rendered even with a search term typed in), so an unscoped
    // getByRole('checkbox') resolves to all 15 checkboxes and throws a strict-mode
    // violation. /* selects direct children only, so this matches exactly the one row
    // whose own text contains the target name, not any of its ancestors or siblings.
    this.categoryCheckbox = page.locator(
      `//div[@id='multiSelectDropdown']/*[contains(normalize-space(.), '${SOCIAL_PARTNER_NAME}')]//input[@type='checkbox']`
    );
    this.partnerCategoryFieldLabel = page.getByText('*Partner Category');
    // facebookLabel used as a post-close confirmation — visible only when dropdown is closed
    this.facebookLabel = page.locator("//label[normalize-space()='Facebook']");

    // Social Media Checkboxes
    this.twitterLabel   = page.locator("//label[normalize-space()='Twitter']");
    this.linkedInLabel  = page.locator("//label[normalize-space()='LinkedIn']");
    this.instagramLabel = page.locator("//label[normalize-space()='Instagram']");

    // URL Options
    // Radio buttons use evaluate() — they don't respond to Playwright's regular click()
    this.customUrlRadio = page.locator("//input[@type='radio' and @id='C']");
    this.customUrlInput = page.locator("//input[@name='custom_url']");
    this.noneRadio      = page.locator("//input[@type='radio' and @id='N']");

    // Date / Time Picker
    this.dateTimeInput = page.locator("//input[contains(@class,'form_datetime')]");
    // Scoped to xdsoft_datepicker to exclude the timepicker's own next button —
    // without this scope the locator matches 2 elements and Playwright throws a strict mode violation
    this.nextMonthButton = page.locator(
      "//div[contains(@class,'xdsoft_datepicker')]//button[contains(@class,'xdsoft_next')]"
    );

    // Submit
    this.sendNotificationCheckbox = page.getByRole('checkbox', { name: 'Send Notification' });
    this.schedulePostButton       = page.getByRole('button', { name: 'Schedule Post' });

    // Validation
    this.imageSizeError = page.getByText('Image Size not valid');
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Navigation path differs by environment:
  //   dev / preprod : Communication tab → Social Auto Post link
  //   prod          : Automation tab → Social → Auto Post
  //   digipulse     : Automation tab → Auto Post
  async navigateToSocialAutoPost(): Promise<void> {
    if (ENV === 'prod') {
      await this.automationTabProd.click();
      await this.socialOptionProd.click();
      await this.autoPostTabProd.click();
    } else if (ENV === 'digipulse') {
      await this.automationTabDigipulse.click();
      await this.autoPostOptionDigipulse.click();
    } else {
      await this.communicationTab.click();
      await this.socialAutoPostLink.click();
    }
  }

  async clickActionsButton(): Promise<void> {
    await this.actionsButton.waitFor({ state: 'visible' });
    await this.actionsButton.hover();
    await this.actionsButton.click();
  }

  async clickCreatePostButton(): Promise<void> {
    await this.createPostButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // FILE UPLOAD METHODS
  // ─────────────────────────────────────────────────────────────────────

  async uploadFile(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath);
    await expect(this.imageSizeError).toBeHidden();
  }

  // Convenience wrappers — each calls uploadFile() with the right static path
  async uploadFileInPNG(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.PNG_FILE); }
  async uploadFileInJPG(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.JPG_FILE); }
  async uploadFileInMP4(): Promise<void>     { await this.uploadFile(SocialAutoPostPage.MP4_FILE); }
  async uploadInvalidPNG(): Promise<void>    { await this.uploadFile(SocialAutoPostPage.INVALID_PNG_FILE); }
  async uploadFilePath(filePath: string): Promise<void> { await this.uploadFile(filePath); }

  async uploadThumbnailInJPG(): Promise<void> {
    await this.thumbnailInput.setInputFiles(SocialAutoPostPage.THUMBNAIL_JPG);
  }

  async assertImageSizeError(): Promise<void> {
    await expect(this.imageSizeError).toBeVisible();
  }

  async assertImageRequiredError(): Promise<void> {
    await this.page.waitForSelector('text=Image/Video is required while creating a social post!', { state: 'visible' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // FORM FIELD METHODS
  // ─────────────────────────────────────────────────────────────────────

  // The cobranding checkbox (#videobrand) doesn't respond to Playwright's regular click()
  // evaluate() bypasses the issue by triggering click() directly in the browser's JS context
  async clickEnableCobrandingButton(): Promise<void> {
    await this.cobrandingButton.evaluate(el => (el as HTMLElement).click());
  }

  async enterTitle(title: string): Promise<void> {
    await this.titleField.fill(title);
  }

  async enterDescription(description: string): Promise<void> {
    await this.descriptionField.fill(description);
  }


  // ─────────────────────────────────────────────────────────────────────
  // PARTNER CATEGORY METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Opens the partner category multi-select dropdown and waits for the search box to appear
  async clickPartnerCategoryButton(): Promise<void> {
    await this.partnerCategoryButton.waitFor({ state: 'visible' });
    await this.partnerCategoryButton.click();
    await this.searchBox.waitFor({ state: 'visible' });
  }

  // Types the search term to filter options, then checks the matching checkbox directly.
  // SOCIAL_PARTNER_SEARCH comes from env so it can change per server.
  // Confirmed via a fresh codegen recording that clicking the category's TEXT (e.g.
  // "Raj2024") does nothing at all — the actual checkbox inside #multiSelectDropdown is
  // the real target. This replaces an earlier version that clicked the text (then an
  // .evaluate()-click on the text) — neither worked, both looked like they "succeeded" to
  // Playwright while silently selecting nothing, which is why a real post-schedule
  // verification (not just "the click didn't throw") matters.
  async selectPartnerCategory(): Promise<void> {
    await this.searchBox.fill(SOCIAL_PARTNER_SEARCH);
    await this.categoryCheckbox.waitFor({ state: 'visible' });
    await this.categoryCheckbox.check();
  }

  // Closes the partner category dropdown by clicking the "*Partner Category" field label —
  // confirmed via codegen. Replaces an earlier (wrong) assumption that re-clicking the
  // "Select Category" button would toggle it closed.
  // Waits for facebookLabel to confirm the dropdown is fully closed and social checkboxes are accessible
  async closePartnerCategoryDropdown(): Promise<void> {
    if (await this.searchBox.isVisible()) {
      await this.partnerCategoryFieldLabel.click();
      await this.searchBox.waitFor({ state: 'hidden' });
    }
    await this.facebookLabel.waitFor({ state: 'visible' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // SOCIAL MEDIA CHECKBOX METHODS
  // ─────────────────────────────────────────────────────────────────────

  async clickTwitter(): Promise<void> {
    await this.twitterLabel.click();
  }

  async clickLinkedIn(): Promise<void> {
    await this.linkedInLabel.click();
  }

  async clickFacebook(): Promise<void> {
    await this.facebookLabel.scrollIntoViewIfNeeded();
    await this.facebookLabel.click();
  }

  async clickInstagram(): Promise<void> {
    await this.instagramLabel.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // URL OPTION METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Radio buttons use evaluate() — they don't respond to Playwright's regular click()
  async clickCustomUrlRadio(): Promise<void> {
    await this.customUrlRadio.evaluate(el => (el as HTMLElement).click());
  }

  async enterCustomUrl(url: string): Promise<void> {
    await this.customUrlInput.fill(url);
  }

  async clickNoneRadio(): Promise<void> {
    await this.noneRadio.evaluate(el => (el as HTMLElement).click());
  }


  // ─────────────────────────────────────────────────────────────────────
  // DATE / TIME PICKER METHODS (xdsoft)
  // ─────────────────────────────────────────────────────────────────────

  async openDateTimePicker(): Promise<void> {
    await this.dateTimeInput.click();
    await this.dateTimeInput.evaluate(el => (el as HTMLElement).scrollIntoView(true));
    await this.dateTimeInput.evaluate(el => (el as HTMLElement).focus());
    await this.page.locator("div.xdsoft_datepicker").waitFor({ state: 'visible' });
  }

  // Navigates the xdsoft picker forward month by month until the target month is visible,
  // then clicks the correct day.
  //
  // WHY a loop instead of direct year/month dropdowns?
  // The Social Auto-post picker only has a "next month" arrow — no year/month dropdown selectors
  // like the Document Library picker has. The only way to reach a future month is to click next.
  //
  // WHY waitForTimeout(500)?
  // xdsoft re-renders the calendar grid after each month change with a CSS animation.
  // There is no DOM event or attribute change that reliably signals when the animation finishes.
  // 500ms matches the animation duration — the same approach used in the Java project.
  async selectFutureDate(day: number, monthYear: string): Promise<void> {
    for (let attempt = 0; attempt < 24; attempt++) {
      const displayedMonth = await this.page.locator("//div[@class='xdsoft_label xdsoft_month']/span").textContent();
      const displayedYear  = await this.page.locator("//div[@class='xdsoft_label xdsoft_year']/span").textContent();
      const displayed = `${displayedMonth?.trim()} ${displayedYear?.trim()}`;

      if (displayed === monthYear) {
        const dayCell = this.page.locator(
          `//td[contains(@class,'xdsoft_date') and @data-date='${day}' and not(contains(@class,'xdsoft_disabled'))]`
        );
        await dayCell.waitFor({ state: 'visible' });
        await dayCell.click();
        // Wait for the datetime input to be populated — confirms xdsoft registered the selection
        await this.page.waitForFunction(
          () => ((document.querySelector("input.form_datetime") as HTMLInputElement)?.value?.length ?? 0) > 0
        );
        return;
      }

      await this.nextMonthButton.scrollIntoViewIfNeeded();
      await this.nextMonthButton.click();
      await this.page.waitForTimeout(500); // xdsoft month-change animation — no deterministic signal
    }
    throw new Error(`Could not navigate to month: ${monthYear} after 24 attempts`);
  }

  // Selects a specific time slot in the xdsoft time panel
  // evaluate() used because xdsoft clips time items inside an overflow container —
  // Playwright's click() can fail when the element is outside the visible scroll area
  async selectTime(hour: string, minute: string): Promise<void> {
    await this.page.locator("div.xdsoft_time").first().waitFor({ state: 'visible' });
    const timeElement = this.page.locator(
      `//div[contains(@class,'xdsoft_time') and @data-hour='${hour}' and @data-minute='${minute}']`
    );
    await timeElement.scrollIntoViewIfNeeded();
    await timeElement.evaluate(el => (el as HTMLElement).click());
  }

  async verifyDateTimeSelection(): Promise<void> {
    const value = await this.dateTimeInput.inputValue();
    console.log(`Selected Date & Time: ${value}`);
  }


  // ─────────────────────────────────────────────────────────────────────
  // SUBMIT METHOD
  // ─────────────────────────────────────────────────────────────────────

  async clickSchedulePostButton(): Promise<void> {
    await this.schedulePostButton.scrollIntoViewIfNeeded();
    await this.schedulePostButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // TOOLTIP METHOD
  // ─────────────────────────────────────────────────────────────────────

  // Hovers the info icon, waits for Bootstrap to inject .tooltip-inner into the DOM,
  // then returns each size line as a string[].
  // innerText() strips the HTML tags — first line is the "Allowed Image Sizes:" header so we skip it.
  async getImageAllowedSizes(): Promise<string[]> {
    await this.imageAllowedSizesIcon.hover();
    await this.imageAllowedSizesTooltip.waitFor({ state: 'visible' });
    const text = await this.imageAllowedSizesTooltip.innerText();
    return text.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('Allowed'));
  }


  // ─────────────────────────────────────────────────────────────────────
  // SCROLL HELPERS
  // ─────────────────────────────────────────────────────────────────────

  async scrollDownByTwoHundred(): Promise<void> {
    await this.page.evaluate(() => window.scrollBy(0, 200));
  }

  async scrollDownByFiveHundred(): Promise<void> {
    await this.page.evaluate(() => window.scrollBy(0, 500));
  }


  // ─────────────────────────────────────────────────────────────────────
  // DATE HELPER
  // ─────────────────────────────────────────────────────────────────────

  // Returns the day number and "Month YYYY" string for a date N days from today.
  // Tests pass daysFromNow=1 (tomorrow) so the picker never lands on a disabled past date.
  // The "Month YYYY" format (e.g. "June 2026") matches what xdsoft displays in its header.
  getFutureScheduleDate(daysFromNow: number): { day: number; monthYear: string } {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    const day       = date.getDate();
    const monthName = date.toLocaleString('en-US', { month: 'long' });
    const year      = date.getFullYear();
    return { day, monthYear: `${monthName} ${year}` };
  }
}

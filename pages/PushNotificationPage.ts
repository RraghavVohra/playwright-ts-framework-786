import { Page, Locator } from '@playwright/test';
import { ENV, PARTNER_CATEGORY_NAME, CUSTOM_LINK } from '../utils/config';

export class PushNotificationPage {

  // 'page' is the Playwright browser tab this page object controls
  private page: Page;

  // ─────────────────────────────────────────────────────────────────────
  // LOCATORS
  // Each private property points to one element on the screen
  // Locators are lazy — they don't search the DOM until you call an action on them
  // ─────────────────────────────────────────────────────────────────────

  private communicationTab:            Locator;
  private pushNotificationLink:        Locator;
  private actionsButton:               Locator;
  private createAppNotificationOption: Locator;
  private pageHeading:                 Locator;
  private notificationNameField:       Locator;
  private notificationMessageField:    Locator;
  private partnerCategoryRadio:        Locator;
  private uploadListRadio:             Locator;
  private pushNotificationRadio:       Locator;
  private whatsAppRadio:               Locator;
  private categoryDropdownButton:      Locator;
  private categorySearchField:         Locator;
  private selectAllButton:             Locator;
  private imageUploadInput:            Locator;
  private customLinkButton:            Locator;
  private contentLinkButton:           Locator;
  private customLinkField:             Locator;
  private contentLinkDropdown:         Locator;
  private contentLinkFirstOption:      Locator;
  private schedulingDateTimeField:     Locator;
  private csvUploadInput:              Locator;
  private submitButton:                Locator;
  private toastMessage:                Locator;
  private closeToastButton:            Locator;
  private categoryErrorSpan:           Locator;
  private customLinkErrorSpan:         Locator;
  private actionsMenuOptions:          Locator;

  // ─────────────────────────────────────────────────────────────────────
  // CONSTRUCTOR
  // Runs when a test does: new PushNotificationPage(page)
  // All locators are defined here — not searched in DOM yet, just registered
  // ─────────────────────────────────────────────────────────────────────

  constructor(page: Page) {
    this.page = page;

    // Communication tab — same across all environments
    this.communicationTab = page.locator("//span[text()='Communication']");

    // Push Notification menu link — text differs on dev vs preprod/prod
    this.pushNotificationLink = ENV === 'dev'
      ? page.locator("//a[normalize-space()='New Push Notification']")
      : page.locator("//a[normalize-space()='Push Notification']");

    // Actions button — SVG-based on dev/preprod, class-based on prod
    // On prod the button uses a KTMenu component with a different DOM structure
    this.actionsButton = ENV === 'prod'
      ? page.locator("//button[contains(@class,'action_button_course')]")
      : page.locator("(//*[name()='svg'])[1]");

    // [1] at the end = take only the first match
    // The dropdown can sometimes render duplicate items during animation
    this.createAppNotificationOption = page.locator("(//a/span[text()='Create App Notification'])[1]");

    // Large heading text on the Push Notification list page
    this.pageHeading = page.locator("//span[@class='fs-2 fw-bolder']");

    // Form fields — IDs are the most stable locators, preferred over XPath
    this.notificationNameField    = page.locator('#pushnotify_name');
    this.notificationMessageField = page.locator('#pushnotify_msg');

    // "Send To" radio buttons — who will receive the notification
    this.partnerCategoryRadio = page.locator('#partner_category');
    this.uploadListRadio      = page.locator('#upload_list');

    // Channel radio buttons — how the notification is delivered
    // value='1' = Push Notification, value='2' = WhatsApp
    this.pushNotificationRadio = page.locator("//input[@name='channel'][@value='1']");
    this.whatsAppRadio         = page.locator("//input[@name='channel'][@value='2']");

    // Clicking this button opens the partner category selection dialog
    this.categoryDropdownButton = page.locator('#btn_ptr_category');

    // Search input inside the category dialog — filters the list as you type
    this.categorySearchField = page.locator("//input[@placeholder='Search']");

    // Selects all partner categories at once inside the dialog
    this.selectAllButton = page.locator("//a[@class='ms-selectall global']");

    // Hidden file input for image upload
    // Playwright's setInputFiles() sets the file directly — no OS dialog, no AutoIt
    // This replaces the entire AutoIt EXE approach from the Selenium Java project
    this.imageUploadInput = page.locator("//input[@name='image_url']");

    // These are <label> elements that behave like radio buttons for link type selection
    this.customLinkButton  = page.locator("//label[@for='custom-link']");
    this.contentLinkButton = page.locator("//label[@for='content-link']");

    // Text field that appears when Custom Link option is selected
    this.customLinkField = page.locator("//input[@placeholder='Enter link']");

    // The Select2-powered dropdown for choosing content when Content Link is selected
    this.contentLinkDropdown    = page.locator('#select2-contentLinkDropdown-container');
    this.contentLinkFirstOption = page.locator("(//li[contains(@class,'select2-results__option')])[1]");

    // Datetime input for scheduling when the notification should be sent
    this.schedulingDateTimeField = page.locator("//input[@name='pushnotify_time']");

    // File input for CSV — only appears when Upload List radio is selected
    this.csvUploadInput = page.locator('#upload_csv');

    // The only submit button on the create notification form
    this.submitButton = page.locator("//button[@type='submit']");

    // Toast notification shown in the corner after a successful form submission
    this.toastMessage     = page.locator("//span[@class='mssg_content']");
    this.closeToastButton = page.locator("//span[@onclick='close_success_mssg()']");

    // Inline error messages shown below specific fields on validation failure
    this.categoryErrorSpan   = page.locator('#cat_error');
    this.customLinkErrorSpan = page.locator('#customlink_error');

    // All clickable options inside the open Actions dropdown panel
    // Scoped to 'menu-sub-dropdown' so sidebar nav links are NOT included
    this.actionsMenuOptions = page.locator(
      "//div[contains(@class,'menu-sub-dropdown')]//a[contains(@class,'menu-link')]"
    );
  }


  // ─────────────────────────────────────────────────────────────────────
  // NAVIGATION METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Goes from the home page to the Push Notification LIST screen
  async navigateToPushNotificationList(): Promise<void> {
    await this.communicationTab.click();
    await this.pushNotificationLink.click();
  }

  // Goes all the way to the CREATE notification form
  // Handles the prod environment difference for the Actions button
  async navigateToCreateNotification(): Promise<void> {
    await this.navigateToPushNotificationList();

    // On prod the Actions button uses KTMenu — needs full page load + dispatchEvent
    // On dev/preprod a regular click works
    if (ENV === 'prod') {
      await this.page.waitForLoadState('networkidle');
      await this.actionsButton.scrollIntoViewIfNeeded();
      await this.actionsButton.dispatchEvent('click');
      await this.page.waitForTimeout(1000);
    } else {
      await this.actionsButton.click();
    }

    // Wait until the Create App Notification option is visible before clicking
    await this.createAppNotificationOption.waitFor({ state: 'visible' });
    await this.createAppNotificationOption.click();
  }

  // Opens the Actions dropdown WITHOUT clicking any option inside it
  // Used by TC_PN_03 which reads the menu options without navigating away
  async openActionsMenu(): Promise<void> {
    await this.navigateToPushNotificationList();
    if (ENV === 'prod') {
      await this.page.waitForLoadState('networkidle');
      await this.actionsButton.scrollIntoViewIfNeeded();
      await this.actionsButton.dispatchEvent('click');
      await this.page.waitForTimeout(1000);
    } else {
      await this.actionsButton.click();
    }
  }


  // ─────────────────────────────────────────────────────────────────────
  // PAGE VERIFICATION METHODS
  // ─────────────────────────────────────────────────────────────────────

  // Returns the heading text on the Push Notification list page
  async getPageHeading(): Promise<string> {
    return (await this.pageHeading.textContent())?.trim() ?? '';
  }

  // Returns the text of all items in the open Actions dropdown
  async getActionMenuOptions(): Promise<string[]> {
    const elements = await this.actionsMenuOptions.all();
    const texts: string[] = [];
    for (const el of elements) {
      texts.push((await el.textContent())?.trim() ?? '');
    }
    return texts;
  }


  // ─────────────────────────────────────────────────────────────────────
  // FORM FILL METHODS
  // ─────────────────────────────────────────────────────────────────────

  async enterNotificationName(name: string): Promise<void> {
    await this.notificationNameField.scrollIntoViewIfNeeded();
    // fill() clears the field first then types — avoids leftover text from previous actions
    await this.notificationNameField.fill(name);
  }

  async enterNotificationMessage(message: string): Promise<void> {
    await this.notificationMessageField.scrollIntoViewIfNeeded();
    await this.notificationMessageField.fill(message);
  }

  async selectPartnerCategoryRadio(): Promise<void> {
    await this.partnerCategoryRadio.check();
  }

  async selectUploadListRadio(): Promise<void> {
    await this.uploadListRadio.scrollIntoViewIfNeeded();
    // check() is Playwright's dedicated method for radio buttons and checkboxes
    // More reliable than click() for inputs that are visually hidden or styled
    await this.uploadListRadio.check();
  }

  async selectPushNotificationChannel(): Promise<void> {
    await this.pushNotificationRadio.check();
  }

  async selectWhatsAppChannel(): Promise<void> {
    await this.whatsAppRadio.check();
  }

  // Opens the category selection dialog
  async openCategoryDropdown(): Promise<void> {
    await this.categoryDropdownButton.scrollIntoViewIfNeeded();
    await this.categoryDropdownButton.click();
    // Wait for the search field — confirms the dialog is open and ready
    await this.categorySearchField.waitFor({ state: 'visible' });
  }

  async searchCategory(value: string): Promise<void> {
    await this.categorySearchField.fill(value);
  }

  // Clicks the category label whose name comes from .env (PARTNER_CATEGORY_NAME)
  // This makes the test environment-aware — different servers have different category names
  async selectTargetCategory(): Promise<void> {
    const label = this.page.locator(`//label[normalize-space()='${PARTNER_CATEGORY_NAME}']`);
    await label.click();
  }

  async clickSelectAll(): Promise<void> {
    await this.selectAllButton.scrollIntoViewIfNeeded();
    await this.selectAllButton.click();
  }

  // Closes the category dropdown by clicking on an empty area of the page
  async clickBlankSpace(): Promise<void> {
    await this.page.mouse.click(50, 150);
    // Confirm dialog has closed by waiting for the dropdown button to be stable again
    await this.categoryDropdownButton.waitFor({ state: 'visible' });
  }

  async getCategoryButtonText(): Promise<string> {
    return (await this.categoryDropdownButton.textContent())?.trim() ?? '';
  }

  // Uploads an image directly to the hidden file input
  // No OS dialog, no AutoIt — Playwright handles it natively
  async uploadImage(filePath: string): Promise<void> {
    await this.imageUploadInput.scrollIntoViewIfNeeded();
    await this.imageUploadInput.setInputFiles(filePath);
    await this.submitButton.waitFor({ state: 'visible' });
  }

  async clickCustomLinkOption(): Promise<void> {
    await this.customLinkButton.click();
    await this.customLinkField.waitFor({ state: 'visible' });
  }

  // Returns the current value typed inside the notification message textarea
  // Used by TC_PN_49 to verify the field retained special characters correctly
  async getNotificationMessageText(): Promise<string> {
    return await this.notificationMessageField.inputValue();
  }

  // Uses CUSTOM_LINK from .env as default — can be overridden per test
  async enterCustomLink(link: string = CUSTOM_LINK): Promise<void> {
    await this.customLinkField.scrollIntoViewIfNeeded();
    await this.customLinkField.fill(link);
  }

  async clickContentLinkOption(): Promise<void> {
    await this.contentLinkButton.click();
    await this.contentLinkDropdown.waitFor({ state: 'visible' });
  }

  async selectFirstContentLink(): Promise<void> {
    await this.contentLinkDropdown.click();
    await this.contentLinkFirstOption.waitFor({ state: 'visible' });
    // Regular click used here — Select2 dropdowns don't respond to JS/force clicks
    await this.contentLinkFirstOption.click();
  }

  // Converts "DD/MM/YYYY" + "HH:MM" into "YYYY-MM-DDTHH:MM"
  // That is the format HTML datetime-local inputs require
  async enterSchedulingDateTime(date: string, time: string): Promise<void> {
    const [day, month, year] = date.split('/');
    const formatted = `${year}-${month}-${day}T${time}`;
    await this.schedulingDateTimeField.scrollIntoViewIfNeeded();
    await this.schedulingDateTimeField.fill(formatted);
  }

  async uploadCsvFile(filePath: string): Promise<void> {
    await this.csvUploadInput.setInputFiles(filePath);
    await this.submitButton.waitFor({ state: 'visible' });
  }

  async clickSubmit(): Promise<void> {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }


  // ─────────────────────────────────────────────────────────────────────
  // VALIDATION MESSAGE METHODS
  // ─────────────────────────────────────────────────────────────────────

  // evaluate() runs JavaScript inside the browser on that specific element
  // el.validationMessage is a built-in browser property on form inputs
  // It returns the tooltip text that the browser shows when HTML5 validation fails
  async getNotificationNameValidation(): Promise<string> {
    return await this.notificationNameField.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
  }

  async getNotificationMessageValidation(): Promise<string> {
    return await this.notificationMessageField.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
  }

  // Category error is a <span> with inline text — not an HTML5 validation
  // So we use textContent() not validationMessage
  async getCategoryValidationError(): Promise<string> {
    await this.categoryErrorSpan.waitFor({ state: 'visible' });
    return (await this.categoryErrorSpan.textContent())?.trim() ?? '';
  }

  async getCustomLinkValidationError(): Promise<string> {
    await this.customLinkErrorSpan.waitFor({ state: 'visible' });
    return (await this.customLinkErrorSpan.textContent())?.trim() ?? '';
  }

  async getCsvValidationMessage(): Promise<string> {
    return await this.csvUploadInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
  }


  // ─────────────────────────────────────────────────────────────────────
  // STATE CHECK METHODS
  // ─────────────────────────────────────────────────────────────────────

  // isChecked() returns true if the radio button is currently selected
  async isPushNotificationSelected(): Promise<boolean> {
    return await this.pushNotificationRadio.isChecked();
  }

  async isWhatsAppSelected(): Promise<boolean> {
    return await this.whatsAppRadio.isChecked();
  }

  async isUploadListSelected(): Promise<boolean> {
    return await this.uploadListRadio.isChecked();
  }

  async isPartnerCategorySelected(): Promise<boolean> {
    return await this.partnerCategoryRadio.isChecked();
  }

  // Types a search value and checks if the matching checkbox appears in the list
  async searchAndValidateCategory(searchValue: string): Promise<boolean> {
    await this.categorySearchField.fill(searchValue);
    const checkboxes = await this.page.locator("//input[@type='checkbox']").all();
    for (const checkbox of checkboxes) {
      const title = await checkbox.getAttribute('title');
      if (title === searchValue) return true;
    }
    return false;
  }


  // ─────────────────────────────────────────────────────────────────────
  // TOAST MESSAGE METHODS
  // ─────────────────────────────────────────────────────────────────────

  async getToastMessageText(): Promise<string> {
    // Wait for toast to appear — it shows after a successful submission
    await this.toastMessage.waitFor({ state: 'visible' });
    return (await this.toastMessage.textContent())?.trim() ?? '';
  }

  async closeToast(): Promise<void> {
    await this.closeToastButton.click();
    // Wait for it to disappear before the test moves on
    await this.toastMessage.waitFor({ state: 'hidden' });
  }


  // ─────────────────────────────────────────────────────────────────────
  // HELPER METHOD
  // ─────────────────────────────────────────────────────────────────────

  // Returns a date N days from today in DD/MM/YYYY format
  // Always picks a future date so scheduling tests never fail with "date in past" error
  getFutureDate(daysFromToday: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    const day   = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
    const year  = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

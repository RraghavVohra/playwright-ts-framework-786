# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: push-notification.spec.ts >> TC_PN_07 - missing notification name shows validation message
- Location: tests\e2e\push-notification.spec.ts:146:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('xpath=(//a/span[text()=\'Create App Notification\'])[1]') to be visible
    89 × locator resolved to hidden <span class="m-2">Create App Notification</span>

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "Logo" [ref=e8]
    - generic [ref=e9]:
      - generic [ref=e12]:
        - link "AssetLibrary" [ref=e15] [cursor=pointer]:
          - /url: https://app.sppreprod.in/home/AssetLibrary
          - generic [ref=e16]: AssetLibrary
        - generic [ref=e19] [cursor=pointer]: Campaign
        - generic [ref=e22] [cursor=pointer]: Conversion
        - generic [ref=e25] [cursor=pointer]: journey
        - generic [ref=e28] [cursor=pointer]: Communication
        - generic [ref=e31] [cursor=pointer]: Dashboard
        - generic [ref=e34] [cursor=pointer]: Setup
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e40] [cursor=pointer]: 
          - text:   
        - text: 
  - generic [ref=e43]:
    - generic [ref=e44]:
      - text: PUSH NOTIFICATION
      - button [active] [ref=e45] [cursor=pointer]:
        - img [ref=e47]
      - text:  
      - separator [ref=e53]
    - generic [ref=e54]:
      - text:  
      - table [ref=e55]:
        - rowgroup [ref=e56]:
          - row "Notification Name Notification Message Notification Channel Status Create Date Schedule Date Sent For Delivery Stats" [ref=e57]:
            - columnheader [ref=e58]:
              - checkbox [ref=e59]
            - columnheader "Notification Name" [ref=e60]
            - columnheader "Notification Message" [ref=e61]
            - columnheader "Notification Channel" [ref=e62]
            - columnheader "Status" [ref=e63]
            - columnheader "Create Date" [ref=e64]
            - columnheader "Schedule Date" [ref=e65]
            - columnheader "Sent For" [ref=e66]
            - columnheader "Delivery Stats" [ref=e67]
        - rowgroup
```

# Test source

```ts
  64  |       ? page.locator("//button[contains(@class,'action_button_course')]")
  65  |       : page.locator("(//*[name()='svg'])[1]");
  66  | 
  67  |     // [1] at the end = take only the first match
  68  |     // The dropdown can sometimes render duplicate items during animation
  69  |     this.createAppNotificationOption = page.locator("(//a/span[text()='Create App Notification'])[1]");
  70  | 
  71  |     // Large heading text on the Push Notification list page
  72  |     this.pageHeading = page.locator("//span[@class='fs-2 fw-bolder']");
  73  | 
  74  |     // Form fields — IDs are the most stable locators, preferred over XPath
  75  |     this.notificationNameField    = page.locator('#pushnotify_name');
  76  |     this.notificationMessageField = page.locator('#pushnotify_msg');
  77  | 
  78  |     // "Send To" radio buttons — who will receive the notification
  79  |     this.partnerCategoryRadio = page.locator('#partner_category');
  80  |     this.uploadListRadio      = page.locator('#upload_list');
  81  | 
  82  |     // Channel radio buttons — how the notification is delivered
  83  |     // value='1' = Push Notification, value='2' = WhatsApp
  84  |     this.pushNotificationRadio = page.locator("//input[@name='channel'][@value='1']");
  85  |     this.whatsAppRadio         = page.locator("//input[@name='channel'][@value='2']");
  86  | 
  87  |     // Clicking this button opens the partner category selection dialog
  88  |     this.categoryDropdownButton = page.locator('#btn_ptr_category');
  89  | 
  90  |     // Search input inside the category dialog — filters the list as you type
  91  |     this.categorySearchField = page.locator("//input[@placeholder='Search']");
  92  | 
  93  |     // Selects all partner categories at once inside the dialog
  94  |     this.selectAllButton = page.locator("//a[@class='ms-selectall global']");
  95  | 
  96  |     // Hidden file input for image upload
  97  |     // Playwright's setInputFiles() sets the file directly — no OS dialog, no AutoIt
  98  |     // This replaces the entire AutoIt EXE approach from the Selenium Java project
  99  |     this.imageUploadInput = page.locator("//input[@name='image_url']");
  100 | 
  101 |     // These are <label> elements that behave like radio buttons for link type selection
  102 |     this.customLinkButton  = page.locator("//label[@for='custom-link']");
  103 |     this.contentLinkButton = page.locator("//label[@for='content-link']");
  104 | 
  105 |     // Text field that appears when Custom Link option is selected
  106 |     this.customLinkField = page.locator("//input[@placeholder='Enter link']");
  107 | 
  108 |     // The Select2-powered dropdown for choosing content when Content Link is selected
  109 |     this.contentLinkDropdown    = page.locator('#select2-contentLinkDropdown-container');
  110 |     this.contentLinkFirstOption = page.locator("(//li[contains(@class,'select2-results__option')])[1]");
  111 | 
  112 |     // Datetime input for scheduling when the notification should be sent
  113 |     this.schedulingDateTimeField = page.locator("//input[@name='pushnotify_time']");
  114 | 
  115 |     // File input for CSV — only appears when Upload List radio is selected
  116 |     this.csvUploadInput = page.locator('#upload_csv');
  117 | 
  118 |     // The only submit button on the create notification form
  119 |     this.submitButton = page.locator("//button[@type='submit']");
  120 | 
  121 |     // Toast notification shown in the corner after a successful form submission
  122 |     this.toastMessage     = page.locator("//span[@class='mssg_content']");
  123 |     this.closeToastButton = page.locator("//span[@onclick='close_success_mssg()']");
  124 | 
  125 |     // Inline error messages shown below specific fields on validation failure
  126 |     this.categoryErrorSpan   = page.locator('#cat_error');
  127 |     this.customLinkErrorSpan = page.locator('#customlink_error');
  128 | 
  129 |     // All clickable options inside the open Actions dropdown panel
  130 |     // Scoped to 'menu-sub-dropdown' so sidebar nav links are NOT included
  131 |     this.actionsMenuOptions = page.locator(
  132 |       "//div[contains(@class,'menu-sub-dropdown')]//a[contains(@class,'menu-link')]"
  133 |     );
  134 |   }
  135 | 
  136 | 
  137 |   // ─────────────────────────────────────────────────────────────────────
  138 |   // NAVIGATION METHODS
  139 |   // ─────────────────────────────────────────────────────────────────────
  140 | 
  141 |   // Goes from the home page to the Push Notification LIST screen
  142 |   async navigateToPushNotificationList(): Promise<void> {
  143 |     await this.communicationTab.click();
  144 |     await this.pushNotificationLink.click();
  145 |   }
  146 | 
  147 |   // Goes all the way to the CREATE notification form
  148 |   // Handles the prod environment difference for the Actions button
  149 |   async navigateToCreateNotification(): Promise<void> {
  150 |     await this.navigateToPushNotificationList();
  151 | 
  152 |     // On prod the Actions button uses KTMenu — needs full page load + dispatchEvent
  153 |     // On dev/preprod a regular click works
  154 |     if (ENV === 'prod') {
  155 |       await this.page.waitForLoadState('networkidle');
  156 |       await this.actionsButton.scrollIntoViewIfNeeded();
  157 |       await this.actionsButton.dispatchEvent('click');
  158 |       await this.page.waitForTimeout(1000);
  159 |     } else {
  160 |       await this.actionsButton.click();
  161 |     }
  162 | 
  163 |     // Wait until the Create App Notification option is visible before clicking
> 164 |     await this.createAppNotificationOption.waitFor({ state: 'visible' });
      |                                            ^ Error: locator.waitFor: Test timeout of 60000ms exceeded.
  165 |     await this.createAppNotificationOption.click();
  166 |   }
  167 | 
  168 |   // Opens the Actions dropdown WITHOUT clicking any option inside it
  169 |   // Used by TC_PN_03 which reads the menu options without navigating away
  170 |   async openActionsMenu(): Promise<void> {
  171 |     await this.navigateToPushNotificationList();
  172 |     if (ENV === 'prod') {
  173 |       await this.page.waitForLoadState('networkidle');
  174 |       await this.actionsButton.scrollIntoViewIfNeeded();
  175 |       await this.actionsButton.dispatchEvent('click');
  176 |       await this.page.waitForTimeout(1000);
  177 |     } else {
  178 |       await this.actionsButton.click();
  179 |     }
  180 |   }
  181 | 
  182 | 
  183 |   // ─────────────────────────────────────────────────────────────────────
  184 |   // PAGE VERIFICATION METHODS
  185 |   // ─────────────────────────────────────────────────────────────────────
  186 | 
  187 |   // Returns the heading text on the Push Notification list page
  188 |   async getPageHeading(): Promise<string> {
  189 |     return (await this.pageHeading.textContent())?.trim() ?? '';
  190 |   }
  191 | 
  192 |   // Returns the text of all items in the open Actions dropdown
  193 |   async getActionMenuOptions(): Promise<string[]> {
  194 |     const elements = await this.actionsMenuOptions.all();
  195 |     const texts: string[] = [];
  196 |     for (const el of elements) {
  197 |       if (await el.isVisible()) {
  198 |         texts.push((await el.textContent())?.trim() ?? '');
  199 |       }
  200 |     }
  201 |     return texts;
  202 |   }
  203 | 
  204 | 
  205 |   // ─────────────────────────────────────────────────────────────────────
  206 |   // FORM FILL METHODS
  207 |   // ─────────────────────────────────────────────────────────────────────
  208 | 
  209 |   async enterNotificationName(name: string): Promise<void> {
  210 |     await this.notificationNameField.scrollIntoViewIfNeeded();
  211 |     // fill() clears the field first then types — avoids leftover text from previous actions
  212 |     await this.notificationNameField.fill(name);
  213 |   }
  214 | 
  215 |   async enterNotificationMessage(message: string): Promise<void> {
  216 |     await this.notificationMessageField.scrollIntoViewIfNeeded();
  217 |     await this.notificationMessageField.fill(message);
  218 |   }
  219 | 
  220 |   async selectPartnerCategoryRadio(): Promise<void> {
  221 |     await this.partnerCategoryRadio.check();
  222 |   }
  223 | 
  224 |   async selectUploadListRadio(): Promise<void> {
  225 |     await this.uploadListRadio.scrollIntoViewIfNeeded();
  226 |     // check() is Playwright's dedicated method for radio buttons and checkboxes
  227 |     // More reliable than click() for inputs that are visually hidden or styled
  228 |     await this.uploadListRadio.check();
  229 |   }
  230 | 
  231 |   async selectPushNotificationChannel(): Promise<void> {
  232 |     await this.pushNotificationRadio.check();
  233 |   }
  234 | 
  235 |   async selectWhatsAppChannel(): Promise<void> {
  236 |     await this.whatsAppRadio.check();
  237 |   }
  238 | 
  239 |   // Opens the category selection dialog
  240 |   async openCategoryDropdown(): Promise<void> {
  241 |     await this.categoryDropdownButton.scrollIntoViewIfNeeded();
  242 |     await this.categoryDropdownButton.click();
  243 |     // Wait for the search field — confirms the dialog is open and ready
  244 |     await this.categorySearchField.waitFor({ state: 'visible' });
  245 |   }
  246 | 
  247 |   async searchCategory(value: string): Promise<void> {
  248 |     await this.categorySearchField.fill(value);
  249 |   }
  250 | 
  251 |   // Clicks the category label whose name comes from .env (PARTNER_CATEGORY_NAME)
  252 |   // This makes the test environment-aware — different servers have different category names
  253 |   async selectTargetCategory(): Promise<void> {
  254 |     const label = this.page.locator(`//label[normalize-space()='${PARTNER_CATEGORY_NAME}']`);
  255 |     await label.click();
  256 |   }
  257 | 
  258 |   async clickSelectAll(): Promise<void> {
  259 |     await this.selectAllButton.scrollIntoViewIfNeeded();
  260 |     await this.selectAllButton.click();
  261 |   }
  262 | 
  263 |   // Closes the category dropdown by clicking on an empty area of the page
  264 |   async clickBlankSpace(): Promise<void> {
```
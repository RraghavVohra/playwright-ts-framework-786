# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: push-notification.spec.ts >> TC_PN_15 - select all categories works
- Location: tests\e2e\push-notification.spec.ts:128:5

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('xpath=(//a/span[text()=\'Create App Notification\'])[1]') to be visible
    100 × locator resolved to hidden <span class="m-2">Create App Notification</span>

```

# Page snapshot

```yaml
- generic [ref=e1]:
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
        - generic [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e59]:
              - text: Show
              - combobox "Show entries" [ref=e60]:
                - option "10" [selected]
                - option "25"
                - option "50"
                - option "100"
              - text: entries
            - generic [ref=e63]:
              - text: "Search:"
              - searchbox "Search:" [ref=e64]
          - table [ref=e67]:
            - rowgroup [ref=e68]:
              - 'row "Notification Name: activate to sort column ascending Notification Message: activate to sort column ascending Notification Channel: activate to sort column ascending Status: activate to sort column ascending Create Date: activate to sort column ascending Schedule Date: activate to sort column ascending Sent For: activate to sort column ascending Delivery Stats: activate to sort column ascending" [ref=e69]':
                - columnheader [ref=e70] [cursor=pointer]:
                  - checkbox [ref=e71]
                - 'columnheader "Notification Name: activate to sort column ascending" [ref=e72] [cursor=pointer]': Notification Name
                - 'columnheader "Notification Message: activate to sort column ascending" [ref=e73] [cursor=pointer]': Notification Message
                - 'columnheader "Notification Channel: activate to sort column ascending" [ref=e74] [cursor=pointer]': Notification Channel
                - 'columnheader "Status: activate to sort column ascending" [ref=e75] [cursor=pointer]': Status
                - 'columnheader "Create Date: activate to sort column ascending" [ref=e76] [cursor=pointer]': Create Date
                - 'columnheader "Schedule Date: activate to sort column ascending" [ref=e77] [cursor=pointer]': Schedule Date
                - 'columnheader "Sent For: activate to sort column ascending" [ref=e78] [cursor=pointer]': Sent For
                - 'columnheader "Delivery Stats: activate to sort column ascending" [ref=e79] [cursor=pointer]': Delivery Stats
            - rowgroup [ref=e80]:
              - 'row "Push_1779618811547 Automation Message Success : 0 Failed : 0 Scheduled 2026-05-24 16:03:43 2026-06-23 11:30:00 Raj2024" [ref=e81]':
                - cell [ref=e82]:
                  - checkbox [ref=e83]
                - cell "Push_1779618811547" [ref=e84]
                - cell "Automation Message" [ref=e85]
                - 'cell "Success : 0 Failed : 0" [ref=e86]':
                  - 'generic "Success : 0 Failed : 0" [ref=e87]':
                    - img [ref=e88]
                - cell "Scheduled" [ref=e89]:
                  - generic [ref=e90]: Scheduled
                - cell "2026-05-24 16:03:43" [ref=e91]
                - cell "2026-06-23 11:30:00" [ref=e92]
                - cell "Raj2024" [ref=e93]
                - cell [ref=e94]
              - 'row "New Notification For Without Images New Notification For Without Images Success : 1 Failed : 1 Success 2026-05-22 11:35:33 2026-05-22 11:40:14 CSV" [ref=e95]':
                - cell [ref=e96]:
                  - checkbox [ref=e97]
                - cell "New Notification For Without Images" [ref=e98]
                - cell "New Notification For Without Images" [ref=e99]
                - 'cell "Success : 1 Failed : 1" [ref=e100]':
                  - 'generic "Success : 1 Failed : 1" [ref=e101]':
                    - img [ref=e102]
                - cell "Success" [ref=e103]:
                  - generic [ref=e104]: Success
                - cell "2026-05-22 11:35:33" [ref=e105]
                - cell "2026-05-22 11:40:14" [ref=e106]
                - cell "CSV" [ref=e107]
                - cell [ref=e108]
              - 'row "New Notification For Images Testing New Notification without Images Success : 1 Failed : 1 Success 2026-05-20 14:26:22 2026-05-20 14:30:13 CSV" [ref=e109]':
                - cell [ref=e110]:
                  - checkbox [ref=e111]
                - cell "New Notification For Images" [ref=e112]
                - cell "Testing New Notification without Images" [ref=e113]
                - 'cell "Success : 1 Failed : 1" [ref=e114]':
                  - 'generic "Success : 1 Failed : 1" [ref=e115]':
                    - img [ref=e116]
                - cell "Success" [ref=e117]:
                  - generic [ref=e118]: Success
                - cell "2026-05-20 14:26:22" [ref=e119]
                - cell "2026-05-20 14:30:13" [ref=e120]
                - cell "CSV" [ref=e121]
                - cell [ref=e122]
              - 'row "Push Notification''s SCHEDULE WITH CSV SEMGREP Testing CUSTOM CONTENT LINK Push Notification''s SCHEDULE WITH CSV SEMGREP Testing CONTENT LINK Success : 1 Failed : 1 Success 2026-05-20 11:02:59 2026-05-20 11:10:13 CSV" [ref=e123]':
                - cell [ref=e124]:
                  - checkbox [ref=e125]
                - cell "Push Notification's SCHEDULE WITH CSV SEMGREP Testing CUSTOM CONTENT LINK" [ref=e126]
                - cell "Push Notification's SCHEDULE WITH CSV SEMGREP Testing CONTENT LINK" [ref=e127]
                - 'cell "Success : 1 Failed : 1" [ref=e128]':
                  - 'generic "Success : 1 Failed : 1" [ref=e129]':
                    - img [ref=e130]
                - cell "Success" [ref=e131]:
                  - generic [ref=e132]: Success
                - cell "2026-05-20 11:02:59" [ref=e133]
                - cell "2026-05-20 11:10:13" [ref=e134]
                - cell "CSV" [ref=e135]
                - cell [ref=e136]
              - 'row "Push Notification''s SCHEDULE WITHOUT CSV SEMGREP Testing CUSTOM Push Notification''s SCHEDULE WITHOUT CSV SEMGREP CUSTOM LINK Success : 1 Failed : 4 Success 2026-05-20 10:50:27 2026-05-20 11:00:13 Raj2024" [ref=e137]':
                - cell [ref=e138]:
                  - checkbox [ref=e139]
                - cell "Push Notification's SCHEDULE WITHOUT CSV SEMGREP Testing CUSTOM" [ref=e140]
                - cell "Push Notification's SCHEDULE WITHOUT CSV SEMGREP CUSTOM LINK" [ref=e141]
                - 'cell "Success : 1 Failed : 4" [ref=e142]':
                  - 'generic "Success : 1 Failed : 4" [ref=e143]':
                    - img [ref=e144]
                - cell "Success" [ref=e145]:
                  - generic [ref=e146]: Success
                - cell "2026-05-20 10:50:27" [ref=e147]
                - cell "2026-05-20 11:00:13" [ref=e148]
                - cell "Raj2024" [ref=e149]
                - cell [ref=e150]
              - 'row "PUSH NOTIFICATION&#039;S Rraghav Test AFTER WHATSAPP 01 PUSH NOTIFICATION&#039;S Rraghav Test AFTER WHATSAPP 01 Success : 0 Failed : 2 Failed 2026-05-13 19:40:15 2026-05-13 19:40:15 CSV" [ref=e151]':
                - cell [ref=e152]:
                  - checkbox [ref=e153]
                - cell "PUSH NOTIFICATION&#039;S Rraghav Test AFTER WHATSAPP 01" [ref=e154]
                - cell "PUSH NOTIFICATION&#039;S Rraghav Test AFTER WHATSAPP 01" [ref=e155]
                - 'cell "Success : 0 Failed : 2" [ref=e156]':
                  - 'generic "Success : 0 Failed : 2" [ref=e157]':
                    - img [ref=e158]
                - cell "Failed" [ref=e159]:
                  - generic [ref=e160]: Failed
                - cell "2026-05-13 19:40:15" [ref=e161]
                - cell "2026-05-13 19:40:15" [ref=e162]
                - cell "CSV" [ref=e163]
                - cell [ref=e164]
              - 'row "lead_notification You got a new lead from Microsite. Success : 0 Failed : 0 Inprogress 2026-05-13 19:10:14 2026-05-13 19:10:14 CSV " [ref=e165]':
                - cell [ref=e166]:
                  - checkbox [ref=e167]
                - cell "lead_notification" [ref=e168]
                - cell "You got a new lead from Microsite." [ref=e169]
                - 'cell "Success : 0 Failed : 0" [ref=e170]':
                  - 'generic "Success : 0 Failed : 0" [ref=e171]':
                    - img [ref=e172]
                - cell "Inprogress" [ref=e173]:
                  - generic [ref=e174]: Inprogress
                - cell "2026-05-13 19:10:14" [ref=e175]
                - cell "2026-05-13 19:10:14" [ref=e176]
                - cell "CSV" [ref=e177]
                - cell "" [ref=e178]:
                  - generic "Click to view delivery stats" [ref=e180]: 
              - 'row "PUSH NOTIFICATION RECEIVED AFTER CLICKING 2ND EMAIL PUSH NOTIFICATION RECEIVED AFTER CLICKING 2ND EMAIL Rraghav Success : 0 Failed : 0 Scheduled 2026-05-13 18:07:00 2026-05-13 18:07:00 CSV" [ref=e181]':
                - cell [ref=e182]:
                  - checkbox [ref=e183]
                - cell "PUSH NOTIFICATION RECEIVED AFTER CLICKING 2ND EMAIL" [ref=e184]
                - cell "PUSH NOTIFICATION RECEIVED AFTER CLICKING 2ND EMAIL Rraghav" [ref=e185]
                - 'cell "Success : 0 Failed : 0" [ref=e186]':
                  - 'generic "Success : 0 Failed : 0" [ref=e187]':
                    - img [ref=e188]
                - cell "Scheduled" [ref=e189]:
                  - generic [ref=e190]: Scheduled
                - cell "2026-05-13 18:07:00" [ref=e191]
                - cell "2026-05-13 18:07:00" [ref=e192]
                - cell "CSV" [ref=e193]
                - cell [ref=e194]
              - 'row "Test AutEmail Push Test AutEmail Push Success : 0 Failed : 0 Scheduled 2026-05-13 00:15:00 2026-05-13 00:15:00 CSV" [ref=e195]':
                - cell [ref=e196]:
                  - checkbox [ref=e197]
                - cell "Test AutEmail Push" [ref=e198]
                - cell "Test AutEmail Push" [ref=e199]
                - 'cell "Success : 0 Failed : 0" [ref=e200]':
                  - 'generic "Success : 0 Failed : 0" [ref=e201]':
                    - img [ref=e202]
                - cell "Scheduled" [ref=e203]:
                  - generic [ref=e204]: Scheduled
                - cell "2026-05-13 00:15:00" [ref=e205]
                - cell "2026-05-13 00:15:00" [ref=e206]
                - cell "CSV" [ref=e207]
                - cell [ref=e208]
              - 'row "Test Direct Journey Push Test Direct Journey Push Success : 1 Failed : 4 Success 2026-05-12 18:50:13 2026-05-12 18:50:13 CSV" [ref=e209]':
                - cell [ref=e210]:
                  - checkbox [ref=e211]
                - cell "Test Direct Journey Push" [ref=e212]
                - cell "Test Direct Journey Push" [ref=e213]
                - 'cell "Success : 1 Failed : 4" [ref=e214]':
                  - 'generic "Success : 1 Failed : 4" [ref=e215]':
                    - img [ref=e216]
                - cell "Success" [ref=e217]:
                  - generic [ref=e218]: Success
                - cell "2026-05-12 18:50:13" [ref=e219]
                - cell "2026-05-12 18:50:13" [ref=e220]
                - cell "CSV" [ref=e221]
                - cell [ref=e222]
          - generic [ref=e223]:
            - status [ref=e225]: Showing 1 to 10 of 533 entries
            - list [ref=e228]:
              - listitem [ref=e229]:
                - link "Previous":
                  - /url: "#"
              - listitem [ref=e230] [cursor=pointer]:
                - link "1" [ref=e231]:
                  - /url: "#"
              - listitem [ref=e232] [cursor=pointer]:
                - link "2" [ref=e233]:
                  - /url: "#"
              - listitem [ref=e234] [cursor=pointer]:
                - link "3" [ref=e235]:
                  - /url: "#"
              - listitem [ref=e236] [cursor=pointer]:
                - link "4" [ref=e237]:
                  - /url: "#"
              - listitem [ref=e238] [cursor=pointer]:
                - link "5" [ref=e239]:
                  - /url: "#"
              - listitem [ref=e240]:
                - link "…":
                  - /url: "#"
              - listitem [ref=e241] [cursor=pointer]:
                - link "54" [ref=e242]:
                  - /url: "#"
              - listitem [ref=e243] [cursor=pointer]:
                - link "Next" [ref=e244]:
                  - /url: "#"
  - img
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
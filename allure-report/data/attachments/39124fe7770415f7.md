# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: push-notification.spec.ts >> TC_PN_16 - category search textfield works
- Location: tests\e2e\push-notification.spec.ts:112:5

# Error details

```
Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
Call log:
  - waiting for locator('#btn_ptr_category')

```

# Test source

```ts
  146 | 
  147 |   // Goes all the way to the CREATE notification form
  148 |   // Handles the prod environment difference for the Actions button
  149 |   async navigateToCreateNotification(): Promise<void> {
  150 |     await this.navigateToPushNotificationList();
  151 | 
  152 |     // On prod: wait for full page load once before the retry loop (KTMenu requirement)
  153 |     if (ENV === 'prod') {
  154 |       await this.page.waitForLoadState('networkidle');
  155 |       await this.actionsButton.scrollIntoViewIfNeeded();
  156 |     }
  157 | 
  158 |     // Dropdown can close between the button click and the option becoming interactable
  159 |     // — retry re-opening it until the option is visible
  160 |     await expect(async () => {
  161 |       if (!(await this.createAppNotificationOption.isVisible())) {
  162 |         if (ENV === 'prod') {
  163 |           await this.actionsButton.dispatchEvent('click');
  164 |         } else {
  165 |           await this.actionsButton.click();
  166 |         }
  167 |       }
  168 |       await this.createAppNotificationOption.waitFor({ state: 'visible', timeout: 2000 });
  169 |     }).toPass({ timeout: 30000 });
  170 |     await this.createAppNotificationOption.click();
  171 |   }
  172 | 
  173 |   // Opens the Actions dropdown WITHOUT clicking any option inside it
  174 |   // Used by TC_PN_03 which reads the menu options without navigating away
  175 |   async openActionsMenu(): Promise<void> {
  176 |     await this.navigateToPushNotificationList();
  177 |     if (ENV === 'prod') {
  178 |       await this.page.waitForLoadState('networkidle');
  179 |       await this.actionsButton.scrollIntoViewIfNeeded();
  180 |       await this.actionsButton.dispatchEvent('click');
  181 |       await this.page.waitForTimeout(1000);
  182 |     } else {
  183 |       await this.actionsButton.click();
  184 |     }
  185 |   }
  186 | 
  187 | 
  188 |   // ─────────────────────────────────────────────────────────────────────
  189 |   // PAGE VERIFICATION METHODS
  190 |   // ─────────────────────────────────────────────────────────────────────
  191 | 
  192 |   // Returns the heading text on the Push Notification list page
  193 |   async getPageHeading(): Promise<string> {
  194 |     return (await this.pageHeading.textContent())?.trim() ?? '';
  195 |   }
  196 | 
  197 |   // Returns the text of all items in the open Actions dropdown
  198 |   async getActionMenuOptions(): Promise<string[]> {
  199 |     const elements = await this.actionsMenuOptions.all();
  200 |     const texts: string[] = [];
  201 |     for (const el of elements) {
  202 |       if (await el.isVisible()) {
  203 |         texts.push((await el.textContent())?.trim() ?? '');
  204 |       }
  205 |     }
  206 |     return texts;
  207 |   }
  208 | 
  209 | 
  210 |   // ─────────────────────────────────────────────────────────────────────
  211 |   // FORM FILL METHODS
  212 |   // ─────────────────────────────────────────────────────────────────────
  213 | 
  214 |   async enterNotificationName(name: string): Promise<void> {
  215 |     await this.notificationNameField.scrollIntoViewIfNeeded();
  216 |     // fill() clears the field first then types — avoids leftover text from previous actions
  217 |     await this.notificationNameField.fill(name);
  218 |   }
  219 | 
  220 |   async enterNotificationMessage(message: string): Promise<void> {
  221 |     await this.notificationMessageField.scrollIntoViewIfNeeded();
  222 |     await this.notificationMessageField.fill(message);
  223 |   }
  224 | 
  225 |   async selectPartnerCategoryRadio(): Promise<void> {
  226 |     await this.partnerCategoryRadio.check();
  227 |   }
  228 | 
  229 |   async selectUploadListRadio(): Promise<void> {
  230 |     await this.uploadListRadio.scrollIntoViewIfNeeded();
  231 |     // check() is Playwright's dedicated method for radio buttons and checkboxes
  232 |     // More reliable than click() for inputs that are visually hidden or styled
  233 |     await this.uploadListRadio.check();
  234 |   }
  235 | 
  236 |   async selectPushNotificationChannel(): Promise<void> {
  237 |     await this.pushNotificationRadio.check();
  238 |   }
  239 | 
  240 |   async selectWhatsAppChannel(): Promise<void> {
  241 |     await this.whatsAppRadio.check();
  242 |   }
  243 | 
  244 |   // Opens the category selection dialog
  245 |   async openCategoryDropdown(): Promise<void> {
> 246 |     await this.categoryDropdownButton.scrollIntoViewIfNeeded();
      |                                       ^ Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
  247 |     await this.categoryDropdownButton.click();
  248 |     // Wait for the search field — confirms the dialog is open and ready
  249 |     await this.categorySearchField.waitFor({ state: 'visible' });
  250 |   }
  251 | 
  252 |   async searchCategory(value: string): Promise<void> {
  253 |     await this.categorySearchField.fill(value);
  254 |   }
  255 | 
  256 |   // Clicks the category label whose name comes from .env (PARTNER_CATEGORY_NAME)
  257 |   // This makes the test environment-aware — different servers have different category names
  258 |   async selectTargetCategory(): Promise<void> {
  259 |     const label = this.page.locator(`//label[normalize-space()='${PARTNER_CATEGORY_NAME}']`);
  260 |     await label.click();
  261 |   }
  262 | 
  263 |   async clickSelectAll(): Promise<void> {
  264 |     await this.selectAllButton.scrollIntoViewIfNeeded();
  265 |     await this.selectAllButton.click();
  266 |   }
  267 | 
  268 |   // Closes the category dropdown by clicking on an empty area of the page
  269 |   async clickBlankSpace(): Promise<void> {
  270 |     await this.page.mouse.click(50, 150);
  271 |     // Confirm dialog has closed by waiting for the dropdown button to be stable again
  272 |     await this.categoryDropdownButton.waitFor({ state: 'visible' });
  273 |   }
  274 | 
  275 |   async getCategoryButtonText(): Promise<string> {
  276 |     return (await this.categoryDropdownButton.textContent())?.trim() ?? '';
  277 |   }
  278 | 
  279 |   // Uploads an image directly to the hidden file input
  280 |   // No OS dialog, no AutoIt — Playwright handles it natively
  281 |   async uploadImage(filePath: string): Promise<void> {
  282 |     await this.imageUploadInput.scrollIntoViewIfNeeded();
  283 |     await this.imageUploadInput.setInputFiles(filePath);
  284 |     await this.submitButton.waitFor({ state: 'visible' });
  285 |   }
  286 | 
  287 |   async clickCustomLinkOption(): Promise<void> {
  288 |     await this.customLinkButton.click();
  289 |     await this.customLinkField.waitFor({ state: 'visible' });
  290 |   }
  291 | 
  292 |   // Returns the current value typed inside the notification message textarea
  293 |   // Used by TC_PN_49 to verify the field retained special characters correctly
  294 |   async getNotificationMessageText(): Promise<string> {
  295 |     return await this.notificationMessageField.inputValue();
  296 |   }
  297 | 
  298 |   // Uses CUSTOM_LINK from .env as default — can be overridden per test
  299 |   async enterCustomLink(link: string = CUSTOM_LINK): Promise<void> {
  300 |     await this.customLinkField.scrollIntoViewIfNeeded();
  301 |     await this.customLinkField.fill(link);
  302 |   }
  303 | 
  304 |   async clickContentLinkOption(): Promise<void> {
  305 |     await this.contentLinkButton.click();
  306 |     await this.contentLinkDropdown.waitFor({ state: 'visible' });
  307 |   }
  308 | 
  309 |   async selectFirstContentLink(): Promise<void> {
  310 |     await this.contentLinkDropdown.click();
  311 |     await this.contentLinkFirstOption.waitFor({ state: 'visible' });
  312 |     // Regular click used here — Select2 dropdowns don't respond to JS/force clicks
  313 |     await this.contentLinkFirstOption.click();
  314 |   }
  315 | 
  316 |   // Converts "DD/MM/YYYY" + "HH:MM" into "YYYY-MM-DDTHH:MM"
  317 |   // That is the format HTML datetime-local inputs require
  318 |   async enterSchedulingDateTime(date: string, time: string): Promise<void> {
  319 |     const [day, month, year] = date.split('/');
  320 |     const formatted = `${year}-${month}-${day}T${time}`;
  321 |     await this.schedulingDateTimeField.scrollIntoViewIfNeeded();
  322 |     await this.schedulingDateTimeField.fill(formatted);
  323 |   }
  324 | 
  325 |   async uploadCsvFile(filePath: string): Promise<void> {
  326 |     await this.csvUploadInput.setInputFiles(filePath);
  327 |     await this.submitButton.waitFor({ state: 'visible' });
  328 |   }
  329 | 
  330 |   async clickSubmit(): Promise<void> {
  331 |     await this.submitButton.scrollIntoViewIfNeeded();
  332 |     await this.submitButton.click();
  333 |   }
  334 | 
  335 | 
  336 |   // ─────────────────────────────────────────────────────────────────────
  337 |   // VALIDATION MESSAGE METHODS
  338 |   // ─────────────────────────────────────────────────────────────────────
  339 | 
  340 |   // evaluate() runs JavaScript inside the browser on that specific element
  341 |   // el.validationMessage is a built-in browser property on form inputs
  342 |   // It returns the tooltip text that the browser shows when HTML5 validation fails
  343 |   async getNotificationNameValidation(): Promise<string> {
  344 |     return await this.notificationNameField.evaluate(
  345 |       (el: HTMLInputElement) => el.validationMessage
  346 |     );
```
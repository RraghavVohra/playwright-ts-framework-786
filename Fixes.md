# Fixes

---

## Fix 1 — TC_PN_19: Missing image upload caused `#customlink_error` to never appear

**File:** `tests/e2e/push-notification.spec.ts`
**Problem:** On prod, image upload is a required field. TC_PN_19 skipped `uploadImage()`, so on submit the form blocked at image validation instead of custom link validation. `#customlink_error` never became visible → `waitFor({ state: 'visible' })` timed out.
**Fix:** Added `await pushNotificationPage.uploadImage('test-data/Amsterdam.png')` after `clickBlankSpace()` and before `clickCustomLinkOption()`.

---

## Fix 2 — TC_PN_03: `getActionMenuOptions()` returning items from hidden dropdowns

**File:** `pages/PushNotificationPage.ts`
**Problem:** The locator `//div[contains(@class,'menu-sub-dropdown')]//a[contains(@class,'menu-link')]` matched all `menu-sub-dropdown` elements on the page — the profile dropdown (My Profile, Privacy Policy, Log Out) and KTMenu's hidden duplicate of the actions dropdown were both included, producing 8 items instead of 3.
**Fix:** Added `if (await el.isVisible())` check inside `getActionMenuOptions()` so only items from the currently open/visible dropdown are collected.

---

## Fix 3 — TC_DL_03: Strict mode violation — `uploadMenuOption` resolved to 5 elements

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** The locator `//a[contains(@href,'sp-upload-document.php')]` matched 5 elements — the Upload menu option AND 4 row-level Edit buttons in the document table, which share the same base URL (`sp-upload-document.php?document_id=...`). Calling `.innerText()` on an ambiguous locator threw a strict mode violation.
**Fix:** Added `and not(contains(@href,'document_id'))` to the XPath to exclude Edit buttons (which always carry a `document_id` query param). The `contains` approach is kept (not an exact match) because preprod adds a `/manager/` path prefix to the URL.

---

## Fix 4 — TC_DL_37: XPath SyntaxError caused by apostrophe in document name

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** `getSearchResultText()` built the locator by directly interpolating the document name into an XPath string literal: `` `//td[normalize-space()='${text}']` ``. When the first document name contained an apostrophe (e.g. `TEST's`), it terminated the XPath string early, producing an invalid XPath expression and a SyntaxError.
**Fix:** Replaced the XPath locator with `page.getByRole('cell', { name: text, exact: true })`. Playwright's built-in role locator handles apostrophes, quotes, and other special characters internally — no string interpolation needed.

---

## Fix 5 — TC_DL_40: Wrong flow order, hardcoded category ID, and stale test name

**File:** `tests/e2e/document-library.spec.ts`, `pages/DocumentLibraryPage.ts`
**Problem 1 — Wrong order:** The schedule checkbox was being clicked after selecting the Team radio button and category. The correct flow requires unchecking the schedule checkbox first, before selecting Team and the partner category.
**Problem 2 — Hardcoded category ID:** `categoryLabel` used `//label[@for='ms-opt-40']` — a hardcoded multiselect option ID that could change whenever categories are added or reordered on the server, making it fragile.
**Problem 3 — Misleading test name:** The test was named "Update access control for a document" but the schedule steps were removed, making the name inaccurate.
**Fix:** Moved `clickScheduleCheckbox()` to before `clickTeamRadioButton()`. Removed the schedule textbox and time-picker steps (not part of this flow). Changed `categoryLabel` locator to `//label[normalize-space()='Raj2024']` — targets the category by visible text, not a fragile ID. Renamed test to "Update access control for a document without schedule".

---

## Fix 6 — TC_DL_17: Cropping handle locator used exact class match

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** `croppingHandle` used `//div[@class='imgareaselect-border4']` — an exact class match. If the `imgareaselect` plugin adds any extra classes at runtime, the element would never be found and `waitFor({ state: 'visible' })` would time out. Also, the cropper only works on preprod — not on dev.
**Fix:** Changed to `//div[contains(@class,'imgareaselect-border4')]` so extra classes don't break the match. Switched environment to preprod in `.env` where the cropper is available.

---

## Fix 7 — TC_DL_41: Wrong flow order, hidden schedule textbox, and strict mode violation in date picker

**File:** `tests/e2e/document-library.spec.ts`, `pages/DocumentLibraryPage.ts`
**Problem 1 — Wrong flow order:** Schedule checkbox is checked by default when the access form opens. The test was not unchecking it first before selecting Team and category, causing the textbox to remain in an unexpected state.
**Problem 2 — Hidden schedule textbox:** `clickScheduleTextbox()` was called without first re-enabling the schedule checkbox after category selection. The textbox (`#schedule_synd`) only becomes visible when the checkbox is checked, so it was not interactable.
**Problem 3 — Strict mode violation in date picker:** `selectDateOfYourChoice()` used page-level locators for year/month/day which matched all 3 xdsoft picker instances on the page, not just the visible one.
**Fix:** Corrected flow — uncheck schedule → select Team → select category → re-check schedule → pick date. Scoped all year/month/day locators inside the visible picker using `picker.locator(...)` with CSS selectors so only the open picker is targeted.

---

## Fix 7 — TC_DL_40: Access update fails for Syndicated documents

**File:** `tests/e2e/document-library.spec.ts`, `pages/DocumentLibraryPage.ts`
**Problem:** `clickCheckbox()` always selected the first document in the listing regardless of its status. On preprod the top documents had "Syndicated" status — access control cannot be updated for Syndicated documents, so the flow failed.
**Fix:** Added a new `draftDocumentCheckbox` locator using `page.getByText('Draft', { exact: true }).first().locator('xpath=ancestor::tr').locator('input[id="document_content"]')` — traverses up to the row containing a Draft badge and targets its checkbox. Added `clickDraftDocumentCheckbox()` method and updated TC_DL_40 to use it instead of `clickCheckbox()`.

---

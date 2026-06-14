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

## Fix 12 — TC_PN_04/06/07/08/13: Actions dropdown closes before Create App Notification option is interactable

**File:** `pages/PushNotificationPage.ts`
**Problem:** `navigateToCreateNotification()` clicked the Actions button then called `waitFor({ state: 'visible' })` on the Create App Notification option. The dropdown was closing before the option could be clicked — same race condition as TC_DL_04. The test stayed on the Push Notification list page with no way to recover.
**Fix:** Applied the same `expect().toPass()` retry pattern used for `clickUploadOption()` in DocumentLibraryPage. The loop checks if the option is visible; if not, re-clicks the Actions button (using `dispatchEvent` on prod, regular click elsewhere) and waits 2s. The prod `waitForLoadState('networkidle')` is kept outside the loop — it only needs to run once as a precondition, not on every retry.

---

## Fix 11 — TC_DL_41: xdsoft day locator matches overflow days from adjacent months

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** `selectDateOfYourChoice()` located the day cell using only `[data-date='${day}']`. The xdsoft calendar renders overflow days from the next month at the bottom of the grid — those cells share the same `data-date` value (e.g. both July 1 and August 1 have `data-date='1'`). Strict mode threw because the locator resolved to 2 elements.
**Fix:** Added `[data-month='${month - 1}']` to the day locator. xdsoft stores months 0-based, same as the existing month selector — this pins the click to the correct month's cell and excludes any overflow days.

---

## Fix 10 — TC_DL_34: `text()='teaser'` fails when text lives inside a child element

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** `hashtagSuggestion` on preprod used `//li[contains(@class,'ui-menu-item') and text()='teaser']`. In XPath, `text()` only selects direct text nodes of the element. jQuery UI autocomplete wraps suggestion text in a child `<a>` or `<div>` inside the `<li>`, so `text()='teaser'` never matches — the suggestion was visible on screen but the locator timed out because the predicate returned nothing.
**Fix:** Changed to `normalize-space()='teaser'`. Without an argument, `normalize-space()` reads the full string value of the element including all descendant text, making it match regardless of how deep the text sits in the DOM.

---

## Fix 9 — TC_DL_17: `scrollToTop()` called mid-navigation causes page context error

**File:** `tests/e2e/document-library.spec.ts`
**Problem:** `scrollToTop()` was called immediately after `clickUploadButton()`. The button submits the form and triggers a page navigation — `page.evaluate()` inside `scrollToTop()` ran while the old page's JS context was being destroyed, throwing `Target page, context or browser has been closed`. The test was timing out on first run and passing on retry (yellow/flaky in Allure). `scrollToTop()` served no purpose here anyway — the only assertion is `toHaveURL()`, which is scroll-position-agnostic.
**Fix:** Removed `scrollToTop()` entirely from TC_DL_17. No scroll is needed before a URL assertion.

---

## Fix 8 — TC_DL_04: Upload dropdown closes before `waitFor` can catch it visible

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** `clickUploadOption()` called `waitFor({ state: 'visible' })` but the Actions dropdown was already closing by the time the wait ran — element resolved to hidden 81 times before the 60s timeout. The method had no way to re-open the dropdown, so it just kept watching a permanently-hidden element.
**Fix:** Replaced the bare `waitFor` with an `expect().toPass()` retry loop. Each iteration checks if the upload option is visible; if not, it re-clicks the Actions button to re-open the dropdown, then waits 2s for the option to appear. The whole loop retries for up to 30s, then clicks once visibility is confirmed.

---

## Fix 7 — TC_DL_40: Access update fails for Syndicated documents

**File:** `tests/e2e/document-library.spec.ts`, `pages/DocumentLibraryPage.ts`
**Problem:** `clickCheckbox()` always selected the first document in the listing regardless of its status. On preprod the top documents had "Syndicated" status — access control cannot be updated for Syndicated documents, so the flow failed.
**Fix:** Added a new `draftDocumentCheckbox` locator using `page.getByText('Draft', { exact: true }).first().locator('xpath=ancestor::tr').locator('input[id="document_content"]')` — traverses up to the row containing a Draft badge and targets its checkbox. Added `clickDraftDocumentCheckbox()` method and updated TC_DL_40 to use it instead of `clickCheckbox()`.

---

## Fix 18 — TC_DL_38 (and systemic): Global timeout raised from 60s to 90s

**File:** `playwright.config.ts`, `tests/e2e/document-library.spec.ts`
**Problem:** TC_DL_38's `beforeEach` hook timed out at 60s — `page.goto('/home')` + `navigateToDocumentLibrary()` + `waitForLoadState('domcontentloaded')` exceeded the budget when the preprod server was under load from the many tests that ran before it. `test.setTimeout()` inside the test body cannot fix a beforeEach timeout because the test body never runs when beforeEach fails. The pattern was systemic: TC_DL_32, TC_DL_34, TC_DL_38, and TC_DL_41 all failed due to the same underlying cause — 60s is too tight for tests running late in the sequential suite on a slow server.
**Fix:** Raised `timeout` in `playwright.config.ts` from `60 * 1000` to `90 * 1000`. This is the correct level at which to fix a beforeEach timeout. Removed the now-redundant `test.setTimeout(90000)` from TC_DL_32, TC_DL_34, and TC_DL_41 — the global 90s covers them. TC_DL_22_4 and TC_DL_22_5 keep their `test.setTimeout(120000)` since MP4 uploads genuinely require more than 90s.

---

## Fix 17 — TC_DL_41: Calendar day click times out due to race condition and budget exhaustion

**File:** `tests/e2e/document-library.spec.ts`, `pages/DocumentLibraryPage.ts`
**Problem 1 — Budget exhaustion:** TC_DL_41 is the last test in the file. The 12 steps before `selectDateOfYourChoice` (navigation, actions, access form, category selection, schedule toggle) consumed nearly the full 60s on a loaded server, leaving almost no time for the calendar interaction.
**Problem 2 — Race condition in calendar navigation:** After clicking a month option in `xdsoft_monthselect`, xdsoft re-renders the calendar grid asynchronously. The next line immediately tried to click a day cell for the new month (`data-month='5'`), but the grid hadn't updated yet — the old month's cells were still in the DOM and the new month's cells hadn't appeared. The locator matched nothing and waited until timeout.
**Fix 1:** Added `test.setTimeout(90000)` to TC_DL_41 to address budget exhaustion.
**Fix 2:** Added `await picker.locator('td.xdsoft_date[data-month=\\'${month - 1}\\']').first().waitFor({ state: 'visible' })` after the month option click in `selectDateOfYourChoice()`. This explicitly waits for the calendar grid to show at least one cell from the new month before attempting the day click, eliminating the race condition.

---

## Fix 16 — TC_DL_34: `clickActionsButton()` times out due to test budget exhaustion

**File:** `tests/e2e/document-library.spec.ts`
**Problem:** TC_DL_34 runs late in the suite (after TC_DL_32) and has more steps than TC_DL_32 — it includes hashtag entry and autocomplete selection on top of the full upload flow. The accumulated server load and the extra steps consumed the 60s test budget before `clickActionsButton()` could find the `btn-group dropdown` element.
**Fix:** Added `test.setTimeout(90000)` as the first line of TC_DL_34, consistent with the approach used for TC_DL_32, TC_DL_22_4, and TC_DL_22_5.

---

## Fix 15 — TC_DL_32: `#document_file` setInputFiles times out due to test budget exhaustion

**File:** `tests/e2e/document-library.spec.ts`, `pages/DocumentLibraryPage.ts`
**Problem:** TC_DL_32 runs late in the test suite when the server is under load. By the time `uploadDocumentUsingJPG()` fires, the 60s test clock was nearly exhausted by: `navigateToDocumentLibrary()` + `waitForLoadState` + `clickActionsButton()` + `clickUploadOption()` retry loop (up to 30s) + `toHaveURL` assertion. The `setInputFiles` action had almost no remaining budget and timed out — `#document_file` exists on the page but the test clock expired before the form rendered.
**Fix 1:** Added `await this.page.waitForLoadState('domcontentloaded')` at the end of `clickUploadOption()`. This ensures the upload form's DOM is ready before control returns to the test, so `#document_file` is immediately available.
**Fix 2:** Added `test.setTimeout(90000)` to TC_DL_32 to give the test a larger overall budget, matching the approach used for TC_DL_22_4 and TC_DL_22_5.

---

## Fix 14 — TC_DL_22_4 / TC_DL_22_5: MP4 upload tests exhaust 60s test budget before URL assertion runs

**File:** `tests/e2e/document-library.spec.ts`
**Problem:** Both tests upload MP4 files and had `{ timeout: 60000 }` on the final URL assertion to account for slow server processing. But the global test timeout is also 60000ms. By the time beforeEach navigation + form filling + MP4 upload consumed the budget, the URL assertion had no time left — the `{ timeout: 60000 }` on the assertion was effectively useless.
**Fix:** Added `test.setTimeout(120000)` as the first line of both TC_DL_22_4 and TC_DL_22_5. This overrides the global 60s timeout for these specific tests only, giving the full 120s for the test body including the server-side MP4 processing time.

---

## Fix 13 — TC_DL_22_3: `clickActionsButton()` times out on non-dev environments

**File:** `pages/DocumentLibraryPage.ts`
**Problem:** Two issues combined to cause a 60s test timeout on the `btn-group dropdown` locator. First, `navigateToDocumentLibrary()` had no `waitForLoadState` after clicking the Document Library link — Playwright moved on while the page was still loading, so `btn-group dropdown` wasn't in the DOM yet when `clickActionsButton()` fired. Second, calling `.click()` directly without `.first()` risks a strict mode violation if multiple elements match.
**Fix:** Added `await this.page.waitForLoadState('domcontentloaded')` at the end of `navigateToDocumentLibrary()`. Added `.first().waitFor({ state: 'visible' })` before `.first().click()` in `clickActionsButton()`.

---

## Fix 19 — GitHub Actions: `playwright-report` artifact would be empty for Azure runs

**File:** `.github/workflows/playwright.yml`
**Problem:** `playwright.service.config.ts` was changed to write its HTML report to `azure-report/` (so local and Azure runs don't overwrite each other's reports), but the workflow's `actions/upload-artifact@v4` step was still hardcoded to upload `playwright-report/`. Since the Azure run no longer writes anything there, the uploaded artifact would be empty.
**Fix:** Changed the artifact step's `path:` from `playwright-report/` to `azure-report/` to match the new output folder.

---

## Fix 20 — GitHub Actions: "Install Playwright Browsers" step taking 25+ minutes every run

**File:** `.github/workflows/playwright.yml`
**Problem:** The `npx playwright install --with-deps chromium` step ran on every workflow run and took 25+ minutes, never benefiting from the `actions/cache` step above it. Root cause: the workflow was being manually cancelled before it finished (because of the long wait), and `actions/cache` only saves its cache in a post-job step that runs when the job completes — a cancelled run never saves the cache, so every subsequent run started from zero again (cache miss loop). Separately, since tests run on **Azure cloud browsers** (`playwright.service.config.ts` + Azure Playwright Testing service), the local Chromium install was likely unnecessary altogether.
**Fix:** Removed the "Cache Playwright Browsers" and "Install Playwright Browsers" steps entirely — test execution happens on Azure's remote browsers, not the GitHub runner. Renumbered the remaining step comments (4-6).
**Note:** If a future Azure run fails because Playwright still expects a local browser binary, the fallback is to run the job inside Microsoft's official Playwright Docker image (`mcr.microsoft.com/playwright:vX-noble`), which has Chromium + OS deps pre-baked — no install step needed at all.

---

## Fix 21 — GitHub Actions: Login failed with `value: expected string, got undefined` after Fix 20, then multi-environment credentials needed

**File:** `.github/workflows/playwright.yml`, GitHub repo Settings (Secrets and Environments)

**Problem 1 — Missing credentials in CI:** After Fix 20 removed the browser-install steps, the workflow proceeded straight to running tests — and immediately failed inside `auth.setup.ts`:
```
Error: locator.fill: value: expected string, got undefined
  await page.locator('#username').fill(USER_EMAIL);
```
`.env` holds `USER_EMAIL`/`USER_PASSWORD`/`ENV` and is correctly gitignored, so none of these existed as `process.env` values on the GitHub runner — `USER_EMAIL`/`USER_PASSWORD` were `undefined`.

**Problem 2 — Need different credentials per environment:** The framework now supports 4 environments (`dev`/`preprod`/`prod`/`digipulse`), each with different login credentials. GitHub Actions can't dynamically build a secret *name* like `USER_EMAIL_${{ inputs.environment }}` — secret names in `${{ secrets.X }}` must be static.

**Fix:**
1. Added `ENV`, `USER_EMAIL`, `USER_PASSWORD` to the "Run Playwright tests" step's `env:` block:
   ```yaml
   ENV: ${{ inputs.environment }}
   USER_EMAIL: ${{ secrets.USER_EMAIL }}
   USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
   ```
2. Added `workflow_dispatch.inputs.environment` (choice dropdown: digipulse/prod/preprod/dev) and `environment: ${{ inputs.environment }}` at the job level — this lets GitHub Actions resolve `secrets.USER_EMAIL`/`secrets.USER_PASSWORD` from a **GitHub Environment matching the dropdown selection first**, falling back to repo-level secrets if that environment has none of its own. Same secret *names* everywhere, different *values* per environment — no `config.ts` changes needed.
3. In GitHub UI (manual, one-time per environment):
   - Added repo-level secrets `USER_EMAIL` = `prem.chandra@salespanda.com`, `USER_PASSWORD` = `Sbtest@1234` (Digipulse creds) — these are the fallback used when the selected environment defines no secrets of its own, so they cover `digipulse` (the default) and `dev`.
   - Created a GitHub Environment named `prod` (Settings → Environments → New environment) and added environment-scoped secrets `USER_EMAIL` = `eduadmin@gmail.com`, `USER_PASSWORD` = `12345` — these override the repo-level secrets only when `prod` is selected.
   - `preprod` can be set up the same way later (creds: `raghav.vohra@salespanda.com` / `Sbtest@1234`) when needed.

**Result:** Selecting an environment from the `workflow_dispatch` dropdown now logs in with the correct credentials for that environment, with zero code changes required to add a new environment's credentials — just a new GitHub Environment + two secrets.

---

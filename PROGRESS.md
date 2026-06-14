# Playwright TypeScript Framework — Progress Tracker

> This file is updated every session. Use it as an interview reference — it covers what was built, why each decision was made, and what concepts are demonstrated.

---

## Framework Overview

**Tech Stack:** Playwright + TypeScript  
**Pattern:** Page Object Model (POM)  
**Application Under Test:** A multi-environment web app (dev / preprod / prod) for managing push notifications  
**Test Runner:** Playwright Test  
**Language:** TypeScript (strict mode)

---

## Session 1 — Foundation & Push Notification Feature

### What Was Built

#### 1. Project Setup (`package.json`, `tsconfig.json`)
- Initialized a TypeScript project with `@playwright/test`, `@types/node`, and `dotenv`
- `tsconfig.json` set to strict mode, ES2020 target, CommonJS modules
- Enables clean import paths via `baseUrl: "."`

---

#### 2. Multi-Environment Config (`utils/config.ts`)
- Reads `ENV` from `.env` file — supports `dev`, `preprod`, `prod`
- Maintains a `BASE_URLS` map so one config drives all environments
- Exports `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD`, `PARTNER_CATEGORY_NAME`, `CUSTOM_LINK`
- Values default to safe fallbacks when not set in `.env`

**Interview talking point:** "The framework supports three environments without any code change — just update the ENV variable in .env."

---

#### 3. Authentication Setup (`auth.setup.ts`)
- A dedicated Playwright "setup" project that runs once before all tests
- Navigates to login page, fills credentials from env, submits
- Waits for URL to contain `AssetLibrary` to confirm successful login
- Saves entire browser session (cookies + localStorage) to `auth.json`
- All real tests load `auth.json` via `storageState` — no test has to log in manually

**Interview talking point:** "Login runs once, session is reused across all tests — this cuts test execution time significantly."

---

#### 4. Playwright Config (`playwright.config.ts`)
- `testDir: './tests/e2e'` — separates test files from utility/setup files
- `timeout: 60s`, `expect.timeout: 15s` — tuned for slow preprod server
- `fullyParallel: false`, `workers: 1` — sequential execution to avoid session conflicts
- `headless: false` — browser visible during runs (easy to flip for CI)
- `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'` — debug artifacts on failure only
- HTML reporter — visual report via `npx playwright show-report`
- **Two projects:**
  - `setup` — runs only `auth.setup.ts`, creates `auth.json`
  - `chromium` — runs all tests, depends on `setup`, loads `auth.json`

**Interview talking point:** "The two-project pattern is how Playwright handles global setup — the setup project runs first and the test project depends on it."

---

#### 5. Custom Fixtures (`utils/fixtures.ts`)
- Extends base Playwright `test` with a custom `pushNotificationPage` fixture
- Any test that declares `pushNotificationPage` in its parameters gets an auto-instantiated `PushNotificationPage` object
- Re-exports `expect` so test files only need a single import line: `import { test, expect } from '../../utils/fixtures'`

**Interview talking point:** "Fixtures in Playwright work like dependency injection — you declare what you need and Playwright provides it."

---

#### 6. Page Object Model (`pages/PushNotificationPage.ts`)

**43 locators** defined in the constructor, covering:
- Navigation elements (sidebar tabs, menu links, action buttons)
- Form fields (name, message, file inputs, dropdowns, date-time)
- Validation error spans and toast messages
- Radio buttons for channel and send-to selection

**Locator strategies used:**
| Strategy | Example | Why |
|---|---|---|
| ID (`#id`) | `#pushnotify_name` | Most stable, preferred |
| XPath by text | `//span[text()='Communication']` | When no ID exists |
| XPath with normalize-space | `//a[normalize-space()='Push Notification']` | Handles whitespace in text |
| XPath by attribute | `//input[@name='channel'][@value='1']` | When multiple similar elements exist |
| CSS class | `.ms-selectall.global` | For library-generated components |

**Environment-aware locators:**
- `pushNotificationLink` — different text on dev vs preprod/prod
- `actionsButton` — SVG-based on dev/preprod, class-based on prod (KTMenu component)

**Methods grouped into sections:**
- Navigation methods (`navigateToPushNotificationList`, `navigateToCreateNotification`, `openActionsMenu`)
- Page verification methods (`getPageHeading`, `getActionMenuOptions`)
- Form fill methods (all `enter*`, `select*`, `upload*`, `click*` methods)
- Validation message methods (`get*Validation`, `get*ValidationError`)
- State check methods (`is*Selected`, `is*Checked`)
- Toast methods (`getToastMessageText`, `closeToast`)
- Helper method (`getFutureDate`)

**Key implementation decisions:**
- `setInputFiles()` for file uploads — replaces AutoIt EXE from Selenium Java framework
- `evaluate()` with `el.validationMessage` — reads browser HTML5 validation tooltips without triggering them via JS
- `dispatchEvent('click')` on prod Actions button — KTMenu component doesn't respond to Playwright's regular click
- `getFutureDate(n)` — always generates a future date so scheduling tests never fail with "date in past"
- `PARTNER_CATEGORY_NAME` from env — category name differs per server, so it's configurable

---

#### 7. Test Suite (`tests/e2e/push-notification.spec.ts`)

13 test cases, all prefixed with TC_PN_* for traceability:

| Test ID | Description | Type |
|---|---|---|
| TC_PN_01 | Navigate to Push Notification list — verify heading + URL | Navigation |
| TC_PN_04 | Navigate to Create App Notification — verify URL | Navigation |
| TC_PN_03 | Actions menu shows correct 3 options | UI Verification |
| TC_PN_06 | Channel radio buttons (Push / WhatsApp) are mutually exclusive | Functional |
| TC_PN_13 | Send To radio buttons (Partner Category / Upload List) are mutually exclusive | Functional |
| TC_PN_16 | Category search field filters results correctly | Functional |
| TC_PN_15 | Select All categories updates the button label | Functional |
| TC_PN_07 | Missing notification name shows HTML5 validation tooltip | Validation |
| TC_PN_08 | Missing notification message shows HTML5 validation tooltip | Validation |
| TC_PN_17 | Missing category keeps form on create page (no navigation) | Validation |
| TC_PN_19 | Custom Link selected but URL empty shows inline error | Validation |
| TC_PN_23 | Full valid form submission shows success toast | Happy Path / E2E |
| TC_PN_49 | Special characters accepted in message field | Edge Case |
| TC_PN_50 | Upload List selected but no CSV keeps form on create page | Validation |

**Patterns used in tests:**
- `beforeEach` navigates to `/home` — tests start from a clean known state
- `Date.now()` for unique notification names — prevents conflicts between test runs
- `getFutureDate(30)` — scheduling always picks a date 30 days in the future
- `toHaveURL(/regex/)` — URL assertions with auto-wait, no manual sleep
- Validating radio button exclusivity by checking both states after switching

---

#### 8. Test Data (`test-data/`)
- `Amsterdam.png` — image file for image upload tests (TC_PN_23)
- `pushnotificationsspuat - Production.csv` — bulk recipient upload file for CSV tests

---

## Concepts Demonstrated (Interview Reference)

| Concept | Where |
|---|---|
| Page Object Model | `pages/PushNotificationPage.ts` |
| Custom Fixtures | `utils/fixtures.ts` |
| Multi-environment config | `utils/config.ts` + `.env` |
| Session reuse (storageState) | `auth.setup.ts` + `playwright.config.ts` |
| Two-project setup (global auth) | `playwright.config.ts` |
| HTML5 validation via `evaluate()` | `PushNotificationPage.ts` — `get*Validation()` methods |
| File upload without OS dialog | `setInputFiles()` in `uploadImage()`, `uploadCsvFile()` |
| Environment-conditional logic | `navigateToCreateNotification()`, `openActionsMenu()` |
| XPath + CSS locator strategies | Throughout `PushNotificationPage.ts` constructor |
| Unique test data with `Date.now()` | TC_PN_08, TC_PN_17, TC_PN_19, TC_PN_23, TC_PN_50 |
| Dynamic future dates | `getFutureDate()` helper |
| `dispatchEvent` for non-standard components | Prod Actions button (KTMenu) |
| Auto-wait assertions (`toHaveURL`) | Navigation tests |
| Toast verification | TC_PN_23 |

---

## Current State

- **Page Objects:** 1 (`PushNotificationPage`)
- **Test files:** 1 (`push-notification.spec.ts`)
- **Test cases:** 13
- **Environments supported:** 3 (dev, preprod, prod)
- **Auth strategy:** Session reuse via `storageState`

---

*Last updated: Session 1 — 2026-05-17*

---

## Session 2 — Document Library Feature (Page Object — Locators)

### What Was Built

#### 1. New Page Object skeleton (`pages/DocumentLibraryPage.ts`)

Started building the Document Library page object, ported from the Java project (`playwright-java-learning/src/main/java/pageObjects/DocumentLibraryPage.java`).

**Step completed this session: Locators only** — the class skeleton and full constructor are written. Methods come next session.

**Locator groups defined:**
| Group | Locators |
|---|---|
| Navigation | `communicationTab`, `documentLibraryLink`, `actionsButton` |
| Actions menu | `uploadMenuOption`, `accessMenuOption`, `updateHashtagMenuOption`, `deleteMenuOption` |
| Upload form | `uploadButton`, `documentNameField`, `fileInput`, `thumbnailInput`, `croppingHandle`, `applyButton`, `descriptionField` |
| Document options | `documentOptionTwo`, `documentOptionThree`, `downloadableToggle` |
| Hashtag | `hashtagField`, `hashtagSuggestion` |
| Search & listing | `searchBox`, `firstDocumentNameElement`, `noRecordsElement` |
| Delete flow | `okButton`, `dialogBox` |
| Checkbox & dynamic text | `checkboxOption`, `dynamicElement` |
| Access control | `teamRadioButton`, `partnerCategoryButton`, `categoryLabel`, `updateAccessButton` |
| Schedule | `scheduleCheckbox`, `scheduleTextbox`, `contentUpdateDate` |

**Static file path constants defined** (`PDF_FILE`, `PNG_FILE`, `JPG_FILE`, `XLSX_FILE`, `MP4_FILE`, `GIF_FILE`, `THUMBNAIL_PNG`, `THUMBNAIL_GIF`, `THUMBNAIL_JPG`) — paths resolved relative to project root, no `Paths.get()` needed in TypeScript.

---

### Key Locator Decisions (Interview Reference)

#### Decision 1 — `actionsButton` is environment-conditional
```typescript
this.actionsButton = ENV === 'dev'
  ? page.locator("(//*[name()='svg'])[1]")
  : page.locator("//div[contains(@class,'btn-group dropdown')]");
```
The Actions button renders as an SVG on dev and as a `btn-group dropdown` div on preprod/prod. Decision made once in the constructor — every method just calls `this.actionsButton.click()` with no if/else.

**Interview talking point:** *"The same UI element renders differently across environments, so I made the locator environment-aware. The decision is made once in the constructor so every method stays clean."*

---

#### Decision 2 — `uploadMenuOption` uses `contains(@href)` not exact match
```typescript
this.uploadMenuOption = page.locator("//a[contains(@href,'sp-upload-document.php')]");
```
The Java project originally used an exact `@href` match which silently failed on preprod because preprod adds a `/manager/` path prefix to the href. `contains()` handles both environments.

**Interview talking point:** *"I used `contains()` instead of an exact match because the href value differs between environments. The exact match was a silent bug — tests would wait 60 seconds and time out because the element was never found."*

---

#### Decision 3 — `hashtagSuggestion` is environment-conditional
```typescript
this.hashtagSuggestion = ENV === 'dev'
  ? page.locator("//li[contains(@class,'ui-menu-item')]")
  : page.locator("//li[contains(@class,'ui-menu-item') and text()='teaser']");
```
On dev, one `ui-menu-item` is enough. On preprod/prod the `<li>` has extra classes and can have multiple matches, so a text predicate pins it to the exact suggestion.

**Interview talking point:** *"Same pattern as the actions button — the DOM differs per environment so the locator is decided once at construction time, not in every method that uses it."*

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| Environment-conditional locators | `actionsButton`, `hashtagSuggestion` in constructor |
| `contains()` for partial attribute matching | `uploadMenuOption` — guards against env path prefix differences |
| Static readonly file path constants | `DocumentLibraryPage.PDF_FILE`, `PNG_FILE`, etc. |
| Porting Java POM → TypeScript POM | Java locator methods → TS private fields assigned in constructor |

---

---

## Session 2 (continued) — Document Library Feature (Methods, Fixtures, Test Class)

### What Was Built

#### 2. Methods added to `pages/DocumentLibraryPage.ts`

All methods ported from `DocumentLibraryPage.java`, organised into sections:

| Section | Methods |
|---|---|
| Navigation | `navigateToDocumentLibrary()`, `clickActionsButton()` |
| Actions menu | `getDocumentLibraryOptions()`, `clickUploadOption()`, `clickAccessOption()`, `clickDeleteOption()` |
| Upload form | `enterDocumentName()`, `uploadDocument()`, `uploadDocumentUsingPDF/PNG/JPG/XLSX/MP4/GIF()`, `attachThumbnail()`, `resizeCroppingArea()`, `clickApplyButton()`, `enterDescription()`, `clickUploadButton()` |
| Document options | `clickDocumentOptionTwo()`, `clickDocumentOptionThree()`, `clickDownloadableToggle()` |
| Hashtag | `enterHashtag()`, `selectHashtagSuggestion()` |
| Validation | `getDocumentNameValidation()`, `getDescriptionValidation()`, `getFileInputValidation()` |
| Search & listing | `enterSearchTerm()`, `getFirstDocumentName()`, `getSearchResultText()`, `getNoRecordsText()` |
| Delete flow | `getDialogBoxText()`, `clickOkButton()` |
| Checkbox | `clickCheckbox()`, `getDynamicText()` |
| Access control | `clickTeamRadioButton()`, `clickPartnerCategoryButton()`, `clickCategoryLabel()`, `clickUpdateAccessButton()` |
| Schedule | `clickScheduleCheckbox()`, `clickScheduleTextbox()` |
| Calendar | `selectTodayInCalendar()`, `selectDateOfYourChoice()`, `selectCurrentActiveTime()`, `private selectActiveOrFirstTime()` |
| Scroll helpers | `scrollToTop()`, `scrollToBottom()`, `scrollDownByFiveHundred()` |

**Static file path constants updated** to match actual files in `test-data/` folder.

---

#### 3. `utils/fixtures.ts` updated

- Added `import { DocumentLibraryPage }` 
- Added `documentLibraryPage: DocumentLibraryPage` to the `MyFixtures` type
- Registered the fixture so any test can declare `documentLibraryPage` as a parameter

---

#### 4. Test class created (`tests/e2e/document-library.spec.ts`)

8 test cases ported from `DocumentLibraryTest.java`:

| Test ID | Description | Type |
|---|---|---|
| TC_DL_01 | Navigate to Document Library screen — verify URL | Navigation |
| TC_DL_03 | Actions menu shows 4 correct options in order | UI Verification |
| TC_DL_04 | Clicking Upload navigates to upload screen | Navigation |
| TC_DL_17 | Upload all mandatory fields (PDF) — success redirect | Happy Path / E2E |
| TC_DL_18 | Missing document name shows HTML5 validation tooltip | Validation |
| TC_DL_25 | Missing description shows HTML5 validation tooltip | Validation |
| TC_DL_28 | Missing file attachment shows HTML5 validation tooltip | Validation |
| TC_DL_37 | Search filters table — dynamic first document name | Functional |
| TC_DL_38 | Delete without selection shows error dialog | Validation |
| TC_DL_39 | Delete document and verify it disappears from search | Functional / E2E |
| TC_DL_22 | Upload in PNG format | Happy Path |
| TC_DL_22_1 | Upload in JPG format | Happy Path |
| TC_DL_22_2 | Upload in CSV format | Happy Path |
| TC_DL_22_3 | Upload in XLSX format | Happy Path |
| TC_DL_22_4 | Upload in MP4 format — extended timeout 60s | Happy Path |
| TC_DL_22_5 | Upload with GIF thumbnail | Happy Path |
| TC_DL_22_6 | Upload with JPG thumbnail | Happy Path |
| TC_DL_30 | Upload with document option radio buttons | Happy Path |
| TC_DL_32 | Upload with downloadable toggle enabled | Happy Path |
| TC_DL_34 | Upload with all fields + internal hashtag | Happy Path / E2E |
| TC_DL_40 | Update access control — team, category, schedule | Functional / E2E |

---

### Key Method & Test Decisions (Interview Reference)

#### Decision 4 — `resizeCroppingArea()` uses Playwright mouse API
```typescript
await this.page.mouse.move(x, y);
await this.page.mouse.down();
await this.page.mouse.move(x + 50, y + 50);
await this.page.mouse.up();
```
Java Selenium used `Actions.clickAndHold → moveByOffset → release`. Playwright's `page.mouse` API is the direct equivalent. `boundingBox()` gives the element's screen coordinates so the drag starts from the centre of the handle.

---

#### Decision 5 — `getDocumentLibraryOptions()` reads 4 specific locators individually
Avoids picking up links from the sidebar, profile dropdown, or other menus. Each locator is pinned by ID or href to the exact menu item — not by scraping all visible links on the page.

---

#### Decision 6 — Dynamic search in TC_DL_37 instead of hardcoded config value
The Java project had `SEARCH_VALUE` hardcoded in config — it broke whenever that document didn't exist on the target server. Reading `getFirstDocumentName()` from the live listing makes the test self-contained and environment-agnostic.

---

#### Decision 7 — `domcontentloaded` vs `networkidle` — choosing the right load state
- `networkidle` used when the Actions button needs to be fully interactive (TC_DL_38, TC_DL_39)
- `domcontentloaded` used when we only need the DOM table rows to be present (TC_DL_37, TC_DL_40)
- Preprod has background polling requests that prevent `networkidle` from ever resolving — using it indiscriminately causes 60s timeouts

---

#### Decision 8 — Capture document name before deletion in TC_DL_39
Once a document is deleted, its row is gone from the DOM. The name is stored in a variable before the delete action so it can be used in the search assertion afterwards.

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| `page.mouse` drag API | `resizeCroppingArea()` in page object |
| `evaluate()` for HTML5 validation | `getDocumentNameValidation()`, `getDescriptionValidation()`, `getFileInputValidation()` |
| `HTMLTextAreaElement` vs `HTMLInputElement` in evaluate | `getDescriptionValidation()` — textarea needs different cast |
| Dynamic locator built at call time | `getSearchResultText(text)` |
| `domcontentloaded` vs `networkidle` | TC_DL_37, TC_DL_38, TC_DL_39, TC_DL_40 |
| Capture state before destructive action | TC_DL_39 — document name stored before delete |
| Private helper method shared by multiple public methods | `selectActiveOrFirstTime()` |
| `toEqual()` for full array comparison | TC_DL_03 — strict menu option verification |

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total (13 push notification + 21 document library)
- **Environments supported:** 3 (dev, preprod, prod)
- **Auth strategy:** Session reuse via `storageState`

---

---

### Key Pattern — Unique Document Names with `Date.now()`

```typescript
const uniqueName = `${DOCUMENT_NAME}_${Date.now()}`;
```

`Date.now()` returns the current timestamp in milliseconds. Every test run produces a different number, so the document name is always unique — no conflicts between runs.

The base name prefix (`DOCUMENT_NAME`) is exported from `utils/config.ts` and controlled via `.env`:
```
DOCUMENT_NAME=AutoDoc
```

If not set in `.env`, it defaults to `'AutoDoc'`. This means the prefix can be changed per environment without touching any test code.

**Interview talking point:** *"I use `Date.now()` to generate unique document names so tests never conflict with each other across runs. The prefix is configurable from `.env` — same pattern as the Java project's `doc.document.name` in config.properties."*

---

*Last updated: Session 2 — 2026-05-23*

---

## Session 3 — Document Library Test Run & TC_DL_40 Fix

### What Was Done

#### 1. Ran Document Library tests (non-cropper subset)

Identified and ran the 7 tests that do not involve the thumbnail cropper flow:
TC_DL_01, TC_DL_03, TC_DL_04, TC_DL_37, TC_DL_38, TC_DL_39, TC_DL_40.

All 7 passed.

---

#### 2. Fixed TC_DL_40 — Draft document locator

**Problem:** `clickCheckbox()` picked the first document in the listing regardless of status. On preprod, top documents were "Syndicated" — access control can only be updated for "Draft" documents, so the flow failed.

**Fix:** Added a new locator `draftDocumentCheckbox` in `DocumentLibraryPage.ts`:
```typescript
this.draftDocumentCheckbox = page.getByText('Draft', { exact: true })
  .first()
  .locator('xpath=ancestor::tr')
  .locator('input[id="document_content"]');
```
Added `clickDraftDocumentCheckbox()` method. Updated TC_DL_40 to call it instead of `clickCheckbox()`.

**Interview talking point:** *"I used `getByText` to find the Draft badge, then chained `ancestor::tr` to navigate up to the containing row, and targeted the checkbox within that row. The decision lives in the page object — the test just calls one method."*

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| `getByText` + `ancestor::tr` XPath chaining | `draftDocumentCheckbox` locator |
| Status-aware checkbox selection | TC_DL_40 — only selects Draft documents |
| `--project=chromium --no-deps` to skip re-login | Running tests without setup project |
| `--grep` to run a subset of tests by ID | `--grep "TC_DL_01\|TC_DL_03\|..."` |

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total (13 push notification + 21 document library)
- **Passing (non-cropper):** TC_DL_01, TC_DL_03, TC_DL_04, TC_DL_37, TC_DL_38, TC_DL_39, TC_DL_40
- **Pending:** Cropper-dependent upload tests (TC_DL_17, 18, 22 series, 25, 28, 30, 32, 34)

---

*Last updated: Session 3 — 2026-05-24*

---

## Session 4 — Allure Reporter Setup

### What Was Done

#### 1. Installed `allure-playwright` package
```powershell
npm install --save-dev allure-playwright
```

#### 2. Updated reporter in `playwright.config.ts`
Replaced the single HTML reporter with two reporters running together:
```typescript
reporter: [
  ['line'],           // real-time terminal output during test run
  ['allure-playwright'], // generates allure-results/ folder
],
```

**After a run, generate and open the report with:**
```powershell
npx allure generate allure-results --clean
npx allure open
```

**Interview talking point:** *"I use two reporters — `line` gives me live feedback in the terminal so I can see pass/fail as tests run, and `allure-playwright` generates a rich HTML report with steps, screenshots, and traces attached to each test."*

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total (13 push notification + 21 document library)
- **Reporter:** Allure + Line (dual reporter setup)

---

*Last updated: Session 4 — 2026-05-31*

---

## Session 5 — Allure CLI Setup & First Report Generated

### What Was Done

#### 1. Verified `allure-playwright` was already wired up correctly

- `allure-playwright@3.9.0` confirmed in `devDependencies`
- `playwright.config.ts` already had the dual reporter (`line` + `allure-playwright`)
- `allure-results/` folder already existed from a prior test run

#### 2. Discovered `allure` CLI was not installed globally

`allure-playwright` only generates raw result files — a separate CLI tool is needed to turn those into the HTML report.

#### 3. Installed `allure-commandline` globally

```powershell
npm install -g allure-commandline
```

This installs `allure` as a machine-level command (not in `package.json` — works like `git` or `node`). Version installed: **2.42.0**.

**Interview talking point:** *"There are two separate pieces — `allure-playwright` is the Playwright plugin that collects test data into `allure-results/`, and `allure-commandline` is the CLI that processes those files into a viewable HTML report. They're installed separately because the CLI is a machine-level tool, not a project dependency."*

#### 4. Generated and opened the report

```powershell
allure generate allure-results --clean
allure open
```

`--clean` wipes any previous `allure-report/` folder before generating fresh. `allure open` launches the report in the browser automatically.

---

### Key Distinction — Global vs Project install

| Install type | Command | Where it lives | When to use |
|---|---|---|---|
| Project (dev) | `npm install --save-dev` | `node_modules/` + `package.json` | Libraries tied to the project |
| Global | `npm install -g` | Machine-level (like git/node) | CLI tools used across all projects |

`allure-commandline` is global because it's a tool you use from the terminal, not something your test code imports.

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total (13 push notification + 21 document library)
- **Reporter:** Allure + Line (dual reporter setup) — full chain working end to end
- **Allure commands:** `allure generate allure-results --clean` → `allure open`

---

*Last updated: Session 5 — 2026-05-31*

---

## Session 6 — TC_DL_04 & TC_DL_17 Flakiness Fixes

### What Was Done

#### 1. Fixed TC_DL_04 — Dropdown closes before Upload option is interactable

**Problem:** `clickUploadOption()` called `waitFor({ state: 'visible' })` but the Actions dropdown was already closing by the time it ran. The locator resolved to hidden 81× during the 60s window — the method had no way to re-open the dropdown, so it just watched a permanently-hidden element.

**Fix:** Replaced the bare `waitFor` with an `expect().toPass()` retry loop in `DocumentLibraryPage.ts`:
```typescript
async clickUploadOption(): Promise<void> {
    await expect(async () => {
        if (!(await this.uploadMenuOption.isVisible())) {
            await this.actionsButton.click();
        }
        await this.uploadMenuOption.waitFor({ state: 'visible', timeout: 2000 });
    }).toPass({ timeout: 30000 });
    await this.uploadMenuOption.click();
}
```
Each retry checks visibility, re-opens the dropdown if needed, waits 2s, and retries the whole block for up to 30s before giving up.

Also added `expect` to the import line in `DocumentLibraryPage.ts`.

**Interview talking point:** *"`expect().toPass()` is Playwright's built-in retry wrapper for async blocks — it re-runs the entire function until it passes or times out. I used it here because the dropdown can close between `clickActionsButton()` and `clickUploadOption()`. Without it the test was watching a hidden element for 60 seconds with no way to recover."*

---

#### 2. Fixed TC_DL_17 — `scrollToTop()` called mid-navigation throws page context error

**Problem:** `scrollToTop()` was called immediately after `clickUploadButton()`. The button submits the form and starts a page navigation — `page.evaluate()` inside `scrollToTop()` ran while the old page's JS context was being destroyed, throwing `Target page, context or browser has been closed`. The test was timing out on first run and passing on retry — showing as yellow/flaky in Allure.

**Fix:** Removed `scrollToTop()` entirely from TC_DL_17. The only assertion after it was `toHaveURL()` — a URL assertion doesn't care about scroll position, so the scroll served no purpose.

**Interview talking point:** *"`page.evaluate()` runs JavaScript in the browser's page context. If the page is navigating when it runs, the context is destroyed mid-execution and Playwright throws. The rule is: never call `evaluate()` between a form submission and the resulting navigation completing. `toHaveURL()` auto-waits for the navigation — assertions like that are safe after submit. `evaluate()` is not."*

---

#### 3. Fixed TC_DL_34 — `text()='teaser'` predicate fails on preprod

**Problem:** `hashtagSuggestion` locator used `text()='teaser'` on the `<li>`. In XPath, `text()` only selects direct text nodes — jQuery UI autocomplete wraps the text inside a child `<a>` or `<div>`, so the `<li>` has no direct text node. The suggestion was visible on screen but the locator never matched it.

**Fix:** Changed to `normalize-space()='teaser'`. Without an argument, `normalize-space()` reads the full string value of the element including all descendants — handles child-element text and whitespace variations.

**Interview talking point:** *"`text()` and `normalize-space()` are a classic XPath gotcha. `text()` only reads direct text nodes of the element — if the text is inside a child tag, it returns nothing. `normalize-space()` without an argument reads the whole element's string value including descendants, which is almost always what you actually want."*

---

#### 4. Fixed TC_DL_41 — xdsoft day locator matches overflow days from adjacent months

**Problem:** `selectDateOfYourChoice()` located the day cell with only `[data-date='${day}']`. The xdsoft calendar renders overflow days from the next month at the bottom of the grid — e.g. both July 1 and August 1 have `data-date='1'`. Strict mode threw because the locator resolved to 2 elements.

**Fix:** Added `[data-month='${month - 1}']` to the day locator. xdsoft stores months 0-based (same convention already used for the month selector) — this pins the click to the selected month's cell and excludes overflow days.

---

#### 5. Fixed TC_PN_04/06/07/08/13 — Same dropdown race condition in Push Notification feature

**Problem:** `navigateToCreateNotification()` in `PushNotificationPage.ts` had the identical issue as TC_DL_04 — Actions dropdown closes before the Create App Notification option could be clicked. All 5 affected tests were stuck on the Push Notification list page.

**Fix:** Applied the same `expect().toPass()` retry pattern. The prod `waitForLoadState('networkidle')` runs once as a precondition outside the loop; the loop itself re-opens the dropdown if the option isn't visible and waits 2s per attempt.

**Interview talking point:** *"Once I identified the dropdown-closing race condition as a pattern, I applied the same fix to both page objects. The `expect().toPass()` wrapper is reusable — the retry logic is the same regardless of which dropdown or which option you're targeting."*

---

#### 6. Diagnosed TC_DL_22_4/5/6 — MP4 file too large for server upload limit

**Problem:** URL stayed on `sp-upload-document.php` after clicking upload — 37 checks over 60s with no redirect. All three failing tests use `test-data/video.mp4`. PHP servers have `upload_max_filesize` / `post_max_size` limits — if exceeded, the server silently discards the upload body and the page never redirects.

**Action:** User replacing `video.mp4` with a smaller file (< 2MB). Pending re-run to confirm.

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| `expect().toPass()` retry loop for flaky dropdown interactions | `clickUploadOption()` in `DocumentLibraryPage.ts`, `navigateToCreateNotification()` in `PushNotificationPage.ts` |
| `page.evaluate()` is unsafe mid-navigation | TC_DL_17 — removed `scrollToTop()` before navigation completes |
| `text()` vs `normalize-space()` in XPath | TC_DL_34 — `hashtagSuggestion` locator on preprod |
| `data-month` attribute to exclude xdsoft overflow days | TC_DL_41 — `selectDateOfYourChoice()` day locator |
| Applying a fix pattern across multiple page objects | Dropdown race condition fixed in both `DocumentLibraryPage` and `PushNotificationPage` |

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total (13 push notification + 21 document library)
- **Fixes this session:** TC_DL_04, TC_DL_17, TC_DL_34, TC_DL_41, TC_PN_04/06/07/08/13
- **Pending:** TC_DL_22_4/5/6 re-run after MP4 file replacement
- **Code pushed to GitHub**

---

*Last updated: Session 6 — 2026-05-31*

---

## Session 7 — Auto-clean Allure Results & npm Scripts

### What Was Done

#### 1. Created `utils/global-setup.ts`

Playwright's `globalSetup` hook runs **once, before any test starts** — even before the `setup` project that creates `auth.json`. Used it to delete `allure-results/` so every run starts with a clean slate.

```typescript
import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  const resultsDir = path.join(process.cwd(), 'allure-results');
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
}
```

**Why `fs` and not a shell command?**
`fs` is a Node.js built-in — no install needed, and it works on Windows, Linux, and Mac identically. A PowerShell `Remove-Item` or bash `rm -rf` in an npm script would break on the other OS. This approach works locally AND on GitHub Actions / Azure DevOps / Jenkins without any change.

**Interview talking point:** *"I use Playwright's `globalSetup` hook to clean `allure-results/` before every run. It uses Node's built-in `fs` module so it's platform-agnostic — the same code works locally on Windows and on a Linux CI runner without any modification."*

---

#### 2. Wired `globalSetup` into `playwright.config.ts`

```typescript
globalSetup: './utils/global-setup',
```

**Execution order after this change:**
```
npx playwright test
  → globalSetup runs  → deletes allure-results/
  → setup project     → creates auth.json
  → chromium project  → runs tests, writes fresh results to allure-results/
```

---

#### 3. Added npm scripts to `package.json`

```json
"scripts": {
  "test":   "npx playwright test",
  "report": "allure generate allure-results --clean && allure open"
}
```

**Usage:**
```powershell
npm test          # runs all tests (allure-results auto-cleaned first)
npm run report    # generates HTML report and opens it in the browser
```

The `allure-results/` folder is NOT deleted after the run — it stays on disk until the next `npm test`. You still need to run `npm run report` manually after each run to generate and view the HTML report. It does not generate itself automatically.

**Interview talking point:** *"I separated test execution from report generation intentionally. On CI you'd only run `npm test` — the raw results get archived as artifacts. Report generation is a local step for reviewing results, so it stays as a separate command."*

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| `globalSetup` hook | `utils/global-setup.ts` + `playwright.config.ts` |
| Node.js `fs` for cross-platform file ops | `global-setup.ts` — avoids shell-specific commands |
| npm scripts for common commands | `package.json` — `test` and `report` scripts |

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total
- **Allure results:** auto-cleaned before every run via `globalSetup`
- **Commands:** `npm test` to run, `npm run report` to view

---

*Last updated: Session 7 — 2026-05-31*

---

## Session 8 — GitHub Actions Workflow (Manual CI Control)

### What Was Done

#### 1. Updated `.github/workflows/playwright.yml` — manual trigger only

Changed the workflow trigger to `workflow_dispatch` exclusively — no automatic triggers on push or pull request.

```yaml
on:
  workflow_dispatch:
```

**Why:** Full manual control over when CI runs. Tests execute only when explicitly triggered via GitHub → Actions → "Run workflow" button. No accidental CI runs on every commit.

**Interview talking point:** *"`workflow_dispatch` is the GitHub Actions trigger for manual runs. You go to the Actions tab, select the workflow, and click 'Run workflow'. Nothing runs automatically — you decide when to execute."*

---

#### 2. Workflow runs tests on Azure cloud via `playwright.service.config.ts`

```yaml
- name: Run Playwright tests
  env:
    PLAYWRIGHT_SERVICE_URL: ${{ vars.PLAYWRIGHT_SERVICE_URL }}
  run: npx playwright test --config=playwright.service.config.ts --workers=4
```

- `PLAYWRIGHT_SERVICE_URL` is stored as a GitHub Variable (not a secret — not sensitive)
- `AZURE_CREDENTIALS` is stored as a GitHub Secret — used by the `azure/login@v1` step to authenticate the runner to Azure
- `--workers=4` runs 4 tests in parallel on Azure cloud browsers

**Interview talking point:** *"Azure Playwright Service provides cloud-hosted browsers. The runner authenticates to Azure using a service principal stored as a GitHub Secret, then connects to the Azure service URL to run browsers in the cloud instead of the GitHub Actions machine. The URL is a GitHub Variable (not a secret) because it's not sensitive — it's just an endpoint address."*

---

#### 3. Full workflow step order

| Step | Action |
|---|---|
| 1 | `actions/checkout@v5` — pull repo code onto runner |
| 2 | `actions/setup-node@v5` with Node 24 — install Node.js |
| 3 | `npm ci` — clean install of all dependencies |
| 4 | `npx playwright install --with-deps` — install Playwright browsers + OS deps |
| 5 | `azure/login@v1` — authenticate runner to Azure using `AZURE_CREDENTIALS` secret |
| 6 | `npx playwright test --config=playwright.service.config.ts --workers=4` — run tests on Azure |
| 7 | `actions/upload-artifact@v4` — upload `playwright-report/` for 30 days |

The `if: ${{ !cancelled() }}` on the artifact step ensures the report uploads even when tests fail.

**Interview talking point:** *"The `!cancelled()` condition on the upload step means the report always gets uploaded unless you manually cancel the workflow. If I used the default condition (only on success), I'd lose the report for failed runs — exactly when I need it most."*

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| `workflow_dispatch` — manual CI trigger | `playwright.yml` trigger block |
| GitHub Secrets vs GitHub Variables | `AZURE_CREDENTIALS` (secret) vs `PLAYWRIGHT_SERVICE_URL` (variable) |
| Azure cloud browser execution | `playwright.service.config.ts` + `PLAYWRIGHT_SERVICE_URL` |
| `azure/login@v1` for runner authentication | Step 5 in workflow |
| `if: !cancelled()` for always-upload artifact | Step 7 in workflow |
| `npm ci` vs `npm install` in CI | Step 3 — deterministic, faster, fails on lockfile mismatch |

---

### Current State

- **Page Objects:** 2 (`PushNotificationPage`, `DocumentLibraryPage`)
- **Test files:** 2 (`push-notification.spec.ts`, `document-library.spec.ts`)
- **Test cases:** 34 total
- **CI:** GitHub Actions — manual trigger only, runs on Azure cloud
- **Report artifact:** Uploaded to GitHub Actions for 30 days after each run

---

*Last updated: Session 8 — 2026-05-31*

---

## Session 9 — Allure Report Viewing (Interview Note)

### Key Concept — Re-viewing Reports After a Run

Allure separates **result collection** from **report generation** into two distinct steps and two distinct folders:

| Folder | What it contains | Written by |
|---|---|---|
| `allure-results/` | Raw JSON files — one per test | `allure-playwright` (during test run) |
| `allure-report/` | Built HTML report | `allure generate` (CLI command) |

**To open an already-generated report (no re-run needed):**
```powershell
allure open allure-report
```
Serves the existing `allure-report/` folder in the browser. Instant — no regeneration.

**To regenerate from the latest test results and open:**
```powershell
npm run report
# runs: allure generate allure-results --clean && allure open
```
`--clean` wipes the previous `allure-report/` before building fresh. Use this after running new tests.

**Interview talking point:** *"`allure-playwright` is the Playwright plugin that writes raw result files during the run. `allure-commandline` is the separate CLI tool that transforms those files into a viewable HTML report. They're decoupled — you can regenerate the report as many times as you want from the same results without re-running any tests. `allure open allure-report` just serves the already-built report; `allure generate` is what actually builds it."*

---

*Last updated: Session 9 — 2026-05-31*

---

## Session 10 — Push Notification Full Run & Allure Report Commands

### Commands Used This Session

#### Run specific tests by name
```powershell
# Run first two tests only (TC_PN_01 and TC_PN_04)
npx playwright test push-notification --grep "TC_PN_01|TC_PN_04"
```

#### Run complete Push Notification feature
```powershell
npx playwright test tests/e2e/push-notification.spec.ts
```

#### Generate fresh Allure report when older reports already exist
```powershell
# 1. Run tests (allure-results auto-cleaned by globalSetup before run)
npx playwright test tests/e2e/push-notification.spec.ts

# 2. Wipe old report and generate new one from latest results
npx allure generate allure-results --clean -o allure-report

# 3. Open the report in the browser
npx allure open allure-report
```

The `--clean` flag on `allure generate` wipes the previous `allure-report/` folder before building fresh — ensures you're viewing the latest run, not a stale report. `-o allure-report` explicitly names the output folder.

**Interview talking point:** *"I always use `--clean` when generating the report so there's no risk of mixing results from different runs. The `globalSetup` hook cleans `allure-results/` before each test run, and `--clean` cleans `allure-report/` before each report generation — both folders are always fresh."*

---

*Last updated: Session 10 — 2026-06-01*

---

## Session 11 — Social Auto-post Feature (Page Object, Fixtures, Tests)

### What Was Built

#### 1. New Page Object (`pages/SocialAutoPostPage.ts`)

Ported from `SocialAutoPostPagePW.java` in the playwright-java-learning project.

**Locator groups defined:**

| Group | Locators |
|---|---|
| Navigation | `communicationTab`, `automationTabProd`, `socialOptionProd`, `socialAutoPostLink`, `autoPostTabProd` |
| Actions | `actionsButton`, `createPostButton` |
| File Upload | `fileInput` (`#file-upload`), `thumbnailInput` (`#social_tumbnail`) |
| Form Fields | `cobrandingButton`, `titleField`, `descriptionField` |
| Partner Category | `partnerCategoryButton`, `searchBox`, `categoryLabel`, `facebookLabel` |
| Social Media | `twitterLabel`, `linkedInLabel` |
| URL Options | `customUrlRadio` (`#C`), `customUrlInput`, `noneRadio` (`#N`) |
| Date / Time | `dateTimeInput` (`.form_datetime`), `nextMonthButton` |
| Submit | `schedulePostButton` |

**Static file path constants:** `PNG_FILE`, `JPG_FILE`, `MP4_FILE`, `THUMBNAIL_JPG`

---

#### 2. Key Locator & Method Decisions (Interview Reference)

##### Decision 1 — `actionsButton` uses `@data-bs-toggle='dropdown'` to target specifically
```typescript
this.actionsButton = page.locator("//div[contains(@class,'btn-group')]//a[@data-bs-toggle='dropdown']");
```
Other `btn-group` elements exist on the page. The `data-bs-toggle` attribute pins the locator to the Actions dropdown trigger exclusively.

**Interview talking point:** *"I narrow locators as specifically as possible. `data-bs-toggle='dropdown'` uniquely identifies the dropdown trigger — without it I'd risk matching other btn-group elements on the page."*

---

##### Decision 2 — Navigation is environment-conditional
```typescript
async navigateToSocialAutoPost(): Promise<void> {
  if (ENV === 'prod') {
    await this.automationTabProd.click();  // Automation → Social → Auto Post
    await this.socialOptionProd.click();
    await this.autoPostTabProd.click();
  } else {
    await this.communicationTab.click();   // Communication → Social Auto Post
    await this.socialAutoPostLink.click();
  }
}
```
On dev/preprod, Social Auto Post lives under the Communication tab. On prod it's under Automation → Social → Auto Post. Same pattern as DocumentLibraryPage — decision made once in the page object, tests stay clean.

**Interview talking point:** *"Same pattern as other page objects — environment-conditional navigation logic lives in the page object, not the tests. The test calls one method regardless of which environment it's on."*

---

##### Decision 3 — `cobrandingButton` and radio buttons use `evaluate()` for click
```typescript
await this.cobrandingButton.evaluate(el => (el as HTMLElement).click());
await this.customUrlRadio.evaluate(el => (el as HTMLElement).click());
```
These elements don't respond to Playwright's regular `.click()` — the same issue was documented in the Java project. `evaluate()` runs `click()` directly in the browser's JS context, bypassing Playwright's visibility and actionability checks.

**Interview talking point:** *"`evaluate()` is the escape hatch when a UI component doesn't respond to Playwright's regular interactions. I use it selectively — only when the standard `.click()` demonstrably fails — so the page object stays predictable."*

---

##### Decision 4 — `nextMonthButton` scoped to `xdsoft_datepicker`
```typescript
this.nextMonthButton = page.locator(
  "//div[contains(@class,'xdsoft_datepicker')]//button[contains(@class,'xdsoft_next')]"
);
```
The xdsoft datetime picker renders TWO `xdsoft_next` buttons — one in the datepicker (next month) and one in the timepicker (scroll time down). Without scoping, the locator matches both and Playwright throws a strict mode violation. This fix was already documented in the Java project's comments.

**Interview talking point:** *"I read the Java project's comments carefully — this strict mode violation was already identified there. Scoping to `xdsoft_datepicker` isolates the month navigation button from the timepicker's scroll button."*

---

##### Decision 5 — `selectFutureDate()` loop with `waitForTimeout(500)`
```typescript
for (let attempt = 0; attempt < 24; attempt++) {
  // compare displayed month → click day if match, else click nextMonthButton
  await this.page.waitForTimeout(500); // xdsoft month-change animation
}
```
The Social Auto-post picker only has a "next month" arrow — no year/month dropdown like the Document Library picker. Navigation requires iterating forward. The 500ms wait is kept because xdsoft has no deterministic signal after a month change — same approach as the Java project.

**Interview talking point:** *"Two different xdsoft pickers in this project behave differently. Document Library has year/month dropdowns so I jump directly. Social Auto-post only has a next arrow so I loop forward. I chose the right strategy per picker, not a one-size-fits-all approach."*

---

##### Decision 6 — `getFutureScheduleDate()` helper in the page object
```typescript
getFutureScheduleDate(daysFromNow: number): { day: number; monthYear: string } {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  return { day: date.getDate(), monthYear: `${monthName} ${date.getFullYear()}` };
}
```
The Java project had this helper in the base test class. In TypeScript there's no base test class — fixtures replace that pattern. The helper is in the page object so any test can call it via `socialAutoPostPage.getFutureScheduleDate(1)`. Returns `{ day: 7, monthYear: 'June 2026' }` — the format xdsoft displays in its header.

**Interview talking point:** *"In Java the helper lived in a shared base test class. TypeScript's fixture pattern eliminates the need for a base class — I moved the helper into the page object so tests still get access without inheritance."*

---

#### 3. Config additions (`utils/config.ts`)

Five new exports:
```typescript
export const SOCIAL_PARTNER_SEARCH = process.env.SOCIAL_PARTNER_SEARCH ?? 'raj';
export const SOCIAL_PARTNER_NAME   = process.env.SOCIAL_PARTNER_NAME   ?? 'Raj2024';
export const SOCIAL_TITLE          = process.env.SOCIAL_TITLE          ?? "Social's Auto-post";
export const SOCIAL_DESCRIPTION    = process.env.SOCIAL_DESCRIPTION    ?? "This's is only for testing...";
export const SOCIAL_CUSTOM_URL     = process.env.SOCIAL_CUSTOM_URL     ?? 'https://www.salespanda.com';
```
`SOCIAL_TITLE` and `SOCIAL_DESCRIPTION` defaults already contain special characters (apostrophes, ampersands) — TC_SAP_04 (special characters test) uses these same defaults with no extra setup needed.

---

#### 4. Fixtures updated (`utils/fixtures.ts`)

Added `socialAutoPostPage: SocialAutoPostPage` to `MyFixtures` type and registered the fixture — same pattern as previous page objects.

---

#### 5. Test class (`tests/e2e/social-autopost.spec.ts`)

7 test cases:

| Test ID | Description | Type |
|---|---|---|
| TC_SAP_01 | PNG image + cobranding + Facebook | Happy Path / E2E |
| TC_SAP_02 | JPG image + cobranding + Facebook | Happy Path / E2E |
| TC_SAP_03 | MP4 video + JPG thumbnail + cobranding (no explicit channel) | Happy Path / E2E |
| TC_SAP_04 | Special characters in title and description | Edge Case |
| TC_SAP_05 | All 3 social channels + Custom URL | Happy Path / E2E |
| TC_SAP_06 | All 3 social channels + None URL option | Happy Path / E2E |
| TC_SAP_07 | All 3 social channels + Microsite URL (default) + 17:30 | Happy Path / E2E |

`beforeEach` navigates to `/home` → Social Auto Post list → Actions → Create Post — all tests start on the Create Post form.

TC_SAP_03 has `test.setTimeout(120000)` — MP4 uploads are slow.

---

#### 6. TypeScript installed + tsconfig fixed

- Added `typescript` as a dev dependency (was missing — Playwright has its own bundled transpiler but standalone `tsc --noEmit` needs it)
- Added `"ignoreDeprecations": "6.0"` to `tsconfig.json` — silences deprecation warnings from the newer TypeScript version for `moduleResolution=node` and `baseUrl`
- **Result: `npx tsc --noEmit` passes with zero errors**

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| `evaluate()` for non-responsive UI components | `cobrandingButton`, `customUrlRadio`, `noneRadio`, `selectTime()` |
| Loop-based calendar navigation (xdsoft next-arrow pattern) | `selectFutureDate()` |
| `xdsoft_datepicker` scope to avoid strict mode violation | `nextMonthButton` locator |
| `waitForFunction()` to confirm datetime input populated | `selectFutureDate()` — after day click |
| Page object helper replacing Java base class method | `getFutureScheduleDate()` |
| Environment-conditional navigation (3-step prod path vs 2-step preprod) | `navigateToSocialAutoPost()` |
| Partner category search-filter-select pattern | `selectPartnerCategory()` + `closePartnerCategoryDropdown()` |

---

### Current State

- **Page Objects:** 3 (`PushNotificationPage`, `DocumentLibraryPage`, `SocialAutoPostPage`)
- **Test files:** 3 (`push-notification.spec.ts`, `document-library.spec.ts`, `social-autopost.spec.ts`)
- **Test cases:** 41 total (13 push notification + 21 document library + 7 social auto-post)
- **Environments supported:** 3 (dev, preprod, prod)
- **TypeScript check:** Passing (`npx tsc --noEmit` — zero errors)
- **Pending:** Run social-autopost tests when server is back up

---

*Last updated: Session 11 — 2026-06-07*

---

## Session 12 — Social Auto-post: Test Data, Locator Updates & New Test Cases

### What Was Done

#### 1. Test data organised (`test-data/Social Auto-posts/`)

Created a dedicated subfolder for Social Auto-post media files. Added 14 PNG files (one per allowed image resolution) and one MP4 (`video 1280X720.mp4`). A `Hello.png` (800×600 — not in the allowed list) was added for the invalid size negative test.

---

#### 2. Playwright config updated (`playwright.config.ts`)

- `screenshot: 'only-on-failure'` → `screenshot: 'on'` — captures screenshots on every test, not just failures
- `trace: 'on-first-retry'` → `trace: 'on'` — records trace on every test
- Added `['html', { open: 'never' }]` to reporters — enables `npx playwright show-report`

**Why:** The trace viewer was not being populated for passing tests. Switching both settings to `'on'` means every run produces a full step-by-step trace viewable in the Playwright HTML report — useful for verifying behaviour even when a test passes.

**Interview talking point:** *"I set trace and screenshot to 'on' during development so I can inspect every step in the trace viewer regardless of pass/fail. On CI you'd typically revert to 'on-first-retry' to reduce storage overhead."*

---

#### 3. Locator updates in `SocialAutoPostPage.ts`

Switched three partner category locators and the schedule button to semantic Playwright locators:

| Old | New |
|---|---|
| `//div[@id='multiSelectDisplay']` | `getByText('Select Category')` |
| `#searchBox` | `getByRole('textbox', { name: 'Search' })` |
| `//label[normalize-space()='${SOCIAL_PARTNER_NAME}']` | `getByText(SOCIAL_PARTNER_NAME)` |
| `//button[@id='share_button']` | `getByRole('button', { name: 'Schedule Post' })` |

Also added:
- `sendNotificationCheckbox` → `getByRole('checkbox', { name: 'Send Notification' })`
- `imageSizeError` → `getByText('Image Size not valid')`

---

#### 4. File path constants updated

`PNG_FILE` and `MP4_FILE` now point to `Social Auto-posts/`. Added 13 additional static constants (`PNG_600X460` through `PNG_2160X3700`) — one per remaining allowed size.

Added public `uploadFilePath(filePath: string)` method so individual test cases can specify any file path without needing a dedicated wrapper method per size.

---

#### 5. Validation methods added

```typescript
async assertImageSizeError(): Promise<void> {
  await expect(this.imageSizeError).toBeVisible();
}

async assertImageRequiredError(): Promise<void> {
  await this.page.waitForSelector('text=Image/Video is required while creating a social post!', { state: 'visible' });
}
```

`assertImageRequiredError()` uses `waitForSelector` instead of `expect().toBeVisible()` — the "Image/Video required" message appears a few seconds after Schedule Post is clicked, and `waitForSelector` is more reliable for catching delayed messages.

---

#### 6. Reliability fix — `clickPartnerCategoryButton()`

Added `waitFor({ state: 'visible' })` before clicking the partner category button. Without it, TC_SAP_10 (no file upload) reached the category step faster than the form finished rendering, causing the dropdown click to miss.

**Interview talking point:** *"TC_SAP_09 passed but TC_SAP_10 failed on the same locator. The difference was TC_SAP_10 had no file upload step, so the test reached the category dropdown much faster. Adding `waitFor` before the click made it reliable regardless of how quickly the previous step completed."*

---

#### 7. New test cases

| Test ID | Description | Type |
|---|---|---|
| TC_SAP_01 | PNG 800X460 + cobranding + Facebook (renamed) | Happy Path |
| TC_SAP_03 | MP4 1280X720 + thumbnail + cobranding (renamed) | Happy Path |
| TC_SAP_09 | Wrong size image → "Image Size not valid" → schedule → "Image/Video required" | Negative |
| TC_SAP_10 | No image + all 3 channels → schedule → "Image/Video required" | Negative |
| TC_SAP_11–23 | One test per remaining allowed PNG size, all on Facebook with cobranding | Happy Path |

TC_SAP_11–23 are generated via a `for` loop over a data array — avoids repeating the same test body 13 times while keeping explicit TC IDs.

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| Semantic locators (`getByRole`, `getByText`) replacing XPath | Partner category + schedule button locators |
| `waitForSelector` for delayed validation messages | `assertImageRequiredError()` |
| `waitFor` before interaction for timing reliability | `clickPartnerCategoryButton()` |
| Loop-generated test cases with explicit TC IDs | TC_SAP_11–23 in `social-autopost.spec.ts` |
| Negative test design — image size validation flow | TC_SAP_09, TC_SAP_10 |
| `uploadFilePath()` — generic upload method for parameterised tests | Used in TC_SAP_11–23 |

---

### Current State

- **Page Objects:** 3 (`PushNotificationPage`, `DocumentLibraryPage`, `SocialAutoPostPage`)
- **Test files:** 3 (`push-notification.spec.ts`, `document-library.spec.ts`, `social-autopost.spec.ts`)
- **Test cases:** 57 total (13 push notification + 21 document library + 23 social auto-post)
- **Reporter:** Allure + Line + HTML (triple reporter)

---

*Last updated: Session 12 — 2026-06-07*

---

## Session 13 — Digipulse Environment Support & Smoke/Regression Tagging

### What Was Built

#### 1. New Digipulse Environment (`utils/config.ts`, `.env`, `pages/SocialAutoPostPage.ts`)

- Added `'digipulse'` to the `ENV` type union and to the `BASE_URLS` map (`https://app.digipulsesp.in`)
- `.env` switched to `ENV=digipulse` with new credentials (prem.chandra@salespanda.com), prod/preprod credentials kept commented out for reference
- Added `automationTabDigipulse` and `autoPostOptionDigipulse` locators to `SocialAutoPostPage`
- `navigateToSocialAutoPost()` now has a `digipulse` branch: Automation tab → Auto Post (a 2-click flow, vs prod's 3-click Automation → Social → Auto Post)
- Push Notification and Document Library flows work unchanged on Digipulse — their `communicationTab` → link navigation is already environment-generic
- `auth.setup.ts` now navigates to `/home` for Digipulse only (`page.goto(ENV === 'digipulse' ? '/home' : '/')`) — Digipulse's login page lives at `/home`, while other environments serve login at `/`. `BASE_URL` itself stays a plain domain for all environments; only this one navigation call branches on `ENV`.

**Interview talking point:** *"Adding a new test environment only required extending the `BASE_URLS` map and adding one branch to the navigation method — the rest of the page object and all test logic stayed the same."*

---

#### 2. Smoke & Regression Tagging (all 3 spec files, `package.json`)

- Adopted Playwright's native `tag` option on `test()` / `test.describe()`
- All 47 existing tests tagged `@regression`:
  - `push-notification.spec.ts` (no `describe` wrapper) — tagged each of the 14 `test()` calls individually
  - `social-autopost.spec.ts` and `document-library.spec.ts` — tagged once at the `test.describe()` level (covers 11 and 22 tests respectively)
- Added `@smoke` to one core happy-path test per feature — the primary end-to-end flow that proves the feature isn't fundamentally broken:
  - `TC_PN_23` — full push notification submission shows success toast
  - `TC_SAP_01` — PNG post with cobranding enabled on Facebook
  - `TC_DL_17` — PDF upload with all mandatory fields
- New npm scripts in `package.json`:
  - `npm run test:smoke` → `npx playwright test --grep @smoke`
  - `npm run test:regression` → `npx playwright test --grep @regression`

**Interview talking point:** *"Smoke tests answer 'is the build alive?' — one critical happy-path per module, tagged `@smoke` and `@regression` both. Regression covers the full suite. Tags are applied at the `describe` level where possible to avoid repeating the option on every test."*

---

### Concepts Demonstrated (New This Session)

| Concept | Where |
|---|---|
| Multi-server environment switching via a config map | `utils/config.ts` — `BASE_URLS` |
| Environment-specific navigation branching | `SocialAutoPostPage.navigateToSocialAutoPost()` |
| Test tagging strategy (smoke vs regression) | All 3 spec files |
| `describe`-level vs per-`test` tag application | social-autopost/document-library vs push-notification |
| npm scripts as a single entry point for test execution | `package.json` |

---

#### 3. Azure Cloud Test Scripts (`package.json`, `playwright.service.config.ts`)

- Added npm scripts wrapping the existing manual Azure commands:
  - `npm run test:azure` — runs the full suite on Azure Playwright Testing (`--config=playwright.service.config.ts --workers=4`), with `clean:reports` first
  - `npm run test:azure:file -- <spec-file>` — runs a single spec file on Azure (extra args after `--` are passed through to the playwright CLI)
  - `npm run report:show` — opens the local Playwright HTML report
  - `npm run report:azure` — opens the Azure run's HTML report
- `playwright.service.config.ts` HTML reporter now writes to its own `azure-report` folder (`outputFolder: "azure-report"`) instead of the default `playwright-report`, so local and Azure runs don't overwrite each other's reports
- `clean:reports` now also removes `azure-report`

**Interview talking point:** *"Local and Azure runs write to separate report folders (`playwright-report` vs `azure-report`), so running one doesn't clobber the other's results — useful when comparing a local debug run against a cloud run."*

---

#### 4. CI: Multi-Environment Support via `workflow_dispatch` + GitHub Environments (`.github/workflows/playwright.yml`)

- The "Install Playwright Browsers" + cache steps were removed — tests run on Azure cloud browsers (Microsoft Playwright Testing service), so a local Chromium install isn't needed. This was also causing 25+ minute runs because a cancelled run never lets `actions/cache` save, so every run started from a cold cache.
- `auth.setup.ts` needs `USER_EMAIL`/`USER_PASSWORD`/`ENV` at runtime, but `.env` is gitignored (correctly — it holds credentials), so CI had no values for these. Added them to the "Run Playwright tests" step's `env:` block, sourced from `secrets.USER_EMAIL` / `secrets.USER_PASSWORD` / `inputs.environment`.
- `workflow_dispatch` now takes an `environment` choice input (`digipulse` / `prod` / `preprod` / `dev`, defaults to `digipulse`). The job sets `environment: ${{ inputs.environment }}`, so each GitHub "Environment" (Settings → Environments) can define its own `USER_EMAIL`/`USER_PASSWORD` secrets under the same names — environments without their own secrets fall back to the repo-level secrets.
- **Manual GitHub setup completed:**
  - Repo-level secrets `USER_EMAIL`/`USER_PASSWORD` added with Digipulse credentials — covers `digipulse` (default) and `dev` via fallback.
  - GitHub Environment `prod` created (Settings → Environments) with its own `USER_EMAIL`/`USER_PASSWORD` secrets (prod credentials) — overrides repo secrets when `prod` is selected from the dropdown.
  - `preprod` Environment not yet created — add it the same way (with preprod credentials) when that environment needs to run in CI.
- Full debugging journey (25-min browser install → removed install steps → resulting login failure → credential/Environment setup) logged as **Fix 21** in `Fixes.md`.

**Interview talking point:** *"The workflow picks the target environment via a manual dropdown, and GitHub Environments let each one carry its own credentials under identical secret names — `config.ts` doesn't need to change at all, it still just reads `USER_EMAIL`/`USER_PASSWORD`/`ENV` from `process.env`."*

---

### Current State

- **Environments supported:** dev, preprod, prod, digipulse
- **Page Objects:** 3 (`PushNotificationPage`, `DocumentLibraryPage`, `SocialAutoPostPage`)
- **Test cases:** 47 total (14 push notification + 22 document library + 11 social auto-post)
- **Tags:** `@smoke` (3 tests), `@regression` (all 47)
- **Report outputs:** `playwright-report` (local), `azure-report` (Azure cloud), `allure-results`/`allure-report` (Allure)
- **CI:** `playwright.yml` — manual trigger with environment dropdown (digipulse/prod/preprod/dev), runs on Azure cloud browsers

---

*Last updated: Session 13 — 2026-06-14*

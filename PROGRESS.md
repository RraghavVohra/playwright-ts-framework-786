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

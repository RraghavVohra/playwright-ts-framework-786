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

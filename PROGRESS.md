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

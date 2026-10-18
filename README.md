# Playwright TypeScript Automation Framework

A scalable end-to-end test automation framework built with **Playwright + TypeScript**, designed for multi-environment execution, cloud-based parallel testing, and CI/CD-first workflows.

---

## 🚀 Overview

This framework automates both UI and API regression testing for a multi-module web application: **97 end-to-end UI tests** across 8 functional modules (Banners, Brochures, Document Library, Push Notifications, Social Auto-Post, Social Post Assets, Testimonials, Video Assets), plus **40 API tests** validating the same platform's backend directly over HTTP — 137 tests total.

It's built to run anywhere: a developer's machine, Jenkins (on-prem), or GitHub Actions with cloud browsers via **Azure Playwright Testing** — with test execution parallelized across multiple CI jobs via **sharding**.

---

## 🛠️ Tech Stack

| Category | Tool |
|---|---|
| Test Framework | [Playwright Test](https://playwright.dev/) |
| Language | TypeScript |
| Schema Validation | [Zod](https://zod.dev/) — runtime contract checks on API responses |
| Cloud Execution | Azure Playwright Testing |
| CI/CD | GitHub Actions, Jenkins |
| Reporting | Allure, Playwright HTML Reporter |
| Design Pattern | Page Object Model + Fixture-based Dependency Injection |

---

## 📁 Project Structure

```
├── .github/workflows/       # GitHub Actions CI/CD pipeline (sharded, Azure cloud execution)
├── pages/                   # Page Object Model — one class per application module
├── tests/e2e/                # UI test specs, one file per module (97 tests)
├── tests/api/                 # API test specs — direct HTTP, no browser (40 tests)
│   ├── schemas/               # Zod schemas — runtime contracts for API responses
│   ├── helpers/                # auth.helper.ts — shared API login logic
│   ├── fixtures/                # Captured real request payloads, reused across tests
│   └── learning/                 # Personal practice: stubbing/mocking patterns.
│                                 # Not part of the CI suite — excluded via testIgnore.
├── mock-server/               # Local mock server, used only by tests/api/learning/
├── utils/
│   ├── config.ts             # Environment URLs, credentials, test data constants
│   ├── api-global-setup.ts   # Logs in via HTTP once before the API suite runs
│   ├── fixtures.ts           # Custom Playwright fixtures — injects Page Objects into tests
│   ├── global-setup.ts       # Runs once before the suite (cleans stale Allure results)
│   └── testData.ts           # Shared/static test data
├── test-data/                # Upload assets used by tests (images, videos, PDFs, CSVs)
├── auth.setup.ts             # Logs in once, saves session to auth.json (reused by all UI tests)
├── playwright.config.ts      # Local / Jenkins execution config
├── playwright.service.config.ts  # Azure Playwright Testing (cloud) execution config
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 24+
- npm

### Installation
```bash
npm ci
```

### Environment Setup
Create a `.env` file in the project root (never commit this file):

```env
ENV=digipulse            # dev | preprod | prod | digipulse
USER_EMAIL=your-test-account-email
USER_PASSWORD=your-test-account-password
PLAYWRIGHT_SERVICE_URL=   # only required for Azure cloud execution
```

> `auth.json` and `.env` are git-ignored by design — they hold live session tokens and credentials and should never be committed.

---

## ▶️ Running Tests

| Command | Description |
|---|---|
| `npm test` | Runs the full suite locally (headed, visible browser) |
| `npm run test:smoke` | Runs only tests tagged `@smoke` |
| `npm run test:regression` | Runs only tests tagged `@regression` |
| `npm run test:azure` | Runs the full suite on Azure's cloud browsers (4 workers) |

### Viewing Reports
| Command | Opens |
|---|---|
| `npm run report` | Allure report |
| `npm run report:show` | Playwright's built-in HTML report |
| `npm run report:azure` | Azure cloud execution report |

---

## ☁️ CI/CD Architecture

Tests run in GitHub Actions via manual trigger (`workflow_dispatch`), with two configurable inputs: **environment** (dev/preprod/prod/digipulse) and **worker count**.

**Execution flow:**
1. The suite is split into **4 parallel shards** using a GitHub Actions matrix strategy — each shard runs as an independent job with its own orchestrator and its own authenticated session.
2. Each shard connects to **Azure Playwright Testing**, which runs the actual browsers on Azure's cloud VM fleet rather than the GitHub Actions runner itself.
3. Each shard uploads its own test report as a build artifact.

This architecture keeps CI run time low even as the suite grows, and isolates failures — one shard failing doesn't block the other three from completing.

Jenkins is also supported as an alternate CI runner, with Allure reporting and email notifications (via the Extended Email Notification plugin) configured on merge.

---

## 🧩 Architecture Highlights

- **Fixture-based dependency injection** — every Page Object is available as a typed fixture (`{ bannersPage }` etc.), so tests never manually instantiate page classes.
- **Single sign-on session reuse** — a dedicated `setup` project logs in once via `auth.setup.ts` and saves the session to `auth.json`; every other test starts already authenticated.
- **Multi-environment support** — a single `ENV` variable switches the entire suite between dev, preprod, prod, and digipulse without touching test code.
- **Cloud-native parallel execution** — browsers run on Azure's infrastructure, decoupling test throughput from the CI runner's local compute.

---
## 🔌 API Testing & Contract Validation

40 tests exercise the platform's API directly over HTTP, authenticated once via `utils/api-global-setup.ts` rather than through the browser — faster, and independent of any UI changes.

Response shapes are checked two ways:
- **TypeScript interfaces** (e.g. `ListingItem`, `AssetLibraryPayload`) — compile-time only. They describe what a response *should* look like, but never inspect the real data.
- **Zod schemas** (`tests/api/schemas/`) — runtime contracts. `SaveContentSchema.safeParse(body)` checks the *actual* response the moment it arrives, and fails with the exact field that broke if the backend's shape ever changes.

Currently Zod validates one endpoint (`saveContent`) as the proven pattern; expanding it to the remaining API specs is a deliberate next step, not an oversight.

`tests/api/learning/` is a separate, personal practice area for stubbing and mocking patterns using the local `mock-server/` — excluded from the CI suite via `testIgnore`, kept to build fluency before applying those patterns to real tests.

---
## 🧠 Engineering Decisions — What & Why

Every non-trivial choice in this framework solves a specific problem encountered while scaling the suite — not adopted just because it's trendy.

| Decision | Problem It Solved |
|---|---|
| **4-way test sharding** (GitHub Actions matrix) | A single CI job's orchestrator (2 vCPU runner) became the coordination bottleneck as the suite grew — not the cloud browsers. Splitting into 4 independent jobs, each with its own orchestrator, removed that ceiling. |
| **Azure Playwright Testing** (cloud browsers) | The CI runner's local CPU couldn't scale browser execution — offloading actual browser rendering to Azure's VM fleet decouples test throughput from the runner's compute. |
| **Fixture-based Page Object injection** | Manually instantiating page objects in every test file duplicates setup code. Custom fixtures inject typed, ready-to-use page objects automatically. |
| **`.gitignore` cleanup** (Allure/Azure reports untracked) | 280+ auto-generated Allure result files were committed to git, bloating the repo and polluting history on every test run. |
| **Cross-platform npm scripts** (`rimraf`) | The original cleanup script used Windows-only `cmd.exe` syntax (`if exist ... rmdir`) — it silently failed on Mac/Linux. `rimraf` makes the same command OS-independent. |
| **ESLint + `eslint-plugin-playwright`** | Catches Playwright-specific anti-patterns — missing `await`s, hard waits, `networkidle` usage — *before* they become flaky tests. First run surfaced 31 pre-existing issues, including real bugs (tests with zero assertions, unreliable waits). |
| **Prettier** | Removes formatting debates and keeps every file visually consistent regardless of who wrote it. |
| **Husky + lint-staged pre-commit hook** | Without automation, code quality depends on developer discipline. The hook runs ESLint automatically on every commit's staged files — catching issues before they even reach GitHub. |

## 📄 License

Internal project — not licensed for external distribution.
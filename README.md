# Playwright TypeScript Automation Framework

A scalable end-to-end test automation framework built with **Playwright + TypeScript**, designed for multi-environment execution, cloud-based parallel testing, and CI/CD-first workflows.

---

## 🚀 Overview

This framework automates end-to-end regression testing for a multi-module web application, covering **100+ test cases** across 8 functional modules — Banners, Brochures, Document Library, Push Notifications, Social Auto-Post, Social Post Assets, Testimonials, and Video Assets.

It's built to run anywhere: a developer's machine, Jenkins (on-prem), or GitHub Actions with cloud browsers via **Azure Playwright Testing** — with test execution parallelized across multiple CI jobs via **sharding**.

---

## 🛠️ Tech Stackk

| Category | Tool |
|---|---|
| Test Framework | [Playwright Test](https://playwright.dev/) |
| Language | TypeScript |
| Cloud Execution | Azure Playwright Testing |
| CI/CD | GitHub Actions, Jenkins |
| Reporting | Allure, Playwright HTML Reporter |
| Design Pattern | Page Object Model + Fixture-based Dependency Injection |

---

## 📁 Project Structure

```
├── .github/workflows/       # GitHub Actions CI/CD pipeline (sharded, Azure cloud execution)
├── pages/                   # Page Object Model — one class per application module
├── tests/e2e/                # Test specs, one file per module
├── utils/
│   ├── config.ts             # Environment URLs, credentials, test data constants
│   ├── fixtures.ts           # Custom Playwright fixtures — injects Page Objects into tests
│   ├── global-setup.ts       # Runs once before the suite (cleans stale Allure results)
│   └── testData.ts           # Shared/static test data
├── test-data/                # Upload assets used by tests (images, videos, PDFs, CSVs)
├── auth.setup.ts             # Logs in once, saves session to auth.json (reused by all tests)
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


## 📄 License

Internal project — not licensed for external distribution.
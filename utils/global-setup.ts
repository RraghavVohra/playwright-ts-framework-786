import fs from 'fs';
import path from 'path';
import apiGlobalSetup from './api-global-setup';

export default async function globalSetup() {
  // Clean allure-results folder before every run
  const resultsDir = path.join(process.cwd(), 'allure-results');
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }

    // Run API global setup ONLY if API credentials are present. This globalSetup
  // is shared by both the UI job and the API job — the UI job's env only has
  // USER_EMAIL/USER_PASSWORD (not TEST_EMAIL/TEST_PASSWORD), so without this
  // guard, the UI job was also attempting an API login with empty credentials
  // and crashing before auth.setup.ts even got a chance to run.
  if (process.env.TEST_EMAIL && process.env.TEST_PASSWORD) {
    await apiGlobalSetup();
  } else {
    console.log('⏭️  Skipping API global setup — TEST_EMAIL/TEST_PASSWORD not set (this is a UI-only run).');
  }
}


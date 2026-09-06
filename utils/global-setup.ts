import fs from 'fs';
import path from 'path';
import apiGlobalSetup from './api-global-setup';

export default async function globalSetup() {
  // Clean allure-results folder before every run
  const resultsDir = path.join(process.cwd(), 'allure-results');
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }

  // Run API global setup — login once and save token + cookies to auth-state.json
  await apiGlobalSetup();
}

import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  const resultsDir = path.join(process.cwd(), 'allure-results');
  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
}

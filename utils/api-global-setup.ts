import { request } from '@playwright/test';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

// This is the global setup file for API tests
// It runs ONCE before all API tests start
// Its job: login to DIGIPULSE and save token + cookies to auth-state.json
// All spec files will read from auth-state.json instead of logging in separately
// This prevents rate limiting issues caused by multiple login attempts

async function apiGlobalSetup() {

  // Create a new HTTP request context — no browser needed
  const context = await request.newContext();

  // Call the login API with credentials from .env file
  const response = await context.post(`https://app.digipulsesp.in/framework/api/login`, {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD
    }
  });

  console.log('Login HTTP Status:', response.status());

  // Extract cookies from the login response headers
  // DIGIPULSE requires both PHPSESSID and SPSESSTKN cookies for API access
  const setCookieHeader = response.headers()['set-cookie'];

  // Parse the response body to get the JWT token
  const body = await response.json();
  console.log('Login Response:', body.message);

  // If token is missing, stop everything — no point running tests without auth
  if (!body.token) {
    throw new Error('❌ Global Setup Failed — no token received. Check credentials in .env file.');
  }

  // Extract PHPSESSID from cookie header
  const phpsessid = setCookieHeader?.match(/PHPSESSID=([^;]+)/)?.[1];

  // Extract SPSESSTKN from cookie header
  // The regex excludes "deleted" values which appear when old tokens are cleared
  const spsesstkn = setCookieHeader?.match(/SPSESSTKN=([^;]+)(?!.*deleted)/)?.[1];

  // Build the cookie string in the format required by API requests
  const cookieString = `PHPSESSID=${phpsessid}; SPSESSTKN=${spsesstkn}`;

  // Save token and cookies to auth-state.json
  // This file is read by auth.helper.ts in every spec file
  // Login happens once here — not in every beforeAll
  fs.writeFileSync('auth-state.json', JSON.stringify({
    token: body.token,
    cookies: cookieString
  }));

  console.log('✅ Token saved successfully');
  console.log('✅ Cookies saved successfully');
  console.log('✅ Auth state saved to auth-state.json — ready for all API tests');

  // Clean up the request context
  await context.dispose();
}

export default apiGlobalSetup;
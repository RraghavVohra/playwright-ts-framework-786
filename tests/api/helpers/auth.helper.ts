import * as fs from 'fs';

// This is the auth helper file
// It reads the token and cookies from auth-state.json
// auth-state.json is created by api-global-setup.ts which runs ONCE before all tests
// No login happens here — we reuse the saved auth state
// This prevents multiple login attempts and rate limiting issues

export function getAuthData(): { token: string, cookies: string } {

  // Read auth-state.json file which was created by global setup
  const data = fs.readFileSync('auth-state.json', 'utf-8');

  // Parse and return token and cookies
  const authState = JSON.parse(data);

  console.log('✅ Token loaded from auth-state.json');

  return {
    token: authState.token,
    cookies: authState.cookies
  };
}

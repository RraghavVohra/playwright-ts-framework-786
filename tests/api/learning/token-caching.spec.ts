import { test, expect } from '@playwright/test';

// This code adds a simple in-memory cache (cachedToken) so that once a token is fetched, 
// subsequent calls reuse it instead of hitting the login endpoint again — fixing the bug 
// where 3 requests caused 3 real login calls.
let cachedToken: string | null = null;

async function getTokenCached() {
  if (cachedToken) {
    console.log('Returning cached token — no network call');
    return cachedToken;
  }

  const res = await fetch('http://localhost:4000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@digipulse.com', password: 'correctpass' })
  });
  const body = await res.json();
  cachedToken = body.token;
  return cachedToken;
}

test('token fetch should only call login once, even if requested 3 times', async ({ request }) => {
  await getTokenCached();
  await getTokenCached();
  await getTokenCached();

  const countResponse = await request.get('http://localhost:4000/api/login/call-count');
  const countBody = await countResponse.json();

  console.log('Actual login calls:', countBody.count);
  expect(countBody.count).toBe(1);
});

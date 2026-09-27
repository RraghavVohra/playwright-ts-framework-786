import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { getAuthData } from './helpers/auth.helper';

dotenv.config();

// Load the CONFIRMED-WORKING payload — captured from a successful Postman call.
// Root structure is { "data": [ { "Base": {...} } ] } — saveContent needs this
// "data" wrapper, same pattern as publishContent. Earlier attempts failed with
// "array_column(): Argument #1 ($array) must be of type array, null given"
// because we were sending a bare array without the "data" key.
const rawFixture = fs.readFileSync(
  path.join(__dirname, 'fixtures', 'saveContent-payload.json'),
  'utf-8'
);
const capturedPayload = JSON.parse(rawFixture);

let token: string;
let cookies: string;

test.beforeAll(() => {
  const auth = getAuthData();
  token = auth.token;
  cookies = auth.cookies;
});

test('TC_01 - saveContent Happy Path (real captured images)', async ({ request }) => {
  // Deep clone so mutating title doesn't affect the original fixture object
  const payload = JSON.parse(JSON.stringify(capturedPayload));
  payload.data[0].Base.title = `QA_Test_${Date.now()}`;

  const response = await request.post(`${process.env.BASE_URL}/framework/api/saveContent`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: payload   // payload ALREADY has the {data: [...]} wrapper baked in
  });

  console.log('TC_01 status:', response.status());
  console.log('TC_01 status text:', response.statusText());

  const rawText = await response.text();
  console.log('TC_01 raw response (first 1000 chars):', rawText.substring(0, 1000));

  const body = JSON.parse(rawText);
  console.log('TC_01 parsed body:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe('200');
  expect(Array.isArray(body.inserted_ids)).toBe(true);
  expect(body.inserted_ids.length).toBeGreaterThan(0);
});

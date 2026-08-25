import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

let token: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/login`, {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD
    }
  });

  const body = await response.json();
  token = body.token;
  console.log('✅ Token received:', token ? 'Yes' : 'No');
});

test('TC_API_01 - Login successful', async () => {
  expect(token).toBeDefined();
  expect(token.length).toBeGreaterThan(0);
  console.log('Token:', token);
});
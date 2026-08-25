// Yeh file LOGIN API ko test karti hai
// Sirf ek kaam — check karo ki login se token aa raha hai ya nahi

import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// token variable — poori file mein accessible hoga
let token: string;

// beforeAll — saare tests se PEHLE ek baar chalta hai
// Iska kaam hai login karna aur token store karna
test.beforeAll(async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/login`, {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD
    }
  });

  const body = await response.json();
  token = body.token; // token save kar lo
  console.log('✅ Token received:', token ? 'Yes' : 'No');
});

// TC_API_01 — Verify karo ki token mila aur valid hai
test('TC_API_01 - Login successful', async () => {
  expect(token).toBeDefined();          // token exist karta ho
  expect(token.length).toBeGreaterThan(0); // token empty na ho
  console.log('Token:', token);
});
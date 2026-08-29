import { test, expect } from '@playwright/test';
import { getAuthData } from './helpers/auth.helper';

let token: string;
let cookies: string;

test.beforeAll(async ({ request }) => {
  const authData = await getAuthData(request);
  token = authData.token;
  cookies = authData.cookies;
  console.log('✅ Token received:', token ? 'Yes' : 'No');
});

// TC_API_05 — Happy Path: Valid list fetched
test('TC_API_05 - Happy Path: Partners list fetched successfully', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/partners`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      startlimit: 0,
      endlimit: 20,
      search: "",
      action: "list"
    }
  });

  const body = await response.json();
  console.log('TC_API_05 Response:', body.message);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.status).toBe("Success");
  expect(body.message).toBe("Records fetched successfully");
  expect(body.response.data.length).toBeGreaterThan(0);
  expect(body.response.total_data).toBeGreaterThan(0);
});

// TC_API_06 — Search filter
test('TC_API_06 - Search: Filter contacts by name', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/partners`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      startlimit: 0,
      endlimit: 20,
      search: "Rahul",
      action: "list"
    }
  });

  const body = await response.json();
  console.log('TC_API_06 Response:', body.response.data);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.response.data.length).toBeGreaterThan(0);
});

// TC_API_07 — Pagination
test('TC_API_07 - Pagination: Fetch next page', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/partners`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      startlimit: 20,
      endlimit: 40,
      search: "",
      action: "list"
    }
  });

  const body = await response.json();
  console.log('TC_API_07 Response:', body.response.data.length);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.response.data.length).toBeGreaterThan(0);
});

// TC_API_08 — No Auth Token
test('TC_API_08 - No Auth Token: Unauthorized', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/partners`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      startlimit: 0,
      endlimit: 20,
      search: "",
      action: "list"
    }
  });

  const body = await response.json();
  console.log('TC_API_08 Response:', body);
  // Bug expected: 404 instead of 401
  expect(response.status()).toBe(404);
});
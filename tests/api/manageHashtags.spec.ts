import { test, expect } from '@playwright/test';
import { getAuthData } from './helpers/auth.helper';

let token: string;
let cookies: string;

test.beforeAll(() => {
  const authData = getAuthData();
  token = authData.token;
  cookies = authData.cookies;
});


// TC_API_21 — Happy Path: Hashtag created successfully
test('TC_API_21 - Happy Path: Hashtag created successfully', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/manageHashtags`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      tag_name: `AutoTag_${Date.now()}` // unique tag har run mein
    }
  });

  const body = await response.json();
  console.log('TC_API_21 Response:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.status).toBe("Success");
  expect(body.message).toBe("Saved Successfully");
});

// TC_API_22 — Duplicate Tag
test('TC_API_22 - Duplicate Tag: Same tag created twice', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/manageHashtags`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      tag_name: "Star Health Insurance" // already exists
    }
  });

  const body = await response.json();
  console.log('TC_API_22 Response:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("403");
  expect(body.status).toBe("Failed");
  expect(body.message).toBe("already exist! please upload with different name");
});

// TC_API_23 — Missing tag_name
test('TC_API_23 - Missing tag_name: Validation error', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/manageHashtags`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      action: "add"
      // tag_name intentionally missing
    }
  });

  const body = await response.json();
  console.log('TC_API_23 Response:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("403");
  expect(body.status).toBe("Failed");
  expect(body.message).toBe("Tag name is required");
});

// TC_API_24 — No Auth Token
test('TC_API_24 - No Auth Token: Unauthorized', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/manageHashtags`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      action: "add",
      tag_name: "Test Tag"
    }
  });

  const body = await response.json();
  console.log('TC_API_24 Response:', body.message);
  // Bug: 404 instead of 401
  expect(response.status()).toBe(404);
});
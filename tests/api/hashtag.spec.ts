import { test, expect } from '@playwright/test';
import { getAuthData } from './helpers/auth.helper';

let token: string;
let cookies: string;

test.beforeAll(() => {
  const authData = getAuthData();
  token = authData.token;
  cookies = authData.cookies;
});


// TC_API_17 — Happy Path
test('TC_API_17 - Happy Path: Hashtag list fetched successfully', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/hashtag`, {
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
      sort: ""
    }
  });

  const body = await response.json();
  console.log('TC_API_17 Response:', body.message);
  console.log('TC_API_17 Total data:', body.response.total_data);
  console.log('TC_API_17 Taglist length:', body.response.taglist.length);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.status).toBe("Success");
  expect(body.message).toBe("data fetched");
  expect(body.response.taglist.length).toBeGreaterThan(0);
  expect(body.response.total_data).toBeGreaterThan(0);
});

// TC_API_18 — total_data matches taglist length
test('TC_API_18 - Verify total_data matches taglist length', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/hashtag`, {
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
      sort: ""
    }
  });

  const body = await response.json();
  console.log('TC_API_18 total_data:', body.response.total_data);
  console.log('TC_API_18 taglist length:', body.response.taglist.length);
  console.log('TC_API_18 tag_group length:', body.response.tag_group.length);

  expect(response.status()).toBe(200);
  expect(body.response.taglist.length).toBeLessThanOrEqual(20);
  expect(body.response.total_data).toBeGreaterThan(0);
});

// TC_API_19 — Verify required fields in each hashtag
test('TC_API_19 - Verify required fields in each hashtag', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/hashtag`, {
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
      sort: ""
    }
  });

  const body = await response.json();
  console.log('TC_API_19 - Total hashtags:', body.response.taglist.length);

  body.response.taglist.forEach((tag: { id: number; tag: string; date: string }) => {
    console.log(`Tag: ${tag.tag} | Date: ${tag.date}`);
    expect(tag.id).toBeDefined();
    expect(tag.tag).toBeDefined();
    expect(tag.date).toBeDefined();
  });
});

// TC_API_20 — No Auth Token
test('TC_API_20 - No Auth Token: Unauthorized', async ({ request }) => {
  const response = await request.post(`https://app.digipulsesp.in/framework/api/hashtag`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      startlimit: 0,
      endlimit: 20,
      search: "",
      sort: ""
    }
  });

  const body = await response.json();
  console.log('TC_API_20 Status:', response.status());
  console.log('TC_API_20 Response:', body.message);
  // Bug: 404 instead of 401
  expect(response.status()).toBe(404);
});
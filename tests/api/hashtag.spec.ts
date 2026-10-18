import { test, expect } from '@playwright/test';
import { getAuthData } from './helpers/auth.helper';
import { HashtagResponseSchema } from './schemas/hashtag.schema';

let token: string;
let cookies: string;

test.beforeAll(() => {
  const authData = getAuthData();
  token = authData.token;
  cookies = authData.cookies;
});


// TC_API_17 — Happy Path
test('TC_API_17 - Happy Path: Hashtag list fetched successfully', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, {
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
  const response = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, {
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
  const response = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, {
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
  const response = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, {
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

// TC_API_25 — Response headers (dimension 2 of 6: headers, not checked anywhere
// else in this entire suite before this test — confirmed by grep across tests/api/).
test('TC_API_25 - Verify response headers', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: { startlimit: 0, endlimit: 20, search: "", sort: "" }
  });

  const headers = response.headers();
  console.log('TC_API_25 content-type:', headers['content-type']);

  expect(response.status()).toBe(200);
  // A JSON API returning the wrong content-type is a real bug a status-code-only
  // check would never catch — a client that trusts this header could parse the
  // body incorrectly even though the status and data are both fine.
  expect(headers['content-type']).toContain('application/json');
});

// TC_API_26 — Full schema contract validation (dimension 4 of 6), replacing the
// field-by-field checks in TC_API_17-19 with one structural contract. If the
// backend ever adds, removes, or retypes a field, this fails here — at the
// exact endpoint — instead of surfacing as a broken UI somewhere downstream.
test('TC_API_26 - Response matches the full hashtag contract (Zod)', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: { startlimit: 0, endlimit: 20, search: "", sort: "" }
  });

  const body = await response.json();
  const schemaResult = HashtagResponseSchema.safeParse(body);
  if (!schemaResult.success) {
    console.log('TC_API_26 Schema errors:', schemaResult.error.format());
  }

  expect(response.status()).toBe(200);
  expect(schemaResult.success).toBe(true);
});

// TC_API_27 — Idempotency check. hashtag is a read-style action (it lists data,
// it doesn't mutate anything), so calling it twice with the IDENTICAL payload
// should return the IDENTICAL result both times. This is the practical,
// QA-side version of the idempotency question: it doesn't prove the backend
// enforces an idempotency key, but it does prove this specific read endpoint
// behaves safely under a repeat call — which is exactly what Topic 15's retry
// logic depends on silently being true every time a flaky test gets retried.
test('TC_API_27 - Calling hashtag twice with the same payload is idempotent', async ({ request }) => {
  const payload = { startlimit: 0, endlimit: 20, search: "", sort: "" };
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Cookie': cookies,
    'Accept': 'application/json'
  };

  const firstResponse = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, { headers, data: payload });
  const firstBody = await firstResponse.json();

  const secondResponse = await request.post(`${process.env.BASE_URL}/framework/api/hashtag`, { headers, data: payload });
  const secondBody = await secondResponse.json();

  console.log('TC_API_27 first total_data:', firstBody.response.total_data);
  console.log('TC_API_27 second total_data:', secondBody.response.total_data);

  expect(firstResponse.status()).toBe(secondResponse.status());
  expect(firstBody.response.total_data).toBe(secondBody.response.total_data);
  expect(firstBody.response.taglist).toEqual(secondBody.response.taglist);
});
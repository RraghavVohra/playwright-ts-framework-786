import { test, expect } from '@playwright/test';
import { getAuthData } from './helpers/auth.helper';

let token: string;
let cookies: string;

// Updated
test.beforeAll(() => {
  const authData = getAuthData();
  token = authData.token;
  cookies = authData.cookies;
});


test('TC_API_01 - Happy Path: Valid contact created', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/addContacts`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      contact_id: "",
      city: "Delhi",
      designation: "Engineer",
      email: `qa.${Date.now()}@test.com`,
      fname: "QA",
      lname: "Tester",
      phone: "9996666664",
      dob: "1996-09-08"
    }
  });

  const body = await response.json();
  console.log('TC_API_01 Response:', body);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe("200");
  expect(body.status).toBe("Success");
  expect(body.message).toBe("New Contact created successfully.");
});

test('TC_API_02 - Duplicate Email: Contact updated silently', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/addContacts`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      contact_id: "",
      city: "",
      designation: "",
      email: "rajaksharma111@salespanda.com",
      fname: "Rajjak",
      lname: "sharma",
      phone: "9996666664",
      dob: "1996-09-08"
    }
  });

  const body = await response.json();
  console.log('TC_API_02 Response:', body);
  expect(response.status()).toBe(200);
  expect(body.message).toContain("updated");
});

test('TC_API_03 - Missing Email: Validation error', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/addContacts`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
    },
    data: {
      contact_id: "",
      fname: "QA",
      lname: "Tester",
      phone: "9996666664"
    }
  });

  const body = await response.json();
  console.log('TC_API_03 Response:', body);
  // Bug note: Missing email causes a server crash (500) instead of a validation error (4xx).
  // We pin the 500 itself — that is the actual bug. We do NOT assert on body.exception: that field
  // only appears when the server runs with debug output on, and CI now gets the safe generic
  // response ({ message: 'Server Error' }) without it.
  expect(response.status()).toBe(500);
  expect(body.message).toBeDefined();
});

test('TC_API_04 - No Auth Token: Unauthorized', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/addContacts`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      email: `qa.${Date.now()}@test.com`,
      fname: "QA",
      lname: "Tester"
    }
  });

  const body = await response.json();
  console.log('TC_API_04 Response:', body);
  expect(response.status()).toBe(404);
});


import { test, expect } from '@playwright/test';

test.describe('Contacts API - Stubbed via local mock server', () => {

  test('valid contact creation returns 201 with created id', async ({ request }) => {
    const response = await request.post('http://localhost:4000/api/contacts', {
      data: { name: 'Raghav Vohra', email: 'raghav@digipulse.com' }
    });

    const body = await response.json();
    console.log('Response:', body);

    expect(response.status()).toBe(201);
    expect(body.id).toBeDefined();
  });

  test('missing email replicates real bug: 500 instead of 400/422', async ({ request }) => {
    const response = await request.post('http://localhost:4000/api/contacts', {
      data: { name: 'No Email Contact' }
    });

    console.log('Status:', response.status());
    expect(response.status()).toBe(500); // documented bug — ideally 400/422 hona chahiye
  });

});
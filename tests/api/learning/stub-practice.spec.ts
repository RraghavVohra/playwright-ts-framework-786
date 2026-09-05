import { test, expect } from '@playwright/test';

test.describe('Login API - Stubbed via local mock server', () => {

  test('valid credentials return success and token', async ({ request }) => {
    const response = await request.post('http://localhost:4000/api/login', {
      data: {
        email: 'test@digipulse.com',
        password: 'correctpass'
      }
    });

    const body = await response.json();
    console.log('Response:', body);

    expect(response.status()).toBe(200);
    expect(body.success).toBe(true);
    expect(body.token).toBe('fake-jwt-abc123');
  });

  test('wrong credentials replicate real bug: 200 status with 401 in body', async ({ request }) => {
    const response = await request.post('http://localhost:4000/api/login', {
      data: {
        email: 'test@digipulse.com',
        password: 'wrongpass'
      }
    });

    const body = await response.json();
    console.log('Response:', body);

    expect(response.status()).toBe(200); // yahi documented bug hai — 401 nahi, 200 milega
    expect(body.status).toBe(401);
    expect(body.message).toBe('Unauthorized');
  });

});
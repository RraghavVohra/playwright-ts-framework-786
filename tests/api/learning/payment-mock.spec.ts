import { test, expect } from '@playwright/test';

test.describe('Payment API - Mocking same endpoint, different outcomes (Japneet Q5 + Q6)', () => {

  test('success card returns 200 with a transaction id', async ({ request }) => {
    const response = await request.post('http://localhost:4000/api/payment', {
      data: { cardNumber: '4111111111111111' }
    });

    const body = await response.json();
    console.log('Success response:', body);

    expect(response.status()).toBe(200);
    expect(body.transactionId).toBeDefined();
  });

  test('decline test card, SAME url, SAME method, different outcome by body content', async ({ request }) => {
    const response = await request.post('http://localhost:4000/api/payment', {
      data: { cardNumber: '4000000000000002' }
    });

    const body = await response.json();
    console.log('Decline response:', body);

    expect(response.status()).toBe(402);
    expect(body.status).toBe('declined');
  });

  test('delay injection — response deliberately takes at least 1.5s', async ({ request }) => {
    const start = Date.now();

    const response = await request.post('http://localhost:4000/api/payment', {
      data: { cardNumber: '4111111111111111', simulateDelayMs: 1500 }
    });

    const elapsed = Date.now() - start;
    console.log('Elapsed ms:', elapsed);

    expect(response.status()).toBe(200);
    expect(elapsed).toBeGreaterThanOrEqual(1500);
  });

});

import { test, expect } from '@playwright/test';

test.describe('Login API - Mocking (behavior verification)', () => {

  test('login is called exactly twice when invoked twice', async ({ request }) => {
    // Call 1
    await request.post('http://localhost:4000/api/login', {
      data: { email: 'test@digipulse.com', password: 'correctpass' }
    });

    // Call 2
    await request.post('http://localhost:4000/api/login', {
      data: { email: 'test@digipulse.com', password: 'correctpass' }
    });

    // Ab verify karo ki wakai 2 baar hi call hua
    const countResponse = await request.get('http://localhost:4000/api/login/call-count');
    const countBody = await countResponse.json();

    console.log('Login was called:', countBody.count, 'times');
    expect(countBody.count).toBe(2);
  });

});

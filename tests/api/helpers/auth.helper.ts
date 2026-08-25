import { APIRequestContext } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getAuthData(request: APIRequestContext): Promise<{ token: string, cookies: string }> {
  
  const response = await request.post(`https://app.digipulsesp.in/framework/api/login`, {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD
    }
  });

  const cookies = response.headers()['set-cookie'];
  const body = await response.json();
  
  // PHPSESSID aur SPSESSTKN extract it
  const phpsessid = cookies.match(/PHPSESSID=([^;]+)/)?.[1];
  const spsesstkn = cookies.match(/SPSESSTKN=([^;]+)(?!.*deleted)/)?.[1];
  const cookieString = `PHPSESSID=${phpsessid}; SPSESSTKN=${spsesstkn}`;

  console.log('✅ Token received:', body.token ? 'Yes' : 'No');
  
  return {
    token: body.token,
    cookies: cookieString
  };
}
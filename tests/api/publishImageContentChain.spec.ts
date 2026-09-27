import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { getAuthData } from './helpers/auth.helper';

dotenv.config();

// Reuse the confirmed-working saveContent payload as the source for chaining
const rawFixture = fs.readFileSync(
  path.join(__dirname, 'fixtures', 'saveContent-payload.json'),
  'utf-8'
);
const saveContentPayload = JSON.parse(rawFixture);

let token: string;
let cookies: string;

test.beforeAll(() => {
  const auth = getAuthData();
  token = auth.token;
  cookies = auth.cookies;
});

function headers() {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Cookie': cookies,
    'Accept': 'application/json'
  };
}

// publishContent's start_date needs "YYYY-MM-DD HH:mm:ss" format — building
// this dynamically so the test always sends a valid "now" timestamp instead
// of a hardcoded date that goes stale
function formatDateTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

test('TC_CHAIN_01 - saveContent then publishContent', async ({ request }) => {

  // ===== STEP 1 — saveContent =====
  const savePayload = JSON.parse(JSON.stringify(saveContentPayload));
  savePayload.data[0].Base.title = `QA_Chain_Test_${Date.now()}`;

  const saveResponse = await request.post(`${process.env.BASE_URL}/framework/api/saveContent`, {
    headers: headers(),
    data: savePayload
  });

  expect(saveResponse.status()).toBe(200);
  const saveBody = await saveResponse.json();
  console.log('saveContent response:', saveBody);

  // This is the chain link — the ID saveContent just created becomes
  // publishContent's content_id in the next call
  const contentId = saveBody.inserted_ids[0];
  expect(contentId).toBeDefined();
  console.log('Chained content_id:', contentId);

  // ===== STEP 2 — publishContent =====
  const publishPayload = {
    data: [
      {
        Base: {
          content_id: contentId,
          content_name: 'Image',
          selected_assets: [1],
          platform: [],
          category: [261],        // TODO: confirm this partner_category id stays valid
          option: 1,
          schedule: 0,
          schedule_date: 0,
          cobranding: 1,
          push_notification: 1,
          email_notification: 1,
          start_date: formatDateTime(new Date()),
          expired_date: ''
        }
      }
    ]
  };

  const publishResponse = await request.post(`${process.env.BASE_URL}/framework/api/publishContent`, {
    headers: headers(),
    data: publishPayload
  });

  console.log('publishContent status:', publishResponse.status());
  const publishRawText = await publishResponse.text();
  console.log('publishContent raw response:', publishRawText.substring(0, 500));

  const publishBody = JSON.parse(publishRawText);
  console.log('publishContent parsed body:', publishBody);

  expect(publishResponse.status()).toBe(200);
  expect(publishBody.statusCode).toBe('200');
  expect(publishBody.status).toBe('Success');
  expect(publishBody.message).toContain('Published');

  // ===== STEP 3 — assetLibraryList (verification) =====
  // publishContent's response only gives a generic success message — no real
  // proof the content's status actually changed. This step is the real
  // assertion: pull the full list and confirm OUR specific record now shows
  // status "Published".
  //
  // Matching by content_title (not content_id) is deliberate — assetLibraryList
  // returns content_id as a STRING while saveContent/publishContent use NUMBER
  // (a documented type-inconsistency bug), so matching on the unique title we
  // set avoids that mismatch entirely.
  const listPayload = {
    action: 'contentList',
    global_search: null,
    sub_category_filter: null,
    quick_filter_value: null,
    category_filter: null,
    status_filter: null,
    sort_value: null,
    sort_order: null,
    folder_id: null,
    smart_folder: null,
    startlimit: 0,
    endlimit: 20
  };

  const listResponse = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: listPayload
  });

  expect(listResponse.status()).toBe(200);
  const listBody = await listResponse.json();

  const ourContent = listBody.response.listing_data.find(
    (item: { content_title: string; status: string }) =>
      item.content_title === savePayload.data[0].Base.title
  );

  console.log('Found in assetLibraryList:', ourContent);

  // If this fails, the content may be sitting beyond the first 20 results —
  // worth re-checking sort order / pagination before assuming a real bug
  expect(ourContent).toBeDefined();
  expect(ourContent.status).toBe('Published');
});

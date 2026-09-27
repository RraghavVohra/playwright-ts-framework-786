import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { getAuthData } from './helpers/auth.helper';

dotenv.config();

// Shape of one entry in listing_data — defined so map()/find() callbacks
// don't need `any` (ESLint's @typescript-eslint/no-explicit-any blocks that)
interface ListingItem {
  track_url: string;
  content_id: string;
  type: string;
  content_type: string;
  thumb_image: string;
  link: string;
  bookmark: number;
  new: number;
  scheduled_date: string;
  cobrand: number;
  internal_hashtag: string;
  buy_now: number;
  content_title: string;
  activity_date: string;
  solution_types: { id: number; it_type: string }[];
  sub_soultion_types: unknown[];
  expired: number;
  status: string;
  partner_category: { id: number; name: string }[];
  users_category: unknown[];
}

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

// Base payload — every field null except pagination, matching the confirmed
// working request. Individual tests clone this and override just the field
// they're testing.
function basePayload() {
  return {
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
}

test('TC_01 - assetLibraryList Happy Path', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: basePayload()
  });

  const body = await response.json();
  console.log('TC_01 response total_data:', body.response?.total_data);
  console.log('TC_01 first item:', body.response?.listing_data?.[0]);

  expect(response.status()).toBe(200);
  expect(body.statusCode).toBe('200');
  expect(body.status).toBe('Success');
  expect(Array.isArray(body.response.listing_data)).toBe(true);
  expect(typeof body.response.total_data).toBe('number');
});

test('TC_02 - status_filter Published returns only Published items', async ({ request }) => {
  const payload = basePayload();
  payload.status_filter = 'Published';

  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: payload
  });

  const body = await response.json();
  console.log('TC_02 status values found:', body.response?.listing_data?.map((i: ListingItem) => i.status));

  expect(response.status()).toBe(200);
  // Every item in the list should have status === 'Published' — if even one
  // doesn't, the filter isn't actually filtering server-side
  const statuses = body.response.listing_data.map((item: ListingItem) => item.status);
  expect(statuses.every((s: string) => s === 'Published')).toBe(true);
});

test('TC_03 - status_filter Draft returns only Draft items', async ({ request }) => {
  const payload = basePayload();
  payload.status_filter = 'Draft';

  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: payload
  });

  const body = await response.json();
  console.log('TC_03 status values found:', body.response?.listing_data?.map((i: ListingItem) => i.status));

  expect(response.status()).toBe(200);
  const statuses = body.response.listing_data.map((item: ListingItem) => item.status);
  expect(statuses.every((s: string) => s === 'Draft')).toBe(true);
});

test('TC_04 - global_search filters by title text', async ({ request }) => {
  const payload = basePayload();
  // TODO: replace with a title/substring you know exists in your account
  payload.global_search = 'QA_Chain_Test';

  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: payload
  });

  const body = await response.json();
  console.log('TC_04 titles found:', body.response?.listing_data?.map((i: ListingItem) => i.content_title));

  expect(response.status()).toBe(200);
  // Every returned title should contain the search term
  const titles = body.response.listing_data.map((item: ListingItem) => item.content_title);
  expect(titles.every((t: string) => t.includes('QA_Chain_Test'))).toBe(true);
});

test('TC_05 - Missing auth token', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies,
      'Accept': 'application/json'
      // Authorization deliberately omitted
    },
    data: basePayload()
  });

  console.log('TC_05 status:', response.status());
  // Expect this to reproduce the known app-wide bug: 404 instead of 401
  expect(response.status()).toBe(404);
});

test('TC_06 - Schema/type check on listing_data fields', async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: basePayload()
  });

  const body = await response.json();
  const firstItem: ListingItem = body.response.listing_data[0];
  console.log('TC_06 first item types:', {
    content_id: typeof firstItem.content_id,
    status: typeof firstItem.status,
    solution_types: Array.isArray(firstItem.solution_types)
  });

  // Documented quirk: content_id is a STRING here, unlike saveContent/
  // publishContent which use NUMBER for the same conceptual field
  expect(typeof firstItem.content_id).toBe('string');
  expect(typeof firstItem.status).toBe('string');
  expect(Array.isArray(firstItem.solution_types)).toBe(true);
});

import { test, expect, APIRequestContext } from '@playwright/test';
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
// Shape of the request body. Every filter starts as null and individual tests
// override the one they are testing - typing them as `string | null` (instead of
// letting TypeScript infer the literal type `null`) is what allows that.
interface AssetLibraryPayload {
  action: string;
  global_search: string | null;
  sub_category_filter: string | null;
  quick_filter_value: string | null;
  category_filter: string | null;
  status_filter: string | null;
  sort_value: string | null;
  sort_order: string | null;
  folder_id: string | null;
  smart_folder: string | null;
  startlimit: number;
  endlimit: number;
}

function basePayload(): AssetLibraryPayload {
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

// TC_02–03 — status_filter is currently IGNORED by the API (known gap).
// Sending status_filter 'Published' or 'Draft' returns exactly the same list as sending null;
// the app's own filter does not go through this field. This is a characterization test: it pins
// what the API does today. If the backend ever starts honouring status_filter, these fail and the
// assertion should flip to "only Published / only Draft".
async function fetchContentIds(request: APIRequestContext, payload: AssetLibraryPayload): Promise<string[]> {
  const response = await request.post(`${process.env.BASE_URL}/framework/api/assetLibraryList`, {
    headers: headers(),
    data: payload
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  return body.response.listing_data.map((item: ListingItem) => item.content_id);
}

for (const { id, value } of [
  { id: 'TC_02', value: 'Published' },
  { id: 'TC_03', value: 'Draft' },
]) {
  test(`${id} - status_filter '${value}' is currently ignored (known gap: same list as no filter)`, async ({ request }) => {
    const unfiltered = await fetchContentIds(request, basePayload());
    const payload = basePayload();
    payload.status_filter = value;
    const filtered = await fetchContentIds(request, payload);

    console.log(`${id} unfiltered vs filtered ids equal:`, JSON.stringify(unfiltered) === JSON.stringify(filtered));
    expect(filtered).toEqual(unfiltered);
  });
}

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


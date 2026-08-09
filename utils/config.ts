// Read ENV from the .env file
// If not set, default to 'preprod' so tests run on preprod by default
// The 'as' tells TypeScript this value is one of only three allowed strings
export const ENV = (process.env.ENV ?? 'preprod') as 'dev' | 'preprod' | 'prod' | 'digipulse';

// Each environment has a different base URL
// This object maps the ENV value to the correct server address
const BASE_URLS = {
  dev:       'https://app.spdevmfp.com',
  preprod:   'https://app.sppreprod.in',
  prod:      'https://app.technochimes.com',
  digipulse: 'https://app.digipulsesp.in',
};

// Export the base URL for the currently active environment
// playwright.config.ts uses this as the baseURL so page.goto('/home') works correctly
export const BASE_URL = BASE_URLS[ENV];

// Export credentials from .env
// The '!' at the end tells TypeScript "trust me, this value will exist"
// Make sure USER_EMAIL and USER_PASSWORD are filled in your .env file
export const USER_EMAIL    = process.env.USER_EMAIL!;
export const USER_PASSWORD = process.env.USER_PASSWORD!;

// The partner category name differs per server
// On your preprod server this is 'Raj2024'
export const PARTNER_CATEGORY_NAME = process.env.PARTNER_CATEGORY_NAME ?? 'Raj2024';

// The custom link used in push notification tests
export const CUSTOM_LINK = process.env.CUSTOM_LINK ?? 'https://www.google.com';

// Base name prefix for document uploads in Document Library tests
// Date.now() is appended in each test to make every name unique across runs
// If not set in .env, defaults to 'AutoDoc'
export const DOCUMENT_NAME = process.env.DOCUMENT_NAME ?? 'AutoDoc';

// The hashtag text typed into the hashtag field in Document Library tests
// Must match a hashtag that exists in the autocomplete on your target environment.
// 'teaser' no longer exists on digipulse (confirmed via CI failure — TC_DL_34's
// autocomplete never showed a suggestion for it) — 'TEST 20330' (all caps, confirmed
// via screenshot — the field and its suggestion both render it uppercase) is current.
export const HASHTAG_TEXT = process.env.HASHTAG_TEXT ?? 'TEST 20330';

// Base name prefix for Banner asset uploads in Banners tests
// Date.now() is appended in each test to make every name unique across runs
export const BANNER_NAME = process.env.BANNER_NAME ?? 'AutoBanner';

// Base name prefix for Social Post asset uploads (Asset Library "Social Post" type)
// Date.now() is appended in each test to make every name unique across runs
export const SOCIAL_POST_ASSET_NAME = process.env.SOCIAL_POST_ASSET_NAME ?? 'AutoSocialPost';

// Base name prefix for Brochure asset uploads (Asset Library "Brochure" type)
// Date.now() is appended in each test to make every name unique across runs
export const BROCHURE_NAME = process.env.BROCHURE_NAME ?? 'AutoBrochure';

// Category and hashtag used when creating a Brochure asset — these are environment-specific
// data (must exist on whichever server ENV points to), same reasoning as
// PARTNER_CATEGORY_NAME/HASHTAG_TEXT above. Confirmed to exist on digipulse; override in
// .env if these don't exist on prod/preprod/dev.
export const BROCHURE_CATEGORY = process.env.BROCHURE_CATEGORY ?? 'Savings';
export const BROCHURE_HASHTAG  = process.env.BROCHURE_HASHTAG  ?? 'Rag09';

// A second category/hashtag, used by the multi-select test — confirmed to exist alongside
// BROCHURE_CATEGORY/BROCHURE_HASHTAG on digipulse.
export const BROCHURE_CATEGORY_2 = process.env.BROCHURE_CATEGORY_2 ?? 'Home Insurance';
export const BROCHURE_HASHTAG_2  = process.env.BROCHURE_HASHTAG_2  ?? 'Astounding';

// Social Auto-post config
// social.partner.search — term typed into the category search box to filter results
// social.partner.name   — exact visible label text of the category to select
export const SOCIAL_PARTNER_SEARCH = process.env.SOCIAL_PARTNER_SEARCH ?? 'raj';
export const SOCIAL_PARTNER_NAME   = process.env.SOCIAL_PARTNER_NAME   ?? 'Raj2024';
export const SOCIAL_TITLE          = process.env.SOCIAL_TITLE          ?? "Social's Auto-post";
export const SOCIAL_DESCRIPTION    = process.env.SOCIAL_DESCRIPTION    ?? "This's is only for testing purpose & it is for automated testing";
export const SOCIAL_CUSTOM_URL     = process.env.SOCIAL_CUSTOM_URL     ?? 'https://www.salespanda.com';

// Read ENV from the .env file
// If not set, default to 'preprod' so tests run on preprod by default
// The 'as' tells TypeScript this value is one of only three allowed strings
export const ENV = (process.env.ENV ?? 'preprod') as 'dev' | 'preprod' | 'prod';

// Each environment has a different base URL
// This object maps the ENV value to the correct server address
const BASE_URLS = {
  dev:     'https://app.spdevmfp.com',
  preprod: 'https://app.sppreprod.in',
  prod:    'https://app.technochimes.com',
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
// Must match a hashtag that exists in the autocomplete on your target environment
export const HASHTAG_TEXT = process.env.HASHTAG_TEXT ?? 'teaser';

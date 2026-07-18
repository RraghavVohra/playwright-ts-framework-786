// Test data generation for the Testimonials create-flow.
//
// This is "test data generation", not "data-driven testing" — it produces fresh values
// at runtime so nothing in the tests is hardcoded, but each test still runs once with
// values it computes itself (no external data file, no looping over a data set).
//
// WHY curated pools instead of random strings/timestamps?
// Real testimonial data has punctuation — "M.C. Sharma", "D'Souza, Anthony" — and real
// names never contain digits. A timestamp glued onto a name (e.g. "Sharma-1737199823041")
// would guard against duplicates but look nothing like real data. Since new testimonials
// always land at the top of the listing (confirmed manually), a test can just check the
// top row against whatever value it generated for that run — true uniqueness isn't
// actually needed, so these pools stay realistic instead.
//
// Special characters are baked into every entry on purpose — this also guards against
// locator bugs like Fixes.md Fix 4, where an apostrophe in a document name broke a
// hand-built XPath string.

const TESTIMONIAL_NAMES = [
  `M.C. Sharma`,
  `D'Souza, Anthony`,
  `Renée O'Connor`,
  `Jean-Luc Picard`,
  `O'Brien-Kelly`,
];

const COMPANY_NAMES = [
  `Sales & Panda, Inc.`,
  `O'Reilly & Sons`,
  `St. Jude's Traders`,
  `Kumar & Associates`,
];

const DESIGNATIONS = [
  `Sr. Manager - R&D`,
  `V.P., Customer Success`,
  `Head of Growth`,
];

const TESTIMONIAL_TEXTS = [
  `This platform's automation saved us hours of manual work every week.`,
  `We couldn't have scaled our campaigns without SalesPanda's support.`,
  `The team's response time is outstanding - highly recommended.`,
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateTestimonialName(): string {
  return pickRandom(TESTIMONIAL_NAMES);
}

export function generateCompanyName(): string {
  return pickRandom(COMPANY_NAMES);
}

export function generateDesignation(): string {
  return pickRandom(DESIGNATIONS);
}

export function generateTestimonialText(): string {
  return pickRandom(TESTIMONIAL_TEXTS);
}

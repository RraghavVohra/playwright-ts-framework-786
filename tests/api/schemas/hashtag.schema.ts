import { z } from 'zod';

// This schema is the CONTRACT for hashtag's success response.
// Every field here must exist in the real response, with this exact type —
// if the backend adds/removes/retypes a field, this schema catches it
// automatically instead of us finding out from a broken UI later.
export const HashtagItemSchema = z.object({
  id: z.number(),
  tag: z.string(),
  date: z.string(),
});

// Discovered from a real response, not assumed — confirmed via TC_API_26's
// temporary debug log on 18 Oct 2026: tag_group is an array of OBJECTS
// ({ id, tag_category }), not an array of plain strings as first assumed.
// Real sample: [{"id":34,"tag_category":"Group&#039;s 2025"}, ...]
// Note the HTML-entity-encoded apostrophe (&#039;) in tag_category — the
// backend isn't decoding this before sending it. Worth knowing if a UI test
// ever asserts on this exact string.
export const TagGroupItemSchema = z.object({
  id: z.number(),
  tag_category: z.string(),
});

export const HashtagResponseSchema = z.object({
  statusCode: z.string(),              // known quirk: string "200", not number 200
  status: z.literal('Success'),        // must be exactly this value
  message: z.string(),
  response: z.object({
    total_data: z.number(),
    taglist: z.array(HashtagItemSchema),
    tag_group: z.array(TagGroupItemSchema),
  }),
});

// Derives a TypeScript type FROM the schema — autocomplete on body.response.taglist
// etc. without writing the type twice (once for Zod, once for TypeScript)
export type HashtagResponse = z.infer<typeof HashtagResponseSchema>;
import { z } from 'zod';

// This schema is the CONTRACT for saveContent's success response.
// Every field here must exist in the real response, with this exact type —
// if the backend adds/removes/retypes a field, this schema catches it
// automatically instead of us finding out from a broken UI later.
export const SaveContentSchema = z.object({
  statusCode: z.string(),              // known quirk: string "200", not number 200
  status: z.literal('Success'),        // must be exactly this value
  message: z.string(),
  inserted_ids: z.array(z.number()),   // array of numbers — not strings, not a single number
});

// This line derives a TypeScript type FROM the schema — so you get
// compile-time autocomplete on `body.inserted_ids` etc. without writing
// the type twice (once for Zod, once for TypeScript)
export type SaveContentResponse = z.infer<typeof SaveContentSchema>;

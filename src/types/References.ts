import * as z from 'zod';

export const Reference = z.object({
  name: z.string(),
  subject: z.string(),
  version: z.number().int(),
});

export const References = z.array(Reference);

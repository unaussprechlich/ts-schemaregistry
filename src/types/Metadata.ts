import { z } from 'zod';

export const Metadata = z.object({
  properties: z.any(),
});

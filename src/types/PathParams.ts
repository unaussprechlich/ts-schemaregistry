import { z } from 'zod';

export const PathParams = {
  SUBJECT: z.string(),
  VERSION: z.union([z.number().int(), z.literal('latest')]),
};

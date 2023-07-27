import { z } from 'zod';

export const Modes = {
  READWRITE: z.literal('READWRITE'),
  READONLY: z.literal('READONLY'),
  IMPORT: z.literal('IMPORT'),
};

export const Mode = z.union([Modes.READWRITE, Modes.READONLY, Modes.IMPORT]);

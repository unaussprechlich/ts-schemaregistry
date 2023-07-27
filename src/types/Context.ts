import { z } from 'zod';

export const ContextTypes = {
  NONE: z.literal('NONE'),
  AUTO: z.literal('AUTO'),
  CUSTOM: z.literal('CUSTOM'),
};

export const ContextType = z.union([
  ContextTypes.NONE,
  ContextTypes.AUTO,
  ContextTypes.CUSTOM,
]);

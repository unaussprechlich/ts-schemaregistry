import { z } from 'zod';

export const CompatabilityLevels = {
  NONE: z.literal('NONE'),
  BACKWARD: z.literal('BACKWARD'),
  BACKWARD_TRANSITIVE: z.literal('BACKWARD_TRANSITIVE'),
  FORWARD: z.literal('FORWARD'),
  FORWARD_TRANSITIVE: z.literal('FORWARD_TRANSITIVE'),
  FULL: z.literal('FULL'),
  FULL_TRANSITIVE: z.literal('FULL_TRANSITIVE'),
};

export const Compatability = z.union([
  CompatabilityLevels.NONE,
  CompatabilityLevels.BACKWARD,
  CompatabilityLevels.BACKWARD_TRANSITIVE,
  CompatabilityLevels.FORWARD,
  CompatabilityLevels.FORWARD_TRANSITIVE,
  CompatabilityLevels.FULL,
  CompatabilityLevels.FULL_TRANSITIVE,
]);

import * as z from 'zod';
import { References } from './References';
import { Metadata } from './Metadata';
import { RuleSet } from './RuleSet';

export const Schema = z.object({
  schema: z.string(),
  schemaType: z.string().optional(),
  references: References.optional(),
  metadata: Metadata.optional(),
  ruleSet: RuleSet.optional(),
});

import * as z from 'zod';
import { References } from './References';
import { Metadata } from './Metadata';
import { RuleSet } from './RuleSet';

export const SchemaTypes = {
  AVRO: z.literal('AVRO'),
  JSON: z.literal('JSON'),
  PROTOBUF: z.literal('PROTOBUF'),
} as const;

export const SchemaType = z.union([
  SchemaTypes.AVRO,
  SchemaTypes.JSON,
  SchemaTypes.PROTOBUF,
]);

export const Schema = z.object({
  schema: z.string(),
  schemaType: SchemaType.optional(),
  references: References.optional(),
  metadata: Metadata.optional(),
  ruleSet: RuleSet.optional(),
});

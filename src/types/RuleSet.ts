import { z } from 'zod';

export const Rule = z.union([
  z.object({
    name: z.string(),
    doc: z.string().optional(),
    kind: z.string().optional(),
    type: z.string().optional(),
    mode: z.string().optional(),
    tags: z.any().optional(),
    params: z.any().optional(),
    expr: z.string().optional(),
    onSuccess: z.any().optional(),
    onFailure: z.any().optional(),
  }),
  z.any(),
]);

export const RuleSet = z.object({
  domainRules: z.array(Rule),
});

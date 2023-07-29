import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { PathParams, Schema } from '../types';
import { SchemaRegistryErrors } from '../SchemaRegistryErrors';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      subjects: {
        subject: {
          versions: {
            post: {
              method: 'POST',
              path: '/subjects/:subject/versions',
              summary:
                'Perform a compatibility check on the schema against one or more versions in the subject, depending on how the compatibility is set.',
              query: z.object({
                verbose: z.boolean().optional(),
              }),
              body: Schema,
              pathParams: z.object({
                subject: PathParams.SUBJECT,
              }),
              responses: {
                200: z.object({
                  is_compatible: z.boolean(),
                }),
                404: SchemaRegistryErrors[40401],
                422: SchemaRegistryErrors[42201],
                500: SchemaRegistryErrors[50001],
              },
            },
            version: {
              post: {
                method: 'POST',
                path: '/subjects/:subject/versions/:version',
                summary:
                  'The compatibility resource allows the user to test schemas for compatibility against a specific version or all versions of a subject’s schema.',
                query: z.object({
                  verbose: z.boolean().optional(),
                }),
                body: Schema,
                pathParams: z.object({
                  subject: PathParams.SUBJECT,
                  version: PathParams.VERSION,
                }),
                responses: {
                  200: z.object({
                    is_compatible: z.boolean(),
                  }),
                  404: z.union([
                    SchemaRegistryErrors[40401],
                    SchemaRegistryErrors[40402],
                  ]),
                  422: z.union([
                    SchemaRegistryErrors[42201],
                    SchemaRegistryErrors[42202],
                  ]),
                  500: SchemaRegistryErrors[50001],
                },
              },
            },
          },
        },
      },
    },
    {
      pathPrefix: '/compatability',
    },
  );
}

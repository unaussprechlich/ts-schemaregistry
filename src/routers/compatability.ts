import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { ConfluentError, PathParams, Schema } from '../types';

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
                404: ConfluentError[40401],
                422: ConfluentError[42201],
                500: ConfluentError[50001],
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
                  404: z.union([ConfluentError[40401], ConfluentError[40402]]),
                  422: z.union([ConfluentError[42201], ConfluentError[42202]]),
                  500: ConfluentError[50001],
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

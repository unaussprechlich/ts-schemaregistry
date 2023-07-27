import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { ConfluentError } from '../types';
export default function (c: ReturnType<typeof initContract>) {
  const ids = c.router(
    {
      id: {
        get: {
          method: 'GET',
          path: '/:id',
          summary: 'Get the schema string identified by the input ID.',
          pathParams: z.object({
            id: z.number().int(),
          }),
          query: z.object({
            subject: z.string().optional(),
          }),
          responses: {
            200: z.object({
              schema: z.string(),
            }),
            404: ConfluentError[40401],
            500: ConfluentError[50001],
          },
        },
        schema: {
          get: {
            method: 'GET',
            path: '/:id/schema',
            summary: 'Retrieves only the schema identified by the input ID.',
            pathParams: z.object({
              id: z.number().int(),
            }),
            query: z.object({
              subject: z.string().optional(),
            }),
            responses: {
              200: z.string(),
              404: ConfluentError[40401],
              500: ConfluentError[50001],
            },
          },
        },

        versions: {
          get: {
            method: 'GET',
            path: '/:id/versions',
            summary:
              'Get the subject-version pairs identified by the input ID.',
            pathParams: z.object({
              id: z.number().int(),
            }),
            responses: {
              200: z.array(
                z.object({
                  subject: z.string(),
                  versions: z.number().int(),
                }),
              ),
              404: ConfluentError[40401],
              500: ConfluentError[50001],
            },
          },
        },
      },
    },
    { pathPrefix: '/ids' },
  );

  return c.router(
    {
      ids,
      types: {
        get: {
          method: 'GET',
          path: '/types',
          summary:
            'Get the schema types that are registered with Schema Registry.',
          responses: {
            200: z.array(z.string()),
            404: ConfluentError[40401],
            500: ConfluentError[50001],
          },
        },
      },
    },
    {
      pathPrefix: '/schemas',
    },
  );
}

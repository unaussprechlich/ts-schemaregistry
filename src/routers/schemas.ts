import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { SchemaRegistryErrors } from '../SchemaRegistryErrors';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      ids: {
        id: {
          get: {
            method: 'GET',
            path: '/ids/:id',
            summary: 'Get the schema string identified by the input ID.',
            pathParams: z.object({
              id: z.number().int(),
            }),
            query: z.object({
              subject: z.string().optional(),
            }),
            responses: {
              200: z.object({
                schemaType: z.string().optional(),
                schema: z.string(),
              }),
              404: SchemaRegistryErrors[40401],
              500: SchemaRegistryErrors[50001],
            },
          },
          schema: {
            get: {
              method: 'GET',
              path: '/ids/:id/schema',
              summary: 'Retrieves only the schema identified by the input ID.',
              pathParams: z.object({
                id: z.number().int(),
              }),
              query: z.object({
                subject: z.string().optional(),
              }),
              responses: {
                200: z.string(),
                404: SchemaRegistryErrors[40401],
                500: SchemaRegistryErrors[50001],
              },
            },
          },

          versions: {
            get: {
              method: 'GET',
              path: '/ids/:id/versions',
              summary:
                'Get the subject-version pairs identified by the input ID.',
              pathParams: z.object({
                id: z.number().int(),
              }),
              responses: {
                200: z.array(
                  z.object({
                    subject: z.string(),
                    version: z.number().int(),
                  }),
                ),
                404: SchemaRegistryErrors[40401],
                500: SchemaRegistryErrors[50001],
              },
            },
          },
        },
      },
      types: {
        get: {
          method: 'GET',
          path: '/types',
          summary:
            'Get the schema types that are registered with Schema Registry.',
          responses: {
            200: z.array(z.string()),
            404: SchemaRegistryErrors[40401],
            500: SchemaRegistryErrors[50001],
          },
        },
      },
    },
    {
      pathPrefix: '/schemas',
    },
  );
}

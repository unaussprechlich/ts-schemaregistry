import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { PathParams, Schema } from '../types';
import { SchemaRegistryErrors } from '../SchemaRegistryErrors';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      get: {
        method: 'GET',
        path: '',
        summary: 'Get a list of registered subjects.',
        query: z.object({
          subjectPrefix: z.string().optional(),
          deleted: z.boolean().optional(),
        }),
        responses: {
          200: z.array(z.string()),
          500: SchemaRegistryErrors[50001],
        },
      },

      subject: {
        delete: {
          method: 'DELETE',
          path: '/:subject',
          summary:
            'Deletes the specified subject and its associated compatibility level if registered. It is recommended to use this API only when a topic needs to be recycled or in a development environment.',
          pathParams: z.object({
            subject: PathParams.SUBJECT,
          }),
          query: z.object({
            permanent: z.boolean().optional(),
          }),
          body: z.undefined(),
          responses: {
            200: z.array(z.number()),
            404: SchemaRegistryErrors[40401],
            500: SchemaRegistryErrors[50001],
          },
        },
        post: {
          method: 'POST',
          path: '/:subject',
          summary:
            'Check if a schema has already been registered under the specified subject.',
          query: z.object({
            normalize: z.boolean().optional(),
          }),
          pathParams: z.object({
            subject: PathParams.SUBJECT,
          }),
          body: Schema,
          responses: {
            200: z.object({
              subject: z.string(),
              id: z.number().int(),
              version: z.number().int(),
              schema: z.string(),
            }),
            404: z.union([
              SchemaRegistryErrors[40401],
              SchemaRegistryErrors[40403],
            ]),
            500: z.union([
              SchemaRegistryErrors[50001],
              SchemaRegistryErrors[50002],
              SchemaRegistryErrors[50003],
            ]),
          },
        },
        versions: {
          get: {
            method: 'GET',
            path: '/:subject/versions',
            summary:
              'Get a list of versions registered under the specified subject.',
            pathParams: z.object({
              subject: PathParams.SUBJECT,
            }),
            responses: {
              200: z.array(z.number()),
              404: SchemaRegistryErrors[40401],
              500: SchemaRegistryErrors[50001],
            },
          },
          post: {
            method: 'POST',
            path: '/:subject/versions',
            summary:
              'Register a new schema under the specified subject. (Essentially, create a new schema.)',
            query: z.object({
              normalize: z.boolean().optional(),
            }),
            pathParams: z.object({
              subject: PathParams.SUBJECT,
            }),
            body: Schema,
            responses: {
              200: z.object({
                id: z.number().int(),
              }),
              409: SchemaRegistryErrors[409],
              422: SchemaRegistryErrors[42201],
              500: z.union([
                SchemaRegistryErrors[50001],
                SchemaRegistryErrors[50002],
                SchemaRegistryErrors[50003],
              ]),
            },
          },
          version: {
            get: {
              method: 'GET',
              path: '/:subject/versions/:version',
              summary:
                'Get a specific version of the schema registered under this subject',
              pathParams: z.object({
                subject: PathParams.SUBJECT,
                version: PathParams.VERSION,
              }),
              responses: {
                200: z.object({
                  subject: z.string(),
                  id: z.number().int(),
                  version: z.number().int(),
                  schemaType: z.string(),
                  schema: z.string(),
                }),
                404: z.union([
                  SchemaRegistryErrors[40401],
                  SchemaRegistryErrors[40402],
                ]),
                422: SchemaRegistryErrors[42202],
                500: SchemaRegistryErrors[50001],
              },
            },
            delete: {
              method: 'DELETE',
              path: '/:subject/versions/:version',
              summary:
                'Deletes a specific version of the schema registered under this subject.',
              query: z.object({
                permanent: z.boolean().optional(),
              }),
              pathParams: z.object({
                subject: PathParams.SUBJECT,
                version: PathParams.VERSION,
              }),
              body: z.undefined(),
              responses: {
                200: z.number().int(),
                404: z.union([
                  SchemaRegistryErrors[40401],
                  SchemaRegistryErrors[40402],
                ]),
                422: SchemaRegistryErrors[42202],
                500: SchemaRegistryErrors[50001],
              },
            },
            schema: {
              get: {
                method: 'GET',
                path: '/:subject/versions/:version/schema',
                summary:
                  'Get the schema for the specified version of this subject. The unescaped schema only is returned.',
                pathParams: z.object({
                  subject: PathParams.SUBJECT,
                  version: PathParams.VERSION,
                }),
                responses: {
                  200: z.string(),
                  404: z.union([
                    SchemaRegistryErrors[40401],
                    SchemaRegistryErrors[40402],
                  ]),
                  422: SchemaRegistryErrors[42202],
                  500: SchemaRegistryErrors[50001],
                },
              },
            },
            referencedby: {
              get: {
                method: 'GET',
                path: '/:subject/versions/:version/referencedby',
                summary:
                  'Get a list of IDs of schemas that reference the schema with the given subject and version.',
                pathParams: z.object({
                  subject: PathParams.SUBJECT,
                  version: PathParams.VERSION,
                }),
                responses: {
                  200: z.array(z.number().int()),
                  404: SchemaRegistryErrors[40401],
                  500: SchemaRegistryErrors[50001],
                },
              },
            },
          },
        },
      },
    },
    {
      pathPrefix: '/subjects',
    },
  );
}

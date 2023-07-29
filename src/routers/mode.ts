import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { Mode } from '../types';
import { SchemaRegistryErrors } from '../SchemaRegistryErrors';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      get: {
        method: 'GET',
        path: '',
        summary: 'Get the current mode for Schema Registry at a global level.',
        responses: {
          200: z.object({ mode: Mode }),
          500: SchemaRegistryErrors[50001],
        },
      },
      put: {
        method: 'PUT',
        path: '',
        summary: 'Update the global Schema Registry mode.',
        query: z.object({
          force: z.boolean().optional(),
        }),
        body: z.object({
          mode: Mode,
        }),
        responses: {
          200: z.object({ mode: Mode }),
          500: SchemaRegistryErrors[50001],
        },
      },
      subject: {
        get: {
          method: 'GET',
          path: '/:subject',
          summary: 'Get the mode for a subject.',
          pathParams: z.object({
            subject: z.string(),
          }),
          responses: {
            200: z.object({ mode: Mode }),
            404: SchemaRegistryErrors[40401],
            500: SchemaRegistryErrors[50001],
          },
        },
        put: {
          method: 'PUT',
          path: '/:subject',
          summary: 'Update the mode for the specified subject.',
          pathParams: z.object({
            subject: z.string(),
          }),
          query: z.object({
            force: z.boolean().optional(),
          }),
          body: z.object({
            mode: Mode,
          }),
          responses: {
            200: z.object({ mode: Mode }),
            404: SchemaRegistryErrors[40401],
            422: SchemaRegistryErrors[42204],
            500: SchemaRegistryErrors[50001],
          },
        },
        delete: {
          method: 'DELETE',
          path: '/:subject',
          summary: 'Update the mode for the specified subject.',
          pathParams: z.object({
            subject: z.string(),
          }),
          body: z.undefined(),
          responses: {
            200: z.object({ mode: Mode }),
            404: SchemaRegistryErrors[40401],
            500: SchemaRegistryErrors[50001],
          },
        },
      },
    },
    {
      pathPrefix: '/mode',
    },
  );
}

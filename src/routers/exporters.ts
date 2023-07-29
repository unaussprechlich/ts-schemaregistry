import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { Exporter, ExporterConfig, ExporterStatus } from '../types';
import { SchemaRegistryErrors } from '../SchemaRegistryErrors';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      get: {
        method: 'GET',
        path: '',
        summary: 'Gets a list of schema exporters that have been created.',
        responses: {
          200: z.array(z.string()),
        },
      },
      post: {
        method: 'POST',
        path: '',
        summary: 'Creates a new schema exporter. ',
        body: Exporter.partial({
          name: true,
          contextType: true,
          subjectRenameFormat: true,
          subjects: true,
        }),
        responses: {
          200: z.object({
            name: z.string(),
          }),
          409: z.union([
            SchemaRegistryErrors[40950],
            SchemaRegistryErrors[40951],
            SchemaRegistryErrors[40952],
            SchemaRegistryErrors[40960],
            SchemaRegistryErrors[40964],
          ]),
        },
      },
      name: {
        get: {
          method: 'GET',
          path: '/:name',
          summary: 'Gets a list of schema exporters that have been created.',
          pathParams: z.object({
            name: z.string(),
          }),
          responses: {
            200: Exporter,
            404: SchemaRegistryErrors[40450],
          },
        },
        put: {
          method: 'PUT',
          path: '/:name',
          summary:
            'Updates the information or configurations of the schema exporter.',
          pathParams: z.object({
            name: z.string(),
          }),
          body: Exporter.omit({ name: true }).partial({
            contextType: true,
            subjectRenameFormat: true,
            subjects: true,
          }),
          responses: {
            200: z.object({
              name: z.string(),
            }),
            409: z.union([
              SchemaRegistryErrors[40952],
              SchemaRegistryErrors[40963],
            ]),
          },
        },
        delete: {
          method: 'DELETE',
          path: '/:name',
          summary: 'Deletes the schema exporter.',
          pathParams: z.object({
            name: z.string(),
          }),
          body: z.undefined(),
          responses: {
            200: z.undefined(),
            404: SchemaRegistryErrors[40450],
          },
        },
        config: {
          get: {
            method: 'GET',
            path: '/:name/config',
            summary: 'Gets the configurations of the schema exporter.',
            pathParams: z.object({
              name: z.string(),
            }),
            responses: {
              200: ExporterConfig,
              404: SchemaRegistryErrors[40450],
            },
          },
          put: {
            method: 'PUT',
            path: '/:name/config',
            summary: 'Updates the configurations of the schema exporter.',
            pathParams: z.object({
              name: z.string(),
            }),
            body: ExporterConfig,
            responses: {
              200: z.object({
                name: z.string(),
              }),
              404: SchemaRegistryErrors[40450],
              409: SchemaRegistryErrors[40963],
            },
          },
        },
        status: {
          get: {
            method: 'GET',
            path: '/:name/status',
            summary: 'Gets the status of the schema exporter.',
            pathParams: z.object({
              name: z.string(),
            }),
            responses: {
              200: ExporterStatus,
              404: SchemaRegistryErrors[40450],
            },
          },
        },
        pause: {
          put: {
            method: 'PUT',
            path: '/:name/pause',
            summary: 'Pauses the schema exporter.',
            pathParams: z.object({
              name: z.string(),
            }),
            body: z.undefined(),
            responses: {
              200: z.object({
                name: z.string(),
              }),
              404: SchemaRegistryErrors[40450],
              409: SchemaRegistryErrors[40962],
            },
          },
        },
        reset: {
          put: {
            method: 'PUT',
            path: '/:name/reset',
            summary: 'Resets the schema exporter.',
            pathParams: z.object({
              name: z.string(),
            }),
            body: z.undefined(),
            responses: {
              200: z.object({
                name: z.string(),
              }),
              404: SchemaRegistryErrors[40450],
              409: SchemaRegistryErrors[40963],
            },
          },
        },
        resume: {
          method: 'PUT',
          path: '/:name/resume',
          summary: 'Resumes the schema exporter.',
          pathParams: z.object({
            name: z.string(),
          }),
          body: z.undefined(),
          responses: {
            200: z.object({
              name: z.string(),
            }),
            404: SchemaRegistryErrors[40450],
            409: SchemaRegistryErrors[40961],
          },
        },
      },
    },
    {
      pathPrefix: '/exporters',
    },
  );
}

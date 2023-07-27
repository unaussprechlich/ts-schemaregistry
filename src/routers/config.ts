import { initContract } from '@ts-rest/core';
import * as z from 'zod';
import { PathParams, ConfluentError, Compatability } from '../types';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      put: {
        method: 'PUT',
        path: '',
        summary: 'Update global compatibility level.',
        body: z.object({
          compatibility: Compatability,
        }),
        responses: {
          200: z.object({
            compatibility: Compatability,
          }),
          422: ConfluentError[42203],
          500: z.union([ConfluentError[50001], ConfluentError[50003]]),
        },
      },
      get: {
        method: 'GET',
        path: '',
        summary: 'Get global compatibility level.',
        responses: {
          200: z.object({
            compatibility: Compatability,
          }),
          500: ConfluentError[50001],
        },
      },
      subject: {
        put: {
          method: 'PUT',
          path: '/:subject',
          summary: 'Update compatibility level for the specified subject. ',
          pathParams: z.object({
            subject: PathParams.SUBJECT,
          }),
          query: z.object({
            verbose: z.boolean().optional(),
          }),
          body: z.object({
            compatibility: Compatability,
          }),
          responses: {
            200: z.object({
              compatibility: Compatability,
            }),
            422: ConfluentError[42203],
            500: z.union([ConfluentError[50001], ConfluentError[50003]]),
          },
        },
        get: {
          method: 'GET',
          path: '/:subject',
          summary: 'Get compatibility level for a subject.',
          pathParams: z.object({
            subject: PathParams.SUBJECT,
          }),
          query: z.object({
            defaultToGlobal: z.boolean().optional(),
          }),
          responses: {
            200: z.object({
              compatibility: Compatability,
            }),
            404: ConfluentError[40401],
            500: ConfluentError[50001],
          },
        },
        delete: {
          method: 'DELETE',
          path: '/:subject',
          summary: 'Get compatibility level for a subject.',
          pathParams: z.object({
            subject: PathParams.SUBJECT,
          }),
          body: z.undefined(),
          responses: {
            200: z.object({
              compatibility: Compatability,
            }),
            404: ConfluentError[40401],
            500: ConfluentError[50001],
          },
        },
      },
    },
    {
      pathPrefix: '/config',
    },
  );
}

import { initContract } from '@ts-rest/core';
import * as z from 'zod';

export default function (c: ReturnType<typeof initContract>) {
  return c.router(
    {
      get: {
        method: 'GET',
        path: '',
        summary: 'Gets a list of contexts.',
        responses: {
          200: z.array(z.string()),
        },
      },
    },
    {
      pathPrefix: '/contexts',
    },
  );
}

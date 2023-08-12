import { initContract } from '@ts-rest/core';
import schemas from './routers/schemas';
import subjects from './routers/subjects';
import mode from './routers/mode';
import compatability from './routers/compatability';
import exporters from './routers/exporters';
import config from './routers/config';
import contexts from './routers/contexts';

const c = initContract();

export const SchemaRegistryContract: {
  schemas: ReturnType<typeof schemas>;
  subjects: ReturnType<typeof subjects>;
  mode: ReturnType<typeof mode>;
  compatability: ReturnType<typeof compatability>;
  config: ReturnType<typeof config>;
  exporters: ReturnType<typeof exporters>;
  contexts: ReturnType<typeof contexts>;
} = c.router(
  {
    schemas: schemas(c),
    subjects: subjects(c),
    mode: mode(c),
    compatability: compatability(c),
    config: config(c),
    exporters: exporters(c),
    contexts: contexts(c),
  },
  {},
);

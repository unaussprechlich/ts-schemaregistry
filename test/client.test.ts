import { assert, describe, expect, it } from 'vitest';
import { SchemaRegistryApi } from '../lib';

const registry = new SchemaRegistryApi({
  baseUrl: 'http://localhost:8081',
});

const TEST_SUBJECT = 'my-test-subject';
const TEST_SCHEMA = {
  schema: `{
       "type": "record",
       "name": "test",
       "fields":
         [
           {
             "type": "string",
             "name": "field1"
           }
          ]
     }`,
  schemaType: 'AVRO',
  references: [],
};

describe('Test: ConfluentSchemaRegistryAdapter.ts', () => {
  it('GET /ids/:id', async () => {
    const result = await registry.client.schemas.ids.id.get({
      params: { id: 1 },
    });

    assert.equal(result.status, 200);

    if (result.status === 200) {
      expect(result.body).toBeTypeOf('string');
    }
  });

  it('GET /schemas/types', async () => {
    const result = await registry.client.schemas.types.get();

    assert.equal(result.status, 200);

    if (result.status === 200) {
      expect(result.body).toStrictEqual(['JSON', 'PROTOBUF', 'AVRO']);
    }
  });

  it('POST /subjects/:subject/versions', async () => {
    const result = await registry.client.subjects.subject.versions.post({
      params: { subject: TEST_SUBJECT },
      body: TEST_SCHEMA,
    });

    expect(result.status).toBe(200);

    if (result.status === 200) {
      expect(result.body.id).toBeTypeOf('number');
    }
  });

  it('GET /subjects', async () => {
    const result = await registry.client.subjects.get();

    expect(result.status).toBe(200);

    if (result.status === 200) {
      expect(result.body).toContain(TEST_SUBJECT);
    } else if (result.status === 500) {
      result.body.error_code;
    }
  });

  it('GET /subjects/:subject/versions', async () => {
    const result = await registry.client.subjects.subject.versions.get({
      params: { subject: TEST_SUBJECT },
    });

    expect(result.status).toBe(200);

    if (result.status === 200) {
      expect(result.body).toContain(1);
    }
  });
});

![npm badge](https://img.shields.io/npm/v/ts-schemaregistry.svg)

# ts-schemaregistry

is a fully typed REST API client for the [confluent-schema-registry](https://github.com/kafkajs/confluent-schema-registry). It enables seamless interaction with the Confluent Schema Registry service using TypeScript. Build with [zod](https://github.com/colinhacks/zod), [ts-rest](https://github.com/ts-rest/ts-rest), and [axios](https://github.com/axios/axios).

### Features
- Type-safe API interactions with the Confluent Schema Registry.
- Validation of request and response payloads using Zod schemas.
- Simple and easy-to-use interface for managing schemas.
- Built-in confluent errors for easy error handling.

### Usage
```typescript
import { SchemaRegistryClient } from 'ts-schemaregistry';

const registry = new SchemaRegistryClient({
  baseUrl: 'http://localhost:8081',
});

const result = await registry.client.subjects.get();

if(result.status === 200) {// result.body as z.array(z.string)
  console.log(result.body) // ['subject1', 'subject2', ...]
} else if(result.status === 404) { // result.body as SchemaRegistryErrors[40401]
  console.log(result.body) // { errorCode: 40401, message: 'Subject not found.' }
}
```

### Future Work
- Bundling & Polishing & Testing
- Extend types for Metadata, Rules, and Raw Schemas

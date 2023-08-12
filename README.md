![npm badge](https://img.shields.io/npm/v/ts-schemaregistry.svg)

# ts-schemaregistry

is a fully typed REST API client for the [confluent-schema-registry](https://github.com/kafkajs/confluent-schema-registry). It enables seamless interaction with the Confluent Schema Registry service using TypeScript. Build with [zod](https://github.com/colinhacks/zod), [ts-rest](https://github.com/ts-rest/ts-rest), and [axios](https://github.com/axios/axios).

### Features
- Type-safe API interactions with the Confluent Schema Registry.
- Validation of request and response payloads using Zod schemas.
- Simple and easy-to-use interface for managing schemas.
- Built-in confluent errors for easy error handling.

### Usage
Create the client using the SchemaRegistryClient class. This class exposes the complete and type-safe API and API-contract of the Confluent Schema Registry. 
```typescript
import { SchemaRegistryClient } from 'ts-schemaregistry';

const registry = new SchemaRegistryClient({
  baseUrl: 'http://localhost:8081',
});
```
A simple get request to list all subjects can be done like this. The result is typed with statuscodes and response bodies. Therefore, the type can be narrowed down by checking the statuscode.
```typescript
const result = await registry.client
    .subjects.get();

if(result.status === 200) {// result.body as z.array(z.string)
  console.log(result.body) // ['subject1', 'subject2', ...]
} else if(result.status === 404) { // result.body as SchemaRegistryErrors[40401]
  console.log(result.body) // { errorCode: 40401, message: 'Subject not found.' }
}
```

The type of the request and response can be inferred from the API-contract.
```typescript
const request: SchemaRegistryClientInferRequest<
    typeof this.registry.contract
        .subjects.subject.versions.version.get
> = {
    params: { 
        subject: subjectName, 
        version: version 
    },
};

const result = await this.registry.client
    .subjects.subject.versions.version.get(request);

if(result.status === 200) { 
    // Do something with result.body
} else if(result.status === 404) {
    //Throw a built-in ConfluentError with the request and response
    throw new ConfluentError(
        this.registry.contract
            .subjects.subject.versions.version.get,
        request,
        response,
    );
}
```

### Future Work v1
- Bundling & Polishing & Documenting & Testing
- Extend types for Metadata, Rules, and Raw Schemas

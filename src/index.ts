export * from './SchemaRegistryClient';
export * from './SchemaRegistryContract';
export * from './SchemaRegistryErrors';
import * as SchemaRegistryTypes from './types';
import {
  ClientInferRequest as SchemaRegistryClientInferRequest,
  ClientInferResponses as SchemaRegistryClientInferResponses,
  ClientInferResponseBody as SchemaRegistryClientInferResponseBody,
} from '@ts-rest/core';

export {
  SchemaRegistryTypes,
  SchemaRegistryClientInferRequest,
  SchemaRegistryClientInferResponses,
  SchemaRegistryClientInferResponseBody,
};

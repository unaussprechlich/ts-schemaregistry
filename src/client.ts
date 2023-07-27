import { initClient } from '@ts-rest/core';
import { Contract } from './contract';
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';

export function Client(config: { baseUrl: string; baseHeaders?: object }) {
  return initClient(Contract, {
    baseUrl: config.baseUrl,
    baseHeaders: {
      'Content-Type': 'application/vnd.schemaregistry.v1+json',
      'User-Agent': 'ts-rest-confluent-schema-registry',
      ...config?.baseHeaders,
    },
    api: async (args) => {
      try {
        const response = await axios.request({
          method: args.method,
          url: args.path,
          headers: args.headers,
          data: args.body,
        });

        return {
          status: response.status,
          body: response.data,
          headers: response.headers,
        };
      } catch (e: Error | AxiosError | unknown) {
        if (isAxiosError(e)) {
          const error = e as AxiosError;
          const response = error.response as AxiosResponse;
          return {
            status: response.status,
            body: response.data,
            headers: response.headers,
          };
        }
        throw e;
      }
    },
  });
}

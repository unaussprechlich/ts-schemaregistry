import {
  ApiFetcherArgs,
  initClient,
  InitClientArgs,
  InitClientReturn,
} from '@ts-rest/core';
import { SchemaRegistryContract } from './SchemaRegistryContract';
import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';

export type SchemaRegistryClientConfig = {
  baseUrl: string;
  baseHeaders?: Record<string, string>;
  credentials?: RequestCredentials;
  jsonQuery?: boolean;
  /**
   * Ensures that the responses from the server match those defined in the
   * contract.
   */
  throwOnUnknownStatus?: boolean;
};

const defaultConfig: Pick<InitClientArgs, 'baseHeaders'> = {
  baseHeaders: {
    'Content-Type': 'application/vnd.schemaregistry.v1+json',
    'User-Agent': 'ts-rest-confluent-schema-registry',
  },
};

type Router = typeof SchemaRegistryContract;

export class SchemaRegistryApi<
  Config extends SchemaRegistryClientConfig = SchemaRegistryClientConfig,
> {
  readonly client: InitClientReturn<Router, typeof defaultConfig & Config>;
  readonly contract: Router = SchemaRegistryContract;

  constructor(config: Config) {
    this.client = initClient<Router, typeof defaultConfig & Config>(
      SchemaRegistryContract,
      {
        ...config,
        ...defaultConfig,
        baseHeaders: {
          ...defaultConfig.baseHeaders,
          ...config.baseHeaders,
        },
        api: this.api,
      },
    );
  }

  protected async api(args: ApiFetcherArgs): Promise<{
    status: number;
    body: unknown;
    headers: Headers;
  }> {
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
        headers: response.headers as unknown as Headers,
      };
    } catch (e: Error | AxiosError | unknown) {
      if (isAxiosError(e)) {
        const error = e as AxiosError;
        const response = error.response as AxiosResponse;
        return {
          status: response.status,
          body: response.data,
          headers: response.headers as unknown as Headers,
        };
      }
      throw e;
    }
  }
}

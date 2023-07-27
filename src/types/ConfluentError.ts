import * as z from 'zod';

export const ConfluentError = {
  create: create,
  //404
  40401: create(40401, 'Subject not found'),
  40402: create(40402, 'Version not found'),
  40403: create(40403, 'Schema not found'),
  40450: create(40450, 'Exporter not found'),

  //409
  409: create(409, 'Incompatible schema'),
  40950: create(40950, 'Missing or invalid exporter name'),
  40951: create(40951, 'Missing or invalid exporter config'),
  40952: create(40952, 'Invalid exporter subjects'),
  40960: create(40960, 'Exporter already exists'),
  40961: create(40961, 'Exporter already running'),
  40962: create(40962, 'Exporter already starting'),
  40963: create(40963, 'Exporter not paused'),
  40964: create(40964, 'Too many exporters'),

  //422
  42201: create(42201, 'Invalid schema'),
  42202: create(42202, 'Invalid version'),
  42203: create(42203, 'Invalid compatibility level'),
  42204: create(42204, 'Invalid mode'),

  //500
  50001: create(50001, 'Error in the backend datastore'),
  50002: create(50002, 'Operation timed out'),
  50003: create(50003, 'Error while forwarding the request to the primary'),
};

export function create(code: number, message: string) {
  return z.object({
    error_code: z.literal(code),
    message: z.literal(message),
  });
}

import { z } from 'zod';
import { ContextType } from './Context';

export const ExporterConfig = z.record(z.string());

export const Exporter = z.object({
  name: z.string(),
  contextType: ContextType,
  subjects: z.array(z.string()),
  subjectRenameFormat: z.string(),
  config: ExporterConfig,
});

export const ExporterStates = {
  STARTING: z.literal('STARTING'),
  RUNNING: z.literal('RUNNING'),
  PAUSED: z.literal('PAUSED'),
};

export const ExporterState = z.union([
  ExporterStates.STARTING,
  ExporterStates.RUNNING,
  ExporterStates.PAUSED,
]);

export const ExporterStatus = z.object({
  name: z.string(),
  state: ExporterState,
  offset: z.bigint(),
  ts: z.bigint(),
  trace: z.string(),
});

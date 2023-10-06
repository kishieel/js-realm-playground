import { BindingDefinition, ExchangeDefinition, QueueDefinition } from '@app/messaging/topology/topology.types';

export type ExchangeDiffRecord = { record: 'exchange' } & ExchangeDefinition;
export type QueueDiffRecord = { record: 'queue' } & QueueDefinition;
export type BindingDiffRecord = { record: 'binding' } & BindingDefinition;

export type DiffRecord = ExchangeDiffRecord | QueueDiffRecord | BindingDiffRecord;

export type DiffTopology = {
    additions: DiffRecord[];
    deletions: DiffRecord[];
};

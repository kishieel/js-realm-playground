import { TopologyDefinition } from '@app/messaging/topology/topology.types';

export abstract class TopologyBuilder {
    abstract assertTopology(topology: TopologyDefinition): Promise<void>;
}

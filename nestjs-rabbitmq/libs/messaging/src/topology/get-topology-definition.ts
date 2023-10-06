import { TopologyDefinition } from '@app/messaging/topology/topology.types';
import { Queue } from '@app/messaging';
import { EventType } from '@app/messaging/events/event-type.enum';
import { eventRouter } from '@app/messaging/routing/event-router.map';

export const getTopologyDefinition = (): TopologyDefinition => {
    return {
        exchanges: Object.values(EventType).map((name) => ({
            vhost: '/',
            name: name,
            type: 'direct',
            auto_delete: false,
            durable: true,
            internal: false,
        })),
        queues: Object.values(Queue).map((name) => ({
            vhost: '/',
            name: name,
            type: 'classic',
            auto_delete: false,
            durable: true,
            exclusive: false,
        })),
        bindings: Array.from(eventRouter.entries()).flatMap(([source, queues]) =>
            queues.map((queue) => ({
                vhost: '/',
                source: source,
                destination: queue,
                destination_type: 'queue',
                routing_key: source,
            })),
        ),
    };
};

import { BindingDefinition, ExchangeDefinition, QueueDefinition } from '@app/messaging/topology/topology.types';

export const exchangeEquals = (a: ExchangeDefinition, b: ExchangeDefinition) => {
    return (
        a.vhost === b.vhost &&
        a.name === b.name &&
        a.type === b.type &&
        a.durable === b.durable &&
        a.internal === b.internal &&
        a.auto_delete === b.auto_delete
    );
};

export const queueEquals = (a: QueueDefinition, b: QueueDefinition) => {
    return (
        a.vhost === b.vhost &&
        a.name === b.name &&
        a.type === b.type &&
        a.durable === b.durable &&
        a.exclusive === b.exclusive &&
        a.auto_delete === b.auto_delete
    );
};

export const bindingEquals = (a: BindingDefinition, b: BindingDefinition) => {
    return (
        a.vhost === b.vhost &&
        a.source === b.source &&
        a.destination === b.destination &&
        a.destination_type === b.destination_type &&
        a.routing_key === b.routing_key
    );
};

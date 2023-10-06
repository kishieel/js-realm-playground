export type ArgumentsDefinition = {
    [key: string]: string | number | boolean | ArgumentsDefinition;
};

export type ExchangeDefinition = {
    vhost: string;
    name: string;
    type: 'topic' | 'direct' | 'fanout' | 'headers';
    auto_delete?: boolean;
    durable?: boolean;
    internal?: boolean;
    arguments?: ArgumentsDefinition;
};

export type QueueDefinition = {
    vhost: string;
    name: string;
    type: 'classic' | 'quorum';
    auto_delete?: boolean;
    durable?: boolean;
    exclusive?: boolean;
    arguments?: ArgumentsDefinition;
};

export type BindingDefinition = {
    vhost: string;
    source: string;
    destination: string;
    destination_type: 'queue' | 'exchange';
    routing_key?: string;
    arguments?: ArgumentsDefinition;
};

export type TopologyDefinition = {
    exchanges: ExchangeDefinition[];
    queues: QueueDefinition[];
    bindings: BindingDefinition[];
};

export const ExchangesPath = '/exchanges';
export const QueuesPath = '/queues';
export const BindingsPath = '/bindings';
export type RabbitPath = typeof ExchangesPath | typeof QueuesPath | typeof BindingsPath;

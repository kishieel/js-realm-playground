import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { TopologyBuilder } from '@app/messaging/topology/topology.builder';
import { TopologyDefinition } from '@app/messaging/topology/topology.types';
import { RabbitService } from '../rabbit/rabbit.service';
import { BindingDiffRecord, DiffRecord, DiffTopology, ExchangeDiffRecord, QueueDiffRecord } from './topology.types';
import { AmqpConnectionManager, ChannelWrapper, connect } from 'amqp-connection-manager';
import { bindingEquals, exchangeEquals, queueEquals } from '@app/messaging/topology/utils';
import { RabbitConfig, RabbitConfigKey } from '../config/rabbit.config';

@Injectable()
export class TopologyService implements TopologyBuilder, OnModuleDestroy {
    private readonly PurifyExchanges = [
        '',
        'amq.direct',
        'amq.fanout',
        'amq.topic',
        'amq.headers',
        'amq.match',
        'amq.rabbitmq.trace',
    ];
    private readonly PurifyQueue = [];
    private readonly PurifyBinding = [''];
    private connection?: AmqpConnectionManager;
    private channel?: ChannelWrapper;

    constructor(
        private readonly rabbitService: RabbitService,
        @Inject(RabbitConfigKey)
        private readonly rabbitConfig: RabbitConfig,
    ) {}

    async connect() {
        this.connection = await connect(this.rabbitConfig.rmqUrl);
        this.channel = await this.connection.createChannel();
        await this.channel.waitForConnect();
    }

    async onModuleDestroy() {
        await this.connection?.close();
        await this.channel?.close();
    }

    async assertTopology(expectedTopology: TopologyDefinition): Promise<void> {
        await this.connect();
        const actualTopology = await this.getActualTopology();
        const purifiedTopology = await this.getPurifiedTopology(actualTopology);
        const { additions, deletions } = await this.diffTopology(purifiedTopology, expectedTopology);
        await this.handleDeletions(deletions);
        await this.handleAdditions(additions);
    }

    private async getActualTopology(): Promise<TopologyDefinition> {
        const [exchanges, queues, bindings] = await Promise.all([
            this.rabbitService.getExchanges(),
            this.rabbitService.getQueues(),
            this.rabbitService.getBindings(),
        ]);

        return { exchanges, queues, bindings };
    }

    private async getPurifiedTopology(topology: TopologyDefinition): Promise<TopologyDefinition> {
        const { exchanges, queues, bindings } = topology;

        return {
            exchanges: exchanges.filter(({ name }) => !this.PurifyExchanges.includes(name)),
            queues: queues.filter(({ name }) => !this.PurifyQueue.includes(name)),
            bindings: bindings.filter(({ source }) => !this.PurifyBinding.includes(source)),
        };
    }

    private async diffTopology(
        actualTopology: TopologyDefinition,
        expectedTopology: TopologyDefinition,
    ): Promise<DiffTopology> {
        const additions: DiffRecord[] = [];
        const deletions: DiffRecord[] = [];

        const diff = <T extends 'exchange' | 'queue' | 'binding'>(
            record: T,
            actual: T extends 'exchange'
                ? TopologyDefinition['exchanges']
                : T extends 'queue'
                ? TopologyDefinition['queues']
                : T extends 'binding'
                ? TopologyDefinition['bindings']
                : never,
            expected: T extends 'exchange'
                ? TopologyDefinition['exchanges']
                : T extends 'queue'
                ? TopologyDefinition['queues']
                : T extends 'binding'
                ? TopologyDefinition['bindings']
                : never,
            equal,
        ) => {
            actual.forEach((actual) => {
                const found = !!expected.find((expected) => equal(expected, actual));
                if (!found) deletions.push({ record, ...actual });
            });

            expected.forEach((expected) => {
                const found = !!actual.find((actual) => equal(actual, expected));
                if (!found) additions.push({ record, ...expected });
            });
        };

        diff('exchange', actualTopology.exchanges, expectedTopology.exchanges, exchangeEquals);
        diff('queue', actualTopology.queues, expectedTopology.queues, queueEquals);
        diff('binding', actualTopology.bindings, expectedTopology.bindings, bindingEquals);

        return { additions, deletions };
    }

    private async handleDeletions(deletions: DiffRecord[]) {
        const actions: Record<DiffRecord['record'], (deletion: DiffRecord) => Promise<any>> = {
            exchange: (deletion: ExchangeDiffRecord) => this.channel.deleteExchange(deletion.name),
            queue: (deletion: QueueDiffRecord) => this.channel.deleteQueue(deletion.name),
            binding: (deletion: BindingDiffRecord) => {
                if (deletion.destination_type === 'queue') {
                    return this.channel.unbindQueue(deletion.destination, deletion.source, deletion.routing_key);
                } else {
                    return this.channel.unbindExchange(deletion.destination, deletion.source, deletion.routing_key);
                }
            },
        };

        const promises = deletions.map((deletion) => actions[deletion.record](deletion));
        await Promise.all(promises);
    }

    private async handleAdditions(additions: DiffRecord[]) {
        const actions: Record<DiffRecord['record'], (addition: DiffRecord) => Promise<any>> = {
            exchange: (addition: ExchangeDiffRecord) => {
                const { record, name, type, ...options } = addition;
                return this.channel.assertExchange(name, type, options);
            },
            queue: (addition: QueueDiffRecord) => {
                const { record, name, ...options } = addition;
                return this.channel.assertQueue(name, options);
            },
            binding: (addition: BindingDiffRecord) => {
                const { destination, source, routing_key, destination_type, arguments: args } = addition;
                if (destination_type === 'queue') return this.channel.bindQueue(destination, source, routing_key, args);
                else return this.channel.bindExchange(destination, source, routing_key, args);
            },
        };

        const promises = additions.map((addition) => actions[addition.record](addition));
        await Promise.all(promises);
    }
}

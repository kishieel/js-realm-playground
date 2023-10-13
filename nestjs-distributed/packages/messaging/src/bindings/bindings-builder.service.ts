import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as deepEqual from 'fast-deep-equal/es6';
import { firstValueFrom } from 'rxjs';
import { BindingsOptionsToken } from '@lib/bindings/bindings.consts';
import { BindingsOptions } from '@lib/bindings/bindings.options';
import { HandlersDiscoveryService } from '@lib/bindings/handlers-discovery.service';
import { BindingDefinition } from '@lib/bindings/amqp-definitions.types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BindingsBuilderService implements OnModuleInit {
    private readonly logger = new Logger(BindingsBuilderService.name);
    private readonly httpUrl: string;
    private readonly eventbus: string;
    private readonly queue: string;

    constructor(
        @Inject(BindingsOptionsToken)
        private readonly options: BindingsOptions,
        private readonly httpService: HttpService,
        private readonly handlersDiscoveryService: HandlersDiscoveryService,
    ) {
        this.httpUrl = this.options.httpUrl;
        this.eventbus = this.options.eventbus;
        this.queue = this.options.queue;
    }

    onModuleInit = this.setup;

    async setup() {
        const [actualBindings, expectedBindings] = await Promise.all([
            this.getActualBindings(),
            this.getExpectedBindings(),
        ]);

        actualBindings
            .filter((a) => expectedBindings.some((b) => deepEqual(a, b)))
            .forEach((binding) => {
                const message = `Mapped {${this.eventbus} -> ${binding.routing_key} -> ${this.queue}} binding`;
                this.logger.log(message);
            });

        const toRemove = actualBindings.filter((a) => !expectedBindings.some((b) => deepEqual(a, b)));
        const toCreate = expectedBindings.filter((a) => !actualBindings.some((b) => deepEqual(a, b)));

        await this.removeBinding(toRemove);
        await this.createBinding(toCreate);
    }

    async getActualBindings() {
        const url = `${this.httpUrl}/api/bindings/%2f/e/${this.eventbus}/q/${this.queue}`;
        const response = await firstValueFrom(this.httpService.get<BindingDefinition[]>(url));
        return response.data;
    }

    async getExpectedBindings() {
        const handlers = await this.handlersDiscoveryService.getHandlers();
        const bindings: BindingDefinition[] = Array.from(handlers.entries())
            .filter(([_, handler]) => handler.isEventHandler)
            .map(([pattern]) => ({
                source: this.eventbus,
                vhost: '/',
                destination: this.queue,
                destination_type: 'queue',
                routing_key: pattern,
                properties_key: pattern,
                arguments: {},
            }));
        return bindings;
    }

    async removeBinding(toRemove: BindingDefinition[]) {
        const url = (p: string) => `${this.httpUrl}/api/bindings/%2f/e/${this.eventbus}/q/${this.queue}/${p}`;
        await Promise.all(
            toRemove.map((binding) => {
                const message = `Removing {${this.eventbus} -> ${binding.routing_key} -> ${this.queue}} binding`;
                this.logger.log(message);
                return firstValueFrom(this.httpService.delete(url(binding.properties_key)));
            }),
        );
    }

    async createBinding(toCreate: BindingDefinition[]) {
        const url = `${this.httpUrl}/api/bindings/%2f/e/${this.eventbus}/q/${this.queue}`;
        await Promise.all(
            toCreate.map((binding) => {
                const message = `Creating {${this.eventbus} -> ${binding.routing_key} -> ${this.queue}} binding`;
                this.logger.log(message);
                return firstValueFrom(this.httpService.post(url, { routing_key: binding.routing_key }));
            }),
        );
    }
}

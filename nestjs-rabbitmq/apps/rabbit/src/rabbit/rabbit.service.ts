import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BindingsPath, ExchangesPath, QueuesPath, RabbitPath } from './rabbit.consts';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { BindingDefinition, ExchangeDefinition, QueueDefinition } from '@app/messaging/topology/topology.types';

@Injectable()
export class RabbitService {
    private readonly logger = new Logger(RabbitService.name);

    constructor(private readonly httpService: HttpService) {}

    async getExchanges(): Promise<ExchangeDefinition[]> {
        const data = await this.request(ExchangesPath);

        return data.map((data) => ({
            vhost: data.vhost,
            name: data.name,
            type: data.type,
            auto_delete: data.auto_delete,
            durable: data.durable,
            internal: data.internal,
            arguments: data.arguments,
        }));
    }

    async getQueues(): Promise<QueueDefinition[]> {
        const data = await this.request(QueuesPath);
        return data.map((data) => ({
            vhost: data.vhost,
            name: data.name,
            type: data.type,
            auto_delete: data.auto_delete,
            durable: data.durable,
            exclusive: data.exclusive,
            arguments: data.arguments,
        }));
    }

    async getBindings(): Promise<BindingDefinition[]> {
        const data = await this.request(BindingsPath);
        return data.map((data) => ({
            vhost: data.vhost,
            source: data.source,
            destination: data.destination,
            destination_type: data.destination_type,
            routing_key: data.routing_key,
            arguments: data.arguments,
        }));
    }

    private async request(path: RabbitPath) {
        const { data } = await firstValueFrom(
            this.httpService.get(path).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw error;
                }),
            ),
        );

        return data;
    }
}

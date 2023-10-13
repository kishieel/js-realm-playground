import { MessageHandler } from '@nestjs/microservices';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Controller } from '@nestjs/common/interfaces';
import { Injectable } from '@nestjs/common';
import { ListenerMetadataExplorer } from '@nestjs/microservices/listener-metadata-explorer';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';

@Injectable()
export class HandlersDiscoveryService {
    private readonly metadataExplorer = new ListenerMetadataExplorer(new MetadataScanner());

    constructor(private readonly discoveryService: DiscoveryService) {}

    async getHandlers() {
        const handlers = new Map<string, MessageHandler>();

        const controllers: InstanceWrapper<Controller>[] = this.discoveryService.getControllers();
        controllers.forEach((controller) => {
            const patternHandlers = this.metadataExplorer.explore(controller.instance);
            patternHandlers
                .flatMap(({ patterns, targetCallback, isEventHandler, extras }) =>
                    patterns.map((pattern) => ({ pattern, callback: targetCallback, isEventHandler, extras })),
                )
                .forEach(({ pattern, callback, isEventHandler, extras }) => {
                    callback['isEventHandler'] = isEventHandler;
                    callback['extras'] = extras;
                    handlers.set(pattern.toString(), callback);
                });
        });

        return handlers;
    }
}

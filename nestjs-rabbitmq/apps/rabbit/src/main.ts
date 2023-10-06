import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TopologyService } from './topology/topology.service';
import { getTopologyDefinition } from '@app/messaging/topology/get-topology-definition';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule);
    const topologyService = app.get(TopologyService);
    await topologyService.assertTopology(getTopologyDefinition());
    await app.listen();
}

bootstrap();

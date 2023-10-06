import { Module } from '@nestjs/common';
import { TopologyService } from './topology.service';
import { RabbitModule } from '../rabbit/rabbit.module';

@Module({
    imports: [RabbitModule],
    providers: [TopologyService],
})
export class TopologyModule {}

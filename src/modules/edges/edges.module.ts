import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';
import { Edge } from './entities/edge.entity';
import { EdgesController } from './edges.controller';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';

@Module({
  controllers: [EdgesController],
  imports: [
    TypeOrmModule.forFeature([Edge]),
    RabbitMQModule.register({
        name: 'user'
    })
  ],
  providers: [EdgesService, EdgesResolver],
})
export class EdgesModule {}

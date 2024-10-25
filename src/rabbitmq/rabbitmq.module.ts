import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';

interface RabbitMQModuleOptions {
  name: string;
}

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService]
})
export class RabbitMQModule {
  static register({ name }: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'RMQ_SERVICE',
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RMQ_URI')],
                queue: `${name.toLocaleLowerCase()}_queue`,
                queueOptions: {
                  durable: false
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}

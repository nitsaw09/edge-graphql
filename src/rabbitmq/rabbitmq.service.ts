import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);
  constructor(private readonly configService: ConfigService) {
    this.logger.log('RabbitMQService initialized');
  }

  getOptions(queue: string): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RMQ_URI')],
        queue: `${queue.toLowerCase()}_queue`,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
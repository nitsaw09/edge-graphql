import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({}));

  const rmqService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice(rmqService.getOptions('user'));
  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();

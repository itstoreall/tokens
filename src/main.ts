import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { getMicroserviceConfig } from './config/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpPort = configService.get('HTTP_PORT');
  const microservicePort = configService.get('MICROSERVICE_PORT');

  app.setGlobalPrefix('api');
  await app.listen(httpPort);
  console.log('HTTP port', httpPort);

  const microserviceOptions: MicroserviceOptions =
    getMicroserviceConfig(configService);

  const microserviceApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      microserviceOptions,
    );

  await microserviceApp.listen();
  console.log('Microservice port:', microservicePort);
}
bootstrap();

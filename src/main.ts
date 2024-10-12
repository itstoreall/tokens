import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as gc from './config/global';

const cfg = {
  httpPort: 'HTTP_PORT',
  microservicePort: 'MICROSERVICE_PORT',
  apiRoute: 'api',
  appMsg: 'HTTP port:',
  microserviceMsg: 'Microservice port:',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const httpPort = configService.get(cfg.httpPort);
  const microservicePort = configService.get(cfg.microservicePort);

  app.setGlobalPrefix(cfg.apiRoute);
  await app.listen(httpPort);
  console.log(cfg.appMsg, httpPort);

  const microserviceOptions: MicroserviceOptions =
    gc.getMicroserviceConfig(configService);

  const microserviceApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      microserviceOptions,
    );

  await microserviceApp.listen();
  console.log(cfg.microserviceMsg, microservicePort);
}
bootstrap();

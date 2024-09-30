import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// /* before microservices:
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(4465);
  console.log('HTTP app is listening on port', 4465);

  const microserviceApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 4466 },
    });

  await microserviceApp.listen();
  console.log('Microservice is listening on port', 4466);
}
// */

/*
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(4465);
  console.log('HTTP app is listening on port', 4465);

  const microserviceApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 4465 },
    });

  await microserviceApp.listen();
  console.log('Microservice is listening on port', 4465);
}
*/
bootstrap();

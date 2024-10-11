import { ClientOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const getMicroserviceConfig = (
  configService: ConfigService,
): ClientOptions => ({
  transport: Transport.TCP,
  options: {
    host: configService.get<string>('MICROSERVICE_HOST'),
    port: configService.get<number>('MICROSERVICE_PORT'),
  },
});

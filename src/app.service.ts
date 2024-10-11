import { Injectable } from '@nestjs/common';
import {
  ClientOptions,
  ClientProxy,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { getMicroserviceConfig } from './config/global';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private client: ClientProxy;
  private clientOptions: ClientOptions;

  constructor(private readonly configService: ConfigService) {
    this.clientOptions = getMicroserviceConfig(this.configService);
    this.client = ClientProxyFactory.create(this.clientOptions);
  }

  sendMessage() {
    this.client.emit('message', 'New order #111');
    return this.configService.get('MICROSERVICE_PORT');
  }
}

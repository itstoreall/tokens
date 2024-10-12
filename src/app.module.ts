import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TokensModule } from './tokens/tokens.module';
import { LoggerMiddleware } from './concept/logger.middleware';
import { MicroserviceModule } from './microservice/microservice.module';
import { getMicroserviceConfig } from './config/global';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokensGraphqlModule } from './tokens-graphql/tokens-graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TokensModule,
    MicroserviceModule,
    ClientsModule.registerAsync([
      {
        name: 'ORDER_MICROSERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          getMicroserviceConfig(configService),
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TokensGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tokens');
  }
}

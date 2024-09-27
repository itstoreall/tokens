import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from './tokens/tokens.module';
import { LoggerMiddleware } from './concept/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TokensModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tokens');
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokensModule } from './tokens/tokens.module';
import { LoggerMiddleware } from './concept/logger.middleware';

@Module({
  imports: [TokensModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('tokens');
  }
}

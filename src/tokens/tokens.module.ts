import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';

@Module({
  controllers: [TokensController],
  providers: [TokensService, ConfigService],
})
export class TokensModule {}

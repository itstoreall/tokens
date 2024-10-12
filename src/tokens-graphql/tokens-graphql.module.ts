import { Module } from '@nestjs/common';
import { TokensGraphqlResolver } from './tokens-graphql.resolver';
import { TokensService } from 'src/tokens/tokens.service';

@Module({
  providers: [TokensGraphqlResolver, TokensService],
})
export class TokensGraphqlModule {}

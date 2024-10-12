import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateTokenInput, TokenModel } from './token.model';
// import { TokensDto } from 'src/tokens/tokens.dto';

type TokensRes = Promise<TokenModel[]>;
type TokenRes = Promise<TokenModel>;

@Resolver()
export class TokensGraphqlResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Query(() => [TokenModel], { name: 'tokens' })
  async getAllTokens(): TokensRes {
    const reqData = await this.tokensService.getAllTokens();
    console.log('gql reqData:', reqData);
    return reqData;
  }

  @Query(() => TokenModel, { name: 'getTokenBySymbol' })
  async getTokenBySymbol(@Args('symbol') symbol: string): TokenRes {
    const token = await this.tokensService.getTokenBySymbol(symbol);
    return token;
  }

  @Mutation(() => TokenModel, { name: 'createToken' })
  async createToken(@Args('input') input: CreateTokenInput): TokenRes {
    const createTokenInput: TokenModel = { ...input };
    const createdToken = await this.tokensService.create(createTokenInput);
    return createdToken;
  }

  @Mutation(() => TokenModel, { name: 'updateTokenBySymbol' })
  async updateTokenBySymbol(
    @Args('symbol') symbol: string,
    @Args('input') input: CreateTokenInput,
  ): TokenRes {
    const updateTokenInput: TokenModel = { ...input };
    const updatedToken = await this.tokensService.updateBySymbol(
      symbol,
      updateTokenInput,
    );
    return updatedToken;
  }
}

/*
query GetTokens {
  tokens {
    price
    symbol
  }
}

query GetTokenBySymbol {
  getTokenBySymbol(symbol: "BTC") {
    symbol
    price
  }
}

mutation CreateToken {
  createToken(input: {symbol: "BTC", price: 70000}) {
    symbol
    price
  }
}

mutation UpdateToken {
  updateTokenBySymbol(symbol: "btc", input: { symbol: "btc", price: 90000.78 }) {
    symbol
    price
  }
}
*/

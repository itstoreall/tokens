import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokensDto } from './tokens.dto';

type GetAllTokens = () => Promise<TokensDto[]>;
type GetTokenBySymbol = (symbol: string) => Promise<TokensDto>;
type CreateToken = (dto: TokensDto) => Promise<TokensDto>;
type UpdateBySymbol = (symbol: string, dto: TokensDto) => Promise<TokensDto>;

const data: TokensDto[] = [
  { symbol: 'btc', price: 78000 },
  { symbol: 'eth', price: 3200 },
];

@Injectable()
export class TokensService {
  private readonly mode: string;
  private readonly mockData: TokensDto[];

  constructor(private readonly configService: ConfigService) {
    this.mode = this.configService.get<string>('MODE') || 'no_mode';
    this.mockData = data;
  }

  getAllTokens: GetAllTokens = async () => {
    console.log('** env mode:', this.mode);
    return this.mockData;
  };

  getTokenBySymbol: GetTokenBySymbol = async (symbol) => {
    console.log('** env mode:', this.mode);
    const token = this.mockData.find(
      (token) => token.symbol === symbol.toLowerCase(),
    );

    if (!token) {
      throw new Error(`Token with symbol ${symbol} not found`);
    }

    return token;
  };

  create: CreateToken = async (dto) => {
    console.log('** env mode:', this.mode);
    console.log('** service dto:', dto);
    return dto;
  };

  updateBySymbol: UpdateBySymbol = async (symbol, dto) => {
    console.log('** env mode:', this.mode);
    const tokenIndex = this.mockData.findIndex(
      (token) => token.symbol === symbol.toLowerCase(),
    );

    if (tokenIndex === -1) {
      throw new Error(`Token with symbol ${symbol} not found`);
    }

    this.mockData[tokenIndex] = { ...this.mockData[tokenIndex], ...dto };
    return this.mockData[tokenIndex];
  };
}

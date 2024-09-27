import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTokensDto } from './tokens.dto';

type Token = {
  symbol: string;
  price: number;
};

const data: Token[] = [
  { symbol: 'btc', price: 78000 },
  { symbol: 'eth', price: 3200 },
];

@Injectable()
export class TokensService {
  private readonly mode: string;
  private readonly mockData: Token[];

  constructor(private readonly configService: ConfigService) {
    this.mode = this.configService.get<string>('MODE') || 'no_mode';
    this.mockData = data;
  }

  findAll(): Token[] {
    console.log('** env mode:', this.mode);
    return this.mockData;
  }

  create(dto: CreateTokensDto) {
    console.log('** env mode:', this.mode);
    console.log('** service dto:', dto);
    return dto;
  }
}

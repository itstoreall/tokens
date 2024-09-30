import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTokensDto } from './tokens.dto';
import * as gt from 'src/types/global';

const data: gt.Token[] = [
  { symbol: 'btc', price: 78000 },
  { symbol: 'eth', price: 3200 },
];

@Injectable()
export class TokensService {
  private readonly mode: string;
  private readonly mockData: gt.Token[];

  constructor(private readonly configService: ConfigService) {
    this.mode = this.configService.get<string>('MODE') || 'no_mode';
    this.mockData = data;
  }

  findAll(): gt.Token[] {
    console.log('** env mode:', this.mode);
    return this.mockData;
  }

  create(dto: CreateTokensDto) {
    console.log('** env mode:', this.mode);
    console.log('** service dto:', dto);
    return dto;
  }
}

import { Injectable } from '@nestjs/common';

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
  findAll(): Token[] {
    return data;
  }
}

import { IsNumber, IsString } from 'class-validator';

const errMsg = `ERROR validation:`;
const nasMsg = `is not a string!`;
const nanMsg = `is not a number!`;

export class CreateTokensDto {
  @IsString({ message: `${errMsg} Symbol ${nasMsg}` })
  symbol: string;

  @IsNumber({}, { message: `${errMsg} Price ${nanMsg}` })
  price: number;
}

export type TUpdateTokensDto = Partial<CreateTokensDto>;

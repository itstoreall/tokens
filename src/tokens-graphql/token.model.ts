import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class TokenModel {
  @Field(() => String)
  symbol: string;

  @Field(() => Float) // Int
  price: number;
}

@InputType()
export class CreateTokenInput {
  @Field()
  @IsString({ message: 'Symbol must be a valid string' })
  symbol: string;

  @Field()
  @IsNumber({}, { message: 'Price must be a valid number' })
  price: number;
}

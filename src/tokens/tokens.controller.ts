import * as common from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ParseIntPipe } from 'src/concept/parseInt.pipe';
import { AuthGuard } from 'src/concept/guard';
import { LoggingInterceptor } from 'src/concept/interceptor';
import { CreateTokensDto } from './tokens.dto';

const {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} = common;

@Controller('tokens')
@UseInterceptors(LoggingInterceptor)
export class TokensController {
  private readonly findAllMsg: string;
  private readonly reqDataMsg: string;
  private readonly createMsg: string;

  constructor(private readonly tokensService: TokensService) {
    this.findAllMsg = '* --- findAll --- id:';
    this.reqDataMsg = '* reqData:';
    this.createMsg = '* --- create ---';
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('id', ParseIntPipe) id: number) {
    console.log(this.findAllMsg, id);
    const reqData = this.tokensService.findAll();
    console.log(this.reqDataMsg, reqData);
    return reqData;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateTokensDto) {
    console.log(this.createMsg);
    return this.tokensService.create(dto);
  }
}

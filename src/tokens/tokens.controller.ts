import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ParseIntPipe } from 'src/concept/parseInt.pipe';
import { AuthGuard } from 'src/concept/guard';
import { LoggingInterceptor } from 'src/concept/interceptor';

@Controller('tokens')
@UseInterceptors(LoggingInterceptor)
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('id', ParseIntPipe) id: number) {
    console.log('id (controller):', id);

    const reqData = this.tokensService.findAll();

    console.log('reqData (controller):', reqData);

    return reqData;
  }
}

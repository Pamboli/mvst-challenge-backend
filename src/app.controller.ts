import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Ping } from './dto/ping.dto';

@ApiTags('Default')
@Controller()
export class AppController {
  @Get('ping')
  @ApiOperation({
    summary: 'Get server status',
  })
  @ApiOkResponse({ type: Ping })
  ping(): Ping {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

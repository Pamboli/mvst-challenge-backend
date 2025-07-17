import { ApiProperty } from '@nestjs/swagger';

export class Ping {
  @ApiProperty({ example: 'ok', description: 'Health status of the API' })
  status: string;

  @ApiProperty({
    example: '2025-07-14T12:34:56.000Z',
    description: 'Timestamp of the response',
  })
  timestamp: string;
}

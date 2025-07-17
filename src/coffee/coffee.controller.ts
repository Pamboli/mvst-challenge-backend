import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import {
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CoffeeListQuery,
  CoffeeSimpleDto,
  CreateCoffeeDto,
} from '../dto/coffee.dto';

@ApiTags('Coffee')
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly service: CoffeeService) {}

  @Get()
  @ApiOperation({
    summary: 'Get coffee list',
    description: 'Returns a list of available coffee items.',
  })
  @ApiOkResponse({ type: [CoffeeSimpleDto] })
  async get(@Query() query: CoffeeListQuery) {
    const coffeeList = await this.service.getCoffeeList(query.type);
    return coffeeList;
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new coffee',
  })
  @ApiOkResponse({ type: CoffeeSimpleDto })
  @ApiConflictResponse({
    description:
      'This error shows when attempting to create a coffee with an already used name',
    schema: { type: 'string', example: 'The name already exists' },
  })
  async post(@Body() request: CreateCoffeeDto) {
    const response = await this.service.createCoffee(request);
    return response;
  }
}

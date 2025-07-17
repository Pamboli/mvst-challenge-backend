import { ConflictException, Injectable } from '@nestjs/common';
import { CoffeeSimpleDto, CreateCoffeeDto } from '../dto/coffee.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { normalizeString, PRISMA_ERROR } from '../utils';
import { CoffeeType } from '@prisma/client';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getCoffeeList(type?: CoffeeType) {
    const coffees = await this.prisma.coffee.findMany({
      where: {
        type,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return coffees.map<CoffeeSimpleDto>(
      ({ modifiedAt, createdAt, ...coffee }) => coffee,
    );
  }

  async createCoffee(request: CreateCoffeeDto) {
    const normalizedName = normalizeString(request.name);

    try {
      return await this.prisma.coffee.create({
        data: { ...request, normalizedName },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT
      ) {
        throw new ConflictException('The name already exists');
      }
      throw error;
    }
  }
}

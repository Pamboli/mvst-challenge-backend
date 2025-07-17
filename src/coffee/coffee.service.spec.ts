import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { PRISMA_ERROR } from '../utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateCoffeeDto } from '../dto/coffee.dto';

describe('CoffeeService', () => {
  let service: CoffeeService;

  const mockPrisma = {
    coffee: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCoffeeList', () => {
    it('should return list of coffees without audit fields', async () => {
      const mockCoffees = [
        {
          id: 1,
          name: 'Latte',
          normalizedName: 'latte',
          createdAt: new Date(),
          modifiedAt: new Date(),
        },
      ];

      mockPrisma.coffee.findMany.mockResolvedValue(mockCoffees);

      const result = await service.getCoffeeList();

      expect(result).toEqual([
        { id: 1, name: 'Latte', normalizedName: 'latte' },
      ]);

      expect(mockPrisma.coffee.findMany).toHaveBeenCalled();
    });
  });

  describe('createCoffee', () => {
    it('should create and return a new coffee', async () => {
      const dto: CreateCoffeeDto = {
        name: 'Espresso',
        description: 'test',
        imageUrl: 'test',
        price: 100,
        type: 'ARABIC',
      };

      const createdCoffee = {
        id: 2,
        name: 'Espresso',
        normalizedName: 'espresso',
        createdAt: new Date(),
        modifiedAt: new Date(),
      };

      mockPrisma.coffee.create.mockResolvedValue(createdCoffee);

      const result = await service.createCoffee(dto);

      expect(result).toBe(createdCoffee);
      expect(mockPrisma.coffee.create).toHaveBeenCalledWith({
        data: { ...dto, normalizedName: 'espresso' },
      });
    });

    it('should throw ConflictException if name already exists', async () => {
      const dto: CreateCoffeeDto = {
        name: 'Latte',
        description: 'test',
        imageUrl: 'test',
        price: 100,
        type: 'ARABIC',
      };

      const prismaError = new PrismaClientKnownRequestError(
        'Unique constraint failed',
        { code: PRISMA_ERROR.UNIQUE_CONSTRAINT, clientVersion: '1.0' },
      );

      mockPrisma.coffee.create.mockRejectedValue(prismaError);

      await expect(service.createCoffee(dto)).rejects.toThrow(
        ConflictException,
      );

      expect(mockPrisma.coffee.create).toHaveBeenCalled();
    });
  });
});

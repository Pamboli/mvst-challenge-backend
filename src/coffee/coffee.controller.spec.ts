import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from 'src/dto/coffee.dto';

describe('CoffeeController', () => {
  let controller: CoffeeController;
  let service: CoffeeService;

  const mockCoffeeList = [
    { id: 1, name: 'Espresso' },
    { id: 2, name: 'Latte' },
  ];

  const mockCreatedCoffee = {
    id: 3,
    name: 'Cappuccino',
  };

  const mockService = {
    getCoffeeList: jest.fn().mockResolvedValue(mockCoffeeList),
    createCoffee: jest.fn().mockResolvedValue(mockCreatedCoffee),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeController],
      providers: [{ provide: CoffeeService, useValue: mockService }],
    }).compile();

    controller = module.get<CoffeeController>(CoffeeController);
    service = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return a list of coffee items', async () => {
      const result = await controller.get({});
      expect(result).toEqual(mockCoffeeList);
      expect(service.getCoffeeList).toHaveBeenCalled();
    });
  });

  describe('post', () => {
    it('should create and return a new coffee item', async () => {
      const dto: CreateCoffeeDto = {
        name: 'Cappuccino',
        description: 'test',
        imageUrl: 'test',
        price: 1000,
        type: 'ARABIC',
      };

      const result = await controller.post(dto);

      expect(result).toEqual(mockCreatedCoffee);
      expect(service.createCoffee).toHaveBeenCalledWith(dto);
    });

    it('should throw conflict if name already exists', async () => {
      const dto: CreateCoffeeDto = {
        name: 'Espresso',
        description: 'test',
        imageUrl: 'test',
        price: 1000,
        type: 'ARABIC',
      };

      const error = new Error('The name already exists');
      mockService.createCoffee.mockRejectedValueOnce(error);

      await expect(controller.post(dto)).rejects.toThrow(
        'The name already exists',
      );

      expect(service.createCoffee).toHaveBeenCalledWith(dto);
    });
  });
});

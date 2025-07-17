import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CoffeeType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'Coffee name', example: 'Dark Roast' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Coffee description',
    example: 'Free in the MVST office',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Coffee type', enum: CoffeeType })
  @IsEnum(CoffeeType)
  type: CoffeeType;

  @ApiProperty({
    description: 'Coffee price with decimals (19.50€ -> 1950)',
    example: 1950,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Coffee image',
    example:
      'https://epacflexibles.com/wp-content/uploads/2020/04/coffee_bag_mockup.png',
  })
  @IsString()
  // @IsUrl() We could use this annotation to verify that is a url, but for now, we are just using a simple string as url
  imageUrl: string;
}

export class CoffeeSimpleDto extends CreateCoffeeDto {
  @ApiProperty({ description: 'Coffee Id', example: 1 })
  id: number;
}

export class CoffeeListQuery {
  @IsOptional()
  @IsEnum(CoffeeType)
  @ApiPropertyOptional({
    enum: CoffeeType,
    description: 'Filter by coffee type',
  })
  type?: CoffeeType;
}

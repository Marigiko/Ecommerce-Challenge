import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductDetails, ProductDetailsTypeFn } from './productDetails';
import { variationTypesKeys } from '../../domain/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {

  @ApiProperty({
    description: 'Category identifier to which the product belongs',
    example: 10
  })
  @IsNumber()
  @IsNotEmpty()
  public categoryId: number;

  @ApiProperty({
    description: 'Product title',
    example: 'MacBook Pro 16',
    required: false
  })
  @IsOptional()
  @IsString()
  public title?: string;

  @ApiProperty({
    description: 'Unique product code or SKU',
    example: 'MBP16-2024',
    required: false
  })
  @IsOptional()
  @IsString()
  public code?: string;

  @ApiProperty({
    description: 'Type of variation supported by the product',
    example: 'storage',
    enum: variationTypesKeys,
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(variationTypesKeys)
  public variationType?: string;

  @ApiProperty({
    description: 'Specific details depending on the product category',
    type: Object,
    required: false
  })
  @IsOptional()
  @Type(ProductDetailsTypeFn)
  @ValidateNested()
  public details?: ProductDetails;

  @ApiProperty({
    description: 'List of product highlights',
    example: [
      'Apple M3 Pro chip',
      '16GB RAM',
      '1TB SSD'
    ],
    required: false,
    type: [String]
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  public about?: string[];

  @ApiProperty({
    description: 'Full product description',
    example: 'High-performance laptop designed for professionals.',
    required: false
  })
  @IsOptional()
  @IsString()
  public description?: string;

}

export class ProductDetailsDto {

  @ApiProperty({
    description: 'Product title',
    example: 'MacBook Pro 16'
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'Unique product SKU or identifier',
    example: 'MBP16-2024'
  })
  @IsString()
  @IsNotEmpty()
  public code: string;

  @ApiProperty({
    description: 'Variation type used by the product',
    example: 'storage',
    enum: variationTypesKeys
  })
  @IsDefined()
  @IsString()
  @IsIn(variationTypesKeys)
  public variationType: string;

  @ApiProperty({
    description: 'Category-specific product details',
    type: Object,
    example: {
      "category": "Computers",
      "capacity": 2,
      "capacityUnit": "TB",
      "capacityType": "HD",
      "brand": "Dell",
      "series": "XPS"
    }
  })
  @IsDefined()
  @Type(ProductDetailsTypeFn)
  @ValidateNested()
  public details: ProductDetails;

  @ApiProperty({
    description: 'Key product highlights',
    example: [
      'Apple M3 chip',
      '16GB RAM',
      '1TB SSD'
    ],
    type: [String]
  })
  @ArrayMinSize(1)
  @IsString({ each: true })
  public about: string[];

  @ApiProperty({
    description: 'Detailed product description',
    example: 'Powerful laptop designed for developers and designers.'
  })
  @IsString()
  @IsNotEmpty()
  public description: string;
}

import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Categories } from '@database/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger'

export class ComputerDetails {

  @ApiProperty({
    description: 'Product category',
    enum: ['Computers', 'Fashion'],
    example: 'Computers',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['Computers', 'Fashion'])
  category?: Categories.Computers | Categories.Fashion;

  @ApiProperty({
    description: 'Storage capacity value',
    example: 512,
    required: false
  })
  @IsOptional()
  @IsNumber()
  capacity?: number;

  @ApiProperty({
    description: 'Unit of storage capacity',
    enum: ['GB', 'TB'],
    example: 'GB',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['GB', 'TB'])
  capacityUnit?: 'GB' | 'TB';

  @ApiProperty({
    description: 'Storage type',
    enum: ['SSD', 'HD'],
    example: 'SSD',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['SSD', 'HD'])
  capacityType?: 'SSD' | 'HD';

  @ApiProperty({
    description: 'Brand of the computer',
    example: 'Apple',
    required: false
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    description: 'Series or model line',
    example: 'MacBook Pro',
    required: false
  })
  @IsOptional()
  @IsString()
  series?: string;
}

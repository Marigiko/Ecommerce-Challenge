import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class PayloadDto {
  @ApiProperty({
    description: 'User email contained in the JWT payload',
    example: 'user@example.com'
  })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'Unique identifier of the authenticated user',
    example: 1
  })
  @IsNotEmpty()
  public id: number;
}

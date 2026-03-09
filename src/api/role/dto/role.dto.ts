import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class AssignRoleDto {

  @ApiProperty({
    description: 'ID of the user that will receive the role',
    example: 3
  })
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @ApiProperty({
    description: 'ID of the role to assign to the user',
    example: 2
  })
  @IsNumber()
  @IsNotEmpty()
  public roleId: number;

}

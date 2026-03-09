import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {

  @ApiProperty({
    description: 'User email used for authentication',
    example: 'john.doe@email.com'
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    description: 'User password (plain text before hashing)',
    example: 'StrongPassword123'
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class UserDto {

  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Email associated with the user account',
    example: 'john.doe@email.com'
  })
  @Expose()
  public email: string;
}

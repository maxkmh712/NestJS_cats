import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'maxkmh@gmail.com',
    description: '설명설명설명',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;



  @ApiProperty({
    example: '12345',
    description: '설명설명설명',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;



  @ApiProperty({
    example: 'minho',
    description: '설명설명설명',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
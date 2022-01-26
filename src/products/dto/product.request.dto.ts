import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductRequestDto {

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({required: true})
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  color: string;
}
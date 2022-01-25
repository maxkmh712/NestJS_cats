import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductRequestDto {

  @ApiProperty({
    example: '상품이름. 고양이 방석',
    description: '설명',
    required: true
  })
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
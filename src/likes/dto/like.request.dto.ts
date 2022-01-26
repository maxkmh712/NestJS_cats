import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikeRequestDto {

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  catId: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  productId: string;
}
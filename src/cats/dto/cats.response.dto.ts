import { ApiProperty } from '@nestjs/swagger';
import { Cat } from '../cats.schema'

export class ReadOnlyCatDto {
  @ApiProperty({
    example: 'maxkmh',
    description: '아이디',
  })
  id: string;

  @ApiProperty({
    example: 'maxkmh@gmail.com',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: 'minho',
    description: '이름',
  })
  name: string;
}
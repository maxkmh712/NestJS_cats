import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @ApiProperty({
    example: 'maxkmh@gmail.com',
    description: '설명설명설명',
    required: true
  })
  // 이 ApiProperty 를 해주면 스웨거에서 테스트할때 기본 디폴트값으로 띄워줘서 업무효율증가
  // request 설명인것
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

// 이렇게 클래스로 타이핑한 이유는 데코레이터를 사용할 수도 있고 상속을 받아서 재사용성을 높일 수도 있기 때문


// ⭐️ DTO (Data Transfer Object)
// 계층간 데이터 교환을 위한 객체이다
// - DB에서 데이터를 얻어서 서비스나 컨트롤러 등으로 보낼 때 사용하는 객체
// - 요청과 응답용 DTO는 View를 위한 클래스이다.
// 클라이언트에서 바디에 데이터를 실어서 보낼 때 dto 객체로 만들어서 validation을 하고 컨트롤러로 보낸다 
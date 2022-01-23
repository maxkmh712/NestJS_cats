import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// AuthGuard는 strategy를 자동으로 실행시켜주는 기능이 있음
// jwt 폴더 안에 jwt.strategy를 만들어주자


// AuthGuard 를 주입받게 되면 jwt.strategy에 validate 함수가 실행이 되는 것
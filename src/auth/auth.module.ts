import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    // strategy에 대한 기본설정을 할 수 있는 모듈
    // 세션 쿠키를 사용하지 않을 것이기 때문에 false

    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y'},
    }),
    // JwtModule은 로그인할 때 쓰이는 모듈로서 jwt를 만들어주는 모듈
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CatsRepository } from "src/cats/cats.repository";
import { Payload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',
      ignoreExpiration: false,
    });
    // 여기서 PassportStrategy 는 인증을 할 때 사용하는 것
    // super 안에 있는 인자는 jwt에 대한 설정
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdwithoutPassword(
      // 위를 쓰기 위해서는 constructor에 
      payload.sub,
    );

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근 오류!!! jwt.strategy에서 보냄');
    }
  }

}


// JWT가 헤더에 담겨서 요청가게 되고
// JWT Guard가 실행이 되면서
// JWT strategy가 실행이 된다
// 시크릿 키를 통해서 디코딩하고 
// request.user에 담긴 다음에 
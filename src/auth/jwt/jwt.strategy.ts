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
      // 헤더의 토큰으로 부터 추출을 한다
      secretOrKey: 'secret',
      // 시크릿 키 -> 유출되면 안되기 때문에 환경변수로 저장해야 함
      ignoreExpiration: false,
      // 만료기간
    });
    // 여기서 PassportStrategy 는 인증을 할 때 사용하는 것
    // super 안에 있는 인자는 jwt에 대한 설정
  }

  async validate(payload: Payload) {
    // 여기서 payload는 jwt.payload 에서 만들어 놓은 Payload 
    // strategy가 실행될때 이 validate가 바로 실행된다
    // 프론트엔드에서 온 JWT에서 페이로드를 읽고 그 부분에 대해서 유효성 검증을 해줘야 함
    // 디코딩된 페이로드를 받는다
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
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CatsController } from './cats.controller';
import { CatsRepository } from './cats.repository';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';


// nest g mo cats : 모듈 만들기 (모듈 이름은 복수형으로)
// 폴더 만들기로 하나하나 쳐도 되지만 nestjs cli를 통해 편하게 만들자
// cli로 만들면 app.module에 imports에 바로 추가됨


// 그럼 이제 cats의 컨트롤러와 프로바이더를 만들어서 서비스를 제공해보자 이거 두 개 다 cli로 만들면 된다
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule)
  ],
  // 이렇게 해당 스키마를 등록해줘야 쓸 수 있음
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  // 원래 providers는 캡슐화가 되어 있기 때문에 기본적으로 다른 모듈에서 사용하지 못한다
  exports: [CatsService, CatsRepository],
  // exports는 cats.module에서 해주는 것이고
  // 여기서 exports를 해주어야 app.controller나 다0른 외부에서 의존성주입하여 사용할 수 있는 것
  // private readonly catsService: CatsService
})
export class CatsModule {}  
